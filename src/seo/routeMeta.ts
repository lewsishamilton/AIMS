import { STATIC_PAGES } from "../data/pages";
import { DEPARTMENT_METADATA } from "../data/departmentsData";
import { ALL_LEADERSHIP_MEMBERS } from "../data/managementData";
import { COMMITTEES } from "../data/committees";

/**
 * Title, description and canonical address for every page on the site.
 *
 * One source for two readers: scripts/seo/prerender.ts writes a real HTML file per page from it
 * at build time (so crawlers get a 200 and the right tags), and components/SeoHead.tsx applies it
 * in the browser as visitors move between pages. Content pages take their wording from
 * data/pages, departments and leadership from their own data files; the rest is written here.
 */

export const SITE_URL = "https://www.aims.ac.in";
export const SITE_NAME = "Arundathi Institute of Medical Sciences & Hospital";

export interface RouteMeta {
  /** The canonical path, without a trailing slash ("/" for home). */
  path: string;
  title: string;
  description: string;
}

/** Absolute URL as the server serves it: page folders end in a slash. */
export const urlFor = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}/`);

const MAX_DESCRIPTION = 158;

/** Trim to a search-result snippet at a word boundary. */
function snippet(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= MAX_DESCRIPTION) return clean;
  const cut = clean.slice(0, MAX_DESCRIPTION - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`;
}

/** "Admissions at AIMS" → "Admissions | AIMS Hyderabad", so the name never says AIMS twice. */
const titled = (name: string) => `${name.replace(/\s+(at|of)\s+AIMS$/i, "")} | AIMS Hyderabad`;

/** Pages with their own components (not in data/pages). */
const APP_PAGES: RouteMeta[] = [
  {
    path: "/",
    title: `${SITE_NAME}, Hyderabad`,
    description:
      "NABH-accredited teaching hospital with free treatment and 24×7 emergency care, and a medical college with 150 NMC-recognised MBBS seats. Dundigal, Hyderabad.",
  },
  {
    path: "/about-hospital",
    title: titled("About Arundathi Hospital"),
    description:
      "Arundathi Hospital, Dundigal, Hyderabad: a NABH-accredited teaching hospital with free treatment and diagnostics, super-speciality care and 24×7 emergency.",
  },
  {
    path: "/about-institution",
    title: titled("About the Institution"),
    description:
      "Arundathi Institute of Medical Sciences, Hyderabad: an NMC-recognised medical college affiliated to KNRUHS, with its own teaching hospital, labs and library.",
  },
  {
    path: "/founder",
    title: titled("Our Founder"),
    description:
      "Sri Marri Laxman Reddy, Founder and Chairman of the Marri Educational Society, and his vision for Arundathi Institute of Medical Sciences and its hospital.",
  },
  {
    path: "/management",
    title: titled("Management & Leadership"),
    description:
      "The executive committee, Dean and Principal who lead Arundathi Institute of Medical Sciences & Hospital, Hyderabad.",
  },
  {
    path: "/departments",
    title: titled("Academic Departments"),
    description:
      "Pre-clinical, para-clinical and clinical departments at Arundathi Institute of Medical Sciences, Hyderabad, with faculty, facilities and teaching resources.",
  },
  {
    path: "/faculty",
    title: titled("Faculty Directory"),
    description:
      "Faculty of Arundathi Institute of Medical Sciences by department: professors, associate and assistant professors and senior residents.",
  },
  {
    path: "/machines-equipment",
    title: titled("Machines & Equipment"),
    description:
      "Diagnostic and surgical equipment at Arundathi Hospital, including MRI, CT, cath lab, endoscopy, laparoscopy and laboratory analysers.",
  },
  {
    path: "/accreditations",
    title: titled("Accreditations & Approvals"),
    description:
      "Accreditations and statutory approvals of Arundathi Institute of Medical Sciences & Hospital, including NABH, NMC and KNRUHS.",
  },
  {
    path: "/media-gallery",
    title: titled("Media Gallery"),
    description:
      "Photographs of campus life at AIMS Hyderabad: community outreach, health awareness days, celebrations, sports and academic events.",
  },
  {
    path: "/laboratories",
    title: titled("Laboratories & Infrastructure"),
    description:
      "Teaching laboratories, skill lab, anatomy museum, library, operation theatres, blood bank and hospital spaces at Arundathi Institute of Medical Sciences.",
  },
  {
    path: "/aims-in-the-news",
    title: titled("In the News"),
    description: "News coverage and press reports about Arundathi Institute of Medical Sciences & Hospital, Hyderabad.",
  },
  {
    path: "/virtual-tour",
    title: titled("Virtual Campus Tour"),
    description: "Take a virtual tour of the Arundathi Institute of Medical Sciences campus and hospital in Dundigal, Hyderabad.",
  },
  {
    path: "/contact",
    title: titled("Contact Us"),
    description:
      "Contact AIMS, Dundigal, Hyderabad: admissions enquiries, hospital reception, 24×7 emergency, address and directions.",
  },
  {
    path: "/about/awards",
    title: titled("Awards & Achievements"),
    description:
      "Awards and achievements of AIMS departments, faculty and students: research, academic toppers, Nari Shakti Puraskar, sports and student wings.",
  },
  {
    path: "/facilities/transport",
    title: titled("Bus Routes & Live Tracker"),
    description: "College bus routes, stops and a live bus tracker for students and staff of Arundathi Institute of Medical Sciences, Hyderabad.",
  },
];

