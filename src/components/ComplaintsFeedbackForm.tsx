import React, { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, Check, CheckCircle2, ChevronDown, ImagePlus, Loader2, MessageSquareWarning, Send, Star, ThumbsUp, X } from "lucide-react";

const TARGET_EMAIL = "arundathihospital@gmail.com";
const MAX_PHOTOS = 3;
const MAX_TOTAL_BYTES = 5 * 1024 * 1024; // keeps the email well inside the mail service's upload limit

type Kind = "complaint" | "feedback";

const COMPLAINT_TOPICS = [
  "Reception, registration & billing",
  "Emergency / Casualty",
  "Ward & nursing care",
  "Doctor & treatment",
  "Staff behaviour",
  "Cleanliness & facilities",
  "Pharmacy & lab",
  "Other",
];

const FEEDBACK_TOPICS = [
  "Doctor & treatment",
  "Nursing care",
  "Reception & billing",
  "Cleanliness & facilities",
  "Food & canteen",
  "Overall experience",
  "Suggestion",
];

const inputClass =
  "w-full px-4 py-3 rounded-xl bg-[#f8fafc] dark:bg-white/5 border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white placeholder-[#94a3b8] dark:placeholder-slate-400 text-sm focus:bg-white dark:focus:bg-white/10 focus:border-[#1f3351] dark:focus:border-teal-400 focus:ring-2 focus:ring-[#1f3351]/10 outline-none transition-all";
const labelClass = "block text-xs font-bold uppercase tracking-wider text-[#1f3351] dark:text-slate-200 mb-1.5";

// "YYYY-MM-DDTHH:mm" in local time, the format datetime-local inputs use.
const nowLocal = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

const Req = () => <span className="text-red-500">*</span>;

