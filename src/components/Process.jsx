import React, { useEffect, useRef } from 'react';
import { useData } from '../DataContext';

export default function Process({ lang }) {
  const { data } = useData();
  const tx = data?.translations?.process?.[lang] || {};
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!timelineRef.current) return;
    const rows = timelineRef.current.querySelectorAll('.proc-row');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('proc-visible');
          }
        });
      },
      { threshold: 0.15 }
    );
    rows.forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, [tx.steps]);

  const handleTilt = (e, el) => {
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    const rx = -dy * 5;
    const ry = dx * 7;
    el.style.transition = 'border-color 0.3s, transform 0.08s ease-out, box-shadow 0.08s ease-out';
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(5px)`;
    el.style.boxShadow = `
      ${-ry * 1.2}px ${rx * 1.2}px 24px rgba(0,0,0,0.45),
      0 0 32px rgba(184,164,114,0.06),
      inset 0 1px 0 rgba(184,164,114,0.1)
    `;
  };

  const handleTiltReset = (el) => {
    el.style.transition = 'border-color 0.3s, transform 0.45s ease-out, box-shadow 0.45s ease-out';
    el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    el.style.boxShadow = '';
  };

  if (!tx.steps) return null;

  return (
    <section
      id="process"
      className="section"
      style={{ background: 'var(--bmc-dark-2)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Top border line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.3), transparent)',
      }} />

      {/* Ambient blobs */}
      <div style={{
        position: 'absolute', top: '8%', left: '8%',
        width: 230, height: 230, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,144,217,0.14), transparent 68%)',
        filter: 'blur(6px)',
        animation: 'procFloatBlob 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '8%',
        width: 220, height: 220, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,164,114,0.12), transparent 68%)',
        filter: 'blur(6px)',
        animation: 'procFloatBlob 9s ease-in-out infinite reverse',
        pointerEvents: 'none',
      }} />

      <div className="container">

        {/* ── HEADER with decorative mini-process SVG ── */}
        <div style={{ position: 'relative', textAlign: 'center', maxWidth: 640, margin: '0 auto 80px' }}>

          {/* Decorative mini-process SVG behind the text */}
          <svg
            aria-hidden="true"
            viewBox="0 0 520 80"
            width="520"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0.07,
              pointerEvents: 'none',
              overflow: 'visible',
            }}
          >
            {/* connecting line */}
            <line x1="26" y1="40" x2="494" y2="40" stroke="#B8A472" strokeWidth="1" />

            {/* 5 mini step nodes */}
            {[26, 142, 260, 378, 494].map((cx, i) => (
              <g key={i}>
                {/* outer ring */}
                <circle cx={cx} cy="40" r="22" fill="none" stroke="#B8A472" strokeWidth="0.8" />
                {/* inner filled circle */}
                <circle cx={cx} cy="40" r="13" fill="#B8A472" opacity="0.6" />
                {/* step number */}
                <text
                  x={cx} y="40"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#0E0C18"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="serif"
                >
                  {String(i + 1).padStart(2, '0')}
                </text>
              </g>
            ))}

            {/* tiny arrow-heads between nodes */}
            {[84, 201, 319, 436].map((x, i) => (
              <polygon
                key={i}
                points={`${x},37 ${x + 7},40 ${x},43`}
                fill="#B8A472"
                opacity="0.5"
              />
            ))}
          </svg>

          {/* Actual header text — sits on top of the SVG */}
          <p className="section-label" style={{ position: 'relative', zIndex: 1 }}>
            {tx.label}
          </p>
          <h2 className="section-title" style={{ position: 'relative', zIndex: 1 }}>
            {tx.title} <span>{tx.titleSpan}</span>
          </h2>
          <div
            className="gold-line"
            style={{ margin: '24px auto', position: 'relative', zIndex: 1 }}
          />
        </div>

        {/* ── TIMELINE ── */}
        <div ref={timelineRef} style={{ position: 'relative' }}>

          {/* Animated center line */}
          <div className="proc-center-line" style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: lang === 'ar' ? 'auto' : '50%',
            right: lang === 'ar' ? '50%' : 'auto',
            width: 2,
            transform: 'translateX(-50%)',
            background: 'linear-gradient(to bottom, transparent, rgba(184,164,114,0.15) 8%, rgba(184,164,114,0.3) 20%, rgba(184,164,114,0.3) 80%, rgba(184,164,114,0.15) 92%, transparent 100%)',
            overflow: 'hidden',
          }}>
            {/* particle 1 — bright, fast */}
            <div style={{
              position: 'absolute',
              top: 0, left: '-6px', right: '-6px',
              height: '18%',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(184,164,114,0) 15%, rgba(184,164,114,0.9) 50%, rgba(220,200,140,1) 55%, rgba(184,164,114,0.9) 60%, rgba(184,164,114,0) 85%, transparent 100%)',
              animation: 'procParticle1 2.8s cubic-bezier(0.4,0,0.6,1) infinite',
              borderRadius: '50%',
            }} />
            {/* particle 2 — dimmer, medium speed, delayed */}
            <div style={{
              position: 'absolute',
              top: 0, left: '-4px', right: '-4px',
              height: '12%',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(184,164,114,0.5) 40%, rgba(184,164,114,0.6) 50%, rgba(184,164,114,0.5) 60%, transparent 100%)',
              animation: 'procParticle2 4s cubic-bezier(0.4,0,0.6,1) infinite',
              animationDelay: '1.1s',
            }} />
            {/* particle 3 — faintest, slowest, opposite direction */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: '-3px', right: '-3px',
              height: '10%',
              background: 'linear-gradient(to top, transparent 0%, rgba(184,164,114,0.3) 40%, rgba(184,164,114,0.4) 50%, rgba(184,164,114,0.3) 60%, transparent 100%)',
              animation: 'procParticle3 5s cubic-bezier(0.4,0,0.6,1) infinite',
              animationDelay: '0.6s',
            }} />
          </div>

          {tx.steps.map((step, i) => {
            const isEven = i % 2 === 0;
            const isRight = lang === 'ar' ? !isEven : isEven;

            return (
              <div
                key={i}
                className="proc-row"
                data-index={i}
                style={{
                  display: 'flex',
                  justifyContent: isRight ? 'flex-start' : 'flex-end',
                  marginBottom: i < tx.steps.length - 1 ? 48 : 0,
                  opacity: 0,
                  transform: 'perspective(600px) translateZ(-60px) translateY(30px)',
                  transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
                }}
              >
                <div style={{ width: 'calc(50% - 44px)', position: 'relative' }}>
                  <div
                    style={{
                      background: 'var(--bmc-dark-3)',
                      border: '1px solid rgba(184,164,114,0.12)',
                      padding: '28px 30px',
                      position: 'relative',
                      transition: 'border-color 0.3s, transform 0.45s ease-out, box-shadow 0.45s ease-out',
                      transformStyle: 'preserve-3d',
                      transform: 'perspective(700px) rotateX(0deg) rotateY(0deg)',
                      transformOrigin: 'center center',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(184,164,114,0.4)';
                    }}
                    onMouseMove={(e) => handleTilt(e, e.currentTarget)}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(184,164,114,0.12)';
                      handleTiltReset(e.currentTarget);
                    }}
                  >
                    {/* Corner accents */}
                    <div style={{
                      position: 'absolute', top: -1, left: -1,
                      width: 14, height: 14,
                      borderTop: '2px solid rgba(184,164,114,0.35)',
                      borderLeft: '2px solid rgba(184,164,114,0.35)',
                      transition: 'width 0.3s, height 0.3s, border-color 0.3s',
                    }} className="proc-corner-tl" />
                    <div style={{
                      position: 'absolute', bottom: -1, right: -1,
                      width: 14, height: 14,
                      borderBottom: '2px solid rgba(184,164,114,0.35)',
                      borderRight: '2px solid rgba(184,164,114,0.35)',
                      transition: 'width 0.3s, height 0.3s, border-color 0.3s',
                    }} className="proc-corner-br" />

                    {/* Depth shimmer overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(135deg, rgba(184,164,114,0.04) 0%, transparent 60%)',
                      opacity: 0,
                      transition: 'opacity 0.3s',
                      pointerEvents: 'none',
                    }} className="proc-depth" />

                    {/* Step number (decorative) */}
                    <div style={{
                      fontFamily: 'Playfair Display, Georgia, serif',
                      fontSize: 52,
                      fontWeight: 900,
                      color: 'rgba(184,164,114,0.08)',
                      lineHeight: 1,
                      marginBottom: -10,
                      userSelect: 'none',
                      transition: 'color 0.3s',
                    }}>
                      {step.num}
                    </div>

                    <h3 style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: 'var(--bmc-white)',
                      marginBottom: 10,
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      fontSize: 14,
                      color: 'rgba(245,240,232,0.5)',
                      lineHeight: 1.85,
                      margin: 0,
                    }}>
                      {step.desc}
                    </p>

                    {/* Connector arm to center dot */}
                    <div className="proc-arm" style={{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      [isRight
                        ? (lang === 'ar' ? 'left' : 'right')
                        : (lang === 'ar' ? 'right' : 'left')]: -44,
                      width: 44,
                      height: 1,
                      background: isRight
                        ? 'linear-gradient(90deg, rgba(184,164,114,0.15), rgba(184,164,114,0.4))'
                        : 'linear-gradient(270deg, rgba(184,164,114,0.15), rgba(184,164,114,0.4))',
                    }} />
                  </div>
                </div>

                {/* Glowing dot on center line */}
                <div className="proc-dot-wrap" style={{
                  position: 'absolute',
                  top: '50%',
                  left: lang === 'ar' ? 'auto' : 'calc(50% - 8px)',
                  right: lang === 'ar' ? 'calc(50% - 8px)' : 'auto',
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                }}>
                  <div style={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: 'var(--bmc-gold)',
                    border: '3px solid var(--bmc-dark-2)',
                    animation: `procDotPulse 2.5s ease-out infinite ${i * 0.5}s`,
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      inset: -5,
                      borderRadius: '50%',
                      border: '1px solid rgba(184,164,114,0.25)',
                      animation: `procRingExpand 2.5s ease-out infinite ${i * 0.5}s`,
                    }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes procFloatBlob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-18px); }
        }
        @keyframes procParticle1 {
          0%   { top: -18%; }
          100% { top: 110%; }
        }
        @keyframes procParticle2 {
          0%   { top: -12%; }
          100% { top: 108%; }
        }
        @keyframes procParticle3 {
          0%   { bottom: -10%; }
          100% { bottom: 108%; }
        }
        @keyframes procDotPulse {
          0%   { box-shadow: 0 0 0 0 rgba(184,164,114,0.55); }
          60%  { box-shadow: 0 0 0 8px rgba(184,164,114,0); }
          100% { box-shadow: 0 0 0 0 rgba(184,164,114,0); }
        }
        @keyframes procRingExpand {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }

        /* Scroll-reveal visible state */
        .proc-row.proc-visible {
          opacity: 1 !important;
          transform: perspective(600px) translateZ(0) translateY(0) !important;
        }

        /* Corner accent hover expansion */
        .proc-row .proc-corner-tl,
        .proc-row .proc-corner-br { pointer-events: none; }

        /* Depth shimmer on hover */
        #process .proc-row > div > div:hover .proc-depth { opacity: 1; }
        #process .proc-row > div > div:hover .proc-corner-tl,
        #process .proc-row > div > div:hover .proc-corner-br {
          width: 20px !important;
          height: 20px !important;
          border-color: rgba(184,164,114,0.7) !important;
        }

        @media (max-width: 768px) {
          #process .proc-row {
            justify-content: flex-start !important;
            padding-left: 28px !important;
          }
          #process .proc-row > div:first-child {
            width: 100% !important;
          }
          #process .proc-dot-wrap { display: none !important; }
          #process .proc-arm      { display: none !important; }
          #process .proc-center-line { display: none !important; }
          #process .proc-row > div:first-child > div {
            border-left: 2px solid rgba(184,164,114,0.35) !important;
            padding-left: 22px !important;
            transform: none !important;
            transition: border-color 0.3s !important;
          }
          #process .proc-row > div:first-child > div::before {
            content: '';
            position: absolute;
            top: 22px;
            left: -9px;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: var(--bmc-gold, #B8A472);
            border: 3px solid var(--bmc-dark-2, #141222);
            box-shadow: 0 0 8px rgba(184,164,114,0.5);
            z-index: 5;
          }
        }
      `}</style>
    </section>
  );
}