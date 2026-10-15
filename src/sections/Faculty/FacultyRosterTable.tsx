import React from "react";
import type { FacultyMember } from "../../data/facultyData";
import { formatFacultyName } from "./FacultyCardProp";

interface FacultyRosterTableProps {
  members: FacultyMember[];
  searchQuery?: string;
  className?: string;
  highlightHodId?: string;
}

export const FacultyRosterTable: React.FC<FacultyRosterTableProps> = ({
  members,
  searchQuery = "",
  className = "",
  highlightHodId,
}) => {
  if (members.length === 0) {
    return (
      <div className="p-8 text-center text-sm text-[#475569] dark:text-slate-300">
        No faculty members matching &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo; in this department.
      </div>
    );
  }

  const getTierBadge = (tier: string, rank?: number) => {
    if (rank === 1 || tier.toLowerCase().includes("head")) {
      return "bg-[#1f3351]/12 text-[#1f3351] border-[#1f3351]/25 dark:bg-white/15 dark:text-white dark:border-white/25";
    }
    if (rank === 2 || tier.toLowerCase().includes("professors")) {
      return "bg-[#1f3351]/8 text-[#1f3351] border-[#1f3351]/20 dark:bg-white/10 dark:text-slate-100 dark:border-white/20";
    }
    if (rank === 3 || tier.toLowerCase().includes("associate")) {
      return "bg-[#1f3351]/6 text-[#1f3351] border-[#1f3351]/15 dark:bg-white/8 dark:text-slate-200 dark:border-white/15";
    }
    if (rank === 4 || tier.toLowerCase().includes("assistant")) {
      return "bg-[#1f3351]/5 text-[#1f3351] border-[#1f3351]/10 dark:bg-white/6 dark:text-slate-200 dark:border-white/10";
    }
    if (rank === 5 || tier.toLowerCase().includes("senior resident")) {
      return "bg-slate-100 text-[#1f3351] border-[#cbd5e1] dark:bg-white/[0.04] dark:text-slate-200 dark:border-white/10";
    }
    return "bg-slate-100 text-[#475569] border-slate-200 dark:bg-white/[0.03] dark:text-slate-300 dark:border-white/10";
  };

  return (
    <div className={`w-full overflow-x-auto ${className}`}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-[#e4ecf2] bg-[#f1f5f9]/70 text-[11px] font-bold uppercase tracking-wider text-[#1f3351] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
            <th scope="col" className="w-16 px-4 py-3.5 text-center sm:w-20 sm:px-6">
              Sl. No.
            </th>
            <th scope="col" className="px-4 py-3.5 sm:px-6">
              Faculty Name
            </th>
            <th scope="col" className="px-4 py-3.5 sm:px-6">
              Designation
            </th>
            <th scope="col" className="px-4 py-3.5 sm:px-6">
              Academic Cadre
            </th>
            <th scope="col" className="w-36 px-4 py-3.5 text-right sm:w-44 sm:px-6">
              Reg / Ref Code
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#e4ecf2] dark:divide-white/5">
          {members.map((faculty, index) => {
            const displayName = formatFacultyName(faculty.name);
            const isHod = faculty.id === highlightHodId || faculty.rank === 1;

            return (
              <tr
                key={faculty.id}
                className={`group transition-colors duration-150 hover:bg-[#1f3351]/[0.03] dark:hover:bg-white/[0.03] ${
                  isHod ? "bg-[#1f3351]/[0.02] dark:bg-white/[0.02]" : ""
                }`}
              >
                {/* Sl. No. */}
                <td className="whitespace-nowrap px-4 py-3.5 text-center font-['Manrope',sans-serif] text-xs font-semibold tabular-nums text-[#64748b] group-hover:text-[#162740] dark:text-slate-400 dark:group-hover:text-white sm:px-6">
                  {index + 1}
                </td>

                {/* Faculty Name (No photo, clean text row) */}
                <td className="px-4 py-3.5 font-['Manrope',sans-serif] text-sm font-bold tracking-wide text-[#162740] group-hover:text-[#0f172a] dark:text-slate-100 dark:group-hover:text-white sm:px-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span>{displayName}</span>
                    {isHod && (
                      <span className="rounded-full bg-[#1f3351] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white dark:bg-white/20 dark:text-white">
                        HOD
                      </span>
                    )}
                  </div>
                </td>

                {/* Designation */}
                <td className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold text-[#1f3351] dark:text-slate-200 sm:px-6 sm:text-sm">
                  {faculty.designation}
                </td>

                {/* Cadre / Academic Tier badge */}
                <td className="whitespace-nowrap px-4 py-3.5 sm:px-6">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${getTierBadge(
                      faculty.tier,
                      faculty.rank
                    )}`}
                  >
                    {faculty.roleBadge || faculty.tier}
                  </span>
                </td>

                {/* Registration Code */}
                <td className="whitespace-nowrap px-4 py-3.5 text-right sm:px-6">
                  <span className="inline-flex items-center rounded-md border border-[#cbd5e1] bg-[#f8fafc] px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-[#1f3351] shadow-2xs group-hover:border-[#1f3351]/30 group-hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:group-hover:border-white/30 dark:group-hover:text-white">
                    {faculty.regCode || `AIMS-${String(faculty.serialNumber || index + 1).padStart(3, "0")}`}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyRosterTable;
