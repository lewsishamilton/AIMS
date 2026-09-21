import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";
import hospitalImg from "../assets/aims-hospital.jpg";

export default function AboutHospitalPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-transparent text-[#1f3351] dark:text-white tracking-[0.015em] pt-28 lg:pt-36 pb-24 transition-colors duration-300">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-10 lg:px-16">
        {/* ─── Top Two-Column Section ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 sm:mb-20">
          {/* Left: Text & Badge (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Flanked Kicker */}
            <div className="inline-flex items-center gap-3 mb-3.5">
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase select-none">
                ABOUT AIMS HOSPITAL
              </span>
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
            </div>

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f0f4f8] dark:bg-white/10 border border-[#dce8ee] dark:border-white/15 mb-6 w-fit shadow-xs">
              <div className="w-6 h-6 rounded-full bg-[#1f3351] dark:bg-teal-500 flex items-center justify-center text-white shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold tracking-wider text-[#1f3351] dark:text-teal-400 uppercase">
                NABH ACCREDITED
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1f3351] dark:text-white leading-[1.18] tracking-tight mb-6">
              About Arundathi Hospital
            </h1>

            {/* Paragraph 1 with Drop Cap */}
            <div className="text-[#62748a] dark:text-slate-300 text-base sm:text-[17px] leading-relaxed space-y-4">
              <p className="overflow-hidden">
                <span className="float-left text-5xl sm:text-[54px] font-bold text-[#1f3351] dark:text-teal-400 leading-none pr-3 pt-1 font-['Manrope',sans-serif]">
                  A
                </span>
                rundathi Hospital is a state-of-the-art medical facility with NABH Accreditation that is committed to providing high-quality healthcare services to all patients, regardless of their ability to pay. Equipped with the latest medical technology and staffed by highly qualified healthcare professionals, the hospital offers a wide range of medical and super-speciality services, including diagnostics, surgery, and critical care.
              </p>

              {/* Paragraph 2 */}
              <p>
                What sets Arundhati Hospital apart is its commitment to provide free treatment and free diagnostic services to all patients, regardless of their financial status. This is made possible by the generous support of Marri Rajasekhar Reddy Foundation.
              </p>
            </div>
          </motion.div>

          {/* Right: Hospital Image (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-[24px] border border-[#dce8ee] dark:border-white/15 bg-white dark:bg-white/5 shadow-[0_14px_35px_rgba(8,44,76,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <img
                  src={hospitalImg}
                  alt="Arundathi Hospital Building and Facilities"
                  className="w-full h-[280px] sm:h-[350px] lg:h-[380px] object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Bottom Vision & Mission Cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative bg-white dark:bg-white/[0.04] dark:backdrop-blur-xl rounded-[24px] border border-[#dce8ee] dark:border-white/10 p-7 sm:p-9 shadow-[0_10px_30px_rgba(8,44,76,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col justify-start"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1f3351] dark:bg-teal-400" />

            {/* Icon Box */}
            <div className="w-12 h-12 rounded-[14px] bg-[#f0f4f8] dark:bg-white/10 flex items-center justify-center text-[#1f3351] dark:text-teal-400 mb-5 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>

            {/* Title */}
            <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-[26px] font-bold text-[#1f3351] dark:text-white mb-3">
              Vision
            </h2>

            {/* Content */}
            <p className="text-base text-[#62748a] dark:text-slate-300 leading-relaxed">
              We envision a future where every individual, regardless of their ability to pay, receives access to high-quality healthcare. By embracing innovation, patient-centered care, and a commitment to excellence, we strive to improve the health and well-being of our community.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative bg-white dark:bg-white/[0.04] dark:backdrop-blur-xl rounded-[24px] border border-[#dce8ee] dark:border-white/10 p-7 sm:p-9 shadow-[0_10px_30px_rgba(8,44,76,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col justify-start"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1f3351] dark:bg-teal-400" />

            {/* Icon Box */}
            <div className="w-12 h-12 rounded-[14px] bg-[#f0f4f8] dark:bg-white/10 flex items-center justify-center text-[#1f3351] dark:text-teal-400 mb-5 shrink-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>

            {/* Title */}
            <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-[26px] font-bold text-[#1f3351] dark:text-white mb-3">
              Mission
            </h2>

            {/* Content */}
            <p className="text-base text-[#62748a] dark:text-slate-300 leading-relaxed">
              Our objective is to erase the widespread belief that healthcare is expensive. We are constantly researching, collaborating, and implementing best practices in order to create a healthy society for a better tomorrow.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
