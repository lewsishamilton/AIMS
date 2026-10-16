import aimsVideo from "../../assets/AIMS.mp4";
import aimsVideoMobile from "../../assets/AIMS-mobile.mp4";
import aimsPosterMobile from "../../assets/AIMS-poster.webp";
import aimsPosterDesktop from "../../assets/AIMS-poster-desktop.webp";
import HeroStats from "./Hero-stats";

// Visitors who turned on data saving get the still frame instead of the video.
const saveData =
    typeof navigator !== "undefined" &&
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

// Phones and desktop play different videos, so each gets its own opening frame as the poster.
const aimsPoster =
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches ? aimsPosterMobile : aimsPosterDesktop;

const Hero = () => {
    return (
        <section className="relative w-full h-screen min-h-[650px] max-md:h-[100svh] max-md:min-h-0 flex flex-col justify-end overflow-hidden font-['Inter',sans-serif]">
            {/* Background video: a vertical 1080p cut on phones, the landscape 1080p film elsewhere; the poster (its opening frame) shows while it loads */}
            {saveData ? (
                <img src={aimsPoster} alt="" className="absolute inset-0 w-full h-full object-cover z-0" />
            ) : (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster={aimsPoster}
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source src={aimsVideoMobile} type="video/mp4" media="(max-width: 767px)" />
                    <source src={aimsVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            {/* Dark Vignette */}
            <div className="absolute inset-0 bg-black/35 z-10" />

            {/* Top Black Gradient */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10 pointer-events-none" />

            {/* Bottom Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0d2346]/95 via-[#0d2346]/40 to-transparent dark:from-[#070d18]/95 dark:via-[#070d18]/50 z-10 pointer-events-none" />

            {/* Hard-locked to the absolute bottom border */}
            <div className="relative z-20 w-full pb-6 sm:pb-10 lg:pb-12 mb-0">
                <HeroStats />
            </div>
        </section>
    );
};

export default Hero;
