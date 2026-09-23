import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ContentBlock } from "../data/types";
import type { LucideIcon } from "lucide-react";
import type { PageMedia } from "../data/pageImages";
import { DEFAULT_MEDIA } from "../data/pageImages";
import OpdSchedule from "./OpdSchedule";
import CampusVirtualTour from "./CampusVirtualTour";
import PageHero from "./PageHero";
import { ACCENT, sectionFor } from "./sectionTheme";
import { groupSections } from "./ContentBlocks";

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
  /** Prose / list content. A block gets a photo only where the manifest maps one. */
  sections?: ContentBlock[];
  /** Card grid, for list-shaped pages (specialities, facilities, programs). */
  cardsTitle?: string;
  cardsSubtitle?: string;
  cards?: PageCard[];
  cardColumns?: 2 | 3;
  /** Related pages shown at the bottom. */
  quickLinks?: { name: string; path: string }[];
  /** Closing call-to-action strip. */
  cta?: { text: string; label: string; path: string };
  /** Hero and supporting photography, supplied from the media manifest. */
  media?: PageMedia;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/** Scroll-triggered fade-and-rise, used for every block on the page. */
const Reveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className, delay = 0 }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 34 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-70px" }}
    transition={{ duration: 0.7, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

/** Photograph in a rounded frame that lifts and zooms on hover. */
const Frame: React.FC<{
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
}> = ({ src, alt, className = "", ratio = "aspect-[4/3]" }) => (
  <div
    className={`group relative ${ratio} w-full overflow-hidden rounded-[28px] border border-white/60 dark:border-white/10 shadow-[0_18px_44px_rgba(15,23,42,0.16)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] ${className}`}
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.07]"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b172a]/45 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-40" />
  </div>
);

/** The site-wide kicker: a rule either side of small, wide-tracked caps. */
const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-center gap-3">
    <span className="h-[1.5px] w-8 flex-shrink-0 bg-[#cbd5e1] sm:w-10 dark:bg-white/20" />
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#4b6382] sm:text-[13px] dark:text-teal-400">
      {children}
    </span>
    <span className="h-[1.5px] w-8 flex-shrink-0 bg-[#cbd5e1] sm:w-10 dark:bg-white/20" />
  </div>
);

/** `columns` splits long checklists into two, so they do not run down the page. */
const Bullets: React.FC<{ items: string[]; columns?: boolean }> = ({
  items,
  columns = false,
}) => (
  <ul
    className={`mt-5 space-y-3 ${
      columns ? "sm:grid sm:grid-cols-2 sm:gap-x-7 sm:space-y-0 sm:gap-y-3" : ""
    }`}
  >
    {items.map((b, i) => (
      <li
        key={i}
        className="flex items-start gap-3 text-sm sm:text-[15px] leading-relaxed text-[#596d86] dark:text-slate-300"
      >
        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#1f3351]/10 text-[11px] font-bold text-[#1f3351] dark:bg-teal-500/20 dark:text-teal-300">
          ✓
        </span>
        <span>{b}</span>
      </li>
    ))}
  </ul>
);

const Badges: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="mb-4 flex flex-wrap gap-2">
    {items.map((b, i) => (
      <span
        key={i}
        className="rounded-full bg-[#1f3351] px-3.5 py-1 text-[11px] font-semibold text-white dark:bg-teal-600"
      >
        {b}
      </span>
    ))}
  </div>
);

/* ──────────────────────── Sections ──────────────────────── */

/**
 * A section the manifest has a photograph for: picture one side, words the
 * other, sides alternating down the page.
 */
const SplitSection: React.FC<{
  block: ContentBlock;
  image: string;
  flip: boolean;
}> = ({ block, image, flip }) => (
  <Reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
    <div className={flip ? "lg:order-2" : ""}>
      <Frame src={image} alt={block.title ?? "AIMS"} />
    </div>
    <div className={flip ? "lg:order-1" : ""}>
      <SectionBody block={block} />
    </div>
  </Reveal>
);

/**
 * A section with no photograph. Rather than pad it with a stock picture, the
 * heading sits in its own column against the text — an editorial two-column
 * measure that carries the width on its own.
 */
