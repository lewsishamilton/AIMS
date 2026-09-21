/**
 * Media manifest for the content-driven pages.
 *
 * Every page gets a hero photograph. Beyond that a picture is only ever used
 * where it actually shows what the text is about, so sections and cards are
 * mapped one by one, by title and by name. Anything left unmapped renders in a
 * no-photo variant on purpose — a page of dates, fees or rules is better served
 * by typography than by a stock corridor.
 *
 * Keeping this out of `data/pages/*` means the copy files stay about copy and
 * all the art direction lives in one reviewable place.
 */

type Mod = { default: string };

const campusMods = import.meta.glob<Mod>("../assets/stockImages/aims-campus-*.jpeg", { eager: true });
const clgMods = import.meta.glob<Mod>("../assets/clg-imgs/**/*.{png,PNG,jpg,jpeg}", { eager: true });
const deptMods = import.meta.glob<Mod>("../assets/Departments/*.{png,PNG,jpg,jpeg,JPEG}", { eager: true });
const facilityMods = import.meta.glob<Mod>("../assets/facilities/*.jpeg", { eager: true });
const aiMods = import.meta.glob<Mod>("../assets/ai-downloaded/*.jpg", { eager: true });

const FALLBACK_KEY = "../assets/stockImages/aims-campus-07.jpeg";

/** Resolve a globbed asset by path suffix. Warns and falls back rather than blanking the page. */
function g(mods: Record<string, Mod>, suffix: string): string {
  const key = Object.keys(mods).find((k) => k.endsWith(suffix));
  if (key) return mods[key].default;
  console.error(`[pageImages] no asset matching "${suffix}"`);
  return campusMods[FALLBACK_KEY]?.default ?? "";
}

const campus = (n: number) => g(campusMods, `aims-campus-${String(n).padStart(2, "0")}.jpeg`);
const machine = (file: string) => g(clgMods, `aims images machines/${file}`);

/** Semantic names for the photographs used across the site. */
export const IMG = {
  // Campus & academic life
  entrance: campus(7),
  auditorium: campus(15),
  microscopy: campus(47),
  dissectionLab: campus(41),
  library: campus(19),
  pathologySuite: campus(38),
  biochemLab: campus(37),
  campusGreen: campus(3),
  indoorArena: campus(35),
  gymnasium: campus(21),
  posterDay: campus(31),
  ruralOutreach: campus(48),
  diagnosticLab: campus(29),
  bookStacks: campus(50),
  lecture: campus(12),
  students: campus(24),
  practical: campus(33),
  corridor: campus(44),
  convocation: campus(9),
  campusAerial: campus(1),

  // Hospital & teaching blocks
  lobby: g(clgMods, "Lobby/1.png"),
  lobbyWide: g(clgMods, "Lobby/5.png"),
  reception: g(clgMods, "Lobby/8.png"),
  operationRoom: g(clgMods, "Operation Room/1.png"),
  operationRoomAlt: g(clgMods, "Operation Room/4.png"),
  bloodBank: g(clgMods, "Blood Bank/1.png"),
  bloodBankOt: g(clgMods, "Blood Bank/ot-picture-SLS05934.jpg"),
  centralLab: g(clgMods, "Central Lab/1.png"),
  centralLabAlt: g(clgMods, "Central Lab/2.png"),
  skillsLab: g(clgMods, "skills/1.png"),
  skillsLabAlt: g(clgMods, "skills/3.png"),
  meu: g(clgMods, "MEU/1.png"),
  adminBlock: g(clgMods, "administration block/1.png"),
  adminBlockAlt: g(clgMods, "administration block/3.png"),
  physiologyLab: g(clgMods, "pysiology/1.png"),
  anatomyLab: g(clgMods, "Anatomy/1.png"),
  centralLibrary: g(clgMods, "central library/1.jpg"),
  centralLibraryAlt: g(clgMods, "central library/3.jpg"),

  // Equipment
  cathLab: machine("cath lab.jpeg"),
  mri: machine("mri machine images.jpeg"),
  ctScan: machine("ct scan image.jpeg"),
  xray: machine("hospital digital x ray.jpeg"),
  ultrasound: machine("usg scan image.jpeg"),
  endoscopy: machine("FULLY AUTOMATED CENTRAL LAB ADVANCED ENDOSCOPY.jpeg"),
  heartLung: machine("HEART LUNG MACHINE WITH HEMOTHERM.jpeg"),
  balloonPump: machine("INTRA AORTIC BALLON PUMP.jpeg"),
  neuroMicroscope: machine("NEURO MICROSCOPE.jpeg"),
  entMicroscope: machine("ENT MICROSCOPE.jpeg"),
  eeg: machine("EEG MACHINE.jpeg"),
  emg: machine("EMG MACHINE.jpeg"),
  phaco: machine("LEGION PHACO UNIT.jpeg"),
  thuliumLaser: machine("THULIUM LASER.jpeg"),
  laparoscopy: machine("LAPROSCOPY WITH PHU.jpeg"),
  arthroscopy: machine("ARTHOSCOPY.jpeg"),
  pathLab: machine("PATHLAB.jpeg"),
  biochemMachine: machine("BIOCHEMISTRY LAB.jpeg"),

  // Departments
  generalMedicine: g(deptMods, "general_medicine.png"),
  respiratory: g(deptMods, "respiratory medicine.jpeg"),
  dermatology: g(deptMods, "dermatology.png"),
  gynaecology: g(deptMods, "gynacology.jpeg"),
  generalSurgery: g(deptMods, "general_Surgery.png"),
  orthopaedics: g(deptMods, "orthopaaedics.png"),
  ophthalmology: g(deptMods, "ophthalmology.PNG"),
  ent: g(deptMods, "ENT.PNG"),
  dentistry: g(deptMods, "denistry.PNG"),
  anaesthesiology: g(deptMods, "anaesthisiology.PNG"),
  paediatrics: g(deptMods, "paediatrics.PNG"),
  radiology: g(deptMods, "radiology.PNG"),
  communityMedicine: g(deptMods, "community_medicine.PNG"),
  microbiology: g(deptMods, "microbiology.png"),

  // Stock, for gaps AIMS has no photograph of (see assets/ai-downloaded/README.md)
  icuVentilator: g(aiMods, "ai-downloaded/icu-ventilator.jpg"),
  physiotherapy: g(aiMods, "ai-downloaded/physiotherapy.jpg"),
  reconstructiveSurgery: g(aiMods, "ai-downloaded/reconstructive-surgery.jpg"),

  // Campus life
  hostel: g(facilityMods, "hostel.jpeg"),
  mess: g(facilityMods, "mess.jpeg"),
  gym: g(facilityMods, "gym.jpeg"),
  stadium: g(facilityMods, "indoor_stadium.jpeg"),
  tableTennis: g(facilityMods, "table_tennis.jpeg"),
  transport: g(facilityMods, "transport.jpeg"),
} as const;

