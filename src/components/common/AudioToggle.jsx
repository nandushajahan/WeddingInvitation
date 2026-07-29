import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingData } from '../../data/weddingData';

export default function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize custom theme audio from /music/bgm.mp3
    audioRef.current = new Audio(weddingData.music.src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Audio playback interrupted or blocked:", err);
        setIsPlaying(false);
      });
    }
  };

  return (
    <div 
      className="audio-control-fixed"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 'var(--z-floating-ui, 30)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem'
      }}
    >
      <button
        onClick={toggleAudio}
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
        title={isPlaying ? `Mute ${weddingData.music.trackTitle}` : `Play ${weddingData.music.trackTitle}`}
        style={{
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          backgroundColor: `rgba(255, 255, 255, var(--glass-audio-toggle-alpha))`,
          border: '1px solid rgba(132, 169, 140, 0.45)',
          color: 'var(--gold-deep)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(var(--glass-blur-light))',
          WebkitBackdropFilter: 'blur(var(--glass-blur-light))',
          boxShadow: '0 8px 25px rgba(13, 40, 24, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isPlaying ? 'scale(1.06)' : 'scale(1)',
        }}
      >
        {isPlaying ? (
          <Volume2 size={20} style={{ color: 'var(--gold-deep)' }} />
        ) : (
          <VolumeX size={20} style={{ color: 'var(--text-muted)' }} />
        )}
      </button>

      {/* Audio Wave Bar Indicator when playing */}
      {isPlaying && (
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '16px' }} aria-hidden="true">
          <span className="wave-bar bar-1" />
          <span className="wave-bar bar-2" />
          <span className="wave-bar bar-3" />
        </div>
      )}

      <style>{`
        .wave-bar {
          width: 3px;
          background: var(--gold-deep);
          border-radius: 2px;
          animation: wave 1.2s ease-in-out infinite alternate;
        }
        .bar-1 { height: 60%; animation-delay: 0s; }
        .bar-2 { height: 100%; animation-delay: 0.3s; }
        .bar-3 { height: 40%; animation-delay: 0.6s; }

        @keyframes wave {
          0% { height: 20%; opacity: 0.5; }
          100% { height: 100%; opacity: 1; }
        }
      `}</style>
    </div>
  );
}
