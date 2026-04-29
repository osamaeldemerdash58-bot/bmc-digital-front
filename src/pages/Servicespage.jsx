import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import { useReveal } from '../hooks/useReveal';

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
      {
        slug: 'web-development',
        title: 'تطوير المواقع الإلكترونية',
        desc: 'نبني مواقع احترافية عالية الأداء تعكس هوية علامتك التجارية وتحقق أهدافك التجارية.',
        features: ['تصميم متجاوب مع كل الأجهزة', 'سرعة تحميل فائقة', 'تحسين محركات البحث SEO', 'لوحة إدارة سهلة الاستخدام'],
        icon: '🌐',
      },
      {
        slug: 'e-commerce-website-development',
        title: 'تطوير المتاجر الإلكترونية',
        desc: 'متاجر إلكترونية متكاملة مع بوابات دفع آمنة وتجربة تسوق استثنائية تزيد مبيعاتك.',
        features: ['بوابات دفع متعددة', 'إدارة المخزون', 'تقارير المبيعات', 'تجربة مستخدم محسّنة'],
        icon: '🛒',
      },
      {
        slug: 'mobile-app-development',
        title: 'تطوير التطبيقات',
        desc: 'تطبيقات جوال احترافية لنظامي iOS و Android تمنح مستخدميك تجربة استثنائية.',
        features: ['iOS و Android', 'أداء عالي', 'واجهة مستخدم جذابة', 'تكامل مع الخدمات الخارجية'],
        icon: '📱',
      },
      {
        slug: 'erp-systems',
        title: 'أنظمة ERP',
        desc: 'أنظمة تخطيط موارد المؤسسة المخصصة لإدارة العمليات والحسابات والموارد البشرية بكفاءة عالية.',
        features: ['إدارة الموارد البشرية', 'المحاسبة والمالية', 'إدارة المخزون', 'تقارير ولوحات تحكم'],
        icon: '⚙️',
      },
      {
        slug: 'ui-ux-design',
        title: 'تصميم UI/UX',
        desc: 'تصاميم جذابة وواجهات مستخدم بديهية تعكس هوية علامتك التجارية وتحقق أهدافك.',
        features: ['بحث المستخدمين', 'نماذج Wireframes', 'تصميم واجهات UI', 'تجربة المستخدم UX'],
        icon: '🎨',
      },
      {
        slug: 'ai-solutions',
        title: 'حلول الذكاء الاصطناعي',
        desc: 'دمج تقنيات الذكاء الاصطناعي في منتجاتك — chatbots، تحليل البيانات، والتوصيات الذكية.',
        features: ['روبوتات محادثة', 'تحليل البيانات', 'أنظمة التوصية', 'معالجة اللغة الطبيعية'],
        icon: '🤖',
      },
      {
        slug: 'tech-consulting',
        title: 'استشارات تقنية ودعم',
        desc: 'نقدم استشارات تقنية متخصصة وخطط تحول رقمي شاملة مع دعم مستمر وصيانة دورية.',
        features: ['تحليل البنية التحتية', 'خطة التحول الرقمي', 'الصيانة والدعم المستمر', 'أمن المعلومات'],
        icon: '💡',
      },
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
    formSubtitle: 'Tell us what you need and we\'ll get back to you shortly to discuss your project details.',
    services: [
      {
        slug: 'web-development',
        title: 'Website Development',
        desc: 'We build professional, high-performance websites that reflect your brand identity and achieve your business goals.',
        features: ['Responsive on all devices', 'Lightning fast loading', 'SEO optimization', 'Easy-to-use admin panel'],
        icon: '🌐',
      },
      {
        slug: 'e-commerce-website-development',
        title: 'E-Commerce Development',
        desc: 'Full e-commerce solutions with secure payment gateways and exceptional shopping experiences that boost your sales.',
        features: ['Multiple payment gateways', 'Inventory management', 'Sales reports', 'Optimized UX'],
        icon: '🛒',
      },
      {
        slug: 'mobile-app-development',
        title: 'Mobile App Development',
        desc: 'Professional mobile apps for iOS and Android that give your users an exceptional experience.',
        features: ['iOS & Android', 'High performance', 'Attractive UI', 'Third-party integration'],
        icon: '📱',
      },
      {
        slug: 'erp-systems',
        title: 'ERP Systems',
        desc: 'Custom enterprise resource planning systems for efficient operations, accounting, and HR management.',
        features: ['HR Management', 'Accounting & Finance', 'Inventory Management', 'Reports & Dashboards'],
        icon: '⚙️',
      },
      {
        slug: 'ui-ux-design',
        title: 'UI/UX Design',
        desc: 'Attractive designs and intuitive interfaces that reflect your brand identity and achieve your goals.',
        features: ['User Research', 'Wireframes', 'UI Interface Design', 'UX Optimization'],
        icon: '🎨',
      },
      {
        slug: 'ai-solutions',
        title: 'AI Solutions',
        desc: 'Integrate AI technologies into your products — chatbots, data analytics, and smart recommendations.',
        features: ['Chatbots', 'Data Analytics', 'Recommendation Systems', 'NLP'],
        icon: '🤖',
      },
      {
        slug: 'tech-consulting',
        title: 'Tech Consulting & Support',
        desc: 'Expert technical consulting and comprehensive digital transformation plans with ongoing support and maintenance.',
        features: ['Infrastructure Analysis', 'Digital Transformation', 'Ongoing Support', 'Information Security'],
        icon: '💡',
      },
    ],
  },
};

