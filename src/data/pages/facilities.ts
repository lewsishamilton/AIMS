import type { StaticPageDef } from "../../components/StaticPage";

import bloodBankImg from "../../assets/clg-imgs/Blood Bank/1.png";
import centralLabImg from "../../assets/clg-imgs/Central Lab/1.png";
import operationRoomImg from "../../assets/clg-imgs/Operation Room/1.png";
import lobbyImg from "../../assets/clg-imgs/Lobby/1.png";
import libraryImg from "../../assets/clg-imgs/central library/1.jpg";
import skillLabImg from "../../assets/clg-imgs/skills/1.png";
import anatomyLabImg from "../../assets/clg-imgs/Anatomy/1.png";
import physiologyLabImg from "../../assets/clg-imgs/pysiology/1.png";
import adminBlockImg from "../../assets/clg-imgs/administration block/1.png";
import hostelImg from "../../assets/facilities/hostel.jpeg";
import messImg from "../../assets/facilities/mess.jpeg";
import gymImg from "../../assets/facilities/gym.jpeg";
import stadiumImg from "../../assets/facilities/indoor_stadium.jpeg";
import tableTennisImg from "../../assets/facilities/table_tennis.jpeg";
import transportImg from "../../assets/facilities/transport.jpeg";

const FACILITY_LINKS = [
  { name: "Hospital Facilities", path: "/facilities/hospital" },
  { name: "Academic Facilities", path: "/facilities/academic" },
  { name: "Campus Life", path: "/facilities/campus-life" },
  { name: "Machines & Equipment", path: "/machines-equipment" },
];

const linksExcept = (path: string) =>
  FACILITY_LINKS.filter((l) => l.path !== path);

