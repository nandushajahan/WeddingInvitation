import React from 'react';
import { weddingData } from '../../data/weddingData';
import { MapPin, Clock, Calendar, Navigation } from 'lucide-react';

export default function CleanEvents() {
  const events = weddingData.eventsList || [];

  const handleMapClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '5rem 1.5rem',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 'var(--z-content, 20)',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <span className="font-script reflective-text" style={{ fontSize: '2.25rem', display: 'block' }}>
          Schedule of Events
        </span>
        <h2 className="font-hero reflective-text" style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}>
          Wedding & Reception
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem', letterSpacing: '0.05em' }}>
          Temple Muhurtham, Auditorium Feast & Ayyampilly Reception — tap below for individual venue directions
        </p>
      </div>

      {/* Grid of 3 Event Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1080px',
          width: '100%',
          margin: '0 auto',
        }}
      >
        {events.map((event, index) => (
          <div
            key={event.id || index}
            className="glass-card-minimal"
            style={{
              padding: '2.25rem 1.75rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Date Badge */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  color: 'var(--gold-deep)',
                  fontSize: '0.725rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '1.25rem',
                }}
              >
                <Calendar size={13} />
                <span>{event.date}</span>
              </div>

              {/* Event Title */}
              <h3 className="font-hero reflective-text" style={{ fontSize: '1.65rem', marginBottom: '0.35rem' }}>
                {event.title}
              </h3>
              {event.subTitle && (
                <span className="font-sans" style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1.25rem', fontWeight: 500 }}>
                  {event.subTitle}
                </span>
              )}

              {/* Details */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem',
                  color: 'var(--text-dark-secondary)',
                  fontSize: '0.9rem',
                  textAlign: 'left',
                  marginBottom: '1.75rem',
                  paddingTop: '1.15rem',
                  borderTop: '1px solid rgba(132, 169, 140, 0.25)',
                }}
              >
                {/* Time */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <Clock size={16} style={{ color: 'var(--gold-deep)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>
                      Time
                    </span>
                    <span style={{ fontWeight: 600, color: 'var(--text-dark-primary)' }}>{event.time}</span>
                  </div>
                </div>

                {/* Venue Name & Location */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
                  <MapPin size={16} style={{ color: 'var(--gold-deep)', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', fontWeight: 600 }}>
                      Venue & Location
                    </span>
                    <span style={{ fontWeight: 700, color: 'var(--text-dark-primary)', display: 'block' }}>
                      {event.venueName}
                    </span>
                    <span style={{ fontSize: '0.825rem', color: 'var(--text-dark-secondary)' }}>
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Directions Button */}
            <button
              onClick={() => handleMapClick(event.googleMapsUrl)}
              className="btn-gold"
              style={{ width: '100%', fontSize: '0.8rem', padding: '0.75rem 1.25rem' }}
            >
              <Navigation size={14} /> Directions
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
