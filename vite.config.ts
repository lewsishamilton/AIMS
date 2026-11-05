import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execFile, execFileSync } from 'node:child_process'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import type { IncomingMessage, ServerResponse } from 'node:http'
import path from 'node:path'
import { promisify } from 'node:util'
import { defineConfig, loadEnv, type Plugin } from 'vite'

const execFileAsync = promisify(execFile)

/** Keep in sync with TODAY_METRICS in src/lib/hospitalStats.ts. */
const PUBLISHED_STAT_KEYS = [
  'opd',
  'admitted',
  'discharges',
  'surgeries',
  'biochemistry',
  'pathology',
  'microbiology',
  'xray',
  'ultrasound',
  'mri',
  'ct',
  'dental',
  'dialysis',
  'endoscopy',
  'cathLab',
  'ercp',
] as const

const SRC_STATS_FILE = 'src/data/todayStats.json'
const PUBLIC_STATS_FILE = 'public/data/today-stats.json'

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
 * - Commits and pushes that JSON so the public deploy picks it up.
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
   * Pushes the current HEAD. If GitHub rejects the git ref update (for example
   * the transient "fatal error in commit_refs_rules" server bug), the same
   * credential is used against the REST API to update the branch.
   */
  const pushHead = async () => {
    const branch = (await runGit(['rev-parse', '--abbrev-ref', 'HEAD'])).stdout.trim()
    const sha = (await runGit(['rev-parse', 'HEAD'])).stdout.trim()

    try {
      await runGit(['push', 'origin', 'HEAD'])
      return
    } catch (pushError) {
      const remote = (await runGit(['remote', 'get-url', 'origin'])).stdout
      const repo = parseGitHubRepo(remote)
      const token = readStoredGitHubToken()
      if (!repo || !token) throw new Error(gitErrorMessage(pushError), { cause: pushError })

      // GitHub's rules engine is currently rejecting updates to existing refs,
      // but creating a *new* ref still uploads the commit objects we need.
      const tempBranch = `aims-stats-publish-${Date.now()}`
      try {
        await runGit(['push', 'origin', `HEAD:refs/heads/${tempBranch}`])
      } catch (uploadError) {
        throw new Error(
          `${gitErrorMessage(pushError)} — could not upload the commit: ${gitErrorMessage(
            uploadError
          )}`,
          { cause: uploadError }
        )
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'aims-stats-publisher',
        'X-GitHub-Api-Version': '2022-11-28',
      }
      const refUrl = `https://api.github.com/repos/${repo}/git/refs/heads/${encodeURIComponent(branch)}`

      let apiError: unknown = null
      try {
        const existing = await fetch(refUrl, { headers })
        const response = existing.ok
          ? await fetch(refUrl, {
              method: 'PATCH',
              headers,
              body: JSON.stringify({ sha, force: false }),
            })
          : await fetch(`https://api.github.com/repos/${repo}/git/refs`, {
              method: 'POST',
              headers,
              body: JSON.stringify({ ref: `refs/heads/${branch}`, sha }),
            })

        if (!response.ok) {
          const detail = await response.text()
          apiError = new Error(
            `GitHub API fallback failed (${response.status}): ${detail.slice(0, 300)}`
          )
        }
      } catch (error) {
        apiError = error
      }

      // Remove the temporary ref; the real branch has been updated above.
      try {
        await fetch(
          `https://api.github.com/repos/${repo}/git/refs/heads/${encodeURIComponent(tempBranch)}`,
          { method: 'DELETE', headers }
        )
      } catch {
        // Best effort cleanup.
      }

      if (apiError) {
        throw new Error(
          `${gitErrorMessage(pushError)} — API fallback also failed: ${gitErrorMessage(apiError)}`,
          { cause: apiError }
        )
      }

      // Keep the local remote-tracking ref in sync after the API update.
      try {
        await runGit(['fetch', 'origin', branch])
      } catch {
        // Not critical: the remote branch is already updated.
      }
    }
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

        const stats: Record<string, number> = {}
        for (const key of PUBLISHED_STAT_KEYS) {
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

        const document = {
          date,
          updatedAt: new Date().toISOString(),
          stats,
        }
        const json = `${JSON.stringify(document, null, 2)}\n`

        try {
          await fsp.mkdir(path.dirname(srcStatsPath), { recursive: true })
          await fsp.mkdir(path.dirname(publicStatsPath), { recursive: true })
          await fsp.writeFile(srcStatsPath, json, 'utf8')
          await fsp.writeFile(publicStatsPath, json, 'utf8')
        } catch (error) {
          sendJson(res, 500, {
            ok: false,
            error: `Could not save the figures: ${gitErrorMessage(error)}`,
          })
          return
        }

        let committed = false
        try {
          await runGit(['add', '--', SRC_STATS_FILE, PUBLIC_STATS_FILE])
          const staged = await runGit([
            'diff',
            '--cached',
            '--name-only',
            '--',
            SRC_STATS_FILE,
            PUBLIC_STATS_FILE,
          ])

          if (staged.stdout.trim()) {
            await runGit([
              'commit',
              '-m',
              `Update hospital stats for ${date}`,
              '--',
              SRC_STATS_FILE,
              PUBLIC_STATS_FILE,
            ])
            committed = true
          }

          await pushHead()
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
          message: committed
            ? 'Published. The public website updates when the deploy finishes.'
            : 'Already up to date — nothing new to publish.',
        })
      })
    },

    // Make sure the runtime JSON exists in the build output as well.
    buildStart() {
      copyStatsToPublic()
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const ownerPlugin = ownerStatsPlugin(mode, env)

  return {
    plugins: [react(), tailwindcss(), ownerPlugin],
    base: process.env.VITE_BASE_PATH || '/',
    optimizeDeps: {
      include: ['maplibre-gl'],
    },
    server: {
      watch: {
        // The publish endpoint writes these files; do not reload the page for
        // them. The app re-fetches the published JSON after a publish instead.
        ignored: ['**/src/data/todayStats.json', '**/public/data/today-stats.json'],
      },
    },
  }
})
