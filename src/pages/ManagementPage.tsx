import { useState } from "react";
import { Phone, Copy, Check } from "lucide-react";
import {
  EXECUTIVE_MEMBERS,
  PRINCIPALS,
  type ManagementMember,
} from "../data/managementData";

export default function ManagementPage() {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNumber(text);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  // Helper to extract clean initials for avatar
  const getInitials = (name: string) => {
    const clean = name
      .replace(/^dr\.\s*/i, "")
      .replace(/^mrs\.\s*/i, "")
      .replace(/^mr\.\s*/i, "")
      .replace(/[^a-zA-Z\s]/g, "")
      .trim();
    const parts = clean.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "AM";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Hierarchy segmentation
  const president = EXECUTIVE_MEMBERS.find((m) => m.hierarchyTier === "President");
  const officers = EXECUTIVE_MEMBERS.filter(
    (m) => m.hierarchyTier === "Key Executive Officers"
  );
  const committeeMembers = EXECUTIVE_MEMBERS.filter(
    (m) => m.hierarchyTier === "Executive Members"
  );

  // Seamless ID Card Component with bottom gradient for text readability
  const MemberCard = ({
    member,
    isPresident = false,
  }: {
    member: ManagementMember;
    isPresident?: boolean;
  }) => {
    return (
      <div
        className={`group relative overflow-hidden rounded-[22px] bg-[#0d2346] border border-[#dce8ee]/30 shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-end ${
          isPresident
            ? "max-w-xs sm:max-w-sm w-full mx-auto h-[380px] sm:h-[410px] ring-2 ring-[#1f3351]/20"
            : "w-full h-[350px] sm:h-[370px]"
        }`}
      >
        {/* Photo or Initials Monogram Frame */}
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0d2346] pb-16">
            <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white mb-2 shadow-inner">
              <span className="font-['Manrope',sans-serif] text-2xl font-bold tracking-wider">
                {getInitials(member.name)}
              </span>
            </div>
            <span className="text-[11px] font-medium tracking-widest text-white/50 uppercase">
              AIMS Leadership
            </span>
          </div>
        )}

        {/* Role badge top-left overlay */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-xs ${
              isPresident
                ? "bg-white text-[#0d2346]"
                : "bg-[#0d2346]/85 backdrop-blur-md text-white border border-white/20"
            }`}
          >
            {member.role}
          </span>
        </div>

        {/* Smooth photographic scrim gradient (zero harsh bar lines, continuous progressive fade) */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 sm:h-48 pointer-events-none z-[2]"
          style={{
            background:
              "linear-gradient(to top, rgba(13, 35, 70, 0.96) 0%, rgba(13, 35, 70, 0.85) 20%, rgba(13, 35, 70, 0.6) 45%, rgba(13, 35, 70, 0.3) 70%, rgba(13, 35, 70, 0.08) 88%, rgba(13, 35, 70, 0) 100%)",
          }}
        />

        {/* Member Details over dark blue gradient */}
        <div className="relative z-10 p-5 sm:p-6 text-white flex flex-col justify-end">
          <h3 className="font-['Manrope',sans-serif] text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-xs">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-white/80 mt-0.5 drop-shadow-xs">
            {member.role}
            {member.designationNote ? ` (${member.designationNote})` : ""}
          </p>

          {/* Contact action for members with phone numbers (Principals) */}
          {member.contact && (
            <div className="mt-3.5 pt-3 border-t border-white/15">
              <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                <a
                  href={`tel:${member.contact}`}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white hover:text-white/90 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-3 h-3" />
                  </div>
                  <span>{member.contact}</span>
                </a>

                <button
                  onClick={() => handleCopy(member.contact!)}
                  title="Copy Contact Number"
                  className="p-1 rounded-md text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                >
                  {copiedNumber === member.contact ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#fbfaf5] text-[#1f3351] tracking-[0.015em]">
      {/* ─── Top Header Banner (Clean Institutional Navy) ─── */}
      <div className="relative bg-[#0d2346] pt-32 pb-16 sm:pt-36 sm:pb-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1f3351_0%,#0d2346_100%)] opacity-90 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[1.5px] bg-white/30" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-white/80 uppercase">
              LEADERSHIP &amp; GOVERNANCE
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-white/30" />
          </div>

          <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-5xl lg:text-[52px] font-bold text-white leading-tight tracking-tight">
            Management
          </h1>
        </div>
      </div>

      {/* ─── Main Content Container ─── */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12 py-12 sm:py-16">
        {/* =========================================================================
            SECTION 1: MEMBERS OF THE EXECUTIVE COMMITTEE
           ========================================================================= */}
        <section className="mb-20">
          <div className="text-center mb-10 pb-4 border-b border-[#dce8ee]">
            <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1f3351] leading-tight">
              Members Of The Executive Committee
            </h2>
          </div>

          {/* 1. PRESIDENT (Top of Hierarchy) */}
          {president && (
            <div className="mb-12">
              <div className="flex justify-center">
                <MemberCard member={president} isPresident={true} />
              </div>
            </div>
          )}

          {/* 2. EXECUTIVE OFFICERS (Vice-President, Secretary, Treasurer, Joint Secretary) */}
          <div className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-3.5 sm:gap-x-4">
              {officers.map((officer) => (
                <MemberCard key={officer.id} member={officer} />
              ))}
            </div>
          </div>

          {/* 3. EXECUTIVE MEMBERS (P. Indumathi, M. Dhiren Reddy) */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-3.5 sm:gap-x-4 max-w-xl mx-auto">
              {committeeMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: PRINCIPAL
           ========================================================================= */}
        <section className="pt-8 border-t border-[#dce8ee]">
          <div className="text-center mb-10 pb-4 border-b border-[#dce8ee]">
            <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#1f3351] leading-tight">
              Principal
            </h2>
          </div>

          {/* PRINCIPALS (B.Sc MLT, Nursing, Physiotherapy) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4 sm:gap-x-5 max-w-4xl mx-auto">
            {PRINCIPALS.map((principal) => (
              <MemberCard key={principal.id} member={principal} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
