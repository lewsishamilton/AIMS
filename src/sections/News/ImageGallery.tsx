import { motion } from 'motion/react';
import { bottomGalleryFrames } from '../../data/newsChroniclesData';
import { Camera, Frame, ArrowUpRight } from 'lucide-react';
import './ImageGallery.css';

export default function ImageGallery() {
  return (
    <section className="image-gallery-section" id="gallery">
      <div className="gallery-header-container">
        <div className="gallery-tag-badge">
          <Camera size={14} />
          <span>VISUAL CHRONICLES // 03 EDITORIAL FRAMES</span>
        </div>

        <div className="gallery-title-wrapper">
          <h2 className="gallery-main-title display-font">SPATIAL ENVIRONMENTS</h2>
          <p className="gallery-subtext">
            Three compact editorial spatial frames representing clinical, surgical, and healing environments across the AIMS Arundhati campus.
          </p>
        </div>
      </div>

      {/* Exactly Three Image Frames Arranged Horizontally in One Row */}
      <div className="gallery-three-up-grid">
        {bottomGalleryFrames.map((frame, idx) => (
          <motion.div 
            key={frame.id}
            className="gallery-frame-col"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="gallery-frame-card-compact">
              <div className={`empty-frame-box compact-gallery-box ${frame.image ? 'has-image' : ''}`}>
                {frame.image ? (
                  <img 
                    src={frame.image} 
                    alt={frame.caption || frame.label} 
                    className="gallery-frame-img"
                    loading="lazy"
                  />
                ) : (
                  <>
                    {/* 4 Corner Crosshairs */}
                    <span className="crosshair-tl" aria-hidden="true"></span>
                    <span className="crosshair-tr" aria-hidden="true"></span>
                    <span className="crosshair-bl" aria-hidden="true"></span>
                    <span className="crosshair-br" aria-hidden="true"></span>

                    {/* Center Blueprint Tag */}
                    <div className="frame-center-indicator">
                      <div className="gallery-icon-pill">
                        <Frame size={18} />
                      </div>
                      <span className="frame-center-tag">
                        {frame.tag} • {frame.label}
                      </span>
                      <span className="frame-aspect-tag">
                        4:3 RATIO // COMPACT FRAME
                      </span>
                    </div>

                    {/* Coordinate Watermark */}
                    <div className="gallery-coord-tag">
                      <span>AIMS // 0{idx + 1}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Caption Bar */}
              <div className="compact-gallery-caption">
                <span className="gallery-caption-title">{frame.caption}</span>
                <ArrowUpRight size={14} className="gallery-caption-arrow" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
