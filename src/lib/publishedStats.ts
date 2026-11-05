import { useCallback, useEffect, useState } from "react";
import publishedData from "../data/todayStats.json";
import { TODAY_METRICS, type TodayStats } from "./hospitalStats";

/**
 * Figures that were published for the public website.
 *
 * Two copies exist on purpose:
 *  - `src/data/todayStats.json` is imported at build time, so the values are
 *    baked into the bundle that every visitor downloads. This guarantees the
 *    public site shows the latest numbers as soon as the deploy finishes, even
 *    if a CDN caches the JSON file for a long time.
 *  - `/data/today-stats.json` is fetched at runtime (cache-busted) so the local
 *    owner sees a publish immediately, without waiting for a rebuild.
 */
export interface PublishedStats {
  /** IST date (YYYY-MM-DD) these figures were entered for. */
  date: string | null;
  /** ISO timestamp of the last publish. */
  updatedAt: string | null;
  /** Full numeric figures, or null when nothing valid has been published. */
  stats: TodayStats | null;
}

const DATA_PATH = `${import.meta.env.BASE_URL}data/today-stats.json`;

function normalizeStats(value: unknown): TodayStats | null {
  if (!value || typeof value !== "object") return null;
  const source = value as Record<string, unknown>;
  const stats = {} as TodayStats;
  for (const { key } of TODAY_METRICS) {
    const n = Number(source[key]);
    if (!Number.isFinite(n) || n < 0) return null;
    stats[key] = Math.round(n);
  }
  return stats;
}

function normalize(value: unknown): PublishedStats | null {
  if (!value || typeof value !== "object") return null;
  const source = value as Record<string, unknown>;
  const stats = normalizeStats(source.stats);
  if (!stats) return null;
  return {
    date: typeof source.date === "string" ? source.date : null,
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : null,
    stats,
  };
}

/** Values compiled into this build — used before the fetch resolves, or if it fails. */
export const BUNDLED_PUBLISHED_STATS: PublishedStats = normalize(publishedData) ?? {
  date: null,
  updatedAt: null,
  stats: null,
};

/**
 * Guards against a stale CDN copy of the runtime JSON overriding the values
 * that were compiled into this build. Only accept a fetched payload that is
 * at least as new as the bundled one.
 */
function isAtLeastAsFreshAsBundled(next: PublishedStats): boolean {
  if (BUNDLED_PUBLISHED_STATS.stats == null) return true;
  if (!next.updatedAt) return false;

  const nextTime = Date.parse(next.updatedAt);
  if (Number.isNaN(nextTime)) return false;

  const bundledTime = Date.parse(BUNDLED_PUBLISHED_STATS.updatedAt ?? "");
  if (Number.isNaN(bundledTime)) return true;

  return nextTime >= bundledTime;
}

/** Reads the site-wide published JSON, bypassing any browser/CDN cache. */
export async function fetchPublishedStats(): Promise<PublishedStats | null> {
  try {
    const response = await fetch(`${DATA_PATH}?v=${Date.now()}`, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return null;
    return normalize(await response.json());
  } catch {
    return null;
  }
}

interface UsePublishedStatsResult extends PublishedStats {
  loading: boolean;
  refresh: () => Promise<PublishedStats | null>;
}

/** Loads the published figures and re-checks them after an owner publish. */
export function usePublishedStats(): UsePublishedStatsResult {
  const [published, setPublished] = useState<PublishedStats>(BUNDLED_PUBLISHED_STATS);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const next = await fetchPublishedStats();
    if (next && isAtLeastAsFreshAsBundled(next)) setPublished(next);
    setLoading(false);
    return next;
  }, []);

  useEffect(() => {
    let cancelled = false;

    // Async callback so the first paint is not blocked; the bundled figures
    // are shown until the runtime JSON resolves.
    fetchPublishedStats()
      .then((next) => {
        if (!cancelled && next && isAtLeastAsFreshAsBundled(next)) {
          setPublished(next);
        }
      })
      .catch(() => {
        // Keep the bundled figures when the runtime JSON is unavailable.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { ...published, loading, refresh };
}
