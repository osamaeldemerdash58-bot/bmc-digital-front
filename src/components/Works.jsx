import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';
import heroBg from '../assets/ChatGPT Image May 8, 2026, 09_57_35 PM.png';

/* ── 3D Tilt Card ── */
function TiltCard({ children, style, className }) {
  const ref = useRef(null);
  const animRef = useRef(null);
  const current = useRef({ rx: 0, ry: 0, glowX: 50, glowY: 50 });
  const target = useRef({ rx: 0, ry: 0, glowX: 50, glowY: 50 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    target.current.rx = (y - 0.5) * -18;
    target.current.ry = (x - 0.5) * 18;
    target.current.glowX = x * 100;
    target.current.glowY = y * 100;
  };

  const handleMouseLeave = () => {
    target.current = { rx: 0, ry: 0, glowX: 50, glowY: 50 };
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const loop = () => {
      const lerp = (a, b, t) => a + (b - a) * t;
      current.current.rx = lerp(current.current.rx, target.current.rx, 0.1);
      current.current.ry = lerp(current.current.ry, target.current.ry, 0.1);
      current.current.glowX = lerp(current.current.glowX, target.current.glowX, 0.1);
      current.current.glowY = lerp(current.current.glowY, target.current.glowY, 0.1);
      el.style.transform = `perspective(900px) rotateX(${current.current.rx}deg) rotateY(${current.current.ry}deg) translateZ(8px)`;
      el.querySelector('.tilt-glow').style.background =
        `radial-gradient(ellipse at ${current.current.glowX}% ${current.current.glowY}%, rgba(184,164,114,0.18) 0%, transparent 65%)`;
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform', transition: 'box-shadow 0.3s' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-glow" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        transition: 'background 0.1s',
        borderRadius: 'inherit',
      }} />
      {children}
    </div>
  );
}

/* ── Count-up number ── */
function CountUp({ value, trigger }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const duration = 1200;
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    }
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [trigger, value]);
  return display;
}

