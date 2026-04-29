import React from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';

const serviceIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <path d="M8 21h8M12 17v4"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 01-8 0"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="1"/>
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    <line x1="12" y1="12" x2="12" y2="16"/>
    <line x1="8" y1="12" x2="8" y2="16"/>
    <line x1="16" y1="12" x2="16" y2="16"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 8v4l3 3"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 014 4v1h1a3 3 0 010 6h-1v1a4 4 0 01-8 0v-1H7a3 3 0 010-6h1V6a4 4 0 014-4z"/>
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>,
];

export default function Services({ lang }) {
  useAnimate();
  const { data } = useData();
  const tx = data?.translations?.services?.[lang] || {};
  const isOddCount = (tx.items || []).length % 2 !== 0;

  return (
    <section id="services" className="section" style={{ background: 'var(--bmc-dark)', position: 'relative', overflow: 'hidden', padding: '100px 0' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(80px, 15vw, 200px)',
        fontWeight: 900,
        color: 'rgba(184,164,114,0.025)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        letterSpacing: 20,
        zIndex: 0,
      }}>SERVICES</div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Section header — slides up */}
        <div className="section-header-anim" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
          <p className="section-label">{tx.label}</p>
          <h2 className="section-title services-title-line">{tx.title} <span>{tx.titleSpan}</span></h2>
          <div className="gold-line gold-line-animate" style={{ margin: '24px auto' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(184,164,114,0.1)',
        }}>
          {tx.items.map((item, i) => {
            const isLast = i === tx.items.length - 1;
            const isFeatured = isLast && isOddCount;

            return (
              <div
                key={i}
                className="card-grid-item"
                style={{
                  background: 'var(--bmc-dark)',
                  padding: isFeatured ? '48px 40px' : '40px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'default',
                  gridColumn: isFeatured ? '1 / -1' : undefined,
                  display: isFeatured ? 'flex' : 'block',
                  flexDirection: isFeatured ? 'row' : undefined,
                  alignItems: isFeatured ? 'flex-start' : undefined,
                  gap: isFeatured ? 32 : undefined,
                  transitionDelay: `${i * 0.08}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bmc-dark-3)';
                  const line = e.currentTarget.querySelector('.svc-line');
                  if (line) line.style.width = '100%';
                  const icon = e.currentTarget.querySelector('.svc-icon');
                  if (icon) {
                    icon.style.transform = 'translateY(-3px)';
                    icon.style.borderColor = 'rgba(184,164,114,0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bmc-dark)';
                  const line = e.currentTarget.querySelector('.svc-line');
                  if (line) line.style.width = '0';
                  const icon = e.currentTarget.querySelector('.svc-icon');
                  if (icon) {
                    icon.style.transform = 'translateY(0)';
                    icon.style.borderColor = 'rgba(184,164,114,0.25)';
                  }
                }}
              >
                {isFeatured ? (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(184,164,114,0.4)', fontFamily: 'Playfair Display, serif' }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="svc-icon" style={{
                        width: 64, height: 64, border: '1px solid rgba(184,164,114,0.25)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--bmc-gold)', flexShrink: 0, transition: 'all 0.3s',
                      }}>
                        <div style={{ width: 30, height: 30, color: 'var(--bmc-gold)' }}>
                          {React.cloneElement(serviceIcons[i] || serviceIcons[0], { style: { width: '100%', height: '100%', stroke: 'var(--bmc-gold)' } })}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      flex: 1,
                      borderLeft: lang === 'en' ? '1px solid rgba(184,164,114,0.15)' : 'none',
                      borderRight: lang === 'ar' ? '1px solid rgba(184,164,114,0.15)' : 'none',
                      paddingLeft: lang === 'en' ? 32 : 0,
                      paddingRight: lang === 'ar' ? 32 : 0,
                    }}>
                      <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 16, lineHeight: 1.4 }}>{item.title}</h3>
                      <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.65)', lineHeight: 1.85, maxWidth: 800 }}>{item.desc}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(184,164,114,0.4)', fontFamily: 'Playfair Display, serif', marginBottom: 20 }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="svc-icon" style={{
                      width: 48, height: 48, border: '1px solid rgba(184,164,114,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 20, flexShrink: 0, transition: 'all 0.3s',
                    }}>
                      <div style={{ width: 22, height: 22 }}>
                        {React.cloneElement(serviceIcons[i] || serviceIcons[0], { style: { width: '100%', height: '100%', stroke: 'var(--bmc-gold)' } })}
                      </div>
                    </div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 12, lineHeight: 1.4 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.55)', lineHeight: 1.85 }}>{item.desc}</p>
                  </>
                )}

                <div className="svc-line" style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: 0, height: 2,
                  background: 'var(--bmc-gold)',
                  transition: 'width 0.4s ease',
                  zIndex: 2,
                }} />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services-title-line {
          white-space: nowrap;
        }
        @media (max-width: 900px) {
          #services .container > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .services-title-line { white-space: normal; }
        }
        @media (max-width: 600px) {
          #services .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
