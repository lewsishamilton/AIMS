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
 * Each area of the site has an accent and a glyph. The masthead and the
 * related-page tiles both draw on this, so a link previews the colour and mark
 * of the page it leads to.
 *
 * Kept out of the component file so both can import it without breaking Fast
 * Refresh.
 */
export interface SectionTheme {
  /** Area of the site, shown in the breadcrumb. */
  name: string;
  /** Accent for the rule, eyebrow, glow and glyph. */
  accent: string;
  Icon: LucideIcon;
}

const SECTIONS: { prefix: string; theme: SectionTheme }[] = [
  { prefix: "/admissions", theme: { name: "Admissions", accent: "#38bdf8", Icon: GraduationCap } },
  { prefix: "/academics", theme: { name: "Academics", accent: "#818cf8", Icon: BookOpen } },
  { prefix: "/services", theme: { name: "Medical Services", accent: "#2dd4bf", Icon: Stethoscope } },
  { prefix: "/patient-care", theme: { name: "Patient Care", accent: "#fb7185", Icon: HeartPulse } },
  { prefix: "/facilities", theme: { name: "Facilities", accent: "#fbbf24", Icon: Building2 } },
  { prefix: "/about", theme: { name: "Discover AIMS", accent: "#a78bfa", Icon: ShieldCheck } },
  { prefix: "/approvals", theme: { name: "Approvals & Excellence", accent: "#a78bfa", Icon: ShieldCheck } },
  { prefix: "/committess", theme: { name: "Committees", accent: "#a78bfa", Icon: Scale } },
];

export const DEFAULT_THEME: SectionTheme = {
  name: "Arundathi Institute",
  accent: "#2dd4bf",
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
