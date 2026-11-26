import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { PG_PROGRAMMES, pgPath, type PgProgramme } from "../data/pages/postgraduate";
import { PG_ADVANCES } from "../data/pgAdvances";
import { PG_PHOTOS } from "../data/pageImages";
import { ORB_THEMES, TechOrb } from "./PgAdvances";
import "./PgProgrammesShowcase.css";

type Filter = "All" | "MD" | "MS";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * One programme card. The picture is the department's photograph with a slow zoom, and over it an
 * animated emblem that cycles through the speciality's technologies, each marked "At AIMS" or
 * "Emerging" exactly as on the programme page.
 */
function ProgrammeCard({ p, index }: { p: PgProgramme; index: number }) {
  const tech = PG_ADVANCES[p.slug]?.items ?? [];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (tech.length < 2 || paused || prefersReducedMotion()) return;
    // Cards start at different moments, so the grid does not change all at once.
    let timer: number | undefined;
    const start = window.setTimeout(() => {
      setI((n) => (n + 1) % tech.length);
      timer = window.setInterval(() => setI((n) => (n + 1) % tech.length), 3400);
    }, 1800 + (index % 4) * 650);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(timer);
    };
  }, [tech.length, paused, index]);

  const t = tech[i];
  const theme = ORB_THEMES[index % ORB_THEMES.length];
  const photo = PG_PHOTOS[p.slug]?.about;
  const isMS = p.degree === "MS";

  return (
    <article
      className="pgx-card group flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-[0_14px_40px_rgba(19,42,82,0.10)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(19,42,82,0.18)] dark:border-white/10 dark:bg-white/[0.04]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Animated picture: department photo + technology emblem */}
      <div className="relative h-56 overflow-hidden sm:h-60">
        {photo && <img src={photo} alt="" loading="lazy" className="pg-kenburns absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0b172a]/85 via-[#0b172a]/55 to-[#0b172a]/20" />
        <div className="pgx-grid absolute inset-0" aria-hidden="true" />
        <span
          className={`absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-extrabold tracking-wider text-white shadow-md ${
            isMS ? "bg-gradient-to-r from-[#0F766E] to-[#14B8A6]" : "bg-gradient-to-r from-[#1D4ED8] to-[#6D28D9]"
          }`}
        >
          {p.degree} · {isMS ? "Master of Surgery" : "Doctor of Medicine"}
        </span>

        {t && (
          <div className="absolute inset-x-5 bottom-5 flex items-end gap-4">
            <div key={`orb-${i}`} className="pgx-swap">
              <TechOrb icon={t.icon} theme={theme} />
            </div>
            <div key={`txt-${i}`} className="pgx-swap min-w-0 pb-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                  t.atAims ? "bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-300/40" : "bg-violet-400/20 text-violet-200 ring-1 ring-violet-300/40"
                }`}
              >
                {t.atAims ? <BadgeCheck className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
                {t.atAims ? "At AIMS" : "Emerging"}
              </span>
              <p className="mt-1.5 text-lg font-bold leading-snug text-white drop-shadow sm:text-xl">{t.title}</p>
            </div>
          </div>
        )}

        {tech.length > 1 && (
          <div className="absolute right-5 top-6 flex gap-1.5" aria-hidden="true">
            {tech.map((_, n) => (
              <span key={n} className={`h-1.5 rounded-full transition-all duration-500 ${n === i ? "w-5 bg-white" : "w-1.5 bg-white/45"}`} />
            ))}
          </div>
        )}
      </div>

      {/* Words */}
      <div className="flex grow flex-col p-6 sm:p-7">
        <h3 className="font-['Manrope',sans-serif] text-2xl font-extrabold leading-tight text-[#132a52] dark:text-white">{p.name}</h3>
        <p className="mt-3 text-left sm:text-justify text-base leading-[1.75] text-[#111] [hyphens:auto] sm:text-[17px] dark:text-slate-200">{p.summary}</p>
        {tech.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label={`Technology in ${PG_ADVANCES[p.slug].speciality}`}>
            {tech.map((x, n) => (
              <li key={x.title}>
                <button
                  type="button"
                  onClick={() => setI(n)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    n === i
                      ? "bg-[#132a52] text-white dark:bg-white dark:text-[#132a52]"
                      : "bg-[#132a52]/[0.06] text-[#132a52] hover:bg-[#132a52]/[0.12] dark:bg-white/10 dark:text-white"
                  }`}
                >
                  {x.title}
                </button>
              </li>
            ))}
          </ul>
        )}
        <Link
          to={pgPath(p.slug)}
          className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-base font-bold text-[#D9581A] hover:text-[#B4410F] dark:text-[#FDBA74]"
        >
          View programme
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

/** "MD & MS Programmes" on the Postgraduate overview page: filter tabs and animated programme cards. */
export default function PgProgrammesShowcase() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = PG_PROGRAMMES.filter((p) => filter === "All" || p.degree === filter);
  const count = (f: Filter) => PG_PROGRAMMES.filter((p) => f === "All" || p.degree === f).length;

  return (
    <section aria-labelledby="pg-programmes">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9581A] sm:text-[13px]">Programmes offered</p>
          <h2 id="pg-programmes" className="mt-2 font-['Manrope',sans-serif] text-3xl font-bold leading-tight tracking-tight text-[#162740] sm:text-4xl lg:text-[40px] dark:text-white">
            MD &amp; MS Programmes
          </h2>
          <p className="mt-3 text-left sm:text-justify text-base leading-[1.75] text-[#111] [hyphens:auto] sm:text-lg dark:text-slate-200">
            Ten postgraduate specialities, each shown with the technology its residents train with at AIMS and where
            the speciality is heading. Open a programme for its curriculum, fees, eligibility and admission path.
          </p>
        </div>
        <div role="tablist" aria-label="Filter programmes" className="flex shrink-0 gap-1 rounded-full bg-[#132a52]/[0.06] p-1 dark:bg-white/10">
          {(["All", "MD", "MS"] as Filter[]).map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                filter === f ? "bg-[#F47B20] text-white shadow-[0_6px_16px_rgba(244,123,32,0.35)]" : "text-[#132a52] hover:bg-white dark:text-white dark:hover:bg-white/10"
              }`}
            >
              {f === "All" ? "All" : f} <span className="opacity-75">({count(f)})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-9 grid gap-7 md:grid-cols-2">
        {list.map((p) => (
          <ProgrammeCard key={p.slug} p={p} index={PG_PROGRAMMES.indexOf(p)} />
        ))}
      </div>
    </section>
  );
}
