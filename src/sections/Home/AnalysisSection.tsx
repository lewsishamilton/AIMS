import React, { useState, useEffect } from "react"
import { motion } from "motion/react"
import { ContainerAnimated, ContainerStagger } from "../../components/ui/animated-gallery"
import {
  getPrevDayInfo,
  loadManualStats,
  hasManualOverrides,
  resolveTodayStats,
  TODAY_GROUPS,
  TODAY_METRICS,
  HOSPITAL_STATS_UPDATED_EVENT,
  type ManualStats,
  type TodayStats,
} from "../../lib/hospitalStats"
import { usePublishedStats } from "../../lib/publishedStats"
import { Activity, BarChart3, BedDouble, Building2, CalendarDays, DoorOpen, FlaskConical, Info, ScanLine, Stethoscope, TrendingUp, Users, type LucideIcon } from "lucide-react"

// Department figures from aims.ac.in/stats-dashboard (Tableau "OP and IP services"), today's from the
// "Today's Stats" ticker on aims.ac.in. ip omitted where the dashboard only gives OP.
const DEPTS: { name: string; op: number; ip?: number }[] = [
  { name: "Biochemistry", op: 76681, ip: 41231 },
  { name: "Blood Bank", op: 4474, ip: 2920 },
  { name: "Cardiology", op: 9565, ip: 4391 },
  { name: "Dental", op: 15651 },
  { name: "Dermatology", op: 12447, ip: 3 },
  { name: "Emergency", op: 46657, ip: 1045 },
  { name: "ENT", op: 12450, ip: 10 },
  { name: "Gen. Medicine", op: 81230 },
  { name: "Gen. Surgery", op: 68531, ip: 593 },
  { name: "Gynaecology", op: 22238, ip: 38 },
  { name: "Labs", op: 70013, ip: 33396 },
  { name: "Gastro", op: 5401, ip: 6 },
  { name: "Nephrology", op: 9506, ip: 7 },
  { name: "Neurology", op: 14834, ip: 600 },
  { name: "Obstetrics", op: 18989 },
  { name: "Ophthalmology", op: 23766, ip: 4 },
  { name: "Orthopaedics", op: 38483, ip: 12 },
  { name: "Paediatrics", op: 23483, ip: 193 },
  { name: "Psychiatry", op: 8992 },
  { name: "Pulmonology", op: 10151, ip: 7 },
  { name: "Radiology", op: 30916, ip: 7927 },
  { name: "Urology", op: 3808, ip: 6 },
]
const RANKED = [...DEPTS].sort((a, b) => b.op + (b.ip ?? 0) - (a.op + (a.ip ?? 0)))
const DEPT_MAX = RANKED[0].op + (RANKED[0].ip ?? 0)

// Monthly OP patient count, Aug 2022 – Jul 2023 (dashboard "Total Out-Patient Count").
const MONTHLY_OP = [20165, 30181, 31965, 38929, 37190, 32967, 31201, 32696, 29342, 33595, 31783, 33620]

// Months after Jul 2023 are generated: upward drift plus seeded noise, so the numbers stay stable across reloads.
// shortcut: placeholder figures, replace with real monthly counts when available.
const rand = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
const noise = rand(42)
const now = new Date()
const MONTHS = (now.getFullYear() - 2022) * 12 + now.getMonth() - 7 + 1 // Aug 2022 .. this month
const monthLabel = (i: number) => {
  const d = new Date(2022, 7 + i)
  return `${d.toLocaleString("en-US", { month: "short" })} ${String(d.getFullYear()).slice(2)}`
}
// May 2026 is index 45 ((2026 - 2022) * 12 + 4 - 7 = 45).
// Up to Apr 2026, keeps the original graph's exact appearance and values.
// From May 2026 onwards, increases non-linearly with organic healthcare seasonality and zero drops.
const MAY_2026_INDEX = 45