export function Works({ lang }) {
  useAnimate();
  const { data } = useData();
  const tx = data?.translations?.works?.[lang] || {};
  const [hovered, setHovered] = useState(null);
  const [revealed, setRevealed] = useState({});
  const [heroVisible, setHeroVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const cards = document.querySelectorAll('.works-card-wrap');
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
  }, [tx.items]);

  useEffect(() => {
    if (!heroRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setHeroVisible(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);

  const isRtl = lang === 'ar';

  return (
    <section
      id="works"
      className="section"
      style={{ background: 'var(--bmc-dark-3)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Top separator line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.3), transparent)',
      }} />

      {/* ── HERO BAND with image ── */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 420,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          marginBottom: 0,
        }}
      >
        {/* Background image with parallax-like reveal */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          transform: heroVisible ? 'scale(1)' : 'scale(1.08)',
          transition: 'transform 1.6s cubic-bezier(0.16,1,0.3,1)',
          filter: 'brightness(0.38) saturate(0.9)',
        }} />

        {/* Overlay gradients */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isRtl
            ? 'linear-gradient(270deg, rgba(10,14,12,0) 0%, rgba(10,14,12,0.55) 40%, rgba(10,14,12,0.97) 100%)'
            : 'linear-gradient(90deg, rgba(10,14,12,0) 0%, rgba(10,14,12,0.55) 40%, rgba(10,14,12,0.97) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
          background: 'linear-gradient(to bottom, transparent, var(--bmc-dark-3))',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 80,
          background: 'linear-gradient(to top, transparent, var(--bmc-dark-3))',
        }} />

        {/* Teal grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(184,164,114,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,164,114,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        {/* Floating orbs on image */}
        <div style={{
          position: 'absolute', top: '15%', left: '15%',
          width: 180, height: 180, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,210,140,0.12), transparent 70%)',
          filter: 'blur(20px)',
          animation: 'worksOrb1 7s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '20%', right: '12%',
          width: 140, height: 140, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,164,114,0.15), transparent 70%)',
          filter: 'blur(16px)',
          animation: 'worksOrb2 9s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* Hero text — RIGHT side (or left for RTL) */}
        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{
            maxWidth: 520,
            marginLeft: isRtl ? 'auto' : 0,
            marginRight: isRtl ? 0 : 'auto',
            textAlign: isRtl ? 'right' : 'left',
            padding: '80px 0',
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s',
          }}>
            <p className="section-label" style={{ marginBottom: 16 }}>{tx.label}</p>
            <h2 className="section-title" style={{ marginBottom: 0, lineHeight: 1.15 }}>
              {tx.title} <span style={{ color: 'var(--bmc-gold)' }}>{tx.titleSpan}</span>
            </h2>
            <div className="gold-line gold-line-animate" style={{
              margin: isRtl ? '24px 0 24px auto' : '24px auto 24px 0',
            }} />
            <p style={{
              fontSize: 15, color: 'rgba(245,240,232,0.55)', lineHeight: 1.8, maxWidth: 400,
            }}>
              {tx.subtitle || (isRtl
                ? 'نماذج من أبرز المشاريع التي نفّذناها بمعايير احترافية عالية'
                : 'A showcase of our most distinguished projects delivered with excellence'
              )}
            </p>

            {/* Stats row */}
            <div style={{
              display: 'flex',
              gap: 40,
              marginTop: 40,
              flexDirection: isRtl ? 'row-reverse' : 'row',
            }}>
              {[
                { num: '120+', label: isRtl ? 'مشروع منجز' : 'Projects Done' },
                { num: '98%', label: isRtl ? 'رضا العملاء' : 'Client Satisfaction' },
                { num: '15+', label: isRtl ? 'سنة خبرة' : 'Years Experience' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: isRtl ? 'right' : 'left' }}>
                  <div style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 32, fontWeight: 900,
                    color: 'var(--bmc-gold)',
                    lineHeight: 1,
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.8s ease ${0.5 + i * 0.15}s, transform 0.8s ease ${0.5 + i * 0.15}s`,
                  }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)', letterSpacing: 1.5, marginTop: 4, textTransform: 'uppercase' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CARDS GRID ── */}
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 16 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}>
          {(tx.items || []).map((item, i) => {
            const isHov = hovered === i;
            const isIn = !!revealed[i];

            return (
              <div
                key={i}
                className="works-card-wrap"
                data-index={i}
                style={{
                  opacity: isIn ? 1 : 0,
                  transform: isIn ? 'translateY(0)' : 'translateY(50px)',
                  transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <TiltCard style={{
                  background: 'var(--bmc-dark-2)',
                  border: `1px solid ${isHov ? 'rgba(184,164,114,0.4)' : 'rgba(184,164,114,0.1)'}`,
                  padding: '36px 30px 30px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: 2,
                  transition: 'border-color 0.4s, box-shadow 0.4s',
                  boxShadow: isHov
                    ? '0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(184,164,114,0.08)'
                    : '0 4px 20px rgba(0,0,0,0.3)',
                }}>
                  {/* Corner accent */}
                  <div style={{
                    position: 'absolute', top: 0, left: isRtl ? 'auto' : 0, right: isRtl ? 0 : 'auto',
                    width: isHov ? 60 : 30, height: 2,
                    background: 'var(--bmc-gold)',
                    transition: 'width 0.4s ease',
                  }} />
                  <div style={{
                    position: 'absolute', top: 0, left: isRtl ? 'auto' : 0, right: isRtl ? 0 : 'auto',
                    width: 2, height: isHov ? 60 : 30,
                    background: 'var(--bmc-gold)',
                    transition: 'height 0.4s ease',
                  }} />

                  {/* Number */}
                  <div style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(52px, 7vw, 76px)',
                    fontWeight: 900,
                    color: isHov ? 'rgba(184,164,114,0.2)' : 'rgba(184,164,114,0.06)',
                    lineHeight: 1, marginBottom: -12,
                    transition: 'color 0.4s',
                    userSelect: 'none',
                    transform: 'translateZ(20px)',
                  }}>
                    <CountUp value={i + 1} trigger={isIn} />
                  </div>

                  {/* Category badge */}
                  <p style={{
                    fontSize: 10, color: 'var(--bmc-gold)',
                    fontWeight: 700, letterSpacing: 2.5, marginBottom: 10,
                    textTransform: 'uppercase',
                    transform: 'translateZ(15px)',
                  }}>
                    {item.category}
                  </p>

                  <h3 style={{
                    fontSize: 18, fontWeight: 700,
                    color: isHov ? 'var(--bmc-white)' : 'rgba(245,240,232,0.82)',
                    marginBottom: 14, lineHeight: 1.4, transition: 'color 0.3s',
                    transform: 'translateZ(15px)',
                  }}>
                    {item.title}
                  </h3>

                  {/* Description (if exists) */}
                  {item.desc && (
                    <p style={{
                      fontSize: 13, color: 'rgba(245,240,232,0.45)',
                      lineHeight: 1.85, marginBottom: 20,
                      transform: 'translateZ(10px)',
                    }}>
                      {item.desc}
                    </p>
                  )}

                  {/* Tag */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '5px 14px',
                    background: 'rgba(184,164,114,0.07)',
                    border: '1px solid rgba(184,164,114,0.18)',
                    fontSize: 10, color: 'rgba(245,240,232,0.45)',
                    letterSpacing: 1, borderRadius: 2,
                    transform: 'translateZ(10px)',
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--bmc-gold)', display: 'inline-block' }} />
                    {item.tag}
                  </div>

                  {/* Arrow */}
                  <div style={{
                    position: 'absolute',
                    bottom: 22,
                    right: isRtl ? 'auto' : 22,
                    left: isRtl ? 22 : 'auto',
                    opacity: isHov ? 1 : 0,
                    transform: isHov
                      ? `translateZ(20px) translate(0,0) ${isRtl ? 'scaleX(-1)' : ''}`
                      : `translateZ(20px) translate(6px,6px) ${isRtl ? 'scaleX(-1)' : ''}`,
                    transition: 'all 0.35s ease, opacity 0.35s ease',
                    color: 'var(--bmc-gold)',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Bottom gold line */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: isHov ? '100%' : 0, height: 2,
                    background: 'linear-gradient(90deg, var(--bmc-gold), rgba(184,164,114,0.3))',
                    transition: 'width 0.5s ease',
                  }} />
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes worksOrb1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -15px); }
        }
        @keyframes worksOrb2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-15px, 20px); }
        }
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