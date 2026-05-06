import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import SnakeButton from './SnakeButton';
import '../animations.css';

const serviceIcons = [
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 4h18v12H3z" />
    <path d="M8 20h8M12 16v4M7 9h4M7 12h7" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="2" width="10" height="20" rx="2" />
    <path d="M10 6h4M12 18h.01M9 11l2 2 4-4" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 7h16v12H4z" />
    <path d="M9 7V5a3 3 0 0 1 6 0v2M4 11h16" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 17h7M17 14v7" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20l5.5-1.2L20 8.3 15.7 4 5.2 14.5z" />
    <path d="M13.5 6.2l4.3 4.3M4 20h6" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
  </svg>,
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5h16v10H7l-3 3z" />
    <path d="M8 9h8M8 12h5" />
  </svg>,
];

const serviceDetailSlugs = [
  'web-development',
  'mobile-app-development',
  'e-commerce-website-development',
  'erp-systems',
  'ui-ux-design',
  'ai-solutions',
  'tech-consulting',
];

export const serviceColors = [
  '#4A90D9', '#27AE60', '#E74C3C', '#8E44AD', '#F39C12', '#16A085', '#2C3E50',
];

// ── Hook للأنيميشن عند الـ scroll ──
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

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

export default function ServicesPage({ lang }) {
  useScrollReveal();
  const { data } = useData();
  const navigate = useNavigate();
  const tx = data?.translations?.services?.[lang] || {};
  const sanitizeServiceText = (text) => String(text || '')
    .replace(/استشارات تقنية متخصصة/g, 'استشارات تقنية')
    .replace(/تقنية متخصصة/g, 'تقنية');
  const isTechConsultingItem = (item) => {
    const text = `${item?.title || ''} ${item?.desc || ''}`.toLowerCase();
    return /استشار|consult/.test(text);
  };
  const items = (tx.items || [])
    .filter((item) => !isTechConsultingItem(item))
    .map((item) => ({
    ...item,
    title: sanitizeServiceText(item?.title),
    desc: sanitizeServiceText(item?.desc),
    features: Array.isArray(item?.features) ? item.features.map(sanitizeServiceText) : item?.features,
  }));
  const [hovered, setHovered] = useState(null);

  const isAr = lang === 'ar';

  return (
    <div id="services" style={{ background: 'var(--bmc-dark)', minHeight: '100vh', paddingTop: 100 }}>

      {/* ── Hero Section ── */}
      <div style={{ position: 'relative', padding: '80px 0 100px', overflow: 'hidden' }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(184,164,114,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
            <button
              onClick={() => navigate('/')}
              className="snake-btn"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'rgba(245,240,232,0.4)', fontSize: 13, fontWeight: 600,
                padding: '4px 12px', borderRadius: 2, position: 'relative', overflow: 'hidden',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--bmc-gold)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,240,232,0.4)'}
            >
              <span className="snake-light" />
              {isAr ? 'الرئيسية' : 'Home'}
            </button>
            <span style={{ color: 'rgba(184,164,114,0.3)', fontSize: 13 }}>/</span>
            <span style={{ color: 'var(--bmc-gold)', fontSize: 13, fontWeight: 700 }}>
              {isAr ? 'خدماتنا' : 'Services'}
            </span>
          </div>

          <p className="section-label reveal" style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s' }}>
            {tx.label}
          </p>
          <h1 className="reveal" style={{
            opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s 0.1s',
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900,
            color: 'var(--bmc-white)', lineHeight: 1.2, marginBottom: 16,
          }}>
            {tx.title} <span style={{
              background: 'linear-gradient(135deg, #D4C48F, #B8A472)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', fontStyle: 'italic',
            }}>{tx.titleSpan}</span>
          </h1>
          <div className="gold-line reveal" style={{
            opacity: 0, transition: 'all 0.7s 0.2s',
            margin: '24px auto',
          }} />
          <p className="reveal" style={{
            opacity: 0, transform: 'translateY(20px)', transition: 'all 0.7s 0.25s',
            fontSize: 16, color: 'rgba(245,240,232,0.5)', maxWidth: 540, margin: '0 auto',
            lineHeight: 1.9,
          }}>
            {isAr
              ? 'نقدم حلولاً رقمية متكاملة تلبي احتياجات عملك وتسرّع نموه في السوق.'
              : 'We deliver comprehensive digital solutions tailored to your business needs and growth.'}
          </p>
        </div>
      </div>

      {/* ── Services Grid ── */}
      <div className="container" style={{ paddingBottom: 100 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: 'rgba(184,164,114,0.08)',
        }}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            const isOdd = items.length % 2 !== 0;
            const isFull = isLast && isOdd;

            return (
              <div
                key={i}
                className="reveal"
                onClick={() => navigate(`/service/${resolveServiceSlug(item, i)}`)}
                style={{
                  opacity: 0,
                  transform: 'translateY(40px)',
                  transition: `all 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
                  background: hovered === i ? 'var(--bmc-dark-3)' : 'var(--bmc-dark)',
                  padding: '44px 36px',
                  cursor: 'pointer',
                  position: 'relative', overflow: 'hidden',
                  gridColumn: isFull ? '1 / -1' : undefined,
                  display: isFull ? 'grid' : 'block',
                  gridTemplateColumns: isFull ? '100px 1fr' : undefined,
                  alignItems: isFull ? 'center' : undefined,
                  gap: isFull ? 40 : undefined,
                  borderBottom: hovered === i ? '2px solid var(--bmc-gold)' : '2px solid transparent',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="snake-light" />

                {/* Icon block */}
                <div style={{ marginBottom: isFull ? 0 : 24 }}>
                  <div style={{
                    fontSize: 11, fontWeight: 700, letterSpacing: 2,
                    color: 'rgba(184,164,114,0.35)', fontFamily: 'Playfair Display, serif',
                    marginBottom: 16,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div style={{
                    width: isFull ? 64 : 52, height: isFull ? 64 : 52,
                    border: `1px solid ${hovered === i ? 'rgba(184,164,114,0.5)' : 'rgba(184,164,114,0.2)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `${serviceColors[i]}10`,
                    transition: 'all 0.3s',
                    transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
                  }}>
                    <div style={{ width: isFull ? 28 : 24, height: isFull ? 28 : 24 }}>
                      {React.cloneElement(serviceIcons[i] || serviceIcons[0], {
                        style: { width: '100%', height: '100%', stroke: serviceColors[i] }
                      })}
                    </div>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <h3 style={{
                    fontSize: isFull ? 22 : 18, fontWeight: 700,
                    color: hovered === i ? 'var(--bmc-white)' : 'rgba(245,240,232,0.85)',
                    marginBottom: 10, lineHeight: 1.35, transition: 'color 0.3s',
                  }}>{item.title}</h3>
                  <p style={{
                    fontSize: 14, color: 'rgba(245,240,232,0.5)',
                    lineHeight: 1.9, marginBottom: 20,
                    maxWidth: isFull ? 700 : '100%',
                  }}>{item.desc}</p>

                  {/* Explore link */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontSize: 12, fontWeight: 700, letterSpacing: 1,
                    color: hovered === i ? 'var(--bmc-gold)' : 'rgba(184,164,114,0.4)',
                    transition: 'color 0.3s',
                    textTransform: 'uppercase',
                  }}>
                    {isAr ? 'اعرف أكثر' : 'Learn More'}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      style={{
                        transform: `${isAr ? 'scaleX(-1) ' : ''}${hovered === i ? 'translateX(4px)' : 'translateX(0)'}`,
                        transition: 'transform 0.3s',
                      }}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom gold line */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: hovered === i ? '100%' : 0, height: 2,
                  background: 'var(--bmc-gold)',
                  transition: 'width 0.45s ease',
                }} />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="reveal" style={{
          opacity: 0, transform: 'translateY(30px)', transition: 'all 0.7s 0.4s',
          textAlign: 'center', marginTop: 80,
        }}>
          <p style={{ color: 'rgba(245,240,232,0.45)', fontSize: 15, marginBottom: 24 }}>
            {isAr ? 'لا تجد ما تبحث عنه؟ تواصل معنا مباشرة' : "Can't find what you need? Contact us directly"}
          </p>
          <SnakeButton
            as="a"
            href="/#contact"
            className="snake-btn"
            snakeOptions={{ speed: 0.0035, tailLength: 0.2, lineWidth: 2 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '14px 36px',
              background: 'var(--bmc-gold)', color: 'var(--bmc-dark)',
              fontWeight: 700, fontSize: 14, letterSpacing: 0.5,
              textDecoration: 'none', borderRadius: 2,
              border: '1px solid var(--bmc-gold)',
              overflow: 'hidden',
              transition: 'all 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--bmc-gold)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
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
        .reveal.revealed { opacity: 1 !important; transform: translateY(0) !important; }
        @media (max-width: 900px) {
          .container > div > .reveal { grid-column: span 1 !important; }
        }
        @media (max-width: 768px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
