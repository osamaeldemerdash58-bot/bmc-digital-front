import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import { useReveal } from '../hooks/useReveal';
import servicesBgImage from '../assets/ChatGPT Image May 8, 2026, 06_46_13 PM.png';

const colors = [
  'linear-gradient(135deg, #1a2220 0%, #0f1512 100%)',
  'linear-gradient(135deg, #1a1a14 0%, #0f0f0a 100%)',
  'linear-gradient(135deg, #141a1a 0%, #0a0f0f 100%)',
  'linear-gradient(135deg, #1a1520 0%, #0f0a15 100%)',
  'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
  'linear-gradient(135deg, #141a14 0%, #0a0f0a 100%)',
];

const pageData = {
  ar: {
    badge: 'أعمالنا',
    title: 'مشاريع',
    titleSpan: 'نفخر بها',
    subtitle: 'نماذج من أعمالنا التي نفذناها لعملائنا بأعلى معايير الجودة والاحترافية',
    bgText: 'WORKS',
    formTitle: 'هل لديك مشروع مشابه؟',
    formSubtitle: 'تواصل معنا وسنساعدك في تحقيق فكرتك بأعلى جودة.',
  },
  en: {
    badge: 'Our Work',
    title: 'Projects We',
    titleSpan: 'Are Proud Of',
    subtitle: 'Samples of our work delivered to clients with the highest quality and professionalism standards',
    bgText: 'WORKS',
    formTitle: 'Have a similar project?',
    formSubtitle: 'Contact us and we will help you bring your idea to life with the highest quality.',
  },
};

