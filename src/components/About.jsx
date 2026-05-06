import React from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';

export default function About({ lang }) {
  useAnimate();
  const { data } = useData();
  const tx = data?.translations?.about?.[lang] || {};
  const aboutLabel = lang === 'ar' ? 'البنية الماسية الرقمية' : (tx.label || 'About Us');
  const whatsappUrl = 'https://wa.me/966535166370';

  return (
    <section id="about" className="section" style={{ background: 'var(--bmc-dark-2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.3), transparent)',
      }} />

      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 80, alignItems: 'center' }}>

          {/* Left: Text */}
          <div className="about-text">
            <p className="section-label">{aboutLabel}</p>
            <h2 className="section-title" style={{ marginBottom: 8 }}>{tx.title}</h2>
            <h2 className="section-title" style={{ marginBottom: 32 }}><span>{tx.titleSpan}</span></h2>
            <div className="gold-line gold-line-animate" style={{ marginBottom: 32 }} />
            <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.65)', lineHeight: 2, marginBottom: 20 }}>{tx.desc1}</p>
            <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.65)', lineHeight: 2 }}>{tx.desc2}</p>

            <a
              href={whatsappUrl}
              className="snake-btn"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                marginTop: 40, padding: '12px 28px',
                border: '1px solid rgba(184,164,114,0.4)',
                color: 'var(--bmc-gold)', fontSize: 13, fontWeight: 700,
                textDecoration: 'none', letterSpacing: 0.5, borderRadius: 2,
                transition: 'all 0.3s',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(184,164,114,0.1)';
                e.currentTarget.style.borderColor = 'var(--bmc-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(184,164,114,0.4)';
              }}
            >
              <span className="snake-light" />
              {lang === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-text, .about-stats { transform: translateX(0) translateY(40px) !important; }
        }
      `}</style>
    </section>
  );
}
