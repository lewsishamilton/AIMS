import { useIsMobile } from "../hooks/useIsMobile";
import HomeDesktop from "./HomeDesktop";
import HomeMobile from "./HomeMobile";

function HeroPage() {
  const isMobile = useIsMobile();
  return isMobile ? <HomeMobile /> : <HomeDesktop />;
}

export default HeroPage;
