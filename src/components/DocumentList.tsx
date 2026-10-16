import React from "react";
import { motion } from "motion/react";
import { Download, ExternalLink, FileText, ScrollText } from "lucide-react";

// Official documents served from /public/documents (copied from the old aims.ac.in portal).
export interface DocItem {
  title: string;
  file: string;
  meta: string;
}

export const DocumentList: React.FC<{ heading: string; subheading?: string; docs: DocItem[] }> = ({
  heading,
  subheading,
  docs,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="rounded-2xl border border-[#cbd5e1] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
  >
    <div className="flex items-center gap-3 pb-4 border-b border-[#e2e8f0] dark:border-white/10">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1f3351] text-white dark:bg-teal-500/20 dark:text-teal-300">
        <ScrollText className="h-5 w-5" />
      </span>
      <div>
        <h2 className="font-['Manrope',sans-serif] text-lg font-bold text-[#1f3351] dark:text-white">{heading}</h2>
        {subheading && <p className="text-xs text-[#596d86] dark:text-slate-400 mt-0.5">{subheading}</p>}
      </div>
    </div>

    <ul className="divide-y divide-[#e2e8f0] dark:divide-white/10">
      {docs.map((doc) => (
        <li key={doc.file} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f5f9] text-[#1f3351] dark:bg-white/5 dark:text-teal-400">
              <FileText className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-['Manrope',sans-serif] text-sm sm:text-[15px] font-bold text-[#1f3351] dark:text-white">{doc.title}</p>
              <p className="mt-0.5 text-xs text-[#596d86] dark:text-slate-400">{doc.meta}</p>
            </div>
          </div>
          <div className="flex shrink-0 gap-2 pl-[52px] sm:pl-0">
            <a
              href={doc.file}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1f3351] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#162740] dark:bg-teal-500 dark:text-[#04121f]"
            >
              <ExternalLink className="h-3.5 w-3.5" /> View
            </a>
            <a
              href={doc.file}
              download
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#cbd5e1] bg-white px-3.5 py-2 text-xs font-semibold text-[#1f3351] transition-colors hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-slate-200"
            >
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </div>
        </li>
      ))}
    </ul>
  </motion.div>
);

const approval = (title: string, name: string, meta: string): DocItem => ({ title, file: `/documents/approvals/${name}.pdf`, meta });

const KNRUHS_AFFILIATION = approval("KNRUHS Affiliation Order", "knruhs-affiliation-order", "Mar 2024 · 2 pages · PDF · 1.3 MB");

export const GovernmentApprovalDocs: React.FC = () => (
  <DocumentList
    heading="Approval Documents"
    subheading="Copies of the statutory orders, available to view or download."
    docs={[
      approval("Essentiality Certificate", "essentiality-certificate", "Mar 2024 · 4 pages · PDF · 1.8 MB"),
      approval("NMC Letter of Permission", "nmc-letter-of-permission", "Mar 2024 · 2 pages · PDF · 958 KB"),
      KNRUHS_AFFILIATION,
      approval("Nursing Inspection Approval", "nursing-inspection-approval", "Oct 2024 · 2 pages · PDF · 805 KB"),
    ]}
  />
);

export const UniversityAffiliationDocs: React.FC = () => (
  <DocumentList
    heading="Affiliation Documents"
    subheading="Copies of the affiliation orders, available to view or download."
    docs={[KNRUHS_AFFILIATION, approval("Affiliation Order", "affiliation-aug-2024", "Aug 2024 · 2 pages · PDF · 502 KB")]}
  />
);

export const MbbsCurriculumDoc: React.FC = () => (
  <DocumentList
    heading="Curriculum Document"
    docs={[
      {
        title: "Competency Based MBBS Curriculum",
        file: "/documents/mbbs-competency-based-curriculum.pdf",
        meta: "Phase-wise subjects and competencies · PDF · 5.3 MB",
      },
    ]}
  />
);

/** NMC faculty declaration PDFs per department id: [pages, size]. Files live in /documents/nmc-declarations/{id}.pdf. */
const NMC_DECLARATIONS: Record<string, [number, string]> = {
  anatomy: [2, "226 KB"], physiology: [1, "122 KB"], biochemistry: [1, "86 KB"], pharmacology: [1, "122 KB"],
  pathology: [2, "271 KB"], microbiology: [1, "199 KB"], "forensic-medicine": [1, "136 KB"],
  "general-medicine": [1, "209 KB"], paediatrics: [1, "182 KB"], dermatology: [1, "113 KB"], psychiatry: [1, "103 KB"],
  "general-surgery": [2, "273 KB"], orthopaedics: [1, "253 KB"], ent: [1, "136 KB"], ophthalmology: [1, "106 KB"],
  "obstetrics-gynaecology": [1, "192 KB"], anaesthesiology: [2, "216 KB"], radiology: [1, "143 KB"],
  "respiratory-medicine": [1, "114 KB"], dentistry: [1, "107 KB"],
};

export const NmcDeclarationDocs: React.FC<{ departmentId: string; departmentName: string }> = ({ departmentId, departmentName }) => {
  const entry = NMC_DECLARATIONS[departmentId];
  if (!entry) return null;
  const [pages, size] = entry;
  return (
    <div className="mt-8">
      <DocumentList
        heading="NMC Faculty Declaration"
        subheading={`Faculty declaration submitted to the National Medical Commission for ${departmentName}.`}
        docs={[
          {
            title: `${departmentName}: Faculty Declaration`,
            file: `/documents/nmc-declarations/${departmentId}.pdf`,
            meta: `${pages} ${pages === 1 ? "page" : "pages"} · PDF · ${size}`,
          },
        ]}
      />
    </div>
  );
};
