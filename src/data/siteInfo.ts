/**
 * Facts that appear in several places on the site — the footer, the home contact section, the Seat
 * Matrix page and the site assistant all read them from here, so a change made once shows up
 * everywhere (including the assistant's answers).
 */

export const CONTACT = {
  /** Hospital reception / emergency line. */
  receptionPhone: "+91 80556 67888",
  /** Admissions enquiry line and the person who answers it. */
  admissionsPhone: "+91 90009 94842",
  admissionsContact: "Dr. Ch. Achireddy",
  email: "arundathihospital@gmail.com",
  address: "Beside MLRIT, Dundigal, Gandi Maisamma, Medchal-Malkajgiri District, Telangana 500043",
} as const;

/** "tel:" link for a phone number written with spaces. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
/** Digits only, without the +91 country code ("9000994842"). */
export const localDigits = (phone: string) => phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
/** Google Maps search link for the campus address. */
export const MAPS_URL = `https://maps.google.com/?q=${encodeURIComponent(CONTACT.address).replace(/%20/g, "+")}`;

/** MBBS seat matrix: category, share of the sanctioned intake, and seats. */
export const SEAT_MATRIX = {
  total: 150,
  categories: [
    { name: "A-Category", share: 50, seats: 75 },
    { name: "B-Category", share: 35, seats: 52 },
    { name: "C-Category", share: 15, seats: 23, note: "NRI" },
  ],
} as const;
