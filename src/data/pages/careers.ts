import type { StaticPageDef } from "../../components/StaticPage";

/**
 * Careers: a single page carrying the recruitment notification poster
 * (components/RecruitmentShowcase.tsx, registered as this route's widget).
 * The online faculty application form lives at /careers/teaching/apply.
 * The old /careers/teaching and /careers/non-teaching addresses redirect here.
 */
export const CAREER_PAGES: Record<string, StaticPageDef> = {
  "/careers": {
    eyebrow: "Careers",
    title: "Careers at AIMS",
    subtitle:
      "Faculty, nursing and computer operator positions at Arundathi Institute of Medical Sciences and Hospital, Dundigal, Hyderabad.",
  },
};
