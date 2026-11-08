import React, { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

/** Space kept free around a poster so it never touches the viewport edges. */
const MARGIN = 16;
/** Keep floating posters below the fixed navbar. */
const TOP_INSET = 84;
/** Extra breathing room used when steering away from another poster. */
const AVOID_PADDING = 14;

export type FloatingPosterProps = {
  /** Image source for the poster. */
  src: string;
  alt: string;
  /** Accessible name for the floating region. */
  label: string;
  closeLabel: string;
  /** Unique id exposed as data-floating-poster so other posters can avoid it. */
  posterId: string;
  /** Tailwind width classes. */
  widthClass?: string;
  /** Corner the poster starts in. */
  start?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  /** Drift speed in pixels per millisecond. */
  speedX?: number;
  speedY?: number;
  /** CSS selector of another floating poster to steer away from. */
  avoidSelector?: string;
  /** Keep the poster fixed in the middle of the viewport instead of drifting. */
  staticCentered?: boolean;
  zIndexClass?: string;
};

type Point = { x: number; y: number };

/**
 * A poster that floats above the page, slowly drifts around the viewport and
 * bounces off the edges. It can be dragged out of the way or dismissed with
 * the X button (or Escape).
 */
export const FloatingPoster: React.FC<FloatingPosterProps> = ({
  src,
  alt,
  label,
  closeLabel,
  posterId,
  widthClass = "w-[min(44vw,180px,38svh)] sm:w-[min(210px,38svh)]",
  start = "bottom-right",
  speedX = -0.055,
  speedY = -0.035,
  avoidSelector,
  staticCentered = false,
  zIndexClass = "z-[70]",
}) => {
  const [open, setOpen] = useState(true);
  const [dragging, setDragging] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const posterRef = useRef<HTMLDivElement | null>(null);

  const posRef = useRef<Point>({ x: 0, y: 0 });
  const velRef = useRef<Point>({ x: speedX, y: speedY });
  const pausedRef = useRef(false);
  const placedRef = useRef(false);
  const dragRef = useRef<{ pointerId: number; dx: number; dy: number } | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open || staticCentered) return;
    const card = cardRef.current;
    const poster = posterRef.current;
    if (!card || !poster) return;

    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = reduceQuery.matches;

    const bounds = () => {
      const vw = document.documentElement.clientWidth;
      const vh = document.documentElement.clientHeight;
      return {
        minX: MARGIN,
        maxX: Math.max(MARGIN, vw - card.offsetWidth - MARGIN),
        minY: TOP_INSET,
        maxY: Math.max(TOP_INSET, vh - card.offsetHeight - MARGIN),
      };
    };

    const clampPos = () => {
      const b = bounds();
      posRef.current.x = Math.min(Math.max(posRef.current.x, b.minX), b.maxX);
      posRef.current.y = Math.min(Math.max(posRef.current.y, b.minY), b.maxY);
    };

    if (!placedRef.current) {
      placedRef.current = true;
      velRef.current = { x: speedX, y: speedY };

      const b = bounds();
      const nearBottom = start === "bottom-right" || start === "bottom-left";
      const nearRight = start === "bottom-right" || start === "top-right";
      posRef.current = {
        x: nearRight ? b.maxX : b.minX,
        y: nearBottom
          ? Math.max(b.minY, b.maxY - 80)
          : Math.min(b.maxY, b.minY + 48),
      };
    }
    clampPos();

    const avoidEl = avoidSelector
      ? document.querySelector<HTMLElement>(avoidSelector)
      : null;

    /** Push this poster clear of the other floating poster if they touch. */
    const resolveOverlap = () => {
      if (!avoidEl || !avoidEl.isConnected) return;

      const w = card.offsetWidth;
      const h = card.offsetHeight;
      const pos = posRef.current;
      const vel = velRef.current;
      const other = avoidEl.getBoundingClientRect();

      const left = pos.x;
      const top = pos.y;
      const right = pos.x + w;
      const bottom = pos.y + h;
      const oLeft = other.left - AVOID_PADDING;
      const oTop = other.top - AVOID_PADDING;
      const oRight = other.right + AVOID_PADDING;
      const oBottom = other.bottom + AVOID_PADDING;

      const overlapX = Math.min(right, oRight) - Math.max(left, oLeft);
      const overlapY = Math.min(bottom, oBottom) - Math.max(top, oTop);
      if (overlapX <= 0 || overlapY <= 0) return;

      const centerX = left + w / 2;
      const centerY = top + h / 2;
      const otherCenterX = (oLeft + oRight) / 2;
      const otherCenterY = (oTop + oBottom) / 2;

      if (overlapX < overlapY) {
        const dir = centerX <= otherCenterX ? -1 : 1;
        pos.x += dir * (overlapX + 1);
        vel.x = dir * Math.abs(vel.x);
      } else {
        const dir = centerY <= otherCenterY ? -1 : 1;
        pos.y += dir * (overlapY + 1);
        vel.y = dir * Math.abs(vel.y);
      }
      clampPos();
    };

    let raf = 0;
    let last = performance.now();
    let elapsed = 0;

    const render = () => {
      card.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      poster.style.transform = reduced
        ? "none"
        : `rotate(${Math.sin(elapsed / 1600) * 2.2}deg)`;
    };

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50);
      last = now;
      elapsed += dt;

      if (!reduced && !pausedRef.current && !dragRef.current) {
        const b = bounds();
        const pos = posRef.current;
        const vel = velRef.current;

        pos.x += vel.x * dt;
        pos.y += vel.y * dt;

        if (pos.x <= b.minX) {
          pos.x = b.minX;
          vel.x = Math.abs(vel.x);
        } else if (pos.x >= b.maxX) {
          pos.x = b.maxX;
          vel.x = -Math.abs(vel.x);
        }

        if (pos.y <= b.minY) {
          pos.y = b.minY;
          vel.y = Math.abs(vel.y);
        } else if (pos.y >= b.maxY) {
          pos.y = b.maxY;
          vel.y = -Math.abs(vel.y);
        }

        resolveOverlap();
      }

      render();
      raf = window.requestAnimationFrame(tick);
    };

    render();
    raf = window.requestAnimationFrame(tick);

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      dragRef.current = {
        pointerId: e.pointerId,
        dx: e.clientX - posRef.current.x,
        dy: e.clientY - posRef.current.y,
      };
      poster.setPointerCapture(e.pointerId);
      setDragging(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      posRef.current.x = e.clientX - drag.dx;
      posRef.current.y = e.clientY - drag.dy;
      clampPos();
    };

    const endDrag = (e: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== e.pointerId) return;
      dragRef.current = null;
      pausedRef.current = poster.matches(":hover");
      setDragging(false);
    };

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      if (!dragRef.current) pausedRef.current = false;
    };

    const onResize = () => clampPos();
    const onReduceChange = (event: MediaQueryListEvent) => {
      reduced = event.matches;
    };

    poster.addEventListener("pointerdown", onPointerDown);
    poster.addEventListener("pointermove", onPointerMove);
    poster.addEventListener("pointerup", endDrag);
    poster.addEventListener("pointercancel", endDrag);
    poster.addEventListener("pointerenter", pause);
    poster.addEventListener("pointerleave", resume);
    poster.addEventListener("focusin", pause);
    poster.addEventListener("focusout", resume);
    window.addEventListener("resize", onResize);
    reduceQuery.addEventListener("change", onReduceChange);

    return () => {
      window.cancelAnimationFrame(raf);
      poster.removeEventListener("pointerdown", onPointerDown);
      poster.removeEventListener("pointermove", onPointerMove);
      poster.removeEventListener("pointerup", endDrag);
      poster.removeEventListener("pointercancel", endDrag);
      poster.removeEventListener("pointerenter", pause);
      poster.removeEventListener("pointerleave", resume);
      poster.removeEventListener("focusin", pause);
      poster.removeEventListener("focusout", resume);
      window.removeEventListener("resize", onResize);
      reduceQuery.removeEventListener("change", onReduceChange);
    };
  }, [open, start, speedX, speedY, avoidSelector, staticCentered]);

  if (!open) return null;

  const styleTag = (
    <style>{`
      @keyframes floatingPosterIn {
        from { opacity: 0; transform: translateY(14px) scale(0.92); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
      .floating-poster-enter {
        animation: floatingPosterIn 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
      }
      @media (prefers-reduced-motion: reduce) {
        .floating-poster-enter { animation: none; }
      }
    `}</style>
  );

  const posterCard = (
    <div className="floating-poster-enter">
      <div
        ref={posterRef}
        data-floating-poster={posterId}
        role="complementary"
        aria-label={label}
        className={`relative ${widthClass} select-none ${
          staticCentered ? "" : dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={staticCentered ? undefined : { touchAction: "none" }}
      >
        <button
          type="button"
          onClick={close}
          aria-label={closeLabel}
          className="absolute -right-2.5 -top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-[#0d2346] text-white shadow-lg transition hover:bg-[#122e57] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] focus-visible:ring-offset-2"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="overflow-hidden rounded-xl border border-white/25 bg-white shadow-[0_18px_45px_rgba(0,0,0,0.4)] dark:border-white/15">
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="block h-auto w-full"
            onError={close}
          />
        </div>
      </div>
    </div>
  );

  if (staticCentered) {
    return (
      <>
        {styleTag}
        <div
          className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${zIndexClass} print:hidden`}
        >
          {posterCard}
        </div>
      </>
    );
  }

  return (
    <>
      {styleTag}
      <div
        ref={cardRef}
        className={`fixed left-0 top-0 ${zIndexClass} will-change-transform print:hidden`}
      >
        {posterCard}
      </div>
    </>
  );
};

export default FloatingPoster;
