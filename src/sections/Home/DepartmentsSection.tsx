import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import preclinicalImg from "../../assets/preclinical.jpg";
import paraclinicalImg from "../../assets/paraclinical.jpg";
import clinicalImg from "../../assets/clinical.jpg";

const DEPARTMENTS = [
  {
    tag: "FOUNDATION SCIENCES",
    name: "Pre-Clinical",
    description: "Foundational medical sciences covering Anatomy, Physiology, and Biochemistry for comprehensive grounding.",
    image: preclinicalImg,
    imageAlt: "Pre-Clinical Department",
  },
  {
    tag: "DIAGNOSTIC SCIENCES",
    name: "Para-Clinical",
    description: "Bridging theory with clinical diagnostics through Pathology, Microbiology, and Pharmacology.",
    image: paraclinicalImg,
    imageAlt: "Para-Clinical Department",
  },
  {
    tag: "PATIENT CARE",
    name: "Clinical",
    description: "Comprehensive patient care and bedside clinical training across Medicine, Surgery, and allied specialties.",
    image: clinicalImg,
    imageAlt: "Clinical Department",
  },
];

const DepartmentsSection = () => {
  return (
    <section className="relative pt-6 sm:pt-8 lg:pt-10 pb-0 sm:pb-1 bg-[#FAF9F5] dark:bg-transparent overflow-hidden transition-colors duration-300">
      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
        style={{
          backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
              ACADEMICS
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
          </div>

          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight tracking-tight text-[#162740] dark:text-white mb-3.5">
            Our Departments
          </h2>

          <p className="text-[#596d86] dark:text-slate-300 text-base sm:text-[17px] leading-relaxed font-normal">
            Three pillars of medical education, designed to build competence from theory to bedside.
          </p>
        </div>

        {/* Department Cards - Expanding Accordion Animation */}
        <div className="flex flex-col md:flex-row items-stretch gap-5 lg:gap-6 w-full h-auto md:h-[400px]">
          {DEPARTMENTS.map((dept) => (
            <Link
              to={`/departments?category=${encodeURIComponent(dept.name)}`}
              key={dept.name}
              className="relative group flex-grow transition-all duration-500 w-full md:w-56 h-[260px] sm:h-[280px] md:h-full md:hover:w-full rounded-[24px] overflow-hidden border border-transparent dark:border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_36px_rgba(15,23,42,0.22)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] block cursor-pointer"
            >
              {/* Background Image with subtle scale on hover */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src={dept.image}
                  alt={dept.imageAlt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Smooth Eased Blue Scrim Gradient - Perfectly blended with zero hard lines */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10, 28, 52, 0.94) 0%, rgba(12, 35, 65, 0.86) 18%, rgba(15, 48, 88, 0.62) 34%, rgba(18, 62, 112, 0.38) 50%, rgba(20, 72, 130, 0.18) 65%, rgba(20, 72, 130, 0.06) 80%, rgba(20, 72, 130, 0.01) 92%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8, 22, 42, 0.96) 0%, rgba(10, 32, 60, 0.90) 20%, rgba(14, 46, 86, 0.70) 38%, rgba(18, 64, 118, 0.44) 55%, rgba(20, 72, 130, 0.22) 70%, rgba(20, 72, 130, 0.08) 84%, transparent 100%)",
                }}
              />

              {/* Top Tag / Category Pill */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                <span className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/95 uppercase bg-white/20 backdrop-blur-md border border-white/25 shadow-xs">
                  {dept.tag}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-6 sm:left-6 sm:right-6 z-10 flex flex-col items-start transition-all duration-300">
                {/* Heading */}
                <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                  {dept.name}
                </h3>

                {/* Brief Description - smoothly expands on hover */}
                <p className="text-white/85 text-xs sm:text-[13px] leading-relaxed line-clamp-2 max-h-16 opacity-100 md:max-h-0 md:opacity-0 md:group-hover:max-h-16 md:group-hover:opacity-100 mb-2 md:mb-0 md:group-hover:mb-2.5 transition-all duration-500 ease-out overflow-hidden pointer-events-none">
                  {dept.description}
                </p>

                {/* Explore Link */}
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/90 group-hover:text-white transition-all duration-300 ease-out group-hover:-translate-y-0.5">
                  <span>Explore Department</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;


