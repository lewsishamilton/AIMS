import Hero from "../sections/Home/Hero";
import AboutSection from "../sections/Home/AboutSection";
import DepartmentsSection from "../sections/Home/DepartmentsSection";
import FacilitiesSection from "../sections/Home/FacilitiesSection";
import CampusGallerySection from "../sections/Home/CampusGallerySection";
import PatientsSpeaksSection from "../sections/Home/PatientsSpeaksSection";
import ContactSection from "../sections/Home/ContactSection";
import AnalysisSection from "../sections/Home/AnalysisSection";

/**
 * Desktop Home view. Kept as its own file so the desktop experience can be
 * edited independently of the mobile one (see HomeMobile for the phone view).
 */
function HomeDesktop() {
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

export default HomeDesktop;
