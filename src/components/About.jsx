import React, { useEffect, useRef } from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';

function SphereCanvas() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 220, H = 220, cx = W / 2, cy = H / 2, R = 100;
    let t = 0;

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // base sphere
      const g = ctx.createRadialGradient(cx - 30, cy - 30, 10, cx, cy, R);
      g.addColorStop(0, 'rgba(184,164,114,0.45)');
      g.addColorStop(0.45, 'rgba(140,118,70,0.3)');
      g.addColorStop(0.8, 'rgba(80,60,20,0.35)');
      g.addColorStop(1, 'rgba(10,8,3,0.6)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // latitude lines
      for (let lat = -80; lat <= 80; lat += 20) {
        const y0 = cy + R * Math.sin((lat * Math.PI) / 180);
        const r0 = R * Math.cos((lat * Math.PI) / 180);
        if (r0 < 2) continue;
        ctx.beginPath();
        ctx.ellipse(cx, y0, r0, r0 * 0.18, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(184,164,114,${0.12 + 0.06 * Math.cos(((lat + t * 30) * Math.PI) / 180)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      // longitude lines
      for (let lon = 0; lon < 180; lon += 18) {
        const angle = ((lon + t * 15) * Math.PI) / 180;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(Math.abs(Math.cos(angle)) * 0.3 + 0.7, 1);
        ctx.beginPath();
        ctx.arc(0, 0, R, -Math.PI / 2, Math.PI / 2);
        ctx.strokeStyle = `rgba(184,164,114,${0.08 + 0.06 * Math.abs(Math.cos(angle))})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      }

      // shimmer
      const sh = ctx.createRadialGradient(cx - 40, cy - 40, 5, cx - 20, cy - 20, 80);
      sh.addColorStop(0, 'rgba(245,235,190,0.28)');
      sh.addColorStop(0.5, 'rgba(220,200,140,0.08)');
      sh.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = sh;
      ctx.fill();

      // rotating bright dot
      const bx = cx + R * 0.65 * Math.cos(t * 1.2);
      const by = cy + R * 0.45 * Math.sin(t * 0.9);
      const bd = ctx.createRadialGradient(bx, by, 0, bx, by, 14);
      bd.addColorStop(0, 'rgba(245,235,190,0.8)');
      bd.addColorStop(1, 'rgba(184,164,114,0)');
      ctx.beginPath();
      ctx.arc(bx, by, 14, 0, Math.PI * 2);
      ctx.fillStyle = bd;
      ctx.fill();

      // edge glow
      const edge = ctx.createRadialGradient(cx, cy, R * 0.75, cx, cy, R);
      edge.addColorStop(0, 'rgba(0,0,0,0)');
      edge.addColorStop(1, 'rgba(184,164,114,0.2)');
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = edge;
      ctx.fill();

      t += 0.008;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={220}
      height={220}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

export default function About({ lang }) {
  useAnimate();
  const { data } = useData();
  const tx = data?.translations?.about?.[lang] || {};
  const aboutLabel = lang === 'ar' ? 'البنية الماسية الرقمية' : (tx.label || 'About Us');
  const whatsappUrl = 'https://wa.me/966535166370';

  return (
    <section
      id="about"
      className="section"
      style={{ background: 'var(--bmc-dark-2)', position: 'relative', overflow: 'hidden' }}
    >
      {/* top separator */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.3), transparent)',
      }} />

      {/* ── floating particles ── */}
      <Particles />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}>

          {/* ── Left: Text ── */}
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
                transition: 'all 0.3s', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(184,164,114,0.1)';
                e.currentTarget.style.borderColor = 'var(--bmc-gold)';
              }}
              onMouseLeave={e => {
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

          {/* ── Right: 3D Sphere ── */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {/* rings */}
            <div style={{ position: 'relative', width: 280, height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              {/* orbit ring 1 */}
              <div style={{
                position: 'absolute',
                width: 260, height: 260,
                borderRadius: '50%',
                border: '1px solid rgba(184,164,114,0.1)',
                animation: 'aboutRing1 14s linear infinite',
              }} />
              {/* orbit ring 2 */}
              <div style={{
                position: 'absolute',
                width: 300, height: 300,
                borderRadius: '50%',
                border: '1px solid rgba(184,164,114,0.06)',
                animation: 'aboutRing2 20s linear infinite reverse',
              }} />

              {/* outer glow */}
              <div style={{
                position: 'absolute',
                width: 240, height: 240,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(184,164,114,0.07) 0%, transparent 70%)',
                animation: 'aboutGlow 5s ease-in-out infinite',
              }} />

              {/* sphere wrapper */}
              <div style={{
                width: 220, height: 220,
                borderRadius: '50%',
                overflow: 'hidden',
                boxShadow: '0 0 60px rgba(184,164,114,0.2), 0 0 120px rgba(184,164,114,0.08), inset 0 0 40px rgba(0,0,0,0.5)',
                animation: 'aboutFloat 6s ease-in-out infinite',
                position: 'relative',
              }}>
                <SphereCanvas />

                {/* number overlay */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: 72, fontWeight: 900,
                  color: '#fff',
                  textShadow: '0 0 30px rgba(245,235,190,0.6), 0 0 60px rgba(184,164,114,0.4)',
                  pointerEvents: 'none',
                  animation: 'aboutNumPulse 4s ease-in-out infinite',
                  fontFamily: 'Playfair Display, serif',
                }}>
                  15
                </div>
              </div>
            </div>

            <p style={{
              fontSize: 13, color: 'rgba(245,240,232,0.5)',
              letterSpacing: 1, marginTop: -8,
            }}>
              {lang === 'ar' ? 'عام من الخبرة' : 'Years of Experience'}
            </p>

            {/* stats row */}
            <div style={{ display: 'flex', gap: 40, marginTop: 28 }}>
              {[
                { num: '+2000', label: lang === 'ar' ? 'عميل راضٍ' : 'Happy Clients' },
                { num: '+50',   label: lang === 'ar' ? 'مشروع منجز' : 'Projects Done' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: 28, fontWeight: 900, color: '#fff',
                    textShadow: '0 0 20px rgba(184,164,114,0.3)',
                    animation: `aboutStatIn 0.8s ease ${0.2 + i * 0.15}s both`,
                  }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: 'rgba(245,240,232,0.4)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes aboutRing1  { from { transform: rotate(0deg) scaleX(1.5); } to { transform: rotate(360deg) scaleX(1.5); } }
        @keyframes aboutRing2  { from { transform: rotate(0deg) scaleX(1.6); } to { transform: rotate(360deg) scaleX(1.6); } }
        @keyframes aboutGlow   { 0%,100%{ opacity:.6; transform:scale(1);    } 50%{ opacity:1; transform:scale(1.1); } }
        @keyframes aboutFloat  { 0%,100%{ transform:translateY(0);           } 50%{ transform:translateY(-12px);    } }
        @keyframes aboutNumPulse {
          0%,100%{ text-shadow:0 0 30px rgba(245,235,190,0.6),0 0 60px rgba(184,164,114,0.4); }
          50%{ text-shadow:0 0 50px rgba(255,245,200,0.95),0 0 100px rgba(184,164,114,0.7); }
        }
        @keyframes aboutStatIn { from{ opacity:0; transform:translateY(10px) scale(0.8); } to{ opacity:1; transform:translateY(0) scale(1); } }
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          .about-text { transform: translateX(0) translateY(40px) !important; }
        }
      `}</style>
    </section>
  );
}

/* ── tiny floating particles component ── */
function Particles() {
  const items = Array.from({ length: 18 }, (_, i) => ({
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    dur: 10 + Math.random() * 14,
    delay: -Math.random() * 20,
    key: i,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {items.map(p => (
        <div key={p.key} style={{
          position: 'absolute',
          width: p.size, height: p.size,
          borderRadius: '50%',
          background: 'rgba(184,164,114,0.5)',
          left: `${p.left}%`,
          animation: `particleRise ${p.dur}s linear ${p.delay}s infinite`,
        }} />
      ))}
      <style>{`
        @keyframes particleRise {
          0%   { transform:translateY(110%); opacity:0; }
          10%  { opacity:1; }
          90%  { opacity:1; }
          100% { transform:translateY(-10%); opacity:0; }
        }
      `}</style>
    </div>
  );
}