const ComplaintsFeedbackForm: React.FC = () => {
  const [kind, setKind] = useState<Kind>("complaint");
  const [topic, setTopic] = useState("");
  const [topicOpen, setTopicOpen] = useState(false);
  const topicRef = useRef<HTMLDivElement>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const previews = useMemo(() => photos.map((p) => URL.createObjectURL(p)), [photos]);
  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);

  // Close the topic menu on an outside tap or Escape, like the Contact Us subject menu.
  useEffect(() => {
    if (!topicOpen) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (topicRef.current && !topicRef.current.contains(e.target as Node)) setTopicOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setTopicOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [topicOpen]);

  const switchKind = (next: Kind) => {
    setKind(next);
    setTopic("");
    setTopicOpen(false);
    setError(null);
  };

  const addPhotos = (list: FileList | null) => {
    if (!list) return;
    const next = [...photos, ...Array.from(list).filter((f) => f.type.startsWith("image/"))].slice(0, MAX_PHOTOS);
    if (next.reduce((n, f) => n + f.size, 0) > MAX_TOTAL_BYTES) {
      setError("Photos are too large together. Please keep the total under 5 MB.");
      return;
    }
    setError(null);
    setPhotos(next);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Spam trap: real visitors never see or fill the hidden "website" field; bots usually do.
    if (data.get("website")) {
      setStatus("sent");
      return;
    }
    if (!topic) {
      setError(`Please choose what your ${kind} is about.`);
      setTopicOpen(true);
      return;
    }
    data.delete("website");
    data.delete("photos");
    photos.forEach((p, i) => data.append(`attachment${i + 1}`, p, p.name));
    if (kind === "feedback") data.set("rating", rating ? `${rating} / 5` : "Not given");

    const label = kind === "complaint" ? "Complaint" : "Feedback";
    data.set("_subject", `[AIMS ${label}] ${data.get("topic")} - from ${data.get("name")}`);
    data.set("_replyto", String(data.get("email") || ""));
    data.set("_template", "table");
    data.set("_captcha", "false");

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json();
      // Until the hospital inbox has clicked FormSubmit's one-time activation link, it replies
      // "needs Activation" and drops the message, so that counts as a failure.
      const needsActivation = typeof json.message === "string" && /activat/i.test(json.message);
      if (!res.ok || String(json.success) !== "true" || needsActivation) throw new Error(json.message);
      setStatus("sent");
      form.reset();
      setPhotos([]);
      setRating(0);
      setTopic("");
    } catch {
      setStatus("error");
      setError(`We couldn't send this right now. Please try again, or email ${TARGET_EMAIL} directly.`);
    }
  };

  if (status === "sent") {
    return (
      <div className="rounded-[24px] border border-[#1f3351]/15 dark:border-white/15 bg-[#fbfaf5] dark:bg-white/[0.04] p-7 sm:p-10 text-center">
        <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <h3 className="mt-4 font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-[#1f3351] dark:text-white">
          Thank you. We've received it.
        </h3>
        <p className="mt-2 text-sm sm:text-base text-[#1f3351]/75 dark:text-slate-300 max-w-xl mx-auto">
          Your {kind === "complaint" ? "complaint has been recorded and will be acknowledged" : "feedback has reached the hospital team"}. If you gave a phone number or email, we'll contact you there.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            switchKind("complaint");
          }}
          className="mt-6 inline-flex items-center justify-center min-h-11 px-6 rounded-xl bg-[#1f3351] hover:bg-[#0d2346] text-white dark:bg-white dark:text-[#1f3351] text-sm font-semibold transition-colors"
        >
          Submit another
        </button>
      </div>
    );
  }

  const topics = kind === "complaint" ? COMPLAINT_TOPICS : FEEDBACK_TOPICS;

  return (
    <div className="rounded-[24px] border border-[#1f3351]/15 dark:border-white/15 bg-white dark:bg-white/[0.04] p-5 sm:p-8 lg:p-10 shadow-[0_10px_35px_rgba(13,35,70,0.05)]">
      <h2 className="font-['Manrope',sans-serif] text-xl sm:text-2xl font-semibold text-[#1f3351] dark:text-white">
        Share a complaint or feedback
      </h2>
      <p className="mt-1 text-sm text-[#1f3351]/75 dark:text-slate-300">
        It goes straight to the hospital administration. Fields marked <Req /> are required.
      </p>

      {/* Step 1: what is this? */}
      <fieldset className="mt-6">
        <legend className={labelClass}>
          What would you like to share? <Req />
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {([
            ["complaint", "Complaint", "Something went wrong", MessageSquareWarning],
            ["feedback", "Feedback", "Praise or a suggestion", ThumbsUp],
          ] as const).map(([value, title, hint, Icon]) => {
            const active = kind === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => switchKind(value)}
                className={`flex items-center gap-2.5 sm:gap-3 text-left p-3 sm:p-4 min-h-14 rounded-2xl border-2 transition-all cursor-pointer ${
                  active
                    ? "border-[#1f3351] bg-[#1f3351] text-white dark:border-white dark:bg-white dark:text-[#1f3351]"
                    : "border-[#1f3351]/15 bg-[#fbfaf5] text-[#1f3351] hover:border-[#1f3351]/40 dark:border-white/15 dark:bg-transparent dark:text-white"
                }`}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block font-semibold text-sm sm:text-base">{title}</span>
                  <span className={`hidden min-[400px]:block text-xs ${active ? "opacity-80" : "opacity-70"}`}>{hint}</span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <form key={kind} onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input type="hidden" name="type" value={kind === "complaint" ? "Complaint" : "Feedback"} />
          {/* Spam trap, hidden from people and screen readers */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cf-name" className={labelClass}>Your name <Req /></label>
              <input id="cf-name" name="name" required autoComplete="name" className={inputClass} />
            </div>
            <div>
              <label htmlFor="cf-phone" className={labelClass}>Phone number <Req /></label>
              <input id="cf-phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" pattern="[0-9+\-\s]{10,15}" title="10 to 15 digits" className={inputClass} />
            </div>
            <div>
              <label htmlFor="cf-email" className={labelClass}>Email</label>
              <input id="cf-email" name="email" type="email" autoComplete="email" className={inputClass} />
            </div>
            <div className="relative" ref={topicRef}>
              <span id="cf-topic-label" className={labelClass}>{kind === "complaint" ? "Complaint about" : "Feedback about"} <Req /></span>
              <input type="hidden" name="topic" value={topic} />
              <button
                type="button"
                onClick={() => setTopicOpen((o) => !o)}
                aria-haspopup="listbox"
                aria-expanded={topicOpen}
                aria-labelledby="cf-topic-label"
                className={`${inputClass} flex items-center justify-between gap-2 text-left cursor-pointer ${
                  topicOpen ? "border-[#1f3351] dark:border-teal-400 ring-2 ring-[#1f3351]/10 bg-white dark:bg-white/10" : ""
                }`}
              >
                <span className={`truncate ${topic ? "font-medium" : "text-[#94a3b8] dark:text-slate-400"}`}>{topic || "Select an option"}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-200 ${topicOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>
              {topicOpen && (
                <div
                  role="listbox"
                  aria-labelledby="cf-topic-label"
                  className="absolute z-50 left-0 right-0 mt-2 p-1.5 bg-white dark:bg-[#0f1d32] border border-[#dce8ee] dark:border-white/15 rounded-2xl shadow-xl animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="max-h-64 overflow-y-auto overscroll-contain space-y-1">
                    {topics.map((t) => {
                      const selected = topic === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          onClick={() => {
                            setTopic(t);
                            setTopicOpen(false);
                            setError(null);
                          }}
                          className={`w-full min-h-11 px-3.5 py-2.5 rounded-xl text-sm font-medium flex items-center justify-between gap-2 text-left transition-colors cursor-pointer ${
                            selected
                              ? "bg-[#1f3351] text-white dark:bg-teal-500/20 dark:text-teal-300"
                              : "text-[#1f3351] dark:text-slate-200 hover:bg-[#f1f5f9] dark:hover:bg-white/10"
                          }`}
                        >
                          <span>{t}</span>
                          {selected && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {kind === "complaint" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cf-when" className={labelClass}>When did it happen? <Req /></label>
                <input id="cf-when" name="incident_date_time" type="datetime-local" required max={nowLocal()} className={inputClass} />
              </div>
              <div>
                <label htmlFor="cf-where" className={labelClass}>Department or location</label>
                <input id="cf-where" name="location" placeholder="e.g. OPD Block, Ward 3" className={inputClass} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cf-patient" className={labelClass}>Patient name / registration number</label>
                <input id="cf-patient" name="patient_reference" placeholder="If the complaint is about a patient's care" className={inputClass} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cf-visit" className={labelClass}>Date of visit</label>
                <input id="cf-visit" name="visit_date" type="date" max={nowLocal().slice(0, 10)} className={inputClass} />
              </div>
              <fieldset>
                <legend className={labelClass}>Your rating</legend>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                      aria-pressed={rating === n}
                      className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-[#1f3351]/[0.06] dark:hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <Star className={`w-6 h-6 ${n <= rating ? "fill-amber-400 text-amber-400" : "text-[#1f3351]/30 dark:text-white/30"}`} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          )}

          <div>
            <label htmlFor="cf-message" className={labelClass}>
              {kind === "complaint" ? "Describe what happened" : "Your feedback"} <Req />
            </label>
            <textarea
              id="cf-message"
              name="message"
              required
              rows={5}
              minLength={10}
              placeholder={kind === "complaint" ? "Tell us what happened, who was involved and what you'd like us to do." : "What went well, or what could we do better?"}
              className={`${inputClass} resize-y`}
            />
          </div>

          {kind === "complaint" && (
            <div>
              <span className={labelClass}>Photos (optional, up to {MAX_PHOTOS})</span>
              <div className="flex flex-wrap gap-3">
                {photos.map((p, i) => (
                  <div key={`${p.name}-${i}`} className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#dce8ee] dark:border-white/15">
                    <img src={previews[i]} alt={`Attached photo ${i + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                      aria-label={`Remove photo ${i + 1}`}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-[#1f3351]/85 text-white flex items-center justify-center"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                ))}
                {photos.length < MAX_PHOTOS && (
                  <label className="w-20 h-20 rounded-xl border-2 border-dashed border-[#1f3351]/25 dark:border-white/25 text-[#1f3351]/70 dark:text-white/70 hover:border-[#1f3351]/50 hover:text-[#1f3351] flex flex-col items-center justify-center gap-1 text-[11px] font-semibold cursor-pointer transition-colors">
                    <ImagePlus className="w-5 h-5" aria-hidden="true" />
                    Add photo
                    <input
                      type="file"
                      name="photos"
                      accept="image/*"
                      multiple
                      className="sr-only"
                      onChange={(e) => {
                        addPhotos(e.target.files);
                        e.target.value = "";
                      }}
                    />
                  </label>
                )}
              </div>
              <p className="mt-1.5 text-xs text-[#1f3351]/60 dark:text-slate-400">JPG or PNG, 5 MB in total.</p>
            </div>
          )}

          {error && (
            <div role="alert" className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 dark:bg-rose-950/40 dark:border-rose-500/30 dark:text-rose-200 flex items-start gap-2.5 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-12 px-8 rounded-xl bg-[#1f3351] hover:bg-[#0d2346] text-white dark:bg-white dark:text-[#1f3351] text-sm font-semibold shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "sending" ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <Send className="w-4 h-4" aria-hidden="true" />}
            {status === "sending" ? "Sending..." : kind === "complaint" ? "Send complaint" : "Send feedback"}
          </button>
        </form>
    </div>
  );
};

export default ComplaintsFeedbackForm;
