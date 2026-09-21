import logoWhite from "../assets/logo-white.png";

export default function Footer() {
  return (
    <>
      <style>{`
                @import url("https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,100..1000&family=Manrope:wght@200..800&display=swap");
            
                * {
                    font-family: "DM Sans", sans-serif;
                }

                h3 {
                    font-family: "Manrope", sans-serif;
                    font-weight: 600;
                }
            `}</style>
      <footer className="bg-[#0d2346] dark:bg-[#040810] py-12 px-4 sm:px-6 lg:px-8 tracking-[0.015em] border-t dark:border-white/10 transition-colors duration-300">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between gap-y-10 lg:gap-x-8">

            <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
              <a
                href="/"
                className="flex items-center justify-center md:justify-start"
              >
                <img
                  src={logoWhite}
                  alt="Arundathi Institute of Medical Sciences & Hospital"
                  className="h-13 md:h-16 w-auto object-contain transition-colors duration-300 drop-shadow-sm"
                />
              </a>

              <h3 className="text-sm text-white font-medium mt-5">
                Contact Us
              </h3>
              <div className="flex flex-col gap-3 mt-4 max-w-sm items-center md:items-start text-center md:text-left">
                <a
                  href="https://maps.google.com/?q=Beside+MLRIT,+Dundigal,+Gandi+Maisamma,+Medchal-Malkajgiri+District,+Telangana+500043"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 mt-0.5 text-white/70 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0C5.86 0 2.5 3.36 2.5 7.5c0 6.25 7.5 12.5 7.5 12.5s7.5-6.25 7.5-12.5C17.5 3.36 14.14 0 10 0zm0 10.5a3 3 0 110-6 3 3 0 010 6z" />
                  </svg>
                  <span>
                    Beside MLRIT, Dundigal, Gandi Maisamma,
                    Medchal-Malkajgiri Dist. Telangana 500043
                  </span>
                </a>
                <a
                  href="tel:+918055667888"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-white/70 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3.5A1.5 1.5 0 013.5 2h2.1a1 1 0 01.98.8l.9 4.5a1 1 0 01-.6 1.14l-2.08.83a13.1 13.1 0 005.9 5.9l.83-2.08a1 1 0 011.14-.6l4.5.9a1 1 0 01.8.98v2.1a1.5 1.5 0 01-1.5 1.5h-1C9.2 19 2 11.65 2 5v-1.5z" />
                  </svg>
                  <span>+91 80556 67888</span>
                </a>
                <a
                  href="tel:+918179432491"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-white/70 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3.5A1.5 1.5 0 013.5 2h2.1a1 1 0 01.98.8l.9 4.5a1 1 0 01-.6 1.14l-2.08.83a13.1 13.1 0 005.9 5.9l.83-2.08a1 1 0 011.14-.6l4.5.9a1 1 0 01.8.98v2.1a1.5 1.5 0 01-1.5 1.5h-1C9.2 19 2 11.65 2 5v-1.5z" />
                  </svg>
                  <span>Ambulance: +91 81794 32491</span>
                </a>
                <a
                  href="mailto:arundathihospital@gmail.com"
                  className="flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4 text-white/70 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4v6a2 2 0 002 2h12a2 2 0 002-2v-6z" />
                  </svg>
                  <span>arundathihospital@gmail.com</span>
                </a>
              </div>

              <div className="flex items-center gap-4 mt-6">
                <a
                  href="https://www.facebook.com/people/Aims-MedCollege/100092051179931/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/arundathihospital/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@arundathihospital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/arundathi-institute-of-medical-sciences/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="w-full md:w-[45%] lg:w-[18%] flex flex-col items-center pt-0 md:pt-21 lg:-ml-6">
              <h3 className="text-sm text-white font-medium lg:-ml-4">Quick Links</h3>
              <div className="grid grid-cols-2 gap-x-14 gap-y-3 mt-4">
                {[
                  { label: "Home", href: "/" },
                  { label: "Admissions", href: "/admissions" },
                  { label: "About Institution", href: "/about-institution" },
                  { label: "MBBS Programme", href: "/academics/mbbs" },
                  { label: "About Hospital", href: "/about-hospital" },
                  { label: "Specialities", href: "/services/specialities" },
                  { label: "Faculty & Depts", href: "/departments" },
                  { label: "Emergency & Trauma", href: "/services/emergency-trauma" },
                  { label: "Facilities", href: "/facilities/hospital" },
                  { label: "Citizen Charter", href: "/patient-care/citizen-charter" },
                  { label: "Media Gallery", href: "/media-gallery" },
                  { label: "AIMS in the News", href: "/aims-in-the-news" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200 whitespace-nowrap"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="w-full md:w-[48%] lg:w-[28%] flex flex-col items-center md:items-start">
              <h3 className="text-sm text-white font-medium mb-4">
                Find Us on Map
              </h3>
              <div className="w-full min-h-64 rounded-[26px] overflow-hidden border border-white/10">
                <iframe
                  src="https://maps.google.com/maps?q=Arundathi%20Institute%20of%20medical%20acience&t=k&z=16&output=embed&iwloc=near"
                  title="Arundathi Institute of Medical Sciences"
                  aria-label="Map showing Arundathi Institute of Medical Sciences"
                  loading="lazy"
                  className="w-full h-64 rounded-[26px] border-0"
                  allowFullScreen
                />
              </div>
            </div>

          </div>

          <div className="w-full h-px mt-12 mb-4 bg-linear-to-r from-black via-white/25 to-black"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/60">
              &copy; 2026 Arundathi Institute of Medical Sciences & Hospital
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                Terms & Conditions
              </a>
              <div className="w-px h-4 bg-white/20"></div>
              <a
                href="#"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
