import { Link } from "react-router-dom";
import preclinicalImg from "../../assets/preclinical.jpg";
import paraclinicalImg from "../../assets/paraclinical.jpg";
import clinicalImg from "../../assets/clinical.jpg";

const DEPARTMENTS = [
  {
    name: "Pre-Clinical",
    image: preclinicalImg,
    imageAlt: "Pre-Clinical Department",
  },
  {
    name: "Para-Clinical",
    image: paraclinicalImg,
    imageAlt: "Para-Clinical Department",
  },
  { name: "Clinical", image: clinicalImg, imageAlt: "Clinical Department" },
];

const DepartmentsSection = () => {
  return (
    <section className="relative pb-20 lg:pb-28 pt-0 lg:pt-0 bg-white overflow-hidden tracking-[0.015em]">
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-14 lg:px-20">
        <div className="text-center mb-12">
          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351]">
            Our Departments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept) => (
            <Link
              to={`/departments?category=${encodeURIComponent(dept.name)}`}
              key={dept.name}
              className="relative overflow-hidden rounded-[26px] border border-[#dce8ee] group cursor-pointer block"
            >
              <img
                src={dept.image}
                alt={dept.imageAlt}
                className="w-full h-[220px] lg:h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d2346]/95 via-[#1f3351]/70 to-transparent" />
              <h3 className="absolute bottom-5 inset-x-0 text-center font-['Manrope',sans-serif] text-2xl font-semibold text-white">
                {dept.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
