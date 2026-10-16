import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BookOpen } from "lucide-react";

/** Vertical tab on the right edge that opens the college brochure (served from /public/documents).
 *  Landing page only, and only once the visitor has scrolled past the full-screen hero. */
export default function BrochureTab() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    // The hero is one screen tall, so past it = scrolled more than ~90% of the viewport.
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  if (!isHome) return null;

  return (
    // .virtual-tour-btn forces position: relative, so the fixed positioning lives on a wrapper.
    <div
      className={`fixed right-0 top-1/2 z-40 -translate-y-1/2 transition-all duration-500 ease-out ${
        pastHero ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
      }`}
      aria-hidden={!pastHero}
    >
      <a
        href="/documents/aims-brochure.pdf"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={pastHero ? 0 : -1}
        aria-label="Open the AIMS brochure (PDF, 22.7 MB)"
        title="AIMS Brochure (PDF, 22.7 MB)"
        style={{ borderRightWidth: 0 }}
        className="brochure-tab flex flex-col items-center gap-2 rounded-l-xl px-2 py-3.5 sm:px-2.5 sm:py-4"
      >
        <BookOpen className="relative z-10 h-4 w-4" />
        <span className="relative z-10 rotate-180 text-[11px] font-bold uppercase tracking-[0.2em] [writing-mode:vertical-rl] sm:text-xs">
          Brochure
        </span>
      </a>
    </div>
  );
}
