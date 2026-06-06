import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import { useReveal } from '../hooks/useReveal';
import worksHeroImg from '../assets/heroimagedesktop.png';

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
      
      {/* Hero Section - Professional 3D Animated Background */}
      <section className="page-hero page-hero-works" style={{
        minHeight: '55vh',
        background: 'linear-gradient(180deg, #07121c 0%, #0b1a2a 48%, #080d15 100%)',
        display: 'flex', alignItems: 'center', paddingTop: 120, paddingBottom: 100,
        position: 'relative', overflow: 'hidden',
      }}>
        <div
          className="works-hero-image"
          style={{
            position: 'absolute',
            top: '12%',
            bottom: '8%',
            right: lang === 'ar' ? 'auto' : '5%',
            left: lang === 'ar' ? '5%' : 'auto',
            width: 'min(42vw, 520px)',
            borderRadius: 22,
            overflow: 'hidden',
            opacity: 0.24,
            border: '1px solid rgba(0,194,255,0.22)',
            boxShadow: '0 28px 70px rgba(0,0,0,0.42), 0 0 42px rgba(0,194,255,0.18)',
            transform: 'rotate(-3deg)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <img
            src={worksHeroImg}
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, rgba(7,18,28,0.92) 0%, rgba(7,18,28,0.45) 45%, rgba(0,194,255,0.12) 100%)',
            }}
          />
        </div>
        {/* 1. Ambient Glow */}
        <div className="ambient-glow ambient-glow-works" />
        {/* 2. Floating 3D Rings */}
        <div className="floating-shape shape-1 works-shape-1" />
        <div className="floating-shape shape-2 works-shape-2" />
        <div className="floating-shape shape-3 works-shape-3" />
        <svg
          className="works-hero-svg"
          viewBox="0 0 540 360"
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: lang === 'ar' ? 'auto' : '3%',
            left: lang === 'ar' ? '3%' : 'auto',
            top: '13%',
            width: 'min(42vw, 520px)',
            opacity: 0.5,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <defs>
            <linearGradient id="worksSvgStroke" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#00C2FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#6C63FF" stopOpacity="0.16" />
            </linearGradient>
          </defs>
          <g className="works-board works-board-a">
            <rect x="54" y="70" width="154" height="104" rx="14" fill="rgba(0,194,255,0.08)" stroke="url(#worksSvgStroke)" strokeWidth="2" />
            <path d="M80 104 H174 M80 128 H142" stroke="#00C2FF" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g className="works-board works-board-b">
            <rect x="236" y="122" width="190" height="126" rx="16" fill="rgba(0,194,255,0.07)" stroke="#00C2FF" strokeOpacity="0.35" strokeWidth="2" />
            <path d="M268 164 H390 M268 192 H348 M268 218 H374" stroke="#00C2FF" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g className="works-board works-board-c">
            <rect x="134" y="226" width="132" height="78" rx="14" fill="rgba(0,194,255,0.06)" stroke="#00C2FF" strokeOpacity="0.26" strokeWidth="2" />
            <path d="M160 260 H238 M160 280 H210" stroke="#00C2FF" strokeOpacity="0.36" strokeWidth="2" strokeLinecap="round" />
          </g>
          <path className="works-connector" d="M208 122 C264 72 324 88 372 122" fill="none" stroke="#00C2FF" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="8 10" />
          <path className="works-connector works-connector--two" d="M250 248 C214 272 190 254 164 226" fill="none" stroke="#00C2FF" strokeOpacity="0.34" strokeWidth="2" strokeDasharray="7 9" />
          <circle className="works-spark works-spark-a" cx="424" cy="92" r="7" fill="#00C2FF" />
          <circle className="works-spark works-spark-b" cx="96" cy="222" r="5" fill="#00C2FF" />
        </svg>
        {/* 3. Moving 3D Grid Floor */}
        <div className="grid-floor" />

        {/* Large subtle background text */}
        <div style={{
          position: 'absolute', bottom: -20,
          left: lang === 'ar' ? 'auto' : 0, right: lang === 'ar' ? 0 : 'auto',
          fontFamily: 'Playfair Display, serif', fontSize: 'clamp(60px, 12vw, 160px)', fontWeight: 900,
          color: 'transparent', WebkitTextStroke: '1px rgba(0,194,255,0.06)',
          letterSpacing: 12, userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 0,
        }}>
          {tx.bgText}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(245,240,232,0.6)', fontSize: 13, marginBottom: 18 }}>
            <Link to="/" style={{ color: 'rgba(245,240,232,0.5)', textDecoration: 'none' }}>{lang === 'ar' ? 'الرئيسية' : 'Home'}</Link>
            <span style={{ color: 'rgba(0,194,255,0.35)' }}>/</span>
            <span style={{ color: '#00C2FF', fontWeight: 700 }}>{lang === 'ar' ? 'أعمالنا' : 'Works'}</span>
          </div>
          
          <h1 style={{
            fontFamily: 'Playfair Display, serif', fontSize: 'clamp(36px, 5vw, 68px)', fontWeight: 900,
            lineHeight: 1.34, marginBottom: 24, maxWidth: 700, paddingBottom: 6, textWrap: 'balance',
          }}>
            <span style={{ color: 'var(--bmc-white)', display: 'block' }}>{tx.title}</span>
            <span style={{ color: 'var(--neon-blue)', fontStyle: 'normal' }}>{tx.titleSpan}</span>
          </h1>

          <p style={{ fontSize: 17, color: 'rgba(245,240,232,0.6)', maxWidth: 600, lineHeight: 1.9 }}>{tx.subtitle}</p>
        </div>
      </section>

      {/* Works Grid */}
      <section style={{ background: 'var(--bmc-dark-3)', padding: '80px 0' }}>
        <div className="container">
          <div className="works-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {items.map((item, i) => (
              <div key={i} className="reveal" style={{
                background: hovered === i ? colors[i] : 'var(--bmc-dark-3)', padding: '44px 32px', position: 'relative',
                overflow: 'hidden', cursor: 'pointer', transitionDelay: `${i * 0.1}s`,
                transition: 'background 0.5s ease, transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                borderRadius: 14, border: '1px solid rgba(0,194,255,0.14)', boxShadow: '0 14px 34px rgba(0,0,0,0.22)',
              }}
              onMouseEnter={(e) => {
                setHovered(i);
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(0,194,255,0.34)';
                e.currentTarget.style.boxShadow = '0 20px 42px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                setHovered(null);
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(0,194,255,0.14)';
                e.currentTarget.style.boxShadow = '0 14px 34px rgba(0,0,0,0.22)';
              }}>
                <div style={{
                  fontFamily: 'Playfair Display, serif', fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 900,
                  color: hovered === i ? 'rgba(0,194,255,0.15)' : 'rgba(0,194,255,0.06)', lineHeight: 1, marginBottom: -16, transition: 'color 0.4s',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <h3 style={{ fontSize: 20, fontWeight: 700, color: hovered === i ? 'var(--bmc-white)' : 'rgba(245,240,232,0.85)', marginBottom: 10, lineHeight: 1.3, transition: 'color 0.3s' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: 12, color: '#00C2FF', fontWeight: 600, letterSpacing: 1, marginBottom: 16 }}>{item.category}</p>

                <div style={{
                  display: 'inline-block', padding: '5px 12px', background: 'rgba(0,194,255,0.08)', border: '1px solid rgba(0,194,255,0.15)',
                  fontSize: 11, color: 'rgba(245,240,232,0.5)', letterSpacing: 0.5, borderRadius: 50,
                }}>
                  {item.tag}
                </div>

                <div style={{
                  position: 'absolute', bottom: 24, right: lang === 'ar' ? 'auto' : 24, left: lang === 'ar' ? 24 : 'auto',
                  opacity: hovered === i ? 1 : 0, transform: hovered === i ? 'translate(0, 0)' : 'translate(8px, 8px)',
                  transition: 'all 0.3s', color: '#00C2FF',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                <div style={{
                  position: 'absolute', bottom: 0, left: 0, width: hovered === i ? '100%' : 0, height: 2,
                  background: '#00C2FF', transition: 'width 0.4s ease',
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
              <ServiceRequestPopup lang={lang} title={tx.formTitle} subtitle={tx.formSubtitle} />
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <WhatsAppFloat lang={lang} />

      <style>{`
        @keyframes gridMove {
          0% { transform: rotateX(60deg) translateY(0); }
          100% { transform: rotateX(60deg) translateY(60px); }
        }
        @keyframes float3D {
          0%, 100% { transform: rotateX(45deg) rotateY(45deg) translateZ(0px) translateY(0px); }
          25% { transform: rotateX(50deg) rotateY(50deg) translateZ(20px) translateY(-15px); }
          50% { transform: rotateX(40deg) rotateY(40deg) translateZ(-10px) translateY(-30px); }
          75% { transform: rotateX(55deg) rotateY(35deg) translateZ(10px) translateY(-15px); }
        }
        @keyframes pulseGlow {
          0% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }
        .ambient-glow {
          position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 80vw; height: 80vh;
          background: radial-gradient(circle, rgba(0, 194, 255, 0.08) 0%, transparent 60%);
          animation: pulseGlow 6s ease-in-out infinite alternate; pointer-events: none;
        }
        .floating-shape {
          position: absolute; border-radius: 50%; pointer-events: none;
          animation: float3D 8s ease-in-out infinite;
        }
        .shape-1 {
          width: 300px; height: 300px; top: 10%; right: 10%;
          border: 1px solid rgba(0, 194, 255, 0.15);
          box-shadow: 0 0 40px rgba(0, 194, 255, 0.1), inset 0 0 40px rgba(0, 194, 255, 0.05);
        }
        .shape-2 {
          width: 200px; height: 200px; bottom: 20%; left: 10%;
          border: 1px solid rgba(108, 99, 255, 0.15);
          box-shadow: 0 0 40px rgba(108, 99, 255, 0.1), inset 0 0 40px rgba(108, 99, 255, 0.05);
          animation-delay: -2s; animation-duration: 10s;
        }
        .shape-3 {
          width: 150px; height: 150px; top: 40%; left: 50%;
          border: 1px solid rgba(184, 164, 114, 0.15);
          box-shadow: 0 0 40px rgba(184, 164, 114, 0.1), inset 0 0 40px rgba(184, 164, 114, 0.05);
          animation-delay: -4s; animation-duration: 12s;
        }
        .grid-floor {
          position: absolute; bottom: -50%; left: -50%; width: 200%; height: 100%;
          background-image: linear-gradient(rgba(0, 194, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 194, 255, 0.1) 1px, transparent 1px);
          background-size: 60px 60px;
          transform: rotateX(60deg);
          animation: gridMove 4s linear infinite;
          mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
          -webkit-mask-image: linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%);
          pointer-events: none;
        }
        @media (max-width: 900px) { .works-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) {
          .works-grid { grid-template-columns: 1fr !important; }
          section h1 { line-height: 1.4 !important; padding-bottom: 10px !important; }
        }
      `}</style>
    </>
  );
}
