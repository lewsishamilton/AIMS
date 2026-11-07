import { Link, useLocation } from "react-router-dom";
import PageHero from "./PageHero";
import StaticPage from "./StaticPage";
import { STATIC_PAGES } from "../data/pages";
import { PAGE_MEDIA, DEFAULT_MEDIA } from "../data/pageImages";

/**
 * Catch-all route for the content pages in data/pages. Loaded on demand, so the text of all
 * those pages stays out of the first download. Unknown addresses get a "page not found" page.
 */
export default function StaticRoute() {
  const path = useLocation().pathname.replace(/\/+$/, "") || "/";
  const page = STATIC_PAGES[path];
  if (!page) return <NotFound pathname={path} />;
  return <StaticPage key={path} {...page} media={PAGE_MEDIA[path] ?? DEFAULT_MEDIA} />;
}

const POPULAR = [
  { name: "Admissions", path: "/admissions" },
  { name: "Departments", path: "/departments" },
  { name: "Emergency Care", path: "/services/emergency-trauma" },
  { name: "OPD Timings", path: "/patient-care/opd-timings" },
  { name: "Contact Us", path: "/contact" },
];

function NotFound({ pathname }: { pathname: string }) {
  return (
    <>
      <PageHero eyebrow="Error 404" title="Page not found" subtitle="This page has moved or does not exist." pathname={pathname} />
      <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-8">
        <p className="text-[#596d86] dark:text-slate-300">Try one of these instead, or go back to the home page.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/" className="rounded-full bg-[#1f3351] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#162740] dark:bg-teal-600">
            Home
          </Link>
          {POPULAR.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              className="rounded-full border border-[#e4ecf2] bg-white px-5 py-2.5 text-sm font-semibold text-[#1f3351] hover:border-[#1f3351]/30 dark:border-white/10 dark:bg-white/5 dark:text-white"
            >
              {p.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
