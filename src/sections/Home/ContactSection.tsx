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
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Show success banner
    setIsSubmitted(true);

    // Clear all respective fields
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    // Auto dismiss success note after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 bg-white dark:bg-transparent py-16 sm:py-24 lg:py-28 tracking-[0.015em] border-t border-[#dce8ee] dark:border-white/10 transition-colors duration-300"
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
            <div className="rounded-[24px] border border-[#dce8ee] dark:border-white/10 bg-[#fbfaf5] dark:bg-white/[0.04] dark:backdrop-blur-xl p-7 sm:p-9 shadow-xs dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#dce8ee] dark:border-white/10">
                <div className="w-10 h-10 rounded-xl bg-[#1f3351] dark:bg-teal-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-['Manrope',sans-serif] text-lg sm:text-xl font-bold text-[#1f3351] dark:text-white">
                    Arundathi Institute
                  </h3>
                  <p className="text-xs text-[#62748a] dark:text-slate-300">
                    Medical Sciences &amp; Hospital
                  </p>
                </div>
              </div>

              <div className="space-y-6">
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
                    <span className="text-xs text-[#62748a] dark:text-slate-400">
                      Emergency services available 24/7
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
                    <span className="text-xs text-[#62748a] dark:text-slate-400">
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
            <div className="rounded-[24px] border border-[#dce8ee] dark:border-white/10 bg-white dark:bg-white/[0.04] dark:backdrop-blur-xl p-7 sm:p-10 shadow-[0_10px_35px_rgba(13,35,70,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
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
                      Thank you for contacting us. Your message has been received
                      and our team will respond to you shortly.
                    </span>
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

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-bold uppercase tracking-wider text-[#1f3351] dark:text-slate-200 mb-1.5"
                    >
                      Inquiry Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#f8fafc] dark:bg-[#0d1726] border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white text-sm focus:bg-white dark:focus:bg-[#0d1726] focus:border-[#1f3351] dark:focus:border-teal-400 focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all cursor-pointer"
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
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1f3351] dark:bg-teal-500 hover:bg-[#0d2346] dark:hover:bg-teal-400 text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
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
