/**
 * PG annual fees per category, in rupees, for each discipline group. Category-C is three times
 * Category-B in every group, so it is worked out from B. Used by the programme pages and by the
 * AI-readable version of those pages written at build time (src/seo/pgProgrammeSeo.ts).
 */

export const FEE_CATEGORIES = ["Category-A", "Category-B", "Category-C"] as const;
export type FeeGroupTitle = "Clinical" | "Para Clinical" | "Non Clinical";

const feesFrom = (a: number, b: number) => ({ "Category-A": a, "Category-B": b, "Category-C": b * 3 });

export const FEE_GROUPS: { title: FeeGroupTitle; fees: Record<(typeof FEE_CATEGORIES)[number], number> }[] = [
  { title: "Clinical", fees: feesFrom(700000, 2300000) },
  { title: "Para Clinical", fees: feesFrom(430000, 530000) },
  { title: "Non Clinical", fees: feesFrom(170000, 170000) },
];

/** Which fee group each MD / MS programme falls in. */
export const PROGRAMME_FEE_GROUP: Record<string, FeeGroupTitle> = {
  "md-general-medicine": "Clinical",
  "md-dermatology": "Clinical",
  "ms-general-surgery": "Clinical",
  "ms-orthopedics": "Clinical",
  "md-paediatrics": "Clinical",
  "ms-ophthalmology": "Clinical",
  "ms-obstetrics-and-gynaecology": "Clinical",
  "md-anesthesiology": "Clinical",
  "md-pathology": "Para Clinical",
  "md-biochemistry": "Non Clinical",
};

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
