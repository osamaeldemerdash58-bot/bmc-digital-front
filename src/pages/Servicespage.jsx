import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import SnakeButton from '../components/SnakeButton';
import { useReveal } from '../hooks/useReveal';
import { useData } from '../DataContext';
import { overrideServiceCard } from '../data/digitalMarketingService';
import servicesBgImage from '../assets/ChatGPT Image May 8, 2026, 06_46_13 PM.png';

const servicesData = {
  ar: {
    badge: 'خدماتنا',
    title: 'حلول رقمية',
    titleSpan: 'متكاملة',
    subtitle: 'نقدم مجموعة شاملة من الخدمات الرقمية لمساعدة عملك على النمو والتميز في عالم الإنترنت',
    learnMore: 'اعرف أكثر',
    requestService: 'اطلب الخدمة',
    formTitle: 'هل تحتاج خدمة مخصصة؟',
    formSubtitle: 'أخبرنا بما تحتاجه وسنتواصل معك في أقرب وقت لمناقشة تفاصيل مشروعك.',
    services: [
      { slug: 'web-development', title: 'تطوير المواقع الإلكترونية', desc: 'نبني مواقع احترافية عالية الأداء تعكس هوية علامتك التجارية وتحقق أهدافك التجارية.', features: ['تصميم متجاوب مع كل الأجهزة', 'سرعة تحميل فائقة', 'تحسين محركات البحث SEO', 'لوحة إدارة سهلة الاستخدام'], icon: '🌐' },
      { slug: 'e-commerce-website-development', title: 'تطوير المتاجر الإلكترونية', desc: 'متاجر إلكترونية متكاملة مع بوابات دفع آمنة وتجربة تسوق استثنائية تزيد مبيعاتك.', features: ['بوابات دفع متعددة', 'إدارة المخزون', 'تقارير المبيعات', 'تجربة مستخدم محسّنة'], icon: '🛒' },
      { slug: 'mobile-app-development', title: 'تطوير التطبيقات', desc: 'تطبيقات جوال احترافية لنظامي iOS و Android تمنح مستخدميك تجربة استثنائية.', features: ['iOS و Android', 'أداء عالي', 'واجهة مستخدم جذابة', 'تكامل مع الخدمات الخارجية'], icon: '📱' },
      { slug: 'erp-systems', title: 'أنظمة ERP', desc: 'أنظمة تخطيط موارد المؤسسة المخصصة لإدارة العمليات والحسابات والموارد البشرية بكفاءة عالية.', features: ['إدارة الموارد البشرية', 'المحاسبة والمالية', 'إدارة المخزون', 'تقارير ولوحات تحكم'], icon: '⚙️' },
      { slug: 'ui-ux-design', title: 'تصميم UI/UX', desc: 'تصاميم جذابة وواجهات مستخدم بديهية تعكس هوية علامتك التجارية وتحقق أهدافك.', features: ['بحث المستخدمين', 'نماذج Wireframes', 'تصميم واجهات UI', 'تجربة المستخدم UX'], icon: '🎨' },
      { slug: 'ai-solutions', title: 'التسويق الرقمي', desc: 'في البنية الماسية الرقمية نقدّم حلول تسويق إلكتروني متكاملة تساعدك على جذب العملاء، زيادة المبيعات، ورفع حضور علامتك التجارية على جميع المنصات الرقمية.', features: ['إدارة الحملات الإعلانية', 'إعداد الاستراتيجيات التسويقية', 'تحليل الأداء وتحسين النتائج', 'إدارة السوشيال ميديا'], icon: '📣' },
    ],
  },
  en: {
    badge: 'Our Services',
    title: 'Comprehensive',
    titleSpan: 'Digital Solutions',
    subtitle: 'We provide a full range of digital services to help your business grow and excel online',
    learnMore: 'Learn More',
    requestService: 'Request Service',
    formTitle: 'Need a custom service?',
    formSubtitle: "Tell us what you need and we'll get back to you shortly to discuss your project details.",
    services: [
      { slug: 'web-development', title: 'Website Development', desc: 'We build professional, high-performance websites that reflect your brand identity and achieve your business goals.', features: ['Responsive on all devices', 'Lightning fast loading', 'SEO optimization', 'Easy-to-use admin panel'], icon: '🌐' },
      { slug: 'e-commerce-website-development', title: 'E-Commerce Development', desc: 'Full e-commerce solutions with secure payment gateways and exceptional shopping experiences that boost your sales.', features: ['Multiple payment gateways', 'Inventory management', 'Sales reports', 'Optimized UX'], icon: '🛒' },
      { slug: 'mobile-app-development', title: 'Mobile App Development', desc: 'Professional mobile apps for iOS and Android that give your users an exceptional experience.', features: ['iOS & Android', 'High performance', 'Attractive UI', 'Third-party integration'], icon: '📱' },
      { slug: 'erp-systems', title: 'ERP Systems', desc: 'Custom enterprise resource planning systems for efficient operations, accounting, and HR management.', features: ['HR Management', 'Accounting & Finance', 'Inventory Management', 'Reports & Dashboards'], icon: '⚙️' },
      { slug: 'ui-ux-design', title: 'UI/UX Design', desc: 'Attractive designs and intuitive interfaces that reflect your brand identity and achieve your goals.', features: ['User Research', 'Wireframes', 'UI Interface Design', 'UX Optimization'], icon: '🎨' },
      { slug: 'ai-solutions', title: 'Digital Marketing', desc: 'We deliver integrated digital marketing solutions that help you attract customers, increase sales, and strengthen your brand presence across digital platforms.', features: ['Ad campaign management', 'Marketing strategies', 'Performance analysis', 'Social media management'], icon: '📣' },
    ],
  },
};