export default function ServicesPage({ lang, setLang }) {
  useReveal();
  const tx = servicesData[lang] || servicesData.ar;

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />

      {/* Page Hero */}
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
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(184,164,114,0.1)', border: '1px solid rgba(184,164,114,0.25)',
            padding: '6px 16px', borderRadius: 20, marginBottom: 24,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--bmc-gold)', display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: 'var(--bmc-gold)', fontWeight: 600, letterSpacing: 1 }}>{tx.badge}</span>
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 900, marginBottom: 20, lineHeight: 1.2,
          }}>
            <span style={{ color: 'var(--bmc-white)' }}>{tx.title} </span>
            <span style={{
              background: 'linear-gradient(135deg, #D4C48F, #B8A472)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontStyle: 'normal',
            }}>{tx.titleSpan}</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(245,240,232,0.55)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            {tx.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(184,164,114,0.08)' }}>
            {tx.services.map((svc, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  background: 'var(--bmc-dark-2)',
                  padding: '48px 36px',
                  transitionDelay: `${i * 0.1}s`,
                  transition: 'background 0.3s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bmc-dark-3)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bmc-dark-2)'}
              >
                <div style={{ fontSize: 40, marginBottom: 20 }}>{svc.icon}</div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 16, lineHeight: 1.4 }}>
                  {svc.title}
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.55)', lineHeight: 1.9, marginBottom: 24 }}>
                  {svc.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {svc.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(245,240,232,0.6)' }}>
                      <span style={{ color: 'var(--bmc-gold)', fontSize: 16 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link
                    to={`/service/${svc.slug}`}
                    style={{
                      fontSize: 13, fontWeight: 700, color: 'var(--bmc-gold)',
                      textDecoration: 'none', padding: '10px 20px',
                      border: '1px solid rgba(184,164,114,0.35)', borderRadius: 2,
                      transition: 'all 0.3s', display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(184,164,114,0.1)'; e.currentTarget.style.borderColor = 'var(--bmc-gold)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(184,164,114,0.35)'; }}
                  >
                    {tx.learnMore}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Request Form */}
      <section style={{ background: 'var(--bmc-dark)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
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
              title={tx.formTitle}
              subtitle={tx.formSubtitle}
            />
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <WhatsAppFloat lang={lang} />

      <style>{`
        @media (max-width: 900px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
