import React, { useState, useEffect, useRef } from 'react';
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

/* ── Animated quote-mark canvas — mirrors About sphere canvas ── */
function QuoteCanvas({ isAr }) {
  const ref = useRef(null);
  const raf = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    const W = 200, H = 200;
    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const alpha = 0.06 + 0.02 * Math.sin(t);
      ctx.font = `900 160px "Playfair Display", serif`;
      ctx.fillStyle = `rgba(108,99,255,${alpha + 0.04})`;
      ctx.textAlign = isAr ? 'right' : 'left';
      ctx.fillText('"', isAr ? W - 10 : 10, 160);
      t += 0.025;
      raf.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, [isAr]);
  return (
    <canvas ref={ref} width={200} height={200}
      style={{ position: 'absolute', top: 40, [isAr ? 'right' : 'left']: 60, pointerEvents: 'none' }} />
  );
}

/* ── Avatar orbit ring — same rings as About sphere ── */
function AvatarOrb({ initial }) {
  return (
    <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0 }}>
      {/* Orbit ring */}
      <div style={{
        position: 'absolute', inset: -6,
        borderRadius: '50%',
        border: '1px solid rgba(108,99,255,0.2)',
        animation: 'tAvRing 8s linear infinite',
      }} />
      {/* Dot on ring */}
      <div style={{
        position: 'absolute', top: -8, left: '50%',
        width: 6, height: 6, borderRadius: '50%',
        background: '#00C2FF',
        boxShadow: '0 0 8px rgba(0,194,255,0.7)',
        transformOrigin: '0 40px',
        animation: 'tAvDot 8s linear infinite',
      }} />
      {/* Avatar circle */}
      <div style={{
        width: 52, height: 52,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(0,194,255,0.3), rgba(108,99,255,0.1))',
        border: '1px solid rgba(0,194,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, fontWeight: 700, color: '#00C2FF',
        fontFamily: 'Playfair Display, serif',
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
      }}>
        {initial}
      </div>
    </div>
  );
}

