import React from 'react';
import FloatingGlassCard from '../3d/FloatingGlassCard';
import BotanicalBouquet from '../nature/BotanicalBouquet';
import { weddingData } from '../../data/weddingData';
import { RotateCcw, Heart } from 'lucide-react';

export default function EndingSection() {
  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '8rem 1.5rem 6rem 1.5rem',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(180deg, var(--bg-emerald-base) 0%, #0d2818 50%, var(--bg-emerald-base) 100%)',
      }}
    >
      <div style={{ maxWidth: '640px', width: '100%', margin: '0 auto' }}>
        <BotanicalBouquet type="bouquet" size={120} className="mx-auto mb-6" />

        <FloatingGlassCard style={{ padding: '3.5rem 2rem' }}>
          <span className="font-script gold-gradient-text" style={{ fontSize: '2.5rem' }}>
            With All Our Love
          </span>
          
          <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', margin: '0.75rem 0' }}>
            Thank You
          </h2>

          <BotanicalBouquet type="divider" color="var(--floral-gold-bright)" className="my-4" />

          <p className="font-serif" style={{ fontSize: '1.25rem', color: 'var(--text-ivory-subtle)', lineHeight: '1.8', margin: '1.5rem 0' }}>
            "We cannot wait to celebrate this botanical milestone beneath nature's canopy with each and every one of you. Your presence, blessings, and love mean the world to us."
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--floral-gold-bright)', margin: '1.5rem 0 2.5rem 0' }}>
            <Heart size={18} fill="var(--floral-gold-bright)" />
            <span className="font-sans" style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.15em' }}>
              {weddingData.couple.groom} & {weddingData.couple.bride}
            </span>
          </div>

          <button
            onClick={handleReplay}
            className="cta-button-gold"
            aria-label="Replay experience from top"
          >
            <RotateCcw size={18} />
            <span>Replay Experience</span>
          </button>
        </FloatingGlassCard>
      </div>

      <footer style={{ marginTop: '5rem', opacity: 0.6, fontSize: '0.8rem', color: 'var(--text-ivory-muted)', letterSpacing: '0.15em' }}>
        <p>{weddingData.couple.hashtag} • DECEMBER 12, 2026</p>
      </footer>
    </section>
  );
}
