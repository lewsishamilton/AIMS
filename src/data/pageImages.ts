import type { LucideIcon } from "lucide-react";
import { Droplets, Pill } from "lucide-react";

/**
 * Media manifest for the content-driven pages.
 *
 * Every name below was checked against the actual picture, not its filename —
 * several assets are misnamed in the repository (`Blood Bank/1.png` is a cath
 * lab, the file called "ADVANCED ENDOSCOPY" is a treadmill for stress testing)
 * and `aims-campus-03` is not even AIMS, so it is never referenced.
 *
 * A picture is only ever used where it shows what the text is about. Sections
 * and cards are mapped one at a time; anything unmapped renders in a no-photo
 * variant on purpose. Page mastheads are drawn, not photographed — see
 * `components/PageHero.tsx`.
 */

type Mod = { default: string };

const campusMods = import.meta.glob<Mod>("../assets/stockImages/aims-campus-*.jpeg", { eager: true });
const clgMods = import.meta.glob<Mod>("../assets/clg-imgs/**/*.{png,PNG,jpg,jpeg}", { eager: true });
const deptMods = import.meta.glob<Mod>("../assets/Departments/*.{png,PNG,jpg,jpeg,JPEG}", { eager: true });
const facilityMods = import.meta.glob<Mod>("../assets/facilities/*.jpeg", { eager: true });
const aiMods = import.meta.glob<Mod>("../assets/ai-downloaded/*.jpg", { eager: true });

const FALLBACK_KEY = "../assets/stockImages/aims-campus-15.jpeg";

/** Resolve a globbed asset by path suffix. Warns and falls back rather than blanking the page. */
function g(mods: Record<string, Mod>, suffix: string): string {
  const key = Object.keys(mods).find((k) => k.endsWith(suffix));
  if (key) return mods[key].default;
  console.error(`[pageImages] no asset matching "${suffix}"`);
  return campusMods[FALLBACK_KEY]?.default ?? "";
}

const campus = (n: number) => g(campusMods, `aims-campus-${String(n).padStart(2, "0")}.jpeg`);
const machine = (file: string) => g(clgMods, `aims images machines/${file}`);

/**
 * Every photograph the content pages draw on, named for what it shows.
 * Numbers in comments are the source file, for tracing back.
 */
export const IMG = {
  // ── Teaching spaces (real AIMS) ──
  dissectionHall: g(clgMods, "Anatomy/5.png"),
  anatomyMuseum: campus(51), // articulated skeleton, wall charts, students
  specimenMuseum: campus(50), // tall specimen cabinets
  microscopyLab2: campus(45),
  practicalLab: campus(46),
  computerLab: campus(52), // rows of monitors — the digital library
  physiologyLab: g(clgMods, "pysiology/2.png"),
  skillsLabMannequin: g(clgMods, "skills/2.png"),
  skillsLabCharts: g(clgMods, "skills/1.png"),
  meuLectureHall: g(clgMods, "MEU/2.png"),
  meuEntrance: g(clgMods, "MEU/3.png"),
  libraryShelves: g(clgMods, "central library/3.jpg"),

  // ── Hospital (real AIMS) ──
  atrium: g(clgMods, "Lobby/1.png"),
  lobbyCorridor: g(clgMods, "Lobby/4.png"),
  opdWaiting: g(clgMods, "Lobby/5.png"), // patients seated in the waiting area
  hospitalPorch: g(clgMods, "Lobby/7.png"), // entrance canopy with an ambulance
  otTeam: g(clgMods, "Operation Room/1.png"),
  otEmpty: g(clgMods, "Operation Room/5.png"),
  microsurgery: g(clgMods, "Operation Room/6.png"),
  cathLabRoom: g(clgMods, "Blood Bank/1.png"), // misfiled: this is the cath lab
  bloodBankStorage: g(clgMods, "Blood Bank/2.png"),
  centralLabBench: g(clgMods, "Central Lab/1.png"),
  labMicroscopist: g(clgMods, "Central Lab/3.png"),

  // ── Campus & administration (real AIMS) ──
  auditorium: campus(29), // full auditorium, seated audience
  examHall: campus(39),
  posterExhibition: campus(36),
  posterExhibition2: campus(41),
  healthCamp: campus(48),
  houseVisit: campus(44), // doorstep survey, geotagged Dundigal

  // ── Equipment (real AIMS) ──
  cathLab: machine("cath lab.jpeg"),
  mri: machine("mri machine images.jpeg"),
  ctScan: machine("ct scan image.jpeg"),
  xray: machine("hospital digital x ray.jpeg"),
  bloodBags: machine("BLOOD BANK.jpeg"),
  pathLab: machine("PATHLAB.jpeg"),
  heartLung: machine("HEART LUNG MACHINE WITH HEMOTHERM.jpeg"),
  balloonPump: machine("INTRA AORTIC BALLON PUMP.jpeg"),
  neuroMicroscope: machine("NEURO MICROSCOPE.jpeg"),
  eeg: machine("EEG MACHINE.jpeg"),
  phaco: machine("LEGION PHACO UNIT.jpeg"),
  thuliumLaser: machine("THULIUM LASER.jpeg"),
  // Misfiled as "ADVANCED ENDOSCOPY" — the picture is a treadmill, i.e. TMT.
  treadmillTmt: machine("FULLY AUTOMATED CENTRAL LAB ADVANCED ENDOSCOPY.jpeg"),

  // ── Speciality stock already in the repository ──
  generalMedicine: g(deptMods, "general_medicine.png"),
  respiratory: g(deptMods, "respiratory medicine.jpeg"),
  dermatology: g(deptMods, "dermatology.png"),
  generalSurgery: g(deptMods, "general_Surgery.png"),
  orthopaedics: g(deptMods, "orthopaaedics.png"),
  ophthalmology: g(deptMods, "ophthalmology.PNG"),
  ent: g(deptMods, "ENT.PNG"),
  dentistry: g(deptMods, "denistry.PNG"),
  anaesthesiology: g(deptMods, "anaesthisiology.PNG"),

  // ── Fetched stock, for gaps AIMS has no photograph of ──
  icuVentilator: g(aiMods, "ai-downloaded/icu-ventilator.jpg"),
  physiotherapy: g(aiMods, "ai-downloaded/physiotherapy.jpg"),
  reconstructiveSurgery: g(aiMods, "ai-downloaded/reconstructive-surgery.jpg"),
  endoscopy: g(aiMods, "ai-downloaded/endoscopy.jpg"),
  maternity: g(aiMods, "ai-downloaded/maternity.jpg"),

  // ── Campus life ──
  hostel: g(facilityMods, "hostel.jpeg"),
  stadium: g(facilityMods, "indoor_stadium.jpeg"),
} as const;

