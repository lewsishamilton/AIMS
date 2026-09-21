import React, { useState, useEffect } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

// Import real campus images from stock assets
import img01 from "../assets/stockImages/aims-campus-07.jpeg";
import img02 from "../assets/stockImages/aims-campus-15.jpeg";
import img03 from "../assets/stockImages/aims-campus-47.jpeg";
import img04 from "../assets/stockImages/aims-campus-41.jpeg";
import img05 from "../assets/stockImages/aims-campus-19.jpeg";
import img06 from "../assets/stockImages/aims-campus-38.jpeg";
import img07 from "../assets/stockImages/aims-campus-37.jpeg";
import img08 from "../assets/stockImages/aims-campus-03.jpeg";
import img09 from "../assets/stockImages/aims-campus-35.jpeg";
import img10 from "../assets/stockImages/aims-campus-21.jpeg";
import img11 from "../assets/stockImages/aims-campus-31.jpeg";
import img12 from "../assets/stockImages/aims-campus-48.jpeg";

const photos = [
  { src: img01, title: "Main Campus Entrance" },
  { src: img02, title: "Grand Medical Auditorium" },
  { src: img03, title: "Microscopy Research Wing" },
  { src: img04, title: "Anatomy Dissection Arena" },
  { src: img05, title: "Central Reference Library" },
  { src: img06, title: "Clinical Pathology Suite" },
  { src: img07, title: "Biochemistry Laboratory" },
  { src: img08, title: "Campus Green Promenade" },
  { src: img09, title: "Indoor Recreation Arena" },
  { src: img10, title: "Modern Gymnasium" },
];

const marqueePhotos = [...photos, ...photos];

export interface EventItem {
  id: string;
  title: string;
  category: string;
  src: string;
  description: string;
  /** flex weight (relative width) and height fraction of the row */
  w?: number;
  h?: number;
}

// Diamond collage: rows taper in width (see collageRowShape) so the block's outline
// reads as a diamond instead of a filled rectangle.
const collageRows: EventItem[][] = [
  [
    { id: "ev-01", title: "Academic Poster Day & Student Life", category: "Student Life", src: img11, w: 1.1, h: 0.96,
      description: "Medical students showcasing research posters and public health innovations during campus health week." },
    { id: "ev-02", title: "Scholars Interactive Study Circle", category: "Academics", src: img05, w: 1.5, h: 1,
      description: "Collaborative study groups, peer learning, and research literature reviews in the central reference library." },
  ],
  [
    { id: "ev-03", title: "Dean's Honors & Scholar Awards", category: "Ceremony", src: img06, w: 0.85, h: 0.94,
      description: "Celebrating institutional academic awards, clinical merit badges, and university honors." },
    { id: "ev-04", title: "Campus Entrance & Main Promenade", category: "Campus", src: img01, w: 1.15, h: 0.97,
      description: "Students, faculty, and visiting clinical delegates congregating at the architectural main gates." },
    { id: "ev-05", title: "Hands-on Practical & Dissection Arena", category: "Clinical Lab", src: img04, w: 1.4, h: 1,
      description: "Intensive clinical osteology and anatomical practical demonstration under senior surgeon mentorship." },
    { id: "ev-06", title: "Campus Green Promenade Pathway", category: "Outreach", src: img08, w: 0.85, h: 0.94,
      description: "Students walking through tree-lined pathways connecting clinical hospital wings and lecture halls." },
  ],
  [
    { id: "ev-07", title: "Pine Grove Contemplation Walk", category: "Campus Life", src: img10, w: 1.1, h: 0.97,
      description: "Peaceful moments between clinical rotations surrounded by campus pine trees and nature." },
    { id: "ev-08", title: "Grand Portico Gateway", category: "Architecture", src: img02, w: 1, h: 0.9,
      description: "Morning light over the grand architectural arches and medical auditorium portico." },
    { id: "ev-09", title: "Rural Outreach Care", category: "Community Camp", src: img12, w: 0.95, h: 0.94,
      description: "Field doctors and volunteers conducting community health surveys in local health camps." },
  ],
  [
    { id: "ev-10", title: "Microscopy & Fluorescence Assay", category: "Research", src: img03, w: 1.3, h: 1,
      description: "Deep molecular biology and advanced fluorescent microscopy diagnostic assays." },
    { id: "ev-11", title: "Distinguished Medical Graduates", category: "Convocation", src: img07, w: 1, h: 0.95,
      description: "Graduating medical cohort gathered in formal suits and ceremonial regalia on convocation day." },
    { id: "ev-12", title: "Collegiate Sports & Recreation Meet", category: "Sports Fest", src: img09, w: 1.1, h: 0.97,
      description: "Inter-departmental indoor tournament, team sportsmanship, and student recreation championship." },
  ],
];

