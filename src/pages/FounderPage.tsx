import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import { Award, Globe, HeartHandshake, Quote } from "lucide-react";
import founderImg from "../assets/marri-rajashekhar-reddy-profile-main-1.webp";
import "./FounderPage.css";

const svg = (path: string) => (
  <svg className="h-5 w-5 fill-current sm:h-6 sm:w-6" viewBox="0 0 24 24" aria-hidden="true">
    <path d={path} />
  </svg>
);

/** Each button wears its platform's own colour. */
const SOCIAL_LINKS: { name: string; url: string; icon: ReactNode; bg: string; glow: string }[] = [
  {
    name: "X (Twitter)",
    url: "https://twitter.com/MarriRajasekar",
    bg: "bg-black",
    glow: "rgba(0,0,0,0.35)",
    icon: svg("M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/arundathihospital/",
    bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    glow: "rgba(221,42,123,0.45)",
    icon: svg(
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.668.014-4.948.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/trsrajasekhar/",
    bg: "bg-[#1877F2]",
    glow: "rgba(24,119,242,0.45)",
    icon: svg(
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    ),
  },
  {
    name: "Portfolio Website",
    url: "https://marrirajasekhar.in/",
    bg: "bg-gradient-to-br from-[#14B8A6] to-[#0F766E]",
    glow: "rgba(15,118,110,0.45)",
    icon: <Globe className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />,
  },
];

const PARAGRAPHS = [
  "I truly realize the importance of affordable healthcare considering the burden a costly healthcare can impose on families. With my earnest zeal to assist families in getting rid of this burden, I dreamt of establishing an institution which will not only cater to the need of thousands families by offering them affordable healthcare but will also create a long lasting legacy. I promised to my mother of coming up with a hospital that will stand apart in assisting families to get healthcare of excellent standard without imposing heavy financial burden on them.",
  "Arundhati Institution of Medical Science (AIMS) is the first outcome of my bigger dream.",
  "Here we have assembled a team of highly skilled and compassionate healthcare who too share the noble dream of providing quality healthcare in affordable cost. They, with all their passion and dedication, are striving relentlessly to ensure a truly nurturing environment with sincere touch of personalized healthcare to help the patients in all possible manner.",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FounderPage() {
  return (
    <div className="atmos-page relative min-h-screen overflow-hidden bg-[#FAF9F5] pb-24 pt-28 tracking-[0.015em] text-[#1f3351] transition-colors duration-300 lg:pt-36 dark:bg-transparent dark:text-white">
      {/* Decorative colour behind the header */}
      <span aria-hidden="true" className="fd-blob -left-24 top-10 h-80 w-80 bg-[#F47B20]" />
      <span aria-hidden="true" className="fd-blob -right-20 top-40 h-96 w-96 bg-[#2754a3]" style={{ animationDelay: "-6s" }} />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-10 lg:px-16">
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-12 flex flex-col items-center sm:mb-16"
        >
          <div className="mb-3.5 flex items-center justify-center gap-3">
            <span className="h-[1.5px] w-8 bg-[#F47B20]/60 sm:w-12" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D9581A] sm:text-[13px] dark:text-[#FDBA74]">Leadership</span>
            <span className="h-[1.5px] w-8 bg-[#F47B20]/60 sm:w-12" />
          </div>
          <h1 className="bg-gradient-to-r from-[#132a52] via-[#2754a3] to-[#D9581A] bg-clip-text text-center font-['Manrope',sans-serif] text-4xl font-extrabold leading-[1.15] tracking-tight text-transparent sm:text-5xl lg:text-[56px] dark:from-white dark:via-[#93C5FD] dark:to-[#FDBA74]">
            Marri Rajasekhar Reddy
          </h1>
          <p className="mt-3 text-center text-base font-semibold tracking-wide text-[#4b6382] sm:text-lg dark:text-teal-200">
            Founder · Arundathi Institute of Medical Sciences &amp; Hospital
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[440px_1fr] lg:gap-16 xl:grid-cols-[480px_1fr]">
          {/* ─── Animated portrait ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative mx-auto w-full max-w-md lg:sticky lg:top-28 lg:max-w-none"
          >
            <span aria-hidden="true" className="fd-dots -left-6 -top-6" />
            <span aria-hidden="true" className="fd-dots -bottom-6 -right-6" style={{ backgroundImage: "radial-gradient(rgba(39,84,163,0.4) 2px, transparent 2px)" }} />
            <div className="fd-portrait">
              <div className="fd-portrait__inner bg-[#f7fafc] dark:bg-white/5">
                <img
                  src={founderImg}
                  alt="Marri Rajasekhar Reddy, Founder of AIMS"
                  className="fd-portrait__img h-[440px] w-full object-cover object-top sm:h-[520px] lg:h-[580px] xl:h-[620px]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0d2346]/95 via-[#0d2346]/70 to-transparent px-6 pb-6 pt-20 sm:px-7">
                  <p className="font-['Manrope',sans-serif] text-xl font-bold tracking-wide text-white sm:text-2xl">Marri Rajasekhar Reddy</p>
                  <p className="mt-0.5 text-xs tracking-wide text-white/80 sm:text-sm">Founder · Arundathi Institute of Medical Sciences &amp; Hospital</p>
                </div>
              </div>
            </div>
            {/* Floating badges */}
            <span className="fd-badge absolute left-3 top-6 sm:top-10 inline-flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2 text-sm font-bold text-[#132a52] shadow-[0_12px_30px_rgba(19,42,82,0.18)] sm:-left-6 dark:bg-[#0f1d38] dark:text-white">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-[#FFC94D] to-[#F47B20] text-white">
                <Award className="h-4 w-4" aria-hidden="true" />
              </span>
              Founder
            </span>
            <span
              className="fd-badge absolute right-3 top-1/2 inline-flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2 text-sm font-bold text-[#132a52] shadow-[0_12px_30px_rgba(19,42,82,0.18)] sm:-right-6 dark:bg-[#0f1d38] dark:text-white"
              style={{ animationDelay: "-2s" }}
            >
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-[#5EEAD4] to-[#0F766E] text-white">
                <HeartHandshake className="h-4 w-4" aria-hidden="true" />
              </span>
              Affordable care
            </span>
          </motion.div>

          {/* ─── Message ─── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            className="flex flex-col"
          >
            {/* Quote */}
            <figure className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#132a52] via-[#1c3d78] to-[#2754a3] p-7 text-white shadow-[0_22px_50px_rgba(19,42,82,0.28)] sm:p-9">
              <span aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#F47B20]/25 blur-2xl" />
              <span className="fd-quote-mark grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#FFC94D] to-[#F47B20] shadow-[0_10px_24px_rgba(244,123,32,0.45)]">
                <Quote className="h-7 w-7 fill-white text-white" aria-hidden="true" />
              </span>
              <blockquote className="relative mt-5 text-left sm:text-justify font-['Manrope',sans-serif] text-lg font-medium leading-[1.7] [hyphens:auto] sm:text-xl lg:text-[21px]">
                “It’s the promise that I made to my mother, that drives me to resolutely work for turning the hospital into an
                effective tool for ultimately transforming the lives of people who otherwise are reeling under the burden of
                unaffordable healthcare.”
              </blockquote>
              <figcaption className="relative mt-5 flex items-center gap-3 text-sm font-semibold text-[#FFD27A]">
                <span className="h-[2px] w-10 bg-[#FFD27A]" /> Marri Rajasekhar Reddy
              </figcaption>
            </figure>

            {/* Narrative */}
            <div className="mt-9 space-y-6">
              {PARAGRAPHS.map((p, i) => (
                <motion.p
                  key={p.slice(0, 20)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                  className={`text-left sm:text-justify text-[17px] leading-[1.9] text-[#111] [hyphens:auto] sm:text-lg dark:text-slate-200 ${
                    i === 0
                      ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-['Manrope',sans-serif] first-letter:text-6xl first-letter:font-extrabold first-letter:leading-[0.85] first-letter:text-[#D9581A]"
                      : ""
                  } ${i === 1 ? "rounded-2xl border-l-4 border-[#F47B20] bg-[#FFF4E8] px-5 py-4 font-semibold text-[#132a52] dark:bg-white/[0.05] dark:text-white" : ""}`}
                >
                  {p}
                </motion.p>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-11">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#4b6382] dark:text-slate-400">Connect with the founder</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-5">
                {SOCIAL_LINKS.map((item, i) => (
                  <a
                    key={item.name}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.name} (opens in a new tab)`}
                    title={item.name}
                    className={`fd-social grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_10px_24px_rgba(19,42,82,0.25)] ring-4 ring-white transition-shadow hover:shadow-[0_16px_32px_rgba(19,42,82,0.35)] focus-visible:outline-none focus-visible:ring-[#FFB23D] sm:h-16 sm:w-16 dark:ring-white/10 ${item.bg}`}
                    style={{ animationDelay: `${i * 0.35}s`, ["--fd-glow" as string]: item.glow } as CSSProperties}
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
