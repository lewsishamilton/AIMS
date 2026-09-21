import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Clock, Phone, Ambulance } from "lucide-react";
import {
  DAY_NAMES,
  OPD_CLOSE_MIN,
  OPD_OPEN_MIN,
  formatTime,
  isOpdDay,
  istNow,
  opdStatus,
} from "./opdStatus";

/**
 * A week at a glance for the OPD page: where the outpatient window sits in the
 * day, which services never close, and whether the desk is open right now.
 * Replaces what would otherwise be stock photography on a page about times.
 */

const pct = (min: number) => (min / (24 * 60)) * 100;
const TICKS = [0, 6, 12, 18, 24];

const OpdSchedule: React.FC = () => {
  const [now, setNow] = useState(istNow);

  // The "open now" pill and the current-time marker would otherwise go stale on
  // a tab left open; a minute's resolution is all this needs.
  useEffect(() => {
    const id = setInterval(() => setNow(istNow()), 60_000);
    return () => clearInterval(id);
  }, []);

  const status = opdStatus(now.dayIdx, now.minutes);

  return (
    <motion.section
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-[28px] border border-[#e4ecf2] bg-white shadow-[0_14px_40px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)] dark:backdrop-blur-xl"
    >
      {/* Live status */}
      <div className="flex flex-col gap-5 border-b border-[#e4ecf2] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:border-white/10">
        <div className="flex items-center gap-4">
          <span
            className={`relative flex h-3 w-3 flex-shrink-0 ${
              status.open ? "text-emerald-500" : "text-slate-400"
            }`}
          >
            {status.open && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            )}
            <span className="relative inline-flex h-3 w-3 rounded-full bg-current" />
          </span>
          <div>
            <p className="font-['Manrope',sans-serif] text-lg font-bold text-[#162740] dark:text-white sm:text-xl">
              Outpatient Department — {status.label}
            </p>
            <p className="mt-0.5 text-sm text-[#596d86] dark:text-slate-300">
              {status.detail} · All times shown for the hospital in Hyderabad (IST)
            </p>
          </div>
        </div>

        <a
          href="tel:+918055667888"
          className="group inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-full bg-[#1f3351] px-6 py-3 text-xs font-bold text-white transition-colors duration-300 hover:bg-[#15243b] sm:text-sm dark:bg-teal-500 dark:hover:bg-teal-400"
        >
          <Phone className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
          Call Reception
        </a>
      </div>

      {/* Week grid */}
      <div className="p-6 sm:p-8">
        <div className="mb-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#596d86] dark:text-slate-300">
            <span className="h-2.5 w-6 rounded-full bg-[#1f3351] dark:bg-teal-400" />
            OPD consultation
          </span>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#596d86] dark:text-slate-300">
            <span className="h-2.5 w-6 rounded-full bg-rose-500/80" />
            Emergency, diagnostics &amp; blood bank — always open
          </span>
        </div>

        {/* Hour axis */}
        <div className="relative mb-2 ml-0 h-4 sm:ml-24">
          {TICKS.map((h) => (
            <span
              key={h}
              className="absolute -translate-x-1/2 text-[10px] font-semibold tabular-nums text-[#93a3b8] dark:text-slate-500"
              style={{ left: `${pct(h * 60)}%` }}
            >
              {h === 24 ? "24:00" : `${String(h).padStart(2, "0")}:00`}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {DAY_NAMES.map((day, i) => {
            const opdDay = isOpdDay(i);
            const isToday = i === now.dayIdx;

            return (
              <div key={day} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-0">
                <span
                  className={`w-24 flex-shrink-0 text-xs font-bold uppercase tracking-wider ${
                    isToday
                      ? "text-[#1f3351] dark:text-teal-300"
                      : "text-[#93a3b8] dark:text-slate-500"
                  }`}
                >
                  {day.slice(0, 3)}
                  {isToday && <span className="ml-1.5 font-semibold normal-case">· today</span>}
                </span>

                <div className="relative h-8 w-full overflow-hidden rounded-lg bg-[#f1f5f9] dark:bg-white/[0.06]">
                  {/* Emergency runs the full width, every day */}
                  <div className="absolute inset-y-0 left-0 w-full bg-rose-500/12 dark:bg-rose-400/12" />

                  {/* OPD window */}
                  {opdDay && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: 0.1 + i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        left: `${pct(OPD_OPEN_MIN)}%`,
                        width: `${pct(OPD_CLOSE_MIN - OPD_OPEN_MIN)}%`,
                        transformOrigin: "left",
                      }}
                      className="absolute inset-y-1 flex items-center justify-center rounded-md bg-[#1f3351] dark:bg-teal-500"
                    >
                      <span className="truncate px-2 text-[10px] font-bold text-white sm:text-[11px] dark:text-[#04241f]">
                        {/* The full range does not fit the band on a phone. */}
                        <span className="sm:hidden">8 AM – 5 PM</span>
                        <span className="hidden sm:inline">
                          {formatTime(OPD_OPEN_MIN)} – {formatTime(OPD_CLOSE_MIN)}
                        </span>
                      </span>
                    </motion.div>
                  )}

                  {!opdDay && (
                    <span className="absolute inset-0 flex items-center pl-3 text-[11px] font-semibold text-[#93a3b8] dark:text-slate-400">
                      No outpatient clinics — emergency only
                    </span>
                  )}

                  {/* Where we are in the day */}
                  {isToday && (
                    <div
                      className="absolute inset-y-0 z-10 w-0.5 bg-amber-500 dark:bg-amber-400"
                      style={{ left: `${pct(now.minutes)}%` }}
                      aria-hidden="true"
                    >
                      <span className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-amber-500 dark:bg-amber-400" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Always-open services */}
      <div className="grid gap-px border-t border-[#e4ecf2] bg-[#e4ecf2] sm:grid-cols-3 dark:border-white/10 dark:bg-white/10">
        {[
          { icon: Ambulance, title: "Emergency & Casualty", detail: "24×7, including Sundays and holidays" },
          { icon: Clock, title: "Diagnostics & Blood Bank", detail: "Radiology, central lab and blood bank never close" },
          { icon: Phone, title: "Ambulance", detail: "+91 81794 32491" },
        ].map(({ icon: Icon, title, detail }) => (
          <div key={title} className="bg-white p-5 sm:p-6 dark:bg-[#0b1220]">
            <Icon className="mb-2.5 h-5 w-5 text-[#1f3351] dark:text-teal-400" />
            <p className="font-['Manrope',sans-serif] text-sm font-bold text-[#162740] dark:text-white">
              {title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#596d86] dark:text-slate-400">
              {detail}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default OpdSchedule;
