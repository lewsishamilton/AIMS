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
    <section className="relative py-14 sm:py-16 lg:py-20 bg-[#FAF9F5] overflow-hidden">
      {/* Subtle Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`,
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] uppercase">
              ACADEMICS
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
          </div>

          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight tracking-tight text-[#162740] mb-3.5">
            Our Departments
          </h2>

          <p className="text-[#596d86] text-base sm:text-[17px] leading-relaxed font-normal">
            Three pillars of medical education, designed to build competence from theory to bedside.
          </p>
        </div>

        {/* Department Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {DEPARTMENTS.map((dept) => (
            <Link
              to={`/departments?category=${encodeURIComponent(dept.name)}`}
              key={dept.name}
              className="group relative h-[250px] sm:h-[275px] lg:h-[300px] rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.18)] hover:-translate-y-1.5 transition-all duration-500 block"
            >
              {/* Background Image with hover upward float and subtle zoom */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src={dept.image}
                  alt={dept.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                />
              </div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a] via-[#0b172a]/60 to-transparent group-hover:from-[#0b172a] group-hover:via-[#0b172a]/75 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />

              {/* Top Tag / Category Pill */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                <span className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/95 uppercase bg-white/20 backdrop-blur-md border border-white/25 shadow-xs">
                  {dept.tag}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col items-start transition-all duration-300">
                {/* Heading shifts slightly upward on hover */}
                <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  {dept.name}
                </h3>

                {/* 2-line Brief Description reveals on hover */}
                <p className="text-white/85 text-xs sm:text-[13px] leading-snug line-clamp-2 max-h-0 opacity-0 -translate-y-1 group-hover:max-h-16 group-hover:opacity-100 group-hover:translate-y-0 group-hover:mb-2 transition-all duration-300 ease-out overflow-hidden pointer-events-none">
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


