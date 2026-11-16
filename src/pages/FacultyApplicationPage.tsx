import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Download, Loader2, Upload } from "lucide-react";
import PageHero from "../components/PageHero";
import { IMG } from "../data/pageImages";
import {
  BLANK_FORM_FILENAME,
  BLANK_FORM_URL,
  RECRUITMENT_PHONES,
  DECLARATION,
  EXPERIENCE_DESIGNATIONS,
  QUALIFICATION_DEGREES,
  RECRUITMENT_EMAIL,
  REQUIRED_DOCUMENTS,
  TEACHING_DEPARTMENTS,
  TEACHING_POSTS,
  buildApplicationPdf,
  postTitle,
  durationText,
  emptyApplication,
  fileSlug,
  type ExperienceRow,
  type FacultyApplication,
  type QualificationRow,
} from "../data/facultyApplication";

/**
 * Online "Application for Faculty Recruitment".
 *
 * Every field on the printed form is required (rows that don't apply are marked "Not applicable").
 * On submit the browser builds a PDF of the whole application and posts it, as an attachment, to
 * FormSubmit with a normal (non-AJAX) form submission — FormSubmit only sends its auto-response
 * ("Thanks for Registering with us…") to the applicant for normal submissions with its captcha on.
 * FormSubmit then redirects back to /careers/teaching/apply/thank-you.
 */

const THANK_YOU = "Thanks for Registering with us, will contact soon.";
const BASE = "/careers/teaching/apply";

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-[#f8fafc] dark:bg-white/5 border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white placeholder-[#94a3b8] dark:placeholder-slate-400 text-sm focus:bg-white dark:focus:bg-white/10 focus:border-[#1f3351] dark:focus:border-teal-400 focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all disabled:opacity-40";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-[#1f3351] dark:text-slate-200 mb-1.5";
const cardClass =
  "rounded-[24px] border border-[#1f3351]/15 dark:border-white/15 bg-white dark:bg-white/[0.04] p-5 sm:p-8 shadow-[0_10px_35px_rgba(13,35,70,0.05)]";

const Req = () => <span className="text-red-500">*</span>;

const Field: React.FC<{ id: string; label: React.ReactNode; hint?: string; className?: string; children: React.ReactNode }> = ({
  id,
  label,
  hint,
  className = "",
  children,
}) => (
  <div className={className}>
    <label htmlFor={id} className={labelClass}>
      {label} <Req />
    </label>
    {children}
    {hint && <p className="mt-1 text-xs text-[#1f3351]/60 dark:text-slate-400">{hint}</p>}
  </div>
);

const Section: React.FC<{ n: string; title: string; note?: string; children: React.ReactNode }> = ({ n, title, note, children }) => (
  <section className={cardClass}>
    <h2 className="flex items-baseline gap-3 font-['Manrope',sans-serif] text-lg sm:text-xl font-semibold text-[#1f3351] dark:text-white">
      <span className="text-sm font-bold text-[#1f3351]/40 dark:text-white/40">{n}</span>
      {title}
    </h2>
    {note && <p className="mt-1 text-sm text-[#1f3351]/70 dark:text-slate-300">{note}</p>}
    <div className="mt-5">{children}</div>
  </section>
);

/** Shrink the uploaded photo to a small JPEG for the PDF. */
function photoToJpeg(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, 480 / img.height);
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * k);
      c.height = Math.round(img.height * k);
      const g = c.getContext("2d")!;
      g.fillStyle = "#fff";
      g.fillRect(0, 0, c.width, c.height);
      g.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("unreadable image"));
    };
    img.src = url;
  });
}

export default function FacultyApplicationPage() {
  const { pathname } = useLocation();
  const path = pathname.replace(/\/+$/, "");
  const done = path.endsWith("/thank-you");

  return (
    <div className="atmos-page min-h-screen bg-[#FAF9F5] tracking-[0.015em] dark:bg-transparent">
      <PageHero
        eyebrow="Careers · Teaching"
        title={done ? "Application Received" : "Application for Faculty Recruitment"}
        subtitle={
          done
            ? THANK_YOU
            : "Apply online for a teaching post at Arundathi Institute of Medical Sciences. Please fill in every field; your application is sent to the institute as a PDF."
        }
        pathname={pathname}
        image={IMG.meuLectureHall}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1000px] px-4 pb-20 pt-10 sm:px-8">
        {done ? <ThankYou /> : <ApplicationForm />}
      </div>
    </div>
  );
}

