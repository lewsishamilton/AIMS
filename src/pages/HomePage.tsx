import Hero from "../sections/Home/Hero";
import AboutSection from "../sections/Home/AboutSection";
import DepartmentsSection from "../sections/Home/DepartmentsSection";
import CampusGallerySection from "../sections/Home/CampusGallerySection";
import FounderSection from "../sections/Home/FounderSection";
import PatientsSpeaksSection from "../sections/Home/PatientsSpeaksSection";

function HeroPage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <DepartmentsSection />
      <CampusGallerySection />
      <FounderSection />
      <PatientsSpeaksSection />
    </>
  );
}

export default HeroPage;