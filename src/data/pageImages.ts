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
 * variant on purpose.
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
  anatomyLabSkeleton: g(clgMods, "Anatomy/2.png"),
  anatomyMuseum: campus(51), // articulated skeleton, wall charts, students
  specimenMuseum: campus(50), // tall specimen cabinets
  microscopyLab: campus(47),
  microscopyLab2: campus(45),
  practicalLab: campus(46),
  wetLab: campus(49),
  computerLab: campus(52), // rows of monitors — the digital library
  physiologyLab: g(clgMods, "pysiology/2.png"),
  examinationCouches: g(clgMods, "pysiology/3.png"),
  skillsLabMannequin: g(clgMods, "skills/2.png"),
  skillsLabCharts: g(clgMods, "skills/1.png"),
  meuLectureHall: g(clgMods, "MEU/2.png"),
  meuEntrance: g(clgMods, "MEU/3.png"),
  libraryStacks: g(clgMods, "central library/2.jpg"),
  libraryShelves: g(clgMods, "central library/3.jpg"),
  libraryReading: g(clgMods, "central library/1.jpg"),

  // ── Hospital (real AIMS) ──
  atrium: g(clgMods, "Lobby/1.png"),
  lobbyCorridor: g(clgMods, "Lobby/4.png"),
  opdWaiting: g(clgMods, "Lobby/5.png"), // patients seated in the waiting area
  noticeBoards: g(clgMods, "Lobby/6.png"),
  hospitalPorch: g(clgMods, "Lobby/7.png"), // entrance canopy with an ambulance
  receptionCounter: g(clgMods, "Lobby/8.png"),
  campusLawn: g(clgMods, "Lobby/9.png"),
  otTeam: g(clgMods, "Operation Room/1.png"),
  otTeamWide: g(clgMods, "Operation Room/2.png"),
  otEmpty: g(clgMods, "Operation Room/5.png"),
  microsurgery: g(clgMods, "Operation Room/6.png"),
  cathLabRoom: g(clgMods, "Blood Bank/1.png"), // misfiled: this is the cath lab
  bloodBankStorage: g(clgMods, "Blood Bank/2.png"),
  bloodBankLaminar: g(clgMods, "Blood Bank/3.png"),
  centralLabBench: g(clgMods, "Central Lab/1.png"),
  labMicroscopist: g(clgMods, "Central Lab/3.png"),

  // ── Campus & administration (real AIMS) ──
  campusBuilding: g(clgMods, "administration block/5.png"),
  adminOffice: g(clgMods, "administration block/1.png"),
  adminReception: g(clgMods, "administration block/2.png"),
  examHallBenches: g(clgMods, "administration block/3.png"),
  boardRoom: g(clgMods, "administration block/4.png"),
  campusFront: campus(15), // cohort in white coats under the AIMS signage
  campusFront2: campus(31),
  auditorium: campus(29), // full auditorium, seated audience
  ceremonyStage: campus(30), // dais with floral arrangement
  examHall: campus(39),
  whiteCoatHall: campus(40),
  posterExhibition: campus(36),
  posterExhibition2: campus(41),
  healthCamp: campus(48),
  houseVisit: campus(44), // doorstep survey, geotagged Dundigal
  seminar: campus(12),

  // ── Equipment (real AIMS) ──
  cathLab: machine("cath lab.jpeg"),
  mri: machine("mri machine images.jpeg"),
  ctScan: machine("ct scan image.jpeg"),
  xray: machine("hospital digital x ray.jpeg"),
  ultrasound: machine("usg scan image.jpeg"),
  bloodBags: machine("BLOOD BANK.jpeg"),
  pathLab: machine("PATHLAB.jpeg"),
  biochemBench: machine("BIOCHEMISTRY LAB.jpeg"),
  heartLung: machine("HEART LUNG MACHINE WITH HEMOTHERM.jpeg"),
  balloonPump: machine("INTRA AORTIC BALLON PUMP.jpeg"),
  neuroMicroscope: machine("NEURO MICROSCOPE.jpeg"),
  eeg: machine("EEG MACHINE.jpeg"),
  phaco: machine("LEGION PHACO UNIT.jpeg"),
  thuliumLaser: machine("THULIUM LASER.jpeg"),
  laparoscopy: machine("LAPROSCOPY WITH PHU.jpeg"),
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
  /** Full-bleed photograph behind the page title. Every page has one. */
  hero: string;
  /** Photograph for a section, keyed by its `title`. Omit to render it as prose. */
  sectionImages?: Record<string, string>;
  /** Photograph for a card, keyed by its `name`. Omit for the no-photo card. */
  cardImages?: Record<string, string>;
  /** Glyph for a card with no photograph, so the tile still reads as designed. */
  cardIcons?: Record<string, LucideIcon>;
}

