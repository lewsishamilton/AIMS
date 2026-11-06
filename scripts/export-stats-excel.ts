import fsp from 'node:fs/promises'
import path from 'node:path'
import {
  EXCEL_FILE,
  HISTORY_FILE,
  SRC_STATS_FILE,
  normalizeStats,
  readStatsHistory,
  serializeHistory,
  upsertHistoryEntry,
  writeStatisticsWorkbook,
  type StatsHistory,
  type StatsHistoryEntry,
} from './stats-store.ts'

/**
 * Regenerates STATISTICS.xlsx from the durable daily history.
 *
 * Usage: npm run stats:export
 *
 * If the history file is missing (or lags behind the published figures), the
 * most recent published day in src/data/todayStats.json is added first.
 */
const root = process.cwd()

async function readLatestPublishedEntry(): Promise<StatsHistoryEntry | null> {
  try {
    const raw = await fsp.readFile(path.join(root, SRC_STATS_FILE), 'utf8')
    const document = JSON.parse(raw) as {
      date?: unknown
      updatedAt?: unknown
      stats?: unknown
    }
    const stats = normalizeStats(document.stats)
    if (typeof document.date !== 'string' || !stats) return null

    return {
      date: document.date,
      updatedAt:
        typeof document.updatedAt === 'string'
          ? document.updatedAt
          : new Date().toISOString(),
      stats,
    }
  } catch {
    return null
  }
}

async function main(): Promise<void> {
  let history: StatsHistory = await readStatsHistory(root)
  const imported: string[] = []

  const latest = await readLatestPublishedEntry()
  if (latest) {
    const next = upsertHistoryEntry(history, latest)
    if (next !== history) {
      history = next
      imported.push(latest.date)
    }
  }

  if (history.entries.length === 0) {
    console.error(
      `No daily statistics found. Add a day first, or create ${HISTORY_FILE} with at least one entry.`
    )
    process.exit(1)
  }

  // Persist a backfilled day so the JSON and the workbook stay in sync.
  if (imported.length > 0) {
    const historyPath = path.join(root, HISTORY_FILE)
    await fsp.mkdir(path.dirname(historyPath), { recursive: true })
    await fsp.writeFile(historyPath, serializeHistory(history), 'utf8')
  }

  const buffer = await writeStatisticsWorkbook(root, history)

  const first = history.entries[0]?.date ?? '—'
  const last = history.entries[history.entries.length - 1]?.date ?? '—'

  console.log(`History:  ${HISTORY_FILE}`)
  console.log(`Days:     ${history.entries.length} (${first} → ${last})`)
  if (imported.length > 0) {
    console.log(`Imported: ${imported.join(', ')} from ${SRC_STATS_FILE}`)
  }
  console.log(`Workbook: ${EXCEL_FILE} (${buffer.length.toLocaleString('en-IN')} bytes)`)

  const stat = await fsp.stat(path.join(root, EXCEL_FILE))
  if (stat.size === 0) {
    console.error('The workbook was written but is empty.')
    process.exit(1)
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error))
  process.exit(1)
})
