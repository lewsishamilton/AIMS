import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  Briefcase,
  Download,
  FileText,
  HeartPulse,
  Mail,
  Monitor,
  Phone,
  UserCheck,
  X,
  ZoomIn,
} from "lucide-react";
import poster from "../assets/careers/recruitment-notification.webp";
import {
  BLANK_FORM_FILENAME,
  BLANK_FORM_URL,
  RECRUITMENT_EMAIL,
  RECRUITMENT_PHONES,
} from "../data/facultyApplication";

/**
 * "We're hiring" banner built around the recruitment notification poster, shown at the top of
 * the Careers page. The poster's content is repeated as real text so it
 * reads well on phones and to screen readers; the poster itself opens full size on click.
 */

const OPENINGS = [
  {
    icon: Briefcase,
    title: "Faculty Posts",
    lines: ["Professor · Associate Professor", "Assistant Professor · Senior Resident", "14 departments"],
  },
  {
    icon: HeartPulse,
    title: "Nursing Staff",
    lines: ["GNM & B.Sc. Nursing", "With TSMC, INC registration", "Experienced candidates preferred"],
  },
  {
    icon: Monitor,
    title: "Computer Operators",
    lines: ["Any degree with computer knowledge", "English and Telugu typing"],
  },
];

function Lightbox({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Recruitment notification poster"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close poster"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white text-[#1f3351] shadow-lg"
      >
        <X className="h-5 w-5" />
      </button>
      <img
        src={poster}
        alt="Arundathi Institute of Medical Sciences recruitment notification"
        className="max-h-[92svh] w-auto max-w-full rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  );
}

function Showcase() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="hiring-heading"
      className="relative isolate overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0f2347] via-[#173a73] to-[#1f4f9c] p-5 text-white shadow-[0_30px_80px_rgba(15,35,71,0.35)] sm:p-8 lg:p-10"
    >
      {/* Soft orange and blue glows */}
      <span aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[#f28c28]/30 blur-3xl" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-20 -z-10 h-80 w-80 rounded-full bg-[#3b82f6]/30 blur-3xl" />

      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12">
        {/* Poster */}
        <div className="relative mx-auto w-full max-w-[380px]">
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="View the recruitment poster full size"
            className="group relative block w-full rounded-2xl bg-white p-2 shadow-[0_25px_60px_rgba(0,0,0,0.45)] outline-none focus-visible:ring-4 focus-visible:ring-[#f28c28]"
            initial={{ rotate: -2.5 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, default: { duration: 0.3 } }}
          >
            <img
              src={poster}
              alt="Recruitment notification: faculty posts, nursing staff and computer operators at Arundathi Institute of Medical Sciences"
              className="w-full rounded-xl"
              loading="eager"
            />
            <span className="absolute inset-2 grid place-items-center rounded-xl bg-black/0 transition-colors group-hover:bg-black/25">
              <span className="flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#1f3351] opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" /> View full poster
              </span>
            </span>
          </motion.button>
          {/* Ribbon */}
          <span className="absolute -left-3 -top-3 flex items-center gap-2 rounded-full bg-[#f28c28] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.18em] text-white shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Now Hiring
          </span>
        </div>

        {/* Details */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ffb36b]">Recruitment Notification</p>
          <h2 id="hiring-heading" className="mt-2 font-['Manrope',sans-serif] text-3xl font-extrabold leading-tight sm:text-4xl">
            We're Hiring at AIMS
          </h2>
          <p className="mt-2 text-base text-white/80 sm:text-lg">Inviting applications for broad specialities.</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {OPENINGS.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-sm">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f28c28]/20 text-[#ffb36b]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-3 font-bold">{title}</p>
                <ul className="mt-1.5 space-y-1 text-[13px] leading-snug text-white/75">
                  {lines.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5">
              <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb36b]" aria-hidden="true" />
              <p className="text-sm">
                <b>Walk-in interview</b> at the Dean's Office, or apply through the website / email.
              </p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5">
              <Download className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb36b]" aria-hidden="true" />
              <p className="text-sm">
                <b>Application form:</b> download it from this website, or apply online for faculty posts.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/careers/teaching/apply" className="apply-cta inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold">
              <FileText className="h-4 w-4" aria-hidden="true" /> Apply Online (Faculty)
            </Link>
            <a href={BLANK_FORM_URL} download={BLANK_FORM_FILENAME} className="apply-cta apply-cta--alt inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold">
              <Download className="h-4 w-4" aria-hidden="true" /> Download Form (PDF)
            </a>
            <a
              href={`mailto:${RECRUITMENT_EMAIL}?subject=${encodeURIComponent("Job Application – AIMS")}`}
              className="apply-cta inline-flex min-h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold"
              style={{ animationDelay: "-6s" }}
            >
              <Mail className="h-4 w-4" aria-hidden="true" /> Email Your CV
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-5 text-sm">
            {RECRUITMENT_PHONES.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="flex items-center gap-2 font-semibold hover:text-[#ffb36b]">
                <Phone className="h-4 w-4 text-[#ffb36b]" aria-hidden="true" /> {p}
              </a>
            ))}
            <a href={`mailto:${RECRUITMENT_EMAIL}`} className="flex items-center gap-2 font-semibold hover:text-[#ffb36b]">
              <Mail className="h-4 w-4 text-[#ffb36b]" aria-hidden="true" /> {RECRUITMENT_EMAIL}
            </a>
          </div>
        </div>
      </div>

      {open && <Lightbox onClose={() => setOpen(false)} />}
    </section>
  );
}

export default Showcase;