export const FACILITY_PAGES: Record<string, StaticPageDef> = {
  "/facilities/hospital": {
    eyebrow: "Facilities",
    title: "Hospital Facilities",
    subtitle:
      "Marri Arundhathi Multi-Specialty Hospital provides the clinical infrastructure for patient care and for undergraduate teaching — outpatient, inpatient, critical care, diagnostics and pharmacy in a single block.",
    cards: [
      {
        name: "Outpatient Department",
        meta: "Monday–Saturday, 8:00 AM – 5:00 PM",
        image: lobbyImg,
        description:
          "Consulting rooms for every clinical and super-speciality department, with registration, billing and pharmacy on the same floor. Wheelchairs and stretchers are available free of charge at the entrance.",
      },
      {
        name: "Inpatient Department",
        meta: "General wards · Private rooms",
        image: operationRoomImg,
        description:
          "Wards and rooms across medical, surgical, paediatric, obstetric and super-speciality units, with central oxygen supply, central suction and nursing cover round the clock.",
      },
      {
        name: "Critical Care",
        meta: "Medical · Surgical · Post-operative ICU",
        description:
          "Intensive care units with ventilator support, multipara monitoring and bedside dialysis capability, staffed by resident doctors at all hours and supported by on-call intensivists.",
      },
      {
        name: "Blood Bank",
        meta: "Licensed · 24×7",
        image: bloodBankImg,
        description:
          "Grouping, cross-matching, component separation and storage, supporting surgical, obstetric and trauma transfusion needs, with voluntary donation drives held on campus.",
      },
      {
        name: "Central Laboratory",
        meta: "Pathology · Biochemistry · Microbiology",
        image: centralLabImg,
        description:
          "An integrated diagnostic laboratory handling several hundred investigations a day, with an emergency panel available round the clock for casualty and intensive care.",
      },
      {
        name: "Radiology",
        meta: "MRI · CT · Ultrasound · X-Ray",
        description:
          "A Siemens Sempra 1.5 Tesla MRI, 50-slice CT scanner, ultrasound with colour Doppler and digital radiography including portable bedside units.",
      },
      {
        name: "Pharmacy",
        meta: "On campus · Extended hours",
        description:
          "An in-house pharmacy stocking the hospital formulary, so inpatients, outpatients and casualty patients can be dispensed medicines without leaving the premises.",
      },
      {
        name: "Cath Lab, Endoscopy & Dialysis",
        meta: "Interventional suites",
        description:
          "A Philips cardiac catheterisation laboratory, an endoscopy and ERCP suite, and a dedicated dialysis unit supporting the cardiology, gastroenterology and nephrology services.",
      },
      {
        name: "Ambulance Service",
        meta: "+91 81794 32491",
        description:
          "Equipped ambulances for emergency transport and inter-facility transfer, coordinated through the casualty department at any hour.",
      },
    ],
    quickLinks: linksExcept("/facilities/hospital"),
    cta: {
      text: "Emergency and casualty services run 24 hours a day, every day of the year.",
      label: "Emergency & Trauma",
      path: "/services/emergency-trauma",
    },
  },

  "/facilities/academic": {
    eyebrow: "Facilities",
    title: "Academic Facilities",
    subtitle:
      "Lecture halls, laboratories, museums, a skill lab and a central library built to the infrastructure standards prescribed by the National Medical Commission.",
    cards: [
      {
        name: "Central Library",
        meta: "Reference · Lending · Reading halls",
        image: libraryImg,
        description:
          "A central medical library holding textbooks, reference works, journals and back volumes across every department, with reading halls for students and separate space for faculty.",
      },
      {
        name: "Digital Library",
        meta: "e-Journals · Online resources",
        description:
          "Networked computer terminals with internet access and subscriptions to electronic journals and databases, so students and faculty can search current literature on campus.",
      },
      {
        name: "Skill Laboratory",
        meta: "Simulation training",
        image: skillLabImg,
        description:
          "Mannequin-based simulation for clinical skills — airway management, resuscitation, suturing, catheterisation and obstetric procedures — practised before students reach the bedside.",
      },
      {
        name: "Lecture Halls",
        meta: "Audio-visual equipped",
        description:
          "Tiered lecture theatres with projection and audio-visual systems, sized for full-batch teaching as required under NMC norms.",
      },
      {
        name: "Pre-Clinical Laboratories",
        meta: "Anatomy · Physiology · Biochemistry",
        image: anatomyLabImg,
        description:
          "Dissection halls with an adequate cadaver supply, histology and osteology facilities, and practical laboratories for physiology and biochemistry.",
      },
      {
        name: "Para-Clinical & Clinical Laboratories",
        meta: "Pathology · Pharmacology · Microbiology",
        image: physiologyLabImg,
        description:
          "Departmental practical laboratories equipped for microscopy, staining, culture work and experimental pharmacology teaching.",
      },
      {
        name: "Central Research Laboratory",
        meta: "Shared research facility",
        description:
          "An equipped research facility open to faculty and students across departments for project work, sample analysis and collaborative studies.",
      },
      {
        name: "Museums",
        meta: "Departmental specimen collections",
        description:
          "Anatomy, pathology, forensic medicine, microbiology and community medicine museums with catalogued specimens, models and charts used for teaching and revision.",
      },
      {
        name: "Auditorium",
        meta: "Conferences · CME · Ceremonies",
        image: adminBlockImg,
        description:
          "A full-size auditorium used for continuing medical education, guest lectures, academic conferences, orientation and institutional ceremonies.",
      },
    ],
    quickLinks: linksExcept("/facilities/academic"),
    cta: {
      text: "Each department maintains its own laboratory, museum and teaching resources. Explore them department by department.",
      label: "Browse Departments",
      path: "/departments",
    },
  },

  "/facilities/campus-life": {
    eyebrow: "Facilities",
    title: "Campus Life",
    subtitle:
      "Hostels, food, sport and transport — the everyday infrastructure that keeps a residential medical campus running alongside a working hospital.",
    cards: [
      {
        name: "Hostels",
        meta: "Separate boys' and girls' blocks",
        image: hostelImg,
        description:
          "On-campus residential accommodation with separate blocks for men and women, wardens in residence, round-the-clock security and power backup, within walking distance of the hospital and college.",
      },
      {
        name: "Food Court & Mess",
        meta: "Hygienic · Nominal prices",
        image: messImg,
        description:
          "A hostel mess and a campus food court serving meals through the day at nominal prices, with a hygienic cafeteria available to patients' attendants and visitors as well.",
      },
      {
        name: "Gymnasium & Fitness Centre",
        meta: "Open to students and staff",
        image: gymImg,
        description:
          "An equipped fitness centre on campus — a practical necessity on a course where students keep long and irregular hours.",
      },
      {
        name: "Indoor Stadium",
        meta: "Indoor games",
        image: stadiumImg,
        description:
          "An indoor sports facility used for badminton, basketball and campus tournaments, and for the annual sports meet.",
      },
      {
        name: "Sports & Games",
        meta: "Outdoor and indoor",
        image: tableTennisImg,
        description:
          "Outdoor grounds and indoor facilities including table tennis and carrom, with inter-batch and inter-college competitions held through the year.",
      },
      {
        name: "Transportation",
        meta: "College bus service",
        image: transportImg,
        description:
          "A fleet of college buses running on fixed routes across Hyderabad and the surrounding area for day scholars and staff, with timings aligned to teaching and clinical postings.",
      },
    ],
    quickLinks: linksExcept("/facilities/campus-life"),
    cta: {
      text: "Hostel, mess and transport registration forms are issued by the administrative office at the time of admission.",
      label: "Application Forms",
      path: "/admissions/forms",
    },
  },
};
