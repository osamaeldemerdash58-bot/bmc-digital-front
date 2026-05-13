import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import { useReveal } from '../hooks/useReveal';
import { useData } from '../DataContext';
import { overrideServiceCard, overrideServiceDetail } from '../data/digitalMarketingService';
import servicesBgImage from '../assets/ChatGPT Image May 8, 2026, 06_46_13 PM.png';

const serviceAccents = {
  'web-development': '#4A90D9',
  'e-commerce-website-development': '#27AE60',
  'mobile-app-development': '#E74C3C',
  'erp-systems': '#8E44AD',
  'ui-ux-design': '#F39C12',
  'ai-solutions': '#16A085',
  'tech-consulting': '#2C3E50',
};

/* ── Service sub-types per slug ── */
const serviceSubTypes = {
  'web-development': [
    { ar: 'مواقع تعريفية', en: 'Corporate Websites' },
    { ar: 'مواقع قانونية', en: 'Legal Websites' },
    { ar: 'مواقع إسلامية', en: 'Islamic Websites' },
    { ar: 'منصات تعليمية', en: 'Educational Platforms' },
    { ar: 'جمعيات خيرية', en: 'Charity Sites' },
    { ar: 'مواقع تجارية', en: 'Business Websites' },
    { ar: 'متاجر إلكترونية', en: 'Online Stores' },
    { ar: 'مواقع حكومية', en: 'Government Portals' },
  ],
  'e-commerce-website-development': [
    { ar: 'متاجر WooCommerce', en: 'WooCommerce Stores' },
    { ar: 'متاجر Shopify', en: 'Shopify Stores' },
    { ar: 'بوابات دفع إلكتروني', en: 'Payment Gateways' },
    { ar: 'إدارة المنتجات', en: 'Product Management' },
    { ar: 'تتبع الطلبات', en: 'Order Tracking' },
    { ar: 'برامج الولاء', en: 'Loyalty Programs' },
    { ar: 'متاجر B2B', en: 'B2B Marketplaces' },
  ],
  'mobile-app-development': [
    { ar: 'تطبيقات iOS', en: 'iOS Apps' },
    { ar: 'تطبيقات Android', en: 'Android Apps' },
    { ar: 'تطبيقات React Native', en: 'React Native Apps' },
    { ar: 'تطبيقات Flutter', en: 'Flutter Apps' },
    { ar: 'تطبيقات الأعمال', en: 'Business Apps' },
    { ar: 'تطبيقات التوصيل', en: 'Delivery Apps' },
    { ar: 'تطبيقات التعليم', en: 'EdTech Apps' },
  ],
  'erp-systems': [
    { ar: 'إدارة الموارد البشرية', en: 'HR Management' },
    { ar: 'المحاسبة والمالية', en: 'Finance & Accounting' },
    { ar: 'إدارة المخزون', en: 'Inventory Management' },
    { ar: 'إدارة المشاريع', en: 'Project Management' },
    { ar: 'إدارة العملاء CRM', en: 'CRM Systems' },
    { ar: 'تقارير وتحليلات', en: 'Reports & Analytics' },
  ],
  'ui-ux-design': [
    { ar: 'تصميم واجهات المستخدم', en: 'UI Design' },
    { ar: 'تجربة المستخدم UX', en: 'UX Research' },
    { ar: 'نماذج أولية Prototyping', en: 'Prototyping' },
    { ar: 'هوية بصرية', en: 'Visual Identity' },
    { ar: 'تصميم نظام Design System', en: 'Design Systems' },
    { ar: 'اختبار المستخدم', en: 'User Testing' },
  ],
  'ai-solutions': [
    { ar: 'شات بوت ذكي', en: 'AI Chatbots' },
    { ar: 'معالجة اللغات الطبيعية', en: 'NLP Solutions' },
    { ar: 'تحليل البيانات', en: 'Data Analytics' },
    { ar: 'رؤية حاسوبية', en: 'Computer Vision' },
    { ar: 'أتمتة العمليات', en: 'Process Automation' },
    { ar: 'نماذج تنبؤية', en: 'Predictive Models' },
  ],
  'tech-consulting': [
    { ar: 'استراتيجية رقمية', en: 'Digital Strategy' },
    { ar: 'تحويل رقمي', en: 'Digital Transformation' },
    { ar: 'أمن المعلومات', en: 'Cybersecurity' },
    { ar: 'بنية تحتية سحابية', en: 'Cloud Infrastructure' },
    { ar: 'تدقيق تقني', en: 'Tech Auditing' },
    { ar: 'تخطيط الأنظمة', en: 'Systems Planning' },
  ],
};

