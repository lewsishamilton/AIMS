/**
 * Media manifest for the content-driven pages.
 *
 * Every static page gets a hero photograph, a pool of supporting photographs
 * (used for section splits, the gallery strip and any card without a picture of
 * its own) and optional per-card overrides keyed by the card's `name`.
 *
 * Keeping this out of `data/pages/*` means the copy files stay about copy and
 * all the art direction lives in one reviewable place.
 */

type Mod = { default: string };

const campusMods = import.meta.glob<Mod>("../assets/stockImages/aims-campus-*.jpeg", { eager: true });
const clgMods = import.meta.glob<Mod>("../assets/clg-imgs/**/*.{png,PNG,jpg,jpeg}", { eager: true });
const deptMods = import.meta.glob<Mod>("../assets/Departments/*.{png,PNG,jpg,jpeg,JPEG}", { eager: true });
const facilityMods = import.meta.glob<Mod>("../assets/facilities/*.jpeg", { eager: true });

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

  // Campus life
  hostel: g(facilityMods, "hostel.jpeg"),
  mess: g(facilityMods, "mess.jpeg"),
  gym: g(facilityMods, "gym.jpeg"),
  stadium: g(facilityMods, "indoor_stadium.jpeg"),
  tableTennis: g(facilityMods, "table_tennis.jpeg"),
  transport: g(facilityMods, "transport.jpeg"),
} as const;

export interface PageMedia {
  /** Full-bleed photograph behind the page title. */
  hero: string;
  /** Supporting photographs for section splits, the gallery strip and card fallbacks. */
  pool: string[];
  /** Photograph for a specific card, keyed by the card's `name`. */
  cardImages?: Record<string, string>;
}

const ADMISSIONS_POOL = [IMG.entrance, IMG.adminBlock, IMG.students, IMG.library, IMG.auditorium, IMG.campusGreen];
const SERVICES_POOL = [IMG.lobby, IMG.operationRoom, IMG.centralLab, IMG.cathLab, IMG.mri, IMG.bloodBank];
const PATIENT_POOL = [IMG.lobbyWide, IMG.reception, IMG.operationRoomAlt, IMG.centralLab, IMG.bloodBank, IMG.lobby];
const DISCOVER_POOL = [IMG.entrance, IMG.auditorium, IMG.posterDay, IMG.convocation, IMG.adminBlockAlt, IMG.campusAerial];
const FACILITIES_POOL = [IMG.lobby, IMG.centralLibrary, IMG.skillsLab, IMG.hostel, IMG.stadium, IMG.operationRoom];

