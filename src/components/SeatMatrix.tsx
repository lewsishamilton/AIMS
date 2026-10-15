import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, ShieldCheck, Building2 } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

export const SeatMatrix: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-12">
      {/* General Information */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="space-y-5"
      >
        <div className="flex items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-amber-500" />
          <h2 className="font-['Manrope',sans-serif] text-2xl font-bold tracking-tight text-[#162740] dark:text-white sm:text-3xl">
            General Information
          </h2>
        </div>

        {/* Structured Table */}
        <div className="overflow-hidden rounded-2xl border border-[#cbd5e1] bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.03]">
          <table className="w-full text-left text-sm sm:text-base border-collapse">
            <thead>
              <tr className="border-b border-[#cbd5e1] bg-[#f8fafc] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#334155] dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200">
                <th scope="col" className="border-r border-[#cbd5e1] px-6 py-4 sm:px-8 w-1/3 dark:border-white/10">
                  Category
                </th>
                <th scope="col" className="px-6 py-4 sm:px-8">
                  No of Intake Seats
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cbd5e1] dark:divide-white/10">
              <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="border-r border-[#cbd5e1] px-6 py-4 font-['Manrope',sans-serif] font-bold text-[#162740] sm:px-8 dark:border-white/10 dark:text-white">
                  A-Category
                </td>
                <td className="px-6 py-4 font-medium text-[#334155] sm:px-8 dark:text-slate-200">
                  50% of sanctioned intake (75 seats)
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="border-r border-[#cbd5e1] px-6 py-4 font-['Manrope',sans-serif] font-bold text-[#162740] sm:px-8 dark:border-white/10 dark:text-white">
                  B-Category
                </td>
                <td className="px-6 py-4 font-medium text-[#334155] sm:px-8 dark:text-slate-200">
                  35% of sanctioned intake (52 seats)
                </td>
              </tr>
              <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                <td className="border-r border-[#cbd5e1] px-6 py-4 font-['Manrope',sans-serif] font-bold text-[#162740] sm:px-8 dark:border-white/10 dark:text-white">
                  C-Category
                </td>
                <td className="px-6 py-4 font-medium text-[#334155] sm:px-8 dark:text-slate-200">
                  15% of sanctioned intake (23 seats)
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-[#cbd5e1] bg-[#f8fafc]/80 font-bold dark:border-white/10 dark:bg-white/[0.04]">
                <td className="border-r border-[#cbd5e1] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#475569] sm:px-8 dark:border-white/10 dark:text-slate-300">
                  Total
                </td>
                <td className="px-6 py-3.5 font-['Manrope',sans-serif] text-sm sm:text-base font-bold text-[#162740] sm:px-8 dark:text-white">
                  100% of sanctioned intake (150 seats)
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </motion.section>

      {/* Admission Criteria */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-amber-500" />
          <h2 className="font-['Manrope',sans-serif] text-2xl font-bold tracking-tight text-[#162740] dark:text-white sm:text-3xl">
            Admission Criteria
          </h2>
        </div>

        <div className="rounded-2xl border border-[#cbd5e1] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-7">
          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500 dark:text-teal-400" />
            <p className="font-['Manrope',sans-serif] text-base sm:text-lg font-medium leading-relaxed text-[#1e293b] dark:text-slate-100">
              As per regulations of NMC &amp; KNR University of Health Sciences, T.S., Warangal.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 pt-5 border-t border-[#e2e8f0] dark:border-white/10">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-1.5 text-xs font-semibold text-[#334155] dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-teal-400" />
              National Medical Commission (NMC)
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cbd5e1] bg-[#f8fafc] px-3.5 py-1.5 text-xs font-semibold text-[#334155] dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <Building2 className="h-4 w-4 text-[#1f3351] dark:text-teal-400" />
              KNR University of Health Sciences, T.S., Warangal
            </span>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default SeatMatrix;
