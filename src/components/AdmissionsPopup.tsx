import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const POPUP_IMAGE = "/images/admissions-popup.png?v=2";

/** Admissions poster shown over the home page on every visit and refresh. */
export const AdmissionsPopup: React.FC = () => {
  const [open, setOpen] = useState(true);

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="PG admissions announcement"
    >
      <div
        className="relative max-h-full w-fit overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-[#0d1626]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <img
          src={POPUP_IMAGE}
          alt="PG / MD / MS admissions announcement. Admission enquiry: Dr. Ch. Achireddy, 9000994842"
          className="block max-h-[calc(100vh-2rem)] w-auto max-w-full object-contain sm:max-w-lg"
          onError={close}
        />
      </div>
    </div>
  );
};

export default AdmissionsPopup;
