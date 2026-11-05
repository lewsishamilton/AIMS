const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/**
 * Gets the current day of the week and elapsed seconds since midnight in IST (Asia/Kolkata).
 * Monday = 0, Tuesday = 1, ..., Saturday = 5, Sunday = 6.
 */
export function getIstDateTime(now: Date = new Date()) {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).formatToParts(now);

    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
    const weekday = get("weekday");
    const dayIdx = DAYS.indexOf(weekday as (typeof DAYS)[number]);
    const hours = Number(get("hour")) % 24;
    const minutes = Number(get("minute"));
    const seconds = Number(get("second"));
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const y = Number(get("year")) || now.getFullYear();
    const m = Number(get("month")) || now.getMonth() + 1;
    const d = Number(get("day")) || now.getDate();

    return {
      dayIdx: dayIdx >= 0 ? dayIdx : 0,
      seconds: totalSeconds,
      y,
      m,
      d,
    };
  } catch {
    const day = (now.getDay() + 6) % 7;
    const totalSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    return {
      dayIdx: day,
      seconds: totalSeconds,
      y: now.getFullYear(),
      m: now.getMonth() + 1,
      d: now.getDate(),
    };
  }
}

/**
 * Mulberry32 PRNG for uniform, deterministic daily generation based on calendar date.
 */
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface DailyHospitalStats {
  isOpdDay: boolean;
  opdTarget: number;
  surgeries: number;
  admitted: number;
  discharges: number;
}

/**
 * Generates hospital figures day-wise (Monday to Saturday):
 * - OPD Target: 1100 to 1500
 * - Surgeries: 20 to 25
 * - Admitted: 30 to 45
 * - Discharges: 30 to 35
 */
export function getDailyHospitalStats(date: Date = new Date()): DailyHospitalStats {
  const { dayIdx, y, m, d } = getIstDateTime(date);
  const isOpdDay = dayIdx >= 0 && dayIdx <= 5; // Monday to Saturday

  if (!isOpdDay) {
    return {
      isOpdDay: false,
      opdTarget: 0,
      surgeries: 0,
      admitted: 0,
      discharges: 0,
    };
  }

  const seed = (y * 372 + m * 31 + d) >>> 0;
  const rng = mulberry32(seed);

  const opdTarget = 1100 + Math.floor(rng() * 401); // 1100 to 1500
  const surgeries = 20 + Math.floor(rng() * 6); // 20 to 25
  const admitted = 30 + Math.floor(rng() * 16); // 30 to 45
  const discharges = 30 + Math.floor(rng() * 6); // 30 to 35

  return {
    isOpdDay: true,
    opdTarget,
    surgeries,
    admitted,
    discharges,
  };
}

/* ------------------------------------------------------------------ *
 * Today's hospital figures (shared by the stats ticker and the
 * Analysis section so both show exactly the same numbers).
 * ------------------------------------------------------------------ */

export type TodayGroup = "Patients" | "Laboratory" | "Imaging" | "Procedures";

export interface TodayStats {
  opd: number;
  admitted: number;
  discharges: number;
  surgeries: number;
  biochemistry: number;
  pathology: number;
  microbiology: number;
  xray: number;
  ultrasound: number;
  mri: number;
  ct: number;
  dental: number;
  dialysis: number;
  endoscopy: number;
  cathLab: number;
  ercp: number;
}

/** Baseline figures shown on the ticker and in Analysis → Today. */
export const TODAY_DEFAULTS: TodayStats = {
  opd: 1294,
  admitted: 45,
  discharges: 32,
  surgeries: 20,
  biochemistry: 619,
  pathology: 270,
  microbiology: 173,
  xray: 75,
  ultrasound: 59,
  mri: 23,
  ct: 22,
  dental: 22,
  dialysis: 10,
  endoscopy: 5,
  cathLab: 4,
  ercp: 1,
};

export interface TodayMetric {
  key: keyof TodayStats;
  label: string;
  group: TodayGroup;
}

export const TODAY_GROUPS: TodayGroup[] = [
  "Patients",
  "Laboratory",
  "Imaging",
  "Procedures",
];

