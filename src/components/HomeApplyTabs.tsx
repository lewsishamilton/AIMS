import { Link } from "react-router-dom";
import { Briefcase, GraduationCap } from "lucide-react";
import "./HomeApplyTabs.css";

/**
 * "Apply – Admissions" (blue) and "Apply – Job" (orange): two eye-catching tabs fixed to the right edge of
 * every page (mounted in App.tsx). Admissions opens /admissions/apply; Job opens Careers. Sits below the
 * admissions pop-up (z-70) and the assistant (z-60).
 */
const TABS = [
  {
    label: "Apply – Admissions",
    short: "Admissions",
    to: "/admissions/apply",
    external: false,
    Icon: GraduationCap,
    glow: "rgba(59, 130, 246, 0.65)",
    className:
      "bg-gradient-to-b from-[#1f4f9c] to-[#132a52] shadow-[0_10px_26px_rgba(19,42,82,0.45)] hover:shadow-[0_14px_32px_rgba(19,42,82,0.6)]",
  },
  {
    label: "Apply – Job",
    short: "Jobs",
    to: "/careers",
    external: false,
    Icon: Briefcase,
    glow: "rgba(244, 123, 32, 0.65)",
    className:
      "bg-gradient-to-b from-[#F47B20] to-[#D9581A] shadow-[0_10px_26px_rgba(228,86,26,0.45)] hover:shadow-[0_14px_32px_rgba(228,86,26,0.6)]",
  },
];

const tabClass =
  "apply-tab group flex items-center gap-2 rounded-l-xl border border-r-0 border-white/25 px-1.5 py-2.5 text-white transition-[padding,box-shadow] duration-300 hover:pr-2.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FFB23D]/60 sm:px-2.5 sm:py-4";

export default function HomeApplyTabs() {
  return (
    <nav aria-label="Apply" className="fixed right-0 top-1/2 z-[55] flex -translate-y-1/2 flex-col gap-1.5 sm:gap-2 print:hidden">
      {TABS.map(({ label, short, to, external, Icon, glow, className }) => {
        const content = (
          <>
            <span className="apply-tab__shine" aria-hidden="true" />
            <Icon className="relative h-3.5 w-3.5 sm:h-5 sm:w-5" aria-hidden="true" />
            {/* Phones get a short label so the tabs cover less of the page; the full label is still read out. */}
            <span className="relative rotate-180 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.12em] sm:hidden" aria-hidden="true">{short}</span>
            <span className="relative rotate-180 whitespace-nowrap text-xs font-bold uppercase tracking-[0.12em] max-sm:sr-only sm:text-sm">{label}</span>
          </>
        );
        return external ? (
          <a
            key={to}
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className={`${tabClass} ${className}`}
            style={{ writingMode: "vertical-rl", ["--tab-glow" as string]: glow }}
          >
            {content}
          </a>
        ) : (
          <Link key={to} to={to} className={`${tabClass} ${className}`} style={{ writingMode: "vertical-rl", ["--tab-glow" as string]: glow }}>
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
