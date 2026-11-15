import type { StaticPageDef } from "../../components/StaticPage";

/**
 * One page per MD / MS programme, under /academics/postgraduate/<slug>.
 *
 * Department content comes from the institute's "AIMS PG data" sheet; spelling in that
 * sheet was tidied (e.g. "facio marginary" → faciomaxillary, "carnatic care" → critical care)
 * but nothing was added to what each department offers. The programme-level facts (3 years,
 * NEET-PG, KNRUHS, dissertation) are the same ones the overview page states.
 *
 * Photographs are mapped in data/pageImages.ts under the same paths.
 */

export interface PgProgramme {
  slug: string;
  degree: "MD" | "MS";
  /** Display name, as in the navbar. */
  name: string;
  /** Department name for headings. */
  department: string;
  /** One-line summary: page subtitle and overview card text. */
  summary: string;
  about: string[];
  facilities: string[];
  /** Tertiary-care units the department works alongside, when the sheet names any. */
  supportedBy?: string[];
  badges: string[];
}

export const PG_PROGRAMMES: PgProgramme[] = [
  {
    slug: "md-general-medicine",
    degree: "MD",
    name: "MD General Medicine",
    department: "General Medicine",
    summary:
      "Comprehensive adult care, chronic disease management and preventive health, supported by the hospital's tertiary-care super-speciality units.",
    about: [
      "The Department of General Medicine provides comprehensive care for adult patients, from acute illness to the long-term management of chronic disease and preventive health.",
      "Residents train alongside the hospital's tertiary-care units in Neurology, Nephrology, Gastroenterology and Cardiology, with a well-equipped ICU and CCU, a full-fledged cath lab, a dialysis unit and high-end endoscopy available within the same hospital.",
    ],
    facilities: [
      "Well-equipped Intensive Care Unit (ICU)",
      "Coronary Care Unit (CCU)",
      "Full-fledged cardiac catheterisation lab",
      "Dialysis unit",
      "High-end endoscopy",
    ],
    supportedBy: ["Neurology", "Nephrology", "Gastroenterology", "Cardiology"],
    badges: ["Adult Care", "Chronic Disease", "Preventive Health"],
  },
  {
    slug: "ms-general-surgery",
    degree: "MS",
    name: "MS General Surgery",
    department: "General Surgery",
    summary:
      "Eleven modular operation theatres, a minimally invasive laparoscopic unit and complex surgical procedures with rapid-recovery protocols.",
    about: [
      "The Department of General Surgery works from 11 modular operation theatres with good infrastructure and highly trained faculty, performing complex surgical procedures with rapid-recovery protocols.",
      "A dedicated minimally invasive laparoscopic unit, together with the tertiary-care super-specialities of Neurosurgery, Urology and Surgical Gastroenterology, gives residents exposure to a wide range of surgical work.",
    ],
    facilities: [
      "11 modular operation theatres",
      "Minimally invasive laparoscopic unit",
      "Complex surgical procedures with rapid-recovery protocols",
      "Highly trained surgical faculty",
    ],
    supportedBy: ["Neurosurgery", "Urology", "Surgical Gastroenterology"],
    badges: ["11 Modular OTs", "Laparoscopy", "Rapid Recovery"],
  },
  {
    slug: "ms-orthopedics",
    degree: "MS",
    name: "MS Orthopedics",
    department: "Orthopaedics",
    summary:
      "Bone, joint, spine and sports-injury care, from fracture management to joint replacement.",
    about: [
      "The Department of Orthopaedics covers bone, joint, spine and sports-injury care, from the management of fractures through to joint replacement.",
      "The department is supported by the hospital's tertiary-care Neurosurgery and Faciomaxillary Surgery services, giving residents exposure to complex trauma and spine cases.",
    ],
    facilities: [
      "Fracture and trauma care",
      "Joint replacement surgery",
      "Spine care",
      "Sports-injury care",
    ],
    supportedBy: ["Neurosurgery", "Faciomaxillary Surgery"],
    badges: ["Trauma", "Joint Replacement", "Spine & Sports Injury"],
  },
  {
    slug: "md-paediatrics",
    degree: "MD",
    name: "MD Paediatrics",
    department: "Paediatrics",
    summary:
      "Dedicated medical care for infants, children and adolescents, with NICU and PICU support.",
    about: [
      "The Department of Paediatrics provides dedicated medical care for infants, children and adolescents, including immunisation and growth tracking.",
      "Newborns and critically ill children are cared for in the hospital's Neonatal and Paediatric Intensive Care Units, where residents gain hands-on experience in paediatric critical care.",
    ],
    facilities: [
      "Neonatal Intensive Care Unit (NICU)",
      "Paediatric Intensive Care Unit (PICU)",
      "Immunisation services",
      "Growth and development tracking",
    ],
    badges: ["Infants to Adolescents", "NICU", "PICU"],
  },
  {
    slug: "md-dermatology",
    degree: "MD",
    name: "MD Dermatology",
    department: "Dermatology",
    summary:
      "Medical and cosmetic treatment for skin, hair and nail conditions, with chemical peeling, laser therapy and phototherapy.",
    about: [
      "The Department of Dermatology offers medical and cosmetic treatment for conditions of the skin, hair and nails.",
      "Alongside clinical dermatology, residents train in procedures including chemical peeling, laser therapy and phototherapy.",
    ],
    facilities: [
      "Medical dermatology",
      "Cosmetic dermatology",
      "Chemical peeling",
      "Laser therapy",
      "Phototherapy",
    ],
    badges: ["Skin, Hair & Nails", "Laser Therapy", "Phototherapy"],
  },
  {
    slug: "ms-ophthalmology",
    degree: "MS",
    name: "MS Ophthalmology",
    department: "Ophthalmology",
    summary:
      "Complete vision care, cataract and phacoemulsification surgery, and advanced eye diagnostics.",
    about: [
      "The Department of Ophthalmology provides complete vision care, from routine eye examination to surgery.",
      "Residents train in cataract surgery, including phacoemulsification, and in advanced eye diagnostics.",
    ],
    facilities: [
      "Complete vision care",
      "Cataract surgery",
      "Phacoemulsification surgery",
      "Advanced eye diagnostics",
    ],
    badges: ["Vision Care", "Phaco Surgery", "Eye Diagnostics"],
  },
  {
    slug: "ms-obstetrics-and-gynaecology",
    degree: "MS",
    name: "MS Obstetrics and Gynaecology",
    department: "Obstetrics & Gynaecology",
    summary:
      "Complete prenatal and postnatal care, a modern delivery room, painless delivery, high-end laparoscopic surgery and HDU facilities.",
    about: [
      "The Department of Obstetrics & Gynaecology provides complete prenatal and postnatal care, with a modern delivery room and painless-delivery services.",
      "High-end laparoscopic gynaecological surgery and a High Dependency Unit (HDU) for mothers who need closer monitoring give residents a broad obstetric and surgical experience.",
    ],
    facilities: [
      "Complete prenatal and postnatal care",
      "Modern delivery room",
      "Painless delivery",
      "High-end laparoscopic surgery",
      "High Dependency Unit (HDU)",
    ],
    badges: ["Maternal Care", "Painless Delivery", "Laparoscopy"],
  },
  {
    slug: "md-anesthesiology",
    degree: "MD",
    name: "MD Anesthesiology",
    department: "Anaesthesiology",
    summary:
      "Safe, modern anaesthesia and pain management across 11 modular theatres, with ultrasound-guided nerve blocks and critical care.",
    about: [
      "The Department of Anaesthesiology provides safe, modern anaesthesia, pain management and pre-operative care for all surgical procedures across the hospital's 11 modular operation theatres.",
      "Upgraded anaesthesia workstations, the latest monitoring devices, facilities for ultrasound-guided nerve blocks and critical care delivered by trained faculty form the core of residents' training.",
    ],
    facilities: [
      "11 modular operation theatres",
      "Upgraded anaesthesia workstations",
      "Latest monitoring devices",
      "Ultrasound-guided nerve blocks",
      "Critical care by trained faculty",
      "Pain management and pre-operative care",
    ],
    badges: ["11 Modular OTs", "Nerve Blocks", "Critical Care"],
  },
  {
    slug: "md-pathology",
    degree: "MD",
    name: "MD Pathology",
    department: "Pathology",
    summary:
      "Precision tissue, blood and cellular diagnostics that support accurate treatment plans, backed by 24/7 laboratory services.",
    about: [
      "The Department of Pathology delivers precision tissue, blood and cellular diagnostics that support accurate treatment plans across the hospital.",
      "The department is supported by 24/7 laboratory facilities and a well-equipped Central Research Laboratory for academic and research activities.",
    ],
    facilities: [
      "Tissue diagnostics (histopathology)",
      "Blood diagnostics (haematology)",
      "Cellular diagnostics (cytology)",
      "24/7 laboratory facilities",
      "Well-equipped Central Research Laboratory",
    ],
    badges: ["Precision Diagnostics", "24/7 Lab", "Research Lab"],
  },
  {
    slug: "md-biochemistry",
    degree: "MD",
    name: "MD Biochemistry",
    department: "Biochemistry",
    summary:
      "Advanced metabolic, hormonal and molecular laboratory testing with rapid turnaround times.",
    about: [
      "The Department of Biochemistry provides advanced metabolic, hormonal and molecular laboratory testing with rapid turnaround times.",
      "The department is supported by 24/7 laboratory facilities and a well-equipped Central Research Laboratory for academic and research activities.",
    ],
    facilities: [
      "Metabolic testing",
      "Hormonal assays",
      "Molecular laboratory testing",
      "Rapid turnaround times",
      "24/7 laboratory facilities",
      "Well-equipped Central Research Laboratory",
    ],
    badges: ["Metabolic & Hormonal", "Molecular Testing", "24/7 Lab"],
  },
];

