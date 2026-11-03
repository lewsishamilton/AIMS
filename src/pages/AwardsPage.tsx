import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Award, Building2, GraduationCap, Layers, Medal, Quote, Trophy, Users, type LucideIcon } from "lucide-react";
import PageHero from "../components/PageHero";
import {
  institutionInfo,
  departments,
  facultyAchievements,
  nariShaktiPuraskar,
  nationalAwards,
  studentAchievements,
  academicToppers,
  sportsAccolades,
  sportsSeason2025,
  wings,
} from "../data/awardsData";

/*
 * Awards & Achievements. Built from the same parts as the rest of the site: the photo
 * masthead, centred section headers with the ruled kicker, and one white card style for
 * every achievement. Entries without a photograph get a navy placeholder of the same size,
 * so every row of cards lines up.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const Reveal: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 14 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.45, ease: EASE }}
  >
    {children}
  </motion.div>
);

const CONTAINER = "mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-12";
const CARD =
  "overflow-hidden rounded-[22px] border border-[#e4ecf2] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.04]";
const HEADING = "font-['Manrope',sans-serif] font-bold tracking-tight text-[#162740] dark:text-white";
const EYEBROW = "text-xs font-semibold uppercase tracking-wider text-[#4b6382] dark:text-teal-400";
const BODY = "text-sm leading-relaxed text-[#596d86] dark:text-slate-300";

/* Awards get one accent beside the site navy: a warm medal gold, used only where something was won. */
const GOLD_BADGE =
  "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#b8892b] via-[#d4af4f] to-[#b8892b] px-3 py-1 text-[11px] font-bold text-[#1f1606] shadow-[0_4px_14px_rgba(184,137,43,0.35)]";

/** Centred section header: ruled kicker, title, one-line summary. Matches the home page sections. */
const SectionHeader: React.FC<{ kicker: string; title: string; text: string }> = ({ kicker, title, text }) => (
  <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
    <div className="mb-3 inline-flex items-center justify-center gap-3">
      <span className="h-[1.5px] w-8 bg-[#cbd5e1] sm:w-10 dark:bg-white/20" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4b6382] sm:text-[13px] dark:text-teal-400">
        {kicker}
      </span>
      <span className="h-[1.5px] w-8 bg-[#cbd5e1] sm:w-10 dark:bg-white/20" />
    </div>
    <h2 className={`${HEADING} mb-3.5 text-3xl leading-tight sm:text-4xl lg:text-[42px]`}>{title}</h2>
    <p className="text-base leading-relaxed text-[#596d86] sm:text-[17px] dark:text-slate-300">{text}</p>
  </div>
);

/** A sub-heading inside a section (Nari Shakti, National awards, 2025 season…). */
const SubHeader: React.FC<{ kicker?: string; title: string; text?: string }> = ({ kicker, title, text }) => (
  <div className="mb-7 max-w-3xl">
    {kicker && <p className={`${EYEBROW} mb-2`}>{kicker}</p>}
    <h3 className={`${HEADING} text-2xl leading-tight sm:text-[28px]`}>{title}</h3>
    {text && <p className={`${BODY} mt-2.5 sm:text-[15px]`}>{text}</p>}
  </div>
);

interface CardMeta {
  icon: LucideIcon;
  text: React.ReactNode;
}

/** Stands in for a missing photograph: navy panel, faint dot grid, a gold-ringed icon and a label. */
const ImagePlaceholder: React.FC<{ icon: LucideIcon; label?: string }> = ({ icon: Icon, label }) => (
  <div
    className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0d2346] via-[#1f3351] to-[#0d2346] px-6 text-center dark:from-[#0a1830] dark:via-[#13233d] dark:to-[#0a1830]"
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.12]"
      style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)", backgroundSize: "18px 18px" }}
    />
    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d4af4f]/80 bg-white/5 text-[#e3c565]">
      <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
    </span>
    {label && (
      <span className="relative max-w-[85%] text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75">{label}</span>
    )}
  </div>
);

