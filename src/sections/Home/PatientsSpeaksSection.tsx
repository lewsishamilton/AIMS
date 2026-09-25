import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  ROW_1_SHORTS,
  ROW_2_SHORTS,
  type PatientShort,
} from "../../data/patientTestimonialsData";

interface ShortCardProps {
  short: PatientShort;
  onClick: (id: string) => void;
}

const ShortCard: React.FC<ShortCardProps> = ({ short, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const thumbnailUrl = imgError
    ? `https://i.ytimg.com/vi/${short.id}/mqdefault.jpg`
    : `https://i.ytimg.com/vi/${short.id}/hqdefault.jpg`;

  return (
    <div
      onClick={() => onClick(short.id)}
      className="group relative w-[135px] sm:w-[155px] lg:w-[170px] aspect-[9/16] rounded-xl sm:rounded-2xl overflow-hidden border border-[#dce8ee]/80 dark:border-white/15 bg-neutral-900 shadow-sm hover:shadow-[0_14px_30px_rgba(8,44,76,0.15)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-300 hover:scale-[1.03] shrink-0 select-none"
    >
      {/* Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={short.title}
        onError={() => setImgError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Subtle Neutral Dark Gradient for text legibility (no heavy blue tint) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent group-hover:from-black/90 transition-colors duration-300" />

      {/* Bottom Information */}
      <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-3 sm:inset-x-3 z-10 text-left">
        <span className="text-[9px] sm:text-[10px] uppercase font-semibold tracking-wider text-white/70 block mb-0.5">
          {short.category}
        </span>
        <h4 className="font-['Manrope',sans-serif] text-[11px] sm:text-xs font-semibold text-white leading-snug line-clamp-2 drop-shadow-sm">
          {short.title}
        </h4>
      </div>
    </div>
  );
};

export const PatientsSpeaksSection: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Close modal on ESC key and prevent body scroll when video modal is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideoId(null);
      }
    };

    if (activeVideoId) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideoId]);

  return (
    <section className="atmos-center relative pt-10 sm:pt-14 pb-6 sm:pb-8 bg-white dark:bg-transparent overflow-hidden tracking-[0.015em] transition-colors duration-300">
      <style>{`
        @keyframes marquee-scroll-left {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes marquee-scroll-right {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .marquee-track-left {
          display: flex;
          gap: 1.75rem;
          width: max-content;
          animation: marquee-scroll-left 46s linear infinite;
          will-change: transform;
        }

        .marquee-track-right {
          display: flex;
          gap: 1.75rem;
          width: max-content;
          animation: marquee-scroll-right 46s linear infinite;
          will-change: transform;
        }

        @media (min-width: 640px) {
          .marquee-track-left,
          .marquee-track-right {
            gap: 2.25rem;
          }
        }

        .marquee-track-left:hover,
        .marquee-track-right:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Section Header */}
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-14 lg:px-20 text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center justify-center gap-3 mb-3">
          <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
            TESTIMONIALS
          </span>
          <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
        </div>
        <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351] dark:text-white">
          Patients Speaks
        </h2>
        <p className="leading-normal tracking-tight text-[#62748a] dark:text-slate-300 max-w-2xl mx-auto text-base sm:text-lg mt-3">
          Real recovery stories shared by our patients. All surgeries and operations are provided completely <span className="font-semibold text-[#1f3351] dark:text-teal-400">free of cost</span> with compassion, dignity, and clinical excellence at Arundathi Hospital.
        </p>
      </div>

      {/* Dual Counter-Scrolling Marquee Container */}
      <div className="relative w-full overflow-hidden space-y-6 sm:space-y-8">
        {/* Row 1: Right-to-Left Scroll */}
        <div className="overflow-hidden flex py-1">
          <div className="marquee-track-left">
            {[...ROW_1_SHORTS, ...ROW_1_SHORTS].map((short, idx) => (
              <ShortCard
                key={`r1-${short.id}-${idx}`}
                short={short}
                onClick={(id) => setActiveVideoId(id)}
              />
            ))}
          </div>
        </div>

        {/* Row 2: Left-to-Right Counter Scroll */}
        <div className="overflow-hidden flex py-1">
          <div className="marquee-track-right">
            {[...ROW_2_SHORTS, ...ROW_2_SHORTS].map((short, idx) => (
              <ShortCard
                key={`r2-${short.id}-${idx}`}
                short={short}
                onClick={(id) => setActiveVideoId(id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pop-up Video Player Modal */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.65)] border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideoId(null)}
              aria-label="Close video"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-teal-500 text-white hover:border-teal-400 border border-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-200 cursor-pointer shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Embedded YouTube Player */}
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="Patient Speaks Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default PatientsSpeaksSection;
