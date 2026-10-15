import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Download,
  ExternalLink,
  FileText,
  ShieldCheck,
  Building2,
  Clock,
  CreditCard,
  Info,
  Landmark,
  Copy,
  Check,
} from "lucide-react";

interface DownloadableForm {
  id: string;
  title: string;
  category: "Checklist" | "Bonds & Undertakings" | "Compliance & Safety" | "NRI Quota";
  badge: string;
  description: string;
  file: string;
  fileName: string;
  fileSize: string;
  pages: string;
  targetSeats: string;
  notaryRequired?: boolean;
}

const FORMS_DATA: DownloadableForm[] = [
  {
    id: "checklist",
    title: "Original Certificates & Documents Verification Checklist",
    category: "Checklist",
    badge: "Mandatory for All",
    description:
      "Mandatory document verification checklist and instruction proforma required during admission reporting before the Professor Committee.",
    file: "/forms/checklist.pdf",
    fileName: "checklist.pdf",
    fileSize: "189 KB",
    pages: "2 Pages",
    targetSeats: "All MBBS Candidates (A, B, C Categories)",
  },
  {
    id: "fee-bond",
    title: "MBBS Admission Fee Undertaking Bond (Proforma)",
    category: "Bonds & Undertakings",
    badge: "Rs. 100/- Stamp Paper",
    description:
      "Proforma undertaking for tuition and institute fee payment commitment executed on Rs. 100/- Non-Judicial Stamp Paper with Notary attestation.",
    file: "/forms/fee-bond.pdf",
    fileName: "fee-bond.pdf",
    fileSize: "79 KB",
    pages: "1 Page",
    targetSeats: "All MBBS Admitted Students",
    notaryRequired: true,
  },
  {
    id: "bank-guarantee",
    title: "Bank Guarantee Proforma / Security Bond",
    category: "Bonds & Undertakings",
    badge: "Financial Guarantee",
    description:
      "Standard irrevocable Bank Guarantee format to be issued by a Scheduled/Nationalized Bank towards course fee guarantee as per norms.",
    file: "/forms/bank-gaurantee-bond.pdf",
    fileName: "bank-gaurantee-bond.pdf",
    fileSize: "132 KB",
    pages: "2 Pages",
    targetSeats: "B & C Category Admissions",
  },
  {
    id: "discontinuation-bond",
    title: "Course Discontinuation Bond Proforma (KNRUHS)",
    category: "Bonds & Undertakings",
    badge: "Statutory Undertaking",
    description:
      "Affidavit undertaking on Non-Judicial Stamp Paper regarding seat discontinuation penalty in compliance with KNRUHS regulations.",
    file: "/forms/discontinuation.pdf",
    fileName: "discontinuation.pdf",
    fileSize: "203 KB",
    pages: "2 Pages",
    targetSeats: "All MBBS Admitted Candidates",
    notaryRequired: true,
  },
  {
    id: "genuinity-bond",
    title: "Genuinity of Submitted Certificates Undertaking",
    category: "Bonds & Undertakings",
    badge: "Affidavit Proforma",
    description:
      "Statutory affidavit undertaking declaring absolute authenticity and legal validity of all academic, caste, and personal credentials submitted.",
    file: "/forms/geniuinity-bond.pdf",
    fileName: "geniuinity-bond.pdf",
    fileSize: "82 KB",
    pages: "1 Page",
    targetSeats: "All MBBS Candidates",
    notaryRequired: true,
  },
  {
    id: "anti-ragging-bond",
    title: "Anti-Ragging Undertaking & Compliance Bond",
    category: "Compliance & Safety",
    badge: "NMC Mandate",
    description:
      "Compulsory joint anti-ragging affidavit executed by the student and parent/guardian as mandated by National Medical Commission (NMC) regulations.",
    file: "/forms/anti-ragging-bond.pdf",
    fileName: "anti-ragging-bond.pdf",
    fileSize: "79 KB",
    pages: "1 Page",
    targetSeats: "All Admitted Students & Parents",
  },
  {
    id: "nri-affidavit",
    title: "NRI Sponsorship Affidavit & Declaration (C-Category)",
    category: "NRI Quota",
    badge: "NRI / C-Category",
    description:
      "Sponsorship declaration and financial support undertaking proforma for candidates securing admission under the NRI (C-Category) quota.",
    file: "/forms/NRI-Affadivit.pdf",
    fileName: "NRI-Affadivit.pdf",
    fileSize: "75 KB",
    pages: "1 Page",
    targetSeats: "MBBS C-Category (NRI Quota)",
    notaryRequired: true,
  },
];

