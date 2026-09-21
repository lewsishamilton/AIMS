import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import founderImg from "../../assets/marri-rajashekhar-reddy-profile-main-1.png";

const MAIN_QUOTE =
  "I have seen families and dreams falling apart due to unaffordable healthcare which had bothered me since long. With an unflinching zeal to provide free services, I made a promise to my mother to set up a hospital where every family can gain access to quality healthcare across generations with affordability no more a barrier.";

const FounderSection: React.FC = () => {
  return (
    <section id="founder" className="relative scroll-mt-20 bg-white dark:bg-transparent overflow-hidden pt-6 sm:pt-10 lg:pt-12 pb-16 sm:pb-24 lg:pb-28 tracking-[0.015em] transition-colors duration-300">
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-14 lg:px-20">
        {/* Section Header (Centered) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
              LEADERSHIP
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
          </div>
          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351] dark:text-white">
            Our Founder
          </h2>
        </motion.div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] xl:grid-cols-[390px_1fr] gap-10 lg:gap-14 xl:gap-18 items-center">
          {/* ── Left: Portrait Photo ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "0px 0px -120px 0px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="relative overflow-hidden rounded-[26px] border border-[#dce8ee] dark:border-white/15 bg-[#f7fafc] dark:bg-white/5 shadow-[0_14px_38px_rgba(8,44,76,0.10)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
              <img
                src={founderImg}
                alt="Marri Rajasekhar Reddy — Founder, AIMS"
                className="w-full h-[270px] sm:h-[300px] lg:h-[310px] xl:h-[320px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Clean bottom gradient overlay with name plate */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f3351]/95 via-[#1f3351]/75 to-transparent pt-12 pb-4 px-6 sm:px-7">
                <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-white tracking-wide">
                  Marri Rajasekhar Reddy
                </h3>
                <p className="text-white/80 text-sm font-medium mt-0.5 tracking-wide">
                  Founder · AIMS
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Quote Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "0px 0px -120px 0px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col justify-center"
          >
            {/* Main Quote Block */}
            <div className="relative p-6 sm:p-7 rounded-[22px] bg-[#F3F4F6] dark:bg-white/[0.04] border-l-[4px] border-[#1f3351] dark:border-teal-400 dark:border-y dark:border-r dark:border-white/10 shadow-xs dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
              <blockquote className="font-['Manrope',sans-serif] text-base sm:text-lg lg:text-[19px] font-medium leading-[1.65] tracking-[0.005em] text-[#1f3351] dark:text-slate-100">
                “{MAIN_QUOTE}”
              </blockquote>
            </div>

            {/* Read More Button (Navigates to founder page) */}
            <div className="mt-5 flex justify-start">
              <Link
                to="/founder"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1f3351] dark:bg-teal-500 hover:bg-[#152338] dark:hover:bg-teal-400 text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer group"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;


