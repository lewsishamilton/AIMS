import React from "react";
import FloatingPoster from "./FloatingPoster";

const POPUP_IMAGE = "/images/admissions-popup.png?v=3";

/**
 * Existing admissions poster, fixed in the center of the home page.
 *
 * The artwork is 2:3 (1024x1536), so width drives height; the cap keeps the
 * whole card inside the viewport on short laptop screens.
 */
export const AdmissionsPopup: React.FC = () => (
  <FloatingPoster
    src={POPUP_IMAGE}
    alt="PG / MD / MS admissions announcement. Admission enquiry: Dr. Ch. Achireddy, 9000994842"
    label="Admissions announcement poster"
    closeLabel="Close admissions poster"
    posterId="admissions"
    staticCentered
    widthClass="w-[min(86vw,400px,54svh)]"
  />
);

export default AdmissionsPopup;
