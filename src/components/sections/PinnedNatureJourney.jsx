import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingGlassCard from '../3d/FloatingGlassCard';
import BotanicalBouquet from '../nature/BotanicalBouquet';
import { weddingData } from '../../data/weddingData';
import { Sparkles, Sun, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PinnedNatureJourney() {
  const sectionRef = useRef(null);
  const sunbeamRef = useRef(null);
  const treeBgRef = useRef(null);
  const textCard1Ref = useRef(null);
  const textCard2Ref = useRef(null);
  const textCard3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
        }
      });

      // 1. Sunbeam & Tree light displacement
      tl.to(sunbeamRef.current, {
        scale: 1.4,
        opacity: 0.8,
        y: '-40px',
        duration: 1,
      }, 0)

      .to(treeBgRef.current, { x: '-15%', duration: 1 }, 0)

      // 2. Staggered reveal of Narrative Chapter 1 -> Chapter 2 -> Chapter 3
      .fromTo(textCard1Ref.current, { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 0.2)
      .to(textCard1Ref.current, { opacity: 0, y: -40, scale: 0.95, duration: 0.6 }, 0.9)

      .fromTo(textCard2Ref.current, { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 1.0)
      .to(textCard2Ref.current, { opacity: 0, y: -40, scale: 0.95, duration: 0.6 }, 1.7)

      .fromTo(textCard3Ref.current, { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 1.8);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 30%, #153823 0%, var(--bg-emerald-base) 80%)',
      }}
    >
      {/* Background Sunbeam Glow */}
      <div
        ref={sunbeamRef}
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 214, 139, 0.18) 0%, rgba(242, 184, 128, 0.08) 50%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Tree & Botanical Canopy Silhouette */}
      <div
        ref={treeBgRef}
        style={{
          position: 'absolute',
          top: '5%',
          right: '-5%',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(132, 169, 140, 0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Pinned Nature Bouquet Icon */}
      <div style={{ position: 'absolute', top: '18%', zIndex: 1 }}>
        <BotanicalBouquet type="bouquet" size={96} />
      </div>

      {/* Story Chapter Cards Stacked in Space */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '560px',
          width: '90%',
          margin: '0 auto',
          textAlign: 'center',
          marginTop: '110px',
        }}
      >
        {/* Chapter 1 Card */}
        <div ref={textCard1Ref} style={{ position: 'absolute', width: '100%', left: 0, top: 0 }}>
          <FloatingGlassCard style={{ padding: '2.25rem 1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--floral-gold-bright)', marginBottom: '0.75rem' }}>
              <Sun size={18} />
              <span className="font-sans" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {weddingData.pinnedJourney.chapter1.subtitle}
              </span>
            </div>
            <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', marginBottom: '1rem' }}>
              {weddingData.pinnedJourney.chapter1.title}
            </h2>
            <p className="font-serif" style={{ fontSize: '1.15rem', color: 'var(--text-ivory-subtle)', lineHeight: '1.7' }}>
              "{weddingData.pinnedJourney.chapter1.quote}"
            </p>
          </FloatingGlassCard>
        </div>

        {/* Chapter 2 Card */}
        <div ref={textCard2Ref} style={{ position: 'absolute', width: '100%', left: 0, top: 0, opacity: 0 }}>
          <FloatingGlassCard style={{ padding: '2.25rem 1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--nature-sage-light)', marginBottom: '0.75rem' }}>
              <Sparkles size={18} />
              <span className="font-sans" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {weddingData.pinnedJourney.chapter2.subtitle}
              </span>
            </div>
            <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', marginBottom: '1rem' }}>
              {weddingData.pinnedJourney.chapter2.title}
            </h2>
            <p className="font-serif" style={{ fontSize: '1.15rem', color: 'var(--text-ivory-subtle)', lineHeight: '1.7' }}>
              "{weddingData.pinnedJourney.chapter2.quote}"
            </p>
          </FloatingGlassCard>
        </div>

        {/* Chapter 3 Card */}
        <div ref={textCard3Ref} style={{ position: 'absolute', width: '100%', left: 0, top: 0, opacity: 0 }}>
          <FloatingGlassCard style={{ padding: '2.25rem 1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--floral-gold-bright)', marginBottom: '0.75rem' }}>
              <Heart size={18} />
              <span className="font-sans" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                {weddingData.pinnedJourney.chapter3.subtitle}
              </span>
            </div>
            <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', marginBottom: '1rem' }}>
              {weddingData.pinnedJourney.chapter3.title}
            </h2>
            <p className="font-serif" style={{ fontSize: '1.15rem', color: 'var(--text-ivory-subtle)', lineHeight: '1.7' }}>
              "{weddingData.pinnedJourney.chapter3.quote}"
            </p>
          </FloatingGlassCard>
        </div>
      </div>
    </section>
  );
}