const ProseSection: React.FC<{ block: ContentBlock }> = ({ block }) => (
  <Reveal className="grid gap-5 border-t border-[#e4ecf2] pt-9 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 dark:border-white/10">
    <div className="lg:sticky lg:top-28 lg:self-start">
      {block.badges && block.badges.length > 0 && <Badges items={block.badges} />}
      {block.title && (
        <h2 className="font-['Manrope',sans-serif] text-2xl font-bold leading-tight tracking-tight text-[#162740] dark:text-white sm:text-3xl lg:text-[32px]">
          {block.title}
        </h2>
      )}
      {block.subtitle && (
        <p className="mt-2.5 text-xs font-semibold uppercase tracking-wider text-[#4b6382] dark:text-teal-400 sm:text-[13px]">
          {block.subtitle}
        </p>
      )}
    </div>
    <div>
      {block.content && (
        <div className="space-y-3.5 text-sm leading-relaxed text-[#596d86] dark:text-slate-300 sm:text-[15px]">
          {Array.isArray(block.content) ? (
            block.content.map((para, i) => <p key={i}>{para}</p>)
          ) : (
            <p>{block.content}</p>
          )}
        </div>
      )}
      {block.bullets && block.bullets.length > 0 && (
        <Bullets items={block.bullets} columns={block.bullets.length > 4} />
      )}
    </div>
  </Reveal>
);

/** Title, prose and bullets — shared by the photo and no-photo layouts. */
const SectionBody: React.FC<{ block: ContentBlock }> = ({ block }) => (
  <>
    {block.badges && block.badges.length > 0 && <Badges items={block.badges} />}
    {block.title && (
      <h2 className="font-['Manrope',sans-serif] text-2xl font-bold leading-tight tracking-tight text-[#162740] dark:text-white sm:text-3xl lg:text-[32px]">
        {block.title}
      </h2>
    )}
    {block.subtitle && (
      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#4b6382] dark:text-teal-400 sm:text-[13px]">
        {block.subtitle}
      </p>
    )}
    {block.content && (
      <div className="mt-4 space-y-3.5 text-sm leading-relaxed text-[#596d86] dark:text-slate-300 sm:text-base">
        {Array.isArray(block.content) ? (
          block.content.map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <p>{block.content}</p>
        )}
      </div>
    )}
    {block.bullets && block.bullets.length > 0 && <Bullets items={block.bullets} />}
  </>
);

/**
 * Half-width blocks sit side by side as numbered tiles. They take a photograph
 * only where the manifest names one, so a set of procedural steps stays clean.
 */
const TileGrid: React.FC<{
  blocks: ContentBlock[];
  imageFor: (block: ContentBlock) => string | undefined;
  startIndex: number;
}> = ({ blocks, imageFor, startIndex }) => (
  <div className="grid gap-6 sm:gap-7 md:grid-cols-2">
    {blocks.map((block, i) => {
      const image = imageFor(block);
      return (
        <Reveal key={i} delay={(i % 2) * 0.1}>
          <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e4ecf2] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(15,23,42,0.15)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] dark:backdrop-blur-xl">
            {image ? (
              <div className="relative h-40 w-full overflow-hidden sm:h-44">
                <img
                  src={image}
                  alt={block.title ?? "AIMS"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a]/85 via-[#0b172a]/25 to-transparent" />
                {block.title && (
                  <h3 className="absolute inset-x-5 bottom-4 font-['Manrope',sans-serif] text-lg font-bold leading-snug text-white drop-shadow-sm sm:text-xl">
                    {block.title}
                  </h3>
                )}
              </div>
            ) : null}

            <div className="flex grow flex-col p-6 sm:p-7">
              <span className="mb-3 block font-['Manrope',sans-serif] text-[28px] font-extrabold leading-none text-[#1f3351]/15 dark:text-teal-400/25">
                {String(startIndex + i + 1).padStart(2, "0")}
              </span>

              {!image && block.title && (
                <h3 className="font-['Manrope',sans-serif] text-lg font-bold leading-snug text-[#162740] dark:text-white sm:text-xl">
                  {block.title}
                </h3>
              )}
              {block.badges && block.badges.length > 0 && (
                <div className="mt-3">
                  <Badges items={block.badges} />
                </div>
              )}
              {block.subtitle && (
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#4b6382] dark:text-teal-400">
                  {block.subtitle}
                </p>
              )}
              {block.content && (
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-[#596d86] dark:text-slate-300">
                  {Array.isArray(block.content) ? (
                    block.content.map((para, pi) => <p key={pi}>{para}</p>)
                  ) : (
                    <p>{block.content}</p>
                  )}
                </div>
              )}
              {block.bullets && block.bullets.length > 0 && <Bullets items={block.bullets} />}
            </div>
          </article>
        </Reveal>
      );
    })}
  </div>
);

/* ─────────────────────────── Cards ─────────────────────────── */

