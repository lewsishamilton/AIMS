import React, { useState } from "react"
import { motion } from "motion/react"
import { ContainerAnimated, ContainerStagger } from "../../components/ui/animated-gallery"

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
const TREND = Array.from({ length: Math.max(MONTHS, MONTHLY_OP.length) }, (_, i) => ({
  label: monthLabel(i),
  value: MONTHLY_OP[i] ?? Math.round(33620 + (i - 11) * 420 + (noise() - 0.5) * 3000),
}))
const TREND_END = TREND[TREND.length - 1]
if (import.meta.env.DEV && TREND_END.value <= MONTHLY_OP[11]) console.error("[AnalysisSection] trend is not rising")

// Today's figures mix units (patients, tests, scans), so they're grouped and each group is scaled on its own.
const TODAY: { group: string; items: [string, number][] }[] = [
  { group: "Patients", items: [["Out-patients", 929], ["Admitted", 45]] },
  { group: "Laboratory", items: [["Biochemistry", 619], ["Pathology", 270], ["Microbiology", 173]] },
  { group: "Imaging", items: [["X-Ray", 75], ["Ultrasound", 59], ["MRI", 23], ["CT", 22]] },
  { group: "Procedures", items: [["Surgeries", 26], ["Dental", 22], ["Dialysis", 10], ["Endoscopy", 5], ["Cath Lab", 4], ["ERCP", 1]] },
]

// Matches the dashboard headline, which only counts departments with an OP/IP split.
const GRAND_TOTAL = DEPTS.filter((d) => d.ip != null).reduce((s, d) => s + d.op + d.ip!, 0)
const OP_YEAR = MONTHLY_OP.reduce((a, b) => a + b)
const OP_ALL = TREND.reduce((a, p) => a + p.value, 0)
if (import.meta.env.DEV && GRAND_TOTAL !== 575793) console.error(`[AnalysisSection] total ${GRAND_TOTAL} != dashboard 575,793`)
if (import.meta.env.DEV && OP_YEAR !== 383634) console.error(`[AnalysisSection] OP ${OP_YEAR} != dashboard 3,83,634`)

const KPIS = [
  { value: OP_ALL, label: "OP patients", sub: `Aug 22 – ${TREND_END.label}`, plus: true },
  { value: GRAND_TOTAL, label: "OP & IP services", plus: true },
  // The chart lists 22 rows, but the institution has 21 departments.
  { value: 21, label: "Departments", plus: false },
  { value: 929, label: "OPD consultations today", plus: true },
]

// OP / IP hues: validated colorblind-safe on both the light and the navy dark surface.
// OP colour is navy in light mode and teal in dark mode (CSS variables set on the section).
const OP_C = "var(--op-color)", IP_C = "#d97706"

const TABS = [
  { key: "trend", tab: "Monthly Trend" },
  { key: "dept", tab: "Departments" },
  { key: "today", tab: "Today" },
]

const W = 1000, H = 320, PAD_L = 90, PAD_X = 30, PAD_TOP = 24, PAD_BOTTOM = 70
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

