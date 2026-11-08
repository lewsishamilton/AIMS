/**
 * Runs after `vite build`. Gives every page a real HTML file so the server answers 200 (not 404)
 * and search engines see that page's own title, description, canonical address and share preview.
 * Also writes sitemap.xml, robots.txt and 404.html.
 *
 * Page metadata comes from src/seo/routeMeta.ts, the same module the site uses in the browser.
 * Node runs it directly; the hooks below resolve extensionless imports and turn asset imports
 * (images, PDFs) into plain strings, since only text is needed here.
 *
 *   node scripts/seo/prerender.ts
 */
import { registerHooks } from "node:module";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ASSET = /\.(webp|png|jpe?g|gif|svg|pdf|mp4)$/i;

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (!specifier.startsWith(".") || /\.[a-z]+$/i.test(specifier)) throw err;
      for (const candidate of [`${specifier}.ts`, `${specifier}/index.ts`]) {
        try {
          return nextResolve(candidate, context);
        } catch {
          /* try the next form */
        }
      }
      throw err;
    }
  },
  load(url, context, nextLoad) {
    if (ASSET.test(url)) return { format: "module", source: `export default ${JSON.stringify(url)};`, shortCircuit: true };
    return nextLoad(url, context);
  },
});

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dist = join(root, "dist");
const { CANONICAL_PAGES, SERVED_PATHS, SITE_NAME, SITE_URL, urlFor } = await import("../../src/seo/routeMeta.ts");
type Meta = (typeof CANONICAL_PAGES)[number];

// The tags sit between markers, so running this again (dist/index.html is also the home page it
// writes) replaces the previous set instead of adding a second one.
const START = "<!-- seo:start -->";
const END = "<!-- seo:end -->";
const SEO_BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->|<title>[^<]*<\/title>/;
const template = readFileSync(join(dist, "index.html"), "utf8");
if (!SEO_BLOCK.test(template)) throw new Error("dist/index.html has no <title> to replace");

const OG_IMAGE = `${SITE_URL}/images/og-aims.jpg`;
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function headTags(meta: Meta, robots?: string): string {
  const url = urlFor(meta.path);
  return [
    START,
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    robots ? `<meta name="robots" content="${robots}" />` : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    END,
  ].join("\n    ");
}

const page = (meta: Meta, robots?: string) => template.replace(SEO_BLOCK, headTags(meta, robots));

// One folder per address. Case-only variants (/Faculty, /faculty) share a folder on Windows and
// carry the same page, so each is written once.
const written = new Set<string>();
for (const [path, meta] of SERVED_PATHS) {
  const key = path.toLowerCase();
  if (written.has(key)) continue;
  written.add(key);
  const file = path === "/" ? join(dist, "index.html") : join(dist, ...path.split("/").filter(Boolean), "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, page(meta));
}

writeFileSync(
  join(dist, "404.html"),
  page({ path: "/404", title: `Page not found | ${SITE_NAME}`, description: "The page you are looking for is not on this site." }, "noindex")
);

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${CANONICAL_PAGES.map((p) => `  <url><loc>${urlFor(p.path)}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`
);

writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

if (!existsSync(join(dist, "images", "og-aims.jpg"))) console.warn("[seo] public/images/og-aims.jpg is missing; share previews will have no image");
console.log(`[seo] ${written.size} page files, ${CANONICAL_PAGES.length} sitemap URLs, robots.txt, 404.html`);
