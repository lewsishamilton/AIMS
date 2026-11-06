import fs from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import type { Workbook as ExcelWorkbook } from 'exceljs'

/**
 * Server-side store for the daily hospital statistics.
 *
 * The website is a static single-page app, so the durable record of every
 * published day is a committed JSON file (`public/data/stats-history.json`).
 * `STATISTICS.xlsx` is generated from that file for offline analysis/printing.
 *
 * This module is imported by `vite.config.ts` (owner publish endpoint) and by
 * `scripts/export-stats-excel.ts`. It must never be imported by the client
 * bundle: it uses Node APIs and the spreadsheet library.
 */

/** Keep in sync with TODAY_METRICS in src/lib/hospitalStats.ts. */
export const STAT_KEYS = [
  'opd',
  'admitted',
  'discharges',
  'biochemistry',
  'pathology',
  'microbiology',
  'xray',
  'ultrasound',
  'mri',
  'ct',
  'surgeries',
  'dental',
  'dialysis',
  'endoscopy',
  'cathLab',
  'ercp',
] as const

export type StatKey = (typeof STAT_KEYS)[number]
export type StatValues = Record<StatKey, number>
export type StatGroup = 'Patients' | 'Laboratory' | 'Imaging' | 'Procedures'

interface StatMetric {
  key: StatKey
  label: string
  group: StatGroup
}

/** Display metadata for the workbook; mirrors the ticker labels. */
export const STAT_METRICS: StatMetric[] = [
  { key: 'opd', label: 'Out-patients', group: 'Patients' },
  { key: 'admitted', label: 'Admitted', group: 'Patients' },
  { key: 'discharges', label: 'Discharges', group: 'Patients' },
  { key: 'biochemistry', label: 'Biochemistry', group: 'Laboratory' },
  { key: 'pathology', label: 'Pathology', group: 'Laboratory' },
  { key: 'microbiology', label: 'Microbiology', group: 'Laboratory' },
  { key: 'xray', label: 'X-Ray', group: 'Imaging' },
  { key: 'ultrasound', label: 'Ultrasound', group: 'Imaging' },
  { key: 'mri', label: 'MRI', group: 'Imaging' },
  { key: 'ct', label: 'CT', group: 'Imaging' },
  { key: 'surgeries', label: 'Surgeries', group: 'Procedures' },
  { key: 'dental', label: 'Dental', group: 'Procedures' },
  { key: 'dialysis', label: 'Dialysis', group: 'Procedures' },
  { key: 'endoscopy', label: 'Endoscopy', group: 'Procedures' },
  { key: 'cathLab', label: 'Cath Lab', group: 'Procedures' },
  { key: 'ercp', label: 'ERCP', group: 'Procedures' },
]

export const SRC_STATS_FILE = 'src/data/todayStats.json'
export const PUBLIC_STATS_FILE = 'public/data/today-stats.json'
export const HISTORY_FILE = 'public/data/stats-history.json'
export const EXCEL_FILE = 'STATISTICS.xlsx'

export interface StatsHistoryEntry {
  /** IST calendar day these figures belong to (YYYY-MM-DD). */
  date: string
  /** ISO timestamp of the publish that produced this row. */
  updatedAt: string
  stats: StatValues
}

export interface StatsHistory {
  version: 1
  /** ISO timestamp of the most recent change to the history file. */
  updatedAt: string | null
  /** Ascending by date, at most one entry per day. */
  entries: StatsHistoryEntry[]
}