/** Ordered metadata used to render both the ticker and the Today chart. */
export const TODAY_METRICS: TodayMetric[] = [
  { key: "opd", label: "Out-patients", group: "Patients" },
  { key: "admitted", label: "Admitted", group: "Patients" },
  { key: "discharges", label: "Discharges", group: "Patients" },
  { key: "biochemistry", label: "Biochemistry", group: "Laboratory" },
  { key: "pathology", label: "Pathology", group: "Laboratory" },
  { key: "microbiology", label: "Microbiology", group: "Laboratory" },
  { key: "xray", label: "X-Ray", group: "Imaging" },
  { key: "ultrasound", label: "Ultrasound", group: "Imaging" },
  { key: "mri", label: "MRI", group: "Imaging" },
  { key: "ct", label: "CT", group: "Imaging" },
  { key: "surgeries", label: "Surgeries", group: "Procedures" },
  { key: "dental", label: "Dental", group: "Procedures" },
  { key: "dialysis", label: "Dialysis", group: "Procedures" },
  { key: "endoscopy", label: "Endoscopy", group: "Procedures" },
  { key: "cathLab", label: "Cath Lab", group: "Procedures" },
  { key: "ercp", label: "ERCP", group: "Procedures" },
];

/** Manual form values are strings so empty inputs mean "use the baseline". */
export type ManualStats = Record<keyof TodayStats, string>;

export const EMPTY_MANUAL_STATS: ManualStats = {
  opd: "",
  admitted: "",
  discharges: "",
  surgeries: "",
  biochemistry: "",
  pathology: "",
  microbiology: "",
  xray: "",
  ultrasound: "",
  mri: "",
  ct: "",
  dental: "",
  dialysis: "",
  endoscopy: "",
  cathLab: "",
  ercp: "",
};

const LS_PREFIX = "aims_hospital_stats_";

/**
 * Owner-only gate for editing hospital stats.
 *
 * Manual figures are a maintenance tool, not a public feature. Editing is
 * allowed only when both are true:
 *   - the app is running in development (this machine / local dev server), and
 *   - `VITE_STATS_EDITOR=owner` is set locally (see `.env.local`).
 *
 * Production builds therefore hide the editor and ignore any stored overrides,
 * so visitors can never change the figures shown on the site.
 */
export function canEditHospitalStats(): boolean {
  return (
    import.meta.env.DEV === true &&
    import.meta.env.VITE_STATS_EDITOR === "owner"
  );
}

/** Dispatched on window whenever a manual entry is saved or cleared. */
export const HOSPITAL_STATS_UPDATED_EVENT = "aims:hospital-stats-updated";

/**
 * Returns IST "previous calendar day" as { label: "dd/mm/yy", key: "YYYY-MM-DD" }.
 * The manual figures are keyed by this date to match the existing ticker storage.
 */
export function getPrevDayInfo(): { label: string; key: string } {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).formatToParts(new Date());
    const y = Number(parts.find((p) => p.type === "year")?.value);
    const m = Number(parts.find((p) => p.type === "month")?.value);
    const d = Number(parts.find((p) => p.type === "day")?.value);
    const prev = new Date(y, m - 1, d - 1);
    const dd = String(prev.getDate()).padStart(2, "0");
    const mm = String(prev.getMonth() + 1).padStart(2, "0");
    const yy = String(prev.getFullYear()).slice(-2);
    const ky = String(prev.getFullYear());
    const km = String(prev.getMonth() + 1).padStart(2, "0");
    const kd = String(prev.getDate()).padStart(2, "0");
    return { label: `${dd}/${mm}/${yy}`, key: `${ky}-${km}-${kd}` };
  } catch {
    return { label: "yesterday", key: "yesterday" };
  }
}

export function loadManualStats(dateKey: string): ManualStats | null {
  // Ignore overrides on any system that is not the authorized owner setup.
  if (!canEditHospitalStats()) return null;
  try {
    const raw = localStorage.getItem(`${LS_PREFIX}${dateKey}`);
    if (raw) return JSON.parse(raw) as ManualStats;
  } catch {
    // localStorage may be unavailable (private mode / disabled storage)
  }
  return null;
}

