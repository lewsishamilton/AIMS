import React, { useEffect, useState } from "react";
import { PhoneCall, X } from "lucide-react";

const POPUP_IMAGE = "/images/admissions-popup.png";
const ADMISSIONS_TEL = "tel:+919000994842";
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
        className="relative flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-[#0d1626]"
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
          alt="PG / MS admissions announcement"
          className="max-h-[calc(100vh-7rem)] min-h-0 w-full flex-1 object-contain"
          onError={close}
        />

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 bg-[#0d2346] px-4 py-3 text-center text-sm font-semibold text-white sm:text-[15px]">
          <span>
            Admission Enquiry - <span className="text-[#e6c98a]">Dr. Ch. Achireddy</span>
          </span>
          <span aria-hidden="true" className="text-white/40">
            -
          </span>
          <a
            href={ADMISSIONS_TEL}
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-[#e6c98a] underline-offset-4 hover:underline"
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            +91 90009 94842
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdmissionsPopup;
