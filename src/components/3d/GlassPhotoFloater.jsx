import React, { useRef, useState } from 'react';

/**
 * Pure Photo Floater with Smooth Blur Vignette Edge Fade
 * 
 * Features:
 * - NO photo captions or text overlays
 * - Smooth radial feather vignette mask fading seamlessly into the background
 * - 3D Gyro/Mouse tilt interaction
 */
export default function GlassPhotoFloater({ imageSrc, className = '', style = {}, onClick, overlayText, blurImage }) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`photo-vignette-floater ${className}`}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        position: 'relative',
        ...style,
      }}
    >
      {/* PURE PHOTO - NO CAPTIONS (Unless overlayText is provided) */}
      <img
        src={imageSrc}
        alt="Nandu & Sravya Photo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.5s ease',
          filter: blurImage ? 'blur(4px) brightness(0.6)' : 'none',
        }}
      />
      {overlayText && (
        <div
          className="font-script"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '1.75rem',
            fontWeight: '400',
            textShadow: '0 4px 15px rgba(0,0,0,0.8)',
            zIndex: 10,
            pointerEvents: 'none', // let clicks pass through to the parent
          }}
        >
          {overlayText}
        </div>
      )}
    </div>
  );
}
