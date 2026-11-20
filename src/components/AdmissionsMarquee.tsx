import React from "react";
import { ArrowRight, GraduationCap, PhoneCall } from "lucide-react";

const ADMISSIONS_TEL = "tel:+919000994842";

/**
 * PG admissions notice under the navbar. A slim full-width strip with the call button fixed on the right so it never scrolls away.
 */
export const AdmissionsMarquee: React.FC = () => {
  const scrollToEnquiry = (e: React.MouseEvent) => {
    const card = document.getElementById("admissions-enquiry");
    if (card) {
      e.preventDefault();
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderNotice = (hidden: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {Array.from({ length: 3 }).map((_, i) => (
        <span key={i} className="flex shrink-0 items-center gap-3 whitespace-nowrap pr-10 text-[13px]">
          <span className="font-semibold text-white">
            Admissions open for <span className="font-bold">PG / MS</span> programmes
          </span>
          <span className="h-1 w-1 rounded-full bg-white/50" aria-hidden="true" />
          <a
            href="#admissions-enquiry"
            onClick={scrollToEnquiry}
            tabIndex={hidden ? -1 : undefined}
            className="inline-flex items-center gap-1 font-medium text-white/85 underline-offset-4 hover:text-white hover:underline"
          >
            Admission enquiry: Dr. Ch. Achireddy
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </span>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes admissionsMarqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .admissions-marquee-track {
          display: flex;
          width: max-content;
          animation: admissionsMarqueeScroll 45s linear infinite;
          will-change: transform;
        }
        .admissions-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .admissions-marquee-track { animation: none; }
        }
      `}</style>

      {/* Slim full-width strip in solid brand navy (no see-through tint), one colour family throughout */}
      <div className="w-full border-y border-white/10 bg-[#0d2346]/95 shadow-[0_6px_20px_rgba(0,0,0,0.25)] backdrop-blur-md dark:bg-[#070d18]/95">
        <div className="flex h-9 items-stretch">
          {/* Label: same navy, set apart by a divider instead of a different colour */}
          <span className="flex shrink-0 items-center gap-2 border-r border-white/15 px-3 text-white sm:px-5">
            <GraduationCap className="h-4 w-4" aria-hidden="true" />
            <span className="hidden text-xs font-bold uppercase tracking-[0.16em] sm:inline">Admissions</span>
          </span>

          {/* Scrolling notice, faded at both edges */}
          <div
            className="relative flex min-w-0 flex-1 items-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_3%,black_94%,transparent)]"
            role="region"
            aria-label="PG admissions notice"
          >
            <div className="admissions-marquee-track">
              {renderNotice(false)}
              {renderNotice(true)}
            </div>
          </div>

          {/* Call: always in view, full strip height for an easy tap */}
          <a
            href={ADMISSIONS_TEL}
            aria-label="Call admissions: +91 90009 94842"
            className="flex shrink-0 items-center gap-1.5 border-l border-white/15 px-3 text-[13px] font-semibold tabular-nums text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white sm:px-5"
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">+91 90009 94842</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default AdmissionsMarquee;
