import React from 'react';
import './Footer.css';

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
                <li><span className="fc-icon">📞</span><span>+966 50 000 0000</span></li>
                <li><span className="fc-icon">✉️</span><span>hello@bmc-digital.com</span></li>
                <li><span className="fc-icon">📍</span><span>{lang === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span></li>
              </ul>
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
