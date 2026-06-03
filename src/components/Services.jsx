import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';
import { overrideServiceCard } from '../data/digitalMarketingService';

const fallbackServiceImagesBySlug = {
  'mobile-app-development': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780492386/ChatGPT_Image_Jun_3_2026_04_08_20_PM_gmfa5h.png?v=1780492386',
  'e-commerce-website-development': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780490773/ChatGPT_Image_Jun_3_2026_03_32_23_PM_uxzmme.png',
  'erp-systems': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780492458/ChatGPT_Image_Jun_3_2026_04_14_01_PM_itewvs.png?v=1780492458',
  'ai-solutions': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780490772/ChatGPT_Image_Jun_3_2026_03_40_21_PM_o6oijd.png',
  'web-development': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780490766/ChatGPT_Image_Jun_3_2026_03_30_44_PM_mabpls.png',
  'ui-ux-design': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780492387/ChatGPT_Image_Jun_3_2026_04_07_08_PM_fig092.png?v=1780492387',
};

const forcedServiceImagesBySlug = {
  'mobile-app-development': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780492386/ChatGPT_Image_Jun_3_2026_04_08_20_PM_gmfa5h.png?v=1780492386',
  'ai-solutions': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780490772/ChatGPT_Image_Jun_3_2026_03_40_21_PM_o6oijd.png',
  'ui-ux-design': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780492387/ChatGPT_Image_Jun_3_2026_04_07_08_PM_fig092.png?v=1780492387',
  'erp-systems': 'https://res.cloudinary.com/dxxfpkx5y/image/upload/v1780492458/ChatGPT_Image_Jun_3_2026_04_14_01_PM_itewvs.png?v=1780492458',
};

function resolveServiceImage(item) {
  if (!item) return '';
  if (forcedServiceImagesBySlug[item.slug]) return forcedServiceImagesBySlug[item.slug];

  const title = String(item.title || '');
  if (/تطوير\s*التطبيقات|mobile\s*app/i.test(title)) {
    return forcedServiceImagesBySlug['mobile-app-development'];
  }
  if (/erp/i.test(title)) {
    return forcedServiceImagesBySlug['erp-systems'];
  }
  if (/ui\s*\/?\s*ux/i.test(title)) {
    return forcedServiceImagesBySlug['ui-ux-design'];
  }
  if (/التسويق\s*الرقمي|digital\s*marketing/i.test(title)) {
    return forcedServiceImagesBySlug['ai-solutions'];
  }

  return item.cardImage || fallbackServiceImagesBySlug[item.slug] || '';
}


const serviceDetailSlugs = [
  'web-development','mobile-app-development','e-commerce-website-development',
  'erp-systems','ui-ux-design','ai-solutions','tech-consulting',
];

export const serviceColors = [
  '#00C2FF', '#00C2FF', '#00C2FF', '#00C2FF', '#00C2FF', '#00C2FF', '#00C2FF',
];

function resolveServiceSlug(item, index) {
  const title = String(item?.title || '').toLowerCase();
  if (/موقع|web/.test(title)) return 'web-development';
  if (/تطبيق|mobile/.test(title)) return 'mobile-app-development';
  if (/متجر|commerce/.test(title)) return 'e-commerce-website-development';
  if (/erp/.test(title)) return 'erp-systems';
  if (/ui|ux|تصميم/.test(title)) return 'ui-ux-design';
  if (/ذكاء|ai|تسويق|marketing/.test(title)) return 'ai-solutions';
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
          background: 'rgba(0,194,255,0.38)',
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
          border: `1px solid rgba(0,194,255,${0.08 - i * 0.02})`,
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          animation: `svcOrbit${i} ${14 + i * 6}s linear infinite ${i % 2 ? 'reverse' : ''}`,
        }} />
      ))}
      <div style={{
        position: 'absolute',
        width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,194,255,0.09) 0%, transparent 70%)',
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

