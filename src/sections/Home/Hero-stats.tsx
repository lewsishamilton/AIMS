import React, { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  label: string;
}

const STATS_DATA: StatItem[] = [
  { value: 100, label: "doctors" },
  { value: 350, label: "beds" },
  { value: 850, label: "operations" },
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
      className="font-['Manrope',sans-serif] text-2xl sm:text-3xl font-extrabold leading-none text-[#1f3351]"
    >
      {count}+
    </div>
  );
};

export const HeroStats: React.FC = () => {
  return (
    <section className="w-[min(1050px,94%)] mx-auto">
      <div className="bg-white/95 backdrop-blur-md rounded-full px-6 py-2.5 sm:py-3 shadow-[0_18px_50px_rgba(8,44,76,0.18)] border border-white/60">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 items-center divide-y lg:divide-y-0 lg:divide-x divide-[#dce8ee]">
          {STATS_DATA.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center justify-center py-1.5 px-3 text-center"
            >
              <StatCounter target={item.value} />
              <span className="text-[11px] font-semibold text-[#62748a] uppercase tracking-wider mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroStats;