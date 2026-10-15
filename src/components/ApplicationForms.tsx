import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Download,
  ExternalLink,
  FileText,
  Search,
  ShieldCheck,
  Building2,
  Clock,
  CreditCard,
  FileCheck2,
  Info,
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

const CATEGORIES = ["All Forms", "Checklist", "Bonds & Undertakings", "Compliance & Safety", "NRI Quota"] as const;

export const ApplicationForms: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Forms");

  const filteredForms = useMemo(() => {
    return FORMS_DATA.filter((form) => {
      const matchesCategory =
        selectedCategory === "All Forms" || form.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        form.title.toLowerCase().includes(q) ||
        form.description.toLowerCase().includes(q) ||
        form.badge.toLowerCase().includes(q) ||
        form.targetSeats.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-10">
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

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#596d86] dark:text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search forms by keyword (e.g., bond, checklist, nri)..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#cbd5e1] bg-white text-[#1f3351] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#1f3351] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-teal-400 transition-all"
          />
        </div>

        {/* Total Count */}
        <div className="text-xs font-semibold text-[#596d86] dark:text-slate-400 flex items-center gap-2 self-end sm:self-center">
          <FileCheck2 className="h-4 w-4 text-[#1f3351] dark:text-teal-400" />
          Showing {filteredForms.length} of {FORMS_DATA.length} Official Proformas
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 pt-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                isActive
                  ? "bg-[#1f3351] text-white shadow-sm dark:bg-teal-500 dark:text-black"
                  : "bg-white text-[#475569] border border-[#cbd5e1] hover:bg-slate-50 dark:bg-white/[0.03] dark:text-slate-300 dark:border-white/10 dark:hover:bg-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Forms Cards List */}
      <div className="space-y-4">
        {filteredForms.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-[#cbd5e1] bg-white dark:border-white/10 dark:bg-white/[0.02]">
            <FileText className="h-10 w-10 text-[#94a3b8] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#1f3351] dark:text-white">No forms match your search</h3>
            <p className="text-xs text-[#596d86] dark:text-slate-400 mt-1">
              Try adjusting your search terms or clearing the selected category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Forms");
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-[#1f3351] text-white hover:bg-[#152438] dark:bg-teal-500 dark:text-black transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredForms.map((form, idx) => (
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
          ))
        )}
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
