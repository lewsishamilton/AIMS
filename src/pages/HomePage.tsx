import { useEffect } from "react";
import Hero from "../sections/Home/Hero";
import AboutSection from "../sections/Home/AboutSection";
import DepartmentsSection from "../sections/Home/DepartmentsSection";
import FacilitiesSection from "../sections/Home/FacilitiesSection";
import CampusGallerySection from "../sections/Home/CampusGallerySection";
import PatientsSpeaksSection from "../sections/Home/PatientsSpeaksSection";
import ContactSection from "../sections/Home/ContactSection";
import AnalysisSection from "../sections/Home/AnalysisSection";

function HeroPage() {
  // Flags .m-reveal elements once they enter view; the animation itself is phone-only CSS (index.css).
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        (e.target as HTMLElement).dataset.in = "";
        io.unobserve(e.target);
      }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".m-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-x-clip">
      <Hero />
      <AboutSection />
      <DepartmentsSection />
      <FacilitiesSection />
      <PatientsSpeaksSection />
      <CampusGallerySection />
      <AnalysisSection />
      <ContactSection />
    </div>
  );
}

export default HeroPage;