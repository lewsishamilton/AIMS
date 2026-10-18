import { STATIC_PAGES } from "./pages";
import { DEPARTMENTS, ALL_FACULTY, getDepartmentHod } from "./facultyData";
import { formatFacultyName } from "../sections/Faculty/FacultyCardProp";

/**
 * Knowledge for the on-site assistant. Everything except the FAQ answers below is read from the
 * site's own data, so new pages, departments and faculty are picked up automatically.
 * ponytail: keyword-overlap scoring, no NLP. Swap matchQuestion for an LLM call if free-form chat is ever needed.
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

const PHONE = "+91 80556 67888";
const ADMISSIONS_PHONE = "+91 90009 94842 (Dr. Achireddy)";
const EMAIL = "arundathihospital@gmail.com";
const ADDRESS = "Beside MLRIT, Dundigal, Gandi Maisamma, Medchal-Malkajgiri District, Telangana 500043";

const FAQ: Omit<Entry, "text">[] = [
  {
    title: "Contact details",
    keywords: ["contact", "phone", "number", "call", "email", "mail", "reach", "reception", "helpline", "mobile", "achireddy", "admissions"],
    answer: `Reception: ${PHONE}\nAdmissions Enquiry (Dr. Achireddy): ${ADMISSIONS_PHONE}\nEmail: ${EMAIL}`,
    links: [{ label: "Contact page", path: "/contact" }],
  },
  {
    title: "Location and directions",
    keywords: ["address", "location", "where", "located", "directions", "map", "route", "dundigal", "reach", "how to come"],
    answer: `We are at ${ADDRESS}.`,
    links: [
      { label: "Open in Google Maps", path: "https://maps.google.com/?q=Arundathi+Institute+of+Medical+Sciences+Dundigal", external: true },
      { label: "Contact page", path: "/contact" },
    ],
  },
  {
    title: "Emergency and ambulance",
    keywords: ["emergency", "ambulance", "casualty", "trauma", "accident", "urgent", "icu", "critical"],
    answer: `The casualty department is open 24×7. Come straight to casualty in an emergency.`,
    links: [{ label: "Emergency Care", path: "/services/emergency-trauma" }],
  },
  {
    title: "OPD timings",
    keywords: ["opd timings", "opd", "timing", "timings", "hours", "open", "close", "time", "outpatient", "consultation", "visiting", "doctor available", "sunday"],
    answer: "The OPD runs Monday to Saturday, 9:00 AM to 4:00 PM. Emergency and casualty are open 24×7.",
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
    keywords: ["admission", "admissions", "apply", "neet", "counselling", "join", "eligibility", "eligible", "process", "mbbs seat"],
    answer: `MBBS admission is through NEET-UG and state counselling (KNRUHS). Steps, criteria and required documents are on the Admissions pages. Admissions office: ${ADMISSIONS_PHONE}.`,
    links: [
      { label: "Admissions Overview", path: "/admissions" },
      { label: "Admission Criteria", path: "/admissions/criteria" },
    ],
  },
  {
    title: "Seat matrix",
    keywords: ["seats", "seat", "intake", "matrix", "quota", "category", "nri", "management", "convener"],
    answer: "AIMS has 150 MBBS seats: A-Category 75 (50%), B-Category 52 (35%) and C-Category / NRI 23 (15%).",
    links: [{ label: "Seat Matrix", path: "/admissions/seat-matrix" }],
  },
  {
    title: "Fees",
    keywords: ["fee", "fees", "tuition", "payment", "pay", "dd", "demand draft"],
    answer: "MBBS fees are fixed by the state fee regulatory notification each year. The Fee Structure page explains what is covered, and the Application Forms page has the bank details for fee payment.",
    links: [
      { label: "Fee Structure", path: "/admissions/fee-structure" },
      { label: "Bank details & forms", path: "/admissions/forms" },
    ],
  },
  {
    title: "Application forms",
    keywords: ["form", "forms", "bond", "affidavit", "checklist", "proforma", "download form"],
    answer: "All admission forms and bonds (checklist, fee bond, bank guarantee, discontinuation bond, genuinity bond, anti-ragging bond, NRI affidavit) can be viewed and downloaded on the Application Forms page.",
    links: [{ label: "Application Forms", path: "/admissions/forms" }],
  },
  {
    title: "Admitted students list",
    keywords: ["admitted", "list", "students", "selected", "batch", "roll", "merit"],
    answer: "The admitted MBBS student lists for 2023–24, 2024–25 and 2025–26 are on the Admitted List page, with a PDF download.",
    links: [{ label: "Admitted List", path: "/admissions/admitted-list" }],
  },
  {
    title: "Courses offered",
    keywords: ["course", "courses", "programme", "program", "degree", "nursing", "bsc", "physiotherapy", "diploma", "paramedical", "allied"],
    answer: "AIMS offers MBBS, Nursing & Allied Health degrees (B.Sc. Nursing, B.Sc. MLT, Physiotherapy) and paramedical diplomas.",
    links: [
      { label: "MBBS", path: "/academics/mbbs" },
      { label: "Nursing & Allied Health", path: "/academics/nursing-allied-health" },
      { label: "Paramedical Diplomas", path: "/academics/paramedical-diplomas" },
    ],
  },
  {
    title: "Brochure",
    keywords: ["brochure", "prospectus", "booklet", "download brochure"],
    answer: "You can open or download the AIMS brochure (PDF, 22.7 MB).",
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
    keywords: ["bus", "buses", "transport", "transportation", "route", "routes", "pickup", "stop", "driver", "commute"],
    answer: "College buses run on multiple routes across Hyderabad. The Bus Routes page shows every route, its stops, and the in-charge and driver contacts.",
    links: [{ label: "Bus Routes & Tracker", path: "/facilities/transport" }],
  },
  {
    title: "Hostel and campus life",
    keywords: ["hostel", "hostels", "mess", "food", "canteen", "gym", "sports", "stadium", "campus", "accommodation", "room"],
    answer: "The campus has boys' and girls' hostels, a mess and food court, a gymnasium, an indoor stadium and outdoor sports facilities.",
    links: [{ label: "Campus Life", path: "/facilities/campus-life" }],
  },
  {
    title: "Departments",
    keywords: ["department", "departments", "specialty", "speciality", "branch", "subjects"],
    answer: `AIMS has ${DEPARTMENTS.length} academic departments across Pre-Clinical, Para-Clinical and Clinical. Ask about any department by name, or browse them all.`,
    links: [{ label: "All Departments", path: "/departments" }],
  },
  {
    title: "Faculty",
    keywords: ["faculty", "doctors", "teachers", "professors", "staff", "lecturers"],
    answer: `The Faculty Directory lists all ${ALL_FACULTY.length} faculty members by department. You can also ask me about a doctor by name.`,
    links: [{ label: "Faculty Directory", path: "/faculty" }],
  },
  {
    title: "Dean",
    keywords: ["dean", "principal", "head of college"],
    answer: "The Dean of AIMS is Dr. B. Devanand. His profile and message are on the Dean page.",
    links: [
      { label: "Dean", path: "/dean" },
      { label: "Management", path: "/management" },
    ],
  },
  {
    title: "Founder and management",
    keywords: ["founder", "chairman", "president", "management", "owner", "rajasekhar", "laxman", "secretary", "trust", "society"],
    answer: "AIMS was founded by Marri Rajasekhar Reddy. The executive committee is led by President Marri Laxman Reddy.",
    links: [
      { label: "Founder", path: "/founder" },
      { label: "Management", path: "/management" },
    ],
  },
  {
    title: "Virtual tour",
    keywords: ["virtual", "tour", "360", "view campus", "see campus"],
    answer: "Take a 360° virtual tour of the campus, the hospital and the operation theatre complex.",
    links: [{ label: "Virtual Tour", path: "/virtual-tour" }],
  },
  {
    title: "Gallery, news and awards",
    keywords: ["gallery", "photos", "pictures", "images", "events", "news", "media", "awards", "achievements"],
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
    keywords: ["committee", "committees", "ragging", "anti", "anti-ragging", "ethics", "posh", "harassment", "pharmacovigilance", "disciplinary", "meu", "scientific"],
    answer: "AIMS has Anti-Ragging, Ethics, POSH Internal, Pharmacovigilance, Disciplinary and Scientific committees and a Medical Education Unit.",
    links: [
      { label: "Anti Ragging", path: "/committess/anti-ragging" },
      { label: "POSH Internal", path: "/committess/posh-internal" },
      { label: "Ethics", path: "/committess/ethics" },
    ],
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

/** Other spellings and short forms people type for department names. */
const DEPT_ALIASES: Record<string, string[]> = {
  paediatrics: ["pediatrics", "pediatric", "child", "children", "kids"],
  "obstetrics-gynaecology": ["obg", "obgyn", "gynecology", "gynaecology", "gynec", "pregnancy", "maternity", "women"],
  orthopaedics: ["orthopedics", "ortho", "bone", "fracture"],
  anaesthesiology: ["anesthesiology", "anesthesia", "anaesthesia"],
  ent: ["ear", "nose", "throat", "otorhinolaryngology"],
  ophthalmology: ["eye", "eyes", "vision", "cataract"],
  dermatology: ["skin", "dvl", "derma"],
  "respiratory-medicine": ["pulmonology", "chest", "lungs", "tb", "asthma"],
  radiology: ["radio-diagnosis", "radiodiagnosis", "imaging", "xray", "scan"],
  dentistry: ["dental", "teeth", "tooth", "dentist"],
  psychiatry: ["mental", "psychology", "psychiatrist"],
  "forensic-medicine": ["forensic", "fmt"],
  "community-medicine": ["spm", "psm", "preventive", "social medicine"],
  "general-medicine": ["medicine", "physician", "fever"],
  "general-surgery": ["surgery", "surgeon"],
};

