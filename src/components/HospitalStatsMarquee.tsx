import React, { useEffect, useRef, useState } from "react";
import {
  canEditHospitalStats,
  clearManualStats,
  defaultManualStats,
  getPrevDayInfo,
  loadManualStats,
  resolveTodayStats,
  saveManualStats,
  EMPTY_MANUAL_STATS,
  TODAY_GROUPS,
  TODAY_METRICS,
  type ManualStats,
  type TodayGroup,
} from "../lib/hospitalStats";
import { useTheme } from "../context/ThemeContext";
import { useLocation } from "react-router-dom";

interface HospitalStatsMarqueeProps {
  isWhiteTheme?: boolean;
}

const GROUP_STYLES: Record<
  TodayGroup,
  { accent: string; labelColor: string; valueColor: string }
> = {
  Patients: { accent: "#2dd4bf", labelColor: "#99f6e4", valueColor: "#5eead4" },
  Laboratory: { accent: "#fbbf24", labelColor: "#fde68a", valueColor: "#fcd34d" },
  Imaging: { accent: "#38bdf8", labelColor: "#bae6fd", valueColor: "#7dd3fc" },
  Procedures: { accent: "#34d399", labelColor: "#a7f3d0", valueColor: "#6ee7b7" },
};

export const HospitalStatsMarquee: React.FC<HospitalStatsMarqueeProps> = ({
  isWhiteTheme: propIsWhiteTheme,
}) => {
  const { theme } = useTheme();
  const location = useLocation();

  const isWhiteTheme =
    propIsWhiteTheme ?? (theme !== "dark" && location.pathname !== "/");

  // Owner-only: no edit affordance is rendered publicly. The editor can only
  // be opened on the authorized local system via the secret shortcut below.
  const canEditStats = canEditHospitalStats();

  // Previous day key for localStorage (stable per mount)
  const prevDay = getPrevDayInfo();

  // Manual override state
  const [manualStats, setManualStats] = useState<ManualStats | null>(() =>
    loadManualStats(prevDay.key)
  );

  // Editor dialog state
  const [showEditor, setShowEditor] = useState(false);
  const [editForm, setEditForm] = useState<ManualStats>(EMPTY_MANUAL_STATS);

  const dialogRef = useRef<HTMLDivElement>(null);

  // Owner-only secret shortcut (Ctrl+Shift+E). The pencil button was removed
  // so visitors never see an edit affordance; only the authorized local setup
  // can open the editor.
  useEffect(() => {
    if (!canEditStats) return;
    const onOwnerShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        const saved = loadManualStats(prevDay.key);
        setEditForm(saved ? { ...EMPTY_MANUAL_STATS, ...saved } : defaultManualStats());
        setShowEditor(true);
      }
    };
    window.addEventListener("keydown", onOwnerShortcut);
    return () => window.removeEventListener("keydown", onOwnerShortcut);
  }, [canEditStats, prevDay.key]);

  // Close on Escape / outside click
  useEffect(() => {
    if (!showEditor) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowEditor(false);
    };
    const onOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setShowEditor(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
    };
  }, [showEditor]);

  const handleSave = () => {
    saveManualStats(prevDay.key, editForm);
    setManualStats({ ...editForm });
    setShowEditor(false);
  };

  const handleClear = () => {
    clearManualStats(prevDay.key);
    setManualStats(null);
    setShowEditor(false);
  };

  const stats = resolveTodayStats(manualStats);
  const fmt = (n: number) => n.toLocaleString("en-IN");

  // Every figure from the Today dataset scrolls across the ticker.
  const items = TODAY_METRICS.map((metric) => ({
    label: metric.label.toUpperCase(),
    value: metric.key === "opd" ? `${fmt(stats.opd)}+` : fmt(stats[metric.key]),
    ...GROUP_STYLES[metric.group],
  }));

  const renderGroup = () => (
    <div className="flex items-center shrink-0">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center">
          <div className="flex items-center gap-2 sm:gap-2.5 px-5 sm:px-7 whitespace-nowrap">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: item.accent, boxShadow: `0 0 10px ${item.accent}90` }}
              aria-hidden="true"
            />
            <span
              className="text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: item.labelColor, textShadow: `0 0 10px ${item.accent}40` }}
            >
              {item.label}
            </span>
            <span
              className="text-sm sm:text-[15px] font-bold tabular-nums tracking-tight"
              style={{ color: item.valueColor, textShadow: `0 0 14px ${item.accent}70` }}
            >
              {item.value}
            </span>
          </div>
          <span className="select-none text-[9px] text-[#d4af37]/30" aria-hidden="true">
            ◆
          </span>
        </div>
      ))}
    </div>
  );

  const editorGroups = TODAY_GROUPS.map((group) => ({
    group,
    metrics: TODAY_METRICS.filter((metric) => metric.group === group),
  }));

  /* ── Editor dialog styles (inline to keep it self-contained) ── */
  const overlayBg = "fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm";
  const dialogBg = isWhiteTheme
    ? "bg-white text-[#1f3351] border border-[#0d2346]/15 shadow-2xl"
    : "bg-[#0a1628] text-white border border-white/15 shadow-2xl";
  const inputCls = isWhiteTheme
    ? "w-full rounded-md border border-[#0d2346]/20 bg-gray-50 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-[#1f3351]"
    : "w-full rounded-md border border-white/15 bg-white/10 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 text-white placeholder-white/40";
  const labelCls = "block text-xs font-semibold tracking-wider uppercase mb-1";

  return (
    <>
      <style>{`
        @keyframes hospitalMarqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes hospitalMarqueeSheen {
          0% { transform: translateX(-120%); }
          55%, 100% { transform: translateX(420%); }
        }
        .hospital-marquee-track {
          display: flex;
          width: max-content;
          animation: hospitalMarqueeScroll 70s linear infinite;
          will-change: transform;
        }
        .hospital-marquee-track:hover {
          animation-play-state: paused;
        }
        .hospital-marquee-sheen {
          animation: hospitalMarqueeSheen 9s ease-in-out infinite;
        }
        .hospital-marquee-bar {
          background-color: #061426;
          background-image:
            radial-gradient(90% 220% at 8% 50%, rgba(45, 212, 191, 0.32) 0%, transparent 55%),
            radial-gradient(90% 220% at 92% 50%, rgba(212, 175, 55, 0.26) 0%, transparent 55%),
            linear-gradient(100deg, #061426 0%, #0b2a49 32%, #0f4a63 50%, #0b2a49 68%, #061426 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .hospital-marquee-track, .hospital-marquee-sheen { animation: none; }
        }
      `}</style>

      {/* Marquee bar */}
      <div className="relative w-full">
        {/* Premium scrolling ticker */}
        <div className="hospital-marquee-bar relative w-full overflow-hidden border-y border-[#d4af37]/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_12px_34px_rgba(0,0,0,0.5)]">
          {/* Gold hairlines + slow sheen sweep */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />
          <div className="hospital-marquee-sheen pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-transparent via-[#d4af37]/[0.07] to-transparent" />

          <div className="flex items-center">
            {/* Live badge (hidden on small screens to keep the ticker readable) */}
            <div className="relative z-20 hidden shrink-0 items-center gap-2 border-r border-[#d4af37]/20 py-2 pl-5 pr-4 sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#e6c98a]">
                Today
              </span>
            </div>

            <div
              className="relative min-w-0 flex-1 overflow-hidden py-2"
              role="region"
              aria-label="Hospital Stats Ticker"
            >
              <div className="hospital-marquee-track">
                {renderGroup()}
                {renderGroup()}
              </div>
              {/* Edge fade so text dissolves instead of clipping */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#061426] to-transparent sm:w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Editor dialog / modal — owner-only */}
      {canEditStats && showEditor && (
        <div className={overlayBg} role="dialog" aria-modal="true" aria-label="Edit Hospital Stats">
          <div
            ref={dialogRef}
            className={`${dialogBg} rounded-2xl p-6 w-full max-w-lg mx-4`}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold tracking-wide">Edit Hospital Stats</h2>
                <p className={`text-xs mt-0.5 ${isWhiteTheme ? "text-[#1f3351]/50" : "text-white/50"}`}>
                  Update every figure shown in Today
                </p>
              </div>
              <button
                onClick={() => setShowEditor(false)}
                className={`text-xl leading-none w-7 h-7 flex items-center justify-center rounded-full transition-colors ${
                  isWhiteTheme ? "hover:bg-gray-100 text-[#1f3351]/60" : "hover:bg-white/10 text-white/60"
                }`}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Fields */}
            <div className="max-h-[62vh] space-y-5 overflow-y-auto pr-1">
              {editorGroups.map(({ group, metrics }) => {
                const style = GROUP_STYLES[group];
                return (
                  <div key={group}>
                    <div className="mb-2 flex items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: style.accent, boxShadow: `0 0 8px ${style.accent}90` }}
                        aria-hidden="true"
                      />
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: style.labelColor }}
                      >
                        {group}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
                      {metrics.map((metric) => (
                        <div key={metric.key}>
                          <label
                            className={labelCls}
                            style={{ color: style.labelColor }}
                          >
                            {metric.label}
                          </label>
                          <input
                            type="number"
                            min="0"
                            className={inputCls}
                            placeholder="0"
                            value={editForm[metric.key]}
                            onChange={(e) =>
                              setEditForm((f) => ({ ...f, [metric.key]: e.target.value }))
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#e6c98a] text-[#0a1628] text-sm font-bold py-2 shadow-[0_8px_22px_rgba(212,175,55,0.28)] transition-all hover:from-[#d4af37] hover:to-[#f0d99a] active:scale-[0.98]"
              >
                Save
              </button>
              <button
                onClick={handleClear}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isWhiteTheme
                    ? "bg-gray-100 hover:bg-gray-200 text-[#1f3351]/70"
                    : "bg-white/10 hover:bg-white/20 text-white/70"
                }`}
                title="Clear saved data and restore baseline values"
              >
                Reset
              </button>
              <button
                onClick={() => setShowEditor(false)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isWhiteTheme
                    ? "bg-gray-100 hover:bg-gray-200 text-[#1f3351]/70"
                    : "bg-white/10 hover:bg-white/20 text-white/70"
                }`}
              >
                Cancel
              </button>
            </div>

            {/* Hint */}
            <p className={`text-[10px] mt-3 text-center ${isWhiteTheme ? "text-[#1f3351]/35" : "text-white/30"}`}>
              Saved values are stored locally on this device.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default HospitalStatsMarquee;
