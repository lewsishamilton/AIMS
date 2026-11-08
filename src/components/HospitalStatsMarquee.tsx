import React, { useEffect, useRef, useState } from "react";
import {
  OWNER_STATS_EDITING,
  clearManualStats,
  defaultManualStats,
  getPrevDayInfo,
  loadManualStats,
  parseManualValue,
  resolveTodayStats,
  saveManualStats,
  EMPTY_MANUAL_STATS,
  TODAY_GROUPS,
  TODAY_METRICS,
  type ManualStats,
  type TodayGroup,
  type TodayStats,
} from "../lib/hospitalStats";
import { usePublishedStats } from "../lib/publishedStats";
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

  // Owner-only: the pencil and editor are rendered only on the authorized
  // local system. In production this is a compile-time `false`, so the editor
  // markup is removed from the public bundle entirely.
  const canEditStats = OWNER_STATS_EDITING;

  // Site-wide figures, published by the owner and shown to every visitor.
  const {
    stats: publishedStats,
    date: publishedDate,
    loading: publishedLoading,
    refresh: refreshPublished,
  } = usePublishedStats();

  // Previous day key for localStorage (stable per mount)
  const prevDay = getPrevDayInfo();

  // Manual override state (owner preview only)
  const [manualStats, setManualStats] = useState<ManualStats | null>(() =>
    loadManualStats(prevDay.key)
  );

  // Editor dialog state
  const [showEditor, setShowEditor] = useState(false);
  const [editForm, setEditForm] = useState<ManualStats>(EMPTY_MANUAL_STATS);
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<
    { kind: "ok" | "error"; message: string } | null
  >(null);

  const dialogRef = useRef<HTMLDivElement>(null);

  // Local preview wins; otherwise everyone sees the published figures.
  const stats = resolveTodayStats(manualStats, publishedStats);

  const openEditor = () => {
    if (!canEditStats) return;
    const saved = loadManualStats(prevDay.key);
    setEditForm(saved ? { ...EMPTY_MANUAL_STATS, ...saved } : defaultManualStats(stats));
    setPublishStatus(null);
    setShowEditor(true);
  };

  // Owner-only shortcut (Ctrl+Shift+E) on top of the pencil button.
  useEffect(() => {
    if (!canEditStats) return;
    const onOwnerShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        const saved = loadManualStats(prevDay.key);
        setEditForm(
          saved
            ? { ...EMPTY_MANUAL_STATS, ...saved }
            : defaultManualStats(resolveTodayStats(null, publishedStats))
        );
        setPublishStatus(null);
        setShowEditor(true);
      }
    };
    window.addEventListener("keydown", onOwnerShortcut);
    return () => window.removeEventListener("keydown", onOwnerShortcut);
  }, [canEditStats, prevDay.key, publishedStats]);

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

  /**
   * Writes the figures to the site-wide JSON and pushes the change so the
   * public deploy picks it up. Only reachable on the owner's local dev server:
   * the endpoint does not exist in production builds.
   */
  const handlePublish = async () => {
    if (!canEditStats) return;
    setPublishing(true);
    setPublishStatus(null);

    // Blank fields keep the value already on display.
    const nextStats = TODAY_METRICS.reduce((acc, { key }) => {
      acc[key] = parseManualValue(editForm[key]) ?? stats[key];
      return acc;
    }, {} as TodayStats);

    try {
      const response = await fetch("/__owner/publish-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: prevDay.key, stats: nextStats }),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; error?: string }
        | null;

      if (!response.ok || !data?.ok) {
        throw new Error(data?.error || `Publish failed (HTTP ${response.status})`);
      }

      // Keep a local preview as well, then re-read the published JSON.
      saveManualStats(prevDay.key, editForm);
      setManualStats({ ...editForm });
      await refreshPublished();
      setPublishStatus({
        kind: "ok",
        message: data.message || "Published. The website updates after the deploy finishes.",
      });
    } catch (error) {
      setPublishStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "Could not reach the local publish endpoint. Is `npm run dev` running on this machine?",
      });
    } finally {
      setPublishing(false);
    }
  };

  const fmt = (n: number) => n.toLocaleString("en-IN");
  const publishedLabel = publishedDate
    ? publishedDate.split("-").reverse().join("/")
    : null;

  // Every figure from the Today dataset scrolls across the ticker.
  const items = TODAY_METRICS.map((metric) => ({
    label: metric.label,
    value: metric.key === "opd" ? `${fmt(stats.opd)}+` : fmt(stats[metric.key]),
  }));

  const renderGroup = (copy: number) => (
    <ul className="flex items-center shrink-0" aria-hidden={copy > 0 || undefined}>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-center gap-2.5 whitespace-nowrap border-r border-white/15 px-5 sm:px-7">
          <span className="text-[10.5px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">
            {item.label}
          </span>
          <span className="font-['Manrope',sans-serif] text-[15px] sm:text-base font-bold tabular-nums tracking-tight text-white">
            {item.value}
          </span>
        </li>
      ))}
    </ul>
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
        .hospital-marquee-track {
          display: flex;
          width: max-content;
          animation: hospitalMarqueeScroll 70s linear infinite;
          will-change: transform;
        }
        .hospital-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .hospital-marquee-track { animation: none; }
        }
      `}</style>

      {/* Marquee bar */}
      <div className="relative w-full">
        {/* Scrolling ticker of the day's figures */}
        <div className="relative w-full overflow-hidden bg-[#0d2346] dark:bg-[#0f1b2e] dark:border-y dark:border-white/10">
          <div className="flex items-center">
            {/* Label (hidden on small screens to keep the ticker readable) */}
            <div className="relative z-20 hidden shrink-0 items-center gap-2 bg-[#0a1d3a] py-3 pl-5 pr-5 sm:flex lg:pl-8 dark:bg-[#0b1626]">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-['Manrope',sans-serif] text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                Today
              </span>
            </div>

            <div
              className="relative min-w-0 flex-1 overflow-hidden py-3"
              role="region"
              aria-label="Hospital figures today"
            >
              <div className="hospital-marquee-track">
                {renderGroup(0)}
                {renderGroup(1)}
              </div>
              {/* Edge fade so text dissolves instead of clipping */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#0d2346] to-transparent dark:from-[#0f1b2e]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0d2346] to-transparent sm:w-24 dark:from-[#0f1b2e]" />
            </div>
          </div>
        </div>

        {/* Owner-only pencil: never rendered on the public/deployed site */}
        {canEditStats && (
          <button
            onClick={openEditor}
            title="Edit statistics"
            aria-label="Edit hospital statistics"
            className="absolute right-2 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#0a1d3a] text-white transition-colors duration-200 hover:bg-white hover:text-[#0d2346]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        )}
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
            <div className="mt-6 space-y-2">
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="w-full rounded-lg bg-gradient-to-r from-[#c9a227] to-[#e6c98a] text-[#0a1628] text-sm font-bold py-2 shadow-[0_8px_22px_rgba(212,175,55,0.28)] transition-all hover:from-[#d4af37] hover:to-[#f0d99a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {publishing ? "Publishing…" : "Publish to website"}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    isWhiteTheme
                      ? "bg-gray-100 hover:bg-gray-200 text-[#1f3351]/70"
                      : "bg-white/10 hover:bg-white/20 text-white/70"
                  }`}
                  title="Keep these figures as a preview on this device only"
                >
                  Save preview
                </button>
                <button
                  onClick={handleClear}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    isWhiteTheme
                      ? "bg-gray-100 hover:bg-gray-200 text-[#1f3351]/70"
                      : "bg-white/10 hover:bg-white/20 text-white/70"
                  }`}
                  title="Clear this device's preview and show the published figures"
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
                  Close
                </button>
              </div>
            </div>

            {publishStatus && (
              <p
                role="status"
                className={`mt-3 rounded-md px-3 py-2 text-xs ${
                  publishStatus.kind === "ok"
                    ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                    : "bg-red-500/15 text-red-700 dark:text-red-300"
                }`}
              >
                {publishStatus.message}
              </p>
            )}

            {/* Hint */}
            <p className={`text-[10px] mt-3 text-center ${isWhiteTheme ? "text-[#1f3351]/35" : "text-white/30"}`}>
              “Publish to website” updates the figures for every visitor and saves
              the day to STATISTICS.xlsx.
              {publishedLabel && ` Last published for ${publishedLabel}.`}
              {publishedLoading && " Checking for updates…"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default HospitalStatsMarquee;
