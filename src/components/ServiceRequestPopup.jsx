import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ServiceRequestForm from './ServiceRequestForm';
import SnakeButton from './SnakeButton';

export default function ServiceRequestPopup({
  lang,
  title,
  subtitle,
  preselectedService,
  open: controlledOpen,
  onOpenChange,
  hideLauncher = false,
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = (next) => {
    if (typeof onOpenChange === 'function') onOpenChange(next);
    else setUncontrolledOpen(next);
  };
  const isAr = lang === 'ar';
  const scrollRef = useRef(null);

  // ── 1. body lock ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    // حفظ الـ scrollY قبل أي حاجة
    const scrollY = window.scrollY || window.pageYOffset;

    // inject style مرة واحدة بس
    const styleId = 'sr-body-lock-style';
    if (!document.getElementById(styleId)) {
      const s = document.createElement('style');
      s.id = styleId;
      s.textContent = `
        .sr-locked { overflow: hidden !important; }
        .sr-body-locked {
          position: fixed !important;
          width: 100% !important;
          top: var(--sr-scroll-y) !important;
          left: 0 !important;
        }
      `;
      document.head.appendChild(s);
    }

    document.documentElement.style.setProperty('--sr-scroll-y', `-${scrollY}px`);
    document.documentElement.classList.add('sr-locked');
    document.body.classList.add('sr-locked', 'sr-body-locked');

    return () => {
      document.documentElement.classList.remove('sr-locked');
      document.body.classList.remove('sr-locked', 'sr-body-locked');
      document.documentElement.style.removeProperty('--sr-scroll-y');
      window.scrollTo({ top: scrollY, behavior: 'instant' });
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  // ── 2. منع scroll الصفحة من جوا الـ modal (desktop wheel) ──────────────────
  useEffect(() => {
    if (!open) return undefined;
    const el = scrollRef.current;
    if (!el) return undefined;

    const onWheel = (e) => {
      e.stopPropagation();
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop    = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
      if (!atTop && !atBottom) e.preventDefault();
      el.scrollTop += e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [open]);

  // ── 3. منع scroll الصفحة من جوا الـ modal (touch) ──────────────────────────
  useEffect(() => {
    if (!open) return undefined;
    const el = scrollRef.current;
    if (!el) return undefined;

    let startY = 0;

    const onTouchStart = (e) => {
      startY = e.touches[0]?.clientY ?? 0;
    };

    const onTouchMove = (e) => {
      const deltaY = (e.touches[0]?.clientY ?? 0) - startY;
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop    = scrollTop <= 0 && deltaY > 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && deltaY < 0;
      if (atTop || atBottom) e.preventDefault();
    };

    // أي touch برا الـ scrollRef → امنعه
    const onDocTouch = (e) => {
      if (!el.contains(e.target)) e.preventDefault();
    };

    el.addEventListener('touchstart',  onTouchStart,  { passive: true });
    el.addEventListener('touchmove',   onTouchMove,   { passive: false });
    document.addEventListener('touchmove', onDocTouch, { passive: false });

    return () => {
      el.removeEventListener('touchstart',  onTouchStart);
      el.removeEventListener('touchmove',   onTouchMove);
      document.removeEventListener('touchmove', onDocTouch);
    };
  }, [open]);

  const modal = open ? (
    <div
      className="sr-overlay"
      onClick={() => setOpen(false)}
      style={{
        // الـ overlay مش بيعمل scroll — هو بس backdrop
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(5,8,7,0.78)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
      }}
    >
      <div
        className="sr-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(980px, 100%)',
          // الـ modal نفسه بـ height ثابتة — 90% من الـ viewport
          height: '90dvh',
          maxHeight: '90dvh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, rgba(14,20,30,0.98) 0%, rgba(8,11,16,0.98) 100%)',
          border: '1px solid rgba(0,194,255,0.18)',
          borderRadius: 18,
          boxShadow: '0 30px 70px rgba(0,0,0,0.55), 0 0 48px rgba(0,194,255,0.12)',
          overflow: 'hidden', // الـ modal نفسه مش بيعمل scroll
        }}
      >
        {/* زرار X */}
        <button
          type="button"
          aria-label={isAr ? 'إغلاق' : 'Close'}
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            top: 12,
            [isAr ? 'left' : 'right']: 12,
            width: 34,
            height: 34,
            flexShrink: 0,
            borderRadius: '50%',
            border: '1px solid rgba(0,194,255,0.3)',
            background: 'rgba(13,17,23,0.95)',
            color: '#00C2FF',
            fontSize: 20,
            cursor: 'pointer',
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0,194,255,0.18)';
            e.currentTarget.style.borderColor = 'rgba(0,194,255,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(13,17,23,0.95)';
            e.currentTarget.style.borderColor = 'rgba(0,194,255,0.3)';
          }}
        >
          ×
        </button>

        {/* منطقة الـ Scroll الوحيدة */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            padding: '28px 30px 30px',
            scrollbarColor: 'rgba(0,194,255,0.45) rgba(255,255,255,0.05)',
            scrollbarWidth: 'thin',
          }}
        >
          <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 10, paddingInlineEnd: 40 }}>
            {title}
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.6)', marginBottom: 26, lineHeight: 1.8 }}>
            {subtitle}
          </p>
          <div style={{
            width: 76, height: 3, borderRadius: 999,
            background: 'linear-gradient(90deg, #00C2FF 0%, rgba(108,99,255,0.55) 55%, transparent 100%)',
            marginBottom: 28,
          }} />
          <ServiceRequestForm lang={lang} preselectedService={preselectedService} />
        </div>

        <style>{`
          .sr-modal > div::-webkit-scrollbar { width: 6px; }
          .sr-modal > div::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 999px; }
          .sr-modal > div::-webkit-scrollbar-thumb { background: rgba(0,194,255,0.35); border-radius: 999px; }
          .sr-modal > div::-webkit-scrollbar-thumb:hover { background: rgba(0,194,255,0.55); }

          @media (max-width: 520px) {
            .sr-overlay { padding: calc(12px + env(safe-area-inset-top)) 8px calc(12px + env(safe-area-inset-bottom)) !important; }
            .sr-modal {
              height: calc(100dvh - 24px - env(safe-area-inset-top) - env(safe-area-inset-bottom)) !important;
              max-height: none !important;
              border-radius: 14px !important;
            }
            .sr-modal > div { padding: 20px 16px 24px !important; }
            .sr-modal > div h3 { font-size: 18px !important; margin-bottom: 6px !important; }
            .sr-modal > div p  { margin-bottom: 12px !important; }
          }
        `}</style>
      </div>
    </div>
  ) : null;

  return (
    <>
      {!hideLauncher && (
        <div
          style={{
            background: 'var(--bmc-dark-3)',
            border: '1px solid rgba(108,99,255,0.15)',
            padding: '40px 36px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 10 }}>
            {title}
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.5)', marginBottom: 28, lineHeight: 1.8 }}>
            {subtitle}
          </p>
          <SnakeButton
            as="button"
            type="button"
            onClick={() => setOpen(true)}
            className="snake-btn"
            snakeOptions={{ speed: 0.0035, tailLength: 0.2, lineWidth: 2 }}
            style={{
              background: 'linear-gradient(135deg, #1A1A4E 0%, #0A3080 100%)',
              color: '#fff',
              border: 'none',
              padding: '14px 30px',
              fontSize: 15,
              fontWeight: 700,
              fontFamily: 'Cairo, sans-serif',
              cursor: 'pointer',
              letterSpacing: 0.4,
              borderRadius: 50,
              transition: 'all 0.3s',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              boxShadow: '0 10px 24px rgba(0,194,255,0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--btn-gradient-hover)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 14px 28px rgba(0,194,255,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--btn-gradient)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,194,255,0.25)';
            }}
          >
            {isAr ? 'طلب الخدمة' : 'Request Service'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </SnakeButton>
        </div>
      )}

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}