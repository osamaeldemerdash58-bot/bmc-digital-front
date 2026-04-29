import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import { useReveal } from '../hooks/useReveal';

const techs = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#FFFFFF' },
  { name: 'Node.js', color: '#68A063' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Tailwind', color: '#38BDF8' },
  { name: 'Figma', color: '#F24E1E' },
  { name: 'Firebase', color: '#FFCA28' },
  { name: 'AWS', color: '#FF9900' },
  { name: 'React Native', color: '#61DAFB' },
];

const pageData = {
  ar: {
    badge: 'تقنياتنا',
    title: 'نعمل بـ',
    titleSpan: 'أفضل الأدوات',
    subtitle: 'نستخدم أحدث التقنيات والأدوات العالمية لبناء حلول رقمية متطورة وموثوقة',
    bgText: 'TECH',
    formTitle: 'هل تحتاج حلاً تقنياً؟',
    formSubtitle: 'أخبرنا بمشروعك وسنختار لك أفضل التقنيات المناسبة.',
  },
  en: {
    badge: 'Our Tech Stack',
    title: 'We Work With',
    titleSpan: 'The Best Tools',
    subtitle: 'We use the latest global technologies and tools to build advanced and reliable digital solutions',
    bgText: 'TECH',
    formTitle: 'Need a tech solution?',
    formSubtitle: 'Tell us about your project and we will choose the best technologies for you.',
  },
};

export default function TechPage({ lang, setLang }) {
  useReveal();
  const tx = pageData[lang] || pageData.ar;

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero */}
      <section style={{
        minHeight: '45vh',
        background: 'linear-gradient(135deg, #0A0E0D 0%, #0F1512 100%)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 110,
        paddingBottom: 64,
        position: 'relative',
        overflow: 'hidden',
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
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(184,164,114,0.1)', border: '1px solid rgba(184,164,114,0.25)',
            padding: '6px 16px', borderRadius: 20, marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--bmc-gold)', display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: 'var(--bmc-gold)', fontWeight: 600, letterSpacing: 1 }}>{tx.badge}</span>
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5vw, 68px)',
            fontWeight: 900, lineHeight: 1.1, marginBottom: 24, maxWidth: 700,
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

      {/* Tech Grid + Form */}
      <section style={{ background: 'var(--bmc-dark)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

            {/* Left: Tech Grid */}
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                background: 'rgba(184,164,114,0.08)',
              }}>
                {techs.map((tech, i) => (
                  <div
                    key={i}
                    className="reveal"
                    style={{
                      background: 'var(--bmc-dark)',
                      padding: '32px 24px',
                      textAlign: 'center',
                      transitionDelay: `${i * 0.05}s`,
                      cursor: 'default',
                      transition: 'background 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bmc-dark-3)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bmc-dark)'}
                  >
                    <div style={{
                      width: 48,
                      height: 48,
                      margin: '0 auto 16px',
                      borderRadius: '50%',
                      background: `${tech.color}15`,
                      border: `1px solid ${tech.color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      fontWeight: 900,
                      color: tech.color,
                      fontFamily: 'Playfair Display, serif',
                    }}>
                      {tech.name[0]}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(245,240,232,0.7)' }}>
                      {tech.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Form */}
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
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
          section:nth-of-type(2) .container > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </>
  );
}
