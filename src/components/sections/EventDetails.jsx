import React from 'react';
import FloatingGlassCard from '../3d/FloatingGlassCard';
import BotanicalBouquet from '../nature/BotanicalBouquet';
import { weddingData } from '../../data/weddingData';
import { MapPin, CalendarPlus, Clock, Navigation } from 'lucide-react';

export default function EventDetails() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <span className="font-script gold-gradient-text" style={{ fontSize: '2.5rem' }}>
          Schedule of Celebrations
        </span>
        <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', margin: '0.5rem 0' }}>
          Event Details & Venue
        </h2>
        <BotanicalBouquet type="divider" color="var(--floral-gold-bright)" className="max-w-xs mx-auto" />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          marginBottom: '5rem',
        }}
      >
        {weddingData.eventsList.map((evt) => (
          <FloatingGlassCard key={evt.id} style={{ padding: '2.5rem 2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--nature-sage-light)', marginBottom: '0.75rem' }}>
                <BotanicalBouquet type="bee" size={20} color="var(--floral-gold-bright)" />
                <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {evt.subTitle}
                </span>
              </div>
              <h3 className="font-hero gold-gradient-text" style={{ fontSize: '1.75rem', marginBottom: '1.25rem' }}>
                {evt.title}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-ivory-subtle)', margin: '1.25rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Clock size={18} style={{ color: 'var(--floral-gold-bright)' }} />
                  <span>{evt.date} • <strong>{evt.time}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <MapPin size={18} style={{ color: 'var(--floral-gold-bright)', flexShrink: 0, marginTop: '3px' }} />
                  <span>{weddingData.venue.name}, {weddingData.venue.hall}</span>
                </div>
              </div>

              <div
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderLeft: '3px solid var(--floral-gold-base)',
                  margin: '1.5rem 0',
                }}
              >
                <p style={{ fontSize: '0.85rem', color: 'var(--floral-gold-bright)', fontWeight: 600, marginBottom: '0.2rem' }}>
                  Attire / Dress Code:
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-ivory-muted)' }}>
                  {evt.dressCode}
                </p>
              </div>

              <p className="font-serif" style={{ fontSize: '1.05rem', color: 'var(--text-ivory-muted)', lineHeight: '1.7' }}>
                {evt.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
              <a
                href={weddingData.venue.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button-gold"
                style={{ flex: 1, padding: '0.75rem 1.25rem', fontSize: '0.8rem' }}
              >
                <CalendarPlus size={16} />
                <span>Add to Calendar</span>
              </a>
              <a
                href={weddingData.venue.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--text-ivory-bright)',
                  border: '1px solid var(--overlay-gold-border)',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.06)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                }}
              >
                <Navigation size={16} style={{ color: 'var(--nature-sage-light)' }} />
                <span>Google Maps</span>
              </a>
            </div>
          </FloatingGlassCard>
        ))}
      </div>
    </section>
  );
}
