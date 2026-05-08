import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import SnakeButton from './SnakeButton';
import '../animations.css';

const serviceIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h18v12H3z"/><path d="M8 20h8M12 16v4M7 9h4M7 12h7"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 6h4M12 18h.01M9 11l2 2 4-4"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16v12H4z"/><path d="M9 7V5a3 3 0 0 1 6 0v2M4 11h16"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 17h7M17 14v7"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20l5.5-1.2L20 8.3 15.7 4 5.2 14.5z"/><path d="M13.5 6.2l4.3 4.3M4 20h6"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v10H7l-3 3z"/><path d="M8 9h8M8 12h5"/></svg>,
];

const serviceDetailSlugs = [
  'web-development','mobile-app-development','e-commerce-website-development',
  'erp-systems','ui-ux-design','ai-solutions','tech-consulting',
];

export const serviceColors = [
  '#4A90D9','#27AE60','#E74C3C','#8E44AD','#F39C12','#16A085','#2C3E50',
];

function resolveServiceSlug(item, index) {
  const title = String(item?.title || '').toLowerCase();
  if (/موقع|web/.test(title)) return 'web-development';
  if (/تطبيق|mobile/.test(title)) return 'mobile-app-development';
  if (/متجر|commerce/.test(title)) return 'e-commerce-website-development';
  if (/erp/.test(title)) return 'erp-systems';
  if (/ui|ux|تصميم/.test(title)) return 'ui-ux-design';
  if (/ذكاء|ai/.test(title)) return 'ai-solutions';
  if (/استشار|consult/.test(title)) return 'tech-consulting';
  return serviceDetailSlugs[index] || 'web-development';
}

