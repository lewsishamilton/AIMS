import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Building2, Users, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Department, FacultyMember } from "../../data/facultyData";
import HodProfileCard from "./HodProfileCard";
import FacultyRosterTable from "./FacultyRosterTable";

const EASE = [0.22, 1, 0.36, 1] as const;

interface DepartmentFacultySectionProps {
  department: Department;
  hod?: FacultyMember;
  members: FacultyMember[];
  isOpen: boolean;
  onToggle: () => void;
  searchQuery?: string;
  showDeptLink?: boolean;
}

export const DepartmentFacultySection: React.FC<DepartmentFacultySectionProps> = ({
  department,
  hod,
  members,
  isOpen,
  onToggle,
  searchQuery = "",
  showDeptLink = true,
}) => {
  return (
    <section
      id={department.id}
      className="overflow-hidden rounded-[24px] border border-[#e4ecf2] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_16px_44px_rgba(0,0,0,0.3)]"
    >
      {/* Department Section Header Button / Trigger */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-4 p-5 text-left transition-colors duration-200 hover:bg-[#f8fafc] sm:px-7 sm:py-5 dark:hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-4 sm:gap-5">
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${
              isOpen
                ? "bg-[#1f3351] text-white shadow-sm dark:bg-white dark:text-[#0b172a]"
                : "bg-[#1f3351]/10 text-[#1f3351] group-hover:bg-[#1f3351]/20 dark:bg-white/10 dark:text-white dark:group-hover:bg-white/15"
            }`}
          >
            <Building2 className="h-5 w-5" />
          </span>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-['Manrope',sans-serif] text-lg font-bold tracking-tight text-[#162740] dark:text-white sm:text-xl">
                Department of {department.name}
              </h3>
              <span className="rounded-full border border-[#1f3351]/15 bg-[#1f3351]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#1f3351] dark:border-white/20 dark:bg-white/10 dark:text-white">
                {department.category}
              </span>
            </div>
            <p className="mt-0.5 text-xs font-medium text-[#596d86] dark:text-slate-300">
              {members.length} {members.length === 1 ? "Faculty Member" : "Faculty Members"}
              {hod ? ` • Headed by ${hod.name}` : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 pr-1 sm:pr-2">
          {showDeptLink && (
            <Link
              to={`/departments/${department.id}`}
              onClick={(e) => e.stopPropagation()}
              className="hidden items-center gap-1 text-xs font-bold text-[#1f3351] hover:text-[#0f172a] dark:text-white dark:hover:text-slate-200 sm:inline-flex"
            >
              <span>Overview</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}

          <ChevronDown
            className={`h-5 w-5 text-[#64748b] transition-transform duration-300 group-hover:text-[#162740] dark:text-slate-400 dark:group-hover:text-white ${
              isOpen ? "rotate-180 text-[#1f3351] dark:text-white" : ""
            }`}
          />
        </div>
      </button>

      {/* Expandable Department Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`content-${department.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="border-t border-[#e4ecf2] bg-white dark:border-white/10 dark:bg-[#0c1626]/40"
          >
            <div className="p-5 sm:p-7 space-y-7">
              {/* 1. ENLARGED HOD PROFILE WITH IMAGE */}
              {hod && (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1f3351] dark:text-white">
                      Department Leadership
                    </span>
                    {showDeptLink && (
                      <Link
                        to={`/departments/${department.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#1f3351] hover:underline dark:text-white sm:hidden"
                      >
                        Department Overview →
                      </Link>
                    )}
                  </div>
                  <HodProfileCard
                    hod={hod}
                    departmentName={department.name}
                    category={department.category}
                  />
                </div>
              )}

              {/* 2. FACULTY DATA ROWS (LIKE STUDENT LIST, NO PHOTOS) */}
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#1f3351] dark:text-white" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1f3351] dark:text-white">
                      Departmental Faculty
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-[#64748b] dark:text-slate-300">
                    As per NMC Staffing Norms
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-[#e4ecf2] dark:border-white/10">
                  <FacultyRosterTable
                    members={members}
                    highlightHodId={hod?.id}
                    searchQuery={searchQuery}
                  />
                </div>
              </div>
            </div>

            {/* Department Footer Note */}
            <div className="flex flex-col gap-2 border-t border-[#e4ecf2] bg-[#f8fafc]/50 p-4 text-[11px] text-[#64748b] dark:border-white/10 dark:bg-white/[0.01] dark:text-slate-300 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <span>
                Department of <strong className="text-[#162740] dark:text-white">{department.name}</strong> &bull; Recognized by <strong className="text-[#162740] dark:text-white">National Medical Commission (NMC)</strong>
              </span>
              {showDeptLink && (
                <Link
                  to={`/departments/${department.id}`}
                  className="font-bold text-[#1f3351] hover:underline dark:text-white"
                >
                  View Facilities, Labs &amp; Academic Curriculum &rarr;
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DepartmentFacultySection;
