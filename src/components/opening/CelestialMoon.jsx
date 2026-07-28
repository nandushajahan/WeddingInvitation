import React from 'react';

export default function CelestialMoon({ size = 180, className = '' }) {
  return (
    <div 
      className={`celestial-moon-wrap ${className}`}
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer Halo Glow */}
      <div 
        style={{
          position: 'absolute',
          width: '140%',
          height: '140%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(250, 247, 242, 0.25) 0%, rgba(245, 214, 139, 0.12) 45%, transparent 70%)',
          filter: 'blur(15px)',
          animation: 'pulseGlow 6s ease-in-out infinite alternate',
        }}
      />

      {/* SVG Moon Crescent with Kasavu Golden Rim */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0 0 20px rgba(245, 214, 139, 0.4))' }}
      >
        <defs>
          <radialGradient id="moonTexture" cx="40%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FAF7F2" />
            <stop offset="60%" stopColor="#EADEC9" />
            <stop offset="100%" stopColor="#C5B190" />
          </radialGradient>
          <linearGradient id="goldEdge" x1="0" y1="0" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F7DF9B" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6A12" />
          </linearGradient>
        </defs>

        {/* Main Moon Disc */}
        <circle cx="50" cy="50" r="38" fill="url(#moonTexture)" />

        {/* Subtle Crater Textures */}
        <circle cx="40" cy="38" r="8" fill="#DFCEB2" opacity="0.4" />
        <circle cx="58" cy="55" r="12" fill="#D3C0A1" opacity="0.35" />
        <circle cx="34" cy="62" r="6" fill="#DFCEB2" opacity="0.3" />

        {/* Crescent Shadow cut for crescent effect */}
        <circle cx="64" cy="44" r="34" fill="var(--bg-midnight-base)" opacity="0.92" />

        {/* Golden Kasavu Rim Outline */}
        <path 
          d="M 50 12 A 38 38 0 0 1 88 50 A 38 38 0 0 1 50 88 M 50 12" 
          stroke="url(#goldEdge)" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
      </svg>

      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(0.95); opacity: 0.7; }
          100% { transform: scale(1.08); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