/* ── SVG icons per service index ── */
const SERVICE_ICONS = [
  /* 0 web */
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5"/>
    <ellipse cx="24" cy="24" rx="9" ry="20" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="6" y1="15" x2="42" y2="15" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
    <line x1="6" y1="33" x2="42" y2="33" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
  </svg>,
  /* 1 mobile */
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="13" y="4" width="22" height="40" rx="4" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="24" cy="38" r="2" fill="currentColor" opacity=".5"/>
    <line x1="13" y1="10" x2="35" y2="10" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="18" y="16" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
  </svg>,
  /* 2 e-commerce */
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 8h5l5 20h20l4-14H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="38" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
    <circle cx="32" cy="38" r="2.5" stroke="currentColor" strokeWidth="1.4"/>
  </svg>,
  /* 3 ERP */
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="28" y="6" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="6" y="28" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="28" y="28" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="20" y1="13" x2="28" y2="13" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="13" y1="20" x2="13" y2="28" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="35" y1="20" x2="35" y2="28" stroke="currentColor" strokeWidth="1.2"/>
    <line x1="20" y1="35" x2="28" y2="35" stroke="currentColor" strokeWidth="1.2"/>
  </svg>,
  /* 4 UI/UX */
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="10" width="36" height="28" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="17" cy="22" r="5" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="26" y1="19" x2="38" y2="19" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="26" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="9" y1="30" x2="22" y2="30" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2"/>
  </svg>,
  /* 5 AI */
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="3" fill="currentColor" opacity=".4"/>
    <line x1="24" y1="6" x2="24" y2="14" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="24" y1="34" x2="24" y2="42" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="6" y1="24" x2="14" y2="24" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="34" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="11" y1="11" x2="17" y2="17" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="31" y1="31" x2="37" y2="37" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="37" y1="11" x2="31" y2="17" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="17" y1="31" x2="11" y2="37" stroke="currentColor" strokeWidth="1.3"/>
  </svg>,
  /* 6 consulting */
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 36 L20 22 L28 30 L40 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="40" cy="14" r="3" stroke="currentColor" strokeWidth="1.4"/>
    <line x1="8" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="1.2" opacity=".4"/>
  </svg>,
];

