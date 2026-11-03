/**
 * Photo archive for the Media Gallery, grouped by what each picture shows.
 *
 * Captions were written from the photographs themselves. `stock(n)` refers to
 * assets/stockImages/aims-campus-NN.webp (already in the project); `gallery(name)`
 * refers to assets/gallery, which holds photos added on 3 Nov 2026. Laboratory
 * photos live on the Laboratories page, not here.
 */

type Mod = { default: string };

const stockMods = import.meta.glob<Mod>("../assets/stockImages/aims-campus-*.webp", { eager: true });
const galleryMods = import.meta.glob<Mod>("../assets/gallery/*.webp", { eager: true });

const pick = (mods: Record<string, Mod>, suffix: string) => {
  const key = Object.keys(mods).find((k) => k.endsWith(suffix));
  if (!key) throw new Error(`[galleryData] missing image: ${suffix}`);
  return mods[key].default;
};
const stock = (n: number) => pick(stockMods, `aims-campus-${String(n).padStart(2, "0")}.webp`);
const gallery = (name: string) => pick(galleryMods, `/${name}.webp`);

export const GALLERY_CATEGORIES = [
  "Community Outreach",
  "Health Days",
  "Celebrations",
  "Sports",
  "Academic Events",
] as const;

export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: GalleryCategory;
  description: string;
}

