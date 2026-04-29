import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import { useReveal } from '../hooks/useReveal';

const pageData = {
  ar: {
    badge: 'منهجيتنا',
    title: 'كيف نعمل',
    titleSpan: 'معك؟',
    subtitle: 'منهجية عمل واضحة ومنظمة لضمان تسليم مشروعك بأعلى جودة وفي الوقت المحدد',
    bgText: 'PROCESS',
    formTitle: 'جاهز لبدء مشروعك؟',
    formSubtitle: 'أخبرنا بفكرتنا وسنتواصل معك لبدء العمل.',
  },
  en: {
    badge: 'Our Process',
    title: 'How We',
    titleSpan: 'Work With You',
    subtitle: 'A clear and organized methodology to ensure your project is delivered with the highest quality and on time',
    bgText: 'PROCESS',
    formTitle: 'Ready to start your project?',
    formSubtitle: 'Tell us your idea and we will contact you to get started.',
  },
};

const stepsData = {
  ar: [
    { num: '01', title: 'الاستماع والتحليل', desc: 'نبدأ بفهم عميق لأهدافك وتحدياتك وجمهورك المستهدف. نسمع أفكارك ونحلل احتياجاتك بدقة لنضع أساساً متيناً لمشروعك.' },
    { num: '02', title: 'التخطيط والتصميم', desc: 'نضع خطة واضحة ونصمم النماذج الأولية للحصول على موافقتك. نحدد الميزات والأولويات والجدول الزمني.' },
    { num: '03', title: 'التطوير والبناء', desc: 'فريقنا يبني مشروعك بأعلى معايير الجودة وأحدث التقنيات مع متابعة مستمرة وتحديثات دورية.' },
    { num: '04', title: 'الاختبار والإطلاق', desc: 'اختبار شامل لضمان الجودة ثم إطلاق المشروع بسلاسة تامة. نتأكد من كل التفاصيل قبل التسليم.' },
    { num: '05', title: 'الدعم والتطوير', desc: 'نستمر معك بعد الإطلاق بدعم مستمر وتحديثات دورية لضمان نجاح مشروعك على المدى الطويل.' },
  ],
  en: [
    { num: '01', title: 'Listen & Analyze', desc: 'We start with a deep understanding of your goals, challenges, and target audience. We listen to your ideas and analyze your needs precisely to build a solid foundation for your project.' },
    { num: '02', title: 'Plan & Design', desc: 'We create a clear plan and design prototypes for your approval. We define features, priorities, and timeline.' },
    { num: '03', title: 'Develop & Build', desc: 'Our team builds your project to the highest quality standards with the latest technologies, with continuous follow-up and regular updates.' },
    { num: '04', title: 'Test & Launch', desc: 'Thorough testing ensures quality, then a smooth project launch. We verify every detail before delivery.' },
    { num: '05', title: 'Support & Evolve', desc: 'We continue with you after launch with ongoing support and regular updates to ensure your project\'s long-term success.' },
  ],
};

export default function ProcessPage({ lang, setLang }) {
  useReveal();
  const tx = pageData[lang] || pageData.ar;
  const steps = stepsData[lang] || stepsData.ar;

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

      {/* Process Steps + Form */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

            {/* Left: Steps */}
            <div style={{ position: 'relative' }}>
              {/* Vertical connecting line */}
              <div style={{
                position: 'absolute',
                top: 0, bottom: 0,
                left: lang === 'ar' ? 'auto' : '50%',
                right: lang === 'ar' ? '50%' : 'auto',
                width: 1,
                background: 'linear-gradient(to bottom, transparent, rgba(184,164,114,0.25) 20%, rgba(184,164,114,0.25) 80%, transparent)',
              }} />

              {steps.map((step, i) => {
                const isEven = i % 2 === 0;
                const isRight = lang === 'ar' ? !isEven : isEven;

                return (
                  <div
                    key={i}
                    className="reveal"
                    style={{
                      display: 'flex',
                      justifyContent: isRight ? 'flex-start' : 'flex-end',
                      marginBottom: i < steps.length - 1 ? 48 : 0,
                      transitionDelay: `${i * 0.15}s`,
                    }}
                  >
                    <div style={{ width: 'calc(50% - 40px)' }}>
                      <div style={{
                        background: 'var(--bmc-dark-3)',
                        border: '1px solid rgba(184,164,114,0.12)',
                        padding: '32px 36px',
                        position: 'relative',
                        transition: 'border-color 0.3s',
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(184,164,114,0.35)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(184,164,114,0.12)'}
                      >
                        <div style={{
                          fontFamily: 'Playfair Display, serif',
                          fontSize: 48,
                          fontWeight: 900,
                          color: 'rgba(184,164,114,0.1)',
                          lineHeight: 1,
                          marginBottom: -8,
                        }}>{step.num}</div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 12 }}>{step.title}</h3>
                        <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.55)', lineHeight: 1.9 }}>{step.desc}</p>

                        {/* Dot on center line */}
                        <div style={{
                          position: 'absolute',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          [isRight ? (lang === 'ar' ? 'left' : 'right') : (lang === 'ar' ? 'right' : 'left')]: -48,
                          width: 16,
                          height: 16,
                          borderRadius: '50%',
                          background: 'var(--bmc-gold)',
                          border: '3px solid var(--bmc-dark-2)',
                          boxShadow: '0 0 12px rgba(184,164,114,0.5)',
                        }} />
                      </div>
                    </div>
                  </div>
                );
              })}
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
        @media (max-width: 768px) {
          section:nth-of-type(2) .container > div > div:first-child > div { justify-content: flex-start !important; }
          section:nth-of-type(2) .container > div > div:first-child > div > div { width: 90% !important; margin-right: auto !important; }
          section:nth-of-type(2) .container > div > div:first-child::before { left: 8px !important; right: auto !important; }
        }
      `}</style>
    </>
  );
}
