import type {
  Department,
  FacultyMember,
  DepartmentCategory,
  DepartmentHierarchyGroup,
} from "./types";
import { DEPARTMENT_METADATA } from "./departmentsData";
import { ALL_FACULTY, HIERARCHY_TIERS } from "./facultyMembersData";

export * from "./types";
export * from "./departmentsData";
export * from "./facultyMembersData";

export const DEPARTMENTS: Department[] = Object.entries(DEPARTMENT_METADATA).map(
  ([id, meta]) => {
    const count = ALL_FACULTY.filter((f) => f.departmentId === id).length;
    return {
      id,
      ...meta,
      facultyCount: count,
    };
  }
);

export function getDepartmentById(id: string): Department | undefined {
  return DEPARTMENTS.find(
    (d) => d.id.toLowerCase() === id.toLowerCase()
  );
}

export function getFacultyByDepartment(departmentId: string): FacultyMember[] {
  return ALL_FACULTY.filter(
    (f) => f.departmentId.toLowerCase() === departmentId.toLowerCase()
  ).sort((a, b) => a.rank - b.rank);
}

export function getDepartmentHierarchyGroups(
  departmentId: string
): DepartmentHierarchyGroup[] {
  const deptFaculty = getFacultyByDepartment(departmentId);
  return HIERARCHY_TIERS.map((meta) => {
    const members = deptFaculty.filter((f) => f.tier === meta.tier);
    return {
      tier: meta.tier,
      tierMeta: meta,
      members,
    };
  }).filter((group) => group.members.length > 0);
}

export function getCategoryCounts(): Record<"All" | DepartmentCategory, number> {
  return {
    All: DEPARTMENTS.length,
    "Pre-Clinical": DEPARTMENTS.filter((d) => d.category === "Pre-Clinical").length,
    "Para-Clinical": DEPARTMENTS.filter((d) => d.category === "Para-Clinical").length,
    Clinical: DEPARTMENTS.filter((d) => d.category === "Clinical").length,
  };
}
