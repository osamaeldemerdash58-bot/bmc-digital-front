import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import { useReveal } from '../hooks/useReveal';
import { useData } from '../DataContext';

const serviceAccents = {
  'web-development': '#4A90D9',
  'e-commerce-website-development': '#27AE60',
  'mobile-app-development': '#E74C3C',
  'erp-systems': '#8E44AD',
  'ui-ux-design': '#F39C12',
  'ai-solutions': '#16A085',
  'tech-consulting': '#2C3E50',
};

function renderServiceIcon(slug, color = '#B8A472') {
  const props = { viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (slug === 'web-development') return <svg {...props}><path d="M3 4h18v12H3z" /><path d="M8 20h8M12 16v4M7 9h4M7 12h7" /></svg>;
  if (slug === 'e-commerce-website-development') return <svg {...props}><path d="M4 7h16v12H4z" /><path d="M9 7V5a3 3 0 0 1 6 0v2M4 11h16" /></svg>;
  if (slug === 'mobile-app-development') return <svg {...props}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M10 6h4M12 18h.01M9 11l2 2 4-4" /></svg>;
  if (slug === 'erp-systems') return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 17h7M17 14v7" /></svg>;
  if (slug === 'ui-ux-design') return <svg {...props}><path d="M4 20l5.5-1.2L20 8.3 15.7 4 5.2 14.5z" /><path d="M13.5 6.2l4.3 4.3M4 20h6" /></svg>;
  if (slug === 'ai-solutions') return <svg {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></svg>;
  return <svg {...props}><path d="M4 5h16v10H7l-3 3z" /><path d="M8 9h8M8 12h5" /></svg>;
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
  const tickerFeatures = [...(features || []), ...(features || [])];

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero */}
      <section style={{
        minHeight: '40vh',
        background: 'linear-gradient(135deg, #0A0E0D 0%, #0F1512 100%)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 100,
        paddingBottom: 60,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(184,164,114,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{
            width: 84,
            height: 84,
            borderRadius: 18,
            border: `1px solid ${accent}88`,
            background: `${accent}22`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}>
            <div style={{ width: 42, height: 42 }}>
              {renderServiceIcon(service.slug, accent)}
            </div>
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 900, marginBottom: 20, lineHeight: 1.2,
          }}>
            <span style={{ color: 'var(--bmc-white)' }}>{detailTitle} </span>
            <span style={{
              background: 'linear-gradient(135deg, #D4C48F, #B8A472)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontStyle: 'normal',
            }}>{detailTitleSpan}</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(245,240,232,0.55)', maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            {detailDesc}
          </p>
          <p style={{ fontSize: 16, color: 'rgba(143,147,165,0.8)', marginTop: 12 }}>
            املأ النموذج وسيتواصل معك فريقنا خلال دقائق
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--bmc-dark-2)', borderTop: `1px solid ${accent}44`, borderBottom: `1px solid ${accent}44`, overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'featureTicker 24s linear infinite' }}>
          {tickerFeatures.map((item, i) => (
            <div key={`${item}-${i}`} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 22px',
              fontSize: 13,
              whiteSpace: 'nowrap',
              color: 'rgba(245,240,232,0.78)',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent }} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '80px 0' }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 900,
            color: 'var(--bmc-white)', marginBottom: 48, textAlign: 'center',
          }}>
            {isAr ? 'ما نقدمه لك' : 'What We Offer'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {features?.map((f, i) => (
              <div key={i} className="reveal" style={{
                background: 'var(--bmc-dark-3)',
                border: `1px solid ${accent}33`,
                padding: 24,
                transitionDelay: `${i * 0.1}s`,
                transition: 'transform 0.3s, border-color 0.3s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ color: accent, fontSize: 18 }}>✓</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--bmc-white)' }}>{f}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      {benefits && benefits.length > 0 && (
        <section style={{ background: 'var(--bmc-dark)', padding: '80px 0' }}>
          <div className="container">
            <h2 style={{
              fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 900,
              color: 'var(--bmc-white)', marginBottom: 48, textAlign: 'center',
            }}>
              {isAr ? 'لماذا تختارنا؟' : 'Why Choose Us?'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              {benefits.map((b, i) => (
                <div key={i} className="reveal" style={{
                  background: 'var(--bmc-dark-2)',
                  border: `1px solid ${accent}2E`,
                  padding: 32,
                  transitionDelay: `${i * 0.1}s`,
                }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: accent, marginBottom: 12 }}>
                    {b.title}
                  </h3>
                  <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.6)', lineHeight: 1.8 }}>
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service Request Form */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 800, height: 800,
          background: 'radial-gradient(circle, rgba(184,164,114,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
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
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          .container { padding: 0 20px; }
        }
      `}</style>
    </>
  );
}
