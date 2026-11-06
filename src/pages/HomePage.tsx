import { useIsMobile } from "../hooks/useIsMobile";
import AdmissionsPopup from "../components/AdmissionsPopup";
import HomeDesktop from "./HomeDesktop";
import HomeMobile from "./HomeMobile";

function HeroPage() {
  const isMobile = useIsMobile();
  return (
    <>
      <AdmissionsPopup />
      {isMobile ? <HomeMobile /> : <HomeDesktop />}
    </>
  );
}

export default HeroPage;
