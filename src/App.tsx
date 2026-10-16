import Navbar from "./layouts/navbar"
import Footer from "./layouts/footer"
import BrochureTab from "./components/BrochureTab"
import ChatAssistant from "./components/ChatAssistant"
import HeroPage from "./pages/HomePage"
import scintificPdf from "./assets/Scientific-committee.pdf"
import antiRaggingPdf from "./assets/Anti Ragging Committee.pdf"
import ethicsPdf from "./assets/Ethics Committee.pdf"
import poshInternalPdf from "./assets/POSH internal committee.pdf"
import pharmacovigilancePdf from "./assets/pharmacvigilance committee.pdf"
import disciplinaryPdf from "./assets/Disciplinary committee.pdf"
import meuPdf from "./assets/MEU.pdf"

import { Route, Routes } from "react-router-dom"
import ScrollToTop from "./ScrollToTop"
import { lazy, Suspense } from "react"

// Every page except Home is split into its own file and downloaded when first opened.
const FacultyPage = lazy(() => import("./pages/FacultyPage"))
const DepartmentFacultyPage = lazy(() => import("./pages/DepartmentFacultyPage"))
const DepartmentsPage = lazy(() => import("./pages/DepartmentsPage"))
const MediaGalleryPage = lazy(() => import("./pages/MediaGalleryPage"))
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
      <Navbar />
      <Suspense fallback={<div className="min-h-screen" />}>
      <Routes>
        <Route path="/" element={<HeroPage />} />

        <Route
          path="/committess/meu"
          element={
            <PdfViewerSection
              title="Medical Educational Unit"
              subtitle="Enhancing the quality of medical education through innovative teaching methodologies, curriculum development, faculty training, student-centered learning and continuous assessment to foster academic excellence and professional growth"
              pdfUrl={meuPdf}
            />
          }
        />

        <Route
          path="/committess/scientific"
          element={
            <PdfViewerSection
              title="Scientific Committee"
              subtitle="Fostering a culture of scientific inquiry, research and innovation by encouraging academic collaboration, supporting research methodology, promoting evidence-based practices and advancing knowledge in medical and pharmaceutical sciences"
              pdfUrl={scintificPdf}
            />
          }
        />

        <Route
          path="/committess/anti-ragging"
          element={
            <PdfViewerSection
              title="Anti Ragging Committee"
              subtitle="Ensuring a safe, inclusive and respectful academic environment through awareness programmes, preventive measures, student counselling and effective monitoring while promoting dignity, equality, mutual respect and a campus culture free from ragging"
              pdfUrl={antiRaggingPdf}
            />
          }
        />

        <Route
          path="/committess/ethics"
          element={
            <PdfViewerSection
              title="Ethics Committee"
              subtitle="Upholding ethical principles in medical education, research and healthcare by protecting the rights, safety and dignity of individuals, promoting responsible scientific conduct, ensuring informed consent and encouraging integrity in professional practice"
              pdfUrl={ethicsPdf}
            />
          }
        />

        <Route
          path="/committess/posh-internal"
          element={
            <PdfViewerSection
              title="POSH Internal Committee"
              subtitle="Promoting a safe, inclusive and dignified educational and working environment through awareness initiatives, prevention of sexual harassment, confidential complaint handling and appropriate redressal mechanisms while safeguarding the rights and well-being of every individual"
              pdfUrl={poshInternalPdf}
            />
          }
        />

        <Route
          path="/committess/pharmacovigilance"
          element={
            <PdfViewerSection
              title="Pharmacovigilance Committee"
              subtitle="Strengthening patient safety and the responsible use of medicines through adverse drug reaction reporting, drug safety monitoring, identification and assessment of medication-related risks, rational drug use and continuous improvement in pharmaceutical care"
              pdfUrl={pharmacovigilancePdf}
            />
          }
        />

        <Route
          path="/committess/disciplinary"
          element={
            <PdfViewerSection
              title="Disciplinary Committee"
              subtitle="Promoting academic integrity, professional responsibility and adherence to institutional rules through fair disciplinary procedures, awareness of student responsibilities, ethical conduct and constructive guidance to maintain a harmonious, respectful and well-disciplined campus community"
              pdfUrl={disciplinaryPdf}
            />
          }
        />

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
      <BrochureTab />
      <ChatAssistant />
    </>
  )
}

export default App
