import React, { useState } from "react";

export interface FacultyCardProps {
  name: string;
  designation: string;
  photoUrl?: string;
  profileUrl?: string;
  departmentName?: string;
  roleBadge?: string;
  tier?: string;
  rank?: number;
  regCode?: string;
  className?: string;
}

/**
 * Capitalize starting letter of every word and make remaining letters lowercase.
 * Ensures consistent Title Case across all names (e.g. "Dr. Konuri Vijaya Kumar").
 */
export const formatFacultyName = (fullName: string): string => {
  if (!fullName) return "";
  
  // Clean multiple spaces and trim
  let str = fullName.trim().replace(/\s+/g, " ");

  // Normalize "DR." or "DR " or "Dr " prefix to "Dr. "
  if (/^dr\b/i.test(str) || /^dr\./i.test(str)) {
    str = str.replace(/^dr\.?\s*/i, "Dr. ");
  }

  // Capitalize each word: first letter uppercase, rest lowercase
  return str
    .split(" ")
    .map((word) => {
      if (!word) return "";
      // If the word has dots, like "B." or "K.V." or "Dr."
      if (word.includes(".")) {
        return word
          .split(".")
          .map((part) => {
            if (!part) return "";
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          })
          .join(".");
      }
      // If the word has hyphens, like "Al-Sayed"
      if (word.includes("-")) {
        return word
          .split("-")
          .map((part) => {
            if (!part) return "";
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
          })
          .join("-");
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

export const FacultyCard: React.FC<FacultyCardProps> = ({
  name,
  designation,
  photoUrl,
  profileUrl = "#",
  departmentName,
  regCode,
  className = "",
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  // Extract initials for fallback avatar
  const getInitials = (fullName: string) => {
    const clean = fullName
      .replace(/^dr\.\s*/i, "")
      .replace(/^dr\s+/i, "")
      .replace(/[^a-zA-Z\s]/g, "")
      .trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "DR";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const displayName = formatFacultyName(name);
  const hasPhoto = Boolean(photoUrl && !imgFailed);

  return (
    <div
      className={`group relative h-[380px] w-full overflow-hidden rounded-[20px] bg-[#0d2346] dark:bg-[#0b172a] font-sans border border-[#dce8ee]/30 dark:border-white/15 shadow-sm hover:shadow-xl dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Photo (Static - zero scaling or movement on hover) */}
      {hasPhoto ? (
        <img loading="lazy" decoding="async"
          src={photoUrl}
          alt={displayName}
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d2346] dark:bg-[#0b172a]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white font-['Manrope',sans-serif] text-2xl font-bold tracking-wider mb-2">
            {getInitials(name)}
          </div>
          <span className="text-[11px] font-medium tracking-widest text-[#d8d8d8]/60 uppercase">
            AIMS Faculty
          </span>
        </div>
      )}

      {/* Resting State: Dark Blue Gradient Scrim at Bottom until Name/Designation is visible */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 sm:h-44 pointer-events-none z-[1] transition-opacity duration-200 group-hover:opacity-0"
        style={{
          background:
            "linear-gradient(to top, rgba(13, 35, 70, 0.98) 0%, rgba(13, 35, 70, 0.88) 25%, rgba(13, 35, 70, 0.55) 55%, rgba(13, 35, 70, 0.15) 80%, rgba(13, 35, 70, 0) 100%)",
        }}
      />

      {/* Resting State Details: Bottom-Left Name & Designation (Title Case, no movement) */}
      <div className="absolute bottom-[20px] left-[18px] right-[18px] z-[2] text-white pointer-events-none transition-opacity duration-200 group-hover:opacity-0">
        <h3 className="font-['Manrope',sans-serif] text-[16px] sm:text-[17px] font-bold text-white leading-tight">
          {displayName}
        </h3>
        <p className="mt-1 text-[13px] font-normal text-white/85 dark:text-slate-300 leading-snug">
          {designation}
        </p>
        {regCode && (
          <p className="mt-[2px] text-[11px] font-normal text-white/60">
            Reg. No: {regCode}
          </p>
        )}
      </div>

      {/* Hover State: Dark Blue Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[3] pointer-events-none backdrop-blur-[1px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(13, 35, 70, 0.90) 0%, rgba(8, 23, 46, 0.93) 50%, rgba(4, 12, 24, 0.96) 100%)",
        }}
      />

      {/* Hover State Details: Centered Bold Name, Designation, Department, View Profile (Title Case, zero movement) */}
      <div className="absolute inset-0 z-[4] flex flex-col items-center justify-center px-5 py-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {/* Name in bold on center */}
        <h3 className="font-['Manrope',sans-serif] text-[18px] sm:text-[20px] font-bold text-white leading-tight">
          {displayName}
        </h3>

        {/* Below it: Designation */}
        <p className="mt-1.5 text-[13px] sm:text-[13.5px] font-normal text-white/75 dark:text-slate-300 leading-snug max-w-[90%]">
          {designation}
        </p>

        {/* Below it: Department with soft white color and light bold weight */}
        {departmentName && (
          <p className="mt-2.5 text-[13px] sm:text-[13.5px] font-semibold text-white/90 leading-relaxed max-w-[92%] px-2">
            {departmentName}
          </p>
        )}

        {regCode && (
          <p className="mt-1.5 text-[11px] font-normal text-[#94a3b8]">
            Reg. No: {regCode}
          </p>
        )}

        {/* View profile button */}
        <a
          href={profileUrl}
          onClick={(e) => {
            if (!profileUrl || profileUrl === "#") {
              e.preventDefault();
            }
          }}
          className="mt-5 inline-flex items-center justify-center px-6 py-2 rounded-[8px] border border-white/35 hover:border-white hover:bg-white/10 active:scale-95 text-white text-[13px] font-semibold tracking-wide transition-colors duration-150 cursor-pointer"
        >
          View profile
        </a>
      </div>
    </div>
  );
};

export default FacultyCard;