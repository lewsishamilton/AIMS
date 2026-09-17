import React, { useState } from "react";

export interface FacultyCardProps {
  name: string;
  designation: string;
  photoUrl?: string;
  profileUrl?: string;
  linkedinUrl?: string;
  departmentName?: string;
  roleBadge?: string;
  tier?: string;
  rank?: number;
  regCode?: string;
  className?: string;
}

export const FacultyCard: React.FC<FacultyCardProps> = ({
  name,
  designation,
  photoUrl,
  profileUrl = "#",
  linkedinUrl = "https://www.linkedin.com/",
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

  const hasPhoto = Boolean(photoUrl && !imgFailed);

  return (
    <div
      className={`group relative h-[375px] w-full cursor-pointer overflow-hidden rounded-[20px] bg-[#1f3351] font-sans border border-[#dce8ee]/30 dark:border-white/15 dark:shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 hover:shadow-lg dark:hover:border-white/30 ${className}`}
    >
      {/* Photo or Clean Medical Fallback */}
      {hasPhoto ? (
        <img
          src={photoUrl}
          alt={name}
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:blur-[4px] group-hover:brightness-[40%]"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1f3351] transition-all duration-700 ease-in-out group-hover:blur-[2px] group-hover:brightness-[60%]">
          {/* Subtle Caduceus / Medical Cross Line Icon */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white font-['Manrope',sans-serif] text-2xl font-bold tracking-wider mb-2">
            {getInitials(name)}
          </div>
          <span className="text-[11px] font-medium tracking-widest text-[#d8d8d8]/60 uppercase">
            AIMS Faculty
          </span>
        </div>
      )}

      {/* Subtle Readability Gradient when resting, smooth darkening on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070f18]/90 via-[#070f18]/30 via-30% to-transparent to-60% transition-all duration-500 ease-in-out group-hover:bg-[#070f18]/65" />

      {/* Faculty Details */}
      <div className="absolute bottom-[25px] left-[18px] right-[18px] z-[2] text-[#fbfaf5] transition-all duration-700 ease-in-out group-hover:bottom-[140px] group-hover:left-[12px] group-hover:right-[12px] group-hover:-translate-y-[5px] group-hover:text-center">
        <h3 className="text-[17px] font-semibold leading-[1.3] text-[#fbfaf5]">
          {name}
        </h3>
        <p className="mt-[6px] text-[13px] font-normal text-[#d8d8d8]">
          {designation}
        </p>
        {regCode && (
          <p className="mt-[2px] text-[11px] font-normal text-[#94a3b8] dark:text-slate-300">
            Reg. No: {regCode}
          </p>
        )}
      </div>

      {/* View Profile Button */}
      <a
        href={profileUrl}
        className="absolute bottom-[-60px] left-1/2 z-[3] w-[130px] -translate-x-1/2 rounded-[8px] border border-[#fbfaf5]/70 dark:border-white/30 dark:bg-white/10 dark:backdrop-blur-md px-2 py-[10px] text-center text-[13px] font-semibold text-[#fbfaf5] opacity-0 transition-all duration-700 ease-in-out hover:bg-[#fbfaf5]/15 dark:hover:bg-white/20 group-hover:bottom-[70px] group-hover:opacity-100"
      >
        View profile
      </a>

      {/* LinkedIn Icon matching original */}
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open LinkedIn profile of ${name}`}
        className="absolute bottom-[15px] right-[15px] z-[4] flex h-[29px] w-[29px] items-center justify-center rounded-full border-2 border-[#0a66c2] bg-[#0a66c2] text-white no-underline group-hover:border-white group-hover:bg-white group-hover:text-[#1f3351] transition-colors"
      >
        <span className="text-[15px] font-bold leading-none">in</span>
      </a>
    </div>
  );
};

export default FacultyCard;