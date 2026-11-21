import { PG_PROGRAMMES, pgPath } from "./pages/postgraduate";
import { CONTACT } from "./siteInfo";
import { BUS_ROUTES } from "./busRoutesData";

/**
 * Long-form content for PG programme pages that use the detailed layout
 * (pages/PgProgrammeDetailPage.tsx). Written for AIMS from AIMS's own facts and the NMC
 * postgraduate curriculum — no text is taken from other institutions' pages.
 */

export interface PgProgrammeDetail {
  slug: string;
  heroTitle: string;
  introHeading: string;
  intro: string[];
  highlights: { label: string; text: string }[];
  features: { title: string; text: string; icon: "clinical" | "research" | "community" }[];
  outcomes: string[];
  careers: string[];
  department: { name: string; text: string; path: string };
  admissionSteps: { title: string; detail: string }[];
  admissionNotes: { title: string; text: string }[];
  eligibility: string[];
  years: { label: string; title: string; points: string[] }[];
  related: { name: string; path: string; degree: "MD" | "MS"; summary: string }[];
  /** `map: true` shows a Google Map of the campus under the answer; wrap words in **…** to highlight them. */
  faqs: { q: string; a: string; map?: boolean; link?: { label: string; path: string } }[];
}

const gm = PG_PROGRAMMES.find((p) => p.slug === "md-general-medicine")!;

