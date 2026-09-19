import { motion } from "motion/react";
import { ArrowUpRight, Sparkles, Building2 } from "lucide-react";
import aboutImg from "../assets/about.png";

export default function AboutInstitutionPage() {
  return (
    <div className="min-h-screen bg-white text-[#1f3351] tracking-[0.015em] pt-28 lg:pt-36 pb-24">
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
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f0f4f8] border border-[#dce8ee] mb-6 w-fit shadow-xs">
              <div className="w-6 h-6 rounded-full bg-[#1f3351] flex items-center justify-center text-white shrink-0">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold tracking-wider text-[#1f3351] uppercase">
                ARUNDATHI INSTITUTE OF MEDICAL SCIENCES BUILDING
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1f3351] leading-[1.18] tracking-tight mb-6">
              About Institution
            </h1>

            {/* Paragraphs with Drop Cap */}
            <div className="text-[#62748a] text-base sm:text-[17px] leading-relaxed space-y-4">
              <p className="overflow-hidden">
                <span className="float-left text-5xl sm:text-[54px] font-bold text-[#1f3351] leading-none pr-3 pt-1 font-['Manrope',sans-serif]">
                  A
                </span>
                rundathi Institute of Medical Sciences is a premier medical college committed to excellence in healthcare education. Our institution is dedicated to producing highly skilled and compassionate medical professionals who can meet the ever-evolving healthcare needs of our society.
              </p>

              <p>
                With state-of-the-art infrastructure, a highly experienced faculty, and a wide range of academic programs, we provide our students with the best possible learning environment.
              </p>

              <p>
                At Arundathi Institute of Medical Sciences, we believe that education is the key to unlocking the potential of every individual, and we strive to provide our students with the knowledge, skills, and values they need to make a meaningful impact in their Medical field.
              </p>
            </div>
          </motion.div>

          {/* Right: College Image (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-[24px] border border-[#dce8ee] bg-white shadow-[0_14px_35px_rgba(8,44,76,0.08)]">
                <img
                  src={aboutImg}
                  alt="Arundathi Institute of Medical Sciences Building"
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
            className="relative bg-white rounded-[24px] border border-[#dce8ee] p-7 sm:p-9 shadow-[0_10px_30px_rgba(8,44,76,0.05)] overflow-hidden flex flex-col justify-start"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1f3351]" />

            {/* Icon Box */}
            <div className="w-12 h-12 rounded-[14px] bg-[#f0f4f8] flex items-center justify-center text-[#1f3351] mb-5 shrink-0">
              <Sparkles className="w-5 h-5 text-[#1f3351]" />
            </div>

            {/* Title */}
            <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-[26px] font-bold text-[#1f3351] mb-3">
              Vision
            </h2>

            {/* Content */}
            <p className="text-base text-[#62748a] leading-relaxed">
              Promote academic excellence and research to produce trained health manpower capable of shouldering the onus and responsibility ensuring an effective health care delivery system.
            </p>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative bg-white rounded-[24px] border border-[#dce8ee] p-7 sm:p-9 shadow-[0_10px_30px_rgba(8,44,76,0.05)] overflow-hidden flex flex-col justify-start"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#1f3351]" />

            {/* Icon Box */}
            <div className="w-12 h-12 rounded-[14px] bg-[#f0f4f8] flex items-center justify-center text-[#1f3351] mb-5 shrink-0">
              <ArrowUpRight className="w-5 h-5 text-[#1f3351]" />
            </div>

            {/* Title */}
            <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-[26px] font-bold text-[#1f3351] mb-3">
              Mission
            </h2>

            {/* Content */}
            <ul className="space-y-3 text-base text-[#62748a] leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-[#1f3351] font-bold mt-1 text-sm">•</span>
                <span>
                  Provide competency based education and opportunities for immersive learning to shape the student’s commitment to care, empathy, altruism and service.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-[#1f3351] font-bold mt-1 text-sm">•</span>
                <span>
                  Integrate teaching between traditional subject areas using a problem-based learning approach starting with clinical or community cases and exploring the relevance of various preclinical disciplines in both the understanding and resolution of the problem.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