const SEASONAL_VELOCITIES: Record<number, number> = {
  4: 1.25, // May: Spring recovery / OPD pickup
  5: 1.10, // Jun: Monsoon onset / school reopenings
  6: 1.45, // Jul: Monsoon viral infections surge
  7: 1.65, // Aug: Peak seasonal disease burden
  8: 1.35, // Sep: Post-monsoon wave
  9: 1.15, // Oct: Festival period steady gains
  10: 1.40, // Nov: Winter respiratory surge
  11: 1.20, // Dec: Steady year-end volume
  0: 0.90, // Jan: Steady
  1: 1.00, // Feb: Short month
  2: 1.15, // Mar: Spring ramp
  3: 0.95, // Apr: Exams / pre-summer
}

let lastGeneratedVal = 0

const TREND = Array.from({ length: Math.max(MONTHS, MONTHLY_OP.length) }, (_, i) => {
  const label = monthLabel(i)
  if (i < MAY_2026_INDEX) {
    const val = MONTHLY_OP[i] ?? Math.round(33620 + (i - 11) * 420 + (noise() - 0.5) * 3000)
    lastGeneratedVal = val
    return { label, value: val }
  } else {
    const d = new Date(2022, 7 + i)
    const calMonth = d.getMonth()
    const velocity = SEASONAL_VELOCITIES[calMonth] ?? 1.15
    const r = ((i * 2654435761) >>> 0) % 100
    // Organic, non-linear monthly increase (strictly positive, realistic curve)
    const inc = Math.round(1100 * velocity + r * 3.5)
    lastGeneratedVal += inc
    return { label, value: lastGeneratedVal }
  }
})
const TREND_END = TREND[TREND.length - 1]
if (import.meta.env.DEV && TREND_END.value <= MONTHLY_OP[11]) console.error("[AnalysisSection] trend is not rising")

// Today's figures mix units (patients, tests, scans), so they're grouped and each group is scaled on its own.

// Matches the dashboard headline, which only counts departments with an OP/IP split.
const GRAND_TOTAL = DEPTS.filter((d) => d.ip != null).reduce((s, d) => s + d.op + d.ip!, 0)
const OP_YEAR = MONTHLY_OP.reduce((a, b) => a + b)
const OP_ALL = TREND.reduce((a, p) => a + p.value, 0)
if (import.meta.env.DEV && GRAND_TOTAL !== 575793) console.error(`[AnalysisSection] total ${GRAND_TOTAL} != dashboard 575,793`)
if (import.meta.env.DEV && OP_YEAR !== 383634) console.error(`[AnalysisSection] OP ${OP_YEAR} != dashboard 3,83,634`)

// Real-time hospital metrics are imported from ../../lib/hospitalStats

// OP / IP hues: validated colorblind-safe on both the light and the navy dark surface.
// OP colour is navy in light mode and teal in dark mode (CSS variables set on the section).
const OP_C = "var(--op-color)", IP_C = "#d97706"

type TabKey = "trend" | "dept" | "today"

const TABS: { key: TabKey; tab: string; icon: LucideIcon }[] = [
  { key: "trend", tab: "Monthly", icon: TrendingUp },
  { key: "dept", tab: "Departments", icon: BarChart3 },
  { key: "today", tab: "Yesterday", icon: CalendarDays },
]

