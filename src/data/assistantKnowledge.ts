import { STATIC_PAGES } from "./pages";
import { DEPARTMENTS, ALL_FACULTY, getDepartmentHod } from "./facultyData";
import { formatFacultyName } from "../sections/Faculty/FacultyCardProp";
import { ALL_LEADERSHIP_MEMBERS } from "./managementData";
import { ADMITTED_BATCHES } from "./admittedStudents";
import { chronicles } from "./newsChroniclesData";
import { COMMITTEES } from "./committees";
import { BUS_ROUTES } from "./busRoutesData";
import publishedStats from "./todayStats.json";
import { CONTACT, SEAT_MATRIX } from "./siteInfo";
import { DAY_NAMES, OPD_CLOSE_MIN, OPD_DAYS, OPD_OPEN_MIN, formatTime } from "../components/opdStatus";
import { DEPARTMENT_METADATA } from "./departmentsData";
import { MACHINES_DATA } from "./machines";
import { departments as AWARD_DEPARTMENTS, facultyAchievements, nationalAwards } from "./awardsData";
import { TODAY_METRICS } from "../lib/hospitalStats";
import {
  BLANK_FORM_URL,
  RECRUITMENT_EMAIL,
  RECRUITMENT_OPENINGS,
  RECRUITMENT_PHONES,
  RECRUITMENT_WALK_IN,
} from "./facultyApplication";

/**
 * Knowledge for the on-site assistant.
 *
 * Almost everything is read from the site's own data — content pages, departments, faculty,
 * leadership, news, committees, bus routes, careers and the published hospital figures — so when
 * the website changes, the assistant's answers change with it. Only the short FAQ answers below are
 * written by hand, and those reuse the same contact constants the site uses.
 *
 * Matching is keyword scoring, with three refinements: words are weighted by how rare they are on
 * the site (so "discharge" outweighs "process"), an exact page/department name wins, and near-misses
 * ("gynecologist", small typos) still match. When nothing matches strongly, the closest pages are
 * offered instead of a dead end.
 */

export interface AssistantLink {
  label: string;
  path: string;
  /** Opens in a new tab (PDFs, maps) instead of navigating inside the app. */
  external?: boolean;
}

interface Entry {
  title: string;
  keywords: string[];
  text: string;
  answer: string;
  links: AssistantLink[];
  /** FAQ answers outrank pages that merely mention the same words. */
  boost?: number;
}

// Contact details come from data/siteInfo.ts — the same source as the footer and the home contact section.
const PHONE = CONTACT.receptionPhone;
const ADMISSIONS_PHONE = `${CONTACT.admissionsPhone} (${CONTACT.admissionsContact})`;
const EMAIL = CONTACT.email;
const ADDRESS = CONTACT.address;

/** A content page's current subtitle, so FAQ answers that summarise a page follow its edits. */
const pageText = (path: string, fallback: string) => STATIC_PAGES[path]?.subtitle ?? fallback;

/** "Monday to Saturday, 9:00 AM to 4:00 PM", from the same constants the OPD Timings page uses. */
const opdHours = () => {
  const days = [...OPD_DAYS].sort((a, b) => a - b);
  const contiguous = days.every((d, i) => i === 0 || d === days[i - 1] + 1);
  const dayText =
    contiguous && days.length > 1 ? `${DAY_NAMES[days[0]]} to ${DAY_NAMES[days[days.length - 1]]}` : days.map((d) => DAY_NAMES[d]).join(", ");
  return `${dayText}, ${formatTime(OPD_OPEN_MIN)} to ${formatTime(OPD_CLOSE_MIN)}`;
};

const fmtNum = (n: number) => n.toLocaleString("en-IN");
const fmtDate = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
};
const titleCase = (s: string) => s.toLowerCase().replace(/\b([a-z])/g, (m) => m.toUpperCase());

// ── Live, data-driven answers ──────────────────────────────────────────────────────────────

const careersAnswer = () => {
  const openings = RECRUITMENT_OPENINGS.map((o) => `• ${o.title}: ${o.lines.join(", ")}`).join("\n");
  return `AIMS is currently recruiting:\n${openings}\n${RECRUITMENT_WALK_IN} Email: ${RECRUITMENT_EMAIL}. Phone: ${RECRUITMENT_PHONES.join(" / ")}.`;
};

