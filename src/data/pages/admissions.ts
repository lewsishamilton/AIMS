import type { StaticPageDef } from "../../components/StaticPage";

const ADMISSION_LINKS = [
  { name: "Admissions Overview", path: "/admissions" },
  { name: "Admission Criteria", path: "/admissions/criteria" },
  { name: "Seat Matrix", path: "/admissions/seat-matrix" },
  { name: "Fee Structure", path: "/admissions/fee-structure" },
  { name: "Application Forms", path: "/admissions/forms" },
  { name: "Admitted List", path: "/admissions/admitted-list" },
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
          "The candidate must have completed 17 years of age on or before 31 December of the admission year, as per NMC regulations",
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
      "Category-wise distribution of annual intake seats and admission criteria for the MBBS programme.",
    sections: [],
    quickLinks: [],
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
    title: "Application Forms & Proformas",
    subtitle:
      "Official downloadable application forms, affidavit bonds, and certificate checklists required for MBBS admission verification and reporting at Arundathi Institute of Medical Sciences.",
    sections: [],
    quickLinks: [],
  },

  "/admissions/admitted-list": {
    eyebrow: "Admissions",
    title: "Admitted List",
    subtitle:
      "Batch-wise student registration and admission records across academic years ratified by Kaloji Narayana Rao University of Health Sciences (KNRUHS) and approved by the National Medical Commission (NMC).",
    sections: [],
    quickLinks: linksExcept("/admissions/admitted-list"),
  },

};
