import React, { useState } from "react";
import aboutImg from "../../assets/about.png";
import hospitalImg from "../../assets/aims-hospital.jpg";

interface AboutSlide {
  kicker: string;
  title: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  ticks: string[];
}

const ORIGINAL_SLIDES: AboutSlide[] = [
  {
    kicker: "About AIMS INSTITUTION",
    title: "Preparing minds to serve humanity",
    image: aboutImg,
    imageAlt: "AIMS campus and facilities",
    paragraphs: [
      "At Arundathi Institute of Medical Sciences, we believe education is the foundation for unlocking every student's potential. Our approach combines academic excellence, practical learning, and a patient-first mindset.",
      "We strive to create an environment where students gain the knowledge, confidence, and empathy needed to make a meaningful difference in healthcare and serve society with compassion and professionalism.",
    ],
    ticks: [
      "Student-centered learning",
      "Clinical exposure",
      "Professional mentorship",
      "Academic excellence and research",
    ],
  },
  {
    kicker: "About AIMS HOSPITAL",
    title: "Delivering Excellence in Healthcare",
    image: hospitalImg,
    imageAlt: "Arundathi Hospital facilities",
    paragraphs: [
      "At Arundathi Hospital, we believe quality healthcare should be accessible to everyone. Our approach combines advanced medical technology, experienced professionals, and compassionate, patient-centered care.",
      "We strive to ensure every patient receives respectful and ethical treatment, while support from the Marri Rajasekhar Reddy Foundation helps us provide free treatment and diagnostic services to those in need.",
    ],
    ticks: [
      "Medical & Super-Speciality Care",
      "Free Treatment & Diagnostics",
      "Advanced Medical Facilities",
      "Compassionate Patient Care",
    ],
  },
];

// Track structure: [Clone of Slide 2, Slide 1, Slide 2, Clone of Slide 1]
const TRACK_SLIDES = [
  ORIGINAL_SLIDES[1],
  ORIGINAL_SLIDES[0],
  ORIGINAL_SLIDES[1],
  ORIGINAL_SLIDES[0],
];

export const AboutSection: React.FC = () => {
  // Starts at track index 1 (Slide 1)
  const [trackIndex, setTrackIndex] = useState(1);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isSliding, setIsSliding] = useState(false);

  const handleNext = () => {
    if (isSliding) return;
    setIsSliding(true);
    setEnableTransition(true);
    setTrackIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isSliding) return;
    setIsSliding(true);
    setEnableTransition(true);
    setTrackIndex((prev) => prev - 1);
  };

  // Silently reset the edge clones without animation
  const handleTransitionEnd = () => {
    setIsSliding(false);
    if (trackIndex === 3) {
      setEnableTransition(false);
      setTrackIndex(1);
    } else if (trackIndex === 0) {
      setEnableTransition(false);
      setTrackIndex(2);
    }
  };

  return (
    <section className="relative pt-20 lg:pt-28 pb-12 lg:pb-16 bg-white overflow-hidden tracking-[0.015em]">
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-14 lg:px-20">
        {/* Left Arrow (Looping enabled) */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="hidden md:flex absolute left-2 lg:left-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-white text-[#1f3351] border border-[#dce8ee] shadow-[0_12px_30px_rgba(8,44,76,0.14)] hover:bg-[#1f3351] hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <span className="text-2xl leading-none -ml-0.5">‹</span>
        </button>

        {/* Right Arrow (Looping enabled) */}
        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="hidden md:flex absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full bg-white text-[#1f3351] border border-[#dce8ee] shadow-[0_12px_30px_rgba(8,44,76,0.14)] hover:bg-[#1f3351] hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <span className="text-2xl leading-none -mr-0.5">›</span>
        </button>

        {/* Sliding Viewport */}
        <div className="overflow-hidden w-full">
          <div
            onTransitionEnd={handleTransitionEnd}
            className={`flex w-[400%] ${
              enableTransition
                ? "transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                : "transition-none"
            }`}
            style={{
              transform: `translateX(-${trackIndex * 25}%)`,
            }}
          >
            {TRACK_SLIDES.map((slide, idx) => (
              <div
                key={`${slide.kicker}-${idx}`}
                className="w-1/4 flex-shrink-0 px-2 sm:px-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
                  {/* Image Column */}
                  <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                    <div className="relative z-10 overflow-hidden rounded-[26px] border border-[#dce8ee] bg-white">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        className="w-full h-[240px] sm:h-[300px] lg:h-[400px] object-cover"
                      />
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className="flex flex-col justify-center">
                    <span className="text-xs font-semibold uppercase tracking-[2px] mb-3 select-none text-dark">
                      {slide.kicker}
                    </span>

                    <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.01em] text-[#1f3351] mb-5">
                      {slide.title}
                    </h2>

                    <div className="space-y-4 text-base leading-relaxed text-[#62748a] mb-7">
                      {slide.paragraphs.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                      {slide.ticks.map((tick, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-2.5">
                          <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-dark text-white text-xs font-bold">
                            ✓
                          </span>
                          <strong className="text-sm font-bold text-[#1f3351]">
                            {tick}
                          </strong>
                        </div>
                      ))}
                    </div>

                    {/* Indicators & Mobile Buttons */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex md:hidden gap-2">
                        <button
                          onClick={handlePrev}
                          aria-label="Previous slide mobile"
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#dce8ee] text-[#1f3351] text-lg active:scale-95"
                        >
                          ‹
                        </button>
                        <button
                          onClick={handleNext}
                          aria-label="Next slide mobile"
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-white border border-[#dce8ee] text-[#1f3351] text-lg active:scale-95"
                        >
                          ›
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
