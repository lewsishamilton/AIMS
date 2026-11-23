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
  degree: "MD" | "MS";
  /** Programme name as used in running text, e.g. "MD General Medicine". */
  programmeName: string;
  heroTitle: string;
  introHeading: string;
  intro: string[];
  highlights: { label: string; text: string }[];
  /** Three feature cards, coloured orange · white · teal left to right. */
  features: { title: string; text: string; icon: "clinical" | "research" | "community" | "skills" | "surgical" | "lab" }[];
  outcomes: string[];
  careers: string[];
  department: { name: string; text: string; path: string };
  /** Wrap words in **…** to highlight them. */
  admissionSteps: { title: string; detail: string }[];
  admissionNotes: { title: string; text: string }[];
  eligibility: string[];
  years: { label: string; title: string; points: string[] }[];
  related: { name: string; path: string; degree: "MD" | "MS"; summary: string }[];
  /** `map: true` shows a Google Map of the campus under the answer; wrap words in **…** to highlight them. */
  faqs: { q: string; a: string; map?: boolean; link?: { label: string; path: string } }[];
}

// ── Shared by every detailed programme page ──

export const admissionSteps = (programme: string) => [
  { title: "Qualify NEET-PG 2026", detail: "Score at or above the qualifying percentile for your category." },
  {
    title: "Register for KNRUHS Counselling",
    detail: `Register online and choose college code **AIMD** and ${programme} in your web options.`,
  },
  { title: "Seat Allotment", detail: "Convener quota seats are allotted by KNRUHS; Management and NRI seats as notified." },
  { title: "Report to AIMS", detail: "Bring your original documents for verification within the reporting window." },
  { title: "Admission Confirmed", detail: "Complete the admission formalities and begin your residency." },
];

export const ADMISSION_NOTES = [
  {
    title: "Note",
    text: "Counselling and seat allotment are conducted by KNRUHS for Convener quota seats; Management and NRI seats are filled as notified.",
  },
  {
    title: "Admissions Enquiry",
    text: "For the current seat matrix and reporting schedule, contact Dr. Ch. Achireddy: +91 90009 94842.",
  },
];

const ELIGIBILITY = [
  "MBBS degree from a medical college recognised by the National Medical Commission",
  "Completion of the compulsory rotating internship before the counselling cut-off date",
  "A valid NEET-PG score at the percentile prescribed for the candidate's category",
  "Permanent or provisional registration with a State Medical Council or the National Medical Commission",
  "Allotment through KNRUHS counselling for Convener quota seats, with Management and NRI seats filled as notified",
];

/** Every other MD / MS programme, so new programmes appear automatically. */
const relatedTo = (slug: string) =>
  PG_PROGRAMMES.filter((p) => p.slug !== slug).map((p) => ({
    name: p.name,
    path: pgPath(p.slug),
    degree: p.degree,
    summary: p.summary,
  }));

const FAQ_ADMISSION = {
  q: "How do I get admission?",
  a: "Qualify NEET-PG, then take part in KNRUHS counselling. Convener quota seats are allotted by KNRUHS; Management and NRI seats are filled as notified.",
};
const FAQ_CONTACT = {
  q: "Whom do I contact for admission queries?",
  a: `Call the admissions office — **${CONTACT.admissionsContact}**, ${CONTACT.admissionsPhone} — or email **${CONTACT.admissionsEmail}**. You can also send an online admissions enquiry from this page.`,
  link: { label: "Send an admissions enquiry", path: "/admissions/apply/enquire" },
};
const faqSession = (degree: "MD" | "MS") => ({
  q: "When does the academic session begin?",
  a: `The ${degree} session begins after NEET-PG counselling, on the schedule notified each year by the National Medical Commission and KNRUHS. Selected candidates are informed of the reporting dates by the admissions office.`,
});
const FAQ_REACH = {
  q: "How do I reach AIMS?",
  a: `AIMS is located ${CONTACT.address.replace(/^Beside/, "beside")}. College buses run on ${BUS_ROUTES.length} routes across Hyderabad, and the campus is on Google Maps below.`,
  map: true,
};

const FAQ_RESEARCH = {
  q: "Is research compulsory in this programme?",
  a: "Yes. As NMC regulations require, every resident completes a supervised thesis, which is submitted to the university before the final examination.",
};

const gm = PG_PROGRAMMES.find((p) => p.slug === "md-general-medicine")!;

