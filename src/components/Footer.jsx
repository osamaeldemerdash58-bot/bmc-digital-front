import React from 'react';
import './Footer.css';
import logoImg from '../assets/WhatsApp_Image_2026-03-30_at_2.52.18_PM-removebg-preview.png';

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

/* Payment brand logos via CDN */
const paymentMethods = [
  {
    name: 'Tabby',
    img: 'https://cdn.tabby.ai/assets/tabby-badge.svg',
    fallback: null,
    useImg: false,
    label: 'tabby',
  },
  {
    name: 'Mada',
    useImg: true,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Mada_Logo.svg/200px-Mada_Logo.svg.png',
    label: 'mada',
  },
  {
    name: 'Apple Pay',
    useImg: true,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/200px-Apple_Pay_logo.svg.png',
    label: 'apple pay',
  },
  {
    name: 'Mastercard',
    useImg: true,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png',
    label: 'mastercard',
  },
  {
    name: 'Visa',
    useImg: true,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png',
    label: 'visa',
  },
  {
    name: 'PayPal',
    useImg: true,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png',
    label: 'paypal',
  },
  {
    name: 'Stripe',
    useImg: true,
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/200px-Stripe_Logo%2C_revised_2016.svg.png',
    label: 'stripe',
  },
];

export default function Footer({ lang }) {
  const year = new Date().getFullYear();

  const links = lang === 'ar'
    ? ['من نحن', 'خدماتنا', 'أعمالنا', 'منهجيتنا', 'تواصل معنا']
    : ['About', 'Services', 'Works', 'Process', 'Contact'];

  const hrefs = ['#about', '#services', '#works', '#process', '#contact'];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo-mark" dir="ltr">
                <span>B</span><span className="footer-logo-mid">M</span><span>C</span>
              </div>
              <p className="footer-brand-name">
                {lang === 'ar' ? 'شركة BMC Digital' : 'BMC Digital Agency'}
              </p>
              <p className="footer-tagline">
                {lang === 'ar'
                  ? 'نبني حلول رقمية متقدمة تجمع بين التصميم المميز، الأداء العالي، وتجربة مستخدم احترافية.'
                  : 'We build advanced digital solutions that combine elegant design, high performance, and professional UX.'}
              </p>
              <div className="footer-logo-wrap">
                <img src={logoImg} alt="BMC Digital Logo" className="footer-logo-img" />
              </div>
            </div>

            <div className="footer-col">
              <h4>{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
              <ul>
                {links.map((l, i) => (
                  <li key={i}>
                    <a href={hrefs[i]}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <h4>{lang === 'ar' ? 'أهم الخدمات' : 'Top Services'}</h4>
              <ul>
                <li><a href="#services">{lang === 'ar' ? 'تطوير المواقع' : 'Website Development'}</a></li>
                <li><a href="#services">{lang === 'ar' ? 'المتاجر الإلكترونية' : 'E-Commerce'}</a></li>
                <li><a href="#services">{lang === 'ar' ? 'تطوير التطبيقات' : 'Mobile Apps'}</a></li>
                <li><a href="#services">{lang === 'ar' ? 'تصميم UI/UX' : 'UI/UX Design'}</a></li>
                <li><a href="#services">{lang === 'ar' ? 'حلول الذكاء الاصطناعي' : 'AI Solutions'}</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</h4>
              <ul className="footer-contact-list">
                <li>
                  <span className="fc-icon"><PhoneIcon /></span>
                  <span>+966 50 000 0000</span>
                </li>
                <li>
                  <span className="fc-icon"><MailIcon /></span>
                  <span>hello@bmc-digital.com</span>
                </li>
                <li>
                  <span className="fc-icon"><PinIcon /></span>
                  <span>{lang === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
                </li>
              </ul>

              <div className="footer-map-wrap">
                <a
                  href="https://maps.app.goo.gl/PPaGaxxoxC5pzrFq8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-map-link"
                  aria-label={lang === 'ar' ? 'افتح الموقع على خرائط جوجل' : 'Open location on Google Maps'}
                >
                  <iframe
                    title="BMC Location"
                    src="https://www.google.com/maps?q=24.771376,46.623678&z=15&output=embed"
                    width="100%"
                    height="190"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <span className="footer-map-cta">
                    {lang === 'ar' ? 'افتح في خرائط جوجل' : 'Open in Google Maps'}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Payment Methods Bar ── */}
      <div className="footer-payments">
        <div className="container">
          <div className="footer-payments-inner">
            <span className="footer-payments-label">
              {lang === 'ar' ? 'وسائل الدفع المقبولة' : 'Accepted Payments'}
            </span>
            <div className="footer-payments-icons">
              {paymentMethods.map((pm) => (
                <span key={pm.name} className="payment-badge" title={pm.name}>
                  <img
                    src={pm.img}
                    alt={pm.name}
                    className="payment-logo"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-row">
            <p>© {year} BMC Digital. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>
            <div className="footer-reg">{lang === 'ar' ? 'الرياض - المملكة العربية السعودية' : 'Riyadh - Saudi Arabia'}</div>
            <a href="https://ufuq-digital.com/" target="_blank" rel="noopener noreferrer" className="ufuq-badge">
              CREATED BY UFUQ-DIGITAL
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}