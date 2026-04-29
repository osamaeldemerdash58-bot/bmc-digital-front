import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ServiceRequestForm from './ServiceRequestForm';

export default function ServiceRequestPopup({ lang, title, subtitle, preselectedService }) {
  const [open, setOpen] = useState(false);
  const isAr = lang === 'ar';

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(980px, 100%)',
          maxHeight: '92vh',
          overflowY: 'auto',
          background: 'linear-gradient(180deg, #111614 0%, #0C1110 100%)',
          border: '1px solid rgba(184,164,114,0.24)',
          boxShadow: '0 30px 70px rgba(0,0,0,0.5)',
          padding: '34px 30px 30px',
          position: 'relative',
        }}
      >
        <button
          type="button"
          aria-label={isAr ? 'إغلاق' : 'Close'}
          onClick={() => setOpen(false)}
          style={{
            position: 'absolute',
            top: 14,
            [isAr ? 'left' : 'right']: 14,
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid rgba(184,164,114,0.25)',
            background: 'rgba(184,164,114,0.08)',
            color: 'var(--bmc-gold)',
            fontSize: 22,
            lineHeight: 1,
            cursor: 'pointer',
          }}
        >
          ×
        </button>

        <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 10 }}>
          {title}
        </h3>
        <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.6)', marginBottom: 26, lineHeight: 1.8 }}>
          {subtitle}
        </p>
        <div className="gold-line" style={{ marginBottom: 28 }} />
        <ServiceRequestForm lang={lang} preselectedService={preselectedService} />
      </div>
    </div>
  ) : null;

  return (
    <>
      <div
        style={{
          background: 'var(--bmc-dark-3)',
          border: '1px solid rgba(184,164,114,0.15)',
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
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #D4C48F 0%, #B8A472 100%)',
            color: 'var(--bmc-dark)',
            border: 'none',
            padding: '14px 30px',
            fontSize: 15,
            fontWeight: 700,
            fontFamily: 'Cairo, sans-serif',
            cursor: 'pointer',
            letterSpacing: 0.4,
            borderRadius: 4,
            transition: 'all 0.3s',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            boxShadow: '0 10px 24px rgba(184,164,114,0.25)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 14px 28px rgba(184,164,114,0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 24px rgba(184,164,114,0.25)';
          }}
        >
          {isAr ? 'طلب الخدمة' : 'Request Service'}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {modal ? createPortal(modal, document.body) : null}
    </>
  );
}
