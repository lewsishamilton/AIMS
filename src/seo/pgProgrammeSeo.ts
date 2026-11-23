import { PG_PROGRAMME_DETAILS, type PgProgrammeDetail } from "../data/pgProgrammeDetails";
import { PG_ADVANCES } from "../data/pgAdvances";
import { FEE_CATEGORIES, FEE_GROUPS, PROGRAMME_FEE_GROUP, inr } from "../data/pgFees";

/**
 * Search- and AI-readable versions of the MD / MS programme pages.
 *
 * The site renders in the browser, so crawlers that do not run JavaScript (most AI crawlers, such
 * as GPTBot, ClaudeBot and PerplexityBot) would otherwise see an empty page. At build time,
 * scripts/seo/prerender.ts uses this module to write into each programme page:
 *   - schema.org structured data (EducationalOccupationalProgram, FAQPage, BreadcrumbList), and
 *   - the page's text as plain HTML inside #root, which the app replaces as soon as it starts.
 * The same data drives the visible page, so the two never disagree.
 */

const SITE_URL = "https://www.aims.ac.in";
const pagePath = (slug: string) => `/academics/postgraduate/${slug}`;
const plain = (s: string) => s.replace(/\*\*/g, "");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const PG_DETAIL_PATHS = Object.keys(PG_PROGRAMME_DETAILS).map(pagePath);

export function pgDetailFor(path: string): PgProgrammeDetail | undefined {
  const slug = path.replace(/\/+$/, "").split("/").pop() ?? "";
  return path.startsWith("/academics/postgraduate/") ? PG_PROGRAMME_DETAILS[slug] : undefined;
}

/** Search-result title and description for a programme page. */
export function pgMeta(d: PgProgrammeDetail): { title: string; description: string } {
  const degreeName = d.degree === "MS" ? "Master of Surgery" : "Doctor of Medicine";
  return {
    title: `${d.programmeName} Course, Eligibility & Fees | AIMS Hyderabad`,
    description: `${d.programmeName} (${degreeName}) at AIMS Hyderabad: 3-year NMC-regulated residency, KNRUHS-affiliated. Fees, eligibility, NEET-PG admission (code AIMD).`,
  };
}

function feeRows(slug: string) {
  const group = FEE_GROUPS.find((g) => g.title === PROGRAMME_FEE_GROUP[slug]);
  return group ? FEE_CATEGORIES.map((c) => ({ category: c, amount: group.fees[c], group: group.title })) : [];
}

/** schema.org structured data for one programme page. */
export function pgJsonLd(d: PgProgrammeDetail): object {
  const url = `${SITE_URL}${pagePath(d.slug)}/`;
  const advances = PG_ADVANCES[d.slug]?.items ?? [];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOccupationalProgram",
        "@id": `${url}#program`,
        name: d.programmeName,
        url,
        description: plain(d.intro.join(" ")),
        provider: { "@id": `${SITE_URL}/#college` },
        educationalProgramMode: "full-time",
        timeToComplete: "P3Y",
        educationalCredentialAwarded: d.degree === "MS" ? "Master of Surgery (MS)" : "Doctor of Medicine (MD)",
        programPrerequisites: d.eligibility,
        occupationalCategory: d.careers,
        teaches: [...d.outcomes, ...advances.map((a) => a.title)],
        offers: feeRows(d.slug).map((f) => ({
          "@type": "Offer",
          name: `${f.category} annual fee`,
          category: f.category,
          price: f.amount,
          priceCurrency: "INR",
        })),
        termsPerYear: 1,
        inLanguage: "en-IN",
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: d.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Postgraduate (MD / MS)", item: `${SITE_URL}/academics/postgraduate/` },
          { "@type": "ListItem", position: 3, name: d.programmeName, item: url },
        ],
      },
    ],
  };
}

/** The programme page as plain, semantic HTML, for crawlers that do not run JavaScript. */
export function pgStaticHtml(d: PgProgrammeDetail): string {
  const li = (items: string[]) => `<ul>${items.map((x) => `<li>${esc(plain(x))}</li>`).join("")}</ul>`;
  const adv = PG_ADVANCES[d.slug];
  const fees = feeRows(d.slug);
  return [
    `<main style="max-width:860px;margin:0 auto;padding:24px 16px;font-family:system-ui,sans-serif;line-height:1.6;color:#1f2a44">`,
    `<p>Postgraduate · ${d.degree} · Arundathi Institute of Medical Sciences, Hyderabad</p>`,
    `<h1>${esc(d.heroTitle)}</h1>`,
    `<h2>${esc(d.introHeading)}</h2>`,
    ...d.intro.map((p) => `<p>${esc(p)}</p>`),
    `<h2>Programme at a glance</h2>`,
    li([
      "Duration: 3 years",
      `Degree: ${d.degree === "MS" ? "Master of Surgery (MS)" : "Doctor of Medicine (MD)"}`,
      "Affiliation: Kaloji Narayana Rao University of Health Sciences (KNRUHS), Warangal",
      "Regulator: National Medical Commission",
      "Admission: NEET-PG and KNRUHS counselling, college code AIMD",
    ]),
    `<h2>Programme highlights</h2>`,
    `<ul>${d.highlights.map((h) => `<li><strong>${esc(h.label)}:</strong> ${esc(h.text)}</li>`).join("")}</ul>`,
    ...(adv
      ? [
          `<h2>Advances in ${esc(adv.speciality)}</h2>`,
          `<ul>${adv.items.map((a) => `<li><strong>${esc(a.title)}</strong> (${a.atAims ? "available at AIMS" : "emerging in the speciality"}): ${esc(a.text)}</li>`).join("")}</ul>`,
        ]
      : []),
    `<h2>Outcomes</h2>`,
    li(d.outcomes),
    `<h2>Careers</h2>`,
    li(d.careers),
    `<h2>Admissions path</h2>`,
    `<ol>${d.admissionSteps.map((s) => `<li><strong>${esc(s.title)}:</strong> ${esc(plain(s.detail))}</li>`).join("")}</ol>`,
    `<h2>Eligibility</h2>`,
    li(d.eligibility),
    ...(fees.length
      ? [
          `<h2>Fee structure (${esc(fees[0].group)} programmes)</h2>`,
          li(fees.map((f) => `${f.category}: ${inr(f.amount)} per year`)),
          `<p>Fees for each category are as notified for the admission year by the competent authority.</p>`,
        ]
      : []),
    `<h2>Frequently asked questions</h2>`,
    ...d.faqs.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(plain(f.a))}</p>`),
    `</main>`,
  ].join("\n");
}
