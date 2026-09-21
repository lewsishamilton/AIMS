import type { StaticPageDef } from "../../components/StaticPage";

const SPECIALITY_LINKS = [
  { name: "Specialities", path: "/services/specialities" },
  { name: "Super Specialities", path: "/services/super-specialities" },
  { name: "Emergency & Trauma", path: "/services/emergency-trauma" },
  { name: "Diagnostics & Imaging", path: "/services/diagnostics" },
  { name: "Machines & Equipment", path: "/machines-equipment" },
];

const linksExcept = (path: string) =>
  SPECIALITY_LINKS.filter((l) => l.path !== path);

export const SERVICE_PAGES: Record<string, StaticPageDef> = {
  "/services/specialities": {
    eyebrow: "Medical Services",
    title: "Specialities",
    subtitle:
      "Marri Arundhathi Multi-Specialty Hospital runs full-fledged clinical departments staffed by consultants, senior residents and round-the-clock resident doctors, supported by shared operation theatres, intensive care and diagnostics.",
    cards: [
      {
        name: "General Medicine",
        meta: "OPD · Inpatient · Critical Care",
        description:
          "Comprehensive services for the prevention, diagnosis and management of a wide range of diseases, including infectious and immunological conditions, digestive disorders, endocrine and metabolic disease, and cardiac ailments.",
        bullets: [
          "Diabetes, hypertension and lifestyle-disease management",
          "Infectious disease and fever evaluation",
          "Medical intensive care with ventilator support",
        ],
      },
      {
        name: "Pulmonology / Respiratory Medicine",
        meta: "Lung function lab · Bronchoscopy",
        description:
          "Expertise in diagnosing and treating the full range of respiratory conditions — from asthma and tuberculosis to chronic obstructive pulmonary disease — using advanced pulmonary testing equipment.",
        bullets: [
          "Asthma, COPD and interstitial lung disease clinics",
          "Revised National TB programme support",
          "Sleep-disordered breathing evaluation",
        ],
      },
      {
        name: "Dermatology, Venereology & Leprosy",
        meta: "Medical · Surgical · Cosmetic",
        description:
          "Treatment for diseases of the skin, hair and nails across general dermatology, surgical dermatology and cosmetic/laser procedures, including acne management and hair restoration.",
        bullets: [
          "Acne, psoriasis, vitiligo and eczema care",
          "Dermatosurgery and laser procedures",
          "Hair restoration and aesthetic dermatology",
        ],
      },
      {
        name: "Obstetrics & Gynaecology",
        meta: "24×7 labour room · Maternity ward",
        description:
          "Holistic treatment of the patient, with specialised care for pregnancy, reproductive health and gynaecological emergencies delivered through well-equipped labour rooms and maternity wards.",
        bullets: [
          "Antenatal, high-risk pregnancy and postnatal care",
          "Normal and caesarean deliveries round the clock",
          "Laparoscopic gynaecological surgery",
        ],
      },
      {
        name: "General Surgery",
        meta: "Laparoscopy · GI Surgery",
        description:
          "Gastrointestinal and laparoscopic procedures covering cancerous growths, hernias and digestive-system diagnostics using modern minimally invasive surgical techniques.",
        bullets: [
          "Laparoscopic cholecystectomy, appendicectomy and hernia repair",
          "Gastrointestinal and hepatobiliary surgery",
          "Trauma and emergency surgical cover",
        ],
      },
      {
        name: "Orthopaedics",
        meta: "Arthroscopy · Joint Replacement",
        description:
          "Care for sports injuries and musculoskeletal problems using advanced arthroscopic equipment and dedicated orthopaedic operating theatres.",
        bullets: [
          "Trauma fixation and polytrauma management",
          "Arthroscopic and sports-injury surgery",
          "Joint replacement and spine procedures",
        ],
      },
      {
        name: "Ophthalmology",
        meta: "Microsurgery · Retina clinic",
        description:
          "State-of-the-art services in eye care, with diagnostic and surgical facilities for complex eye conditions and for the detection of systemic disease through ocular examination.",
        bullets: [
          "Phacoemulsification cataract surgery",
          "Glaucoma, retina and diabetic-eye screening",
          "Refraction and community eye-care camps",
        ],
      },
      {
        name: "ENT (Otorhinolaryngology)",
        meta: "Audiology · Endoscopic surgery",
        description:
          "Comprehensive care for ear, nose and throat diseases, hearing disorders, sleep apnoea and voice disorders, delivered by multidisciplinary teams.",
        bullets: [
          "Functional endoscopic sinus surgery",
          "Audiometry and hearing-aid assessment",
          "Head, neck and voice-disorder management",
        ],
      },
      {
        name: "Dentistry",
        meta: "Eight dental sub-specialities",
        description:
          "Eight sub-specialities offering preventive care, cosmetic dentistry, implants, orthodontics and oral surgery services under one roof.",
        bullets: [
          "Conservative dentistry, endodontics and prosthodontics",
          "Orthodontics and paediatric dentistry",
          "Oral and maxillofacial surgery",
        ],
      },
    ],
    quickLinks: linksExcept("/services/specialities"),
    cta: {
      text: "Outpatient consultations run Monday to Saturday, 8:00 AM to 5:00 PM. Emergency and casualty services are available 24×7.",
      label: "Plan Your Visit",
      path: "/patient-care/opd-timings",
    },
  },

  "/services/super-specialities": {
    eyebrow: "Medical Services",
    title: "Super Specialities",
    subtitle:
      "Tertiary-level units backed by a Philips cardiac catheterisation lab, a Siemens 1.5 Tesla MRI, a 50-slice CT scanner and dedicated super-speciality operation theatres.",
    cards: [
      {
        name: "Cardiology",
        meta: "Philips Cath Lab · 24×7 cardiac care",
        description:
          "A state-of-the-art Philips cardiac catheterisation lab supports both diagnostic and therapeutic procedures for coronary artery disease and structural heart conditions.",
        bullets: [
          "Coronary angiography and angioplasty",
          "ACT machine, cardiac defibrillator with internal and external paddles",
          "Intra-aortic balloon pump and cardiac pacemaker implantation",
        ],
      },
      {
        name: "Cardio Thoracic & Vascular Surgery",
        meta: "Open and endovascular surgery",
        description:
          "Treatment of peripheral vascular disorders using the latest catheter-based interventions, minimally invasive procedures and traditional surgical techniques.",
        bullets: [
          "Balloon angioplasty and stenting",
          "Bypass and vascular reconstruction surgery",
          "Thoracic and chest-wall procedures",
        ],
      },
      {
        name: "Nephrology & Dialysis",
        meta: "Haemodialysis · Peritoneal dialysis",
        description:
          "Kidney care covering acute and chronic renal disease, with haemodialysis and peritoneal dialysis available for outpatients as well as patients in intensive care.",
        bullets: [
          "Dedicated dialysis unit with bedside ICU dialysis",
          "Management of chronic kidney disease and glomerular disease",
          "Pre- and post-transplant medical care",
        ],
      },
      {
        name: "Urology",
        meta: "Uro Thulium laser · Lithotripsy",
        description:
          "Management of male and female urinary-tract conditions, including cancers, infections, stone disease and reconstructive procedures.",
        bullets: [
          "Dedicated urology operation theatre with C-arm",
          "Uro Thulium laser and lithotripter for stone disease",
          "Laparoscopic and endoscopic urological surgery",
        ],
      },
      {
        name: "Neurology",
        meta: "MRI · EEG · ENMG · 24×7 stroke cover",
        description:
          "Evaluation and treatment of disorders of the brain, spinal cord, nerves and muscles, supported by the latest MRI scanner, top-notch EEG and ENMG machines and a 24×7 emergency service.",
        bullets: [
          "Acute stroke evaluation and management",
          "Epilepsy, headache and movement-disorder clinics",
          "Neuro-rehabilitation and physiotherapy support",
        ],
      },
      {
        name: "Neurosurgery",
        meta: "Siemens 1.5T MRI · 50-slice CT",
        description:
          "Comprehensive treatment of neurological disorders using Siemens Sempra 1.5 Tesla MRI and 50-slice CT imaging alongside advanced neurosurgical operating equipment.",
        bullets: [
          "Head injury and neurotrauma surgery",
          "Brain and spinal tumour surgery",
          "Spine stabilisation and decompression procedures",
        ],
      },
      {
        name: "Medical Gastroenterology",
        meta: "Endoscopy · ERCP · Colonoscopy",
        description:
          "Specialised care for digestive and liver conditions, with expertise in upper endoscopy, endoscopic retrograde cholangiopancreatography (ERCP) and colonoscopy.",
        bullets: [
          "Diagnostic and therapeutic upper GI endoscopy",
          "ERCP for biliary and pancreatic disease",
          "Liver disease and GI bleed management",
        ],
      },
      {
        name: "Plastic & Cosmetic Surgery",
        meta: "Reconstructive · Aesthetic",
        description:
          "Reconstructive and aesthetic procedures with an emphasis on restoration of form and function after trauma, burns and disease, alongside elective rejuvenation.",
        bullets: [
          "Post-trauma and post-burn reconstruction",
          "Microvascular and flap surgery",
          "Aesthetic and rejuvenation procedures",
        ],
      },
    ],
    quickLinks: linksExcept("/services/super-specialities"),
    cta: {
      text: "For a super-speciality appointment or a second opinion, reach the hospital reception on +91 80556 67888.",
      label: "Contact the Hospital",
      path: "/contact",
    },
  },

  "/services/emergency-trauma": {
    eyebrow: "Medical Services",
    title: "Emergency & Trauma",
    subtitle:
      "A 25-bed casualty running 24 hours a day, seven days a week, with central oxygen supply, central suction and immediate access to imaging, blood bank and operation theatres.",
    sections: [
      {
        title: "Round-the-Clock Casualty",
        content: [
          "The casualty department at Marri Arundhathi Multi-Specialty Hospital is open 24×7 and is the first point of contact for accident victims, cardiac and neurological emergencies, poisoning, obstetric emergencies and acutely ill medical patients.",
          "Resident doctors are present on the floor at all hours and are backed by on-call consultants from every clinical and super-speciality department, so a patient can move from triage to a specialist team without leaving the building.",
        ],
        layout: "full",
      },
      {
        title: "Casualty Infrastructure",
        bullets: [
          "25 casualty beds with central oxygen supply and central suction",
          "Resuscitation bay with defibrillators and ventilator support",
          "Free wheelchairs and stretchers at the entrance",
          "Direct lift access to operation theatres and intensive care",
        ],
        layout: "half",
      },
      {
        title: "Emergency Support Services",
        bullets: [
          "24×7 radiology — X-ray, ultrasound, CT and MRI",
          "24×7 central laboratory and blood bank",
          "Cath lab activation for acute cardiac emergencies",
          "Critical care units for medical, surgical and post-operative patients",
        ],
        layout: "half",
      },
      {
        title: "Emergency Contact",
        subtitle: "Save these numbers before you need them",
        bullets: [
          "Ambulance: +91 81794 32491",
          "Hospital reception: +91 80556 67888",
          "Alternate line: +91 80741 58018",
          "Beside MLRIT, Dundigal, Gandi Maisamma, Medchal–Malkajgiri District, Telangana 500043",
        ],
        layout: "full",
      },
      {
        title: "What to Bring",
        bullets: [
          "Any previous discharge summaries, prescriptions and scan reports",
          "A current list of the patient's medicines and known allergies",
          "Photo identification for the patient and the attendant",
          "Insurance or TPA card, if the patient is covered",
        ],
        layout: "half",
      },
      {
        title: "For Attendants",
        bullets: [
          "One attendant is allowed with the patient inside casualty",
          "Please beware of touts and unauthorised persons on the premises",
          "Keep valuables with you and do not hand them to strangers",
          "The campus is strictly tobacco-free",
        ],
        layout: "half",
      },
    ],
    quickLinks: linksExcept("/services/emergency-trauma"),
  },

  "/services/diagnostics": {
    eyebrow: "Medical Services",
    title: "Diagnostics & Imaging",
    subtitle:
      "Radiology, central laboratory and blood bank services operating round the clock for inpatients, outpatients and referrals — the same diagnostic backbone that supports undergraduate teaching at the institute.",
    sections: [
      {
        title: "One Diagnostic Campus",
        content:
          "Imaging, pathology, biochemistry, microbiology and transfusion services sit within the hospital block, so samples and patients move between departments in minutes rather than hours. Reports are issued through the hospital information system and are available to the treating unit as soon as they are validated.",
        layout: "full",
      },
    ],
    cardsTitle: "Diagnostic Services",
    cards: [
      {
        name: "Radiology & Imaging",
        meta: "MRI · CT · Ultrasound · X-Ray",
        description:
          "A full imaging suite covering routine radiography through to cross-sectional and contrast studies, reported by the Department of Radio-Diagnosis.",
        bullets: [
          "Siemens Sempra 1.5 Tesla MRI",
          "50-slice CT scanner",
          "Ultrasound and colour Doppler",
          "Digital X-ray, including portable bedside units",
        ],
      },
      {
        name: "Central Laboratory",
        meta: "Pathology · Biochemistry · Microbiology",
        description:
          "An integrated laboratory handling several hundred investigations a day across haematology, clinical pathology, biochemistry, serology and microbiology.",
        bullets: [
          "Automated haematology and biochemistry analysers",
          "Histopathology and cytology reporting",
          "Culture, sensitivity and serological testing",
          "24×7 emergency investigation panel",
        ],
      },
      {
        name: "Blood Bank",
        meta: "Licensed · 24×7",
        description:
          "A dedicated blood bank supporting surgical, obstetric, trauma and medical transfusion requirements for both inpatients and outpatients.",
        bullets: [
          "Grouping, cross-matching and compatibility testing",
          "Component separation and storage",
          "Voluntary blood-donation drives on campus",
        ],
      },
      {
        name: "Cardiac Cath Lab",
        meta: "Philips catheterisation laboratory",
        description:
          "A diagnostic and interventional cardiac laboratory used for angiography, angioplasty, pacemaker implantation and emergency cardiac procedures.",
      },
      {
        name: "Endoscopy & ERCP",
        meta: "Gastroenterology suite",
        description:
          "Upper gastrointestinal endoscopy, colonoscopy and ERCP for diagnostic evaluation and therapeutic intervention in digestive and biliary disease.",
      },
      {
        name: "Cardiac & Neuro Testing",
        meta: "ECG · 2D Echo · EEG · ENMG",
        description:
          "Non-invasive cardiac and neurophysiology testing supporting the cardiology, medicine and neurology units, available for outpatients on referral.",
      },
    ],
    quickLinks: linksExcept("/services/diagnostics"),
    cta: {
      text: "Diagnostic services are available to walk-in patients with a valid prescription. Call ahead to confirm preparation instructions for fasting or contrast studies.",
      label: "Contact Us",
      path: "/contact",
    },
  },
};
