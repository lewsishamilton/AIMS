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

  const selectedCategory: "All" | DepartmentCategory =
    categoryParam === "Pre-Clinical" ||
    categoryParam === "Para-Clinical" ||
    categoryParam === "Clinical"
      ? categoryParam
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
    <section className="relative pt-24 lg:pt-32 pb-20 bg-[#fbfaf5] dark:bg-[#070d18] transition-colors duration-300 overflow-hidden tracking-[0.015em] min-h-screen">
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
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#1f3351] text-white shadow-sm dark:bg-white/20 dark:text-white dark:backdrop-blur-xl dark:border dark:border-white/30 dark:shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.35)]"
                    : "bg-white text-[#62748a] hover:text-[#1f3351] border border-[#dce8ee] dark:bg-black/40 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 dark:border-white/15 dark:backdrop-blur-xl"
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