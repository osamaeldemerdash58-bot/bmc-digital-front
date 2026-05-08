import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';
import heroBg from '../assets/ChatGPT Image May 8, 2026, 09_57_35 PM.png';

/* ══════════════════════════════════════════
   3D Tilt Card — Enhanced with depth layers
   ══════════════════════════════════════════ */
function TiltCard({ children, style, className }) {
  const ref = useRef(null);
  const animRef = useRef(null);
  const current = useRef({ rx: 0, ry: 0, glowX: 50, glowY: 50, scale: 1 });
  const target = useRef({ rx: 0, ry: 0, glowX: 50, glowY: 50, scale: 1 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    target.current.rx = (y - 0.5) * -28;
    target.current.ry = (x - 0.5) * 28;
    target.current.glowX = x * 100;
    target.current.glowY = y * 100;
    target.current.scale = 1.03;
  };

  const handleMouseLeave = () => {
    target.current = { rx: 0, ry: 0, glowX: 50, glowY: 50, scale: 1 };
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const loop = () => {
      const lerp = (a, b, t) => a + (b - a) * t;
      current.current.rx = lerp(current.current.rx, target.current.rx, 0.08);
      current.current.ry = lerp(current.current.ry, target.current.ry, 0.08);
      current.current.glowX = lerp(current.current.glowX, target.current.glowX, 0.1);
      current.current.glowY = lerp(current.current.glowY, target.current.glowY, 0.1);
      current.current.scale = lerp(current.current.scale, target.current.scale, 0.08);

      el.style.transform = `
        perspective(1000px)
        rotateX(${current.current.rx}deg)
        rotateY(${current.current.ry}deg)
        scale(${current.current.scale})
        translateZ(0)
      `;

      const glow = el.querySelector('.tilt-glow');
      if (glow) {
        glow.style.background = `radial-gradient(ellipse at ${current.current.glowX}% ${current.current.glowY}%, rgba(212,175,55,0.28) 0%, rgba(0,210,140,0.08) 40%, transparent 65%)`;
      }

      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transformStyle: 'preserve-3d', willChange: 'transform' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-glow" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        borderRadius: 'inherit',
        transition: 'background 0.08s',
      }} />
      {children}
    </div>
  );
}

/* ══════════════════════════════
   Count-up number
   ══════════════════════════════ */
