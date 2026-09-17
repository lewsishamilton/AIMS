import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import FacultyCard from "../sections/Faculty/FacultyCardProp";
import {
  getDepartmentById,
  getDepartmentHierarchyGroups,
} from "../data/facultyData";

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

  // If invalid department, show simple not found
  if (!department) {
    return (
      <div className="min-h-screen bg-[#fbfaf5] font-['Inter',sans-serif] pt-32 pb-20 px-6 text-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 border border-[#dce8ee]">
          <h2 className="font-['Manrope',sans-serif] text-2xl font-semibold text-[#1f3351] mb-2">
            Department Not Found
          </h2>
          <p className="text-sm text-[#62748a] mb-6">
            The requested medical department does not exist or has been moved.
          </p>
          <Link
            to="/faculty"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1f3351] text-white text-xs font-semibold hover:bg-[#15243b] transition-colors"
          >
            ← Back to Departments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="relative pt-24 lg:pt-32 pb-20 bg-[#fbfaf5] overflow-hidden tracking-[0.015em] min-h-screen">
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-14 lg:px-20">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/faculty"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1f3351] hover:underline"
          >
            ← Back to Departments
          </Link>
        </div>

        {/* Header matching site typography and styling */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-[#1f3351] border border-[#dce8ee]">
              {department.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-[#62748a] border border-[#dce8ee]">
              {totalFacultyCount} {totalFacultyCount === 1 ? "Faculty Member" : "Faculty Members"}
            </span>
          </div>
          <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351]">
            Department of {department.name}
          </h1>
          <p className="text-base sm:text-lg leading-relaxed text-[#62748a] mt-2 max-w-3xl">
            {department.description}
          </p>
        </div>

        {/* Faculty Displayed strictly by Hierarchy */}
        <div className="space-y-12">
          {hierarchyGroups.map((group) => (
            <div key={group.tier}>
              {/* Clean Section Header */}
              <div className="flex items-baseline justify-between pb-3 mb-6 border-b border-[#dce8ee]">
                <div>
                  <h2 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-[#1f3351]">
                    {group.tier}
                  </h2>
                  <p className="text-xs text-[#62748a] mt-0.5">
                    {group.tierMeta.description}
                  </p>
                </div>
                <span className="text-xs font-medium text-[#62748a] whitespace-nowrap ml-4">
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
      </div>
    </section>
  );
};

export default DepartmentFacultyPage;
