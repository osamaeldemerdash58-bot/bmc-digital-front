import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';

/* ─────────────────────────────────────────
   3D Flip Card
───────────────────────────────────────── */
function FlipCard({ front, back, delay = 0, isIn }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      style={{
        opacity: isIn ? 1 : 0,
        transform: isIn ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
        perspective: 1000,
        cursor: 'pointer',
        minHeight: 220,
      }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div style={{
        position: 'relative',
        width: '100%', height: '100%', minHeight: 220,
        transformStyle: 'preserve-3d',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.65s cubic-bezier(0.4,0.2,0.2,1)',
      }}>
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          background: 'var(--bmc-dark-3)',
          border: '1px solid rgba(184,164,114,0.12)',
          padding: '32px 30px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}>
          {front}
        </div>
        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(135deg, rgba(184,164,114,0.14) 0%, rgba(184,164,114,0.04) 100%)',
          border: '1px solid rgba(184,164,114,0.4)',
          padding: '28px 28px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}>
          {back}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Animated Info Button
───────────────────────────────────────── */
function InfoButton({ lang }) {
  const isRtl = lang === 'ar';
  const [active, setActive] = useState(false);
  const [ripples, setRipples] = useState([]);
  const rippleId = useRef(0);

  const stats = [
    { icon: '⚡', label: isRtl ? 'متوسط وقت التسليم' : 'Avg. Delivery Time',       value: isRtl ? '٣٠ يوم' : '30 Days'   },
    { icon: '✓',  label: isRtl ? 'نسبة الإنجاز في الموعد' : 'On-Time Completion', value: '97%'                           },
    { icon: '🔄', label: isRtl ? 'جولات المراجعة' : 'Revision Rounds',            value: isRtl ? 'غير محدودة' : 'Unlimited' },
  ];

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = rippleId.current++;
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(r => r.id !== id)), 700);
    setActive(v => !v);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Button */}
      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {!active && [0, 1].map(n => (
          <div key={n} style={{
            position: 'absolute', inset: -(6 + n * 10), borderRadius: '50%',
            border: '1px solid rgba(184,164,114,0.22)',
            animation: `btnRing 2.4s ease-out ${n * 0.75}s infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        <button
          onClick={handleClick}
          style={{
            position: 'relative',
            width: 56, height: 56, borderRadius: '50%',
            background: active
              ? 'linear-gradient(135deg, rgba(184,164,114,0.32), rgba(184,164,114,0.12))'
              : 'linear-gradient(135deg, rgba(184,164,114,0.14), rgba(184,164,114,0.04))',
            border: `1.5px solid ${active ? 'rgba(184,164,114,0.65)' : 'rgba(184,164,114,0.28)'}`,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
            transition: 'background 0.4s, border-color 0.4s, transform 0.2s, box-shadow 0.4s',
            transform: active ? 'scale(0.92)' : 'scale(1)',
            boxShadow: active ? '0 0 28px rgba(184,164,114,0.28), inset 0 0 18px rgba(184,164,114,0.08)' : 'none',
          }}
        >
          {ripples.map(r => (
            <span key={r.id} style={{
              position: 'absolute', left: r.x, top: r.y,
              width: 4, height: 4, borderRadius: '50%',
              background: 'rgba(184,164,114,0.6)',
              transform: 'translate(-50%,-50%) scale(0)',
              animation: 'btnRipple 0.65s ease-out forwards',
              pointerEvents: 'none',
            }} />
          ))}
          <svg
            width="20" height="20" viewBox="0 0 24 24"
            fill="none" stroke="rgba(184,164,114,0.9)" strokeWidth="2"
            style={{
              transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
              transform: active ? 'rotate(135deg)' : 'rotate(0deg)',
            }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </button>
      </div>

      {/* Slide-down panel */}
      <div style={{
        overflow: 'hidden',
        maxHeight: active ? 220 : 0,
        opacity: active ? 1 : 0,
        transition: 'max-height 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.4s ease',
        marginTop: active ? 18 : 0,
        width: 300,
      }}>
        <div style={{
          background: 'var(--bmc-dark-3)',
          border: '1px solid rgba(184,164,114,0.2)',
          borderRadius: 4, padding: '18px 22px',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              flexDirection: isRtl ? 'row-reverse' : 'row',
              opacity: active ? 1 : 0,
              transform: active ? 'translateY(0)' : 'translateY(8px)',
              transition: `opacity 0.4s ease ${0.1 + i * 0.08}s, transform 0.4s ease ${0.1 + i * 0.08}s`,
            }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>{s.icon}</span>
              <span style={{ fontSize: 12, color: 'rgba(245,240,232,0.42)', flex: 1, textAlign: isRtl ? 'right' : 'left' }}>
                {s.label}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--bmc-gold)', flexShrink: 0 }}>
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Process Section
───────────────────────────────────────── */
export default function Process({ lang }) {
  useAnimate();
  const { data } = useData();
  const tx = data?.translations?.process?.[lang] || {};
  const [revealed, setRevealed] = useState({});
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerRef = useRef(null);
  const isRtl = lang === 'ar';

  useEffect(() => {
    const cards = document.querySelectorAll('.process-flip-wrap');
    if (!cards.length) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.dataset.index);
          setRevealed(prev => ({ ...prev, [idx]: true }));
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    cards.forEach(c => io.observe(c));
    return () => io.disconnect();
  }, [tx.steps]);

  useEffect(() => {
    if (!headerRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setHeaderVisible(true); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(headerRef.current);
    return () => io.disconnect();
  }, []);

  const steps = tx.steps || [];
  const row1 = steps.slice(0, 3);
  const row2 = steps.slice(3, 6);

  const buildCard = (step, i) => {
    const front = (
      <>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20,
          flexDirection: isRtl ? 'row-reverse' : 'row',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(184,164,114,0.18), rgba(184,164,114,0.06))',
            border: '1px solid rgba(184,164,114,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Playfair Display, serif', fontSize: 18, fontWeight: 900,
            color: 'var(--bmc-gold)', flexShrink: 0,
            boxShadow: '0 0 20px rgba(184,164,114,0.12)',
          }}>
            {step.num || String(i + 1).padStart(2, '0')}
          </div>
          <div style={{
            flex: 1, height: 1,
            background: `linear-gradient(${isRtl ? '270deg' : '90deg'}, rgba(184,164,114,0.3), transparent)`,
          }} />
        </div>

        <h3 style={{
          fontSize: 17, fontWeight: 700, color: 'var(--bmc-white)',
          marginBottom: 10, lineHeight: 1.4, textAlign: isRtl ? 'right' : 'left',
        }}>{step.title}</h3>

        <p style={{
          fontSize: 13, color: 'rgba(245,240,232,0.45)',
          lineHeight: 1.85, textAlign: isRtl ? 'right' : 'left',
        }}>{step.desc}</p>

        <div style={{
          marginTop: 20, display: 'flex', alignItems: 'center', gap: 6,
          justifyContent: isRtl ? 'flex-end' : 'flex-start',
          color: 'rgba(184,164,114,0.38)', fontSize: 10, letterSpacing: 1.5, textTransform: 'uppercase',
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16" />
          </svg>
          {isRtl ? 'اقلب للمزيد' : 'Hover to flip'}
        </div>
      </>
    );

    const back = (
      <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
        <div style={{
          fontFamily: 'Playfair Display, serif', fontSize: 64, fontWeight: 900,
          color: 'rgba(184,164,114,0.25)', lineHeight: 1, marginBottom: -8, userSelect: 'none',
        }}>
          {step.num || String(i + 1).padStart(2, '0')}
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 800, color: 'var(--bmc-gold)', marginBottom: 14, lineHeight: 1.3 }}>
          {step.title}
        </h3>
        <p style={{ fontSize: 13.5, color: 'rgba(245,240,232,0.7)', lineHeight: 1.9 }}>{step.desc}</p>
        <div style={{
          position: 'absolute', bottom: 16,
          right: isRtl ? 'auto' : 16, left: isRtl ? 16 : 'auto',
          color: 'var(--bmc-gold)', opacity: 0.5,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>
    );

    return { front, back };
  };

  const renderRow = (rowSteps, offset) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${rowSteps.length}, 1fr)`,
      gap: 20, position: 'relative',
      maxWidth: rowSteps.length < 3 ? `${(rowSteps.length / 3) * 100}%` : '100%',
      margin: rowSteps.length < 3 ? '0 auto' : undefined,
    }}>
      <div style={{
        position: 'absolute', top: '50%', left: '8%', right: '8%', height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.13) 20%, rgba(184,164,114,0.13) 80%, transparent)',
        transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 0,
      }} />
      {rowSteps.map((step, localIdx) => {
        const i = offset + localIdx;
        const { front, back } = buildCard(step, i);
        return (
          <div key={i} className="process-flip-wrap" data-index={i} style={{ position: 'relative', zIndex: 1 }}>
            <FlipCard front={front} back={back} delay={i * 0.1} isIn={!!revealed[i]} />
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="process" className="section"
      style={{ background: 'var(--bmc-dark-2)', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.3), transparent)',
      }} />
      <div style={{
        position: 'absolute', top: '5%',
        right: isRtl ? 'auto' : '5%', left: isRtl ? '5%' : 'auto',
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,144,217,0.07), transparent 68%)',
        filter: 'blur(40px)', animation: 'processBlob1 10s ease-in-out infinite', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '8%',
        left: isRtl ? 'auto' : '6%', right: isRtl ? '6%' : 'auto',
        width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,164,114,0.08), transparent 68%)',
        filter: 'blur(30px)', animation: 'processBlob2 12s ease-in-out infinite reverse', pointerEvents: 'none',
      }} />
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}
        preserveAspectRatio="none">
        <defs>
          <pattern id="processGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(184,164,114,1)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#processGrid)" />
      </svg>

      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{
          textAlign: 'center', maxWidth: 620, margin: '0 auto 72px',
          opacity: headerVisible ? 1 : 0,
          transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}>
          <p className="section-label">{tx.label}</p>
          <h2 className="section-title">{tx.title} <span>{tx.titleSpan}</span></h2>
          <div className="gold-line gold-line-animate" style={{ margin: '24px auto' }} />
          {tx.subtitle && (
            <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.45)', lineHeight: 1.8 }}>{tx.subtitle}</p>
          )}
        </div>

        {/* Row 1 — 3 cards */}
        {row1.length > 0 && renderRow(row1, 0)}

        {/* Row 2 — remaining cards (up to 3), centered */}
        {row2.length > 0 && (
          <div style={{ marginTop: 20 }}>
            {renderRow(row2, 3)}
          </div>
        )}

        {/* Info Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56, paddingBottom: 8 }}>
          <InfoButton lang={lang} />
        </div>
      </div>

      <style>{`
        @keyframes processBlob1 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(-20px,20px) scale(1.05); }
        }
        @keyframes processBlob2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50%       { transform: translate(15px,-15px) scale(0.95); }
        }
        @keyframes btnRing {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.7); opacity: 0;   }
        }
        @keyframes btnRipple {
          0%   { transform: translate(-50%,-50%) scale(0);  opacity: 1; }
          100% { transform: translate(-50%,-50%) scale(18); opacity: 0; }
        }
        @media (max-width: 900px) {
          #process .container > div[style*="grid"] { grid-template-columns: repeat(2,1fr) !important; max-width: 100% !important; }
        }
        @media (max-width: 580px) {
          #process .container > div[style*="grid"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}