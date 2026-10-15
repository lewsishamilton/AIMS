import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  Search,
  X,
  Users,
  Building2,
  GraduationCap,
  Download,
  Stethoscope,
  Microscope,
  BookOpen,
} from "lucide-react";
import {
  DEPARTMENTS,
  getFacultyByDepartment,
  getDepartmentHod,
  type DepartmentCategory,
} from "../data/facultyData";
import DepartmentFacultySection from "../sections/Faculty/DepartmentFacultySection";

const EASE = [0.22, 1, 0.36, 1] as const;

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

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>("all");

  // Track expanded state for each department ID. By default, open the first 3 departments.
  const [expandedDepts, setExpandedDepts] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    DEPARTMENTS.forEach((d, idx) => {
      initial[d.id] = idx < 3;
    });
    return initial;
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCategorySelect = (cat: "All" | DepartmentCategory) => {
    if (cat === "All") {
      searchParams.delete("category");
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category: cat }, { replace: true });
    }
  };

  const toggleDept = (id: string) => {
    setExpandedDepts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    DEPARTMENTS.forEach((d) => {
      allOpen[d.id] = true;
    });
    setExpandedDepts(allOpen);
  };

  const collapseAll = () => {
    const allClosed: Record<string, boolean> = {};
    DEPARTMENTS.forEach((d) => {
      allClosed[d.id] = false;
    });
    setExpandedDepts(allClosed);
  };

  // Prepare full data for each department
  const fullDeptData = useMemo(() => {
    return DEPARTMENTS.map((dept) => {
      const members = getFacultyByDepartment(dept.id);
      const hod = getDepartmentHod(dept.id);
      return {
        department: dept,
        hod,
        members,
      };
    });
  }, []);

  // Filter departments & faculty based on category, search query, and department dropdown
  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return fullDeptData
      .filter(({ department }) => {
        if (selectedCategory !== "All" && department.category !== selectedCategory) {
          return false;
        }
        if (selectedDeptFilter !== "all" && department.id !== selectedDeptFilter) {
          return false;
        }
        return true;
      })
      .map(({ department, hod, members }) => {
        if (!q) {
          return {
            department,
            hod,
            members,
            filteredMembers: members,
            matches: true,
          };
        }

        const deptNameMatches = department.name.toLowerCase().includes(q);
        const hodMatches = hod && (
          hod.name.toLowerCase().includes(q) ||
          hod.designation.toLowerCase().includes(q)
        );

        const matchingMembers = members.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.designation.toLowerCase().includes(q) ||
            m.roleBadge.toLowerCase().includes(q) ||
            (m.regCode && m.regCode.toLowerCase().includes(q))
        );

        const hasMatch = deptNameMatches || hodMatches || matchingMembers.length > 0;

        return {
          department,
          hod,
          members,
          filteredMembers: hasMatch && (deptNameMatches || hodMatches) ? members : matchingMembers,
          matches: hasMatch,
        };
      })
      .filter((item) => (q ? item.matches : true));
  }, [fullDeptData, selectedCategory, selectedDeptFilter, searchQuery]);

  // When searching, auto-expand matching departments
  useEffect(() => {
    if (searchQuery.trim()) {
      const openMatching: Record<string, boolean> = {};
      filteredData.forEach((item) => {
        openMatching[item.department.id] = true;
      });
      setExpandedDepts((prev) => ({ ...prev, ...openMatching }));
    }
  }, [searchQuery, filteredData]);

  // Total counts for summary stats
  const totalFacultyCount = useMemo(() => {
    return fullDeptData.reduce((acc, d) => acc + d.members.length, 0);
  }, [fullDeptData]);

  const preClinicalCount = useMemo(() => {
    return fullDeptData
      .filter((d) => d.department.category === "Pre-Clinical")
      .reduce((acc, d) => acc + d.members.length, 0);
  }, [fullDeptData]);

  const paraClinicalCount = useMemo(() => {
    return fullDeptData
      .filter((d) => d.department.category === "Para-Clinical")
      .reduce((acc, d) => acc + d.members.length, 0);
  }, [fullDeptData]);

  const clinicalCount = useMemo(() => {
    return fullDeptData
      .filter((d) => d.department.category === "Clinical")
      .reduce((acc, d) => acc + d.members.length, 0);
  }, [fullDeptData]);

  const totalFilteredFaculty = useMemo(() => {
    return filteredData.reduce((acc, d) => acc + d.filteredMembers.length, 0);
  }, [filteredData]);

  // CSV export function for faculty roster
  const exportFacultyCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Department,Category,Sl. No.,Faculty Name,Designation,Cadre,Registration Code\n";

    filteredData.forEach(({ department, filteredMembers }) => {
      filteredMembers.forEach((f, idx) => {
        const row = [
          `"${department.name}"`,
          `"${department.category}"`,
          idx + 1,
          `"${f.name.replace(/"/g, '""')}"`,
          `"${f.designation.replace(/"/g, '""')}"`,
          `"${f.roleBadge.replace(/"/g, '""')}"`,
          `"${f.regCode || `AIMS-${String(f.serialNumber || idx + 1).padStart(3, "0")}`}"`,
        ].join(",");
        csvContent += row + "\n";
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      selectedCategory === "All"
        ? `AIMS_Faculty_Directory_All.csv`
        : `AIMS_Faculty_Directory_${selectedCategory}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const categories: ("All" | DepartmentCategory)[] = [
    "All",
    "Pre-Clinical",
    "Para-Clinical",
    "Clinical",
  ];

  return (
    <section className="atmos-page relative min-h-screen bg-[#fbfaf5] pb-24 pt-24 tracking-[0.015em] transition-colors duration-300 lg:pt-32 dark:bg-transparent">
      <div className="relative z-10 mx-auto w-full max-w-[1340px] px-4 sm:px-10 lg:px-16">
        {/* Main Heading & Subtitle */}
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#cbd5e1] bg-white px-3.5 py-1 text-xs font-bold text-[#1f3351] shadow-2xs dark:border-white/10 dark:bg-white/5 dark:text-white">
            <GraduationCap className="h-4 w-4 text-[#1f3351] dark:text-white" />
            <span>Arundathi Institute of Medical Sciences</span>
          </div>
          <h1 className="font-['Manrope',sans-serif] text-3xl font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351] sm:text-4xl lg:text-[44px] dark:text-white">
            Faculty Directory
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#596d86] sm:text-lg dark:text-slate-300">
            Distinguished medical educators, researchers, and clinical specialists leading 21 academic departments in accordance with National Medical Commission (NMC) standards.
          </p>
        </div>

        {/* Overview Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8 grid grid-cols-2 gap-3.5 sm:grid-cols-4 sm:gap-5"
        >
          {/* Total Faculty */}
          <div className="flex flex-col rounded-[22px] border border-[#e4ecf2] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.03]">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f3351]/10 text-[#1f3351] dark:bg-white/10 dark:text-white">
              <Users className="h-5 w-5" />
            </span>
            <span className="mt-3 text-2xl font-extrabold text-[#162740] sm:text-3xl dark:text-white">
              {totalFacultyCount}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#596d86] dark:text-slate-300">
              Total Faculty
            </span>
          </div>

          {/* Pre-Clinical */}
          <div className="flex flex-col rounded-[22px] border border-[#e4ecf2] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.03]">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f3351]/10 text-[#1f3351] dark:bg-white/10 dark:text-white">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="mt-3 text-2xl font-extrabold text-[#162740] sm:text-3xl dark:text-white">
              {preClinicalCount}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#596d86] dark:text-slate-300">
              Pre-Clinical Faculty
            </span>
          </div>

          {/* Para-Clinical */}
          <div className="flex flex-col rounded-[22px] border border-[#e4ecf2] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.03]">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f3351]/10 text-[#1f3351] dark:bg-white/10 dark:text-white">
              <Microscope className="h-5 w-5" />
            </span>
            <span className="mt-3 text-2xl font-extrabold text-[#162740] sm:text-3xl dark:text-white">
              {paraClinicalCount}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#596d86] dark:text-slate-300">
              Para-Clinical Faculty
            </span>
          </div>

          {/* Clinical */}
          <div className="flex flex-col rounded-[22px] border border-[#e4ecf2] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.03]">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f3351]/10 text-[#1f3351] dark:bg-white/10 dark:text-white">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span className="mt-3 text-2xl font-extrabold text-[#162740] sm:text-3xl dark:text-white">
              {clinicalCount}
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#596d86] dark:text-slate-300">
              Clinical Faculty
            </span>
          </div>
        </motion.div>

        {/* Interactive Controls Bar (Search, Category Tabs, Expand/Collapse, Export) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          className="mb-8 flex flex-col gap-4 rounded-[22px] border border-[#e4ecf2] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:p-5 dark:border-white/10 dark:bg-white/[0.03]"
        >
          {/* Top Row: Search Bar + Department Filter */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b] dark:text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search faculty name, designation, department, or registration..."
                className="w-full rounded-full border border-[#cbd5e1] bg-[#f8fafc] py-2.5 pl-10 pr-9 text-xs text-[#1e293b] placeholder:text-[#64748b] transition-all focus:border-[#1f3351] focus:bg-white focus:outline-hidden dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-white sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#64748b] hover:text-[#1e293b] dark:text-slate-400 dark:hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Department Filter Dropdown */}
            <div className="w-full md:w-64">
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="w-full rounded-full border border-[#cbd5e1] bg-[#f8fafc] px-4 py-2.5 text-xs font-semibold text-[#1f3351] transition-all focus:border-[#1f3351] focus:bg-white focus:outline-hidden dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:focus:border-white sm:text-sm"
              >
                <option value="all">All Departments ({DEPARTMENTS.length})</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.facultyCount})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Tabs & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#f1f5f9] pt-3.5 dark:border-white/5">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const count =
                  cat === "All"
                    ? totalFacultyCount
                    : cat === "Pre-Clinical"
                    ? preClinicalCount
                    : cat === "Para-Clinical"
                    ? paraClinicalCount
                    : clinicalCount;

                return (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? "bg-[#1f3351] text-white shadow-sm dark:bg-white dark:text-[#0b172a]"
                        : "border border-[#cbd5e1] bg-white text-[#1f3351] hover:bg-[#f8fafc] dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Expand/Collapse & Export */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={expandAll}
                className="cursor-pointer rounded-full border border-[#cbd5e1] bg-white px-3 py-1.5 text-xs font-bold text-[#1f3351] transition-all hover:bg-[#f1f5f9] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08]"
              >
                Expand All
              </button>
              <button
                type="button"
                onClick={collapseAll}
                className="cursor-pointer rounded-full border border-[#cbd5e1] bg-white px-3 py-1.5 text-xs font-bold text-[#1f3351] transition-all hover:bg-[#f1f5f9] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08]"
              >
                Collapse All
              </button>

              <button
                type="button"
                onClick={exportFacultyCSV}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-[#1f3351] px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs transition-colors hover:bg-[#162740] dark:bg-white/15 dark:text-white dark:hover:bg-white/25"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Export Roster</span>
                <span className="sm:hidden">CSV</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Search Results Summary */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between text-xs font-semibold text-[#1f3351] dark:text-white">
            <span>
              Found <strong>{totalFilteredFaculty}</strong> matching faculty across <strong>{filteredData.length}</strong> departments for &ldquo;<span className="italic">{searchQuery}</span>&rdquo;
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="cursor-pointer text-[#1f3351] font-bold underline hover:text-[#0f172a] dark:text-white dark:hover:text-slate-200"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Department Sections List (Heading -> HOD Profile with Image -> Rows of Faculty Data) */}
        {filteredData.length === 0 ? (
          <div className="rounded-[24px] border border-[#e4ecf2] bg-white p-16 text-center shadow-xs dark:border-white/10 dark:bg-white/[0.03]">
            <Building2 className="mx-auto h-12 w-12 text-[#94a3b8] dark:text-slate-500" />
            <h3 className="mt-4 font-['Manrope',sans-serif] text-xl font-bold text-[#162740] dark:text-white">
              No matching faculty found
            </h3>
            <p className="mt-1.5 text-sm text-[#64748b] dark:text-slate-400">
              Try adjusting your search query or selecting a different department category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedDeptFilter("all");
                handleCategorySelect("All");
              }}
              className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#1f3351] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#15243b] dark:bg-white dark:text-[#0b172a] dark:hover:bg-slate-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredData.map(({ department, hod, filteredMembers }) => {
              const isOpen = !!expandedDepts[department.id];

              return (
                <DepartmentFacultySection
                  key={department.id}
                  department={department}
                  hod={hod}
                  members={filteredMembers}
                  isOpen={isOpen}
                  onToggle={() => toggleDept(department.id)}
                  searchQuery={searchQuery}
                  showDeptLink={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default FacultyPage;