export const pgPath = (slug: string) => `/academics/postgraduate/${slug}`;

const ADMISSIONS_OFFICE =
  "Admissions office (Dr. Achireddy): +91 90009 94842 / +91 80557 78999 · info@aims.ac.in · Beside MLRIT, Dundigal, Gandi Maisamma, Medchal–Malkajgiri District, Telangana 500043.";

const DEGREE_NAME = { MD: "Doctor of Medicine", MS: "Master of Surgery" } as const;

function programmePage(p: PgProgramme): StaticPageDef {
  return {
    eyebrow: `Postgraduate · ${p.degree}`,
    title: p.name,
    subtitle: p.summary,
    sections: [
      {
        title: `About the Department of ${p.department}`,
        badges: [p.degree, ...p.badges],
        content: p.about,
        layout: "full",
      },
      {
        title: "Facilities & Clinical Services",
        bullets: p.facilities,
        layout: "half",
      },
      {
        title: "Programme at a Glance",
        bullets: [
          `${p.degree} — ${DEGREE_NAME[p.degree]}, a three-year residency`,
          "Affiliated to Kaloji Narayana Rao University of Health Sciences",
          "Admission through NEET-PG and KNRUHS counselling",
          "Supervised dissertation submitted to the university",
        ],
        layout: "half",
      },
      ...(p.supportedBy
        ? [
            {
              title: "Supported by Tertiary Care",
              subtitle: "Super-speciality units residents work alongside",
              content: `${p.department} at AIMS is backed by the hospital's tertiary-care super-speciality services, available within the same hospital.`,
              badges: p.supportedBy,
              layout: "full" as const,
            },
          ]
        : []),
      {
        title: "Admission Enquiries",
        content:
          `For the current year's seat matrix, fee notification and counselling schedule for ${p.name}, contact the admissions office. ` +
          ADMISSIONS_OFFICE,
        layout: "full",
      },
    ],
    quickLinks: [
      { name: "All PG Programmes", path: "/academics/postgraduate" },
      ...PG_PROGRAMMES.filter((o) => o.slug !== p.slug).map((o) => ({ name: o.name, path: pgPath(o.slug) })),
    ],
    cta: {
      text: "Postgraduate admission follows NEET-PG and the counselling notifications issued by KNRUHS. Review the admission process and the documents required at verification before you apply.",
      label: "View Admission Criteria",
      path: "/admissions/criteria",
    },
  };
}

export const PG_PROGRAMME_PAGES: Record<string, StaticPageDef> = Object.fromEntries(
  PG_PROGRAMMES.map((p) => [pgPath(p.slug), programmePage(p)])
);
