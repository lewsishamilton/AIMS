import React from "react";
import { ArrowDown, GraduationCap, PhoneCall } from "lucide-react";

const ADMISSIONS_TEL = "tel:+919000994842";

/** Scrolling notice for PG admissions; points visitors at the Admissions Enquiry card further down the home page. */
export const AdmissionsMarquee: React.FC = () => {
  const scrollToEnquiry = (e: React.MouseEvent) => {
    const card = document.getElementById("admissions-enquiry");
    if (card) {
      e.preventDefault();
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderNotice = () => (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className="flex shrink-0 items-center gap-3 whitespace-nowrap px-8 text-sm font-semibold text-white sm:text-[15px]"
        >
          <span aria-hidden="true" className="text-base text-[#e6c98a]">
            ★
          </span>
          <span className="flex items-center gap-3 leading-tight">
            <span>
              Admissions for <span className="text-[#e6c98a]">PG / MS</span> programmes
            </span>
            <span className="flex items-center gap-2 text-[13px] font-medium text-white/80 sm:text-sm">
              <ArrowDown className="h-3.5 w-3.5 shrink-0 text-[#e6c98a]" aria-hidden="true" />
              <a
                href="#admissions-enquiry"
                onClick={scrollToEnquiry}
                className="underline-offset-4 hover:text-white hover:underline"
              >
                Admission Enquiry: Dr. Ch. Achireddy
              </a>
              <span aria-hidden="true" className="text-white/35">
                ·
              </span>
              <a
                href={ADMISSIONS_TEL}
                className="inline-flex items-center gap-1.5 whitespace-nowrap text-[#e6c98a] underline-offset-4 hover:text-[#f0d99a] hover:underline"
              >
                <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" />
                +91 90009 94842
              </a>
            </span>
          </span>
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

      {/* Translucent glass so the hero video shows through; navy in light theme, near-black in dark (matches the navbar) */}
      <div className="relative w-full overflow-hidden border-y border-white/15 bg-[#0d2346]/45 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] dark:border-white/10 dark:bg-black/40">
        <div className="flex items-center">
          {/* Flashing announcement badge with a clear admissions symbol */}
          <div className="relative z-20 flex shrink-0 items-center gap-2 border-r border-white/15 bg-[#0d2346]/70 py-2.5 pl-3 pr-3 sm:pl-5 sm:pr-4 dark:bg-black/50">
            <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37] text-[#0d2346]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#d4af37] opacity-60" />
              <GraduationCap className="relative h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="hidden text-[11px] font-bold uppercase tracking-[0.22em] text-[#e6c98a] sm:inline">
              Admissions
            </span>
          </div>

          {/* Right edge fades out via a mask, so no solid colour band fights the glass */}
          <div
            className="relative min-w-0 flex-1 overflow-hidden py-2.5 [mask-image:linear-gradient(to_right,black_85%,transparent)]"
            role="region"
            aria-label="PG admissions notice"
          >
            <div className="admissions-marquee-track">
              {renderNotice()}
              {renderNotice()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmissionsMarquee;
