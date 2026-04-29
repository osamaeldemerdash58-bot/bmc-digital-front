// ═══════════════════════════════════════════════
// Tech.jsx — animated
// ═══════════════════════════════════════════════
import React from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';

export function Tech({ lang }) {
  useAnimate();
  const { data } = useData();
  const tx = data?.translations?.tech?.[lang] || {};
  const techs = data?.techs || [];

  return (
    <section id="tech" className="section" style={{ background: 'var(--bmc-dark)', position: 'relative', overflow: 'hidden' }}>
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
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: 'rgba(184,164,114,0.08)',
        }}>
          {techs.map((tech, i) => (
            <div
              key={i}
              className="tech-card"
              style={{
                background: 'var(--bmc-dark)',
                padding: '32px 24px',
                textAlign: 'center',
                transitionDelay: `${i * 0.04}s`,
                cursor: 'default',
                transition: `background 0.3s, opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bmc-dark-3)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bmc-dark)'}
            >
              <div style={{
                width: 48, height: 48,
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: `${tech.color}15`,
                border: `1px solid ${tech.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontWeight: 900,
                color: tech.color,
                fontFamily: 'Playfair Display, serif',
              }}>
                {tech.name[0]}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(245,240,232,0.7)' }}>
                {tech.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #tech .container > div:last-child { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          #tech .container > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}

export default Tech;