import meuPdf from "../assets/MEU.pdf";
import scientificPdf from "../assets/Scientific-committee.pdf";
import antiRaggingPdf from "../assets/Anti Ragging Committee.pdf";
import ethicsPdf from "../assets/Ethics Committee.pdf";
import poshInternalPdf from "../assets/POSH internal committee.pdf";
import pharmacovigilancePdf from "../assets/pharmacvigilance committee.pdf";
import disciplinaryPdf from "../assets/Disciplinary committee.pdf";

export interface Committee {
  path: string;
  title: string;
  subtitle: string;
  pdfUrl: string;
}

/** Each committee page shows its constitution PDF. App.tsx and the SEO metadata both read this list. */
export const COMMITTEES: Committee[] = [
  {
    path: "/committess/meu",
    title: "Medical Educational Unit",
    subtitle:
      "Enhancing the quality of medical education through innovative teaching methodologies, curriculum development, faculty training, student-centered learning and continuous assessment to foster academic excellence and professional growth",
    pdfUrl: meuPdf,
  },
  {
    path: "/committess/scientific",
    title: "Scientific Committee",
    subtitle:
      "Fostering a culture of scientific inquiry, research and innovation by encouraging academic collaboration, supporting research methodology, promoting evidence-based practices and advancing knowledge in medical and pharmaceutical sciences",
    pdfUrl: scientificPdf,
  },
  {
    path: "/committess/anti-ragging",
    title: "Anti Ragging Committee",
    subtitle:
      "Ensuring a safe, inclusive and respectful academic environment through awareness programmes, preventive measures, student counselling and effective monitoring while promoting dignity, equality, mutual respect and a campus culture free from ragging",
    pdfUrl: antiRaggingPdf,
  },
  {
    path: "/committess/ethics",
    title: "Ethics Committee",
    subtitle:
      "Upholding ethical principles in medical education, research and healthcare by protecting the rights, safety and dignity of individuals, promoting responsible scientific conduct, ensuring informed consent and encouraging integrity in professional practice",
    pdfUrl: ethicsPdf,
  },
  {
    path: "/committess/posh-internal",
    title: "POSH Internal Committee",
    subtitle:
      "Promoting a safe, inclusive and dignified educational and working environment through awareness initiatives, prevention of sexual harassment, confidential complaint handling and appropriate redressal mechanisms while safeguarding the rights and well-being of every individual",
    pdfUrl: poshInternalPdf,
  },
  {
    path: "/committess/pharmacovigilance",
    title: "Pharmacovigilance Committee",
    subtitle:
      "Strengthening patient safety and the responsible use of medicines through adverse drug reaction reporting, drug safety monitoring, identification and assessment of medication-related risks, rational drug use and continuous improvement in pharmaceutical care",
    pdfUrl: pharmacovigilancePdf,
  },
  {
    path: "/committess/disciplinary",
    title: "Disciplinary Committee",
    subtitle:
      "Promoting academic integrity, professional responsibility and adherence to institutional rules through fair disciplinary procedures, awareness of student responsibilities, ethical conduct and constructive guidance to maintain a harmonious, respectful and well-disciplined campus community",
    pdfUrl: disciplinaryPdf,
  },
];
