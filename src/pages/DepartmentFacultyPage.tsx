import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getDepartmentById,
  getFacultyByDepartment,
  getDepartmentHod,
} from "../data/facultyData";
import { groupSections, renderContentBlock } from "../components/ContentBlocks";
import HodProfileCard from "../sections/Faculty/HodProfileCard";
import FacultyRosterTable from "../sections/Faculty/FacultyRosterTable";
import { Users, ArrowLeft } from "lucide-react";

export const DepartmentFacultyPage: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();

  const department = useMemo(() => {
    if (!departmentId) return undefined;
    return getDepartmentById(departmentId);
  }, [departmentId]);

  const allFaculty = useMemo(() => {
    if (!department) return [];
    return getFacultyByDepartment(department.id);
  }, [department]);

  const hod = useMemo(() => {
    if (!department) return undefined;
    return getDepartmentHod(department.id);
  }, [department]);

  const totalFacultyCount = allFaculty.length;

  const [activeTab, setActiveTab] = useState<"overview" | "faculty">("overview");

  const details = department?.details;

  const sectionGroups = useMemo(() => {
    if (!details?.sections) return [];
    return groupSections(details.sections);
  }, [details]);

  // If invalid department, show simple not found
  if (!department) {
    return (
      <div className="atmos-page min-h-screen bg-[#fbfaf5] dark:bg-transparent font-['Inter',sans-serif] pt-32 pb-20 px-6 text-center transition-colors duration-300">
        <div className="max-w-md mx-auto bg-white dark:bg-white/[0.04] dark:backdrop-blur-xl rounded-2xl p-8 border border-[#dce8ee] dark:border-white/10 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <h2 className="font-['Manrope',sans-serif] text-2xl font-semibold text-[#1f3351] dark:text-white mb-2">
            Department Not Found
          </h2>
          <p className="text-sm text-[#62748a] dark:text-slate-300 mb-6">
            The requested medical department does not exist or has been moved.
          </p>
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1f3351] dark:bg-teal-500 hover:bg-[#15243b] dark:hover:bg-teal-400 text-white text-xs font-semibold transition-colors"
          >
            ← Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="atmos-page relative pt-24 lg:pt-32 pb-20 bg-[#fbfaf5] dark:bg-transparent overflow-hidden tracking-[0.015em] min-h-screen transition-colors duration-300">
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-14 lg:px-20">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-6 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold">
          <Link
            to="/departments"
            className="inline-flex items-center gap-1.5 text-[#1f3351] hover:text-[#0f172a] dark:text-white dark:hover:text-slate-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Departments</span>
          </Link>
          <span className="text-[#94a3b8]">&bull;</span>
          <Link
            to="/faculty"
            className="text-[#64748b] hover:text-[#1f3351] dark:text-slate-300 dark:hover:text-white"
          >
            Faculty Directory
          </Link>
        </div>

        {/* Header matching site typography and styling */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1f3351]/10 text-[#1f3351] dark:bg-white/10 dark:text-white border border-[#1f3351]/15 dark:border-white/15">
              {department.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-white/10 text-[#1f3351] dark:text-slate-200 border border-[#dce8ee] dark:border-white/15">
              {totalFacultyCount} {totalFacultyCount === 1 ? "Faculty Member" : "Faculty Members"}
            </span>
          </div>
          <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351] dark:text-white">
            Department of {department.name}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#62748a] dark:text-slate-300 mt-2 max-w-3xl">
            {department.description}
          </p>
        </div>

        {/* View Switcher Tabs if detailed info is available */}
        {details && details.sections.length > 0 && (
          <div className="flex items-center gap-2 sm:gap-3 mb-10 flex-wrap">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "overview"
                  ? "bg-[#1f3351] text-white shadow-sm dark:bg-white dark:text-[#0b172a]"
                  : "bg-white dark:bg-white/5 text-[#1f3351] dark:text-slate-200 hover:bg-[#f8fafc] dark:hover:text-white dark:hover:border-white/30 border border-[#cbd5e1] dark:border-white/15"
              }`}
            >
              Overview & Facilities
            </button>
            <button
              onClick={() => setActiveTab("faculty")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "faculty"
                  ? "bg-[#1f3351] text-white shadow-sm dark:bg-white dark:text-[#0b172a]"
                  : "bg-white dark:bg-white/5 text-[#1f3351] dark:text-slate-200 hover:bg-[#f8fafc] dark:hover:text-white dark:hover:border-white/30 border border-[#cbd5e1] dark:border-white/15"
              }`}
            >
              Departmental Faculty ({totalFacultyCount})
            </button>
          </div>
        )}

        {/* DETAILS VIEW (Overview, Labs, Facilities & Embedded Faculty) */}
        {details && details.sections.length > 0 && activeTab === "overview" ? (
          <div className="space-y-8">
            {/* Dynamic Custom Content Sections */}
            {sectionGroups.map((group, gIdx) => {
              if (group.type === "full") {
                return renderContentBlock(group.section, `full-${gIdx}`);
              }
              return (
                <div
                  key={`grid-${gIdx}`}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
                >
                  {group.sections.map((sec, sIdx) =>
                    renderContentBlock(sec, `half-${gIdx}-${sIdx}`)
                  )}
                </div>
              );
            })}

            {/* Departmental Faculty Hierarchy Section */}
            <div className="rounded-[26px] border border-[#dce8ee] dark:border-white/10 bg-white dark:bg-white/[0.04] dark:backdrop-blur-xl p-6 sm:p-8 shadow-xs dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] space-y-6">
              <div className="border-b border-[#e4ecf2] pb-5 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#1f3351] dark:text-white" />
                  <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-[#1f3351] dark:text-white">
                    Departmental Faculty & Staff
                  </h3>
                </div>
                <p className="text-sm text-[#62748a] dark:text-slate-300 mt-1">
                  Full fledged medical and academic faculty adhering strictly to National Medical Commission (NMC) staffing regulations.
                </p>
              </div>

              {/* 1. HOD PROFILE WITH IMAGE */}
              {hod && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-400 mb-3">
                    Head of Department
                  </h4>
                  <HodProfileCard
                    hod={hod}
                    departmentName={department.name}
                    category={department.category}
                  />
                </div>
              )}

              {/* 2. FACULTY ROWS (LIKE STUDENT LIST, NO PHOTOS) */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-400 mb-3">
                  All Department Faculty ({allFaculty.length})
                </h4>
                <div className="overflow-hidden rounded-xl border border-[#e4ecf2] dark:border-white/10">
                  <FacultyRosterTable
                    members={allFaculty}
                    highlightHodId={hod?.id}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* PURE FACULTY DIRECTORY VIEW FOR DEPARTMENT */
          <div className="rounded-[26px] border border-[#dce8ee] dark:border-white/10 bg-white dark:bg-white/[0.04] dark:backdrop-blur-xl p-6 sm:p-8 shadow-xs dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] space-y-8">
            {/* 1. HOD Profile with Image */}
            {hod && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-400 mb-3">
                  Department Leadership
                </h3>
                <HodProfileCard
                  hod={hod}
                  departmentName={department.name}
                  category={department.category}
                />
              </div>
            )}

            {/* 2. Faculty Data Rows (By Tier or Complete Roster) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#e4ecf2] pb-3 dark:border-white/10">
                <h3 className="font-['Manrope',sans-serif] text-lg font-bold text-[#162740] dark:text-white">
                  Faculty Roster & Cadres
                </h3>
                <span className="text-xs font-semibold text-[#64748b] dark:text-slate-400">
                  {allFaculty.length} Total Members
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-[#e4ecf2] dark:border-white/10">
                <FacultyRosterTable
                  members={allFaculty}
                  highlightHodId={hod?.id}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DepartmentFacultyPage;
