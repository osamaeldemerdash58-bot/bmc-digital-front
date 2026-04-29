import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import { useReveal } from '../hooks/useReveal';
import { useData } from '../DataContext';

export default function ServiceDetailPage({ lang, setLang }) {
  useReveal();
  const { slug } = useParams();
  const { data } = useData();
  const service = data?.services?.find(s => s.slug === slug);

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
            <Link to="/services" style={{ color: 'var(--bmc-gold)', textDecoration: 'none', border: '1px solid rgba(184,164,114,0.3)', padding: '10px 24px', fontSize: 13, fontWeight: 700 }}>
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
  const title = isAr ? service.titleAr : service.titleEn;
  const detailTitle = isAr ? service.detailTitleAr : service.detailTitleEn;
  const detailTitleSpan = isAr ? service.detailTitleSpanAr : service.detailTitleSpanEn;
  const detailDesc = isAr ? service.detailDescAr : service.detailDescEn;
  const features = isAr ? service.featuresAr : service.featuresEn;
  const benefits = isAr ? service.benefitsAr : service.benefitsEn;

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
          <div style={{ fontSize: 56, marginBottom: 20 }}>{service.icon}</div>
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
                border: '1px solid rgba(184,164,114,0.08)',
                padding: 24,
                transitionDelay: `${i * 0.1}s`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ color: 'var(--bmc-gold)', fontSize: 18 }}>✓</span>
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
                  border: '1px solid rgba(184,164,114,0.1)',
                  padding: 32,
                  transitionDelay: `${i * 0.1}s`,
                }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--bmc-gold)', marginBottom: 12 }}>
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
        @media (max-width: 768px) {
          .container { padding: 0 20px; }
        }
      `}</style>
    </>
  );
}
