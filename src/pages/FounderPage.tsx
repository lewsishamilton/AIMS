import { motion } from "motion/react";
import { Globe } from "lucide-react";
import founderImg from "../assets/marri-rajashekhar-reddy-profile-main-1.png";

export default function FounderPage() {
  const socialLinks = [
    {
      name: "X (Twitter)",
      url: "https://twitter.com/MarriRajasekar",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 fill-current transition-transform duration-200 group-hover:scale-110"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/arundathihospital/",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 fill-current transition-transform duration-200 group-hover:scale-110"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.668.014-4.948.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/trsrajasekhar/",
      icon: (
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 fill-current transition-transform duration-200 group-hover:scale-110"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Portfolio Website",
      url: "https://marrirajasekhar.in/",
      icon: (
        <Globe className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-200 group-hover:scale-110" />
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1f3351] tracking-[0.015em] pt-28 lg:pt-36 pb-24">
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-10 lg:px-16">
        {/* ─── Top Two-Column Section (Bigger Photo on Left, Content on Right) ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] xl:grid-cols-[460px_1fr] gap-10 lg:gap-14 xl:gap-16 items-start mb-16 sm:mb-20">
          {/* Left: Founder Photo (Enlarged) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative lg:sticky lg:top-28"
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Image with rounded frame */}
              <div className="relative overflow-hidden rounded-[26px] border border-[#dce8ee] bg-[#f7fafc] shadow-[0_16px_40px_rgba(8,44,76,0.10)] group">
                <img
                  src={founderImg}
                  alt="Marri Rajasekhar Reddy — Founder, AIMS"
                  className="w-full h-[420px] sm:h-[500px] lg:h-[580px] xl:h-[640px] object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Clean Bottom Gradient Label */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1f3351]/95 via-[#1f3351]/75 to-transparent pt-16 pb-6 px-6 sm:px-7">
                  <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-white tracking-wide">
                    Marri Rajasekhar Reddy
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm mt-0.5 tracking-wide">
                    Founder · Arundathi Institute of Medical Sciences & Hospital
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Text & Details */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            {/* Flanked Kicker from Home Page */}
            <div className="inline-flex items-center gap-3 mb-3.5">
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] uppercase">
                LEADERSHIP
              </span>
              <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
            </div>

            {/* Name Heading */}
            <h1 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#1f3351] leading-[1.18] tracking-tight mb-2">
              Marri Rajasekhar Reddy
            </h1>

            <p className="text-sm sm:text-base font-semibold text-[#4b6382] mb-6 tracking-wide">
              Founder · Arundathi Institute of Medical Sciences & Hospital
            </p>

            {/* Social Media Links - Round Icon-Only Buttons */}
            <div className="flex items-center gap-3.5 sm:gap-4 mb-8">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.name}
                  title={item.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[#f8fafc] border-2 border-[#dce8ee] text-[#1f3351] hover:bg-[#1f3351] hover:text-white hover:border-[#1f3351] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 active:scale-95 group"
                >
                  {item.icon}
                </a>
              ))}
            </div>
            {/* Main Quote Block styled exactly like on the Homepage */}
              <div className="relative p-6 sm:p-7 rounded-[22px] bg-[#F3F4F6] border-l-[4px] border-[#1f3351] shadow-xs my-6 sm:my-7">
                <blockquote className="font-['Manrope',sans-serif] text-base sm:text-lg lg:text-[19px] font-medium leading-[1.65] tracking-[0.005em] text-[#1f3351]">
                  “It’s the promise that I made to my mother, that drives me to resolutely work for turning the hospital into an effective tool for ultimately transforming the lives of people who otherwise are reeling under the burden of unaffordable healthcare.”
                </blockquote>
              </div>

            {/* Narrative Content: Normal Text + Homepage-Styled Quote Block */}
            <div className="space-y-5">
              {/* Normal Paragraph 1 */}
              <p className="text-base sm:text-[17px] text-[#4b6382] font-normal leading-[1.8]">
                I truly realize the importance of affordable healthcare considering the burden a costly healthcare can impose on families. With my earnest zeal to assist families in getting rid of this burden, I dreamt of establishing an institution which will not only cater to the need of thousands families by offering them affordable healthcare but will also create a long lasting legacy. I promised to my mother of coming up with a hospital that will stand apart in assisting families to get healthcare of excellent standard without imposing heavy financial burden on them.
              </p>

              

              {/* Normal Paragraph 2 */}
              <p className="text-base sm:text-[17px] text-[#4b6382] font-normal leading-[1.8]">
                Arundhati Institution of Medical Science (AIMS) is the first outcome of my bigger dream.
              </p>

              {/* Normal Paragraph 3 */}
              <p className="text-base sm:text-[17px] text-[#4b6382] font-normal leading-[1.8]">
                Here we have assembled a team of highly skilled and compassionate healthcare who too share the noble dream of providing quality healthcare in affordable cost. They, with all their passion and dedication, are striving relentlessly to ensure a truly nurturing environment with sincere touch of personalized healthcare to help the patients in all possible manner.
              </p>
            </div>
          </motion.div>
        </div>

        
        
      </div>
    </div>
  );
}
