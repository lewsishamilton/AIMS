import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import FacultyCard from "../sections/Faculty/FacultyCardProp";
import {
  getDepartmentById,
  getDepartmentHierarchyGroups,
  type ContentBlock,
} from "../data/facultyData";

type SectionGroup =
  | { type: "full"; section: ContentBlock }
  | { type: "grid"; sections: ContentBlock[] };

function groupSections(sections: ContentBlock[]): SectionGroup[] {
  const groups: SectionGroup[] = [];
  let currentHalfGroup: ContentBlock[] = [];

  for (const s of sections) {
    if (s.layout === "half") {
      currentHalfGroup.push(s);
    } else {
      if (currentHalfGroup.length > 0) {
        groups.push({ type: "grid", sections: [...currentHalfGroup] });
        currentHalfGroup = [];
      }
      groups.push({ type: "full", section: s });
    }
  }

  if (currentHalfGroup.length > 0) {
    groups.push({ type: "grid", sections: currentHalfGroup });
  }

  return groups;
}

export const DepartmentFacultyPage: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();

  const department = useMemo(() => {
    if (!departmentId) return undefined;
    return getDepartmentById(departmentId);
  }, [departmentId]);

  const hierarchyGroups = useMemo(() => {
    if (!department) return [];
    return getDepartmentHierarchyGroups(department.id);
  }, [department]);

  const totalFacultyCount = useMemo(() => {
    return hierarchyGroups.reduce((acc, g) => acc + g.members.length, 0);
  }, [hierarchyGroups]);

  const [activeTab, setActiveTab] = useState<"overview" | "faculty">("overview");

  const details = department?.details;

  const sectionGroups = useMemo(() => {
    if (!details?.sections) return [];
    return groupSections(details.sections);
  }, [details]);

  // If invalid department, show simple not found
  if (!department) {
    return (
      <div className="min-h-screen bg-[#fbfaf5] dark:bg-[#070d18] font-['Inter',sans-serif] pt-32 pb-20 px-6 text-center transition-colors duration-300">
        <div className="max-w-md mx-auto bg-white dark:bg-black/40 dark:backdrop-blur-2xl rounded-2xl p-8 border border-[#dce8ee] dark:border-white/15 dark:shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]">
          <h2 className="font-['Manrope',sans-serif] text-2xl font-semibold text-[#1f3351] dark:text-white mb-2">
            Department Not Found
          </h2>
          <p className="text-sm text-[#62748a] dark:text-slate-300 mb-6">
            The requested medical department does not exist or has been moved.
          </p>
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1f3351] dark:bg-white/20 dark:hover:bg-white/30 text-white text-xs font-semibold hover:bg-[#15243b] transition-colors dark:border dark:border-white/25 dark:backdrop-blur-md"
          >
            ← Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  const renderBlock = (block: ContentBlock, key: string | number) => {
    return (
      <div
        key={key}
        className="rounded-[26px] border border-[#dce8ee] dark:border-white/15 bg-white dark:bg-black/40 dark:backdrop-blur-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] p-6 sm:p-8 flex flex-col justify-between transition-colors duration-300"
      >
        <div>
          {block.badges && block.badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {block.badges.map((badge, bIdx) => (
                <span
                  key={bIdx}
                  className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#1f3351] dark:bg-white/15 dark:backdrop-blur-md dark:border dark:border-white/25 text-white"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}

          {block.title && (
            <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-[#1f3351] dark:text-white mb-2">
              {block.title}
            </h3>
          )}

          {block.subtitle && (
            <p className="text-xs sm:text-sm font-medium text-[#62748a] dark:text-slate-400 mb-4">
              {block.subtitle}
            </p>
          )}

          {block.content && (
            <div className="space-y-3 text-sm sm:text-base text-[#62748a] dark:text-slate-300 leading-relaxed mb-4">
              {Array.isArray(block.content) ? (
                block.content.map((p, pIdx) => <p key={pIdx}>{p}</p>)
              ) : (
                <p>{block.content}</p>
              )}
            </div>
          )}

          {block.bullets && block.bullets.length > 0 && (
            <ul className="space-y-3 mt-3">
              {block.bullets.map((bullet, bulletIdx) => (
                <li
                  key={bulletIdx}
                  className="flex items-start gap-3 text-sm text-[#62748a] dark:text-slate-300 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-[#1f3351]/10 text-[#1f3351] dark:bg-white/15 dark:text-white dark:border dark:border-white/20 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">
                    ✓
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="relative pt-24 lg:pt-32 pb-20 bg-[#fbfaf5] dark:bg-[#070d18] transition-colors duration-300 overflow-hidden tracking-[0.015em] min-h-screen">
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-14 lg:px-20">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1f3351] dark:text-white/80 dark:hover:text-white hover:underline"
          >
            ← Back to Departments
          </Link>
        </div>

        {/* Header matching site typography and styling */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-[#1f3351] border border-[#dce8ee] dark:bg-black/40 dark:backdrop-blur-xl dark:border-white/15 dark:text-white">
              {department.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-[#62748a] border border-[#dce8ee] dark:bg-black/40 dark:backdrop-blur-xl dark:border-white/15 dark:text-slate-300">
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
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "overview"
                  ? "bg-[#1f3351] text-white shadow-sm dark:bg-white/20 dark:text-white dark:backdrop-blur-xl dark:border dark:border-white/30 dark:shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.35)]"
                  : "bg-white text-[#62748a] hover:text-[#1f3351] border border-[#dce8ee] dark:bg-black/40 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 dark:border-white/15 dark:backdrop-blur-xl"
              }`}
            >
              Overview & Facilities
            </button>
            <button
              onClick={() => setActiveTab("faculty")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "faculty"
                  ? "bg-[#1f3351] text-white shadow-sm dark:bg-white/20 dark:text-white dark:backdrop-blur-xl dark:border dark:border-white/30 dark:shadow-[0_4px_20px_rgba(0,0,0,0.25),inset_0_1px_0_0_rgba(255,255,255,0.35)]"
                  : "bg-white text-[#62748a] hover:text-[#1f3351] border border-[#dce8ee] dark:bg-black/40 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/10 dark:border-white/15 dark:backdrop-blur-xl"
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
                return renderBlock(group.section, `full-${gIdx}`);
              }
              return (
                <div
                  key={`grid-${gIdx}`}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
                >
                  {group.sections.map((sec, sIdx) =>
                    renderBlock(sec, `half-${gIdx}-${sIdx}`)
                  )}
                </div>
              );
            })}

            {/* Departmental Faculty Hierarchy Section */}
            <div className="rounded-[26px] border border-[#dce8ee] dark:border-white/15 bg-white dark:bg-black/40 dark:backdrop-blur-2xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] p-6 sm:p-8 transition-colors duration-300">
              <div className="mb-6">
                <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-[#1f3351] dark:text-white">
                  Departmental Faculty
                </h3>
                <p className="text-sm text-[#62748a] dark:text-slate-300 mt-1">
                  As per NMC norms, department has full fledged faculty under Professor (HOD), Associate Professor, Assistant Professors, and Tutors.
                </p>
              </div>

              {/* Directly render the faculty hierarchy cards */}
              <div className="space-y-10 pt-4 border-t border-[#dce8ee] dark:border-white/15">
                {hierarchyGroups.map((group) => (
                  <div key={group.tier}>
                    <div className="flex items-baseline justify-between pb-3 mb-6 border-b border-[#dce8ee] dark:border-white/15">
                      <h4 className="font-['Manrope',sans-serif] text-lg font-semibold text-[#1f3351] dark:text-white">
                        {group.tier}
                      </h4>
                      <span className="text-xs font-medium text-[#62748a] dark:text-slate-400">
                        {group.members.length} {group.members.length === 1 ? "Member" : "Members"}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {group.members.map((faculty) => (
                        <FacultyCard
                          key={faculty.id}
                          name={faculty.name}
                          designation={faculty.designation}
                          photoUrl={faculty.photoUrl}
                          profileUrl={faculty.profileUrl}
                          linkedinUrl={faculty.linkedinUrl}
                          regCode={faculty.regCode}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* PURE FACULTY DIRECTORY VIEW */
          <div className="space-y-12">
            {hierarchyGroups.map((group) => (
              <div key={group.tier}>
                {/* Clean Section Header */}
                <div className="flex items-baseline justify-between pb-3 mb-6 border-b border-[#dce8ee] dark:border-white/15">
                  <div>
                    <h2 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-[#1f3351] dark:text-white">
                      {group.tier}
                    </h2>
                    <p className="text-xs text-[#62748a] dark:text-slate-400 mt-0.5">
                      {group.tierMeta.description}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#62748a] dark:text-slate-400 whitespace-nowrap ml-4">
                    {group.members.length} {group.members.length === 1 ? "Member" : "Members"}
                  </span>
                </div>

                {/* Grid of Faculty Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {group.members.map((faculty) => (
                    <FacultyCard
                      key={faculty.id}
                      name={faculty.name}
                      designation={faculty.designation}
                      photoUrl={faculty.photoUrl}
                      profileUrl={faculty.profileUrl}
                      linkedinUrl={faculty.linkedinUrl}
                      regCode={faculty.regCode}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DepartmentFacultyPage;
