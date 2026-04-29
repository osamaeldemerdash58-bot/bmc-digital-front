import React, { useState } from 'react';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';

const testimonialsData = {
  ar: {
    label: 'آراء العملاء',
    title: 'ماذا يقول',
    titleSpan: 'عملاؤنا',
    subtitle: 'نفخر بثقة عملائنا ونسعى دائماً لتجاوز توقعاتهم',
    items: [
      { name: 'محمد العتيبي', role: 'مدير شركة تقنية', text: 'تعاملنا مع BMC لتطوير موقعنا الإلكتروني وكانت التجربة استثنائية. الاحترافية في العمل والالتزام بالمواعيد كان أمراً مميزاً جداً. أنصح بشدة بالتعامل معهم.', rating: 5 },
      { name: 'سارة الحربي', role: 'صاحبة متجر إلكتروني', text: 'أطلقوا متجري الإلكتروني في الوقت المحدد وبجودة عالية جداً. المبيعات تضاعفت بعد إطلاق الموقع والتصميم احترافي جداً. شكراً جزيلاً للفريق.', rating: 5 },
      { name: 'فهد الدوسري', role: 'رائد أعمال', text: 'تطبيق الجوال الذي طوروه لي يعمل بشكل مثالي على iOS و Android. الفريق متجاوب جداً ويهتم بأدق التفاصيل. تجربة رائعة من البداية للنهاية.', rating: 5 },
      { name: 'نورة القحطاني', role: 'مديرة تسويق', text: 'قدموا لنا حلولاً رقمية متكاملة وكانوا شريكاً حقيقياً في نجاح مشروعنا. السرعة في التنفيذ مع الحفاظ على أعلى معايير الجودة أمر نادر في السوق.', rating: 5 },
    ],
  },
  en: {
    label: 'Testimonials',
    title: 'What Our',
    titleSpan: 'Clients Say',
    subtitle: "We take pride in our clients' trust and always strive to exceed their expectations",
    items: [
      { name: 'Mohammed Al-Otaibi', role: 'Tech Company Director', text: 'We worked with BMC to develop our website and the experience was exceptional. The professionalism and commitment to deadlines was outstanding. Highly recommend.', rating: 5 },
      { name: 'Sara Al-Harbi', role: 'E-Commerce Owner', text: 'They launched my online store on time with very high quality. Sales doubled after the site launched and the design is extremely professional. Thank you so much to the team.', rating: 5 },
      { name: 'Fahad Al-Dosari', role: 'Entrepreneur', text: 'The mobile app they developed for me works perfectly on both iOS and Android. The team is very responsive and pays attention to the smallest details. A wonderful experience from start to finish.', rating: 5 },
      { name: 'Noura Al-Qahtani', role: 'Marketing Manager', text: "They provided us with comprehensive digital solutions and were a true partner in our project's success. Speed of execution while maintaining the highest quality standards is rare in the market.", rating: 5 },
    ],
  },
};

export default function Testimonials({ lang }) {
  useAnimate();
  const tx = testimonialsData[lang] || testimonialsData.ar;
  const [active, setActive] = useState(0);
  const current = tx.items[active];

  return (
    <section id="testimonials" className="section" style={{ background: 'var(--bmc-dark)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.3), transparent)',
      }} />

      <div style={{
        position: 'absolute',
        top: 60,
        left: lang === 'ar' ? 'auto' : 80,
        right: lang === 'ar' ? 80 : 'auto',
        fontFamily: 'Playfair Display, serif',
        fontSize: 240,
        lineHeight: 1,
        color: 'rgba(184,164,114,0.04)',
        fontWeight: 900,
        pointerEvents: 'none',
        userSelect: 'none',
      }}>
        "
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header-anim" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
          <p className="section-label">{tx.label}</p>
          <h2 className="section-title">{tx.title} <span>{tx.titleSpan}</span></h2>
          <div className="gold-line gold-line-animate" style={{ margin: '24px auto' }} />
          <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.5)', lineHeight: 1.8 }}>{tx.subtitle}</p>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Main card — slides up */}
          <div
            className="testimonial-card"
            style={{
              background: 'var(--bmc-dark-2)',
              border: '1px solid rgba(184,164,114,0.12)',
              padding: '52px 56px',
              position: 'relative',
              marginBottom: 40,
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: lang === 'ar' ? 'auto' : 0,
              right: lang === 'ar' ? 0 : 'auto',
              width: 4,
              height: '100%',
              background: 'linear-gradient(to bottom, var(--bmc-gold), transparent)',
            }} />

            <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
              {Array.from({ length: current.rating }).map((_, i) => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--bmc-gold)" stroke="none">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>

            <blockquote style={{
              fontSize: 18,
              color: 'rgba(245,240,232,0.8)',
              lineHeight: 2,
              fontStyle: 'italic',
              margin: '0 0 36px',
              fontFamily: 'Cairo, sans-serif',
            }}>
              "{current.text}"
            </blockquote>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(184,164,114,0.3), rgba(184,164,114,0.1))',
                border: '1px solid rgba(184,164,114,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 700, color: 'var(--bmc-gold)',
                fontFamily: 'Playfair Display, serif', flexShrink: 0,
              }}>
                {current.name[0]}
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 2 }}>{current.name}</div>
                <div style={{ fontSize: 13, color: 'var(--bmc-gold)', fontWeight: 600 }}>{current.role}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
            <button
              onClick={() => setActive((a) => (a - 1 + tx.items.length) % tx.items.length)}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'transparent', border: '1px solid rgba(184,164,114,0.3)',
                color: 'var(--bmc-gold)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(184,164,114,0.1)'; e.currentTarget.style.borderColor = 'var(--bmc-gold)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(184,164,114,0.3)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={lang === 'ar' ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'} />
              </svg>
            </button>

            <div style={{ display: 'flex', gap: 8 }}>
              {tx.items.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  width: i === active ? 24 : 8, height: 8, borderRadius: 4,
                  background: i === active ? 'var(--bmc-gold)' : 'rgba(184,164,114,0.25)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0,
                }} />
              ))}
            </div>

            <button
              onClick={() => setActive((a) => (a + 1) % tx.items.length)}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'transparent', border: '1px solid rgba(184,164,114,0.3)',
                color: 'var(--bmc-gold)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(184,164,114,0.1)'; e.currentTarget.style.borderColor = 'var(--bmc-gold)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(184,164,114,0.3)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={lang === 'ar' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #testimonials .container > div:last-child > div:first-child { padding: 36px 28px !important; }
        }
      `}</style>
    </section>
  );
}