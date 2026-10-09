import Hero from "../sections/Home/Hero";
import AboutSection from "../sections/Home/AboutSection";
import DepartmentsSection from "../sections/Home/DepartmentsSection";
import FacilitiesSection from "../sections/Home/FacilitiesSection";
import CampusGallerySection from "../sections/Home/CampusGallerySection";
import FounderSection from "../sections/Home/FounderSection";
import PatientsSpeaksSection from "../sections/Home/PatientsSpeaksSection";
import ContactSection from "../sections/Home/ContactSection";
import AnalysisSection from "../sections/Home/AnalysisSection";

function HeroPage() {
  return (
    <div className="relative w-full overflow-x-clip">
      <Hero />
      <AboutSection />
      <FounderSection />
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