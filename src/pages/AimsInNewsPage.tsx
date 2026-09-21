import { useEffect } from "react";
import Hero from "../sections/News/Hero";
import AnimatedStatement from "../sections/News/AnimatedStatement";
import Marquee from "../sections/News/Marquee";
import ChroniclesSection from "../sections/News/ChroniclesSection";
import ImageGallery from "../sections/News/ImageGallery";
import "../sections/News/news.css";

export default function AimsInNewsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="aims-news-page pt-20 sm:pt-24 min-h-screen">
      <main className="site-main">
        {/* Dominant Typography-Led Hero with Rotating Word Cycler */}
        <Hero />

        {/* The Signature Kinetic Two-Line Animated Statement */}
        <AnimatedStatement />

        {/* Continuous Editorial Ticker Marquee */}
        <Marquee />

        {/* The Main 06 Chronicles Section (Depth Stack & Swipe Modes) */}
        <ChroniclesSection />

        {/* Bottom Editorial Spatial Frames */}
        <ImageGallery />
      </main>
    </div>
  );
}
