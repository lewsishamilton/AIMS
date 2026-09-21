/**
 * Opening-hours logic for the OPD timings page.
 *
 * Kept apart from the component so the rollover cases — mid-session, before
 * opening, after closing, Saturday evening into Monday — can be asserted
 * without rendering anything. The self-check at the bottom runs in dev only.
 */

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const DAY_NAMES = [
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
] as const;

/** OPD runs Monday to Saturday, 8:00 AM to 5:00 PM. Sunday is index 6. */
export const OPD_OPEN_MIN = 8 * 60;
export const OPD_CLOSE_MIN = 17 * 60;
export const OPD_DAYS = [0, 1, 2, 3, 4, 5];

export function isOpdDay(dayIdx: number): boolean {
  return OPD_DAYS.includes(dayIdx);
}

export function formatTime(min: number): string {
  const h24 = Math.floor(min / 60) % 24;
  const m = min % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${h24 < 12 ? "AM" : "PM"}`;
}

export interface OpdStatus {
  open: boolean;
  /** Short pill text, e.g. "Open now". */
  label: string;
  /** Sentence under the pill, e.g. "Closes at 5:00 PM". */
  detail: string;
}

/**
 * @param dayIdx 0 = Monday … 6 = Sunday
 * @param minutes minutes since midnight, local to the hospital
 */
export function opdStatus(dayIdx: number, minutes: number): OpdStatus {
  if (isOpdDay(dayIdx) && minutes >= OPD_OPEN_MIN && minutes < OPD_CLOSE_MIN) {
    return {
      open: true,
      label: "Open now",
      detail: `Closes at ${formatTime(OPD_CLOSE_MIN)}`,
    };
  }

  // Not open — find the next session. Today still counts if we are before 8 AM.
  let offset = isOpdDay(dayIdx) && minutes < OPD_OPEN_MIN ? 0 : 1;
  while (!isOpdDay((dayIdx + offset) % 7)) offset++;

  const when =
    offset === 0 ? "today" : offset === 1 ? "tomorrow" : DAY_NAMES[(dayIdx + offset) % 7];
  return {
    open: false,
    label: "Closed now",
    detail: `Opens ${when} at ${formatTime(OPD_OPEN_MIN)}`,
  };
}

/** Current time at the hospital, whatever timezone the visitor is in. */
export function istNow(now: Date = new Date()): { dayIdx: number; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const dayIdx = DAYS.indexOf(get("weekday") as (typeof DAYS)[number]);
  const minutes = (Number(get("hour")) % 24) * 60 + Number(get("minute"));
  return { dayIdx: dayIdx === -1 ? 0 : dayIdx, minutes };
}

if (import.meta.env.DEV) {
  const check = (got: string, want: string, what: string) => {
    if (got !== want) console.error(`[opdStatus] ${what}: got "${got}", want "${want}"`);
  };
  // Mid-session on a weekday.
  check(opdStatus(2, 10 * 60).detail, "Closes at 5:00 PM", "Wed 10:00");
  check(String(opdStatus(2, 10 * 60).open), "true", "Wed 10:00 open");
  // Boundaries: 8:00 is open, 17:00 is already closed.
  check(String(opdStatus(0, OPD_OPEN_MIN).open), "true", "Mon 08:00");
  check(String(opdStatus(0, OPD_CLOSE_MIN).open), "false", "Mon 17:00");
  // Before opening, same day.
  check(opdStatus(0, 6 * 60).detail, "Opens today at 8:00 AM", "Mon 06:00");
  // After closing, next day is a working day.
  check(opdStatus(0, 20 * 60).detail, "Opens tomorrow at 8:00 AM", "Mon 20:00");
  // Saturday evening must skip Sunday and name Monday.
  check(opdStatus(5, 20 * 60).detail, "Opens Monday at 8:00 AM", "Sat 20:00");
  // Sunday is closed all day and rolls to tomorrow.
  check(opdStatus(6, 10 * 60).detail, "Opens tomorrow at 8:00 AM", "Sun 10:00");
  // Midnight must read 12:00 AM, not 0:00 AM.
  check(formatTime(0), "12:00 AM", "formatTime(0)");
  check(formatTime(12 * 60), "12:00 PM", "formatTime(noon)");
}