const ImageCard: React.FC<{
  card: PageCard;
  image?: string;
  icon?: LucideIcon;
  index: number;
}> = ({ card, image, icon: Icon, index }) => (
  <Reveal delay={(index % 3) * 0.09}>
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e4ecf2] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.07)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_26px_56px_rgba(15,23,42,0.17)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] dark:backdrop-blur-xl">
      {image ? (
        <div className="relative h-52 w-full overflow-hidden sm:h-56">
          <img
            src={image}
            alt={card.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a] via-[#0b172a]/45 to-transparent" />
          {card.badges && card.badges.length > 0 && (
            <div className="absolute left-5 top-4 flex flex-wrap gap-2">
              {card.badges.map((b, i) => (
                <span
                  key={i}
                  className="rounded-full border border-white/25 bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md"
                >
                  {b}
                </span>
              ))}
            </div>
          )}
          <div className="absolute inset-x-5 bottom-4">
            <h3 className="font-['Manrope',sans-serif] text-xl font-bold leading-snug text-white drop-shadow-sm sm:text-[22px]">
              {card.name}
            </h3>
            {card.meta && (
              <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/75">
                {card.meta}
              </p>
            )}
          </div>
        </div>
      ) : (
        /* No photograph exists for this one — a glyph panel stands in for it. */
        <div className="relative overflow-hidden border-b border-[#e4ecf2] bg-gradient-to-br from-[#eef3f8] to-[#dce7f0] px-6 pb-5 pt-6 sm:px-7 dark:border-white/10 dark:from-white/[0.07] dark:to-white/[0.02]">
          {Icon && (
            <Icon
              aria-hidden="true"
              strokeWidth={1.25}
              className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 text-[#1f3351]/10 transition-transform duration-700 group-hover:scale-110 dark:text-teal-300/15"
            />
          )}
          <span className="relative mb-3 block h-1 w-10 rounded-full bg-[#1f3351] dark:bg-teal-400" />
          <div className="relative">
            {card.badges && card.badges.length > 0 && <Badges items={card.badges} />}
            <h3 className="font-['Manrope',sans-serif] text-xl font-bold leading-snug text-[#162740] dark:text-white sm:text-[22px]">
              {card.name}
            </h3>
            {card.meta && (
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#4b6382] dark:text-teal-400">
                {card.meta}
              </p>
            )}
          </div>
        </div>
      )}

      {(card.description || card.bullets) && (
        <div className="flex grow flex-col p-6 sm:p-7">
          {card.description && (
            <p className="text-sm leading-relaxed text-[#596d86] dark:text-slate-300">
              {card.description}
            </p>
          )}
          {card.bullets && card.bullets.length > 0 && <Bullets items={card.bullets} />}
        </div>
      )}
    </article>
  </Reveal>
);

/* ─────────────────────── Related pages ─────────────────────── */

/** Each tile previews the glyph of the masthead it leads to. */
const QuickLinkTiles: React.FC<{ links: { name: string; path: string }[] }> = ({
  links,
}) => (
  <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
    {links.map((l, i) => {
      const { Icon } = sectionFor(l.path);
      return (
        <Reveal key={l.path} delay={(i % 4) * 0.07}>
          <Link
            to={l.path}
            className="group relative flex h-32 flex-col justify-end overflow-hidden rounded-[20px] border border-[#e4ecf2] bg-[#13243c] p-5 transition-transform duration-500 hover:-translate-y-1 sm:h-36 dark:border-white/10 dark:bg-[#0b1626]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-80"
              style={{
                background: `radial-gradient(70% 120% at 85% 5%, ${ACCENT}38, transparent 70%)`,
              }}
            />
            <Icon
              aria-hidden="true"
              strokeWidth={1}
              className="pointer-events-none absolute -right-3 -top-3 h-24 w-24 transition-transform duration-500 group-hover:scale-110"
              style={{ color: ACCENT, opacity: 0.18 }}
            />
            <span className="relative mb-2 block h-[1.5px] w-8 bg-white/25" />
            <span className="relative flex items-end justify-between gap-2">
              <span className="font-['Manrope',sans-serif] text-sm font-bold leading-snug text-white sm:text-[15px]">
                {l.name}
              </span>
              <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white/70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </span>
          </Link>
        </Reveal>
      );
    })}
  </div>
);

/* ─────────────────────────── Page ─────────────────────────── */

const SectionHeading: React.FC<{
  eyebrow: string;
  title: string;
  subtitle?: string;
}> = ({ eyebrow, title, subtitle }) => (
  <Reveal className="mb-9 max-w-3xl">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 className="mt-3 font-['Manrope',sans-serif] text-2xl font-bold leading-tight tracking-tight text-[#162740] dark:text-white sm:text-3xl lg:text-[38px]">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-sm leading-relaxed text-[#596d86] dark:text-slate-300 sm:text-base">
        {subtitle}
      </p>
    )}
  </Reveal>
);

