import React, { useState, useEffect } from 'react';
import PersistentRings3D from './components/3d/PersistentRings3D';
import AudioToggle from './components/common/AudioToggle';
import CleanHero from './components/sections/CleanHero';
import CleanInvitation from './components/sections/CleanInvitation';
import CleanEvents from './components/sections/CleanEvents';
import CleanGallery from './components/sections/CleanGallery';
import CleanCountdownRSVP from './components/sections/CleanCountdownRSVP';
import useSmoothScroll from './hooks/useSmoothScroll';
import './styles/globals.css';

export default function App() {
  // Activate Lenis smooth scroll for 60fps natural touch scroll flow
  useSmoothScroll(true);

  // Track global scroll progress (0.0 at page top -> 1.0 at page bottom)
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollableHeight <= 0) return;
      
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / totalScrollableHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="wedding-app-root" style={{ minHeight: '100vh', position: 'relative' }}>
      {/* 1. PERSISTENT 3D WEDDING RINGS CANVAS (NANDU & SRAVYA custom name-bar rings) */}
      <PersistentRings3D scrollProgress={scrollProgress} />

      {/* 2. Non-Intrusive Floating Audio Control */}
      <AudioToggle />

      {/* 3. Ultra-Clean iOS 18 Light Glass Content Flow (Matched to Warm Linen Photo Tones) */}
      <main style={{ position: 'relative', zIndex: 'var(--z-content, 20)' }}>
        {/* Minimal Hero Header */}
        <CleanHero />

        {/* Official Invitation & Interlocking Rings Target */}
        <CleanInvitation />

        {/* Venue & Event Schedule */}
        <CleanEvents />

        {/* Floating iOS 18 Glass Photo Gallery (Featuring User's 4 Photos) */}
        <CleanGallery />

        {/* Live Countdown */}
        <CleanCountdownRSVP />
      </main>
    </div>
  );
}
