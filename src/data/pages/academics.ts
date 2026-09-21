import type { StaticPageDef } from "../../components/StaticPage";

const ACADEMIC_LINKS = [
  { name: "MBBS", path: "/academics/mbbs" },
  { name: "Nursing & Allied Health", path: "/academics/nursing-allied-health" },
  { name: "Paramedical Diplomas", path: "/academics/paramedical-diplomas" },
  { name: "Academic Calendar", path: "/academics/calendar" },
  { name: "Research & Publications", path: "/academics/research" },
  { name: "Departments", path: "/departments" },
];

const linksExcept = (path: string) =>
  ACADEMIC_LINKS.filter((l) => l.path !== path);

export const ACADEMIC_PAGES: Record<string, StaticPageDef> = {
  "/academics/mbbs": {
    eyebrow: "Programs Offered",
    title: "Bachelor of Medicine & Bachelor of Surgery (MBBS)",
    subtitle:
      "A 4½-year programme followed by one year of compulsory rotating internship, with an annual intake of 150 students. Recognised by the National Medical Commission and affiliated to Kaloji Narayana Rao University of Health Sciences, Warangal.",
    sections: [
      {
        title: "Programme Overview",
        badges: ["150 Seats", "NMC Recognised", "KNRUHS Affiliated"],
        content: [
          "The undergraduate medical programme at Arundathi Institute of Medical Sciences spans four and a half years, organised as nine semesters of six months each, and is completed with one year of compulsory rotating internship.",
          "Teaching follows the competency-based medical education curriculum prescribed by the National Medical Commission, combining structured lectures, small-group tutorials, practical and clinical postings, skill-lab training and early clinical exposure at the attached Marri Arundhathi Multi-Specialty Hospital.",
        ],
        layout: "full",
      },
      {
        title: "Phase I — Pre-Clinical",
        subtitle: "Semesters 1–2",
        content:
          "Human Anatomy, Physiology including Bio-Physics, Biochemistry, and an introduction to Community Medicine including Humanities.",
        badges: ["Anatomy", "Physiology", "Biochemistry"],
        layout: "half",
      },
      {
        title: "Phase II — Para-Clinical",
        subtitle: "Semesters 3–5",
        content:
          "Pathology, Pharmacology, Microbiology, Forensic Medicine including Toxicology, and part of Community Medicine, alongside the first clinical postings.",
        badges: ["Pathology", "Pharmacology", "Microbiology", "Forensic Medicine"],
        layout: "half",
      },
      {
        title: "Phase III — Clinical",
        subtitle: "Semesters 6–9",
        content:
          "Medicine, Surgery and allied specialities including Paediatrics, Psychiatry, Dermatology, Orthopaedics, Anaesthesiology, Radio-Diagnosis, Ophthalmology, ENT, Obstetrics & Gynaecology and Community Medicine.",
        layout: "full",
      },
      {
        title: "Compulsory Rotating Internship",
        content:
          "One year of paid, full-time rotating internship across all major clinical departments, including a mandatory rural and community-medicine posting. The internship must be completed before the degree is awarded and registration with the State Medical Council is granted.",
        layout: "half",
      },
      {
        title: "Teaching & Clinical Learning",
        bullets: [
          "Early clinical exposure from the first professional year",
          "Skill laboratory with mannequin-based simulation training",
          "Departmental museums, laboratories and a central research lab",
          "Digital library access to journals and reference texts",
        ],
        layout: "half",
      },
      {
        title: "Eligibility at a Glance",
        bullets: [
          "Pass in Intermediate (10+2) with Physics, Chemistry, Biology or Biotechnology and English",
          "Minimum 50% in science subjects for OC, 45% for OC-PH and 40% for BC, SC and ST candidates",
          "A qualifying NEET-UG score at the prescribed percentile for the candidate's category",
          "Completion of 17 years of age on or before 31st December of the year of admission, as notified for the NEET-UG session",
        ],
        layout: "full",
      },
    ],
    quickLinks: linksExcept("/academics/mbbs"),
    cta: {
      text: "Admission to MBBS is through NEET-UG counselling conducted by KNRUHS for the Convener quota, and through the institute for Management and NRI categories.",
      label: "View Admission Criteria",
      path: "/admissions/criteria",
    },
  },

  "/academics/nursing-allied-health": {
    eyebrow: "Programs Offered",
    title: "Nursing & Allied Health Sciences",
    subtitle:
      "Degree programmes in nursing, laboratory technology and physiotherapy, taught alongside the medical school and using the same hospital, laboratories and library.",
    sections: [
      {
        title: "Learning Inside a Working Hospital",
        content:
          "Students in the nursing and allied health programmes train on the wards, in the operation theatres, in the central laboratory and in the physiotherapy unit of Marri Arundhathi Multi-Specialty Hospital. Clinical postings are supervised by the same consultants who teach the MBBS programme, and shared access to the skill lab, museums and digital library means allied health students learn beside medical undergraduates rather than apart from them.",
        layout: "full",
      },
    ],
    cardsTitle: "Degree Programmes",
    cardColumns: 3,
    cards: [
      {
        name: "B.Sc. Nursing",
        meta: "Undergraduate degree",
        description:
          "A professional nursing degree combining classroom instruction in nursing science with supervised clinical practice across medical, surgical, paediatric, obstetric and critical-care wards.",
        bullets: [
          "Ward, ICU, operation theatre and casualty postings",
          "Community health and outreach postings",
          "Approved for nursing programme operation by the competent authority",
        ],
      },
      {
        name: "B.Sc. Medical Laboratory Technology",
        meta: "Undergraduate degree",
        description:
          "Training in clinical laboratory science across haematology, clinical pathology, biochemistry, microbiology and blood banking, with hands-on work in the hospital central laboratory.",
        bullets: [
          "Sample collection, processing and quality control",
          "Automated analyser and microscopy training",
          "Blood bank and transfusion-medicine posting",
        ],
      },
      {
        name: "Bachelor of Physiotherapy",
        meta: "Undergraduate degree",
        description:
          "A programme in movement science and rehabilitation, with clinical training in orthopaedic, neurological, cardiorespiratory and post-operative physiotherapy.",
        bullets: [
          "Neuro-rehabilitation alongside the neurology unit",
          "Post-operative and sports-injury rehabilitation",
          "Electrotherapy and exercise-therapy practicals",
        ],
      },
    ],
    quickLinks: linksExcept("/academics/nursing-allied-health"),
    cta: {
      text: "Intake, eligibility and fee details for nursing and allied health programmes are confirmed each academic year. Speak to the admissions office on +91 80557 78999.",
      label: "Admissions Enquiry",
      path: "/admissions",
    },
  },

  "/academics/paramedical-diplomas": {
    eyebrow: "Programs Offered",
    title: "Paramedical Diplomas",
    subtitle:
      "Short, skill-focused diploma programmes that place students directly into the hospital units they are training for — the cath lab, the dialysis unit, the operation theatre, the imaging suite.",
    sections: [
      {
        title: "Trained Where the Work Happens",
        content:
          "Every paramedical diploma at AIMS is taught inside a functioning tertiary-care hospital. Diploma students rotate through the department they are being trained for from the first term, working under technicians and consultants on live equipment rather than on models, which is why these programmes feed directly into hospital, diagnostic-centre and imaging-chain employment.",
        layout: "full",
      },
    ],
    cardsTitle: "Diploma Programmes",
    cardColumns: 3,
    cards: [
      {
        name: "Medical Laboratory Technology",
        meta: "Central Laboratory",
        description:
          "Routine and specialised laboratory investigation, sample handling, analyser operation and reporting workflow across pathology, biochemistry and microbiology.",
      },
      {
        name: "Cath Lab Technician",
        meta: "Cardiology",
        description:
          "Assisting in the Philips cardiac catheterisation laboratory during angiography, angioplasty and pacemaker procedures, including equipment preparation and monitoring.",
      },
      {
        name: "Medical Sterilization Management & Operation Theatre Technician",
        meta: "Operation Theatres · CSSD",
        description:
          "Theatre preparation, sterile-supply management, instrument handling and intra-operative assistance across the general and super-speciality theatres.",
      },
      {
        name: "Dialysis Technician",
        meta: "Nephrology",
        description:
          "Operation and maintenance of haemodialysis machines, patient preparation, monitoring during dialysis, and support for bedside dialysis in intensive care.",
      },
      {
        name: "Ophthalmic Technician",
        meta: "Ophthalmology",
        description:
          "Refraction, visual-acuity assessment, ophthalmic investigations and assistance in eye-care outpatient clinics and ocular surgery.",
      },
      {
        name: "Anaesthesia Technician",
        meta: "Anaesthesiology",
        description:
          "Preparation and checking of anaesthesia workstations, monitoring equipment and airway devices, and assisting anaesthetists in theatre and critical care.",
      },
      {
        name: "Medical Imaging Technology",
        meta: "Radiology",
        description:
          "Cross-sectional and general imaging technique across MRI, CT, ultrasound and digital radiography, including patient positioning and radiation safety.",
      },
      {
        name: "Radiographic Assistant",
        meta: "Radiology",
        description:
          "General radiography practice, darkroom and digital workflow, portable bedside imaging, and support to the radiology department's daily patient load.",
      },
      {
        name: "Cardiology Technician",
        meta: "Cardiology",
        description:
          "ECG, treadmill testing, echocardiography assistance and cardiac monitoring in the outpatient clinic, wards and coronary care unit.",
      },
    ],
    quickLinks: linksExcept("/academics/paramedical-diplomas"),
    cta: {
      text: "Course duration, eligibility and intake for each diploma are confirmed at the start of the academic session. Call the admissions office on +91 80557 78999 for the current prospectus.",
      label: "Admissions Enquiry",
      path: "/admissions",
    },
  },

  "/academics/calendar": {
    eyebrow: "Academics",
    title: "Academic Calendar",
    subtitle:
      "The academic year at AIMS follows the schedule notified by the National Medical Commission and Kaloji Narayana Rao University of Health Sciences, Warangal.",
    sections: [
      {
        title: "How the Year Is Structured",
        content: [
          "The MBBS programme runs as nine semesters of six months each. Each semester carries a fixed pattern of theory teaching, practical and clinical postings, formative assessments and an end-of-term internal examination, followed by the university professional examination at the end of each phase.",
          "Teaching days, internal assessment dates and university examination schedules are notified by KNRUHS. The institute publishes the approved calendar for each batch on the notice board and through the learning management system at the start of the session.",
        ],
        layout: "full",
      },
      {
        title: "Recurring Academic Events",
        bullets: [
          "Commencement of session and orientation for the incoming batch",
          "Foundation course for first professional year students",
          "Internal assessment examinations each term",
          "University professional examinations notified by KNRUHS",
          "Supplementary examinations for eligible candidates",
          "Commencement of compulsory rotating internship",
        ],
        layout: "half",
      },
      {
        title: "Beyond the Curriculum",
        bullets: [
          "White coat ceremony for the incoming batch",
          "National Doctors' Day, Nurses' Day and World Health Day observances",
          "Continuing medical education programmes and guest lectures",
          "Sports meet, cultural festival and annual day",
          "Community outreach, screening and blood-donation camps",
        ],
        layout: "half",
      },
      {
        title: "Getting the Current Calendar",
        content:
          "The dated calendar for the running academic year is issued to students through the learning management system and the ERP portal, and is available from the office of the Dean. Prospective students and parents can request a copy from the administrative office.",
        layout: "full",
      },
    ],
    quickLinks: linksExcept("/academics/calendar"),
    cta: {
      text: "Current students can access the notified calendar, timetables and internal assessment schedules through the institute's learning management system.",
      label: "Contact the Academic Office",
      path: "/contact",
    },
  },

  "/academics/research": {
    eyebrow: "Academics",
    title: "Research & Publications",
    subtitle:
      "Departmental research at AIMS is run through the Central Research Laboratory and governed by the Institutional Ethics Committee and the Scientific Committee.",
    sections: [
      {
        title: "Research Culture",
        content: [
          "Research at Arundathi Institute of Medical Sciences is department-led. Faculty across the pre-clinical, para-clinical and clinical departments run projects that draw on the hospital's patient population, the central laboratory and the Central Research Laboratory, and undergraduate students are encouraged to take part through short-term projects.",
          "Every study involving human participants, patient records or biological samples is reviewed and approved by the Institutional Ethics Committee before it begins, and scientific merit is assessed by the Scientific Committee.",
        ],
        layout: "full",
      },
      {
        title: "Central Research Laboratory",
        content:
          "A shared, equipped research facility available to faculty and students across departments for project work, sample analysis and postgraduate-level investigation.",
        layout: "half",
      },
      {
        title: "Medical Education Unit",
        content:
          "The Medical Education Unit supports curriculum development, faculty training in competency-based medical education, and educational research within the institute.",
        layout: "half",
      },
      {
        title: "Governance of Research",
        bullets: [
          "Institutional Ethics Committee — approval for all studies involving human participants",
          "Scientific Committee — review of scientific merit and study design",
          "Pharmacovigilance Committee — monitoring and reporting of adverse drug reactions",
          "Medical Education Unit — educational research and faculty development",
        ],
        layout: "full",
      },
    ],
    quickLinks: [
      { name: "Ethics Committee", path: "/committess/ethics" },
      { name: "Scientific Committee", path: "/committess/scientific" },
      { name: "Medical Education Unit", path: "/committess/meu" },
      { name: "Pharmacovigilance Committee", path: "/committess/pharmacovigilance" },
      { name: "Departments", path: "/departments" },
    ],
  },
};