/** Other addresses that show the same page, and the canonical path each one points to. */
const ALIASES: Record<string, string> = {
  "/Departments": "/departments",
  "/Faculty": "/faculty",
  "/machines": "/machines-equipment",
  "/gallery": "/media-gallery",
  "/media-gallary": "/media-gallery",
  "/infrastructure/laboratories": "/laboratories",
  "/facilities/laboratories": "/laboratories",
  "/aims-in-news": "/aims-in-the-news",
  "/news": "/aims-in-the-news",
  "/virtualtour": "/virtual-tour",
  "/Virtual-Tour": "/virtual-tour",
  "/Founder": "/founder",
  "/founderpage": "/founder",
  "/Management": "/management",
  "/leadership/management": "/management",
  "/Contact": "/contact",
  "/dean": "/leadership/dr-b-devanand",
  "/Dean": "/leadership/dr-b-devanand",
  "/leadership/dean": "/leadership/dr-b-devanand",
  "/principal": "/leadership/dr-s-suma-preethi",
  "/Principal": "/leadership/dr-s-suma-preethi",
  "/leadership/principal": "/leadership/dr-s-suma-preethi",
};

function buildPages(): RouteMeta[] {
  const pages: RouteMeta[] = APP_PAGES.map((p) => ({ ...p, description: snippet(p.description) }));

  for (const [path, page] of Object.entries(STATIC_PAGES)) {
    pages.push({ path, title: titled(page.title), description: snippet(page.subtitle ?? page.title) });
  }

  for (const c of COMMITTEES) {
    pages.push({ path: c.path, title: titled(c.title), description: snippet(`${c.title} at AIMS: ${c.subtitle}.`) });
  }

  for (const [id, d] of Object.entries(DEPARTMENT_METADATA)) {
    pages.push({
      path: `/departments/${id}`,
      title: titled(`Department of ${d.name}`),
      description: snippet(
        `Department of ${d.name}, Arundathi Institute of Medical Sciences, Hyderabad: ${d.description.replace(/\.$/, "")}. Faculty, facilities and teaching.`
      ),
    });
    ALIASES[`/Departments/${id}`] = `/departments/${id}`;
    ALIASES[`/faculty/${id}`] = `/departments/${id}`;
    ALIASES[`/Faculty/${id}`] = `/departments/${id}`;
  }

  for (const m of ALL_LEADERSHIP_MEMBERS) {
    const bio = m.profile?.bio?.[0] ?? "";
    pages.push({
      path: `/leadership/${m.id}`,
      title: titled(`${m.name}, ${m.role}`),
      description: snippet(`${m.name}, ${m.role} of ${SITE_NAME}, Hyderabad. ${bio}`),
    });
  }

  return pages;
}

/** One entry per canonical page — what the sitemap lists. */
export const CANONICAL_PAGES: RouteMeta[] = buildPages();

const byPath = new Map(CANONICAL_PAGES.map((p) => [p.path, p]));
for (const [alias, target] of Object.entries(ALIASES)) {
  if (!byPath.has(target)) throw new Error(`[routeMeta] alias ${alias} points to unknown page ${target}`);
}

/** Every address the site serves (canonical pages and their aliases), each with its page's metadata. */
export const SERVED_PATHS: [string, RouteMeta][] = [
  ...CANONICAL_PAGES.map((p): [string, RouteMeta] => [p.path, p]),
  ...Object.entries(ALIASES).map(([alias, target]): [string, RouteMeta] => [alias, byPath.get(target)!]),
];

const lookup = new Map(SERVED_PATHS);
const lookupLower = new Map(SERVED_PATHS.map(([path, meta]) => [path.toLowerCase(), meta]));

/** Metadata for the page at `pathname`, or undefined when no page lives there. */
export function metaFor(pathname: string): RouteMeta | undefined {
  const path = pathname.replace(/\/+$/, "") || "/";
  return lookup.get(path) ?? lookupLower.get(path.toLowerCase());
}