/* ── Floating particles — identical approach to About.jsx ── */
function ServiceParticles() {
  const items = Array.from({ length: 22 }, (_, i) => ({
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    dur: 12 + Math.random() * 16,
    delay: -Math.random() * 24,
    key: i,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {items.map(p => (
        <div key={p.key} style={{
          position: 'absolute',
          width: p.size, height: p.size,
          borderRadius: '50%',
          background: 'rgba(184,164,114,0.45)',
          left: `${p.left}%`,
          animation: `svcParticleRise ${p.dur}s linear ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

/* ── Orbiting ring behind hero number — mirrors About sphere rings ── */
function HeroOrb() {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
      {[320, 420, 520].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: size, height: size,
          borderRadius: '50%',
          border: `1px solid rgba(184,164,114,${0.06 - i * 0.015})`,
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          animation: `svcOrbit${i} ${14 + i * 6}s linear infinite ${i % 2 ? 'reverse' : ''}`,
        }} />
      ))}
      <div style={{
        position: 'absolute',
        width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(184,164,114,0.07) 0%, transparent 70%)',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        animation: 'svcGlowPulse 5s ease-in-out infinite',
      }} />
    </div>
  );
}

/* ── Scroll-reveal hook ── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.svc-reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('svc-revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Icon pulse canvas — small animated glow dot like About sphere dot ── */
function IconGlowDot({ color }) {
  const ref = useRef(null);
  const raf = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, 40, 40);
      const x = 20 + 10 * Math.cos(t * 1.3);
      const y = 20 + 8  * Math.sin(t * 0.9);
      const g = ctx.createRadialGradient(x, y, 0, x, y, 12);
      g.addColorStop(0, `${color}CC`);
      g.addColorStop(1, `${color}00`);
      ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      t += 0.04;
      raf.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, [color]);
  return <canvas ref={ref} width={40} height={40} style={{ position: 'absolute', top: -8, right: -8, pointerEvents: 'none' }} />;
}

export default function ServicesPage({ lang }) {
  useScrollReveal();
  const { data } = useData();
  const navigate = useNavigate();
  const tx = data?.translations?.services?.[lang] || {};

  const sanitize = t => String(t || '')
    .replace(/استشارات تقنية متخصصة/g, 'استشارات تقنية')
    .replace(/تقنية متخصصة/g, 'تقنية');
  const isTech = item => /استشار|consult/.test(`${item?.title || ''} ${item?.desc || ''}`.toLowerCase());
  const dbItems = (data?.services || [])
    .filter((svc) => svc?.visible !== false && svc?.slug !== 'tech-consulting')
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
    .map((svc) => ({
      slug: svc.slug,
      title: sanitize(lang === 'ar' ? svc.titleAr : svc.titleEn),
      desc: sanitize(lang === 'ar' ? svc.descAr : svc.descEn),
      features: (lang === 'ar' ? svc.featuresAr : svc.featuresEn) || [],
      cardImage: svc.cardImage || '',
    }));
  const fallbackItems = (tx.items || []).filter(i => !isTech(i)).map((i, idx) => ({
    ...i, title: sanitize(i?.title), desc: sanitize(i?.desc),
    features: Array.isArray(i?.features) ? i.features.map(sanitize) : i?.features,
    slug: resolveServiceSlug(i, idx),
    cardImage: '',
  }));
  const items = dbItems.length ? dbItems : fallbackItems;

  const [hovered, setHovered] = useState(null);
  const isAr = lang === 'ar';

  return (
    <div id="services" style={{ background: 'var(--bmc-dark)', minHeight: '100vh', paddingTop: 100, position: 'relative', overflow: 'hidden' }}>

      <ServiceParticles />

      {/* ── Hero ── */}
      <div className="svc-reveal" style={{
        position: 'relative', padding: '80px 0 100px', overflow: 'visible',
        opacity: 0, transform: 'translateY(30px)',
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}>
        <HeroOrb />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(245,240,232,0.4)', fontSize: 13, fontWeight: 600,
                padding: '4px 12px', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--bmc-gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,240,232,0.4)'}
            >
              {isAr ? 'الرئيسية' : 'Home'}
            </button>
            <span style={{ color: 'rgba(184,164,114,0.3)', fontSize: 13 }}>/</span>
            <span style={{ color: 'var(--bmc-gold)', fontSize: 13, fontWeight: 700 }}>
              {isAr ? 'خدماتنا' : 'Services'}
            </span>
          </div>

          <p className="section-label svc-reveal" style={{ opacity: 0, transform: 'translateY(16px)', transition: 'all 0.6s 0.1s' }}>
            {tx.label}
          </p>
          <h1 className="svc-reveal" style={{
            opacity: 0, transform: 'translateY(24px)', transition: 'all 0.7s 0.2s',
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900,
            color: 'var(--bmc-white)', lineHeight: 1.36, marginBottom: 16, paddingBottom: 6, textWrap: 'balance',
          }}>
            {tx.title}{' '}
            <span style={{
              background: 'linear-gradient(135deg, #D4C48F, #B8A472)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', fontStyle: 'italic',
            }}>{tx.titleSpan}</span>
          </h1>

          <div className="gold-line svc-reveal" style={{
            opacity: 0, transition: 'opacity 0.7s 0.3s',
            margin: '24px auto',
          }} />

          <p className="svc-reveal" style={{
            opacity: 0, transform: 'translateY(16px)', transition: 'all 0.7s 0.35s',
            fontSize: 16, color: 'rgba(245,240,232,0.5)', maxWidth: 540, margin: '0 auto', lineHeight: 1.9,
          }}>
            {isAr
              ? 'نقدم حلولاً رقمية متكاملة تلبي احتياجات عملك وتسرّع نموه في السوق.'
              : 'We deliver comprehensive digital solutions tailored to your business needs and growth.'}
          </p>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="container" style={{ paddingBottom: 100, position: 'relative', zIndex: 1 }}>
        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 1,
          background: 'rgba(184,164,114,0.08)',
        }}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            const isFull = isLast && items.length % 2 !== 0;
            const isHov = hovered === i;

            return (
              <div
                key={i}
                className="svc-reveal"
                onClick={() => navigate(`/service/${item.slug || resolveServiceSlug(item, i)}`)}
                style={{
                  opacity: 0,
                  transform: 'translateY(50px) scale(0.97)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s,
                               transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s,
                               background 0.35s ease, border-color 0.3s ease`,
                  background: isHov ? 'var(--bmc-dark-3)' : 'var(--bmc-dark)',
                  padding: '44px 36px',
                  cursor: 'pointer',
                  position: 'relative', overflow: 'hidden',
                  gridColumn: isFull ? '1 / -1' : undefined,
                  display: isFull ? 'grid' : 'block',
                  gridTemplateColumns: isFull ? '100px 1fr' : undefined,
                  alignItems: isFull ? 'center' : undefined,
                  gap: isFull ? 40 : undefined,
                  borderBottom: isHov ? '2px solid var(--bmc-gold)' : '2px solid transparent',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Radial glow on hover — mirrors About sphere outer glow */}
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 0,
                  background: isHov
                    ? `radial-gradient(ellipse at 50% 0%, ${serviceColors[i]}14 0%, transparent 65%)`
                    : 'transparent',
                  transition: 'background 0.5s ease',
                  pointerEvents: 'none',
                }} />

                {/* Scan shimmer on hover */}
                {isHov && (
                  <div style={{
                    position: 'absolute', top: 0, left: '-100%',
                    width: '60%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.05), transparent)',
                    animation: 'svcScan 1.4s ease-in-out forwards',
                    pointerEvents: 'none',
                  }} />
                )}

                {item.cardImage && (
                  <div style={{
                    height: 120,
                    marginBottom: 18,
                    borderRadius: 12,
                    overflow: 'hidden',
                    border: `1px solid ${serviceColors[i % serviceColors.length]}55`,
                  }}>
                    <img
                      src={item.cardImage}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}

                {/* Icon block */}
                <div style={{ marginBottom: isFull ? 0 : 24, position: 'relative' }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: 2,
                    color: isHov ? 'rgba(184,164,114,0.6)' : 'rgba(184,164,114,0.3)',
                    fontFamily: 'Playfair Display, serif', marginBottom: 16,
                    transition: 'color 0.3s',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{
                    width: isFull ? 64 : 52, height: isFull ? 64 : 52,
                    border: `1px solid ${isHov ? 'rgba(184,164,114,0.5)' : 'rgba(184,164,114,0.18)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${serviceColors[i]}10`,
                    transition: 'all 0.35s ease',
                    transform: isHov ? 'translateY(-5px) scale(1.1)' : 'translateY(0) scale(1)',
                    boxShadow: isHov ? `0 10px 30px ${serviceColors[i]}35` : 'none',
                    position: 'relative',
                  }}>
                    <div style={{ width: isFull ? 28 : 24, height: isFull ? 28 : 24 }}>
                      {React.cloneElement(serviceIcons[i] || serviceIcons[0], {
                        style: { width: '100%', height: '100%', stroke: serviceColors[i] }
                      })}
                    </div>
                    {/* Animated glow dot — same technique as About sphere bright dot */}
                    {isHov && <IconGlowDot color={serviceColors[i]} />}
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3 style={{
                    fontSize: isFull ? 22 : 18, fontWeight: 700,
                    color: isHov ? 'var(--bmc-white)' : 'rgba(245,240,232,0.85)',
                    marginBottom: 10, lineHeight: 1.35, transition: 'color 0.3s',
                  }}>{item.title}</h3>
                  <p style={{
                    fontSize: 14, color: 'rgba(245,240,232,0.5)',
                    lineHeight: 1.9, marginBottom: 20,
                    maxWidth: isFull ? 700 : '100%',
                  }}>{item.desc}</p>

                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 12, fontWeight: 700, letterSpacing: 1,
                    color: isHov ? 'var(--bmc-gold)' : 'rgba(184,164,114,0.4)',
                    transition: 'color 0.3s, gap 0.3s', textTransform: 'uppercase',
                  }}>
                    {isAr ? 'اعرف أكثر' : 'Learn More'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{
                        transform: `${isAr ? 'scaleX(-1) ' : ''}${isHov ? 'translateX(5px)' : 'translateX(0)'}`,
                        transition: 'transform 0.35s ease',
                      }}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom gold line slide */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: isHov ? '100%' : 0,
                  height: 2,
                  background: 'linear-gradient(90deg, var(--bmc-gold), rgba(184,164,114,0.4))',
                  transition: 'width 0.5s ease',
                }} />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="svc-reveal" style={{
          opacity: 0, transform: 'translateY(30px)',
          transition: 'all 0.7s 0.5s',
          textAlign: 'center', marginTop: 80,
        }}>
          <p style={{ color: 'rgba(245,240,232,0.45)', fontSize: 15, marginBottom: 24 }}>
            {isAr ? 'لا تجد ما تبحث عنه؟ تواصل معنا مباشرة' : "Can't find what you need? Contact us directly"}
          </p>
          <SnakeButton
            as="a" href="/#contact"
            snakeOptions={{ speed: 0.0035, tailLength: 0.2, lineWidth: 2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 36px',
              background: 'var(--bmc-gold)', color: 'var(--bmc-dark)',
              fontWeight: 700, fontSize: 14, letterSpacing: 0.5,
              textDecoration: 'none', borderRadius: 2,
              border: '1px solid var(--bmc-gold)', overflow: 'hidden', transition: 'all 0.3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--bmc-gold)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--bmc-gold)';
              e.currentTarget.style.color = 'var(--bmc-dark)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span className="snake-light" />
            {isAr ? 'ابدأ مشروعك' : 'Start Your Project'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </SnakeButton>
        </div>
      </div>

      <style>{`
        .svc-reveal.svc-revealed {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
        }

        @keyframes svcParticleRise {
          0%   { transform: translateY(110vh); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }
        @keyframes svcScan {
          from { left: -60%; }
          to   { left: 160%; }
        }
        @keyframes svcOrbit0 { from { transform: translate(-50%,-50%) rotate(0deg)  scaleX(1.5); } to { transform: translate(-50%,-50%) rotate(360deg)  scaleX(1.5); } }
        @keyframes svcOrbit1 { from { transform: translate(-50%,-50%) rotate(0deg)  scaleX(1.6); } to { transform: translate(-50%,-50%) rotate(360deg)  scaleX(1.6); } }
        @keyframes svcOrbit2 { from { transform: translate(-50%,-50%) rotate(0deg)  scaleX(1.7); } to { transform: translate(-50%,-50%) rotate(360deg)  scaleX(1.7); } }
        @keyframes svcGlowPulse {
          0%,100% { opacity: .5; transform: translate(-50%,-50%) scale(1); }
          50%     { opacity: 1;  transform: translate(-50%,-50%) scale(1.2); }
        }

        @media (max-width: 900px) {
          #services .services-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          #services .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
