import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Compass } from "lucide-react";
import { CAMPUS_TOUR_LOCATIONS, type TourLocation } from "../data/campusTourData";

const CampusVirtualTour: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentLocation: TourLocation = CAMPUS_TOUR_LOCATIONS[selectedIndex];

  const handleSelect = (index: number) => {
    if (index !== selectedIndex) {
      setIsLoading(true);
      setSelectedIndex(index);
    }
  };

  return (
    <section className="relative w-full rounded-[28px] border border-[#e5e7eb] bg-[#ffffff] p-6 sm:p-8 lg:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#0f172a]/40">
      {/* Centered Section Header */}
      <div className="text-center mx-auto max-w-3xl">
        <h2 className="font-['Manrope',sans-serif] text-2xl font-bold tracking-tight text-[#162740] dark:text-white sm:text-3xl">
          Campus Virtual Tour
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#596d86] dark:text-slate-300 sm:text-base">
          Explore our campus facilities, pre-clinical laboratories, museum, and academic blocks through interactive 360° views.
        </p>
      </div>

      {/* Main Layout: Left-Side Navigation Column + Right-Side 360 Viewer matching exact 500px height */}
      <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:h-[500px]">
        {/* Left Column: Navigation List of all 10 locations */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col h-full">
          <div className="flex flex-col gap-1.5 h-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
            {CAMPUS_TOUR_LOCATIONS.map((loc, idx) => {
              const isCurrent = idx === selectedIndex;
              return (
                <button
                  key={loc.id}
                  onClick={() => handleSelect(idx)}
                  type="button"
                  className={`group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs sm:text-sm font-medium transition-all duration-200 border flex-shrink-0 ${
                    isCurrent
                      ? "border-[#1f3351] bg-[#1f3351] text-white shadow-sm dark:border-white/20 dark:bg-white/15 dark:text-white"
                      : "border-[#e5e7eb] bg-[#f9fafb] text-[#334155] hover:border-[#cbd5e1] hover:bg-[#f1f5f9] dark:border-white/10 dark:bg-white/[0.03] dark:text-slate-300 dark:hover:bg-white/[0.08] dark:hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md text-[11px] font-semibold ${
                        isCurrent
                          ? "bg-white/20 text-white"
                          : "bg-[#e2e8f0] text-[#64748b] group-hover:bg-[#cbd5e1] group-hover:text-[#1e293b] dark:bg-white/10 dark:text-slate-400"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate font-semibold">{loc.name}</span>
                  </div>

                  <MapPin
                    className={`h-3.5 w-3.5 flex-shrink-0 transition-opacity ${
                      isCurrent
                        ? "opacity-90 text-white"
                        : "opacity-0 group-hover:opacity-40 text-slate-400"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: 360 Viewer matching exact height */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col h-full min-h-[420px] sm:min-h-[480px] lg:min-h-0">
          <div className="relative flex-1 w-full h-full min-h-[420px] sm:min-h-[480px] lg:min-h-0 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] dark:border-white/10 dark:bg-[#020617]">
            {/* Loading Indicator */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs"
                >
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1f3351] border-t-transparent dark:border-white dark:border-t-transparent" />
                  <span className="text-xs font-medium text-[#475569] dark:text-slate-300">
                    Loading 360° view...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Embedded Google Maps 360 Photosphere (offset by -82px to clip Google Maps place card popup) */}
            <iframe
              key={currentLocation.id}
              src={currentLocation.embedUrl}
              title={`AIMS Campus Tour - ${currentLocation.name}`}
              className="absolute -top-[82px] left-0 h-[calc(100%+82px)] w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setIsLoading(false)}
            />

            {/* Subtle Pan Hint in bottom corner */}
            <div className="pointer-events-none absolute bottom-3 right-3 z-10">
              <div className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3 py-1 text-[11px] font-medium text-[#334155] shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#0f172a]/90 dark:text-slate-300">
                <Compass className="h-3 w-3 text-[#1f3351] dark:text-teal-400" />
                <span>Drag to pan 360°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampusVirtualTour;
