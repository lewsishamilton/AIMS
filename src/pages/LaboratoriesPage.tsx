import React, { useState, useEffect, useMemo } from "react";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Building2,
  Stethoscope,
  Activity,
} from "lucide-react";

// ─── Direct Imports from src/assets/clg-imgs (strictly authentic folder structures) ───
// Administration Block (5 images)
import admin1 from "../assets/clg-imgs/administration block/1.webp";
import admin2 from "../assets/clg-imgs/administration block/2.webp";
import admin3 from "../assets/clg-imgs/administration block/3.webp";
import admin4 from "../assets/clg-imgs/administration block/4.webp";
import admin5 from "../assets/clg-imgs/administration block/5.webp";

// Skill Lab (4 images)
import skill1 from "../assets/clg-imgs/skills/1.webp";
import skill2 from "../assets/clg-imgs/skills/2.webp";
import skill3 from "../assets/clg-imgs/skills/3.webp";
import skill4 from "../assets/clg-imgs/skills/4.webp";

// Physiology (3 images)
import phys1 from "../assets/clg-imgs/pysiology/1.webp";
import phys2 from "../assets/clg-imgs/pysiology/2.webp";
import phys3 from "../assets/clg-imgs/pysiology/3.webp";

// MEU (3 images)
import meu1 from "../assets/clg-imgs/MEU/1.webp";
import meu2 from "../assets/clg-imgs/MEU/2.webp";
import meu3 from "../assets/clg-imgs/MEU/3.webp";

// Central Library (4 images)
import lib1 from "../assets/clg-imgs/central library/1.webp";
import lib2 from "../assets/clg-imgs/central library/2.webp";
import lib3 from "../assets/clg-imgs/central library/3.webp";
import lib4 from "../assets/clg-imgs/central library/4.webp";

// Anatomy (5 images)
import anat1 from "../assets/clg-imgs/Anatomy/1.webp";
import anat2 from "../assets/clg-imgs/Anatomy/2.webp";
import anat3 from "../assets/clg-imgs/Anatomy/3.webp";
import anat5 from "../assets/clg-imgs/Anatomy/5.webp";
import anat6 from "../assets/clg-imgs/Anatomy/6.webp";

// Operation Room (7 images)
import or1 from "../assets/clg-imgs/Operation Room/1.webp";
import or2 from "../assets/clg-imgs/Operation Room/2.webp";
import or3 from "../assets/clg-imgs/Operation Room/3.webp";
import or4 from "../assets/clg-imgs/Operation Room/4.webp";
import or5 from "../assets/clg-imgs/Operation Room/5.webp";
import or6 from "../assets/clg-imgs/Operation Room/6.webp";
import or7 from "../assets/clg-imgs/Operation Room/7.webp";

// Blood Bank (4 images)
import bb1 from "../assets/clg-imgs/Blood Bank/1.webp";
import bb2 from "../assets/clg-imgs/Blood Bank/2.webp";
import bb3 from "../assets/clg-imgs/Blood Bank/3.webp";
import bbOt from "../assets/clg-imgs/Blood Bank/ot-picture-SLS05934.webp";

// Central Lab (3 images)
import cl1 from "../assets/clg-imgs/Central Lab/1.webp";
import cl2 from "../assets/clg-imgs/Central Lab/2.webp";
import cl3 from "../assets/clg-imgs/Central Lab/3.webp";

// Lobby (9 images)
import lobby1 from "../assets/clg-imgs/Lobby/1.webp";
import lobby2 from "../assets/clg-imgs/Lobby/2.webp";
import lobby3 from "../assets/clg-imgs/Lobby/3.webp";
import lobby4 from "../assets/clg-imgs/Lobby/4.webp";
import lobby5 from "../assets/clg-imgs/Lobby/5.webp";
import lobby6 from "../assets/clg-imgs/Lobby/6.webp";
import lobby7 from "../assets/clg-imgs/Lobby/7.webp";
import lobby8 from "../assets/clg-imgs/Lobby/8.webp";
import lobby9 from "../assets/clg-imgs/Lobby/9.webp";

export interface ArenaSectionData {
  id: string;
  title: string;
  category: string;
  group: "academic" | "hospital";
  description: string;
  direction: "ltr" | "rtl";
  images: string[];
}

export interface ModalPhotoItem {
  id: string;
  title: string;
  category: string;
  src: string;
  description: string;
  index: number;
  total: number;
}

