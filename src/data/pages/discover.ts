import type { StaticPageDef } from "../../components/StaticPage";

export const DISCOVER_PAGES: Record<string, StaticPageDef> = {
  "/about/centres-of-excellence": {
    eyebrow: "Approvals & Excellence",
    title: "Centres of Excellence",
    subtitle:
      "The units where AIMS has invested beyond the baseline required of a teaching hospital — in equipment, in sub-specialist cover, and in running the service around the clock.",
    sections: [
      {
        title: "What Makes a Centre of Excellence Here",
        content:
          "A centre of excellence is not a plaque on a wall. At AIMS it means three things together: dedicated equipment that is not shared out of a general pool, a consultant team that covers the service at night and at weekends as well as on a Tuesday morning, and enough case volume for the team to stay good at what it does. These are the units that meet that test.",
        layout: "full",
      },
    ],
    cardsTitle: "Our Centres",
    cards: [
      {
        name: "Cardiac Sciences",
        meta: "Cardiology · CTVS",
        description:
          "A Philips catheterisation laboratory supporting angiography, angioplasty and pacemaker implantation, with an ACT machine, defibrillators with internal and external paddles and an intra-aortic balloon pump, backed by cardiothoracic and vascular surgery.",
      },
      {
        name: "Neurosciences",
        meta: "Neurology · Neurosurgery",
        description:
          "Siemens Sempra 1.5 Tesla MRI and 50-slice CT imaging, EEG and ENMG, a 24×7 emergency neurology service, neurosurgical theatres, and rehabilitation and physiotherapy support for recovery.",
      },
      {
        name: "Renal Sciences",
        meta: "Nephrology · Urology · Dialysis",
        description:
          "Haemodialysis and peritoneal dialysis for outpatients and intensive-care patients, alongside a urology theatre equipped with Uro Thulium laser, C-arm, laparoscopy and lithotripter.",
      },
      {
        name: "Gastrointestinal Sciences",
        meta: "Medical Gastroenterology · GI Surgery",
        description:
          "Upper gastrointestinal endoscopy, ERCP and colonoscopy for digestive and hepatobiliary disease, with laparoscopic and open gastrointestinal surgery under general surgery.",
      },
      {
        name: "Trauma & Critical Care",
        meta: "25-bed casualty · ICU",
        description:
          "A 25-bed casualty with central oxygen and suction, resuscitation capability, immediate access to imaging and blood bank, and medical, surgical and post-operative intensive care units.",
      },
      {
        name: "Mother & Child",
        meta: "Obstetrics & Gynaecology · Paediatrics",
        description:
          "Antenatal and high-risk pregnancy care, 24×7 labour rooms and maternity wards, caesarean and laparoscopic gynaecological surgery, with paediatric and newborn cover.",
      },
    ],
    quickLinks: [
      { name: "Specialities", path: "/services/specialities" },
      { name: "Super Specialities", path: "/services/super-specialities" },
      { name: "Machines & Equipment", path: "/machines-equipment" },
      { name: "Accreditations", path: "/accreditations" },
    ],
  },

  "/approvals/government": {
    eyebrow: "Approvals & Excellence",
    title: "Government Approvals",
    subtitle:
      "The statutory permissions under which Arundathi Institute of Medical Sciences runs its medical college, its nursing programme and its attached hospital.",
    sections: [
      {
        title: "Approvals on Record",
        content:
          "A medical college in India cannot admit a single student without a chain of statutory clearances. AIMS holds the following, and copies of the orders are available for inspection at the administrative office.",
        layout: "full",
      },
      {
        title: "Essentiality Certificate",
        content:
          "Issued by the State Government, certifying that the establishment of the medical college is essential and that the institution meets the prescribed requirements for medical education in the State.",
        layout: "half",
      },
      {
        title: "NMC Letter of Permission",
        content:
          "Letter of Permission issued under the National Medical Commission, granting the institute permission to run the MBBS programme with the sanctioned annual intake of 150 students.",
        layout: "half",
      },
      {
        title: "KNRUHS Affiliation Order",
        content:
          "Affiliation order from Kaloji Narayana Rao University of Health Sciences, Warangal, confirming university recognition of the MBBS programme for admission, examination and award of the degree.",
        layout: "half",
      },
      {
        title: "Nursing Programme Approval",
        content:
          "Inspection approval authorising operation of the nursing programme, issued following the statutory inspection conducted by the competent authority.",
        layout: "half",
      },
      {
        title: "Consent to Operate",
        bullets: [
          "Hospital registration under the applicable State clinical establishments rules",
          "Blood bank licence for collection, storage, component separation and issue",
          "Radiation safety approvals for diagnostic imaging equipment",
          "Biomedical waste management authorisation",
        ],
        layout: "full",
      },
      {
        title: "Verifying an Approval",
        content:
          "Prospective students and parents are encouraged to verify any claim of recognition independently — through the National Medical Commission for the MBBS programme and through KNRUHS for affiliation. The administrative office will produce the original orders on request.",
        layout: "full",
      },
    ],
    quickLinks: [
      { name: "University Affiliation", path: "/approvals/university-affiliation" },
      { name: "Accreditations", path: "/accreditations" },
      { name: "Awards & Achievements", path: "/about/awards" },
      { name: "Contact", path: "/contact" },
    ],
  },

  "/approvals/university-affiliation": {
    eyebrow: "Approvals & Excellence",
    title: "University Affiliation",
    subtitle:
      "Arundathi Institute of Medical Sciences is academically affiliated to Kaloji Narayana Rao University of Health Sciences, Warangal, Telangana.",
    sections: [
      {
        title: "Affiliation to KNRUHS",
        badges: ["KNRUHS, Warangal"],
        content: [
          "Kaloji Narayana Rao University of Health Sciences is the State health sciences university for Telangana. Every medical, dental, nursing and allied health college in the State is affiliated to it, and it is KNRUHS — not the individual college — that conducts the professional examinations and awards the degree.",
          "The affiliation order held by AIMS confirms university recognition of the MBBS programme, which is the basis on which students are registered, examined and awarded the MBBS degree.",
        ],
        layout: "full",
      },
      {
        title: "What the University Controls",
        bullets: [
          "The academic curriculum and the scheme of examination",
          "Registration and enrolment of admitted students",
          "Conduct of university professional and supplementary examinations",
          "Declaration of results and award of the MBBS degree",
          "Counselling and allotment for Convener quota seats",
          "The academic calendar notified for each session",
        ],
        layout: "half",
      },
      {
        title: "What the Institute Controls",
        bullets: [
          "Day-to-day teaching, clinical postings and internal assessment",
          "Laboratory, library, skill lab and museum facilities",
          "Management and NRI category admissions, within notified rules",
          "Student discipline, hostels, transport and campus services",
          "Departmental research and continuing medical education",
        ],
        layout: "half",
      },
      {
        title: "University Contact",
        bullets: [
          "Kaloji Narayana Rao University of Health Sciences, Warangal, Telangana",
          "Vice-Chancellor: Dr. B. Karunakar Reddy, M.D.",
          "Registrar: Dr. S. Sandhya",
          "Phone: 0870 2454555",
          "Email: knruhsgwl15@gmail.com",
        ],
        layout: "full",
      },
      {
        title: "Regulatory Oversight",
        content:
          "Alongside university affiliation, the MBBS programme is recognised by the National Medical Commission, and the attached hospital is accredited by the National Accreditation Board for Hospitals & Healthcare Providers. Affiliation, recognition and accreditation are three separate things, and AIMS holds all three.",
        layout: "full",
      },
    ],
    quickLinks: [
      { name: "Government Approvals", path: "/approvals/government" },
      { name: "Accreditations", path: "/accreditations" },
      { name: "MBBS Programme", path: "/academics/mbbs" },
      { name: "Admission Criteria", path: "/admissions/criteria" },
    ],
  },
};
