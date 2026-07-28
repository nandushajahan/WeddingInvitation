import React, { useState, useEffect } from 'react';
import FloatingGlassCard from '../3d/FloatingGlassCard';
import KeralaMotif from '../common/KeralaMotif';
import { weddingData } from '../../data/weddingData';
import { Clock } from 'lucide-react';

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(weddingData.eventDate.iso).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: '3.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--futuristic-cyan-glow)', marginBottom: '0.5rem' }}>
          <Clock size={18} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Counting Down To Forever
          </span>
        </div>
        <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', margin: '0.5rem 0' }}>
          Until We Say "I Do"
        </h2>
        <KeralaMotif type="divider" color="var(--kasavu-gold-bright)" className="max-w-xs mx-auto" />
      </div>

      {/* 4 Time Units Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {timeUnits.map((unit) => (
          <FloatingGlassCard key={unit.label} style={{ padding: '2rem 1rem' }}>
            <div
              className="font-hero cyan-gold-text"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 3.75rem)',
                fontWeight: 700,
                lineHeight: 1,
                marginBottom: '0.5rem',
                filter: 'drop-shadow(0 2px 10px rgba(45, 212, 191, 0.4))',
              }}
            >
              {String(unit.value).padStart(2, '0')}
            </div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-ivory-muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {unit.label}
            </div>
          </FloatingGlassCard>
        ))}
      </div>
    </section>
  );
}
