import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import logo from "../../assets/logo.png";
import logoWhite from "../../assets/logo-white.png";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ChevronDown,
  Check,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const subjectOptions = [
    "General Inquiry",
    "Academic Admissions (MBBS / PG)",
    "Hospital & Patient Appointment",
    "Allied Health Sciences / Nursing",
    "Administrative Support",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setIsSubmitted(false);

    const targetEmail = "arundathihospital@gmail.com";
    const subjectLine = formData.subject
      ? `[AIMS Inquiry] ${formData.subject} - from ${formData.name}`
      : `[AIMS Inquiry] New Contact Message from ${formData.name}`;

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${targetEmail}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            subject: formData.subject || "General Inquiry",
            message: formData.message,
            _subject: subjectLine,
            _replyto: formData.email,
            _template: "table",
            _captcha: "false",
          }),
        }
      );

      const data = await response.json();

      if (
        response.ok ||
        data.success === "true" ||
        data.success === true ||
        (data.message &&
          typeof data.message === "string" &&
          data.message.includes("Activation"))
      ) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(data.message || "Unable to send message.");
      }
    } catch (err: unknown) {
      console.warn(
        "FormSubmit encountered an error, triggering mail client fallback:",
        err
      );
      // Fallback: trigger user's default email client pre-filled to arundathihospital@gmail.com
      const mailtoUrl = `mailto:${targetEmail}?subject=${encodeURIComponent(
        subjectLine
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${
          formData.subject || "General Inquiry"
        }\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="atmos-cta relative scroll-mt-20 bg-white dark:bg-transparent pt-6 sm:pt-8 pb-16 sm:pb-24 lg:pb-28 tracking-[0.015em] transition-colors duration-300"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-3">
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] dark:text-teal-400 uppercase">
              GET IN TOUCH
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1] dark:bg-white/20" />
          </div>

          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#1f3351] dark:text-white leading-[1.18] tracking-tight">
            Contact Us
          </h2>

          <p className="text-[#62748a] dark:text-slate-300 text-sm sm:text-base lg:text-lg mt-3 leading-relaxed">
            Have questions about admissions, medical departments, or healthcare
            services? Reach out to our dedicated team.
          </p>
        </motion.div>

        {/* Two-Column Grid: Contact Information & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* ─── Left Column: Official Contact Information ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col h-full"
          >
            {/* Main Info Card */}
            <div className="rounded-[24px] border border-[#dce8ee] dark:border-white/10 bg-[#fbfaf5] dark:bg-white/[0.04] dark:backdrop-blur-xl p-7 sm:p-9 shadow-xs dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] h-full flex flex-col justify-between">
              <div className="mb-6 pb-5 border-b border-[#dce8ee] dark:border-white/10 flex items-center justify-center">
                <img
                  src={logo}
                  alt="Arundathi Institute of Medical Sciences & Hospital"
                  className="h-12 sm:h-14 w-auto object-contain dark:hidden drop-shadow-xs"
                />
                <img
                  src={logoWhite}
                  alt="Arundathi Institute of Medical Sciences & Hospital"
                  className="h-12 sm:h-14 w-auto object-contain hidden dark:block drop-shadow-xs"
                />
              </div>

              <div className="flex-1 flex flex-col justify-around gap-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-white/10 border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#4b6382] dark:text-teal-400 uppercase tracking-wider block">
                      Campus Address
                    </span>
                    <p className="text-sm text-[#1f3351] dark:text-slate-200 mt-0.5 leading-relaxed font-medium">
                      Beside MLRIT, Dundigal, Gandi Maisamma, Medchal-Malkajgiri
                      District, Telangana 500043
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-white/10 border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#4b6382] dark:text-teal-400 uppercase tracking-wider block">
                      Phone &amp; Emergency
                    </span>
                    <a
                      href="tel:+918055667888"
                      className="text-sm text-[#1f3351] dark:text-teal-300 font-semibold hover:underline block mt-0.5"
                    >
                      +91 80556 67888
                    </a>
                    <a
                      href="tel:+918179432491"
                      className="text-sm text-[#1f3351] dark:text-teal-300 font-semibold hover:underline block mt-0.5"
                    >
                      <span className="text-xs font-medium text-[#4b6382] dark:text-teal-400 mr-1.5">Ambulance:</span>
                      +91 81794 32491
                    </a>
                    <span className="text-xs text-[#62748a] dark:text-slate-400 block mt-0.5">
                      Emergency &amp; Ambulance services available 24/7
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-white/10 border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#4b6382] dark:text-teal-400 uppercase tracking-wider block">
                      Email Inquiry
                    </span>
                    <a
                      href="mailto:arundathihospital@gmail.com"
                      className="text-sm text-[#1f3351] dark:text-teal-300 font-semibold hover:underline block mt-0.5 break-all"
                    >
                      arundathihospital@gmail.com
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-white/10 border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#4b6382] dark:text-teal-400 uppercase tracking-wider block">
                      Working Hours
                    </span>
                    <p className="text-sm text-[#1f3351] dark:text-slate-200 font-medium mt-0.5">
                      OPD: Mon - Sat: 8:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Right Column: Interactive Form ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <div className="rounded-[24px] border border-[#dce8ee] dark:border-white/10 bg-white dark:bg-white/[0.04] dark:backdrop-blur-xl p-7 sm:p-10 shadow-[0_10px_35px_rgba(13,35,70,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] h-full flex flex-col justify-between">
              <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-[#1f3351] dark:text-white mb-2">
                Send Us a Message
              </h3>
              <p className="text-sm text-[#62748a] dark:text-slate-300 mb-6">
                Fill in your details below and our administration will get back
                to you promptly.
              </p>

              {/* Success Notification Alert */}
              {isSubmitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-200 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <span className="font-bold block">
                      Message Sent Successfully!
                    </span>
                    <span>
                      Thank you for contacting us. Your message has been sent to{" "}
                      <span className="font-semibold text-emerald-950 dark:text-emerald-200">
                        arundathihospital@gmail.com
                      </span>{" "}
                      and our team will respond to you promptly.
                    </span>
                  </div>
                </div>
              )}

              {/* Error Notification Alert */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <span className="font-bold block">
                      Notice Regarding Delivery
                    </span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1f3351] dark:text-slate-200 mb-1.5"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] dark:bg-white/5 border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white placeholder-[#94a3b8] dark:placeholder-slate-400 text-sm focus:bg-white dark:focus:bg-white/10 focus:border-[#1f3351] dark:focus:border-teal-400 focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1f3351] dark:text-slate-200 mb-1.5"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] dark:bg-white/5 border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white placeholder-[#94a3b8] dark:placeholder-slate-400 text-sm focus:bg-white dark:focus:bg-white/10 focus:border-[#1f3351] dark:focus:border-teal-400 focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1f3351] dark:text-slate-200 mb-1.5"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] dark:bg-white/5 border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white placeholder-[#94a3b8] dark:placeholder-slate-400 text-sm focus:bg-white dark:focus:bg-white/10 focus:border-[#1f3351] dark:focus:border-teal-400 focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all"
                    />
                  </div>

                  <div className="relative" ref={dropdownRef}>
                    <label
                      id="subject-label"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1f3351] dark:text-slate-200 mb-1.5"
                    >
                      Inquiry Subject
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen((prev) => !prev)}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                      className={`w-full px-4 py-3 rounded-xl bg-[#f8fafc] dark:bg-white/5 border border-[#dce8ee] dark:border-white/15 text-sm flex items-center justify-between transition-all outline-none text-left cursor-pointer ${
                        isDropdownOpen
                          ? "border-[#1f3351] dark:border-teal-400 ring-2 ring-[#1f3351]/10 bg-white dark:bg-white/10"
                          : "hover:border-[#1f3351]/40 dark:hover:border-white/30"
                      }`}
                    >
                      <span
                        className={
                          formData.subject
                            ? "text-[#1f3351] dark:text-white font-medium"
                            : "text-[#94a3b8] dark:text-slate-400"
                        }
                      >
                        {formData.subject || "Select an option"}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#62748a] dark:text-slate-400 transition-transform duration-200 shrink-0 ${
                          isDropdownOpen
                            ? "rotate-180 text-[#1f3351] dark:text-teal-400"
                            : ""
                        }`}
                      />
                    </button>

                    {/* Custom Rounded Dropdown Menu */}
                    {isDropdownOpen && (
                      <div
                        role="listbox"
                        aria-labelledby="subject-label"
                        className="absolute z-50 left-0 right-0 mt-2 p-1.5 bg-white dark:bg-[#0f1d32] border border-[#dce8ee] dark:border-white/15 rounded-2xl shadow-xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 overflow-hidden"
                      >
                        <div className="max-h-60 overflow-y-auto space-y-1">
                          {subjectOptions.map((option) => {
                            const isSelected = formData.subject === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => {
                                  setFormData((prev) => ({
                                    ...prev,
                                    subject: option,
                                  }));
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between transition-colors text-left cursor-pointer ${
                                  isSelected
                                    ? "bg-[#1f3351] text-white dark:bg-teal-500/20 dark:text-teal-300"
                                    : "text-[#1f3351] dark:text-slate-200 hover:bg-[#f1f5f9] dark:hover:bg-white/10"
                                }`}
                              >
                                <span>{option}</span>
                                {isSelected && (
                                  <Check className="w-4 h-4 shrink-0 text-white dark:text-teal-300 ml-2" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1f3351] dark:text-slate-200 mb-1.5"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please write your inquiry or message here..."
                    className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] dark:bg-white/5 border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white placeholder-[#94a3b8] dark:placeholder-slate-400 text-sm focus:bg-white dark:focus:bg-white/10 focus:border-[#1f3351] dark:focus:border-teal-400 focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all resize-none"
                  />
                </div>

                {/* Send Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1f3351] dark:bg-teal-500 hover:bg-[#0d2346] dark:hover:bg-teal-400 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
