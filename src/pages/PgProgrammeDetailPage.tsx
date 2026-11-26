import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  ChevronDown,
  FlaskConical,
  Microscope,
  Scissors,
  MapPin,
  Send,
  Sparkles,
  Stethoscope,
  Target,
  Users,
} from "lucide-react";
import PageHero from "../components/PageHero";
import PgAdvances from "../components/PgAdvances";
import GlanceCard from "../components/GlanceCard";
import PgAdmissionsPath from "../components/PgAdmissionsPath";
import { FEE_CATEGORIES, FEE_GROUPS, inr, type FeeGroupTitle } from "../data/pgFees";
import { PG_PHOTOS } from "../data/pageImages";
import { PG_PROGRAMME_DETAILS, type PgProgrammeDetail } from "../data/pgProgrammeDetails";
import { MAPS_URL } from "../data/siteInfo";

/**
 * Detailed PG programme page (every MD / MS programme in PG_PROGRAMME_DETAILS): programme highlights, outcomes and
 * careers tabs, admissions path, eligibility, year-wise curriculum, related courses and FAQs.
 *
 * Typeset in Open Sans with AIMS's own colours from its PG admissions poster — saffron section
 * headings and blue feature bands.
 */

const SAFFRON = "text-[#D9581A] dark:text-[#F59E5B]";
const BAND = "bg-gradient-to-br from-[#132a52] via-[#1c3d78] to-[#2754a3] text-white";
const H2 = `text-3xl sm:text-4xl font-semibold leading-tight ${SAFFRON}`;

const FEATURE_ICONS = { clinical: Stethoscope, research: FlaskConical, community: Users, skills: Sparkles, surgical: Scissors, lab: Microscope } as const;
/** Each feature card gets its own gradient (deep shades, so white text stays readable) and a matching glow. */
// Orange · white · green, left to right. The white card uses navy text and an orange icon so it stays readable.
const FEATURE_THEMES = {
  clinical: {
    card: "bg-gradient-to-br from-[#F47B20] via-[#E4611A] to-[#C2410C] text-white shadow-[0_18px_45px_rgba(244,123,32,0.45)] hover:shadow-[0_26px_60px_rgba(244,123,32,0.6)]",
    circle: "bg-white/15",
    icon: "border border-white/35 bg-white/20 text-white backdrop-blur-sm",
    rule: "bg-white/85",
    body: "text-white/95",
  },
  research: {
    card: "bg-white text-[#132a52] ring-1 ring-[#132a52]/10 shadow-[0_18px_45px_rgba(19,42,82,0.25)] hover:shadow-[0_26px_60px_rgba(19,42,82,0.35)] dark:bg-white",
    circle: "bg-[#F47B20]/10",
    icon: "bg-gradient-to-br from-[#FFB23D] to-[#F47B20] text-white shadow-[0_8px_20px_rgba(244,123,32,0.4)]",
    rule: "bg-[#F47B20]",
    body: "text-[#334155]",
  },
  community: {
    card: "bg-gradient-to-br from-[#0891b2] via-[#0e7490] to-[#155e75] text-white shadow-[0_18px_45px_rgba(8,145,178,0.45)] hover:shadow-[0_26px_60px_rgba(8,145,178,0.6)]",
    circle: "bg-white/12",
    icon: "border border-white/35 bg-white/20 text-white backdrop-blur-sm",
    rule: "bg-white/85",
    body: "text-white/95",
  },
} as const;

/** Banner and Highlights photos: the department's own AIMS photos, as used across the site. */
const HERO_IMAGES: Record<string, string> = Object.fromEntries(Object.entries(PG_PHOTOS).map(([k, v]) => [k, v.hero]));
const SIDE_IMAGES: Record<string, string> = Object.fromEntries(Object.entries(PG_PHOTOS).map(([k, v]) => [k, v.about]));
/** Feature cards are coloured by position: orange · white · teal. */
const FEATURE_ORDER = [FEATURE_THEMES.clinical, FEATURE_THEMES.research, FEATURE_THEMES.community];

