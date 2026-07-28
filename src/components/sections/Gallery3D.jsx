import React, { useState } from 'react';
import FloatingGlassCard from '../3d/FloatingGlassCard';
import KeralaMotif from '../common/KeralaMotif';
import { weddingData } from '../../data/weddingData';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery3D() {
  const [activePhoto, setActivePhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openLightbox = (photo, index) => {
    setActivePhoto(photo);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setActivePhoto(null);
  };

  const nextPhoto = () => {
    const nextIdx = (selectedIndex + 1) % weddingData.gallery.length;
    setSelectedIndex(nextIdx);
    setActivePhoto(weddingData.gallery[nextIdx]);
  };

  const prevPhoto = () => {
    const prevIdx = (selectedIndex - 1 + weddingData.gallery.length) % weddingData.gallery.length;
    setSelectedIndex(prevIdx);
    setActivePhoto(weddingData.gallery[prevIdx]);
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        maxWidth: '1300px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <span className="font-script cyan-gold-text" style={{ fontSize: '2.5rem' }}>
          Captured Moments
        </span>
        <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', margin: '0.5rem 0' }}>
          3D Perspective Gallery
        </h2>
        <KeralaMotif type="lotus" size={42} className="text-gold" />
      </div>

      {/* Masonry / Depth Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {weddingData.gallery.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(item, idx)}
            style={{
              cursor: 'pointer',
              height: item.orientation === 'portrait' ? '420px' : '300px',
              gridRow: item.orientation === 'portrait' ? 'span 2' : 'span 1',
            }}
          >
            <FloatingGlassCard style={{ width: '100%', height: '100%', padding: '0.75rem', overflow: 'hidden' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(8, 16, 38, 0.9) 0%, transparent 60%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '1.25rem',
                  }}
                >
                  <span style={{ fontSize: '0.75rem', color: 'var(--futuristic-cyan-glow)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    {item.category}
                  </span>
                  <h4 className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text-ivory-bright)' }}>
                    {item.title}
                  </h4>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(8, 14, 33, 0.75)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--kasavu-gold-bright)',
                  }}
                >
                  <Maximize2 size={16} />
                </div>
              </div>
            </FloatingGlassCard>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 'var(--z-modal)',
            background: 'rgba(3, 7, 18, 0.92)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--text-ivory-bright)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={24} />
          </button>

          <button
            onClick={prevPhoto}
            style={{
              position: 'absolute',
              left: '1.5rem',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--text-ivory-bright)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextPhoto}
            style={{
              position: 'absolute',
              right: '1.5rem',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--text-ivory-bright)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={28} />
          </button>

          <div style={{ maxWidth: '90vw', maxHeight: '85vh', textAlign: 'center' }}>
            <img
              src={activePhoto.url}
              alt={activePhoto.title}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.3)',
                border: '1px solid var(--overlay-gold-border)',
              }}
            />
            <h3 className="font-serif" style={{ fontSize: '1.5rem', marginTop: '1rem', color: 'var(--text-ivory-bright)' }}>
              {activePhoto.title}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
}
