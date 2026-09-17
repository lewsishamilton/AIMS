import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

// Worker configuration
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  title?: string;
  subtitle?: string;
  pdf?: string;
  pdfUrl?: string;
}

export const PdfViewerSection: React.FC<PdfViewerProps> = ({
  title = "Institutional Brochure & Guidelines",
  subtitle,
  pdf,
  pdfUrl,
}) => {
  const resolvedPdfUrl = pdf || pdfUrl || "";
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(Boolean(resolvedPdfUrl));

  useEffect(() => {
    let isCancelled = false;

    if (!resolvedPdfUrl) {
      return;
    }

    const renderPdf = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const loadingTask = pdfjsLib.getDocument({ url: resolvedPdfUrl });
        const pdfDoc: PDFDocumentProxy = await loadingTask.promise;

        if (isCancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";

        for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
          const page: PDFPageProxy = await pdfDoc.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas: HTMLCanvasElement = document.createElement("canvas");
          const context: CanvasRenderingContext2D | null = canvas.getContext("2d");

          canvas.height = viewport.height;
          canvas.width = viewport.width;
          canvas.className = "w-full h-auto mb-6 last:mb-0 rounded-[14px] shadow-sm block";

          if (context) {
            await page.render({
              canvas,
              canvasContext: context,
              viewport: viewport,
            }).promise;
          }

          if (!isCancelled && containerRef.current) {
            containerRef.current.appendChild(canvas);
          }
        }
      } catch (error: unknown) {
        console.error("Error rendering PDF pages:", error);
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
    <section className="relative py-16 lg:py-24 bg-[#fbfaf5] overflow-hidden tracking-[0.015em]">
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-4 sm:px-10 lg:px-16">
        
        {/* Main Heading & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
          <h2 className="font-['Manrope',sans-serif] text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-[1.15] tracking-tight text-[#1f3351]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-base sm:text-lg leading-relaxed text-[#62748a] mt-3">
              {subtitle}
            </p>
          )}
        </div>

        {/* Pure Canvas Container (Transparent) */}
        <div className="relative w-full bg-transparent p-0">
          {isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-10 h-10 border-4 border-[#dce8ee] border-t-[#1f3351] rounded-full animate-spin mb-3" />
              <p className="text-xs font-bold text-[#62748a] uppercase tracking-wider">
                Loading Document...
              </p>
            </div>
          )}

          <div ref={containerRef} className="w-full flex flex-col items-center" />
        </div>

      </div>
    </section>
  );
};

export default PdfViewerSection;