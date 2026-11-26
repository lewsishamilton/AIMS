import { motion } from "motion/react";
import { Building2, Eye, Target } from "lucide-react";
import aboutImg from "../assets/about.webp";

export default function AboutInstitutionPage() {
  return (
    <div className="atmos-page min-h-screen bg-white dark:bg-transparent text-[#1f3351] dark:text-white tracking-[0.015em] pt-28 lg:pt-36 pb-24 transition-colors duration-300">
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
                ABOUT AIMS INSTITUTION
              </span>
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
            </div>

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f0f4f8] dark:bg-white/10 border border-[#dce8ee] dark:border-white/15 mb-6 w-fit shadow-xs">
              <div className="w-6 h-6 rounded-full bg-[#1f3351] dark:bg-teal-500 flex items-center justify-center text-white shrink-0">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold tracking-wider text-[#1f3351] dark:text-teal-400 uppercase">
                ARUNDATHI INSTITUTE OF MEDICAL SCIENCES BUILDING
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1f3351] dark:text-white leading-[1.18] tracking-tight mb-6">
              About Institution
            </h1>

            {/* Paragraphs with Drop Cap */}
            <div className="space-y-4 text-left sm:text-justify text-base leading-[1.85] text-[#111] [hyphens:auto] sm:text-[17px] dark:text-slate-200">
              <p className="overflow-hidden">
                <span className="float-left text-5xl sm:text-[54px] font-bold text-[#1f3351] dark:text-teal-400 leading-none pr-3 pt-1 font-['Manrope',sans-serif]">
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
              <div className="relative overflow-hidden rounded-[24px] border border-[#dce8ee] dark:border-white/15 bg-white dark:bg-white/5 shadow-[0_14px_35px_rgba(8,44,76,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <img
                  src={aboutImg}
                  alt="Arundathi Institute of Medical Sciences Building"
                  className="w-full h-[280px] sm:h-[350px] lg:h-[380px] object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Vision & Mission: calm tinted cards ─── */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {[
            {
              title: "Vision",
              Icon: Eye,
              text: [
                "Promote academic excellence and research to produce trained health manpower capable of shouldering the onus and responsibility ensuring an effective health care delivery system.",
              ],
              card: "from-[#EEF4FF] via-white to-white ring-[#2754a3]/12",
              bar: "from-[#60A5FA] to-[#1f3351]",
              icon: "from-[#4f86e0] to-[#1f3351] shadow-[0_10px_24px_rgba(31,51,81,0.3)]",
              mark: "text-[#2754a3]/[0.06]",
              label: "text-[#2754a3]",
              dot: "bg-[#2754a3]",
              kicker: "Where we are headed",
            },
            {
              title: "Mission",
              Icon: Target,
              text: [
                "Provide competency based education and opportunities for immersive learning to shape the student’s commitment to care, empathy, altruism and service.",
                "Integrate teaching between traditional subject areas using a problem-based learning approach starting with clinical or community cases and exploring the relevance of various preclinical disciplines in both the understanding and resolution of the problem.",
              ],
              card: "from-[#FFF4E8] via-white to-white ring-[#F47B20]/15",
              bar: "from-[#FFC94D] to-[#D9581A]",
              icon: "from-[#FFB067] to-[#D9581A] shadow-[0_10px_24px_rgba(217,88,26,0.3)]",
              mark: "text-[#F47B20]/[0.07]",
              label: "text-[#D9581A]",
              dot: "bg-[#F47B20]",
              kicker: "What we do every day",
            },
          ].map(({ title, Icon, text, card, bar, icon, mark, label, dot, kicker }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`group relative flex flex-col overflow-hidden rounded-[26px] bg-gradient-to-br p-7 shadow-[0_14px_36px_rgba(8,44,76,0.08)] ring-1 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(8,44,76,0.14)] sm:p-9 dark:from-white/[0.05] dark:via-white/[0.03] dark:to-white/[0.02] dark:ring-white/10 ${card}`}
            >
              {/* Coloured bar down the left edge */}
              <span aria-hidden="true" className={`absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b ${bar}`} />
              {/* Large faint icon in the corner */}
              <Icon aria-hidden="true" strokeWidth={1.2} className={`pointer-events-none absolute -right-6 -top-6 h-40 w-40 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6 ${mark}`} />

              <div className="relative flex items-center gap-4">
                <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white transition-transform duration-500 group-hover:scale-105 ${icon}`}>
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.18em] ${label}`}>{kicker}</p>
                  <h2 className="font-['Manrope',sans-serif] text-2xl font-bold text-[#1f3351] sm:text-[28px] dark:text-white">{title}</h2>
                </div>
              </div>
              {text.length === 1 ? (
                <p className="relative mt-5 text-left sm:text-justify text-base leading-[1.85] text-[#111] [hyphens:auto] sm:text-[17px] dark:text-slate-200">{text[0]}</p>
              ) : (
                <ul className="relative mt-5 space-y-4">
                  {text.map((t) => (
                    <li key={t.slice(0, 20)} className="flex items-start gap-3">
                      <span aria-hidden="true" className={`mt-[11px] h-2 w-2 shrink-0 rounded-full ${dot}`} />
                      <span className="text-left sm:text-justify text-base leading-[1.85] text-[#111] [hyphens:auto] sm:text-[17px] dark:text-slate-200">{t}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
