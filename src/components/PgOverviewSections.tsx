import { Link } from "react-router-dom";
import {
  ArrowRight,
  BedDouble,
  BookOpenCheck,
  Check,
  ClipboardList,
  FlaskConical,
  Mail,
  MapPin,
  MessagesSquare,
  PhoneCall,
  Presentation,
  ScrollText,
  ShieldCheck,
  Siren,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ContentBlock } from "../data/types";
import { CONTACT, MAPS_URL, localDigits, telHref } from "../data/siteInfo";
import { ADMISSION_NOTES, admissionSteps } from "../data/pgProgrammeDetails";
import PgAdmissionsPath from "./PgAdmissionsPath";
import "./PgOverviewSections.css";

/**
 * Purpose-built sections for the Postgraduate overview page (/academics/postgraduate). The words come
 * from the page's content (src/data/pages/academics.ts); these components only lay them out.
 */

const paragraphs = (c: ContentBlock["content"]) => (Array.isArray(c) ? c : c ? [c] : []);
const BODY = "text-left sm:text-justify text-base leading-[1.8] text-[#111] [hyphens:auto] sm:text-[17px] dark:text-slate-200";
const KICKER = "text-xs font-bold uppercase tracking-[0.2em] sm:text-[13px]";
const H2 = "font-['Manrope',sans-serif] text-3xl font-bold leading-tight tracking-tight sm:text-4xl";

/* ───────────── Clinical Learning + Research & Dissertation ───────────── */

const CLINICAL_ICONS: LucideIcon[] = [BedDouble, ClipboardList, MessagesSquare, Stethoscope, Siren, Presentation];

/** The four stages the Research & Dissertation text describes, in order. */
const RESEARCH_STEPS: { Icon: LucideIcon; label: string }[] = [
  { Icon: BookOpenCheck, label: "Clinical question" },
  { Icon: ShieldCheck, label: "Ethics & Scientific Committee review" },
  { Icon: FlaskConical, label: "Supervised research" },
  { Icon: ScrollText, label: "Dissertation to the university" },
];

