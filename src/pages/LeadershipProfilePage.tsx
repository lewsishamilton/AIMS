import { Navigate, useParams } from "react-router-dom";
import { ALL_LEADERSHIP_MEMBERS } from "../data/managementData";

export default function LeadershipProfilePage({ id }: { id?: string }) {
  const params = useParams();
  const member = ALL_LEADERSHIP_MEMBERS.find((m) => m.id === (id ?? params.id));
  if (!member?.profile) return <Navigate to="/management" replace />;
  const { profile } = member;

  return (
    <div className="atmos-page min-h-screen bg-[#fbfaf5] dark:bg-transparent text-[#1f3351] dark:text-white tracking-[0.015em] pt-28 lg:pt-36 pb-24 transition-colors duration-300">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* ─── Centered Header: Leadership & Governance ─── */}
        <div className="flex flex-col items-center mb-10 sm:mb-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-3.5">
            <span className="w-10 sm:w-12 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
            <span className="text-xs sm:text-[14px] font-bold tracking-[0.25em] text-[#4b6382] dark:text-teal-400 uppercase">
              AIMS LEADERSHIP
            </span>
            <span className="w-10 sm:w-12 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
          </div>

          <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#1f3351] dark:text-white leading-[1.18] tracking-tight text-center">
            Leadership &amp; Governance
          </h1>
        </div>

        {/* ─── Main Two-Column Profile Grid (Desktop: Left Image / Right Content; Mobile: Stacked) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Column: Dean Portrait Frame */}
          <div className="relative lg:sticky lg:top-28">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative overflow-hidden rounded-[26px] border border-[#dce8ee] dark:border-white/15 bg-[#0d2346] dark:bg-white/5 shadow-[0_16px_40px_rgba(8,44,76,0.10)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <img
                  src={member.photoUrl}
                  alt={`${profile.fullName} — ${member.role}, AIMS`}
                  className={`w-full h-[420px] sm:h-[480px] lg:h-[540px] xl:h-[580px] object-cover ${member.id === "dr-b-devanand" ? "object-center" : "object-top"} transition-transform duration-700 hover:scale-[1.02]`}
                />

                {/* Bottom Photographic Gradient Scrim with Identity */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d2346] via-[#0d2346]/80 to-transparent pt-16 pb-6 px-6">
                  <h2 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {profile.fullName}
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm mt-0.5 tracking-wide">
                    {member.role} · Arundathi Institute of Medical Sciences
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Information & Dean's Message */}
          <div className="flex flex-col justify-center">
            {/* Name & Designation Heading */}
            <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#1f3351] dark:text-white leading-[1.18] tracking-tight mb-2">
              {profile.fullName}
            </h2>
            <p className="text-base sm:text-lg font-semibold text-[#4b6382] dark:text-teal-200 tracking-wide mb-6">
              {profile.title}
            </p>

            {profile.bio && (
              <div className="space-y-5 text-base sm:text-[17px] text-[#4b6382] dark:text-slate-300 font-normal leading-[1.8] mb-10">
                {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            )}

            {profile.messageTitle && (
              <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-[#1f3351] dark:text-white mb-5">
                {profile.messageTitle}
              </h3>
            )}
            <div className="space-y-5 text-base sm:text-[17px] text-[#4b6382] dark:text-slate-300 font-normal leading-[1.8]">
              {profile.message.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* Formal Sign-off */}
            <div className="mt-8 pt-6 border-t border-[#dce8ee] dark:border-white/10">
              <p className="text-sm font-medium text-[#4b6382] dark:text-slate-400">Warm regards,</p>
              <p className="font-['Manrope',sans-serif] text-lg font-bold text-[#1f3351] dark:text-white mt-1">
                {profile.fullName.toUpperCase()},
              </p>
              <p className="text-sm font-semibold text-[#4b6382] dark:text-teal-200">{member.role.toUpperCase()},</p>
              <p className="text-xs text-[#4b6382]/80 dark:text-slate-400">
                Arundathi Institute of Medical Sciences (AIMS)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
