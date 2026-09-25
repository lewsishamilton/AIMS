import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Map as MapLibreMap,
  LngLatBounds,
  NavigationControl,
  setWorkerUrl,
  type ExpressionSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { along, bearing, length, lineString, nearestPointOnLine, point } from "@turf/turf";
import { Compass, Locate, Map as MapIcon, Pause, Phone, Play, RotateCcw } from "lucide-react";
import { createBusLayer } from "../lib/busLayer";
import { useTheme } from "../context/ThemeContext";
import { STOP_COORDS } from "../data/busStopCoords";
import GEOMETRY from "../data/busRouteGeometry.json";
import type { BusRoute } from "../data/busRoutesData";

// MapLibre derives its worker URL at runtime, which bundlers can't see; hand it a bundled one.
setWorkerUrl(workerUrl);

type CameraMode = "follow" | "free" | "overview";

/** A full run from first stop to campus takes this long at 1x. */
const TRIP_SECONDS = 90;
const SPEEDS = [1, 2, 5, 10];
const MAP_STYLES = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
};
/** Map colours per theme. Stop badges: [upcoming, passed, current]. */
const LINE = {
  light: {
    base: "rgba(31,51,81,0.35)", progress: "#0d9488", label: "#162740", halo: "#ffffff",
    badgeFill: ["#ffffff", "#0d9488", "#1f3351"], badgeStroke: ["#1f3351", "#0d9488", "#2dd4bf"], badgeText: ["#1f3351", "#ffffff", "#ffffff"],
  },
  dark: {
    base: "rgba(148,163,184,0.35)", progress: "#2dd4bf", label: "#e2e8f0", halo: "#0b1424",
    badgeFill: ["#0b1424", "#0f766e", "#2dd4bf"], badgeStroke: ["#64748b", "#2dd4bf", "#ffffff"], badgeText: ["#cbd5e1", "#ffffff", "#06201d"],
  },
};

/** A paint value that varies with each stop's passed/current/upcoming state. */
const byStatus = ([upcoming, passed, current]: (string | number)[]): ExpressionSpecification => [
  "match", ["feature-state", "status"], "passed", passed, "current", current, upcoming,
];
const FIT_PADDING = 50;
/** Follow-camera zoom at 1x: close enough to see streets, far enough to see the next turn. */
const FOLLOW_ZOOM = 14.2;
/**
 * Pull the camera out as speed goes up so the map moves across the screen at a
 * watchable pace (and tiles can keep up): 1x 14.2, 2x 13.5, 5x 12.5, 10x 11.7.
 */
const followZoom = (speed: number) => FOLLOW_ZOOM - Math.log2(speed) * 0.75;
/** Per-frame easing for the follow camera; higher is snappier. Rotation is kept slower. */
const CAMERA_EASE = 0.08;
const ROTATE_EASE = 0.03;

/**
 * Animated preview of one bus route: the road path, numbered stops and a 3D
 * bus driving the route. Remount it (via `key`) to switch route or theme.
 */