/* ── Why Choose Us cards per slug ── */
const whyChooseUs = {
  ar: [
    { icon: '🏆', title: 'خبرة واسعة', desc: 'فريق من المطورين والمصممين ذوي الخبرة العالية في مجالاتهم.' },
    { icon: '⚡', title: 'تسليم سريع', desc: 'نلتزم بالمواعيد ونسلّم مشروعك في الوقت المحدد دون تأخير.' },
    { icon: '💎', title: 'جودة عالية', desc: 'كود نظيف وتصاميم احترافية تعكس هوية علامتك التجارية.' },
    { icon: '🛡️', title: 'دعم مستمر', desc: 'نقف معك بعد التسليم بدعم فني متواصل وصيانة دورية.' },
    { icon: '💰', title: 'أسعار تنافسية', desc: 'نوفر لك أفضل قيمة مقابل ميزانيتك دون أي تنازلات على الجودة.' },
    { icon: '🎯', title: 'حلول مخصصة', desc: 'نبني حلولاً تناسب احتياجات مشروعك تحديداً لا حلولاً جاهزة.' },
  ],
  en: [
    { icon: '🏆', title: 'Proven Expertise', desc: 'A team of highly experienced developers and designers in their fields.' },
    { icon: '⚡', title: 'Fast Delivery', desc: 'We commit to deadlines and deliver your project on time, every time.' },
    { icon: '💎', title: 'Top Quality', desc: 'Clean code and professional designs that reflect your brand identity.' },
    { icon: '🛡️', title: 'Ongoing Support', desc: 'We stand by you post-delivery with continuous technical support and maintenance.' },
    { icon: '💰', title: 'Competitive Pricing', desc: 'Best value for your budget with zero compromises on quality.' },
    { icon: '🎯', title: 'Custom Solutions', desc: 'We build solutions specifically tailored to your project, not generic templates.' },
  ],
};

