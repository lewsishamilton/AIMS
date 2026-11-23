import {
  Activity,
  BadgeCheck,
  Baby,
  Bone,
  Bot,
  Cpu,
  Droplets,
  Gauge,
  HeartPulse,
  Microscope,
  MonitorCheck,
  Printer,
  ScanEye,
  ScanLine,
  Scissors,
  Sparkles,
  Sun,
  Syringe,
  TestTube,
  Timer,
  Video,
  Waves,
  Zap,
  Dna,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties } from "react";
import { PG_ADVANCES, type AdvanceIcon } from "../data/pgAdvances";
import "./PgAdvances.css";

const ICONS: Record<AdvanceIcon, LucideIcon> = {
  heart: HeartPulse,
  scope: Video,
  droplets: Droplets,
  ai: Cpu,
  laser: Zap,
  light: Sun,
  scan: ScanLine,
  dna: Dna,
  scissors: Scissors,
  timer: Timer,
  robot: Bot,
  bone: Bone,
  print: Printer,
  baby: Baby,
  pulse: Activity,
  eye: ScanEye,
  wave: Waves,
  syringe: Syringe,
  gauge: Gauge,
  microscope: Microscope,
  tube: TestTube,
  monitor: MonitorCheck,
};

/** One emblem colour per card, in the page's palette: saffron, blue, teal, violet. */
const ORB_THEMES = [
  { core: "linear-gradient(135deg,#FFC94D,#F47B20 55%,#C2410C)", glow: "rgba(244,123,32,0.45)", dot: "#F59E0B", ring: "#F47B20" },
  { core: "linear-gradient(135deg,#60A5FA,#1D4ED8 55%,#132a52)", glow: "rgba(29,78,216,0.4)", dot: "#3B82F6", ring: "#1D4ED8" },
  { core: "linear-gradient(135deg,#5EEAD4,#0F766E 60%,#134E4A)", glow: "rgba(15,118,110,0.4)", dot: "#14B8A6", ring: "#0F766E" },
  { core: "linear-gradient(135deg,#C4B5FD,#7C3AED 55%,#4C1D95)", glow: "rgba(124,58,237,0.4)", dot: "#8B5CF6", ring: "#7C3AED" },
];

function TechOrb({ icon, theme }: { icon: AdvanceIcon; theme: (typeof ORB_THEMES)[number] }) {
  const Icon = ICONS[icon];
  const style = { "--orb-core": theme.core, "--orb-glow": theme.glow, "--orb-dot": theme.dot } as CSSProperties;
  return (
    <div className="tech-orb" style={style} aria-hidden="true">
      <span className="tech-orb__halo" />
      <svg className="tech-orb__ring" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="44" fill="none" stroke={theme.ring} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 7" />
        <circle cx="48" cy="48" r="44" fill="none" stroke={theme.ring} strokeWidth="2.5" strokeDasharray="40 236" strokeLinecap="round" />
      </svg>
      <span className="tech-orb__sat" />
      <span className="tech-orb__core">
        <Icon className="h-7 w-7" strokeWidth={2.2} />
      </span>
    </div>
  );
}

/**
 * "Advances in <speciality>": technology residents train with at AIMS, and where the speciality is
 * heading. Each card is clearly marked "At AIMS" or "Emerging" so nothing reads as a facility the
 * hospital does not have.
 */
export default function PgAdvances({ slug, titleClass }: { slug: string; titleClass: string }) {
  const a = PG_ADVANCES[slug];
  if (!a) return null;
  return (
    <section className="bg-gradient-to-b from-[#FFF8F1] to-white dark:bg-none" aria-labelledby="pg-advances">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-16">
        <h2 id="pg-advances" className={titleClass}>
          Advances in
          <br />
          {a.speciality}
        </h2>
        <p className="mt-3 max-w-3xl text-base text-[#555] sm:text-lg dark:text-slate-300">
          The technology you train with at AIMS, and where the speciality is heading next.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-wider">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-600/20">
            <BadgeCheck className="h-3.5 w-3.5" /> At AIMS
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-violet-700 ring-1 ring-violet-600/20">
            <Sparkles className="h-3.5 w-3.5" /> Emerging in the speciality
          </span>
        </div>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {a.items.map((it, i) => (
            <li
              key={it.title}
              className="tech-card group flex flex-col items-center rounded-2xl border border-black/[0.06] bg-white p-6 text-center shadow-[0_10px_30px_rgba(19,42,82,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(19,42,82,0.14)] dark:bg-white/5"
            >
              <TechOrb icon={it.icon} theme={ORB_THEMES[i % ORB_THEMES.length]} />
              <span
                className={`mt-4 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                  it.atAims ? "bg-emerald-50 text-emerald-700" : "bg-violet-50 text-violet-700"
                }`}
              >
                {it.atAims ? <BadgeCheck className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                {it.atAims ? "At AIMS" : "Emerging"}
              </span>
              <h3 className="mt-3 text-lg font-bold leading-snug text-[#132a52] dark:text-white">{it.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#475569] dark:text-slate-300">{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
