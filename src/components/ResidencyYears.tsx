import { BookOpen, GraduationCap, Stethoscope, type LucideIcon } from "lucide-react";
import type { ContentBlock } from "../data/types";
import { IMG } from "../data/pageImages";
import "./ResidencyYears.css";

/** Photo, emblem and colour for each year, in order. */
const YEARS: { image: string; Icon: LucideIcon; accent: string; glow: string }[] = [
  { image: IMG.skillsLabMannequin, Icon: BookOpen, accent: "from-[#60A5FA] to-[#1D4ED8]", glow: "rgba(59,130,246,0.55)" },
  { image: IMG.icuVentilator, Icon: Stethoscope, accent: "from-[#FFC94D] to-[#F47B20]", glow: "rgba(244,123,32,0.55)" },
  { image: IMG.posterExhibition, Icon: GraduationCap, accent: "from-[#5EEAD4] to-[#0F766E]", glow: "rgba(20,184,166,0.55)" },
];

const paragraphs = (c: ContentBlock["content"]) => (Array.isArray(c) ? c : c ? [c] : []);

/**
 * The three years of MD / MS residency as one journey: a connected timeline with a light travelling
 * along it, and for each year an animated photograph, an emblem and the year's text.
 */
export default function ResidencyYears({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <section
      aria-labelledby="residency-years"
      className="ry-panel relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0d2346] via-[#132a52] to-[#0b172a] px-5 py-10 text-white shadow-[0_24px_60px_rgba(13,35,70,0.28)] sm:px-9 sm:py-12 lg:px-12"
    >
      <span aria-hidden="true" className="ry-blob ry-blob--a" />
      <span aria-hidden="true" className="ry-blob ry-blob--b" />

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#FBBF24] sm:text-[13px]">Three-year residency</p>
        <h2 id="residency-years" className="mt-2 font-['Manrope',sans-serif] text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          From foundations to senior residency
        </h2>
      </div>

      {/* Timeline (desktop): three nodes joined by a line with a travelling light. */}
      <div aria-hidden="true" className="relative mt-10 hidden md:block">
        <div className="ry-track absolute left-[16.66%] right-[16.66%] top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/15">
          <span className="ry-track__fill" />
          <span className="ry-track__spark" />
        </div>
        <div className="relative grid grid-cols-3">
          {blocks.map((_, i) => (
            <div key={i} className="flex justify-center">
              <span
                className={`ry-node grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br ${YEARS[i % 3].accent} text-lg font-extrabold ring-4 ring-[#132a52]`}
                style={{ animationDelay: `${i * 0.9}s`, ["--ry-glow" as string]: YEARS[i % 3].glow }}
              >
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ol className="relative mt-8 grid gap-6 md:grid-cols-3 md:gap-6">
        {blocks.map((b, i) => {
          const y = YEARS[i % 3];
          return (
            <li
              key={b.title}
              className="ry-card group flex flex-col overflow-hidden rounded-3xl bg-white text-[#111] shadow-[0_18px_40px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-2 dark:bg-[#0f1d38] dark:text-slate-200"
              style={{ animationDelay: `${0.15 + i * 0.18}s` }}
            >
              <div className="relative h-48 overflow-hidden sm:h-52">
                <img src={y.image} alt="" loading="lazy" className="ry-photo absolute inset-0 h-full w-full object-cover" style={{ animationDelay: `${-i * 6}s` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a]/80 via-[#0b172a]/15 to-transparent" />
                <span className="ry-shine" aria-hidden="true" style={{ animationDelay: `${i * 1.4}s` }} />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#132a52]">
                  Year {i + 1}
                </span>
                <span
                  aria-hidden="true"
                  className={`ry-emblem absolute bottom-4 right-4 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${y.accent} text-white`}
                  style={{ ["--ry-glow" as string]: y.glow, animationDelay: `${i * 0.6}s` }}
                >
                  <y.Icon className="h-7 w-7" strokeWidth={2.2} />
                </span>
                {b.subtitle && (
                  <p className="absolute bottom-5 left-4 right-24 text-sm font-semibold leading-snug text-white drop-shadow">{b.subtitle}</p>
                )}
              </div>
              <div className="flex grow flex-col p-6">
                <h3 className="font-['Manrope',sans-serif] text-xl font-extrabold leading-snug text-[#132a52] sm:text-2xl dark:text-white">
                  {b.title?.replace(/^Year \d+\s*[—-]\s*/, "")}
                </h3>
                <span aria-hidden="true" className={`mt-2 block h-1 w-12 rounded-full bg-gradient-to-r ${y.accent}`} />
                {paragraphs(b.content).map((p) => (
                  <p key={p.slice(0, 24)} className="mt-3 text-justify text-base leading-[1.8] [hyphens:auto] sm:text-[17px]">
                    {p}
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
