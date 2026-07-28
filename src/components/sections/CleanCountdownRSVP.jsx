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
      {/* 1. Live Countdown Section */}
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

      {/* 2. Minimal Glass RSVP Form */}
      <div
        className="glass-card-minimal"
        style={{
          maxWidth: '540px',
          width: '100%',
          padding: '2.75rem 2rem',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="font-script gold-gradient-text" style={{ fontSize: '2rem', display: 'block' }}>
            RSVP
          </span>
          <h3 className="font-hero gold-gradient-text" style={{ fontSize: '1.85rem' }}>
            Will You Join Us?
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Please respond by September 10, 2026
          </p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={48} style={{ color: 'var(--gold-base)', margin: '0 auto 1rem auto' }} />
            <h4 className="font-hero gold-gradient-text" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Response Received!
            </h4>
            <p style={{ color: 'var(--text-dark-secondary)', fontSize: '0.95rem' }}>
              Thank you, {formData.name || 'dear guest'}! We look forward to celebrating with you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your name"
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid var(--overlay-gold-border)',
                  color: 'var(--text-dark-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                Attendance
              </label>
              <select
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid var(--overlay-gold-border)',
                  color: 'var(--text-dark-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              >
                <option value="yes" style={{ background: '#FAF8F5' }}>Joyfully Accept</option>
                <option value="no" style={{ background: '#FAF8F5' }}>Regretfully Decline</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dark-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem', fontWeight: 600 }}>
                Warm Message or Wishes
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Leave a message for Nandu & Sravya..."
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: '1px solid var(--overlay-gold-border)',
                  color: 'var(--text-dark-primary)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  resize: 'none',
                }}
              />
            </div>

            <button type="submit" className="btn-gold" style={{ marginTop: '0.5rem', width: '100%' }}>
              <Send size={16} /> Confirm RSVP
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
