import React, { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  label: string;
}

const STATS_DATA: StatItem[] = [
  { value: 100, label: "doctors" },
  { value: 350, label: "beds" },
  { value: 8500, label: "operations" },
  { value: 3500, label: "library books" },
  { value: 25, label: "acre campus" },
];

const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

const StatCounter: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || animatedRef.current) return;
          animatedRef.current = true;
          observer.disconnect();

          const duration = 2000;
          const startTime = performance.now();

          const updateCount = (currentTime: number) => {
            const elapsed = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.round(target * easeOutCubic(elapsed)));

            if (elapsed < 1) {
              requestAnimationFrame(updateCount);
            }
          };

          requestAnimationFrame(updateCount);
        });
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={elementRef}
      className="font-['DM_Sans',sans-serif] text-base xs:text-lg sm:text-2xl lg:text-3xl font-black leading-none text-[#1f3351] dark:text-white"
    >
      {count}+
    </div>
  );
};

export const HeroStats: React.FC = () => {
  return (
    <section className="w-[min(1050px,96%)] mx-auto">
      <div className="bg-white/95 backdrop-blur-md dark:bg-black/40 dark:backdrop-blur-2xl rounded-full px-2 py-2 sm:px-6 sm:py-2.5 lg:py-3 shadow-[0_14px_40px_rgba(8,44,76,0.18)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-[#0d2346]/20 dark:border-white/20 transition-all duration-300">
        <div className="grid grid-cols-5 items-center">
          {STATS_DATA.map((item, index) => {
            const isLast = index === STATS_DATA.length - 1;

            return (
              <div
                key={item.label}
                className={`flex flex-col items-center justify-center py-1 sm:py-1.5 px-0.5 sm:px-2 lg:px-4 text-center transition-colors duration-200 ${
                  isLast
                    ? "border-r-0"
                    : "border-r-[1.5px] sm:border-r-2 border-[#0d2346] dark:border-blue-400/50"
                }`}
              >
                <StatCounter target={item.value} />
                <span className="text-[7.5px] min-[380px]:text-[8.5px] sm:text-[10px] lg:text-[11px] font-bold text-[#1f3351]/80 dark:text-slate-300 uppercase tracking-tight sm:tracking-wider mt-0.5 sm:mt-1 text-center leading-tight">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroStats;
