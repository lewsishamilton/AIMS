import Navbar from "./layouts/navbar"
import Footer from "./layouts/footer"
import HeroPage from "./pages/HomePage"
import scintificPdf from "./assets/Scientific-committee.pdf"
import PdfViewerSection from "./layouts/PdfViewer"
import { Route,Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HeroPage/>}/>
        <Route path="/committess/scientific" element={<PdfViewerSection title="Scientific Committee" subtitle="just a test to tesss subtitle" pdfUrl={scintificPdf}/>}/>
      </Routes>
      <Footer/>
   </>
  )
}

export default App
