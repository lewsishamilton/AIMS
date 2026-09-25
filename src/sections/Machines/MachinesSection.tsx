import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X, Activity, Maximize2 } from "lucide-react";
import { MACHINES_DATA, type Machine } from "../../data/machines";

export interface MachinesSectionProps {
  className?: string;
  machines?: Machine[];
  isStandalonePage?: boolean;
}

export const MachinesSection: React.FC<MachinesSectionProps> = ({
  className = "",
  machines = MACHINES_DATA,
  isStandalonePage = false,
}) => {
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMachine(null);
      }
    };

    if (selectedMachine) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMachine]);

  return (
    <section
      id="machines-equipment"
      className={`atmos-dots relative ${
        isStandalonePage ? "py-2 sm:py-4" : "py-12 sm:py-16 lg:py-20"
      } bg-white dark:bg-transparent overflow-hidden tracking-[0.015em] transition-colors duration-300 ${className}`}
    >
      {/* Subtle Dot Grid Background matching AIMS sections */}
      <div
        className="atmos-dots-fade absolute inset-0 pointer-events-none opacity-25 dark:opacity-10"
        style={{
          backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center justify-center gap-3 mb-2.5">
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
              ADVANCED MEDICAL TECHNOLOGY
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
          </div>

          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight tracking-tight text-[#162740] dark:text-white mb-2.5">
            Machines & Equipment
          </h2>

          <p className="text-[#596d86] dark:text-slate-300 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            Advanced medical equipment supporting accurate diagnosis, treatment and patient care.
          </p>
        </div>

        {/* Responsive Card Grid: 3 cols Desktop, 2 cols Tablet, 1 col Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {machines.map((machine, index) => (
            <motion.div
              key={machine.id || index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="group relative flex flex-col h-full bg-[#fbfcfd] dark:bg-[#0c1626] rounded-[20px] sm:rounded-[22px] border border-[#dce8ee] dark:border-white/10 shadow-[0_4px_18px_rgba(8,44,76,0.05)] hover:shadow-[0_14px_32px_rgba(8,44,76,0.11)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* Card Image Area: Larger & Taller Aspect Ratio */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800/60 border-b border-[#e2e8f0]/70 dark:border-white/10">
                <img
                  src={machine.image}
                  alt={machine.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />

                {/* Category Pill Tag */}
                {machine.category && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-semibold tracking-wider uppercase text-white bg-[#1f3351]/90 dark:bg-black/70 border border-white/20 shadow-xs">
                      <Activity className="w-3 h-3 text-teal-300 dark:text-teal-300" />
                      <span>{machine.category}</span>
                    </span>
                  </div>
                )}

                {/* Quick Expand Button on Image Hover */}
                <button
                  type="button"
                  onClick={() => setSelectedMachine(machine)}
                  className="absolute bottom-2.5 right-2.5 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-[#1f3351] dark:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-md cursor-pointer"
                  title="Expand preview"
                  aria-label={`View details for ${machine.name}`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card Body Area: Compact, Tight Content Spacing */}
              <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-['Manrope',sans-serif] text-[17px] sm:text-[18.5px] font-bold text-[#1f3351] dark:text-white leading-snug tracking-tight mb-1.5 min-h-[2.85rem] flex items-start group-hover:text-[#0b4d8c] dark:group-hover:text-white transition-colors duration-200">
                    <span className="line-clamp-2">{machine.name}</span>
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#596d86] dark:text-slate-300 leading-relaxed font-normal line-clamp-2 min-h-[2.35rem]">
                    {machine.description}
                  </p>
                </div>

                {/* Card Action Link: Minimal & Clean Bottom Spacing */}
                <div className="pt-2.5 mt-2.5 border-t border-[#edf2f7] dark:border-white/10 flex items-center justify-start">
                  <button
                    type="button"
                    onClick={() => setSelectedMachine(machine)}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#edf6fc] hover:bg-[#d8ecf8] border border-[#c6e2f4] dark:bg-white/[0.07] dark:border-teal-400/30 dark:hover:bg-teal-500/15 dark:hover:border-teal-400 text-[11.5px] sm:text-xs font-semibold tracking-wide text-[#0f4c81] hover:text-[#0a365c] dark:text-slate-200 dark:hover:text-teal-200 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group/btn"
                  >
                    <span className="leading-none">View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1e6cae] dark:text-slate-400 group-hover/btn:text-[#0a365c] dark:group-hover/btn:text-teal-200 transition-transform duration-200 group-hover/btn:translate-x-0.5 shrink-0" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ─── Detail Modal Dialog ─── */}
      <AnimatePresence>
        {selectedMachine && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedMachine(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Card */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-machine-title"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0c1626] rounded-[24px] border border-[#dce8ee] dark:border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.35)] overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMachine(null)}
                aria-label="Close details"
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-md transition-all duration-200 cursor-pointer hover:rotate-90"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-900 shrink-0 overflow-hidden">
                <img
                  src={selectedMachine.image}
                  alt={selectedMachine.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-5 sm:left-7 right-5 z-10">
                  {selectedMachine.category && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-white bg-white/20 backdrop-blur-md border border-white/25 mb-2">
                      <Activity className="w-3 h-3 text-white/80" />
                      {selectedMachine.category}
                    </span>
                  )}
                  <h3
                    id="modal-machine-title"
                    className="font-['Manrope',sans-serif] text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight drop-shadow-sm"
                  >
                    {selectedMachine.name}
                  </h3>
                </div>
              </div>

              {/* Modal Body: Full Description */}
              <div className="p-6 sm:p-8 overflow-y-auto">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="w-4 h-1 rounded-full bg-[#1f3351] dark:bg-teal-400" />
                  <span className="text-xs font-bold tracking-wider uppercase text-[#4b6382] dark:text-teal-400">
                    Clinical Overview & Specifications
                  </span>
                </div>

                <p className="text-base sm:text-[17px] text-[#4b6382] dark:text-slate-200 leading-relaxed font-normal">
                  {selectedMachine.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MachinesSection;
