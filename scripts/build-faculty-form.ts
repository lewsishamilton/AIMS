/**
 * Builds the blank, printable "Application for Faculty Recruitment" PDF that applicants can
 * download, fill in by hand, and send by email or post. Same fields, order and wording as the
 * online form (src/data/facultyApplication.ts), so the two never drift apart.
 *
 *   node scripts/build-faculty-form.ts
 *
 * Writes public/forms/aims-faculty-application-form.pdf — re-run after changing the form.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  COLLEGE_POSTAL_ADDRESS,
  DECLARATION,
  EXPERIENCE_DESIGNATIONS,
  QUALIFICATION_DEGREES,
  RECRUITMENT_EMAIL,
  RECRUITMENT_PHONES,
  REQUIRED_DOCUMENTS,
  TEACHING_DEPARTMENTS,
  TEACHING_POSTS,
} from "../src/data/facultyApplication.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "public", "forms", "aims-faculty-application-form.pdf");

const doc = new jsPDF({ unit: "mm", format: "a4" });
const W = doc.internal.pageSize.getWidth();
const H = doc.internal.pageSize.getHeight();
const M = 14;
const NAVY: [number, number, number] = [31, 51, 81];
const lastY = () => (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;

const box = (x: number, y: number, s = 3.4) => {
  doc.setDrawColor(60);
  doc.setLineWidth(0.25);
  doc.rect(x, y - s + 0.6, s, s);
};

/** Move to a new page when fewer than `need` mm remain, so headings stay with their tables. */
const room = (y: number, need: number) => {
  if (y + need > H - 16) {
    doc.addPage();
    return 20;
  }
  return y;
};

const heading = (text: string, y: number) => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(...NAVY);
  doc.text(text, M, y);
  doc.setTextColor(0);
  return y + 2;
};

/** Label / blank-answer rows, each tall enough to write in by hand. */
const blanks = (rows: [string, number][], startY: number, right = M) =>
  autoTable(doc, {
    startY,
    margin: { left: M, right },
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 2, valign: "top", textColor: 20, lineColor: 170, lineWidth: 0.2 },
    columnStyles: { 0: { cellWidth: 62, fontStyle: "bold", fillColor: [244, 246, 250] } },
    body: rows.map(([label]) => [label, ""]),
    didParseCell: (d) => {
      if (d.section === "body") d.cell.styles.minCellHeight = rows[d.row.index][1];
    },
  });

// ── Page 1 ─────────────────────────────────────────────────────────────
doc.setFont("times", "bold");
doc.setFontSize(15);
doc.setTextColor(...NAVY);
doc.text("ARUNDATHI INSTITUTE OF MEDICAL SCIENCES", W / 2, 16, { align: "center" });
doc.setFontSize(9.5);
doc.setTextColor(40);
doc.text("Dundigal, Gandimaisamma, Medchal Road, Hyderabad-500043, Telangana", W / 2, 22, { align: "center" });
doc.setDrawColor(40);
doc.setLineWidth(0.4);
doc.line(M, 26, W - M, 26);

doc.setFont("helvetica", "bold");
doc.setFontSize(11.5);
doc.setTextColor(0);
doc.text("APPLICATION FOR FACULTY RECRUITMENT", W / 2, 34, { align: "center" });

// Photo box
const photoW = 32;
const photoH = 40;
doc.setDrawColor(90);
doc.setLineWidth(0.3);
doc.rect(W - M - photoW, 39, photoW, photoH);
doc.setFont("helvetica", "normal");
doc.setFontSize(8);
doc.setTextColor(90);
doc.text(["Please affix", "recent passport", "size photo"], W - M - photoW / 2, 55, { align: "center" });
doc.setTextColor(0);

// Post — tick one
doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.text("Application for the post of (tick one):", M, 44);
doc.setFont("helvetica", "normal");
doc.setFontSize(9);
TEACHING_POSTS.forEach((p, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = M + 2 + col * 62;
  const y = 51 + row * 6.5;
  box(x, y);
  doc.text(p, x + 5.5, y);
});

