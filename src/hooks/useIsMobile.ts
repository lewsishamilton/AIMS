import { useSyncExternalStore } from "react";

/**
 * True while the viewport is at or below `maxWidth` (default 767px, matching the
 * phone-only motion breakpoint in index.css). Re-renders on resize, live.
 */
export function useIsMobile(maxWidth = 767): boolean {
  const query = `(max-width: ${maxWidth}px)`;

  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export default useIsMobile;
