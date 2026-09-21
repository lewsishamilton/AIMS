import { useState, useEffect, useRef } from 'react';
import { chronicles } from '../../data/newsChroniclesData';
import ChronicleCard from './ChronicleCard';
import { BookOpen } from 'lucide-react';
import './ChroniclesSection.css';

export default function ChroniclesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const total = chronicles.length; // Exactly 6 items

  // Calculate active card based on scroll position (100% reversible up and down)
  useEffect(() => {
    const handleScroll = () => {
      const cardEls = document.querySelectorAll('.chronicle-card-sticky-slot');
      if (!cardEls.length) return;

      const stickyThreshold = window.innerHeight * 0.10 + 35; // Focal point for taller cards

      let currentTopActive = 0;
      cardEls.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        // If this card has risen to the sticky focal point, it is active
        if (rect.top <= stickyThreshold) {
          currentTopActive = i;
        }
      });

      setActiveIndex(currentTopActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [total]);

  return (
    <section className="chronicles-vertical-section" id="chronicles" ref={sectionRef}>
      {/* Editorial Section Header */}
      <div className="chronicles-top-header">
        <div className="section-pre-title">
          <BookOpen size={15} />
          <span>EDITORIAL ARCHIVES</span>
        </div>

        <div className="chronicles-heading-flex">
          <div className="heading-copy">
            <h2 className="section-main-heading display-font">THE CHRONICLES</h2>
            <p className="section-sub-description">
              Scroll down to explore AIMS newspaper highlights and community outreach chronicles
            </p>
          </div>
        </div>
      </div>

      {/* CARD-OVER-CARD STACKING CONTAINER */}
      <div className="chronicles-card-stack-stream">
        {chronicles.map((item, idx) => (
          <div 
            key={item.id}
            className={`chronicle-card-sticky-slot ${idx === activeIndex ? 'is-active-slot' : ''}`}
            style={{ 
              zIndex: idx + 1,
              // Subtle stacking offset so top edges slightly layer like a card deck
              top: `calc(clamp(70px, 9vh, 95px) + ${idx * 8}px)`
            }}
          >
            <ChronicleCard 
              chronicle={item}
              _index={idx}
              total={total}
              isActive={idx === activeIndex}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
