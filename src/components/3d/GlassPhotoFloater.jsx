import React, { useRef, useState } from 'react';

/**
 * Pure Photo Floater with Smooth Blur Vignette Edge Fade
 * 
 * Features:
 * - NO photo captions or text overlays
 * - Smooth radial feather vignette mask fading seamlessly into the background
 * - 3D Gyro/Mouse tilt interaction
 */
export default function GlassPhotoFloater({ imageSrc, className = '', style = {} }) {
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
      className={`photo-vignette-floater ${className}`}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        ...style,
      }}
    >
      {/* PURE PHOTO - NO CAPTIONS */}
      <img
        src={imageSrc}
        alt="Nandu & Sravya Photo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          transition: 'transform 0.5s ease',
        }}
      />
    </div>
  );
}
