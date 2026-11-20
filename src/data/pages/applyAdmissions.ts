import type { StaticPageDef } from "../../components/StaticPage";

/**
 * "Apply for Admissions" — opened by the Apply – Admissions tab on the home page. Laid out like the
 * Careers page: a banner, then the admissions banner card (components/AdmissionsShowcase.tsx,
 * registered as this route's widget). Wording follows the AIMS Admissions 2026–27 microsite
 * (qr-aims.pages.dev), whose enquiry form the card links to.
 */
export const APPLY_ADMISSION_PAGES: Record<string, StaticPageDef> = {
  "/admissions/apply": {
    eyebrow: "Welcome to AIMS",
    title: "Your Medical Transformation Begins Here.",
    subtitle:
      "Everything you need to explore admissions at Arundathi Institute of Medical Sciences — a medical college and teaching hospital in Dundigal, Telangana.",
  },
};
