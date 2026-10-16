import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  Search,
  X,
  GraduationCap,
  Users,
  Download,
  Calendar,
  Building2,
  FileText,
} from "lucide-react";
import { ADMITTED_BATCHES, type AdmittedBatch } from "../data/admittedStudents";

const EASE = [0.22, 1, 0.36, 1] as const;

export const AdmittedStudentsList: React.FC = () => {
  // Store expanded state for each batch ID. All start closed until clicked.
  const [expandedBatches, setExpandedBatches] = useState<Record<string, boolean>>({});

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>("all");

  const toggleBatch = (id: string) => {
    setExpandedBatches((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    ADMITTED_BATCHES.forEach((b) => {
      allOpen[b.id] = true;
    });
    setExpandedBatches(allOpen);
  };

  const collapseAll = () => {
    const allClosed: Record<string, boolean> = {};
    ADMITTED_BATCHES.forEach((b) => {
      allClosed[b.id] = false;
    });
    setExpandedBatches(allClosed);
  };

  // Filter batches and students based on search query and year dropdown
  const filteredBatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return ADMITTED_BATCHES.filter((batch) => {
      if (selectedYearFilter !== "all" && batch.id !== selectedYearFilter) {
        return false;
      }
      return true;
    }).map((batch) => {
      if (!q) {
        return {
          ...batch,
          filteredStudents: batch.students,
        };
      }

      const matching = batch.students.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q) ||
          String(s.slNo).includes(q)
      );

      return {
        ...batch,
        filteredStudents: matching,
      };
    });
  }, [searchQuery, selectedYearFilter]);

  // When searching, auto-expand any batch that has matches
  React.useEffect(() => {
    if (searchQuery.trim()) {
      const openMatching: Record<string, boolean> = {};
      filteredBatches.forEach((b) => {
        if (b.filteredStudents.length > 0) {
          openMatching[b.id] = true;
        }
      });
      setExpandedBatches((prev) => ({ ...prev, ...openMatching }));
    }
  }, [searchQuery, filteredBatches]);

  const totalFilteredStudents = useMemo(() => {
    return filteredBatches.reduce((acc, b) => acc + b.filteredStudents.length, 0);
  }, [filteredBatches]);

  const totalAllStudents = useMemo(() => {
    return ADMITTED_BATCHES.reduce((acc, b) => acc + b.totalStudents, 0);
  }, []);

  // PDF export for one batch or all batches. jsPDF is loaded only when someone downloads.
  const exportToPDF = async (batch?: AdmittedBatch) => {
    const [{ jsPDF }, { default: autoTable }] = await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    (batch ? [batch] : ADMITTED_BATCHES).forEach((b, i) => {
      if (i > 0) doc.addPage();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(31, 51, 81);
      doc.text("Arundathi Institute of Medical Sciences", 40, 50);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(89, 109, 134);
      doc.text(`MBBS Admitted Students - Academic Year ${b.academicYear} - ${b.totalStudents} students`, 40, 68);
      autoTable(doc, {
        startY: 84,
        head: [["Sl. No.", "Registration / Roll No.", "Student Name"]],
        body: b.students.map((s) => [s.slNo, s.rollNo, s.name]),
        styles: { fontSize: 9, cellPadding: 5 },
        headStyles: { fillColor: [31, 51, 81] },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        margin: { left: 40, right: 40 },
      });
    });

    doc.save(batch ? `AIMS_Admitted_Students_${batch.id}.pdf` : "AIMS_Admitted_Students_All_Batches.pdf");
  };

  return (
    <div className="w-full space-y-8">
      {/* Overview Stat Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5"
      >
        <div className="flex flex-col rounded-[22px] border border-[#e4ecf2] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.03]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f3351]/10 text-[#1f3351] dark:bg-teal-500/15 dark:text-teal-300">
            <Users className="h-5 w-5" />
          </span>
          <span className="mt-3 text-2xl font-extrabold text-[#162740] dark:text-white sm:text-3xl">
            {totalAllStudents}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#596d86] dark:text-slate-400">
            Total Admitted Students
          </span>
        </div>

        <div className="flex flex-col rounded-[22px] border border-[#e4ecf2] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.03]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1f3351]/10 text-[#1f3351] dark:bg-teal-500/15 dark:text-teal-300">
            <Calendar className="h-5 w-5" />
          </span>
          <span className="mt-3 text-2xl font-extrabold text-[#162740] dark:text-white sm:text-3xl">
            {ADMITTED_BATCHES.length} Batches
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#596d86] dark:text-slate-400">
            Academic Years On Record
          </span>
        </div>

        <div className="flex flex-col rounded-[22px] border border-[#e4ecf2] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.03]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="mt-3 text-2xl font-extrabold text-[#162740] dark:text-white sm:text-3xl">
            150 / yr
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#596d86] dark:text-slate-400">
            NMC Sanctioned Intake
          </span>
        </div>

        <div className="flex flex-col rounded-[22px] border border-[#e4ecf2] bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.03]">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300">
            <Building2 className="h-5 w-5" />
          </span>
          <span className="mt-3 truncate text-lg font-extrabold text-[#162740] dark:text-white sm:text-xl">
            KNRUHS
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#596d86] dark:text-slate-400">
            Affiliating University
          </span>
        </div>
      </motion.div>

      {/* Filter & Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        className="flex flex-col gap-4 rounded-[24px] border border-[#e4ecf2] bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.03] lg:flex-row lg:items-center lg:justify-between"
      >
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8] dark:text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by student name or registration number..."
            className="w-full rounded-full border border-[#cbd5e1] bg-[#f8fafc] py-2.5 pl-11 pr-10 text-sm font-medium text-[#162740] placeholder-[#94a3b8] transition-all focus:border-[#1f3351] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1f3351]/20 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:placeholder-slate-400 dark:focus:border-teal-400 dark:focus:ring-teal-400/20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#94a3b8] hover:text-[#162740] dark:text-slate-400 dark:hover:text-white"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Dropdown Filters & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Admitted Year Dropdown Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#596d86] dark:text-slate-400">
              Batch:
            </span>
            <select
              value={selectedYearFilter}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedYearFilter(val);
                if (val !== "all") {
                  setExpandedBatches((prev) => ({ ...prev, [val]: true }));
                }
              }}
              className="rounded-full border border-[#cbd5e1] bg-[#f8fafc] px-4 py-2 text-xs font-bold text-[#162740] shadow-sm transition-all focus:border-[#1f3351] focus:outline-none dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:focus:border-teal-400"
            >
              <option value="all">All Admitted Years ({totalAllStudents} Students)</option>
              {ADMITTED_BATCHES.map((b) => (
                <option key={b.id} value={b.id}>
                  Academic Year {b.academicYear} ({b.totalStudents} Students)
                </option>
              ))}
            </select>
          </div>

          {/* Expand / Collapse All buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={expandAll}
              className="rounded-full border border-[#cbd5e1] bg-white px-3.5 py-2 text-xs font-semibold text-[#1f3351] transition-all hover:bg-[#f1f5f9] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08]"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="rounded-full border border-[#cbd5e1] bg-white px-3.5 py-2 text-xs font-semibold text-[#596d86] transition-all hover:bg-[#f1f5f9] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300 dark:hover:bg-white/[0.08]"
            >
              Collapse All
            </button>
          </div>

          {/* Export PDF button */}
          <button
            onClick={() => exportToPDF()}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1f3351] px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#162740] dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </motion.div>

      {/* Search results active indicator */}
      {searchQuery && (
        <div className="flex items-center justify-between text-xs font-semibold text-[#596d86] dark:text-slate-300">
          <span>
            Found <strong className="text-[#1f3351] dark:text-teal-300">{totalFilteredStudents}</strong> matching
            students for &ldquo;<span className="italic">{searchQuery}</span>&rdquo;
          </span>
          <button
            onClick={() => setSearchQuery("")}
            className="text-[#1f3351] underline hover:text-[#0d2346] dark:text-teal-400"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Batches Accordion / Dropdowns List */}
      <div className="space-y-5">
        {filteredBatches.map((batch, index) => {
          const isOpen = !!expandedBatches[batch.id];
          const studentCount = batch.filteredStudents.length;

          return (
            <motion.section
              key={batch.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
              className="overflow-hidden rounded-[24px] border border-[#e4ecf2] bg-white shadow-[0_10px_30px_rgba(15,23,42,0.05)] transition-all dark:border-white/10 dark:bg-white/[0.03] dark:shadow-[0_16px_44px_rgba(0,0,0,0.3)]"
            >
              {/* Dropdown Header Trigger */}
              <button
                type="button"
                onClick={() => toggleBatch(batch.id)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-4 p-5 text-left transition-colors duration-200 hover:bg-[#f8fafc] sm:px-7 sm:py-5 dark:hover:bg-white/[0.02]"
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  <span
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                      isOpen
                        ? "bg-[#1f3351] text-white shadow-sm dark:bg-teal-500 dark:text-[#0b172a]"
                        : "bg-[#1f3351]/10 text-[#1f3351] group-hover:bg-[#1f3351]/20 dark:bg-white/10 dark:text-teal-300 dark:group-hover:bg-white/15"
                    }`}
                  >
                    <Calendar className="h-5 w-5" />
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <h3 className="font-['Manrope',sans-serif] text-lg font-bold tracking-tight text-[#162740] dark:text-white sm:text-xl">
                      Academic Year {batch.academicYear}
                    </h3>
                    <span className="mt-1 w-fit rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 sm:mt-0">
                      {batch.totalStudents} Students
                    </span>
                  </div>
                </div>

                <div className="flex items-center pr-1 sm:pr-2">
                  <ChevronDown
                    className={`h-5 w-5 text-[#64748b] transition-transform duration-300 group-hover:text-[#162740] dark:text-slate-400 dark:group-hover:text-white ${
                      isOpen ? "rotate-180 text-[#1f3351] dark:text-teal-400" : ""
                    }`}
                  />
                </div>
              </button>

              {/* Dropdown Expandable Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`content-${batch.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden border-t border-[#e4ecf2] bg-white dark:border-white/10 dark:bg-[#0c1626]/40"
                  >
                    {/* Header actions inside the dropdown */}
                    <div className="flex items-center justify-end border-b border-[#e4ecf2] bg-[#f8fafc] px-6 py-3 sm:px-8 dark:border-white/10 dark:bg-white/[0.02]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          exportToPDF(batch);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1f3351] hover:underline dark:text-teal-400 dark:hover:text-teal-300"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Download PDF for {batch.academicYear}
                      </button>
                    </div>

                    {/* Student Rows Table */}
                    {studentCount === 0 ? (
                      <div className="p-12 text-center text-sm text-[#596d86] dark:text-slate-400">
                        No students matching &ldquo;<span className="font-semibold">{searchQuery}</span>&rdquo; found in this batch.
                      </div>
                    ) : (
                      <div className="w-full overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead>
                            <tr className="border-b border-[#e4ecf2] bg-[#f1f5f9]/70 text-[11px] font-bold uppercase tracking-wider text-[#475569] dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                              <th scope="col" className="w-20 px-6 py-3.5 text-center sm:px-8 sm:w-24">
                                Sl. No.
                              </th>
                              <th scope="col" className="w-48 px-4 py-3.5 sm:px-6 sm:w-56">
                                Registration / Roll No.
                              </th>
                              <th scope="col" className="px-4 py-3.5 sm:px-6">
                                Student Name
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#e4ecf2] dark:divide-white/5">
                            {batch.filteredStudents.map((student) => (
                              <tr
                                key={`${batch.id}-${student.slNo}-${student.rollNo}`}
                                className="group transition-colors duration-150 hover:bg-[#1f3351]/[0.025] dark:hover:bg-white/[0.03]"
                              >
                                {/* Sl. No. */}
                                <td className="whitespace-nowrap px-6 py-3.5 text-center font-['Manrope',sans-serif] text-xs font-semibold tabular-nums text-[#64748b] group-hover:text-[#162740] dark:text-slate-400 dark:group-hover:text-white sm:px-8">
                                  {student.slNo}
                                </td>

                                {/* Registration / Roll No. */}
                                <td className="whitespace-nowrap px-4 py-3.5 sm:px-6">
                                  <span className="inline-flex items-center rounded-md border border-[#cbd5e1] bg-[#f8fafc] px-3 py-1 font-mono text-xs font-bold tracking-wider text-[#1f3351] shadow-2xs group-hover:border-[#1f3351]/30 group-hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-teal-300 dark:group-hover:border-teal-400/40 dark:group-hover:bg-white/10">
                                    {student.rollNo}
                                  </span>
                                </td>

                                {/* Student Name */}
                                <td className="px-4 py-3.5 font-['Manrope',sans-serif] text-sm font-bold tracking-wide text-[#162740] group-hover:text-[#0f172a] dark:text-slate-100 dark:group-hover:text-teal-200 sm:px-6">
                                  {student.name}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Batch Footer note */}
                    <div className="flex flex-col gap-2 border-t border-[#e4ecf2] bg-[#f8fafc]/50 p-4 text-[11px] text-[#64748b] dark:border-white/10 dark:bg-white/[0.01] dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                      <span>
                        Affiliated to <strong>Kaloji Narayana Rao University of Health Sciences (KNRUHS)</strong>, Warangal &bull; Recognized by <strong>National Medical Commission (NMC)</strong>
                      </span>
                      <span className="font-semibold text-[#1f3351] dark:text-teal-400">
                        {batch.batchName} &bull; Total {batch.totalStudents} Seats Allotted
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
};

export default AdmittedStudentsList;