export function isDateKey(value: unknown): value is string {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function isStatValue(value: unknown): value is number {
  const n = Number(value)
  return Number.isInteger(n) && n >= 0 && n <= 10_000_000
}

export function normalizeStats(value: unknown): StatValues | null {
  if (!value || typeof value !== 'object') return null
  const source = value as Record<string, unknown>
  const stats = {} as StatValues
  for (const key of STAT_KEYS) {
    if (!isStatValue(source[key])) return null
    stats[key] = Number(source[key])
  }
  return stats
}

/** Accepts anything read from disk and returns a safe, ordered history. */
export function normalizeHistory(value: unknown): StatsHistory {
  const empty: StatsHistory = { version: 1, updatedAt: null, entries: [] }
  if (!value || typeof value !== 'object') return empty

  const source = value as Record<string, unknown>
  const rawEntries = Array.isArray(source.entries) ? source.entries : []
  const entries: StatsHistoryEntry[] = []
  const seen = new Set<string>()

  for (const raw of rawEntries) {
    if (!raw || typeof raw !== 'object') continue
    const item = raw as Record<string, unknown>
    if (!isDateKey(item.date) || seen.has(item.date)) continue
    const stats = normalizeStats(item.stats)
    if (!stats) continue

    seen.add(item.date)
    entries.push({
      date: item.date,
      updatedAt: typeof item.updatedAt === 'string' ? item.updatedAt : '',
      stats,
    })
  }

  entries.sort((a, b) => a.date.localeCompare(b.date))
  const newest = entries.length ? entries[entries.length - 1].updatedAt : null

  return {
    version: 1,
    updatedAt:
      typeof source.updatedAt === 'string' && source.updatedAt
        ? source.updatedAt
        : newest,
    entries,
  }
}

export async function readStatsHistory(root: string): Promise<StatsHistory> {
  try {
    const raw = await fsp.readFile(path.join(root, HISTORY_FILE), 'utf8')
    return normalizeHistory(JSON.parse(raw))
  } catch {
    return normalizeHistory(null)
  }
}

/**
 * Adds or replaces one day. The input history is not mutated. An identical
 * row leaves the document untouched (including `updatedAt`), so republishing
 * the same figures does not create a spurious commit.
 */
export function upsertHistoryEntry(
  history: StatsHistory,
  entry: StatsHistoryEntry
): StatsHistory {
  const stats = normalizeStats(entry.stats)
  if (!stats || !isDateKey(entry.date)) return history

  const existing = history.entries.find((item) => item.date === entry.date)
  if (existing && STAT_KEYS.every((key) => existing.stats[key] === stats[key])) {
    return history
  }

  const entries = history.entries.filter((item) => item.date !== entry.date)
  entries.push({ date: entry.date, updatedAt: entry.updatedAt, stats })
  entries.sort((a, b) => a.date.localeCompare(b.date))

  return {
    version: 1,
    updatedAt: entry.updatedAt,
    entries,
  }
}

export function serializeHistory(history: StatsHistory): string {
  return `${JSON.stringify(history, null, 2)}\n`
}

export async function writeStatsHistory(
  root: string,
  history: StatsHistory
): Promise<void> {
  const file = path.join(root, HISTORY_FILE)
  await fsp.mkdir(path.dirname(file), { recursive: true })
  await fsp.writeFile(file, serializeHistory(history), 'utf8')
}

/** 1-based column index → spreadsheet letter (1 → A, 27 → AA). */
function columnLetter(index: number): string {
  let n = index
  let letters = ''
  while (n > 0) {
    const remainder = (n - 1) % 26
    letters = String.fromCharCode(65 + remainder) + letters
    n = Math.floor((n - 1) / 26)
  }
  return letters
}

function parseDateParts(date: string): [number, number, number] {
  return date.split('-').map(Number) as [number, number, number]
}

function startOfDay(date: string): Date {
  const [year, month, day] = parseDateParts(date)
  // Local midnight keeps ExcelJS's date serial aligned with the calendar day.
  return new Date(year, month - 1, day)
}

function dayName(date: string): string {
  const [year, month, day] = parseDateParts(date)
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    weekday: 'short',
    timeZone: 'UTC',
  })
}

function groupFill(group: StatGroup): string {
  switch (group) {
    case 'Patients':
      return 'FF0F766E'
    case 'Laboratory':
      return 'FFB45309'
    case 'Imaging':
      return 'FF0369A1'
    case 'Procedures':
      return 'FF047857'
  }
}

/**
 * Builds the `STATISTICS.xlsx` workbook in memory.
 *
 * Sheet 1 is one row per published day with live SUM/AVERAGE formulas (cached
 * results included so the totals are visible even before a recalculation).
 * Sheet 2 documents the workbook and how to regenerate it.
 */