/* ── Floating particles ── */
function TestiParticles() {
  const pts = Array.from({ length: 14 }, (_, i) => ({
    size: Math.random() * 2.5 + 0.8,
    left: Math.random() * 100,
    dur: 12 + Math.random() * 12,
    delay: -Math.random() * 18,
    key: i,
  }));
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {pts.map(p => (
        <div key={p.key} style={{
          position: 'absolute',
          width: p.size, height: p.size, borderRadius: '50%',
          background: 'rgba(0,194,255,0.4)',
          left: `${p.left}%`,
          animation: `tParticle ${p.dur}s linear ${p.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}

export default function Testimonials({ lang }) {
  useAnimate();
  const tx = testimonialsData[lang] || testimonialsData.ar;
  const [active, setActive] = useState(0);
  const [animState, setAnimState] = useState('in'); // 'in' | 'out'
  const isAr = lang === 'ar';

  const goTo = (idx) => {
    if (idx === active) return;
    setAnimState('out');
    setTimeout(() => {
      setActive(idx);
      setAnimState('in');
    }, 320);
  };

  const current = tx.items[active];

  return (
    <section id="testimonials" className="section"
      style={{ background: 'var(--bmc-dark)', position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(0,194,255,0.3), transparent)',
      }} />

      <TestiParticles />

      {/* Animated quote canvas */}
      <QuoteCanvas isAr={isAr} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-header-anim" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 64px' }}>
          <p className="section-label">{tx.label}</p>
          <h2 className="section-title">{tx.title} <span>{tx.titleSpan}</span></h2>
          <div className="gold-line gold-line-animate" style={{ margin: '24px auto' }} />
          <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.5)', lineHeight: 1.8 }}>{tx.subtitle}</p>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Card */}
          <div
            style={{
              background: 'var(--bmc-dark-2)',
              border: '1px solid rgba(108,99,255,0.2)',
              padding: '52px 56px',
              position: 'relative',
              marginBottom: 40,
              overflow: 'hidden',
              opacity: animState === 'in' ? 1 : 0,
              transform: animState === 'in' ? 'translateY(0)' : 'translateY(18px)',
              transition: 'opacity 0.32s ease, transform 0.32s ease',
            }}
          >
            {/* Left accent */}
            <div style={{
              position: 'absolute', top: 0,
              left: isAr ? 'auto' : 0,
              right: isAr ? 0 : 'auto',
              width: 4, height: '100%',
              background: 'linear-gradient(to bottom, #6C63FF, #00C2FF, transparent)',
            }} />

            {/* Top glow — mirrors About sphere radial gradient */}
            <div style={{
              position: 'absolute', top: -40, left: '50%',
              transform: 'translateX(-50%)',
              width: 300, height: 200, borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(108,99,255,0.12) 0%, rgba(0,194,255,0.06) 50%, transparent 70%)',
              pointerEvents: 'none',
              animation: 'tCardGlow 5s ease-in-out infinite',
            }} />

            {/* Stars */}
            <svg width="0" height="0" style={{position:'absolute'}}>
              <defs>
                <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6C63FF"/>
                  <stop offset="100%" stopColor="#00C2FF"/>
                </linearGradient>
              </defs>
            </svg>
            <div style={{ display: 'flex', gap: 4, marginBottom: 28 }}>
              {Array.from({ length: current.rating }).map((_, idx) => (
                <svg key={idx} width="18" height="18" viewBox="0 0 24 24"
                  fill="#00C2FF" stroke="none"
                  style={{ animation: `tStarIn 0.4s ease ${idx * 0.06}s both` }}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>

            <blockquote style={{
              fontSize: 18, color: 'rgba(245,240,232,0.8)',
              lineHeight: 2, fontStyle: 'italic',
              margin: '0 0 36px',
              fontFamily: 'Cairo, sans-serif',
            }}>
              "{current.text}"
            </blockquote>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <AvatarOrb initial={current.name[0]} />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 2 }}>
                  {current.name}
                </div>
                <div style={{ fontSize: 13, color: '#00C2FF', fontWeight: 600 }}>
                  {current.role}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="testi-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
            <button
              onClick={() => goTo((active - 1 + tx.items.length) % tx.items.length)}
              className="testi-arrow"
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'transparent', border: '1px solid rgba(0,194,255,0.3)',
                color: '#00C2FF', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(108,99,255,0.1)'; e.currentTarget.style.borderColor = '#00C2FF'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0,194,255,0.3)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={isAr ? 'M9 18l6-6-6-6' : 'M15 18l-6-6 6-6'} />
              </svg>
            </button>

            <div className="testi-dots" style={{ display: 'flex', gap: 8 }}>
              {tx.items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="testi-dot"
                  data-active={i === active ? 'true' : 'false'}
                  style={{ border: 'none', cursor: 'pointer' }}
                />
              ))}
            </div>

            <button
              onClick={() => goTo((active + 1) % tx.items.length)}
              className="testi-arrow"
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'transparent', border: '1px solid rgba(0,194,255,0.3)',
                color: '#00C2FF', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(108,99,255,0.1)'; e.currentTarget.style.borderColor = '#00C2FF'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0,194,255,0.3)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={isAr ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tParticle {
          0%   { transform: translateY(110%); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { transform: translateY(-10%); opacity: 0; }
        }
        @keyframes tCardGlow {
          0%,100% { opacity: .5; transform: translateX(-50%) scale(1); }
          50%     { opacity: 1;  transform: translateX(-50%) scale(1.2); }
        }
        @keyframes tStarIn {
          from { opacity: 0; transform: scale(0.4) rotate(-20deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes tAvRing  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);   } }
        @keyframes tAvDot   { from { transform: rotate(0deg);   } to { transform: rotate(360deg);   } }

        .testi-dots {
          width: min(520px, 72vw);
          justify-content: center;
          flex-wrap: wrap;
          row-gap: 8px;
          padding: 6px 2px;
        }
        .testi-dot {
          width: 28px;
          height: 28px;
          border-radius: 999px;
          background: transparent;
          display: grid;
          place-items: center;
          transition: transform 0.25s ease;
          flex: 0 0 auto;
        }
        .testi-dot::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(0,194,255,0.25);
          transition: width 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .testi-dot[data-active="true"]::before {
          width: 18px;
          background: #00C2FF;
          box-shadow: 0 0 14px rgba(0,194,255,0.35);
        }
        @media (max-width: 768px) {
          #testimonials .container > div:last-child > div:first-child { padding: 36px 28px !important; }
          .testi-nav { gap: 14px !important; }
          .testi-arrow { width: 34px !important; height: 34px !important; }
          .testi-dots { width: min(420px, 62vw); }
          .testi-dot { width: 26px; height: 26px; }
          .testi-dot::before { width: 7px; height: 7px; }
          .testi-dot[data-active="true"]::before { width: 16px; }
        }
        @media (max-width: 420px) {
          .testi-nav { gap: 10px !important; }
          .testi-arrow { width: 32px !important; height: 32px !important; }
          .testi-dots { width: min(320px, 58vw); }
          .testi-dot { width: 24px; height: 24px; }
          .testi-dot::before { width: 6px; height: 6px; }
          .testi-dot[data-active="true"]::before { width: 14px; }
        }
      `}</style>
    </section>
  );
}
