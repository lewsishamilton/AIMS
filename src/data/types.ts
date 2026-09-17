export type DepartmentCategory = "Pre-Clinical" | "Para-Clinical" | "Clinical";

export type HierarchyTier =
  | "Head of Department & Professors"
  | "Associate Professors"
  | "Assistant Professors"
  | "Senior Residents"
  | "Tutors & Academic Staff";

export type HierarchyRank = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface FacultyMember {
  id: string;
  rawName: string;
  name: string;
  regCode?: string;
  rawDesignation: string;
  designation: string;
  roleBadge: string;
  rank: HierarchyRank;
  tier: HierarchyTier;
  departmentId: string;
  departmentName: string;
  category: DepartmentCategory;
  photoUrl?: string;
  profileUrl?: string;
  linkedinUrl?: string;
  qualifications?: string;
}

export interface ContentBlock {
  title?: string;
  subtitle?: string;
  content?: string | string[];
  bullets?: string[];
  badges?: string[];
  layout?: "full" | "half";
}

export interface DepartmentDetails {
  sections: ContentBlock[];
}

export interface Department {
  id: string;
  name: string;
  category: DepartmentCategory;
  description: string;
  bgImage: string;
  gradient: string;
  facultyCount: number;
  details?: DepartmentDetails;
}

export interface HierarchyTierMeta {
  tier: HierarchyTier;
  description: string;
}

export interface DepartmentHierarchyGroup {
  tier: HierarchyTier;
  members: FacultyMember[];
  tierMeta: HierarchyTierMeta;
}
