import React from "react";

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

export const MediaGalleryPage: React.FC = () => {
  return (
    <div className="w-full bg-[#FAF9F5] min-h-screen pt-10 sm:pt-14">
      {/* Header matching reference screenshot styling with common home page palette */}
      <div className="text-center max-w-4xl mx-auto pt-2 sm:pt-4 pb-0 px-4 relative z-30">
        <div className="inline-flex items-center justify-center gap-3 mb-2">
          <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] uppercase">
            MEDIA GALLERY
          </span>
          <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
        </div>

        <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-5xl lg:text-[56px] font-black uppercase tracking-tight text-[#162740] leading-[1.04] mb-2">
          EXPLORING AIMS CAMPUS
        </h1>

        <p className="text-[#596d86] text-sm sm:text-base lg:text-lg font-normal leading-tight">
          Interactions, Campus Architecture &amp; Medical Excellence
        </p>
      </div>

      {/* 3D Illusion Slider Section: Gap reduced by 20%, infinite continuous loop */}
      <section className="relative w-full bg-[#FAF9F5] overflow-hidden -mt-6 sm:-mt-9 lg:-mt-11 pb-8 sm:pb-12 lg:pb-14">
        {/* Top Solid Curved Overlay - Sits 20% closer */}
        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none w-full h-[58px] sm:h-[80px] lg:h-[100px] overflow-hidden">
          <svg
            viewBox="0 0 804 50.167"
            preserveAspectRatio="none"
            className="w-full h-full block"
          >
            <path
              fill="#FAF9F5"
              d="M804,0v16.671c0,0-204.974,33.496-401.995,33.496C204.974,50.167,0,16.671,0,16.671V0H804z"
            />
          </svg>
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

        {/* Bottom Solid Curved Overlay - 20% closer */}
        <div className="absolute bottom-6 sm:bottom-9 lg:bottom-11 left-0 right-0 z-20 pointer-events-none w-full h-[58px] sm:h-[80px] lg:h-[100px] overflow-hidden">
          <svg
            viewBox="0 0 804 50.167"
            preserveAspectRatio="none"
            className="w-full h-full block rotate-180"
          >
            <path
              fill="#FAF9F5"
              d="M804,0v16.671c0,0-204.974,33.496-401.995,33.496C204.974,50.167,0,16.671,0,16.671V0H804z"
            />
          </svg>
        </div>
      </section>


      {/* Global Style for Keyframe Marquee */}
      <style>{`
        @keyframes galleryInfiniteMarquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default MediaGalleryPage;
