import type { StaticPageDef } from "../../components/StaticPage";

const ADMISSION_LINKS = [
  { name: "Admissions Overview", path: "/admissions" },
  { name: "Admission Criteria", path: "/admissions/criteria" },
  { name: "Seat Matrix", path: "/admissions/seat-matrix" },
  { name: "Fee Structure", path: "/admissions/fee-structure" },
  { name: "Application Forms", path: "/admissions/forms" },
  { name: "Admitted List", path: "/admissions/admitted-list" },
  { name: "Regulations", path: "/admissions/regulations" },
];

const linksExcept = (path: string) =>
  ADMISSION_LINKS.filter((l) => l.path !== path);

const ADMISSIONS_DESK =
  "Admissions office: +91 80557 78999 · info@aims.ac.in · Beside MLRIT, Dundigal, Gandi Maisamma, Medchal–Malkajgiri District, Telangana 500043.";

export const ADMISSION_PAGES: Record<string, StaticPageDef> = {
  "/admissions": {
    eyebrow: "Admissions",
    title: "Admissions at AIMS",
    subtitle:
      "Everything a candidate and their family needs to apply: how seats are allotted, who is eligible, what documents to carry and who to call.",
    sections: [
      {
        title: "How Admission Works",
        content: [
          "Admission to the MBBS programme at Arundathi Institute of Medical Sciences is entirely NEET-based. Convener quota (A-Category) seats are allotted on merit through counselling conducted by Kaloji Narayana Rao University of Health Sciences, Warangal. Management (B-Category) and NRI (C-Category) seats are filled by the institute in accordance with the rules notified by the Government of Telangana and the university.",
          "Nursing, allied health and paramedical diploma admissions are handled directly by the institute's admissions office, with intake and eligibility notified at the start of each academic session.",
        ],
        layout: "full",
      },
      {
        title: "Step 1 — Qualify NEET-UG",
        content:
          "Appear for and qualify NEET-UG at the percentile prescribed for your category. No MBBS admission in India can be made without a valid NEET score.",
        layout: "half",
      },
      {
        title: "Step 2 — Register for Counselling",
        content:
          "Register with KNRUHS for Convener quota counselling, or apply directly to the institute for Management and NRI category seats within the notified window.",
        layout: "half",
      },
      {
        title: "Step 3 — Web Options & Allotment",
        content:
          "Exercise web options in order of preference. Allotment is published by the university on the basis of NEET merit, category and the reservation rules in force.",
        layout: "half",
      },
      {
        title: "Step 4 — Report & Verify",
        content:
          "Report to the institute with the allotment order and all original documents within the reporting date. Admission is confirmed after verification and payment of the notified fee.",
        layout: "half",
      },
      {
        title: "Talk to the Admissions Office",
        content: ADMISSIONS_DESK,
        layout: "full",
      },
    ],
    quickLinks: linksExcept("/admissions"),
    cta: {
      text: "Not sure which programme fits? Start with the MBBS course structure, or look at the nursing, allied health and paramedical diploma options.",
      label: "View Programmes",
      path: "/academics/mbbs",
    },
  },

  "/admissions/criteria": {
    eyebrow: "Admissions",
    title: "MBBS Admission Criteria",
    subtitle:
      "Eligibility, age, qualifying marks and NEET percentile requirements for admission to the MBBS programme, along with the documents required at verification.",
    sections: [
      {
        title: "Admission Categories",
        content:
          "Seats in the MBBS programme are distributed across three categories, each with its own allotment authority and application route.",
        bullets: [
          "Convener Quota (A-Category) — merit-based allotment through counselling conducted by Kaloji Narayana Rao University of Health Sciences",
          "Management Quota (B-Category) — 35% of sanctioned seats, filled by the institute as per notified rules",
          "NRI Quota (C-Category) — 15% of sanctioned seats, filled against NRI declarations and supporting documentation",
        ],
        layout: "full",
      },
      {
        title: "Educational Qualification",
        bullets: [
          "Pass in Intermediate (10+2) or an equivalent examination",
          "Physics, Chemistry, Biology or Biotechnology and English as subjects of study",
          "Minimum aggregate in science subjects — OC: 50%, OC with disability: 45%, BC/SC/ST: 40%",
          "Equivalence certificate required where the qualification is from outside Telangana or outside India",
        ],
        layout: "half",
      },
      {
        title: "NEET-UG Requirement",
        bullets: [
          "A valid, qualifying NEET-UG score is mandatory for every category",
          "Minimum percentile — OC: 50th, BC/SC/ST: 40th, Persons with Disability: 45th",
          "The NEET score is the sole basis of merit for Convener quota allotment",
        ],
        layout: "half",
      },
      {
        title: "Age & Nationality",
        bullets: [
          "The candidate must have completed 17 years of age as on the date notified for the admission year",
          "Convener quota candidates must be an Indian National, a Person of Indian Origin, or an OCI card holder",
          "Local and non-local status is determined as per the rules of the Government of Telangana",
        ],
        layout: "half",
      },
      {
        title: "Additional Requirement for NRI Seats",
        bullets: [
          "NRI status certificate issued by the embassy",
          "Copy of the passport of the NRI sponsor",
          "Copy of the sponsor's bank account passbook",
          "A declaration from the financial supporter, who must be a blood relative",
        ],
        layout: "half",
      },
      {
        title: "Documents to Carry at Verification",
        bullets: [
          "NEET-UG admit card, scorecard and rank letter",
          "Allotment order issued by the counselling authority",
          "SSC or equivalent certificate as proof of date of birth",
          "Intermediate (10+2) marks memo and pass certificate",
          "Study certificates for the preceding qualifying years",
          "Transfer certificate and conduct certificate",
          "Caste certificate and income certificate, where applicable",
          "Aadhaar card and recent passport-size photographs",
        ],
        layout: "full",
      },
      {
        title: "Please Note",
        content:
          "Eligibility conditions, percentile cut-offs and reservation rules are revised each year by the National Medical Commission, the Government of Telangana and KNRUHS. Always confirm the current year's notification with the admissions office before applying. " +
          ADMISSIONS_DESK,
        layout: "full",
      },
    ],
    quickLinks: linksExcept("/admissions/criteria"),
  },

  "/admissions/seat-matrix": {
    eyebrow: "Admissions",
    title: "Seat Matrix",
    subtitle:
      "The MBBS programme at AIMS is sanctioned an annual intake of 150 seats, distributed across the Convener, Management and NRI categories.",
    sections: [
      {
        title: "Sanctioned Intake",
        badges: ["150 MBBS Seats", "NMC Approved"],
        content:
          "Arundathi Institute of Medical Sciences is permitted an annual MBBS intake of 150 students under the Letter of Permission issued by the National Medical Commission, with academic affiliation to Kaloji Narayana Rao University of Health Sciences, Warangal.",
        layout: "full",
      },
      {
        title: "Convener Quota (A-Category)",
        subtitle: "50% of sanctioned seats",
        content:
          "Allotted purely on NEET-UG merit through counselling conducted by KNRUHS, subject to the reservation and local-area rules of the Government of Telangana.",
        layout: "half",
      },
      {
        title: "Management Quota (B-Category)",
        subtitle: "35% of sanctioned seats",
        content:
          "Filled by the institute from among NEET-qualified candidates, following the procedure and fee notified by the competent authority for the admission year.",
        layout: "half",
      },
      {
        title: "NRI Quota (C-Category)",
        subtitle: "15% of sanctioned seats",
        content:
          "Reserved for NRI candidates and candidates sponsored by an NRI blood relative, against the declarations and supporting documents prescribed for the category.",
        layout: "half",
      },
      {
        title: "Nursing, Allied Health & Diplomas",
        content:
          "Intake for B.Sc. Nursing, B.Sc. Medical Laboratory Technology, Bachelor of Physiotherapy and the paramedical diploma programmes is notified separately each academic year by the institute.",
        layout: "half",
      },
      {
        title: "Category-wise Breakdown",
        content:
          "The exact seat count in each category, along with reservation-wise distribution, is published by KNRUHS in the counselling notification for the admission year. The admissions office can share the current year's matrix on request.",
        layout: "full",
      },
    ],
    quickLinks: linksExcept("/admissions/seat-matrix"),
    cta: {
      text: ADMISSIONS_DESK,
      label: "Contact Admissions",
      path: "/contact",
    },
  },

  "/admissions/fee-structure": {
    eyebrow: "Admissions",
    title: "Fee Structure",
    subtitle:
      "Tuition fees for every category are fixed by the competent authority of the Government of Telangana and notified by KNRUHS. AIMS charges only the notified fee.",
    sections: [
      {
        title: "How Fees Are Fixed",
        content: [
          "Tuition fees for MBBS seats in Convener, Management and NRI categories are determined by the Telangana Admission and Fee Regulatory Committee and notified through KNRUHS ahead of each counselling cycle. The institute does not levy any amount above the notified fee, and no payment should be made to any individual or agent outside the official channel.",
          "Because the notified fee is revised periodically, current-year figures are published with the counselling notification rather than fixed on this page.",
        ],
        layout: "full",
      },
      {
        title: "What the Fee Covers",
        bullets: [
          "Tuition for the academic year as notified",
          "Access to laboratories, museums, skill lab and the library",
          "Clinical training at the attached multi-specialty hospital",
          "University registration and examination fees are charged separately by KNRUHS",
        ],
        layout: "half",
      },
      {
        title: "Charged Separately",
        bullets: [
          "Hostel accommodation and mess charges",
          "Transport, where the college bus service is opted for",
          "University examination, registration and convocation fees",
          "Refundable caution deposit, as applicable",
        ],
        layout: "half",
      },
      {
        title: "Payment & Receipts",
        bullets: [
          "Fees are payable only through the official channels notified at the time of admission",
          "Insist on an official institute receipt for every payment made",
          "Refund of fees on withdrawal is governed by the rules notified by the competent authority",
          "Beware of touts and unauthorised persons claiming to arrange admission",
        ],
        layout: "full",
      },
      {
        title: "Get the Current Year's Fee",
        content:
          "For the notified fee applicable to your category in the current admission year, contact the admissions office directly. " +
          ADMISSIONS_DESK,
        layout: "full",
      },
    ],
    quickLinks: linksExcept("/admissions/fee-structure"),
  },

  "/admissions/forms": {
    eyebrow: "Admissions",
    title: "Application Forms",
    subtitle:
      "Application and declaration forms used during admission, verification and the academic year, available from the admissions office.",
    sections: [
      {
        title: "Forms Issued by the Institute",
        bullets: [
          "MBBS Management (B-Category) application form",
          "MBBS NRI (C-Category) application form and sponsor declaration",
          "Nursing, allied health and paramedical diploma application forms",
          "Anti-ragging affidavit for the student and the parent or guardian",
          "Hostel admission and mess registration form",
          "Transport registration form for the college bus service",
          "Bonafide, conduct and transfer certificate request forms",
        ],
        layout: "full",
      },
      {
        title: "How to Obtain a Form",
        content:
          "Application and declaration forms are issued by the admissions office on campus and are also supplied to candidates at the time of counselling and reporting. Call ahead to confirm which forms apply to your category before travelling to the campus.",
        layout: "half",
      },
      {
        title: "Submitting a Completed Form",
        content:
          "Completed forms are submitted in person at the administrative office along with the supporting documents listed in the admission criteria. Keep a copy of every form and an official receipt for every payment.",
        layout: "half",
      },
      {
        title: "Admissions Desk",
        content: ADMISSIONS_DESK,
        layout: "full",
      },
    ],
    quickLinks: linksExcept("/admissions/forms"),
    cta: {
      text: "Check the eligibility conditions and the document checklist before collecting an application form.",
      label: "Admission Criteria",
      path: "/admissions/criteria",
    },
  },

  "/admissions/admitted-list": {
    eyebrow: "Admissions",
    title: "Admitted List",
    subtitle:
      "The list of candidates admitted to the MBBS programme is published for each academic year after counselling, verification and ratification by the university.",
    sections: [
      {
        title: "Publication of the Admitted List",
        content: [
          "After each counselling phase closes and reported candidates complete document verification, the institute publishes the list of admitted students for the academic year. The list is displayed on the institute notice board and submitted to Kaloji Narayana Rao University of Health Sciences for ratification and student registration.",
          "The admitted list records the candidate's name, NEET roll number or rank as applicable, admission category and date of admission, in the format prescribed by the university and the National Medical Commission.",
        ],
        layout: "full",
      },
      {
        title: "After Your Name Appears",
        bullets: [
          "Complete university registration through the institute",
          "Submit original certificates for record as required",
          "Attend the orientation and foundation course for the incoming batch",
          "Sign the anti-ragging undertaking along with your parent or guardian",
        ],
        layout: "half",
      },
      {
        title: "Corrections & Queries",
        bullets: [
          "Report any spelling or category discrepancy to the administrative office immediately",
          "Discrepancies must be corrected before university ratification",
          "Carry your allotment order and NEET scorecard when raising a query",
        ],
        layout: "half",
      },
      {
        title: "Requesting the Current List",
        content:
          "The admitted list for the running academic year is available from the administrative office. " +
          ADMISSIONS_DESK,
        layout: "full",
      },
    ],
    quickLinks: linksExcept("/admissions/admitted-list"),
  },

  "/admissions/regulations": {
    eyebrow: "Admissions",
    title: "Admission Regulations",
    subtitle:
      "Admissions at AIMS are governed by the National Medical Commission, the Government of Telangana and Kaloji Narayana Rao University of Health Sciences, Warangal.",
    sections: [
      {
        title: "Governing Authorities",
        bullets: [
          "National Medical Commission — recognition, sanctioned intake and curriculum",
          "Government of Telangana — reservation policy, local-area rules and fee regulation",
          "Kaloji Narayana Rao University of Health Sciences — affiliation, counselling, examinations and degree award",
          "National Testing Agency — conduct of NEET-UG, the single qualifying examination for MBBS admission",
        ],
        layout: "full",
      },
      {
        title: "Anti-Ragging",
        content:
          "Ragging is a criminal offence and is prohibited in every form on campus, in the hostels, in the hospital and in transport. Every student and parent signs an anti-ragging undertaking at admission, and the institute's Anti Ragging Committee acts on complaints under the regulations in force.",
        layout: "half",
      },
      {
        title: "Code of Conduct",
        content:
          "Students are bound by the institute's code of conduct and by the professional conduct expected of a medical trainee in clinical areas. Breaches are dealt with by the Disciplinary Committee, and complaints of sexual harassment by the POSH Internal Committee.",
        layout: "half",
      },
      {
        title: "Attendance & Progression",
        bullets: [
          "Minimum attendance in theory and practical or clinical work as prescribed by NMC is mandatory to appear for university examinations",
          "Internal assessment must be satisfactory for a candidate to be sent up for the professional examination",
          "Progression between phases follows the regulations notified by NMC and KNRUHS",
          "Completion of the compulsory rotating internship is required before the degree is awarded",
        ],
        layout: "full",
      },
      {
        title: "Withdrawal & Refund",
        content:
          "Withdrawal from an allotted seat, release of original certificates and refund of fees are governed by the rules notified by the competent authority and the university for the admission year. Apply in writing to the administrative office.",
        layout: "full",
      },
    ],
    quickLinks: [
      ...linksExcept("/admissions/regulations"),
      { name: "Anti Ragging Committee", path: "/committess/anti-ragging" },
      { name: "Disciplinary Committee", path: "/committess/disciplinary" },
    ],
  },
};
