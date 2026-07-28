import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import BotanicalBouquet from '../nature/BotanicalBouquet';
import { weddingData } from '../../data/weddingData';
import { ChevronDown } from 'lucide-react';

export default function NatureHero() {
  const containerRef = useRef(null);
  const bouquetRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

      tl.fromTo(
        bouquetRef.current,
        { scale: 0.7, opacity: 0, y: -30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.5 }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        '-=1.0'
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.94, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4 },
        '-=0.8'
      )
      .fromTo(
        infoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        '-=0.8'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        zIndex: 'var(--z-content)',
      }}
    >
      <div 
        style={{
          maxWidth: '740px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          margin: '0 auto',
        }}
      >
        {/* Flower Bouquet SVG */}
        <div ref={bouquetRef}>
          <BotanicalBouquet type="bouquet" size={84} />
        </div>

        {/* Subtitle */}
        <div ref={subtitleRef}>
          <span 
            className="font-script gold-gradient-text"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              display: 'block',
              filter: 'drop-shadow(0 2px 10px rgba(245, 214, 139, 0.3))',
            }}
          >
            {weddingData.couple.subtitle}
          </span>
        </div>

        {/* Couple Names Hero */}
        <div ref={titleRef} style={{ width: '100%' }}>
          <h1 
            className="font-hero gold-gradient-text"
            style={{
              fontSize: 'clamp(2.75rem, 8.5vw, 5.5rem)',
              fontWeight: '700',
              lineHeight: '1.1',
              letterSpacing: '0.04em',
              margin: '0.2rem 0',
              filter: 'drop-shadow(0 4px 25px rgba(212, 175, 55, 0.35))',
            }}
          >
            {weddingData.couple.groom} & {weddingData.couple.bride}
          </h1>
        </div>

        {/* Botanical Leaf Divider */}
        <div style={{ width: '80%', maxWidth: '300px' }}>
          <BotanicalBouquet type="divider" color="var(--floral-gold-bright)" />
        </div>

        {/* Date and Location */}
        <div ref={infoRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <p 
            className="font-serif"
            style={{
              fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)',
              color: 'var(--text-ivory-bright)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {weddingData.eventDate.displayDate}
          </p>
          <p 
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: 'var(--text-ivory-muted)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {weddingData.openingScene.locationTeaser}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div style={{ marginTop: '2.5rem', opacity: 0.75, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-ivory-muted)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            SCROLL TO EXPLORE STORY
          </span>
          <ChevronDown size={18} style={{ color: 'var(--floral-gold-bright)', animation: 'bounce 2s infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