export interface PageMedia {
  /** Full-bleed photograph behind the page title. Every page has one. */
  hero: string;
  /** Photograph for a section, keyed by its `title`. Omit to render it as prose. */
  sectionImages?: Record<string, string>;
  /** Photograph for a card, keyed by its `name`. Omit to render the no-photo card. */
  cardImages?: Record<string, string>;
}

/**
 * Hero photography for every content-driven route, plus the handful of sections
 * and cards where a picture genuinely shows the subject.
 *
 * Deliberately unmapped: nephrology and dialysis (no genuine haemodialysis
 * photograph exists in the library), pharmacy, ambulance and museums.
 */
export const PAGE_MEDIA: Record<string, PageMedia> = {
  // ── Admissions ── information pages; hero only.
  "/admissions": { hero: IMG.entrance },
  "/admissions/criteria": { hero: IMG.adminBlock },
  "/admissions/seat-matrix": { hero: IMG.auditorium },
  "/admissions/fee-structure": { hero: IMG.adminBlockAlt },
  "/admissions/forms": { hero: IMG.corridor },
  "/admissions/admitted-list": { hero: IMG.convocation },
  "/admissions/regulations": { hero: IMG.campusAerial },

  // ── Academics ──
  "/academics/mbbs": {
    hero: IMG.dissectionLab,
    sectionImages: {
      "Phase I — Pre-Clinical": IMG.anatomyLab,
      "Phase II — Para-Clinical": IMG.pathologySuite,
      "Phase III — Clinical": IMG.lobby,
      "Teaching & Clinical Learning": IMG.skillsLab,
    },
  },
  "/academics/nursing-allied-health": {
    hero: IMG.skillsLab,
    sectionImages: { "Learning Inside a Working Hospital": IMG.lobbyWide },
    cardImages: {
      "B.Sc. Nursing": IMG.skillsLab,
      "B.Sc. Medical Laboratory Technology": IMG.pathLab,
      "Bachelor of Physiotherapy": IMG.physiotherapy,
    },
  },
  "/academics/paramedical-diplomas": {
    hero: IMG.centralLab,
    sectionImages: { "Trained Where the Work Happens": IMG.centralLabAlt },
    cardImages: {
      "Medical Laboratory Technology": IMG.pathLab,
      "Cath Lab Technician": IMG.cathLab,
      "Medical Sterilization Management & Operation Theatre Technician": IMG.operationRoom,
      "Ophthalmic Technician": IMG.phaco,
      "Anaesthesia Technician": IMG.anaesthesiology,
      "Medical Imaging Technology": IMG.ctScan,
      "Radiographic Assistant": IMG.xray,
      "Cardiology Technician": IMG.balloonPump,
    },
  },
  "/academics/calendar": { hero: IMG.lecture },
  "/academics/research": {
    hero: IMG.microscopy,
    sectionImages: {
      "Central Research Laboratory": IMG.biochemLab,
      "Medical Education Unit": IMG.meu,
    },
  },

  // ── Discover & approvals ── records and citations; hero only.
  "/about/awards": { hero: IMG.convocation },
  "/about/centres-of-excellence": {
    hero: IMG.operationRoom,
    sectionImages: { "What Makes a Centre of Excellence Here": IMG.operationRoomAlt },
    cardImages: {
      "Cardiac Sciences": IMG.cathLab,
      Neurosciences: IMG.neuroMicroscope,
      "Gastrointestinal Sciences": IMG.endoscopy,
      "Trauma & Critical Care": IMG.icuVentilator,
      "Mother & Child": IMG.gynaecology,
    },
  },
  "/approvals/government": { hero: IMG.adminBlock },
  "/approvals/university-affiliation": { hero: IMG.auditorium },

  // ── Facilities ── the cards carry their own photographs; these fill the gaps.
  "/facilities/hospital": {
    hero: IMG.lobbyWide,
    cardImages: {
      "Critical Care": IMG.icuVentilator,
      Radiology: IMG.mri,
      "Cath Lab, Endoscopy & Dialysis": IMG.cathLab,
    },
  },
  "/facilities/academic": {
    hero: IMG.centralLibrary,
    cardImages: {
      "Digital Library": IMG.centralLibraryAlt,
      "Lecture Halls": IMG.auditorium,
      "Central Research Laboratory": IMG.microscopy,
    },
  },
  "/facilities/campus-life": { hero: IMG.stadium },

  // ── Patient care ── timings, charters and procedures; hero only.
  "/patient-care/citizen-charter": { hero: IMG.lobbyWide },
  "/patient-care/opd-timings": { hero: IMG.lobby },
  "/patient-care/admission-discharge": { hero: IMG.reception },
  "/patient-care/insurance": { hero: IMG.adminBlockAlt },
  "/patient-care/feedback": { hero: IMG.corridor },

  // ── Medical services ──
  "/services/specialities": {
    hero: IMG.generalMedicine,
    cardImages: {
      "General Medicine": IMG.generalMedicine,
      "Pulmonology / Respiratory Medicine": IMG.respiratory,
      "Dermatology, Venereology & Leprosy": IMG.dermatology,
      "Obstetrics & Gynaecology": IMG.gynaecology,
      "General Surgery": IMG.generalSurgery,
      Orthopaedics: IMG.orthopaedics,
      Ophthalmology: IMG.ophthalmology,
      "ENT (Otorhinolaryngology)": IMG.ent,
      Dentistry: IMG.dentistry,
    },
  },
  "/services/super-specialities": {
    hero: IMG.cathLab,
    cardImages: {
      Cardiology: IMG.cathLab,
      "Cardio Thoracic & Vascular Surgery": IMG.heartLung,
      Urology: IMG.thuliumLaser,
      Neurology: IMG.eeg,
      Neurosurgery: IMG.neuroMicroscope,
      "Medical Gastroenterology": IMG.endoscopy,
      "Plastic & Cosmetic Surgery": IMG.reconstructiveSurgery,
    },
  },
  "/services/emergency-trauma": {
    hero: IMG.operationRoomAlt,
    sectionImages: {
      "Casualty Infrastructure": IMG.icuVentilator,
      "Emergency Support Services": IMG.bloodBankOt,
    },
  },
  "/services/diagnostics": {
    hero: IMG.mri,
    sectionImages: { "One Diagnostic Campus": IMG.centralLab },
    cardImages: {
      "Radiology & Imaging": IMG.mri,
      "Central Laboratory": IMG.centralLab,
      "Blood Bank": IMG.bloodBank,
      "Cardiac Cath Lab": IMG.cathLab,
      "Endoscopy & ERCP": IMG.endoscopy,
      "Cardiac & Neuro Testing": IMG.eeg,
    },
  },
};

/** Fallback for a route that somehow has no manifest entry. */
export const DEFAULT_MEDIA: PageMedia = { hero: IMG.entrance };
