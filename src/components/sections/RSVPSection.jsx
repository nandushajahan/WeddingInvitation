import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import FloatingGlassCard from '../3d/FloatingGlassCard';
import KeralaMotif from '../common/KeralaMotif';
import { weddingData } from '../../data/weddingData';
import { Send, CheckCircle2, User, Users, MessageSquare } from 'lucide-react';

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'attending',
    guestCount: 1,
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Launch celebratory gold confetti fireworks!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f5d68b', '#d4af37', '#faf7f2', '#2dd4bf'],
    });
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        maxWidth: '760px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span className="font-script cyan-gold-text" style={{ fontSize: '2.5rem' }}>
          Response Requested
        </span>
        <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', margin: '0.5rem 0' }}>
          RSVP For Our Wedding
        </h2>
        <p style={{ color: 'var(--text-ivory-muted)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
          PLEASE RESPOND BY {weddingData.rsvp.deadline.toUpperCase()}
        </p>
      </div>

      <FloatingGlassCard style={{ padding: '3rem 2rem' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={56} style={{ color: 'var(--futuristic-cyan-glow)', margin: '0 auto 1.25rem auto' }} />
            <h3 className="font-hero gold-gradient-text" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
              Thank You, {formData.name}!
            </h3>
            <p className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--text-ivory-subtle)' }}>
              {formData.attendance === 'attending'
                ? "We are overjoyed to celebrate our special day with you in Kochi!"
                : "We will miss your presence, but thank you for your warm wishes!"}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {/* Guest Name */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--kasavu-gold-bright)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <User size={16} />
                Your Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Nair"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--overlay-gold-border)',
                  color: 'var(--text-ivory-bright)',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>

            {/* Attendance Radios */}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--kasavu-gold-bright)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                Will You Be Attending?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'attending' })}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: formData.attendance === 'attending' ? '2px solid var(--kasavu-gold-bright)' : '1px solid var(--overlay-gold-border)',
                    background: formData.attendance === 'attending' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    color: 'var(--text-ivory-bright)',
                    fontWeight: 600,
                  }}
                >
                  Joyfully Accepts ✨
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: 'declining' })}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: formData.attendance === 'declining' ? '2px solid var(--kasavu-gold-bright)' : '1px solid var(--overlay-gold-border)',
                    background: formData.attendance === 'declining' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                    color: 'var(--text-ivory-bright)',
                    fontWeight: 600,
                  }}
                >
                  Regretfully Declines 🤍
                </button>
              </div>
            </div>

            {/* Number of Guests */}
            {formData.attendance === 'attending' && (
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--kasavu-gold-bright)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <Users size={16} />
                  Number of Attending Guests
                </label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) })}
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    borderRadius: 'var(--radius-sm)',
                    background: '#0e1733',
                    border: '1px solid var(--overlay-gold-border)',
                    color: 'var(--text-ivory-bright)',
                    fontSize: '1rem',
                    outline: 'none',
                  }}
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4+ Family Members</option>
                </select>
              </div>
            )}

            {/* Optional Wishes Message */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--kasavu-gold-bright)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                <MessageSquare size={16} />
                Message for Nandu & Sravya (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Share a sweet memory, blessing, or song request..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--overlay-gold-border)',
                  color: 'var(--text-ivory-bright)',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical',
                }}
              />
            </div>

            <button type="submit" className="cta-button-gold" style={{ width: '100%', marginTop: '0.5rem' }}>
              <Send size={18} />
              <span>Confirm Response</span>
            </button>
          </form>
        )}
      </FloatingGlassCard>
    </section>
  );
}
