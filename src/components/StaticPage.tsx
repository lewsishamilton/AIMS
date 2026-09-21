import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ContentBlock } from "../data/types";
import type { PageMedia } from "../data/pageImages";
import { DEFAULT_MEDIA } from "../data/pageImages";
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
  /** Prose / list content, rendered as alternating photo-and-text rows. */
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

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="inline-flex items-center gap-3">
    <span className="h-[1.5px] w-8 bg-[#cbd5e1] dark:bg-white/25" />
    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4b6382] dark:text-teal-400">
      {children}
    </span>
  </div>
);

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="mt-5 space-y-3">
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

/* ─────────────────────────── Hero ─────────────────────────── */

const PageHero: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image: string;
}> = ({ eyebrow, title, subtitle, image }) => (
  <header className="relative h-[62vh] min-h-[440px] w-full overflow-hidden lg:h-[70vh]">
    <motion.img
      src={image}
      alt={title}
      initial={{ scale: 1.14 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.8, ease: EASE }}
      className="absolute inset-0 h-full w-full object-cover"
    />

    {/* Legibility scrim behind the title */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#081324] via-[#081324]/60 to-[#081324]/25" />
    {/* Top scrim only matters in dark mode — in light mode the navbar is opaque */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent to-transparent dark:from-black/65" />
    {/* Blends the hero into the dark page background; light mode keeps a crisp edge */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-transparent to-transparent dark:from-[#060b14]" />

    <div className="relative z-10 mx-auto flex h-full w-full max-w-[1280px] flex-col justify-end px-4 pb-16 sm:px-8 lg:px-12 lg:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
      >
        {eyebrow && (
          <span className="mb-4 inline-block rounded-full border border-white/25 bg-white/15 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-4xl font-['Manrope',sans-serif] text-3xl font-bold leading-[1.12] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)] sm:text-4xl lg:text-[52px]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/85 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] sm:text-base lg:text-[17px]">
            {subtitle}
          </p>
        )}
      </motion.div>
    </div>
  </header>
);

/* ──────────────────── Sections as photo rows ──────────────────── */

const SplitSection: React.FC<{
  block: ContentBlock;
  image: string;
  flip: boolean;
}> = ({ block, image, flip }) => (
  <Reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
    <div className={flip ? "lg:order-2" : ""}>
      <Frame src={image} alt={block.title ?? "AIMS campus"} />
    </div>

    <div className={flip ? "lg:order-1" : ""}>
      {block.badges && block.badges.length > 0 && <Badges items={block.badges} />}

      {block.title && (
        <h2 className="font-['Manrope',sans-serif] text-2xl font-bold leading-tight tracking-tight text-[#162740] dark:text-white sm:text-3xl lg:text-[34px]">
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
            block.content.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            <p>{block.content}</p>
          )}
        </div>
      )}

      {block.bullets && block.bullets.length > 0 && <Bullets items={block.bullets} />}
    </div>
  </Reveal>
);

/** Half-width blocks become a grid of picture-topped tiles. */
const TileGrid: React.FC<{ blocks: ContentBlock[]; images: string[] }> = ({
  blocks,
  images,
}) => (
  <div className="grid gap-6 sm:gap-7 md:grid-cols-2">
    {blocks.map((block, i) => (
      <Reveal key={i} delay={(i % 2) * 0.1}>
        <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e4ecf2] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(15,23,42,0.16)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] dark:backdrop-blur-xl">
          <div className="relative h-40 w-full overflow-hidden sm:h-44">
            <img
              src={images[i % images.length]}
              alt={block.title ?? "AIMS"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a]/85 via-[#0b172a]/25 to-transparent" />
            <span className="absolute left-5 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[12px] font-bold text-white backdrop-blur-md">
              {String(i + 1).padStart(2, "0")}
            </span>
            {block.title && (
              <h3 className="absolute inset-x-5 bottom-4 font-['Manrope',sans-serif] text-lg font-bold leading-snug text-white drop-shadow-sm sm:text-xl">
                {block.title}
              </h3>
            )}
          </div>

          <div className="flex grow flex-col p-6 sm:p-7">
            {block.badges && block.badges.length > 0 && <Badges items={block.badges} />}
            {block.subtitle && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#4b6382] dark:text-teal-400">
                {block.subtitle}
              </p>
            )}
            {block.content && (
              <div className="space-y-3 text-sm leading-relaxed text-[#596d86] dark:text-slate-300">
                {Array.isArray(block.content) ? (
                  block.content.map((p, pi) => <p key={pi}>{p}</p>)
                ) : (
                  <p>{block.content}</p>
                )}
              </div>
            )}
            {block.bullets && block.bullets.length > 0 && <Bullets items={block.bullets} />}
          </div>
        </article>
      </Reveal>
    ))}
  </div>
);

/* ──────────────────────── Gallery strip ──────────────────────── */

