import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../DataContext';
import heroImage from '../assets/heroimage.png';
import heroImageDesktop from '../assets/heroimagedesktop.png';
import '../animations.css';

export default function Hero({ lang }) {
  const canvasRef = useRef(null);
  const mouseLightRef = useRef(null);
  const { data } = useData();
  const tx = data?.translations?.hero?.[lang] || {};
  const [btn1Hovered, setBtn1Hovered] = useState(false);
  const [btn2Hovered, setBtn2Hovered] = useState(false);

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

  // Mouse light effect
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
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0A0E0D 0%, #0F1512 50%, #0A0E0D 100%)',
      }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Mouse light — بقعة ذهبية بتتبع الماوس */}
      <div
        ref={mouseLightRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,164,114,0.08) 0%, rgba(184,164,114,0.03) 40%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      />

      {/* Hero image — full background + Ken Burns only */}
      <div
        className="hero-image-wrap"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Ken Burns zoom — desktop image landscape, mobile image portrait */}
        <picture style={{ width: '100%', height: '100%', display: 'block' }}>
          <source media="(max-width: 768px)" srcSet={heroImage} />
          <source media="(min-width: 769px)" srcSet={heroImageDesktop} />
          <img
            src={heroImageDesktop}
            alt="BMC Digital Hero"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              animation: 'kenBurns 18s ease-in-out infinite alternate',
              transformOrigin: 'center center',
              display: 'block',
            }}
          />
        </picture>
        {/* overlays مخففة للحفاظ على وضوح الصورة */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,14,13,0.3)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: lang === 'ar'
              ? 'linear-gradient(to left, rgba(10,14,13,0.05) 0%, rgba(10,14,13,0.22) 55%, rgba(10,14,13,0.45) 100%)'
              : 'linear-gradient(to right, rgba(10,14,13,0.05) 0%, rgba(10,14,13,0.22) 55%, rgba(10,14,13,0.45) 100%)',
          }}
        />
      </div>

      {/* Radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: lang === 'ar' ? '25%' : '75%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          height: 700,
          background: 'radial-gradient(circle, rgba(184,164,114,0.07) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Big bg text */}
      <div
        style={{
          position: 'absolute',
          bottom: -20,
          left: lang === 'ar' ? 'auto' : 0,
          right: lang === 'ar' ? 0 : 'auto',
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(80px, 18vw, 220px)',
          fontWeight: 900,
          color: 'rgba(184,164,114,0.025)',
          letterSpacing: 20,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 2,
        }}
      >
        BMC
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        <div style={{ maxWidth: 620 }}>

          {/* Badge — static */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(184,164,114,0.1)',
              border: '1px solid rgba(184,164,114,0.25)',
              padding: '6px 16px',
              borderRadius: 20,
              marginBottom: 32,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--bmc-gold)',
                display: 'inline-block',
                animation: 'pulse 2s infinite',
              }}
            />
            <span style={{ fontSize: 12, color: 'var(--bmc-gold)', fontWeight: 600, letterSpacing: 1 }}>
              {tx.badge}
            </span>
          </div>

          {/* Title — STATIC, no animation */}
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 900,
              lineHeight: 1.2,
              marginBottom: 24,
              opacity: 1,
            }}
          >
            <span style={{ color: 'var(--bmc-white)', display: 'block' }}>
              {tx.title}
            </span>
            <span
              style={{
                background: 'linear-gradient(135deg, #D4C48F, #B8A472, #8A7A55)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontStyle: 'italic',
                display: 'block',
                overflow: 'visible',
                paddingInlineStart: lang === 'ar' ? '0.14em' : '0.06em',
                paddingInlineEnd: '0.06em',
                paddingBottom: '0.15em', /* يمنع قص الـ descenders */
              }}
            >
              {tx.titleSpan}
            </span>
          </h1>

          {/* Subtitle — static */}
          <p
            style={{
              fontSize: 17,
              color: 'rgba(245,240,232,0.6)',
              lineHeight: 1.9,
              marginBottom: 48,
              maxWidth: 520,
            }}
          >
            {tx.subtitle}
          </p>

          {/* CTAs — static */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            {/* Primary button */}
            <a
              href="#contact"
              onMouseEnter={() => setBtn1Hovered(true)}
              onMouseLeave={() => setBtn1Hovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 32px',
                background: btn1Hovered ? 'transparent' : 'var(--bmc-gold)',
                color: btn1Hovered ? 'var(--bmc-gold)' : 'var(--bmc-dark)',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.5,
                textDecoration: 'none',
                borderRadius: 2,
                border: '1px solid var(--bmc-gold)',
                transition: 'all 0.35s ease',
                transform: btn1Hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: btn1Hovered ? '0 8px 25px rgba(184,164,114,0.3)' : 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)',
                  transform: btn1Hovered ? 'translateX(100%)' : 'translateX(-100%)',
                  transition: 'transform 0.5s ease',
                  pointerEvents: 'none',
                }}
              />
              {tx.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: btn1Hovered ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.3s ease' }}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>

            {/* Secondary button */}
            <a
              href="#works"
              onMouseEnter={() => setBtn2Hovered(true)}
              onMouseLeave={() => setBtn2Hovered(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 32px',
                background: btn2Hovered ? 'rgba(184,164,114,0.08)' : 'transparent',
                color: btn2Hovered ? 'var(--bmc-gold)' : 'var(--bmc-white)',
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.5,
                textDecoration: 'none',
                border: btn2Hovered ? '1px solid var(--bmc-gold)' : '1px solid rgba(245,240,232,0.2)',
                borderRadius: 2,
                transition: 'all 0.35s ease',
                transform: btn2Hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: btn2Hovered ? '0 8px 25px rgba(184,164,114,0.12)' : 'none',
              }}
            >
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
      <div
        className="hero-scroll"
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: 1,
            height: 48,
            background: 'linear-gradient(to bottom, var(--bmc-gold), transparent)',
            animation: 'scrollLine 2s ease-in-out infinite',
          }}
        />
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

        /* ── Ken Burns — الصورة بتتحرك بس ── */
        @keyframes kenBurns {
          0%   { transform: scale(1)    translate(0px, 0px); }
          33%  { transform: scale(1.06) translate(-12px, -6px); }
          66%  { transform: scale(1.04) translate(8px, -10px); }
          100% { transform: scale(1.08) translate(-6px, 4px); }
        }

      `}</style>
    </section>
  );
}
