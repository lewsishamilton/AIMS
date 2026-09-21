import type { StaticPageDef } from "../../components/StaticPage";

const PATIENT_LINKS = [
  { name: "Citizen Charter", path: "/patient-care/citizen-charter" },
  { name: "OPD Timings", path: "/patient-care/opd-timings" },
  { name: "Admission & Discharge", path: "/patient-care/admission-discharge" },
  { name: "Insurance & TPA", path: "/patient-care/insurance" },
  { name: "Feedback & Grievance", path: "/patient-care/feedback" },
];

const linksExcept = (path: string) =>
  PATIENT_LINKS.filter((l) => l.path !== path);

export const PATIENT_CARE_PAGES: Record<string, StaticPageDef> = {
  "/patient-care/citizen-charter": {
    eyebrow: "Patient Care",
    title: "Citizen Charter",
    subtitle:
      "What every patient and attendant at Marri Arundhathi Multi-Specialty Hospital is entitled to, what we ask of you in return, and how to raise a complaint if we fall short.",
    sections: [
      {
        title: "Our Commitment",
        content:
          "Arundathi Institute of Medical Sciences was founded on the conviction that quality medical care should not be out of reach for ordinary families. This charter sets out, in plain terms, the standard of service a patient can expect from the hospital and the route available to them when that standard is not met.",
        layout: "full",
      },
      {
        title: "Your Rights as a Patient",
        bullets: [
          "Access to 24×7 emergency and casualty services with 25 beds, central oxygen supply and central suction",
          "Free wheelchairs and stretchers available at the outpatient entrance",
          "Complimentary food and mineral water for admitted patients",
          "Clean and maintained sanitary facilities",
          "Lifts and ramps providing accessible movement for patients with disabilities",
          "An explanation of your diagnosis, treatment plan and expected cost in a language you understand",
          "Privacy and confidentiality of your medical records",
        ],
        layout: "full",
      },
      {
        title: "Service Commitments",
        bullets: [
          "The hospital operates round the clock, every day of the year",
          "Emergency and casualty services are available 24×7",
          "Diagnostic services run continuously, including nights and holidays",
          "Outpatient consultation: Monday to Saturday, 8:00 AM to 5:00 PM",
          "Specialist cover across all clinical and super-speciality departments",
          "A hygienic cafeteria serving meals at nominal prices",
          "The campus is strictly tobacco-free",
        ],
        layout: "half",
      },
      {
        title: "Your Responsibilities",
        bullets: [
          "Beware of touts and unauthorised persons on the premises",
          "Do not engage with anyone claiming to arrange treatment or admission for a fee",
          "Keep your valuables with you; the hospital is not responsible for personal property",
          "Cooperate with administrative staff and security personnel",
          "Give complete and accurate information about your medical history",
          "Respect hospital timings, visiting hours and the comfort of other patients",
        ],
        layout: "half",
      },
      {
        title: "Grievance Redressal",
        content:
          "A patient who is not satisfied with the service received may lodge a complaint with the reception, the casualty medical officer, the Resident Medical Officer, the Medical Superintendent or the Dean. Every grievance is acknowledged, and the institution makes a sincere attempt to resolve the issue promptly. Constructive feedback is welcomed and is used to correct what is not working.",
        layout: "full",
      },
    ],
    quickLinks: linksExcept("/patient-care/citizen-charter"),
    cta: {
      text: "Have a complaint, a suggestion, or something that went well and deserves saying? We would like to hear it.",
      label: "Feedback & Grievance",
      path: "/patient-care/feedback",
    },
  },

  "/patient-care/opd-timings": {
    eyebrow: "Patient Care",
    title: "OPD Timings & Visiting",
    subtitle:
      "Outpatient consultations run Monday to Saturday, 8:00 AM to 5:00 PM. Emergency and casualty services are open 24 hours, seven days a week.",
    sections: [
      {
        title: "Outpatient Department",
        badges: ["Mon–Sat", "8:00 AM – 5:00 PM"],
        content:
          "All clinical and super-speciality departments hold outpatient clinics during OPD hours. Registration opens at the front desk; a valid photo identification is required for a new registration, and returning patients should bring their hospital card or previous prescription.",
        layout: "full",
      },
      {
        title: "Emergency & Casualty",
        subtitle: "Open 24×7, including Sundays and holidays",
        content:
          "The casualty department never closes. Patients arriving with an emergency are triaged on arrival and are seen ahead of the outpatient queue, irrespective of the hour.",
        layout: "half",
      },
      {
        title: "Diagnostics",
        subtitle: "Round the clock",
        content:
          "Radiology, the central laboratory and the blood bank operate continuously. Routine outpatient investigations are best scheduled during OPD hours; emergency investigations are available at any time.",
        layout: "half",
      },
      {
        title: "Planning Your Visit",
        bullets: [
          "Arrive early in the OPD session for a shorter wait, especially on Mondays",
          "Bring previous prescriptions, discharge summaries and scan reports",
          "Carry a list of your current medicines and any known allergies",
          "Bring photo identification and, if covered, your insurance or TPA card",
          "Fasting is required for certain blood tests and contrast scans — confirm when booking",
          "Wheelchairs and stretchers are available free at the entrance",
        ],
        layout: "full",
      },
      {
        title: "Visiting Hours",
        content:
          "Visiting hours for inpatients are notified on each ward. One attendant is permitted to stay with an admitted patient. Visitors are not permitted inside intensive care units except during the notified visiting window, and children are discouraged from visiting the wards.",
        layout: "half",
      },
      {
        title: "Reaching the Hospital",
        bullets: [
          "Beside MLRIT, Dundigal, Gandi Maisamma, Medchal–Malkajgiri District, Telangana 500043",
          "Reception: +91 80556 67888",
          "Alternate line: +91 80741 58018",
          "Ambulance: +91 81794 32491",
        ],
        layout: "half",
      },
    ],
    quickLinks: linksExcept("/patient-care/opd-timings"),
  },

  "/patient-care/admission-discharge": {
    eyebrow: "Patient Care",
    title: "Admission & Discharge",
    subtitle:
      "What happens from the moment a decision to admit is taken, through the stay, to the day the patient goes home.",
    sections: [
      {
        title: "Getting Admitted",
        content:
          "Admission follows a decision by the treating consultant, either from the outpatient clinic or through casualty. The admission desk records the patient's details, explains the room category and the likely cost, and issues the admission slip. Emergency admissions are processed immediately, with paperwork completed alongside treatment rather than before it.",
        layout: "full",
      },
      {
        title: "Bring With You",
        bullets: [
          "Photo identification for the patient and the attendant",
          "Previous discharge summaries, prescriptions and investigation reports",
          "Current medicines in their original packaging",
          "Insurance or TPA card and policy details, if applicable",
          "Referral letter, where the patient has been referred",
        ],
        layout: "half",
      },
      {
        title: "During the Stay",
        bullets: [
          "One attendant may stay with the admitted patient",
          "Complimentary food and mineral water are provided to admitted patients",
          "Medicines and investigations are billed as they are used",
          "Ask the treating unit for a progress update during the daily round",
          "Keep valuables with you — do not leave them in the room",
        ],
        layout: "half",
      },
      {
        title: "Discharge",
        content: [
          "The treating consultant decides the date of discharge. Once discharge is advised, the ward prepares the discharge summary, the pharmacy returns any unused items, and the billing desk issues the final bill.",
          "The discharge summary records the diagnosis, the treatment given, the medicines to continue at home and the date of the follow-up visit. Read it before leaving and ask the nursing staff about anything that is unclear — particularly the dose and duration of each medicine.",
        ],
        layout: "full",
      },
      {
        title: "Before You Leave",
        bullets: [
          "Collect the discharge summary and all original investigation reports",
          "Confirm the follow-up appointment date and the department",
          "Collect discharge medicines from the pharmacy",
          "Obtain the final bill and receipts, and the claim documents if insured",
        ],
        layout: "half",
      },
      {
        title: "Medical Records",
        content:
          "Copies of case records and investigation reports may be requested from the medical records section on written application by the patient or an authorised relative, with proof of identity. Records are released in accordance with the hospital's confidentiality policy.",
        layout: "half",
      },
    ],
    quickLinks: linksExcept("/patient-care/admission-discharge"),
  },

  "/patient-care/insurance": {
    eyebrow: "Patient Care",
    title: "Insurance & TPA",
    subtitle:
      "How cashless and reimbursement claims are handled at Marri Arundhathi Multi-Specialty Hospital, and what the insurance desk needs from you.",
    sections: [
      {
        title: "The Insurance Desk",
        content:
          "The hospital's insurance desk coordinates with third-party administrators and insurers for admitted patients. Declare your policy at the time of admission — a claim started at admission moves considerably faster than one raised at discharge, and cashless approval cannot be processed retrospectively once the bill is settled.",
        layout: "full",
      },
      {
        title: "Planned Admission",
        bullets: [
          "Inform the insurance desk at least 48 hours before admission where possible",
          "Submit the pre-authorisation request with the treating consultant's plan",
          "Wait for the insurer's approval before the date of admission",
          "Carry the policy card, photo identification and the approval letter",
        ],
        layout: "half",
      },
      {
        title: "Emergency Admission",
        bullets: [
          "Declare the policy at the admission desk as soon as the patient is stabilised",
          "The desk raises an emergency pre-authorisation with the insurer",
          "Treatment is never delayed while approval is pending",
          "An interim deposit may be taken and adjusted against the approved amount",
        ],
        layout: "half",
      },
      {
        title: "Documents Required",
        bullets: [
          "Insurance or TPA card and the policy number",
          "Photo identification of the patient and the policy holder",
          "Completed and signed pre-authorisation form",
          "Prescriptions, investigation reports and the treating consultant's notes",
          "Discharge summary and the final bill with itemised receipts, for reimbursement",
        ],
        layout: "full",
      },
      {
        title: "Non-Admissible Items",
        content:
          "Most policies exclude certain consumables, registration charges and non-medical items, and many apply a co-payment or a room-rent limit. Anything the insurer does not approve is payable by the patient at discharge. The insurance desk will tell you what is likely to be excluded before you commit to a room category.",
        layout: "half",
      },
      {
        title: "Schemes & Panels",
        content:
          "The list of insurers, third-party administrators and government health schemes empanelled with the hospital is revised from time to time. Confirm your insurer's current status with the insurance desk on +91 80556 67888 before admission.",
        layout: "half",
      },
    ],
    quickLinks: linksExcept("/patient-care/insurance"),
    cta: {
      text: "Unsure whether your policy is accepted here? Call the hospital reception and ask for the insurance desk before you travel.",
      label: "Contact Us",
      path: "/contact",
    },
  },

  "/patient-care/feedback": {
    eyebrow: "Patient Care",
    title: "Feedback & Grievance",
    subtitle:
      "Tell us what went wrong — or what went right. Every grievance is acknowledged and acted on, and feedback is what tells us where the hospital needs to improve.",
    sections: [
      {
        title: "Who to Approach",
        content:
          "A patient or attendant who is not satisfied with the service received may raise the matter at any of the following levels. You do not need to go in order — take the complaint to whichever level fits its seriousness.",
        bullets: [
          "Reception — for registration, billing, waiting time and general service issues",
          "Casualty Medical Officer — for concerns arising in the emergency department",
          "Resident Medical Officer — for ward, nursing and inpatient service issues",
          "Medical Superintendent — for clinical care and hospital administration",
          "Dean — for academic matters and for grievances not resolved at other levels",
        ],
        layout: "full",
      },
      {
        title: "What Happens Next",
        bullets: [
          "Your grievance is recorded and acknowledged",
          "It is referred to the department concerned for a factual report",
          "A sincere attempt is made to resolve the issue promptly",
          "The outcome is communicated back to the complainant",
        ],
        layout: "half",
      },
      {
        title: "Helps Us Act Faster",
        bullets: [
          "The patient's name and inpatient or registration number",
          "The date, time and location of the incident",
          "The department or staff involved, if known",
          "Copies of any relevant bills, prescriptions or reports",
        ],
        layout: "half",
      },
      {
        title: "Specialised Committees",
        content:
          "Some complaints are dealt with by a constituted committee rather than the administration. Complaints of sexual harassment are handled by the POSH Internal Committee, ragging complaints by the Anti Ragging Committee, matters of student discipline by the Disciplinary Committee, and adverse drug reactions are reported to the Pharmacovigilance Committee.",
        layout: "full",
      },
      {
        title: "Reach Us",
        bullets: [
          "Hospital reception: +91 80556 67888",
          "Alternate line: +91 80741 58018",
          "Email: info@aims.ac.in",
          "Beside MLRIT, Dundigal, Gandi Maisamma, Medchal–Malkajgiri District, Telangana 500043",
        ],
        layout: "full",
      },
    ],
    quickLinks: [
      ...linksExcept("/patient-care/feedback"),
      { name: "POSH Internal Committee", path: "/committess/posh-internal" },
      { name: "Anti Ragging Committee", path: "/committess/anti-ragging" },
    ],
    cta: {
      text: "For anything that is not a complaint — appointments, directions, admissions or general enquiries — use the contact page.",
      label: "Contact AIMS",
      path: "/contact",
    },
  },
};
