export interface TourLocation {
  id: string;
  name: string;
  category: string;
  description: string;
  embedUrl: string;
}

export const CAMPUS_TOUR_LOCATIONS: TourLocation[] = [
  {
    id: "entrance",
    name: "Entrance",
    category: "Campus Grounds",
    description:
      "Main entrance gate and welcoming boulevard of the Arundathi Institute of Medical Sciences campus.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1692341839219!6m8!1m7!1sCAoSLEFGMVFpcFA1cFMyYlJOakJtS1pzY3lER2FWZ3V0a2I2WktpTlY0eWFRZ1F3!2m2!1d17.5950156!2d78.4425636!3f0.07881839346621144!4f3.0245191468489736!5f0.4000000000000002",
  },
  {
    id: "histology-lab",
    name: "Histology Lab",
    category: "Pre-Clinical Labs",
    description:
      "Equipped with high-precision optical microscopes and tissue section study desks for foundational medical training.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1692341948803!6m8!1m7!1sCAoSLEFGMVFpcE96VFVmd2owbTRLSVZhR1oyYjRaSmp6ZnBRaWFwMHJpTkhzLWJS!2m2!1d17.5950156!2d78.4425636!3f355.31598778801214!4f10.761866764611682!5f0.4000000000000002",
  },
  {
    id: "museum",
    name: "Museum",
    category: "Academic Resources",
    description:
      "Extensive anatomical specimen collection, plastinated models, and pathology exhibits supporting medical study.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1692341978989!6m8!1m7!1sCAoSLEFGMVFpcFBiV2NQY1ZWTzZUdEl2YXNzeWpxSFltTVJLajdzQ2NvRHQ1ZGNY!2m2!1d17.5950156!2d78.4425636!3f9.666029771481359!4f6.776624442775741!5f0.4000000000000002",
  },
  {
    id: "dissection-hall",
    name: "Dissection Hall",
    category: "Pre-Clinical Labs",
    description:
      "Spacious, well-ventilated anatomy dissection hall with stainless steel cadaveric stations for human anatomy dissection.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1692342012268!6m8!1m7!1sCAoSLEFGMVFpcE5JUVpBU2c5bWRySTJGMFJaVnJFNjkwaVU4S21kQ3VaSl90WWNI!2m2!1d17.5950156!2d78.4425636!3f358.97821580010145!4f8.859676955209721!5f0.4000000000000002",
  },
  {
    id: "hematology-lab",
    name: "Hematology Lab",
    category: "Diagnostic & Physiology",
    description:
      "Laboratory configured for complete blood profile analysis, cell counts, hemocytometry, and diagnostic exercises.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1692342042305!6m8!1m7!1sCAoSLEFGMVFpcE55c3pSZ1dVdEEzNEZ6TXllMkFoOHBRNUlmcEtaZlFhazhoNlJO!2m2!1d17.5950156!2d78.4425636!3f9.662371320911014!4f8.645862256179328!5f0.4000000000000002",
  },
  {
    id: "biochemistry-lab",
    name: "Bio Chemistry Lab",
    category: "Diagnostic & Physiology",
    description:
      "Fully appointed biochemical investigation benches with colorimeters, centrifuges, and biochemical test arrays.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1692342081554!6m8!1m7!1sCAoSLEFGMVFpcE5fNDNheWFFS3lEekp1UXdrX3pmSVlwRzRnNC1pVFpNTHU4X1Vn!2m2!1d17.5950156!2d78.4425636!3f359.9619375708238!4f7.361325435903495!5f0.4000000000000002",
  },
  {
    id: "skill-lab",
    name: "Skill Lab",
    category: "Clinical Training",
    description:
      "Clinical simulation and basic surgical skills lab equipped with mannequins, cannulation arms, and resuscitation trainers.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1692342102815!6m8!1m7!1sCAoSLEFGMVFpcE5aZUJQUU9ZUVFGdXI4dTVKM0RQdTFvazRrZlNENHMxREtVSnVm!2m2!1d17.5950156!2d78.4425636!3f2.712638335913065!4f9.579690272644811!5f0.4000000000000002",
  },
  {
    id: "clinical-physiology",
    name: "Clinical Physiology",
    category: "Clinical Training",
    description:
      "Dedicated facility for non-invasive human physiology demonstrations including ECG, spirometry, and reflex testing.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1692342151334!6m8!1m7!1sCAoSLEFGMVFpcE1vT1c2NVFRc1BzcFB3VE4wRVJnVU1pTnFtM3lTSXJPUkVrZHVq!2m2!1d17.5950135887427!2d78.4425327245216!3f88.9068812792376!4f14.563212353467009!5f0.7820865974627469",
  },
  {
    id: "lecture-hall",
    name: "Lecture Hall",
    category: "Academic Infrastructure",
    description:
      "Gallery-style stepped auditorium with integrated audiovisual acoustics, smart projector displays, and lecture capture.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1692342200147!6m8!1m7!1sCAoSLEFGMVFpcFBmVENVSEVlUlhIcWpPVEZEbTZ6Unp4dnZJa1dEa3UyVDMtMk9o!2m2!1d17.5950156!2d78.4425636!3f359.65668338107525!4f5.9707329324259035!5f0.4000000000000002",
  },
  {
    id: "library",
    name: "Library",
    category: "Academic Resources",
    description:
      "Central medical library containing thousands of medical textbooks, international journals, digital terminals, and study zones.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1692342246660!6m8!1m7!1sCAoSLEFGMVFpcE1xckFMTktibU1jUExiYmJPcVJ5Rlk5aEVQemF1R2RoZWVOSGt3!2m2!1d17.5950156!2d78.4425636!3f356.5163569431871675!4f10.611403732499554!5f0.4000000000000002",
  },
];
