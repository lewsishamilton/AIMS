import React, { useRef, useState } from "react";
import { ChevronRight, Info, Search } from "lucide-react";
import PageHero from "../components/PageHero";
import BusRouteTracker from "../components/BusRouteTracker";
import { useTheme } from "../context/ThemeContext";
import { BUS_ROUTES } from "../data/busRoutesData";

/** A few stops spread across the middle of the route, for the list preview. */
const via = (stops: string[]) => [0.25, 0.5, 0.75].map((f) => stops[Math.round(f * (stops.length - 1))]).join(", ");

const TransportPage: React.FC = () => {
  const { theme } = useTheme();
  const [selectedNo, setSelectedNo] = useState(1);
  const [query, setQuery] = useState("");
  const trackerRef = useRef<HTMLDivElement>(null);

  const q = query.trim().toLowerCase();
  const routes = BUS_ROUTES.filter(
    (r) => !q || String(r.no) === q || r.stops.some((s) => s.toLowerCase().includes(q))
  );
  const selected = BUS_ROUTES.find((r) => r.no === selectedNo)!;

  const view = (no: number) => {
    setSelectedNo(no);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      trackerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="atmos-page min-h-screen bg-[#FAF9F5] tracking-[0.015em] transition-colors duration-300 dark:bg-transparent">
      <PageHero
        eyebrow="Campus Transport"
        title="College Bus Routes"
        subtitle={`${BUS_ROUTES.length} college bus routes connect Hyderabad, Secunderabad and Sangareddy to the campus at Dundigal. Find the bus that passes your area, preview its path on the map and call the route incharge directly.`}
        pathname="/facilities/transport"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 pb-20 pt-8 sm:px-8 sm:pt-12 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Route picker */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search your area or stop, e.g. Miyapur"
                className="w-full rounded-2xl border border-[#e5e7eb] bg-white py-3 pl-11 pr-4 text-sm text-[#162740] outline-none transition placeholder:text-[#94a3b8] focus:border-[#1f3351] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-teal-400"
              />
            </label>
            <p className="mt-3 px-1 text-xs font-semibold uppercase tracking-wider text-[#64748b] dark:text-slate-400">
              {routes.length} of {BUS_ROUTES.length} routes
            </p>

            <ul className="mt-2 flex max-h-[420px] flex-col gap-1.5 overflow-y-auto pr-1 lg:max-h-[calc(100vh-15rem)]">
              {routes.map((r) => {
                const active = r.no === selectedNo;
                const match = q && r.stops.find((s) => s.toLowerCase().includes(q));
                return (
                  <li key={r.no}>
                    <button
                      type="button"
                      onClick={() => view(r.no)}
                      className={`group flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition ${
                        active
                          ? "border-[#1f3351] bg-[#1f3351] text-white shadow-sm dark:border-teal-400/50 dark:bg-teal-400/10"
                          : "border-[#e5e7eb] bg-white hover:border-[#1f3351]/40 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/25"
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold tabular-nums ${
                          active
                            ? "bg-white/15 text-white dark:bg-teal-400 dark:text-[#06201d]"
                            : "bg-[#1f3351]/[0.07] text-[#1f3351] dark:bg-white/10 dark:text-teal-300"
                        }`}
                      >
                        {String(r.no).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate text-sm font-semibold ${active ? "" : "text-[#162740] dark:text-white"}`}>
                          {r.stops[0]}
                        </span>
                        <span className={`block truncate text-xs ${active ? "text-white/70" : "text-[#64748b] dark:text-slate-400"}`}>
                          {match ? `Stops at ${match}` : `via ${via(r.stops)}`}
                        </span>
                      </span>
                      <span
                        className={`flex shrink-0 items-center text-[11px] font-bold uppercase tracking-wider ${
                          active ? "text-teal-300" : "text-[#94a3b8] group-hover:text-[#1f3351] dark:group-hover:text-teal-300"
                        }`}
                      >
                        View <ChevronRight className="h-3.5 w-3.5" />
                      </span>
                    </button>
                  </li>
                );
              })}
              {routes.length === 0 && (
                <li className="rounded-2xl border border-dashed border-[#cbd5e1] px-4 py-8 text-center text-sm text-[#64748b] dark:border-white/15 dark:text-slate-400">
                  No route stops at “{query}”. Try a nearby area, or contact the transport office.
                </li>
              )}
            </ul>
          </aside>

          {/* Selected route */}
          <section ref={trackerRef} className="scroll-mt-24 lg:col-span-8">
            <BusRouteTracker key={`${selected.no}-${theme}`} route={selected} />
            <p className="mt-4 flex gap-2 px-1 text-xs leading-relaxed text-[#64748b] dark:text-slate-400">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              The map is an animated preview of the route, not live GPS tracking. Stop positions are approximate — for
              pick-up timings, call the route incharge.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TransportPage;