const BusRouteTracker: React.FC<{ route: BusRoute }> = ({ route }) => {
  const { theme } = useTheme();

  // Route geometry and the distance of each stop along it.
  const { line, totalKm, stopKm, bounds } = useMemo(() => {
    const coords = (GEOMETRY as unknown as Record<string, [number, number][]>)[route.no];
    const line = lineString(coords);
    const totalKm = length(line);
    let prev = 0;
    const stopKm = route.stops.map((s) => (prev = Math.max(prev, nearestPointOnLine(line, STOP_COORDS[s]).properties.location)));
    stopKm[stopKm.length - 1] = totalKm;
    const bounds = coords.reduce((b, c) => b.extend(c), new LngLatBounds(coords[0], coords[0]));
    return { line, totalKm, stopKm, bounds };
  }, [route]);

  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [camera, setCamera] = useState<CameraMode>("overview");

  const km = progress * totalKm;
  const position = along(line, km).geometry.coordinates as [number, number];
  // Direction over a stretch of road, not a single vertex, so kinks in the
  // road data don't jerk the bus. The camera aims at where the bus will be in
  // about half a second, so at high speed it follows the route's general
  // direction instead of swinging round every bend.
  const headingOver = (backKm: number, aheadKm: number) =>
    bearing(
      point(along(line, Math.max(0, km - backKm)).geometry.coordinates),
      point(along(line, Math.min(totalKm, km + aheadKm)).geometry.coordinates)
    );
  // Dynamically scale lookahead and lookbehind with speed so high speeds (2x, 5x, 10x)
  // smoothly track the true trajectory of the road without twitching or shaking at micro road vertices
  const lookBack = Math.max(0.04, 0.02 * Math.sqrt(speed));
  const lookAhead = Math.max(0.05, 0.035 * Math.sqrt(speed));
  const heading = headingOver(lookBack, lookAhead);
  const viewHeading = headingOver(0.08 * Math.sqrt(speed), 0.35 * Math.sqrt(speed));
  const currentStop = stopKm.reduce((cur, d, i) => (km + 1e-6 >= d ? i : cur), 0);

  // Playback clock.
  const speedRef = useRef(speed);
  speedRef.current = speed;
  const progressRef = useRef(progress);
  progressRef.current = progress;
  useEffect(() => {
    if (!playing) return;
    let last: number | null = null;
    let raf = 0;
    const tick = (t: number) => {
      const dt = last == null ? 0 : (t - last) / 1000;
      last = t;
      const next = Math.min(1, progressRef.current + (dt * speedRef.current) / TRIP_SECONDS);
      progressRef.current = next;
      setProgress(next);
      if (next >= 1) setPlaying(false);
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  // Map setup, once per mount.
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const busRef = useRef<ReturnType<typeof createBusLayer> | null>(null);
  const userMovingRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const map = new MapLibreMap({
      container: containerRef.current!,
      style: MAP_STYLES[theme],
      bounds,
      fitBoundsOptions: { padding: FIT_PADDING },
      attributionControl: { compact: true },
      cooperativeGestures: true,
    });
    map.addControl(new NavigationControl(), "top-right");
    mapRef.current = map;
    const bus = createBusLayer("bus-3d-model", speed);
    busRef.current = bus;

    // Hand the camera back to the user while they drag or rotate.
    for (const [start, end] of [["dragstart", "dragend"], ["rotatestart", "rotateend"]] as const) {
      map.on(start, () => (userMovingRef.current = true));
      map.on(end, () => (userMovingRef.current = false));
    }

    map.on("load", () => {
      const colors = LINE[theme];
      // lineMetrics lets the travelled part be drawn as a gradient on this one
      // line, rather than re-slicing and re-uploading a second line every frame.
      map.addSource("route", { type: "geojson", data: line, lineMetrics: true });
      map.addSource("stops", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: route.stops.map((name, i) => ({
            type: "Feature",
            id: i,
            properties: { name, no: String(i + 1) },
            geometry: { type: "Point", coordinates: STOP_COORDS[name] },
          })),
        },
      });
      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: { "line-join": "round", "line-cap": "round" },
        paint: { "line-width": ["interpolate", ["linear"], ["zoom"], 10, 3.5, 15, 6], "line-gradient": trailGradient(0) },
      });
      // Stop badges are drawn on the map (not as HTML markers) so that the
      // names below can avoid them. Numbers go above names: MapLibre places
      // the top layer first, and names then steer clear of the numbers.
      map.addLayer({
        id: "stop-dots",
        type: "circle",
        source: "stops",
        paint: {
          "circle-radius": byStatus([10, 10, 13]),
          "circle-color": byStatus(colors.badgeFill),
          "circle-stroke-color": byStatus(colors.badgeStroke),
          "circle-stroke-width": byStatus([2, 2, 3]),
        },
      });
      map.addLayer({
        id: "stop-numbers",
        type: "symbol",
        source: "stops",
        layout: {
          "text-field": ["get", "no"],
          "text-font": ["Montserrat Medium", "Open Sans Bold", "Noto Sans Regular"],
          "text-size": 10,
          "text-allow-overlap": true,
          "text-padding": 7,
        },
        paint: { "text-color": byStatus(colors.badgeText) },
      });
      // Names beside the badges; MapLibre drops any that would collide.
      map.addLayer({
        id: "stop-names",
        type: "symbol",
        source: "stops",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Montserrat Medium", "Open Sans Bold", "Noto Sans Regular"],
          "text-size": ["interpolate", ["linear"], ["zoom"], 10, 11, 15, 13],
          "text-variable-anchor": ["left", "right", "top", "bottom"],
          "text-radial-offset": 1.3,
          "text-justify": "auto",
          "text-max-width": 9,
          "text-padding": 4,
        },
        paint: { "text-color": colors.label, "text-halo-color": colors.halo, "text-halo-width": 1.6 },
      }, "stop-numbers");

      // Add 3D bus model layer and immediately set initial position and speed scale
      map.addLayer(bus.layer);
      bus.setPosition(position, heading);
      bus.setSpeed(speed);
      setLoaded(true);
    });

    map.on("click", "stop-dots", (e) => jumpToStop(Number(e.features![0].id)));
    map.on("mouseenter", "stop-dots", () => (map.getCanvas().style.cursor = "pointer"));
    map.on("mouseleave", "stop-dots", () => (map.getCanvas().style.cursor = ""));

    return () => {
      map.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync bus 3D model size dynamically when speed changes (1x, 2x, 5x, 10x)
  useEffect(() => {
    busRef.current?.setSpeed(speed);
  }, [speed]);

  // Travelled trail and bus.
  function trailGradient(p: number): ExpressionSpecification {
    const colors = LINE[theme];
    return ["step", ["line-progress"], colors.progress, Math.max(p, 1e-6), colors.base];
  }
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded) return;
    map.setPaintProperty("route", "line-gradient", trailGradient(progress));
    busRef.current?.setPosition(position, heading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, progress, position, heading]);

  useEffect(() => {
    if (camera === "overview") mapRef.current?.fitBounds(bounds, { padding: FIT_PADDING, pitch: 0, bearing: 0, duration: 600 });
  }, [camera, bounds]);

  // Follow camera. Paused: glide to the bus. Playing: every frame, close a
  // fraction of the gap between camera and bus. The gap is measured relative
  // to the bus, so the camera never trails behind it however fast it goes, and
  // switching modes or speeds blends in instead of snapping.
  const lastBusRef = useRef<[number, number] | null>(null);
  const zoomTarget = followZoom(speed);
  useEffect(() => {
    const map = mapRef.current;
    if (!map || camera !== "follow") return;
    if (!playing) {
      lastBusRef.current = null;
      map.easeTo({ center: position, zoom: zoomTarget, pitch: 45, bearing: viewHeading, duration: 600 });
      return;
    }
    if (userMovingRef.current) return;
    const c = map.getCenter();
    const ref = lastBusRef.current ?? position;
    lastBusRef.current = position;
    const k = 1 - CAMERA_EASE;
    const z = map.getZoom();
    const p = map.getPitch();
    const b = map.getBearing();
    const turn = ((viewHeading - b + 540) % 360) - 180;
    map.jumpTo({
      center: [position[0] + (c.lng - ref[0]) * k, position[1] + (c.lat - ref[1]) * k],
      zoom: z + (zoomTarget - z) * CAMERA_EASE,
      pitch: p + (45 - p) * CAMERA_EASE,
      bearing: b + turn * ROTATE_EASE,
    });
  }, [camera, playing, position, viewHeading, zoomTarget]);

  // Stop badge states.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !loaded) return;
    route.stops.forEach((_, i) => {
      const status = i < currentStop ? "passed" : i === currentStop ? "current" : "upcoming";
      map.setFeatureState({ source: "stops", id: i }, { status });
    });
  }, [loaded, currentStop, route]);

  function jumpToStop(i: number) {
    setPlaying(false);
    setProgress(stopKm[i] / totalKm);
    setCamera((c) => (c === "free" ? "follow" : c));
  }

  const togglePlay = () => {
    if (progress >= 1) setProgress(0);
    if (!playing && camera === "overview") setCamera("follow");
    setPlaying(!playing);
  };

  const pill = (active: boolean) =>
    `flex items-center gap-1 rounded-full px-2 py-1 sm:px-2.5 text-xs font-semibold transition ${
      active
        ? "bg-[#1f3351] text-white dark:bg-teal-400 dark:text-[#06201d]"
        : "text-[#475569] hover:text-[#1f3351] dark:text-slate-400 dark:hover:text-white"
    }`;

  return (
    <div className="rounded-[28px] border border-[#e5e7eb] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] sm:p-6 dark:border-white/10 dark:bg-[#0f172a]/40 dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      {/* Header: route name + contacts */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
            Route {String(route.no).padStart(2, "0")}
          </p>
          <h2 className="mt-1 font-['Manrope',sans-serif] text-xl font-bold tracking-tight text-[#162740] sm:text-2xl dark:text-white">
            {route.stops[0]} <span className="text-[#94a3b8]">→</span> {route.stops[route.stops.length - 1]}
          </h2>
          <p className="mt-1 text-sm text-[#596d86] dark:text-slate-400">
            {route.stops.length} stops · approx. {Math.round(totalKm)} km by road
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          {[
            { role: "Route Incharge", ...route.incharge },
            { role: "Driver", ...route.driver },
          ].map((c) => (
            <a
              key={c.role}
              href={`tel:+91${c.phone}`}
              className="group flex min-w-0 items-center gap-2.5 rounded-2xl border border-[#e5e7eb] px-3 py-2 transition hover:border-[#1f3351] dark:border-white/10 dark:hover:border-teal-400"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f3351]/10 text-[#1f3351] dark:bg-teal-400/15 dark:text-teal-300">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#64748b] dark:text-slate-500">{c.role}</span>
                <span className="block truncate text-sm font-semibold text-[#162740] dark:text-white">{c.name}</span>
                <span className="block text-xs tabular-nums text-[#596d86] group-hover:text-[#1f3351] dark:text-slate-400 dark:group-hover:text-teal-300">{c.phone}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="relative mt-5 h-[420px] overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#eef1f5] sm:h-[520px] dark:border-white/10 dark:bg-[#0b1220]">
        <div ref={containerRef} className="h-full w-full" />

        <div className="pointer-events-none absolute left-3 top-3 max-w-[70%] rounded-full border border-[#e5e7eb] bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-[#162740] shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#0b1424]/85 dark:text-white">
          <span className="text-[#64748b] dark:text-slate-400">{progress >= 1 ? "Arrived" : currentStop === 0 && km < 0.01 ? "Starts at" : "Passed"} · </span>
          {route.stops[currentStop]}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl border border-[#e5e7eb] bg-[#f8fafc] p-2 sm:gap-3 dark:border-white/10 dark:bg-white/[0.03]">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1f3351] text-white transition hover:bg-[#162740] active:scale-95 dark:bg-teal-400 dark:text-[#06201d] dark:hover:bg-teal-300"
        >
          {playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" className="ml-0.5" />}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlaying(false);
            setProgress(0);
          }}
          aria-label="Restart"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#475569] transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
        >
          <RotateCcw size={15} />
        </button>
        <input
          type="range"
          min={0}
          max={1000}
          value={Math.round(progress * 1000)}
          onChange={(e) => setProgress(Number(e.target.value) / 1000)}
          aria-label="Trip progress"
          className="h-1.5 min-w-[120px] flex-1 cursor-pointer accent-[#1f3351] dark:accent-teal-400"
        />
        <div className="flex items-center gap-0.5 rounded-full bg-white p-1 ring-1 ring-[#e5e7eb] dark:bg-white/5 dark:ring-0">
          {SPEEDS.map((s) => (
            <button key={s} type="button" onClick={() => setSpeed(s)} className={pill(speed === s)}>
              {s}x
            </button>
          ))}
        </div>
        <div className="flex items-center gap-0.5 rounded-full bg-white p-1 ring-1 ring-[#e5e7eb] dark:bg-white/5 dark:ring-0">
          {([
            ["follow", Locate, "Follow"],
            ["free", Compass, "Free"],
            ["overview", MapIcon, "Overview"],
          ] as const).map(([mode, Icon, label]) => (
            <button key={mode} type="button" onClick={() => setCamera(mode)} className={pill(camera === mode)} aria-label={label}>
              <Icon size={13} />
              <span className="hidden md:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stops */}
      <ol className="mt-5 grid grid-cols-1 gap-1.5 sm:grid-cols-2 xl:grid-cols-3">
        {route.stops.map((name, i) => {
          const status = i < currentStop ? "passed" : i === currentStop ? "current" : "upcoming";
          return (
            <li key={`${i}-${name}`}>
              <button
                type="button"
                onClick={() => jumpToStop(i)}
                className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2 text-left text-sm transition ${
                  status === "current"
                    ? "border-[#1f3351] bg-[#1f3351] text-white dark:border-teal-400/60 dark:bg-teal-400/15"
                    : "border-transparent hover:border-[#e5e7eb] hover:bg-slate-50 dark:hover:border-white/10 dark:hover:bg-white/5"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                    status === "current"
                      ? "bg-white text-[#1f3351] dark:bg-teal-400 dark:text-[#06201d]"
                      : status === "passed"
                        ? "bg-teal-600 text-white dark:bg-teal-500/80"
                        : "border border-[#cbd5e1] text-[#64748b] dark:border-white/20 dark:text-slate-400"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className={`truncate ${
                    status === "current"
                      ? "font-semibold"
                      : status === "passed"
                        ? "text-[#162740] dark:text-slate-200"
                        : "text-[#596d86] dark:text-slate-400"
                  }`}
                >
                  {name}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default BusRouteTracker;
