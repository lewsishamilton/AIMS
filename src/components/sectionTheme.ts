import {
  Building2,
  BookOpen,
  GraduationCap,
  HeartPulse,
  Scale,
  ShieldCheck,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

/**
 * Each area of the site has a name and a glyph. The masthead and the
 * related-page tiles both draw on this, so a link previews the mark of the page
 * it leads to.
 *
 * Kept out of the component file so both can import it without breaking Fast
 * Refresh.
 */

/** The site's single accent — teal, as used by every kicker across the site. */
export const ACCENT = "#2dd4bf";

export interface SectionTheme {
  /** Area of the site, shown in the breadcrumb. */
  name: string;
  Icon: LucideIcon;
}

const SECTIONS: { prefix: string; theme: SectionTheme }[] = [
  { prefix: "/admissions", theme: { name: "Admissions", Icon: GraduationCap } },
  { prefix: "/academics", theme: { name: "Academics", Icon: BookOpen } },
  { prefix: "/services", theme: { name: "Medical Services", Icon: Stethoscope } },
  { prefix: "/patient-care", theme: { name: "Patient Care", Icon: HeartPulse } },
  { prefix: "/facilities", theme: { name: "Facilities", Icon: Building2 } },
  { prefix: "/about", theme: { name: "Discover AIMS", Icon: ShieldCheck } },
  { prefix: "/approvals", theme: { name: "Approvals & Excellence", Icon: ShieldCheck } },
  { prefix: "/committess", theme: { name: "Committees", Icon: Scale } },
];

export const DEFAULT_THEME: SectionTheme = {
  name: "Arundathi Institute",
  Icon: Stethoscope,
};

/** Which area of the site a route belongs to. */
export function sectionFor(pathname: string): SectionTheme {
  const hit = SECTIONS.find(
    (s) => pathname === s.prefix || pathname.startsWith(`${s.prefix}/`)
  );
  return hit ? hit.theme : DEFAULT_THEME;
}

if (import.meta.env.DEV) {
  const check = (path: string, want: string) => {
    const got = sectionFor(path).name;
    if (got !== want) console.error(`[sectionTheme] ${path}: got "${got}", want "${want}"`);
  };
  check("/admissions", "Admissions");
  check("/admissions/fee-structure", "Admissions");
  check("/academics/mbbs", "Academics");
  check("/patient-care/opd-timings", "Patient Care");
  check("/approvals/government", "Approvals & Excellence");
  check("/committess/ethics", "Committees");
  // A prefix must match a whole path segment, never a partial word.
  check("/admissions-archive", "Arundathi Institute");
  check("/", "Arundathi Institute");
}