export const galleryArchive: GalleryPhoto[] = [
  // ── Community Outreach ──
  { id: "ga-01", src: gallery("outreach-phc-health-camp"), category: "Community Outreach", title: "Health Camp at a Primary Health Centre",
    description: "AIMS students and faculty at a Government of Telangana Primary Health Centre in Medchal-Malkajgiri district." },
  { id: "ga-02", src: gallery("outreach-ward-office-venkatapuram-1"), category: "Community Outreach", title: "Health Desk at Ward Office, Venkatapuram",
    description: "Students staffing a health desk with local officials at the GHMC ward office, Venkatapuram." },
  { id: "ga-03", src: gallery("outreach-ward-office-venkatapuram-2"), category: "Community Outreach", title: "Outreach Team at Ward Office, Venkatapuram",
    description: "The AIMS outreach team outside the GHMC ward office, Venkatapuram." },
  { id: "ga-04", src: gallery("outreach-field-visit-group"), category: "Community Outreach", title: "Community Medicine Field Visit",
    description: "Students in white coats during a community medicine field visit." },
  { id: "ga-05", src: gallery("immunisation-oral-drops-infant-1"), category: "Community Outreach", title: "Immunisation Session",
    description: "A doctor giving oral drops to an infant at a community health centre." },
  { id: "ga-06", src: gallery("immunisation-oral-drops-infant-2"), category: "Community Outreach", title: "Students at an Immunisation Session",
    description: "A medical student giving oral drops to an infant under supervision." },
  { id: "ga-07", src: gallery("outreach-anganwadi-centre-visit"), category: "Community Outreach", title: "Visit to an Anganwadi Centre",
    description: "Students with Anganwadi staff and community members." },
  { id: "ga-08", src: gallery("pulse-polio-doorstep-drops"), category: "Community Outreach", title: "Pulse Polio at the Doorstep",
    description: "A student giving oral polio drops to a child during a house-to-house drive." },
  { id: "ga-09", src: gallery("pulse-polio-finger-marking"), category: "Community Outreach", title: "Pulse Polio Finger Marking",
    description: "Students marking a child's finger after giving polio drops." },
  { id: "ga-10", src: stock(23), category: "Community Outreach", title: "Door-to-Door Health Survey",
    description: "Students recording household details during a community survey." },
  { id: "ga-11", src: stock(42), category: "Community Outreach", title: "Household Survey, Domara Pocham Pally",
    description: "A student interviewing a resident during a household health survey." },
  { id: "ga-12", src: stock(43), category: "Community Outreach", title: "Household Survey, Dundigal",
    description: "Recording a household's health history at the doorstep in Dundigal." },
  { id: "ga-13", src: stock(44), category: "Community Outreach", title: "Mother and Child Survey, Dundigal",
    description: "A student noting a mother and child's details during a field survey in Dundigal." },
  { id: "ga-14", src: stock(26), category: "Community Outreach", title: "School Health Education",
    description: "A student leading a health education session for schoolchildren." },
  { id: "ga-15", src: stock(48), category: "Community Outreach", title: "Community Health Awareness Session",
    description: "A health talk for local women by AIMS students." },

  // ── Health Days ──
  { id: "ga-16", src: stock(7), category: "Health Days", title: "World Health Day 2026 Quiz",
    description: "Organisers of the nationwide quiz contest for MBBS students on World Health Day 2026." },
  { id: "ga-17", src: stock(11), category: "Health Days", title: "World Health Day 2026 Quiz Team",
    description: "Faculty and students with the World Health Day 2026 quiz banner." },
  { id: "ga-18", src: stock(14), category: "Health Days", title: "World Health Day Quiz Audience",
    description: "Participants filling the hall for the World Health Day 2026 quiz." },
  { id: "ga-58", src: stock(6), category: "Health Days", title: "World Health Day Quiz in the Auditorium",
    description: "Quiz participants with the World Health Day 2026 banner in the auditorium." },
  { id: "ga-19", src: stock(8), category: "Health Days", title: "World Tuberculosis Day 2026 Poster",
    description: "Students presenting a poster on duties as a person for World Tuberculosis Day 2026." },
  { id: "ga-20", src: stock(13), category: "Health Days", title: "World TB Day Poster Presentation",
    description: "A student-made World Tuberculosis Day 2026 poster on TB elimination goals." },
  { id: "ga-21", src: stock(9), category: "Health Days", title: "Drug Control & Regulatory Strengthening Day",
    description: "“Praja Palana – Pragathi Pranalika” programme on 11 April 2026." },
  { id: "ga-22", src: stock(12), category: "Health Days", title: "Drug Control Day Participants",
    description: "Faculty and students at the Drug Control and Regulatory Strengthening Day, 11 April 2026." },
  { id: "ga-23", src: stock(10), category: "Health Days", title: "Drug Control Day Address",
    description: "A speaker on the themes “Say No to Drugs” and antimicrobial resistance." },
  { id: "ga-24", src: stock(17), category: "Health Days", title: "Talk on Antimicrobial Resistance",
    description: "A session during the Drug Control and Regulatory Strengthening Day." },
  { id: "ga-25", src: stock(37), category: "Health Days", title: "World AIDS Day",
    description: "Students and faculty with the World AIDS Day banner in front of the institute." },
  { id: "ga-26", src: stock(32), category: "Health Days", title: "World AIDS Day Assembly",
    description: "The AIMS community gathered outside the institute on World AIDS Day." },
  { id: "ga-27", src: stock(33), category: "Health Days", title: "World AIDS Day Group",
    description: "World AIDS Day group photograph in front of the main block." },
  { id: "ga-28", src: stock(36), category: "Health Days", title: "Health Awareness Poster Exhibition",
    description: "Students displaying awareness posters in the atrium." },
  { id: "ga-29", src: stock(41), category: "Health Days", title: "Poster Exhibition in the Atrium",
    description: "Student posters on display across the atrium." },
  { id: "ga-30", src: stock(38), category: "Health Days", title: "Exhibition Walkthrough",
    description: "Guests viewing student exhibits during an awareness day." },

  // ── Celebrations ──
  { id: "ga-31", src: stock(19), category: "Celebrations", title: "Bathukamma Celebrations",
    description: "Faculty and students around the Bathukamma in the atrium." },
  { id: "ga-32", src: stock(18), category: "Celebrations", title: "Bathukamma in the Atrium",
    description: "Floral Bathukamma arrangements at the centre of the celebration." },
  { id: "ga-33", src: stock(22), category: "Celebrations", title: "Bathukamma Gathering",
    description: "Faculty and staff in traditional attire for Bathukamma." },
  { id: "ga-34", src: stock(21), category: "Celebrations", title: "Bathukamma Dance",
    description: "Students dancing around the Bathukamma." },
  { id: "ga-35", src: stock(24), category: "Celebrations", title: "Festive Dance in the Atrium",
    description: "Students in traditional dress dancing during the festival." },
  { id: "ga-36", src: stock(31), category: "Celebrations", title: "Traditional Day",
    description: "Students in traditional attire and white coats in front of the institute." },
  { id: "ga-37", src: stock(28), category: "Celebrations", title: "Traditional Day Group",
    description: "Traditional Day group photograph." },
  { id: "ga-38", src: stock(25), category: "Celebrations", title: "Deepavali on Campus",
    description: "Students celebrating Deepavali in front of the institute." },
  { id: "ga-39", src: stock(27), category: "Celebrations", title: "Holi on Campus",
    description: "Students playing with colours on the campus grounds." },
  { id: "ga-40", src: stock(35), category: "Celebrations", title: "Cultural Programme on the Lawn",
    description: "Faculty, guests and performers at an open-air cultural programme." },
  { id: "ga-41", src: gallery("trishna-2k26-jayanthika-raj-felicitation"), category: "Celebrations", title: "TRISHNA 2K26: Topper Felicitation",
    description: "Jayanthika Raj receiving her academic topper award at TRISHNA 2K26." },
  { id: "ga-42", src: gallery("trishna-2k26-awardees-on-stage"), category: "Celebrations", title: "TRISHNA 2K26 Annual Day",
    description: "Faculty and awardees on stage at TRISHNA 2K26." },

  // ── Sports ──
  { id: "ga-43", src: stock(1), category: "Sports", title: "Women's Team",
    description: "AIMS women's team in competition jerseys." },
  { id: "ga-44", src: stock(3), category: "Sports", title: "Women's Team at AMET",
    description: "AIMS women's team at the Academy of Maritime Education and Training." },
  { id: "ga-45", src: stock(5), category: "Sports", title: "Inter-College Cricket",
    description: "Cricket players and officials at the welcome for an inter-college tournament." },
  { id: "ga-46", src: stock(2), category: "Sports", title: "Cricket Team Briefing",
    description: "Officials addressing the cricket teams on the ground." },
  { id: "ga-47", src: stock(4), category: "Sports", title: "Football Team",
    description: "AIMS football players at the goalpost." },

  // ── Academic Events ──
  { id: "ga-48", src: gallery("competition-winners-medals"), category: "Academic Events", title: "Competition Winners",
    description: "Students with their medals and certificates." },
  { id: "ga-49", src: gallery("competition-winners-certificates"), category: "Academic Events", title: "Certificate Recipients",
    description: "Two students with their certificates." },
  { id: "ga-50", src: stock(30), category: "Academic Events", title: "Welcome Programme",
    description: "Faculty and students at a welcome programme on stage." },
  { id: "ga-51", src: stock(29), category: "Academic Events", title: "Event in the Auditorium",
    description: "Students and faculty seated in the main auditorium." },
  { id: "ga-52", src: stock(34), category: "Academic Events", title: "Auditorium Programme",
    description: "A full house in the auditorium." },
  { id: "ga-53", src: stock(39), category: "Academic Events", title: "Lecture Hall Session",
    description: "Students attending a session in the lecture hall." },
  { id: "ga-54", src: stock(40), category: "Academic Events", title: "Gathering in the Lecture Theatre",
    description: "Students assembled in the tiered lecture theatre." },
  { id: "ga-55", src: stock(16), category: "Academic Events", title: "Students in the Atrium",
    description: "Students in white coats gathered in the atrium." },
  { id: "ga-56", src: stock(20), category: "Academic Events", title: "Atrium Assembly",
    description: "Students in white coats assembled in the atrium." },
  { id: "ga-57", src: stock(15), category: "Academic Events", title: "AIMS Students and Faculty",
    description: "Students and faculty in front of the institute." },
];
