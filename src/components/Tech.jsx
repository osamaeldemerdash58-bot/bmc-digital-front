// ═══════════════════════════════════════════════
// Tech.jsx
// ═══════════════════════════════════════════════
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import '../animations.css';

const TECH_ICON_MAP = {
  react: 'react', 'next.js': 'nextdotjs', nextjs: 'nextdotjs',
  'node.js': 'nodedotjs', nodejs: 'nodedotjs', typescript: 'typescript',
  javascript: 'javascript', github: 'github',
  mongodb: 'mongodb', postgresql: 'postgresql', docker: 'docker',
  tailwind: 'tailwindcss', 'tailwind css': 'tailwindcss', figma: 'figma',
  firebase: 'firebase', aws: 'amazonaws', 'react native': 'react',
  vite: 'vite', angular: 'angular', svelte: 'svelte',
  vue: 'vuedotjs', 'vue.js': 'vuedotjs', laravel: 'laravel',
  nuxt: 'nuxtdotjs', 'nuxt.js': 'nuxtdotjs', remix: 'remix',
  astro: 'astro', electron: 'electron', sass: 'sass',
  storybook: 'storybook', playwright: 'playwright', shopify: 'shopify',
  ember: 'emberdotjs', 'ember.js': 'emberdotjs',
};

const COLS      = 12;
const GAP       = 10;
const BG_RATIO  = 0.80;
const CARD_RATIO = 0.62;
const MOBILE_BP = 768;
const PINNED_TOP_TECHS = [
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'GitHub', color: '#FFFFFF' },
];

/* مدة الـ glow — 3 ثانية ثبات ثم 2.5 ثانية تلاشي ناعم */
const GLOW_HOLD_MS  = 3000;
const GLOW_FADE_MS  = 2500;  // ← طوّلنا التلاشي

function getCellSize() {
  if (typeof window === 'undefined') return 100;
  return Math.floor((window.innerWidth - GAP * (COLS - 1)) / COLS);
}

function isMobile() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BP;
}

function normalizeTechName(name = '') { return name.trim().toLowerCase(); }
function getTechIconUrl(tech) {
  if (tech?.icon && /^(https?:\/\/|\/)/.test(tech.icon)) return tech.icon;
  const slug = TECH_ICON_MAP[normalizeTechName(tech?.name)];
  return slug ? `https://cdn.simpleicons.org/${slug}` : '';
}

/* ══════════════════════════════════════════════
   BgGrid — ديسكتوب فقط، 4 صفوف
   ══════════════════════════════════════════════ */
function BgGrid({ cellSize }) {
  const bgSize = Math.round(cellSize * BG_RATIO);
  const total  = COLS * 4;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'grid',
      gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
      gridTemplateRows:    `repeat(4, ${cellSize}px)`,
      gap: GAP,
      pointerEvents: 'none',
      zIndex: 0,
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 75%, transparent 100%)',
      maskImage:        'linear-gradient(to right, transparent 0%, black 8%, black 75%, transparent 100%)',
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: bgSize, height: bgSize,
            background: 'var(--bmc-dark-2, #131a24)',
            borderRadius: 12,
          }} />
        </div>
      ))}
    </div>
  );
}

/* ── Stagger ── */
function useStaggerReveal(ref) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const cards = Array.from(container.querySelectorAll('.tech-icon-card'));
    cards.forEach(c => {
      c.style.opacity = '0';
      c.style.transform = 'scale(0.72) translateY(40px)';
    });
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        io.unobserve(entry.target);
        cards.forEach((card, i) => {
          setTimeout(() => {
            card.style.transition =
              'opacity 0.55s cubic-bezier(0.34,1.56,0.64,1), transform 0.55s cubic-bezier(0.34,1.56,0.64,1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, i * 120);
        });
      });
    }, { threshold: 0.05 });
    io.observe(container);
    return () => io.disconnect();
  }, [ref]);
}

