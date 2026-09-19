import laxmanReddyImg from "../assets/Management/M.LaxmanReddy.jpeg";
import anushreyaReddyImg from "../assets/Management/M.Anushreya Reddy.jpeg";
import mamathaReddyImg from "../assets/Management/M.Mamatha Reddy.jpeg";
import dhirenReddyImg from "../assets/Management/M.Dhiren Reddy.jpeg";

export interface ManagementMember {
  id: string;
  name: string;
  role: string;
  designationNote?: string;
  category: "executive" | "principal";
  hierarchyTier: "President" | "Key Executive Officers" | "Executive Members" | "Institutional Principals";
  hierarchyRank: number; // 1 = Highest
  contact?: string;
  departmentOrWing?: string;
  photoUrl?: string; // Loaded if available, empty if not provided yet
  badges?: string[];
}

export const EXECUTIVE_MEMBERS: ManagementMember[] = [
  {
    id: "marri-laxman-reddy",
    name: "Marri Laxman Reddy",
    role: "President",
    category: "executive",
    hierarchyTier: "President",
    hierarchyRank: 1,
    departmentOrWing: "Executive Committee",
    badges: ["Apex Governance", "President"],
    photoUrl: laxmanReddyImg,
  },
  {
    id: "m-arundhathi",
    name: "M. Arundhathi",
    role: "Vice-President",
    category: "executive",
    hierarchyTier: "Key Executive Officers",
    hierarchyRank: 2,
    departmentOrWing: "Executive Committee",
    badges: ["Vice-President", "Leadership"],
    photoUrl: "",
  },
  {
    id: "m-anushreya-reddy",
    name: "M. Anushreya Reddy",
    role: "Secretary",
    category: "executive",
    hierarchyTier: "Key Executive Officers",
    hierarchyRank: 3,
    departmentOrWing: "Executive Committee",
    badges: ["Secretary", "Administration"],
    photoUrl: anushreyaReddyImg,
  },
  {
    id: "m-mamata-reddy",
    name: "M. Mamata Reddy",
    role: "Treasurer",
    category: "executive",
    hierarchyTier: "Key Executive Officers",
    hierarchyRank: 4,
    departmentOrWing: "Executive Committee",
    badges: ["Treasurer", "Finance & Planning"],
    photoUrl: mamathaReddyImg,
  },
  {
    id: "m-sunitha",
    name: "M. Sunitha",
    role: "Joint Secretary",
    category: "executive",
    hierarchyTier: "Key Executive Officers",
    hierarchyRank: 5,
    departmentOrWing: "Executive Committee",
    badges: ["Joint Secretary", "Operations"],
    photoUrl: "",
  },
  {
    id: "p-indumathi",
    name: "P. Indumathi",
    role: "Member",
    category: "executive",
    hierarchyTier: "Executive Members",
    hierarchyRank: 6,
    departmentOrWing: "Executive Committee",
    badges: ["Executive Member"],
    photoUrl: "",
  },
  {
    id: "m-dhiren-reddy",
    name: "M. Dhiren Reddy",
    role: "Member",
    category: "executive",
    hierarchyTier: "Executive Members",
    hierarchyRank: 7,
    departmentOrWing: "Executive Committee",
    badges: ["Executive Member"],
    photoUrl: dhirenReddyImg,
  },
];

export const PRINCIPALS: ManagementMember[] = [
  {
    id: "p-vimala",
    name: "P. Vimala",
    designationNote: "Bsc MLT",
    role: "Principal",
    category: "principal",
    hierarchyTier: "Institutional Principals",
    hierarchyRank: 1,
    contact: "9391912390",
    departmentOrWing: "B.Sc Medical Laboratory Technology (MLT)",
    badges: ["Principal", "Allied Health Sciences"],
    photoUrl: "",
  },
  {
    id: "mrs-leena-deepthi",
    name: "Mrs. Leena Deepthi",
    designationNote: "Nursing",
    role: "Principal",
    category: "principal",
    hierarchyTier: "Institutional Principals",
    hierarchyRank: 2,
    contact: "9391859112",
    departmentOrWing: "Arundathi College of Nursing",
    badges: ["Principal", "Nursing"],
    photoUrl: "",
  },
  {
    id: "dr-k-madhavi",
    name: "Dr. K. Madhavi",
    designationNote: "Physiotherapy",
    role: "Principal",
    category: "principal",
    hierarchyTier: "Institutional Principals",
    hierarchyRank: 3,
    contact: "9391912105",
    departmentOrWing: "Arundathi College of Physiotherapy",
    badges: ["Principal", "Physiotherapy"],
    photoUrl: "",
  },
];
