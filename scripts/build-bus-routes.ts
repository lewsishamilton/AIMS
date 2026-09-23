// Precomputes road geometry for every bus route into src/data/busRouteGeometry.json.
// Run after editing stops or coordinates:  node scripts/build-bus-routes.ts
import fs from "node:fs";
import { BUS_ROUTES } from "../src/data/busRoutesData.ts";
import { STOP_COORDS } from "../src/data/busStopCoords.ts";

const missing = BUS_ROUTES.flatMap((r) => r.stops.filter((s) => !STOP_COORDS[s]));
if (missing.length) throw new Error(`No coordinates for: ${[...new Set(missing)].join(", ")}`);

const out: Record<number, [number, number][]> = {};
for (const r of BUS_ROUTES) {
  const coords = r.stops.map((s) => STOP_COORDS[s].join(",")).join(";");
  const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`);
  if (!res.ok) throw new Error(`Route ${r.no}: OSRM ${res.status}`);
  const json = await res.json();
  out[r.no] = json.routes[0].geometry.coordinates.map(([x, y]: number[]) => [+x.toFixed(5), +y.toFixed(5)]);
  console.log(`Route ${r.no}: ${(json.routes[0].distance / 1000).toFixed(1)} km, ${out[r.no].length} points`);
  await new Promise((ok) => setTimeout(ok, 1000));
}
fs.writeFileSync(new URL("../src/data/busRouteGeometry.json", import.meta.url), JSON.stringify(out));
