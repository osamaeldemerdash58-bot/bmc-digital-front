import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import { useReveal } from '../hooks/useReveal';
import { useData } from '../DataContext';
import servicesBgImage from '../assets/ChatGPT Image May 8, 2026, 06_46_13 PM.png';

const serviceAccents = {
  'web-development': '#4A90D9',
  'e-commerce-website-development': '#27AE60',
  'mobile-app-development': '#E74C3C',
  'erp-systems': '#8E44AD',
  'ui-ux-design': '#F39C12',
  'ai-solutions': '#16A085',
  'tech-consulting': '#2C3E50',
};

/* ── 3D tilt card hook ── */
function useTilt(strength = 10) {
  const ref = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(8px)`;
        el.style.transition = 'transform 0.08s linear';
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frameRef.current);
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
      el.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, [strength]);

  return ref;
}

function DetailCard3D({ children, accent, delay = 0, isBenefit = false }) {
  const tiltRef = useTilt(8);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={tiltRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="detail-card"
      style={{
        background: hovered
          ? `linear-gradient(145deg, rgba(20,29,41,0.98) 0%, rgba(16,23,34,1) 100%)`
          : `linear-gradient(145deg, rgba(16,23,34,0.95) 0%, rgba(11,15,21,1) 100%)`,
        border: `1px solid ${hovered ? accent + '66' : 'rgba(184,164,114,0.14)'}`,
        borderRadius: 16,
        padding: '26px 22px',
        boxShadow: hovered
          ? `0 28px 56px rgba(0,0,0,0.45), 0 0 0 1px ${accent}33, inset 0 1px 0 rgba(255,255,255,0.05)`
          : '0 12px 30px rgba(0,0,0,0.24)',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.4s',
        animationDelay: `${delay}s`,
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner accent glow */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: 120, height: 120,
        background: `radial-gradient(circle at top right, ${accent}${hovered ? '1e' : '08'} 0%, transparent 70%)`,
        transition: 'background 0.4s',
        pointerEvents: 'none',
      }} />
      {/* Bottom glow line */}
      <div style={{
        position: 'absolute', bottom: 0, left: hovered ? 0 : '50%', right: hovered ? 0 : '50%',
        height: 2,
        background: `linear-gradient(90deg, transparent, ${accent}bb, transparent)`,
        transition: 'left 0.5s cubic-bezier(0.23,1,0.32,1), right 0.5s cubic-bezier(0.23,1,0.32,1)',
        borderRadius: 2,
      }} />
      {children({ hovered, accent })}
    </div>
  );
}

export default function ServiceDetailPage({ lang, setLang }) {
  useReveal();
  const { slug } = useParams();
  const { data } = useData();
  const service = data?.services?.find(s => s.slug === slug);

  const sanitizeServiceText = (text) => String(text || '')
    .replace(/استشارات تقنية متخصصة/g, 'استشارات تقنية')
    .replace(/تقنية متخصصة/g, 'تقنية');

  if (!service) {
    return (
      <>
        <Navbar lang={lang} setLang={setLang} />
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'var(--bmc-white)', fontSize: 48, fontFamily: 'Playfair Display, serif' }}>404</h1>
            <p style={{ color: 'rgba(245,240,232,0.5)', marginBottom: 24 }}>
              {lang === 'ar' ? 'الخدمة غير موجودة' : 'Service not found'}
            </p>
            <Link to="/services" className="snake-btn" style={{ color: 'var(--bmc-gold)', textDecoration: 'none', border: '1px solid rgba(184,164,114,0.3)', padding: '10px 24px', fontSize: 13, fontWeight: 700, position: 'relative', overflow: 'hidden' }}>
              <span className="snake-light" />
              {lang === 'ar' ? '← العودة للخدمات' : '← Back to Services'}
            </Link>
          </div>
        </div>
        <Footer lang={lang} />
        <WhatsAppFloat lang={lang} />
      </>
    );
  }

  const isAr = lang === 'ar';
  const title = sanitizeServiceText(isAr ? service.titleAr : service.titleEn);
  const detailTitle = sanitizeServiceText(isAr ? service.detailTitleAr : service.detailTitleEn);
  const detailTitleSpan = sanitizeServiceText(isAr ? service.detailTitleSpanAr : service.detailTitleSpanEn);
  const detailDesc = sanitizeServiceText(isAr ? service.detailDescAr : service.detailDescEn);
  const features = (isAr ? service.featuresAr : service.featuresEn)?.map(sanitizeServiceText);
  const benefits = (isAr ? service.benefitsAr : service.benefitsEn)?.map((b) => ({
    ...b,
    title: sanitizeServiceText(b?.title),
    desc: sanitizeServiceText(b?.desc),
  }));
  const accent = serviceAccents[service.slug] || 'var(--bmc-gold)';
  const tickerFeatures = Array.from({ length: 4 }, () => features || []).flat();
  const heroTitleMain = detailTitle || title;
  const heroTitleSpan = detailTitleSpan || '';

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero with 3D depth layers */}
      <section style={{
        minHeight: '52vh',
        backgroundImage: `linear-gradient(135deg, rgba(8,11,16,0.93) 0%, rgba(16,23,34,0.94) 100%), url(${service.cardImage || servicesBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 110,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Depth layer orbs */}
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)`, top: '10%', left: '-8%', animation: 'orbFloat1 10s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, ${accent}06 0%, transparent 70%)`, bottom: '-5%', right: '5%', animation: 'orbFloat2 13s ease-in-out infinite 1.5s', pointerEvents: 'none' }} />

        {/* Animated mesh */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${accent}06 1px, transparent 1px), linear-gradient(90deg, ${accent}06 1px, transparent 1px)`,
          backgroundSize: '55px 55px',
          animation: 'gridPulse 9s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Breadcrumb */}
          <div className="hero-breadcrumb" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(245,240,232,0.55)', fontSize: 12.5, marginBottom: 20 }}>
            <Link to="/" style={{ color: 'rgba(245,240,232,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}>
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span style={{ color: 'rgba(184,164,114,0.3)' }}>/</span>
            <Link to="/services" style={{ color: 'rgba(245,240,232,0.45)', textDecoration: 'none' }}>
              {isAr ? 'الخدمات' : 'Services'}
            </Link>
            <span style={{ color: 'rgba(184,164,114,0.3)' }}>/</span>
            <span style={{ color: 'var(--bmc-gold)', fontWeight: 700 }}>{title}</span>
          </div>

          <h1 className="hero-title-detail" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5.5vw, 70px)',
            fontWeight: 900,
            marginBottom: 22,
            lineHeight: 1.28,
            paddingBottom: 6,
            textWrap: 'balance',
          }}>
            <span style={{ color: 'var(--bmc-white)' }}>{heroTitleMain} </span>
            {heroTitleSpan && (
              <span style={{
                background: 'linear-gradient(135deg, #D4C48F 0%, #B8A472 40%, #E8D5A3 70%, #B8A472 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                backgroundSize: '200% auto',
                animation: 'shimmer 4s linear infinite',
                display: 'inline-block',
              }}>{heroTitleSpan}</span>
            )}
          </h1>
        </div>
      </section>

      {/* Animated features ticker */}
      <section style={{ background: 'var(--bmc-dark-2)', borderTop: `1px solid ${accent}33`, borderBottom: `1px solid ${accent}33`, overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'featureTicker 22s linear infinite' }}>
          {tickerFeatures.map((item, i) => (
            <div key={`${item}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 22px', fontSize: 12.5, whiteSpace: 'nowrap', color: 'rgba(245,240,232,0.75)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 6px ${accent}88`, flexShrink: 0 }} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Description block with 3D lift */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '40px 0 10px' }}>
        <div className="container">
          <div className="desc-block" style={{
            background: `linear-gradient(145deg, rgba(16,23,34,0.9), rgba(11,15,21,0.95))`,
            border: `1px solid rgba(184,164,114,0.14)`,
            borderRadius: 16,
            padding: '24px 26px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.28)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: `linear-gradient(180deg, ${accent}, ${accent}44)`, borderRadius: '4px 0 0 4px' }} />
            <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.65)', lineHeight: 2, margin: 0 }}>
              {detailDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 3D Content Grid */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '80px 0 100px' }}>
        <div className="container">
          <div className="service-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {features?.map((f, i) => (
              <DetailCard3D key={`f-${i}`} accent={accent} delay={i * 0.07}>
                {({ hovered }) => (
                  <>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
                      transform: hovered ? 'translateZ(14px)' : 'translateZ(0)',
                      transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1)',
                    }}>
                      <span style={{
                        color: accent,
                        fontSize: 16,
                        fontWeight: 900,
                        textShadow: `0 0 8px ${accent}88`,
                        flexShrink: 0,
                      }}>✓</span>
                      <span style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--bmc-white)' }}>{f}</span>
                    </div>
                    <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.52)', lineHeight: 1.85, margin: 0 }}>
                      {isAr ? 'تنفيذ احترافي متوافق مع أهداف مشروعك.' : 'Professional execution aligned with your project goals.'}
                    </p>
                  </>
                )}
              </DetailCard3D>
            ))}

            {(benefits || []).map((b, i) => (
              <DetailCard3D key={`b-${i}`} accent={accent} delay={(features?.length || 0) * 0.07 + i * 0.07} isBenefit>
                {({ hovered }) => (
                  <>
                    <h3 style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: accent,
                      marginBottom: 12,
                      textShadow: hovered ? `0 0 16px ${accent}44` : 'none',
                      transform: hovered ? 'translateZ(16px)' : 'translateZ(0)',
                      transition: 'transform 0.35s cubic-bezier(0.23,1,0.32,1), text-shadow 0.3s',
                    }}>
                      {b.title}
                    </h3>
                    <p style={{ fontSize: 13.5, color: 'rgba(245,240,232,0.58)', lineHeight: 1.85, margin: 0 }}>
                      {b.desc}
                    </p>
                  </>
                )}
              </DetailCard3D>
            ))}
          </div>
        </div>
      </section>

      {/* Service Request Form */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(184,164,114,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <ServiceRequestPopup
              lang={lang}
              title={isAr ? `هل تريد ${title}؟` : `Need ${title}?`}
              subtitle={isAr ? 'أخبرنا بما تحتاجه وسنتواصل معك في أقرب وقت.' : "Tell us what you need and we'll get back to you shortly."}
            />
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <WhatsAppFloat lang={lang} />

      <style>{`
        @keyframes featureTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.04); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(18px) scale(0.96); }
        }
        @keyframes cardEntry {
          from { opacity: 0; transform: perspective(900px) rotateX(20deg) translateY(36px); }
          to   { opacity: 1; transform: perspective(900px) rotateX(0deg) translateY(0); }
        }
        .hero-breadcrumb { animation: cardEntry 0.7s cubic-bezier(0.23,1,0.32,1) both; }
        .hero-title-detail { animation: cardEntry 0.8s cubic-bezier(0.23,1,0.32,1) 0.14s both; }
        .desc-block { animation: cardEntry 0.8s cubic-bezier(0.23,1,0.32,1) 0.1s both; }
        .detail-card { animation: cardEntry 0.75s cubic-bezier(0.23,1,0.32,1) both; }

        @media (max-width: 1080px) {
          .service-detail-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .container { padding: 0 18px; }
          section h1 { line-height: 1.38 !important; }
          .service-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
