import type { StaticPageDef } from "../../components/StaticPage";

// Drafted from what the site actually does (contact form via FormSubmit, theme saved in the browser,
// YouTube / Google Maps / CARTO / Google Fonts embeds, no analytics). Review before publishing.
export const LEGAL_PAGES: Record<string, StaticPageDef> = {
  "/terms-and-conditions": {
    eyebrow: "Legal",
    title: "Terms & Conditions",
    subtitle:
      "The terms on which Arundathi Institute of Medical Sciences & Hospital makes this website available. By using the site you accept them.",
    sections: [
      {
        title: "About This Website",
        content:
          "This website is published by Arundathi Institute of Medical Sciences & Hospital, Beside MLRIT, Dundigal, Gandi Maisamma, Medchal-Malkajgiri District, Telangana 500043. It provides information about the institute's academic programmes, admissions, hospital services and campus.",
        layout: "full",
      },
      {
        title: "Not Medical Advice",
        content:
          "Information on this website is general and is not a substitute for consultation with a qualified doctor. Do not use it to diagnose or treat any condition. In an emergency, come to the casualty department, which is open 24×7.",
        layout: "half",
      },
      {
        title: "Accuracy of Information",
        content:
          "We work to keep timings, fees, seat matrices, faculty lists and other details current, but they can change. Statutory notifications from the National Medical Commission, KNRUHS and the State Government always prevail over anything stated here. Please confirm important details with the relevant office before acting on them.",
        layout: "half",
      },
      {
        title: "Documents and Forms",
        content:
          "Copies of approvals, certificates, forms and the brochure are provided for reference. Originals can be inspected at the administrative office on request. Forms must be completed and submitted exactly as their instructions require.",
        layout: "half",
      },
      {
        title: "Use of Content",
        content:
          "Text, photographs, logos and documents on this site belong to the institute or are used with permission. You may view, download and print them for personal, non-commercial use. Any other use requires our written permission.",
        layout: "half",
      },
      {
        title: "Links and Embedded Services",
        content:
          "The site links to and embeds third-party services such as YouTube videos, Google Maps and Street View tours, and university and regulator websites. We are not responsible for their content, availability or privacy practices.",
        layout: "full",
      },
      {
        title: "Acceptable Use",
        bullets: [
          "Do not submit false, misleading or offensive information through the contact form",
          "Do not attempt to disrupt, overload or gain unauthorised access to the website",
          "Do not copy content from the site in bulk or republish it as your own",
        ],
        layout: "full",
      },
      {
        title: "Changes to These Terms",
        content:
          "We may update these terms from time to time. The version published on this page applies from the date it is posted. These terms are governed by the laws of India.",
        layout: "full",
      },
    ],
    quickLinks: [
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Contact", path: "/contact" },
      { name: "Citizen Charter", path: "/patient-care/citizen-charter" },
    ],
  },

  "/privacy-policy": {
    eyebrow: "Legal",
    title: "Privacy Policy",
    subtitle:
      "What personal information this website collects, why, and how it is handled.",
    sections: [
      {
        title: "Information You Send Us",
        content:
          "The only personal information this website collects is what you type into the contact form: your name, email address, phone number, the subject you choose and your message. It is delivered by email to the institute (arundathihospital@gmail.com) through FormSubmit, a third-party form-delivery service, and is used only to reply to your enquiry.",
        layout: "full",
      },
      {
        title: "What We Do Not Collect",
        content:
          "This website does not use analytics or advertising trackers, does not ask you to create an account, and does not take payments online.",
        layout: "half",
      },
      {
        title: "Stored in Your Browser",
        content:
          "If you switch between light and dark mode, that choice is saved in your own browser so the site remembers it. It is never sent to us, and clearing your browser data removes it.",
        layout: "half",
      },
      {
        title: "Third-Party Services",
        bullets: [
          "YouTube (privacy-enhanced mode) for patient testimonial videos",
          "Google Maps and Street View for the location map and virtual tours",
          "CARTO map tiles for the bus routes map",
          "Google Fonts for the website's typefaces",
        ],
        layout: "full",
      },
      {
        title: "How These Services Use Data",
        content:
          "When a page loads one of these services, your browser connects to that provider, which receives technical details such as your IP address and may set its own cookies under its own privacy policy. The YouTube player only loads when you open a video.",
        layout: "full",
      },
      {
        title: "Patient Records",
        content:
          "This policy covers the website only. Medical records created during treatment at the hospital are kept confidential and handled under the hospital's medical records procedures. They are never published on this website.",
        layout: "half",
      },
      {
        title: "Your Choices and Contact",
        content:
          "To ask what information we hold from a contact-form enquiry, or to have it deleted, email arundathihospital@gmail.com or write to the institute at Beside MLRIT, Dundigal, Gandi Maisamma, Medchal-Malkajgiri District, Telangana 500043.",
        layout: "half",
      },
      {
        title: "Changes to This Policy",
        content:
          "We will update this page if the website's handling of information changes. The version published here is the one that applies.",
        layout: "full",
      },
    ],
    quickLinks: [
      { name: "Terms & Conditions", path: "/terms-and-conditions" },
      { name: "Contact", path: "/contact" },
      { name: "Complaints & Feedback", path: "/patient-care/feedback" },
    ],
  },
};