// Department — tick one
let y = 51 + Math.ceil(TEACHING_POSTS.length / 2) * 6.5 + 4;
doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.text("Department (tick one):", M, y);
doc.setFont("helvetica", "normal");
doc.setFontSize(8.8);
const deptTop = Math.max(y + 7, 39 + photoH + 6);
const colW = (W - 2 * M) / 3;
const perCol = Math.ceil(TEACHING_DEPARTMENTS.length / 3);
TEACHING_DEPARTMENTS.forEach((d, i) => {
  const col = Math.floor(i / perCol);
  const row = i % perCol;
  const x = M + 2 + col * colW;
  const yy = deptTop + row * 6;
  box(x, yy);
  doc.text(d, x + 5.5, yy);
});
y = deptTop + perCol * 6 + 2;

blanks(
  [
    ["1. Name of the Candidate\n(in capital letters)", 11],
    ["2. Name of the Father / Mother / Husband / Wife", 11],
    ["3a. Permanent Address\n(in capital letters)", 20],
    ["3b. Address for correspondence\n(in capital letters)", 20],
    ["3c. Mobile No", 9],
    ["3d. e-mail", 9],
    ["4. Place & Date of Birth", 9],
    ["4a. Nationality", 9],
    ["4b. Religion", 9],
    ["4c. Caste", 9],
    ["4d. Sex", 9],
  ],
  y
);
// "Male / Female" hint in the Sex row
{
  const t = doc as unknown as { lastAutoTable: { finalY: number } };
  doc.setFontSize(9);
  doc.setTextColor(90);
  doc.text("Male  /  Female", M + 66, t.lastAutoTable.finalY - 3.2);
  doc.setTextColor(0);
}

// ── Qualifications ─────────────────────────────────────────────────────
y = heading("5. Educational Qualifications", room(lastY() + 8, 90));
autoTable(doc, {
  startY: y,
  margin: { left: M, right: M },
  theme: "grid",
  headStyles: { fillColor: NAVY, fontSize: 8.5, valign: "middle" },
  styles: { fontSize: 9, cellPadding: 2, lineColor: 170, lineWidth: 0.2, minCellHeight: 11, valign: "middle" },
  columnStyles: { 0: { cellWidth: 22, fontStyle: "bold" }, 1: { cellWidth: 18 } },
  head: [["Degree", "Year", "Name of College", "Name of University/Board", "Percentage of Marks & Grade"]],
  body: QUALIFICATION_DEGREES.map((d) => [d, "", "", "", ""]),
});

blanks(
  [
    ["5(a). Registration number with date of Registration", 11],
    ["5(b). Name of State Medical Council", 11],
  ],
  lastY() + 4
);

// ── Experience ─────────────────────────────────────────────────────────
y = heading("6. Details of Teaching experience till date", room(lastY() + 8, 90));
autoTable(doc, {
  startY: y,
  margin: { left: M, right: M },
  theme: "grid",
  headStyles: { fillColor: NAVY, fontSize: 8.5, valign: "middle", textColor: 255 },
  styles: { fontSize: 8.5, cellPadding: 2, lineColor: 170, lineWidth: 0.2, minCellHeight: 11, valign: "middle", textColor: 60 },
  columnStyles: { 0: { cellWidth: 30, fontStyle: "bold", textColor: 20 }, 3: { cellWidth: 25 }, 4: { cellWidth: 25 }, 5: { cellWidth: 30 } },
  head: [["Designation", "Department", "Institution", "From", "To", "Total no. of years of experience"]],
  body: EXPERIENCE_DESIGNATIONS.map((d) => [d, "", "", "__/__/____", "__/__/____", "___(y) ___(m)"]),
});

blanks(
  [
    ["7. Present Place of Working & Designation", 14],
    ["8. Total Years of Teaching Experience", 10],
    ["9. Date of appearance in last NMC assessment (UG / PG)", 10],
    ["10. Any other Experience / Administrative experience", 22],
  ],
  lastY() + 4
);

blanks(
  [
    ["11. Number of Research articles in Indexed Journals:\na. International Journals", 12],
    ["National Journals", 9],
    ["b. State / Institutional Journals", 9],
    ["12. Details of other publications:\na. Number of Books published", 12],
    ["b. Number of Chapters in books", 9],
  ],
  room(lastY() + 4, 60)
);

blanks(
  [
    ["13. Extra-curricular activities like sports / cultural / medals at university / state / National level", 28],
    ["14. Any other innovative / initiatives made by the applicant", 28],
    ["15. Any other information the candidate wish to furnish", 28],
  ],
  lastY() + 4
);