// Diamond silhouette: narrow top, widening to a full-width peak, then tapering tail. [height, width] per row.
const collageRowShape: [string, string][] = [
  ["clamp(150px, 19vw, 210px)", "58%"],
  ["clamp(200px, 28vw, 320px)", "100%"],
  ["clamp(180px, 23vw, 260px)", "82%"],
  ["clamp(160px, 20vw, 220px)", "62%"],
];

const allCollageItems: EventItem[] = collageRows.flat();

// ─── Direct Imports from src/assets/clg-imgs (strictly authentic folder structures) ───
// Administration Block (5 images)
import admin1 from "../assets/clg-imgs/administration block/1.png";
import admin2 from "../assets/clg-imgs/administration block/2.png";
import admin3 from "../assets/clg-imgs/administration block/3.png";
import admin4 from "../assets/clg-imgs/administration block/4.png";
import admin5 from "../assets/clg-imgs/administration block/5.png";

// Skill Lab (4 images)
import skill1 from "../assets/clg-imgs/skills/1.png";
import skill2 from "../assets/clg-imgs/skills/2.png";
import skill3 from "../assets/clg-imgs/skills/3.png";
import skill4 from "../assets/clg-imgs/skills/4.png";

// Physiology (3 images)
import phys1 from "../assets/clg-imgs/pysiology/1.png";
import phys2 from "../assets/clg-imgs/pysiology/2.png";
import phys3 from "../assets/clg-imgs/pysiology/3.png";

// MEU (3 images)
import meu1 from "../assets/clg-imgs/MEU/1.png";
import meu2 from "../assets/clg-imgs/MEU/2.png";
import meu3 from "../assets/clg-imgs/MEU/3.png";

// Central Library (4 images)
import lib1 from "../assets/clg-imgs/central library/1.jpg";
import lib2 from "../assets/clg-imgs/central library/2.jpg";
import lib3 from "../assets/clg-imgs/central library/3.jpg";
import lib4 from "../assets/clg-imgs/central library/4.jpg";

// Anatomy (5 images)
import anat1 from "../assets/clg-imgs/Anatomy/1.png";
import anat2 from "../assets/clg-imgs/Anatomy/2.png";
import anat3 from "../assets/clg-imgs/Anatomy/3.png";
import anat5 from "../assets/clg-imgs/Anatomy/5.png";
import anat6 from "../assets/clg-imgs/Anatomy/6.png";

// Operation Room (7 images)
import or1 from "../assets/clg-imgs/Operation Room/1.png";
import or2 from "../assets/clg-imgs/Operation Room/2.png";
import or3 from "../assets/clg-imgs/Operation Room/3.png";
import or4 from "../assets/clg-imgs/Operation Room/4.png";
import or5 from "../assets/clg-imgs/Operation Room/5.png";
import or6 from "../assets/clg-imgs/Operation Room/6.png";
import or7 from "../assets/clg-imgs/Operation Room/7.png";

// Blood Bank (4 images)
import bb1 from "../assets/clg-imgs/Blood Bank/1.png";
import bb2 from "../assets/clg-imgs/Blood Bank/2.png";
import bb3 from "../assets/clg-imgs/Blood Bank/3.png";
import bbOt from "../assets/clg-imgs/Blood Bank/ot-picture-SLS05934.jpg";

// Central Lab (3 images)
import cl1 from "../assets/clg-imgs/Central Lab/1.png";
import cl2 from "../assets/clg-imgs/Central Lab/2.png";
import cl3 from "../assets/clg-imgs/Central Lab/3.png";