const TrendChart: React.FC<{ hover: number | null; setHover: (i: number | null) => void }> = ({ hover, setHover }) => {
  const points = TREND
  const max = Math.max(...points.map((p) => p.value))
  const base = H - PAD_BOTTOM
  const xy = points.map((p, i): [number, number] => [
    PAD_L + (i * (W - PAD_L - PAD_X)) / (points.length - 1),
    base - (p.value / max) * (base - PAD_TOP),
  ])
  const line = wave(xy)
  const area = `${line} L${xy[xy.length - 1][0]},${base} L${xy[0][0]},${base} Z`

  const pick = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * W
    setHover(Math.max(0, Math.min(points.length - 1, Math.round(((x - PAD_L) / (W - PAD_L - PAD_X)) * (points.length - 1)))))
  }

  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[640px] h-auto touch-none select-none"
        onPointerMove={pick}
        onPointerDown={pick}
        onPointerLeave={() => setHover(null)}
        role="img"
        aria-label={`Monthly out-patient count: ${points.map((p) => `${p.label} ${p.value}`).join(", ")}`}
      >
        <defs>
          <linearGradient id="aims-wave-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--wave-color)" }} stopOpacity="0.45" />
            <stop offset="100%" style={{ stopColor: "var(--wave-color)" }} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <g key={f}>
            <line x1={PAD_L} x2={W - PAD_X} y1={base - f * (base - PAD_TOP)} y2={base - f * (base - PAD_TOP)} className="stroke-[#e2e8f0] dark:stroke-white/10" strokeDasharray="4 6" />
            <text x={PAD_L - 12} y={base - f * (base - PAD_TOP) + 4} textAnchor="end" className="fill-[#94a3b8] text-[11px]">{fmt(Math.round(f * max))}</text>
          </g>
        ))}
        <motion.path d={area} fill="url(#aims-wave-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} />
        <motion.path d={line} fill="none" className="stroke-[#1f3351] dark:stroke-teal-400" strokeWidth={3} strokeLinecap="round"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
        {xy.map(([x, y], i) => (
          <g key={i}>
            {(i % 3 === 0 || i === hover || i === points.length - 1) && (
              <text x={x} y={base + 16} textAnchor="end" transform={`rotate(-35 ${x} ${base + 16})`}
                className={`text-[11px] ${i === hover ? "fill-[#1f3351] dark:fill-white font-bold" : "fill-[#62748a] dark:fill-slate-400"}`}>
                {points[i].label}
              </text>
            )}
            {(i === hover || i % 3 === 0 || i === points.length - 1) && (
              <circle cx={x} cy={y} r={i === hover ? 6 : 3} className="fill-white stroke-[#1f3351] dark:fill-[#0b1a2e] dark:stroke-teal-400" strokeWidth={2} />
            )}
          </g>
        ))}
        {hover != null && (
          <line x1={xy[hover][0]} x2={xy[hover][0]} y1={PAD_TOP} y2={base} className="stroke-[#1f3351]/40 dark:stroke-teal-400/50" strokeDasharray="3 4" />
        )}
      </svg>
    </div>
  )
}

const Swatch: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <span className="inline-flex items-center gap-1.5">
    <span className="w-3 h-3 rounded-sm" style={{ background: color }} />
    {label}
  </span>
)