const arenaSections: ArenaSectionData[] = [
  {
    id: "admin-block",
    title: "Administration Block",
    category: "Campus Infrastructure",
    group: "academic",
    description:
      "Administrative offices, deanery, student affairs, and executive governance suites facilitating institutional leadership.",
    direction: "ltr",
    images: [admin1, admin2, admin3, admin4, admin5],
  },
  {
    id: "skill-lab",
    title: "Skill Lab",
    category: "Clinical Simulation",
    group: "academic",
    description:
      "Hands-on medical simulation lab equipped with high-fidelity task trainers, life-support manikins, and clinical practice models.",
    direction: "rtl",
    images: [skill1, skill2, skill3, skill4],
  },
  {
    id: "physiology",
    title: "Physiology Laboratory",
    category: "Pre-Clinical Department",
    group: "academic",
    description:
      "Physiology teaching laboratories for clinical examinations, hematology experiments, human performance assays, and practical learning.",
    direction: "ltr",
    images: [phys1, phys2, phys3],
  },
  {
    id: "meu",
    title: "M E U (Medical Education Unit)",
    category: "Medical Education Unit",
    group: "academic",
    description:
      "Medical Education Unit dedicated to continuous faculty development, curriculum design, clinical simulation pedagogy, and medical education research.",
    direction: "rtl",
    images: [meu1, meu2, meu3],
  },
  {
    id: "central-library",
    title: "Central Library",
    category: "Academic Resource",
    group: "academic",
    description:
      "Multi-tiered knowledge repository with digital medical databases, international research journals, reference treatises, and quiet study areas.",
    direction: "ltr",
    images: [lib1, lib2, lib3, lib4],
  },
  {
    id: "anatomy",
    title: "Anatomy Dissection Hall & Museum",
    category: "Pre-Clinical Department",
    group: "academic",
    description:
      "Comprehensive anatomy museum with rare specimens, histology practical lab, and modern cadaveric dissection arena conforming to NMC standards.",
    direction: "rtl",
    images: [anat1, anat2, anat3, anat5, anat6],
  },
  {
    id: "operation-room",
    title: "Operation Room Complex",
    category: "Surgical Complex",
    group: "hospital",
    description:
      "State-of-the-art modular surgical suites with laminar airflow, advanced endoscopy, intraoperative monitoring, and surgical infrastructure.",
    direction: "ltr",
    images: [or1, or2, or3, or4, or5, or6, or7],
  },
  {
    id: "blood-bank",
    title: "Blood Bank & Transfusion Services",
    category: "Transfusion Services",
    group: "hospital",
    description:
      "24/7 licensed blood transfusion centre with advanced component separation, platelet apheresis, and ultra-cold cryopreservation units.",
    direction: "rtl",
    images: [bb1, bb2, bb3, bbOt],
  },
  {
    id: "central-lab",
    title: "Central Diagnostic Laboratory",
    category: "Diagnostic Services",
    group: "hospital",
    description:
      "Fully automated central diagnostic laboratory operating 24/7 for inpatient, emergency, biochemistry, pathology, and microbiology investigations.",
    direction: "ltr",
    images: [cl1, cl2, cl3],
  },
  {
    id: "lobby",
    title: "Hospital Reception & Atrium",
    category: "Patient Atrium",
    group: "hospital",
    description:
      "Welcoming, spacious patient reception, registration atrium, enquiry desks, and comfortable visitor lounges at Arundathi Hospital.",
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

export const LaboratoriesPage: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<ModalPhotoItem | null>(null);
  const [activePhotoList, setActivePhotoList] = useState<ModalPhotoItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | "academic" | "hospital">("all");

  useEffect(() => {
    document.title = "Laboratories & Infrastructure Gallery Arena | AIMS";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Explore the state-of-the-art laboratories, pre-clinical dissection halls, simulation skill labs, modular operation suites, and central diagnostic facilities at Arundathi Institute of Medical Sciences (AIMS)."
      );
    }
  }, []);

  const handlePrevPhoto = () => {
    if (!selectedPhoto || activePhotoList.length === 0) return;
    const currentIndex = activePhotoList.findIndex((p) => p.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + activePhotoList.length) % activePhotoList.length;
    setSelectedPhoto(activePhotoList[prevIndex]);
  };

  const handleNextPhoto = () => {
    if (!selectedPhoto || activePhotoList.length === 0) return;
    const currentIndex = activePhotoList.findIndex((p) => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % activePhotoList.length;
    setSelectedPhoto(activePhotoList[nextIndex]);
  };

  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
      if (e.key === "ArrowLeft") handlePrevPhoto();
      if (e.key === "ArrowRight") handleNextPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhoto, activePhotoList]);

  const filteredSections = useMemo(() => {
    if (activeFilter === "all") return arenaSections;
    return arenaSections.filter((s) => s.group === activeFilter);
  }, [activeFilter]);

  const renderArenaRow = (section: ArenaSectionData) => {
    const marqueeCards = createMarqueeItems(section.images);
    const isLtr = section.direction === "ltr";

    return (
      <div key={section.id} id={`arena-${section.id}`} className="w-full overflow-hidden">
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
          <p className="text-xs sm:text-sm text-[#596d86] dark:text-slate-300 max-w-2xl mx-auto mt-1 font-normal line-clamp-2">
            {section.description}
          </p>
        </div>

        {/* Infinite Scrolling Track */}
        <div className="w-full overflow-hidden">
          <div
            className="flex w-max gap-3.5 sm:gap-4 lg:gap-5 py-2 hover:[animation-play-state:paused]"
            style={{
              animation: `${isLtr ? "labMarqueeLtr" : "labMarqueeRtl"} ${
                section.images.length * 6 > 30 ? section.images.length * 6 : 32
              }s linear infinite`,
            }}
          >
            {marqueeCards.map((imgSrc, idx) => {
              const originalIndex = idx % section.images.length;
              return (
                <div
                  key={`${section.id}-${idx}`}
                  onClick={() => {
                    const sectionPhotoItems: ModalPhotoItem[] = section.images.map((src, i) => ({
                      id: `${section.id}-${i}`,
                      title: `${section.title} (Photo ${i + 1} of ${section.images.length})`,
                      category: section.category,
                      src,
                      description: section.description,
                      index: i + 1,
                      total: section.images.length,
                    }));
                    setActivePhotoList(sectionPhotoItems);
                    setSelectedPhoto(sectionPhotoItems[originalIndex]);
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
      {/* ─── Hero Masthead ─── */}
      <section className="relative w-full pt-8 sm:pt-12 pb-12 sm:pb-16 overflow-hidden">
        {/* Subtle background radial pattern */}
        <div
          className="atmos-dots-fade absolute inset-0 pointer-events-none opacity-25 dark:opacity-15"
          style={{
            backgroundImage: `radial-gradient(#64748b 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Title */}
          <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-5xl lg:text-6xl font-black text-[#162740] dark:text-white tracking-tight leading-[1.08] mb-4 uppercase">
            Welcome to Gallery Arena of AIMS
          </h1>

          {/* Description */}
          <p className="text-[#596d86] dark:text-slate-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
            Explore dynamic visual streams of our administrative, academic, laboratory, and super-speciality facilities. Designed strictly to National Medical Commission (NMC) standards to empower the next generation of healthcare pioneers.
          </p>

          {/* Key Stat Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-left">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-white/[0.04] border border-[#e2e8f0] dark:border-white/10 shadow-xs backdrop-blur-sm">
              <div className="flex items-center gap-2.5 mb-1.5">
                <FlaskConical className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span className="text-xs font-bold text-[#162740] dark:text-white uppercase tracking-wider">
                  Laboratories
                </span>
              </div>
              <p className="text-xs text-[#64748b] dark:text-slate-400 leading-snug">
                Advanced physiology, histology &amp; pre-clinical practical suites.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-white/[0.04] border border-[#e2e8f0] dark:border-white/10 shadow-xs backdrop-blur-sm">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold text-[#162740] dark:text-white uppercase tracking-wider">
                  Simulation Lab
                </span>
              </div>
              <p className="text-xs text-[#64748b] dark:text-slate-400 leading-snug">
                High-fidelity task trainers &amp; clinical practice manikins.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-white/[0.04] border border-[#e2e8f0] dark:border-white/10 shadow-xs backdrop-blur-sm">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Building2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold text-[#162740] dark:text-white uppercase tracking-wider">
                  Operation Complex
                </span>
              </div>
              <p className="text-xs text-[#64748b] dark:text-slate-400 leading-snug">
                Modular laminar airflow suites with endoscopic units.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-white/[0.04] border border-[#e2e8f0] dark:border-white/10 shadow-xs backdrop-blur-sm">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Activity className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span className="text-xs font-bold text-[#162740] dark:text-white uppercase tracking-wider">
                  Central Diagnostics
                </span>
              </div>
              <p className="text-xs text-[#64748b] dark:text-slate-400 leading-snug">
                24/7 automated pathology, biochemistry &amp; blood bank.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-white dark:bg-slate-900/80 border border-[#e2e8f0] dark:border-white/15 shadow-sm">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === "all"
                  ? "bg-[#162740] text-white dark:bg-teal-500 dark:text-slate-950 shadow-xs"
                  : "text-[#64748b] dark:text-slate-400 hover:text-[#162740] dark:hover:text-white"
              }`}
            >
              All Arenas ({arenaSections.length})
            </button>
            <button
              onClick={() => setActiveFilter("academic")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === "academic"
                  ? "bg-[#162740] text-white dark:bg-teal-500 dark:text-slate-950 shadow-xs"
                  : "text-[#64748b] dark:text-slate-400 hover:text-[#162740] dark:hover:text-white"
              }`}
            >
              Academic &amp; Pre-Clinical Labs
            </button>
            <button
              onClick={() => setActiveFilter("hospital")}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === "hospital"
                  ? "bg-[#162740] text-white dark:bg-teal-500 dark:text-slate-950 shadow-xs"
                  : "text-[#64748b] dark:text-slate-400 hover:text-[#162740] dark:hover:text-white"
              }`}
            >
              Arundathi Hospital &amp; Clinical Care
            </button>
          </div>
        </div>
      </section>

      {/* ─── Academic & Campus Facilities Stream ─── */}
      {(activeFilter === "all" || activeFilter === "academic") && (
        <section className="relative pb-16 sm:pb-20 border-t border-[#e2e8f0] dark:border-white/10 pt-10 sm:pt-12">
          <div className="space-y-12 sm:space-y-16">
            {filteredSections
              .filter((s) => s.group === "academic")
              .map((section) => renderArenaRow(section))}
          </div>
        </section>
      )}

      {/* ─── Arundathi Hospital Section ─── */}
      {(activeFilter === "all" || activeFilter === "hospital") && (
        <section className="relative pb-20 sm:pb-28 border-t border-[#e2e8f0] dark:border-white/10 pt-10 sm:pt-12">
          <div className="space-y-12 sm:space-y-16">
            {filteredSections
              .filter((s) => s.group === "hospital")
              .map((section) => renderArenaRow(section))}
          </div>
        </section>
      )}

      {/* ─── Lightbox Modal with Fluid Spring Scale-In Animation ─── */}
      {selectedPhoto && (
        <div
          id="arena-lightbox-modal"
          role="dialog"
          aria-modal="true"
          aria-label={selectedPhoto.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#162740]/60 dark:bg-black/85 backdrop-blur-md p-4 sm:p-6 transition-all duration-300"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] flex flex-col bg-white dark:bg-[#0b172a] rounded-lg sm:rounded-xl overflow-hidden shadow-2xl border border-[#e2e8f0] dark:border-white/15 animate-modal-scale"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-[#1f3351] dark:hover:bg-teal-500 text-white flex items-center justify-center border border-white/20 hover:border-teal-400 transition-all cursor-pointer hover:rotate-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevPhoto}
              aria-label="Previous photo"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-[#1f3351] dark:hover:bg-teal-500 text-white flex items-center justify-center border border-white/20 hover:border-teal-400 transition-all cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextPhoto}
              aria-label="Next photo"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-[#1f3351] dark:hover:bg-teal-500 text-white flex items-center justify-center border border-white/20 hover:border-teal-400 transition-all cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Stage */}
            <div className="relative w-full h-[50vh] sm:h-[62vh] overflow-hidden bg-[#f1f5f9] dark:bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain select-none"
              />
            </div>

            {/* Details Footer */}
            <div className="p-5 sm:p-7 bg-white dark:bg-[#0b172a] text-[#162740] dark:text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-[#162740]/8 text-[#4b6382] border border-[#162740]/15 dark:bg-white/15 dark:text-white/90 dark:border-white/20">
                  {selectedPhoto.category}
                </span>
                <span className="text-xs text-[#64748b] dark:text-slate-400">
                  Photo {selectedPhoto.index} of {selectedPhoto.total}
                </span>
              </div>
              <h2 className="font-['Manrope',sans-serif] text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-[#162740] dark:text-white">
                {selectedPhoto.title}
              </h2>
              <p className="text-[#596d86] dark:text-white/80 text-xs sm:text-sm leading-relaxed max-w-3xl">
                {selectedPhoto.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Global Style for Keyframe Marquee and Modal Animation */}
      <style>{`
        @keyframes labMarqueeLtr {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes labMarqueeRtl {
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

export default LaboratoriesPage;
