// ═══════════════════════════════════════════════
// Works.jsx — animated version
// ═══════════════════════════════════════════════
import React, { useState } from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';

const colors = [
  'linear-gradient(135deg, #1a2220 0%, #0f1512 100%)',
  'linear-gradient(135deg, #1a1a14 0%, #0f0f0a 100%)',
  'linear-gradient(135deg, #141a1a 0%, #0a0f0f 100%)',
  'linear-gradient(135deg, #1a1520 0%, #0f0a15 100%)',
  'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
  'linear-gradient(135deg, #141a14 0%, #0a0f0a 100%)',
];

export function Works({ lang }) {
  useAnimate();
  const { data } = useData();
  const tx = data?.translations?.works?.[lang] || {};
  const [hovered, setHovered] = useState(null);

  return (
    <section id="works" className="section" style={{ background: 'var(--bmc-dark-3)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.3), transparent)',
      }} />

      <div className="container">
        <div className="section-header-anim" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
          <p className="section-label">{tx.label}</p>
          <h2 className="section-title">{tx.title} <span>{tx.titleSpan}</span></h2>
          <div className="gold-line gold-line-animate" style={{ margin: '24px auto' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(184,164,114,0.08)',
        }}>
          {tx.items.map((item, i) => (
            <div
              key={i}
              className="works-card"
              style={{
                background: hovered === i ? colors[i] : 'var(--bmc-dark-3)',
                padding: '48px 36px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transitionDelay: `${i * 0.1}s`,
                transition: 'background 0.5s ease, opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(48px, 8vw, 80px)',
                fontWeight: 900,
                color: hovered === i ? 'rgba(184,164,114,0.15)' : 'rgba(184,164,114,0.06)',
                lineHeight: 1,
                marginBottom: -16,
                transition: 'color 0.4s',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <h3 style={{
                fontSize: 20,
                fontWeight: 700,
                color: hovered === i ? 'var(--bmc-white)' : 'rgba(245,240,232,0.85)',
                marginBottom: 10,
                lineHeight: 1.3,
                transition: 'color 0.3s',
              }}>
                {item.title}
              </h3>

              <p style={{ fontSize: 12, color: 'var(--bmc-gold)', fontWeight: 600, letterSpacing: 1, marginBottom: 16 }}>
                {item.category}
              </p>

              <div style={{
                display: 'inline-block',
                padding: '5px 12px',
                background: 'rgba(184,164,114,0.08)',
                border: '1px solid rgba(184,164,114,0.15)',
                fontSize: 11,
                color: 'rgba(245,240,232,0.5)',
                letterSpacing: 0.5,
                borderRadius: 2,
              }}>
                {item.tag}
              </div>

              <div style={{
                position: 'absolute',
                bottom: 24,
                right: lang === 'ar' ? 'auto' : 24,
                left: lang === 'ar' ? 24 : 'auto',
                opacity: hovered === i ? 1 : 0,
                transform: hovered === i ? 'translate(0, 0)' : 'translate(8px, 8px)',
                transition: 'all 0.3s',
                color: 'var(--bmc-gold)',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                width: hovered === i ? '100%' : 0,
                height: 2,
                background: 'var(--bmc-gold)',
                transition: 'width 0.4s ease',
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #works .container > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          #works .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

export default Works;