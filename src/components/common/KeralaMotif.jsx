import React from 'react';

/**
 * Reusable Kerala-inspired SVG ornamental motifs
 * Types: 'divider', 'lotus', 'lamp', 'border-corner'
 */
export default function KeralaMotif({ type = 'divider', className = '', size = 48, color = 'var(--kasavu-gold-base)' }) {
  if (type === 'divider') {
    return (
      <div className={`kerala-divider ${className}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', width: '100%', margin: '1.5rem 0' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--kasavu-gold-base))', opacity: 0.6 }} />
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 0C21.5 5 24 9 30 10C24 11 21.5 15 20 20C18.5 15 16 11 10 10C16 9 18.5 5 20 0Z" fill={color} />
          <circle cx="20" cy="10" r="2.5" fill="var(--kasavu-gold-bright)" />
          <circle cx="6" cy="10" r="1.5" fill={color} opacity="0.7" />
          <circle cx="34" cy="10" r="1.5" fill={color} opacity="0.7" />
        </svg>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--kasavu-gold-base), transparent)', opacity: 0.6 }} />
      </div>
    );
  }

  if (type === 'lamp') {
    return (
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Nilavilakku / Lamp Flame Motif */}
        <path d="M24 4C24 4 29 12 29 17C29 20 26.8 22 24 22C21.2 22 19 20 19 17C19 12 24 4 24 4Z" fill="url(#flameGlow)" />
        <path d="M14 26C14 26 18 24 24 24C30 24 34 26 34 26L32 30H16L14 26Z" fill={color} />
        <path d="M22 30H26V40H22V30Z" fill={color} />
        <path d="M18 40H30V43H18V40Z" fill={color} />
        <defs>
          <radialGradient id="flameGlow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(24 16) scale(7 10)">
            <stop stopColor="var(--kasavu-gold-bright)" />
            <stop offset="0.7" stopColor="var(--kasavu-gold-base)" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    );
  }

  if (type === 'lotus') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Lotus Bloom */}
        <path d="M32 8C32 8 38 20 38 32C38 44 32 52 32 52C32 52 26 44 26 32C26 20 32 8 32 8Z" fill={color} opacity="0.9" />
        <path d="M32 20C40 22 52 30 50 42C48 50 38 52 32 52C26 52 16 50 14 42C12 30 24 22 32 20Z" fill={color} opacity="0.6" />
        <path d="M32 28C44 28 58 36 56 46C54 52 42 54 32 54C22 54 10 52 8 46C6 36 20 28 32 28Z" fill={color} opacity="0.3" />
      </svg>
    );
  }

  return null;
}
