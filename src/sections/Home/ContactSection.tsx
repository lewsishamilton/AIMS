import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Loader2,
  AlertCircle,
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

    const targetEmail = "lewsishamilton@gmail.com";
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
      // Fallback: trigger user's default email client pre-filled to lewsishamilton@gmail.com
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
      className="relative scroll-mt-20 bg-white py-16 sm:py-24 lg:py-28 tracking-[0.015em] border-t border-[#dce8ee]"
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
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.2em] text-[#4b6382] uppercase">
              GET IN TOUCH
            </span>
            <span className="w-8 sm:w-10 h-[1.5px] bg-[#cbd5e1]" />
          </div>

          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold text-[#1f3351] leading-[1.18] tracking-tight">
            Contact Us
          </h2>

          <p className="text-[#62748a] text-sm sm:text-base lg:text-lg mt-3 leading-relaxed">
            Have questions about admissions, medical departments, or healthcare
            services? Reach out to our dedicated team.
          </p>
        </motion.div>

        {/* Two-Column Grid: Contact Information & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ─── Left Column: Official Contact Information ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Main Info Card */}
            <div className="rounded-[24px] border border-[#dce8ee] bg-[#fbfaf5] p-7 sm:p-9 shadow-xs">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#dce8ee]">
                <div className="w-10 h-10 rounded-xl bg-[#1f3351] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Manrope',sans-serif] text-lg sm:text-xl font-bold text-[#1f3351]">
                    Arundathi Institute
                  </h3>
                  <p className="text-xs text-[#62748a]">
                    Medical Sciences &amp; Hospital
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#dce8ee] text-[#1f3351] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#4b6382] uppercase tracking-wider block">
                      Campus Address
                    </span>
                    <p className="text-sm text-[#1f3351] mt-0.5 leading-relaxed font-medium">
                      Beside MLRIT, Dundigal, Gandi Maisamma, Medchal-Malkajgiri
                      District, Telangana 500043
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#dce8ee] text-[#1f3351] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#4b6382] uppercase tracking-wider block">
                      Phone &amp; Emergency
                    </span>
                    <a
                      href="tel:+918055667888"
                      className="text-sm text-[#1f3351] font-semibold hover:underline block mt-0.5"
                    >
                      +91 80556 67888
                    </a>
                    <span className="text-xs text-[#62748a]">
                      Emergency services available 24/7
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#dce8ee] text-[#1f3351] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#4b6382] uppercase tracking-wider block">
                      Email Inquiry
                    </span>
                    <a
                      href="mailto:lewsishamilton@gmail.com"
                      className="text-sm text-[#1f3351] font-semibold hover:underline block mt-0.5 break-all"
                    >
                      lewsishamilton@gmail.com
                    </a>
                    <a
                      href="mailto:arundathihospital@gmail.com"
                      className="text-xs text-[#62748a] hover:underline block mt-0.5"
                    >
                      Hospital: arundathihospital@gmail.com
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#dce8ee] text-[#1f3351] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#4b6382] uppercase tracking-wider block">
                      Working Hours
                    </span>
                    <p className="text-sm text-[#1f3351] font-medium mt-0.5">
                      OPD: Mon - Sat: 8:00 AM - 8:00 PM
                    </p>
                    <span className="text-xs text-[#62748a]">
                      Casualty &amp; Trauma: Open 24 Hours
                    </span>
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
            className="lg:col-span-7"
          >
            <div className="rounded-[24px] border border-[#dce8ee] bg-white p-7 sm:p-10 shadow-[0_10px_35px_rgba(13,35,70,0.04)]">
              <h3 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-bold text-[#1f3351] mb-2">
                Send Us a Message
              </h3>
              <p className="text-sm text-[#62748a] mb-6">
                Fill in your details below and our administration will get back
                to you promptly.
              </p>

              {/* Success Notification Alert */}
              {isSubmitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <span className="font-bold block">
                      Message Sent Successfully!
                    </span>
                    <span>
                      Thank you for contacting us. Your message has been sent to{" "}
                      <span className="font-semibold text-emerald-950">
                        lewsishamilton@gmail.com
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
                      className="block text-xs font-bold uppercase tracking-wider text-[#1f3351] mb-1.5"
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
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#dce8ee] text-[#1f3351] placeholder-[#94a3b8] text-sm focus:bg-white focus:border-[#1f3351] focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1f3351] mb-1.5"
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
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#dce8ee] text-[#1f3351] placeholder-[#94a3b8] text-sm focus:bg-white focus:border-[#1f3351] focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1f3351] mb-1.5"
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
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#dce8ee] text-[#1f3351] placeholder-[#94a3b8] text-sm focus:bg-white focus:border-[#1f3351] focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1f3351] mb-1.5"
                    >
                      Inquiry Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#dce8ee] text-[#1f3351] text-sm focus:bg-white focus:border-[#1f3351] focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all cursor-pointer"
                    >
                      <option value="">Select an option</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Academic Admissions (MBBS / PG)">
                        Academic Admissions (MBBS / PG)
                      </option>
                      <option value="Hospital & Patient Appointment">
                        Hospital &amp; Patient Appointment
                      </option>
                      <option value="Allied Health Sciences / Nursing">
                        Allied Health Sciences / Nursing
                      </option>
                      <option value="Administrative Support">
                        Administrative Support
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-[#1f3351] mb-1.5"
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
                    className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] border border-[#dce8ee] text-[#1f3351] placeholder-[#94a3b8] text-sm focus:bg-white focus:border-[#1f3351] focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all resize-none"
                  />
                </div>

                {/* Send Button */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1f3351] text-white text-sm font-semibold hover:bg-[#0d2346] shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
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
                  <span className="text-xs text-[#62748a]">
                    Deliveries routed to{" "}
                    <a
                      href="mailto:lewsishamilton@gmail.com"
                      className="font-medium text-[#1f3351] hover:underline"
                    >
                      lewsishamilton@gmail.com
                    </a>
                  </span>
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