const serviceAccents = {
  'web-development': '#4A90D9',
  'e-commerce-website-development': '#27AE60',
  'mobile-app-development': '#E74C3C',
  'erp-systems': '#8E44AD',
  'ui-ux-design': '#F39C12',
  'ai-solutions': '#16A085',
  'tech-consulting': '#2C3E50',
};

function ServiceCard3D({ svc, accent, index, learnMore }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        animationDelay: `${index * 0.08}s`,
      }}
      className="card-entry"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? `linear-gradient(145deg, rgba(20,29,41,0.98) 0%, rgba(16,23,34,1) 100%)`
            : `linear-gradient(145deg, rgba(16,23,34,0.95) 0%, rgba(11,15,21,1) 100%)`,
          border: `1px solid ${hovered ? accent + '88' : 'rgba(184,164,114,0.14)'}`,
          borderRadius: 18,
          padding: '26px 24px 32px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: hovered
            ? `0 18px 34px rgba(0,0,0,0.38), 0 0 0 1px ${accent}30, inset 0 1px 0 rgba(255,255,255,0.05)`
            : '0 14px 34px rgba(0,0,0,0.28)',
          transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
          transition: 'background 0.35s, border-color 0.35s, box-shadow 0.35s, transform 0.35s',
          cursor: 'default',
        }}
      >
        {/* Animated corner glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 160, height: 160,
          background: `radial-gradient(circle at top right, ${accent}${hovered ? '22' : '0a'} 0%, transparent 70%)`,
          transition: 'background 0.5s',
          pointerEvents: 'none',
          borderRadius: '0 18px 0 0',
        }} />

        {/* Animated bottom line */}
        <div style={{
          position: 'absolute', bottom: 0, left: hovered ? 0 : '50%',
          right: hovered ? 0 : '50%',
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          transition: 'left 0.5s cubic-bezier(0.23,1,0.32,1), right 0.5s cubic-bezier(0.23,1,0.32,1)',
          borderRadius: 50,
        }} />

        {/* Card image or gradient placeholder */}
        {svc.cardImage ? (
          <div style={{
            height: 160,
            marginBottom: 22,
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative',
            border: `1px solid ${accent}44`,
          }}>
            <img src={svc.cardImage} alt={svc.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${accent}18 0%, rgba(11,15,21,0.2) 45%, rgba(11,15,21,0.82) 100%)` }} />
          </div>
        ) : (
          <div style={{
            height: 160,
            marginBottom: 22,
            borderRadius: 12,
            border: `1px solid ${accent}${hovered ? '55' : '28'}`,
            background: `linear-gradient(135deg, ${accent}${hovered ? '20' : '0f'} 0%, rgba(16,23,34,0.8) 60%, rgba(11,15,21,0.95) 100%)`,
            position: 'relative',
            overflow: 'hidden',
            transition: 'background 0.4s, border-color 0.4s',
          }}>
            {/* Animated grid lines on placeholder */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `linear-gradient(${accent}18 1px, transparent 1px), linear-gradient(90deg, ${accent}18 1px, transparent 1px)`,
              backgroundSize: '28px 28px',
              opacity: hovered ? 0.7 : 0.3,
              transition: 'opacity 0.4s',
            }} />
          </div>
        )}

        <h2 style={{
          fontSize: 19,
          fontWeight: 700,
          color: 'var(--bmc-white)',
          marginBottom: 14,
          lineHeight: 1.4,
        }}>
          {svc.title}
        </h2>

        <p style={{ fontSize: 13.5, color: 'rgba(245,240,232,0.55)', lineHeight: 1.9, marginBottom: 20 }}>
          {svc.desc}
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 7 }}>
          {svc.features.map((f, j) => (
            <li
              key={j}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontSize: 12.5, color: 'rgba(245,240,232,0.62)',
                transform: hovered ? 'translateX(2px)' : 'translateX(0)',
                transition: `transform ${0.25 + j * 0.05}s cubic-bezier(0.23,1,0.32,1)`,
              }}
            >
              <span style={{ color: accent, fontSize: 14, flexShrink: 0 }}>✓</span> {f}
            </li>
          ))}
        </ul>

        <SnakeButton
          as={Link}
          to={`/service/${svc.slug}`}
          className="snake-btn"
          snakeOptions={{ speed: 0.0035, tailLength: 0.2, lineWidth: 2 }}
          style={{
            fontSize: 12.5, fontWeight: 700, color: '#00C2FF',
            textDecoration: 'none', padding: '9px 18px',
            border: '1px solid rgba(0,194,255,0.35)', borderRadius: 3,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            overflow: 'hidden', position: 'relative',
          }}
        >
          {learnMore}
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </SnakeButton>
      </div>
    </div>
  );
}

export default function ServicesPage({ lang, setLang }) {
  useReveal();
  const { data } = useData();
  const tx = servicesData[lang] || servicesData.ar;
  const dbServices = (data?.services || [])
    .filter((svc) => svc?.visible !== false && svc?.slug !== 'tech-consulting')
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
    .map((svc) => overrideServiceCard({
      slug: svc.slug,
      title: lang === 'ar' ? svc.titleAr : svc.titleEn,
      desc: lang === 'ar' ? svc.descAr : svc.descEn,
      features: (lang === 'ar' ? svc.featuresAr : svc.featuresEn) || [],
      cardImage: svc.cardImage || '',
    }, lang));
  const servicesList = dbServices.length ? dbServices : tx.services;
  const tickerItems = Array.from({ length: 4 }, () => servicesList).flat();

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero */}
      <section style={{
        minHeight: '52vh',
        backgroundImage: `linear-gradient(135deg, rgba(8,11,16,0.93) 0%, rgba(16,23,34,0.94) 100%), url(${servicesBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 110,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated 3D floating orbs */}
        <div className="orb orb-1" style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,164,114,0.07) 0%, transparent 70%)', top: '10%', left: '-10%', pointerEvents: 'none' }} />
        <div className="orb orb-2" style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(74,144,217,0.06) 0%, transparent 70%)', bottom: '-10%', right: '-5%', pointerEvents: 'none' }} />
        <div className="orb orb-3" style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(22,160,133,0.05) 0%, transparent 70%)', top: '50%', left: '60%', pointerEvents: 'none' }} />

        {/* Animated mesh grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(184,164,114,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(184,164,114,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridPulse 8s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div className="hero-badge" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid rgba(184,164,114,0.28)',
            padding: '6px 16px', borderRadius: 40,
            marginBottom: 26,
            background: 'rgba(184,164,114,0.07)',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00C2FF', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: '#00C2FF', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {tx.badge}
            </span>
          </div>

          <h1 className="hero-title" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(42px, 6vw, 80px)',
            fontWeight: 900,
            marginBottom: 22,
            lineHeight: 1.2,
            textWrap: 'balance',
          }}>
            <span style={{ color: 'var(--bmc-white)', display: 'block' }}>{tx.title}</span>
            <span style={{
              background: 'linear-gradient(135deg, #D4C48F 0%, #B8A472 40%, #E8D5A3 70%, #B8A472 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              backgroundSize: '200% auto',
              animation: 'shimmer 4s linear infinite',
              display: 'inline-block',
            }}>{tx.titleSpan}</span>
          </h1>

          <p className="hero-sub" style={{
            maxWidth: 560,
            margin: '0 auto',
            fontSize: 16,
            color: 'rgba(245,240,232,0.6)',
            lineHeight: 1.9,
          }}>
            {tx.subtitle}
          </p>
        </div>
      </section>

      {/* Ticker */}
      <section style={{ background: 'var(--bmc-dark-2)', borderTop: '1px solid rgba(108,99,255,0.1)', borderBottom: '1px solid rgba(108,99,255,0.1)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'servicesTicker 28s linear infinite' }}>
          {tickerItems.map((svc, i) => {
            const accent = serviceAccents[svc.slug] || '#00C2FF';
            return (
              <div key={`${svc.slug}-${i}`} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 24px', fontSize: 12.5, whiteSpace: 'nowrap',
                color: 'rgba(245,240,232,0.7)',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, boxShadow: `0 0 6px ${accent}88`, flexShrink: 0 }} />
                {svc.title}
              </div>
            );
          })}
        </div>
      </section>

      {/* Services 3D Grid */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '90px 0 100px' }}>
        <div className="container">
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
            {servicesList.map((svc, i) => {
              const accent = serviceAccents[svc.slug] || '#00C2FF';
              return (
                <ServiceCard3D
                  key={svc.slug || i}
                  svc={svc}
                  accent={accent}
                  index={i}
                  learnMore={tx.learnMore}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Request Form */}
      <section style={{ background: 'var(--bmc-dark)', padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(108,99,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <ServiceRequestPopup lang={lang} title={tx.formTitle} subtitle={tx.formSubtitle} />
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <WhatsAppFloat lang={lang} />

      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-22px) scale(1.04); }
        }
        @keyframes servicesTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes cardEntry {
          from { opacity: 0; transform: perspective(900px) rotateX(18deg) translateY(40px); }
          to   { opacity: 1; transform: perspective(900px) rotateX(0deg) translateY(0); }
        }
        .orb-1 { animation: floatBlob 9s ease-in-out infinite; }
        .orb-2 { animation: floatBlob 12s ease-in-out infinite 2s; }
        .orb-3 { animation: floatBlob 7s ease-in-out infinite 1s; }
        .hero-badge { animation: cardEntry 0.7s cubic-bezier(0.23,1,0.32,1) both; }
        .hero-title { animation: cardEntry 0.8s cubic-bezier(0.23,1,0.32,1) 0.1s both; }
        .hero-sub   { animation: cardEntry 0.8s cubic-bezier(0.23,1,0.32,1) 0.2s both; }
        .card-entry { animation: cardEntry 0.75s cubic-bezier(0.23,1,0.32,1) both; }
        @media (max-width: 1080px) {
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}