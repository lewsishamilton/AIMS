import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Create, update or (with null) remove a <meta name> or <link rel> tag in the head. */
function setHeadTag(tag: "meta" | "link", key: string, value: string | null) {
  const attr = tag === "meta" ? "name" : "rel";
  const valueAttr = tag === "meta" ? "content" : "href";
  let el = document.head.querySelector<HTMLElement>(`${tag}[${attr}="${key}"]`);
  if (value === null) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute(valueAttr, value);
}

/**
 * Keeps the tab title, description and canonical link in step with the page as visitors move
 * around. The first page already arrives with them set (scripts/seo/prerender.ts); this covers
 * navigation inside the app. The metadata module loads on demand, after the page has rendered.
 */
export default function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    let cancelled = false;
    import("../seo/routeMeta").then(({ metaFor, urlFor, SITE_NAME }) => {
      if (cancelled) return;
      const meta = metaFor(pathname);
      document.title = meta?.title ?? `Page not found | ${SITE_NAME}`;
      setHeadTag("meta", "description", meta?.description ?? null);
      setHeadTag("link", "canonical", meta ? urlFor(meta.path) : null);
      setHeadTag("meta", "robots", meta ? null : "noindex");
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