// Lobby (9 images)
import lobby1 from "../assets/clg-imgs/Lobby/1.png";
import lobby2 from "../assets/clg-imgs/Lobby/2.png";
import lobby3 from "../assets/clg-imgs/Lobby/3.png";
import lobby4 from "../assets/clg-imgs/Lobby/4.png";
import lobby5 from "../assets/clg-imgs/Lobby/5.png";
import lobby6 from "../assets/clg-imgs/Lobby/6.png";
import lobby7 from "../assets/clg-imgs/Lobby/7.png";
import lobby8 from "../assets/clg-imgs/Lobby/8.png";
import lobby9 from "../assets/clg-imgs/Lobby/9.png";

export interface ArenaSectionData {
  id: string;
  title: string;
  category: string;
  group: "academic" | "hospital";
  description: string;
  direction: "ltr" | "rtl";
  images: string[];
}

const arenaSections: ArenaSectionData[] = [
  {
    id: "admin-block",
    title: "Administration Block",
    category: "Campus Infrastructure",
    group: "academic",
    description: "Administrative offices, deanery, student affairs, and executive governance suites.",
    direction: "ltr",
    images: [admin1, admin2, admin3, admin4, admin5],
  },
  {
    id: "skill-lab",
    title: "Skill Lab",
    category: "Clinical Simulation",
    group: "academic",
    description: "Hands-on medical simulation lab equipped with high-fidelity task trainers and clinical practice models.",
    direction: "rtl",
    images: [skill1, skill2, skill3, skill4],
  },
  {
    id: "physiology",
    title: "Physiology",
    category: "Pre-Clinical Department",
    group: "academic",
    description: "Physiology teaching laboratories for clinical examinations, hematology experiments, and practical learning.",
    direction: "ltr",
    images: [phys1, phys2, phys3],
  },
  {
    id: "meu",
    title: "M E U",
    category: "Medical Education Unit",
    group: "academic",
    description: "Medical Education Unit dedicated to continuous faculty development, curriculum design, and medical pedagogy.",
    direction: "rtl",
    images: [meu1, meu2, meu3],
  },
  {
    id: "central-library",
    title: "Central Library",
    category: "Academic Resource",
    group: "academic",
    description: "Multi-tiered knowledge repository with digital journals, reference treatises, and quiet study areas.",
    direction: "ltr",
    images: [lib1, lib2, lib3, lib4],
  },
  {
    id: "anatomy",
    title: "Anatomy",
    category: "Pre-Clinical Department",
    group: "academic",
    description: "Comprehensive anatomy museum, histology practical lab, and modern cadaveric dissection arena.",
    direction: "rtl",
    images: [anat1, anat2, anat3, anat5, anat6],
  },
  {
    id: "operation-room",
    title: "Operation Room",
    category: "Surgical Complex",
    group: "hospital",
    description: "State-of-the-art modular surgical suites with laminar airflow and advanced surgical infrastructure.",
    direction: "ltr",
    images: [or1, or2, or3, or4, or5, or6, or7],
  },
  {
    id: "blood-bank",
    title: "Blood Bank",
    category: "Transfusion Services",
    group: "hospital",
    description: "24/7 licensed blood transfusion center with component separation and cryopreservation units.",
    direction: "rtl",
    images: [bb1, bb2, bb3, bbOt],
  },
  {
    id: "central-lab",
    title: "Central Lab",
    category: "Diagnostic Services",
    group: "hospital",
    description: "Fully automated central diagnostic laboratory operating 24/7 for inpatient and emergency investigations.",
    direction: "ltr",
    images: [cl1, cl2, cl3],
  },
  {
    id: "lobby",
    title: "Lobby",
    category: "Patient Atrium",
    group: "hospital",
    description: "Welcoming, spacious patient reception, registration atrium, and visitor lounge at Arundathi Hospital.",
    direction: "rtl",
    images: [lobby1, lobby2, lobby3, lobby4, lobby5, lobby6, lobby7, lobby8, lobby9],
  },
];

const createMarqueeItems = (images: string[]) => {
  if (!images || images.length === 0) return [];
  let base = [...images];
  while (base.length < 8) {
    base = [...base, ...images];
  }
  return [...base, ...base];
};