export function ClinicalResearch({ blocks }: { blocks: ContentBlock[] }) {
  const [clinical, research] = blocks;
  return (
    <div className="grid gap-7 lg:grid-cols-2">
      {/* Clinical Learning: white card, live ECG trace, animated checklist */}
      <section className="pgo-clinical relative overflow-hidden rounded-[30px] border border-black/[0.06] bg-white p-7 shadow-[0_18px_50px_rgba(19,42,82,0.12)] sm:p-9 dark:border-white/10 dark:bg-white/[0.04]">
        <svg className="pgo-ecg" viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 40 H170 L185 40 L195 14 L208 66 L220 6 L234 56 L244 40 H360 L372 40 L380 26 L390 52 L398 40 H600" />
        </svg>
        <div className="relative">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#FFC94D] to-[#F47B20] text-white shadow-[0_10px_24px_rgba(244,123,32,0.4)]">
            <Stethoscope className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className={`${KICKER} mt-5 text-[#D9581A]`}>On the wards, every day</p>
          <h2 className={`${H2} mt-1 text-[#132a52] dark:text-white`}>{clinical.title}</h2>
          <ul className="mt-6 space-y-3">
            {(clinical.bullets ?? []).map((b, i) => {
              const Icon = CLINICAL_ICONS[i % CLINICAL_ICONS.length];
              return (
                <li
                  key={b}
                  className="pgo-rise group flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-[#F47B20]/[0.06]"
                  style={{ animationDelay: `${0.1 + i * 0.12}s` }}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#132a52]/[0.07] text-[#132a52] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#F47B20] group-hover:text-white dark:bg-white/10 dark:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className={`${BODY} pt-1.5`}>{b}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Research & Dissertation: soft teal card, orbiting molecule, four-stage path */}
      <section className="pgo-research relative overflow-hidden rounded-[30px] border border-[#0F766E]/10 bg-gradient-to-br from-[#ECFDF8] via-white to-[#E6F4F8] p-7 text-[#132a52] shadow-[0_18px_50px_rgba(15,118,110,0.14)] sm:p-9 dark:border-white/10 dark:from-white/[0.05] dark:via-white/[0.03] dark:to-white/[0.05] dark:text-white">
        <div className="pgo-molecule" aria-hidden="true">
          <span className="pgo-molecule__core" />
          <span className="pgo-molecule__orbit pgo-molecule__orbit--1"><i /></span>
          <span className="pgo-molecule__orbit pgo-molecule__orbit--2"><i /></span>
          <span className="pgo-molecule__orbit pgo-molecule__orbit--3"><i /></span>
        </div>
        <div className="relative">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#5EEAD4] to-[#0F766E] text-white shadow-[0_10px_24px_rgba(15,118,110,0.35)]">
            <FlaskConical className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className={`${KICKER} mt-5 text-[#0F766E] dark:text-[#5EEAD4]`}>From question to thesis</p>
          <h2 className={`${H2} mt-1 max-w-[16ch]`}>{research.title}</h2>

          <ol className="pgo-path mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {RESEARCH_STEPS.map(({ Icon, label }, i) => (
              <li key={label} className="pgo-rise relative flex flex-col items-center text-center" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                <span className="pgo-step grid h-14 w-14 place-items-center rounded-full border border-[#0F766E]/25 bg-white text-[#0F766E] shadow-sm dark:bg-white/10 dark:text-[#5EEAD4]" style={{ animationDelay: `${i * 0.8}s` }}>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="mt-2 text-[11px] font-bold uppercase tracking-wider text-[#0F766E] dark:text-[#5EEAD4]">Step {i + 1}</span>
                <span className="mt-0.5 text-sm font-semibold leading-snug">{label}</span>
              </li>
            ))}
          </ol>

          <div className="mt-7 space-y-4 rounded-2xl bg-white/80 p-5 ring-1 ring-[#0F766E]/10 sm:p-6 dark:bg-white/[0.06] dark:ring-white/10">
            {paragraphs(research.content).map((p) => (
              <p key={p.slice(0, 24)} className={BODY}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ───────────────────────── Eligibility & Admission ───────────────────────── */

/** The MD / MS "Admissions Path" band, as on every programme page, with the eligibility criteria above the steps. */
export function PgEligibility({ blocks }: { blocks: ContentBlock[] }) {
  const [b] = blocks;
  const [first, second] = (b.title ?? "Eligibility & Admission").split(/s*&s*/);
  return (
    <PgAdmissionsPath
      className="overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(19,42,82,0.28)]"
      heading={
        <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
          {first} &amp;
          <br />
          {second}
        </h2>
      }
      lead="Who can apply, and the five steps from NEET-PG to your first day of residency."
      intro={
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(b.bullets ?? []).map((text) => (
            <li key={text} className="flex items-start gap-3 rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#FBBF24] text-[#132a52]">
                <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
              </span>
              <span className="text-base leading-relaxed text-white/95">{text}</span>
            </li>
          ))}
        </ul>
      }
      steps={admissionSteps("your MD / MS programme")}
      notes={ADMISSION_NOTES}
    />
  );
}

/* ───────────────────── Talk to the Admissions Office ───────────────────── */

export function PgAdmissionsOffice({ blocks }: { blocks: ContentBlock[] }) {
  const [b] = blocks;
  // The section's first sentence is the invitation; the contact details come from the site's shared data.
  const intro = paragraphs(b.content)[0]?.split(/(?<=\.)\s+Admissions office/)[0] ?? "";
  const wa = `https://wa.me/91${localDigits(CONTACT.admissionsPhone)}?text=${encodeURIComponent(
    `Hello ${CONTACT.admissionsContact} Sir, I am enquiring about MD / MS admissions at AIMS.`
  )}`;
  return (
    <section className="pgo-office relative overflow-hidden rounded-[32px] border border-[#F47B20]/15 bg-gradient-to-br from-[#FFF4E8] via-[#FFFBF6] to-[#FFEBD6] text-[#132a52] shadow-[0_20px_50px_rgba(217,88,26,0.14)] dark:border-white/10 dark:from-white/[0.05] dark:via-white/[0.03] dark:to-white/[0.05] dark:text-white">
      <span aria-hidden="true" className="pgo-office__glow" />
      <div className="relative grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
        <div>
          <p className={`${KICKER} text-[#D9581A]`}>We are here to help</p>
          <h2 className={`${H2} mt-1`}>{b.title}</h2>
          <p className={`mt-4 ${BODY}`}>{intro}</p>

          <div className="mt-7 flex items-center gap-4 sm:gap-5">
            <a href={telHref(CONTACT.admissionsPhone)} className="pgo-call relative grid h-16 w-16 shrink-0 sm:h-20 sm:w-20 place-items-center rounded-full bg-gradient-to-br from-[#FF9A3D] to-[#E4561A] text-white shadow-[0_12px_28px_rgba(228,86,26,0.4)]" aria-label={`Call ${CONTACT.admissionsContact} on ${CONTACT.admissionsPhone}`}>
              <span className="pgo-call__ring" aria-hidden="true" />
              <span className="pgo-call__ring pgo-call__ring--2" aria-hidden="true" />
              <PhoneCall className="pgo-call__icon h-8 w-8" aria-hidden="true" />
            </a>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#64748b] dark:text-slate-400">Admissions in-charge</p>
              <p className="text-xl font-extrabold sm:text-2xl">{CONTACT.admissionsContact}</p>
              <a href={telHref(CONTACT.admissionsPhone)} className="whitespace-nowrap text-[22px] font-extrabold tracking-wide text-[#D9581A] underline-offset-4 hover:underline sm:text-3xl dark:text-[#FDBA74]">
                {CONTACT.admissionsPhone}
              </a>
            </div>
          </div>
        </div>

        <div className="pgo-glass rounded-3xl bg-white p-5 shadow-[0_14px_36px_rgba(19,42,82,0.10)] ring-1 ring-[#F47B20]/15 sm:p-6 dark:bg-white/[0.06] dark:ring-white/10">
          <ul className="space-y-2">
            {[
              { Icon: Mail, label: "Email", value: CONTACT.admissionsEmail, href: `mailto:${CONTACT.admissionsEmail}` },
              { Icon: PhoneCall, label: "Hospital", value: `${CONTACT.receptionPhone}\n${CONTACT.hospitalPhone2}`, href: telHref(CONTACT.receptionPhone) },
              { Icon: MapPin, label: "Campus", value: CONTACT.address, href: MAPS_URL, external: true },
            ].map(({ Icon, label, value, href, external }, i) => (
              <li key={label} className="pgo-rise" style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-start gap-4 rounded-2xl p-3 transition-colors hover:bg-[#F47B20]/[0.06]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#F47B20]/10 text-[#D9581A]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-400">{label}</span>
                    <span className="block whitespace-pre-line break-words text-base font-semibold leading-snug">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 text-base font-bold text-[#0f5132] transition hover:-translate-y-0.5 hover:bg-[#25D366]/20 dark:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path fill="#25D366" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2z" />
                <path fill="#fff" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
              </svg>
              WhatsApp
            </a>
            <Link
              to="/admissions/apply/enquire"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#132a52] px-4 py-3 text-base font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0d2346]"
            >
              Enquiry form <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-[#475569] dark:text-slate-300">
            <Users className="h-4 w-4 shrink-0" aria-hidden="true" /> Counselling college code <strong className="rounded bg-[#FBBF24] px-1.5 text-[#132a52]">AIMD</strong>
          </p>
        </div>
      </div>
    </section>
  );
}
