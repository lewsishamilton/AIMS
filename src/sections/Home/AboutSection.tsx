import React, { useState, useEffect, useRef } from "react";
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
  const [isPaused, setIsPaused] = useState(false);

  // Drag & Swipe states
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

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

  const goToSlide = (slideIdx: number) => {
    if (isSliding || isDragging) return;
    const targetTrack = slideIdx === 0 ? 1 : 2;
    if (targetTrack === trackIndex) return;
    setIsSliding(true);
    setEnableTransition(true);
    setTrackIndex(targetTrack);
  };

  const finishDrag = (offset: number) => {
    setIsDragging(false);
    const threshold = 60; // px needed to trigger slide

    if (offset < -threshold) {
      handleNext();
    } else if (offset > threshold) {
      handlePrev();
    } else {
      setEnableTransition(true);
      setIsSliding(false);
    }
    setDragOffset(0);
    dragOffsetRef.current = 0;
  };

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSliding) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
    dragOffsetRef.current = 0;
    setDragOffset(0);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startXRef.current;
      dragOffsetRef.current = delta;
      setDragOffset(delta);
    };

    const handleWindowMouseUp = () => {
      finishDrag(dragOffsetRef.current);
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    window.addEventListener("mouseup", handleWindowMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      window.removeEventListener("mouseup", handleWindowMouseUp);
    };
  }, [isDragging, isSliding]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSliding) return;
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    dragOffsetRef.current = 0;
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isHorizontalSwipeRef.current = Math.abs(deltaX) >= Math.abs(deltaY);
      }
    }

    if (isHorizontalSwipeRef.current) {
      dragOffsetRef.current = deltaX;
      setDragOffset(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (isHorizontalSwipeRef.current) {
      finishDrag(dragOffsetRef.current);
    } else {
      setIsDragging(false);
      setDragOffset(0);
      dragOffsetRef.current = 0;
    }
    isHorizontalSwipeRef.current = null;
  };

  // Auto-slide every 3 seconds (pauses on hover or while dragging)
  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [trackIndex, isSliding, isPaused, isDragging]);

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

  const activeDot = trackIndex === 1 || trackIndex === 3 ? 0 : 1;

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative pt-20 lg:pt-28 pb-12 lg:pb-16 bg-white overflow-hidden tracking-[0.015em]"
    >
      <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-14 lg:px-20">
        {/* Sliding & Draggable Viewport */}
        <div
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`overflow-hidden w-full select-none ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            className={`flex w-[400%] ${
              enableTransition && !isDragging
                ? "transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                : "transition-none"
            }`}
            style={{
              transform: isDragging
                ? `translateX(calc(-${trackIndex * 25}% + ${dragOffset}px))`
                : `translateX(-${trackIndex * 25}%)`,
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
                    <div className="relative z-10 overflow-hidden rounded-[26px] border border-[#dce8ee] bg-white pointer-events-none">
                      <img
                        src={slide.image}
                        alt={slide.imageAlt}
                        draggable={false}
                        className="w-full h-[240px] sm:h-[300px] lg:h-[400px] object-cover pointer-events-none select-none"
                      />
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className="flex flex-col justify-center">
                    {/* Kicker with Academics-style lines design */}
                    <div className="inline-flex items-center gap-3 mb-3.5">
                      <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
                      <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] uppercase select-none">
                        {slide.kicker}
                      </span>
                      <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
                    </div>

                    <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.01em] text-[#1f3351] mb-5">
                      {slide.title}
                    </h2>

                    <div className="space-y-4 text-base leading-relaxed text-[#62748a] mb-7">
                      {slide.paragraphs.map((paragraph, pIdx) => (
                        <p key={pIdx}>{paragraph}</p>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-2">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Slider Movement Dots Indicator */}
        <div className="flex items-center justify-center gap-2.5 mt-8 sm:mt-10">
          {ORIGINAL_SLIDES.map((slide, i) => {
            const isActive = activeDot === i;
            return (
              <button
                key={slide.kicker}
                onClick={() => goToSlide(i)}
                aria-label={`Go to ${slide.kicker}`}
                className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "w-8 sm:w-10 bg-[#1f3351] shadow-xs"
                    : "w-2.5 bg-[#cbd5e1] hover:bg-[#94a3b8]"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