/* ══════════════════════════════════════════════
   TechCard — ديسكتوب
   التوهج يطلع من المربع الخلفي
   ══════════════════════════════════════════════ */
function TechCard({ tech, cellSize }) {
  const iconUrl   = getTechIconUrl(tech);
  const holdTimer = useRef(null);
  const fadeTimer = useRef(null);

  /* glowLevel: 0=مطفي، 1=شاغل */
  const bgRef   = useRef(null);
  const isOnRef = useRef(false);

  const applyGlow = useCallback((on) => {
    const el = bgRef.current;
    if (!el) return;
    if (on) {
      /* ظهور سريع */
      el.style.transition = `
        background 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease
      `;
      el.style.background   = `color-mix(in srgb, ${tech.color}25, var(--bmc-dark-2, #131a24))`;
      el.style.borderColor  = `${tech.color}55`;
      el.style.boxShadow    = `0 0 12px 3px ${tech.color}50, 0 0 28px 8px ${tech.color}22, inset 0 0 10px ${tech.color}12`;
    } else {
      /* تلاشي ناعم وطويل */
      el.style.transition = `
        background ${GLOW_FADE_MS}ms cubic-bezier(0.4,0,0.2,1),
        border-color ${GLOW_FADE_MS}ms cubic-bezier(0.4,0,0.2,1),
        box-shadow ${GLOW_FADE_MS}ms cubic-bezier(0.4,0,0.2,1)
      `;
      el.style.background   = 'var(--bmc-dark-2, #131a24)';
      el.style.borderColor  = 'transparent';
      el.style.boxShadow    = 'none';
    }
  }, [tech.color]);

  const triggerGlow = useCallback(() => {
    clearTimeout(holdTimer.current);
    clearTimeout(fadeTimer.current);
    if (!isOnRef.current) {
      isOnRef.current = true;
      applyGlow(true);
    }
    holdTimer.current = setTimeout(() => {
      isOnRef.current = false;
      applyGlow(false);
    }, GLOW_HOLD_MS);
  }, [applyGlow]);

  useEffect(() => () => {
    clearTimeout(holdTimer.current);
    clearTimeout(fadeTimer.current);
  }, []);

  const bgSize   = Math.round(cellSize * BG_RATIO);
  const cardSize = Math.round(cellSize * CARD_RATIO);
  const ringSize = Math.round(cardSize * 0.60);
  const iconSize = Math.round(cardSize * 0.38);
  const fontSize = Math.round(cardSize * 0.26);
  const nameSize = Math.max(8, Math.round(cardSize * 0.13));

  return (
    <div
      style={{
        width: cellSize, height: cellSize,
        position: 'relative', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onMouseEnter={triggerGlow}
      onClick={triggerGlow}
    >
      {/* المربع الخلفي — التوهج يطلع منه */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          width: bgSize, height: bgSize,
          borderRadius: 12,
          background: 'var(--bmc-dark-2, #131a24)',
          border: '1px solid transparent',
          boxShadow: 'none',
        }}
      />

      {/* الأيقون بدون مربع */}
      <div
        className="tech-icon-card"
        style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: Math.round(cardSize * 0.10),
          opacity: 0,
          transform: 'scale(0.72) translateY(40px)',
          width: cardSize, height: cardSize,
        }}
      >
        <div style={{
          width: ringSize, height: ringSize,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          background: `${tech.color}18`,
          border: `1px solid ${tech.color}35`,
        }}>
          {iconUrl ? (
            <img
              src={iconUrl} alt={tech.name} loading="lazy"
              style={{
                width: iconSize, height: iconSize,
                objectFit: 'contain', display: 'block',
                filter: 'drop-shadow(0 0 4px rgba(184,164,114,0.28))',
              }}
              onError={e => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling)
                  e.currentTarget.nextElementSibling.style.display = 'block';
              }}
            />
          ) : null}
          <span style={{
            display: iconUrl ? 'none' : 'block',
            fontSize, fontWeight: 900,
            fontFamily: 'Playfair Display, Georgia, serif',
            color: tech.color, lineHeight: 1,
          }}>
            {(tech.name || '?')[0]}
          </span>
        </div>

        <div style={{
          fontSize: nameSize, fontWeight: 600,
          color: 'rgba(245,240,232,0.45)',
          letterSpacing: '0.3px', textAlign: 'center',
          maxWidth: bgSize - 8,
          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          lineHeight: 1,
        }}>
          {tech.name}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MobileTechCard — بدون مربعات خلفية فاضية
   wrapper خاص + glow ناعم
   ══════════════════════════════════════════════ */
