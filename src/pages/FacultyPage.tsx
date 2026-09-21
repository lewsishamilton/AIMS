import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DepartmentCard from "../sections/Faculty/DepartmentCard";
import {
  DEPARTMENTS,
  getCategoryCounts,
  type DepartmentCategory,
} from "../data/facultyData";

export const FacultyPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const normalizedCat = categoryParam?.toLowerCase().replace(/[^a-z]/g, "");
  const selectedCategory: "All" | DepartmentCategory =
    normalizedCat === "preclinical"
      ? "Pre-Clinical"
      : normalizedCat === "paraclinical"
        ? "Para-Clinical"
        : normalizedCat === "clinical"
          ? "Clinical"
          : "All";

  // Scroll to top when category or page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categoryParam]);

  const handleCategorySelect = (cat: "All" | DepartmentCategory) => {
    if (cat === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category: cat }, { replace: true });
    }
  };

  const categoryCounts = getCategoryCounts();

  const filteredDepartments =
    selectedCategory === "All"
      ? DEPARTMENTS
      : DEPARTMENTS.filter((dept) => dept.category === selectedCategory);

  const categories: ("All" | DepartmentCategory)[] = [
    "All",
    "Pre-Clinical",
    "Para-Clinical",
    "Clinical",
  ];

  return (
    <section className="relative pt-24 lg:pt-32 pb-20 bg-[#fbfaf5] dark:bg-transparent overflow-hidden tracking-[0.015em] min-h-screen transition-colors duration-300">
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-14 lg:px-20">
        {/* Main Heading & Subtitle matching institutional layout */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351] dark:text-white">
            Departments & Faculty
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#62748a] dark:text-slate-300 mt-3">
            Explore the academic departments and faculty across Pre-Clinical, Para-Clinical, and Clinical disciplines at Arundathi Institute of Medical Sciences.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
          {categories.map((cat) => {
            const count = categoryCounts[cat];
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${isActive
                  ? "bg-[#1f3351] dark:bg-teal-500 hover:dark:bg-teal-400 text-white shadow-sm"
                  : "bg-white dark:bg-white/5 text-[#62748a] dark:text-slate-300 hover:text-[#1f3351] dark:hover:text-teal-300 dark:hover:border-teal-400/50 border border-[#dce8ee] dark:border-white/15"
                  }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept) => (
            <DepartmentCard key={dept.id} department={dept} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacultyPage;