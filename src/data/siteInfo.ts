/**
 * Facts that appear in several places on the site — the footer, the home contact section, the Seat
 * Matrix page and the site assistant all read them from here, so a change made once shows up
 * everywhere (including the assistant's answers).
 */

export const CONTACT = {
  /** Hospital reception / emergency line. */
  receptionPhone: "+91 80556 67888",
  /** Second hospital line, shown under the reception line. */
  hospitalPhone2: "+91 90635 40432",
  /** Admissions enquiry line and the person who answers it. */
  admissionsPhone: "+91 90009 94842",
  admissionsContact: "Dr. Ch. Achireddy",
  email: "arundathihospital@gmail.com",
  /** Admissions enquiries (Apply for Admissions page and its enquiry form). */
  admissionsEmail: "admissions@aims.ac.in",
  address: "Beside MLRIT, Dundigal, Gandi Maisamma, Medchal-Malkajgiri District, Telangana 500043",
} as const;

/** "tel:" link for a phone number written with spaces. */
export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
/** Digits only, without the +91 country code ("9000994842"). */
export const localDigits = (phone: string) => phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
/** What Google Maps searches for: the college's listed name, so it lands on the campus pin. */
const MAPS_QUERY = encodeURIComponent("Arundathi Institute of Medical Sciences, Dundigal, Hyderabad");
/** Google Maps link that opens the campus. */
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
/** Embeddable map of the campus (satellite view). */
export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${MAPS_QUERY}&t=k&z=16&output=embed`;

/** MBBS seat matrix: category, share of the sanctioned intake, and seats. */
export const SEAT_MATRIX = {
  total: 150,
  categories: [
    { name: "A-Category", share: 50, seats: 75 },
    { name: "B-Category", share: 35, seats: 52 },
    { name: "C-Category", share: 15, seats: 23, note: "NRI" },
  ],
} as const;
