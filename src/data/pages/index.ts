import type { StaticPageDef } from "../../components/StaticPage";
import { ACADEMIC_PAGES } from "./academics";
import { ADMISSION_PAGES } from "./admissions";
import { SERVICE_PAGES } from "./services";
import { FACILITY_PAGES } from "./facilities";
import { PATIENT_CARE_PAGES } from "./patientCare";
import { DISCOVER_PAGES } from "./discover";

/**
 * Every content-driven page on the site, keyed by route path.
 * App.tsx maps this straight onto <Route> elements, so adding a page
 * means adding an entry here — no new component, no new route.
 */
export const STATIC_PAGES: Record<string, StaticPageDef> = {
  ...DISCOVER_PAGES,
  ...ACADEMIC_PAGES,
  ...ADMISSION_PAGES,
  ...SERVICE_PAGES,
  ...FACILITY_PAGES,
  ...PATIENT_CARE_PAGES,
};

export type { StaticPageDef };
