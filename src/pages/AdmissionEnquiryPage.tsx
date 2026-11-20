import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Loader2, Mail, Phone, ShieldCheck } from "lucide-react";
import PageHero from "../components/PageHero";
import { IMG } from "../data/pageImages";
import { CONTACT, telHref } from "../data/siteInfo";
import { PG_PROGRAMMES } from "../data/pages/postgraduate";

/**
 * Admissions enquiry form (/admissions/apply/enquire), styled like the faculty application form.
 * Same fields as the AIMS Admissions 2026–27 microsite's enquiry form. Submitted with a normal
 * (non-AJAX) post to FormSubmit, which emails the enquiry to the admissions inbox and sends the
 * student a confirmation, then returns them to /admissions/apply/enquire/thank-you.
 */

const BASE = "/admissions/apply/enquire";
const THANK_YOU = "Thank you for your enquiry. The AIMS admissions team will contact you soon.";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-[#f8fafc] dark:bg-white/5 border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white placeholder-[#94a3b8] dark:placeholder-slate-400 text-sm focus:bg-white dark:focus:bg-white/10 focus:border-[#1f3351] dark:focus:border-teal-400 focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-[#1f3351] dark:text-slate-200 mb-1.5";
const cardClass =
  "rounded-[24px] border border-[#1f3351]/15 dark:border-white/15 bg-white dark:bg-white/[0.04] p-5 sm:p-8 shadow-[0_10px_35px_rgba(13,35,70,0.05)]";
const hintClass = "mt-1 text-xs text-[#1f3351]/60 dark:text-slate-400";

const Req = () => <span className="text-red-500">*</span>;

export default function AdmissionEnquiryPage() {
  const { pathname } = useLocation();
  const done = pathname.replace(/\/+$/, "").endsWith("/thank-you");
  return (
    <div className="atmos-page min-h-screen bg-[#FAF9F5] tracking-[0.015em] dark:bg-transparent">
      <PageHero
        eyebrow="Admissions 2026–27"
        title={done ? "Enquiry Received" : "Tell us about you."}
        subtitle={
          done
            ? THANK_YOU
            : "Share your details and the AIMS admissions team will review your enquiry and contact you. Fields marked * are required."
        }
        pathname={pathname}
        image={IMG.collegeBuildingFront}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pb-20 pt-10 sm:px-8">{done ? <ThankYou /> : <EnquiryForm />}</div>
    </div>
  );
}

function ThankYou() {
  return (
    <div className="mx-auto max-w-[1000px] rounded-[24px] border border-[#1f3351]/15 bg-[#fbfaf5] p-7 text-center dark:border-white/15 dark:bg-white/[0.04] sm:p-10">
      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
      <h2 className="mt-4 font-['Manrope',sans-serif] text-xl font-semibold text-[#1f3351] dark:text-white sm:text-2xl">{THANK_YOU}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-[#1f3351]/75 dark:text-slate-300 sm:text-base">
        A confirmation has been emailed to you. For anything urgent, call admissions on {CONTACT.admissionsPhone}.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/admissions/apply"
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[#1f3351] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#0d2346] dark:bg-white dark:text-[#1f3351]"
        >
          Back to Admissions
        </Link>
        <Link to="/" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#1f3351]/20 px-6 text-sm font-semibold text-[#1f3351] dark:border-white/20 dark:text-white">
          Home
        </Link>
      </div>
    </div>
  );
}

function Aside() {
  const rows: [string, React.ReactNode][] = [
    ["Helpline", <a href={telHref(CONTACT.admissionsPhone)} className="font-semibold hover:underline">{CONTACT.admissionsPhone}</a>],
    ["Email", <a href={`mailto:${CONTACT.admissionsEmail}`} className="break-all font-semibold hover:underline">{CONTACT.admissionsEmail}</a>],
    ["Counselling code", <b>AIMD</b>],
    ["Academic year", <b>2026–27</b>],
  ];
  return (
    <aside className="space-y-6 lg:sticky lg:top-24">
      <div className={cardClass}>
        <h2 className="font-['Manrope',sans-serif] text-lg font-semibold text-[#1f3351] dark:text-white">Admissions</h2>
        <dl className="mt-3 divide-y divide-[#e4ecf2] text-sm text-[#1f3351] dark:divide-white/10 dark:text-slate-200">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between gap-4 py-2.5">
              <dt className="text-[#1f3351]/60 dark:text-slate-400">{k}</dt>
              <dd className="text-right">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className={cardClass}>
        <h2 className="font-['Manrope',sans-serif] text-lg font-semibold text-[#1f3351] dark:text-white">What happens next</h2>
        <ol className="mt-4 space-y-4">
          {[
            "Submit your enquiry and receive a confirmation by email.",
            "The admissions team reviews the details you shared.",
            "We contact you using your phone number or email address.",
          ].map((t, i) => (
            <li key={t} className="flex gap-3 text-sm text-[#1f3351]/85 dark:text-slate-300">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#FFB23D] to-[#F47B20] text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-1">{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  );
}

function EnquiryForm() {
  const [departments, setDepartments] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const next = typeof window !== "undefined" ? `${window.location.origin}${BASE}/thank-you` : "";

  const toggle = (name: string) =>
    setDepartments((d) => (d.includes(name) ? d.filter((x) => x !== name) : [...d, name]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    if (departments.length === 0) {
      e.preventDefault();
      setError("Please select at least one department of interest.");
      return;
    }
    setBusy(true); // let the browser submit the form normally to FormSubmit
  };

  const field = (id: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement>, hint?: string, required = true) => (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label} {required ? <Req /> : <span className="ml-1 normal-case tracking-normal text-[#1f3351]/50">Optional</span>}
      </label>
      <input id={id} required={required} className={inputClass} {...props} />
      {hint && <p className={hintClass}>{hint}</p>}
    </div>
  );

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
      <form
        action={`https://formsubmit.co/${CONTACT.admissionsEmail}`}
        method="POST"
        onSubmit={onSubmit}
        className="space-y-6"
      >
        {/* FormSubmit settings */}
        <input type="hidden" name="_subject" value="[AIMS Admissions 2026–27] New admissions enquiry" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_autoresponse" value={`${THANK_YOU}\n\n– AIMS Admissions, Arundathi Institute of Medical Sciences, Dundigal`} />
        <input type="hidden" name="_next" value={next} />
        <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />
        <input type="hidden" name="Departments of interest" value={departments.join(", ")} />

        <section className={cardClass}>
          <h2 className="font-['Manrope',sans-serif] text-lg font-semibold text-[#1f3351] dark:text-white sm:text-xl">Student details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">{field("ae-name", "Student’s full name", { name: "Full name", autoComplete: "name", maxLength: 100, placeholder: "As it appears on your documents" })}</div>
            {field("ae-email", "Email address", { name: "email", type: "email", autoComplete: "email", maxLength: 254, placeholder: "you@example.com" })}
            {field(
              "ae-phone",
              "Mobile number",
              { name: "Mobile", type: "tel", inputMode: "tel", autoComplete: "tel", maxLength: 20, placeholder: "98765 43210", pattern: "(\\+?91[\\s-]?)?[6-9][0-9]{4}\\s?[0-9]{5}", title: "10-digit Indian mobile number" },
              "10-digit Indian mobile number, with or without +91."
            )}
            {field("ae-city", "Current city / district", { name: "City / district", autoComplete: "address-level2", maxLength: 80, placeholder: "e.g. Hyderabad" })}
            {field("ae-college", "Current college / institution", { name: "Current college", maxLength: 120, placeholder: "Your medical college or institution" })}
          </div>
        </section>

        <section className={cardClass}>
          <h2 className="font-['Manrope',sans-serif] text-lg font-semibold text-[#1f3351] dark:text-white sm:text-xl">
            Departments of interest <Req />
          </h2>
          <p className="mt-1 text-sm text-[#1f3351]/70 dark:text-slate-300">Select all that apply.</p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {PG_PROGRAMMES.map((p) => {
              const on = departments.includes(p.name);
              return (
                <label
                  key={p.slug}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                    on
                      ? "border-[#F47B20] bg-[#F47B20]/10 text-[#132a52] dark:text-white"
                      : "border-[#dce8ee] text-[#1f3351] hover:border-[#1f3351]/40 dark:border-white/15 dark:text-slate-200"
                  }`}
                >
                  <input type="checkbox" checked={on} onChange={() => toggle(p.name)} className="h-4 w-4 accent-[#F47B20]" />
                  {p.name}
                </label>
              );
            })}
          </div>
        </section>

        <section className={cardClass}>
          <h2 className="font-['Manrope',sans-serif] text-lg font-semibold text-[#1f3351] dark:text-white sm:text-xl">Goals and guardian</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="ae-goals" className={labelClass}>
                Academic or career goals <span className="ml-1 normal-case tracking-normal text-[#1f3351]/50">Optional</span>
              </label>
              <textarea id="ae-goals" name="Goals" rows={3} maxLength={600} placeholder="Tell us what you hope to achieve in medicine" className={inputClass} />
              <p className={hintClass}>A sentence or two is enough. You can leave this blank.</p>
            </div>
            {field("ae-parent", "Parent / guardian name", { name: "Parent / guardian name", autoComplete: "off", maxLength: 100 })}
            {field(
              "ae-parent-phone",
              "Parent / guardian phone",
              { name: "Parent / guardian phone", type: "tel", inputMode: "tel", autoComplete: "off", maxLength: 20, placeholder: "98765 43210", pattern: "(\\+?91[\\s-]?)?[6-9][0-9]{4}\\s?[0-9]{5}", title: "10-digit Indian mobile number" },
              "Used only if we cannot reach the student.",
              false
            )}
          </div>
        </section>

        <section className={cardClass}>
          <label className="flex items-start gap-3 rounded-xl border border-[#1f3351]/20 bg-[#f8fafc] p-4 text-sm font-semibold text-[#1f3351] dark:border-white/15 dark:bg-white/5 dark:text-white">
            <input type="checkbox" name="Consent" value="Yes" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#1f3351]" />
            <span>
              I consent to AIMS Admissions contacting me by phone, email or WhatsApp about this enquiry. <Req />
            </span>
          </label>
          <p className="mt-4 flex gap-2 text-xs leading-relaxed text-[#1f3351]/70 dark:text-slate-400">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#1f3351]/60" aria-hidden="true" />
            Your details are used only to respond to this enquiry and are shared only with the AIMS admissions team. To update or remove
            your enquiry, write to {CONTACT.admissionsEmail}.
          </p>
        </section>

        {error && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </p>
        )}

        <div className="flex flex-col items-center gap-3 text-center">
          <button
            type="submit"
            disabled={busy}
            className="apply-cta inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-10 text-base font-semibold disabled:opacity-70"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {busy ? "Sending your enquiry…" : "Submit Enquiry"}
          </button>
          <p className="max-w-lg text-xs text-[#1f3351]/60 dark:text-slate-400">
            After you click Submit you'll be asked to confirm you're not a robot, then brought back to this site. A confirmation is
            emailed to you.
          </p>
          <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-[#1f3351] dark:text-slate-200">
            <a href={telHref(CONTACT.admissionsPhone)} className="flex items-center gap-1.5 font-semibold hover:underline">
              <Phone className="h-4 w-4" aria-hidden="true" /> {CONTACT.admissionsPhone}
            </a>
            <a href={`mailto:${CONTACT.admissionsEmail}`} className="flex items-center gap-1.5 font-semibold hover:underline">
              <Mail className="h-4 w-4" aria-hidden="true" /> {CONTACT.admissionsEmail}
            </a>
          </p>
        </div>
      </form>
      <Aside />
    </div>
  );
}