/** The one achievement card used across the page. */
const AchievementCard: React.FC<{
  image?: string | null;
  imageAlt?: string;
  objectPosition?: string;
  /** Shown when there is no photograph. */
  placeholderIcon?: LucideIcon;
  placeholderLabel?: string;
  badge?: string;
  eyebrow?: string;
  title: string;
  meta?: CardMeta[];
  quote?: string;
  description?: string;
  footer?: { label: string; text: string };
}> = ({
  image,
  imageAlt,
  objectPosition,
  placeholderIcon = Award,
  placeholderLabel,
  badge,
  eyebrow,
  title,
  meta = [],
  quote,
  description,
  footer,
}) => (
  <article
    className={`${CARD} group flex h-full flex-col transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(15,23,42,0.13)]`}
  >
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#e4ecf2] dark:bg-white/5">
      {image ? (
        <img
          src={image}
          alt={imageAlt ?? title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={objectPosition ? { objectPosition } : undefined}
        />
      ) : (
        <ImagePlaceholder icon={placeholderIcon} label={placeholderLabel} />
      )}
      {badge && (
        <span className={`${GOLD_BADGE} absolute left-4 top-4 max-w-[calc(100%-2rem)]`}>
          <Award className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{badge}</span>
        </span>
      )}
    </div>

    <div className="flex grow flex-col p-6">
      {eyebrow && <p className={`${EYEBROW} mb-2`}>{eyebrow}</p>}
      <h3 className={`${HEADING} text-lg leading-snug`}>{title}</h3>

      {meta.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {meta.map(({ icon: Icon, text }, i) => (
            <li key={i} className="flex items-start gap-2 text-[13px] leading-relaxed text-[#4b6382] dark:text-slate-400">
              <Icon className="mt-[3px] h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      )}

      {quote && <p className="mt-3 text-sm italic text-[#4b6382] dark:text-slate-400">“{quote}”</p>}
      {description && <p className={`${BODY} mt-3`}>{description}</p>}

      {footer && (
        <div className="mt-auto pt-5">
          <div className="flex gap-3 rounded-xl border border-[#d4af4f]/40 bg-gradient-to-br from-[#fdf8ea] to-[#f8efd5] px-4 py-3 dark:border-[#d4af4f]/25 dark:from-[#d4af4f]/[0.08] dark:to-[#d4af4f]/[0.03]">
            <Trophy className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#9a7420] dark:text-[#e3c565]" aria-hidden="true" />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8a6a12] dark:text-[#e3c565]">{footer.label}</p>
              <p className="mt-0.5 text-[13px] font-medium leading-relaxed text-[#2a2110] dark:text-slate-200">{footer.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  </article>
);

/** Even three-column grid; cards stretch so their footers line up along each row. */
const CardGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{children}</div>
);

/* ─────────────────────────── Section index ─────────────────────────── */

const SECTIONS = [
  { id: "departments", label: "Departments" },
  { id: "faculty", label: "Faculty" },
  { id: "students", label: "Students" },
  { id: "sports", label: "Sports" },
  { id: "wings", label: "Wings" },
];

/** Sticky row of section links under the navbar; the one in view is filled. */
function SectionIndex() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 160;
      const hit = [...SECTIONS].reverse().find((s) => {
        const el = document.getElementById(s.id);
        return el && el.offsetTop <= y;
      });
      setActive(hit ? hit.id : SECTIONS[0].id);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On phones the row scrolls sideways; keep the active link in view.
  useEffect(() => {
    const row = rowRef.current;
    const link = row?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (row && link) row.scrollTo({ left: link.offsetLeft - (row.clientWidth - link.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Sections on this page"
      className="sticky top-[60px] z-30 border-b border-[#e4ecf2] bg-[#fbfaf5]/95 backdrop-blur-md dark:border-white/10 dark:bg-[#0b1424]/95"
    >
      <div ref={rowRef} className={`${CONTAINER} relative flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] sm:justify-center`}>
        {SECTIONS.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? "true" : undefined}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
              active === s.id
                ? "bg-[#1f3351] text-white dark:bg-teal-600"
                : "border border-[#e4ecf2] bg-white text-[#4b6382] hover:border-[#1f3351]/30 hover:text-[#1f3351] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ─────────────────────────── Departments ─────────────────────────── */

const shortName = (name: string) => name.replace(/^Department of /, "");

function DepartmentsSection() {
  const [filter, setFilter] = useState<string>("all");
  const [expanded, setExpanded] = useState(false);
  const all = departments.flatMap((d) => d.achievements.map((a) => ({ dept: d, a })));
  const matching = all.filter(({ dept }) => filter === "all" || dept.id === filter);
  // "All" opens with a first look rather than every card at once.
  const PREVIEW = 9;
  const shown = filter === "all" && !expanded ? matching.slice(0, PREVIEW) : matching;

  const chip = (id: string, label: string, count: number) => (
    <button
      key={id}
      type="button"
      onClick={() => {
        setFilter(id);
        setExpanded(false);
      }}
      aria-pressed={filter === id}
      className={`flex-shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
        filter === id
          ? "bg-[#1f3351] text-white dark:bg-teal-600"
          : "border border-[#e4ecf2] bg-white text-[#4b6382] hover:text-[#1f3351] dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-white"
      }`}
    >
      {label} <span className="opacity-60">({count})</span>
    </button>
  );

  return (
    <section id="departments" className="scroll-mt-32 py-16 sm:py-20">
      <div className={CONTAINER}>
        <SectionHeader
          kicker="Academic & Clinical Units"
          title="Departments"
          text="Symposia, workshops, research and recognitions from every pre-clinical, para-clinical and clinical department."
        />

        <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {chip("all", "All departments", all.length)}
          {departments.map((d) => chip(d.id, shortName(d.name), d.achievements.length))}
        </div>

        <CardGrid>
          {shown.map(({ dept: d, a }) => (
              <Reveal className="h-full" key={a.id}>
                <AchievementCard
                  image={a.image}
                  placeholderLabel={shortName(d.name)}
                  badge={a.badge}
                  eyebrow={shortName(d.name)}
                  title={a.title}
                  meta={[
                    ...(a.people ? [{ icon: Users, text: a.people }] : []),
                    ...(a.collaborators ? [{ icon: Layers, text: a.collaborators }] : []),
                  ]}
                  description={a.description}
                  footer={a.recognition ? { label: "Recognition", text: a.recognition } : undefined}
                />
              </Reveal>
          ))}
        </CardGrid>

        {shown.length < matching.length && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="rounded-full border border-[#1f3351]/25 bg-white px-6 py-2.5 text-sm font-semibold text-[#1f3351] transition-colors hover:bg-[#1f3351] hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-teal-600"
            >
              Show all {matching.length} achievements
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────── Faculty ─────────────────────────── */

function NariShakti() {
  const { title, subtitle, quote, description, presidedBy, images = [], categories } = nariShaktiPuraskar;

  return (
    <div className="mt-16 sm:mt-20">
      <div className={`${CARD} grid lg:grid-cols-2`}>
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-1 bg-[#e4ecf2] dark:bg-white/5">
            {images.slice(0, 2).map((src, i) => (
              <img key={i} src={src} alt={`${title} ceremony, photo ${i + 1}`} loading="lazy" className="aspect-[4/3] h-full w-full object-cover lg:aspect-auto" />
            ))}
          </div>
        )}
        <div className="flex flex-col justify-center p-7 sm:p-10">
          <p className={`${EYEBROW} mb-2`}>{subtitle}</p>
          <h3 className={`${HEADING} text-3xl leading-tight sm:text-[34px]`}>{title}</h3>
          <blockquote className="mt-5 border-l-2 border-[#1f3351] pl-4 text-[15px] italic leading-relaxed text-[#162740] dark:border-teal-400 dark:text-slate-200">
            <Quote className="mb-1 h-4 w-4 text-[#1f3351]/40 dark:text-teal-400/60" aria-hidden="true" />
            {quote}
          </blockquote>
          <p className={`${BODY} mt-5 sm:text-[15px]`}>{description}</p>
          <p className="mt-3 text-[13px] text-[#4b6382] dark:text-slate-400">{presidedBy}</p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Reveal className="h-full" key={cat.award}>
            <article className={`${CARD} relative h-full p-6 pt-7`}>
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#b8892b] via-[#e3c565] to-[#b8892b]" />
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af4f] to-[#a67c1f] text-white shadow-[0_6px_16px_rgba(184,137,43,0.35)]">
                  <Award className="h-5 w-5" aria-hidden="true" />
                </span>
                <h4 className={`${HEADING} text-[17px]`}>{cat.award}</h4>
              </div>
              <p className={`${BODY} mt-3`}>{cat.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cat.awardees.map((p) => (
                  <li
                    key={p.name}
                    className="rounded-full border border-[#d4af4f]/40 bg-[#fdf8ea] px-3 py-1 text-[12px] text-[#2a2110] dark:border-[#d4af4f]/25 dark:bg-[#d4af4f]/[0.08] dark:text-slate-200"
                  >
                    <span className="font-semibold">{p.name}</span>
                    {p.program && <span className="text-[#4b6382] dark:text-slate-400"> · {p.program}</span>}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function FacultySection() {
  return (
    <section id="faculty" className="scroll-mt-32 border-t border-[#e4ecf2] py-16 sm:py-20 dark:border-white/10">
      <div className={CONTAINER}>
        <SectionHeader
          kicker="Faculty Recognition"
          title="Faculty Achievements"
          text="Teaching results, research grants, patents and publications from AIMS faculty."
        />

        <CardGrid>
          {facultyAchievements.map((f) => (
            <Reveal className="h-full" key={f.id}>
              <AchievementCard
                image={f.image}
                imageAlt={`${f.name}, ${f.department}`}
                objectPosition={f.objectPosition ?? "center 20%"}
                placeholderLabel={f.award}
                badge={f.award}
                title={f.name}
                meta={[{ icon: Building2, text: f.department }]}
                description={f.description}
                footer={{ label: "Honour", text: f.significance }}
              />
            </Reveal>
          ))}
        </CardGrid>

        <NariShakti />

        <div className="mt-16 sm:mt-20">
          <SubHeader
            kicker="National Laureates"
            title="National Awards"
            text="AIMS students whose work has been recognised at the national level."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {nationalAwards.map((n) => (
              <Reveal className="h-full" key={n.id}>
                <AchievementCard
                  image={n.image}
                  imageAlt={`${n.recipient}, ${n.award}`}
                  placeholderIcon={Medal}
                  placeholderLabel={n.domain}
                  badge={n.domain}
                  eyebrow={n.program}
                  title={n.recipient}
                  meta={[{ icon: Medal, text: n.award }]}
                  description={n.details}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Students ─────────────────────────── */

function StudentsSection() {
  return (
    <section id="students" className="scroll-mt-32 border-t border-[#e4ecf2] py-16 sm:py-20 dark:border-white/10">
      <div className={CONTAINER}>
        <SectionHeader
          kicker="Scholar Distinctions"
          title="Student Achievements"
          text="Research presentations, hackathons, quizzes and debates at conferences across the state."
        />

        <CardGrid>
          {studentAchievements.map((s) => (
            <Reveal className="h-full" key={s.id}>
              <AchievementCard
                image={s.image}
                placeholderIcon={GraduationCap}
                placeholderLabel={s.event}
                eyebrow={s.event}
                title={s.title}
                meta={[{ icon: Users, text: `${s.students} · ${s.year}` }]}
                description={s.details}
              />
            </Reveal>
          ))}
        </CardGrid>

        <div className="mt-16 sm:mt-20">
          <SubHeader kicker={academicToppers.event} title="Academic Toppers" text={academicToppers.quote} />
          <ul className="mb-6 flex flex-wrap gap-2">
            {academicToppers.toppers.map((t) => (
              <li
                key={`${t.name}-${t.program}`}
                className="rounded-full border border-[#e4ecf2] bg-white px-3.5 py-1.5 text-[13px] text-[#162740] dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              >
                <span className="font-semibold">{t.name}</span>
                <span className="text-[#4b6382] dark:text-slate-400"> · {t.program}</span>
              </li>
            ))}
          </ul>
          {academicToppers.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
              {academicToppers.gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Academic toppers felicitation, photo ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-2xl object-cover"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Sports ─────────────────────────── */

type Placing = "gold" | "silver" | "bronze" | "selected";

const placingOf = (text: string): Placing =>
  /1st|gold/i.test(text) ? "gold" : /2nd|silver/i.test(text) ? "silver" : /3rd|bronze/i.test(text) ? "bronze" : "selected";

const MEDAL_DOT: Record<Placing, string> = {
  gold: "bg-[#c9a227]",
  silver: "bg-[#9aa5b1]",
  bronze: "bg-[#b0703c]",
  selected: "",
};

/** Placing label: a medal-coloured dot for podium finishes, an outline for team selections. */
const PlacingBadge: React.FC<{ text: string }> = ({ text }) => {
  const p = placingOf(text);
  return p === "selected" ? (
    <span className="whitespace-nowrap rounded-full border border-[#1f3351]/25 px-2.5 py-0.5 text-[12px] font-semibold text-[#1f3351] dark:border-teal-400/40 dark:text-teal-300">
      {text}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[12px] font-semibold text-[#162740] dark:text-slate-200">
      <span className={`h-2.5 w-2.5 rounded-full ${MEDAL_DOT[p]}`} aria-hidden="true" />
      {text}
    </span>
  );
};

/** A titled list of results: event and winner on the left, placing on the right. */
const ResultsList: React.FC<{
  title: string;
  when?: string;
  rows: { event: string; winner: string; placing: string }[];
  /** Lay long lists out in two columns on wider screens. */
  twoColumn?: boolean;
}> = ({ title, when, rows, twoColumn = false }) => (
  <div className={`${CARD} h-full`}>
    <div className="border-b border-[#e4ecf2] px-5 py-4 dark:border-white/10">
      <h4 className={`${HEADING} text-[15px] leading-snug`}>{title}</h4>
      {when && <p className="mt-0.5 text-[12px] text-[#4b6382] dark:text-slate-400">{when}</p>}
    </div>
    <ul className={twoColumn ? "sm:grid sm:grid-cols-2" : undefined}>
      {rows.map((r, i) => (
        <li
          key={i}
          className={`flex items-start justify-between gap-4 border-t border-[#eef2f6] px-5 py-3 first:border-t-0 dark:border-white/5 ${
            twoColumn ? "sm:[&:nth-child(2)]:border-t-0 sm:odd:border-r" : ""
          }`}
        >
          <div className="min-w-0">
            <p className="text-[13px] font-semibold text-[#162740] dark:text-white">{r.event}</p>
            <p className="mt-0.5 text-[13px] text-[#596d86] dark:text-slate-400">{r.winner}</p>
          </div>
          <div className="pt-0.5">
            <PlacingBadge text={r.placing} />
          </div>
        </li>
      ))}
    </ul>
  </div>
);

function SportsSection() {
  const { event, venue, highlights, images = [], internalEvents, externalEvents } = sportsAccolades;

  return (
    <section id="sports" className="scroll-mt-32 border-t border-[#e4ecf2] py-16 sm:py-20 dark:border-white/10">
      <div className={CONTAINER}>
        <SectionHeader
          kicker="Athletics"
          title="Sports"
          text="Results from the annual sports meet, inter-college tournaments and university team selections."
        />

        <div className={CARD}>
          {images.length > 0 && (
            <div className="grid grid-cols-3 gap-1 bg-[#e4ecf2] dark:bg-white/5">
              {images.map((src, i) => (
                <img key={i} src={src} alt={`${event}, photo ${i + 1}`} loading="lazy" className="aspect-[4/3] h-full w-full object-cover" />
              ))}
            </div>
          )}
          <div className="p-4 sm:p-8">
            <p className={`${EYEBROW} mb-2`}>{venue}</p>
            <h3 className={`${HEADING} text-2xl leading-tight sm:text-[28px]`}>{event}</h3>
            <p className={`${BODY} mt-2.5 max-w-3xl sm:text-[15px]`}>{highlights}</p>

            <div className="mt-7 grid gap-6 lg:grid-cols-[2fr_1fr]">
              <ResultsList
                title="Sports meet winners"
                twoColumn
                rows={internalEvents.map((e) => ({ event: e.event, winner: e.winner, placing: e.position }))}
              />
              <ResultsList
                title="Inter-college tournaments"
                rows={externalEvents.map((e) => ({
                  event: e.category,
                  winner: `${e.athlete} · ${e.tournament}`,
                  placing: e.result.replace(/\s*\(.*\)$/, ""),
                }))}
              />
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <SubHeader kicker="Previous season" title={sportsSeason2025.title} text={sportsSeason2025.summary} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sportsSeason2025.events.map((ev) => (
              <Reveal className="h-full" key={ev.name}>
                <ResultsList
                  title={ev.name}
                  when={ev.when}
                  rows={ev.results.map((r) => ({ event: r.event, winner: r.winner, placing: r.position }))}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── Wings ─────────────────────────── */

function WingsSection() {
  return (
    <section id="wings" className="scroll-mt-32 border-t border-[#e4ecf2] py-16 sm:py-20 dark:border-white/10">
      <div className={CONTAINER}>
        <SectionHeader
          kicker="Student Council"
          title="Wings"
          text="The Student Council's six wings run the scientific, literary, cultural, artistic, media and sports life of the campus."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wings.map((w) => (
            <Reveal className="h-full" key={w.id}>
              <AchievementCard
                image={w.image}
                title={w.name}
                quote={w.motto}
                description={w.description}
                footer={w.highlight ? { label: "Key activity", text: w.highlight } : undefined}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AwardsPage() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[#fbfaf5] dark:bg-transparent">
      <PageHero eyebrow="The AIMS Story" title="Awards & Achievements" subtitle={institutionInfo.introStatement} pathname={pathname} />
      <SectionIndex />
      <DepartmentsSection />
      <FacultySection />
      <StudentsSection />
      <SportsSection />
      <WingsSection />
    </div>
  );
}
