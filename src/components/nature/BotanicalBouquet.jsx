import React from 'react';

/**
 * Reusable Botanical & Nature SVG elements:
 * Types: 'bouquet', 'divider', 'bee', 'bird', 'flower-arch'
 */
export default function BotanicalBouquet({ type = 'bouquet', className = '', size = 48, color = 'var(--floral-gold-base)' }) {
  if (type === 'divider') {
    return (
      <div className={`nature-divider ${className}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', width: '100%', margin: '1.5rem 0' }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, var(--floral-gold-base))', opacity: 0.6 }} />
        <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Leaf & Rose Centerpiece */}
          <path d="M24 2C24 2 28 8 28 12C28 16 24 22 24 22C24 22 20 16 20 12C20 8 24 2Z" fill={color} opacity="0.9" />
          <path d="M24 12C28 8 36 6 42 10C36 14 28 14 24 12Z" fill={color} opacity="0.7" />
          <path d="M24 12C20 8 12 6 6 10C12 14 20 14 24 12Z" fill={color} opacity="0.7" />
          <circle cx="24" cy="12" r="3" fill="var(--floral-gold-bright)" />
        </svg>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, var(--floral-gold-base), transparent)', opacity: 0.6 }} />
      </div>
    );
  }

  if (type === 'bouquet') {
    return (
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Flower Bouquet SVG */}
        <path d="M32 40L24 60M32 40L32 60M32 40L40 60" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="24" r="10" fill="url(#flowerBloom)" />
        <circle cx="20" cy="30" r="8" fill={color} opacity="0.8" />
        <circle cx="44" cy="30" r="8" fill={color} opacity="0.8" />
        <circle cx="24" cy="16" r="7" fill="var(--blossom-pink-glow)" opacity="0.9" />
        <circle cx="40" cy="16" r="7" fill="var(--blossom-pink-glow)" opacity="0.9" />
        <defs>
          <radialGradient id="flowerBloom" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 24) scale(10)">
            <stop stopColor="var(--floral-gold-bright)" />
            <stop offset="0.7" stopColor="var(--floral-gold-base)" />
            <stop offset="1" stopColor="var(--floral-gold-deep)" />
          </radialGradient>
        </defs>
      </svg>
    );
  }

  if (type === 'bee') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Honeybee Motif */}
        <ellipse cx="16" cy="16" rx="6" ry="10" fill={color} transform="rotate(45 16 16)" />
        <path d="M12 10C8 6 4 8 6 12C8 14 12 12 12 10Z" fill="var(--text-ivory-bright)" opacity="0.7" />
        <path d="M20 22C24 26 28 24 26 20C24 18 20 20 20 22Z" fill="var(--text-ivory-bright)" opacity="0.7" />
      </svg>
    );
  }

  if (type === 'bird') {
    return (
      <svg width={size} height={size} viewBox="0 0 36 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
        {/* Gliding Bird Motif */}
        <path d="M0 12C6 4 14 4 18 12C22 4 30 4 36 12C28 10 20 16 18 20C16 16 8 10 0 12Z" fill={color} />
      </svg>
    );
  }

  return null;
}