/** Two-line section title, as "Program / Highlights". */
const Title: React.FC<{ a: string; b: string; light?: boolean }> = ({ a, b, light }) => (
  <h2 className={`text-3xl sm:text-4xl font-semibold leading-tight ${light ? "text-white" : SAFFRON}`}>
    {a}
    <br />
    {b}
  </h2>
);

export default function PgProgrammeDetailPage({ slug }: { slug: string }) {
  const { pathname } = useLocation();
  const d = PG_PROGRAMME_DETAILS[slug];
  if (!d) return null;
  return (
    <div className="min-h-screen bg-white font-open-sans text-[#2b2b2b] dark:bg-transparent dark:text-slate-200">
      <PageHero eyebrow={`Postgraduate · ${d.degree}`} title={d.heroTitle} pathname={pathname} image={HERO_IMAGES[slug]} />
      <Intro d={d} />
      <Highlights d={d} sideImage={SIDE_IMAGES[slug]} />
      <PgAdvances slug={slug} titleClass={H2} />
      <ProgramDetails d={d} />
      <AdmissionsPath d={d} />
      <Eligibility d={d} />
      <FeeStructure />
      <Related d={d} />
      <Faqs d={d} />
    </div>
  );
}

function Intro({ d }: { d: PgProgrammeDetail }) {
  return (
    <section className="mx-auto grid max-w-[1200px] items-stretch gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_420px] lg:py-20">
      {/* Heading at the top, justified text ending level with the glance card's bottom edge. */}
      <div className="flex flex-col justify-between gap-5">
        <h2 className={`max-w-xl ${H2}`}>{d.introHeading}</h2>
        <div>
          {d.intro.map((p, i) => (
            <p
              key={p.slice(0, 20)}
              className={`${i ? "mt-5" : ""} text-left sm:text-justify text-[19px] leading-[1.9] text-[#3d3d3d] [hyphens:auto] dark:text-slate-300`}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
      <GlanceCard degree={d.degree} />
    </section>
  );
}

function Highlights({ d, sideImage }: { d: PgProgrammeDetail; sideImage?: string }) {
  return (
    <section className="pb-14">
      <div className={BAND}>
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 pb-36 pt-14 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:pt-16">
          <div>
            <Title a="Program" b="Highlights" light />
            <ul className="mt-7 space-y-6">
              {d.highlights.map((h) => (
                <li key={h.label}>
                  <span className="inline-block rounded-lg bg-gradient-to-r from-[#FFC94D] via-[#FFA63D] to-[#F47B20] px-3 py-1 text-base font-extrabold tracking-wide text-[#132a52] shadow-[0_6px_18px_rgba(244,123,32,0.45)] sm:text-lg">
                    {h.label}
                  </span>
                  <p
                    className="mt-2 text-left sm:text-justify text-base leading-relaxed text-white/95 [hyphens:auto] sm:text-lg lg:text-[19px]"
                  >
                    {h.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {sideImage && (
            <div className="hidden max-h-[380px] overflow-hidden rounded-xl shadow-2xl lg:block">
              <img src={sideImage} alt="" className="pg-kenburns h-full max-h-[380px] w-full object-cover" />
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto -mt-24 grid max-w-[1200px] gap-6 px-5 sm:px-8 md:grid-cols-3">
        {d.features.map((f, idx) => {
          const Icon = FEATURE_ICONS[f.icon];
          const t = FEATURE_ORDER[idx % FEATURE_ORDER.length];
          return (
            <div
              key={f.title}
              className={`group relative isolate overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 ${t.card}`}
            >
              {/* Soft decorative circles */}
              <span aria-hidden="true" className={`absolute -right-10 -top-10 -z-10 h-36 w-36 rounded-full transition-transform duration-500 group-hover:scale-125 ${t.circle}`} />
              <span aria-hidden="true" className={`absolute -bottom-12 -left-8 -z-10 h-28 w-28 rounded-full opacity-70 ${t.circle}`} />
              <span className={`grid h-14 w-14 place-items-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${t.icon}`}>
                <Icon className="h-7 w-7" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-extrabold sm:text-2xl">{f.title}</h3>
              <span aria-hidden="true" className={`mt-2 block h-1 w-12 rounded-full ${t.rule}`} />
              <p className={`mt-4 text-base leading-relaxed sm:text-[17px] ${t.body} text-left sm:text-justify [hyphens:auto]`}>
                {f.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ProgramDetails({ d }: { d: PgProgrammeDetail }) {
  const panels = [
    {
      key: "outcomes",
      Icon: Target,
      title: "Outcomes",
      lead: "Upon the completion of this programme, you can:",
      items: d.outcomes,
      head: "from-[#1d4ed8] to-[#6d28d9]",
      badge: "from-[#1d4ed8] to-[#6d28d9]",
      ring: "ring-[#4f46e5]/15",
    },
    {
      key: "careers",
      Icon: Briefcase,
      title: "Careers",
      lead: `Career paths after ${d.programmeName}:`,
      items: d.careers,
      head: "from-[#FFB23D] via-[#F47B20] to-[#D9581A]",
      badge: "from-[#FFB23D] to-[#E4561A]",
      ring: "ring-[#F47B20]/20",
    },
  ];
  return (
    // Full-width soft blue-grey band behind Program Details.
    <div className="bg-gradient-to-b from-[#EEF3FA] to-[#F8FAFD] dark:bg-none">
    <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-16">
      <Title a="Program" b="Details" />
      <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-2">
        {panels.map(({ key, Icon, title, lead, items, head, badge, ring }) => (
          <section
            key={key}
            aria-labelledby={`pd-${key}`}
            className={`flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_16px_45px_rgba(19,42,82,0.12)] ring-1 ${ring} dark:bg-white/5`}
          >
            <div className={`flex items-center gap-4 bg-gradient-to-r px-6 py-5 text-white ${head}`}>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/35 bg-white/20 backdrop-blur-sm">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 id={`pd-${key}`} className="text-2xl font-extrabold leading-tight sm:text-[26px]">
                  {title}
                </h3>
                <p className="text-sm text-white/85 sm:text-base">{lead}</p>
              </div>            </div>
            <ul className="flex flex-1 flex-col divide-y divide-black/5 px-6 py-2 dark:divide-white/10">
              {items.map((x) => (
                <li key={x} className="group flex flex-1 items-center gap-4 py-4">
                  <span
                    aria-hidden="true"
                    className={`h-3 w-3 shrink-0 rounded-full bg-gradient-to-br shadow-[0_0_0_4px_rgba(19,42,82,0.06)] transition-transform duration-300 group-hover:scale-125 ${badge}`}
                  />
                  <span
                    className="flex-1 text-left sm:text-justify text-base leading-relaxed text-[#2b2b2b] [hyphens:auto] sm:text-lg dark:text-slate-200"
                  >
                    {x}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
    </div>
  );
}

function AdmissionsPath({ d }: { d: PgProgrammeDetail }) {
  return <PgAdmissionsPath heading={<Title a="Admissions" b="Path" light />} steps={d.admissionSteps} notes={d.admissionNotes} />;
}

function Eligibility({ d }: { d: PgProgrammeDetail }) {
  return (
    <section className="bg-gradient-to-b from-[#EAF6F2] to-[#F7FBFA] dark:bg-none">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-16">
        <h2 className={H2}>
          Program
          <br />
          Eligibility
        </h2>
        <p className="mt-3 max-w-2xl text-base text-[#555] sm:text-lg dark:text-slate-300">Who can apply for {d.programmeName} at AIMS.</p>
        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {d.eligibility.map((e) => (
            <li
              key={e}
              className="flex items-start gap-4 rounded-2xl border border-[#0F766E]/15 bg-white p-5 shadow-[0_8px_24px_rgba(15,118,110,0.07)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F47B20]/50 hover:shadow-[0_14px_32px_rgba(15,118,110,0.12)] dark:bg-white/5"
            >
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#FFD36B] to-[#F47B20] shadow-[0_6px_14px_rgba(244,123,32,0.3)]">
                <BadgeCheck className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <span className="text-lg font-semibold leading-relaxed text-[#132a52] sm:text-xl dark:text-white">{e}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Fee cards: figures from data/pgFees.ts, one colour per discipline group.
 */
const FEE_STYLES: Record<FeeGroupTitle, { accent: string; tint: string; text: string }> = {
  Clinical: { accent: "bg-[#C2410C]", tint: "bg-[#FFF7ED]", text: "text-[#C2410C]" },
  "Para Clinical": { accent: "bg-[#0F766E]", tint: "bg-[#F0FDFA]", text: "text-[#0F766E]" },
  "Non Clinical": { accent: "bg-[#4F46E5]", tint: "bg-[#EEF2FF]", text: "text-[#4338CA]" },
};
const FEE_CARDS = FEE_GROUPS.map((g) => ({ ...g, ...FEE_STYLES[g.title] }));

function FeeStructure() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-20">
      <Title a="Fee" b="Structure" />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {FEE_CARDS.map((g) => (
          <div
            key={g.title}
            className={`relative overflow-hidden rounded-2xl border border-black/[0.06] p-6 pt-7 shadow-[0_8px_24px_rgba(19,42,82,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(19,42,82,0.12)] ${g.tint}`}
          >
            <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${g.accent}`} />
            <h3 className={`text-2xl font-extrabold ${g.text}`}>{g.title}</h3>
            <ul className="mt-5 divide-y divide-black/[0.07]">
              {FEE_CATEGORIES.map((c) => (
                <li key={c} className="flex items-center justify-between gap-4 py-3.5">
                  <span className="text-lg font-semibold text-[#132a52]">{c}</span>
                  {g.fees[c] != null ? (
                    <span className="text-right">
                      <span className={`text-xl font-extrabold ${g.text}`}>{inr(g.fees[c])}</span>
                      <span className="text-sm text-[#64748b]"> / year</span>
                    </span>
                  ) : (
                    <span className="text-sm text-[#64748b]">As notified</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-[#555] sm:text-base dark:text-slate-300">
        Fees for each category are as notified for the admission year by the competent authority.
      </p>
    </section>
  );
}

/** One colour per Related Courses card: deep shades so white text stays readable, each with a matching glow. */
/**
 * Soft, professional palette for the Related Courses cards: a light tint per card, a thin accent bar,
 * navy text, and the accent colour for the badge and button. Accents are deep enough for white button text.
 */
const RELATED_COLORS = [
  { tint: "bg-[#EEF2FF]", accent: "bg-[#4F46E5]", text: "text-[#4338CA]", soft: "bg-[#4F46E5]/10" }, // indigo
  { tint: "bg-[#F0FDFA]", accent: "bg-[#0F766E]", text: "text-[#0F766E]", soft: "bg-[#0F766E]/10" }, // teal
  { tint: "bg-[#FFF7ED]", accent: "bg-[#C2410C]", text: "text-[#C2410C]", soft: "bg-[#C2410C]/10" }, // orange
  { tint: "bg-[#F0F9FF]", accent: "bg-[#0369A1]", text: "text-[#0369A1]", soft: "bg-[#0369A1]/10" }, // sky
  { tint: "bg-[#FFF1F2]", accent: "bg-[#BE123C]", text: "text-[#BE123C]", soft: "bg-[#BE123C]/10" }, // rose
  { tint: "bg-[#ECFDF5]", accent: "bg-[#047857]", text: "text-[#047857]", soft: "bg-[#047857]/10" }, // emerald
  { tint: "bg-[#F5F3FF]", accent: "bg-[#6D28D9]", text: "text-[#6D28D9]", soft: "bg-[#6D28D9]/10" }, // violet
  { tint: "bg-[#FFFBEB]", accent: "bg-[#B45309]", text: "text-[#B45309]", soft: "bg-[#B45309]/10" }, // amber
  { tint: "bg-[#F1F5F9]", accent: "bg-[#334155]", text: "text-[#334155]", soft: "bg-[#334155]/10" }, // slate
];

/** Every other MD / MS programme as a card, each with its own soft colour. */
function Related({ d }: { d: PgProgrammeDetail }) {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-14 sm:px-8">
      <Title a="Related" b="Courses" />
      <p className="mt-3 text-base text-[#555] sm:text-lg dark:text-slate-300">Other postgraduate programmes at AIMS.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {d.related.map((r, i) => {
          const c = RELATED_COLORS[i % RELATED_COLORS.length];
          return (
            <div
              key={r.path}
              className={`group relative flex min-h-[220px] flex-col overflow-hidden rounded-2xl border border-black/[0.06] p-6 pt-7 shadow-[0_8px_24px_rgba(19,42,82,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(19,42,82,0.12)] ${c.tint}`}
            >
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-1.5 ${c.accent}`} />
              <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold tracking-[0.12em] ${c.soft} ${c.text}`}>
                {r.degree === "MS" ? "MS · MASTER OF SURGERY" : "MD · DOCTOR OF MEDICINE"}
              </span>
              <p className="mt-4 text-xl font-bold leading-snug text-[#132a52]">{r.name}</p>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-[#475569]">{r.summary}</p>
              <Link
                to={r.path}
                className={`mt-5 inline-flex w-fit items-center gap-1.5 rounded-md px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 ${c.accent}`}
              >
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/** FAQ answer text: words wrapped in **…** are highlighted, and a highlighted email address is a mail link. */
function FaqText({ text }: { text: string }) {
  const hl = "rounded-md bg-[#F47B20]/12 px-1.5 py-0.5 font-bold text-[#C2410C] dark:text-[#FDBA74]";
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 0 ? (
          part
        ) : part.includes("@") ? (
          <a key={i} href={`mailto:${part}`} className={`${hl} underline-offset-4 hover:underline`}>
            {part}
          </a>
        ) : (
          <strong key={i} className={hl}>
            {part}
          </strong>
        )
      )}
    </>
  );
}

function Faqs({ d }: { d: PgProgrammeDetail }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-8">
      <h2 className={H2}>FAQs</h2>
      <div className="mt-6 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
        {d.faqs.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 py-6 text-left text-lg font-bold text-[#132a52] sm:text-xl lg:text-[22px] dark:text-white"
            >
              {f.q}
              <ChevronDown className={`h-6 w-6 shrink-0 text-[#D9581A] transition-transform ${open === i ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {open === i && (
              <div className="pb-6">
                <p className="text-base leading-relaxed text-[#3d3d3d] sm:text-lg dark:text-slate-300">
                  <FaqText text={f.a} />
                </p>
                {f.link && (
                  <Link
                    to={f.link.path}
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#D9581A] px-5 text-sm font-semibold text-white hover:bg-[#bf4a12] sm:text-base"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" /> {f.link.label}
                  </Link>
                )}
                {f.map && (
                  <div className="mt-5 overflow-hidden rounded-2xl border border-black/10 shadow-lg dark:border-white/10">
                    <iframe
                      title="Map: Arundathi Institute of Medical Sciences, Dundigal"
                      src="https://maps.google.com/maps?q=Arundathi%20Institute%20of%20Medical%20Sciences%2C%20Dundigal&z=15&output=embed"
                      className="h-[320px] w-full sm:h-[380px]"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#D9581A] px-4 py-3 text-sm font-semibold text-white hover:bg-[#bf4a12] sm:text-base"
                    >
                      <MapPin className="h-4 w-4" aria-hidden="true" /> Open directions in Google Maps
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
