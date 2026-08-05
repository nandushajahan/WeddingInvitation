import React, { useState, useEffect } from 'react';
import { weddingData } from '../../data/weddingData';
import { Clock, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CleanCountdownRSVP() {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [formData, setFormData] = useState({ name: '', attendance: 'yes', guests: '1', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // Live Countdown
  useEffect(() => {
    const targetDate = new Date(weddingData.eventDate.iso).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Fire golden confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F5D68B', '#D4AF37', '#B38A20'],
    });
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '5rem 1.5rem 8rem 1.5rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4rem',
        zIndex: 'var(--z-content, 20)',
      }}
    >
      {/* Live Countdown Section */}
      <div style={{ textAlign: 'center', maxWidth: '650px', width: '100%' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-deep)', marginBottom: '0.5rem' }}>
          <Clock size={18} />
          <span className="font-sans" style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
            Counting Down The Moments
          </span>
        </div>
        <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', marginBottom: '2rem' }}>
          Until We Say I Do
        </h2>

        {/* Countdown Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {[
            { label: 'Days', val: timeLeft.days },
            { label: 'Hours', val: timeLeft.hours },
            { label: 'Mins', val: timeLeft.minutes },
            { label: 'Secs', val: timeLeft.seconds },
          ].map((item, i) => (
            <div
              key={i}
              className="glass-card-minimal"
              style={{
                padding: '1.25rem 0.5rem',
                textAlign: 'center',
              }}
            >
              <span className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.75rem)', fontWeight: 700, display: 'block' }}>
                {item.val}
              </span>
              <span className="font-sans" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
