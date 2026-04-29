import React, { useState } from 'react';
import { useData } from '../DataContext';
import { useAnimate } from '../hooks/useAnimate';
import { postAPI } from '../api';
import '../animations.css';

export default function Contact({ lang }) {
  useAnimate();
  const { data } = useData();
  const tx = data?.translations?.contact?.[lang] || {};
  const [form, setForm] = useState({ name: '', email: '', msg: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await postAPI('/contact', { name: form.name, email: form.email, message: form.msg });
      setSent(true);
    } catch (err) {
      setError(lang === 'ar' ? 'حدث خطأ، حاول مرة أخرى' : 'Error occurred, please try again');
    }
    setSending(false);
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--bmc-dark-2)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(184,164,114,0.3), transparent)',
      }} />

      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800, height: 800,
        background: 'radial-gradient(circle, rgba(184,164,114,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left info — slides from left */}
          <div className="contact-info">
            <p className="section-label">{tx.label}</p>
            <h2 className="section-title">{tx.title}</h2>
            <h2 className="section-title" style={{ marginBottom: 24 }}><span>{tx.titleSpan}</span></h2>
            <div className="gold-line gold-line-animate" style={{ marginBottom: 32 }} />
            <p style={{ fontSize: 15, color: 'rgba(245,240,232,0.6)', lineHeight: 2, marginBottom: 48 }}>
              {tx.subtitle}
            </p>

            {[
              { icon: '📞', label: tx.phone },
              { icon: '✉️', label: tx.email },
            ].map((c, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '20px 0',
                borderBottom: '1px solid rgba(184,164,114,0.1)',
              }}>
                <div style={{
                  width: 44, height: 44,
                  border: '1px solid rgba(184,164,114,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <span style={{ fontSize: 15, color: 'rgba(245,240,232,0.7)' }} dir="ltr">{c.label}</span>
              </div>
            ))}
          </div>

          {/* Right form — slides from right */}
          <div className="contact-form">
            {sent ? (
              <div style={{
                background: 'rgba(184,164,114,0.08)',
                border: '1px solid rgba(184,164,114,0.3)',
                padding: '60px 40px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✓</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--bmc-gold)', marginBottom: 12 }}>
                  {lang === 'ar' ? 'تم الإرسال!' : 'Message Sent!'}
                </h3>
                <p style={{ color: 'rgba(245,240,232,0.6)' }}>
                  {lang === 'ar' ? 'سنتواصل معك قريباً' : "We'll reach out soon"}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { key: 'name', placeholder: tx.namePlaceholder },
                  { key: 'email', placeholder: tx.emailPlaceholder },
                ].map((field) => (
                  <input
                    key={field.key}
                    type={field.key === 'email' ? 'email' : 'text'}
                    placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    required
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(184,164,114,0.2)',
                      padding: '14px 20px',
                      color: 'var(--bmc-white)',
                      fontSize: 14,
                      fontFamily: 'Cairo, sans-serif',
                      outline: 'none',
                      borderRadius: 2,
                      transition: 'border-color 0.3s',
                      width: '100%',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(184,164,114,0.5)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(184,164,114,0.2)')}
                  />
                ))}
                <textarea
                  placeholder={tx.msgPlaceholder}
                  value={form.msg}
                  onChange={(e) => setForm({ ...form, msg: e.target.value })}
                  required
                  rows={5}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(184,164,114,0.2)',
                    padding: '14px 20px',
                    color: 'var(--bmc-white)',
                    fontSize: 14,
                    fontFamily: 'Cairo, sans-serif',
                    outline: 'none',
                    borderRadius: 2,
                    resize: 'vertical',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(184,164,114,0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(184,164,114,0.2)')}
                />
                {error && <p style={{ color: '#e74c3c', fontSize: 13, textAlign: 'center' }}>{error}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    background: 'var(--bmc-gold)',
                    color: 'var(--bmc-dark)',
                    border: 'none',
                    padding: '16px 32px',
                    fontSize: 14, fontWeight: 700,
                    fontFamily: 'Cairo, sans-serif',
                    cursor: sending ? 'not-allowed' : 'pointer',
                    letterSpacing: 0.5, borderRadius: 2, transition: 'all 0.3s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 8, opacity: sending ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => { if (!sending) { e.currentTarget.style.background = 'var(--bmc-gold-light)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                  onMouseLeave={(e) => { if (!sending) { e.currentTarget.style.background = 'var(--bmc-gold)'; e.currentTarget.style.transform = 'translateY(0)'; } }}
                >
                  {sending ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : tx.btn}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact .container > div { grid-template-columns: 1fr !important; gap: 48px !important; }
          .contact-info, .contact-form { transform: translateX(0) translateY(40px) !important; }
        }
      `}</style>
    </section>
  );
}