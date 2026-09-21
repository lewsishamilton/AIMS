import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import './Marquee.css';

const marqueeItems = [
  "AIMS ARUNDHATHI HOSPITAL",
  "SIX ARCHIVAL CHRONICLES",
  "SURGICAL PRECISION",
  "INNOVATIVE RESEARCH",
  "COMPASSIONATE HEALTHCARE",
  "TERTIARY CLINICAL EXCELLENCE",
  "PATIENT-FIRST PHILOSOPHY"
];

export default function Marquee() {
  return (
    <div className="editorial-marquee-wrapper" aria-hidden="true">
      <motion.div 
        className="editorial-marquee-track"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 25,
          ease: "linear"
        }}
      >
        {/* Double the list for seamless infinite loop */}
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="marquee-text display-font">{item}</span>
            <Plus size={14} className="marquee-separator" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
