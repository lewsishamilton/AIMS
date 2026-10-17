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
    <div
      className={`fixed right-0 top-1/2 z-40 -translate-y-1/2 max-sm:translate-x-0 max-sm:opacity-100 max-sm:pointer-events-auto max-sm:transition-none transition-[transform,opacity] duration-500 ease-out ${
        pastHero ? "sm:translate-x-0 sm:opacity-100 sm:pointer-events-auto" : "sm:translate-x-full sm:opacity-0 sm:pointer-events-none"
      }`}
      aria-hidden={false}
    >
      <a
        href="/documents/aims-brochure.pdf"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open the AIMS brochure (PDF, 22.7 MB)"
        title="AIMS Brochure (PDF, 22.7 MB)"
        style={{ borderRightWidth: 0 }}
        className="brochure-tab flex flex-col items-center gap-1.5 sm:gap-2 rounded-l-xl px-2 py-3 sm:px-2.5 sm:py-4 text-[#f8fafc]"
      >
        <BookOpen className="relative z-10 h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
        <span className="relative z-10 rotate-180 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] [writing-mode:vertical-rl] text-[#f8fafc]">
          Brochure
        </span>
      </a>
    </div>
  );
}
