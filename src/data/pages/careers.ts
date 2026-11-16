import type { StaticPageDef } from "../../components/StaticPage";
import {
  COLLEGE_POSTAL_ADDRESS,
  RECRUITMENT_EMAIL,
  RECRUITMENT_PHONES,
  TEACHING_DEPARTMENTS,
} from "../facultyApplication";

/**
 * Careers: general recruitment pages, split into teaching (faculty) and non-teaching
 * (hospital and administrative) staff. No specific vacancies are listed here on purpose,
 * so nothing goes out of date; applicants send a CV to the hospital email.
 */

const CAREER_LINKS = [
  { name: "Teaching Positions", path: "/careers/teaching" },
  { name: "Non-Teaching Positions", path: "/careers/non-teaching" },
  { name: "Departments", path: "/departments" },
  { name: "Contact Us", path: "/contact" },
];

const linksExcept = (path: string) => CAREER_LINKS.filter((l) => l.path !== path);

const HOW_TO_APPLY_CONTACT = `Email: ${RECRUITMENT_EMAIL} · Phone: ${RECRUITMENT_PHONES.join(" / ")} · ${COLLEGE_POSTAL_ADDRESS}.`;

export const CAREER_PAGES: Record<string, StaticPageDef> = {
  "/careers/teaching": {
    eyebrow: "Careers",
    title: "Teaching Positions",
    subtitle:
      "Join the faculty of Arundathi Institute of Medical Sciences and teach, research and practise inside a working tertiary-care hospital.",
    sections: [
      {
        title: "Teach at AIMS",
        badges: ["MBBS", "MD / MS", "NMC Norms"],
        content: [
          "Arundathi Institute of Medical Sciences trains undergraduate MBBS students and postgraduate MD / MS residents, with teaching, clinical work and research carried out alongside the attached Arundathi Hospital.",
          "We welcome applications from qualified teachers across the pre-clinical, para-clinical and clinical departments who want to combine medical education with patient care.",
        ],
        layout: "full",
      },
      {
        title: "Faculty Positions",
        bullets: [
          "Professor",
          "Associate Professor",
          "Assistant Professor",
          "Senior Resident",
          "Tutor / Demonstrator",
        ],
        layout: "half",
      },
      {
        title: "Departments",
        badges: [...TEACHING_DEPARTMENTS],
        layout: "half",
      },
      {
        title: "Eligibility",
        bullets: [
          "Qualifications and teaching experience as prescribed by the National Medical Commission for the post and department",
          "Registration with the National Medical Commission or a State Medical Council, where applicable",
          "Postgraduate degree in the relevant speciality for clinical and medical teaching posts",
        ],
        layout: "full",
      },
      {
        title: "How to Apply",
        content: [
          "Apply online using the Application for Faculty Recruitment — your completed application reaches the institute as a PDF and you receive a confirmation by email. Or download the form, fill it in by hand and send it with your supporting documents by email or post. Candidates can also visit the institution directly; walk-in interviews are held at the Dean's Office.",
          "For any questions about your application — " + HOW_TO_APPLY_CONTACT,
        ],
        layout: "full",
      },
    ],
    quickLinks: [{ name: "Apply Online", path: "/careers/teaching/apply" }, ...linksExcept("/careers/teaching")],
    cta: {
      text: "Ready to apply? Fill in the Application for Faculty Recruitment online — it takes about 15 minutes. Keep your qualification, registration and experience details at hand.",
      label: "Apply Online",
      path: "/careers/teaching/apply",
    },
  },

  "/careers/non-teaching": {
    eyebrow: "Careers",
    title: "Non-Teaching Positions",
    subtitle:
      "Nursing, technical, paramedical and administrative roles across Arundathi Hospital and the institute.",
    sections: [
      {
        title: "Work at Arundathi Hospital",
        badges: ["Nursing", "Technical", "Administration"],
        content: [
          "Arundathi Hospital runs outpatient clinics, wards, intensive care, operation theatres, laboratories and diagnostics every day of the year, supported by the administrative teams of the hospital and the institute.",
          "We welcome applications from qualified nurses, technicians, paramedical staff and administrative professionals who want to work in a teaching hospital.",
        ],
        layout: "full",
      },
      {
        title: "Nursing & Clinical Support",
        bullets: [
          "Nursing staff for wards, ICU, operation theatres and emergency",
          "Operation theatre and anaesthesia technicians",
          "Laboratory, radiology and blood bank technicians",
          "Dialysis and cath lab technicians",
          "Pharmacists",
          "Physiotherapists",
        ],
        layout: "half",
      },
      {
        title: "Administration & Support",
        bullets: [
          "Front office and patient services",
          "Medical records",
          "Billing, insurance and TPA",
          "Accounts, HR and office administration",
          "IT support",
          "Housekeeping, maintenance, transport and hostel services",
        ],
        layout: "half",
      },
      {
        title: "Eligibility",
        bullets: [
          "Qualification recognised for the post, such as GNM or B.Sc. Nursing for nursing staff and a diploma or degree in the relevant discipline for technical posts",
          "Registration with the relevant council where the post requires it, such as the Nursing Council or Pharmacy Council",
          "Relevant work experience is preferred",
        ],
        layout: "full",
      },
      {
        title: "How to Apply",
        content: [
          "Email your CV with the post you are applying for, your qualifications, registration details where applicable and work experience. Shortlisted candidates will be contacted for an interview.",
          HOW_TO_APPLY_CONTACT,
        ],
        layout: "full",
      },
    ],
    quickLinks: linksExcept("/careers/non-teaching"),
    cta: {
      text: "Are you a qualified medical teacher? See the faculty positions in our teaching departments.",
      label: "Teaching Positions",
      path: "/careers/teaching",
    },
  },
};
