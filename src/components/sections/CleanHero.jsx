import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { weddingData } from '../../data/weddingData';
import { ChevronDown } from 'lucide-react';

export default function CleanHero() {
  const containerRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, delay: 0.3 }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.95, y: 25 },
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
        zIndex: 'var(--z-content, 20)',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          margin: '0 auto',
        }}
      >
        {/* Subtitle */}
        <div ref={subtitleRef}>
          <span
            className="font-script reflective-text"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              display: 'block',
            }}
          >
            {weddingData.couple.subtitle}
          </span>
        </div>

        {/* Couple Names Title with Liquid Reflective Shimmer */}
        <div ref={titleRef} style={{ width: '100%' }}>
          <h1
            className="font-hero reflective-text"
            style={{
              fontSize: 'clamp(2.75rem, 8.5vw, 5.5rem)',
              fontWeight: '700',
              lineHeight: '1.1',
              letterSpacing: '0.04em',
              margin: '0.25rem 0',
            }}
          >
            {weddingData.couple.groom} & {weddingData.couple.bride}
          </h1>
        </div>

        {/* Divider Line */}
        <div
          style={{
            width: '120px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, var(--gold-base) 50%, transparent 100%)',
            margin: '0.5rem 0',
          }}
        />

        {/* Date and Location */}
        <div ref={infoRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <p
            className="font-serif"
            style={{
              fontSize: 'clamp(1.2rem, 2.8vw, 1.5rem)',
              color: 'var(--text-dark-primary)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {weddingData.eventDate.displayDate}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            {weddingData.openingScene.locationTeaser}
          </p>
        </div>

        {/* Scroll Indicator */}
        <div style={{ marginTop: '3rem', opacity: 0.85, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
            SCROLL TO JOIN THE UNION
          </span>
          <ChevronDown size={18} style={{ color: 'var(--gold-deep)', animation: 'bounce 2s infinite' }} />
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
