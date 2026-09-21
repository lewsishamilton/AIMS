import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import './AnimatedStatement.css';

const statementPairs = [
  {
    line1: "HEALTHCARE",
    line2: "WITH HEART"
  },
  {
    line1: "CARE THAT",
    line2: "INSPIRES TRUST"
  },
  {
    line1: "MEDICINE",
    line2: "MEETS EMPATHY"
  },
  {
    line1: "A LEGACY OF",
    line2: "HEALING LIVES"
  }
];

export default function AnimatedStatement() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  // Subtle scroll-driven counter parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const xLine1 = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const xLine2 = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  // Smooth interval transition between statement pairs
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statementPairs.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  const currentPair = statementPairs[currentIndex];

  return (
    <section className="statement-section-slim" id="statement" ref={containerRef}>
      {/* Centered Kinetic Typography Transition Band */}
      <div className="statement-centered-stage">
        {/* Line 1: Fluid vertical mask transition + subtle scroll shift */}
        <motion.div 
          className="statement-line-wrapper line-1"
          style={{ x: xLine1 }}
        >
          <div className="statement-mask-centered">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`line1-${currentIndex}`}
                className="statement-text-centered display-font"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-105%', opacity: 0 }}
                transition={{
                  duration: 0.65,
                  ease: [0.44, 0, 0.56, 1]
                }}
              >
                {currentPair.line1}
              </motion.h2>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Line 2: Fluid vertical mask transition + counter scroll shift */}
        <motion.div 
          className="statement-line-wrapper line-2"
          style={{ x: xLine2 }}
        >
          <div className="statement-mask-centered">
            <AnimatePresence mode="wait">
              <motion.h2
                key={`line2-${currentIndex}`}
                className="statement-text-centered statement-text-accent display-font"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-105%', opacity: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.08,
                  ease: [0.44, 0, 0.56, 1]
                }}
              >
                {currentPair.line2}
              </motion.h2>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Subtle minimal indicator */}
      <div className="statement-bottom-indicator">
        <span className="indicator-label">AIMS GUIDING PHILOSOPHY</span>
      </div>
    </section>
  );
}
