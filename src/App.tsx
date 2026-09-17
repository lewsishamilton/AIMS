import Navbar from "./layouts/navbar"
import Footer from "./layouts/footer"
import HeroPage from "./pages/HomePage"
import scintificPdf from "./assets/Scientific-committee.pdf"
import antiRaggingPdf from "./assets/Anti Ragging Committee.pdf"
import ethicsPdf from "./assets/Ethics Committee.pdf"
import poshInternalPdf from "./assets/POSH internal committee.pdf"
import pharmacovigilancePdf from "./assets/pharmacvigilance committee.pdf"
import disciplinaryPdf from "./assets/Disciplinary committee.pdf"
import meuPdf from "./assets/MEU.pdf"

import PdfViewerSection from "./layouts/PdfViewer"
import { Route,Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HeroPage/>}/>

        <Route
          path="/committess/meu"
          element={
            <PdfViewerSection
              title="Medical Educational Unit"
              pdfUrl={meuPdf}
            />
          }
        />

        <Route
          path="/committess/scientific"
          element={
            <PdfViewerSection
              title="Scientific Committee"
              subtitle="Research, Innovation and Scientific Excellence"
              pdfUrl={scintificPdf}
            />
          }
        />

          <Route
            path="/committess/anti-ragging"
            element={
              <PdfViewerSection
                title="Anti Ragging Committee"
                subtitle="Ensuring a Safe and Respectful Campus"
                pdfUrl={antiRaggingPdf}
              />
            }
          />

          <Route
            path="/committess/ethics"
            element={
              <PdfViewerSection
                title="Ethics Committee"
                subtitle="Upholding Integrity and Ethical Standards"
                pdfUrl={ethicsPdf}
              />
            }
          />

          <Route
            path="/committess/posh-internal"
            element={
              <PdfViewerSection
                title="POSH Internal Committee"
                subtitle="Promoting a Safe and Inclusive Workplace"
                pdfUrl={poshInternalPdf}
              />
            }
          />

          <Route
            path="/committess/pharmacovigilance"
            element={
              <PdfViewerSection
                title="Pharmacovigilance Committee"
                subtitle="Ensuring Medication Safety and Patient Care"
                pdfUrl={pharmacovigilancePdf}
              />
            }
          />

          <Route
            path="/committess/disciplinary"
            element={
              <PdfViewerSection
                title="Disciplinary Committee"
                subtitle="Maintaining Discipline and Professional Conduct"
                pdfUrl={disciplinaryPdf}
              />
            }
          />
      </Routes>
      <Footer/>
   </>
  )
}

export default App