export const PG_PROGRAMME_DETAILS: Record<string, PgProgrammeDetail> = {
  "md-general-medicine": {
    slug: "md-general-medicine",
    degree: "MD",
    programmeName: "MD General Medicine",
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
    admissionSteps: admissionSteps("MD General Medicine"),
    admissionNotes: ADMISSION_NOTES,
    eligibility: ELIGIBILITY,
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
    related: relatedTo("md-general-medicine"),
    faqs: [
      FAQ_ADMISSION,
      FAQ_CONTACT,
      faqSession("MD"),
      {
        q: "Is research compulsory in this programme?",
        a: "Yes. As NMC regulations require, every resident completes a supervised thesis, which is submitted to the university before the final examination.",
      },
      FAQ_REACH,
    ],
  },

  "md-dermatology": {
    slug: "md-dermatology",
    degree: "MD",
    programmeName: "MD Dermatology",
    heroTitle: "MD Dermatology, Venereology & Leprosy at AIMS, Hyderabad",
    introHeading: "Train to Treat Skin, Hair and Nail Disease — Medically, Surgically and Aesthetically",
    intro: [
      "The Doctor of Medicine (MD) in Dermatology, Venereology and Leprosy at Arundathi Institute of Medical Sciences (AIMS) is a three-year postgraduate programme regulated by the National Medical Commission and affiliated to Kaloji Narayana Rao University of Health Sciences. You learn to diagnose and manage diseases of the skin, hair and nails, sexually transmitted infections and leprosy, in patients of every age.",
      "Alongside clinical dermatology, you train in dermatosurgery and cosmetic procedures — chemical peeling, laser therapy and phototherapy — using the department's lasers, phototherapy units and high-end microscopes.",
    ],
    highlights: [
      { label: "NMC-Regulated Curriculum", text: "You follow the competency-based postgraduate curriculum prescribed by the National Medical Commission." },
      {
        label: "Daily Clinical Exposure",
        text: "Free registration, consultation and inpatient care bring a steady flow of patients to the outpatient clinic and wards every working day.",
      },
      {
        label: "Procedural and Aesthetic Training",
        text: "Learn dermatosurgery and minor surgical procedures, chemical peeling, laser therapy and advanced LED phototherapy.",
      },
      {
        label: "Complete Speciality Coverage",
        text: "Train across clinical dermatology, venereology, leprosy and disorders of hair and nails, with cross-referral to other departments when needed.",
      },
      {
        label: "Teaching and Research",
        text: "Teach MBBS students, take part in regular journal clubs, and complete a supervised thesis, supported by the Central Research Laboratory.",
      },
    ],
    features: [
      {
        title: "Clinical Training",
        icon: "clinical",
        text: "Manage common and complex skin, venereal and leprosy cases in the outpatient clinic and wards under faculty supervision.",
      },
      {
        title: "Specialised Skills",
        icon: "skills",
        text: "Gain hands-on experience in dermatosurgery, chemical peels, lasers, phototherapy and microscopy-based diagnosis.",
      },
      {
        title: "Research Projects",
        icon: "research",
        text: "Complete a supervised research project leading to a thesis, reviewed by the Institutional Ethics and Scientific Committees.",
      },
    ],
    outcomes: [
      "Diagnose and manage diseases of the skin, hair and nails, sexually transmitted infections and leprosy in patients of all ages",
      "Perform dermatosurgical, laser, phototherapy and aesthetic procedures safely and competently",
      "Use bedside and laboratory tests, including microscopy and skin biopsy, to reach an accurate diagnosis",
      "Recognise and manage dermatological emergencies and severe drug reactions",
      "Plan and carry out clinical research, teach students, and keep learning throughout a professional career",
    ],
    careers: [
      "Consultant dermatologist in hospitals, multi-speciality centres and skin clinics",
      "Teaching careers in medical colleges, beginning as Senior Resident, as per NMC norms",
      "Cosmetic and aesthetic dermatology, lasers and dermatosurgery practice",
      "Fellowships in areas such as dermatosurgery, dermatopathology, paediatric dermatology and trichology",
      "Specialist posts in government hospitals and national leprosy and STI control programmes",
    ],
    department: {
      name: "Department of Dermatology",
      text: "The Department of Dermatology, Venereology and Leprosy offers medical and cosmetic care for the skin, hair and nails, with lasers, phototherapy units, high-end microscopes and minor surgical procedures.",
      path: "/departments/dermatology",
    },
    admissionSteps: admissionSteps("MD Dermatology"),
    admissionNotes: ADMISSION_NOTES,
    eligibility: ELIGIBILITY,
    years: [
      {
        label: "Year 1",
        title: "Foundations",
        points: [
          "Basic sciences of the skin: structure, function and immunology",
          "Outpatient and ward postings under faculty supervision",
          "Clinical examination, bedside tests and skin biopsy",
          "Thesis topic selection and protocol approval",
        ],
      },
      {
        label: "Year 2",
        title: "Procedures and Specialities",
        points: [
          "Dermatosurgery, chemical peeling, lasers and phototherapy",
          "Venereology and leprosy clinics",
          "District Residency Programme posting, as required by NMC regulations",
          "Thesis data collection",
        ],
      },
      {
        label: "Year 3",
        title: "Senior Residency",
        points: [
          "Senior responsibility for the outpatient clinic and procedures",
          "Teaching undergraduate students during clinical postings",
          "Thesis submission to the university",
          "University examination: theory, clinical and viva voce",
        ],
      },
    ],
    related: relatedTo("md-dermatology"),
    faqs: [
      FAQ_ADMISSION,
      FAQ_CONTACT,
      faqSession("MD"),
      {
        q: "What areas does the training cover?",
        a: "Clinical dermatology, venereology (sexually transmitted infections), leprosy, disorders of hair and nails, dermatosurgery and cosmetic dermatology.",
      },
      {
        q: "Is procedural training part of the programme?",
        a: "Yes. Residents learn dermatosurgery and minor surgical procedures, chemical peeling, laser therapy and phototherapy under faculty supervision.",
      },
      {
        q: "Is research compulsory in this programme?",
        a: "Yes. As NMC regulations require, every resident completes a supervised thesis, which is submitted to the university before the final examination.",
      },
      FAQ_REACH,
    ],
  },
  // ── Remaining programmes; shared fields are filled in by the map at the end ──
  ...Object.fromEntries(
    [
      {
        slug: "ms-general-surgery",
        degree: "MS",
        programmeName: "MS General Surgery",
        heroTitle: "MS General Surgery at AIMS, Hyderabad",
        introHeading: "Learn to Operate in a Hospital With 11 Modular Theatres",
        intro: [
          "The Master of Surgery (MS) in General Surgery at Arundathi Institute of Medical Sciences (AIMS) is a three-year postgraduate programme regulated by the National Medical Commission and affiliated to Kaloji Narayana Rao University of Health Sciences. You learn to assess, operate on and care for surgical patients, from the emergency department to the operating theatre and the ward.",
          "You train across 11 modular operation theatres and a dedicated minimally invasive laparoscopic unit, working alongside the hospital's Neurosurgery, Urology and Surgical Gastroenterology teams.",
        ],
        highlights: [
          { label: "NMC-Regulated Curriculum", text: "You follow the competency-based postgraduate curriculum prescribed by the National Medical Commission." },
          { label: "11 Modular Operation Theatres", text: "Assist and operate in modern theatres, with graded responsibility from your first year." },
          { label: "Laparoscopic Surgery", text: "Train in a dedicated minimally invasive laparoscopic unit, alongside open surgery." },
          { label: "Super-Speciality Support", text: "Work with Neurosurgery, Urology and Surgical Gastroenterology in the same hospital, with rapid-recovery protocols after surgery." },
          { label: "Teaching and Research", text: "Teach MBBS students and complete a supervised thesis, supported by the Central Research Laboratory." },
        ],
        features: [
          { title: "Clinical Training", icon: "clinical", text: "Manage surgical patients in the outpatient clinic, emergency and wards, from diagnosis to recovery, under consultant supervision." },
          { title: "Operative Skills", icon: "surgical", text: "Build operative skills step by step — assisting, then performing open and laparoscopic procedures under supervision." },
          { title: "Research Projects", icon: "research", text: "Complete a supervised research project leading to a thesis, reviewed by the Institutional Ethics and Scientific Committees." },
        ],
        outcomes: [
          "Assess and manage common and complex surgical conditions, in emergencies and planned care",
          "Perform common open and laparoscopic operations safely, with sound pre- and post-operative care",
          "Recognise and manage surgical emergencies and trauma, and resuscitate critically ill patients",
          "Choose and interpret investigations sensibly, and refer appropriately to super-speciality services",
          "Plan and carry out clinical research, teach students, and keep learning throughout a professional career",
        ],
        careers: [
          "Consultant general surgeon in hospitals and multi-speciality centres",
          "Teaching careers in medical colleges, beginning as Senior Resident, as per NMC norms",
          "Laparoscopic and minimally invasive surgery practice",
          "Super-speciality (MCh) training in Surgical Gastroenterology, Urology, Neurosurgery, Plastic Surgery and more, through NEET-SS",
          "Specialist surgeon posts in government hospitals and health services",
        ],
        department: { name: "Department of General Surgery", text: "General Surgery at AIMS works from 11 modular operation theatres and a minimally invasive laparoscopic unit.", path: "/departments/general-surgery" },
        years: [
          { label: "Year 1", title: "Foundations", points: ["Applied anatomy, physiology and pathology for surgery", "Ward, outpatient and emergency postings", "Assisting in theatre and basic surgical skills", "Thesis topic selection and protocol approval"] },
          { label: "Year 2", title: "Operative Responsibility", points: ["Performing common procedures under supervision", "Laparoscopic skills and super-speciality postings", "District Residency Programme posting, as required by NMC regulations", "Thesis data collection"] },
          { label: "Year 3", title: "Senior Residency", points: ["Senior responsibility for wards, emergencies and theatre lists", "Teaching undergraduate students during clinical postings", "Thesis submission to the university", "University examination: theory, clinical and viva voce"] },
        ],
        faqs: [
          { q: "Will I get hands-on operating experience?", a: "Yes. Residents assist from the first year and, with graded responsibility, perform common open and laparoscopic operations under supervision." },
          { q: "Is laparoscopic surgery part of the training?", a: "Yes. AIMS has a dedicated minimally invasive laparoscopic unit, and residents train in laparoscopic as well as open surgery." },
        ],
      },
      {
        slug: "ms-orthopedics",
        degree: "MS",
        programmeName: "MS Orthopedics",
        heroTitle: "MS Orthopaedics at AIMS, Hyderabad",
        introHeading: "Train to Restore Movement — From Fractures to Joint Replacement",
        intro: [
          "The Master of Surgery (MS) in Orthopaedics at Arundathi Institute of Medical Sciences (AIMS) is a three-year postgraduate programme regulated by the National Medical Commission and affiliated to Kaloji Narayana Rao University of Health Sciences. You learn to diagnose and treat injuries and disorders of the bones, joints and spine.",
          "You train in fracture and trauma care, joint replacement, spine care and sports-injury management, with the hospital's Neurosurgery and Faciomaxillary Surgery teams supporting complex trauma and spine cases.",
        ],
        highlights: [
          { label: "NMC-Regulated Curriculum", text: "You follow the competency-based postgraduate curriculum prescribed by the National Medical Commission." },
          { label: "Trauma and Fracture Care", text: "Manage fractures and injuries from the emergency department to definitive fixation and rehabilitation." },
          { label: "Joint Replacement", text: "Take part in joint replacement surgery, with pre-operative planning and post-operative care." },
          { label: "Spine and Sports Injuries", text: "Gain exposure to spine care and sports-injury management, supported by Neurosurgery and Faciomaxillary Surgery." },
          { label: "Teaching and Research", text: "Teach MBBS students and complete a supervised thesis, supported by the Central Research Laboratory." },
        ],
        features: [
          { title: "Clinical Training", icon: "clinical", text: "Manage orthopaedic patients in the outpatient clinic, emergency and wards under consultant supervision." },
          { title: "Operative Skills", icon: "surgical", text: "Learn fracture fixation, joint replacement and other orthopaedic procedures, from assisting to operating under supervision." },
          { title: "Research Projects", icon: "research", text: "Complete a supervised research project leading to a thesis, reviewed by the Institutional Ethics and Scientific Committees." },
        ],
        outcomes: [
          "Diagnose and manage injuries and disorders of the bones, joints and spine in patients of all ages",
          "Manage fractures and orthopaedic emergencies, including polytrauma, safely and promptly",
          "Perform common orthopaedic operations, including fracture fixation, under supervision and then independently",
          "Plan rehabilitation with physiotherapy and other teams to restore function",
          "Plan and carry out clinical research, teach students, and keep learning throughout a professional career",
        ],
        careers: [
          "Consultant orthopaedic surgeon in hospitals and trauma centres",
          "Teaching careers in medical colleges, beginning as Senior Resident, as per NMC norms",
          "Joint replacement, arthroscopy and sports medicine practice",
          "Fellowships in areas such as arthroplasty, spine surgery, arthroscopy and paediatric orthopaedics",
          "Specialist orthopaedic posts in government hospitals and health services",
        ],
        department: { name: "Department of Orthopaedics", text: "Orthopaedics at AIMS covers bone, joint, spine and sports-injury care.", path: "/departments/orthopaedics" },
        years: [
          { label: "Year 1", title: "Foundations", points: ["Applied anatomy and biomechanics", "Emergency, ward and outpatient postings", "Plaster, traction and basic fracture management", "Thesis topic selection and protocol approval"] },
          { label: "Year 2", title: "Operative Responsibility", points: ["Fracture fixation and trauma surgery under supervision", "Joint replacement and spine exposure", "District Residency Programme posting, as required by NMC regulations", "Thesis data collection"] },
          { label: "Year 3", title: "Senior Residency", points: ["Senior responsibility for trauma and theatre lists", "Teaching undergraduate students during clinical postings", "Thesis submission to the university", "University examination: theory, clinical and viva voce"] },
        ],
        faqs: [
          { q: "What areas does the training cover?", a: "Trauma and fracture care, joint replacement, spine care, sports injuries and rehabilitation, with support from Neurosurgery and Faciomaxillary Surgery." },
          { q: "Will I get operating experience?", a: "Yes. Residents assist from the first year and, with graded responsibility, perform common orthopaedic operations under supervision." },
        ],
      },
      {
        slug: "md-paediatrics",
        degree: "MD",
        programmeName: "MD Paediatrics",
        heroTitle: "MD Paediatrics at AIMS, Hyderabad",
        introHeading: "Train to Care for Children — From Newborns to Adolescents",
        intro: [
          "The Doctor of Medicine (MD) in Paediatrics at Arundathi Institute of Medical Sciences (AIMS) is a three-year postgraduate programme regulated by the National Medical Commission and affiliated to Kaloji Narayana Rao University of Health Sciences. You learn to care for infants, children and adolescents in health and illness.",
          "You train in the hospital's Neonatal and Paediatric Intensive Care Units, and in immunisation, growth and development clinics, building confidence in both preventive and critical care.",
        ],
        highlights: [
          { label: "NMC-Regulated Curriculum", text: "You follow the competency-based postgraduate curriculum prescribed by the National Medical Commission." },
          { label: "NICU and PICU", text: "Gain hands-on experience in neonatal and paediatric critical care in the hospital's intensive care units." },
          { label: "Preventive Paediatrics", text: "Run immunisation and growth-and-development clinics, following children from birth through adolescence." },
          { label: "Free Care, Steady Caseload", text: "Free consultation and inpatient care bring a wide variety of children's illnesses to the wards and clinics." },
          { label: "Teaching and Research", text: "Teach MBBS students and complete a supervised thesis, supported by the Central Research Laboratory." },
        ],
        features: [
          { title: "Clinical Training", icon: "clinical", text: "Care for children in the outpatient clinic, wards and emergency, with graded responsibility under consultant supervision." },
          { title: "Newborn and Critical Care", icon: "skills", text: "Learn newborn resuscitation and neonatal and paediatric intensive care in the NICU and PICU." },
          { title: "Research Projects", icon: "research", text: "Complete a supervised research project leading to a thesis, reviewed by the Institutional Ethics and Scientific Committees." },
        ],
        outcomes: [
          "Diagnose and manage common and complex illnesses in newborns, infants, children and adolescents",
          "Resuscitate newborns and manage paediatric emergencies and critically ill children",
          "Monitor growth and development, and deliver immunisation and preventive care",
          "Counsel parents clearly and compassionately, and practise ethically",
          "Plan and carry out clinical research, teach students, and keep learning throughout a professional career",
        ],
        careers: [
          "Consultant paediatrician in hospitals, children's hospitals and clinics",
          "Teaching careers in medical colleges, beginning as Senior Resident, as per NMC norms",
          "Neonatal and paediatric intensive care practice",
          "Super-speciality (DM) training in Neonatology, Paediatric Cardiology, Paediatric Nephrology and more, through NEET-SS",
          "Specialist posts in government hospitals and child health programmes",
        ],
        department: { name: "Department of Paediatrics", text: "Paediatrics at AIMS cares for infants, children and adolescents, with NICU and PICU support.", path: "/departments/paediatrics" },
        years: [
          { label: "Year 1", title: "Foundations", points: ["Growth, development and nutrition", "Ward, outpatient and newborn postings", "Paediatric examination and core procedures", "Thesis topic selection and protocol approval"] },
          { label: "Year 2", title: "Critical Care", points: ["NICU and PICU postings with graded responsibility", "Immunisation and developmental clinics", "District Residency Programme posting, as required by NMC regulations", "Thesis data collection"] },
          { label: "Year 3", title: "Senior Residency", points: ["Senior responsibility for wards and intensive care", "Teaching undergraduate students during clinical postings", "Thesis submission to the university", "University examination: theory, clinical and viva voce"] },
        ],
        faqs: [
          { q: "Does the training include neonatal care?", a: "Yes. Residents work in the hospital's Neonatal Intensive Care Unit and learn newborn resuscitation and neonatal critical care." },
          { q: "Is paediatric intensive care part of the programme?", a: "Yes. Residents are posted to the Paediatric Intensive Care Unit, with graded responsibility for critically ill children." },
        ],
      },
      {
        slug: "ms-ophthalmology",
        degree: "MS",
        programmeName: "MS Ophthalmology",
        heroTitle: "MS Ophthalmology at AIMS, Hyderabad",
        introHeading: "Train to Protect and Restore Sight",
        intro: [
          "The Master of Surgery (MS) in Ophthalmology at Arundathi Institute of Medical Sciences (AIMS) is a three-year postgraduate programme regulated by the National Medical Commission and affiliated to Kaloji Narayana Rao University of Health Sciences. You learn to diagnose and treat diseases of the eye, medically and surgically.",
          "You train in complete vision care — from routine eye examination to cataract surgery, including phacoemulsification — using the department's advanced eye diagnostics.",
        ],
        highlights: [
          { label: "NMC-Regulated Curriculum", text: "You follow the competency-based postgraduate curriculum prescribed by the National Medical Commission." },
          { label: "Cataract and Phaco Surgery", text: "Train in cataract surgery, including phacoemulsification, with graded surgical responsibility." },
          { label: "Advanced Eye Diagnostics", text: "Learn to use and interpret modern diagnostic equipment for the front and back of the eye." },
          { label: "Complete Vision Care", text: "See patients of all ages in the outpatient clinic, from refraction to complex eye disease." },
          { label: "Teaching and Research", text: "Teach MBBS students and complete a supervised thesis, supported by the Central Research Laboratory." },
        ],
        features: [
          { title: "Clinical Training", icon: "clinical", text: "Examine and manage eye patients in the outpatient clinic, wards and emergency under consultant supervision." },
          { title: "Surgical Skills", icon: "surgical", text: "Learn cataract surgery and phacoemulsification step by step, from wet-lab practice to operating under supervision." },
          { title: "Research Projects", icon: "research", text: "Complete a supervised research project leading to a thesis, reviewed by the Institutional Ethics and Scientific Committees." },
        ],
        outcomes: [
          "Diagnose and manage common and complex eye diseases in patients of all ages",
          "Perform cataract surgery, including phacoemulsification, and other common eye operations safely",
          "Use eye diagnostic equipment and interpret the results accurately",
          "Manage eye emergencies and injuries promptly",
          "Plan and carry out clinical research, teach students, and keep learning throughout a professional career",
        ],
        careers: [
          "Consultant ophthalmologist in hospitals and eye-care centres",
          "Teaching careers in medical colleges, beginning as Senior Resident, as per NMC norms",
          "Cataract and refractive surgery practice",
          "Fellowships in areas such as cornea, retina, glaucoma and paediatric ophthalmology",
          "Specialist posts in government hospitals and the national programme for control of blindness",
        ],
        department: { name: "Department of Ophthalmology", text: "Ophthalmology at AIMS provides complete vision care, cataract and phaco surgery, and advanced eye diagnostics.", path: "/departments/ophthalmology" },
        years: [
          { label: "Year 1", title: "Foundations", points: ["Anatomy, physiology and optics of the eye", "Outpatient postings and refraction", "Eye examination and diagnostic tests", "Thesis topic selection and protocol approval"] },
          { label: "Year 2", title: "Surgical Responsibility", points: ["Cataract surgery under supervision", "Speciality clinics and diagnostics", "District Residency Programme posting, as required by NMC regulations", "Thesis data collection"] },
          { label: "Year 3", title: "Senior Residency", points: ["Phacoemulsification and independent surgical lists", "Teaching undergraduate students during clinical postings", "Thesis submission to the university", "University examination: theory, clinical and viva voce"] },
        ],
        faqs: [
          { q: "Will I learn phacoemulsification?", a: "Yes. Residents train in cataract surgery, including phacoemulsification, with graded surgical responsibility." },
          { q: "What diagnostic training is included?", a: "Residents learn to use and interpret the department's advanced eye diagnostic equipment as part of daily clinical work." },
        ],
      },
      {
        slug: "ms-obstetrics-and-gynaecology",
        degree: "MS",
        programmeName: "MS Obstetrics and Gynaecology",
        heroTitle: "MS Obstetrics & Gynaecology at AIMS, Hyderabad",
        introHeading: "Train to Care for Women and Mothers — Safely, at Every Stage",
        intro: [
          "The Master of Surgery (MS) in Obstetrics and Gynaecology at Arundathi Institute of Medical Sciences (AIMS) is a three-year postgraduate programme regulated by the National Medical Commission and affiliated to Kaloji Narayana Rao University of Health Sciences. You learn to care for women through pregnancy, childbirth and gynaecological illness.",
          "You train in complete prenatal and postnatal care, a modern delivery room with painless-delivery services, high-end laparoscopic gynaecological surgery, and a High Dependency Unit for mothers who need closer monitoring.",
        ],
        highlights: [
          { label: "NMC-Regulated Curriculum", text: "You follow the competency-based postgraduate curriculum prescribed by the National Medical Commission." },
          { label: "Modern Delivery Room", text: "Manage labour and childbirth in a modern delivery room, with painless-delivery services." },
          { label: "Laparoscopic Surgery", text: "Train in high-end laparoscopic gynaecological surgery as well as open procedures." },
          { label: "High Dependency Unit", text: "Care for high-risk mothers in the HDU, with close monitoring before and after delivery." },
          { label: "Teaching and Research", text: "Teach MBBS students and complete a supervised thesis, supported by the Central Research Laboratory." },
        ],
        features: [
          { title: "Clinical Training", icon: "clinical", text: "Care for women in antenatal clinics, the labour room, wards and emergency under consultant supervision." },
          { title: "Surgical Skills", icon: "surgical", text: "Learn caesarean section, gynaecological surgery and laparoscopy, from assisting to operating under supervision." },
          { title: "Research Projects", icon: "research", text: "Complete a supervised research project leading to a thesis, reviewed by the Institutional Ethics and Scientific Committees." },
        ],
        outcomes: [
          "Provide antenatal, intrapartum and postnatal care, and conduct normal and assisted deliveries",
          "Recognise and manage obstetric emergencies and high-risk pregnancies",
          "Diagnose and manage gynaecological conditions, and perform common open and laparoscopic operations",
          "Counsel women on family planning and reproductive health, and practise ethically",
          "Plan and carry out clinical research, teach students, and keep learning throughout a professional career",
        ],
        careers: [
          "Consultant obstetrician and gynaecologist in hospitals and maternity centres",
          "Teaching careers in medical colleges, beginning as Senior Resident, as per NMC norms",
          "High-risk pregnancy and laparoscopic gynaecology practice",
          "Super-speciality and fellowship training in Reproductive Medicine, Gynaecological Oncology and Fetal Medicine",
          "Specialist posts in government hospitals and maternal health programmes",
        ],
        department: { name: "Department of Obstetrics & Gynaecology", text: "Obstetrics & Gynaecology at AIMS provides prenatal and postnatal care, painless delivery, laparoscopic surgery and an HDU.", path: "/departments/obstetrics-gynaecology" },
        years: [
          { label: "Year 1", title: "Foundations", points: ["Applied anatomy and physiology of pregnancy", "Antenatal clinic, labour room and ward postings", "Normal deliveries and basic procedures", "Thesis topic selection and protocol approval"] },
          { label: "Year 2", title: "Operative Responsibility", points: ["Caesarean sections and gynaecological surgery under supervision", "High-risk pregnancy care and HDU postings", "District Residency Programme posting, as required by NMC regulations", "Thesis data collection"] },
          { label: "Year 3", title: "Senior Residency", points: ["Senior responsibility for the labour room and theatre lists", "Teaching undergraduate students during clinical postings", "Thesis submission to the university", "University examination: theory, clinical and viva voce"] },
        ],
        faqs: [
          { q: "Does the training include laparoscopic surgery?", a: "Yes. Residents train in high-end laparoscopic gynaecological surgery as well as open procedures and caesarean sections." },
          { q: "Will I manage high-risk pregnancies?", a: "Yes. Residents care for high-risk mothers in the labour room and the High Dependency Unit, under consultant supervision." },
        ],
      },
      {
        slug: "md-anesthesiology",
        degree: "MD",
        programmeName: "MD Anesthesiology",
        heroTitle: "MD Anaesthesiology at AIMS, Hyderabad",
        introHeading: "Train to Keep Patients Safe — In Theatre, in Pain and in Critical Care",
        intro: [
          "The Doctor of Medicine (MD) in Anaesthesiology at Arundathi Institute of Medical Sciences (AIMS) is a three-year postgraduate programme regulated by the National Medical Commission and affiliated to Kaloji Narayana Rao University of Health Sciences. You learn to give safe anaesthesia, relieve pain and care for critically ill patients.",
          "You train across the hospital's 11 modular operation theatres, with upgraded anaesthesia workstations, the latest monitoring devices and ultrasound-guided nerve blocks, and in critical care alongside trained faculty.",
        ],
        highlights: [
          { label: "NMC-Regulated Curriculum", text: "You follow the competency-based postgraduate curriculum prescribed by the National Medical Commission." },
          { label: "11 Modular Theatres", text: "Give anaesthesia for every surgical speciality, with upgraded workstations and the latest monitoring devices." },
          { label: "Ultrasound-Guided Nerve Blocks", text: "Learn regional anaesthesia and ultrasound-guided nerve blocks for surgery and pain relief." },
          { label: "Critical Care and Pain", text: "Train in critical care, pain management and pre-operative assessment with trained faculty." },
          { label: "Teaching and Research", text: "Teach MBBS students and complete a supervised thesis, supported by the Central Research Laboratory." },
        ],
        features: [
          { title: "Clinical Training", icon: "clinical", text: "Assess patients before surgery, give anaesthesia and manage recovery, with graded independence under supervision." },
          { title: "Specialised Skills", icon: "skills", text: "Master airway management, regional anaesthesia, ultrasound-guided blocks and critical-care procedures." },
          { title: "Research Projects", icon: "research", text: "Complete a supervised research project leading to a thesis, reviewed by the Institutional Ethics and Scientific Committees." },
        ],
        outcomes: [
          "Assess and prepare patients for surgery, and plan safe anaesthesia for every surgical speciality",
          "Give general and regional anaesthesia, including ultrasound-guided nerve blocks, safely",
          "Manage the airway, resuscitate patients and care for the critically ill",
          "Relieve acute and chronic pain using medical and interventional methods",
          "Plan and carry out clinical research, teach students, and keep learning throughout a professional career",
        ],
        careers: [
          "Consultant anaesthesiologist in hospitals and surgical centres",
          "Teaching careers in medical colleges, beginning as Senior Resident, as per NMC norms",
          "Critical care and intensive care medicine practice",
          "Super-speciality (DM) training in Cardiac Anaesthesia, Neuroanaesthesia, Critical Care and more, through NEET-SS",
          "Pain medicine practice and specialist posts in government hospitals",
        ],
        department: { name: "Department of Anaesthesiology", text: "Anaesthesiology at AIMS provides anaesthesia, pain management and critical care across 11 modular theatres.", path: "/departments/anaesthesiology" },
        years: [
          { label: "Year 1", title: "Foundations", points: ["Applied physiology and pharmacology", "Pre-operative assessment and basic anaesthesia", "Airway management and monitoring", "Thesis topic selection and protocol approval"] },
          { label: "Year 2", title: "Speciality Anaesthesia", points: ["Regional anaesthesia and nerve blocks", "Speciality theatres and critical care postings", "District Residency Programme posting, as required by NMC regulations", "Thesis data collection"] },
          { label: "Year 3", title: "Senior Residency", points: ["Independent theatre lists under supervision", "Teaching undergraduate students", "Thesis submission to the university", "University examination: theory, clinical and viva voce"] },
        ],
        faqs: [
          { q: "Will I learn ultrasound-guided nerve blocks?", a: "Yes. AIMS has facilities for ultrasound-guided nerve blocks, and residents train in regional anaesthesia as part of the programme." },
          { q: "Is critical care part of the training?", a: "Yes. Residents are posted to critical care and learn to manage critically ill patients with trained faculty." },
        ],
      },
      {
        slug: "md-pathology",
        degree: "MD",
        programmeName: "MD Pathology",
        heroTitle: "MD Pathology at AIMS, Hyderabad",
        introHeading: "Train to Make the Diagnosis That Guides Every Treatment",
        intro: [
          "The Doctor of Medicine (MD) in Pathology at Arundathi Institute of Medical Sciences (AIMS) is a three-year postgraduate programme regulated by the National Medical Commission and affiliated to Kaloji Narayana Rao University of Health Sciences. You learn to diagnose disease from tissue, blood and cells.",
          "You train in histopathology, haematology and cytology in laboratories that run 24/7, supported by a well-equipped Central Research Laboratory.",
        ],
        highlights: [
          { label: "NMC-Regulated Curriculum", text: "You follow the competency-based postgraduate curriculum prescribed by the National Medical Commission." },
          { label: "Tissue, Blood and Cell Diagnostics", text: "Report histopathology, haematology and cytology specimens from across the hospital." },
          { label: "24/7 Laboratory", text: "Work in laboratories that run round the clock, supporting emergency and inpatient care." },
          { label: "Central Research Laboratory", text: "Use a well-equipped Central Research Laboratory for academic and research work." },
          { label: "Teaching and Research", text: "Teach MBBS students and complete a supervised thesis under faculty guidance." },
        ],
        features: [
          { title: "Diagnostic Training", icon: "lab", text: "Examine and report tissue, blood and cell specimens, with graded responsibility under faculty supervision." },
          { title: "Laboratory Skills", icon: "skills", text: "Learn specimen processing, special stains, haematology techniques, fine-needle aspiration and laboratory quality control." },
          { title: "Research Projects", icon: "research", text: "Complete a supervised research project leading to a thesis, reviewed by the Institutional Ethics and Scientific Committees." },
        ],
        outcomes: [
          "Diagnose disease accurately from tissue, blood and cell specimens",
          "Perform and interpret haematology, cytology and fine-needle aspiration procedures",
          "Run laboratory quality control and safe blood transfusion practice",
          "Work with clinicians to guide diagnosis and treatment",
          "Plan and carry out research, teach students, and keep learning throughout a professional career",
        ],
        careers: [
          "Consultant pathologist in hospitals and diagnostic laboratories",
          "Teaching careers in medical colleges, beginning as Senior Resident, as per NMC norms",
          "Blood bank and transfusion medicine practice",
          "Fellowships in areas such as haematopathology, cytopathology and oncopathology",
          "Laboratory direction, quality management and research roles",
        ],
        department: { name: "Department of Pathology", text: "Pathology at AIMS delivers tissue, blood and cellular diagnostics with 24/7 laboratory services.", path: "/departments/pathology" },
        years: [
          { label: "Year 1", title: "Foundations", points: ["General and systemic pathology", "Specimen processing and routine techniques", "Haematology and clinical pathology", "Thesis topic selection and protocol approval"] },
          { label: "Year 2", title: "Diagnostic Responsibility", points: ["Histopathology and cytology reporting under supervision", "Blood bank and transfusion postings", "District Residency Programme posting, as required by NMC regulations", "Thesis data collection"] },
          { label: "Year 3", title: "Senior Residency", points: ["Independent reporting with faculty review", "Teaching undergraduate students", "Thesis submission to the university", "University examination: theory, practical and viva voce"] },
        ],
        faqs: [
          { q: "What areas does the training cover?", a: "Histopathology, haematology, cytology, clinical pathology and blood banking, in laboratories that run 24/7." },
          { q: "Are research facilities available?", a: "Yes. Residents have access to a well-equipped Central Research Laboratory for academic and research work." },
        ],
      },
      {
        slug: "md-biochemistry",
        degree: "MD",
        programmeName: "MD Biochemistry",
        heroTitle: "MD Biochemistry at AIMS, Hyderabad",
        introHeading: "Train in the Science Behind Every Laboratory Result",
        intro: [
          "The Doctor of Medicine (MD) in Biochemistry at Arundathi Institute of Medical Sciences (AIMS) is a three-year postgraduate programme regulated by the National Medical Commission and affiliated to Kaloji Narayana Rao University of Health Sciences. You learn the biochemical basis of health and disease, and how laboratory testing supports diagnosis.",
          "You train in metabolic, hormonal and molecular testing with rapid turnaround times, in a laboratory that runs 24/7, supported by a well-equipped Central Research Laboratory.",
        ],
        highlights: [
          { label: "NMC-Regulated Curriculum", text: "You follow the competency-based postgraduate curriculum prescribed by the National Medical Commission." },
          { label: "Metabolic and Hormonal Testing", text: "Run and interpret metabolic and hormonal assays for patients across the hospital." },
          { label: "Molecular Diagnostics", text: "Learn molecular laboratory techniques used in modern diagnosis." },
          { label: "24/7 Laboratory", text: "Work in a laboratory that runs round the clock, with rapid turnaround of results." },
          { label: "Teaching and Research", text: "Teach MBBS students and complete a supervised thesis, supported by the Central Research Laboratory." },
        ],
        features: [
          { title: "Laboratory Training", icon: "lab", text: "Perform, validate and report clinical biochemistry tests, with graded responsibility under faculty supervision." },
          { title: "Specialised Skills", icon: "skills", text: "Learn automated analysers, hormonal and molecular assays, and laboratory quality control." },
          { title: "Research Projects", icon: "research", text: "Complete a supervised research project leading to a thesis, reviewed by the Institutional Ethics and Scientific Committees." },
        ],
        outcomes: [
          "Explain the biochemical basis of health and disease",
          "Perform, validate and interpret clinical biochemistry, hormonal and molecular tests",
          "Run laboratory quality control and manage a clinical laboratory",
          "Advise clinicians on choosing and interpreting laboratory tests",
          "Plan and carry out research, teach students, and keep learning throughout a professional career",
        ],
        careers: [
          "Teaching careers in medical colleges, beginning as Senior Resident, as per NMC norms",
          "Clinical biochemist in hospital and diagnostic laboratories",
          "Laboratory direction and quality management roles",
          "Research careers in medical, molecular and biotechnology research",
          "Specialist posts in government hospitals and public health laboratories",
        ],
        department: { name: "Department of Biochemistry", text: "Biochemistry at AIMS provides metabolic, hormonal and molecular testing with rapid turnaround times.", path: "/departments/biochemistry" },
        years: [
          { label: "Year 1", title: "Foundations", points: ["Biomolecules, metabolism and enzymology", "Laboratory techniques and instrumentation", "Clinical biochemistry postings", "Thesis topic selection and protocol approval"] },
          { label: "Year 2", title: "Laboratory Responsibility", points: ["Hormonal and molecular assays", "Quality control and laboratory management", "District Residency Programme posting, as required by NMC regulations", "Thesis data collection"] },
          { label: "Year 3", title: "Senior Residency", points: ["Validating and reporting results with faculty review", "Teaching undergraduate students", "Thesis submission to the university", "University examination: theory, practical and viva voce"] },
        ],
        faqs: [
          { q: "What laboratory work does the training include?", a: "Metabolic, hormonal and molecular testing, automated analysers and laboratory quality control, in a laboratory that runs 24/7." },
          { q: "Are research facilities available?", a: "Yes. Residents have access to a well-equipped Central Research Laboratory for academic and research work." },
        ],
      },
    ].map((p) => [
      p.slug,
      {
        ...p,
        degree: p.degree as "MD" | "MS",
        features: p.features as PgProgrammeDetail["features"],
        admissionSteps: admissionSteps(p.programmeName),
        admissionNotes: ADMISSION_NOTES,
        eligibility: ELIGIBILITY,
        related: relatedTo(p.slug),
        faqs: [FAQ_ADMISSION, FAQ_CONTACT, faqSession(p.degree as "MD" | "MS"), ...p.faqs, FAQ_RESEARCH, FAQ_REACH],
      } satisfies PgProgrammeDetail,
    ])
  ),
};
