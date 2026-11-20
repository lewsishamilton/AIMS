import { Link } from "react-router-dom";
import { BadgeCheck, Compass, GraduationCap, Mail, MapPin, Phone, Send, Stethoscope } from "lucide-react";
import { CONTACT, MAPS_URL, SEAT_MATRIX, telHref } from "../data/siteInfo";
import { PG_PROGRAMMES } from "../data/pages/postgraduate";

/**
 * Admissions banner card for /admissions/apply — the Careers banner's blue card design, with the
 * facts in orange · white · green cards. Seat and programme counts are read from the site's data.
 * "Start your admissions enquiry" opens the on-site enquiry form (pages/AdmissionEnquiryPage.tsx).
 */

const FACTS = [
  {
    icon: Stethoscope,
    title: "MBBS",
    lines: [`${SEAT_MATRIX.total} seats`, "NEET-UG + KNRUHS counselling", "4½ years + internship"],
    card: "bg-gradient-to-br from-[#F47B20] via-[#E4611A] to-[#C2410C] text-white shadow-[0_14px_34px_rgba(244,123,32,0.45)]",
    icon_: "border border-white/35 bg-white/20 text-white",
    body: "text-white/90",
  },
  {
    icon: GraduationCap,
    title: "MD / MS",
    lines: [`${PG_PROGRAMMES.length} postgraduate specialities`, "NEET-PG + KNRUHS counselling", "3-year residency"],
    card: "bg-white text-[#132a52] shadow-[0_14px_34px_rgba(0,0,0,0.25)]",
    icon_: "bg-gradient-to-br from-[#FFB23D] to-[#F47B20] text-white",
    body: "text-[#334155]",
  },
  {
    icon: BadgeCheck,
    title: "Counselling code AIMD",
    lines: ["NMC Approved", "KNRUHS Affiliated", "Estd. 2023 · Dundigal"],
    card: "bg-gradient-to-br from-[#22A35A] via-[#15803d] to-[#0f6b33] text-white shadow-[0_14px_34px_rgba(21,128,61,0.45)]",
    icon_: "border border-white/35 bg-white/20 text-white",
    body: "text-white/90",
  },
];

export default function AdmissionsShowcase() {
  return (
    <section
      aria-labelledby="admissions-heading"
      className="relative isolate overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0f2347] via-[#173a73] to-[#1f4f9c] p-6 text-white shadow-[0_30px_80px_rgba(15,35,71,0.35)] sm:p-10 lg:p-12"
    >
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[#f28c28]/30 blur-3xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 -z-10 h-80 w-80 rounded-full bg-[#3b82f6]/30 blur-3xl" />

      <div className="flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2 rounded-full bg-[#f28c28] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-white shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:hidden" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          Admissions Open
        </span>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ffb36b]">Admissions 2026–27</p>
      </div>
      <h2 id="admissions-heading" className="mt-4 max-w-3xl font-['Manrope',sans-serif] text-3xl font-extrabold leading-tight sm:text-4xl">
        Apply to Arundathi Institute of Medical Sciences
      </h2>
      <p className="mt-2 text-base text-white/80 sm:text-lg">A medical college and teaching hospital in Dundigal, Telangana.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {FACTS.map(({ icon: Icon, title, lines, card, icon_, body }) => (
          <div key={title} className={`rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 ${card}`}>
            <span className={`grid h-12 w-12 place-items-center rounded-xl ${icon_}`}>
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <p className="mt-4 text-xl font-extrabold">{title}</p>
            <ul className={`mt-2 space-y-1.5 text-[15px] leading-snug ${body}`}>
              {lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <a href={telHref(CONTACT.admissionsPhone)} className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-4 hover:bg-white/[0.1]">
          <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb36b]" aria-hidden="true" />
          <p className="text-sm sm:text-base">
            <b>Call admissions</b> — {CONTACT.admissionsContact}, {CONTACT.admissionsPhone}
          </p>
        </a>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-4 hover:bg-white/[0.1]">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb36b]" aria-hidden="true" />
          <p className="text-sm sm:text-base">
            <b>Visit the campus</b> — Beside MLRIT, Dundigal, Hyderabad
          </p>
        </a>
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        <Link to="/admissions/apply/enquire" className="apply-cta inline-flex min-h-12 items-center gap-2 rounded-xl px-6 text-base font-semibold">
          <Send className="h-4 w-4" aria-hidden="true" /> Start your admissions enquiry
        </Link>
        <Link to="/virtual-tour" className="apply-cta apply-cta--alt inline-flex min-h-12 items-center gap-2 rounded-xl px-6 text-base font-semibold">
          <Compass className="h-4 w-4" aria-hidden="true" /> Take the Virtual Tour
        </Link>
        <a
          href={telHref(CONTACT.admissionsPhone)}
          className="apply-cta inline-flex min-h-12 items-center gap-2 rounded-xl px-6 text-base font-semibold"
          style={{ animationDelay: "-6s" }}
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> Call Admissions
        </a>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-sm sm:text-base">
        <a href={telHref(CONTACT.admissionsPhone)} className="flex items-center gap-2 font-semibold hover:text-[#ffb36b]">
          <Phone className="h-4 w-4 text-[#ffb36b]" aria-hidden="true" /> {CONTACT.admissionsPhone}
        </a>
        <a href={`mailto:${CONTACT.admissionsEmail}`} className="flex items-center gap-2 font-semibold hover:text-[#ffb36b]">
          <Mail className="h-4 w-4 text-[#ffb36b]" aria-hidden="true" /> {CONTACT.admissionsEmail}
        </a>
      </div>
    </section>
  );
}
