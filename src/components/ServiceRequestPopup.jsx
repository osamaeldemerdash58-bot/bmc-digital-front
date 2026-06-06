import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    const scrollY = window.scrollY;
    // بنحفظ الـ scrollY في data attribute عشان نرجعله بعدين
    document.body.dataset.scrollY = scrollY;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      const savedY = parseInt(document.body.dataset.scrollY || '0', 10);
      delete document.body.dataset.scrollY;
      window.scrollTo(0, savedY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);



  const modal = open ? (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5,8,7,0.78)',
        backdropFilter: 'blur(3px)',
        zIndex: 99999,
        overflowY: 'auto',
        overflowX: 'hidden',
        // مهم جداً على iOS عشان الـ scroll يشتغل داخل الـ overlay
        WebkitOverflowScrolling: 'touch',
        padding: '40px 16px',
      }}
    >
      {/* wrapper داخلي بـ minHeight عشان الـ flex centering يشتغل حتى لو الـ content أطول */}
      <div
        style={{
          minHeight: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="service-request-modal"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: 'min(980px, 100%)',
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
              زرار X - داخل الـ modal تماماً
              top: 12   ← المسافة من فوق     (ديسك توب)
              right: 12 ← المسافة من اليمين  (ديسك توب)
              للموبايل غيّر في @media أسفل
          ============================== */}
          <button
            type="button"
            className="close-btn"
            aria-label={isAr ? 'إغلاق' : 'Close'}
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 12,                          /* ← غيّر الرقم ده - ديسك توب */
              [isAr ? 'left' : 'right']: 12,   /* ← أو الرقم ده - ديسك توب */
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

          {/* محتوى الـ modal - بدون scroll هنا، الـ overlay هو اللي بيعمل scroll */}
          <div
            className="service-request-modal-scroll"
            style={{
              padding: '58px 30px 30px',
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
            @media (max-width: 520px) {
              .service-request-modal {
                border-radius: 14px !important;
              }
              .service-request-modal-scroll {
                padding: 54px 16px 24px !important;
              }
              .service-request-modal .close-btn {
                top: 12px !important;    /* ← غيّر الرقم ده - موبايل */
                right: 12px !important;  /* ← أو الرقم ده - موبايل */
              }
            }
          `}</style>
        </div>
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