import React from 'react';
import { weddingData } from '../../data/weddingData';
import { MapPin, Calendar, Clock, Navigation, CalendarPlus } from 'lucide-react';

export default function CleanInvitation() {
  const templeVenue = weddingData.venue || {};
  const events = weddingData.eventsList || [];
  const thaalikettu = events[0] || {};
  const weddingFeast = events[1] || {};
  const reception = events[2] || {};

  const handleGoogleMaps = (url) => {
    window.open(url || templeVenue.googleMapsUrl || 'https://maps.google.com', '_blank', 'noopener,noreferrer');
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`${weddingData.couple.groom} & ${weddingData.couple.bride}'s Wedding`);
    const details = encodeURIComponent(`Thaali Kettu: ${thaalikettu.date} at ${templeVenue.name}. Feast: ${weddingFeast.venueName}. Reception: ${reception.date} at ${reception.location}.`);
    const location = encodeURIComponent(`${templeVenue.name}, ${templeVenue.city}`);
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20260913T043000Z/20260914T100000Z`;
    window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      style={{
        position: 'relative',
        padding: '6rem 1.5rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        zIndex: 'var(--z-content, 20)',
      }}
    >
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="font-script reflective-text" style={{ fontSize: '2.25rem', display: 'block' }}>
          Official Invitation
        </span>
        <h2 className="font-hero reflective-text" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0.4rem 0' }}>
          The Sacred Union
        </h2>
        <p className="font-sans" style={{ color: 'var(--text-muted)', letterSpacing: '0.15em', fontSize: '0.85rem', fontWeight: 600 }}>
          SEPTEMBER 13 & 14, 2026 • KERALA, INDIA
        </p>
      </div>

      {/* Clean Minimalist Invitation Card */}
      <div
        className="glass-card-minimal"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: '3rem 2rem',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <span className="font-script" style={{ fontSize: '2rem', color: 'var(--gold-deep)', display: 'block', marginBottom: '0.5rem' }}>
          We Request the Honour of Your Presence
        </span>
        <h3 className="font-hero reflective-text" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '0.75rem' }}>
          {weddingData.couple.groomFull} & {weddingData.couple.brideFull}
        </h3>
        <p className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--text-dark-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
          Together with their families, cordially invite you to share in their joy as they tie the sacred knot at <strong>{templeVenue.name}</strong>.
        </p>

        {/* 3-Part Event Summary Breakdown Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '1.25rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--overlay-gold-border)',
            marginBottom: '2rem',
            textAlign: 'left',
          }}
        >
          {/* 1. Temple Thaali Kettu */}
          <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1.15rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
            <span style={{ fontSize: '0.675rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-deep)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
              1. Thaali Kettu
            </span>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark-primary)', marginBottom: '0.35rem' }}>
              Sunday, Sep 13
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dark-secondary)' }}>
              <Clock size={12} style={{ display: 'inline', marginRight: '4px', color: 'var(--gold-deep)' }} />
              10:00 AM – 10:30 AM
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dark-secondary)', marginTop: '0.25rem', fontWeight: 600 }}>
              <MapPin size={12} style={{ display: 'inline', marginRight: '4px', color: 'var(--gold-deep)' }} />
              {templeVenue.name}
            </p>
          </div>

          {/* 2. Auditorium Wedding Feast */}
          <div style={{ background: 'rgba(132, 169, 140, 0.12)', padding: '1.15rem', borderRadius: '16px', border: '1px solid rgba(132, 169, 140, 0.35)' }}>
            <span style={{ fontSize: '0.675rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-dark-secondary)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
              2. Wedding Feast
            </span>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark-primary)', marginBottom: '0.35rem' }}>
              Sunday, Sep 13
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dark-secondary)' }}>
              <Clock size={12} style={{ display: 'inline', marginRight: '4px', color: 'var(--gold-deep)' }} />
              11:00 AM Onwards
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dark-secondary)', marginTop: '0.25rem', fontWeight: 600 }}>
              <MapPin size={12} style={{ display: 'inline', marginRight: '4px', color: 'var(--gold-deep)' }} />
              {weddingFeast.venueName}
            </p>
          </div>

          {/* 3. Ayyampilly Reception */}
          <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '1.15rem', borderRadius: '16px', border: '1px solid rgba(212, 175, 55, 0.3)' }}>
            <span style={{ fontSize: '0.675rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-deep)', fontWeight: 700, display: 'block', marginBottom: '0.25rem' }}>
              3. Reception
            </span>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark-primary)', marginBottom: '0.35rem' }}>
              Monday, Sep 14
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dark-secondary)' }}>
              <Clock size={12} style={{ display: 'inline', marginRight: '4px', color: 'var(--gold-deep)' }} />
              11:00 AM Onwards
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dark-secondary)', marginTop: '0.25rem', fontWeight: 600 }}>
              <MapPin size={12} style={{ display: 'inline', marginRight: '4px', color: 'var(--gold-deep)' }} />
              Ayyampilly, Vypin
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <button onClick={() => handleGoogleMaps(templeVenue.googleMapsUrl)} className="btn-gold">
            <Navigation size={16} /> Temple Directions
          </button>
          <button onClick={handleAddToCalendar} className="btn-outline">
            <CalendarPlus size={16} /> Add to Calendar
          </button>
        </div>
      </div>
    </section>
  );
}
