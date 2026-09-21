import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, ZoomIn, X } from 'lucide-react';
import type { ChronicleItem } from '../../data/newsChroniclesData';
import './ChronicleCard.css';

interface ChronicleCardProps {
  chronicle: ChronicleItem;
  _index?: number;
  total?: number;
  isActive: boolean;
  motionStyles?: {
    cardScale?: any;
    cardOpacity?: any;
    cardY?: any;
    imageScale?: any;
    imageY?: any;
    textY?: any;
    textOpacity?: any;
    numberY?: any;
  };
}

export default function ChronicleCard({ 
  chronicle, 
  isActive, 
  motionStyles = {} 
}: ChronicleCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { number, title, category, tags, description, supportingContent, image } = chronicle;
  const {
    cardScale,
    cardOpacity,
    cardY,
    imageScale,
    imageY,
    textY,
    textOpacity,
    numberY
  } = motionStyles;

  return (
    <motion.article 
      className={`chronicle-compact-card ${isActive ? 'is-active-card' : ''}`}
      id={`chronicle-${number}`}
      style={{
        scale: cardScale,
        opacity: cardOpacity,
        y: cardY
      }}
    >
      <div className="compact-card-inner">
        {/* LEFT COLUMN: Editorial Metadata, Title & Content */}
        <div className="compact-card-left">
          {/* Header Row: Big Number & Category Badge */}
          <div className="compact-header-row">
            <motion.span 
              className="compact-chapter-num display-font"
              style={{ y: numberY }}
            >
              {number}
            </motion.span>
            <div className="compact-category-wrap">
              <span className="compact-category-pill">{category}</span>
            </div>
            <span className="compact-archive-edition">AIMS EDITORIAL ARCHIVE</span>
          </div>

          {/* Chronicle Title */}
          <div className="compact-title-wrap">
            <h3 className="compact-card-title display-font">{title}</h3>
          </div>

          {/* Editorial Chronicle Content Section */}
          <div className="compact-card-body">
            <motion.p 
              className="compact-card-description primary-lead"
              style={{
                y: textY,
                opacity: textOpacity
              }}
            >
              {description}
            </motion.p>

            {supportingContent && supportingContent.map((paragraph, pIdx) => (
              <p key={pIdx} className="compact-card-supporting-text">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags Footer */}
          <div className="compact-meta-footer">
            <div className="compact-tags-list">
              {tags && tags.map((tag, tIdx) => (
                <span key={tIdx} className="compact-tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Large Archival Chronicle Image Frame */}
        <div className="compact-card-right">
          <motion.div 
            className={`compact-image-frame-box ${image ? 'has-image' : ''}`}
            style={{
              scale: imageScale,
              y: imageY
            }}
          >
            {/* Corner Crosshairs */}
            <span className="crosshair-tl" aria-hidden="true"></span>
            <span className="crosshair-tr" aria-hidden="true"></span>
            <span className="crosshair-bl" aria-hidden="true"></span>
            <span className="crosshair-br" aria-hidden="true"></span>

            {image ? (
              <div 
                className="w-full h-full cursor-zoom-in group/frame relative flex items-center justify-center"
                onClick={() => setIsModalOpen(true)}
                title="Click to view full clipping"
              >
                <img 
                  src={image} 
                  alt={`AIMS Chronicle ${number}`} 
                  className="compact-card-img"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/15 dark:bg-black/40 opacity-0 group-hover/frame:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 text-[#1c1c1c] dark:bg-[#0b1628]/95 dark:text-[#5eead4] dark:ring-1 dark:ring-teal-400/30 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <ZoomIn size={13} /> View Full Clipping
                  </span>
                </div>
              </div>
            ) : (
              /* Fallback if no image */
              <div className="compact-frame-center">
                <div className="compact-icon-badge">
                  <ImageIcon size={22} />
                </div>
                <span className="compact-frame-label">
                  CHRONICLE ARCHIVE [{number}]
                </span>
              </div>
            )}

            {/* Coordinate Watermark */}
            <div className="compact-coord-watermark">
              <span>AIMS-ARCHIVE // CH.{number}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Full-Resolution Lightbox Modal */}
      <AnimatePresence>
        {isModalOpen && image && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[92vh] bg-white dark:bg-[#0a1424] dark:ring-1 dark:ring-teal-400/20 dark:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(45,212,191,0.18)] rounded-2xl p-3 sm:p-5 shadow-2xl flex flex-col items-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-white/10 dark:hover:bg-teal-400/25 dark:text-teal-200 flex items-center justify-center shadow-md z-10 transition-all cursor-pointer"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="overflow-auto max-h-[80vh] w-full flex items-center justify-center">
                <img 
                  src={image} 
                  alt={`AIMS Chronicle ${number} Full Clipping`} 
                  className="max-h-[78vh] w-auto max-w-full object-contain rounded-lg"
                />
              </div>

              <div className="mt-3 text-center">
                <span className="text-xs font-bold text-[#1f3351] dark:text-[#5eead4] uppercase tracking-wider block">
                  Chronicle {number} // {category}
                </span>
                <p className="text-xs text-[#62748a] dark:text-[#a4bbd1] mt-0.5 max-w-xl">
                  {title}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
