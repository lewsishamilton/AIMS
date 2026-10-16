import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { sectionFor } from "./sectionTheme";

/**
 * The universal page masthead.
 *
 * A full-width background photograph chosen for the page, under a dark blue tint and a
 * left-to-right gradient so the soft-white title always reads. Photos live in
 * assets/hero (Unsplash, see its README); rounded bottom corners end the band on the page.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

// Facility pages use the real AIMS photos from assets/facilities, looked up by the same bare name.
const HERO = import.meta.glob<string>(["../assets/hero/*.webp", "../assets/facilities/*.webp"], {
  eager: true,
  import: "default",
});
const hero = (name: string) =>
  HERO[`../assets/hero/${name}.webp`] ?? HERO[`../assets/facilities/${name}.webp`];

/** Exact route → photo; unlisted routes use their area's photo, then the default. */
const PAGE_PHOTO: Record<string, string> = {
  "/admissions": "admissions",
  "/admissions/criteria": "admission-criteria",
  "/admissions/seat-matrix": "seat-matrix",
  "/admissions/fee-structure": "fee-structure",
  "/admissions/forms": "application-forms",
  "/admissions/admitted-list": "admitted-list",
  "/academics/mbbs": "mbbs",
  "/academics/nursing-allied-health": "nursing",
  "/academics/paramedical-diplomas": "paramedical",
  "/academics/calendar": "academic-calendar",
  "/academics/research": "research",
  "/about/centres-of-excellence": "centres-of-excellence",
  "/approvals/government": "government-approvals",
  "/approvals/university-affiliation": "university-affiliation",
  "/facilities/academic": "academic-facilities",
  "/facilities/campus-life": "campus-life",
  "/facilities/hospital": "hospital-facilities",
  "/facilities/transport": "transport",
  "/facilities/hostel": "hostel",
  "/facilities/mess": "mess",
  "/facilities/gym": "gym",
  "/facilities/indoor-stadium": "indoor_stadium",
  "/patient-care/admission-discharge": "admission-discharge",
  "/patient-care/citizen-charter": "citizen-charter",
  "/patient-care/feedback": "feedback",
  "/patient-care/insurance": "insurance",
  "/patient-care/opd-timings": "opd-timings",
  "/services/diagnostics": "diagnostics",
  "/services/emergency-trauma": "emergency",
  "/services/specialities": "specialities",
  "/services/super-specialities": "super-specialities",
  "/virtual-tour": "virtual-tour",
  "/privacy-policy": "legal",
  "/terms-and-conditions": "legal",
};

const AREA_PHOTO: Record<string, string> = {
  Committees: "committees",
  Admissions: "admissions",
  Academics: "seat-matrix",
  Hospital: "specialities",
  "Patient Care": "citizen-charter",
  Facilities: "hospital-facilities",
};

const PageHero: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  pathname: string;
}> = ({ eyebrow, title, subtitle, pathname }) => {
  const { name } = sectionFor(pathname);
  const path = pathname.replace(/\/+$/, "") || "/";
  const photo = hero(PAGE_PHOTO[path] ?? AREA_PHOTO[name] ?? "default");
  const reduceMotion = useReducedMotion();

  return (
    <header
      className="relative isolate overflow-hidden bg-[#0d2346] pb-20 pt-32 sm:pb-24 lg:pb-28 lg:pt-40 dark:bg-[#060e1d]"
      // A gentle convex curve along the bottom; the page's own background shows beneath it in both themes.
      style={{ clipPath: "ellipse(150% 100% at 50% 0%)" }}
    >
      {/* Background photograph, with a slow settle-in zoom */}
      <motion.img
        src={photo}
        fetchPriority="high"
        decoding="async"
        alt=""
        aria-hidden="true"
        initial={reduceMotion ? undefined : { scale: 1.12 }}
        animate={reduceMotion ? undefined : { scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Dark blue tint over the whole photo */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#0d2346]/45 mix-blend-multiply dark:bg-[#040a16]/60" />
      {/* Gradient. Desktop: deep behind the text, then lighter where there is no text so the photo shows.
          Phones: the text spans the full width, so it stays deep across. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden md:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(9,25,52,0.94) 0%, rgba(11,31,61,0.82) 38%, rgba(12,33,66,0.72) 55%, rgba(13,35,70,0.35) 75%, rgba(13,35,70,0.15) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 md:hidden"
        style={{
          background: "linear-gradient(90deg, rgba(9,25,52,0.94) 0%, rgba(11,31,61,0.82) 50%, rgba(13,35,70,0.62) 100%)",
        }}
      />
      {/* Shade along the bottom so the band sits on the page */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-1/2"
        style={{ background: "linear-gradient(to top, rgba(6,16,34,0.4), transparent)" }}
      />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="max-w-2xl lg:max-w-[700px]"
        >
          <nav
            aria-label="Breadcrumb"
            className="mb-7 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 backdrop-blur-md sm:text-[11px]"
          >
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
            <span className="text-white">{name}</span>
          </nav>

          {/* Label framed by a line on each side, like the site's section labels. The negative
              right margin cancels the letter-spacing after the last letter so both gaps match. */}
          <div className="mb-4 flex w-fit items-center gap-3">
            <span className="h-px w-10 flex-shrink-0 bg-white/50" />
            <span className="mr-[-0.24em] text-xs font-semibold uppercase tracking-[0.24em] text-[#f1f5f9]/90 sm:text-[13px]">
              {eyebrow ?? name}
            </span>
            <span className="h-px w-10 flex-shrink-0 bg-white/50" />
          </div>

          <h1 className="font-['Manrope',sans-serif] text-3xl font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.3)] sm:text-4xl lg:text-[52px]">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-5 text-sm leading-relaxed text-[#e2e8f0]/90 sm:text-base lg:text-[17px]">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default PageHero;