export const MediaGalleryPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [activeGalleryList, setActiveGalleryList] = useState<EventItem[]>(allCollageItems);

  const handlePrevEvent = () => {
    if (!selectedEvent) return;
    const currentIndex = activeGalleryList.findIndex((e) => e.id === selectedEvent.id);
    const prevIndex = (currentIndex - 1 + activeGalleryList.length) % activeGalleryList.length;
    setSelectedEvent(activeGalleryList[prevIndex]);
  };

  const handleNextEvent = () => {
    if (!selectedEvent) return;
    const currentIndex = activeGalleryList.findIndex((e) => e.id === selectedEvent.id);
    const nextIndex = (currentIndex + 1) % activeGalleryList.length;
    setSelectedEvent(activeGalleryList[nextIndex]);
  };

  useEffect(() => {
    if (!selectedEvent) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedEvent(null);
      if (e.key === "ArrowLeft") handlePrevEvent();
      if (e.key === "ArrowRight") handleNextEvent();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEvent, activeGalleryList]);

  // Reusable Photo Card with subtly increased border curve and fluid hover interactions
  const renderPhotoCard = (item: EventItem) => (
    <div
      key={item.id}
      onClick={() => {
        setActiveGalleryList(allCollageItems);
        setSelectedEvent(item);
      }}
      style={{ "--w": item.w ?? 1, "--h": item.h ?? 1 } as React.CSSProperties}
      className="collage-item group cursor-pointer overflow-hidden rounded-[10px] sm:rounded-[14px] bg-white dark:bg-slate-900/60 border border-[#e2e8f0]/90 dark:border-white/15 shadow-[0_2px_10px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_24px_50px_rgba(22,39,64,0.28)] dark:hover:shadow-[0_24px_50px_rgba(0,0,0,0.6)] select-none"
    >
      <img
        src={item.src}
        alt={item.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] scale-[1.08] group-hover:scale-100"
      />

      {/* Fluid Dark Gradient Overlay on Hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a]/90 via-[#0b172a]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />

      {/* Expand Icon */}
      <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 ease-out">
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/30 backdrop-blur-md text-white border border-white/30 shadow-xs">
          <Maximize2 className="w-3 h-3" />
        </span>
      </div>

      {/* Bottom Caption Reveal */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10 flex flex-col gap-0.5">
        <span className="inline-flex items-center self-start px-1.5 py-0.5 rounded-full text-[8.5px] sm:text-[9.5px] font-semibold tracking-wider text-white uppercase bg-white/20 backdrop-blur-md border border-white/25">
          {item.category}
        </span>
        <h3 className="font-['Manrope',sans-serif] text-[11px] sm:text-sm font-bold leading-tight text-white drop-shadow-sm line-clamp-1">
          {item.title}
        </h3>
        <p className="hidden md:block text-[11px] leading-snug text-white/80 line-clamp-2 max-w-[42ch] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150 ease-out">
          {item.description}
        </p>
      </div>
    </div>
  );

  // Reusable Photo Card for Arena Sections with Auto Infinite Marquee
  const renderArenaRow = (section: ArenaSectionData) => {
    const marqueeCards = createMarqueeItems(section.images);
    const isLtr = section.direction === "ltr";

    return (
      <div key={section.id} className="w-full overflow-hidden">
        {/* Row Header */}
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-5 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-1.5">
            <span className="w-5 sm:w-6 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
              {section.category}
            </span>
            <span className="w-5 sm:w-6 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
          </div>
          <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl md:text-3xl font-bold text-[#162740] dark:text-white tracking-tight">
            {section.title}
          </h3>
        </div>

        {/* Infinite Scrolling Track */}
        <div className="w-full overflow-hidden">
          <div
            className="flex w-max gap-3.5 sm:gap-4 lg:gap-5 py-2 hover:[animation-play-state:paused]"
            style={{
              animation: `${isLtr ? "arenaMarqueeLtr" : "arenaMarqueeRtl"} ${section.images.length * 6 > 30 ? section.images.length * 6 : 32
                }s linear infinite`,
            }}
          >
            {marqueeCards.map((imgSrc, idx) => {
              const originalIndex = idx % section.images.length;
              return (
                <div
                  key={`${section.id}-${idx}`}
                  onClick={() => {
                    const sectionEventItems: EventItem[] = section.images.map((src, i) => ({
                      id: `${section.id}-${i}`,
                      title: `${section.title} (Photo ${i + 1} of ${section.images.length})`,
                      category: section.category,
                      src,
                      description: section.description,
                    }));
                    setActiveGalleryList(sectionEventItems);
                    setSelectedEvent(sectionEventItems[originalIndex]);
                  }}
                  className="relative shrink-0 w-[260px] sm:w-[320px] md:w-[360px] h-[175px] sm:h-[210px] md:h-[235px] rounded-[16px] sm:rounded-[20px] overflow-hidden border border-[#dce8ee] dark:border-white/15 bg-white dark:bg-slate-900/60 shadow-[0_3px_12px_rgba(8,44,76,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_14px_30px_rgba(8,44,76,0.18)] transition-all duration-300 cursor-pointer group hover:-translate-y-1 select-none"
                >
                  <img
                    src={imgSrc}
                    alt={`${section.title} - ${originalIndex + 1}`}
                    loading="lazy"
                    draggable={false}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Hover Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a]/85 via-[#0b172a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[16px] sm:rounded-[20px]" />

                  {/* Hover Details & Expand Icon */}
                  <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center justify-between z-10">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/25 mb-1">
                        {section.category}
                      </span>
                      <h4 className="font-['Manrope',sans-serif] text-xs sm:text-sm font-bold text-white leading-snug drop-shadow-sm">
                        {section.title} #{originalIndex + 1}
                      </h4>
                    </div>
                    <span className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-xs group-hover:scale-110 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#FAF9F5] dark:bg-transparent min-h-screen pt-20 sm:pt-24 transition-colors duration-300">
      {/* Header matching reference screenshot styling with common home page palette */}
      <div className="text-center max-w-4xl mx-auto pt-2 sm:pt-4 pb-0 px-4 relative z-30">
        <div className="inline-flex items-center justify-center gap-3 mb-2">
          <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
            MEDIA GALLERY
          </span>
          <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
        </div>

        <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight text-[#162740] dark:text-white leading-[1.04] mb-2">
          EXPLORING AIMS CAMPUS
        </h1>

        <p className="text-[#596d86] dark:text-slate-300 text-sm sm:text-base lg:text-lg font-normal leading-tight">
          Interactions, Campus Architecture &amp; Medical Excellence
        </p>
      </div>

      {/* 3D Illusion Slider Section: infinite continuous loop */}
      <section className="relative w-full bg-[#FAF9F5] dark:bg-transparent overflow-hidden pb-0 -mt-10 sm:-mt-14 lg:-mt-16">
        {/* Top Solid Curved Overlay */}
        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none w-full h-[58px] sm:h-[80px] lg:h-[100px] overflow-hidden">
          <svg
            viewBox="0 0 804 50.167"
            preserveAspectRatio="none"
            className="w-full h-full block dark:hidden"
          >
            <path
              className="fill-[#FAF9F5]"
              d="M804,0v16.671c0,0-204.974,33.496-401.995,33.496C204.974,50.167,0,16.671,0,16.671V0H804z"
            />
          </svg>

          {/* In dark mode: matches the page background seamlessly using fixed attachment and curve mask */}
          <div
            className="hidden dark:block w-full h-full"
            style={{
              backgroundColor: "#060b14",
              backgroundImage: `
                radial-gradient(ellipse 85% 45% at 50% -5%, rgba(20, 184, 166, 0.16), transparent 60%),
                radial-gradient(ellipse 65% 50% at 95% 30%, rgba(13, 148, 136, 0.12), transparent 55%),
                radial-gradient(ellipse 70% 55% at 5% 55%, rgba(20, 184, 166, 0.10), transparent 60%),
                radial-gradient(ellipse 80% 60% at 85% 75%, rgba(31, 51, 81, 0.45), transparent 65%),
                radial-gradient(ellipse 60% 40% at 50% 100%, rgba(45, 212, 191, 0.08), transparent 60%),
                linear-gradient(180deg, #070e1c 0%, #050913 35%, #060b17 70%, #040812 100%)
              `,
              backgroundAttachment: "fixed",
              maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 804 50.167' preserveAspectRatio='none'%3E%3Cpath fill='%23000' d='M804,0v16.671c0,0-204.974,33.496-401.995,33.496C204.974,50.167,0,16.671,0,16.671V0H804z'/%3E%3C/svg%3E")`,
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 804 50.167' preserveAspectRatio='none'%3E%3Cpath fill='%23000' d='M804,0v16.671c0,0-204.974,33.496-401.995,33.496C204.974,50.167,0,16.671,0,16.671V0H804z'/%3E%3C/svg%3E")`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </div>

        {/* Flat Photos Slider with Never-Ending Infinite Loop */}
        <div className="w-full overflow-hidden">
          <div
            className="
              flex
              w-max
              gap-[3px]
              sm:gap-[4px]
              animate-marquee
              hover:[animation-play-state:paused]
            "
            style={{
              animation: "galleryInfiniteMarquee 38s linear infinite",
            }}
          >
            {marqueePhotos.map((photo, index) => (
              <div
                key={index}
                className="
                  relative
                  shrink-0
                  w-[calc(100vw-32px)]
                  sm:w-[440px]
                  lg:w-[480px]
                  h-[calc((100vw-32px)*1.26)]
                  sm:h-[510px]
                  lg:h-[560px]
                  overflow-hidden
                  rounded-none
                "
              >
                <img
                  src={photo.src}
                  alt={photo.title || `Photo ${(index % photos.length) + 1}`}
                  draggable={false}
                  className="
                    block
                    h-full
                    w-full
                    select-none
                    object-cover
                  "
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Solid Curved Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none w-full h-[58px] sm:h-[80px] lg:h-[100px] overflow-hidden">
          <svg
            viewBox="0 0 804 50.167"
            preserveAspectRatio="none"
            className="w-full h-full block dark:hidden rotate-180"
          >
            <path
              className="fill-[#FAF9F5]"
              d="M804,0v16.671c0,0-204.974,33.496-401.995,33.496C204.974,50.167,0,16.671,0,16.671V0H804z"
            />
          </svg>

          {/* In dark mode: matches the page background seamlessly using fixed attachment and curve mask */}
          <div
            className="hidden dark:block w-full h-full rotate-180"
            style={{
              backgroundColor: "#060b14",
              backgroundImage: `
                radial-gradient(ellipse 85% 45% at 50% -5%, rgba(20, 184, 166, 0.16), transparent 60%),
                radial-gradient(ellipse 65% 50% at 95% 30%, rgba(13, 148, 136, 0.12), transparent 55%),
                radial-gradient(ellipse 70% 55% at 5% 55%, rgba(20, 184, 166, 0.10), transparent 60%),
                radial-gradient(ellipse 80% 60% at 85% 75%, rgba(31, 51, 81, 0.45), transparent 65%),
                radial-gradient(ellipse 60% 40% at 50% 100%, rgba(45, 212, 191, 0.08), transparent 60%),
                linear-gradient(180deg, #070e1c 0%, #050913 35%, #060b17 70%, #040812 100%)
              `,
              backgroundAttachment: "fixed",
              maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 804 50.167' preserveAspectRatio='none'%3E%3Cpath fill='%23000' d='M804,0v16.671c0,0-204.974,33.496-401.995,33.496C204.974,50.167,0,16.671,0,16.671V0H804z'/%3E%3C/svg%3E")`,
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 804 50.167' preserveAspectRatio='none'%3E%3Cpath fill='%23000' d='M804,0v16.671c0,0-204.974,33.496-401.995,33.496C204.974,50.167,0,16.671,0,16.671V0H804z'/%3E%3C/svg%3E")`,
              maskSize: "100% 100%",
              WebkitMaskSize: "100% 100%",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
            }}
          />
        </div>
      </section>

      {/* Events Section: Artistic Diamond Collage (Format of Attached Reference Photo) */}
      <section className="relative pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 bg-[#FAF9F5] dark:bg-transparent border-t border-[#e2e8f0]/80 dark:border-white/10 overflow-hidden">
        {/* Subtle Background Radial Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
                CAMPUS HAPPENINGS
              </span>
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
            </div>

            <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#162740] dark:text-white tracking-tight leading-tight mb-3.5">
              Events
            </h2>

            <p className="text-[#596d86] dark:text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
              A curated collage of academic symposiums, hands-on clinical workshops, annual convocations, and student life at AIMS.
            </p>
          </div>

          {/* Diamond Collage: rows taper in width to form a diamond silhouette */}
          <div className="flex flex-col gap-1.5 sm:gap-2 max-w-[1080px] mx-auto select-none">
            {collageRows.map((row, i) => (
              <div key={i} className="collage-row" style={{ "--row-h": collageRowShape[i][0], "--row-w": collageRowShape[i][1] } as React.CSSProperties}>
                {row.map(renderPhotoCard)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Gallery Arena Section: Welcome to Gallery Arena of AIMS ─── */}
      <section className="relative pt-8 sm:pt-10 pb-16 sm:pb-24 bg-[#FAF9F5] dark:bg-transparent border-t border-[#e2e8f0] dark:border-white/10 overflow-hidden">
        {/* Subtle background radial pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 w-full">
          {/* Main Section Header */}
          <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center justify-center gap-3 mb-3">
                <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
                  CAMPUS &amp; CLINICAL FACILITIES
                </span>
                <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
              </div>

              <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[42px] font-black text-[#162740] dark:text-white tracking-tight leading-tight mb-3 uppercase">
                Welcome to Gallery Arena of AIMS
              </h2>

              <p className="text-[#596d86] dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                Explore dynamic visual streams of our administrative, academic, laboratory, and super-speciality facilities.
              </p>
            </div>
          </div>

          {/* Academic & Campus Sections (Alternating Left-to-Right and Right-to-Left) */}
          <div className="space-y-12 sm:space-y-16">
            {arenaSections
              .filter((s) => s.group === "academic")
              .map((section) => renderArenaRow(section))}
          </div>

          {/* Arundathi Hospital Section Divider & Title */}
          <div className="w-full max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 my-16 sm:my-22 pt-14 border-t border-[#e2e8f0] dark:border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <div className="inline-flex items-center justify-center gap-3 mb-3">
                <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
                <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
                  NABH ACCREDITED TEACHING HOSPITAL
                </span>
                <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
              </div>

              <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[42px] font-black text-[#162740] dark:text-white tracking-tight leading-tight mb-3 uppercase">
                Arundathi Hospital
              </h2>

              <p className="text-[#596d86] dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                Modern surgical operation suites, blood bank, advanced pathology, 24/7 central diagnostic lab, and welcoming patient reception atrium.
              </p>
            </div>
          </div>

          {/* Hospital Sections (Alternating Left-to-Right and Right-to-Left) */}
          <div className="space-y-12 sm:space-y-16">
            {arenaSections
              .filter((s) => s.group === "hospital")
              .map((section) => renderArenaRow(section))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal with Fluid Spring Scale-In Animation */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#162740]/60 dark:bg-black/85 backdrop-blur-md p-4 sm:p-6 transition-all duration-300"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-white dark:bg-[#0b172a] rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-[#e2e8f0] dark:border-white/15 animate-modal-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-teal-500 text-white flex items-center justify-center border border-white/20 hover:border-teal-400 transition-all cursor-pointer hover:rotate-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevEvent}
              aria-label="Previous photo"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-teal-500 text-white flex items-center justify-center border border-white/20 hover:border-teal-400 transition-all cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextEvent}
              aria-label="Next photo"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-teal-500 text-white flex items-center justify-center border border-white/20 hover:border-teal-400 transition-all cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Stage */}
            <div className="relative w-full h-[50vh] sm:h-[62vh] overflow-hidden bg-[#f1f5f9] dark:bg-black flex items-center justify-center">
              <img
                src={selectedEvent.src}
                alt={selectedEvent.title}
                className="w-full h-full object-contain select-none"
              />
            </div>

            {/* Details Footer */}
            <div className="p-5 sm:p-7 bg-white dark:bg-[#0b172a] text-[#162740] dark:text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#162740]/8 text-[#4b6382] border border-[#162740]/15 dark:bg-white/15 dark:text-white/90 dark:border-white/20">
                  {selectedEvent.category}
                </span>
              </div>
              <h2 className="font-['Manrope',sans-serif] text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-[#162740] dark:text-white">
                {selectedEvent.title}
              </h2>
              <p className="text-[#596d86] dark:text-white/80 text-xs sm:text-sm leading-relaxed max-w-3xl">
                {selectedEvent.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Global Style for Keyframe Marquee and Modal Animation */}
      <style>{`
        @keyframes galleryInfiniteMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes arenaMarqueeLtr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes arenaMarqueeRtl {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes modalScaleIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-scale {
          animation: modalScaleIn 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default MediaGalleryPage;
