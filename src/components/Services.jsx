import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import SnakeButton from './SnakeButton';
import '../animations.css';

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

/* ── Floating particles ── */
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

/* ── Orbiting rings ── */
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

/* ── Image placeholder when no cardImage ── */
function CardImagePlaceholder({ color, index }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: `linear-gradient(135deg, ${color}18 0%, ${color}08 50%, rgba(184,164,114,0.04) 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* subtle number watermark */}
      <span style={{
        fontSize: 80,
        fontWeight: 900,
        fontFamily: 'Playfair Display, serif',
        color: `${color}12`,
        userSelect: 'none',
        lineHeight: 1,
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  );
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
            fontFamily: isAr ? 'Cairo, sans-serif' : 'Playfair Display, serif',
            fontSize: 'clamp(36px,6vw,72px)', fontWeight: 900,
            color: 'var(--bmc-white)', lineHeight: 1.36,
            marginBottom: 16,
            paddingBottom: 12,
            overflow: 'visible',
            textWrap: 'balance',
          }}>
            {tx.title}{' '}
            <span style={{
              background: 'linear-gradient(135deg, #D4C48F, #B8A472)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: isAr ? 'normal' : 'italic',
              display: isAr ? 'inline' : 'inline-block',
              paddingBottom: isAr ? 0 : 4,
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
            const isFull = isLast && items.length % 3 !== 0 && items.length % 3 === 1;
            const isHov = hovered === i;
            const color = serviceColors[i % serviceColors.length];

            return (
              <div
                key={i}
                className="svc-reveal svc-card"
                onClick={() => navigate(`/service/${item.slug || resolveServiceSlug(item, i)}`)}
                style={{
                  opacity: 0,
                  transform: 'translateY(50px) scale(0.97)',
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s,
                               transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s,
                               background 0.35s ease`,
                  background: isHov ? 'var(--bmc-dark-3)' : 'var(--bmc-dark)',
                  cursor: 'pointer',
                  position: 'relative', overflow: 'hidden',
                  gridColumn: isFull ? '1 / -1' : undefined,
                  display: 'flex',
                  flexDirection: 'column',
                  borderBottom: `2px solid ${isHov ? 'var(--bmc-gold)' : 'transparent'}`,
                  transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s,
                               transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.08}s,
                               background 0.35s ease, border-color 0.3s ease`,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* ── Card Image — full width, top of card ── */}
                <div style={{
                  width: '100%',
                  height: 200,
                  overflow: 'hidden',
                  position: 'relative',
                  flexShrink: 0,
                }}>
                  {item.cardImage ? (
                    <img
                      src={item.cardImage}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                        transform: isHov ? 'scale(1.06)' : 'scale(1)',
                        display: 'block',
                      }}
                    />
                  ) : (
                    <CardImagePlaceholder color={color} index={i} />
                  )}

                  {/* overlay gradient — fades image into card body */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
                    background: `linear-gradient(to bottom, transparent, ${isHov ? 'var(--bmc-dark-3)' : 'var(--bmc-dark)'})`,
                    transition: 'background 0.35s ease',
                    pointerEvents: 'none',
                  }} />

                  {/* color accent top-left corner */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0,
                    width: isHov ? 4 : 0, height: '100%',
                    background: `linear-gradient(to bottom, ${color}, ${color}44)`,
                    transition: 'width 0.4s ease',
                  }} />

                  {/* index badge */}
                  <div style={{
                    position: 'absolute', top: 16, right: 16,
                    fontSize: 11, fontWeight: 700, letterSpacing: 2,
                    color: isHov ? 'rgba(184,164,114,0.9)' : 'rgba(184,164,114,0.5)',
                    fontFamily: 'Playfair Display, serif',
                    background: 'rgba(10,10,20,0.55)',
                    backdropFilter: 'blur(6px)',
                    padding: '3px 8px', borderRadius: 4,
                    transition: 'color 0.3s',
                    border: '1px solid rgba(184,164,114,0.15)',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* ── Card Body ── */}
                <div style={{
                  padding: '28px 32px 36px',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  position: 'relative',
                }}>
                  {/* Radial glow */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: isHov
                      ? `radial-gradient(ellipse at 50% 0%, ${color}12 0%, transparent 70%)`
                      : 'transparent',
                    transition: 'background 0.5s ease',
                    pointerEvents: 'none',
                  }} />

                  {/* Scan shimmer */}
                  {isHov && (
                    <div style={{
                      position: 'absolute', top: 0, left: '-100%',
                      width: '60%', height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.04), transparent)',
                      animation: 'svcScan 1.4s ease-in-out forwards',
                      pointerEvents: 'none',
                    }} />
                  )}

                  {/* Title */}
                  <h3 style={{
                    fontSize: 19, fontWeight: 700,
                    color: isHov ? 'var(--bmc-white)' : 'rgba(245,240,232,0.88)',
                    marginBottom: 10, lineHeight: 1.35,
                    transition: 'color 0.3s',
                    position: 'relative',
                  }}>
                    {/* colored left bar */}
                    <span style={{
                      display: 'inline-block',
                      width: 3, height: '1em',
                      background: color,
                      borderRadius: 2,
                      marginInlineEnd: 10,
                      verticalAlign: 'middle',
                      opacity: isHov ? 1 : 0.4,
                      transition: 'opacity 0.3s',
                    }} />
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p style={{
                    fontSize: 14,
                    color: 'rgba(245,240,232,0.52)',
                    lineHeight: 1.85,
                    marginBottom: 20,
                    flex: 1,
                    position: 'relative',
                  }}>
                    {item.desc}
                  </p>

                  {/* Learn more CTA */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 12, fontWeight: 700, letterSpacing: 1,
                    color: isHov ? 'var(--bmc-gold)' : 'rgba(184,164,114,0.4)',
                    transition: 'color 0.3s, gap 0.3s', textTransform: 'uppercase',
                    position: 'relative',
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

                {/* Bottom gold line */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: isHov ? '100%' : 0, height: 2,
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
        @keyframes svcOrbit0 { from { transform: translate(-50%,-50%) rotate(0deg)   scaleX(1.5); } to { transform: translate(-50%,-50%) rotate(360deg)  scaleX(1.5); } }
        @keyframes svcOrbit1 { from { transform: translate(-50%,-50%) rotate(0deg)   scaleX(1.6); } to { transform: translate(-50%,-50%) rotate(360deg)  scaleX(1.6); } }
        @keyframes svcOrbit2 { from { transform: translate(-50%,-50%) rotate(0deg)   scaleX(1.7); } to { transform: translate(-50%,-50%) rotate(360deg)  scaleX(1.7); } }
        @keyframes svcGlowPulse {
          0%,100% { opacity: .5; transform: translate(-50%,-50%) scale(1); }
          50%     { opacity: 1;  transform: translate(-50%,-50%) scale(1.2); }
        }

        /* card image hover zoom needs the img directly */
        .svc-card:hover img { transform: scale(1.06) !important; }

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