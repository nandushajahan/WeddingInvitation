import React from 'react';
import GlassPhotoFloater from '../3d/GlassPhotoFloater';
import { weddingData } from '../../data/weddingData';

export default function CleanGallery() {
  const photos = weddingData.gallery || [];

  return (
    <section
      style={{
        position: 'relative',
        padding: '5rem 1.5rem',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 'var(--z-content, 20)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span className="font-script gold-gradient-text" style={{ fontSize: '2.25rem', display: 'block' }}>
          Captured Moments
        </span>
        <h2 className="font-hero reflective-text" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}>
          Our Floating Gallery
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem', letterSpacing: '0.05em' }}>
          Hover or tap to tilt the vignette floating photos
        </p>
      </div>

      {/* Grid of Pure Vignette Glass Photo Floaters (No Captions) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2.5rem',
          maxWidth: '960px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {photos.map((photo) => (
          <GlassPhotoFloater
            key={photo.id}
            imageSrc={photo.url}
          />
        ))}
      </div>
    </section>
  );
}
