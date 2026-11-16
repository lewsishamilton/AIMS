import { Link } from "react-router-dom";
import { Download, FileText, Laptop, Mail, MapPin, Phone } from "lucide-react";
import {
  BLANK_FORM_FILENAME,
  BLANK_FORM_URL,
  COLLEGE_POSTAL_ADDRESS,
  RECRUITMENT_EMAIL,
  RECRUITMENT_PHONES,
} from "../data/facultyApplication";

/** "Apply online" or "Download the form" — shown at the foot of the Teaching Positions page. */
export default function TeachingApplyOptions() {
  const card =
    "flex flex-col rounded-[24px] border border-[#1f3351]/15 bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(13,35,70,0.05)] dark:border-white/15 dark:bg-white/[0.04]";
  const btn =
    "mt-6 inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl px-6 text-sm font-semibold transition-colors";
  return (
    <section aria-labelledby="apply-options">
      <h2 id="apply-options" className="font-['Manrope',sans-serif] text-2xl font-semibold text-[#1f3351] dark:text-white sm:text-3xl">
        How would you like to apply?
      </h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className={card}>
          <Laptop className="h-7 w-7 text-[#1f3351] dark:text-teal-300" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-semibold text-[#1f3351] dark:text-white">Apply online</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#1f3351]/75 dark:text-slate-300">
            Fill in the Application for Faculty Recruitment on this website. It reaches the institute as a PDF and you
            get a confirmation by email.
          </p>
          <Link to="/careers/teaching/apply" className={`${btn} apply-cta`}>
            <FileText className="h-4 w-4" aria-hidden="true" /> Apply Online
          </Link>
        </div>
        <div className={card}>
          <Download className="h-7 w-7 text-[#1f3351] dark:text-teal-300" aria-hidden="true" />
          <h3 className="mt-3 text-lg font-semibold text-[#1f3351] dark:text-white">Download the form</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#1f3351]/75 dark:text-slate-300">
            Print the form, fill it in by hand, affix your photo, and send it with your supporting documents:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-[#1f3351]/85 dark:text-slate-300">
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                Email a scan to{" "}
                <a href={`mailto:${RECRUITMENT_EMAIL}`} className="font-semibold underline-offset-2 hover:underline">
                  {RECRUITMENT_EMAIL}
                </a>
              </span>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Post it or hand it in at {COLLEGE_POSTAL_ADDRESS}</span>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>
                {RECRUITMENT_PHONES.map((p, i) => (
                  <span key={p}>
                    {i > 0 && " / "}
                    <a href={`tel:${p.replace(/\s/g, "")}`} className="font-semibold underline-offset-2 hover:underline">
                      {p}
                    </a>
                  </span>
                ))}
              </span>
            </li>
          </ul>
          <a
            href={BLANK_FORM_URL}
            download={BLANK_FORM_FILENAME}
            className={`${btn} apply-cta apply-cta--alt`}
          >
            <Download className="h-4 w-4" aria-hidden="true" /> Download Form (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
