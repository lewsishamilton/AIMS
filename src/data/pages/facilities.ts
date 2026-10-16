import type { StaticPageDef } from "../../components/StaticPage";


const FACILITY_LINKS = [
  { name: "Hospital Facilities", path: "/facilities/hospital" },
  { name: "Academic Facilities", path: "/facilities/academic" },
  { name: "Campus Life", path: "/facilities/campus-life" },
  { name: "Bus Routes & Tracker", path: "/facilities/transport" },
  { name: "Machines & Equipment", path: "/machines-equipment" },
];

const linksExcept = (path: string) =>
  FACILITY_LINKS.filter((l) => l.path !== path);

const CAMPUS_LINKS = [
  { name: "Campus Life", path: "/facilities/campus-life" },
  { name: "Hostel", path: "/facilities/hostel" },
  { name: "Mess", path: "/facilities/mess" },
  { name: "Gym", path: "/facilities/gym" },
  { name: "Indoor Stadium", path: "/facilities/indoor-stadium" },
  { name: "Bus Routes & Tracker", path: "/facilities/transport" },
];

const campusLinksExcept = (path: string) =>
  CAMPUS_LINKS.filter((l) => l.path !== path);

export const FACILITY_PAGES: Record<string, StaticPageDef> = {
  "/facilities/hospital": {
    eyebrow: "Facilities",
    title: "Hospital Facilities",
    subtitle:
      "Arundathi Hospital provides the clinical infrastructure for patient care and for undergraduate teaching — outpatient, inpatient, critical care, diagnostics and pharmacy in a single block.",
    cards: [
      {
        name: "Outpatient Department",
        meta: "Monday–Saturday, 9:00 AM – 4:00 PM",
        description:
          "Consulting rooms for every clinical and super-speciality department, with registration, billing and pharmacy on the same floor. Wheelchairs and stretchers are available free of charge at the entrance.",
      },
      {
        name: "Inpatient Department",
        meta: "General wards · Private rooms",
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
        description:
          "Grouping, cross-matching, component separation and storage, supporting surgical, obstetric and trauma transfusion needs, with voluntary donation drives held on campus.",
      },
      {
        name: "Central Laboratory",
        meta: "Pathology · Biochemistry · Microbiology",
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
      label: "Emergency Care",
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
        description:
          "Dissection halls with an adequate cadaver supply, histology and osteology facilities, and practical laboratories for physiology and biochemistry.",
      },
      {
        name: "Para-Clinical & Clinical Laboratories",
        meta: "Pathology · Pharmacology · Microbiology",
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
        description:
          "On-campus residential accommodation with separate blocks for men and women, wardens in residence, round-the-clock security and power backup, within walking distance of the hospital and college.",
        link: { label: "Explore hostel", path: "/facilities/hostel" },
      },
      {
        name: "Food Court & Mess",
        meta: "Hygienic · Nominal prices",
        description:
          "A hostel mess and a campus food court serving meals through the day at nominal prices, with a hygienic cafeteria available to patients' attendants and visitors as well.",
        link: { label: "Explore mess", path: "/facilities/mess" },
      },
      {
        name: "Gymnasium & Fitness Centre",
        meta: "Open to students and staff",
        description:
          "An equipped fitness centre on campus — a practical necessity on a course where students keep long and irregular hours.",
        link: { label: "Explore gym", path: "/facilities/gym" },
      },
      {
        name: "Indoor Stadium",
        meta: "Indoor games",
        description:
          "An indoor sports facility used for badminton, basketball and campus tournaments, and for the annual sports meet.",
        link: { label: "Explore indoor stadium", path: "/facilities/indoor-stadium" },
      },
      {
        name: "Sports & Games",
        meta: "Outdoor and indoor",
        description:
          "Outdoor grounds and indoor facilities including table tennis and carrom, with inter-batch and inter-college competitions held through the year.",
      },
      {
        name: "Transportation",
        meta: "College bus service",
        description:
          "A fleet of college buses running on fixed routes across Hyderabad and the surrounding area for day scholars and staff, with timings aligned to teaching and clinical postings.",
        link: { label: "View bus routes & tracker", path: "/facilities/transport" },
      },
    ],
    quickLinks: linksExcept("/facilities/campus-life"),
    cta: {
      text: "Hostel, mess and transport registration forms are issued by the administrative office at the time of admission.",
      label: "Application Forms",
      path: "/admissions/forms",
    },
  },
  "/facilities/hostel": {
    eyebrow: "Facilities",
    title: "Hostel",
    subtitle:
      "Safe, comfortable on-campus residences that give students a settled home base through the long years of medical training.",
    sections: [
      {
        title: "A Home on Campus",
        content: [
          "Living on campus places students within walking distance of lecture halls, laboratories and the hospital, so early-morning classes, ward rounds and late clinical postings fit naturally into the day without a long commute.",
          "The hostels are designed to balance privacy with community. Students share their years with batchmates who keep the same schedules and face the same examinations, and many of the friendships formed here last well beyond graduation.",
        ],
        layout: "full",
      },
      {
        title: "Comfort & Amenities",
        bullets: [
          "Furnished rooms with beds, study tables, chairs and storage",
          "Separate residential blocks for men and women",
          "Uninterrupted power and safe drinking water",
          "Wi-Fi connectivity for study and online resources",
          "Common rooms and quiet spaces for group study",
          "Regular housekeeping and maintenance of rooms and common areas",
        ],
      },
      {
        title: "Safety & Supervision",
        bullets: [
          "Resident wardens responsible for student welfare and discipline",
          "Round-the-clock security at hostel entrances",
          "Visitor registration and defined entry timings",
          "Prompt access to medical care at the campus hospital",
          "A clear code of conduct, including a strict anti-ragging policy",
        ],
      },
      {
        title: "Life in Residence",
        content:
          "Beyond the room itself, hostel life brings festivals, cultural evenings, sports and informal study circles. Senior students mentor juniors through their first year, and the residence becomes a supportive community where students look out for one another.",
        layout: "full",
      },
    ],
    quickLinks: campusLinksExcept("/facilities/hostel"),
    cta: {
      text: "Hostel allotment and registration forms are issued by the administrative office at the time of admission.",
      label: "Application Forms",
      path: "/admissions/forms",
    },
  },

  "/facilities/mess": {
    eyebrow: "Facilities",
    title: "Mess",
    subtitle:
      "Hygienic, wholesome meals prepared fresh every day, so students can keep up with a demanding schedule on a balanced diet.",
    sections: [
      {
        title: "Good Food, Every Day",
        content: [
          "Medical training is long and physically demanding, and regular, nutritious meals make a real difference to how students study and work. The mess serves breakfast, lunch, evening snacks and dinner at set times aligned with the academic day.",
          "Menus are planned to offer variety through the week, with a mix of regional and familiar dishes so that students from different parts of the country feel at home at the table.",
        ],
        layout: "full",
      },
      {
        title: "Hygiene & Quality",
        bullets: [
          "Clean, well-maintained kitchen and dining areas",
          "Fresh ingredients sourced and stored under proper conditions",
          "Purified drinking water available throughout the day",
          "Kitchen staff following food-safety and personal-hygiene practices",
          "Periodic inspection of food quality and kitchen standards",
        ],
      },
      {
        title: "Dining Experience",
        bullets: [
          "Spacious dining hall with comfortable seating",
          "Balanced vegetarian and non-vegetarian options",
          "Rotating weekly menu with seasonal variety",
          "Special meals on festivals and campus occasions",
          "A student mess committee that shares feedback on menus and service",
        ],
      },
      {
        title: "More Than a Meal",
        content:
          "The dining hall is one of the busiest gathering places on campus. Between classes and postings, it is where batchmates catch up, plan their week and unwind together — an everyday part of residential life.",
        layout: "full",
      },
    ],
    quickLinks: campusLinksExcept("/facilities/mess"),
    cta: {
      text: "Mess registration is completed along with hostel admission through the administrative office.",
      label: "Application Forms",
      path: "/admissions/forms",
    },
  },

  "/facilities/gym": {
    eyebrow: "Facilities",
    title: "Gym",
    subtitle:
      "A well-equipped fitness centre that helps students and staff stay active, energetic and healthy alongside their academic and clinical work.",
    sections: [
      {
        title: "Fitness for a Demanding Profession",
        content: [
          "Long study hours and clinical postings call for physical stamina as much as academic focus. The campus gym gives students a convenient place to build strength, improve endurance and relieve the stress that comes with a rigorous course.",
          "Being on campus, the fitness centre fits easily into a busy timetable — a short workout before classes or after a day in the wards is always within reach.",
        ],
        layout: "full",
      },
      {
        title: "Equipment",
        bullets: [
          "Cardio machines such as treadmills, cross-trainers and exercise bikes",
          "Strength-training stations and multi-gym equipment",
          "Free weights, dumbbells and benches",
          "Floor space for stretching, mobility and bodyweight exercise",
          "Mats and accessories for warm-up and cool-down routines",
        ],
      },
      {
        title: "A Safe Place to Train",
        bullets: [
          "Well-ventilated, well-lit training area",
          "Regular upkeep and servicing of equipment",
          "Guidance on correct technique and safe use of machines",
          "Defined timings for convenient access",
          "Basic first-aid support, with the campus hospital close at hand",
        ],
      },
      {
        title: "Wellbeing Beyond the Workout",
        content:
          "Regular exercise supports concentration, sleep and overall wellbeing. The gym is part of a wider effort on campus to help students build healthy habits that will serve them throughout their careers in medicine.",
        layout: "full",
      },
    ],
    quickLinks: campusLinksExcept("/facilities/gym"),
    cta: {
      text: "Explore everything that makes up day-to-day life on campus.",
      label: "Campus Life",
      path: "/facilities/campus-life",
    },
  },

  "/facilities/indoor-stadium": {
    eyebrow: "Facilities",
    title: "Indoor Stadium",
    subtitle:
      "A multi-purpose indoor arena for sport, competition and campus events, open to play in every season.",
    sections: [
      {
        title: "Sport Under One Roof",
        content: [
          "The indoor stadium gives students a dedicated space to play, train and compete regardless of the weather. Its multi-purpose court supports a range of indoor games and is one of the liveliest places on campus in the evenings.",
          "Sport is an important counterbalance to the academic load of a medical programme. Time on the court builds fitness, teamwork and a sense of belonging that carries into the classroom and the wards.",
        ],
        layout: "full",
      },
      {
        title: "Games & Activities",
        bullets: [
          "Badminton",
          "Basketball",
          "Volleyball",
          "Fitness drills and team practice sessions",
          "Space for yoga, aerobics and group activities",
        ],
      },
      {
        title: "Facilities",
        bullets: [
          "Marked multi-purpose playing court",
          "Good lighting and ventilation for indoor play",
          "Seating for spectators during matches and events",
          "Changing areas and drinking water",
          "Sports equipment issued for practice and matches",
        ],
      },
      {
        title: "Tournaments & Events",
        content:
          "The stadium hosts inter-batch tournaments, the annual sports meet and inter-collegiate competitions, along with cultural programmes and institutional gatherings. These events bring the whole campus together and give students a chance to represent their batch and their college.",
        layout: "full",
      },
    ],
    quickLinks: campusLinksExcept("/facilities/indoor-stadium"),
    cta: {
      text: "Explore everything that makes up day-to-day life on campus.",
      label: "Campus Life",
      path: "/facilities/campus-life",
    },
  },
};
