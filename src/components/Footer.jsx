import React from 'react';
import './Footer.css';
import logoImg from '../assets/WhatsApp_Image_2026-03-30_at_2.52.18_PM-removebg-preview.png';
import vatImg from '../assets/vat-QVSDUwyA.png';

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

/* ── Professional Payment Logos ── */
const TabbyLogo = () => (
  <svg viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg" height="20">
    <rect width="80" height="32" rx="4" fill="#3BBEAF"/>
    <text x="10" y="22" fontFamily="'Arial', sans-serif" fontWeight="800" fontSize="16" fill="white" letterSpacing="-0.5">tabby</text>
  </svg>
);

const MadaLogo = () => (
  <svg viewBox="0 0 80 32" xmlns="http://www.w3.org/2000/svg" height="20">
    <rect width="80" height="32" rx="4" fill="#4D4D4D"/>
    <circle cx="16" cy="16" r="10" fill="#00A651"/>
    <circle cx="30" cy="16" r="10" fill="#E31837"/>
    <path d="M16 6 Q23 16 30 6 Q23 26 16 26 Q23 16 30 26 Q23 6 16 6" fill="#FF8200" opacity="0.8"/>
    <text x="44" y="21" fontFamily="'Arial', sans-serif" fontWeight="800" fontSize="13" fill="white">mada</text>
  </svg>
);

const ApplePayLogo = () => (
  <svg viewBox="0 0 80 32" xmlns="http://www.w3.org/2000/svg" height="20">
    <rect width="80" height="32" rx="4" fill="#000"/>
    <path d="M18 8.5c-.9 1.1-2.3 1.9-3.6 1.8-.2-1.4.5-2.8 1.4-3.7.9-1 2.4-1.8 3.6-1.8.1 1.4-.4 2.8-1.4 3.7zm1.3 2.1c-2-.1-3.7 1.1-4.7 1.1-1 0-2.5-1.1-4.1-1-2.1.03-4.1 1.2-5.1 3.1-2.2 3.7-.6 9.2 1.6 12.2 1 1.5 2.3 3.1 3.9 3.1 1.6-.06 2.2-1 4-1s2.4 1 4 1c1.7-.02 2.7-1.6 3.7-3.1.7-1 1.1-2 1.5-3.1-3.7-1.5-4.3-6.9-.6-8.9-1-1.5-2.7-2.4-4.2-2.4z" fill="white" transform="scale(1.1) translate(2,1)"/>
    <text x="34" y="21" fontFamily="'-apple-system', 'Arial', sans-serif" fontWeight="500" fontSize="12" fill="white">Pay</text>
  </svg>
);

const MastercardLogo = () => (
  <svg viewBox="0 0 80 32" xmlns="http://www.w3.org/2000/svg" height="20">
    <rect width="80" height="32" rx="4" fill="#1A1A1A"/>
    <circle cx="30" cy="16" r="11" fill="#EB001B"/>
    <circle cx="50" cy="16" r="11" fill="#F79E1B"/>
    <path d="M40 7.5 Q46 16 40 24.5 Q34 16 40 7.5z" fill="#FF5F00"/>
  </svg>
);

const VisaLogo = () => (
  <svg viewBox="0 0 80 32" xmlns="http://www.w3.org/2000/svg" height="20">
    <rect width="80" height="32" rx="4" fill="#1A1F71"/>
    <text x="10" y="22" fontFamily="'Arial', sans-serif" fontWeight="900" fontSize="20" fill="white" letterSpacing="1">VISA</text>
    <rect x="0" y="0" width="80" height="5" fill="#F7A600" rx="4"/>
    <rect x="0" y="27" width="80" height="5" fill="#F7A600"/>
  </svg>
);

const PayPalLogo = () => (
  <svg viewBox="0 0 80 32" xmlns="http://www.w3.org/2000/svg" height="20">
    <rect width="80" height="32" rx="4" fill="#003087"/>
    <text x="8" y="21" fontFamily="'Arial', sans-serif" fontWeight="700" fontSize="14" fill="#009cde">Pay</text>
    <text x="31" y="21" fontFamily="'Arial', sans-serif" fontWeight="700" fontSize="14" fill="#ffffff">Pal</text>
  </svg>
);

const StripeLogo = () => (
  <svg viewBox="0 0 80 32" xmlns="http://www.w3.org/2000/svg" height="20">
    <rect width="80" height="32" rx="4" fill="#635BFF"/>
    <text x="10" y="22" fontFamily="'Arial', sans-serif" fontWeight="700" fontSize="15" fill="white" letterSpacing="-0.3">stripe</text>
  </svg>
);

const paymentMethods = [
  { name: 'Tabby',      Icon: TabbyLogo },
  { name: 'Mada',       Icon: MadaLogo },
  { name: 'Apple Pay',  Icon: ApplePayLogo },
  { name: 'Mastercard', Icon: MastercardLogo },
  { name: 'Visa',       Icon: VisaLogo },
  { name: 'PayPal',     Icon: PayPalLogo },
  { name: 'Stripe',     Icon: StripeLogo },
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
              {paymentMethods.map(({ name, Icon }) => (
                <span key={name} className="payment-badge" title={name}>
                  <Icon />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer Bottom ── */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-row">
            <p>© {year} BMC Digital. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>

            {/* ── Registration Info ── */}
            <div className="footer-reg-info">
              <div className="footer-reg-item">
                <img src={vatImg} alt="VAT" className="footer-vat-img" />
                <div className="footer-reg-text">
                  <span className="footer-reg-label">
                    {lang === 'ar' ? 'الرقم الضريبي' : 'VAT No.'}
                  </span>
                  <span className="footer-reg-value" dir="ltr">312004226200003</span>
                </div>
              </div>
              <div className="footer-reg-divider" />
              <div className="footer-reg-item">
                <svg className="footer-reg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
                <div className="footer-reg-text">
                  <span className="footer-reg-label">
                    {lang === 'ar' ? 'السجل التجاري' : 'CR No.'}
                  </span>
                  <span className="footer-reg-value" dir="ltr">1010234567</span>
                </div>
              </div>
            </div>

            <a href="https://ufuq-digital.com/" target="_blank" rel="noopener noreferrer" className="ufuq-badge">
              CREATED BY UFUQ-DIGITAL
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}