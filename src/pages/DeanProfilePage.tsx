import devanandImg from "../assets/Management/Dr.B.Devanand.jpeg";

export default function DeanProfilePage() {
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
                  src={devanandImg}
                  alt="Dr. B. Devanand — Dean, AIMS"
                  className="w-full h-[420px] sm:h-[480px] lg:h-[540px] xl:h-[580px] object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Bottom Photographic Gradient Scrim with Identity */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d2346] via-[#0d2346]/80 to-transparent pt-16 pb-6 px-6">
                  <h2 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-white tracking-wide">
                    Dr. B. Devanand
                  </h2>
                  <p className="text-white/80 text-xs sm:text-sm mt-0.5 tracking-wide">
                    Dean · Arundathi Institute of Medical Sciences
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Profile Information & Dean's Message */}
          <div className="flex flex-col justify-center">
            {/* Name & Designation Heading */}
            <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl lg:text-[38px] font-bold text-[#1f3351] dark:text-white leading-[1.18] tracking-tight mb-2">
              Dr. B. Devanand
            </h2>
            <p className="text-base sm:text-lg font-semibold text-[#4b6382] dark:text-teal-200 tracking-wide mb-6">
              Dean · Arundathi Institute of Medical Sciences (AIMS)
            </p>

            {/* Welcome & Dean's Message Card */}
            <div className="relative p-6 sm:p-7 rounded-[22px] bg-white dark:bg-white/[0.04] border-l-[4px] border-[#0d2346] dark:border-teal-400 border-y border-r border-[#dce8ee] dark:border-white/10 shadow-xs mb-8">
              <h3 className="font-['Manrope',sans-serif] text-lg sm:text-xl font-bold text-[#0d2346] dark:text-white mb-2">
                Dean&apos;s Message
              </h3>
              <h4 className="font-['Manrope',sans-serif] text-base sm:text-lg font-semibold text-[#1f3351]/90 dark:text-slate-200">
                Welcome to Arundathi Institute of Medical Sciences (AIMS)
              </h4>
            </div>

            {/* Complete Message Content from Dean's Document */}
            <div className="space-y-5 text-base sm:text-[17px] text-[#4b6382] dark:text-slate-300 font-normal leading-[1.8]">
              <p>
                At Arundathi Institute of Medical Sciences, our mission is built upon three
                fundamental pillars: academic excellence, advanced clinical care, and
                compassionate community service. As Dean, it is my privilege to welcome
                you to an institution dedicated to shaping the future of healthcare through
                rigorous education, scientific inquiry, and ethical practice.
              </p>

              <p>
                Our medical curriculum is designed not only to deliver comprehensive
                theoretical knowledge and clinical skill, but also to instil empathy, integrity, and
                professionalism in every student. Supported by a highly qualified and
                experienced faculty, state-of-the-art teaching facilities, modern laboratories, and
                a modern hospital infrastructure, we ensure that our students receive well-rounded
                hands-on clinical exposure from the very beginning of their journey.
              </p>

              <p>
                We are committed to maintaining the highest standards set by national
                regulatory authorities, ensuring our academic programs, research initiatives, and
                patient care protocols remain at the forefront of modern medicine. Through
                continuous quality improvement, evidence-based training, and a vibrant
                research environment, we strive to empower our medical trainees to become
                competent, patient-centric healthcare leaders of tomorrow.
              </p>

              <p>
                To our prospective and current students, faculty, and healthcare professionals:
                we invite you to be part of a dynamic learning ecosystem where passion meets
                purpose. To our patients and community: we reaffirm our dedicated pledge to
                offer quality, accessible, and compassionate care to all.
              </p>
            </div>

            {/* Formal Sign-off */}
            <div className="mt-8 pt-6 border-t border-[#dce8ee] dark:border-white/10">
              <p className="text-sm font-medium text-[#4b6382] dark:text-slate-400">Warm regards,</p>
              <p className="font-['Manrope',sans-serif] text-lg font-bold text-[#1f3351] dark:text-white mt-1">
                Dr. B. DEVANAND,
              </p>
              <p className="text-sm font-semibold text-[#4b6382] dark:text-teal-200">DEAN,</p>
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
