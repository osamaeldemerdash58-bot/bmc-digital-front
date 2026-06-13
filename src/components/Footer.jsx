import React, { useState, useEffect } from 'react';
import './Footer.css';
import logoImg from '../assets/IMG-20260531-WA0122.jpg-removebg-preview.png';
import vatImg from '../assets/vat-QVSDUwyA.png';
import wordpressImg from '../assets/our partinar/wordpress.png';
import sallaImg from '../assets/our partinar/salla.png';
import afteradsImg from '../assets/our partinar/afterads.webp';
import shopifyImg from '../assets/our partinar/shopify.png';

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

const partners = [
  { name: 'WordPress', src: wordpressImg, href: 'https://wordpress.com/' },
  { name: 'Salla', src: sallaImg, href: 'https://salla.com/' },
  { name: 'AfterAds', src: afteradsImg, href: 'https://afterads.com/' },
  { name: 'Shopify', src: shopifyImg, href: 'https://www.shopify.com/' },
];

function SaudiClock({ lang }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const saudiTime = new Date(time.toLocaleString('en-US', { timeZone: 'Asia/Riyadh' }));
  const hours   = saudiTime.getHours();
  const minutes = saudiTime.getMinutes();
  const seconds = saudiTime.getSeconds();

  const secDeg  = seconds  * 6;
  const minDeg  = minutes  * 6  + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  const pad = (n) => String(n).padStart(2, '0');
  const isPM = hours >= 12;
  const displayH = hours % 12 || 12;
  const ampm = isPM ? (lang === 'ar' ? 'م' : 'PM') : (lang === 'ar' ? 'ص' : 'AM');

  const dayNames = lang === 'ar'
    ? ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت']
    : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const monthNames = lang === 'ar'
    ? ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']
    : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  const dayName   = dayNames[saudiTime.getDay()];
  const dayNum    = saudiTime.getDate();
  const monthName = monthNames[saudiTime.getMonth()];
  const fullYear  = saudiTime.getFullYear();

  return (
    <div className="saudi-clock-wrap">
      {/* <span className="saudi-clock-label">
        {lang === 'ar' ? 'توقيت الرياض' : 'Riyadh Time'}
      </span> */}
      <div className="saudi-clock-inner">

        {/* Analog clock */}
        <svg className="clock-svg" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
          <circle cx="40" cy="40" r="37" fill="none" stroke="rgba(108,99,255,0.25)" strokeWidth="1"/>
          <circle cx="40" cy="40" r="35" fill="rgba(0,0,0,0.35)" />
          {[...Array(12)].map((_, i) => {
            const a = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 40 + 30 * Math.cos(a), y1 = 40 + 30 * Math.sin(a);
            const x2 = 40 + 33 * Math.cos(a), y2 = 40 + 33 * Math.sin(a);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"/>;
          })}
          {[...Array(60)].map((_, i) => {
            if (i % 5 === 0) return null;
            const a = (i * 6 - 90) * (Math.PI / 180);
            const x1 = 40 + 31.5 * Math.cos(a), y1 = 40 + 31.5 * Math.sin(a);
            const x2 = 40 + 33  * Math.cos(a),  y2 = 40 + 33  * Math.sin(a);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.08)" strokeWidth="0.8"/>;
          })}
          <line x1="40" y1="40"
            x2={40 + 20 * Math.cos((hourDeg - 90) * Math.PI / 180)}
            y2={40 + 20 * Math.sin((hourDeg - 90) * Math.PI / 180)}
            stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="40" y1="40"
            x2={40 + 27 * Math.cos((minDeg - 90) * Math.PI / 180)}
            y2={40 + 27 * Math.sin((minDeg - 90) * Math.PI / 180)}
            stroke="#00C2FF" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="40" y1="40"
            x2={40 + 29 * Math.cos((secDeg - 90) * Math.PI / 180)}
            y2={40 + 29 * Math.sin((secDeg - 90) * Math.PI / 180)}
            stroke="rgba(108,99,255,0.9)" strokeWidth="0.9" strokeLinecap="round"/>
          <circle cx="40" cy="40" r="2.5" fill="#00C2FF"/>
        </svg>

        {/* Right panel: digital + date */}
        <div className="clock-right">
          <div className="clock-digital">
            <span className="clock-digits">{pad(displayH)}:{pad(minutes)}:{pad(seconds)}</span>
            <span className="clock-ampm">{ampm}</span>
          </div>
          <div className="clock-date">
            <span className="clock-day-name">{dayName}</span>
            <span className="clock-date-num">{dayNum} {monthName} {fullYear}</span>
          </div>
          <div className="clock-hijri-label">
            {lang === 'ar' ? '🇸🇦 المملكة العربية السعودية' : '🇸🇦 Saudi Arabia'}
          </div>
        </div>

      </div>
    </div>
  );
}

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
            <div className="footer-brand footer-col--brand">
              <div className="footer-logo-wrap">
                <img src={logoImg} alt="BMD Digital Logo" className="footer-logo-img" />
              </div>
         
              <p className="footer-brand-name">
                {lang === 'ar' ? 'شركة البنية الماسية الرقمية' : 'Al Binyah Al Masiyah Digital'}
              </p>
              <p className="footer-tagline">
               {lang === 'ar'
  ? 'نحن شريكك التقني في بناء الحلول الرقمية الحديثة، حيث نطور مواقع الويب، تطبيقات الهاتف، الأنظمة الإدارية، ومنصات الأعمال المتكاملة باستخدام أحدث التقنيات. نجمع بين التصميم الإبداعي، الأداء العالي، وتجربة المستخدم الاحترافية لنقدم منتجات رقمية موثوقة وقابلة للتوسع تلبي احتياجات أعمالك وتدعم نموها.'
  : 'We are your technology partner in building modern digital solutions, developing websites, mobile applications, business platforms, and enterprise systems using the latest technologies. By combining creative design, high performance, and exceptional user experience, we deliver reliable and scalable digital products tailored to your business needs and growth.'}
              </p>

                   <div className="footer-logo-mark" dir="ltr">
                {/* <span>B</span><span className="footer-logo-mid">M</span><span>D</span> */}
              </div>

              <div className="footer-brand-partners">
                <span className="footer-partners-label footer-partners-label--inline">
                  {lang === 'ar' ? 'شركائنا' : 'Our Partners'}
                </span>
                <div className="footer-partners-grid">
                  {partners.map(({ name, src, href }) => (
                    <a key={name} className="partner-badge" href={href} target="_blank" rel="noopener noreferrer" title={name} aria-label={name}>
                      <img src={src} alt={name} className="partner-badge-img" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="footer-col footer-col--quick">
              <h4>{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
              <ul>
                {links.map((l, i) => (
                  <li key={i}>
                    <a href={hrefs[i]}>{l}</a>
                  </li>
                ))}
              </ul>
              <SaudiClock lang={lang} />
            </div>

            <div className="footer-col footer-col--services">
              <h4>{lang === 'ar' ? 'أهم الخدمات' : 'Top Services'}</h4>
              <ul>
                <li><a href="#services">{lang === 'ar' ? 'تطوير المواقع' : 'Website Development'}</a></li>
                <li><a href="#services">{lang === 'ar' ? 'المتاجر الإلكترونية' : 'E-Commerce'}</a></li>
                <li><a href="#services">{lang === 'ar' ? 'تطوير التطبيقات' : 'Mobile Apps'}</a></li>
                <li><a href="#services">{lang === 'ar' ? 'تصميم UI/UX' : 'UI/UX Design'}</a></li>
                <li><a href="#services">{lang === 'ar' ? 'التسويق الرقمي' : 'Digital Marketing'}</a></li>
              </ul>

              {/* ── Achievement Stats ── */}
              <div className="footer-stats">
                {[
                  { num: '3',    label: lang === 'ar' ? 'أعوام من الخبرة' : 'Years of Experience' },
                  { num: '+30',  label: lang === 'ar' ? 'عميل'            : 'Clients' },
                  { num: '+25',  label: lang === 'ar' ? 'مشروع منجز'      : 'Projects Done' },
                  { num: '15+',  label: lang === 'ar' ? 'خدمة متاحة'      : 'Services' },
                ].map(({ num, label }) => (
                  <div key={label} className="footer-stat-card">
                    <span className="footer-stat-num">{num}</span>
                    <span className="footer-stat-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="footer-col footer-col--contact">
              <h4>{lang === 'ar' ? 'تواصل معنا' : 'Contact'}</h4>
              <ul className="footer-contact-list">
                <li>
                  <span className="fc-icon"><PhoneIcon /></span>
                  <a className="footer-contact-link" href="tel:+966535166370" dir="ltr">+966 53 516 6370</a>
                </li>
                <li>
                  <span className="fc-icon"><MailIcon /></span>
                  <a className="footer-contact-link" href="mailto:info@bmd-digital.com">info@bmd-digital.com</a>
                </li>
                <li>
                  <span className="fc-icon"><PinIcon /></span>
                  <span>الرياض، حي العقيق، شارع الامير محمد ابن سلمان ابن عبد العزيز</span>
                </li>
              </ul>

              <div className="footer-map-wrap">
                <a
                  href="https://maps.app.goo.gl/aZc25BnBQ33a4dn19?g_st=ac"
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

      {/* ── Divider ── */}
      <div className="footer-divider" />

      {/* ── Footer Bottom ── */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-row">
            <p>© {year} {lang === 'ar' ? 'BMD الرقمية' : 'BMD Digital'}. {lang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</p>

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

          </div>
        </div>
      </div>
    </footer>
  );
}
