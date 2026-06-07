import React, { useState } from 'react';
import { postAPI } from '../api';

const inputStyle = {
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(108,99,255,0.2)',
  padding: '14px 20px',
  color: 'var(--bmc-white)',
  fontSize: 14,
  fontFamily: 'Cairo, sans-serif',
  outline: 'none',
  borderRadius: 8,
  transition: 'border-color 0.3s',
  width: '100%',
  boxSizing: 'border-box',
};

const SERVICE_FIELD_SCHEMAS = {
  web: [
    {
      key: 'documentType',
      type: 'select',
      required: true,
      label: { ar: 'نوع الوثيقة', en: 'Document Type' },
      placeholder: { ar: 'اختر نوع الوثيقة', en: 'Select document type' },
      options: [
        { value: 'commercial_registration', ar: 'سجل تجاري', en: 'Commercial Registration' },
        { value: 'freelance_document', ar: 'وثيقة عمل حر', en: 'Freelance Document' },
        { value: 'none', ar: 'لا يوجد', en: 'None' },
      ],
    },
    {
      key: 'websiteType',
      type: 'select',
      required: true,
      label: { ar: 'نوع الموقع الإلكتروني', en: 'Website Type' },
      placeholder: { ar: 'اختر نوع الموقع الإلكتروني', en: 'Select website type' },
      options: [
        { value: 'business_website', ar: 'موقع تعريفي', en: 'Business Website' },
        { value: 'online_store', ar: 'متجر إلكتروني', en: 'Online Store' },
        { value: 'existing_website_update', ar: 'تعديل على موقع قائم بالفعل', en: 'Update Existing Website' },
        { value: 'service_provider_website', ar: 'موقع مقدّم خدمات', en: 'Service Provider Website' },
      ],
    },
  ],
  ecommerce: [
    {
      key: 'documentType',
      type: 'select',
      required: true,
      label: { ar: 'نوع الوثيقة', en: 'Document Type' },
      placeholder: { ar: 'اختر نوع الوثيقة', en: 'Select document type' },
      options: [
        { value: 'commercial_registration', ar: 'سجل تجاري', en: 'Commercial Registration' },
        { value: 'freelance_document', ar: 'وثيقة عمل حر', en: 'Freelance Document' },
        { value: 'none', ar: 'لا يوجد', en: 'None' },
      ],
    },
    {
      key: 'storeType',
      type: 'select',
      required: true,
      label: { ar: 'نوع المتجر الإلكتروني', en: 'Online Store Type' },
      placeholder: { ar: 'اختر نوع المتجر', en: 'Select store type' },
      options: [
        { value: 'new_store', ar: 'متجر إلكتروني جديد', en: 'New Online Store' },
        { value: 'existing_store_update', ar: 'تعديل على متجر قائم بالفعل', en: 'Update Existing Store' },
        { value: 'marketplace', ar: 'متجر متعدد البائعين', en: 'Marketplace' },
        { value: 'platform_setup', ar: 'إعداد متجر على منصة جاهزة', en: 'Platform Store Setup' },
      ],
    },
  ],
  mobile: [
    {
      key: 'documentType',
      type: 'select',
      required: true,
      label: { ar: 'نوع الوثيقة', en: 'Document Type' },
      placeholder: { ar: 'اختر نوع الوثيقة', en: 'Select document type' },
      options: [
        { value: 'commercial_registration', ar: 'سجل تجاري', en: 'Commercial Registration' },
        { value: 'freelance_document', ar: 'وثيقة عمل حر', en: 'Freelance Document' },
        { value: 'none', ar: 'لا يوجد', en: 'None' },
      ],
    },
    {
      key: 'appType',
      type: 'select',
      required: false,
      label: { ar: 'نوع التطبيق', en: 'App Type' },
      placeholder: { ar: 'اختر', en: 'Select' },
      options: [
        { value: 'business', ar: 'تطبيق أعمال', en: 'Business App' },
        { value: 'ecommerce', ar: 'متجر / بيع منتجات', en: 'Store / E-Commerce' },
        { value: 'delivery', ar: 'توصيل', en: 'Delivery' },
        { value: 'booking', ar: 'حجز', en: 'Booking' },
        { value: 'other', ar: 'أخرى', en: 'Other' },
      ],
    },
    {
      key: 'platforms',
      type: 'select',
      required: true,
      label: { ar: 'منصات التطبيق', en: 'App Platforms' },
      placeholder: { ar: 'اختر', en: 'Select' },
      options: [
        { value: 'ios', ar: 'iOS', en: 'iOS' },
        { value: 'android', ar: 'Android', en: 'Android' },
        { value: 'both', ar: 'iOS + Android', en: 'iOS + Android' },
      ],
    },
  ],
  erp: [
    {
      key: 'industry',
      type: 'text',
      required: true,
      label: { ar: 'مجال النشاط', en: 'Industry' },
      placeholder: { ar: 'مثال: مقاولات / تجارة / خدمات', en: 'e.g. Construction / Retail / Services' },
    },
    {
      key: 'usersCount',
      type: 'number',
      required: false,
      label: { ar: 'عدد المستخدمين (تقريباً)', en: 'Estimated Users' },
      placeholder: { ar: 'مثال: 25', en: 'e.g. 25' },
      min: 0,
    },
    {
      key: 'modules',
      type: 'text',
      required: true,
      label: { ar: 'الموديولات المطلوبة', en: 'Required Modules' },
      placeholder: { ar: 'محاسبة، مخزون، موارد بشرية، مبيعات...', en: 'Accounting, Inventory, HR, Sales...' },
    },
    {
      key: 'integrations',
      type: 'text',
      required: false,
      label: { ar: 'تكاملات (اختياري)', en: 'Integrations (optional)' },
      placeholder: { ar: 'بوابات دفع، نقاط بيع، أنظمة أخرى...', en: 'Payments, POS, other systems...' },
    },
  ],
  uiux: [
    {
      key: 'documentType',
      type: 'select',
      required: true,
      label: { ar: 'نوع الوثيقة', en: 'Document Type' },
      placeholder: { ar: 'اختر نوع الوثيقة', en: 'Select document type' },
      options: [
        { value: 'commercial_registration', ar: 'سجل تجاري', en: 'Commercial Registration' },
        { value: 'freelance_document', ar: 'وثيقة عمل حر', en: 'Freelance Document' },
        { value: 'none', ar: 'لا يوجد', en: 'None' },
      ],
    },
    {
      key: 'designType',
      type: 'select',
      required: true,
      label: { ar: 'نوع التصميم', en: 'Design Type' },
      placeholder: { ar: 'اختر نوع التصميم', en: 'Select design type' },
      options: [
        { value: 'website_ui', ar: 'تصميم موقع إلكتروني', en: 'Website UI Design' },
        { value: 'store_ui', ar: 'تصميم متجر إلكتروني', en: 'Online Store UI Design' },
        { value: 'mobile_app_ui', ar: 'تصميم تطبيق موبايل', en: 'Mobile App UI Design' },
        { value: 'brand_identity', ar: 'هوية بصرية', en: 'Brand Identity' },
      ],
    },
  ],
  ai: [
    {
      key: 'documentType',
      type: 'select',
      required: true,
      label: { ar: 'نوع الوثيقة', en: 'Document Type' },
      placeholder: { ar: 'اختر نوع الوثيقة', en: 'Select document type' },
      options: [
        { value: 'commercial_registration', ar: 'سجل تجاري', en: 'Commercial Registration' },
        { value: 'freelance_document', ar: 'وثيقة عمل حر', en: 'Freelance Document' },
        { value: 'none', ar: 'لا يوجد', en: 'None' },
      ],
    },
    {
      key: 'marketingServiceType',
      type: 'select',
      required: true,
      label: { ar: 'نوع خدمة التسويق', en: 'Marketing Service Type' },
      placeholder: { ar: 'اختر نوع الخدمة', en: 'Select service type' },
      options: [
        { value: 'campaign_management', ar: 'إدارة حملات إعلانية', en: 'Ad Campaign Management' },
        { value: 'social_media_management', ar: 'إدارة حسابات السوشيال ميديا', en: 'Social Media Management' },
        { value: 'content_plan', ar: 'خطة محتوى وتسويق', en: 'Content and Marketing Plan' },
        { value: 'seo', ar: 'تحسين محركات البحث SEO', en: 'SEO' },
      ],
    },
  ],
  consulting: [
    {
      key: 'documentType',
      type: 'select',
      required: true,
      label: { ar: 'نوع الوثيقة', en: 'Document Type' },
      placeholder: { ar: 'اختر نوع الوثيقة', en: 'Select document type' },
      options: [
        { value: 'commercial_registration', ar: 'سجل تجاري', en: 'Commercial Registration' },
        { value: 'freelance_document', ar: 'وثيقة عمل حر', en: 'Freelance Document' },
        { value: 'none', ar: 'لا يوجد', en: 'None' },
      ],
    },
    {
      key: 'consultingType',
      type: 'select',
      required: true,
      label: { ar: 'نوع الاستشارة', en: 'Consulting Type' },
      placeholder: { ar: 'اختر نوع الاستشارة', en: 'Select consulting type' },
      options: [
        { value: 'digital_transformation', ar: 'تحول رقمي', en: 'Digital Transformation' },
        { value: 'technical_support', ar: 'دعم تقني', en: 'Technical Support' },
        { value: 'maintenance', ar: 'صيانة وتطوير', en: 'Maintenance and Development' },
        { value: 'security', ar: 'أمن معلومات', en: 'Information Security' },
      ],
    },
  ],
  other: [
    {
      key: 'whatDoYouNeed',
      type: 'text',
      required: false,
      label: { ar: 'ما الذي تحتاجه تحديداً؟', en: 'What exactly do you need?' },
      placeholder: { ar: 'اكتب نوع الخدمة المطلوبة', en: 'Describe the needed service' },
    },
  ],
};

