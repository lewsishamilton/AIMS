import React from "react";
import { ArrowRight } from "lucide-react";

// Initial placeholder image imports from campus stock assets
// You can replace these imports with your uploaded images
import indoorStadiumImg from "../../assets/stockImages/aims-campus-15.jpeg";
import transportationImg from "../../assets/stockImages/aims-campus-03.jpeg";
import messImg from "../../assets/stockImages/aims-campus-05.jpeg";
import gymImg from "../../assets/stockImages/aims-campus-21.jpeg";
import hostelImg from "../../assets/stockImages/aims-campus-02.jpeg";
import tableTennisImg from "../../assets/stockImages/aims-campus-35.jpeg";

export interface FacilityItem {
  tag: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

const FACILITIES: FacilityItem[] = [
  {
    tag: "SPORTS & ATHLETICS",
    name: "Indoor Stadium",
    description: "Multi-purpose indoor arena engineered for basketball, badminton, volleyball, and inter-collegiate events.",
    image: indoorStadiumImg,
    imageAlt: "Indoor Stadium at AIMS",
  },
  {
    tag: "CAMPUS COMMUTE",
    name: "Transportation",
    description: "Dedicated fleet of comfortable buses operating on extensive routes across the city for safe daily transit.",
    image: transportationImg,
    imageAlt: "Campus Transportation at AIMS",
  },
  {
    tag: "DINING & NUTRITION",
    name: "Mess",
    description: "Hygienic multi-cuisine dining facility serving balanced, nutritious, and wholesome meals prepared fresh daily.",
    image: messImg,
    imageAlt: "Student Mess & Dining at AIMS",
  },
  {
    tag: "FITNESS & WELLNESS",
    name: "Gym",
    description: "Modern fitness center equipped with advanced cardio, strength training machines, and free weights.",
    image: gymImg,
    imageAlt: "Campus Gymnasium at AIMS",
  },
  {
    tag: "RESIDENTIAL LIVING",
    name: "Hostel",
    description: "Secure, well-furnished student residences with 24/7 power backup, high-speed Wi-Fi, and study lounges.",
    image: hostelImg,
    imageAlt: "Student Hostels at AIMS",
  },
  {
    tag: "INDOOR RECREATION",
    name: "Table Tennis",
    description: "Dedicated indoor recreation zone featuring tournament-standard table tennis boards for leisure and practice.",
    image: tableTennisImg,
    imageAlt: "Table Tennis Facility at AIMS",
  },
];

export const FacilitiesSection: React.FC = () => {
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
        {/* Section Header matching Academics/Departments */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] uppercase">
              CAMPUS AMENITIES
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
          </div>

          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[42px] font-bold leading-tight tracking-tight text-[#162740] mb-3.5">
            Our Facilities
          </h2>

          <p className="text-[#596d86] text-base sm:text-[17px] leading-relaxed font-normal">
            World-class infrastructure and lifestyle amenities designed to support a balanced and vibrant student life.
          </p>
        </div>

        {/* Facilities Grid - 6 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {FACILITIES.map((facility) => (
            <div
              key={facility.name}
              className="group relative h-[250px] sm:h-[275px] lg:h-[300px] rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.18)] hover:-translate-y-1.5 transition-all duration-500 block cursor-pointer"
            >
              {/* Background Image with hover upward float and subtle zoom */}
              <div className="w-full h-full overflow-hidden">
                <img
                  src={facility.image}
                  alt={facility.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2"
                />
              </div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a] via-[#0b172a]/60 to-transparent group-hover:from-[#0b172a] group-hover:via-[#0b172a]/75 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />

              {/* Top Tag / Category Pill */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                <span className="inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider text-white/95 uppercase bg-white/20 backdrop-blur-md border border-white/25 shadow-xs">
                  {facility.tag}
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col items-start transition-all duration-300">
                {/* Heading shifts slightly upward on hover */}
                <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-white mb-1.5 tracking-tight transition-transform duration-300 ease-out group-hover:-translate-y-1">
                  {facility.name}
                </h3>

                {/* 2-line Brief Description reveals on hover */}
                <p className="text-white/85 text-xs sm:text-[13px] leading-snug line-clamp-2 max-h-0 opacity-0 -translate-y-1 group-hover:max-h-16 group-hover:opacity-100 group-hover:translate-y-0 group-hover:mb-2 transition-all duration-300 ease-out overflow-hidden pointer-events-none">
                  {facility.description}
                </p>

                {/* Explore Link */}
                <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-white/90 group-hover:text-white transition-all duration-300 ease-out group-hover:-translate-y-0.5">
                  <span>Explore Facility</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
