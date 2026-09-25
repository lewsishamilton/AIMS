import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import { FileText, Download, ExternalLink } from "lucide-react";
import { useLocation } from "react-router-dom";
import PageHero from "../components/PageHero";

// Worker configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  title?: string;
  subtitle?: string;
  kicker?: string;
  pdf?: string;
  pdfUrl?: string;
}

export const PdfViewerSection: React.FC<PdfViewerProps> = ({
  title = "Institutional Brochure & Guidelines",
  subtitle,
  kicker = "Committees",
  pdf,
  pdfUrl,
}) => {
  const resolvedPdfUrl = pdf || pdfUrl || "";
  const { pathname } = useLocation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(resolvedPdfUrl));
  const [pageCount, setPageCount] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    if (!resolvedPdfUrl) {
      return;
    }

    const renderPdf = async (): Promise<void> => {
      try {
        setIsLoading(true);
        setHasError(false);
        const loadingTask = pdfjsLib.getDocument({ url: resolvedPdfUrl });
        const pdfDoc: PDFDocumentProxy = await loadingTask.promise;

        if (isCancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        setPageCount(pdfDoc.numPages);

        // Render at the container's real width × device pixel ratio so pages stay crisp
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const cssWidth = containerRef.current.clientWidth || 900;

        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
          const page: PDFPageProxy = await pdfDoc.getPage(pageNum);
          const scale = cssWidth / page.getViewport({ scale: 1 }).width;
          const viewport = page.getViewport({ scale: scale * dpr });

          const canvas: HTMLCanvasElement = document.createElement("canvas");
          const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

          canvas.height = viewport.height;
          canvas.width = viewport.width;
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.className = "block rounded-[14px] bg-white";

          if (context) {
            await page.render({
              canvas,
              canvasContext: context,
              viewport: viewport,
            }).promise;
          }

          if (isCancelled || !containerRef.current) return;

          const pageWrap = document.createElement("figure");
          pageWrap.className =
            "w-full mb-7 last:mb-0 rounded-[16px] overflow-hidden border border-[#dce8ee] dark:border-white/10 bg-white shadow-[0_10px_30px_rgba(8,44,76,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]";

          const caption = document.createElement("figcaption");
          caption.className =
            "flex items-center justify-between px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#62748a] dark:text-slate-400 bg-[#f8fafc] dark:bg-white/[0.04] border-t border-[#eef3f6] dark:border-white/10";
          caption.innerHTML = `<span>Page ${pageNum}</span><span>${pdfDoc.numPages} pages total</span>`;

          pageWrap.appendChild(canvas);
          pageWrap.appendChild(caption);
          containerRef.current.appendChild(pageWrap);
        }
      } catch (error: unknown) {
        console.error("Error rendering PDF pages:", error);
        if (!isCancelled) setHasError(true);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void renderPdf();

    return () => {
      isCancelled = true;
    };
  }, [resolvedPdfUrl]);

  return (
    <div className="atmos-page min-h-screen bg-[#fbfaf5] tracking-[0.015em] transition-colors duration-300 dark:bg-transparent">
      <PageHero eyebrow={kicker} title={title} subtitle={subtitle} pathname={pathname} />

      <section className="relative overflow-hidden pb-20 pt-12 lg:pb-28 lg:pt-16">
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-4 sm:px-10 lg:px-16">

        {/* Document card */}
        <div className="relative rounded-[26px] border border-[#dce8ee] dark:border-white/15 bg-white dark:bg-white/[0.04] shadow-[0_16px_40px_rgba(8,44,76,0.10)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Card toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-[#eef3f6] dark:border-white/10 bg-[#f8fafc] dark:bg-white/[0.04]">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-[#1f3351] dark:bg-teal-500/20 text-white dark:text-teal-300">
                <FileText className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <p className="font-['Manrope',sans-serif] text-sm sm:text-base font-bold text-[#1f3351] dark:text-white truncate">
                  {title}
                </p>
                <p className="text-xs text-[#62748a] dark:text-slate-400 tracking-wide">
                  Official document{pageCount > 0 ? ` · ${pageCount} page${pageCount > 1 ? "s" : ""}` : ""}
                </p>
              </div>
            </div>

            {resolvedPdfUrl && (
              <div className="flex items-center gap-2.5">
                <a
                  href={resolvedPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-[13px] font-semibold border border-[#dce8ee] dark:border-white/15 text-[#1f3351] dark:text-white bg-white dark:bg-white/10 hover:bg-[#f1f5f9] dark:hover:bg-white/15 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="hidden sm:inline">Open</span>
                </a>
                <a
                  href={resolvedPdfUrl}
                  download
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-[13px] font-semibold bg-[#1f3351] dark:bg-teal-500 text-white hover:bg-[#16263e] dark:hover:bg-teal-400 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Download</span>
                </a>
              </div>
            )}
          </div>

          {/* Pages */}
          <div className="relative w-full p-4 sm:p-6 lg:p-8">
            {isLoading && (
              <div className="flex flex-col items-center justify-center min-h-[420px] rounded-[16px] border border-dashed border-[#dce8ee] dark:border-white/15 bg-[#f8fafc] dark:bg-white/[0.03]">
                <div className="w-10 h-10 border-4 border-[#dce8ee] dark:border-white/20 border-t-[#1f3351] dark:border-t-teal-400 rounded-full animate-spin mb-3" />
                <p className="text-xs font-bold text-[#62748a] dark:text-slate-400 uppercase tracking-wider">
                  Loading Document...
                </p>
              </div>
            )}

            {hasError && (
              <div className="flex flex-col items-center justify-center text-center min-h-[320px] rounded-[16px] border border-dashed border-[#dce8ee] dark:border-white/15 bg-[#f8fafc] dark:bg-white/[0.03] px-6">
                <p className="font-['Manrope',sans-serif] text-lg font-bold text-[#1f3351] dark:text-white mb-1.5">
                  This document could not be displayed
                </p>
                <p className="text-sm text-[#62748a] dark:text-slate-400 mb-5">
                  You can still open or download the original PDF.
                </p>
                <a
                  href={resolvedPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold bg-[#1f3351] dark:bg-teal-500 text-white hover:bg-[#16263e] dark:hover:bg-teal-400 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open PDF
                </a>
              </div>
            )}

            <div ref={containerRef} className="w-full flex flex-col items-center" />
          </div>
        </div>
      </div>
      </section>
    </div>
  );
};

export default PdfViewerSection;