function CountUp({ value, trigger }) {
  const [display, setDisplay] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const duration = 1400;
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

/* ══════════════════════════════
   Floating particles background
   ══════════════════════════════ */
function Particles() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {[...Array(18)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
          height: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
          borderRadius: '50%',
          background: i % 2 === 0 ? 'rgba(212,175,55,0.6)' : 'rgba(0,210,140,0.5)',
          left: `${(i * 37 + 5) % 95}%`,
          top: `${(i * 53 + 10) % 90}%`,
          animation: `worksParticle${i % 4} ${5 + (i % 4)}s ease-in-out infinite`,
          animationDelay: `${i * 0.4}s`,
          filter: 'blur(0.5px)',
        }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════
   Main Component
   ══════════════════════════════ */
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
      { threshold: 0.1 }
    );
    cards.forEach(c => io.observe(c));
    return () => io.disconnect();
  }, [tx.items]);

  useEffect(() => {
    if (!heroRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setHeroVisible(true); io.disconnect(); }
    }, { threshold: 0.05 });
    io.observe(heroRef.current);
    return () => io.disconnect();
  }, []);

  const isRtl = lang === 'ar';

  return (
    <section
      id="works"
      className="section"
      style={{
        background: 'linear-gradient(170deg, #060a08 0%, #080e0b 50%, #050809 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 60% 40% at 20% 30%, rgba(0,210,140,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 80% 70%, rgba(212,175,55,0.07) 0%, transparent 60%)
        `,
      }} />

      {/* Top separator */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.5), rgba(0,210,140,0.3), transparent)',
      }} />

      {/* ─── HERO BAND ─── */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 460,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* BG image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          transform: heroVisible ? 'scale(1)' : 'scale(1.1)',
          transition: 'transform 2s cubic-bezier(0.16,1,0.3,1)',
          filter: 'brightness(0.25) saturate(1.1)',
        }} />

        {/* Color overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: isRtl
            ? 'linear-gradient(270deg, rgba(6,10,8,0) 0%, rgba(6,10,8,0.6) 35%, rgba(6,10,8,0.98) 100%)'
            : 'linear-gradient(90deg, rgba(6,10,8,0) 0%, rgba(6,10,8,0.6) 35%, rgba(6,10,8,0.98) 100%)',
        }} />

        {/* Tinted accent overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,210,140,0.06) 0%, transparent 70%)',
        }} />

        {/* Bottom/top fade */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 130, background: 'linear-gradient(to bottom, transparent, #060a08)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 80, background: 'linear-gradient(to top, transparent, #060a08)' }} />

        {/* Geometric grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          pointerEvents: 'none',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }} />

        {/* Animated orbs */}
        <div style={{
          position: 'absolute', top: '12%', left: '18%',
          width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,210,140,0.18), transparent 70%)',
          filter: 'blur(24px)',
          animation: 'worksOrb1 8s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '18%', right: '10%',
          width: 180, height: 180, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.2), transparent 70%)',
          filter: 'blur(20px)',
          animation: 'worksOrb2 10s ease-in-out infinite',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 120, height: 120, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.1), transparent 70%)',
          filter: 'blur(16px)',
          animation: 'worksOrb1 6s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }} />

        {/* Hero text */}
        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{
            maxWidth: 560,
            marginLeft: isRtl ? 'auto' : 0,
            marginRight: isRtl ? 0 : 'auto',
            textAlign: isRtl ? 'right' : 'left',
          }}>
            {/* Eyebrow label */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              marginBottom: 20,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
            }}>
              <div style={{ width: 28, height: 1, background: 'linear-gradient(90deg, #d4af37, #00d28c)' }} />
              <span style={{
                fontSize: 10, letterSpacing: 4, fontWeight: 700, textTransform: 'uppercase',
                background: 'linear-gradient(90deg, #d4af37, #00d28c)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                {isRtl ? 'معرض الأعمال' : 'Portfolio'}
              </span>
              <div style={{ width: 28, height: 1, background: 'linear-gradient(90deg, #00d28c, #d4af37)' }} />
            </div>

            {/* Main heading */}
            <h2 style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(38px, 5.5vw, 68px)',
              fontWeight: 900,
              lineHeight: 1.08,
              marginBottom: 20,
              letterSpacing: -1,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0) translateZ(0)' : 'translateY(24px)',
              transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #f5f0e8 0%, rgba(245,240,232,0.6) 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                display: 'block',
              }}>
                {tx.title || (isRtl ? 'أبرز' : 'Our')}
              </span>
              <span style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #00d28c 60%, #d4af37 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                animation: 'heroTextShimmer 4s linear infinite',
                display: 'block',
              }}>
                {isRtl ? 'أعمالنا' : 'Featured Works'}
              </span>
            </h2>

            {/* Divider */}
            <div style={{
              width: heroVisible ? 80 : 0, height: 2,
              background: 'linear-gradient(90deg, #d4af37, #00d28c)',
              transition: 'width 1s ease 0.5s',
              marginBottom: 20,
              marginLeft: isRtl ? 'auto' : 0,
              borderRadius: 2,
            }} />

            <p style={{
              fontSize: 15, color: 'rgba(245,240,232,0.5)', lineHeight: 1.85, maxWidth: 400,
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
            }}>
              {tx.subtitle || (isRtl
                ? 'نماذج من أبرز المشاريع التي نفّذناها بمعايير احترافية عالية'
                : 'A showcase of our most distinguished projects delivered with excellence'
              )}
            </p>

            {/* Stats row */}
            <div style={{
              display: 'flex', gap: 36, marginTop: 44,
              flexDirection: isRtl ? 'row-reverse' : 'row',
            }}>
              {[
                { num: '120+', label: isRtl ? 'مشروع منجز' : 'Projects Done' },
                { num: '98%', label: isRtl ? 'رضا العملاء' : 'Client Satisfaction' },
                { num: '15+', label: isRtl ? 'سنة خبرة' : 'Years Experience' },
              ].map((s, i) => (
                <div key={i} style={{
                  textAlign: isRtl ? 'right' : 'left',
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.8s ease ${0.5 + i * 0.18}s, transform 0.8s ease ${0.5 + i * 0.18}s`,
                }}>
                  {/* Stat number */}
                  <div style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 36, fontWeight: 900, lineHeight: 1,
                    background: 'linear-gradient(135deg, #d4af37, #00d28c)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  }}>{s.num}</div>
                  <div style={{
                    fontSize: 10, color: 'rgba(245,240,232,0.38)',
                    letterSpacing: 2, marginTop: 6, textTransform: 'uppercase',
                  }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── CARDS GRID ─── */}
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 8, paddingBottom: 80 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
        }}>
          {(tx.items || []).map((item, i) => {
            const isHov = hovered === i;
            const isIn = !!revealed[i];

            /* Alternating accent colors */
            const accentColor = i % 2 === 0 ? '#d4af37' : '#00d28c';
            const accentRgb = i % 2 === 0 ? '212,175,55' : '0,210,140';

            return (
              <div
                key={i}
                className="works-card-wrap"
                data-index={i}
                style={{
                  opacity: isIn ? 1 : 0,
                  transform: isIn
                    ? 'translateY(0) rotateX(0deg)'
                    : 'translateY(60px) rotateX(8deg)',
                  transition: `opacity 0.8s ease ${i * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                  perspective: '1000px',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <TiltCard style={{
                  background: isHov
                    ? `linear-gradient(145deg, rgba(${accentRgb},0.07), rgba(8,14,11,0.95))`
                    : 'linear-gradient(145deg, rgba(14,22,18,0.95), rgba(10,16,13,0.98))',
                  border: `1px solid ${isHov ? `rgba(${accentRgb},0.45)` : 'rgba(255,255,255,0.06)'}`,
                  padding: '38px 32px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  borderRadius: 6,
                  transition: 'border-color 0.4s, background 0.4s',
                  boxShadow: isHov
                    ? `0 30px 70px rgba(0,0,0,0.6), 0 0 50px rgba(${accentRgb},0.12), inset 0 1px 0 rgba(${accentRgb},0.1)`
                    : '0 6px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
                }}>

                  {/* Animated background mesh */}
                  <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 'inherit',
                    background: isHov
                      ? `radial-gradient(ellipse at 80% 20%, rgba(${accentRgb},0.12) 0%, transparent 50%)`
                      : 'transparent',
                    transition: 'background 0.5s ease',
                    zIndex: 0,
                  }} />

                  {/* Corner L-shape accent */}
                  <div style={{
                    position: 'absolute', top: 0,
                    left: isRtl ? 'auto' : 0, right: isRtl ? 0 : 'auto',
                    width: isHov ? 70 : 36, height: 2,
                    background: `linear-gradient(90deg, ${accentColor}, transparent)`,
                    transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
                    zIndex: 2,
                  }} />
                  <div style={{
                    position: 'absolute', top: 0,
                    left: isRtl ? 'auto' : 0, right: isRtl ? 0 : 'auto',
                    width: 2, height: isHov ? 70 : 36,
                    background: `linear-gradient(180deg, ${accentColor}, transparent)`,
                    transition: 'height 0.5s cubic-bezier(0.16,1,0.3,1)',
                    zIndex: 2,
                  }} />

                  {/* Bottom-opposite corner */}
                  <div style={{
                    position: 'absolute', bottom: 0,
                    right: isRtl ? 'auto' : 0, left: isRtl ? 0 : 'auto',
                    width: isHov ? 50 : 20, height: 1,
                    background: `rgba(${accentRgb},0.3)`,
                    transition: 'width 0.5s ease',
                    zIndex: 2,
                  }} />

                  {/* Project number — big ghost */}
                  <div style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: 'clamp(60px, 7vw, 88px)',
                    fontWeight: 900,
                    lineHeight: 1,
                    marginBottom: -16,
                    userSelect: 'none',
                    position: 'relative', zIndex: 1,
                    background: isHov
                      ? `linear-gradient(135deg, rgba(${accentRgb},0.35), rgba(${accentRgb},0.08))`
                      : `linear-gradient(135deg, rgba(${accentRgb},0.1), rgba(${accentRgb},0.03))`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    transition: 'all 0.4s ease',
                    transform: `translateZ(30px) ${isHov ? 'scale(1.05)' : 'scale(1)'}`,
                    transformOrigin: 'left bottom',
                  }}>
                    <CountUp value={i + 1} trigger={isIn} />
                  </div>

                  {/* Category badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    marginBottom: 10,
                    position: 'relative', zIndex: 1,
                    transform: 'translateZ(20px)',
                  }}>
                    <div style={{
                      width: 4, height: 4, borderRadius: '50%',
                      background: accentColor,
                      boxShadow: `0 0 8px ${accentColor}`,
                    }} />
                    <span style={{
                      fontSize: 9, color: accentColor,
                      fontWeight: 700, letterSpacing: 3,
                      textTransform: 'uppercase',
                    }}>
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{
                    fontSize: 19, fontWeight: 700,
                    color: isHov ? '#fff' : 'rgba(245,240,232,0.85)',
                    marginBottom: 14, lineHeight: 1.4,
                    transition: 'color 0.3s',
                    position: 'relative', zIndex: 1,
                    transform: 'translateZ(20px)',
                    textShadow: isHov ? `0 0 30px rgba(${accentRgb},0.3)` : 'none',
                  }}>
                    {item.title}
                  </h3>

                  {/* Desc */}
                  {item.desc && (
                    <p style={{
                      fontSize: 13, color: 'rgba(245,240,232,0.42)',
                      lineHeight: 1.9, marginBottom: 22,
                      position: 'relative', zIndex: 1,
                      transform: 'translateZ(15px)',
                    }}>
                      {item.desc}
                    </p>
                  )}

                  {/* Tag */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '6px 16px',
                    background: `rgba(${accentRgb},0.06)`,
                    border: `1px solid rgba(${accentRgb},0.2)`,
                    fontSize: 10, color: `rgba(${accentRgb},0.8)`,
                    letterSpacing: 1.5, borderRadius: 3,
                    position: 'relative', zIndex: 1,
                    transform: 'translateZ(15px)',
                    transition: 'background 0.3s, border-color 0.3s',
                  }}>
                    {item.tag}
                  </div>

                  {/* Arrow button */}
                  <div style={{
                    position: 'absolute',
                    bottom: 26,
                    right: isRtl ? 'auto' : 26,
                    left: isRtl ? 26 : 'auto',
                    opacity: isHov ? 1 : 0,
                    transform: isHov
                      ? `translateZ(25px) translate(0,0)`
                      : `translateZ(25px) translate(8px,8px)`,
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease',
                    width: 38, height: 38, borderRadius: '50%',
                    background: `rgba(${accentRgb},0.12)`,
                    border: `1px solid rgba(${accentRgb},0.4)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: accentColor,
                    boxShadow: `0 0 20px rgba(${accentRgb},0.2)`,
                    zIndex: 2,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>

                  {/* Bottom sweep line */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0,
                    width: isHov ? '100%' : '0%', height: 1,
                    background: `linear-gradient(90deg, ${accentColor}, rgba(${accentRgb},0.2))`,
                    transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
                    zIndex: 2,
                  }} />

                  {/* Glare line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                    zIndex: 2,
                  }} />
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom separator */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,210,140,0.3), rgba(212,175,55,0.3), transparent)',
      }} />

      <style>{`
        @keyframes worksOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(25px, -18px) scale(1.05); }
          66%       { transform: translate(-12px, 20px) scale(0.95); }
        }
        @keyframes worksOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-20px, 24px) scale(1.04); }
          66%       { transform: translate(18px, -14px) scale(0.96); }
        }
        @keyframes heroTextShimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes worksParticle0 {
          0%, 100% { transform: translate(0,0); opacity: 0.6; }
          50%       { transform: translate(12px,-18px); opacity: 0.2; }
        }
        @keyframes worksParticle1 {
          0%, 100% { transform: translate(0,0); opacity: 0.4; }
          50%       { transform: translate(-10px,14px); opacity: 0.8; }
        }
        @keyframes worksParticle2 {
          0%, 100% { transform: translate(0,0); opacity: 0.5; }
          50%       { transform: translate(16px,10px); opacity: 0.15; }
        }
        @keyframes worksParticle3 {
          0%, 100% { transform: translate(0,0); opacity: 0.3; }
          50%       { transform: translate(-14px,-12px); opacity: 0.7; }
        }
        @media (max-width: 960px) {
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