export default function ServiceRequestForm({ lang, preselectedService }) {
  const isAr = lang === 'ar';

  const labels = {
    sectionTitle: isAr ? 'طلب خدمة' : 'Request a Service',
    sectionSubtitle: isAr
      ? 'أخبرنا بما تحتاجه وسنتواصل معك في أقرب وقت'
      : 'Tell us what you need and we will get back to you shortly',
    contactMethod: isAr ? 'التواصل' : 'Contact Method',
    contactMethodPlaceholder: isAr ? '' : '',
    fullName: isAr ? 'الاسم الكامل' : 'Full Name',
    fullNamePlaceholder: isAr ? '' : '',
    phone: isAr ? 'رقم التليفون' : 'Phone Number',
    phonePlaceholder: isAr ? '' : '',
    service: isAr ? 'ما الذي تريده؟' : 'What do you need?',
    servicePlaceholder: isAr ? 'اختر الخدمة المطلوبة' : 'Select the desired service',
    serviceOptions: [
      { value: 'web', label: isAr ? 'تطوير موقع إلكتروني' : 'Website Development' },
      { value: 'ecommerce', label: isAr ? 'تطوير متجر إلكتروني' : 'E-Commerce Development' },
      { value: 'mobile', label: isAr ? 'تطوير تطبيق موبايل' : 'Mobile App Development' },
      { value: 'erp', label: isAr ? 'نظام ERP / إدارة' : 'ERP / Management System' },
      { value: 'uiux', label: isAr ? 'تصميم UI/UX' : 'UI/UX Design' },
      { value: 'ai', label: isAr ? 'التسويق الرقمي' : 'Digital Marketing' },
      { value: 'consulting', label: isAr ? 'استشارات تقنية ودعم' : 'Tech Consulting & Support' },
      { value: 'other', label: isAr ? 'أخرى' : 'Other' },
    ],
    details: isAr ? 'معلومات إضافية' : 'Additional Information',
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
  const [serviceFields, setServiceFields] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const serviceSchema = SERVICE_FIELD_SCHEMAS[form.service] || [];
  const pickText = (value) => (isAr ? value?.ar : value?.en) || '';
  const cleanFields = (obj) => Object.fromEntries(
    Object.entries(obj || {}).filter(([, v]) => {
      if (v === null || v === undefined) return false;
      if (typeof v === 'string') return v.trim() !== '';
      return true;
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await postAPI('/orders', {
        name: form.name,
        phone: form.phone,
        contact: form.phone,
        service: form.service,
        formType: form.service,
        fields: cleanFields(serviceFields),
        details: form.extra || form.details || (isAr ? 'لا توجد معلومات إضافية' : 'No additional information'),
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
    borderColor: focusedField === fieldName ? 'rgba(0,194,255,0.5)' : 'rgba(108,99,255,0.2)',
  });

  const renderServiceField = (field) => {
    const id = `sf_${field.key}`;
    const value = serviceFields[field.key] ?? '';
    const label = pickText(field.label);
    const placeholder = pickText(field.placeholder);
    const common = {
      value,
      required: Boolean(field.required),
      onChange: (e) => setServiceFields((prev) => ({ ...prev, [field.key]: e.target.value })),
      onFocus: () => setFocusedField(id),
      onBlur: () => setFocusedField(null),
    };

    if (field.type === 'textarea') {
      return (
        <textarea
          rows={4}
          placeholder={placeholder}
          {...common}
          style={{ ...getFieldStyle(id), resize: 'vertical' }}
        />
      );
    }

    if (field.type === 'select') {
      return (
        <select
          {...common}
          style={{
            ...getFieldStyle(id),
            cursor: 'pointer',
            appearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23B8A472' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: isAr ? 'left 16px center' : 'right 16px center',
          }}
        >
          <option value="" disabled style={{ background: '#0D1117' }}>{placeholder}</option>
          {(field.options || []).map((opt) => (
            <option key={opt.value} value={opt.value} style={{ background: '#0D1117' }}>
              {pickText(opt)}
            </option>
          ))}
        </select>
      );
    }

    const inputType = field.type === 'url' ? 'url' : field.type === 'number' ? 'number' : 'text';
    return (
      <input
        type={inputType}
        placeholder={placeholder}
        min={typeof field.min === 'number' ? field.min : undefined}
        {...common}
        style={getFieldStyle(id)}
      />
    );
  };

  if (sent) {
    return (
      <div style={{
        background: 'rgba(108,99,255,0.06)',
        border: '1px solid rgba(0,194,255,0.25)',
        padding: '64px 40px',
        textAlign: 'center',
        borderRadius: 50,
      }}>
        <div style={{
          width: 72,
          height: 72,
          margin: '0 auto 24px',
          borderRadius: '50%',
          background: 'rgba(108,99,255,0.1)',
          border: '1px solid rgba(0,194,255,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00C2FF" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: '#00C2FF', marginBottom: 12 }}>
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

      {/* Name + Phone row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: 13, color: 'rgba(245,240,232,0.6)', marginBottom: 8, fontWeight: 600 }}>
            {labels.fullName} <span style={{ color: '#00C2FF', fontSize: 11 }}>{labels.required}</span>
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
            {labels.phone} <span style={{ color: '#00C2FF', fontSize: 11 }}>{labels.required}</span>
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
          {labels.service} <span style={{ color: '#00C2FF', fontSize: 11 }}>{labels.required}</span>
        </label>
        <select
          value={form.service}
          required
          onChange={(e) => {
            const next = e.target.value;
            setForm({ ...form, service: next });
            setServiceFields({});
          }}
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
          <option value="" disabled style={{ background: '#0D1117' }}>{labels.servicePlaceholder}</option>
          {labels.serviceOptions.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ background: '#0D1117' }}>{opt.label}</option>
          ))}
        </select>
      </div>

      {serviceSchema.length > 0 && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {serviceSchema.map((field) => (
              <div key={field.key} style={{ gridColumn: field.type === 'textarea' ? '1 / -1' : 'auto' }}>
                <label style={{ display: 'block', fontSize: 13, color: 'rgba(245,240,232,0.6)', marginBottom: 8, fontWeight: 600 }}>
                  {pickText(field.label)}{' '}
                  {field.required ? <span style={{ color: '#00C2FF', fontSize: 11 }}>{labels.required}</span> : null}
                </label>
                {renderServiceField(field)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div>
        <label style={{ display: 'block', fontSize: 13, color: 'rgba(245,240,232,0.6)', marginBottom: 8, fontWeight: 600 }}>
          {labels.extra}
        </label>
        <textarea
          placeholder={labels.extraPlaceholder}
          value={form.extra}
          rows={5}
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
          background: sending ? 'rgba(0,194,255,0.5)' : 'var(--btn-gradient)',
          color: '#fff',
          border: 'none',
          padding: '16px 32px',
          fontSize: 15,
          fontWeight: 700,
          fontFamily: 'Cairo, sans-serif',
          cursor: sending ? 'not-allowed' : 'pointer',
          letterSpacing: 0.5,
          borderRadius: 50,
          transition: 'all 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          opacity: sending ? 0.7 : 1,
          boxShadow: '0 6px 20px rgba(0,194,255,0.3)',
        }}
        onMouseEnter={(e) => {
          if (!sending) {
            e.currentTarget.style.background = 'linear-gradient(135deg, #2A2A6E 0%, #1A4090 100%)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 28px rgba(0,194,255,0.6), 0 0 60px rgba(108,99,255,0.35), inset 0 1px 0 rgba(0,194,255,0.25)';
          }
        }}
        onMouseLeave={(e) => {
          if (!sending) {
            e.currentTarget.style.background = 'var(--btn-gradient)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,194,255,0.3)';
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
          form div[style*="gridTemplateColumns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
