import React, { useState } from 'react';
import { useAnimate } from '../hooks/useAnimate';
import { useData } from '../DataContext';
import '../animations.css';

const faqData = {
  ar: {
    label: 'الأسئلة الشائعة',
    title: 'أسئلة',
    titleSpan: 'وأجوبة',
    subtitle: 'إجابات على أكثر الأسئلة شيوعاً حول خدماتنا',
    items: [
      { q: 'كم يستغرق تطوير موقع إلكتروني؟', a: 'يعتمد الوقت على حجم وتعقيد المشروع. الموقع البسيط يستغرق من 2-4 أسابيع، بينما المشاريع الكبيرة قد تأخذ من 2-4 أشهر. نحدد الجدول الزمني بدقة بعد دراسة متطلباتك.' },
      { q: 'هل تقدمون خدمات الصيانة بعد الإطلاق؟', a: 'نعم، نقدم خطط صيانة شاملة تشمل التحديثات الأمنية، إصلاح الأخطاء، والتحسينات المستمرة. فريقنا متاح على مدار الساعة لدعم مشاريعك.' },
      { q: 'ما هي تقنيات البرمجة التي تستخدمونها؟', a: 'نستخدم أحدث التقنيات مثل React، Next.js، Node.js، وReact Native للتطبيقات. نختار التقنية المناسبة بناءً على متطلبات مشروعك لضمان أفضل أداء وقابلية للتوسع.' },
      { q: 'كيف يتم التواصل خلال مراحل التطوير؟', a: 'نوفر تقارير أسبوعية مفصلة عن التقدم، ولقاءات منتظمة لمراجعة العمل. كما يتوفر لك مدير مشروع مخصص للتواصل معه في أي وقت عبر واتساب أو البريد الإلكتروني.' },
      { q: 'هل يمكنني رؤية نماذج من أعمالكم السابقة؟', a: 'بالتأكيد! يمكنك مراجعة قسم "أعمالنا" في الموقع. كما يسعدنا مشاركتك بمحفظة أعمال تفصيلية تتضمن مشاريع مماثلة لمجال عملك عند التواصل معنا.' },
      { q: 'هل تعملون مع الشركات الصغيرة والناشئة؟', a: 'نعم، نعمل مع جميع أحجام الشركات من الأفراد والمشاريع الناشئة حتى المؤسسات الكبرى. لدينا حلول مرنة تناسب ميزانيات واحتياجات مختلفة.' },
    ],
  },
  en: {
    label: 'FAQ',
    title: 'Questions',
    titleSpan: '& Answers',
    subtitle: 'Answers to the most common questions about our services',
    items: [
      { q: 'How long does it take to develop a website?', a: 'The time depends on the size and complexity of the project. A simple website takes 2-4 weeks, while larger projects may take 2-4 months. We set the exact timeline after studying your requirements.' },
      { q: 'Do you provide maintenance services after launch?', a: 'Yes, we offer comprehensive maintenance plans including security updates, bug fixes, and ongoing improvements. Our team is available around the clock to support your projects.' },
      { q: 'What programming technologies do you use?', a: 'We use the latest technologies such as React, Next.js, Node.js, and React Native for apps. We choose the appropriate technology based on your project requirements to ensure the best performance and scalability.' },
      { q: 'How do you communicate during development stages?', a: 'We provide detailed weekly progress reports and regular review meetings. You also get a dedicated project manager you can contact at any time via WhatsApp or email.' },
      { q: 'Can I see examples of your previous work?', a: "Absolutely! You can review the \"Works\" section on our website. We're also happy to share a detailed portfolio including projects similar to your field when you contact us." },
      { q: 'Do you work with small businesses and startups?', a: 'Yes, we work with all company sizes from individuals and startups to large enterprises. We have flexible solutions that suit different budgets and needs.' },
    ],
  },
};

export default function FAQ({ lang }) {
  useAnimate();
  const { data } = useData();
  const tx = faqData[lang] || faqData.ar;
  const dynamicItems = (data?.faqs || [])
    .filter((item) => item.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((item) => ({
      q: lang === 'ar' ? item.questionAr : item.questionEn,
      a: lang === 'ar' ? item.answerAr : item.answerEn,
    }))
    .filter((item) => item.q && item.a);
  const items = dynamicItems.length ? dynamicItems : tx.items;
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section id="faq" className="section" style={{ background: 'var(--bmc-dark-2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.3), transparent)',
      }} />

      <div className="container">
        <div className="section-header-anim" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
          <p className="section-label">{tx.label}</p>
          <h2 className="section-title">{tx.title} <span>{tx.titleSpan}</span></h2>
          <div className="gold-line gold-line-animate" style={{ margin: '24px auto' }} />
          <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.5)', lineHeight: 1.8 }}>{tx.subtitle}</p>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {items.map((item, i) => (
            <div
              key={i}
              className="faq-item"
              style={{
                borderBottom: '1px solid rgba(184,164,114,0.1)',
                transitionDelay: `${i * 0.07}s`,
                /* override base opacity/transform with specific transition */
                transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s`,
              }}
            >
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  padding: '24px 0',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: lang === 'ar' ? 'right' : 'left',
                  fontFamily: 'Cairo, sans-serif',
                }}
              >
                <span style={{
                  fontSize: 16, fontWeight: 600,
                  color: openIndex === i ? 'var(--bmc-gold)' : 'var(--bmc-white)',
                  lineHeight: 1.5, transition: 'color 0.3s', flex: 1,
                }}>
                  {item.q}
                </span>

                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  border: `1px solid ${openIndex === i ? 'var(--bmc-gold)' : 'rgba(184,164,114,0.3)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.3s',
                  background: openIndex === i ? 'rgba(184,164,114,0.1)' : 'transparent',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--bmc-gold)" strokeWidth="2"
                    style={{ transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </button>

              <div style={{ maxHeight: openIndex === i ? 300 : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                <p style={{
                  fontSize: 15, color: 'rgba(245,240,232,0.6)', lineHeight: 1.9,
                  paddingBottom: 24,
                  paddingRight: lang === 'ar' ? 0 : 48,
                  paddingLeft: lang === 'ar' ? 48 : 0,
                }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
