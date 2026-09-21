import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, ShieldPlus, Activity, Award } from 'lucide-react';
import './Hero.css';

const rotatingPillars = [
  'PATIENT CARE',
  'ADVANCED SURGERY',
  'CLINICAL RESEARCH',
  'COMPASSIONATE HEALING'
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingPillars.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-container">
        {/* Top Editorial Status Bar */}
        <motion.div 
          className="hero-top-bar"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="hero-top-left">
            <span className="hero-status-pill">
              <span className="pulse-circle"></span>
              AIMS ARUNDHATHI HOSPITAL
            </span>
            <span className="hero-meta-divider">•</span>
            <span className="hero-meta-text">ARCHIVAL EDITION VOL. 01</span>
          </div>

          <div className="hero-top-right">
            <a 
              href="https://www.google.com/maps?q=17.5945,78.4407" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hero-coord-badge"
              title="Open location in Google Maps"
            >
              17.5945° N 78.4407° E
            </a>
            <span className="hero-meta-pill">NEWS CHRONICLES</span>
          </div>
        </motion.div>

        {/* Main Dominant Title: AIMS CHRONICLES */}
        <div className="hero-title-wrapper">
          <motion.h1 
            className="hero-main-title"
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hero-title-aims">AIMS</span>
            <span className="hero-title-chronicles">CHRONICLES</span>
          </motion.h1>
        </div>

        {/* Editorial Sub-Structure with Kinetic Text */}
        <div className="hero-content-grid">
          {/* Left Column: Kinetic Statement & Role */}
          <motion.div 
            className="hero-subtext-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="hero-kinetic-lines">
              <div className="hero-line hero-line-1">
                <span className="line-text">HEALING INSTITUTION</span>
              </div>
              
              <div className="hero-line hero-line-2">
                <span className="line-lead">PIONEERING IN</span>
              </div>

              {/* Kinetic Rotating Word Slot */}
              <div className="hero-line hero-line-3 hero-rotating-slot">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    className="rotating-word-item display-font"
                    initial={{ y: '100%', opacity: 0, rotateX: -20 }}
                    animate={{ y: '0%', opacity: 1, rotateX: 0 }}
                    exit={{ y: '-100%', opacity: 0, rotateX: 20 }}
                    transition={{
                      duration: 0.55,
                      ease: [0.44, 0, 0.56, 1]
                    }}
                  >
                    {rotatingPillars[index]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Description & Interactive Badges */}
          <motion.div 
            className="hero-meta-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 1, 0.5, 1] }}
          >
            <p className="hero-editorial-description">
              A curated narrative celebrating human vitality, high-precision surgical arts, 
              and patient-first healthcare at AIMS Arundhathi Hospital. Documenting our six core chronicles 
              of clinical excellence.
            </p>

            <div className="hero-badge-row">
              <div className="hero-feature-pill">
                <ShieldPlus size={14} />
                <span>Multispecialty</span>
              </div>
              <div className="hero-feature-pill">
                <Activity size={14} />
                <span>Modern Diagnostics</span>
              </div>
              <div className="hero-feature-pill">
                <Award size={14} />
                <span>NABH Standard Care</span>
              </div>
            </div>

            {/* Scroll Indicator Prompt */}
            <a href="#statement" className="hero-scroll-trigger">
              <span className="scroll-indicator-text">EXPLORE CHRONICLES</span>
              <div className="scroll-circle-arrow">
                <ArrowDown size={14} />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