const words = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .map((w) => (w.length > 3 && w.endsWith("s") ? w.slice(0, -1) : w))
    .filter((w) => w.length > 1);

const flatten = (v: unknown): string =>
  typeof v === "string" ? v : Array.isArray(v) ? v.map(flatten).join(" ") : v && typeof v === "object" ? Object.values(v).map(flatten).join(" ") : "";

function buildEntries(): Entry[] {
  const entries: Entry[] = FAQ.map((f) => ({ ...f, text: f.answer, boost: 2 }));

  for (const [path, page] of Object.entries(STATIC_PAGES)) {
    entries.push({
      title: page.title,
      // Card names and section headings ("Cardiology", "Central Library") are what people ask for by name.
      keywords: [page.eyebrow ?? "", ...(page.cards ?? []).map((c) => c.name), ...(page.sections ?? []).map((b) => b.title ?? "")],
      text: flatten([page.subtitle, page.sections, page.cardsTitle, page.cards?.map((c) => [c.name, c.meta, c.description])]),
      answer: page.subtitle ?? page.title,
      links: [{ label: page.title, path }],
    });
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
  return entries;
}

const STOP = new Set(
  "a an the is are was be to of in on at for and or what where when who how which can do does i me my we our you your it this that there about tell please show give want need get any have has with from by aims arundathi college hospital institute dr doctor sir madam hi hello".split(" ")
);

let INDEX: { entry: Entry; title: Set<string>; keys: Set<string>; text: Set<string> }[] | null = null;

export interface AssistantReply {
  text: string;
  links: AssistantLink[];
}

export const FALLBACK: AssistantReply = {
  text: `I couldn't find that on the website. Try asking about admissions, fees, OPD timings, departments, a doctor's name, transport or hostels. You can also call ${PHONE} or email ${EMAIL}.`,
  links: [{ label: "Contact page", path: "/contact" }],
};

export function matchQuestion(question: string): AssistantReply {
  const q = question.trim().toLowerCase();
  if (/^(hi|hello|hey|namaste|good (morning|afternoon|evening))\b/.test(q) && q.split(/\s+/).length <= 3) {
    return { text: "Hello! I can answer questions about AIMS and take you to the right page. What would you like to know?", links: [] };
  }
  if (/^(thanks|thank you|ok|okay|great)\b/.test(q)) return { text: "You're welcome! Anything else I can help with?", links: [] };

  INDEX ??= buildEntries().map((entry) => ({
    entry,
    title: new Set(words(entry.title)),
    keys: new Set(entry.keywords.flatMap(words)),
    text: new Set(words(entry.text)),
  }));

  const terms = [...new Set(words(q))].filter((w) => !STOP.has(w));
  if (terms.length === 0) return FALLBACK;

  const scored = INDEX.map(({ entry, title, keys, text }) => {
    let score = 0;
    for (const t of terms) {
      if (title.has(t)) score += 3;
      else if (keys.has(t)) score += 2.5;
      else if (text.has(t)) score += 0.6;
    }
    for (const k of entry.keywords) {
      const key = k.toLowerCase();
      // Multi-word keywords ("demand draft") match on the raw question; asking for a name exactly ("cardiology") wins ties.
      if (key.includes(" ") && q.includes(key)) score += 2.5;
      if (key === q.replace(/[?.!]+$/, "")) score += 2;
    }
    return { entry, score: score > 0 ? score + (entry.boost ?? 0) : 0 };
  })
    .filter((s) => s.score >= 2.5)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return FALLBACK;
  const best = scored[0].entry;
  // Add a second strong match's link when it points somewhere new.
  const extra = scored
    .slice(1, 3)
    .filter((s) => s.score >= scored[0].score * 0.8)
    .flatMap((s) => s.entry.links)
    .filter((l) => !best.links.some((b) => b.path === l.path));
  return { text: best.answer, links: [...best.links, ...extra].slice(0, 4) };
}