/** A wide band of campus photography that breaks up long pages. */
const GalleryStrip: React.FC<{ images: string[]; alt: string }> = ({
  images,
  alt,
}) => (
  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
    {images.map((src, i) => (
      <Reveal key={i} delay={i * 0.08}>
        <div
          className={`group relative overflow-hidden rounded-[22px] border border-white/60 shadow-[0_12px_32px_rgba(15,23,42,0.12)] dark:border-white/10 dark:shadow-[0_20px_48px_rgba(0,0,0,0.45)] ${
            i % 2 === 0 ? "h-44 sm:h-56 lg:h-64" : "h-44 sm:h-56 lg:h-52 lg:mt-12"
          }`}
        >
          <img
            src={src}
            alt={`${alt} — campus photograph ${i + 1}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-[#0b172a]/10 transition-colors duration-500 group-hover:bg-[#0b172a]/0" />
        </div>
      </Reveal>
    ))}
  </div>
);

/* ─────────────────────────── Cards ─────────────────────────── */

const ImageCard: React.FC<{ card: PageCard; image: string; index: number }> = ({
  card,
  image,
  index,
}) => (
  <Reveal delay={(index % 3) * 0.09}>
    <article className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-[#e4ecf2] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.07)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_26px_56px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] dark:backdrop-blur-xl">
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

const QuickLinkTiles: React.FC<{
  links: { name: string; path: string }[];
  images: string[];
}> = ({ links, images }) => (
  <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
    {links.map((l, i) => (
      <Reveal key={l.path} delay={(i % 4) * 0.07}>
        <Link
          to={l.path}
          className="group relative block h-32 overflow-hidden rounded-[20px] border border-white/60 shadow-[0_10px_28px_rgba(15,23,42,0.12)] dark:border-white/10 sm:h-36"
        >
          <img
            src={images[i % images.length]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b172a] via-[#0b172a]/55 to-[#0b172a]/15 transition-colors duration-500 group-hover:from-[#0b172a] group-hover:via-[#0b172a]/40" />
          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
            <span className="font-['Manrope',sans-serif] text-sm font-bold leading-snug text-white sm:text-[15px]">
              {l.name}
            </span>
            <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
        </Link>
      </Reveal>
    ))}
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
  const pool = media.pool.length > 0 ? media.pool : DEFAULT_MEDIA.pool;
  const groups = sections && sections.length > 0 ? groupSections(sections) : [];

  // Sections and the card grid draw from the same pool; keep a running cursor so
  // consecutive blocks never land on the same photograph.
  let cursor = 0;
  const nextImage = () => pool[cursor++ % pool.length];

  const hasCards = !!cards && cards.length > 0;
  const showStrip = groups.length >= 2 && pool.length >= 4;

  return (
    <div className="min-h-screen bg-[#FAF9F5] tracking-[0.015em] transition-colors duration-300 dark:bg-transparent">
      <PageHero
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        image={media.hero}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pb-20 sm:px-8 lg:px-12">
        {groups.length > 0 && (
          <div className="space-y-16 pt-4 sm:space-y-20 lg:space-y-24">
            {groups.map((group, gIdx) =>
              group.type === "full" ? (
                <SplitSection
                  key={`full-${gIdx}`}
                  block={group.section}
                  image={nextImage()}
                  flip={gIdx % 2 === 1}
                />
              ) : (
                <TileGrid
                  key={`grid-${gIdx}`}
                  blocks={group.sections}
                  images={group.sections.map(() => nextImage())}
                />
              )
            )}
          </div>
        )}

        {showStrip && (
          <div className="mt-20 sm:mt-24">
            <GalleryStrip images={pool.slice(0, 4)} alt={title} />
          </div>
        )}

        {hasCards && (
          <div className={groups.length > 0 ? "mt-20 sm:mt-24" : "pt-6"}>
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
                  image={
                    card.image ?? media.cardImages?.[card.name] ?? nextImage()
                  }
                />
              ))}
            </div>
          </div>
        )}

        {quickLinks && quickLinks.length > 0 && (
          <div className="mt-20 sm:mt-24">
            <Reveal className="mb-7">
              <Eyebrow>Explore Next</Eyebrow>
              <h2 className="mt-3 font-['Manrope',sans-serif] text-2xl font-bold tracking-tight text-[#162740] dark:text-white sm:text-3xl">
                Related Pages
              </h2>
            </Reveal>
            <QuickLinkTiles links={quickLinks} images={pool} />
          </div>
        )}

        {cta && (
          <Reveal className="mt-16 sm:mt-20">
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 shadow-[0_24px_60px_rgba(15,23,42,0.22)]">
              <img
                src={pool[pool.length - 1]}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b172a]/95 via-[#0b172a]/80 to-[#0b172a]/45" />
              <div className="relative z-10 flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-11">
                <p className="max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
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
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
};

export default StaticPage;
