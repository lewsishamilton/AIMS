import React from "react";
import { motion } from "motion/react";
import founderImg from "../../assets/marri-rajashekhar-reddy-profile-main-1.png";

const MAIN_QUOTE =
  "I have seen families and dreams falling apart due to unaffordable healthcare which had bothered me since long. With an unflinching zeal to provide free services, I made a promise to my mother to set up a hospital where every family can gain access to quality healthcare across generations with affordability no more a barrier.";

const PARAGRAPHS = [
  "Arundhati Institute of Medical Sciences (AIMS) is the realization of that bigger dream — establishing an institution that not only caters to the needs of thousands of families by offering them accessible healthcare, but also creates an enduring legacy of selfless service.",
  "Here, we have assembled a team of highly skilled and compassionate healthcare professionals who share this noble mission. With all their passion and dedication, they strive relentlessly to ensure a truly nurturing environment with a sincere touch of personalized healthcare to help patients in every possible manner.",
];

const FounderSection: React.FC = () => {
  return (
    <section className="relative bg-white overflow-hidden py-16 sm:py-24 lg:py-28 tracking-[0.015em]">
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-14 lg:px-20">
        {/* Mobile Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="lg:hidden mb-6"
        >
          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351]">
            Founder's Vision
          </h2>
        </motion.div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] xl:grid-cols-[450px_1fr] gap-10 lg:gap-14 xl:gap-18 items-start">
          {/* ── Left: Portrait Photo (lowered on desktop to link up with start of quote) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "0px 0px -120px 0px" }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="lg:pt-[75px]"
          >
            <div className="relative overflow-hidden rounded-[26px] border border-[#dce8ee] bg-[#f7fafc] shadow-[0_14px_38px_rgba(8,44,76,0.10)] group">
              <img
                src={founderImg}
                alt="Marri Rajasekhar Reddy — Founder & Chairman, AIMS"
                className="w-full h-[380px] sm:h-[450px] lg:h-[430px] xl:h-[440px] object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Clean bottom gradient overlay with name plate */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f3351]/95 via-[#1f3351]/75 to-transparent pt-16 pb-6 px-6 sm:px-7">
                <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-white tracking-wide">
                  Marri Rajasekhar Reddy
                </h3>
                <p className="text-white/80 text-sm font-medium mt-1 tracking-wide">
                  Founder &amp; Chairman · AIMS
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right: Quote & Vision Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25, margin: "0px 0px -120px 0px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col justify-center"
          >
            {/* Desktop Section Heading */}
            <h2 className="hidden lg:block font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351] mb-6">
              Founder's Vision
            </h2>

            {/* Main Quote Block */}
            <div className="relative pl-6 sm:pl-7 border-l-[3px] border-[#1f3351] mb-6 sm:mb-7">
              <blockquote className="font-['Manrope',sans-serif] text-xl sm:text-2xl lg:text-[23px] font-medium leading-[1.5] tracking-[0.005em] text-[#1f3351]">
                “{MAIN_QUOTE}”
              </blockquote>
            </div>

            {/* Non-repetitive follow-up narrative */}
            <div className="space-y-4 text-[#62748a] font-sans text-base sm:text-[17px] leading-relaxed">
              {PARAGRAPHS.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