export const ApplicationForms: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8">
      {/* Reporting Guidelines Notice */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border border-[#cbd5e1] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-[#e2e8f0] dark:border-white/10">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f3351] text-white dark:bg-teal-500/20 dark:text-teal-300">
            <Info className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-['Manrope',sans-serif] text-lg font-bold text-[#1f3351] dark:text-white">
              Essential Admission Reporting Instructions
            </h2>
            <p className="text-xs text-[#596d86] dark:text-slate-400">
              Please download, print, and complete the respective proformas before reporting for certificate verification.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8fafc] dark:bg-white/[0.02] border border-[#e2e8f0] dark:border-white/5">
            <Clock className="h-5 w-5 text-[#1f3351] dark:text-teal-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#1f3351] dark:text-slate-200">Verification Timings</p>
              <p className="text-xs text-[#596d86] dark:text-slate-400 mt-0.5">9:30 AM to 2:30 PM only</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8fafc] dark:bg-white/[0.02] border border-[#e2e8f0] dark:border-white/5">
            <Building2 className="h-5 w-5 text-[#1f3351] dark:text-teal-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#1f3351] dark:text-slate-200">Verification Committee</p>
              <p className="text-xs text-[#596d86] dark:text-slate-400 mt-0.5">3-Professor Scrutiny Panel</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8fafc] dark:bg-white/[0.02] border border-[#e2e8f0] dark:border-white/5">
            <CreditCard className="h-5 w-5 text-[#1f3351] dark:text-teal-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#1f3351] dark:text-slate-200">Fee Payment Mode</p>
              <p className="text-xs text-[#596d86] dark:text-slate-400 mt-0.5">Only Demand Drafts (DDs)</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f8fafc] dark:bg-white/[0.02] border border-[#e2e8f0] dark:border-white/5">
            <ShieldCheck className="h-5 w-5 text-[#1f3351] dark:text-teal-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#1f3351] dark:text-slate-200">Stamp Paper Bonds</p>
              <p className="text-xs text-[#596d86] dark:text-slate-400 mt-0.5">Non-Judicial with Notary</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Student Fee Payment Bank Details */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="rounded-2xl border border-[#cbd5e1] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-[#e2e8f0] dark:border-white/10">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1f3351] text-white dark:bg-teal-500/20 dark:text-teal-300">
            <Landmark className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-['Manrope',sans-serif] text-lg font-bold text-[#1f3351] dark:text-white underline underline-offset-4 decoration-[#1f3351]/40 dark:decoration-teal-400/40">
              Student Fee Payment Bank Details
            </h2>
            <p className="text-xs text-[#596d86] dark:text-slate-400 mt-0.5">
              Official institutional bank account details for student fee transactions and demand drafts.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-white/[0.02] border border-[#e2e8f0] dark:border-white/5 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-400">
              Account Name
            </span>
            <p className="font-['Manrope',sans-serif] text-sm sm:text-base font-bold text-[#1f3351] dark:text-white">
              ARUNDATHI INSTITUTE OF MEDICAL SCIENCES
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-white/[0.02] border border-[#e2e8f0] dark:border-white/5 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-400">
              Name of the Bank
            </span>
            <p className="font-['Manrope',sans-serif] text-sm sm:text-base font-bold text-[#1f3351] dark:text-white">
              KOTAK MAHINDRA BANK
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-white/[0.02] border border-[#e2e8f0] dark:border-white/5 space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-400">
              Account Number
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-base sm:text-lg font-bold tracking-wider text-[#1f3351] dark:text-teal-300">
                5946024240
              </span>
              <button
                type="button"
                onClick={() => handleCopy("5946024240")}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg border border-[#cbd5e1] bg-white hover:bg-slate-50 text-[#1f3351] dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10 transition-colors"
                title="Copy Account Number"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-white/[0.02] border border-[#e2e8f0] dark:border-white/5 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-400">
                Bank Branch
              </span>
              <p className="font-['Manrope',sans-serif] text-sm sm:text-base font-bold text-[#1f3351] dark:text-white">
                Bowenpally
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#f8fafc] dark:bg-white/[0.02] border border-[#e2e8f0] dark:border-white/5 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-400">
                Type of Account
              </span>
              <p className="font-['Manrope',sans-serif] text-sm sm:text-base font-bold text-[#1f3351] dark:text-white">
                Overdraft [OD]
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Forms Cards List */}
      <div className="space-y-4">
        {FORMS_DATA.map((form, idx) => (
          <motion.div
            key={form.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="group rounded-2xl border border-[#cbd5e1] bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:border-[#1f3351]/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-teal-400/40"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              {/* Left Side: Icon & Details */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1f3351]/10 text-[#1f3351] dark:bg-teal-500/15 dark:text-teal-300">
                  <FileText className="h-6 w-6" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-['Manrope',sans-serif] text-base sm:text-lg font-bold text-[#1f3351] dark:text-white group-hover:text-[#142338] dark:group-hover:text-teal-200 transition-colors">
                    {form.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#596d86] dark:text-slate-300 leading-relaxed max-w-2xl">
                    {form.description}
                  </p>

                  <p className="text-[11px] font-semibold text-[#1f3351]/80 dark:text-teal-400/90 pt-0.5">
                    Applicable: <span className="font-normal text-[#475569] dark:text-slate-300">{form.targetSeats}</span>
                  </p>
                </div>
              </div>

              {/* Right Side: Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center pt-2 md:pt-0 border-t md:border-t-0 border-[#f1f5f9] dark:border-white/5 w-full md:w-auto">
                {/* View / Preview */}
                <a
                  href={form.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#1f3351] border border-[#cbd5e1] hover:bg-slate-50 dark:text-slate-200 dark:border-white/15 dark:hover:bg-white/[0.06] transition-colors"
                  title={`View ${form.title} in new tab`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>View</span>
                </a>

                {/* Direct Download */}
                <a
                  href={form.file}
                  download={form.fileName}
                  className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#1f3351] hover:bg-[#142338] shadow-sm dark:bg-teal-500 dark:text-black dark:hover:bg-teal-400 transition-all"
                  title={`Download ${form.fileName}`}
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Support Info */}
      <div className="rounded-xl border border-dashed border-[#cbd5e1] p-4 text-center dark:border-white/10">
        <p className="text-xs text-[#596d86] dark:text-slate-400">
          Need assistance with proforma completion? Contact the Admissions Verification Desk at{" "}
          <span className="font-semibold text-[#1f3351] dark:text-slate-200">+91 91775 88997</span> or visit the Admissions Office on campus.
        </p>
      </div>
    </div>
  );
};

export default ApplicationForms;
