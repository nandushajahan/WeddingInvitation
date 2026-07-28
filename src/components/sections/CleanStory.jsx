import React, { useState, useEffect, useRef } from 'react';
import GlassPhotoFloater from '../3d/GlassPhotoFloater';
import { weddingData } from '../../data/weddingData';

export default function CleanStory() {
  const [activeFocusIndex, setActiveFocusIndex] = useState(0);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  // Track which story photo floater is currently in focus as the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(viewportCenter - cardCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveFocusIndex(closestIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stories = weddingData.ourStory || [];

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4.5rem',
        zIndex: 'var(--z-content, 20)',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '650px' }}>
        <span className="font-script gold-gradient-text" style={{ fontSize: '2.25rem', display: 'block' }}>
          Our Love Story
        </span>
        <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
          Moments That Defined Us
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem', letterSpacing: '0.05em' }}>
          Scroll down — the floater in focus shines clear, while others soft-fade in cloudy fog
        </p>
      </div>

      {/* Stack of Full Coverage Floating Photo Cards */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3.5rem',
          maxWidth: '560px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {stories.map((story, index) => {
          const isInFocus = index === activeFocusIndex;
          return (
            <div
              key={story.id || index}
              ref={(el) => (cardRefs.current[index] = el)}
              style={{ width: '100%' }}
            >
              <GlassPhotoFloater
                imageSrc={story.imageUrl}
                title={story.title}
                subtitle={`${story.period} • ${story.description}`}
                quote={story.quote || weddingData.pinnedJourney[`chapter${(index % 3) + 1}`]?.quote}
                tag={story.tag}
                isInFocus={isInFocus}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
