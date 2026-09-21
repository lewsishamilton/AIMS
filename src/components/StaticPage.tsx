import React from "react";
import { Link } from "react-router-dom";
import type { ContentBlock } from "../data/types";
import { CARD_CLASS, ContentSections } from "./ContentBlocks";

export interface PageCard {
  name: string;
  description?: string;
  bullets?: string[];
  badges?: string[];
  image?: string;
  meta?: string;
}

export interface StaticPageDef {
  /** Small label above the page title. */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Prose / list content rendered with the shared ContentBlock renderer. */
  sections?: ContentBlock[];
  /** Card grid, for list-shaped pages (specialities, facilities, programs). */
  cardsTitle?: string;
  cardsSubtitle?: string;
  cards?: PageCard[];
  cardColumns?: 2 | 3;
  /** Related pages shown as pills at the bottom. */
  quickLinks?: { name: string; path: string }[];
  /** Closing call-to-action strip. */
  cta?: { text: string; label: string; path: string };
}

const PageCardTile: React.FC<{ card: PageCard }> = ({ card }) => (
  <div
    className={`${CARD_CLASS} p-0 overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1`}
  >
    {card.image && (
      <div className="h-44 w-full overflow-hidden">
        <img
          src={card.image}
          alt={card.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
    )}
    <div className="p-6 sm:p-7 flex flex-col grow">
      {card.badges && card.badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {card.badges.map((b, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#1f3351] dark:bg-teal-600 text-white"
            >
              {b}
            </span>
          ))}
        </div>
      )}

      <h3 className="font-['Manrope',sans-serif] text-lg sm:text-xl font-semibold text-[#1f3351] dark:text-white">
        {card.name}
      </h3>

      {card.meta && (
        <p className="text-xs font-medium text-[#62748a] dark:text-slate-400 mt-1">
          {card.meta}
        </p>
      )}

      {card.description && (
        <p className="text-sm text-[#62748a] dark:text-slate-300 leading-relaxed mt-3">
          {card.description}
        </p>
      )}

      {card.bullets && card.bullets.length > 0 && (
        <ul className="mt-4 space-y-2">
          {card.bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-[13px] text-[#62748a] dark:text-slate-300 leading-relaxed"
            >
              <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#1f3351]/40 dark:bg-teal-400/70 flex-shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

const StaticPage: React.FC<StaticPageDef> = ({
  eyebrow,
  title,
  subtitle,
  sections,
  cardsTitle,
  cardsSubtitle,
  cards,
  cardColumns = 3,
  quickLinks,
  cta,
}) => (
  <section className="relative pt-24 lg:pt-32 pb-20 bg-[#fbfaf5] dark:bg-transparent overflow-hidden tracking-[0.015em] min-h-screen transition-colors duration-300">
    <div className="relative z-10 w-full max-w-[1340px] mx-auto px-4 sm:px-14 lg:px-20">
      {/* Header */}
      <div className="mb-10">
        {eyebrow && (
          <span className="inline-block px-3 py-1 mb-3 rounded-full text-xs font-medium bg-white dark:bg-white/10 text-[#1f3351] dark:text-slate-200 border border-[#dce8ee] dark:border-white/15">
            {eyebrow}
          </span>
        )}
        <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-[0.02em] text-[#1f3351] dark:text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base sm:text-lg leading-relaxed text-[#62748a] dark:text-slate-300 mt-3 max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>

      {sections && sections.length > 0 && <ContentSections sections={sections} />}

      {cards && cards.length > 0 && (
        <div className={sections && sections.length > 0 ? "mt-14" : ""}>
          {cardsTitle && (
            <div className="mb-6">
              <h2 className="font-['Manrope',sans-serif] text-2xl sm:text-3xl font-semibold text-[#1f3351] dark:text-white">
                {cardsTitle}
              </h2>
              {cardsSubtitle && (
                <p className="text-sm sm:text-base text-[#62748a] dark:text-slate-300 mt-2 max-w-3xl">
                  {cardsSubtitle}
                </p>
              )}
            </div>
          )}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 ${
              cardColumns === 3 ? "lg:grid-cols-3" : ""
            }`}
          >
            {cards.map((card) => (
              <PageCardTile key={card.name} card={card} />
            ))}
          </div>
        </div>
      )}

      {quickLinks && quickLinks.length > 0 && (
        <div className="mt-14 pt-8 border-t border-[#dce8ee] dark:border-white/10">
          <h2 className="font-['Manrope',sans-serif] text-sm font-semibold uppercase tracking-wider text-[#62748a] dark:text-slate-400 mb-4">
            Related Pages
          </h2>
          <div className="flex flex-wrap gap-3">
            {quickLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-white dark:bg-white/5 text-[#1f3351] dark:text-slate-200 border border-[#dce8ee] dark:border-white/15 hover:bg-[#1f3351] hover:text-white dark:hover:bg-teal-500 dark:hover:border-teal-400 transition-colors"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {cta && (
        <div
          className={`${CARD_CLASS} mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5`}
        >
          <p className="text-sm sm:text-base text-[#62748a] dark:text-slate-300 leading-relaxed max-w-2xl">
            {cta.text}
          </p>
          <Link
            to={cta.path}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1f3351] dark:bg-teal-500 hover:bg-[#15243b] dark:hover:bg-teal-400 text-white text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors"
          >
            {cta.label} →
          </Link>
        </div>
      )}
    </div>
  </section>
);

export default StaticPage;
