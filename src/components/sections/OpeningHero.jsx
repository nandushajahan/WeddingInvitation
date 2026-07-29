import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import CelestialMoon from '../opening/CelestialMoon';
import KeralaMotif from '../common/KeralaMotif';
import { weddingData } from '../../data/weddingData';
import { Sparkles, ChevronDown } from 'lucide-react';

export default function OpeningHero({ onBeginStory, isTransitioned }) {
  const containerRef = useRef(null);
  const moonRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const infoRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

      tl.fromTo(
        moonRef.current,
        { scale: 0.7, opacity: 0, y: -40 },
        { scale: 1, opacity: 1, y: 0, duration: 1.6 }
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        '-=1.0'
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.4 },
        '-=0.8'
      )
      .fromTo(
        infoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0 },
        '-=0.8'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0 },
        '-=0.6'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBeginClick = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        if (onBeginStory) onBeginStory();
      }
    });
  };

  return (
    <section
      ref={containerRef}
      className={`opening-hero-container ${isTransitioned ? 'hidden' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 'var(--z-content)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        background: 'transparent',
      }}
    >
      <div 
        style={{
          maxWidth: '720px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          margin: '0 auto',
        }}
      >
        <div ref={moonRef}>
          <CelestialMoon size={160} />
        </div>

        <div ref={subtitleRef}>
          <span 
            className="font-script cyan-gold-text"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              display: 'block',
            }}
          >
            {weddingData.couple.subtitle}
          </span>
        </div>

        <div ref={titleRef} style={{ width: '100%' }}>
          <h1 
            className="font-hero gold-static-text"
            style={{
              fontSize: 'clamp(2.75rem, 8.5vw, 5.5rem)',
              fontWeight: '700',
              lineHeight: '1.1',
              letterSpacing: '0.04em',
              margin: '0.2rem 0',
            }}
          >
            {weddingData.couple.groom} & {weddingData.couple.bride}
          </h1>
        </div>

        <div style={{ width: '75%', maxWidth: '280px' }}>
          <KeralaMotif type="divider" color="var(--kasavu-gold-bright)" />
        </div>

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

        <div ref={ctaRef} style={{ marginTop: '1.75rem' }}>
          <button
            onClick={handleBeginClick}
            className="cta-button-gold"
            aria-label="Begin Our Story"
          >
            <Sparkles size={18} style={{ color: 'var(--bg-midnight-base)' }} />
            <span>{weddingData.openingScene.ctaText}</span>
          </button>
          
          <div style={{ marginTop: '1.25rem', opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-ivory-muted)', letterSpacing: '0.15em' }}>EXPLORE 3D STORY</span>
            <ChevronDown size={14} style={{ color: 'var(--kasavu-gold-bright)', animation: 'bounce 2s infinite' }} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .opening-hero-container.hidden {
          pointer-events: none;
          display: none;
        }
      `}</style>
    </section>
  );
}
