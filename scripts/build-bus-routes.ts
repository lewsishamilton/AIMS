// Precomputes road geometry for every bus route into src/data/busRouteGeometry.json.
// Run after editing stops or coordinates:  node scripts/build-bus-routes.ts
import fs from "node:fs";
import assert from "node:assert";
import { distance, length, lineString, nearestPointOnLine, pointToLineDistance } from "@turf/turf";
import { BUS_ROUTES } from "../src/data/busRoutesData.ts";
import { STOP_COORDS, toLngLat } from "../src/data/busStopCoords.ts";

type LngLat = [number, number];
/** Longest stretch (km) that returns to where it started and is cut as a loop. */
const MAX_LOOP_KM = 3;

/** How far (km) the route doubles back on itself right after stop `k`. */
function backtrackKm(c: LngLat[], stops: number[], k: number): number {
  const w = stops[k];
  if (k === 0 || w === stops[k - 1]) return 0;
  const back = lineString(c.slice(Math.max(stops[k - 1], w - 400), w + 1));
  let b = w;
  while (b + 1 < stops[k + 1] && pointToLineDistance(c[b + 1], back) < 0.04) b++;
  return b === w ? 0 : length(lineString(c.slice(w, b + 1)));
}

/**
 * Cut loops: stretches that come back within 40 m of where they started after
 * at most MAX_LOOP_KM. OSRM makes them when a stop pin sits on a side street or
 * the far carriageway, or for U-turns at junctions; the bus then visibly loops.
 * A stop at the end of a longer dead end is a real part of the route and is kept.
 * `stops` are the indices in `coords` where OSRM placed each stop.
 */
function cutLoops(coords: LngLat[], stops: number[]): LngLat[] {
  const keep = stops.filter((_, k) => k < stops.length - 1 && backtrackKm(coords, stops, k) > MAX_LOOP_KM / 2);
  const km = coords.map((_, i) => 0);
  for (let i = 1; i < coords.length; i++) km[i] = km[i - 1] + distance(coords[i - 1], coords[i]);
  const out: number[] = []; // indices into coords
  for (let j = 0; j < coords.length; j++) {
    let cut = -1;
    for (let n = out.length - 1; n >= 0 && km[j] - km[out[n]] <= MAX_LOOP_KM; n--)
      if (km[j] - km[out[n]] > 0.1 && distance(coords[out[n]], coords[j]) < 0.04) cut = n;
    if (cut >= 0 && !keep.some((w) => w > out[cut] && w < j)) out.length = cut + 1;
    out.push(j);
  }
  return out.map((i) => coords[i]);
}
// Out 500 m north to a stop, back again, then on east: the loop goes, the rest stays.
assert.deepStrictEqual(
  cutLoops([[78, 17], [78, 17.0045], [78, 17.0001], [78.01, 17]], [0, 1, 3]),
  [[78, 17], [78, 17.0001], [78.01, 17]]
);
// Same, but the stop is 2 km up a dead end: kept.
assert.equal(cutLoops([[78, 17], [78, 17.018], [78, 17.0001], [78.01, 17]], [0, 1, 3]).length, 4);

const missing = BUS_ROUTES.flatMap((r) => r.stops.filter((s) => !STOP_COORDS[s]));
if (missing.length) throw new Error(`No coordinates for: ${[...new Set(missing)].join(", ")}`);

const out: Record<number, LngLat[]> = {};
for (const r of BUS_ROUTES) {
  const coords = r.stops.filter((s) => !r.passBy?.includes(s)).map((s) => toLngLat(STOP_COORDS[s]).join(",")).join(";");
  // continue_straight=false lets OSRM U-turn at a stop instead of circling a block.
  const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson&continue_straight=false`);
  if (!res.ok) throw new Error(`Route ${r.no}: OSRM ${res.status}`);
  const json = await res.json();
  const raw: LngLat[] = json.routes[0].geometry.coordinates.map(([x, y]: number[]) => [+x.toFixed(5), +y.toFixed(5)]);
  let i = 0;
  const stops = json.waypoints.map(({ location: [x, y] }: { location: number[] }) =>
    (i = raw.findIndex((p, j) => j >= i && Math.abs(p[0] - x) + Math.abs(p[1] - y) < 2e-5)));
  if (stops.includes(-1)) throw new Error(`Route ${r.no}: stop not found on OSRM geometry`);
  out[r.no] = cutLoops(raw, stops);
  console.log(`Route ${r.no}: ${(json.routes[0].distance / 1000).toFixed(1)} km, ${raw.length} → ${out[r.no].length} points`);
  await new Promise((ok) => setTimeout(ok, 1000));
}
fs.writeFileSync(new URL("../src/data/busRouteGeometry.json", import.meta.url), JSON.stringify(out));