/** Hero photography for every content-driven route, plus mapped sections and cards. */
export const PAGE_MEDIA: Record<string, PageMedia> = {
  // ── Admissions ──
  "/admissions": { hero: IMG.campusFront },
  "/admissions/criteria": { hero: IMG.examHall },
  "/admissions/seat-matrix": { hero: IMG.auditorium },
  "/admissions/fee-structure": { hero: IMG.adminReception },
  "/admissions/forms": { hero: IMG.adminOffice },
  "/admissions/admitted-list": { hero: IMG.campusFront2 },
  "/admissions/regulations": { hero: IMG.campusBuilding },

  // ── Academics ──
  "/academics/mbbs": {
    hero: IMG.dissectionHall,
    sectionImages: {
      "Phase I — Pre-Clinical": IMG.anatomyMuseum,
      "Phase II — Para-Clinical": IMG.microscopyLab2,
      "Phase III — Clinical": IMG.opdWaiting,
      "Compulsory Rotating Internship": IMG.otTeam,
      "Teaching & Clinical Learning": IMG.skillsLabMannequin,
    },
  },
  "/academics/nursing-allied-health": {
    hero: IMG.skillsLabMannequin,
    sectionImages: { "Learning Inside a Working Hospital": IMG.atrium },
    cardImages: {
      "B.Sc. Nursing": IMG.skillsLabCharts,
      "B.Sc. Medical Laboratory Technology": IMG.labMicroscopist,
      "Bachelor of Physiotherapy": IMG.physiotherapy,
    },
  },
  "/academics/paramedical-diplomas": {
    hero: IMG.centralLabBench,
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
    hero: IMG.meuLectureHall,
    sectionImages: {
      "How the Year Is Structured": IMG.examHall,
      "Recurring Academic Events": IMG.posterExhibition,
      "Beyond the Curriculum": IMG.healthCamp,
    },
  },
  "/academics/research": {
    hero: IMG.microscopyLab,
    sectionImages: {
      "Central Research Laboratory": IMG.practicalLab,
      "Medical Education Unit": IMG.meuEntrance,
    },
  },

  // ── Discover & approvals ──
  "/about/awards": {
    hero: IMG.ceremonyStage,
    sectionImages: {
      "Academic Achievement": IMG.posterExhibition2,
      "Service to the Community": IMG.houseVisit,
    },
  },
  "/about/centres-of-excellence": {
    hero: IMG.otTeam,
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
  "/approvals/government": { hero: IMG.campusBuilding },
  "/approvals/university-affiliation": { hero: IMG.campusFront },

  // ── Facilities ──
  "/facilities/hospital": {
    hero: IMG.atrium,
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
    hero: IMG.libraryStacks,
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
    hero: IMG.stadium,
    cardImages: {
      Hostels: IMG.hostel,
      "Food Court & Mess": g(facilityMods, "mess.jpeg"),
      "Gymnasium & Fitness Centre": g(facilityMods, "gym.jpeg"),
      "Indoor Stadium": IMG.stadium,
      "Sports & Games": g(facilityMods, "table_tennis.jpeg"),
      Transportation: g(facilityMods, "transport.jpeg"),
    },
  },

  // ── Patient care ──
  "/patient-care/citizen-charter": { hero: IMG.receptionCounter },
  "/patient-care/opd-timings": { hero: IMG.opdWaiting },
  "/patient-care/admission-discharge": { hero: IMG.lobbyCorridor },
  "/patient-care/insurance": { hero: IMG.adminReception },
  "/patient-care/feedback": { hero: IMG.noticeBoards },

  // ── Medical services ──
  "/services/specialities": {
    hero: IMG.whiteCoatHall,
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
    hero: IMG.cathLabRoom,
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
    hero: IMG.hospitalPorch,
    sectionImages: {
      "Casualty Infrastructure": IMG.icuVentilator,
      "Emergency Support Services": IMG.bloodBankStorage,
    },
  },
  "/services/diagnostics": {
    hero: IMG.mri,
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

/** Fallback for a route that somehow has no manifest entry. */
export const DEFAULT_MEDIA: PageMedia = { hero: IMG.campusFront };