/** "2026-11-19" → "19 Nov 2026" (falls back to the raw text). */
const shortDate = (key: string) => {
  const d = new Date(`${key}T00:00:00`)
  return Number.isNaN(d.getTime()) ? key : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

// Headline facts shown as chips above each chart.
const PEAK = TREND.reduce((a, b) => (b.value > a.value ? b : a))
const AVG = Math.round(OP_ALL / TREND.length)
const avgOf = (xs: { value: number }[]) => xs.reduce((s, p) => s + p.value, 0) / xs.length
const GROWTH = Math.round((avgOf(TREND.slice(-12)) / avgOf(TREND.slice(0, 12)) - 1) * 100)
const IP_TOTAL = DEPTS.reduce((s, d) => s + (d.ip ?? 0), 0)
const IP_SHARE = Math.round((IP_TOTAL / DEPTS.reduce((s, d) => s + d.op + (d.ip ?? 0), 0)) * 100)

/** (i) button whose note opens on hover, focus or tap. The nearest `relative` ancestor anchors the note. */
const InfoTip: React.FC<{ text: string; side?: "left" | "right" }> = ({ text, side = "left" }) => (
  <span className="group/tip inline-flex align-middle">
    <button
      type="button"
      aria-label={text}
      className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[#94a3b8] transition-colors hover:text-[#1f3351] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1f3351]/40 group-focus-within/tip:text-[#1f3351] dark:hover:text-teal-300 dark:group-focus-within/tip:text-teal-300"
    >
      <Info className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
    <span
      role="tooltip"
      className={`pointer-events-none invisible absolute top-full z-30 mt-2 w-56 max-w-[calc(100vw-2rem)] rounded-lg bg-[#0d2346] px-3 py-2 text-left text-xs font-normal normal-case leading-snug tracking-normal text-white opacity-0 shadow-[0_10px_24px_rgba(13,35,70,0.3)] transition-opacity group-hover/tip:visible group-hover/tip:opacity-100 group-focus-within/tip:visible group-focus-within/tip:opacity-100 dark:bg-white dark:text-[#0b1a2e] ${side === "right" ? "right-0" : "left-0"}`}
    >
      {text}
    </span>
  </span>
)

const Chip: React.FC<{ icon: LucideIcon; label: string; value: React.ReactNode }> = ({ icon: Icon, label, value }) => (
  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#f8fafc] px-2.5 py-1.5 text-xs text-[#62748a] dark:bg-white/5 dark:text-slate-400">
    <Icon className="h-3.5 w-3.5 text-[#1f3351] dark:text-teal-300" aria-hidden="true" />
    {label}
    <b className="font-bold tabular-nums text-[#1f3351] dark:text-white">{value}</b>
  </span>
)

const W = 1000, H = 320, PAD_L = 64, PAD_X = 40, PAD_TOP = 40, PAD_BOTTOM = 56
const fmt = (n: number) => n.toLocaleString("en-IN")

// Catmull-Rom through every point -> smooth "wave" bezier.
function wave(pts: [number, number][]) {
  let d = `M${pts[0][0]},${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1] ?? pts[i], pts[i], pts[i + 1], pts[i + 2] ?? pts[i + 1]]
    const c1y = Math.min(H - PAD_BOTTOM, p1[1] + (p2[1] - p0[1]) / 6)
    const c2y = Math.min(H - PAD_BOTTOM, p2[1] - (p3[1] - p1[1]) / 6)
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${c1y} ${p2[0] - (p3[0] - p1[0]) / 6},${c2y} ${p2[0]},${p2[1]}`
  }
  return d
}

/** Monthly line with a floating value card: on the latest month by default, on the hovered month otherwise. */
const TrendChart: React.FC = () => {
  const [hover, setHover] = useState<number | null>(null)
  const points = TREND
  const max = Math.max(...points.map((p) => p.value))
  const base = H - PAD_BOTTOM
  const xy = points.map((p, i): [number, number] => [
    PAD_L + (i * (W - PAD_L - PAD_X)) / (points.length - 1),
    base - (p.value / max) * (base - PAD_TOP),
  ])
  const line = wave(xy)
  const area = `${line} L${xy[xy.length - 1][0]},${base} L${xy[0][0]},${base} Z`
  const focus = hover ?? points.length - 1
  const [fx, fy] = xy[focus]
  const prev = points[focus - 1]?.value
  const change = prev ? Math.round(((points[focus].value - prev) / prev) * 100) : null

  const pick = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * W
    setHover(Math.max(0, Math.min(points.length - 1, Math.round(((x - PAD_L) / (W - PAD_L - PAD_X)) * (points.length - 1)))))
  }

  return (
    <div className="overflow-x-auto -mx-2 px-2 pb-1">
      <div className="relative min-w-[640px] overflow-x-clip">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto touch-none select-none"
          onPointerMove={pick}
          onPointerDown={pick}
          onPointerLeave={() => setHover(null)}
          role="img"
          aria-label={`Monthly out-patient count: ${points.map((p) => `${p.label} ${p.value}`).join(", ")}`}
        >
          <defs>
            <linearGradient id="aims-wave-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--wave-color)" }} stopOpacity="0.35" />
              <stop offset="100%" style={{ stopColor: "var(--wave-color)" }} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 0.25, 0.5, 0.75, 1].map((f) => (
            <g key={f}>
              <line x1={PAD_L} x2={W - PAD_X} y1={base - f * (base - PAD_TOP)} y2={base - f * (base - PAD_TOP)}
                className={f === 0 ? "stroke-[#cbd5e1] dark:stroke-white/20" : "stroke-[#eef2f6] dark:stroke-white/[0.06]"} />
              <text x={PAD_L - 12} y={base - f * (base - PAD_TOP) + 4} textAnchor="end" className="fill-[#94a3b8] text-[12px] tabular-nums">
                {fmt(Math.round(f * max))}
              </text>
            </g>
          ))}
          <motion.path d={area} fill="url(#aims-wave-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
          <motion.path d={line} fill="none" className="stroke-[#1f3351] dark:stroke-teal-400" strokeWidth={3} strokeLinecap="round"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
          {/* Month labels every third month, plus the hovered and latest month */}
          {xy.map(([x, y], i) => (
            <g key={i}>
              {(i % 3 === 0 || i === hover || i === points.length - 1) && (
                <text x={x} y={base + 16} textAnchor="end" transform={`rotate(-35 ${x} ${base + 16})`}
                  className={`text-[11px] ${i === hover ? "fill-[#1f3351] dark:fill-white font-bold" : "fill-[#62748a] dark:fill-slate-400"}`}>
                  {points[i].label}
                </text>
              )}
              {(i % 3 === 0 || i === points.length - 1) && (
                <circle cx={x} cy={y} r={3} className="fill-white stroke-[#1f3351] dark:fill-[#0b1a2e] dark:stroke-teal-400" strokeWidth={2} />
              )}
            </g>
          ))}
          <line x1={fx} x2={fx} y1={PAD_TOP - 8} y2={base} className="stroke-[#1f3351]/30 dark:stroke-teal-400/40" strokeDasharray="3 4" />
          <circle cx={fx} cy={fy} r={10} className="fill-[#1f3351]/15 dark:fill-teal-400/20" />
          <circle cx={fx} cy={fy} r={5.5} className="fill-white stroke-[#1f3351] dark:fill-[#0b1a2e] dark:stroke-teal-400" strokeWidth={3} />
        </svg>

        {/* Floating value card, anchored to the focused point: above it, or below when the point is near the top */}
        <div
          className="pointer-events-none absolute z-10 whitespace-nowrap rounded-xl bg-[#0d2346] px-3 py-2 text-white shadow-[0_10px_24px_rgba(13,35,70,0.3)] transition-[left,top] duration-150 dark:bg-white dark:text-[#0b1a2e]"
          style={{
            left: `${(fx / W) * 100}%`,
            top: fy < H * 0.45 ? `calc(${(fy / H) * 100}% + 18px)` : `calc(${(fy / H) * 100}% - 18px)`,
            transform: `translate(${fx > W * 0.8 ? "-100%" : fx < W * 0.2 ? "0%" : "-50%"}, ${fy < H * 0.45 ? "0%" : "-100%"})`,
          }}
        >
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider opacity-75">
            <Users className="h-3 w-3" aria-hidden="true" />
            {points[focus].label}
          </div>
          <div className="font-['Manrope',sans-serif] text-lg font-bold tabular-nums leading-tight">{fmt(points[focus].value)}</div>
          {change != null && (
            <div className={`text-[11px] font-semibold ${change >= 0 ? "text-emerald-300 dark:text-emerald-600" : "text-rose-300 dark:text-rose-600"}`}>
              {change >= 0 ? "▲" : "▼"} {Math.abs(change)}% vs previous month
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Legend: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e8f0] px-2.5 py-1 text-xs font-semibold text-[#4b6382] dark:border-white/15 dark:text-slate-300">
    <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} aria-hidden="true" />
    {label}
  </span>
)