/* ── 3D tilt card hook ── */
function useTilt(strength = 10) {
  const ref = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(8px)`;
        el.style.transition = 'transform 0.08s linear';
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frameRef.current);
      el.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
      el.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frameRef.current);
    };
  }, [strength]);

  return ref;
}

function FeatureRow({ text, index, accent }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '18px 16px 18px 20px',
        borderBottom: `1px solid rgba(255,255,255,${hovered ? '0.07' : '0.04'})`,
        background: hovered ? `linear-gradient(90deg, ${accent}08 0%, transparent 60%)` : 'transparent',
        transition: 'background 0.3s ease',
        cursor: 'default',
        position: 'relative',
        minHeight: 58,
      }}
    >
      {/* Dot */}
      <div style={{
        width: hovered ? 7 : 5,
        height: hovered ? 7 : 5,
        borderRadius: '50%',
        background: hovered ? accent : `${accent}55`,
        flexShrink: 0,
        boxShadow: hovered ? `0 0 10px ${accent}88` : 'none',
        transition: 'all 0.25s ease',
      }} />
      <span style={{
        fontSize: 14,
        fontWeight: 600,
        color: hovered ? 'rgba(245,240,232,0.95)' : 'rgba(245,240,232,0.65)',
        flex: 1,
        lineHeight: 1.5,
        transition: 'color 0.25s',
      }}>{text}</span>
    </div>
  );
}

function BenefitItem({ title, desc, accent, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: 16,
        padding: '20px 16px 20px 20px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.3s ease',
        cursor: 'default',
        minHeight: 58,
        background: hovered ? `linear-gradient(90deg, ${accent}06 0%, transparent 60%)` : 'transparent',
      }}
    >
      {/* Dot */}
      <div style={{
        flexShrink: 0,
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: hovered ? accent : `${accent}55`,
        marginTop: 6,
        boxShadow: hovered ? `0 0 8px ${accent}` : 'none',
        transition: 'all 0.3s ease',
      }} />
      <div style={{ flex: 1 }}>
        <h4 style={{
          fontSize: 14.5,
          fontWeight: 700,
          color: hovered ? '#fff' : 'rgba(245,240,232,0.82)',
          marginBottom: 5,
          transition: 'color 0.3s',
        }}>{title}</h4>
        <p style={{
          fontSize: 12.5,
          color: 'rgba(245,240,232,0.45)',
          lineHeight: 1.75,
          margin: 0,
        }}>{desc}</p>
      </div>
    </div>
  );
}

// Keep old DetailCard3D as unused (won't be referenced)
function DetailCard3D({ children, accent, delay = 0 }) {
  return <div style={{ animationDelay: `${delay}s` }}>{children({ hovered: false, accent })}</div>;
}

/* ── Why Choose Card - horizontal editorial layout ── */
function WhyCard({ title, desc, accent, delay = 0, isAr = false, index = 0, isActive = false }) {
  const [hovered, setHovered] = useState(false);
  const active = hovered || isActive;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="why-card"
      style={{
        display: 'flex',
        gap: 20,
        alignItems: 'flex-start',
        padding: '22px 0',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        transition: 'all 0.3s ease',
        cursor: 'default',
        animationDelay: `${delay}s`,
        flexDirection: isAr ? 'row-reverse' : 'row',
        background: active ? `linear-gradient(${isAr ? '270deg' : '90deg'}, ${accent}06 0%, transparent 60%)` : 'transparent',
        borderRadius: 4,
        paddingLeft: isAr ? 0 : 8,
        paddingRight: isAr ? 8 : 0,
      }}
    >
      {/* Text */}
      <div style={{ flex: 1, textAlign: isAr ? 'right' : 'left' }}>
        <h3 style={{
          fontSize: 15,
          fontWeight: 700,
          color: active ? '#fff' : 'rgba(245,240,232,0.75)',
          marginBottom: 5,
          transition: 'color 0.3s',
        }}>
          {title}
        </h3>
        <p style={{ fontSize: 13, color: active ? 'rgba(245,240,232,0.55)' : 'rgba(245,240,232,0.35)', lineHeight: 1.75, margin: 0, transition: 'color 0.3s' }}>{desc}</p>
      </div>
    </div>
  );
}

/* ── Animated Tracker Box ── */
function AnimatedTracker({ rowCount, accent, isAr, label, containerRef }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [phase, setPhase] = useState('visible');
  const [displayNum, setDisplayNum] = useState(1);
  const [trackerY, setTrackerY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const measureY = (idx) => {
    const container = containerRef?.current;
    if (!container) return 0;
    const rows = Array.from(container.children);
    if (!rows[idx]) return 0;
    // offsetTop is relative to offsetParent — accurate for absolute positioning
    const rowEl = rows[idx];
    return rowEl.offsetTop + rowEl.offsetHeight / 2 - 19;
  };

  useEffect(() => {
    const timer = setTimeout(() => setTrackerY(measureY(0)), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (rowCount === 0) return;
    const DWELL = 1900;
    const TRANSITION = 260;

    const cycle = () => {
      setPhase('exit');
      setTimeout(() => {
        setActiveIdx(prev => {
          const next = (prev + 1) % rowCount;
          setDisplayNum(next + 1);
          // Measure after state update in next tick
          requestAnimationFrame(() => {
            const container = containerRef?.current;
            if (!container) return;
            const rows = Array.from(container.children);
            if (!rows[next]) return;
            setTrackerY(rows[next].offsetTop + rows[next].offsetHeight / 2 - 19);
          });
          return next;
        });
        setPhase('enter');
        setTimeout(() => setPhase('visible'), TRANSITION);
      }, TRANSITION);
    };

    const interval = setInterval(cycle, DWELL + TRANSITION * 2);
    return () => clearInterval(interval);
  }, [rowCount]);

  if (rowCount === 0) return null;

  const slideStyle = {
    visible: { opacity: 1, transform: 'translateY(0px)' },
    exit:    { opacity: 0, transform: 'translateY(-8px)' },
    enter:   { opacity: 0, transform: 'translateY(8px)' },
  }[phase];

  if (isMobile) {
    // On mobile: show as a small horizontal pill at the top of the list
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
        padding: '6px 12px',
        border: `1px solid ${accent}44`,
        borderRadius: 20,
        background: `${accent}0c`,
        width: 'fit-content',
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: accent,
          boxShadow: `0 0 6px ${accent}`,
          animation: 'pulse 1.4s ease-in-out infinite',
        }} />
        <span style={{
          fontSize: 11,
          fontWeight: 800,
          color: accent,
          fontFamily: 'monospace',
          ...slideStyle,
          transition: 'opacity 0.26s ease, transform 0.26s ease',
        }}>
          {String(displayNum).padStart(2, '0')}
        </span>
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          color: `${accent}88`,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>{label}</span>
      </div>
    );
  }

  // Desktop: vertical tracker on the side
  return (
    <div style={{
      position: 'absolute',
      [isAr ? 'right' : 'left']: -60,
      top: 0,
      bottom: 0,
      width: 44,
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      {/* Track line */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 10, bottom: 10,
        width: 1,
        background: `linear-gradient(180deg, transparent 0%, ${accent}55 15%, ${accent}55 85%, transparent 100%)`,
        transform: 'translateX(-50%)',
      }} />

      {/* Moving box */}
      <div style={{
        position: 'absolute',
        top: trackerY,
        left: '50%',
        transform: 'translateX(-50%)',
        transition: 'top 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
        width: 40,
        height: 38,
        borderRadius: 8,
        border: `1.5px solid ${accent}`,
        background: `linear-gradient(135deg, ${accent}1c 0%, ${accent}06 100%)`,
        boxShadow: `0 0 18px ${accent}55, 0 2px 8px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}>
        <div style={{
          fontSize: 13,
          fontWeight: 900,
          color: accent,
          fontFamily: 'monospace',
          lineHeight: 1,
          ...slideStyle,
          transition: 'opacity 0.26s ease, transform 0.26s cubic-bezier(0.4,0,0.2,1)',
        }}>
          {String(displayNum).padStart(2, '0')}
        </div>
        <div style={{
          fontSize: 7,
          fontWeight: 700,
          color: `${accent}88`,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function TrackedFeatureList({ items, accent, isAr }) {
  const rowsRef = useRef(null);
  return (
    <>
      <div style={{
        fontSize: 11, fontWeight: 800, color: 'rgba(245,240,232,0.35)',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        marginBottom: 4, paddingBottom: 16,
        borderBottom: `2px solid ${accent}`, display: 'inline-block',
      }}>
        {isAr ? 'المميزات' : 'Features'}
      </div>
      <div style={{ position: 'relative' }}>
        <AnimatedTracker
          rowCount={items.length}
          accent={accent}
          isAr={isAr}
          label={isAr ? 'ميزة' : 'feat'}
          containerRef={rowsRef}
        />
        <div ref={rowsRef}>
          {items.map((f, i) => (
            <FeatureRow key={`f-${i}`} text={f} index={i} accent={accent} />
          ))}
        </div>
      </div>
    </>
  );
}

function TrackedBenefitList({ items, accent, isAr }) {
  const rowsRef = useRef(null);
  return (
    <>
      <div style={{
        fontSize: 11, fontWeight: 800, color: 'rgba(245,240,232,0.35)',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        marginBottom: 4, paddingBottom: 16,
        borderBottom: `2px solid ${accent}55`, display: 'inline-block',
      }}>
        {isAr ? 'الفوائد' : 'Benefits'}
      </div>
      <div style={{ position: 'relative' }}>
        <AnimatedTracker
          rowCount={items.length}
          accent={accent}
          isAr={isAr}
          label={isAr ? 'فائدة' : 'ben'}
          containerRef={rowsRef}
        />
        <div ref={rowsRef}>
          {items.map((b, i) => (
            <BenefitItem key={`b-${i}`} title={b.title} desc={b.desc} accent={accent} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}

function TrackedWhyList({ items, accent, isAr }) {
  const rowsRef = useRef(null);
  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', position: 'relative' }}>
      <AnimatedTracker
        rowCount={items.length}
        accent={accent}
        isAr={isAr}
        label={isAr ? 'سبب' : 'why'}
        containerRef={rowsRef}
      />
      <div ref={rowsRef}>
        {items.map((card, i) => (
          <WhyCard
            key={i}
            title={card.title}
            desc={card.desc}
            accent={accent}
            delay={i * 0.08}
            isAr={isAr}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Scrolling Sub-Types Ticker ── */
function SubTypesTicker({ types, accent, isAr }) {
  // Duplicate for infinite scroll
  const items = [...types, ...types, ...types];
  return (
    <section style={{
      background: 'var(--bmc-dark-2)',
      borderTop: `1px solid ${accent}44`,
      borderBottom: `1px solid ${accent}44`,
      overflow: 'hidden',
      padding: '0',
      position: 'relative',
    }}>
      {/* Left/right fade overlays */}
      <div style={{
        position: 'absolute', top: 0, left: 0, bottom: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(90deg, var(--bmc-dark-2) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: 0, right: 0, bottom: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(270deg, var(--bmc-dark-2) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: `subTypeTicker ${types.length * 3}s linear infinite`,
        direction: 'ltr',
      }}>
        {items.map((item, i) => (
          <div
            key={i}
            className="subtype-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '16px 28px',
              whiteSpace: 'nowrap',
              cursor: 'default',
              borderRight: `1px solid ${accent}22`,
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: accent,
              boxShadow: `0 0 8px ${accent}`,
              flexShrink: 0,
              display: 'inline-block',
            }} />
            <span style={{
              fontSize: 14,
              fontWeight: 700,
              color: 'rgba(245,240,232,0.85)',
              letterSpacing: '0.02em',
            }}>
              {isAr ? item.ar : item.en}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function RelatedServiceCard({ item, isAr, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const accent = serviceAccents[item.slug] || 'var(--bmc-gold)';

  return (
    <Link
      to={`/services/${item.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        borderRadius: 24,
        overflow: 'hidden',
        border: `1px solid ${hovered ? accent + '55' : 'rgba(255,255,255,0.08)'}`,
        background: 'linear-gradient(180deg, rgba(18,24,34,0.96) 0%, rgba(11,15,22,0.98) 100%)',
        boxShadow: hovered ? `0 20px 60px ${accent}22` : '0 16px 48px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease',
        height: '100%',
      }}
    >
      <div style={{
        position: 'relative',
        height: 220,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${accent}22 0%, rgba(7,10,14,0.95) 100%)`,
      }}>
        {item.cardImage ? (
          <img
            src={item.cardImage}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${accent}18 0%, rgba(8,11,16,1) 100%)`,
          }} />
        )}

        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(8,11,16,0.02) 0%, rgba(8,11,16,0.72) 78%, rgba(8,11,16,0.95) 100%)',
        }} />

        <div style={{
          position: 'absolute',
          top: 18,
          [isAr ? 'right' : 'left']: 18,
          padding: '8px 12px',
          borderRadius: 999,
          border: `1px solid ${accent}44`,
          background: 'rgba(8,11,16,0.72)',
          color: accent,
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          backdropFilter: 'blur(10px)',
        }}>
          {isAr ? 'خدمة مقترحة' : 'Suggested'}
        </div>

        <div style={{
          position: 'absolute',
          bottom: 16,
          [isAr ? 'left' : 'right']: 18,
          fontSize: 36,
          fontWeight: 900,
          fontFamily: 'Playfair Display, serif',
          color: `${accent}44`,
          lineHeight: 1,
          userSelect: 'none',
        }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      <div style={{ padding: 24 }}>
        <h3 style={{
          margin: '0 0 12px',
          fontSize: 23,
          fontWeight: 900,
          lineHeight: 1.35,
          color: 'var(--bmc-white)',
          fontFamily: 'Playfair Display, serif',
          textAlign: isAr ? 'right' : 'left',
        }}>
          {item.title}
        </h3>

        <p style={{
          margin: '0 0 20px',
          fontSize: 14,
          lineHeight: 1.9,
          color: 'rgba(245,240,232,0.58)',
          textAlign: isAr ? 'right' : 'left',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {item.desc}
        </p>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          color: accent,
          fontSize: 13,
          fontWeight: 800,
        }}>
          <span>{isAr ? 'اكتشف الخدمة' : 'Explore Service'}</span>
          <span aria-hidden="true">{isAr ? '←' : '→'}</span>
        </div>
      </div>
    </Link>
  );
}

export default function ServiceDetailPage({ lang, setLang }) {
  useReveal();
  const { slug } = useParams();
  const { data } = useData();
  const service = overrideServiceDetail(data?.services?.find(s => s.slug === slug));

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
  const tickerFeatures = Array.from({ length: 4 }, () => features || []).flat();
  const heroTitleMain = detailTitle || title;
  const heroTitleSpan = detailTitleSpan || '';

  // Sub-types for this service
  const subTypes = serviceSubTypes[service.slug] || [];
  const whyCards = isAr ? whyChooseUs.ar : whyChooseUs.en;
  const orderedServices = (data?.services || [])
    .filter((item) => item?.visible !== false && item?.slug)
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
    .map((item) => overrideServiceCard({
      slug: item.slug,
      title: sanitizeServiceText(isAr ? item.titleAr : item.titleEn),
      desc: sanitizeServiceText(isAr ? item.descAr : item.descEn),
      titleAr: item.titleAr,
      titleEn: item.titleEn,
      features: (isAr ? item.featuresAr : item.featuresEn) || [],
      cardImage: item.cardImage || '',
    }, lang));
  const currentServiceIndex = orderedServices.findIndex((item) => item.slug === service.slug);
  const rotatedServices = currentServiceIndex >= 0
    ? [...orderedServices.slice(currentServiceIndex + 1), ...orderedServices.slice(0, currentServiceIndex)]
    : orderedServices;
  const relatedServices = rotatedServices.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />

      {/* ── Hero ── */}
      <section style={{
        minHeight: '52vh',
        backgroundImage: `linear-gradient(135deg, rgba(8,11,16,0.93) 0%, rgba(16,23,34,0.94) 100%), url(${service.cardImage || servicesBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 110,
        paddingBottom: 100,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Depth orbs */}
        <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${accent}08 0%, transparent 70%)`, top: '10%', left: '-8%', animation: 'orbFloat1 10s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: `radial-gradient(circle, ${accent}06 0%, transparent 70%)`, bottom: '-5%', right: '5%', animation: 'orbFloat2 13s ease-in-out infinite 1.5s', pointerEvents: 'none' }} />

        {/* Animated mesh */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(${accent}06 1px, transparent 1px), linear-gradient(90deg, ${accent}06 1px, transparent 1px)`,
          backgroundSize: '55px 55px',
          animation: 'gridPulse 9s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Breadcrumb */}
          <div className="hero-breadcrumb" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(245,240,232,0.55)', fontSize: 12.5, marginBottom: 20 }}>
            <Link to="/" style={{ color: 'rgba(245,240,232,0.45)', textDecoration: 'none', transition: 'color 0.2s' }}>
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <span style={{ color: 'rgba(184,164,114,0.3)' }}>/</span>
            <Link to="/services" style={{ color: 'rgba(245,240,232,0.45)', textDecoration: 'none' }}>
              {isAr ? 'الخدمات' : 'Services'}
            </Link>
            <span style={{ color: 'rgba(184,164,114,0.3)' }}>/</span>
            <span style={{ color: 'var(--bmc-gold)', fontWeight: 700 }}>{title}</span>
          </div>

          <h1 className="hero-title-detail" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5.5vw, 70px)',
            fontWeight: 900,
            marginBottom: 22,
            lineHeight: 1.28,
            paddingBottom: 6,
            textWrap: 'balance',
          }}>
            <span style={{ color: 'var(--bmc-white)' }}>{heroTitleMain} </span>
            {heroTitleSpan && (
              <span style={{
                background: 'linear-gradient(135deg, #D4C48F 0%, #B8A472 40%, #E8D5A3 70%, #B8A472 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                backgroundSize: '200% auto',
                animation: 'shimmer 4s linear infinite',
                display: 'inline-block',
              }}>{heroTitleSpan}</span>
            )}
          </h1>

          {/* CTA button */}
          <a
            href="https://wa.me/201000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              marginTop: 10,
              padding: '14px 32px',
              background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
              color: '#fff',
              fontWeight: 800,
              fontSize: 15,
              borderRadius: 50,
              textDecoration: 'none',
              boxShadow: `0 8px 32px ${accent}44`,
              transition: 'transform 0.25s, box-shadow 0.25s',
              animation: 'cardEntry 0.9s cubic-bezier(0.23,1,0.32,1) 0.3s both',
            }}
          >
            <span>💬</span>
            {isAr ? 'اطلب الخدمة الآن' : 'Request This Service'}
          </a>
        </div>
      </section>

      {/* ── Animated Sub-Types Ticker (NEW) ── */}
      {subTypes.length > 0 && (
        <SubTypesTicker types={subTypes} accent={accent} isAr={isAr} />
      )}

      {/* ── Features ticker (original) ── */}
      <section style={{ background: 'rgba(8,11,16,0.98)', borderBottom: `1px solid ${accent}22`, overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'featureTicker 22s linear infinite' }}>
          {tickerFeatures.map((item, i) => (
            <div key={`${item}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 22px', fontSize: 12, whiteSpace: 'nowrap', color: 'rgba(245,240,232,0.5)' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent + '88', flexShrink: 0 }} />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── Description block ── */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '56px 0 20px' }}>
        <div className="container">
          <div className="desc-block" style={{
            display: 'grid',
            gridTemplateColumns: '3px 1fr',
            gap: '0 32px',
            alignItems: 'stretch',
          }}>
            {/* Vertical accent line */}
            <div style={{
              background: `linear-gradient(180deg, ${accent} 0%, ${accent}22 100%)`,
              borderRadius: 4,
              minHeight: 60,
            }} />
            <p style={{
              fontSize: 16,
              color: 'rgba(245,240,232,0.72)',
              lineHeight: 2,
              margin: 0,
              paddingTop: 4,
            }}>
              {detailDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ── Features & Benefits ── */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '70px 0 80px' }}>
        <div className="container">
          {/* Section header */}
          <div style={{ marginBottom: 52, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{
                display: 'inline-block',
                fontSize: 11,
                fontWeight: 800,
                color: accent,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>
                {isAr ? '— ما يشمله الحل' : '— What We Deliver'}
              </span>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(26px, 3.5vw, 44px)',
                fontWeight: 900,
                color: 'var(--bmc-white)',
                lineHeight: 1.25,
                margin: 0,
              }}>
                {isAr ? (
                  <>المميزات<br /><span style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}88 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>والفوائد</span></>
                ) : (
                  <>Features &<br /><span style={{ background: `linear-gradient(135deg, ${accent} 0%, ${accent}88 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Benefits</span></>
                )}
              </h2>
            </div>
            {/* Stat badge */}
            <div style={{
              padding: '12px 24px',
              border: `1px solid ${accent}33`,
              borderRadius: 8,
              background: `${accent}08`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: accent, fontFamily: 'monospace', lineHeight: 1 }}>
                {(features?.length || 0) + (benefits?.length || 0)}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(245,240,232,0.45)', marginTop: 4, fontWeight: 600, letterSpacing: '0.06em' }}>
                {isAr ? 'نقطة قوة' : 'KEY POINTS'}
              </div>
            </div>
          </div>

          {/* Two-column layout: features left, benefits right */}
          <div className="fb-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 60px' }}>
            {/* Features column */}
            <div>
              {features && features.length > 0 && (
                <TrackedFeatureList items={features} accent={accent} isAr={isAr} />
              )}
            </div>

            {/* Benefits column */}
            <div>
              {benefits && benefits.length > 0 && (
                <TrackedBenefitList items={benefits} accent={accent} isAr={isAr} />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{
        background: 'linear-gradient(180deg, rgba(8,11,16,1) 0%, rgba(12,17,25,1) 100%)',
        padding: '90px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* BG glow */}
        <div style={{
          position: 'absolute', top: '40%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700, height: 700,
          background: `radial-gradient(circle, ${accent}07 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Two-col layout: heading left, list right */}
          <div className="why-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '0 80px', alignItems: 'start' }}>

            {/* Left: sticky heading */}
            <div style={{ position: 'sticky', top: 120 }}>
              <span style={{
                display: 'inline-block',
                fontSize: 11,
                fontWeight: 800,
                color: accent,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                {isAr ? '— لماذا نحن؟' : '— Why Us?'}
              </span>
              <h2 style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(28px, 3vw, 46px)',
                fontWeight: 900,
                color: 'var(--bmc-white)',
                lineHeight: 1.22,
                marginBottom: 24,
              }}>
                {isAr ? (
                  <>لماذا<br />تختارنا<br /><span style={{ background: `linear-gradient(135deg, #D4C48F 0%, ${accent} 50%, #B8A472 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>لمشروعك؟</span></>
                ) : (
                  <>Why<br />Choose<br /><span style={{ background: `linear-gradient(135deg, #D4C48F 0%, ${accent} 50%, #B8A472 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Us?</span></>
                )}
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.45)', lineHeight: 1.8, marginBottom: 32 }}>
                {isAr
                  ? 'مع فريقنا، أنت لا تحصل فقط على خدمة، بل على شريك استراتيجي يضمن نجاح مشروعك الرقمي.'
                  : 'With our team, you get more than a service — a strategic partner committed to your digital success.'}
              </p>
              {/* CTA buttons stacked */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <a
                  href="https://wa.me/201000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '13px 28px',
                    background: `linear-gradient(135deg, ${accent} 0%, ${accent}cc 100%)`,
                    color: '#fff',
                    fontWeight: 800, fontSize: 14,
                    borderRadius: 8,
                    textDecoration: 'none',
                    boxShadow: `0 6px 24px ${accent}44`,
                    transition: 'transform 0.25s, box-shadow 0.25s',
                  }}
                >
                  💬 {isAr ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
                </a>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '13px 28px',
                    background: 'transparent',
                    color: 'rgba(245,240,232,0.7)',
                    fontWeight: 600, fontSize: 14,
                    borderRadius: 8,
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'all 0.25s',
                  }}
                >
                  {isAr ? 'تواصل معنا الآن' : 'Contact Us Now'} →
                </Link>
              </div>
            </div>

            {/* Right: why cards as list */}
            <TrackedWhyList items={whyCards} accent={accent} isAr={isAr} />
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section style={{
          background: 'linear-gradient(180deg, rgba(12,17,25,1) 0%, rgba(8,11,16,1) 100%)',
          padding: '88px 0 96px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 24,
              flexWrap: 'wrap',
              marginBottom: 40,
            }}>
              <div style={{ maxWidth: 700 }}>
                <span style={{
                  display: 'inline-block',
                  fontSize: 11,
                  fontWeight: 800,
                  color: accent,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}>
                  {isAr ? '— خدمات ذات صلة' : '— Related Services'}
                </span>
                <h2 style={{
                  margin: '0 0 14px',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(28px, 3.6vw, 46px)',
                  fontWeight: 900,
                  lineHeight: 1.25,
                  color: 'var(--bmc-white)',
                }}>
                  {isAr ? 'اقتراحات لبعض خدماتنا' : 'Suggested Services'}
                </h2>
                <p style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.9,
                  color: 'rgba(245,240,232,0.52)',
                }}>
                  {isAr
                    ? 'يمكنك أيضًا استكشاف خدمات أخرى مكمّلة لمشروعك الرقمي لتبني تجربة متكاملة ونتائج أقوى.'
                    : 'You can also explore complementary services that help you build a stronger and more complete digital experience.'}
                </p>
              </div>

              <Link
                to="/services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '13px 22px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  color: 'rgba(245,240,232,0.82)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.02)',
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                <span>{isAr ? 'عرض كل الخدمات' : 'View All Services'}</span>
                <span aria-hidden="true">{isAr ? '←' : '→'}</span>
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
            }}>
              {relatedServices.map((item, index) => (
                <RelatedServiceCard
                  key={item.slug}
                  item={item}
                  isAr={isAr}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Service Request Form ── */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(184,164,114,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
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
        /* Sub-types ticker */
        @keyframes subTypeTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .subtype-pill:hover {
          background: rgba(255,255,255,0.03);
        }
        .subtype-pill:hover span:last-child {
          color: rgba(245,240,232,1);
        }

        /* Original animations */
        @keyframes featureTicker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes gridPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes orbFloat1 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.04); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(18px) scale(0.96); }
        }
        @keyframes cardEntry {
          from { opacity: 0; transform: perspective(900px) rotateX(20deg) translateY(36px); }
          to   { opacity: 1; transform: perspective(900px) rotateX(0deg) translateY(0); }
        }

        .hero-cta-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.35);
        }

        .hero-breadcrumb { animation: cardEntry 0.7s cubic-bezier(0.23,1,0.32,1) both; }
        .hero-title-detail { animation: cardEntry 0.8s cubic-bezier(0.23,1,0.32,1) 0.14s both; }
        .desc-block { animation: cardEntry 0.8s cubic-bezier(0.23,1,0.32,1) 0.1s both; }
        .detail-card { animation: cardEntry 0.75s cubic-bezier(0.23,1,0.32,1) both; }
        .why-card { animation: cardEntry 0.75s cubic-bezier(0.23,1,0.32,1) both; }

        @media (max-width: 1080px) {
          .fb-grid { grid-template-columns: 1fr !important; gap: 40px 0 !important; }
          .why-layout { grid-template-columns: 1fr !important; }
          .why-layout > div:first-child { position: static !important; }
        }
        @media (max-width: 700px) {
          .container { padding: 0 18px; }
          section h1 { line-height: 1.38 !important; }
          .fb-grid { grid-template-columns: 1fr !important; }
          .why-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
