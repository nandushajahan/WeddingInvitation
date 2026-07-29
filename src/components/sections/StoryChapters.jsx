import React from 'react';
import FloatingGlassCard from '../3d/FloatingGlassCard';
import BotanicalBouquet from '../nature/BotanicalBouquet';
import { weddingData } from '../../data/weddingData';
import { Calendar } from 'lucide-react';

export default function StoryChapters() {
  return (
    <section 
      style={{ 
        position: 'relative', 
        padding: '6rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <span className="font-script gold-gradient-text" style={{ fontSize: '2.5rem' }}>
          Our Botanical Journey
        </span>
        <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', margin: '0.5rem 0' }}>
          The Love Story
        </h2>
        <BotanicalBouquet type="bouquet" size={42} className="text-gold mx-auto" />
      </div>

      {/* Chapters Stack with Masked Visual Reveals */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        {weddingData.ourStory.map((chapter, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={chapter.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '3rem',
                alignItems: 'center',
                direction: isEven ? 'ltr' : 'rtl',
              }}
            >
              {/* Image Frame with Masked Arch & Subtle Parallax */}
              <div 
                style={{
                  direction: 'ltr',
                  position: 'relative',
                  width: '100%',
                  height: chapter.aspectRatio === 'portrait' ? '460px' : '360px',
                  borderRadius: '240px 240px 24px 24px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.75), 0 0 30px rgba(212, 175, 55, 0.2)',
                  border: '1px solid var(--overlay-gold-border)',
                }}
              >
                <img
                  src={chapter.imagePlaceholder}
                  alt={chapter.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
                
                {/* Floating Tag */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.5rem',
                    left: '1.5rem',
                    padding: '0.5rem 1.25rem',
                    borderRadius: 'var(--radius-full)',
                    background: `rgba(13, 40, 24, var(--badge-dark-alpha))`,
                    backdropFilter: 'blur(var(--glass-blur-subtle))',
                    border: '1px solid var(--overlay-gold-border)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'var(--floral-gold-bright)',
                    textTransform: 'uppercase',
                  }}
                >
                  {chapter.tag}
                </div>
              </div>

              {/* Text Card with 3D Depth */}
              <div style={{ direction: 'ltr' }}>
                <FloatingGlassCard style={{ padding: '2.5rem 2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--nature-sage-light)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                    <Calendar size={16} />
                    <span>{chapter.period}</span>
                  </div>
                  <h3 className="font-hero gold-gradient-text" style={{ fontSize: '1.875rem', marginBottom: '1rem' }}>
                    {chapter.title}
                  </h3>
                  <p className="font-serif" style={{ fontSize: '1.15rem', color: 'var(--text-ivory-subtle)', lineHeight: '1.8' }}>
                    {chapter.description}
                  </p>
                </FloatingGlassCard>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