const statsAnswer = () => {
  const s = publishedStats as { date?: string | null; stats?: Record<string, number> | null };
  if (!s.stats) return "The latest daily hospital figures are shown in the ticker on the home page.";
  const parts = TODAY_METRICS.filter((m) => typeof s.stats![m.key] === "number").map((m) => `${m.label} ${fmtNum(s.stats![m.key])}`);
  return `Latest published hospital figures${s.date ? ` (for ${fmtDate(s.date)})` : ""}: ${parts.join(", ")}.`;
};

const latestNews = chronicles[chronicles.length - 1];
const newsAnswer = () =>
  latestNews
    ? `Latest in AIMS in News: "${titleCase(latestNews.title)}" (${latestNews.subtitle}). ${latestNews.description}`
    : "Press coverage of AIMS is collected on the AIMS in News page.";

const admittedYears = ADMITTED_BATCHES.map((b) => b.academicYear).join(", ");

// ── Hand-written FAQ ───────────────────────────────────────────────────────────────────────

const FAQ: Omit<Entry, "text">[] = [
  {
    title: "Contact details",
    keywords: ["contact", "phone", "number", "call", "email", "mail", "reception", "helpline", "mobile", "achireddy", "telephone"],
    answer: `Reception: ${PHONE}\nAdmissions Enquiry: ${ADMISSIONS_PHONE}\nEmail: ${EMAIL}\nAddress: ${ADDRESS}`,
    links: [{ label: "Contact page", path: "/contact" }],
  },
  {
    title: "Location and directions",
    keywords: ["address", "location", "where", "located", "directions", "map", "route", "dundigal", "how to reach", "how to come", "reach"],
    answer: `We are at ${ADDRESS}.`,
    links: [
      { label: "Open in Google Maps", path: "https://maps.google.com/?q=Arundathi+Institute+of+Medical+Sciences+Dundigal", external: true },
      { label: "Contact page", path: "/contact" },
    ],
  },
  {
    title: "Emergency and ambulance",
    keywords: ["emergency", "ambulance", "casualty", "trauma", "accident", "urgent", "icu", "critical"],
    answer: `The casualty department is open 24×7. Come straight to casualty in an emergency, or call ${PHONE}.`,
    links: [{ label: "Emergency Care", path: "/services/emergency-trauma" }],
  },
  {
    title: "OPD timings",
    keywords: ["opd timings", "opd", "timing", "timings", "hours", "open", "close", "time", "outpatient", "consultation", "visiting", "doctor available", "sunday"],
    answer: `The OPD runs ${opdHours()}. Emergency and casualty are open 24×7.`,
    links: [{ label: "OPD Timings & Visiting", path: "/patient-care/opd-timings" }],
  },
  {
    title: "Free treatment",
    keywords: ["free", "cost", "charges", "price", "treatment", "surgery", "operation", "poor", "foundation", "affordable"],
    answer: "Treatment, surgeries and diagnostics at Arundathi Hospital are provided free of cost, supported by the Marri Rajasekhar Reddy Foundation.",
    links: [{ label: "About the Hospital", path: "/about-hospital" }],
  },
  {
    title: "Admissions",
    keywords: ["admission", "admissions", "apply", "neet", "neet-pg", "counselling", "join", "eligibility", "eligible"],
    answer: `MBBS admission is through NEET-UG and state counselling (KNRUHS); postgraduate MD/MS admission is through NEET-PG. Steps, criteria and required documents are on the Admissions pages. Admissions office: ${ADMISSIONS_PHONE}.`,
    links: [
      { label: "Admissions Overview", path: "/admissions" },
      { label: "Admission Criteria", path: "/admissions/criteria" },
      { label: "Postgraduate (MD/MS)", path: "/academics/postgraduate" },
    ],
  },
  {
    title: "Seat matrix",
    keywords: ["seats", "seat", "intake", "matrix", "quota", "category", "nri", "convener", "how many seats", "mbbs seats"],
    answer: `AIMS has ${SEAT_MATRIX.total} MBBS seats: ${SEAT_MATRIX.categories.map((c) => `${c.name}${"note" in c ? ` / ${c.note}` : ""} ${c.seats} (${c.share}%)`).join(", ")}.`,
    links: [{ label: "Seat Matrix", path: "/admissions/seat-matrix" }],
  },
  {
    title: "Fees",
    keywords: ["fee", "fees", "tuition", "payment", "pay", "dd", "demand draft"],
    answer: pageText("/admissions/fee-structure", "MBBS fees are fixed by the state fee regulatory notification each year."),
    links: [
      { label: "Fee Structure", path: "/admissions/fee-structure" },
      { label: "Bank details & forms", path: "/admissions/forms" },
    ],
  },
  {
    title: "Application forms",
    keywords: ["form", "forms", "bond", "affidavit", "checklist", "proforma", "download form"],
    answer: pageText("/admissions/forms", "All admission forms and bonds can be viewed and downloaded on the Application Forms page."),
    links: [{ label: "Application Forms", path: "/admissions/forms" }],
  },
  {
    title: "Admitted students list",
    keywords: ["admitted", "selected", "batch", "roll", "merit", "admitted list", "student list"],
    answer: `The admitted MBBS student lists for ${admittedYears} are on the Admitted List page, with a PDF download.`,
    links: [{ label: "Admitted List", path: "/admissions/admitted-list" }],
  },
  {
    title: "Courses offered",
    keywords: ["course", "courses", "programme", "program", "degree", "postgraduate", "post graduate", "nursing", "bsc", "physiotherapy", "diploma", "paramedical", "allied"],
    answer: "AIMS offers MBBS, postgraduate MD/MS programmes (subject to annual NMC recognition and KNRUHS notification), Nursing & Allied Health degrees (B.Sc. Nursing, B.Sc. MLT, Physiotherapy) and paramedical diplomas.",
    links: [
      { label: "MBBS", path: "/academics/mbbs" },
      { label: "Postgraduate (MD/MS)", path: "/academics/postgraduate" },
      { label: "Nursing & Allied Health", path: "/academics/nursing-allied-health" },
      { label: "Paramedical Diplomas", path: "/academics/paramedical-diplomas" },
    ],
  },
  {
    title: "Careers and recruitment",
    keywords: [
      "career", "careers", "job", "jobs", "vacancy", "vacancies", "recruitment", "recruiting", "hiring", "opening", "openings",
      "walk-in", "walk in", "interview", "salary", "resume", "cv", "work at aims", "staff nurse", "nursing staff",
      "computer operator", "faculty post", "faculty recruitment", "apply for job", "teaching post", "assistant professor post",
      "faculty job", "job application", "application form for job", "nurse job",
    ],
    answer: careersAnswer(),
    links: [
      { label: "Careers", path: "/careers" },
      { label: "Apply online (faculty)", path: "/careers/teaching/apply" },
      { label: "Download application form", path: BLANK_FORM_URL, external: true },
    ],
  },
  {
    title: "Hospital statistics",
    keywords: ["statistics", "stats", "figures", "patients", "yesterday", "today", "opd count", "how many patients", "admitted patients", "surgeries done", "daily"],
    answer: statsAnswer(),
    links: [{ label: "Home page figures", path: "/" }],
  },
  {
    title: "Latest news",
    keywords: ["news", "latest", "press", "newspaper", "media coverage", "aims in news", "recent"],
    answer: newsAnswer(),
    links: [{ label: "AIMS in News", path: "/aims-in-the-news" }],
  },
  {
    title: "Brochure",
    keywords: ["brochure", "prospectus", "booklet", "download brochure"],
    answer: "You can open or download the AIMS brochure (PDF).",
    links: [{ label: "Open brochure", path: "/documents/aims-brochure.pdf", external: true }],
  },
  {
    title: "Approvals and accreditation",
    keywords: ["approval", "approved", "recognised", "recognized", "nmc", "knruhs", "nabh", "accreditation", "affiliation", "affiliated", "certificate", "essentiality", "permission"],
    answer: "AIMS holds NMC permission for MBBS, is affiliated to KNRUHS Warangal, and the hospital has NABH accreditation. The orders and certificates can be viewed and downloaded.",
    links: [
      { label: "Accreditations", path: "/accreditations" },
      { label: "Government Approvals", path: "/approvals/government" },
      { label: "University Affiliation", path: "/approvals/university-affiliation" },
    ],
  },
  {
    title: "Bus routes and transport",
    keywords: ["bus", "buses", "transport", "transportation", "routes", "pickup", "stop", "driver", "commute", "bus timings", "bus timing", "college bus"],
    answer: `College buses run on ${BUS_ROUTES.length} routes across Hyderabad. The Bus Routes page shows every route, its stops, and the in-charge and driver contacts. Ask me about your area (for example "bus to Kompally").`,
    links: [{ label: "Bus Routes & Tracker", path: "/facilities/transport" }],
  },
  {
    title: "Hostel and campus life",
    keywords: ["hostel", "hostels", "mess", "food", "canteen", "gym", "sports", "stadium", "campus", "accommodation", "room"],
    answer: "The campus has boys' and girls' hostels, a mess and food court, a gymnasium, an indoor stadium and outdoor sports facilities.",
    links: [
      { label: "Campus Life", path: "/facilities/campus-life" },
      { label: "Hostel", path: "/facilities/hostel" },
    ],
  },
  {
    title: "Departments",
    keywords: ["departments", "specialty", "speciality", "specialities", "branch", "subjects", "all departments"],
    answer: `AIMS has ${DEPARTMENTS.length} academic departments across Pre-Clinical, Para-Clinical and Clinical. Ask about any department by name, or browse them all.`,
    links: [{ label: "All Departments", path: "/departments" }],
  },
  {
    title: "Faculty",
    keywords: ["faculty", "doctors", "teachers", "professors", "lecturers", "list of doctors", "faculty list"],
    answer: `The Faculty Directory lists all ${ALL_FACULTY.length} faculty members by department. You can also ask me about a doctor by name.`,
    links: [{ label: "Faculty Directory", path: "/faculty" }],
  },
  {
    title: "Founder",
    keywords: ["founder", "founded", "established", "rajasekhar"],
    answer: "AIMS was founded by Marri Rajasekhar Reddy.",
    links: [
      { label: "Founder", path: "/founder" },
      { label: "Management", path: "/management" },
    ],
  },
  {
    title: "Management",
    keywords: ["management", "management team", "executive committee", "leadership", "governing body", "trust", "society"],
    answer: `The executive committee of AIMS: ${ALL_LEADERSHIP_MEMBERS.filter((m) => m.category === "executive").map((m) => `${m.name} (${m.role})`).join(", ")}.`,
    links: [{ label: "Management", path: "/management" }],
  },
  {
    title: "Virtual tour",
    keywords: ["virtual", "tour", "360", "view campus", "see campus"],
    answer: "Take a 360° virtual tour of the campus, the hospital and the operation theatre complex.",
    links: [{ label: "Virtual Tour", path: "/virtual-tour" }],
  },
  {
    title: "Gallery and awards",
    keywords: ["gallery", "photos", "pictures", "images", "events", "awards", "achievements"],
    answer: "Photos and events are in the Media Gallery, press coverage in AIMS in News, and achievements on the Awards page.",
    links: [
      { label: "Media Gallery", path: "/media-gallery" },
      { label: "AIMS in News", path: "/aims-in-the-news" },
      { label: "Awards", path: "/about/awards" },
    ],
  },
  {
    title: "Machines and equipment",
    keywords: ["machine", "machines", "equipment", "mri", "ct", "scan", "xray", "x-ray", "cath", "laser", "ultrasound", "technology"],
    answer: "The hospital has MRI, CT, digital X-ray, ultrasound, a cath lab, a heart-lung machine, a thulium laser and more.",
    links: [
      { label: "Machines & Equipment", path: "/machines-equipment" },
      { label: "Diagnostics & Imaging", path: "/services/diagnostics" },
    ],
  },
  {
    title: "Committees",
    keywords: ["committee", "committees"],
    answer: `AIMS has ${COMMITTEES.length} committees and units: ${COMMITTEES.map((c) => c.title).join(", ")}. Ask about any of them by name.`,
    links: COMMITTEES.slice(0, 3).map((c) => ({ label: c.title, path: c.path })),
  },
  {
    title: "Complaints and feedback",
    keywords: ["complaint", "complaints", "feedback", "grievance", "suggestion"],
    answer: `Complaints and feedback can be sent through the form on the Complaints & Feedback page, or by email to ${EMAIL}.`,
    links: [{ label: "Complaints & Feedback", path: "/patient-care/feedback" }],
  },
];