// ── Note + Declaration ─────────────────────────────────────────────────
y = lastY() + 8;
if (y > H - 110) {
  doc.addPage();
  y = 20;
}
doc.setFont("helvetica", "bold");
doc.setFontSize(9.5);
doc.text(
  doc.splitTextToSize("Note: The Candidate should enclose all the relevant supporting documents on all the above aspects.", W - 2 * M),
  M,
  y
);
y += 12;
doc.setFontSize(10.5);
doc.text("DECLARATION", W / 2, y, { align: "center" });
y += 7;
doc.setFont("helvetica", "normal");
doc.setFontSize(9);
DECLARATION.forEach((para, i) => {
  const lines = doc.splitTextToSize(para, W - 2 * M - 6);
  doc.text(`${i + 1}.`, M, y);
  doc.text(lines, M + 6, y, { lineHeightFactor: 1.35 });
  y += lines.length * 4.4 + 3;
});
y += 14;
doc.setFont("helvetica", "bold");
doc.setFontSize(10);
doc.text("Date:", M, y);
doc.text("Signature", W - M - 50, y);
doc.text("Place:", M, y + 9);
doc.setDrawColor(120);
doc.setLineWidth(0.2);
doc.line(M + 12, y + 0.5, M + 62, y + 0.5);
doc.line(M + 13, y + 9.5, M + 62, y + 9.5);
doc.line(W - M - 50, y + 10, W - M, y + 10);

// ── Documents checklist ────────────────────────────────────────────────
doc.addPage();
doc.setFont("helvetica", "bold");
doc.setFontSize(11);
doc.text("LIST OF DOCUMENTS TO BE SUBMITTED BY THE APPLICANT", W / 2, 20, { align: "center" });
autoTable(doc, {
  startY: 26,
  margin: { left: M, right: M },
  theme: "grid",
  headStyles: { fillColor: NAVY, fontSize: 9, halign: "center" },
  styles: { fontSize: 9, cellPadding: 2.4, lineColor: 170, lineWidth: 0.2, valign: "middle" },
  columnStyles: { 0: { cellWidth: 14, halign: "center" }, 2: { cellWidth: 28, halign: "center" } },
  head: [["SL. No", "Documents", "Submitted"]],
  body: REQUIRED_DOCUMENTS.map((d, i) => [`${i + 1}.`, d, "Yes  /  No"]),
});

// ── How to submit ──────────────────────────────────────────────────────
y = lastY() + 10;
const boxH = 50;
doc.setFillColor(244, 246, 250);
doc.setDrawColor(...NAVY);
doc.setLineWidth(0.4);
doc.roundedRect(M, y, W - 2 * M, boxH, 2, 2, "FD");
doc.setFont("helvetica", "bold");
doc.setFontSize(10.5);
doc.setTextColor(...NAVY);
doc.text("HOW TO SUBMIT THIS FORM", M + 5, y + 8);
doc.setTextColor(0);
doc.setFont("helvetica", "normal");
doc.setFontSize(9);
const how = [
  `By email: scan the completed form and your supporting documents and send them to ${RECRUITMENT_EMAIL}`,
  `By post or in person: ${COLLEGE_POSTAL_ADDRESS}`,
  `Phone: ${RECRUITMENT_PHONES.join("  /  ")}`,
  "Or apply online: www.aims.ac.in/careers/teaching/apply",
];
let hy = y + 15;
for (const line of how) {
  const parts = doc.splitTextToSize(line, W - 2 * M - 14);
  doc.text("•", M + 5, hy);
  doc.text(parts, M + 9, hy);
  hy += parts.length * 4.4 + 2.2;
}

// Footer on every page
const pages = doc.getNumberOfPages();
for (let p = 1; p <= pages; p++) {
  doc.setPage(p);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(120);
  doc.text("Arundathi Institute of Medical Sciences – Application for Faculty Recruitment", M, H - 7);
  doc.text(`Page ${p} of ${pages}`, W - M, H - 7, { align: "right" });
}

writeFileSync(OUT, Buffer.from(doc.output("arraybuffer")));
console.log(`[faculty-form] wrote ${OUT} (${pages} pages)`);