/* ── Image placeholder when no cardImage ── */
function CardImagePlaceholder({ color, index }) {
  const icon = SERVICE_ICONS[index % SERVICE_ICONS.length];
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: `linear-gradient(135deg, ${color}14 0%, rgba(2,4,20,0) 60%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${color}10 1px, transparent 1px), linear-gradient(90deg, ${color}10 1px, transparent 1px)`,
        backgroundSize: '28px 28px',
        opacity: 0.6,
      }} />
      {/* number watermark */}
      <span style={{
        position: 'absolute', bottom: 8, right: 14,
        fontSize: 56, fontWeight: 900,
        fontFamily: 'Playfair Display, serif',
        color: `${color}0d`,
        userSelect: 'none', lineHeight: 1,
        letterSpacing: -2,
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      {/* SVG icon */}
      <div style={{
        width: 64, height: 64,
        color: color,
        opacity: 0.55,
        position: 'relative',
        filter: `drop-shadow(0 0 12px ${color}55)`,
      }}>
        {icon}
      </div>
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
    .map((svc) => overrideServiceCard({
      slug: svc.slug,
      title: sanitize(lang === 'ar' ? svc.titleAr : svc.titleEn),
      desc: sanitize(lang === 'ar' ? svc.descAr : svc.descEn),
      features: (lang === 'ar' ? svc.featuresAr : svc.featuresEn) || [],
      cardImage: svc.cardImage || '',
    }, lang));
  const fallbackItems = (tx.items || []).filter(i => !isTech(i)).map((i, idx) => overrideServiceCard({
    ...i,
    title: sanitize(i?.title),
    desc: sanitize(i?.desc),
    features: Array.isArray(i?.features) ? i.features.map(sanitize) : i?.features,
    slug: resolveServiceSlug(i, idx),
    cardImage: '',
  }, lang));
  const items = dbItems.length ? dbItems : fallbackItems;

  const [hovered, setHovered] = useState(null);
  const isAr = lang === 'ar';

  return (
    <section id="services" className="section" style={{ background: 'var(--bmc-dark-2)', position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,194,255,0.25), transparent)',
        zIndex: 1,
      }} />

      <ServiceParticles />
      <HeroOrb />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="svc-reveal" style={{
          textAlign: 'center',
          opacity: 0,
          transform: 'translateY(30px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
          marginBottom: 56,
        }}>
          <p className="section-label">{tx.label}</p>
          <h2 className="section-title" style={{ marginBottom: 18 }}>
            {tx.title} <span>{tx.titleSpan}</span>
          </h2>
          <div className="gold-line" style={{ margin: '0 auto 22px' }} />
          <p style={{
            fontSize: 15,
            color: 'rgba(245,240,232,0.6)',
            maxWidth: 720,
            margin: '0 auto',
            lineHeight: 1.9,
          }}>
            {isAr
              ? 'نقدّم حلولاً رقمية متكاملة تلبي احتياجات عملك وتسرّع نموه في السوق.'
              : 'We deliver comprehensive digital solutions tailored to your business needs and growth.'}
          </p>
        </div>

        <div className="services-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 24,
        }}>
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            const isFull = isLast && items.length % 3 !== 0 && items.length % 3 === 1;
            const isHov = hovered === i;
            const color = serviceColors[i % serviceColors.length];
            const icon = SERVICE_ICONS[i % SERVICE_ICONS.length];
            const imageSrc = resolveServiceImage(item);

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
                               box-shadow 0.4s ease, border-color 0.4s ease`,
                  background: isHov
                    ? `linear-gradient(145deg, rgba(7,11,32,0.92) 0%, rgba(4,7,26,0.98) 100%)`
                    : `linear-gradient(145deg, rgba(4,7,26,0.78) 0%, rgba(7,11,32,0.86) 100%)`,
                  cursor: 'pointer',
                  position: 'relative', overflow: 'hidden',
                  gridColumn: isFull ? '1 / -1' : undefined,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 20,
                  border: `1px solid ${isHov ? `${color}55` : 'rgba(0,194,255,0.12)'}`,
                  boxShadow: isHov
                    ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${color}22, inset 0 1px 0 rgba(255,255,255,0.06)`
                    : `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)`,
                  backdropFilter: 'blur(12px)',
                  padding: 0,
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* ── Gradient border top glow ── */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0,
                  height: 1,
                  background: isHov
                    ? `linear-gradient(90deg, transparent, ${color}99, transparent)`
                    : `linear-gradient(90deg, transparent, rgba(0,194,255,0.2), transparent)`,
                  transition: 'background 0.4s ease',
                  borderRadius: '20px 20px 0 0',
                }} />

                {/* ── Corner accent glow ── */}
                <div style={{
                  position: 'absolute', top: -40, insetInlineEnd: -40,
                  width: 140, height: 140,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${color}${isHov ? '18' : '08'} 0%, transparent 70%)`,
                  transition: 'background 0.5s ease',
                  pointerEvents: 'none',
                }} />

                {/* ── Card Image (if exists) ── */}
                {imageSrc && (
                  <div style={{
                    width: '100%', height: 180,
                    overflow: 'hidden', position: 'relative',
                    flexShrink: 0, borderRadius: '20px 20px 0 0',
                  }}>
                    <img
                      src={imageSrc}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                        transform: isHov ? 'scale(1.06)' : 'scale(1)',
                        display: 'block',
                      }}
                    />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
                      background: 'linear-gradient(to bottom, transparent, rgba(4,7,26,0.96))',
                      pointerEvents: 'none',
                    }} />
                  </div>
                )}
                {!imageSrc && (
                  <div style={{
                    width: '100%',
                    height: 180,
                    overflow: 'hidden',
                    position: 'relative',
                    flexShrink: 0,
                    borderRadius: '20px 20px 0 0',
                  }}>
                    <CardImagePlaceholder color={color} index={i} />
                  </div>
                )}

                {/* ── Card Body ── */}
                <div style={{
                  padding: '32px 28px 28px',
                  flex: 1, display: 'flex', flexDirection: 'column', gap: 0,
                  position: 'relative',
                }}>

                  {/* Index badge */}
                  <span style={{
                    display: 'block', marginBottom: 20,
                    fontSize: 11, fontWeight: 800, letterSpacing: 2,
                    color: isHov ? color : 'rgba(0,194,255,0.26)',
                    fontFamily: 'Playfair Display, serif',
                    transition: 'color 0.3s',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    fontSize: 18, fontWeight: 700,
                    color: isHov ? 'var(--bmc-white)' : 'rgba(245,240,232,0.85)',
                    marginBottom: 10, lineHeight: 1.4,
                    transition: 'color 0.3s',
                  }}>
                    {item.title}
                  </h3>

                  {/* Divider */}
                  <div style={{
                    width: isHov ? 40 : 24, height: 2,
                    background: `linear-gradient(90deg, ${color}, ${color}44)`,
                    borderRadius: 2, marginBottom: 14,
                    transition: 'width 0.4s ease',
                  }} />

                  {/* Description */}
                  <p style={{
                    fontSize: 13.5,
                    color: 'rgba(245,240,232,0.48)',
                    lineHeight: 1.9, marginBottom: 24,
                    flex: 1,
                  }}>
                    {item.desc}
                  </p>

                  {/* Learn more CTA */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: isHov ? 10 : 6,
                    fontSize: 12, fontWeight: 700, letterSpacing: 1.2,
                    color: isHov ? color : 'rgba(0,194,255,0.34)',
                    transition: 'color 0.3s, gap 0.3s',
                    textTransform: 'uppercase',
                  }}>
                    {isAr ? 'اعرف أكثر' : 'Learn More'}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{
                        transform: `${isAr ? 'scaleX(-1) ' : ''}${isHov ? 'translateX(4px)' : 'translateX(0)'}`,
                        transition: 'transform 0.35s ease',
                      }}>
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom color bar */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 16, right: 16,
                  height: 2, borderRadius: '0 0 2px 2px',
                  background: `linear-gradient(90deg, ${color}, ${color}44)`,
                  opacity: isHov ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }} />

                {/* Scan shimmer on hover */}
                {isHov && (
                  <div style={{
                    position: 'absolute', top: 0, left: '-100%',
                    width: '60%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.025), transparent)',
                    animation: 'svcScan 1.4s ease-in-out forwards',
                    pointerEvents: 'none', borderRadius: 20,
                  }} />
                )}
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
          <p style={{ color: 'rgba(245,240,232,0.45)', fontSize: 15, marginBottom: 28 }}>
            {isAr ? 'جاهز تبدأ؟ تواصل معنا مباشرة عبر واتساب' : 'Ready to start? Contact us directly on WhatsApp'}
          </p>
          <a
            href="https://wa.me/966535166370"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary svc-wa-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              padding: '15px 36px',
              fontWeight: 700, fontSize: 15, letterSpacing: 0.3,
              textDecoration: 'none', borderRadius: 50,
              transition: 'none',
              position: 'relative', overflow: 'hidden',
              fontFamily: isAr ? 'Cairo, sans-serif' : 'inherit',
            }}
          >
            {isAr ? 'جاهز تطور عملك بخدماتنا ؟' : 'Ready to grow your business?'}
          </a>
        </div>
      </div>

      <style>{`
        .svc-wa-btn {
          overflow: hidden !important;
          isolation: isolate;
        }
        .svc-wa-btn > span { border-radius: 999px; }

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
    </section>
  );
}