/** Hero + supporting photography for every content-driven route. */
export const PAGE_MEDIA: Record<string, PageMedia> = {
  // ── Admissions ──────────────────────────────────────────────
  "/admissions": { hero: IMG.entrance, pool: ADMISSIONS_POOL },
  "/admissions/criteria": { hero: IMG.adminBlock, pool: [IMG.students, IMG.library, IMG.entrance, IMG.lecture, IMG.auditorium, IMG.campusGreen] },
  "/admissions/seat-matrix": { hero: IMG.auditorium, pool: [IMG.lecture, IMG.students, IMG.adminBlockAlt, IMG.campusGreen, IMG.library, IMG.entrance] },
  "/admissions/fee-structure": { hero: IMG.adminBlockAlt, pool: [IMG.adminBlock, IMG.entrance, IMG.corridor, IMG.students, IMG.library, IMG.campusGreen] },
  "/admissions/forms": { hero: IMG.corridor, pool: ADMISSIONS_POOL },
  "/admissions/admitted-list": { hero: IMG.convocation, pool: [IMG.students, IMG.auditorium, IMG.posterDay, IMG.entrance, IMG.campusGreen, IMG.library] },
  "/admissions/regulations": { hero: IMG.campusAerial, pool: ADMISSIONS_POOL },

  // ── Academics ───────────────────────────────────────────────
  "/academics/mbbs": { hero: IMG.dissectionLab, pool: [IMG.anatomyLab, IMG.physiologyLab, IMG.biochemLab, IMG.skillsLab, IMG.lobby, IMG.library] },
  "/academics/nursing-allied-health": {
    hero: IMG.skillsLab,
    pool: [IMG.skillsLabAlt, IMG.centralLab, IMG.physiologyLab, IMG.lobby, IMG.library, IMG.students],
    cardImages: {
      "B.Sc. Nursing": IMG.skillsLab,
      "B.Sc. Medical Laboratory Technology": IMG.pathLab,
      "Bachelor of Physiotherapy": IMG.physiologyLab,
    },
  },
  "/academics/paramedical-diplomas": {
    hero: IMG.centralLab,
    pool: [IMG.pathLab, IMG.centralLabAlt, IMG.operationRoom, IMG.cathLab, IMG.ctScan, IMG.skillsLab],
    cardImages: {
      "Medical Laboratory Technology": IMG.pathLab,
      "Cath Lab Technician": IMG.cathLab,
      "Medical Sterilization Management & Operation Theatre Technician": IMG.operationRoom,
      "Dialysis Technician": IMG.centralLabAlt,
      "Ophthalmic Technician": IMG.phaco,
      "Anaesthesia Technician": IMG.anaesthesiology,
      "Medical Imaging Technology": IMG.ctScan,
      "Radiographic Assistant": IMG.xray,
      "Cardiology Technician": IMG.balloonPump,
    },
  },
  "/academics/calendar": { hero: IMG.lecture, pool: [IMG.auditorium, IMG.library, IMG.students, IMG.posterDay, IMG.campusGreen, IMG.practical] },
  "/academics/research": { hero: IMG.microscopy, pool: [IMG.posterDay, IMG.biochemLab, IMG.pathologySuite, IMG.bookStacks, IMG.ruralOutreach, IMG.centralLibraryAlt] },

  // ── Discover & approvals ────────────────────────────────────
  "/about/awards": { hero: IMG.convocation, pool: [IMG.posterDay, IMG.auditorium, IMG.entrance, IMG.students, IMG.ruralOutreach, IMG.campusAerial] },
  "/about/centres-of-excellence": {
    hero: IMG.operationRoom,
    pool: [IMG.cathLab, IMG.neuroMicroscope, IMG.centralLab, IMG.endoscopy, IMG.operationRoomAlt, IMG.gynaecology],
    cardImages: {
      "Cardiac Sciences": IMG.cathLab,
      Neurosciences: IMG.neuroMicroscope,
      "Renal Sciences": IMG.centralLabAlt,
      "Gastrointestinal Sciences": IMG.endoscopy,
      "Trauma & Critical Care": IMG.operationRoomAlt,
      "Mother & Child": IMG.gynaecology,
    },
  },
  "/approvals/government": { hero: IMG.adminBlock, pool: DISCOVER_POOL },
  "/approvals/university-affiliation": { hero: IMG.auditorium, pool: [IMG.entrance, IMG.library, IMG.convocation, IMG.adminBlockAlt, IMG.lecture, IMG.campusGreen] },

  // ── Facilities ──────────────────────────────────────────────
  "/facilities/hospital": { hero: IMG.lobbyWide, pool: [IMG.operationRoom, IMG.centralLab, IMG.bloodBank, IMG.mri, IMG.lobby, IMG.reception] },
  "/facilities/academic": { hero: IMG.centralLibrary, pool: [IMG.dissectionLab, IMG.skillsLab, IMG.physiologyLab, IMG.auditorium, IMG.microscopy, IMG.meu] },
  "/facilities/campus-life": { hero: IMG.stadium, pool: [IMG.hostel, IMG.mess, IMG.gym, IMG.tableTennis, IMG.transport, IMG.campusGreen] },

  // ── Patient care ────────────────────────────────────────────
  "/patient-care/citizen-charter": { hero: IMG.lobbyWide, pool: PATIENT_POOL },
  "/patient-care/opd-timings": { hero: IMG.lobby, pool: [IMG.reception, IMG.generalMedicine, IMG.paediatrics, IMG.lobbyWide, IMG.corridor, IMG.centralLab] },
  "/patient-care/admission-discharge": { hero: IMG.reception, pool: [IMG.lobby, IMG.operationRoomAlt, IMG.lobbyWide, IMG.centralLab, IMG.bloodBank, IMG.corridor] },
  "/patient-care/insurance": { hero: IMG.adminBlockAlt, pool: PATIENT_POOL },
  "/patient-care/feedback": { hero: IMG.corridor, pool: [IMG.lobby, IMG.reception, IMG.lobbyWide, IMG.adminBlock, IMG.campusGreen, IMG.entrance] },

  // ── Medical services ────────────────────────────────────────
  "/services/specialities": {
    hero: IMG.generalMedicine,
    pool: SERVICES_POOL,
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
    pool: SERVICES_POOL,
    cardImages: {
      Cardiology: IMG.cathLab,
      "Cardio Thoracic & Vascular Surgery": IMG.heartLung,
      "Nephrology & Dialysis": IMG.centralLabAlt,
      Urology: IMG.thuliumLaser,
      Neurology: IMG.eeg,
      Neurosurgery: IMG.neuroMicroscope,
      "Medical Gastroenterology": IMG.endoscopy,
      "Plastic & Cosmetic Surgery": IMG.laparoscopy,
    },
  },
  "/services/emergency-trauma": { hero: IMG.operationRoomAlt, pool: [IMG.operationRoom, IMG.bloodBankOt, IMG.ctScan, IMG.centralLab, IMG.lobby, IMG.xray] },
  "/services/diagnostics": {
    hero: IMG.mri,
    pool: [IMG.ctScan, IMG.xray, IMG.ultrasound, IMG.centralLab, IMG.pathLab, IMG.bloodBank],
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

/** Every route falls back to this if the manifest ever misses one. */
export const DEFAULT_MEDIA: PageMedia = { hero: IMG.entrance, pool: FACILITIES_POOL };