function ThankYou() {
  return (
    <div className="rounded-[24px] border border-[#1f3351]/15 dark:border-white/15 bg-[#fbfaf5] dark:bg-white/[0.04] p-7 sm:p-10 text-center">
      <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
      <h2 className="mt-4 font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-[#1f3351] dark:text-white">{THANK_YOU}</h2>
      <p className="mt-2 text-sm sm:text-base text-[#1f3351]/75 dark:text-slate-300 max-w-xl mx-auto">
        Your application has been sent to the institute, and a confirmation has been emailed to you. Please keep the
        supporting documents listed in the form ready for verification.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          to="/careers/teaching"
          className="inline-flex items-center justify-center min-h-11 px-6 rounded-xl bg-[#1f3351] hover:bg-[#0d2346] text-white dark:bg-white dark:text-[#1f3351] text-sm font-semibold transition-colors"
        >
          Back to Teaching Positions
        </Link>
        <Link
          to="/"
          className="inline-flex items-center justify-center min-h-11 px-6 rounded-xl border border-[#1f3351]/20 text-[#1f3351] dark:border-white/20 dark:text-white text-sm font-semibold"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

function ApplicationForm() {
  const [app, setApp] = useState<FacultyApplication>(emptyApplication);
  const [sameAddress, setSameAddress] = useState(false);
  const [photo, setPhoto] = useState("");
  const [photoError, setPhotoError] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const relayForm = useRef<HTMLFormElement>(null);
  const relayFile = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FacultyApplication>(key: K, value: FacultyApplication[K]) =>
    setApp((a) => ({ ...a, [key]: value }));
  const text =
    (key: keyof FacultyApplication, upper = false) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      set(key, (upper ? e.target.value.toUpperCase() : e.target.value) as never);

  const setQual = (i: number, patch: Partial<QualificationRow>) =>
    setApp((a) => ({ ...a, qualifications: a.qualifications.map((q, j) => (j === i ? { ...q, ...patch } : q)) }));
  const setExp = (i: number, patch: Partial<ExperienceRow>) =>
    setApp((a) => ({ ...a, experience: a.experience.map((x, j) => (j === i ? { ...x, ...patch } : x)) }));

  const onPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhotoError("");
    if (!file) return setPhoto("");
    if (!/^image\/(jpeg|png)$/.test(file.type)) {
      e.target.value = "";
      setPhoto("");
      return setPhotoError("Please upload a JPG or PNG photo.");
    }
    if (file.size > 5 * 1024 * 1024) {
      e.target.value = "";
      setPhoto("");
      return setPhotoError("The photo must be smaller than 5 MB.");
    }
    try {
      setPhoto(await photoToJpeg(file));
    } catch {
      e.target.value = "";
      setPhoto("");
      setPhotoError("This photo could not be read. Please try another file.");
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const badRow = app.experience.findIndex((x) => !x.notApplicable && !durationText(x.from, x.to));
    if (badRow !== -1) {
      setError(`Teaching experience – ${EXPERIENCE_DESIGNATIONS[badRow]}: the "To" date must be on or after the "From" date.`);
      return;
    }
    if (!photo) {
      setError("Please upload your passport size photo.");
      return;
    }
    setBusy(true);
    try {
      const final = { ...app, correspondenceAddress: sameAddress ? app.permanentAddress : app.correspondenceAddress };
      const blob = await buildApplicationPdf(final, photo);
      const file = new File([blob], `AIMS_Faculty_Application_${fileSlug(final.name)}.pdf`, { type: "application/pdf" });
      const dt = new DataTransfer();
      dt.items.add(file);
      relayFile.current!.files = dt.files;
      relayForm.current!.submit(); // leaves the page for FormSubmit, which redirects back to the thank-you page
    } catch {
      setBusy(false);
      setError(`We couldn't prepare your application. Please try again, or email it to ${RECRUITMENT_EMAIL}.`);
    }
  };

  const next = typeof window !== "undefined" ? `${window.location.origin}${BASE}/thank-you` : "";

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#1f3351]/15 bg-[#fbfaf5] px-5 py-4 text-sm text-[#1f3351] dark:border-white/15 dark:bg-white/[0.04] dark:text-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-semibold">Prefer paper?</span> Download the form, fill it in by hand and email it to{" "}
          <a href={`mailto:${RECRUITMENT_EMAIL}`} className="font-semibold underline-offset-2 hover:underline">
            {RECRUITMENT_EMAIL}
          </a>{" "}
          or post it to the college. Questions: {RECRUITMENT_PHONES.join(" / ")}
        </p>
        <a
          href={BLANK_FORM_URL}
          download={BLANK_FORM_FILENAME}
          className="apply-cta apply-cta--alt inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-xl px-4 font-semibold"
        >
          <Download className="h-4 w-4" aria-hidden="true" /> Download Form (PDF)
        </a>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <section className={cardClass}>
          <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
            <div>
              <p className={labelClass}>Application for the post of</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="fa-post" label="Post">
                  <select id="fa-post" required value={app.post} onChange={(e) => set("post", e.target.value)} className={inputClass}>
                    <option value="" disabled>
                      Select a post
                    </option>
                    {TEACHING_POSTS.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </Field>
                <Field id="fa-dept" label="Department">
                  <select id="fa-dept" required value={app.department} onChange={(e) => set("department", e.target.value)} className={inputClass}>
                    <option value="" disabled>
                      Select a department
                    </option>
                    {TEACHING_DEPARTMENTS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
            <div>
              <span className={labelClass}>
                Passport size photo <Req />
              </span>
              <label className="flex h-[150px] w-[120px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#1f3351]/25 bg-[#f8fafc] text-center text-xs text-[#1f3351]/70 hover:border-[#1f3351]/50 dark:border-white/20 dark:bg-white/5 dark:text-slate-300">
                {photo ? (
                  <img src={photo} alt="Your photo" className="h-full w-full object-cover" />
                ) : (
                  <>
                    <Upload className="mb-1.5 h-5 w-5" aria-hidden="true" />
                    Upload recent
                    <br />
                    photo (JPG/PNG)
                  </>
                )}
                <input type="file" accept="image/jpeg,image/png" onChange={onPhoto} className="sr-only" aria-label="Passport size photo" />
              </label>
              {photoError && <p className="mt-1 max-w-[160px] text-xs text-red-600">{photoError}</p>}
            </div>
          </div>
        </section>

        <Section n="1–4" title="Personal Details">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="fa-name" label="1. Name of the Candidate" hint="In capital letters">
              <input id="fa-name" required autoComplete="name" value={app.name} onChange={text("name", true)} className={inputClass} />
            </Field>
            <Field id="fa-rel" label="2. Name of the Father / Mother / Husband / Wife">
              <input id="fa-rel" required value={app.relationName} onChange={text("relationName")} className={inputClass} />
            </Field>
            <Field id="fa-perm" label="3a. Permanent Address" hint="In capital letters" className="sm:col-span-2">
              <textarea id="fa-perm" required rows={3} value={app.permanentAddress} onChange={text("permanentAddress", true)} className={inputClass} />
            </Field>
            <div className="sm:col-span-2">
              <label htmlFor="fa-corr" className={labelClass}>
                3b. Address for correspondence <Req />
              </label>
              <label className="mb-2 flex items-center gap-2 text-sm text-[#1f3351] dark:text-slate-200">
                <input type="checkbox" checked={sameAddress} onChange={(e) => setSameAddress(e.target.checked)} className="h-4 w-4 accent-[#1f3351]" />
                Same as permanent address
              </label>
              <textarea
                id="fa-corr"
                required={!sameAddress}
                disabled={sameAddress}
                rows={3}
                value={sameAddress ? app.permanentAddress : app.correspondenceAddress}
                onChange={text("correspondenceAddress", true)}
                className={inputClass}
              />
              <p className="mt-1 text-xs text-[#1f3351]/60 dark:text-slate-400">In capital letters</p>
            </div>
            <Field id="fa-mobile" label="3c. Mobile No">
              <input
                id="fa-mobile"
                required
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                pattern="[6-9][0-9]{9}"
                title="10-digit mobile number"
                maxLength={10}
                value={app.mobile}
                onChange={(e) => set("mobile", e.target.value.replace(/\D/g, ""))}
                className={inputClass}
              />
            </Field>
            <Field id="fa-email" label="3d. e-mail" hint="We'll send your confirmation here">
              <input id="fa-email" required type="email" autoComplete="email" value={app.email} onChange={text("email")} className={inputClass} />
            </Field>
            <Field id="fa-pob" label="4. Place of Birth">
              <input id="fa-pob" required value={app.placeOfBirth} onChange={text("placeOfBirth")} className={inputClass} />
            </Field>
            <Field id="fa-dob" label="Date of Birth">
              <input id="fa-dob" required type="date" value={app.dateOfBirth} onChange={text("dateOfBirth")} className={inputClass} />
            </Field>
            <Field id="fa-nat" label="4a. Nationality">
              <input id="fa-nat" required value={app.nationality} onChange={text("nationality")} className={inputClass} />
            </Field>
            <Field id="fa-rel2" label="4b. Religion">
              <input id="fa-rel2" required value={app.religion} onChange={text("religion")} className={inputClass} />
            </Field>
            <Field id="fa-caste" label="4c. Caste">
              <input id="fa-caste" required value={app.caste} onChange={text("caste")} className={inputClass} />
            </Field>
            <fieldset>
              <legend className={labelClass}>
                4d. Sex <Req />
              </legend>
              <div className="flex gap-3">
                {(["Male", "Female"] as const).map((s) => (
                  <label key={s} className="flex flex-1 items-center gap-2 rounded-xl border border-[#dce8ee] px-4 py-3 text-sm text-[#1f3351] dark:border-white/15 dark:text-white">
                    <input type="radio" name="fa-sex" required checked={app.sex === s} onChange={() => set("sex", s)} className="accent-[#1f3351]" />
                    {s}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </Section>

        <Section n="5" title="Educational Qualifications" note="Fill in every degree you hold. Tick “Not applicable” for any degree you don't have.">
          <div className="space-y-4">
            {QUALIFICATION_DEGREES.map((deg, i) => {
              const q = app.qualifications[i];
              const off = q.notApplicable;
              return (
                <div key={deg} className="rounded-2xl border border-[#e4ecf2] p-4 dark:border-white/10">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-semibold text-[#1f3351] dark:text-white">{deg}</span>
                    {deg !== "MBBS" && (
                      <label className="flex items-center gap-2 text-sm text-[#1f3351]/80 dark:text-slate-300">
                        <input type="checkbox" checked={off} onChange={(e) => setQual(i, { notApplicable: e.target.checked })} className="h-4 w-4 accent-[#1f3351]" />
                        Not applicable
                      </label>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-[110px_1fr_1fr_150px]">
                    <input aria-label={`${deg} year`} placeholder="Year" required={!off} disabled={off} inputMode="numeric" pattern="(19|20)[0-9]{2}" title="Year, e.g. 2015" maxLength={4} value={q.year} onChange={(e) => setQual(i, { year: e.target.value.replace(/\D/g, "") })} className={inputClass} />
                    <input aria-label={`${deg} college`} placeholder="Name of College" required={!off} disabled={off} value={q.college} onChange={(e) => setQual(i, { college: e.target.value })} className={inputClass} />
                    <input aria-label={`${deg} university or board`} placeholder="Name of University / Board" required={!off} disabled={off} value={q.university} onChange={(e) => setQual(i, { university: e.target.value })} className={inputClass} />
                    <input aria-label={`${deg} marks and grade`} placeholder="% Marks & Grade" required={!off} disabled={off} value={q.marks} onChange={(e) => setQual(i, { marks: e.target.value })} className={inputClass} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Field id="fa-regno" label="5(a). Registration number">
              <input id="fa-regno" required value={app.registrationNumber} onChange={text("registrationNumber")} className={inputClass} />
            </Field>
            <Field id="fa-regdate" label="Date of Registration">
              <input id="fa-regdate" required type="date" value={app.registrationDate} onChange={text("registrationDate")} className={inputClass} />
            </Field>
            <Field id="fa-smc" label="5(b). Name of State Medical Council">
              <input id="fa-smc" required value={app.stateMedicalCouncil} onChange={text("stateMedicalCouncil")} className={inputClass} />
            </Field>
          </div>
        </Section>

        <Section n="6" title="Details of Teaching Experience till date" note="Tick “Not applicable” for any designation you haven't held. The total for each row is worked out from the dates.">
          <div className="space-y-4">
            {EXPERIENCE_DESIGNATIONS.map((des, i) => {
              const x = app.experience[i];
              const off = x.notApplicable;
              const total = durationText(x.from, x.to);
              return (
                <div key={des} className="rounded-2xl border border-[#e4ecf2] p-4 dark:border-white/10">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-semibold text-[#1f3351] dark:text-white">{des}</span>
                    <label className="flex items-center gap-2 text-sm text-[#1f3351]/80 dark:text-slate-300">
                      <input type="checkbox" checked={off} onChange={(e) => setExp(i, { notApplicable: e.target.checked })} className="h-4 w-4 accent-[#1f3351]" />
                      Not applicable
                    </label>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_150px_150px_120px]">
                    <input aria-label={`${des} department`} placeholder="Department" required={!off} disabled={off} value={x.department} onChange={(e) => setExp(i, { department: e.target.value })} className={inputClass} />
                    <input aria-label={`${des} institution`} placeholder="Institution" required={!off} disabled={off} value={x.institution} onChange={(e) => setExp(i, { institution: e.target.value })} className={inputClass} />
                    <label className="text-xs text-[#1f3351]/70 dark:text-slate-400">
                      From
                      <input type="date" aria-label={`${des} from`} required={!off} disabled={off} value={x.from} onChange={(e) => setExp(i, { from: e.target.value })} className={`${inputClass} mt-1`} />
                    </label>
                    <label className="text-xs text-[#1f3351]/70 dark:text-slate-400">
                      To
                      <input type="date" aria-label={`${des} to`} required={!off} disabled={off} value={x.to} onChange={(e) => setExp(i, { to: e.target.value })} className={`${inputClass} mt-1`} />
                    </label>
                    <div className="text-xs text-[#1f3351]/70 dark:text-slate-400">
                      Total
                      <div className="mt-1 flex min-h-[46px] items-center rounded-xl bg-[#f1f4f8] px-3 text-sm font-semibold text-[#1f3351] dark:bg-white/10 dark:text-white">
                        {off ? "—" : total || "—"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        <Section n="7–15" title="Experience, Publications & Other Details" note="Enter 0 for counts that don't apply, and “None” where you have nothing to add.">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="fa-present" label="7. Present Place of Working & Designation" className="sm:col-span-2">
              <input id="fa-present" required value={app.presentWorking} onChange={text("presentWorking")} className={inputClass} />
            </Field>
            <Field id="fa-total" label="8. Total Years of Teaching Experience">
              <input id="fa-total" required placeholder="e.g. 6 years 4 months" value={app.totalTeachingExperience} onChange={text("totalTeachingExperience")} className={inputClass} />
            </Field>
            <Field id="fa-nmc" label="9. Date of appearance in last NMC assessment (UG / PG)">
              <input id="fa-nmc" required placeholder="e.g. 14/03/2025 (UG), or Not appeared" value={app.lastNmcAssessment} onChange={text("lastNmcAssessment")} className={inputClass} />
            </Field>
            <Field id="fa-other-exp" label="10. Any other Experience / Administrative experience" className="sm:col-span-2">
              <textarea id="fa-other-exp" required rows={3} value={app.otherExperience} onChange={text("otherExperience")} className={inputClass} />
            </Field>
          </div>

          <p className={`${labelClass} mt-6`}>11. Number of Research articles in Indexed Journals</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {(
              [
                ["internationalJournals", "a. International Journals"],
                ["nationalJournals", "National Journals"],
                ["stateJournals", "b. State / Institutional Journals"],
              ] as const
            ).map(([k, label]) => (
              <Field key={k} id={`fa-${k}`} label={label}>
                <input id={`fa-${k}`} required type="number" min={0} step={1} value={app[k]} onChange={text(k)} className={inputClass} />
              </Field>
            ))}
          </div>

          <p className={`${labelClass} mt-6`}>12. Details of other publications</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="fa-books" label="a. Number of Books published">
              <input id="fa-books" required type="number" min={0} step={1} value={app.booksPublished} onChange={text("booksPublished")} className={inputClass} />
            </Field>
            <Field id="fa-chapters" label="b. Number of Chapters in books">
              <input id="fa-chapters" required type="number" min={0} step={1} value={app.bookChapters} onChange={text("bookChapters")} className={inputClass} />
            </Field>
          </div>

          <div className="mt-6 grid gap-4">
            <Field id="fa-extra" label="13. Extra-curricular activities like sports / cultural / medals at university / state / national level">
              <textarea id="fa-extra" required rows={3} value={app.extraCurricular} onChange={text("extraCurricular")} className={inputClass} />
            </Field>
            <Field id="fa-innov" label="14. Any other innovative / initiatives made by the applicant">
              <textarea id="fa-innov" required rows={3} value={app.innovations} onChange={text("innovations")} className={inputClass} />
            </Field>
            <Field id="fa-info" label="15. Any other information the candidate wish to furnish">
              <textarea id="fa-info" required rows={3} value={app.otherInformation} onChange={text("otherInformation")} className={inputClass} />
            </Field>
          </div>
          <p className="mt-5 rounded-xl bg-[#f1f4f8] px-4 py-3 text-sm font-semibold text-[#1f3351] dark:bg-white/10 dark:text-white">
            Note: The Candidate should enclose all the relevant supporting documents on all the above aspects.
          </p>
        </Section>

        <Section n="" title="List of Documents to be Submitted by the Applicant" note="Mark whether you are submitting each document.">
          <ol className="divide-y divide-[#e4ecf2] dark:divide-white/10">
            {REQUIRED_DOCUMENTS.map((d, i) => (
              <li key={d} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-[#1f3351] dark:text-slate-200">
                  <span className="mr-2 font-semibold text-[#1f3351]/50 dark:text-white/50">{i + 1}.</span>
                  {d}
                  <Req />
                </span>
                <span className="flex shrink-0 gap-2">
                  {(["Yes", "No"] as const).map((v) => (
                    <label key={v} className="flex items-center gap-1.5 rounded-lg border border-[#dce8ee] px-3 py-1.5 text-sm text-[#1f3351] dark:border-white/15 dark:text-white">
                      <input
                        type="radio"
                        name={`fa-doc-${i}`}
                        required
                        checked={app.documents[i] === v}
                        onChange={() => setApp((a) => ({ ...a, documents: a.documents.map((x, j) => (j === i ? v : x)) }))}
                        className="accent-[#1f3351]"
                      />
                      {v}
                    </label>
                  ))}
                </span>
              </li>
            ))}
          </ol>
        </Section>

        <Section n="" title="Declaration">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-[#1f3351]/85 dark:text-slate-300">
            {DECLARATION.map((p) => (
              <li key={p.slice(0, 30)}>{p}</li>
            ))}
          </ol>
          <label className="mt-5 flex items-start gap-3 rounded-xl border border-[#1f3351]/20 bg-[#f8fafc] p-4 text-sm font-semibold text-[#1f3351] dark:border-white/15 dark:bg-white/5 dark:text-white">
            <input type="checkbox" required checked={app.declarationAccepted} onChange={(e) => set("declarationAccepted", e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#1f3351]" />
            <span>
              I have read and agree to the declaration above. <Req />
            </span>
          </label>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div>
              <span className={labelClass}>Date</span>
              <div className={`${inputClass} bg-[#f1f4f8]`}>{new Date().toLocaleDateString("en-GB")}</div>
            </div>
            <Field id="fa-place" label="Place">
              <input id="fa-place" required value={app.place} onChange={text("place")} className={inputClass} />
            </Field>
            <Field id="fa-sign" label="Signature" hint="Type your full name as your signature">
              <input id="fa-sign" required value={app.signature} onChange={text("signature")} className={`${inputClass} font-serif italic`} />
            </Field>
          </div>
        </Section>

        {error && (
          <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </p>
        )}

        <div className="flex flex-col items-center gap-3 text-center">
          <button
            type="submit"
            disabled={busy}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1f3351] px-10 text-base font-semibold text-white transition-colors hover:bg-[#0d2346] disabled:opacity-70 dark:bg-white dark:text-[#1f3351]"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {busy ? "Preparing your application…" : "Submit Application"}
          </button>
          <p className="max-w-lg text-xs text-[#1f3351]/60 dark:text-slate-400">
            After you click Submit you'll be asked to confirm you're not a robot, then brought back to this site. Your
            completed application is sent to the institute as a PDF and a confirmation is emailed to you.
          </p>
        </div>
      </form>

      {/* Relay form: a normal multipart POST to FormSubmit carrying the PDF. Kept outside the main form (forms can't nest). */}
      <form ref={relayForm} action={`https://formsubmit.co/${RECRUITMENT_EMAIL}`} method="POST" encType="multipart/form-data" className="hidden" aria-hidden="true">
        <input type="hidden" name="Post applied for" value={app.post} />
        <input type="hidden" name="Department" value={app.department} />
        <input type="hidden" name="Candidate name" value={app.name} />
        <input type="hidden" name="Mobile" value={app.mobile} />
        <input type="hidden" name="email" value={app.email} />
        <input type="hidden" name="Full application" value="Attached as PDF" />
        <input type="hidden" name="_subject" value={`[AIMS Careers] Faculty application – ${postTitle(app)} – ${app.name}`} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_autoresponse" value={`${THANK_YOU}\n\n– Arundathi Institute of Medical Sciences, Dundigal, Hyderabad`} />
        <input type="hidden" name="_next" value={next} />
        <input ref={relayFile} type="file" name="attachment" />
      </form>
    </>
  );
}