/** Hand-coded routes that are not in STATIC_PAGES. */
const ROUTE_PAGES: { title: string; path: string; keywords: string[]; answer: string }[] = [
  { title: "About the Hospital", path: "/about-hospital", keywords: ["hospital", "about hospital", "nabh"], answer: "About Arundathi Hospital: free treatment and diagnostics, its vision and mission." },
  { title: "About the Institution", path: "/about-institution", keywords: ["institution", "college", "about", "vision", "mission"], answer: "About Arundathi Institute of Medical Sciences: its vision and mission." },
  { title: "Contact Us", path: "/contact", keywords: ["contact", "enquiry", "message", "write"], answer: "Send us a message or find our phone numbers and address." },
];

/** Everyday words for the super-speciality units listed as cards on the Specialities pages. */
const CARD_ALIASES: Record<string, string[]> = {
  cardiology: ["heart", "cardiac", "cardiologist", "chest pain", "heart attack"],
  nephrology: ["kidney", "kidneys", "nephrologist", "dialysis"],
  neurology: ["brain", "nerve", "nerves", "stroke", "epilepsy", "neurologist", "paralysis"],
  neurosurgery: ["brain surgery", "spine surgery", "neurosurgeon"],
  gastroenterology: ["stomach", "liver", "gastro", "digestion", "gastroenterologist"],
  urology: ["urine", "urinary", "prostate", "urologist", "stones"],
};

