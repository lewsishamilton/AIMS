import { useLocation } from "react-router-dom";
import StaticPage from "./StaticPage";
import { STATIC_PAGES } from "../data/pages";
import { PAGE_MEDIA, DEFAULT_MEDIA } from "../data/pageImages";

/**
 * Catch-all route for the content pages in data/pages. Loaded on demand, so the text of all
 * those pages stays out of the first download. Unknown addresses render nothing, as before.
 */
export default function StaticRoute() {
  const path = useLocation().pathname.replace(/\/+$/, "") || "/";
  const page = STATIC_PAGES[path];
  if (!page) return null;
  return <StaticPage key={path} {...page} media={PAGE_MEDIA[path] ?? DEFAULT_MEDIA} />;
}