/** Purpose-built blocks that replace prose on pages whose subject is structured. */
const PAGE_WIDGETS: Record<string, React.FC | undefined> = {
  "/patient-care/opd-timings": OpdSchedule,
};

/** Purpose-built blocks rendered below main content or cards. */
const PAGE_BOTTOM_WIDGETS: Record<string, React.FC | undefined> = {
  "/facilities/campus-life": CampusVirtualTour,
};

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
  media = DEFAULT_MEDIA,
}) => {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const Widget = PAGE_WIDGETS[normalizedPath] || PAGE_WIDGETS[pathname];
  const BottomWidget = PAGE_BOTTOM_WIDGETS[normalizedPath] || PAGE_BOTTOM_WIDGETS[pathname];

  const groups = sections && sections.length > 0 ? groupSections(sections) : [];
  const sectionImage = (block: ContentBlock) =>
    block.title ? media.sectionImages?.[block.title] : undefined;

  const hasCards = !!cards && cards.length > 0;

  // Work out the layout before rendering: which rows get a photograph, which
  // side it sits on, and where each tile falls in the running numbering.
  type Row =
    | { kind: "split"; block: ContentBlock; image: string; flip: boolean }
    | { kind: "prose"; block: ContentBlock }
    | { kind: "tiles"; blocks: ContentBlock[]; startIndex: number };

  const rows: Row[] = [];
  let photoRow = 0;
  let tileIndex = 0;
  for (const group of groups) {
    if (group.type === "full") {
      const image = sectionImage(group.section);
      if (image) {
        rows.push({ kind: "split", block: group.section, image, flip: photoRow % 2 === 1 });
        photoRow += 1;
      } else {
        rows.push({ kind: "prose", block: group.section });
      }
    } else {
      rows.push({ kind: "tiles", blocks: group.sections, startIndex: tileIndex });
      tileIndex += group.sections.length;
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] tracking-[0.015em] transition-colors duration-300 dark:bg-transparent">
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        pathname={pathname}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pb-20 sm:px-8 lg:px-12">
        {Widget && (
          <div className="pt-10 sm:pt-12">
            <Widget />
          </div>
        )}

        {rows.length > 0 && (
          <div className="space-y-14 pt-12 sm:space-y-16 lg:space-y-20">
            {rows.map((row, i) => {
              if (row.kind === "split") {
                return (
                  <SplitSection
                    key={i}
                    block={row.block}
                    image={row.image}
                    flip={row.flip}
                  />
                );
              }
              if (row.kind === "prose") {
                return <ProseSection key={i} block={row.block} />;
              }
              return (
                <TileGrid
                  key={i}
                  blocks={row.blocks}
                  imageFor={sectionImage}
                  startIndex={row.startIndex}
                />
              );
            })}
          </div>
        )}

        {hasCards && (
          <div className={rows.length > 0 || Widget ? "mt-16 sm:mt-20" : "pt-12"}>
            {cardsTitle && (
              <SectionHeading
                eyebrow={eyebrow ?? "AIMS"}
                title={cardsTitle}
                subtitle={cardsSubtitle}
              />
            )}
            <div
              className={`grid gap-6 sm:grid-cols-2 sm:gap-7 ${
                cardColumns === 3 ? "lg:grid-cols-3" : ""
              }`}
            >
              {cards!.map((card, i) => (
                <ImageCard
                  key={card.name}
                  card={card}
                  index={i}
                  image={card.image ?? media.cardImages?.[card.name]}
                  icon={media.cardIcons?.[card.name]}
                />
              ))}
            </div>
          </div>
        )}

        {BottomWidget && (
          <div className="mt-16 sm:mt-20">
            <BottomWidget />
          </div>
        )}

        {quickLinks && quickLinks.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <Reveal className="mb-7">
              <Eyebrow>Explore Next</Eyebrow>
              <h2 className="mt-3 font-['Manrope',sans-serif] text-2xl font-bold tracking-tight text-[#162740] dark:text-white sm:text-3xl">
                Related Pages
              </h2>
            </Reveal>
            <QuickLinkTiles links={quickLinks} />
          </div>
        )}

        {cta && (
          <Reveal className="mt-14 sm:mt-16">
            <div className="flex flex-col gap-6 rounded-[28px] bg-gradient-to-br from-[#1f3351] to-[#0b172a] p-8 sm:flex-row sm:items-center sm:justify-between sm:p-11 dark:from-teal-900/40 dark:to-[#0b172a] dark:border dark:border-white/10">
              <p className="max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                {cta.text}
              </p>
              <Link
                to={cta.path}
                className="group inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-xs font-bold text-[#0b172a] transition-all duration-300 hover:bg-teal-400 hover:text-white sm:text-sm"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default StaticPage;
