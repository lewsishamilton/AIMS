export interface TourLocation {
  id: string;
  name: string;
  category: string;
  description: string;
  embedUrl: string;
}

export interface TourSection {
  id: "campus" | "hospital" | "operation-theatre";
  title: string;
  subtitle: string;
  locations: TourLocation[];
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

export const HOSPITAL_TOUR_LOCATIONS: TourLocation[] = [
  {
    id: "hospital-entrance",
    name: "Hospital Entrance",
    category: "Patient Reception",
    description:
      "Main hospital arrival porch and patient entry concourse for Arundathi Institute of Medical Sciences & Hospital.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694683881488!6m8!1m7!1sCAoSLEFGMVFpcE1mazU0ZGJwZkUwa2ljSUNBNGhtaW1MXzRhcWxrcGdNM0FQS1BE!2m2!1d17.59622715646724!2d78.44303249002039!3f264.91827295556055!4f13.054710791780536!5f0.4000000000000002",
  },
  {
    id: "registration",
    name: "Registration & Helpdesk",
    category: "Patient Reception",
    description:
      "Central outpatient registration desks, billing counters, and patient guidance reception.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684098701!6m8!1m7!1sCAoSLEFGMVFpcFAwaTlOT1BkcjBoYkt6Q0xPbGVoV01peUpqYkV1dV9jNTVLRnpC!2m2!1d17.5962424033157!2d78.44294337689526!3f349.39171225139853!4f-3.3440775231421185!5f0.4000000000000002",
  },
  {
    id: "emergency-casualty",
    name: "Emergency / Casualty",
    category: "Critical Care",
    description:
      "24/7 emergency care department equipped for acute resuscitation, trauma stabilization, and immediate triage.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684150556!6m8!1m7!1sCAoSLEFGMVFpcE5Ld1NxS045bWFWc0xfSkdCTTNaLXdPZk9ic1JZdTZ3US1qdzVW!2m2!1d17.59628763468703!2d78.44299858497769!3f263.88!4f1.9599999999999937!5f0.4000000000000002",
  },
  {
    id: "emergency-ward",
    name: "Emergency Ward",
    category: "Critical Care",
    description:
      "Rapid-response observation ward with continuous multi-parameter vital monitors and oxygen delivery systems.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684203125!6m8!1m7!1sCAoSLEFGMVFpcE0wSk0yUnRQN3EzWmE3MVdVS1FIb3FTZmQyQVRlZGQ0MWFCNXFN!2m2!1d17.59626346947462!2d78.44295336958058!3f254.5977260904078!4f-0.341276948560278!5f0.4000000000000002",
  },
  {
    id: "icu",
    name: "Intensive Care Unit (ICU)",
    category: "Critical Care",
    description:
      "High-dependency intensive care unit fitted with invasive ventilators, central telemetry, and dedicated round-the-clock nursing.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684270916!6m8!1m7!1sCAoSLEFGMVFpcE1ac1VOVjl3dVFUMkNVQk41RGVfNUswQkZaZlg0SGNycEZoVVE3!2m2!1d17.59623735154373!2d78.44296033846736!3f91.94749898212213!4f4.996585843204301!5f0.4000000000000002",
  },
  {
    id: "inpatient-pharmacy",
    name: "In-Patient Pharmacy",
    category: "Pharmacy Services",
    description:
      "Dedicated 24-hour institutional pharmacy catering to admitted patients, critical care medications, and surgical packs.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684629033!6m8!1m7!1sCAoSLEFGMVFpcE5PR21sakhwTnp1M3MzQTBOaFhkNXRTUjFzYVBGYUdfcHpmbGJj!2m2!1d17.59626891758757!2d78.4429168274562!3f353.57015465461825!4f4.716099977560617!5f0.4000000000000002",
  },
  {
    id: "outpatient-pharmacy",
    name: "Out-Patient Pharmacy",
    category: "Pharmacy Services",
    description:
      "Comprehensive retail and dispensary pharmacy serving outpatients, visitors, and prescription consultations.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684585389!6m8!1m7!1sCAoSLEFGMVFpcFBXS3N4dV9oZFBpeWZDcmJqZ2pCX3dfcGM0eGZ1aVZrUWZKSE9R!2m2!1d17.59619307311306!2d78.4429799866832!3f168.52504081130252!4f-0.5239580766164806!5f0.4000000000000002",
  },
];

export const OPERATION_THEATRE_LOCATIONS: TourLocation[] = [
  {
    id: "operation-theater-complex",
    name: "OT Complex Corridor",
    category: "Surgical Suites",
    description:
      "Sterile surgical corridor and access zone designed for laminar airflow maintenance and infection control.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684746582!6m8!1m7!1sCAoSLEFGMVFpcE5jSWNQei12ZW5YUzYyRHhISzVxLUJqNmNwM1QtOEVBU1Z3Y0Zw!2m2!1d17.59632415164487!2d78.44294393378136!3f356.08!4f2.1200000000000045!5f0.4000000000000002",
  },
  {
    id: "ot-01",
    name: "Operation Theater - 01",
    category: "Surgical Suites",
    description:
      "Major surgical operating suite with shadowless surgical lights, anesthesia workstation, and electrocautery consoles.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684792200!6m8!1m7!1sCAoSLEFGMVFpcE53WkdqbE1HV2ZOSWhtRk5LQ1J0eWpXUG9LaWZJRWJ0dENLRlNW!2m2!1d17.59639312233272!2d78.44297361708266!3f306.69327933343857!4f-4.208029445029851!5f0.4000000000000002",
  },
  {
    id: "ot-02",
    name: "Operation Theater - 02",
    category: "Surgical Suites",
    description:
      "Specialized operating theatre equipped for laparoscopic, orthopedic, and minimally invasive procedures.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684818860!6m8!1m7!1sCAoSLEFGMVFpcE53WkdqbE1HV2ZOSWhtRk5LQ1J0eWpXUG9LaWZJRWJ0dENLRlNW!2m2!1d17.59639312233272!2d78.44297361708266!3f130.6999969482422!4f0!5f0.7820865974627469",
  },
  {
    id: "ot-03",
    name: "Operation Theater - 03",
    category: "Surgical Suites",
    description:
      "Advanced surgery suite with microsurgical capabilities and dedicated surgical monitoring infrastructure.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684852348!6m8!1m7!1sCAoSLEFGMVFpcE1ZU2dpNmxlbXJlbllGVklKa2ZQZzRZVXZqSFg5aUI1YzAwb1Qy!2m2!1d17.59637194682479!2d78.44295612935937!3f307.57!4f0.7399999999999949!5f0.4000000000000002",
  },
  {
    id: "ot-04",
    name: "Operation Theater - 04",
    category: "Surgical Suites",
    description:
      "Emergency and obstetric operating suite designed for rapid surgical turnaround and immediate patient care.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684891723!6m8!1m7!1sCAoSLEFGMVFpcE1ZU2dpNmxlbXJlbllGVklKa2ZQZzRZVXZqSFg5aUI1YzAwb1Qy!2m2!1d17.59637194682479!2d78.44295612935937!3f128.66905482731568!4f-3.002749411728743!5f0.4000000000000002",
  },
  {
    id: "pre-op-ward",
    name: "Pre-Operative Ward",
    category: "Surgical Suites",
    description:
      "Pre-surgical staging and holding ward where patients undergo surgical prep, pre-medication, and vitals check.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694684953573!6m8!1m7!1sCAoSLEFGMVFpcFBMVEZJZ0t1RHVubVNpai0tWUEwYXNldVRqcWpoUExWcm5GVGNL!2m2!1d17.59632863384073!2d78.44292247551506!3f301.52806181862474!4f11.68720850613849!5f0.4000000000000002",
  },
  {
    id: "post-op-ward",
    name: "Post-Operative Ward",
    category: "Surgical Suites",
    description:
      "Post-anesthesia recovery area offering continuous hemodynamic monitoring and post-operative surgical nursing care.",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!4v1694685330392!6m8!1m7!1sCAoSLEFGMVFpcFBCSFF5ejJnNklkS21LekZJWU01ZmRDMVBPNTFjOW9DM0c3eHA3!2m2!1d17.5963044928024!2d78.44290990906907!3f204.1176695238947!4f2.120418501000458!5f0.4000000000000002",
  },
];

export const VIRTUAL_TOUR_SECTIONS: TourSection[] = [
  {
    id: "campus",
    title: "Campus Tour",
    subtitle:
      "Explore the academic blocks, pre-clinical labs, medical museum, and student learning environments.",
    locations: CAMPUS_TOUR_LOCATIONS,
  },
  {
    id: "hospital",
    title: "Hospital Tour",
    subtitle:
      "Explore patient admission, 24/7 emergency & casualty, intensive care unit, and pharmacy facilities.",
    locations: HOSPITAL_TOUR_LOCATIONS,
  },
  {
    id: "operation-theatre",
    title: "Operation Theatre Complex",
    subtitle:
      "Explore our advanced surgical suites, sterile operating theatres, and pre & post-operative recovery wards.",
    locations: OPERATION_THEATRE_LOCATIONS,
  },
];