export interface PageMedia {
  /** Photograph for a section, keyed by its `title`. Omit to render it as prose. */
  sectionImages?: Record<string, string>;
  /** Photograph for a card, keyed by its `name`. Omit for the no-photo card. */
  cardImages?: Record<string, string>;
  /** Glyph for a card with no photograph, so the tile still reads as designed. */
  cardIcons?: Record<string, LucideIcon>;
}

/**
 * Only the pages that have something worth photographing appear here. A route
 * that is absent maps nothing, which is the common case: its masthead is drawn,
 * and its sections carry themselves typographically.
 */
export const PAGE_MEDIA: Record<string, PageMedia> = {
  // ── Academics ──
  "/academics/mbbs": {
    sectionImages: {
      "Phase I — Pre-Clinical": IMG.anatomyMuseum,
      "Phase II — Para-Clinical": IMG.microscopyLab2,
      "Phase III — Clinical": IMG.opdWaiting,
      "Compulsory Rotating Internship": IMG.otTeam,
      "Teaching & Clinical Learning": IMG.skillsLabMannequin,
    },
  },
  "/academics/nursing-allied-health": {
    sectionImages: { "Learning Inside a Working Hospital": IMG.atrium },
    cardImages: {
      "B.Sc. Nursing": IMG.skillsLabCharts,
      "B.Sc. Medical Laboratory Technology": IMG.labMicroscopist,
      "Bachelor of Physiotherapy": IMG.physiotherapy,
    },
  },
  "/academics/paramedical-diplomas": {
    sectionImages: { "Trained Where the Work Happens": IMG.labMicroscopist },
    cardImages: {
      "Medical Laboratory Technology": IMG.pathLab,
      "Cath Lab Technician": IMG.cathLab,
      "Medical Sterilization Management & Operation Theatre Technician": IMG.otEmpty,
      "Ophthalmic Technician": IMG.phaco,
      "Anaesthesia Technician": IMG.anaesthesiology,
      "Medical Imaging Technology": IMG.ctScan,
      "Radiographic Assistant": IMG.xray,
      "Cardiology Technician": IMG.balloonPump,
    },
    cardIcons: { "Dialysis Technician": Droplets },
  },
  "/academics/calendar": {
    sectionImages: {
      "How the Year Is Structured": IMG.examHall,
      "Recurring Academic Events": IMG.posterExhibition,
      "Beyond the Curriculum": IMG.healthCamp,
    },
  },
  "/academics/research": {
    sectionImages: {
      "Central Research Laboratory": IMG.practicalLab,
      "Medical Education Unit": IMG.meuEntrance,
    },
  },

  // ── Discover & approvals ──
  "/about/awards": {
    sectionImages: {
      "Academic Achievement": IMG.posterExhibition2,
      "Service to the Community": IMG.houseVisit,
    },
  },
  "/about/centres-of-excellence": {
    sectionImages: { "What Makes a Centre of Excellence Here": IMG.microsurgery },
    cardImages: {
      "Cardiac Sciences": IMG.cathLab,
      Neurosciences: IMG.neuroMicroscope,
      "Gastrointestinal Sciences": IMG.endoscopy,
      "Trauma & Critical Care": IMG.icuVentilator,
      "Mother & Child": IMG.maternity,
    },
    cardIcons: { "Renal Sciences": Droplets },
  },

  // ── Facilities ──
  "/facilities/hospital": {
    cardImages: {
      "Outpatient Department": IMG.opdWaiting,
      "Inpatient Department": IMG.lobbyCorridor,
      "Critical Care": IMG.icuVentilator,
      "Blood Bank": IMG.bloodBankStorage,
      "Central Laboratory": IMG.centralLabBench,
      Radiology: IMG.mri,
      "Cath Lab, Endoscopy & Dialysis": IMG.cathLabRoom,
      "Ambulance Service": IMG.hospitalPorch,
    },
    cardIcons: { Pharmacy: Pill },
  },
  "/facilities/academic": {
    cardImages: {
      "Central Library": IMG.libraryShelves,
      "Digital Library": IMG.computerLab,
      "Skill Laboratory": IMG.skillsLabMannequin,
      "Lecture Halls": IMG.meuLectureHall,
      "Pre-Clinical Laboratories": IMG.dissectionHall,
      "Para-Clinical & Clinical Laboratories": IMG.physiologyLab,
      "Central Research Laboratory": IMG.practicalLab,
      Museums: IMG.specimenMuseum,
      Auditorium: IMG.auditorium,
    },
  },
  "/facilities/campus-life": {
    cardImages: {
      Hostels: IMG.hostel,
      "Food Court & Mess": g(facilityMods, "mess.jpeg"),
      "Gymnasium & Fitness Centre": g(facilityMods, "gym.jpeg"),
      "Indoor Stadium": IMG.stadium,
      "Sports & Games": g(facilityMods, "table_tennis.jpeg"),
      Transportation: g(facilityMods, "transport.jpeg"),
    },
  },

  // ── Medical services ──
  "/services/specialities": {
    cardImages: {
      "General Medicine": IMG.generalMedicine,
      "Pulmonology / Respiratory Medicine": IMG.respiratory,
      "Dermatology, Venereology & Leprosy": IMG.dermatology,
      "Obstetrics & Gynaecology": IMG.maternity,
      "General Surgery": IMG.generalSurgery,
      Orthopaedics: IMG.orthopaedics,
      Ophthalmology: IMG.ophthalmology,
      "ENT (Otorhinolaryngology)": IMG.ent,
      Dentistry: IMG.dentistry,
    },
  },
  "/services/super-specialities": {
    cardImages: {
      Cardiology: IMG.cathLab,
      "Cardio Thoracic & Vascular Surgery": IMG.heartLung,
      Urology: IMG.thuliumLaser,
      Neurology: IMG.eeg,
      Neurosurgery: IMG.neuroMicroscope,
      "Medical Gastroenterology": IMG.endoscopy,
      "Plastic & Cosmetic Surgery": IMG.reconstructiveSurgery,
    },
    cardIcons: { "Nephrology & Dialysis": Droplets },
  },
  "/services/emergency-trauma": {
    sectionImages: {
      "Casualty Infrastructure": IMG.icuVentilator,
      "Emergency Support Services": IMG.bloodBankStorage,
    },
  },
  "/services/diagnostics": {
    sectionImages: { "One Diagnostic Campus": IMG.centralLabBench },
    cardImages: {
      "Radiology & Imaging": IMG.mri,
      "Central Laboratory": IMG.centralLabBench,
      "Blood Bank": IMG.bloodBags,
      "Cardiac Cath Lab": IMG.cathLab,
      "Endoscopy & ERCP": IMG.endoscopy,
      "Cardiac & Neuro Testing": IMG.treadmillTmt,
    },
  },
};

/** Pages absent from the manifest map nothing, and render without photographs. */
export const DEFAULT_MEDIA: PageMedia = {};
