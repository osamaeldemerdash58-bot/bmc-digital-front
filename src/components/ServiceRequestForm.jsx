import React, { useState } from 'react';
import { postAPI } from '../api';

const inputStyle = {
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
  boxSizing: 'border-box',
};

export default function ServiceRequestForm({ lang, preselectedService }) {
  const isAr = lang === 'ar';

  const labels = {
    sectionTitle: isAr ? 'طلب خدمة' : 'Request a Service',
    sectionSubtitle: isAr
      ? 'أخبرنا بما تحتاجه وسنتواصل معك في أقرب وقت'
      : 'Tell us what you need and we will get back to you shortly',
    contactMethod: isAr ? 'التواصل' : 'Contact Method',
    contactMethodPlaceholder: isAr ? 'واتساب / إيميل / تيليجرام...' : 'WhatsApp / Email / Telegram...',
    fullName: isAr ? 'الاسم الكامل' : 'Full Name',
    fullNamePlaceholder: isAr ? 'أدخل اسمك الكامل' : 'Enter your full name',
    phone: isAr ? 'رقم التليفون' : 'Phone Number',
    phonePlaceholder: isAr ? 'مثال: 0501234567' : 'e.g. +966501234567',
    service: isAr ? 'ما الذي تريده؟' : 'What do you need?',
    servicePlaceholder: isAr ? 'اختر الخدمة المطلوبة' : 'Select the desired service',
    serviceOptions: [
      { value: 'web', label: isAr ? 'تطوير موقع إلكتروني' : 'Website Development' },
      { value: 'ecommerce', label: isAr ? 'تطوير متجر إلكتروني' : 'E-Commerce Development' },
      { value: 'mobile', label: isAr ? 'تطوير تطبيق موبايل' : 'Mobile App Development' },
      { value: 'erp', label: isAr ? 'نظام ERP / إدارة' : 'ERP / Management System' },
      { value: 'uiux', label: isAr ? 'تصميم UI/UX' : 'UI/UX Design' },
      { value: 'ai', label: isAr ? 'حلول الذكاء الاصطناعي' : 'AI Solutions' },
      { value: 'other', label: isAr ? 'أخرى' : 'Other' },
    ],
    details: isAr ? 'اكتب طلبك بالتفصيل' : 'Describe your request in detail',
    detailsPlaceholder: isAr
      ? 'صف مشروعك أو ما تحتاجه بأكبر قدر من التفاصيل...'
      : 'Describe your project or needs in as much detail as possible...',
    extra: isAr ? 'معلومات إضافية (اختياري)' : 'Additional Information (Optional)',
    extraPlaceholder: isAr
      ? 'ميزانيتك التقريبية، الوقت المتوقع، أي تفاصيل أخرى...'
      : 'Your approximate budget, expected timeline, any other details...',
    submit: isAr ? 'إرسال الطلب' : 'Send Request',
    successTitle: isAr ? 'تم استلام طلبك!' : 'Request Received!',
    successMsg: isAr
      ? 'شكراً لك، سنراجع طلبك ونتواصل معك في أقرب وقت ممكن.'
      : 'Thank you! We will review your request and get back to you as soon as possible.',
    required: isAr ? '(إجباري)' : '(Required)',
    optional: isAr ? '(اختياري)' : '(Optional)',
  };

  const [form, setForm] = useState({
    contact: '',
    name: '',
    phone: '',
    service: preselectedService || '',
    details: '',
    extra: '',
  });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await postAPI('/orders', {
        name: form.name,
        phone: form.phone,
        contact: form.contact,
        service: form.service,
        details: form.details,
        extra: form.extra,
      });
      setSent(true);
    } catch (err) {
      setError(isAr ? 'حدث خطأ، حاول مرة أخرى' : 'Error occurred, please try again');
    }
    setSending(false);
  };

  const getFieldStyle = (fieldName) => ({
    ...inputStyle,
    borderColor: focusedField === fieldName ? 'rgba(184,164,114,0.5)' : 'rgba(184,164,114,0.2)',
  });

  if (sent) {
    return (
      <div style={{
        background: 'rgba(184,164,114,0.06)',
        border: '1px solid rgba(184,164,114,0.25)',
        padding: '64px 40px',
        textAlign: 'center',
        borderRadius: 2,
      }}>
        <div style={{
          width: 72,
          height: 72,
          margin: '0 auto 24px',
          borderRadius: '50%',
          background: 'rgba(184,164,114,0.1)',
          border: '1px solid rgba(184,164,114,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--bmc-gold)" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--bmc-gold)', marginBottom: 12 }}>
          {labels.successTitle}
        </h3>
        <p style={{ color: 'rgba(245,240,232,0.6)', lineHeight: 1.8, maxWidth: 400, margin: '0 auto' }}>
          {labels.successMsg}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* Contact Method - Required */}
      <div>
        <label style={{ display: 'block', fontSize: 13, color: 'rgba(245,240,232,0.6)', marginBottom: 8, fontWeight: 600 }}>
          {labels.contactMethod} <span style={{ color: 'var(--bmc-gold)', fontSize: 11 }}>{labels.required}</span>
        </label>
        <input
          type="text"
          placeholder={labels.contactMethodPlaceholder}
          value={form.contact}
          required
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          onFocus={() => setFocusedField('contact')}
          onBlur={() => setFocusedField(null)}
          style={getFieldStyle('contact')}
        />
      </div>

      {/* Name + Phone row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, color: 'rgba(245,240,232,0.6)', marginBottom: 8, fontWeight: 600 }}>
            {labels.fullName} <span style={{ color: 'var(--bmc-gold)', fontSize: 11 }}>{labels.required}</span>
          </label>
          <input
            type="text"
            placeholder={labels.fullNamePlaceholder}
            value={form.name}
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            style={getFieldStyle('name')}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: 13, color: 'rgba(245,240,232,0.6)', marginBottom: 8, fontWeight: 600 }}>
            {labels.phone} <span style={{ color: 'var(--bmc-gold)', fontSize: 11 }}>{labels.required}</span>
          </label>
          <input
            type="tel"
            placeholder={labels.phonePlaceholder}
            value={form.phone}
            required
            dir="ltr"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
            style={{ ...getFieldStyle('phone'), textAlign: isAr ? 'right' : 'left' }}
          />
        </div>
      </div>

      {/* Service select */}
      <div>
        <label style={{ display: 'block', fontSize: 13, color: 'rgba(245,240,232,0.6)', marginBottom: 8, fontWeight: 600 }}>
          {labels.service} <span style={{ color: 'var(--bmc-gold)', fontSize: 11 }}>{labels.required}</span>
        </label>
        <select
          value={form.service}
          required
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          onFocus={() => setFocusedField('service')}
          onBlur={() => setFocusedField(null)}
          style={{
            ...getFieldStyle('service'),
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23B8A472' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: isAr ? 'left 16px center' : 'right 16px center',
          }}
        >
          <option value="" disabled style={{ background: '#0A0E0D' }}>{labels.servicePlaceholder}</option>
          {labels.serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ background: '#0A0E0D' }}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Details */}
      <div>
        <label style={{ display: 'block', fontSize: 13, color: 'rgba(245,240,232,0.6)', marginBottom: 8, fontWeight: 600 }}>
          {labels.details} <span style={{ color: 'var(--bmc-gold)', fontSize: 11 }}>{labels.required}</span>
        </label>
        <textarea
          placeholder={labels.detailsPlaceholder}
          value={form.details}
          required
          rows={5}
          onChange={(e) => setForm({ ...form, details: e.target.value })}
          onFocus={() => setFocusedField('details')}
          onBlur={() => setFocusedField(null)}
          style={{ ...getFieldStyle('details'), resize: 'vertical' }}
        />
      </div>

      {/* Extra - Optional */}
      <div>
        <label style={{ display: 'block', fontSize: 13, color: 'rgba(245,240,232,0.6)', marginBottom: 8, fontWeight: 600 }}>
          {labels.extra} <span style={{ color: 'rgba(245,240,232,0.35)', fontSize: 11 }}>{labels.optional}</span>
        </label>
        <textarea
          placeholder={labels.extraPlaceholder}
          value={form.extra}
          rows={3}
          onChange={(e) => setForm({ ...form, extra: e.target.value })}
          onFocus={() => setFocusedField('extra')}
          onBlur={() => setFocusedField(null)}
          style={{ ...getFieldStyle('extra'), resize: 'vertical' }}
        />
      </div>

      {error && <p style={{ color: '#e74c3c', fontSize: 13, textAlign: 'center' }}>{error}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={sending}
        style={{
          background: 'var(--bmc-gold)',
          color: 'var(--bmc-dark)',
          border: 'none',
          padding: '16px 32px',
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'Cairo, sans-serif',
          cursor: sending ? 'not-allowed' : 'pointer',
          letterSpacing: 0.5,
          borderRadius: 2,
          transition: 'all 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          opacity: sending ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          if (!sending) {
            e.currentTarget.style.background = '#D4C48F';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(184,164,114,0.35)';
          }
        }}
        onMouseLeave={(e) => {
          if (!sending) {
            e.currentTarget.style.background = 'var(--bmc-gold)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }
        }}
      >
        {sending ? (isAr ? 'جاري الإرسال...' : 'Sending...') : labels.submit}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      <style>{`
        @media (max-width: 600px) {
          form > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}