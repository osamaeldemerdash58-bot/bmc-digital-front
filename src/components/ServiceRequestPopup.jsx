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
  const preventBackgroundScroll = (e) => {
    e.preventDefault();
  };
  const handleModalWheel = (e) => {
    const scrollEl = e.currentTarget.querySelector('.service-request-modal-scroll');
    if (!scrollEl) return;

    e.preventDefault();
    e.stopPropagation();
    scrollEl.scrollTop += e.deltaY;
  };

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyWidth = document.body.style.width;
    const originalBodyTop = document.body.style.top;
    const scrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.width = originalBodyWidth;
      document.body.style.top = originalBodyTop;
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const modal = open ? (
    <div
      onClick={() => setOpen(false)}
      onWheel={preventBackgroundScroll}
      onTouchMove={preventBackgroundScroll}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(5,8,7,0.78)',
        backdropFilter: 'blur(3px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 16px',
      }}
    >
      <div
        className="service-request-modal"
        onClick={(e) => e.stopPropagation()}
        onWheel={handleModalWheel}
        onTouchMove={(e) => e.stopPropagation()}
        style={{
          width: 'min(980px, 100%)',
          maxHeight: '92vh',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(14,20,30,0.98) 0%, rgba(8,11,16,0.98) 100%)',
          border: '1px solid rgba(0,194,255,0.18)',
          borderRadius: 18,
          boxShadow: '0 30px 70px rgba(0,0,0,0.55), 0 0 48px rgba(0,194,255,0.12)',
          padding: 0,
          position: 'relative',
        }}
      >
        <button
          type="button"
          aria-label={isAr ? 'إغلاق' : 'Close'}
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            top: 0,
            [isAr ? 'left' : 'right']: 0,
            width: 40,
            height: 40,
            borderRadius: '0 0 14px 14px',
            border: '1px solid rgba(0,194,255,0.25)',
            background: 'linear-gradient(145deg, rgba(13,17,23,0.98), rgba(20,29,41,0.98))',
            color: '#00C2FF',
            fontSize: 22,
            lineHeight: 1,
            cursor: 'pointer',
            zIndex: 3,
            boxShadow: '0 12px 28px rgba(0,0,0,0.45), 0 0 18px rgba(0,194,255,0.18)',
            transform: isAr ? 'translate(-100%, 0)' : 'translate(100%, 0)',
          }}
        >
          ×
        </button>

        <div
          className="service-request-modal-scroll"
          style={{
            maxHeight: '92vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            touchAction: 'pan-y',
            padding: '72px 30px 30px',
            scrollbarColor: 'rgba(0,194,255,0.55) rgba(255,255,255,0.06)',
            scrollbarWidth: 'thin',
          }}
        >
          <h3
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: 'var(--bmc-white)',
              marginBottom: 10,
              paddingLeft: isAr ? 52 : 0,
              paddingRight: isAr ? 0 : 52,
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
              paddingLeft: isAr ? 52 : 0,
              paddingRight: isAr ? 0 : 52,
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
          .service-request-modal-scroll::-webkit-scrollbar { width: 10px; }
          .service-request-modal-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.06); border-radius: 999px; }
          .service-request-modal-scroll::-webkit-scrollbar-thumb { background: rgba(0,194,255,0.35); border-radius: 999px; }
          .service-request-modal-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0,194,255,0.55); }

          @media (max-width: 520px) {
            .service-request-modal { max-height: 94vh !important; border-radius: 16px !important; }
            .service-request-modal-scroll { max-height: 94vh !important; padding: 80px 16px 22px !important; }
            .service-request-modal button[aria-label="Close"],
            .service-request-modal button[aria-label="إغلاق"] {
              top: 0 !important;
              width: 32px !important;
              height: 32px !important;
              font-size: 18px !important;
              border-radius: 0 0 10px 10px !important;
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
