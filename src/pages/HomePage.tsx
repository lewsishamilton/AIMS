import Hero from "../sections/Home/Hero";
import AboutSection from "../sections/Home/AboutSection";
import DepartmentsSection from "../sections/Home/DepartmentsSection";
import FacilitiesSection from "../sections/Home/FacilitiesSection";
import CampusGallerySection from "../sections/Home/CampusGallerySection";
import PatientsSpeaksSection from "../sections/Home/PatientsSpeaksSection";
import ContactSection from "../sections/Home/ContactSection";

function HeroPage() {
  return (
    <div className="relative w-full overflow-x-clip">
      <Hero />
      <AboutSection />
      <DepartmentsSection />
      <FacilitiesSection />
      <PatientsSpeaksSection />
      <CampusGallerySection />
      <ContactSection />
    </div>
  );
}

export default HeroPage;