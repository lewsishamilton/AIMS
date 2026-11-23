import { Link } from "react-router-dom";
import { ArrowRight, Clock, GraduationCap, Landmark, Send, ShieldCheck, Ticket, type LucideIcon } from "lucide-react";
import "./GlanceCard.css";

/**
 * Animated "Programme at a glance" card for PG programme pages: larger type, an icon per row,
 * a slowly turning gradient border and rows that fade in one after another.
 */
export default function GlanceCard({ degree }: { degree: "MD" | "MS" }) {
  const rows: [LucideIcon, string, string][] = [
    [Clock, "Duration", "3 years"],
    [GraduationCap, "Degree", degree === "MS" ? "Master of Surgery (MS)" : "Doctor of Medicine (MD)"],
    [Landmark, "Affiliation", "KNRUHS, Warangal"],
    [ShieldCheck, "Regulator", "National Medical Commission"],
    [Ticket, "Admission", "NEET-PG + KNRUHS counselling"],
  ];
  return (
    <aside className="glance-card flex">
      <div className="glance-card__inner flex w-full flex-col p-6 dark:bg-[#0f1d38]">
        <div className="relative flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-[#FFC94D] to-[#F47B20] text-white shadow-[0_8px_18px_rgba(244,123,32,0.35)]">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </span>
          <p className="text-2xl font-bold text-[#132a52] dark:text-white">Programme at a glance</p>
        </div>
        <dl className="relative mb-5 mt-4 space-y-0.5">
          {rows.map(([Icon, k, v], i) => (
            <div
              key={k}
              className="glance-row flex items-center gap-4 rounded-xl px-2 py-2 transition-colors hover:bg-[#F47B20]/[0.06]"
              style={{ animationDelay: `${0.15 + i * 0.12}s` }}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2754a3]/[0.08] text-[#2754a3] dark:bg-white/10 dark:text-[#93C5FD]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-sm font-semibold uppercase tracking-wider text-[#64748b] dark:text-slate-400">{k}</dt>
                <dd className="text-lg font-bold leading-snug text-[#132a52] dark:text-white">{v}</dd>
              </div>
            </div>
          ))}
        </dl>
        <Link
          to="/admissions/apply/enquire"
          className="glance-btn group mt-auto flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F47B20] to-[#D9581A] px-5 text-base font-bold text-white shadow-[0_10px_24px_rgba(217,88,26,0.35)] transition hover:brightness-105"
        >
          <Send className="h-5 w-5" aria-hidden="true" /> Admissions Enquiry
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