export default function WorksPage({ lang, setLang }) {
  useReveal();
  const tx = pageData[lang] || pageData.ar;

  const worksItems = {
    ar: [
      { title: 'منصة تجارة إلكترونية', category: 'متجر إلكتروني', tag: 'React · Node.js · MongoDB' },
      { title: 'نظام ERP متكامل', category: 'برمجيات مؤسسية', tag: 'React · PostgreSQL · Docker' },
      { title: 'تطبيق توصيل', category: 'تطبيق جوال', tag: 'React Native · Firebase' },
      { title: 'موقع شركة مقاولات', category: 'موقع مؤسسي', tag: 'React · Vite · Tailwind' },
      { title: 'لوحة تحكم تحليلية', category: 'داشبورد', tag: 'React · D3.js · REST API' },
      { title: 'منصة حجز خدمات', category: 'SaaS', tag: 'Next.js · Prisma · Stripe' },
    ],
    en: [
      { title: 'E-Commerce Platform', category: 'Online Store', tag: 'React · Node.js · MongoDB' },
      { title: 'Integrated ERP System', category: 'Enterprise Software', tag: 'React · PostgreSQL · Docker' },
      { title: 'Delivery App', category: 'Mobile App', tag: 'React Native · Firebase' },
      { title: 'Contracting Website', category: 'Corporate Site', tag: 'React · Vite · Tailwind' },
      { title: 'Analytics Dashboard', category: 'Dashboard', tag: 'React · D3.js · REST API' },
      { title: 'Service Booking Platform', category: 'SaaS', tag: 'Next.js · Prisma · Stripe' },
    ],
  };

  const items = worksItems[lang] || worksItems.ar;
  const [hovered, setHovered] = useState(null);

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero */}
      <section style={{
        minHeight: '48vh',
        backgroundImage: `linear-gradient(135deg, rgba(10,14,13,0.9) 0%, rgba(15,21,18,0.92) 100%), url(${servicesBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 110,
        paddingBottom: 90,
        position: 'relative',
        overflow: 'visible',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(184,164,114,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -20,
          left: lang === 'ar' ? 'auto' : 0,
          right: lang === 'ar' ? 0 : 'auto',
          fontFamily: 'Playfair Display, serif',
          fontSize: 'clamp(60px, 12vw, 160px)',
          fontWeight: 900,
          color: 'rgba(184,164,114,0.025)',
          letterSpacing: 12,
          userSelect: 'none', pointerEvents: 'none',
          whiteSpace: 'nowrap', zIndex: 0,
        }}>
          {tx.bgText}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: 'rgba(245,240,232,0.6)',
            fontSize: 13,
            marginBottom: 18,
          }}>
            <Link to="/" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <span style={{ color: 'rgba(184,164,114,0.35)' }}>/</span>
            <span style={{ color: 'var(--bmc-gold)', fontWeight: 700 }}>{lang === 'ar' ? 'أعمالنا' : 'Works'}</span>
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5vw, 68px)',
            fontWeight: 900, lineHeight: 1.34, marginBottom: 24, maxWidth: 700, paddingBottom: 6, textWrap: 'balance',
          }}>
            <span style={{ color: 'var(--bmc-white)', display: 'block' }}>{tx.title}</span>
            <span style={{
              background: 'linear-gradient(135deg, #D4C48F, #B8A472)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontStyle: 'normal',
            }}>{tx.titleSpan}</span>
          </h1>

          <p style={{ fontSize: 17, color: 'rgba(245,240,232,0.6)', maxWidth: 600, lineHeight: 1.9 }}>
            {tx.subtitle}
          </p>
        </div>
      </section>

      {/* Works Grid */}
      <section style={{ background: 'var(--bmc-dark-3)', padding: '80px 0' }}>
        <div className="container">
          <div className="works-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 18,
          }}>
            {items.map((item, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: hovered === i ? colors[i] : 'var(--bmc-dark-3)',
                  padding: '44px 32px',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transitionDelay: `${i * 0.1}s`,
                  transition: 'background 0.5s ease, transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                  borderRadius: 14,
                  border: '1px solid rgba(184,164,114,0.14)',
                  boxShadow: '0 14px 34px rgba(0,0,0,0.22)',
                }}
                onMouseEnter={(e) => {
                  setHovered(i);
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = 'rgba(184,164,114,0.34)';
                  e.currentTarget.style.boxShadow = '0 20px 42px rgba(0,0,0,0.3)';
                }}
                onMouseLeave={(e) => {
                  setHovered(null);
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(184,164,114,0.14)';
                  e.currentTarget.style.boxShadow = '0 14px 34px rgba(0,0,0,0.22)';
                }}
              >
                <div style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(48px, 8vw, 80px)',
                  fontWeight: 900,
                  color: hovered === i ? 'rgba(184,164,114,0.15)' : 'rgba(184,164,114,0.06)',
                  lineHeight: 1,
                  marginBottom: -16,
                  transition: 'color 0.4s',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: hovered === i ? 'var(--bmc-white)' : 'rgba(245,240,232,0.85)',
                  marginBottom: 10,
                  lineHeight: 1.3,
                  transition: 'color 0.3s',
                }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: 12, color: 'var(--bmc-gold)', fontWeight: 600, letterSpacing: 1, marginBottom: 16 }}>
                  {item.category}
                </p>

                <div style={{
                  display: 'inline-block',
                  padding: '5px 12px',
                  background: 'rgba(184,164,114,0.08)',
                  border: '1px solid rgba(184,164,114,0.15)',
                  fontSize: 11,
                  color: 'rgba(245,240,232,0.5)',
                  letterSpacing: 0.5,
                  borderRadius: 2,
                }}>
                  {item.tag}
                </div>

                <div style={{
                  position: 'absolute',
                  bottom: 24,
                  right: lang === 'ar' ? 'auto' : 24,
                  left: lang === 'ar' ? 24 : 'auto',
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? 'translate(0, 0)' : 'translate(8px, 8px)',
                  transition: 'all 0.3s',
                  color: 'var(--bmc-gold)',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                <div style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: hovered === i ? '100%' : 0,
                  height: 2,
                  background: 'var(--bmc-gold)',
                  transition: 'width 0.4s ease',
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div className="reveal">
              <ServiceRequestPopup
                lang={lang}
                title={tx.formTitle}
                subtitle={tx.formSubtitle}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <WhatsAppFloat lang={lang} />

      <style>{`
        @media (max-width: 900px) {
          .works-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .works-grid { grid-template-columns: 1fr !important; }
          section h1 {
            line-height: 1.4 !important;
            padding-bottom: 10px !important;
          }
        }
      `}</style>
    </>
  );
}
