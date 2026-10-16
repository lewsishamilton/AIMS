import React, { useState } from "react";
import { Award, UserCheck, ShieldCheck, BookOpen } from "lucide-react";
import type { FacultyMember } from "../../data/facultyData";
import { formatFacultyName } from "./FacultyCardProp";

interface HodProfileCardProps {
  hod: FacultyMember;
  departmentName?: string;
  category?: string;
  className?: string;
}

export const HodProfileCard: React.FC<HodProfileCardProps> = ({
  hod,
  departmentName,
  category,
  className = "",
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  const displayName = formatFacultyName(hod.name);
  const deptTitle = departmentName || hod.departmentName;
  const deptCategory = category || hod.category;
  const hasPhoto = Boolean(hod.photoUrl && !imgFailed);

  // Extract initials for fallback avatar
  const getInitials = (fullName: string) => {
    const clean = fullName
      .replace(/^dr\.\s*/i, "")
      .replace(/^dr\s+/i, "")
      .replace(/[^a-zA-Z\s]/g, "")
      .trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "HOD";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  return (
    <div
      className={`relative overflow-hidden rounded-[26px] border border-[#dce8ee] bg-gradient-to-br from-white via-[#f8fafc] to-[#edf4f9] p-6 sm:p-8 shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-gradient-to-br dark:from-white/[0.05] dark:via-white/[0.02] dark:to-transparent dark:shadow-[0_16px_44px_rgba(0,0,0,0.4)] ${className}`}
    >
      {/* Decorative ambient background accents */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#1f3351]/5 blur-3xl dark:bg-white/5" />

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8 md:gap-10">
        {/* Large HOD Portrait Section (Left visual anchor) */}
        <div className="relative shrink-0 self-center sm:self-start">
          <div className="relative h-64 w-52 overflow-hidden rounded-[22px] border-4 border-white bg-slate-200 shadow-xl ring-1 ring-slate-900/10 sm:h-72 sm:w-60 md:h-80 md:w-64 dark:border-white/15 dark:bg-slate-800 dark:ring-white/20">
            {hasPhoto ? (
              <img
                src={hod.photoUrl}
                alt={displayName}
                onError={() => setImgFailed(true)}
                className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-[#1f3351] to-[#0f1d32] text-white">
                <span className="font-['Manrope',sans-serif] text-4xl font-extrabold tracking-wider text-white">
                  {getInitials(hod.name)}
                </span>
                <span className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-200">
                  Head of Department
                </span>
              </div>
            )}
          </div>

          {/* HOD ribbon badge */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/30 bg-[#1f3351] px-4 py-1 text-xs font-black uppercase tracking-widest text-white shadow-lg dark:border-white/20 dark:bg-white/20 dark:text-white">
            HOD
          </div>
        </div>

        {/* Structured Information Column (Organized by importance & value) */}
        <div className="flex flex-1 flex-col justify-between self-stretch text-center sm:text-left">
          {/* Top Level: Authority & Discipline Context */}
          <div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1f3351]/15 bg-[#1f3351]/10 px-3.5 py-1 text-xs font-extrabold text-[#1f3351] dark:border-white/20 dark:bg-white/10 dark:text-white">
                <Award className="h-3.5 w-3.5 text-[#1f3351] dark:text-white" />
                <span>Head of the Department</span>
              </span>

              {deptCategory && (
                <span className="rounded-full border border-[#cbd5e1] bg-white px-3 py-1 text-xs font-bold text-[#1f3351] shadow-2xs dark:border-white/15 dark:bg-white/5 dark:text-slate-200">
                  {deptCategory}
                </span>
              )}
            </div>
          </div>

          {/* Primary Focus: Bold Faculty Name, Designation & Department (Vertically Height Centered) */}
          <div className="my-auto py-4 sm:py-5">
            <h3 className="font-['Manrope',sans-serif] text-2xl font-black tracking-tight text-[#162740] sm:text-3xl lg:text-[34px] leading-tight dark:text-white">
              {displayName}
            </h3>

            <p className="mt-1.5 text-base font-extrabold text-[#1f3351] sm:text-lg dark:text-slate-100">
              {hod.designation}
            </p>

            <p className="mt-1 text-xs font-semibold text-[#596d86] sm:text-sm dark:text-slate-300">
              Department of {deptTitle} &bull; Arundathi Institute of Medical Sciences
            </p>
          </div>

          {/* Bottom Level: Institutional Accreditations & Supporting Credentials */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-t border-[#dce8ee] pt-4.5 sm:justify-start dark:border-white/10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cbd5e1] bg-white px-3.5 py-1 font-mono text-xs font-bold text-[#1f3351] shadow-2xs dark:border-white/15 dark:bg-white/5 dark:text-white">
              <ShieldCheck className="h-3.5 w-3.5 text-[#1f3351] dark:text-white" />
              {hod.regCode ? `Reg: ${hod.regCode}` : `Ref: AIMS-${String(hod.serialNumber || 1).padStart(3, "0")}`}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cbd5e1] bg-white px-3.5 py-1 text-xs font-bold text-[#1f3351] shadow-2xs dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <UserCheck className="h-3.5 w-3.5 text-[#1f3351] dark:text-white" />
              NMC Recognized Faculty
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cbd5e1] bg-white px-3.5 py-1 text-xs font-bold text-[#1f3351] shadow-2xs dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <BookOpen className="h-3.5 w-3.5 text-[#1f3351] dark:text-white" />
              Academic &amp; Clinical Lead
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodProfileCard;
