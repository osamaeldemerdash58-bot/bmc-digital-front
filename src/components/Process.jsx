import React from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';

export default function Process({ lang }) {
  useAnimate();
  const { data } = useData();
  const tx = data?.translations?.process?.[lang] || {};

  return (
    <section id="process" className="section" style={{ background: 'var(--bmc-dark-2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.3), transparent)',
      }} />

      <div className="container">
        <div className="section-header-anim" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 80px' }}>
          <p className="section-label">{tx.label}</p>
          <h2 className="section-title">{tx.title} <span>{tx.titleSpan}</span></h2>
          <div className="gold-line gold-line-animate" style={{ margin: '24px auto' }} />
        </div>

        <div style={{ position: 'relative' }}>
          {/* Vertical connecting line */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: lang === 'ar' ? 'auto' : '50%',
            right: lang === 'ar' ? '50%' : 'auto',
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(184,164,114,0.25) 20%, rgba(184,164,114,0.25) 80%, transparent)',
          }} />

          {tx.steps.map((step, i) => {
            const isEven = i % 2 === 0;
            const isRight = lang === 'ar' ? !isEven : isEven;
            // Alternating slide directions for zigzag effect
            const animClass = isRight ? 'process-left' : 'process-right';

            return (
              <div
                key={i}
                className={animClass}
                style={{
                  display: 'flex',
                  justifyContent: isRight ? 'flex-start' : 'flex-end',
                  marginBottom: i < tx.steps.length - 1 ? 48 : 0,
                  transitionDelay: `${i * 0.12}s`,
                }}
              >
                <div style={{ width: 'calc(50% - 40px)' }}>
                  <div
                    style={{
                      background: 'var(--bmc-dark-3)',
                      border: '1px solid rgba(184,164,114,0.12)',
                      padding: '32px 36px',
                      position: 'relative',
                      transition: 'border-color 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(184,164,114,0.35)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(184,164,114,0.12)'}
                  >
                    <div style={{
                      fontFamily: 'Playfair Display, serif',
                      fontSize: 48,
                      fontWeight: 900,
                      color: 'rgba(184,164,114,0.1)',
                      lineHeight: 1,
                      marginBottom: -8,
                    }}>{step.num}</div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 12 }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.55)', lineHeight: 1.9 }}>{step.desc}</p>

                    {/* Dot on center line */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      [isRight ? (lang === 'ar' ? 'left' : 'right') : (lang === 'ar' ? 'right' : 'left')]: -48,
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      background: 'var(--bmc-gold)',
                      border: '3px solid var(--bmc-dark-2)',
                      boxShadow: '0 0 12px rgba(184,164,114,0.5)',
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #process .container > div:last-child > div { justify-content: flex-start !important; }
          #process .container > div:last-child > div > div { width: 90% !important; margin-right: auto !important; }
          .process-left, .process-right { transform: translateX(0) translateY(40px) !important; }
        }
      `}</style>
    </section>
  );
}