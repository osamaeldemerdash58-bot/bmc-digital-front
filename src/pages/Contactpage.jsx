import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import ServiceRequestPopup from '../components/ServiceRequestPopup';
import { useReveal } from '../hooks/useReveal';

const contactData = {
  ar: {
    badge: 'تواصل معنا',
    title: 'نحن هنا',
    titleSpan: 'لمساعدتك',
    subtitle: 'سواء كان لديك مشروع في ذهنك أو مجرد استفسار، فريقنا مستعد للرد عليك.',
    formTitle: 'أرسل لنا طلبك',
    formSubtitle: 'املأ النموذج وسنتواصل معك في أقرب وقت ممكن.',
    directContact: 'تواصل مباشر',
    phone: '+966 50 000 0000',
    email: 'hello@bmc-digital.com',
    phoneLbl: 'الهاتف',
    emailLbl: 'البريد الإلكتروني',
    whatsappLbl: 'واتساب',
    whatsapp: '+966 50 000 0000',
  },
  en: {
    badge: 'Contact Us',
    title: "We're Here",
    titleSpan: 'to Help You',
    subtitle: 'Whether you have a project in mind or just a question, our team is ready to respond.',
    formTitle: 'Send Us Your Request',
    formSubtitle: 'Fill out the form and we will get back to you as soon as possible.',
    directContact: 'Direct Contact',
    phone: '+966 50 000 0000',
    email: 'hello@bmc-digital.com',
    phoneLbl: 'Phone',
    emailLbl: 'Email',
    whatsappLbl: 'WhatsApp',
    whatsapp: '+966 50 000 0000',
  },
};

const contactIcons = {
  phone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  ),
  email: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  whatsapp: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.526 5.855L0 24l6.335-1.502A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0" />
    </svg>
  ),
};

export default function ContactPage({ lang, setLang }) {
  useReveal();
  const tx = contactData[lang] || contactData.ar;

  const contactItems = [
    { icon: contactIcons.phone, label: tx.phoneLbl, value: tx.phone, href: `tel:${tx.phone.replace(/\s/g, '')}` },
    { icon: contactIcons.email, label: tx.emailLbl, value: tx.email, href: `mailto:${tx.email}` },
    { icon: contactIcons.whatsapp, label: tx.whatsappLbl, value: tx.whatsapp, href: `https://wa.me/${tx.whatsapp.replace(/\D/g, '')}` },
  ];

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />

      {/* Hero */}
      <section style={{
        minHeight: '40vh',
        background: 'linear-gradient(135deg, #0A0E0D 0%, #0F1512 100%)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 110,
        paddingBottom: 64,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(184,164,114,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(184,164,114,0.1)', border: '1px solid rgba(184,164,114,0.25)',
            padding: '6px 16px', borderRadius: 20, marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--bmc-gold)', display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: 'var(--bmc-gold)', fontWeight: 600, letterSpacing: 1 }}>{tx.badge}</span>
          </div>

          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 900, lineHeight: 1.1, marginBottom: 20,
          }}>
            <span style={{ color: 'var(--bmc-white)', display: 'block' }}>{tx.title}</span>
            <span style={{
              background: 'linear-gradient(135deg, #D4C48F, #B8A472)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontStyle: 'normal',
            }}>{tx.titleSpan}</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(245,240,232,0.55)', maxWidth: 520, lineHeight: 1.8 }}>
            {tx.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ background: 'var(--bmc-dark-2)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 80, alignItems: 'start' }}>

            {/* Left: direct contact */}
            <div className="reveal">
              <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--bmc-white)', marginBottom: 8 }}>
                {tx.directContact}
              </h2>
              <div className="gold-line" style={{ marginBottom: 36 }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {contactItems.map((c, i) => (
                  <a
                    key={i}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '20px 24px',
                      background: 'var(--bmc-dark)',
                      border: '1px solid rgba(184,164,114,0.1)',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      borderRadius: 2,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(184,164,114,0.35)'; e.currentTarget.style.background = 'var(--bmc-dark-3)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(184,164,114,0.1)'; e.currentTarget.style.background = 'var(--bmc-dark)'; }}
                  >
                    <div style={{
                      width: 44, height: 44,
                      border: '1px solid rgba(184,164,114,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--bmc-gold)', flexShrink: 0, borderRadius: 2,
                    }}>
                      {c.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>
                        {c.label}
                      </div>
                      <div style={{ fontSize: 15, color: 'rgba(245,240,232,0.8)', fontWeight: 600 }} dir="ltr">
                        {c.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <ServiceRequestPopup
                lang={lang}
                title={tx.formTitle}
                subtitle={tx.formSubtitle}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} />
      <WhatsAppFloat lang={lang} />

      <style>{`
        @media (max-width: 900px) {
          section:nth-of-type(2) .container > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </>
  );
}
