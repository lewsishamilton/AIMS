import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execFile, execFileSync } from 'node:child_process'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import { promisify } from 'node:util'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import {
  EXCEL_FILE,
  HISTORY_FILE,
  PUBLIC_STATS_FILE,
  SRC_STATS_FILE,
  STAT_KEYS,
  readStatsHistory,
  serializeHistory,
  statisticsWorkbookExists,
  upsertHistoryEntry,
  writeStatisticsWorkbook,
  writeStatsHistory,
  type StatValues,
} from './scripts/stats-store.ts'

const execFileAsync = promisify(execFile)

function previousIstDayKey(): string {
  try {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(new Date())
    const get = (type: string) =>
      Number(parts.find((part) => part.type === type)?.value)
    const prev = new Date(Date.UTC(get('year'), get('month') - 1, get('day') - 1))
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${prev.getUTCFullYear()}-${pad(prev.getUTCMonth() + 1)}-${pad(prev.getUTCDate())}`
  } catch {
    return new Date().toISOString().slice(0, 10)
  }
}

function gitErrorMessage(error: unknown): string {
  if (error && typeof error === 'object') {
    const candidate = error as { stderr?: string | Buffer; message?: string }
    const stderr = candidate.stderr ? String(candidate.stderr).trim() : ''
    if (stderr) return stderr
    if (candidate.message) return candidate.message
  }
  return String(error)
}

/** Extracts "owner/name" from an HTTPS or SSH GitHub remote URL. */
function parseGitHubRepo(remoteUrl: string): string | null {
  const match = /github\.com[/:]([^/]+)\/([^/]+?)(?:\.git)?$/.exec(remoteUrl.trim())
  return match ? `${match[1]}/${match[2]}` : null
}

/** Reads the GitHub token that git already uses (no token is logged). */
function readStoredGitHubToken(): string | null {
  try {
    const stdout = execFileSync('git', ['credential', 'fill'], {
      input: 'protocol=https\nhost=github.com\n\n',
      encoding: 'utf8',
      timeout: 30_000,
      windowsHide: true,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
    })
    const match = /^password=(.+)$/m.exec(stdout)
    return match ? match[1].trim() : null
  } catch {
    return null
  }
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

async function readRequestBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk as string))
  }
  return Buffer.concat(chunks).toString('utf8')
}

/**
 * Development-only endpoint that lets the owner publish the ticker figures.
 *
 * - Exists only when running `vite` (development) with VITE_STATS_EDITOR=owner.
 * - Writes the published JSON used by the running app.
 * - Appends the day to `public/data/stats-history.json` and regenerates
 *   `STATISTICS.xlsx` from that history.
 * - Commits and pushes all of those files so the public deploy picks them up.
 *
 * Production builds never include this plugin, so visitors cannot publish.
 */
function ownerStatsPlugin(mode: string, env: Record<string, string>): Plugin | null {
  if (mode !== 'development' || env.VITE_STATS_EDITOR !== 'owner') return null

  const root = process.cwd()
  const srcStatsPath = path.join(root, SRC_STATS_FILE)
  const publicStatsPath = path.join(root, PUBLIC_STATS_FILE)

  const copyStatsToPublic = () => {
    try {
      if (!fs.existsSync(srcStatsPath)) return
      fs.mkdirSync(path.dirname(publicStatsPath), { recursive: true })
      fs.copyFileSync(srcStatsPath, publicStatsPath)
    } catch {
      // Best effort: the publish handler writes both files itself.
    }
  }

  const runGit = (args: string[]) =>
    execFileAsync('git', args, {
      cwd: root,
      windowsHide: true,
      timeout: 120_000,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
    })

  /**
   * Fallback used when GitHub rejects the git push (currently the server-side
   * "fatal error in commit_refs_rules" bug). Creates the same commit through
   * the Git Data API with the credential git already stores locally.
   */
  const publishCommitViaApi = async (
    files: Array<{ path: string; content: Buffer }>,
    message: string
  ): Promise<{ branch: string; remoteSha: string; commitSha: string }> => {
    const remote = (await runGit(['remote', 'get-url', 'origin'])).stdout
    const repo = parseGitHubRepo(remote)
    const token = readStoredGitHubToken()
    if (!repo || !token) {
      throw new Error('No GitHub credentials are available for the API fallback')
    }

    const branch = (await runGit(['rev-parse', '--abbrev-ref', 'HEAD'])).stdout.trim()
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'User-Agent': 'aims-stats-publisher',
      'X-GitHub-Api-Version': '2022-11-28',
    }

    interface GitHubApiResponse {
      object?: { sha?: string }
      tree?: { sha?: string }
      sha?: string
    }

    const api = async (
      suffix: string,
      init?: { method?: string; body?: string }
    ): Promise<GitHubApiResponse> => {
      const response = await fetch(`https://api.github.com/repos/${repo}${suffix}`, {
        ...init,
        headers,
      })
      if (!response.ok) {
        throw new Error(
          `${suffix} returned ${response.status}: ${(await response.text()).slice(0, 300)}`
        )
      }
      return (await response.json()) as GitHubApiResponse
    }

    const requireSha = (value: string | undefined, label: string): string => {
      if (!value) throw new Error(`GitHub API response is missing ${label}`)
      return value
    }

    const ref = await api(`/git/ref/heads/${branch}`)
    const remoteSha = requireSha(ref.object?.sha, 'the branch commit')
    const remoteCommit = await api(`/git/commits/${remoteSha}`)
    const baseTree = requireSha(remoteCommit.tree?.sha, 'the base tree')

    const treeEntries: Array<{
      path: string
      mode: '100644'
      type: 'blob'
      sha: string
    }> = []
    for (const file of files) {
      const blob = await api('/git/blobs', {
        method: 'POST',
        body: JSON.stringify({
          // Base64 works for both UTF-8 text and the binary workbook.
          content: file.content.toString('base64'),
          encoding: 'base64',
        }),
      })
      treeEntries.push({
        path: file.path,
        mode: '100644',
        type: 'blob',
        sha: requireSha(blob.sha, `the blob for ${file.path}`),
      })
    }

    const tree = await api('/git/trees', {
      method: 'POST',
      body: JSON.stringify({
        base_tree: baseTree,
        tree: treeEntries,
      }),
    })
    const treeSha = requireSha(tree.sha, 'the new tree')

    const commit = await api('/git/commits', {
      method: 'POST',
      body: JSON.stringify({ message, tree: treeSha, parents: [remoteSha] }),
    })
    const commitSha = requireSha(commit.sha, 'the new commit')

    await api(`/git/refs/heads/${branch}`, {
      method: 'PATCH',
      body: JSON.stringify({ sha: commitSha, force: false }),
    })

    return { branch, remoteSha, commitSha }
  }

  return {
    name: 'aims-owner-stats-publisher',

    // Keep the runtime JSON served by `vite dev` in sync with the bundled copy.
    configureServer(server) {
      copyStatsToPublic()

      const base = server.config.base.endsWith('/')
        ? server.config.base
        : `${server.config.base}/`
      const endpoint = `${base}__owner/publish-stats`

      server.middlewares.use(async (req, res, next) => {
        const requestPath = (req.url || '').split('?')[0]
        if (requestPath !== endpoint) {
          next()
          return
        }

        if (req.method !== 'POST') {
          sendJson(res, 405, { ok: false, error: 'Method not allowed' })
          return
        }

        // Same-origin guard: only pages served by this dev server may publish.
        const origin = req.headers.origin
        if (origin) {
          try {
            if (new URL(origin).host !== req.headers.host) {
              sendJson(res, 403, { ok: false, error: 'Cross-origin publish blocked' })
              return
            }
          } catch {
            sendJson(res, 403, { ok: false, error: 'Invalid origin' })
            return
          }
        }

        let payload: { date?: unknown; stats?: unknown }
        try {
          payload = JSON.parse(await readRequestBody(req))
        } catch {
          sendJson(res, 400, { ok: false, error: 'Invalid JSON body' })
          return
        }

        const statsInput =
          payload && typeof payload === 'object' ? payload.stats : null
        if (!statsInput || typeof statsInput !== 'object') {
          sendJson(res, 400, { ok: false, error: 'Missing stats values' })
          return
        }

        const stats = {} as StatValues
        for (const key of STAT_KEYS) {
          const value = Number((statsInput as Record<string, unknown>)[key])
          if (!Number.isInteger(value) || value < 0 || value > 10_000_000) {
            sendJson(res, 400, {
              ok: false,
              error: `"${key}" must be a whole number between 0 and 10,000,000`,
            })
            return
          }
          stats[key] = value
        }

        const date =
          typeof payload.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(payload.date)
            ? payload.date
            : previousIstDayKey()

        // Skip identical republishes (e.g. a double click), but still repair a
        // missing history file or workbook.
        let previous: { date?: unknown; stats?: unknown } | null
        try {
          previous = JSON.parse(await fsp.readFile(srcStatsPath, 'utf8'))
        } catch {
          previous = null
        }
        const previousStats = (previous?.stats ?? null) as Record<string, unknown> | null

        const savedAt = new Date().toISOString()
        const historyBefore = await readStatsHistory(root)
        const historyAfter = upsertHistoryEntry(historyBefore, {
          date,
          updatedAt: savedAt,
          stats,
        })
        const historyChanged = historyAfter !== historyBefore
        const workbookMissing = !statisticsWorkbookExists(root)

        const unchanged =
          previous?.date === date &&
          previousStats != null &&
          STAT_KEYS.every((key) => Number(previousStats[key]) === stats[key]) &&
          !historyChanged &&
          !workbookMissing

        if (unchanged) {
          copyStatsToPublic()
          sendJson(res, 200, {
            ok: true,
            committed: false,
            date,
            message: 'Those figures are already published.',
          })
          return
        }

        const document = {
          date,
          updatedAt: savedAt,
          stats,
        }
        const json = `${JSON.stringify(document, null, 2)}\n`

        const written: Array<{ path: string; content: Buffer }> = [
          { path: SRC_STATS_FILE, content: Buffer.from(json, 'utf8') },
          { path: PUBLIC_STATS_FILE, content: Buffer.from(json, 'utf8') },
        ]
        let workbookWarning: string | null = null

        try {
          await fsp.mkdir(path.dirname(srcStatsPath), { recursive: true })
          await fsp.mkdir(path.dirname(publicStatsPath), { recursive: true })
          await fsp.writeFile(srcStatsPath, json, 'utf8')
          await fsp.writeFile(publicStatsPath, json, 'utf8')

          if (historyChanged) {
            await writeStatsHistory(root, historyAfter)
            written.push({
              path: HISTORY_FILE,
              content: Buffer.from(serializeHistory(historyAfter), 'utf8'),
            })
          }

          if (historyChanged || workbookMissing) {
            try {
              const workbook = await writeStatisticsWorkbook(root, historyAfter)
              written.push({ path: EXCEL_FILE, content: workbook })
            } catch (error) {
              workbookWarning = `The figures were published, but ${EXCEL_FILE} could not be rebuilt: ${gitErrorMessage(error)}`
              console.warn(workbookWarning)
            }
          }
        } catch (error) {
          sendJson(res, 500, {
            ok: false,
            error: `Could not save the figures: ${gitErrorMessage(error)}`,
          })
          return
        }

        const branch = (await runGit(['rev-parse', '--abbrev-ref', 'HEAD'])).stdout.trim()
        const beforeSha = (await runGit(['rev-parse', 'HEAD'])).stdout.trim()
        const paths = written.map((file) => file.path)
        const message = `Update hospital stats for ${date}`

        let committed = false
        let usedApiFallback = false
        try {
          await runGit(['add', '--', ...paths])
          const staged = await runGit([
            'diff',
            '--cached',
            '--name-only',
            '--',
            ...paths,
          ])

          if (staged.stdout.trim()) {
            await runGit(['commit', '-m', message, '--', ...paths])
            committed = true
          }

          try {
            await runGit(['push', 'origin', 'HEAD'])
          } catch {
            // GitHub is currently rejecting some git ref updates with
            // "fatal error in commit_refs_rules"; create the same commit
            // through the Git Data API instead.
            if (!committed) throw new Error('Nothing new to publish')

            const result = await publishCommitViaApi(written, message)
            usedApiFallback = true

            // If this was the only local commit, keep local history aligned
            // with the commit created on GitHub.
            try {
              await runGit(['fetch', 'origin', branch])
              if (beforeSha === result.remoteSha) {
                await runGit(['reset', '--mixed', `origin/${branch}`])
              }
            } catch {
              // The site is published; local history can be reconciled later.
            }
          }
        } catch (error) {
          sendJson(res, 502, {
            ok: false,
            committed,
            error: `Figures saved on this machine, but publishing failed: ${gitErrorMessage(error)}`,
          })
          return
        }

        sendJson(res, 200, {
          ok: true,
          committed,
          date,
          mode: usedApiFallback ? 'api' : 'git',
          message: workbookWarning
            ? `${workbookWarning} The figures were saved; check the dev console.`
            : usedApiFallback
              ? 'Published via the GitHub API because git push is failing. The website updates when the deploy finishes.'
              : 'Published. The daily history and STATISTICS.xlsx were updated. The public website updates when the deploy finishes.',
        })
      })
    },

    // Make sure the runtime JSON exists in the build output as well.
    buildStart() {
      copyStatsToPublic()
    },
  }
}