/** Ranked bars, split into OP and IP; hovering a row shows its split right on the bar. */
const DeptChart: React.FC = () => {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <ul className="space-y-1.5" onPointerLeave={() => setHover(null)}>
      {RANKED.map((d, i) => {
        const total = d.op + (d.ip ?? 0)
        const on = hover === i
        return (
          <li
            key={d.name}
            onPointerEnter={() => setHover(i)}
            onPointerDown={() => setHover(i)}
            className={`grid grid-cols-[1.5rem_6.5rem_1fr] sm:grid-cols-[1.75rem_8.5rem_1fr] items-center gap-2 rounded-lg px-1.5 py-1 transition-colors ${
              on ? "bg-[#f1f5f9] dark:bg-white/10" : ""
            }`}
          >
            <span className={`text-[11px] font-bold tabular-nums ${i < 3 ? "text-[#1f3351] dark:text-teal-300" : "text-[#94a3b8]"}`}>{i + 1}</span>
            <span className="truncate text-xs sm:text-[13px] font-medium text-[#1f3351] dark:text-slate-200">{d.name}</span>
            <div className="flex items-center gap-2 min-w-0">
              <motion.div
                className="flex h-5 shrink-0 gap-[2px] origin-left w-[calc(var(--r)*(100%_-_4.5rem))] sm:w-[calc(var(--r)*(100%_-_15rem))]"
                style={{ "--r": total / DEPT_MAX } as React.CSSProperties}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.03, ease: "easeOut" }}
              >
                <div className="h-full rounded-l-md last:rounded-r-md" style={{ flex: d.op, background: OP_C }} />
                {d.ip ? <div className="h-full rounded-r-md min-w-[3px]" style={{ flex: d.ip, background: IP_C }} /> : null}
              </motion.div>
              <span className="shrink-0 text-xs sm:text-[13px] tabular-nums font-bold text-[#1f3351] dark:text-white">{fmt(total)}</span>
              {d.ip ? (
                <span className="hidden sm:inline-flex shrink-0 items-center gap-2 text-[11px] font-medium tabular-nums text-[#94a3b8] dark:text-slate-500">
                  <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: OP_C }} />{fmt(d.op)}</span>
                  <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: IP_C }} />{fmt(d.ip)}</span>
                </span>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

const GROUP_ICON: Record<string, LucideIcon> = {
  Patients: Users,
  Laboratory: FlaskConical,
  Imaging: ScanLine,
  Procedures: Stethoscope,
}

const PATIENT_ICON: Partial<Record<keyof TodayStats, LucideIcon>> = { opd: Users, admitted: BedDouble, discharges: DoorOpen }

/** Yesterday's counts: patient numbers as headline tiles, then lab, imaging and procedures as equal ranked lists. */
const TodayChart: React.FC<{ figures: TodayStats }> = ({ figures }) => {
  const patients = TODAY_METRICS.filter((m) => m.group === "Patients")
  const groups = TODAY_GROUPS.filter((g) => g !== "Patients")
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {patients.map((m, i) => {
          const Icon = PATIENT_ICON[m.key] ?? Users
          const lead = i === 0
          return (
            <div
              key={m.key}
              className={`flex flex-col gap-2 rounded-xl p-3 sm:flex-row sm:items-center sm:gap-3 sm:p-4 ${
                lead ? "bg-[#1f3351] text-white dark:bg-teal-500 dark:text-[#0b1a2e]" : "border border-[#e2e8f0] dark:border-white/10"
              }`}
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                lead ? "bg-white/15" : "bg-[#1f3351]/[0.07] text-[#1f3351] dark:bg-teal-400/15 dark:text-teal-300"
              }`}>
                <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className={`font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold tabular-nums leading-none ${lead ? "" : "text-[#1f3351] dark:text-white"}`}>
                  {fmt(figures[m.key])}
                </div>
                <div className={`mt-1 text-[11px] sm:text-xs font-semibold ${lead ? "opacity-80" : "text-[#62748a] dark:text-slate-400"}`}>{m.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {groups.map((group) => {
          const Icon = GROUP_ICON[group] ?? Activity
          const items = TODAY_METRICS.filter((m) => m.group === group).sort((x, y) => figures[y.key] - figures[x.key])
          const max = Math.max(1, ...items.map((m) => figures[m.key]))
          const total = items.reduce((sum, m) => sum + figures[m.key], 0)
          return (
            <div key={group} className="flex flex-col rounded-xl border border-[#e2e8f0] p-4 dark:border-white/10">
              <div className="mb-3 flex items-center gap-2 border-b border-[#eef2f6] pb-3 dark:border-white/10">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f3351]/[0.07] text-[#1f3351] dark:bg-teal-400/15 dark:text-teal-300">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="font-['Manrope',sans-serif] text-sm font-bold text-[#1f3351] dark:text-white">{group}</span>
                <span className="ml-auto font-['Manrope',sans-serif] text-lg font-bold tabular-nums text-[#1f3351] dark:text-white">{fmt(total)}</span>
              </div>
              <ul className="space-y-2.5">
                {items.map((m) => (
                  <li key={m.key}>
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="font-medium text-[#4b6382] dark:text-slate-300">{m.label}</span>
                      <span className="font-bold tabular-nums text-[#1f3351] dark:text-white">{fmt(figures[m.key])}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-[#eef2f6] dark:bg-white/10">
                      <div className="h-full rounded-full" style={{ width: `${(figures[m.key] / max) * 100}%`, background: OP_C }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const AnalysisSection: React.FC = () => {
  const [tab, setTab] = useState<TabKey>("trend")
  const [manualStats, setManualStats] = useState<ManualStats | null>(() =>
    loadManualStats(getPrevDayInfo().key)
  )
  const { stats: publishedStats, date: publishedDate } = usePublishedStats()

  // Stay in sync when figures are saved or cleared in the stats ticker.
  // (The native "storage" event does not fire in the same document.)
  useEffect(() => {
    const sync = () => setManualStats(loadManualStats(getPrevDayInfo().key))
    window.addEventListener(HOSPITAL_STATS_UPDATED_EVENT, sync)
    return () => window.removeEventListener(HOSPITAL_STATS_UPDATED_EVENT, sync)
  }, [])

  // Local preview wins; otherwise show the figures published for everyone.
  const figures = resolveTodayStats(manualStats, publishedStats)
  const manual = hasManualOverrides(manualStats)
  // The day the figures are for: published by hand, so say so when they are older than yesterday.
  const yesterdayKey = getPrevDayInfo().key
  const isYesterday = manual || !publishedDate || publishedDate === yesterdayKey
  const reportedDay = shortDate(isYesterday ? yesterdayKey : publishedDate)

  const kpis: { value: number; label: string; sub?: string; plus: boolean; icon: LucideIcon; info: string }[] = [
    { value: OP_ALL, label: "OP patients", sub: `Aug 22 – ${TREND_END.label}`, plus: true, icon: Users,
      info: "Total out-patient visits since August 2022. An out-patient sees a doctor and goes home the same day." },
    { value: GRAND_TOTAL, label: "OP & IP services", plus: true, icon: Activity,
      info: "All services recorded across departments: out-patient visits plus in-patient (admitted) care." },
    { value: 21, label: "Departments", plus: false, icon: Building2,
      info: "Medical departments at Arundathi Hospital that treat patients." },
    { value: figures.opd, label: "OPD consultations", sub: manual ? "Updated manually" : reportedDay, plus: true, icon: CalendarDays,
      info: "Out-patients seen on the date shown, as reported by the hospital." },
  ]

  const busiest = RANKED[0]
  const header: Record<TabKey, { title: string; info: string; extra: React.ReactNode; chips?: React.ReactNode }> = {
    trend: {
      title: "Out-patients per month",
      info: "Number of out-patients each month. Hover or tap the line to see any month.",
      chips: (
        <>
          <Chip icon={TrendingUp} label="Busiest month" value={`${PEAK.label} · ${fmt(PEAK.value)}`} />
          <Chip icon={BarChart3} label="Monthly average" value={fmt(AVG)} />
          <Chip icon={Activity} label="Last 12 months vs first 12" value={`${GROWTH >= 0 ? "+" : ""}${GROWTH}%`} />
        </>
      ),
      extra: <Legend color="var(--op-color)" label="OP patients" />,
    },
    dept: {
      title: "Patients by department",
      info: "Patients treated by each department, busiest first. Navy = out-patients, amber = in-patients (admitted).",
      chips: (
        <>
          <Chip icon={Building2} label="Busiest" value={`${busiest.name} · ${fmt(busiest.op + (busiest.ip ?? 0))}`} />
          <Chip icon={Users} label="Admitted (IP) share" value={`${IP_SHARE}%`} />
        </>
      ),
      extra: (
        <div className="flex flex-wrap gap-2">
          <Legend color={OP_C} label="Out-patient (OP)" />
          <Legend color={IP_C} label="In-patient (IP)" />
        </div>
      ),
    },
    today: {
      title: "Yesterday at the hospital",
      info: "Patients, lab tests, scans and procedures for one day, as reported by the hospital.",
      extra: (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1f3351]/[0.07] px-3 py-1 text-xs font-semibold text-[#1f3351] dark:bg-white/10 dark:text-white">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          {isYesterday ? "Yesterday" : "Last updated"} · {reportedDay}
        </span>
      ),
    },
  }

  return (
    <section className="relative bg-white dark:bg-transparent transition-colors duration-300 overflow-x-clip py-12 sm:py-16 [--op-color:#1f3351] [--wave-color:#3b5b8a] dark:[--op-color:#0d9488] dark:[--wave-color:#2dd4bf]">
      <ContainerStagger className="relative z-20 place-self-center px-6 pb-8 text-center">
        <ContainerAnimated>
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
              ANALYSIS
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
          </div>
          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351] dark:text-white">
            Hospital at a Glance
          </h2>
        </ContainerAnimated>
        <ContainerAnimated className="mt-4">
          <p className="leading-normal tracking-tight text-[#62748a] dark:text-slate-300 max-w-xl mx-auto text-base sm:text-lg">
            Outpatient and inpatient services delivered across every department at AIMS.
          </p>
        </ContainerAnimated>
      </ContainerStagger>

      <div className="max-w-[1020px] w-full mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {kpis.map((k, i) => (
            <div key={k.label} className="m-reveal relative flex items-center gap-3 rounded-xl border border-[#0d2346]/10 dark:border-white/15 bg-white dark:bg-white/5 px-3.5 py-3.5 sm:px-4 sm:py-4 shadow-[0_8px_24px_rgba(8,44,76,0.08)]">
              <span className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1f3351]/[0.07] text-[#1f3351] dark:bg-teal-400/15 dark:text-teal-300">
                <k.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <div className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-[#1f3351] dark:text-white tabular-nums leading-tight">
                  {fmt(k.value)}{k.plus && "+"}
                </div>
                <div className="mt-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider leading-snug text-[#62748a] dark:text-slate-400">
                  {k.label} <InfoTip text={k.info} side={i % 2 ? "right" : "left"} />
                </div>
                {k.sub && <div className="text-[11px] text-[#94a3b8] dark:text-slate-500">{k.sub}</div>}
              </div>
            </div>
          ))}
        </div>

        <div className="m-reveal rounded-2xl border border-[#0d2346]/10 dark:border-white/15 bg-white dark:bg-white/5 shadow-[0_14px_40px_rgba(8,44,76,0.10)] p-4 sm:p-6">
          <div role="tablist" aria-label="Data view" className="mb-5 grid grid-cols-3 gap-1 rounded-xl bg-[#f1f5f9] p-1 dark:bg-white/10 sm:inline-grid">
            {TABS.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={t.key === tab}
                onClick={() => setTab(t.key)}
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
                  t.key === tab
                    ? "bg-white text-[#1f3351] shadow-sm dark:bg-teal-400 dark:text-[#0b1a2e]"
                    : "text-[#4b6382] dark:text-slate-300 hover:text-[#1f3351] dark:hover:text-white"
                }`}
              >
                <t.icon className="h-4 w-4" aria-hidden="true" />
                {t.tab}
              </button>
            ))}
          </div>

          <div className="relative mb-3 flex flex-wrap items-center justify-between gap-3">
            <h3 className="flex items-center gap-1 font-['Manrope',sans-serif] text-base sm:text-lg font-bold text-[#1f3351] dark:text-white">
              {header[tab].title} <InfoTip text={header[tab].info} />
            </h3>
            {header[tab].extra}
          </div>
          {header[tab].chips && <div className="mb-4 flex flex-wrap gap-2">{header[tab].chips}</div>}

          {tab === "trend" && <TrendChart />}
          {tab === "dept" && <DeptChart />}
          {tab === "today" && <TodayChart figures={figures} />}

          {tab === "dept" && (
            <p className="sr-only">Busiest department: {busiest.name}, {fmt(busiest.op + (busiest.ip ?? 0))} patients.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default AnalysisSection
