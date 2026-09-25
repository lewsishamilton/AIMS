import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Compass, Building, Hospital, Activity } from "lucide-react";
import PageHero from "../components/PageHero";
import {
  VIRTUAL_TOUR_SECTIONS,
  type TourSection,
} from "../data/virtualTourData";

/** Reusable tour section block strictly following the Campus Tour UI/UX and 2-column layout */
const TourSectionBlock: React.FC<{
  section: TourSection;
  icon: React.ElementType;
}> = ({ section, icon: Icon }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentLocation = section.locations[selectedIndex] || section.locations[0];

  const handleSelect = (idx: number) => {
    if (idx !== selectedIndex) {
      setIsLoading(true);
      setSelectedIndex(idx);
    }
  };

  return (
    <section
      id={section.id}
      className="relative w-full rounded-[28px] border border-[#e5e7eb] bg-[#ffffff] p-6 sm:p-8 lg:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#0f172a]/40 scroll-mt-28"
    >
      {/* Centered Heading & Subtitle */}
      <div className="text-center mx-auto max-w-3xl">
        <div className="inline-flex items-center justify-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-400">
          <Icon className="h-4 w-4 text-[#1f3351] dark:text-teal-400" />
          <span>360° Panoramic Exploration</span>
        </div>
        <h2 className="font-['Manrope',sans-serif] text-2xl font-bold tracking-tight text-[#162740] dark:text-white sm:text-3xl">
          {section.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#596d86] dark:text-slate-300 sm:text-base">
          {section.subtitle}
        </p>
      </div>

      {/* Main Layout: Left-Side Navigation Column + Right-Side 360 Viewer Column with consistent height matching Campus Tour */}
      <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-12 lg:h-[500px]">
        {/* Left Column: Navigation List of locations */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col h-full">
          <div className="flex flex-col gap-1.5 h-full overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
            {section.locations.map((loc, idx) => {
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

        {/* Right Column: 360 Viewer matching exact height of campus tour */}
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
              key={`${section.id}-${currentLocation.id}`}
              src={currentLocation.embedUrl}
              title={`AIMS Virtual Tour - ${currentLocation.name}`}
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

const SECTION_ICONS: Record<string, React.ElementType> = {
  campus: Building,
  hospital: Hospital,
  "operation-theatre": Activity,
};

const VirtualTourPage: React.FC = () => {
  return (
    <div className="atmos-page min-h-screen bg-[#FAF9F5] tracking-[0.015em] transition-colors duration-300 dark:bg-transparent">
      {/* Page Hero matching site-wide style */}
      <PageHero
        eyebrow="Interactive Experience"
        title="Virtual Tour"
        subtitle="Step inside Arundathi Institute of Medical Sciences & Hospital with comprehensive 360° panoramic tours of our academic campus, patient care facilities, and surgical suites."
        pathname="/virtual-tour"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pb-20 sm:px-8 lg:px-12 pt-8 sm:pt-12">
        {/* Quick Section Anchor Jump Bar */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {VIRTUAL_TOUR_SECTIONS.map((sec) => {
            const Icon = SECTION_ICONS[sec.id] || Building;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-5 py-2 text-xs sm:text-sm font-semibold text-[#334155] shadow-xs transition hover:border-[#1f3351] hover:text-[#1f3351] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:border-teal-400 dark:hover:text-teal-300"
              >
                <Icon className="h-4 w-4" />
                <span>{sec.title}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                  {sec.locations.length}
                </span>
              </a>
            );
          })}
        </div>

        {/* Render each distinct section as separate blocks with identical 2-column layout */}
        <div className="space-y-12 sm:space-y-16">
          {VIRTUAL_TOUR_SECTIONS.map((section) => (
            <TourSectionBlock
              key={section.id}
              section={section}
              icon={SECTION_ICONS[section.id] || Building}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualTourPage;