export function saveManualStats(dateKey: string, stats: ManualStats) {
  if (!canEditHospitalStats()) return;
  try {
    localStorage.setItem(`${LS_PREFIX}${dateKey}`, JSON.stringify(stats));
  } catch {
    // Ignore storage failures — the in-memory state still updates.
  }
  notifyHospitalStatsUpdated();
}

export function clearManualStats(dateKey: string) {
  if (!canEditHospitalStats()) return;
  try {
    localStorage.removeItem(`${LS_PREFIX}${dateKey}`);
  } catch {
    // Ignore storage failures — the in-memory state still updates.
  }
  notifyHospitalStatsUpdated();
}

/** Lets every mounted consumer (ticker, Analysis section) refresh immediately. */
export function notifyHospitalStatsUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(HOSPITAL_STATS_UPDATED_EVENT));
  }
}

/** Parses a manual form field, treating empty / invalid input as "not set". */
export function parseManualValue(value: string | undefined | null): number | null {
  if (value == null || value.trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * Merge figures for display, lowest priority first:
 *   baseline defaults → figures published for the website → local owner preview.
 */
export function resolveTodayStats(
  manual: ManualStats | null,
  published: TodayStats | null = null
): TodayStats {
  const resolved: TodayStats = { ...TODAY_DEFAULTS, ...(published ?? {}) };
  if (manual) {
    for (const { key } of TODAY_METRICS) {
      const value = parseManualValue(manual[key]);
      if (value != null) resolved[key] = value;
    }
  }
  return resolved;
}

/** Pre-filled editor values for the figures currently on display. */
export function defaultManualStats(base: TodayStats = TODAY_DEFAULTS): ManualStats {
  const form = { ...EMPTY_MANUAL_STATS };
  for (const { key } of TODAY_METRICS) form[key] = String(base[key]);
  return form;
}

/** True when at least one field has a saved manual override. */
export function hasManualOverrides(manual: ManualStats | null): boolean {
  if (!manual) return false;
  return TODAY_METRICS.some(({ key }) => parseManualValue(manual[key]) != null);
}

export interface OpdConsultationStats {
  count: number;
  sub: string;
  plus: boolean;
}

/**
 * Dynamic OPD consultation counter:
 * - Active: Monday to Saturday, strictly from 8:00 AM to 4:00 PM IST.
 * - Dynamic daily target between 1100 and 1500 (not static 1500+).
 * - During 8:00 AM to 4:00 PM: Progressively increases from 1 up to today's target.
 * - After 4:00 PM: Holds at today's dynamic target (e.g. 1,227+).
 * - Before 8:00 AM: 0 consultations today.
 * - Sunday: OPD is closed (0 consultations).
 */
export function getOpdConsultationStats(date: Date = new Date()): OpdConsultationStats {
  const { dayIdx, seconds } = getIstDateTime(date);
  const isOpdDay = dayIdx >= 0 && dayIdx <= 5; // Monday to Saturday
  const START_SEC = 8 * 3600; // 08:00 AM (28,800s)
  const END_SEC = 16 * 3600; // 04:00 PM (57,600s)
  const TOTAL_SEC = END_SEC - START_SEC; // 8 hours = 28,800s

  if (!isOpdDay) {
    return {
      count: 0,
      sub: "OPD closed on Sundays",
      plus: false,
    };
  }

  const daily = getDailyHospitalStats(date);

  if (seconds < START_SEC) {
    return {
      count: 0,
      sub: "Opens today at 8:00 AM",
      plus: false,
    };
  }

  if (seconds >= END_SEC) {
    return {
      count: daily.opdTarget,
      sub: "Completed today (8:00 AM – 4:00 PM)",
      plus: true,
    };
  }

  const progress = (seconds - START_SEC) / TOTAL_SEC;
  const count = Math.min(
    daily.opdTarget,
    Math.max(1, Math.floor(1 + progress * (daily.opdTarget - 1)))
  );

  return {
    count,
    sub: "Mon–Sat · 8:00 AM – 4:00 PM",
    plus: true,
  };
}

