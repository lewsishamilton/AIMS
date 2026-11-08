import React, { useEffect, useState } from "react";
import FloatingPoster from "./FloatingPoster";

/**
 * Diwali celebration poster, shown alongside the existing admissions poster.
 * Source image lives at public/images/aims-diwali-poster.png.
 */
const NEW_POSTER_IMAGE = "/images/aims-diwali-poster.png";

/**
 * The poster disappears automatically after 9 November 2026, 8:00 AM IST.
 * The check runs in the browser, so the deployed site stops showing it even
 * without another deploy.
 */
const POSTER_EXPIRES_AT = new Date("2026-11-09T08:00:00+05:30").getTime();

export const NewPosterPopup: React.FC = () => {
  const [visible, setVisible] = useState(() => Date.now() < POSTER_EXPIRES_AT);

  useEffect(() => {
    if (!visible) return;

    const remaining = POSTER_EXPIRES_AT - Date.now();
    if (remaining <= 0) {
      setVisible(false);
      return;
    }

    // A visitor who keeps the page open across 8:00 AM also loses the poster.
    const timer = window.setTimeout(() => setVisible(false), remaining);
    return () => window.clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <FloatingPoster
      src={NEW_POSTER_IMAGE}
      alt="AIMS Happy Diwali celebration poster"
      label="Diwali celebration poster"
      closeLabel="Close Diwali poster"
      posterId="announcement"
      start="top-left"
      speedX={0.05}
      speedY={0.03}
      widthClass="w-[min(56vw,260px,42svh)] sm:w-[min(280px,42svh)]"
    />
  );
};

export default NewPosterPopup;