function MobileTechCard({ tech, cardSize }) {
  const iconUrl   = getTechIconUrl(tech);
  const holdTimer = useRef(null);
  const bgRef     = useRef(null);
  const isOnRef   = useRef(false);

  const applyGlow = useCallback((on) => {
    const el = bgRef.current;
    if (!el) return;
    if (on) {
      el.style.transition   = 'background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease';
      el.style.background   = `color-mix(in srgb, ${tech.color}25, var(--bmc-dark-2, #131a24))`;
      el.style.borderColor  = `${tech.color}55`;
      el.style.boxShadow    = `0 0 10px 2px ${tech.color}44, inset 0 0 8px ${tech.color}10`;
    } else {
      el.style.transition   = `background ${GLOW_FADE_MS}ms cubic-bezier(0.4,0,0.2,1), border-color ${GLOW_FADE_MS}ms cubic-bezier(0.4,0,0.2,1), box-shadow ${GLOW_FADE_MS}ms cubic-bezier(0.4,0,0.2,1)`;
      el.style.background   = 'var(--bmc-dark-2, #131a24)';
      el.style.borderColor  = 'rgba(184,164,114,0.08)';
      el.style.boxShadow    = 'none';
    }
  }, [tech.color]);

  const triggerGlow = useCallback(() => {
    clearTimeout(holdTimer.current);
    if (!isOnRef.current) { isOnRef.current = true; applyGlow(true); }
    holdTimer.current = setTimeout(() => { isOnRef.current = false; applyGlow(false); }, GLOW_HOLD_MS);
  }, [applyGlow]);

  useEffect(() => () => clearTimeout(holdTimer.current), []);

  const ringSize = Math.round(cardSize * 0.55);
  const iconSize = Math.round(cardSize * 0.33);
  const nameSize = Math.max(8, Math.round(cardSize * 0.14));

  return (
    <div
      className="tech-icon-card"
      style={{
        position: 'relative',
        opacity: 0,
        transform: 'scale(0.72) translateY(40px)',
      }}
      onMouseEnter={triggerGlow}
      onClick={triggerGlow}
    >
      {/* المربع الخاص بالموبايل */}
      <div
        ref={bgRef}
        style={{
          width: cardSize, height: cardSize,
          background: 'var(--bmc-dark-2, #131a24)',
          border: '1px solid rgba(184,164,114,0.08)',
          borderRadius: 14,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: Math.round(cardSize * 0.09),
          cursor: 'default',
        }}
      >
        <div style={{
          width: ringSize, height: ringSize,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: `${tech.color}18`,
          border: `1px solid ${tech.color}35`,
        }}>
          {iconUrl ? (
            <img
              src={iconUrl} alt={tech.name} loading="lazy"
              style={{
                width: iconSize, height: iconSize,
                objectFit: 'contain', display: 'block',
                filter: 'drop-shadow(0 0 4px rgba(184,164,114,0.25))',
              }}
              onError={e => {
                e.currentTarget.style.display = 'none';
                if (e.currentTarget.nextElementSibling)
                  e.currentTarget.nextElementSibling.style.display = 'block';
              }}
            />
          ) : null}
          <span style={{
            display: iconUrl ? 'none' : 'block',
            fontSize: Math.round(cardSize * 0.22), fontWeight: 900,
            fontFamily: 'Playfair Display, Georgia, serif',
            color: tech.color, lineHeight: 1,
          }}>
            {(tech.name || '?')[0]}
          </span>
        </div>
        <div style={{
          fontSize: nameSize, fontWeight: 600,
          color: 'rgba(245,240,232,0.45)',
          letterSpacing: '0.3px', textAlign: 'center',
          maxWidth: cardSize - 8,
          overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          lineHeight: 1,
        }}>
          {tech.name}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Component رئيسي
   ══════════════════════════════════════════════ */
export function Tech({ lang }) {
  useAnimate();
  const { data }   = useData();
  const tx         = data?.translations?.tech?.[lang] || {};
  const techs      = data?.techs || [];
  const rowsRef    = useRef(null);
  useStaggerReveal(rowsRef);

  const [cellSize,   setCellSize]   = useState(getCellSize);
  const [mobile,     setMobile]     = useState(isMobile);

  useEffect(() => {
    const onResize = () => {
      setCellSize(getCellSize());
      setMobile(isMobile());
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isPinnedTech = (techName = '') =>
    PINNED_TOP_TECHS.some((pinned) => normalizeTechName(pinned.name) === normalizeTechName(techName));
  const filteredTechs = techs.filter((tech) => !isPinnedTech(tech?.name || ''));
  const mid      = Math.ceil(filteredTechs.length / 2);
  const row1     = [...PINNED_TOP_TECHS, ...filteredTechs.slice(0, mid)];
  const row2     = filteredTechs.slice(mid);

  // ديسكتوب
  const bgH     = 4 * cellSize + 3 * GAP;
  const iconH   = 2 * cellSize + GAP;
  const offsetY = cellSize + GAP;

  // موبايل — حجم الكارد ثابت
  const mobileCardSize = 76;

  return (
    <section
      id="tech"
      className="section"
      style={{
        background: 'var(--bmc-dark)',
        position: 'relative',
        overflow: 'hidden',
        padding: '64px 0 72px',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.3), transparent)',
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div
            className="section-header-anim"
            style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 52px' }}
          >
            <p className="section-label">{tx.label}</p>
            <h2 className="section-title">
              {tx.title} <span>{tx.titleSpan}</span>
            </h2>
            <div className="gold-line gold-line-animate" style={{ margin: '20px auto' }} />
            {tx.subtitle && (
              <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.38)', lineHeight: 1.8 }}>
                {tx.subtitle}
              </p>
            )}
          </div>

          {/* ══ موبايل — wrapper بسيط بدون مربعات فاضية ══ */}
          {mobile && (
            <div
              ref={rowsRef}
              style={{
                display: 'flex', flexDirection: 'column',
                gap: 8, alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {row1.map((tech, i) => (
                  <MobileTechCard key={i} tech={tech} cardSize={mobileCardSize} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                {row2.map((tech, i) => (
                  <MobileTechCard key={i} tech={tech} cardSize={mobileCardSize} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ══ ديسكتوب — BgGrid كامل العرض ══ */}
        {!mobile && (
          <div style={{ position: 'relative', height: bgH, width: '100%', overflow: 'visible' }}>
            <BgGrid cellSize={cellSize} />
            <div
              ref={rowsRef}
              style={{
                position: 'absolute',
                top: offsetY, left: 0, right: 0,
                height: iconH,
                display: 'flex', flexDirection: 'column',
                gap: GAP, alignItems: 'center',
                zIndex: 2, overflow: 'visible',
              }}
            >
              <div style={{ display: 'flex', gap: GAP, overflow: 'visible' }}>
                {row1.map((tech, i) => (
                  <TechCard key={i} tech={tech} cellSize={cellSize} />
                ))}
              </div>
              <div style={{ display: 'flex', gap: GAP, overflow: 'visible' }}>
                {row2.map((tech, i) => (
                  <TechCard key={i} tech={tech} cellSize={cellSize} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Tech;
