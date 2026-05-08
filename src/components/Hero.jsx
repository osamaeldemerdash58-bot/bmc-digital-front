import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../DataContext';
import heroImage from '../assets/heroimage.png';
import heroImageDesktop from '../assets/heroimagedesktop.png';
import SnakeButton from './SnakeButton';
import '../animations.css';

export default function Hero({ lang }) {
  const canvasRef = useRef(null);
  const mouseLightRef = useRef(null);
  const { data } = useData();
  const tx = data?.translations?.hero?.[lang] || {};
  const [btn1Hovered, setBtn1Hovered] = useState(false);
  const [btn2Hovered, setBtn2Hovered] = useState(false);

  // Avoid duplicate "نبني" in Arabic by keeping it in the first line only.
  const titleSpan = lang === 'ar' ? 'مستقبلك الرقمي' : 'We Build Your Digital Future';
  const titleSpanStyle = lang === 'ar'
    ? {
        color: 'var(--bmc-gold)',
        fontStyle: 'normal',
        fontFamily: 'Cairo, sans-serif',
      }
    : {
        background: 'linear-gradient(135deg, #D4C48F, #B8A472, #8A7A55)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        fontStyle: 'italic',
      };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;
    const particles = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184, 164, 114, ${p.alpha})`;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(184, 164, 114, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!mouseLightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseLightRef.current.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'flex-end',
        paddingTop: 110,
        paddingBottom: 130,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A0E0D 0%, #0F1512 50%, #0A0E0D 100%)',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      <div
        ref={mouseLightRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,164,114,0.08) 0%, rgba(184,164,114,0.03) 40%, transparent 70%)',
          pointerEvents: 'none', zIndex: 2,
          transition: 'transform 0.15s ease-out', willChange: 'transform',
        }}
      />

      {/* Hero image */}
      <div className="hero-image-wrap" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        <picture style={{ width: '100%', height: '100%', display: 'block' }}>
          <source media="(max-width: 768px)" srcSet={heroImage} />
          <source media="(min-width: 769px)" srcSet={heroImageDesktop} />
          <img
            src={heroImageDesktop}
            alt="BMC Digital Hero"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'center center',
              animation: 'kenBurns 18s ease-in-out infinite alternate',
              transformOrigin: 'center center', display: 'block',
            }}
          />
        </picture>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,14,13,0.3)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: lang === 'ar'
            ? 'linear-gradient(to left, rgba(10,14,13,0.05) 0%, rgba(10,14,13,0.22) 55%, rgba(10,14,13,0.55) 100%)'
            : 'linear-gradient(to right, rgba(10,14,13,0.05) 0%, rgba(10,14,13,0.22) 55%, rgba(10,14,13,0.55) 100%)',
        }} />
        {/* Bottom fade — يخلي النص يبان واضح */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
          background: 'linear-gradient(to top, rgba(10,14,13,0.85) 0%, rgba(10,14,13,0.4) 60%, transparent 100%)',
          zIndex: 1,
        }} />
      </div>

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '40%',
        left: lang === 'ar' ? '25%' : '75%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(184,164,114,0.07) 0%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Big bg text */}
      <div style={{
        position: 'absolute', bottom: -20,
        left: lang === 'ar' ? 'auto' : 0,
        right: lang === 'ar' ? 0 : 'auto',
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(80px, 18vw, 220px)', fontWeight: 900,
        color: 'rgba(184,164,114,0.025)', letterSpacing: 20,
        userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 2,
      }}>
        BMC
      </div>

      <div className="container hero-content-wrap" style={{ position: 'relative', zIndex: 4, width: '100%' }}>
        <div style={{ maxWidth: 680 }}>

          {/* Title */}
          <h1 style={{
            fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Playfair Display, serif',
            fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 900,
            lineHeight: lang === 'ar' ? 1.4 : 1.28, marginBottom: 40, opacity: 1,
          }}>
            <span style={{ color: 'var(--bmc-white)', display: 'block', marginBottom: 10 }}>
              {tx.title}
            </span>
            {/* titleSpan override — النص الجديد */}
            <span style={{
              ...titleSpanStyle,
              display: 'block',
              overflow: 'visible',
              marginTop: lang === 'ar' ? 24 : 34,
              paddingTop: lang === 'ar' ? 6 : 0,
              fontSize: 'clamp(24px, 3.6vw, 44px)',
              lineHeight: lang === 'ar' ? 1.6 : 1.35,
            }}>
              {titleSpan}
            </span>
          </h1>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 18 }}>
            <SnakeButton
              as="a"
              href="#contact"
              className="snake-btn"
              snakeOptions={{ speed: 0.0035, tailLength: 0.2, lineWidth: 2 }}
              onMouseEnter={() => setBtn1Hovered(true)}
              onMouseLeave={() => setBtn1Hovered(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 32px',
                background: btn1Hovered ? 'transparent' : 'var(--bmc-gold)',
                color: btn1Hovered ? 'var(--bmc-gold)' : 'var(--bmc-dark)',
                fontWeight: 700, fontSize: 14, letterSpacing: 0.5,
                textDecoration: 'none', borderRadius: 2,
                border: '1px solid var(--bmc-gold)', transition: 'all 0.35s ease',
                transform: btn1Hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: btn1Hovered ? '0 8px 25px rgba(184,164,114,0.3)' : 'none',
                overflow: 'hidden',
              }}
            >
              <span className="snake-light" />
              {tx.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: btn1Hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </SnakeButton>

            <a
              href="#works"
              className="snake-btn"
              onMouseEnter={() => setBtn2Hovered(true)}
              onMouseLeave={() => setBtn2Hovered(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '14px 32px',
                background: btn2Hovered ? 'rgba(184,164,114,0.08)' : 'transparent',
                color: btn2Hovered ? 'var(--bmc-gold)' : 'var(--bmc-white)',
                fontWeight: 700, fontSize: 14, letterSpacing: 0.5,
                textDecoration: 'none',
                border: btn2Hovered ? '1px solid var(--bmc-gold)' : '1px solid rgba(245,240,232,0.2)',
                borderRadius: 2, transition: 'all 0.35s ease',
                transform: btn2Hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: btn2Hovered ? '0 8px 25px rgba(184,164,114,0.12)' : 'none',
                overflow: 'hidden',
              }}
            >
              <span className="snake-light" />
              {tx.ctaSecondary}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: btn2Hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s ease', opacity: btn2Hovered ? 1 : 0.5 }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" style={{
        position: 'absolute', bottom: 32, left: '50%',
        transform: 'translateX(-50%)', display: 'flex',
        flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 3,
      }}>
        <div style={{
          width: 1, height: 48,
          background: 'linear-gradient(to bottom, var(--bmc-gold), transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes kenBurns {
          0%   { transform: scale(1)    translate(0px, 0px); }
          33%  { transform: scale(1.06) translate(-12px, -6px); }
          66%  { transform: scale(1.04) translate(8px, -10px); }
          100% { transform: scale(1.08) translate(-6px, 4px); }
        }
        @media (max-width: 1024px) {
          #hero { padding-top: 96px !important; padding-bottom: 110px !important; }
        }
        @media (min-width: 1025px) {
          .hero-content-wrap { transform: translateY(24px); }
          #hero { padding-bottom: 112px !important; }
        }
        @media (max-width: 768px) {
          #hero { min-height: 100svh !important; padding-top: 88px !important; padding-bottom: 96px !important; }
        }
      `}</style>
    </section>
  );
}