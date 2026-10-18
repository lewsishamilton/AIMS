import type { StaticPageDef } from "../../components/StaticPage";

const PATIENT_LINKS = [
  { name: "Citizen Charter", path: "/patient-care/citizen-charter" },
  { name: "OPD Timings", path: "/patient-care/opd-timings" },
  { name: "Admission & Discharge", path: "/patient-care/admission-discharge" },
  { name: "Insurance & TPA", path: "/patient-care/insurance" },
  { name: "Complaints & Feedback", path: "/patient-care/feedback" },
];

const linksExcept = (path: string) =>
  PATIENT_LINKS.filter((l) => l.path !== path);

export const PATIENT_CARE_PAGES: Record<string, StaticPageDef> = {
  "/patient-care/citizen-charter": {
    eyebrow: "Patient Care",
    title: "Citizen Charter",
    subtitle:
      "The services, timings and standards that patients and visitors can expect at Arundathi Institute of Medical Sciences, and how to raise a complaint.",
    // Follows the institute's published Citizen Charter.
    sections: [
      {
        title: "General Information",
        content:
          "Arundathi Institute of Medical Sciences is located in Dundigal, Hyderabad, offering exceptional healthcare services to the community.",
        layout: "full",
      },
      {
        title: "Working Hours",
        bullets: [
          "College: 9:00 AM to 4:00 PM on all working days",
          "Hospital: round the clock, with 24/7 emergency services",
          "Central Library: 8:30 AM to 9:00 PM on working days, and 8:30 AM to 4:00 PM on holidays",
        ],
        layout: "half",
      },
      {
        title: "Staff Uniform",
        content:
          "All staff wear colour-coded uniforms, which helps maintain a professional environment. Each staff member also wears a white apron and an AIMS identification card for easy identification.",
        layout: "half",
      },
      {
        title: "Casualty and Emergency Services",
        bullets: [
          "Casualty and emergency services operate 24/7, ensuring immediate care for urgent cases",
          "A separate emergency section for the OBG department is attached to the labour room",
          "The casualty ward has 25 beds, central oxygen supply, central suction and essential emergency equipment such as defibrillators",
          "The ward connects to a well-equipped emergency operating theatre with anaesthesia and resuscitation facilities",
          "Casualty Medical Officers and Resident Doctors are available 24/7, and consultants are on call around the clock",
          "Radiology, the central laboratory and the pharmacy are located adjacent to the casualty ward for swift service",
        ],
        layout: "full",
      },
      {
        title: "OPD Services",
        content:
          "Spacious OPD facilities provide specialised care in General Medicine, General Surgery, Orthopaedics, OBG, Paediatrics, Ophthalmology, ENT, Dermatology, TB Chest, Psychiatry and Dentistry. Each department has consultation rooms, waiting halls, registration counters, procedure rooms and clinical demonstration rooms, giving ample space for care, teaching and clinical demonstrations.",
        layout: "half",
      },
      {
        title: "OPD Timings",
        content:
          "General OPD operates from Monday to Saturday, 8:00 AM to 5:00 PM, ensuring convenient access to healthcare services.",
        layout: "half",
      },
      {
        title: "Diagnostic Services",
        content:
          "The Central Laboratory provides diagnostic services 24/7, performing routine and specialised tests across Pathology, Biochemistry and Microbiology. A Laboratory Information System (LIS) ensures speedier and accurate report generation. The Radiology Department has two portable X-ray machines, two 500 mA machines and two ultrasound machines with Doppler.",
        layout: "half",
      },
      {
        title: "Cafeteria",
        content:
          "A canteen within the hospital premises serves hygienic food at nominal prices, so patients and visitors have access to affordable meals.",
        layout: "half",
      },
      {
        title: "Support Services and Facilities",
        bullets: [
          "Wheelchairs and stretchers for disabled patients",
          "Lifts and ramps for easy patient movement",
          "24-hour UPS and backup generators supporting emergency services",
          "Free food and mineral water for in-patients",
          "Clean and hygienic washrooms for patients and their attendants",
          "A strict Tobacco-Free Campus policy",
        ],
        layout: "full",
      },
      {
        title: "Investigation Process",
        content:
          "After consultation, the treating doctor prescribes the necessary investigations on the outpatient slip. Patients below the poverty line must complete a requisition form for investigations at the designated counter. Biochemistry, Pathology and Microbiology tests are conducted at the Central Lab on the ground floor of the main building. Admission decisions rest solely with the treating doctor.",
        layout: "half",
      },
      {
        title: "Medical Certificates",
        content:
          "The CMO, RMO or treating doctors issue medical fitness certificates, medical leave certificates, in-patient discharge certificates and wound certificates. Certificates are provided on payment of the prescribed fees at the cash counter.",
        layout: "half",
      },
      {
        title: "Patient Assistance",
        content:
          "Wheelchairs and stretcher trolleys are provided free of cost at the OPD entrance, and adequate seating is arranged for waiting patients.",
        layout: "half",
      },
      {
        title: "Visiting Hours",
        bullets: ["7:00 AM to 8:30 AM", "1:00 PM to 2:00 PM", "4:30 PM to 7:00 PM"],
        layout: "half",
      },
      {
        title: "Safety Measures",
        content:
          "Your safety is our priority. Beware of touts and unauthorised persons: we do not encourage middlemen. Please take care of your valuables and do not engage with requests for favours from staff or officials. Our commitment is to make this institute corruption-free, and we appreciate your cooperation with our administrative staff and security personnel.",
        layout: "full",
      },
      {
        title: "Complaints and Grievances",
        content:
          "If you are not satisfied with our services, please register a complaint. It helps us improve and serve you better. Complaints can be lodged with Reception and Registration, the Casualty Medical Officer, the RMO, the Medical Superintendent or the Dean. Every complaint is acknowledged, and we make sincere attempts to resolve issues promptly. Feedback and constructive suggestions are welcome and can be addressed to the Dean or the Medical Superintendent.",
        layout: "full",
      },
      {
        title: "Eligibility for MBBS Admissions",
        bullets: [
          "Nationality: Indian citizens, or children or dependents of Non-Resident Indians",
          "Seats are filled by the Competent Authority, Kaloji Narayana Rao University of Health Sciences, Warangal, Telangana, based on NEET marks or ranks; the university issues admission notifications every year",
          "Qualification: higher secondary or Indian School Certificate examination (10+2 equivalent) with Physics, Chemistry, Biology and English; candidates with other qualifications may need a year of pre-professional training",
          "Candidates with science degrees including Physics, Chemistry and Biology from recognised universities may also qualify",
          "Only candidates who pass NEET (UG), conducted by the NTA, with the percentile required for their category are considered",
          "Age: 17 years completed on or before 31 December of the admission year, as per NMC regulations",
          "Foreign students and NRI candidates are eligible under the Management Quota, Category C seats",
          "Minimum marks in science subjects: General (OC) 50%, BC/SC/ST 40%, OC-PH 45%",
          "Reservations do not apply to B and C category seats; admissions strictly follow NMC norms for transparency and fairness",
        ],
        layout: "full",
      },
    ],
    quickLinks: linksExcept("/patient-care/citizen-charter"),
    cta: {
      text: "Have a complaint, a suggestion, or something that went well and deserves saying? We would like to hear it.",
      label: "Complaints & Feedback",
      path: "/patient-care/feedback",
    },
  },

  "/patient-care/opd-timings": {
    eyebrow: "Patient Care",
    title: "OPD Timings & Visiting",
    subtitle:
      "Outpatient consultations run Monday to Saturday, 9:00 AM to 4:00 PM. Emergency and casualty services are open 24 hours, seven days a week.",
    sections: [
      {
        title: "Outpatient Department",
        badges: ["Mon–Sat", "9:00 AM – 4:00 PM"],
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
          "Visiting hours for inpatients are 7:00 AM to 8:30 AM, 1:00 PM to 2:00 PM and 4:30 PM to 7:00 PM. One attendant is permitted to stay with an admitted patient. Visitors are not permitted inside intensive care units except during the notified visiting window, and children are discouraged from visiting the wards.",
        layout: "half",
      },
      {
        title: "Reaching the Hospital",
        bullets: [
          "Beside MLRIT, Dundigal, Gandi Maisamma, Medchal–Malkajgiri District, Telangana 500043",
          "Reception: +91 80556 67888",
          "Alternate line: +91 80741 58018",
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
      "How cashless and reimbursement claims are handled at Arundathi Hospital, and what the insurance desk needs from you.",
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
    title: "Complaints & Feedback",
    subtitle:
      "Tell us what went wrong, or what went right. Every complaint is acknowledged and acted on, and feedback tells us where the hospital needs to improve.",
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
          "Dean — for academic matters and for complaints not resolved at other levels",
        ],
        layout: "full",
      },
      {
        title: "What Happens Next",
        bullets: [
          "Your complaint is recorded and acknowledged",
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
