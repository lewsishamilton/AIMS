import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, FolderCheck, GraduationCap, Info, Mail, MonitorCheck, PhoneCall, Send, TicketCheck } from "lucide-react";
import { CONTACT, telHref } from "../data/siteInfo";

/**
 * "Admissions Path" band: five admission steps on a zig-zag timeline joined by flowing arcs (a vertical
 * timeline on phones), then the note and enquiry cards. Used on every MD / MS programme page and on the
 * Postgraduate overview page. The arc and flow-line animations live in src/index.css.
 */

export type AdmissionStep = { title: string; detail: string };
export type AdmissionNote = { title: string; text: string };

const STEP_ICONS = [GraduationCap, MonitorCheck, TicketCheck, FolderCheck, BadgeCheck];
/** One colour per admission step, warm to cool along the flow line. */
const STEP_THEMES = [
  { circle: "from-[#FFD36B] to-[#F59E0B] shadow-[0_12px_32px_rgba(245,158,11,0.55)]", label: "text-[#FFD27A]" },
  { circle: "from-[#FDBA74] to-[#EA580C] shadow-[0_12px_32px_rgba(234,88,12,0.55)]", label: "text-[#FDBA74]" },
  { circle: "from-[#FDA4AF] to-[#E11D48] shadow-[0_12px_32px_rgba(225,29,72,0.5)]", label: "text-[#FDA4AF]" },
  { circle: "from-[#C4B5FD] to-[#7C3AED] shadow-[0_12px_32px_rgba(124,58,237,0.55)]", label: "text-[#C4B5FD]" },
  { circle: "from-[#7DD3FC] to-[#0284C7] shadow-[0_12px_32px_rgba(2,132,199,0.55)]", label: "text-[#7DD3FC]" },
];

export const ADMISSIONS_BAND = "bg-gradient-to-br from-[#132a52] via-[#1c3d78] to-[#2754a3] text-white";

function AdmissionArcs({ count }: { count: number }) {
  const W = 1000;
  const H = 140;
  const mid = H / 2;
  const xs = Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * W);
  const d = xs
    .slice(1)
    .map((x, i) => {
      const x0 = xs[i];
      const cy = i % 2 === 0 ? mid + 62 : mid - 62; // first arc dips, next rises, and so on
      return `${i === 0 ? `M ${x0} ${mid} ` : ""}Q ${(x0 + x) / 2} ${cy} ${x} ${mid}`;
    })
    .join(" ");
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-1/2 h-[140px] w-full -translate-y-1/2"
    >
      <defs>
        <linearGradient id="admission-arc-gradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="25%" stopColor="#ea580c" />
          <stop offset="50%" stopColor="#e11d48" />
          <stop offset="75%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      <path d={d} fill="none" stroke="url(#admission-arc-gradient)" strokeWidth={6} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d={d} fill="none" stroke="white" strokeOpacity={0.95} strokeWidth={4} strokeLinecap="round" vectorEffect="non-scaling-stroke" className="admission-arc-dots" />
    </svg>
  );
}