export const PG_PROGRAMME_DETAILS: Record<string, PgProgrammeDetail> = {
  "md-general-medicine": {
    slug: "md-general-medicine",
    heroTitle: "MD General Medicine at AIMS, Hyderabad",
    introHeading: "Train as a Physician in a Working Tertiary-Care Hospital",
    intro: [
      "The Doctor of Medicine (MD) in General Medicine at Arundathi Institute of Medical Sciences (AIMS) is a three-year postgraduate programme regulated by the National Medical Commission and affiliated to Kaloji Narayana Rao University of Health Sciences. You prepare to diagnose and manage the full range of adult medical illness, from the outpatient clinic to the intensive care unit.",
      "Through supervised clinical work, bedside teaching and research, you build the judgement to manage acute and chronic disease, deliver critical care, and work alongside the super-speciality teams of Arundathi Hospital.",
    ],
    highlights: [
      { label: "NMC-Regulated Curriculum", text: "You follow the competency-based postgraduate curriculum prescribed by the National Medical Commission." },
      {
        label: "High Clinical Volume",
        text: "Free consultation, investigations and inpatient care bring a large and varied caseload — 81,230+ outpatient consultations recorded on the AIMS hospital statistics dashboard.",
      },
      { label: "Critical Care Exposure", text: "Train in a well-equipped ICU and CCU, with 24-hour casualty and critical care services." },
      {
        label: "Super-Speciality Support",
        text: "Work alongside Neurology, Nephrology, Gastroenterology and Cardiology, with a cath lab, dialysis unit and high-end endoscopy in the same hospital.",
      },
      { label: "Teaching and Research", text: "Teach MBBS students and complete a supervised thesis, supported by the Central Research Laboratory." },
    ],
    features: [
      {
        title: "Clinical Training",
        icon: "clinical",
        text: "Take graded responsibility for patients in outpatient clinics, wards, emergency and intensive care under consultant supervision.",
      },
      {
        title: "Research Projects",
        icon: "research",
        text: "Complete a supervised research project leading to a thesis, reviewed by the Institutional Ethics and Scientific Committees.",
      },
      {
        title: "Community Engagement",
        icon: "community",
        text: "Take part in rural and school health camps and outreach across the department's 15 adopted villages.",
      },
    ],
    // Five key outcomes (diagnosis, emergencies, investigations, procedures, research).
    outcomes: [0, 1, 2, 3, 7].map((i) => gm.outcomes?.[i]).filter((x): x is string => Boolean(x)),
    careers: [
      "Consultant physician in hospitals and multi-speciality centres",
      "Teaching careers in medical colleges, beginning as Senior Resident, as per NMC norms",
      "Critical care and emergency medicine practice",
      "Super-speciality (DM) training in Cardiology, Nephrology, Neurology, Gastroenterology and more, through NEET-SS",
      "Specialist and medical officer posts in government hospitals and health services",
    ],
    department: {
      name: "Department of General Medicine",
      text: "The Department of General Medicine provides primary, secondary and tertiary care for adults, with 24-hour casualty and critical care, and is the hub for undergraduate and postgraduate teaching in medicine at AIMS.",
      path: "/departments/general-medicine",
    },
    admissionSteps: [
      { title: "Qualify NEET-PG 2026", detail: "Score at or above the qualifying percentile for your category." },
      {
        title: "Register for KNRUHS Counselling",
        detail: "Register online and choose AIMS and MD General Medicine in your web options.",
      },
      { title: "Seat Allotment", detail: "Convener quota seats are allotted by KNRUHS; Management and NRI seats as notified." },
      { title: "Report to AIMS", detail: "Bring your original documents for verification within the reporting window." },
      { title: "Admission Confirmed", detail: "Complete the admission formalities and begin your residency." },
    ],
    admissionNotes: [
      {
        title: "Note",
        text: "Counselling and seat allotment are conducted by KNRUHS for Convener quota seats; Management and NRI seats are filled as notified.",
      },
      {
        title: "Admissions Enquiry",
        text: "For the current seat matrix and reporting schedule, contact Dr. Ch. Achireddy: +91 90009 94842.",
      },
    ],
    eligibility: [
      "MBBS degree from a medical college recognised by the National Medical Commission",
      "Completion of the compulsory rotating internship before the counselling cut-off date",
      "A valid NEET-PG score at the percentile prescribed for the candidate's category",
      "Permanent or provisional registration with a State Medical Council or the National Medical Commission",
      "Allotment through KNRUHS counselling for Convener quota seats, with Management and NRI seats filled as notified",
    ],
    years: [
      {
        label: "Year 1",
        title: "Foundations",
        points: [
          "Orientation to the speciality and applied basic sciences relevant to medicine",
          "Structured outpatient and ward postings under consultant supervision",
          "History taking, clinical examination and core procedures",
          "Thesis topic selection and protocol approval",
        ],
      },
      {
        label: "Year 2",
        title: "Clinical Responsibility",
        points: [
          "Rotations through the Cardiology, Nephrology, Neurology and Gastroenterology units",
          "Emergency and intensive-care duties with graded independence",
          "District Residency Programme posting, as required by NMC regulations",
          "Thesis data collection",
        ],
      },
      {
        label: "Year 3",
        title: "Senior Residency",
        points: [
          "Senior responsibility for wards and critical care",
          "Teaching undergraduate students during clinical postings",
          "Thesis submission to the university",
          "University examination: theory, clinical and viva voce",
        ],
      },
    ],
    // Every other MD / MS programme, so new programmes appear here automatically.
    related: PG_PROGRAMMES.filter((p) => p.slug !== "md-general-medicine").map((p) => ({
      name: p.name,
      path: pgPath(p.slug),
      degree: p.degree,
      summary: p.summary,
    })),
    faqs: [
      {
        q: "How do I get admission?",
        a: "Qualify NEET-PG, then take part in KNRUHS counselling. Convener quota seats are allotted by KNRUHS; Management and NRI seats are filled as notified.",
      },
      {
        q: "Whom do I contact for admission queries?",
        a: `Call the admissions office — **${CONTACT.admissionsContact}**, ${CONTACT.admissionsPhone} — or email **${CONTACT.admissionsEmail}**. You can also send an online admissions enquiry from this page.`,
        link: { label: "Send an admissions enquiry", path: "/admissions/apply/enquire" },
      },
      {
        q: "When does the academic session begin?",
        a: "The MD session begins after NEET-PG counselling, on the schedule notified each year by the National Medical Commission and KNRUHS. Selected candidates are informed of the reporting dates by the admissions office.",
      },
      {
        q: "Is research compulsory in this programme?",
        a: "Yes. As NMC regulations require, every resident completes a supervised thesis, which is submitted to the university before the final examination.",
      },
      {
        q: "How do I reach AIMS?",
        a: `AIMS is located ${CONTACT.address.replace(/^Beside/, "beside")}. College buses run on ${BUS_ROUTES.length} routes across Hyderabad, and the campus is on Google Maps below.`,
        map: true,
      },
    ],
  },
};