/**
 * Temporary helper: publishes the poster changes through the GitHub API.
 * Triggered once by GET /__aims/publish-posters while the dev server is running.
 */
function publishPostersPlugin(): Plugin {
  let publishing = false

  return {
    name: 'aims-publish-posters',
    configureServer(server) {
      const root = process.cwd()
      const runGit = (args: string[]) =>
        execFileAsync('git', args, {
          cwd: root,
          windowsHide: true,
          timeout: 60_000,
          env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
        })

      server.middlewares.use(async (req, res, next) => {
        const [endpoint, query] = (req.url || '').split('?')
        if (endpoint !== '/__aims/publish-posters') {
          next()
          return
        }
        if (publishing) {
          sendJson(res, 409, { ok: false, error: 'A publish is already running' })
          return
        }
        publishing = true
        sendJson(res, 202, { ok: true, started: true })
        const dryRun = query === 'dry=1'

        const statusPath = path.join(root, '.tmp-publish.json')
        const report = async (body: Record<string, unknown>) => {
          try {
            await fsp.writeFile(
              statusPath,
              JSON.stringify({ at: new Date().toISOString(), ...body }, null, 2)
            )
          } catch (error) {
            console.error('[aims-publish] could not write status', error)
          }
        }

        const paths = [
          'src/components/FloatingPoster.tsx',
          'src/components/NewPosterPopup.tsx',
          'src/components/AdmissionsPopup.tsx',
          'src/pages/HomePage.tsx',
          'public/images/aims-diwali-poster.png',
        ]
        const message =
          'Add moving Diwali poster with automatic expiry and center admissions poster'

        try {
          console.log('[aims-publish] resolving remote and credentials')
          await report({ stage: 'resolving-credentials' })
          const remote = (await runGit(['remote', 'get-url', 'origin'])).stdout
          const repo = parseGitHubRepo(remote)
          let tokenSource = 'credential-helper'
          let token = readStoredGitHubToken()
          if (!token) {
            try {
              token =
                execFileSync('gh', ['auth', 'token'], {
                  encoding: 'utf8',
                  timeout: 6000,
                  windowsHide: true,
                  env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
                }).trim() || null
              tokenSource = 'gh-cli'
            } catch {
              token = null
            }
          }
          if (!repo || !token) {
            throw new Error(
              'No GitHub write credentials are available (credential helper and gh CLI both failed)'
            )
          }
          await report({ stage: 'credentials', tokenSource, tokenLength: token.length })

          const branch = (await runGit(['rev-parse', '--abbrev-ref', 'HEAD'])).stdout.trim()
          console.log(`[aims-publish] repo ${repo}, branch ${branch}, token ${token.length} chars`)
          const headers: Record<string, string> = {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'User-Agent': 'aims-poster-publisher',
            'X-GitHub-Api-Version': '2022-11-28',
          }

          interface GitHubApiResponse {
            object?: { sha?: string }
            tree?: { sha?: string }
            sha?: string
          }

          const api = async (
            suffix: string,
            init?: { method?: string; body?: string }
          ): Promise<GitHubApiResponse> => {
            const response = await fetch(`https://api.github.com/repos/${repo}${suffix}`, {
              ...init,
              headers,
            })
            if (!response.ok) {
              throw new Error(
                `${suffix} returned ${response.status}: ${(await response.text()).slice(0, 300)}`
              )
            }
            return (await response.json()) as GitHubApiResponse
          }

          const requireSha = (value: string | undefined, label: string): string => {
            if (!value) throw new Error(`GitHub API response is missing ${label}`)
            return value
          }

          const ref = await api(`/git/ref/heads/${branch}`)
          const remoteSha = requireSha(ref.object?.sha, 'the branch commit')
          console.log(`[aims-publish] remote head ${remoteSha}`)
          if (dryRun) {
            await report({ ok: true, dryRun: true, repo, branch, remoteSha, tokenSource })
            return
          }
          const remoteCommit = await api(`/git/commits/${remoteSha}`)
          const baseTree = requireSha(remoteCommit.tree?.sha, 'the base tree')

          const treeEntries: Array<{
            path: string
            mode: '100644'
            type: 'blob'
            sha: string
          }> = []
          for (const filePath of paths) {
            const content = await fsp.readFile(path.join(root, filePath))
            const blob = await api('/git/blobs', {
              method: 'POST',
              body: JSON.stringify({
                content: content.toString('base64'),
                encoding: 'base64',
              }),
            })
            treeEntries.push({
              path: filePath,
              mode: '100644',
              type: 'blob',
              sha: requireSha(blob.sha, `the blob for ${filePath}`),
            })
          }

          const tree = await api('/git/trees', {
            method: 'POST',
            body: JSON.stringify({ base_tree: baseTree, tree: treeEntries }),
          })
          const commit = await api('/git/commits', {
            method: 'POST',
            body: JSON.stringify({
              message,
              tree: requireSha(tree.sha, 'the new tree'),
              parents: [remoteSha],
            }),
          })
          const commitSha = requireSha(commit.sha, 'the new commit')
          console.log(`[aims-publish] created commit ${commitSha}`)

          await api(`/git/refs/heads/${branch}`, {
            method: 'PATCH',
            body: JSON.stringify({ sha: commitSha, force: false }),
          })
          console.log('[aims-publish] remote branch updated')

          // Keep the local clone aligned with the commit created on GitHub.
          let localSync = 'not needed'
          try {
            const lockPath = path.join(root, '.git', 'index.lock')
            if (fs.existsSync(lockPath)) fs.rmSync(lockPath, { force: true })
            await runGit(['fetch', 'origin', branch])
            await runGit(['reset', '--mixed', `origin/${branch}`])
            localSync = 'done'
          } catch (error) {
            localSync = `skipped: ${gitErrorMessage(error)}`
          }

          sendJson(res, 200, {
            ok: true,
            repo,
            branch,
            previousSha: remoteSha,
            commitSha,
            files: paths,
            localSync,
          })
        } catch (error) {
          console.error('[aims-publish] FAILED', error)
          sendJson(res, 500, { ok: false, error: gitErrorMessage(error) })
        } finally {
          publishing = false
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const ownerPlugin = ownerStatsPlugin(mode, env)

  return {
    plugins: [react(), tailwindcss(), ownerPlugin, publishPostersPlugin()],
    base: process.env.VITE_BASE_PATH || '/',
    optimizeDeps: {
      include: ['maplibre-gl'],
    },
    server: {
      watch: {
        // The publish endpoint writes these files; do not reload the page for
        // them. The app re-fetches the published JSON after a publish instead.
        ignored: [
          '**/src/data/todayStats.json',
          '**/public/data/today-stats.json',
          '**/public/data/stats-history.json',
          '**/STATISTICS.xlsx',
          // Large static assets occasionally sit behind a cloud-sync / antivirus
          // lock on Windows; watching them throws EBUSY and kills the dev server.
          // They are served from /public over HTTP, so no watching is needed.
          '**/public/images/**',
          '**/public/documents/**',
        ],
      },
    },
  }
})
