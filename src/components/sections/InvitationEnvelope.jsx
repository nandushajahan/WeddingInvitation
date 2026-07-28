import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BotanicalBouquet from '../nature/BotanicalBouquet';
import { weddingData } from '../../data/weddingData';
import { MapPin, Calendar, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function InvitationEnvelope() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const flapRef = useRef(null);
  const letterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: 0.8,
          onUpdate: (self) => {
            if (self.progress > 0.45 && !isOpen) {
              setIsOpen(true);
            }
          }
        }
      });

      tl.to(flapRef.current, {
        rotateX: 180,
        transformOrigin: 'top center',
        duration: 1,
      })
      .to(letterRef.current, {
        y: '-140px',
        scale: 1.05,
        duration: 1.2,
      }, '-=0.4');

    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        padding: '7rem 1.5rem',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div style={{ marginBottom: '3rem' }}>
        <span className="font-script gold-gradient-text" style={{ fontSize: '2.25rem' }}>
          Official Invitation
        </span>
        <h2 className="font-hero gold-gradient-text" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', margin: '0.5rem 0' }}>
          The Botanical Ceremony
        </h2>
        <p className="font-sans" style={{ color: 'var(--text-ivory-muted)', letterSpacing: '0.15em', fontSize: '0.875rem' }}>
          SCROLL TO UNSEAL THE ENVELOPE
        </p>
      </div>

      {/* 3D Premium Gold & Emerald Envelope Container */}
      <div
        style={{
          position: 'relative',
          maxWidth: '600px',
          width: '95%',
          perspective: '1200px',
          margin: '0 auto 6rem auto',
        }}
      >
        {/* Envelope Back Body */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '380px',
            background: 'linear-gradient(145deg, #153823 0%, #06140b 100%)',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--floral-gold-base)',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(212, 175, 55, 0.25)',
            overflow: 'visible',
            padding: '2rem 1.5rem',
          }}
        >
          {/* Unfolding Invitation Letter Card */}
          <div
            ref={letterRef}
            style={{
              position: 'relative',
              width: '100%',
              background: 'linear-gradient(180deg, #faf6ee 0%, #f4efe6 100%)',
              color: '#0d2818',
              borderRadius: 'var(--radius-sm)',
              padding: '2.5rem 2rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
              zIndex: 2,
              border: '2px solid var(--floral-gold-base)',
              transition: 'transform 0.5s ease',
            }}
          >
            <BotanicalBouquet type="bouquet" size={48} className="mx-auto" />
            <span className="font-script" style={{ fontSize: '2rem', color: '#b38a20', display: 'block', margin: '0.5rem 0' }}>
              We Request the Honour of Your Presence
            </span>
            <h3 className="font-hero" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', color: '#06140b', marginBottom: '0.5rem' }}>
              {weddingData.couple.groomFull} & {weddingData.couple.brideFull}
            </h3>
            <p className="font-serif" style={{ fontSize: '1.1rem', color: '#3b5242', margin: '1rem 0 1.5rem 0', lineHeight: '1.6' }}>
              Together with their families, cordially invite you to share in their joy as they are united under nature's canopy.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid #d4cfc3', paddingTop: '1.25rem' }}>
              <div>
                <Calendar size={18} style={{ color: '#b38a20', marginBottom: '0.25rem' }} />
                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#667a6b' }}>Date</h4>
                <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{weddingData.eventDate.displayDate}</p>
              </div>
              <div>
                <Clock size={18} style={{ color: '#b38a20', marginBottom: '0.25rem' }} />
                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#667a6b' }}>Ceremony</h4>
                <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>10:15 AM – 11:30 AM</p>
              </div>
              <div>
                <MapPin size={18} style={{ color: '#b38a20', marginBottom: '0.25rem' }} />
                <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#667a6b' }}>Venue</h4>
                <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>Grand Hyatt Kochi Lawn</p>
              </div>
            </div>
          </div>

          {/* Hinged Top Envelope Flap */}
          <div
            ref={flapRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '180px',
              background: 'linear-gradient(180deg, #1f4b2e 0%, #153823 100%)',
              borderBottom: '2px solid var(--floral-gold-bright)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              transformStyle: 'preserve-3d',
              zIndex: 3,
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Wax Seal Motif */}
            <div
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, var(--floral-gold-bright) 0%, var(--floral-gold-deep) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.6)',
              }}
            >
              <BotanicalBouquet type="bouquet" size={24} color="var(--bg-emerald-base)" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
