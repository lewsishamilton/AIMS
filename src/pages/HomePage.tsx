import { useIsMobile } from "../hooks/useIsMobile";
import AdmissionsPopup from "../components/AdmissionsPopup";
import NewPosterPopup from "../components/NewPosterPopup";
import HomeDesktop from "./HomeDesktop";
import HomeMobile from "./HomeMobile";

function HeroPage() {
  const isMobile = useIsMobile();
  return (
    <>
      <AdmissionsPopup />
      <NewPosterPopup />
      {isMobile ? <HomeMobile /> : <HomeDesktop />}
    </>
  );
}

export default HeroPage;
