import React, { useEffect, useRef, useState } from 'react';
import { useData } from '../DataContext';
import heroImage from '../assets/heroimage.png';
import heroImageDesktop from '../assets/heroimagedesktop.png';
import heroImageDesktopEn from '../assets/heroimagedesktop_en.png';
import SnakeButton from './SnakeButton';
import '../animations.css';

export default function Hero({ lang }) {
  const canvasRef = useRef(null);
  const mouseLightRef = useRef(null);
  const { data } = useData();
  const tx = data?.translations?.hero?.[lang] || {};
  const [btn1Hovered, setBtn1Hovered] = useState(false);
  const [btn2Hovered, setBtn2Hovered] = useState(false);
  const desktopHeroImage = lang === 'ar' ? heroImageDesktop : heroImageDesktopEn;

  const titleSpan = tx.titleSpan || (lang === 'ar' ? 'مستقبلك الرقمي' : 'Digital Future');
  const titleSpanStyle = {
    color: 'var(--bmc-white)',
    fontStyle: 'normal',
    fontFamily: lang === 'ar' ? 'Cairo, sans-serif' : 'Playfair Display, serif',
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
        ctx.fillStyle = `rgba(0, 194, 255, ${p.alpha})`;
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
            ctx.strokeStyle = `rgba(0, 194, 255, ${0.06 * (1 - dist / 120)})`;
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
        background: 'linear-gradient(135deg, #020414 0%, #04071A 50%, #020414 100%)',
      }}
    >
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      <div
        ref={mouseLightRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,194,255,0.09) 0%, rgba(0,194,255,0.04) 45%, transparent 72%)',
          pointerEvents: 'none', zIndex: 2,
          transition: 'transform 0.15s ease-out', willChange: 'transform',
        }}
      />

      {/* Hero image */}
      <div className="hero-image-wrap" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
        <picture style={{ width: '100%', height: '100%', display: 'block' }}>
          <source media="(max-width: 768px)" srcSet={heroImage} />
          <source media="(min-width: 769px)" srcSet={desktopHeroImage} />
          <img
            src={desktopHeroImage}
            alt="BMC Digital Hero"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              objectPosition: 'center center',
              animation: 'kenBurns 18s ease-in-out infinite alternate',
              transformOrigin: 'center center', display: 'block',
            }}
          />
        </picture>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(13,17,23,0.32)' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: lang === 'ar'
            ? 'linear-gradient(to left, rgba(13,17,23,0.06) 0%, rgba(13,17,23,0.24) 55%, rgba(13,17,23,0.58) 100%)'
            : 'linear-gradient(to right, rgba(13,17,23,0.06) 0%, rgba(13,17,23,0.24) 55%, rgba(13,17,23,0.58) 100%)',
        }} />
        {/* Bottom fade — يخلي النص يبان واضح */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
          background: 'linear-gradient(to top, rgba(13,17,23,0.88) 0%, rgba(13,17,23,0.45) 60%, transparent 100%)',
          zIndex: 1,
        }} />
      </div>

      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '40%',
        left: lang === 'ar' ? '25%' : '75%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(0,194,255,0.1) 0%, rgba(0,194,255,0.05) 50%, transparent 70%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Big bg text */}
      {/* <div style={{
        position: 'absolute', bottom: -20,
        left: lang === 'ar' ? 'auto' : 0,
        right: lang === 'ar' ? 0 : 'auto',
        fontFamily: 'Playfair Display, serif',
        fontSize: 'clamp(80px, 18vw, 220px)', fontWeight: 900,
        color: 'rgba(0,194,255,0.04)', letterSpacing: 20,
        userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 2,
      }}>
        BMD
      </div> */}

      <div className="container hero-content-wrap" style={{ position: 'relative', zIndex: 4, width: '100%' }}>
        <div className="hero-text-block" style={{ maxWidth: 680 }}>

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
          <div className="hero-cta-row" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 18 }}>
            <SnakeButton
              as="a"
              href="#contact"
              className="snake-btn hero-cta hero-cta-primary"
              snakeOptions={{ speed: 0.0035, tailLength: 0.2, lineWidth: 2 }}
              onMouseEnter={() => setBtn1Hovered(true)}
              onMouseLeave={() => setBtn1Hovered(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 10,
                minWidth: 178,
                padding: '16px 34px',
                background: btn1Hovered ? 'linear-gradient(135deg, #00C2FF 0%, #1769FF 100%)' : 'linear-gradient(135deg, #00C2FF 0%, #0A3080 100%)',
                color: '#fff',
                fontWeight: 800, fontSize: 15, letterSpacing: 0,
                textDecoration: 'none', borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.22)', transition: 'all 0.35s ease',
                transform: btn1Hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: btn1Hovered ? '0 18px 40px rgba(0,194,255,0.35)' : '0 12px 28px rgba(0,194,255,0.24)',
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
              href="#services"
              className="snake-btn hero-cta hero-cta-secondary"
              onMouseEnter={() => setBtn2Hovered(true)}
              onMouseLeave={() => setBtn2Hovered(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 10,
                minWidth: 178,
                padding: '16px 34px',
                background: btn2Hovered ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                color: '#fff',
                fontWeight: 800, fontSize: 15, letterSpacing: 0,
                textDecoration: 'none',
                border: btn2Hovered ? '1px solid rgba(255,255,255,0.78)' : '1px solid rgba(255,255,255,0.34)',
                borderRadius: 12, transition: 'all 0.35s ease',
                transform: btn2Hovered ? 'translateY(-3px)' : 'translateY(0)',
                boxShadow: btn2Hovered ? '0 16px 34px rgba(0,0,0,0.25)' : 'none',
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
          background: 'linear-gradient(to bottom, #00C2FF, #6C63FF, transparent)',
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
        #hero .hero-cta {
          border-radius: 12px !important;
          letter-spacing: 0 !important;
          overflow: hidden !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
          gap: 10px !important;
        }
        #hero .hero-cta-primary {
          background: linear-gradient(135deg, #00C2FF 0%, #0A3080 100%) !important;
        }
        #hero .hero-cta-secondary {
          background: rgba(255,255,255,0.04) !important;
          box-shadow: none !important;
        }
        #hero .hero-cta svg {
          flex: 0 0 auto;
        }
        @media (min-width: 1025px) {
          #hero {
            align-items: flex-start !important;
            padding-top: 165px !important;
            padding-bottom: 40px !important;
          }
          .hero-content-wrap {
            transform: none !important;
          }
          #hero .hero-text-block {
            margin-right: -42px !important;
            margin-left: auto !important;
            transform: translateY(44px);
          }
          html[dir="ltr"] #hero .hero-text-block {
            margin-right: auto !important;
            margin-left: -42px !important;
          }
          #hero .hero-image-wrap img {
            object-position: 61% 44% !important;
          }
        }
     @media (max-width: 768px) {
  #hero { min-height: 100svh !important; padding-top: 88px !important; padding-bottom: 96px !important; }
  #hero .hero-content-wrap > div {
    max-width: none !important;
    text-align: center !important;
  }
  #hero .hero-cta-row {
    justify-content: center !important;
    width: 100%;
    flex-wrap: nowrap !important;   /* ← منع الـ wrap */
    gap: 10px !important;           /* ← تضييق الـ gap */
  }
  #hero .hero-cta {
    min-width: 0 !important;        /* ← إلغاء الـ 240px */
    flex: 1 1 0 !important;         /* ← كل زرار ياخد نص المساحة */
    max-width: 200px !important;    /* ← سقف معقول */
    padding-inline: 14px !important;
    font-size: 13px !important;
  }
}
      `}</style>
    </section>
  );
}