/** Aliases for a card, matched by name containment ("Nephrology & Dialysis" → nephrology). */
const cardAliases = (name: string) =>
  Object.entries(CARD_ALIASES)
    .filter(([k]) => name.toLowerCase().includes(k))
    .flatMap(([, v]) => v);

/** Other words people use for a committee. */
const COMMITTEE_ALIASES: Record<string, string[]> = {
  "/committess/anti-ragging": ["ragging", "ragging complaint", "report ragging"],
  "/committess/posh-internal": ["sexual harassment", "harassment", "women safety"],
};

/** Other words people use for a leadership role. */
const ROLE_ALIASES: Record<string, string[]> = {
  President: ["chairman", "chairperson", "head of management"],
  Principal: ["head of college"],
  Dean: ["dean of college"],
};

/** Other spellings, short forms and "-ist" words people type for department names. */
const DEPT_ALIASES: Record<string, string[]> = {
  paediatrics: ["pediatrics", "pediatric", "paediatrician", "pediatrician", "child", "children", "kids", "child specialist"],
  "obstetrics-gynaecology": ["obg", "obgyn", "gynecology", "gynaecology", "gynecologist", "gynaecologist", "gynec", "pregnancy", "maternity", "women", "delivery"],
  orthopaedics: ["orthopedics", "ortho", "orthopedician", "orthopaedician", "bone", "fracture", "joint"],
  anaesthesiology: ["anesthesiology", "anesthesia", "anaesthesia", "anaesthetist", "anesthesiologist"],
  ent: ["ear", "nose", "throat", "otorhinolaryngology", "ent specialist"],
  ophthalmology: ["eye", "eyes", "vision", "cataract", "ophthalmologist", "eye doctor"],
  dermatology: ["skin", "dvl", "derma", "dermatologist", "hair"],
  "respiratory-medicine": ["pulmonology", "pulmonologist", "chest", "lungs", "tb", "asthma"],
  radiology: ["radio-diagnosis", "radiodiagnosis", "imaging", "radiologist"],
  dentistry: ["dental", "teeth", "tooth", "dentist"],
  psychiatry: ["mental", "psychology", "psychiatrist", "depression"],
  "forensic-medicine": ["forensic", "fmt", "postmortem"],
  "community-medicine": ["spm", "psm", "preventive", "social medicine"],
  "general-medicine": ["medicine", "physician", "fever", "general physician"],
  "general-surgery": ["surgery", "surgeon", "general surgeon"],
};

