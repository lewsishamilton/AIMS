import React, { useState, useEffect, useRef } from "react";

interface VisitorCounterProps {
  className?: string;
}

// ─── Single Cricket Scorecard Flip Digit (Compact) ───
interface FlipDigitProps {
  digit: string;
}

const CricketFlipDigit: React.FC<FlipDigitProps> = ({ digit }) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [prevDigit, setPrevDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit) {
      setPrevDigit(currentDigit);
      setCurrentDigit(digit);
      setIsFlipping(true);

      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 550); // matches complete flip cycle

      return () => clearTimeout(timer);
    }
  }, [digit, currentDigit]);

  return (
    <div className="relative w-4.5 sm:w-5.5 h-7 sm:h-8.5 select-none perspective-[400px]">
      {/* ─── Static Underlying Background (Pure black, unbroken, no lines anywhere) ─── */}
      <div className="absolute inset-0 flex items-center justify-center rounded-[2.5px] sm:rounded-[3px] overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.8)] bg-black">
        <span className="font-['Manrope',sans-serif] font-black text-sm sm:text-base text-white tracking-tight">
          {currentDigit}
        </span>
      </div>

      {/* ─── 3D Flipping Flaps (Only Active during Flip, Pure Black, No Lines/Borders) ─── */}
      {isFlipping && (
        <>
          {/* Falling Top Flap */}
          <div className="absolute top-0 inset-x-0 h-1/2 overflow-hidden bg-black rounded-t-[2.5px] sm:rounded-t-[3px] z-20 animate-cricket-flip-top">
            <div className="absolute top-0 left-0 right-0 h-[200%] flex items-center justify-center font-['Manrope',sans-serif] font-black text-sm sm:text-base text-white tracking-tight">
              {prevDigit}
            </div>
          </div>

          {/* Unfolding Bottom Flap */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 overflow-hidden bg-black rounded-b-[2.5px] sm:rounded-b-[3px] z-20 animate-cricket-flip-bottom">
            <div className="absolute bottom-0 left-0 right-0 h-[200%] flex items-center justify-center font-['Manrope',sans-serif] font-black text-sm sm:text-base text-white tracking-tight">
              {currentDigit}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ─── Scorecard Box for Each Metric (Transparent, without bulky background or border) ───
const CricketScoreBox: React.FC<{
  title: string;
  count: number;
  digitsCount?: number;
}> = ({ title, count, digitsCount = 5 }) => {
  const formattedString = String(Math.max(0, count)).padStart(digitsCount, "0");
  const digits = formattedString.split("");

  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <span className="text-[10px] sm:text-[11px] font-bold text-white/70 uppercase tracking-widest font-['Manrope',sans-serif] mb-1.5">
        {title}
      </span>

      {/* Row of Cricket Flap Boards - clean, flat, transparent background */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        {digits.map((d, idx) => (
          <CricketFlipDigit key={idx} digit={d} />
        ))}
      </div>
    </div>
  );
};

export const VisitorCounter: React.FC<VisitorCounterProps> = ({ className = "" }) => {
  const [todayVisitors, setTodayVisitors] = useState<number>(1240);
  const [totalVisitors, setTotalVisitors] = useState<number>(34820);
  const lastTickRef = useRef<number>(Date.now());

  // Helper to format Date strings
  const getTodayStr = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  const getMonthStr = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

  // Initialize and synchronize with localStorage on mount
  useEffect(() => {
    const now = new Date();
    const todayStr = getTodayStr(now);
    const monthStr = getMonthStr(now);

    // Calculate elapsed 2-minute intervals since today's midnight (00:00:00)
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const msElapsedToday = now.getTime() - midnight;
    const intervalsToday = Math.max(0, Math.floor(msElapsedToday / (2 * 60 * 1000)));

    // Base counts for realistic institution scale
    const baseTodayStarting = 420;
    const calculatedToday = baseTodayStarting + intervalsToday * 2;

    // Month calculation (days elapsed in this month)
    const dayOfMonth = now.getDate();
    const baseMonthStarting = 18500 + (dayOfMonth - 1) * 1440;
    const calculatedTotal = baseMonthStarting + intervalsToday * 2;

    // Load or initialize Today's Visitors
    let initialToday = calculatedToday;
    try {
      const storedToday = localStorage.getItem("aims_visitor_today");
      if (storedToday) {
        const parsed = JSON.parse(storedToday);
        if (parsed.date === todayStr && typeof parsed.count === "number") {
          const missedIntervals = Math.max(
            0,
            Math.floor((now.getTime() - (parsed.lastUpdated || now.getTime())) / (2 * 60 * 1000))
          );
          initialToday = Math.max(parsed.count + missedIntervals * 2, calculatedToday);
        }
      }
    } catch {
      // Use fallback
    }

    // Load or initialize Total/Monthly Visitors
    let initialTotal = calculatedTotal;
    try {
      const storedTotal = localStorage.getItem("aims_visitor_total");
      if (storedTotal) {
        const parsed = JSON.parse(storedTotal);
        if (parsed.month === monthStr && typeof parsed.count === "number") {
          const missedIntervals = Math.max(
            0,
            Math.floor((now.getTime() - (parsed.lastUpdated || now.getTime())) / (2 * 60 * 1000))
          );
          initialTotal = Math.max(parsed.count + missedIntervals * 2, calculatedTotal);
        }
      }
    } catch {
      // Use fallback
    }

    setTodayVisitors(initialToday);
    setTotalVisitors(initialTotal);
    lastTickRef.current = now.getTime();

    // Persist initial state
    try {
      localStorage.setItem(
        "aims_visitor_today",
        JSON.stringify({ date: todayStr, count: initialToday, lastUpdated: now.getTime() })
      );
      localStorage.setItem(
        "aims_visitor_total",
        JSON.stringify({ month: monthStr, count: initialTotal, lastUpdated: now.getTime() })
      );
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Simulation timer: increments count of 2 people every 2 minutes (120,000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const todayStr = getTodayStr(now);
      const monthStr = getMonthStr(now);

      setTodayVisitors((prevToday) => {
        let newToday = prevToday + 2;

        // Check if date crossed midnight (reset daily)
        try {
          const storedToday = localStorage.getItem("aims_visitor_today");
          if (storedToday) {
            const parsed = JSON.parse(storedToday);
            if (parsed.date !== todayStr) {
              newToday = 20; // Fresh day reset
            }
          }
          localStorage.setItem(
            "aims_visitor_today",
            JSON.stringify({ date: todayStr, count: newToday, lastUpdated: now.getTime() })
          );
        } catch {
          // Ignore
        }
        return newToday;
      });

      setTotalVisitors((prevTotal) => {
        let newTotal = prevTotal + 2;

        // Check if month crossed (reset monthly)
        try {
          const storedTotal = localStorage.getItem("aims_visitor_total");
          if (storedTotal) {
            const parsed = JSON.parse(storedTotal);
            if (parsed.month !== monthStr) {
              newTotal = 150; // Fresh month reset
            }
          }
          localStorage.setItem(
            "aims_visitor_total",
            JSON.stringify({ month: monthStr, count: newTotal, lastUpdated: now.getTime() })
          );
        } catch {
          // Ignore
        }
        return newTotal;
      });

      lastTickRef.current = now.getTime();
    }, 120000); // 2 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`w-full flex items-center justify-center ${className}`}>
      {/* Clean, transparent container - no blue/gray wrapper, no border, no line in between */}
      <div className="inline-flex flex-row items-center justify-center gap-6 sm:gap-10 py-1">
        {/* Box 1: Today Visitors */}
        <CricketScoreBox
          title="Today's Visitors"
          count={todayVisitors}
          digitsCount={5}
        />

        {/* Box 2: Total Visitors */}
        <CricketScoreBox
          title="Total Visitors"
          count={totalVisitors}
          digitsCount={6}
        />
      </div>

      {/* ─── Global Keyframe Animations for Split-Flap Flip ─── */}
      <style>{`
        @keyframes cricketFlipTop {
          0% {
            transform: rotateX(0deg);
          }
          100% {
            transform: rotateX(-90deg);
          }
        }
        @keyframes cricketFlipBottom {
          0% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
        .animate-cricket-flip-top {
          animation: cricketFlipTop 0.25s cubic-bezier(0.37, 0, 0.63, 1) forwards;
          transform-origin: bottom;
          backface-visibility: hidden;
          will-change: transform;
        }
        .animate-cricket-flip-bottom {
          animation: cricketFlipBottom 0.25s cubic-bezier(0.37, 0, 0.63, 1) 0.25s forwards;
          transform-origin: top;
          backface-visibility: hidden;
          transform: rotateX(90deg);
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default VisitorCounter;
