import aimsvideo from "../../assets/AIMS.mp4";
import HeroStats from "./Hero-stats";

const Hero = () => {
    return (
        <section className="relative w-full h-screen min-h-[650px] flex flex-col justify-end overflow-hidden font-['Inter',sans-serif]">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src={aimsvideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Vignette */}
            <div className="absolute inset-0 bg-black/35 z-10" />

            {/* Top Black Gradient */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10 pointer-events-none" />

            {/* Bottom Gradient */}
            <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#0d2346]/95 via-[#0d2346]/40 to-transparent z-10 pointer-events-none" />

            {/* Hard-locked to the absolute bottom border */}
            <div className="relative z-20 w-full pb-12 mb-0">
                <HeroStats />
            </div>
        </section>
    );
};

export default Hero;