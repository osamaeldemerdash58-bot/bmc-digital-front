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

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    const setVvh = () => {
      const vvNow = window.visualViewport;
      const height = vvNow && vvNow.height ? vvNow.height : window.innerHeight;
      // على موبايل نتجاهل offsetTop تماماً - الـ overlay هيكون inset:0 ثابت
      document.documentElement.style.setProperty('--sr-vv-height', `${Math.round(height)}px`);
    };

    setVvh();
    const vv = window.visualViewport;
    if (vv) {
      vv.addEventListener('resize', setVvh);
      vv.addEventListener('scroll', setVvh);
    } else {
      window.addEventListener('resize', setVvh);
    }

    // *** الـ fix الصح: بدل position:fixed على الـ body اللي بيعمل jump،
    //     نحفظ الـ scrollY ونضيف class بس - من غير ما نغير الـ top ***
    const scrollY = window.scrollY || window.pageYOffset;
    const styleId = 'sr-body-lock';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        .sr-body-locked {
          overflow: hidden !important;
          position: fixed !important;
          width: 100% !important;
          top: var(--sr-lock-top, 0px) !important;
        }
        html.sr-html-locked { overflow: hidden !important; }
      `;
      document.head.appendChild(style);
    }

    document.documentElement.style.setProperty('--sr-lock-top', `-${scrollY}px`);
    document.documentElement.classList.add('sr-html-locked');
    document.body.classList.add('sr-body-locked');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.classList.remove('sr-html-locked');
      document.body.classList.remove('sr-body-locked');
      document.documentElement.style.removeProperty('--sr-lock-top');
      // نرجع الـ scroll للمكان الصح
      window.scrollTo({ top: scrollY, behavior: 'instant' });
      window.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.removeProperty('--sr-vv-height');
      if (vv) {
        vv.removeEventListener('resize', setVvh);
        vv.removeEventListener('scroll', setVvh);
      } else {
        window.removeEventListener('resize', setVvh);
      }
    };
  }, [open]);

  /* الـ fix الحقيقي للـ scroll - نربط الـ wheel event مباشرة على الـ DOM element */
  useEffect(() => {
    if (!open) return undefined;
    const el = scrollRef.current;
    if (!el) return undefined;

    const onWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
      if (!atTop && !atBottom) {
        e.stopPropagation();
      }
      e.preventDefault();
      el.scrollTop += e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const el = scrollRef.current;
    if (!el) return undefined;

    let startY = 0;

    const onTouchStart = (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      startY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (!e.touches || e.touches.length !== 1) return;
      const currentY = e.touches[0].clientY;
      const deltaY = currentY - startY;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0 && deltaY > 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && deltaY < 0;

      if (atTop || atBottom) e.preventDefault();
    };

    const onDocumentTouchMove = (e) => {
      const target = e.target;
      if (!(target instanceof Node)) {
        e.preventDefault();
        return;
      }
      if (!el.contains(target)) e.preventDefault();
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchmove', onDocumentTouchMove, { passive: false });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchmove', onDocumentTouchMove);
    };
  }, [open]);

  const modal = open ? (
    <div
      className="service-request-modal-overlay"
      onClick={() => setOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5,8,7,0.78)',
        backdropFilter: 'blur(3px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '20px 16px 48px',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      <div
        className="service-request-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(980px, 100%)',
          maxHeight: 'calc(100dvh - 68px)',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(180deg, rgba(14,20,30,0.98) 0%, rgba(8,11,16,0.98) 100%)',
          border: '1px solid rgba(0,194,255,0.18)',
          borderRadius: 18,
          boxShadow: '0 30px 70px rgba(0,0,0,0.55), 0 0 48px rgba(0,194,255,0.12)',
          position: 'relative',
        }}
      >
        {/* ==============================
            زرار X
            top: -10   ← المسافة من فوق
            right: 5   ← المسافة من اليمين (أو left لو isAr)
            للموبايل غيّر في @media أسفل
        ============================== */}
        <button
          type="button"
          className="close-btn"
          aria-label={isAr ? 'إغلاق' : 'Close'}
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            top: -10,                         /* ← غيّر الرقم ده - ديسك توب */
            [isAr ? 'left' : 'right']: 5,    /* ← أو الرقم ده - ديسك توب */
            width: 34,
            height: 34,
             flexShrink: 0,        // ← ضيف ده
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

        {/* ==============================
            منطقة الـ Scroll
        ============================== */}
        <div
          ref={scrollRef}
          className="service-request-modal-scroll"
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            overscrollBehavior: 'contain',
            padding: '28px 30px 30px',
            scrollbarColor: 'rgba(0,194,255,0.45) rgba(255,255,255,0.05)',
            scrollbarWidth: 'thin',
          }}
        >
          <h3
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--bmc-white)',
              marginBottom: 10,
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: 14,
              color: 'rgba(245,240,232,0.6)',
              marginBottom: 26,
              lineHeight: 1.8,
            }}
          >
            {subtitle}
          </p>
          <div
            style={{
              width: 76,
              height: 3,
              borderRadius: 999,
              background: 'linear-gradient(90deg, #00C2FF 0%, rgba(108,99,255,0.55) 55%, transparent 100%)',
              marginBottom: 28,
            }}
          />
          <ServiceRequestForm lang={lang} preselectedService={preselectedService} />
        </div>

        <style>{`
          .service-request-modal-scroll::-webkit-scrollbar { width: 6px; }
          .service-request-modal-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 999px; }
          .service-request-modal-scroll::-webkit-scrollbar-thumb { background: rgba(0,194,255,0.35); border-radius: 999px; }
          .service-request-modal-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,194,255,0.55); }

          /* safe-area padding للـ overlay */
          .service-request-modal-overlay {
            padding: calc(20px + env(safe-area-inset-top)) 16px calc(48px + env(safe-area-inset-bottom)) !important;
          }

          /* الـ modal يشغل كل الـ viewport بدون vv hacks */
          .service-request-modal {
            max-height: calc(100dvh - 68px) !important;
          }

          @media (max-width: 520px) {
            .service-request-modal-overlay {
              padding: calc(26px + env(safe-area-inset-top)) 10px calc(36px + env(safe-area-inset-bottom)) !important;
              align-items: flex-start !important;
            }
            .service-request-modal {
              max-height: calc(100dvh - 46px) !important;
              border-radius: 14px !important;
              margin-top: 0 !important;
            }
            .service-request-modal-scroll {
              padding: 20px 16px 20px !important;
            }
            .service-request-modal-scroll h3 {
              font-size: 18px !important;
              margin-bottom: 6px !important;
            }
            .service-request-modal-scroll p {
              margin-bottom: 12px !important;
            }
            .service-request-modal-scroll > div:nth-child(3) {
              margin-bottom: 16px !important;
            }
            .service-request-modal .close-btn {
              top: -30px !important;
              right: -25px !important;
              left: auto !important;
            }
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