export async function buildStatisticsWorkbook(
  history: StatsHistory
): Promise<Buffer> {
  // Loaded lazily so `vite` startup does not pay for the spreadsheet library.
  const excelModule = (await import('exceljs')) as {
    default?: { Workbook: new () => ExcelWorkbook }
    Workbook?: new () => ExcelWorkbook
  }
  const ExcelJS = excelModule.default ?? excelModule
  if (!ExcelJS.Workbook) {
    throw new Error('The exceljs package did not expose a Workbook constructor')
  }

  const workbook = new ExcelJS.Workbook()

  const entries = [...history.entries].sort((a, b) => a.date.localeCompare(b.date))
  const generatedAt = history.updatedAt ? new Date(history.updatedAt) : new Date()
  const safeGeneratedAt = Number.isNaN(generatedAt.getTime()) ? new Date() : generatedAt

  workbook.creator = 'AIMS — Arundathi Institute of Medical Sciences'
  workbook.lastModifiedBy = 'AIMS statistics publisher'
  workbook.created = safeGeneratedAt
  workbook.modified = safeGeneratedAt
  workbook.title = 'AIMS Daily Hospital Statistics'
  workbook.subject = 'Daily OPD, admission, laboratory, imaging and procedure figures'
  workbook.company = 'Arundathi Institute of Medical Sciences'
  workbook.calcProperties.fullCalcOnLoad = true

  const sheet = workbook.addWorksheet('Daily Statistics', {
    views: [{ state: 'frozen', xSplit: 2, ySplit: 4 }],
    pageSetup: {
      orientation: 'landscape',
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      paperSize: 9,
    },
  })

  const metricCount = STAT_METRICS.length
  const lastColumn = 2 + metricCount
  const dataStart = 5
  const dataEnd = dataStart + entries.length - 1
  const totalRow = dataEnd + 2
  const averageRow = totalRow + 1

  sheet.columns = [
    { key: 'date', width: 13 },
    { key: 'day', width: 8 },
    ...STAT_METRICS.map((metric) => ({
      key: metric.key,
      width: Math.max(12, metric.label.length + 3),
    })),
  ]

  // Title block
  sheet.mergeCells(1, 1, 1, lastColumn)
  const title = sheet.getCell(1, 1)
  title.value = 'AIMS — Daily Hospital Statistics'
  title.font = { name: 'Arial', size: 16, bold: true, color: { argb: 'FFFFFFFF' } }
  title.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }
  title.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0B2A49' } }
  sheet.getRow(1).height = 30

  sheet.mergeCells(2, 1, 2, lastColumn)
  const subtitle = sheet.getCell(2, 1)
  subtitle.value =
    'Arundathi Institute of Medical Sciences · Dundigal, Hyderabad · Generated ' +
    safeGeneratedAt.toISOString().replace('T', ' ').slice(0, 16) +
    ' UTC'
  subtitle.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FF52606D' } }
  subtitle.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }
  subtitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F1F8' } }
  sheet.getRow(2).height = 18
  sheet.getRow(3).height = 6

  // Header row
  const headerRow = sheet.getRow(4)
  headerRow.height = 30

  const headerCells: Array<{ column: number; label: string; fill: string }> = [
    { column: 1, label: 'Date', fill: 'FF0B2A49' },
    { column: 2, label: 'Day', fill: 'FF0B2A49' },
    ...STAT_METRICS.map((metric, index) => ({
      column: index + 3,
      label: metric.label,
      fill: groupFill(metric.group),
    })),
  ]

  for (const { column, label, fill } of headerCells) {
    const cell = headerRow.getCell(column)
    cell.value = label
    cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FFFFFFFF' } }
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: fill } }
    cell.alignment = {
      vertical: 'middle',
      horizontal: column <= 2 ? 'left' : 'center',
      wrapText: true,
    }
    cell.border = {
      top: { style: 'thin', color: { argb: 'FFFFFFFF' } },
      left: { style: 'thin', color: { argb: 'FFFFFFFF' } },
      bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } },
      right: { style: 'thin', color: { argb: 'FFFFFFFF' } },
    }
  }

  if (entries.length > 0) {
    sheet.autoFilter = {
      from: { row: 4, column: 1 },
      to: { row: dataEnd, column: lastColumn },
    }
  }

  // Data rows
  const totals = {} as StatValues
  for (const key of STAT_KEYS) totals[key] = 0

  entries.forEach((entry, index) => {
    const rowIndex = dataStart + index
    const row = sheet.getRow(rowIndex)
    row.height = 20

    const dateCell = row.getCell(1)
    dateCell.value = startOfDay(entry.date)
    dateCell.numFmt = 'yyyy-mm-dd'
    dateCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }

    const dayCell = row.getCell(2)
    dayCell.value = {
      formula: `TEXT($A${rowIndex},"ddd")`,
      result: dayName(entry.date),
    }
    dayCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }

    STAT_METRICS.forEach((metric, metricIndex) => {
      const value = entry.stats[metric.key]
      totals[metric.key] += value
      const cell = row.getCell(metricIndex + 3)
      cell.value = value
      cell.numFmt = '#,##0'
      cell.alignment = { vertical: 'middle', horizontal: 'right' }
    })

    for (let column = 1; column <= lastColumn; column += 1) {
      const cell = row.getCell(column)
      cell.font = { name: 'Arial', size: 10 }
      cell.border = {
        top: { style: 'hair', color: { argb: 'FFD9E2EC' } },
        left: { style: 'hair', color: { argb: 'FFD9E2EC' } },
        bottom: { style: 'hair', color: { argb: 'FFD9E2EC' } },
        right: { style: 'hair', color: { argb: 'FFD9E2EC' } },
      }
      if (index % 2 === 1) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF7FAFC' } }
      }
    }
  })

  if (entries.length > 0) {
    // TOTAL row — live formulas with cached results.
    const total = sheet.getRow(totalRow)
    total.height = 22
    sheet.mergeCells(totalRow, 1, totalRow, 2)
    const totalLabel = sheet.getCell(totalRow, 1)
    totalLabel.value = 'TOTAL'
    totalLabel.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FF0B2A49' } }
    totalLabel.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }

    STAT_METRICS.forEach((metric, metricIndex) => {
      const column = metricIndex + 3
      const letter = columnLetter(column)
      const cell = sheet.getCell(totalRow, column)
      cell.value = {
        formula: `SUM(${letter}${dataStart}:${letter}${dataEnd})`,
        result: totals[metric.key],
      }
      cell.numFmt = '#,##0'
      cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FF0B2A49' } }
      cell.alignment = { vertical: 'middle', horizontal: 'right' }
    })

    // AVERAGE / DAY row — live formulas with cached results.
    const average = sheet.getRow(averageRow)
    average.height = 20
    sheet.mergeCells(averageRow, 1, averageRow, 2)
    const averageLabel = sheet.getCell(averageRow, 1)
    averageLabel.value = 'AVERAGE / DAY'
    averageLabel.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FF52606D' } }
    averageLabel.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }

    STAT_METRICS.forEach((metric, metricIndex) => {
      const column = metricIndex + 3
      const letter = columnLetter(column)
      const cell = sheet.getCell(averageRow, column)
      cell.value = {
        formula: `IFERROR(AVERAGE(${letter}${dataStart}:${letter}${dataEnd}),0)`,
        result: totals[metric.key] / entries.length,
      }
      cell.numFmt = '#,##0.0'
      cell.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FF52606D' } }
      cell.alignment = { vertical: 'middle', horizontal: 'right' }
    })

    for (const rowIndex of [totalRow, averageRow]) {
      for (let column = 1; column <= lastColumn; column += 1) {
        const cell = sheet.getCell(rowIndex, column)
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: rowIndex === totalRow ? 'FFE8F1F8' : 'FFF7FAFC' },
        }
        cell.border = {
          top: { style: 'thin', color: { argb: rowIndex === totalRow ? 'FF0B2A49' : 'FFD9E2EC' } },
          bottom: { style: 'hair', color: { argb: 'FFD9E2EC' } },
        }
      }
    }
  }

  // Notes / documentation sheet
  const notes = workbook.addWorksheet('Notes', {
    views: [{ state: 'frozen', ySplit: 3 }],
    pageSetup: {
      orientation: 'portrait',
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      paperSize: 9,
    },
  })
  notes.columns = [
    { width: 26 },
    { width: 96 },
  ]

  notes.mergeCells('A1:B1')
  const notesTitle = notes.getCell('A1')
  notesTitle.value = 'About this workbook'
  notesTitle.font = { name: 'Arial', size: 16, bold: true, color: { argb: 'FFFFFFFF' } }
  notesTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0B2A49' } }
  notesTitle.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }
  notes.getRow(1).height = 30

  notes.mergeCells('A2:B2')
  const notesSubtitle = notes.getCell('A2')
  notesSubtitle.value =
    'Generated automatically from public/data/stats-history.json — do not edit the Daily Statistics cells by hand.'
  notesSubtitle.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FF52606D' } }
  notesSubtitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE8F1F8' } }
  notesSubtitle.alignment = { vertical: 'middle', horizontal: 'left', indent: 1, wrapText: true }
  notes.getRow(2).height = 30

  const facts: Array<[string, string]> = [
    ['Institution', 'Arundathi Institute of Medical Sciences (AIMS), Dundigal, Hyderabad'],
    ['Purpose', 'Durable day-by-day record of the figures shown in the hospital statistics ticker and Analysis → Today.'],
    ['Source of truth', 'public/data/stats-history.json (committed to the repository).'],
    ['Days recorded', String(entries.length)],
    ['First day', entries[0]?.date ?? '—'],
    ['Latest day', entries[entries.length - 1]?.date ?? '—'],
    ['Last updated', history.updatedAt ?? '—'],
    [
      'How to add a day',
      'Run the site locally with `npm run dev`, open the hospital stats editor (pencil), enter the figures and click "Publish to website". This appends the day, regenerates this workbook and commits both.',
    ],
    ['Regenerate manually', 'Run `npm run stats:export` in the project folder.'],
    ['Formulas', 'The TOTAL and AVERAGE / DAY rows use live SUM/AVERAGE formulas; the Day column uses TEXT(). Cached results are stored so values are visible before recalculation.'],
  ]

  facts.forEach(([label, value], index) => {
    const rowIndex = 4 + index
    const row = notes.getRow(rowIndex)
    row.height = index === 0 || index === 6 ? 32 : 22

    const labelCell = row.getCell(1)
    labelCell.value = label
    labelCell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FF0B2A49' } }
    labelCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF7FAFC' } }
    labelCell.alignment = { vertical: 'top', horizontal: 'left', indent: 1 }
    labelCell.border = {
      top: { style: 'hair', color: { argb: 'FFD9E2EC' } },
      bottom: { style: 'hair', color: { argb: 'FFD9E2EC' } },
      left: { style: 'hair', color: { argb: 'FFD9E2EC' } },
      right: { style: 'hair', color: { argb: 'FFD9E2EC' } },
    }

    const valueCell = row.getCell(2)
    valueCell.value = value
    valueCell.font = { name: 'Arial', size: 10 }
    valueCell.alignment = { vertical: 'top', horizontal: 'left', wrapText: true, indent: 1 }
    valueCell.border = {
      top: { style: 'hair', color: { argb: 'FFD9E2EC' } },
      bottom: { style: 'hair', color: { argb: 'FFD9E2EC' } },
      left: { style: 'hair', color: { argb: 'FFD9E2EC' } },
      right: { style: 'hair', color: { argb: 'FFD9E2EC' } },
    }
  })

  const guideStart = 4 + facts.length + 2
  notes.mergeCells(guideStart, 1, guideStart, 2)
  const guideTitle = notes.getCell(guideStart, 1)
  guideTitle.value = 'Metric guide'
  guideTitle.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } }
  guideTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0B2A49' } }
  guideTitle.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }

  STAT_METRICS.forEach((metric, index) => {
    const rowIndex = guideStart + 1 + index
    const row = notes.getRow(rowIndex)
    const keyCell = row.getCell(1)
    keyCell.value = metric.key
    keyCell.font = { name: 'Arial', size: 9 }
    keyCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }
    const labelCell = row.getCell(2)
    labelCell.value = `${metric.label}  ·  ${metric.group}  ·  column ${columnLetter(index + 3)}`
    labelCell.font = { name: 'Arial', size: 9 }
    labelCell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }
  })

  const buffer = await workbook.xlsx.writeBuffer()
  return Buffer.from(buffer as ArrayBuffer)
}

/** Writes `STATISTICS.xlsx` at the project root and returns the bytes. */
export async function writeStatisticsWorkbook(
  root: string,
  history: StatsHistory
): Promise<Buffer> {
  const buffer = await buildStatisticsWorkbook(history)
  const file = path.join(root, EXCEL_FILE)
  await fsp.mkdir(path.dirname(file), { recursive: true })
  await fsp.writeFile(file, buffer)
  return buffer
}

/** True when the workbook exists and is non-empty. */
export function statisticsWorkbookExists(root: string): boolean {
  try {
    return fs.statSync(path.join(root, EXCEL_FILE)).size > 0
  } catch {
    return false
  }
}
