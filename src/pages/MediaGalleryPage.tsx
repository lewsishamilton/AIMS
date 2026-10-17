import React, { useState, useEffect } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

// Import real campus images from stock assets
import img01 from "../assets/stockImages/aims-campus-07.webp";
import img02 from "../assets/stockImages/aims-campus-15.webp";
import img03 from "../assets/stockImages/aims-campus-47.webp";
import img04 from "../assets/stockImages/aims-campus-41.webp";
import img05 from "../assets/stockImages/aims-campus-19.webp";
import img06 from "../assets/stockImages/aims-campus-38.webp";
import img07 from "../assets/stockImages/aims-campus-37.webp";
import img08 from "../assets/stockImages/aims-campus-03.webp";
import img09 from "../assets/stockImages/aims-campus-35.webp";
import img10 from "../assets/stockImages/aims-campus-21.webp";
import img11 from "../assets/stockImages/aims-campus-31.webp";
import img12 from "../assets/stockImages/aims-campus-48.webp";

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

export const MediaGalleryPage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const handlePrevEvent = () => {
    if (!selectedEvent) return;
    const currentIndex = allCollageItems.findIndex((e) => e.id === selectedEvent.id);
    const prevIndex = (currentIndex - 1 + allCollageItems.length) % allCollageItems.length;
    setSelectedEvent(allCollageItems[prevIndex]);
  };

  const handleNextEvent = () => {
    if (!selectedEvent) return;
    const currentIndex = allCollageItems.findIndex((e) => e.id === selectedEvent.id);
    const nextIndex = (currentIndex + 1) % allCollageItems.length;
    setSelectedEvent(allCollageItems[nextIndex]);
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
  }, [selectedEvent]);

  // Reusable Photo Card with subtly increased border curve and fluid hover interactions
  const renderPhotoCard = (item: EventItem) => (
    <div
      key={item.id}
      onClick={() => {
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
      <section className="relative w-full bg-[#FAF9F5] dark:bg-transparent overflow-hidden pb-0 mt-3 sm:-mt-14 lg:-mt-16">
        {/* Top Solid Curved Overlay */}
        <div className="absolute -top-px sm:top-0 left-0 right-0 z-20 pointer-events-none w-full h-[36px] sm:h-[80px] lg:h-[100px] overflow-hidden">
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
                  w-[min(42vw,190px)]
                  sm:w-[440px]
                  lg:w-[480px]
                  h-[min(52vw,236px)]
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
        <div className="absolute -bottom-px sm:bottom-0 left-0 right-0 z-20 pointer-events-none w-full h-[36px] sm:h-[80px] lg:h-[100px] overflow-hidden">
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
      <section className="atmos-dots relative pt-6 sm:pt-8 lg:pt-10 pb-6 sm:pb-8 lg:pb-10 bg-[#FAF9F5] dark:bg-transparent border-t border-[#e2e8f0]/80 dark:border-white/10 overflow-hidden">
        {/* Subtle Background Radial Pattern */}
        <div
          className="atmos-dots-fade absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
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
          <div className="max-md:hidden flex flex-col gap-1.5 sm:gap-2 max-w-[1080px] mx-auto select-none">
            {collageRows.map((row, i) => (
              <div key={i} className="collage-row" style={{ "--row-h": collageRowShape[i][0], "--row-w": collageRowShape[i][1] } as React.CSSProperties}>
                {row.map(renderPhotoCard)}
              </div>
            ))}
          </div>

          {/* Phones: the same diamond collage as desktop, laid out at desktop width with desktop row heights
              (the clamp() maximums), scaled to 60% and pannable in any direction. Starts centred. */}
          <div
            ref={(el) => {
              if (el && !el.dataset.centred) {
                el.dataset.centred = "1";
                el.scrollLeft = (el.scrollWidth - el.clientWidth) / 2;
              }
            }}
            className="md:hidden -mx-4 h-[62svh] overflow-auto select-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="w-[1080px] [zoom:0.6] p-4 flex flex-col gap-2">
              {collageRows.map((row, i) => (
                <div
                  key={i}
                  className="collage-row"
                  style={{ "--row-h": collageRowShape[i][0].replace(/^clamp\([^,]+,[^,]+,\s*([^)]+)\)$/, "$1"), "--row-w": collageRowShape[i][1] } as React.CSSProperties}
                >
                  {row.map(renderPhotoCard)}
                </div>
              ))}
            </div>
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
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-[#1f3351] dark:hover:bg-teal-500 text-white flex items-center justify-center border border-white/20 hover:border-teal-400 transition-all cursor-pointer hover:rotate-90"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrevEvent}
              aria-label="Previous photo"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-[#1f3351] dark:hover:bg-teal-500 text-white flex items-center justify-center border border-white/20 hover:border-teal-400 transition-all cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextEvent}
              aria-label="Next photo"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-[#1f3351] dark:hover:bg-teal-500 text-white flex items-center justify-center border border-white/20 hover:border-teal-400 transition-all cursor-pointer shadow-md"
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
