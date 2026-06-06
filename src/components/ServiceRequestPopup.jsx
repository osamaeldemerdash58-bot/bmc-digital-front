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
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
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
        WebkitOverflowScrolling: 'touch',
        padding: '30px 16px',
      }}
    >
      {/* هذا الـ wrapper الداخلي بيخلي الـ modal يتمركز حتى لو الـ content أطول من الشاشة */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          minHeight: '100%',
        }}
      >
        <div
          className="service-request-modal"
          onClick={(e) => e.stopPropagation()}
          style={{
            width: 'min(980px, 100%)',
            background: 'linear-gradient(180deg, rgba(14,20,30,0.98) 0%, rgba(8,11,16,0.98) 100%)',
            border: '1px solid rgba(0,194,255,0.18)',
            borderRadius: 18,
            boxShadow: '0 30px 70px rgba(0,0,0,0.55), 0 0 48px rgba(0,194,255,0.12)',
            position: 'relative',
            margin: 'auto 0',
          }}
        >
          {/* زرار X - داخل الـ modal بشكل صح في كل الوضعيات */}
          <button
            type="button"
            aria-label={isAr ? 'إغلاق' : 'Close'}
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 12,
              [isAr ? 'left' : 'right']: 12,
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid rgba(0,194,255,0.3)',
              background: 'rgba(13,17,23,0.95)',
              color: '#00C2FF',
              fontSize: 20,
              lineHeight: 1,
              cursor: 'pointer',
              zIndex: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4), 0 0 12px rgba(0,194,255,0.15)',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(0,194,255,0.15)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4), 0 0 18px rgba(0,194,255,0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(13,17,23,0.95)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4), 0 0 12px rgba(0,194,255,0.15)';
            }}
          >
            ×
          </button>

          {/* الـ content بدون scroll - الـ overlay هو اللي بيعمل scroll */}
          <div
            className="service-request-modal-scroll"
            style={{
              padding: '60px 30px 30px',
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
                padding: 56px 16px 24px !important;
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