// ── Text helpers ───────────────────────────────────────────────────────────────────────────

const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/[\s-]+/)
    .map((w) => (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") ? w.slice(0, -1) : w))
    .filter((w) => w.length > 1);

const flatten = (v: unknown): string =>
  typeof v === "string" ? v : Array.isArray(v) ? v.map(flatten).join(" ") : v && typeof v === "object" ? Object.values(v).map(flatten).join(" ") : "";

const norm = (s: string) => words(s).join(" ");

/** Edit distance, capped — only used for typo tolerance on words of 5+ letters. */
function editDistance(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      best = Math.min(best, cur[j]);
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

// ── Index ──────────────────────────────────────────────────────────────────────────────────

function buildEntries(): Entry[] {
  const entries: Entry[] = FAQ.map((f) => ({ ...f, text: f.answer, boost: 1 }));

  for (const [path, page] of Object.entries(STATIC_PAGES)) {
    entries.push({
      title: page.title,
      // Card names and section headings ("Cardiology", "Central Library") are what people ask for by name.
      keywords: [
        page.eyebrow ?? "",
        ...(page.cards ?? []).map((c) => c.name),
        ...(page.sections ?? []).map((b) => b.title ?? ""),
      ],
      text: flatten([page.subtitle, page.sections, page.cardsTitle, page.cards?.map((c) => [c.name, c.meta, c.description])]),
      answer: page.subtitle ?? page.title,
      links: [{ label: page.title, path }],
    });
  }

  // Each card on a content page (a speciality, a facility, a programme) answers on its own.
  for (const [path, page] of Object.entries(STATIC_PAGES)) {
    for (const c of page.cards ?? []) {
      if (!c.description) continue;
      entries.push({
        title: c.name,
        // Everyday words ("heart", "kidney") point to the hospital service, not to courses named after it.
        keywords: [...(path.startsWith("/services") ? cardAliases(c.name) : []), c.meta ?? ""],
        text: flatten([c.description, c.bullets]),
        answer: `${c.name}${c.meta ? ` (${c.meta})` : ""}: ${c.description}`,
        links: [{ label: page.title, path }],
      });
    }
  }

  for (const r of ROUTE_PAGES) entries.push({ ...r, text: r.answer, links: [{ label: r.title, path: r.path }] });

  for (const d of DEPARTMENTS) {
    const hod = getDepartmentHod(d.id);
    entries.push({
      title: `${d.name} department`,
      keywords: [d.name, d.category, ...(DEPT_ALIASES[d.id] ?? [])],
      text: d.description,
      answer: `${d.name} is a ${d.category} department with ${d.facultyCount} faculty members.${hod ? ` Head of Department: ${formatFacultyName(hod.name)}.` : ""} ${d.description}`,
      links: [{ label: `${d.name} department`, path: `/departments/${d.id}` }],
      boost: 1,
    });
  }

  for (const f of ALL_FACULTY) {
    const name = formatFacultyName(f.name);
    entries.push({
      title: name,
      keywords: [],
      text: `${f.designation} ${f.departmentName}`,
      answer: `${name} is ${/^[aeiou]/i.test(f.designation) ? "an" : "a"} ${f.designation} in the Department of ${f.departmentName}.`,
      links: [{ label: `${f.departmentName} faculty`, path: `/departments/${f.departmentId}` }],
    });
  }

  // Department pages' own sections (overview, highlights, facilities...) feed the department answer's matching
  // and answer on their own when asked about a specific facility.
  for (const [id, meta] of Object.entries(DEPARTMENT_METADATA)) {
    for (const sec of meta.details?.sections ?? []) {
      if (!sec.title) continue;
      const body = flatten([sec.subtitle, sec.content, sec.bullets]);
      if (!body.trim()) continue;
      const bullets = sec.bullets?.length ? `\n• ${sec.bullets.slice(0, 8).join("\n• ")}` : "";
      const prose = Array.isArray(sec.content) ? sec.content[0] : sec.content;
      entries.push({
        title: `${meta.name} – ${sec.title}`,
        keywords: [meta.name, ...(DEPT_ALIASES[id] ?? [])],
        text: body,
        answer: `${meta.name} – ${sec.title}: ${prose ?? ""}${bullets}`.replace(": \n", ":\n"),
        links: [{ label: `${meta.name} department`, path: `/departments/${id}` }],
      });
    }
  }

  // Machines & Equipment page.
  for (const m of MACHINES_DATA) {
    entries.push({
      title: m.name,
      keywords: [m.category ?? ""],
      text: m.description,
      answer: `${m.name}${m.category ? ` (${m.category})` : ""}: ${m.description}`,
      links: [{ label: "Machines & Equipment", path: "/machines-equipment" }],
    });
  }

  // Awards page: department, faculty and national awards.
  for (const d of AWARD_DEPARTMENTS) {
    for (const a of d.achievements) {
      entries.push({
        title: a.title,
        keywords: [d.name, a.category, a.badge, "award", "achievement"],
        text: [a.description, a.recognition, a.people, a.collaborators].join(" "),
        answer: `${a.title} (${d.name}): ${a.description}`,
        links: [{ label: "Awards & Achievements", path: "/about/awards" }],
      });
    }
  }
  for (const a of facultyAchievements) {
    entries.push({
      title: `${a.name} – ${a.award}`,
      keywords: [a.department, "award", "achievement"],
      text: [a.occasion, a.description, a.significance].join(" "),
      answer: `${a.name} (${a.department}) received ${a.award}${a.occasion ? ` at ${a.occasion}` : ""}. ${a.description}`,
      links: [{ label: "Awards & Achievements", path: "/about/awards" }],
    });
  }
  for (const a of nationalAwards) {
    entries.push({
      title: `${a.recipient} – ${a.award}`,
      keywords: [a.program, a.domain, "national award", "award"],
      text: a.details,
      answer: `${a.recipient} (${a.program}) — ${a.award}. ${a.details}`,
      links: [{ label: "Awards & Achievements", path: "/about/awards" }],
    });
  }

  // Leadership: Dean, Principal, President, Secretary... read from the management data.
  for (const m of ALL_LEADERSHIP_MEMBERS) {
    entries.push({
      title: `${m.role} ${m.name}`,
      keywords: [m.role, m.designationNote ?? "", ...(ROLE_ALIASES[m.role] ?? [])],
      text: [m.departmentOrWing, m.profile?.title, ...(m.profile?.bio ?? [])].filter(Boolean).join(" "),
      answer: `${m.name} is the ${m.role}${m.designationNote ? ` (${m.designationNote})` : ""} of AIMS.`,
      links: [
        { label: `${m.role} — profile`, path: `/leadership/${m.id}` },
        { label: "Management", path: "/management" },
      ],
      boost: 1.5,
    });
  }

  // Committees, each by name.
  for (const c of COMMITTEES) {
    entries.push({
      title: c.title,
      keywords: [c.title.replace(/committee/i, "").trim(), ...(COMMITTEE_ALIASES[c.path] ?? [])],
      text: c.subtitle,
      answer: `${c.title}: ${c.subtitle}.`,
      links: [{ label: c.title, path: c.path }],
    });
  }

  // News items from AIMS in News.
  for (const n of chronicles) {
    entries.push({
      title: titleCase(n.title),
      keywords: [...n.tags, n.category],
      text: [n.subtitle, n.description, ...n.supportingContent].join(" "),
      answer: `${titleCase(n.title)}: ${n.description}`,
      links: [{ label: "AIMS in News", path: "/aims-in-the-news" }],
    });
  }

  // Bus routes: "bus to Kompally" → the route that stops there, with the in-charge's contact.
  for (const r of BUS_ROUTES) {
    const stops = r.stops.filter((s) => s !== "AIMS");
    entries.push({
      title: `Bus route ${r.no}`,
      keywords: [...stops, ...(r.passBy ?? [])],
      text: "bus route stop",
      answer: `Bus route ${r.no} stops at ${stops.join(", ")}. In-charge: ${r.incharge.name} (${r.incharge.phone}).`,
      links: [{ label: "Bus Routes & Tracker", path: "/facilities/transport" }],
    });
  }

  return entries;
}

const STOP = new Set(
  "a an the is are was be to of in on at for and or what where when who how which can do does i me my we our you your it this that there about tell please show give want need get any have has with from by aims arundathi college hospital institute dr sir madam hi hello much many available know".split(" ")
);

/** Low-information words, ignored when the question also names something specific ("neurology department"). */
const GENERIC = new Set(["department", "dept", "service", "facility", "detail", "information", "info", "section", "unit", "specialist", "doctor", "checkup", "treatment", "consultation"]);

interface Indexed {
  entry: Entry;
  title: Set<string>;
  keys: Set<string>;
  text: Set<string>;
  titleNorm: string;
  keyNorms: string[];
}

let INDEX: Indexed[] | null = null;
let IDF: Map<string, number> | null = null;
let VOCAB: string[] = [];

function ensureIndex() {
  if (INDEX) return;
  INDEX = buildEntries().map((entry) => ({
    entry,
    title: new Set(words(entry.title)),
    keys: new Set(entry.keywords.flatMap(words)),
    text: new Set(words(entry.text)),
    titleNorm: norm(entry.title.replace(/\s+department$/i, "")),
    keyNorms: entry.keywords.map(norm).filter(Boolean),
  }));
  // Rarer words carry more weight: a word on 2 pages tells us more than one on 200.
  const df = new Map<string, number>();
  for (const i of INDEX) for (const w of new Set([...i.title, ...i.keys, ...i.text])) df.set(w, (df.get(w) ?? 0) + 1);
  const n = INDEX.length;
  IDF = new Map([...df].map(([w, c]) => [w, 0.45 + 0.85 * (Math.log(n / c) / Math.log(n))]));
  VOCAB = [...df.keys()].filter((w) => w.length >= 5);
}

/** A query word that isn't on the site maps to its closest site word ("gynecologist" → "gynecology"). */
function resolveTerm(t: string): { word: string; factor: number } | null {
  if (IDF!.has(t)) return { word: t, factor: 1 };
  if (t.length < 5) return null;
  let best: { word: string; factor: number } | null = null;
  for (const v of VOCAB) {
    let p = 0;
    while (p < t.length && p < v.length && t[p] === v[p]) p++;
    if (p >= 6 || (p >= 5 && p >= Math.min(t.length, v.length) - 1)) {
      const f = 0.85;
      if (!best || f > best.factor || (f === best.factor && v.length < best.word.length)) best = { word: v, factor: f };
    } else if (editDistance(t, v, t.length >= 9 ? 2 : 1) <= (t.length >= 9 ? 2 : 1)) {
      if (!best || 0.8 > best.factor) best = { word: v, factor: 0.8 };
    }
  }
  return best;
}

// ── Answering ──────────────────────────────────────────────────────────────────────────────

export interface AssistantReply {
  text: string;
  links: AssistantLink[];
  /** How the reply was found: a direct answer, the closest pages, or general help. */
  kind?: "answer" | "suggestions" | "fallback";
}

export const FALLBACK: AssistantReply = {
  text: `I couldn't find that on the website. Try asking about admissions, fees, OPD timings, departments, a doctor's name, careers, transport or hostels. You can also call ${PHONE} or email ${EMAIL}.`,
  links: [
    { label: "Contact page", path: "/contact" },
    { label: "Admissions", path: "/admissions" },
    { label: "Departments", path: "/departments" },
    { label: "Careers", path: "/careers" },
  ],
  kind: "fallback",
};

export function matchQuestion(question: string): AssistantReply {
  const q = question.trim().toLowerCase();
  if (/^(hi|hello|hey|hai|namaste|namaskar|good (morning|afternoon|evening))\b/.test(q) && q.split(/\s+/).length <= 3) {
    return { text: "Hello! I can answer questions about AIMS and take you to the right page. What would you like to know?", links: [], kind: "answer" };
  }
  if (/^(thanks|thank you|thank u|ok|okay|great|nice|good)\b/.test(q) && q.split(/\s+/).length <= 4) {
    return { text: "You're welcome! Anything else I can help with?", links: [], kind: "answer" };
  }

  ensureIndex();
  const qNorm = norm(q.replace(/[?.!]+$/, ""));
  const all = [...new Set(words(q))].filter((w) => !STOP.has(w));
  const specific = all.filter((w) => !GENERIC.has(w));
  const raw = specific.length > 0 ? specific : all;
  const terms = raw.map(resolveTerm).filter((t): t is { word: string; factor: number } => t !== null);
  if (raw.length === 0) return FALLBACK;

  const scored = INDEX!.map(({ entry, title, keys, text, titleNorm, keyNorms }) => {
    let score = 0;
    let hits = 0;
    for (const { word, factor } of terms) {
      const w = IDF!.get(word)! * factor;
      if (title.has(word)) (score += 4 * w), hits++;
      else if (keys.has(word)) (score += 2.5 * w), hits++;
      else if (text.has(word)) (score += 0.6 * w), hits++;
    }
    if (score === 0) return { entry, score: 0 };
    // Asking for a page, department or doctor by its exact name wins.
    if (titleNorm && qNorm === titleNorm) score += 6;
    else if (titleNorm.split(" ").length >= 2 && (` ${qNorm} `).includes(` ${titleNorm} `)) score += 3;
    for (const k of keyNorms) {
      if (k === qNorm) score += 3;
      else if (k.includes(" ") && (` ${qNorm} `).includes(` ${k} `)) score += 2.5;
    }
    // Matching more of the question beats matching one word strongly.
    score *= 0.6 + 0.4 * (hits / Math.max(1, terms.length));
    return { entry, score: score + (entry.boost ?? 0) };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const strong = scored.filter((s) => s.score >= 2.3);
  if (strong.length > 0) {
    const best = strong[0].entry;
    // Add a second strong match's link when it points somewhere new.
    const extra = strong
      .slice(1, 3)
      .filter((s) => s.score >= strong[0].score * 0.8)
      .flatMap((s) => s.entry.links)
      .filter((l) => !best.links.some((b) => b.path === l.path));
    return { text: best.answer, links: [...best.links, ...extra].slice(0, 4), kind: "answer" };
  }

  // Nothing strong: offer the closest pages rather than a dead end.
  const near = scored.filter((s) => s.score >= 1.2).slice(0, 3);
  if (near.length > 0) {
    const links: AssistantLink[] = [];
    for (const s of near) for (const l of s.entry.links) if (!links.some((x) => x.path === l.path)) links.push(l);
    return {
      text: `I'm not completely sure, but these look closest to your question: ${near.map((s) => s.entry.title).join(", ")}. You can also call ${PHONE}.`,
      links: links.slice(0, 4),
      kind: "suggestions",
    };
  }
  return FALLBACK;
}

if (import.meta.env?.DEV) {
  void import("../seo/routeMeta").then(({ metaFor }) => {
    const missing = new Set<string>();
    for (const e of buildEntries())
      for (const l of e.links)
        if (!l.external && !/^\/(documents|forms)\//.test(l.path) && !metaFor(l.path)) missing.add(`${l.path} (from "${e.title}")`);
    if (missing.size) console.warn("[assistant] links to pages that do not exist:\n" + [...missing].join("\n"));
  });
}
