import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

// Images for campus facilities from assets/facilities folder
import indoorStadiumImg from "../../assets/facilities/indoor_stadium.jpeg";
import transportationImg from "../../assets/facilities/transport.jpeg";
import messImg from "../../assets/facilities/mess.jpeg";
import gymImg from "../../assets/facilities/gym.jpeg";
import hostelImg from "../../assets/facilities/hostel.jpeg";
import tableTennisImg from "../../assets/facilities/table_tennis.jpeg";

export interface FacilityItem {
  id: string;
  tag: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
}

const FACILITIES: FacilityItem[] = [
  {
    id: "01",
    tag: "SPORTS & ATHLETICS",
    name: "Indoor Stadium",
    description: "Multi-purpose indoor arena engineered for basketball, badminton, volleyball, and inter-collegiate events.",
    image: indoorStadiumImg,
    imageAlt: "Indoor Stadium at AIMS",
  },
  {
    id: "02",
    tag: "CAMPUS COMMUTE",
    name: "Transportation",
    description: "Dedicated fleet of comfortable buses operating on extensive routes across the city for safe daily transit.",
    image: transportationImg,
    imageAlt: "Campus Transportation at AIMS",
  },
  {
    id: "03",
    tag: "DINING & NUTRITION",
    name: "Mess",
    description: "Hygienic multi-cuisine dining facility serving balanced, nutritious, and wholesome meals prepared fresh daily.",
    image: messImg,
    imageAlt: "Student Mess & Dining at AIMS",
  },
  {
    id: "04",
    tag: "FITNESS & WELLNESS",
    name: "Gym",
    description: "Modern fitness center equipped with advanced cardio, strength training machines, and free weights.",
    image: gymImg,
    imageAlt: "Campus Gymnasium at AIMS",
  },
  {
    id: "05",
    tag: "RESIDENTIAL LIVING",
    name: "Hostel",
    description: "Secure, well-furnished student residences with 24/7 power backup, high-speed Wi-Fi, and study lounges.",
    image: hostelImg,
    imageAlt: "Student Hostels at AIMS",
  },
  {
    id: "06",
    tag: "INDOOR RECREATION",
    name: "Table Tennis",
    description: "Dedicated indoor recreation zone featuring tournament-standard table tennis boards for leisure and practice.",
    image: tableTennisImg,
    imageAlt: "Table Tennis Facility at AIMS",
  },
];

export const FacilitiesSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("01");

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

        {/* Elastic Accordion Gallery - All 6 facilities in one line */}
        <div className="flex h-[440px] w-full flex-col gap-2.5 sm:gap-3 md:h-[440px] lg:h-[475px] md:flex-row md:gap-3 lg:gap-3.5">
          {FACILITIES.map((facility) => {
            const isActive = activeId === facility.id;

            return (
              <div
                key={facility.id}
                onMouseEnter={() => setActiveId(facility.id)}
                onClick={() => setActiveId(facility.id)}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#e2e8f0]/80 bg-white min-w-0 min-h-0",
                  "shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.18)]",
                  "transition-[flex,filter] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  isActive
                    ? "flex-[3.5] lg:flex-[4] brightness-100"
                    : "flex-[1] brightness-90 hover:brightness-100"
                )}
                style={{
                  flex: isActive ? "3.5 1 0%" : "1 1 0%",
                }}
              >
                {/* Background Image Layer */}
                <div className="absolute inset-0 h-full w-full overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.imageAlt}
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-1000 ease-out",
                      isActive ? "scale-100" : "scale-110"
                    )}
                  />

                  {/* Active / Hovered Gradient: Exactly h-[48%] with rich, high-contrast opacity */}
                  <div
                    className={cn(
                      "absolute bottom-0 inset-x-0 h-[48%] bg-gradient-to-t from-[#0b172a] via-[#0b172a]/92 via-50% to-transparent transition-all duration-700 pointer-events-none",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />

                  {/* Inactive / Not-Hovered Gradient: Taller height (h-[75%]) for vertical labels */}
                  <div
                    className={cn(
                      "absolute bottom-0 inset-x-0 h-[75%] bg-gradient-to-t from-[#0b172a]/95 via-[#0b172a]/55 via-50% to-transparent transition-all duration-700 pointer-events-none",
                      isActive ? "opacity-0" : "opacity-100"
                    )}
                  />
                </div>

                {/* --- Content Container --- */}
                <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-5 sm:p-6 lg:p-7 z-10">
                  {/* Active Content: Category Tag, Title, Description, Button */}
                  <div
                    className={cn(
                      "flex flex-col gap-2.5 transition-all duration-500",
                      isActive
                        ? "translate-y-0 opacity-100 delay-200"
                        : "translate-y-10 opacity-0 pointer-events-none"
                    )}
                  >
                    {/* Category Tag */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold tracking-wider text-white uppercase bg-white/20 backdrop-blur-md border border-white/25 shadow-xs">
                        {facility.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl lg:text-[32px] font-bold text-white tracking-tight leading-tight drop-shadow-sm">
                      {facility.name}
                    </h3>

                    {/* Description */}
                    <p className="text-white/90 text-xs sm:text-sm leading-relaxed max-w-md line-clamp-2 drop-shadow-xs">
                      {facility.description}
                    </p>

                    {/* Explore Link Button */}
                    <div className="mt-0.5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-white group-hover:text-white/95 transition-all duration-300">
                      <span>Explore Facility</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                    </div>
                  </div>

                  {/* Inactive Content: Vertical Text (Desktop) / Short Label (Mobile) */}
                  <div
                    className={cn(
                      "absolute transition-all duration-500",
                      "bottom-6 left-1/2 -translate-x-1/2 md:bottom-8",
                      isActive
                        ? "opacity-0 scale-50 pointer-events-none"
                        : "opacity-100 delay-200"
                    )}
                  >
                    {/* Desktop: Bigger, Brighter Pure White Vertical Text */}
                    <span className="hidden whitespace-nowrap text-base lg:text-[19px] font-extrabold uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] [writing-mode:vertical-rl] rotate-180 md:block font-['Manrope',sans-serif] select-none">
                      {facility.name}
                    </span>

                    {/* Mobile: Horizontal Label */}
                    <span className="block whitespace-nowrap text-xs sm:text-sm font-extrabold uppercase tracking-wider text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] md:hidden select-none">
                      {facility.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
