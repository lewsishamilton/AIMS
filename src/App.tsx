import Navbar from "./layouts/navbar"
import Footer from "./layouts/footer"
import HeroPage from "./pages/HomePage"
import { Route,Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HeroPage/>}/>
      </Routes>
      <Footer/>
   </>
  )
}

export default App
