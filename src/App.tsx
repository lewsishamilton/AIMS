import Navbar from "./layouts/navbar"
import Footer from "./layouts/footer"
import ChatAssistant from "./components/ChatAssistant"
import HeroPage from "./pages/HomePage"
import { COMMITTEES } from "./data/committees"

import { Route, Routes } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"
import SeoHead from "./components/SeoHead"
import { lazy, Suspense } from "react"

// Every page except Home is split into its own file and downloaded when first opened.
const FacultyPage = lazy(() => import("./pages/FacultyPage"))
const DepartmentFacultyPage = lazy(() => import("./pages/DepartmentFacultyPage"))
const DepartmentsPage = lazy(() => import("./pages/DepartmentsPage"))
const MediaGalleryPage = lazy(() => import("./pages/MediaGalleryPage"))
const LaboratoriesPage = lazy(() => import("./pages/LaboratoriesPage"))
const AwardsPage = lazy(() => import("./pages/AwardsPage"))
const AboutHospitalPage = lazy(() => import("./pages/AboutHospitalPage"))
const AboutInstitutionPage = lazy(() => import("./pages/AboutInstitutionPage"))
const FounderPage = lazy(() => import("./pages/FounderPage"))
const ManagementPage = lazy(() => import("./pages/ManagementPage"))
const LeadershipProfilePage = lazy(() => import("./pages/LeadershipProfilePage"))
const ContactPage = lazy(() => import("./pages/ContactPage"))
const AimsInNewsPage = lazy(() => import("./pages/AimsInNewsPage"))
const MachinesPage = lazy(() => import("./pages/MachinesPage"))
const AccreditationsPage = lazy(() => import("./pages/AccreditationsPage"))
const VirtualTourPage = lazy(() => import("./pages/VirtualTourPage"))
const PdfViewerSection = lazy(() => import("./layouts/PdfViewer"))
const StaticRoute = lazy(() => import("./components/StaticRoute"))

const TransportPage = lazy(() => import("./pages/TransportPage"))

function App() {
  return (
    <>
      <ScrollToTop />
      <SeoHead />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
      <Routes>
        <Route path="/" element={<HeroPage />} />

        {COMMITTEES.map((c) => (
          <Route
            key={c.path}
            path={c.path}
            element={<PdfViewerSection title={c.title} subtitle={c.subtitle} pdfUrl={c.pdfUrl} />}
          />
        ))}

        <Route path="/departments" element={<DepartmentsPage />} />
        <Route path="/departments/:departmentId" element={<DepartmentFacultyPage />} />
        <Route path="/Departments" element={<DepartmentsPage />} />
        <Route path="/Departments/:departmentId" element={<DepartmentFacultyPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/faculty/:departmentId" element={<DepartmentFacultyPage />} />
        <Route path="/Faculty" element={<FacultyPage />} />
        <Route path="/Faculty/:departmentId" element={<DepartmentFacultyPage />} />
        <Route path="/machines-equipment" element={<MachinesPage />} />
        <Route path="/machines" element={<MachinesPage />} />
        <Route path="/accreditations" element={<AccreditationsPage />} />
        <Route path="/media-gallery" element={<MediaGalleryPage />} />
        <Route path="/gallery" element={<MediaGalleryPage />} />
        <Route path="/media-gallary" element={<MediaGalleryPage />} />
        <Route path="/laboratories" element={<LaboratoriesPage />} />
        <Route path="/infrastructure/laboratories" element={<LaboratoriesPage />} />
        <Route path="/facilities/laboratories" element={<LaboratoriesPage />} />
        <Route path="/aims-in-the-news" element={<AimsInNewsPage />} />
        <Route path="/aims-in-news" element={<AimsInNewsPage />} />
        <Route path="/news" element={<AimsInNewsPage />} />
        <Route path="/virtual-tour" element={<VirtualTourPage />} />
        <Route path="/virtualtour" element={<VirtualTourPage />} />
        <Route path="/Virtual-Tour" element={<VirtualTourPage />} />

        <Route path="/about-hospital" element={<AboutHospitalPage />} />
        <Route path="/about-institution" element={<AboutInstitutionPage />} />
        <Route path="/founder" element={<FounderPage />} />
        <Route path="/Founder" element={<FounderPage />} />
        <Route path="/founderpage" element={<FounderPage />} />
        <Route path="/management" element={<ManagementPage />} />
        <Route path="/Management" element={<ManagementPage />} />
        <Route path="/leadership/management" element={<ManagementPage />} />
        <Route path="/dean" element={<LeadershipProfilePage id="dr-b-devanand" />} />
        <Route path="/Dean" element={<LeadershipProfilePage id="dr-b-devanand" />} />
        <Route path="/leadership/dean" element={<LeadershipProfilePage id="dr-b-devanand" />} />
        <Route path="/principal" element={<LeadershipProfilePage id="dr-s-suma-preethi" />} />
        <Route path="/Principal" element={<LeadershipProfilePage id="dr-s-suma-preethi" />} />
        <Route path="/leadership/principal" element={<LeadershipProfilePage id="dr-s-suma-preethi" />} />
        <Route path="/leadership/:id" element={<LeadershipProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/Contact" element={<ContactPage />} />
        <Route path="/about/awards" element={<AwardsPage />} />
        <Route path="/facilities/transport" element={<TransportPage />} />

        {/* Content-driven pages: academics, admissions, services, facilities, patient care */}
        <Route path="*" element={<StaticRoute />} />
      </Routes>
      </Suspense>
      <Footer />
      <ChatAssistant />
    </>
  )
}

export default App
