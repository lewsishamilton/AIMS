import Hero from "../sections/Home/Hero";
import AboutSection from "../sections/Home/AboutSection";
import DepartmentsSection from "../sections/Home/DepartmentsSection";
import FacilitiesSection from "../sections/Home/FacilitiesSection";
import CampusGallerySection from "../sections/Home/CampusGallerySection";
import FounderSection from "../sections/Home/FounderSection";
import PatientsSpeaksSection from "../sections/Home/PatientsSpeaksSection";
import ContactSection from "../sections/Home/ContactSection";

function HeroPage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FounderSection />
      <DepartmentsSection />
      <FacilitiesSection />
      <CampusGallerySection />
      <PatientsSpeaksSection />
      <ContactSection />
    </>
  );
}

export default HeroPage;