import React, { useState } from 'react';
import GlassPhotoFloater from '../3d/GlassPhotoFloater';
import { weddingData } from '../../data/weddingData';
import { getAssetUrl } from '../../utils/getAssetUrl';

const saveTheDatePhotos = [
  'savethedatephotos/IMG_4004.JPG.jpeg',
  'savethedatephotos/IMG_4005.JPG.jpeg',
  'savethedatephotos/IMG_4007.JPG.jpeg',
  'savethedatephotos/IMG_4009.JPG.jpeg',
  'savethedatephotos/IMG_4012.JPG.jpeg',
  'savethedatephotos/IMG_4014.JPG.jpeg',
  'savethedatephotos/IMG_4016.JPG.jpeg',
  'savethedatephotos/IMG_4020.JPG.jpeg',
  'savethedatephotos/IMG_4021.JPG.jpeg',
  'savethedatephotos/IMG_4022.JPG.jpeg',
  'savethedatephotos/IMG_4023.JPG.jpeg',
  'savethedatephotos/IMG_4025.JPG.jpeg',
].map(getAssetUrl);

export default function CleanGallery() {
  const photos = weddingData.gallery || [];
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openLightbox = () => {
    setCurrentPhotoIndex(0);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = '';
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev + 1) % saveTheDatePhotos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev - 1 + saveTheDatePhotos.length) % saveTheDatePhotos.length);
  };

  return (
    <>
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
            Our Gallery
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
            marginBottom: '4rem',
          }}
        >
          {photos.map((photo) => (
            <GlassPhotoFloater
              key={photo.id}
              imageSrc={photo.url}
              onClick={photo.isViewMoreBtn ? openLightbox : undefined}
              overlayText={photo.isViewMoreBtn ? "Click for more" : undefined}
              blurImage={photo.isViewMoreBtn}
            />
          ))}
        </div>
      </section>

      {/* Full-screen Lightbox */}
      {isLightboxOpen && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              zIndex: 10000,
              padding: '0.5rem',
              lineHeight: 1,
            }}
          >
            &times;
          </button>

          {/* Previous Button */}
          <button
            onClick={prevPhoto}
            style={{
              position: 'absolute',
              left: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              color: 'white',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 10000,
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            &#10094;
          </button>

          {/* Current Photo */}
          <div style={{ position: 'relative', width: '90%', height: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={saveTheDatePhotos[currentPhotoIndex]}
              alt={`Gallery photo ${currentPhotoIndex + 1}`}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
              onClick={(e) => e.stopPropagation()} // Prevent click from closing lightbox
            />
            {/* Photo Counter */}
            <div
              style={{
                position: 'absolute',
                bottom: '-2rem',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
              }}
            >
              {currentPhotoIndex + 1} / {saveTheDatePhotos.length}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={nextPhoto}
            style={{
              position: 'absolute',
              right: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '50%',
              color: 'white',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 10000,
              transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            &#10095;
          </button>
        </div>
      )}
    </>
  );
}