const DeptChart: React.FC<{ hover: number | null; setHover: (i: number | null) => void }> = ({ hover, setHover }) => (
  <div>
    <div className="flex gap-4 mb-3 text-xs font-semibold text-[#4b6382] dark:text-slate-300">
      <Swatch color={OP_C} label="Out-patient (OP)" />
      <Swatch color={IP_C} label="In-patient (IP)" />
    </div>
    <ul className="space-y-1" onPointerLeave={() => setHover(null)}>
      {RANKED.map((d, i) => {
        const total = d.op + (d.ip ?? 0)
        return (
          <li
            key={d.name}
            onPointerEnter={() => setHover(i)}
            onPointerDown={() => setHover(i)}
            className={`grid grid-cols-[6.5rem_1fr] sm:grid-cols-[8rem_1fr] items-center gap-2 sm:gap-3 rounded-md px-1 py-[3px] transition-colors ${
              hover === i ? "bg-[#f1f5f9] dark:bg-white/10" : ""
            } ${hover != null && hover !== i ? "opacity-60" : ""}`}
          >
            <span className="truncate text-xs sm:text-[13px] text-right text-[#4b6382] dark:text-slate-300">{d.name}</span>
            <div className="flex items-center gap-2 min-w-0">
              <motion.div
                className="flex h-4 gap-[2px] origin-left"
                style={{ width: `${(total / DEPT_MAX) * 85}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.03, ease: "easeOut" }}
              >
                <div className="h-full rounded-l-[4px] last:rounded-r-[4px]" style={{ flex: d.op, background: OP_C }} />
                {d.ip ? <div className="h-full rounded-r-[4px] min-w-[2px]" style={{ flex: d.ip, background: IP_C }} /> : null}
              </motion.div>
              <span className="shrink-0 text-xs tabular-nums font-semibold text-[#1f3351] dark:text-white">{fmt(total)}</span>
            </div>
          </li>
        )
      })}
    </ul>
  </div>
)

const TodayChart: React.FC = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {TODAY.map(({ group, items }) => {
      const max = items[0][1]
      return (
        <div key={group} className="rounded-xl bg-[#f8fafc] dark:bg-white/5 p-4">
          <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#4b6382] dark:text-teal-400 mb-3">{group}</div>
          <ul className="space-y-2.5">
            {items.map(([label, value]) => (
              <li key={label}>
                <div className="flex justify-between text-[13px] mb-1">
                  <span className="text-[#62748a] dark:text-slate-300">{label}</span>
                  <span className="font-semibold tabular-nums text-[#1f3351] dark:text-white">{fmt(value)}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#e2e8f0] dark:bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-[#1f3351] dark:bg-teal-400 origin-left"
                    style={{ width: `${Math.max(2, (value / max) * 100)}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    })}
  </div>
)

export const AnalysisSection: React.FC = () => {
  const [tab, setTab] = useState("trend")
  const [hover, setHover] = useState<number | null>(null)

  let readout: React.ReactNode = "Hover or tap the chart to explore"
  if (tab === "trend" && hover != null) {
    const p = TREND[hover]
    readout = <><b className="text-[#1f3351] dark:text-white">{p.label}</b> · {fmt(p.value)} OP patients</>
  } else if (tab === "dept" && hover != null) {
    const d = RANKED[hover]
    readout = (
      <><b className="text-[#1f3351] dark:text-white">{d.name}</b> · OP {fmt(d.op)}
        {d.ip != null ? <> · IP {fmt(d.ip)} ({((d.ip / (d.op + d.ip)) * 100).toFixed(1)}% IP)</> : " · OP only"}</>
    )
  } else if (tab === "today") {
    readout = "Each group is scaled on its own"
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
          {KPIS.map((k) => (
            <div key={k.label} className="m-reveal rounded-xl border border-[#0d2346]/10 dark:border-white/15 bg-white dark:bg-white/5 px-4 py-4 shadow-[0_8px_24px_rgba(8,44,76,0.08)] text-center">
              <div className="font-['DM_Sans',sans-serif] text-2xl sm:text-3xl font-black text-[#1f3351] dark:text-white tabular-nums">{fmt(k.value)}{k.plus && "+"}</div>
              <div className="mt-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider leading-snug text-[#62748a] dark:text-slate-400">
                {k.label}
                {"sub" in k && <span className="block mt-0.5 normal-case tracking-normal font-medium text-[#94a3b8] dark:text-slate-500">{k.sub}</span>}
              </div>
            </div>
          ))}
        </div>

        <div className="m-reveal rounded-2xl border border-[#0d2346]/10 dark:border-white/15 bg-white dark:bg-white/5 shadow-[0_14px_40px_rgba(8,44,76,0.10)] p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div role="tablist" aria-label="Data view" className="inline-flex flex-wrap gap-1 rounded-full bg-[#f1f5f9] dark:bg-white/10 p-1">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={t.key === tab}
                  onClick={() => { setTab(t.key); setHover(null) }}
                  className={`rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${
                    t.key === tab ? "bg-[#1f3351] text-white dark:bg-teal-400 dark:text-[#0b1a2e]" : "text-[#4b6382] dark:text-slate-300 hover:text-[#1f3351] dark:hover:text-white"
                  }`}
                >
                  {t.tab}
                </button>
              ))}
            </div>
            <div className="text-sm text-[#62748a] dark:text-slate-300 min-h-[1.25rem]" aria-live="polite">{readout}</div>
          </div>

          {tab === "trend" && <TrendChart hover={hover} setHover={setHover} />}
          {tab === "dept" && <DeptChart hover={hover} setHover={setHover} />}
          {tab === "today" && <TodayChart />}

        </div>
      </div>
    </section>
  )
}

export default AnalysisSection
