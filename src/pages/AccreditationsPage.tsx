import { motion } from "motion/react";
import nabhLogo from "../assets/Accreditations/nabh_logo.png";
import nmcLogo from "../assets/Accreditations/nmc_logo.png";
import knruhsLogo from "../assets/Accreditations/knruhs_logo.png";
import viceChancellorImg from "../assets/Accreditations/vice-chancellor.png";
import registrarImg from "../assets/Accreditations/registrar.png";

interface Accreditation {
  logo: string;
  name: string;
  description: string;
}

interface Official {
  image: string;
  designation: string;
  name: string;
  affiliation: string;
  phone: string;
  email: string;
}

const ACCREDITATIONS: Accreditation[] = [
  {
    logo: nabhLogo,
    name: "NABH Accreditation",
    description:
      "Marri Arundhathi Multi-Specialty Hospital, attached to AIMS Arundhathi Institute of Technology, is accredited by the National Accreditation Board for Hospitals & Healthcare Providers (NABH). The accreditation reflects standards for quality healthcare, patient safety, continuous clinical improvement, and healthcare protocols.",
  },
  {
    logo: nmcLogo,
    name: "National Medical Commission (NMC)",
    description:
      "The MBBS undergraduate program at AIMS Arundhathi Institute of Technology is recognized by the National Medical Commission (NMC). This recognition reflects compliance with national medical education standards, infrastructure requirements, laboratory facilities, and clinical training requirements.",
  },
  {
    logo: knruhsLogo,
    name: "Kaloji Narayana Rao University of Health Sciences (KNRUHS)",
    description:
      "AIMS Arundhathi Institute of Technology is academically affiliated with Kaloji Narayana Rao University of Health Sciences (KNRUHS), Warangal. The university oversees academic curriculum, examinations, and degree-related academic processes for medical programs.",
  },
];

const OFFICIALS: Official[] = [
  {
    image: viceChancellorImg,
    designation: "Vice – Chancellor",
    name: "Dr. B. Karunakar Reddy M.D.",
    affiliation: "Kaloji Narayana Rao University of Health Sciences, Warangal, Telangana.",
    phone: "0870 2454555",
    email: "knruhsgwl15@gmail.com",
  },
  {
    image: registrarImg,
    designation: "Registrar",
    name: "Dr. S. Sandhya",
    affiliation: "Kaloji Narayana Rao University of Health Sciences, Warangal, Telangana.",
    phone: "0870 2454555",
    email: "knruhsgwl15@gmail.com",
  },
];

export default function AccreditationsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-transparent text-[#1f3351] dark:text-white tracking-[0.015em] pt-28 lg:pt-36 pb-24 transition-colors duration-300">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-10 lg:px-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-12 sm:mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-3.5">
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
              RECOGNITIONS & AFFILIATIONS
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
          </div>

          <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1f3351] dark:text-white leading-[1.18] tracking-tight mb-3">
            Accreditations & Affiliations
          </h1>

          <p className="text-sm sm:text-base text-[#4b6382] dark:text-slate-300 max-w-2xl leading-relaxed">
            Recognitions and academic affiliations that support excellence in medical education and healthcare.
          </p>
        </motion.div>

        {/* Accreditation Cards */}
        <div className="flex flex-col gap-5 mb-16 sm:mb-20">
          {ACCREDITATIONS.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`flex flex-col sm:flex-row ${
                index % 2 === 1 ? "sm:flex-row-reverse" : ""
              } items-center gap-8 sm:gap-12 rounded-[22px] border border-[#dce8ee] dark:border-white/10 bg-[#fbfcfd] dark:bg-[#0c1626] shadow-[0_4px_18px_rgba(8,44,76,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-6 sm:p-8`}
            >
              <div className="w-[180px] sm:w-[200px] shrink-0 flex items-center justify-center">
                <img
                  src={item.logo}
                  alt={`${item.name} logo`}
                  className="max-w-[170px] max-h-[130px] w-auto h-auto object-contain"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-[#1f3351] dark:text-white leading-snug tracking-tight mb-2">
                  {item.name}
                </h3>
                <p className="text-sm sm:text-[15px] text-[#596d86] dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* University Officials */}
        <div className="rounded-[24px] border border-[#e7eef4] dark:border-white/10 bg-[#f8fbfd] dark:bg-white/[0.03] px-5 sm:px-10 py-8 sm:py-10">
          <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10">
            <span className="w-8 sm:w-9 h-[2px] bg-[#1f3351] dark:bg-teal-400" />
            <h2 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-[#1f3351] dark:text-white tracking-tight whitespace-nowrap">
              University Officials
            </h2>
            <span className="w-8 sm:w-9 h-[2px] bg-[#1f3351] dark:bg-teal-400" />
          </div>

          <div className="flex flex-col gap-5">
            {OFFICIALS.map((official) => (
              <motion.div
                key={official.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 rounded-[18px] border border-[#e7eef4] dark:border-white/10 bg-white dark:bg-[#0c1626] p-6 sm:p-7"
              >
                <div className="w-[150px] h-[150px] sm:w-[175px] sm:h-[175px] shrink-0">
                  <img
                    src={official.image}
                    alt={official.designation}
                    className="w-full h-full object-cover rounded-full border border-[#e7eef4] dark:border-white/15"
                  />
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="text-sm font-semibold text-[#4b6382] dark:text-teal-300 mb-1">
                    {official.designation}
                  </div>
                  <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-[#1f3351] dark:text-white mb-2">
                    {official.name}
                  </h3>
                  <p className="text-sm text-[#5f7183] dark:text-slate-300 mb-3 leading-relaxed">
                    {official.affiliation}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-1.5 sm:gap-6">
                    <span className="text-xs sm:text-[13px] text-[#18324f] dark:text-slate-200">
                      Ph: {official.phone}
                    </span>
                    <span className="text-xs sm:text-[13px] text-[#18324f] dark:text-slate-200">
                      Mail ID: {official.email}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
