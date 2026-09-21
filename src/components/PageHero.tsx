import React from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { sectionFor } from "./sectionTheme";

/**
 * The universal page masthead.
 *
 * One design for every interior page: a dark band carrying a breadcrumb, the
 * page title and a drawn motif, rather than a photograph chosen for atmosphere.
 * Each area of the site gets its own accent and glyph (see `sectionTheme.ts`),
 * so pages read as siblings while still telling you where you are.
 *
 * Deliberately dark in both themes — in light mode the navbar above it is
 * solid white, so the band gives the title contrast and separates the header
 * from the page; in dark mode it sits in the site's own palette.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** A single heartbeat traced across the band — P wave, QRS complex, T wave. */
const ECG_PATH =
  "M0,100 H300 l20,-14 14,28 16,-14 H520 l16,10 12,-64 14,116 12,-62 10,10 " +
  "H760 c26,0 26,-32 52,-32 26,0 26,32 52,32 H1100 l18,-12 14,24 16,-12 H1440";

const PageHero: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  pathname: string;
}> = ({ eyebrow, title, subtitle, pathname }) => {
  const { name, accent, Icon } = sectionFor(pathname);
  const reduceMotion = useReducedMotion();

  return (
    <header className="relative isolate overflow-hidden bg-[#13243c] pb-14 pt-32 dark:bg-[#080f1d] sm:pb-16 lg:pb-20 lg:pt-40">
      {/* Accent glows, tinted per area of the site */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(58% 120% at 86% 8%, ${accent}33, transparent 68%),
                       radial-gradient(48% 95% at 2% 100%, ${accent}1f, transparent 70%)`,
        }}
      />

      {/* Measured grid, faded out towards the bottom-left */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.055) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "radial-gradient(90% 110% at 78% 0%, #000 25%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(90% 110% at 78% 0%, #000 25%, transparent 78%)",
        }}
      />

      {/* Heartbeat trace */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full sm:h-20 lg:h-24"
        style={{ filter: `drop-shadow(0 0 10px ${accent}66)` }}
      >
        <motion.path
          d={ECG_PATH}
          fill="none"
          stroke={accent}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.5}
          initial={reduceMotion ? undefined : { pathLength: 0 }}
          animate={reduceMotion ? undefined : { pathLength: 1 }}
          transition={{ duration: 2.2, ease: "easeInOut", delay: 0.2 }}
        />
      </svg>

      {/* Area glyph */}
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? undefined : { opacity: 0, scale: 0.88 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        className="pointer-events-none absolute -right-8 -top-6 hidden sm:block lg:right-6 lg:top-10"
      >
        <Icon
          strokeWidth={0.9}
          className="h-52 w-52 lg:h-64 lg:w-64"
          style={{ color: accent, opacity: 0.13 }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 22 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45 sm:text-[11px]"
          >
            <Link to="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
            <span className="text-white/75">{name}</span>
          </nav>

          <div className="mb-4 flex items-center gap-3">
            <span
              className="h-[2px] w-9 flex-shrink-0 rounded-full"
              style={{ backgroundColor: accent }}
            />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.2em] sm:text-xs"
              style={{ color: accent }}
            >
              {eyebrow ?? name}
            </span>
          </div>

          <h1 className="max-w-4xl font-['Manrope',sans-serif] text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[50px]">
            {title}
          </h1>

          {subtitle && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base lg:text-[17px]">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>

      {/* Accent hairline closing the band */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${accent}88, transparent)`,
        }}
      />
    </header>
  );
};

export default PageHero;