/** Coloured step circle with its number badge. */
function StepCircle({ i }: { i: number }) {
  const Icon = STEP_ICONS[i % STEP_ICONS.length];
  const theme = STEP_THEMES[i % STEP_THEMES.length];
  return (
    <span className="relative z-10 shrink-0">
      <span
        className={`grid h-[88px] w-[88px] place-items-center rounded-full bg-gradient-to-br ring-4 ring-white/25 transition-transform duration-300 hover:scale-105 ${theme.circle}`}
      >
        <Icon className="h-10 w-10 text-white drop-shadow" aria-hidden="true" />
      </span>
      <span className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full bg-white text-sm font-extrabold text-[#132a52] shadow-md">
        {i + 1}
      </span>
    </span>
  );
}

/** Step label, title and one-line detail; a glass card on the desktop zig-zag, plain text in the vertical list. */
function StepText({ s, i, plain }: { s: AdmissionStep; i: number; plain?: boolean }) {
  const theme = STEP_THEMES[i % STEP_THEMES.length];
  return (
    <div className={plain ? "" : "w-full rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm"}>
      <p className={`text-xs font-extrabold uppercase tracking-[0.2em] ${theme.label}`}>Step {String(i + 1).padStart(2, "0")}</p>
      <h3 className="mt-1.5 text-lg font-bold leading-snug sm:text-xl">{s.title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-white/80">
        {/* Words wrapped in **…** are highlighted as a gold chip. */}
        {s.detail.split("**").map((part, k) =>
          k % 2 === 0 ? (
            part
          ) : (
            <strong key={k} className="rounded-md bg-[#FBBF24] px-1.5 py-0.5 font-extrabold tracking-wide text-[#0B2A55]">
              {part}
            </strong>
          ),
        )}
      </p>
    </div>
  );
}

/** Admissions-path note: white card with a gold accent bar and an info badge. */
function NoteCard({ title, text }: AdmissionNote) {
  return (
    <div className="relative flex h-full overflow-hidden rounded-xl bg-white text-[#1f2a44] shadow-md ring-1 ring-white/40">
      <span aria-hidden="true" className="w-1.5 shrink-0 bg-gradient-to-b from-[#FBBF24] via-[#F59E0B] to-[#F47B20]" />
      <div className="flex gap-3 px-4 py-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FDE68A] to-[#F59E0B] text-white shadow-md">
          <Info className="h-4 w-4" strokeWidth={2.4} />
        </span>
        <div>
          <p className="text-base font-bold text-[#0B3A75]">{title}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#475569]">{text}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#0B3A75]/8 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#0B3A75]">
            <BadgeCheck className="h-3.5 w-3.5" /> Convener · Management · NRI
          </p>
        </div>
      </div>
    </div>
  );
}

/** Admissions-path enquiry: warm orange card with the contact person, call / email and the enquiry form. */
function EnquiryCard({ title }: { title: string }) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#F47B20] via-[#EA6A12] to-[#C2410C] px-4 py-4 text-white shadow-md">
      <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-14 h-20 w-20 rounded-full bg-white/10" />
      <div className="relative flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#EA6A12] shadow-md">
          <PhoneCall className="h-4 w-4" strokeWidth={2.4} />
        </span>
        <div>
          <p className="text-base font-bold">{title}</p>
          <p className="text-xs text-white/85">For the current seat matrix and reporting schedule</p>
        </div>
      </div>
      <p className="relative mt-3 text-base font-bold">{CONTACT.admissionsContact}</p>
      <div className="relative mt-2 flex flex-wrap gap-2">
        <a
          href={telHref(CONTACT.admissionsPhone)}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#C2410C] shadow transition hover:bg-[#FFF3E8]"
        >
          <PhoneCall className="h-3.5 w-3.5" /> {CONTACT.admissionsPhone}
        </a>
        <a
          href={`mailto:${CONTACT.admissionsEmail}`}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold ring-1 ring-white/50 transition hover:bg-white/25"
        >
          <Mail className="h-3.5 w-3.5" /> {CONTACT.admissionsEmail}
        </a>
      </div>
      <Link
        to="/admissions/apply/enquire"
        className="relative mt-3 inline-flex items-center gap-1.5 self-start text-xs font-bold underline-offset-4 hover:underline"
      >
        <Send className="h-3.5 w-3.5" /> Send an online enquiry <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

/** The steps, the timeline and the note cards. `heading` is the band's title; `intro` sits between the lead and the timeline. */
export default function PgAdmissionsPath({
  heading,
  lead = "Five steps from NEET-PG to your first day of residency.",
  steps,
  notes,
  intro,
  className = "",
}: {
  heading: ReactNode;
  lead?: string;
  steps: AdmissionStep[];
  notes: AdmissionNote[];
  intro?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`${ADMISSIONS_BAND} ${className}`}>
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 lg:py-16">
        {heading}
        <p className="mt-3 max-w-2xl text-base text-white/80 sm:text-lg">{lead}</p>
        {intro}
        {/* Desktop: zig-zag timeline — circles joined by flowing arcs, details alternating above and below. */}
        <ol className="relative mt-12 hidden grid-cols-5 gap-5 lg:grid">
          <AdmissionArcs count={steps.length} />
          {steps.map((s, i) => {
            const above = i % 2 === 0;
            return (
              <li key={s.title} className="grid grid-rows-[260px_auto_300px] justify-items-center text-center">
                <div className="flex flex-col items-center justify-end">
                  {above && (
                    <>
                      <StepText s={s} i={i} />
                      <span aria-hidden="true" className="mt-3 h-8 w-0.5 shrink-0 bg-gradient-to-b from-white/10 to-white/60" />
                    </>
                  )}
                </div>
                <StepCircle i={i} />
                <div className="flex flex-col items-center justify-start">
                  {!above && (
                    <>
                      <span aria-hidden="true" className="mb-3 h-8 w-0.5 shrink-0 bg-gradient-to-b from-white/60 to-white/10" />
                      <StepText s={s} i={i} />
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Phones and tablets: vertical timeline. */}
        <ol className="relative mt-12 grid gap-9 lg:hidden">
          <span aria-hidden="true" className="admission-flow-v absolute bottom-10 left-[41px] top-10 w-1.5 rounded-full" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex items-start gap-5">
              <StepCircle i={i} />
              <div className="pt-2">
                <StepText s={s} i={i} plain />
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2">
          {notes.map((n) =>
            n.title === "Admissions Enquiry" ? <EnquiryCard key={n.title} title={n.title} /> : <NoteCard key={n.title} title={n.title} text={n.text} />,
          )}
        </div>
      </div>
    </section>
  );
}
