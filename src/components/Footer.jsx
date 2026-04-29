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

import tabbyImg  from '../assets/tabby-i5Rq16o7.png';
import madaImg   from '../assets/logo-white.svg';
import tamaraImg from '../assets/68931b4ae0847b7855db9432_tamara-text-logo-ar.svg';
const StripeIcon = () => (
  <svg viewBox="0 0 640 512" className="payment-badge-svg" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M165 144.7l-43.3 9.2-.2 142.4c0 26.3 19.8 43.3 46.1 43.3 14.6 0 25.3-2.7 31.2-5.9v-33.8c-5.7 2.3-33.7 10.5-33.7-15.7V221h33.7v-37.8h-33.7zm89.1 51.6l-2.7-13.1H213v153.2h44.3V233.3c10.5-13.8 28.2-11.1 33.9-9.3v-40.8c-6-2.1-26.7-6-37.1 13.1zm92.3-72.3l-44.6 9.5v36.2l44.6-9.5zM44.9 228.3c0-6.9 5.8-9.6 15.1-9.7 13.5 0 30.7 4.1 44.2 11.4v-41.8c-14.7-5.8-29.4-8.1-44.1-8.1-36 0-60 18.8-60 50.2 0 49.2 67.5 41.2 67.5 62.4 0 8.2-7.1 10.9-17 10.9-14.7 0-33.7-6.1-48.6-14.2v40c16.5 7.1 33.2 10.1 48.5 10.1 36.9 0 62.3-15.8 62.3-47.8 0-52.9-67.9-43.4-67.9-63.4zM640 261.6c0-45.5-22-81.4-64.2-81.4s-67.9 35.9-67.9 81.1c0 53.5 30.3 78.2 73.5 78.2 21.2 0 37.1-4.8 49.2-11.5v-33.4c-12.1 6.1-26 9.8-43.6 9.8-17.3 0-32.5-6.1-34.5-26.9h86.9c.2-2.3.6-11.6.6-15.9zm-87.9-16.8c0-20 12.3-28.4 23.4-28.4 10.9 0 22.5 8.4 22.5 28.4h-45.9zm-112.9-64.6c-17.4 0-28.6 8.2-34.8 13.9l-2.3-11H363v204.8l44.4-9.4.1-50.2c6.4 4.7 15.9 11.2 31.4 11.2 31.8 0 60.8-23.2 60.8-79.6.1-51.6-29.3-79.7-60.5-79.7zm-10.6 122.5c-10.4 0-16.6-3.8-20.9-8.4l-.3-66c4.6-5.1 11-8.8 21.2-8.8 16.2 0 27.4 18.2 27.4 41.4.1 23.9-10.9 41.8-27.4 41.8zm-126.7 33.7h44.6V183.2h-44.6z"/>
  </svg>
);

const PayPalIcon = () => (
  <svg viewBox="0 0 384 512" className="payment-badge-svg" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4.7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9.7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"/>
  </svg>
);

const VisaIcon = () => (
  <svg viewBox="0 0 576 512" className="payment-badge-svg" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M470.1 231.3s7.6 37.2 9.3 45H446c3.3-8.9 16-43.5 16-43.5-.2.3 3.3-9.1 5.3-14.9l2.8 13.4zM576 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM152.5 331.2L215.7 176h-42.5l-39.3 106-4.3-21.5-14-71.4c-2.3-9.9-9.4-12.7-18.2-13.1H32.7l-.7 3.1c15.8 4 29.9 9.8 42.2 17.1l35.8 135h42.5zm94.4.2L272.1 176h-40.2l-25.1 155.4h40.1zm139.9-50.8c.2-17.7-10.6-31.2-33.7-42.3-14.1-7.1-22.7-11.9-22.7-19.2.2-6.6 7.3-13.4 23.1-13.4 13.1-.3 22.7 2.8 29.9 5.9l3.6 1.7 5.5-33.6c-7.9-3.1-20.5-6.6-36-6.6-39.7 0-67.6 21.2-67.8 51.4-.3 22.3 20 34.7 35.2 42.2 15.5 7.6 20.8 12.6 20.8 19.3-.2 10.4-12.6 15.2-24.1 15.2-16 0-24.6-2.5-37.7-8.3l-5.3-2.5-5.6 34.9c9.4 4.3 26.8 8.1 44.8 8.3 42.2.1 69.7-20.8 70-53zM528 331.4L495.6 176h-31.1c-9.6 0-16.9 2.8-21 12.9l-59.7 142.5H426s6.9-19.2 8.4-23.3H486c1.2 5.5 4.8 23.3 4.8 23.3H528z"/>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 576 512" className="payment-badge-svg" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M482.9 410.3c0 6.8-4.6 11.7-11.2 11.7-6.8 0-11.2-5.2-11.2-11.7 0-6.5 4.4-11.7 11.2-11.7 6.6 0 11.2 5.2 11.2 11.7zm-310.8-11.7c-7.1 0-11.2 5.2-11.2 11.7 0 6.5 4.1 11.7 11.2 11.7 6.5 0 10.9-4.9 10.9-11.7-.1-6.5-4.4-11.7-10.9-11.7zm117.5-.3c-5.4 0-8.7 3.5-9.5 8.7h19.1c-.9-5.7-4.4-8.7-9.6-8.7zm107.8.3c-6.8 0-10.9 5.2-10.9 11.7 0 6.5 4.1 11.7 10.9 11.7 6.8 0 11.2-4.9 11.2-11.7 0-6.5-4.4-11.7-11.2-11.7zm105.9 26.1c0 .3.3.5.3 1.1 0 .3-.3.5-.3 1.1-.3.3-.3.5-.5.8-.3.3-.5.5-1.1.5-.3.3-.5.3-1.1.3-.3 0-.5 0-1.1-.3-.3 0-.5-.3-.8-.5-.3-.3-.5-.5-.5-.8-.3-.5-.3-.8-.3-1.1 0-.5 0-.8.3-1.1 0-.5.3-.8.5-1.1.3-.3.5-.3.8-.5.5-.3.8-.3 1.1-.3.5 0 .8 0 1.1.3.5.3.8.3 1.1.5s.2.6.5 1.1zm-2.2 1.4c.5 0 .5-.3.8-.3.3-.3.3-.5.3-.8 0-.3 0-.5-.3-.8-.3 0-.5-.3-1.1-.3h-1.6v3.5h.8V426h.3l1.1 1.4h.8l-1.1-1.3zM576 81v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V81c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM64 220.6c0 76.5 62.1 138.5 138.5 138.5 27.2 0 53.9-8.2 76.5-23.1-72.9-59.3-72.4-171.2 0-230.5-22.6-15-49.3-23.1-76.5-23.1-76.4-.1-138.5 62-138.5 138.2zm224 108.8c70.5-55 70.2-162.2 0-217.5-70.2 55.3-70.5 162.6 0 217.5zm-142.3 76.3c0-8.7-5.7-14.4-14.7-14.7-4.6 0-9.5 1.4-12.8 6.5-2.4-4.1-6.5-6.5-12.2-6.5-3.8 0-7.6 1.4-10.6 5.4V392h-8.2v36.7h8.2c0-18.9-2.5-30.2 9-30.2 10.2 0 8.2 10.2 8.2 30.2h7.9c0-18.3-2.5-30.2 9-30.2 10.2 0 8.2 10 8.2 30.2h8.2v-23zm44.9-13.7h-7.9v4.4c-2.7-3.3-6.5-5.4-11.7-5.4-10.3 0-18.2 8.2-18.2 19.3 0 11.2 7.9 19.3 18.2 19.3 5.2 0 9-1.9 11.7-5.4v4.6h7.9V392zm40.5 25.6c0-15-22.9-8.2-22.9-15.2 0-5.7 11.9-4.8 18.5-1.1l3.3-6.5c-9.4-6.1-30.2-6-30.2 8.2 0 14.3 22.9 8.3 22.9 15 0 6.3-13.5 5.8-20.7.8l-3.5 6.3c11.2 7.6 32.6 6 32.6-7.5zm35.4 9.3l-2.2-6.8c-3.8 2.1-12.2 4.4-12.2-4.1v-16.6h13.1V392h-13.1v-11.2h-8.2V392h-7.6v7.3h7.6V416c0 17.6 17.3 14.4 22.6 10.9zm13.3-13.4h27.5c0-16.2-7.4-22.6-17.4-22.6-10.6 0-18.2 7.9-18.2 19.3 0 20.5 22.6 23.9 33.8 14.2l-3.8-6c-7.8 6.4-19.6 5.8-21.9-4.9zm59.1-21.5c-4.6-2-11.6-1.8-15.2 4.4V392h-8.2v36.7h8.2V408c0-11.6 9.5-10.1 12.8-8.4l2.4-7.6zm10.6 18.3c0-11.4 11.6-15.1 20.7-8.4l3.8-6.5c-11.6-9.1-32.7-4.1-32.7 15 0 19.8 22.4 23.8 32.7 15l-3.8-6.5c-9.2 6.5-20.7 2.6-20.7-8.6zm66.7-18.3H408v4.4c-8.3-11-29.9-4.8-29.9 13.9 0 19.2 22.4 24.7 29.9 13.9v4.6h8.2V392zm33.7 0c-2.4-1.2-11-2.9-15.2 4.4V392h-7.9v36.7h7.9V408c0-11 9-10.3 12.8-8.4l2.4-7.6zm40.3-14.9h-7.9v19.3c-8.2-10.9-29.9-5.1-29.9 13.9 0 19.4 22.5 24.6 29.9 13.9v4.6h7.9v-51.7zm7.6-75.1v4.6h.8V302h1.9v-.8h-4.6v.8h1.9zm6.6 123.8c0-.5 0-1.1-.3-1.6-.3-.3-.5-.8-.8-1.1-.3-.3-.8-.5-1.1-.8-.5 0-1.1-.3-1.6-.3-.3 0-.8.3-1.4.3-.5.3-.8.5-1.1.8-.5.3-.8.8-.8 1.1-.3.5-.3 1.1-.3 1.6 0 .3 0 .8.3 1.4 0 .3.3.8.8 1.1.3.3.5.5 1.1.8.5.3 1.1.3 1.4.3.5 0 1.1 0 1.6-.3.3-.3.8-.5 1.1-.8.3-.3.5-.8.8-1.1.3-.6.3-1.1.3-1.4zm3.2-124.7h-1.4l-1.6 3.5-1.6-3.5h-1.4v5.4h.8v-4.1l1.6 3.5h1.1l1.4-3.5v4.1h1.1v-5.4zm4.4-80.5c0-76.2-62.1-138.3-138.5-138.3-27.2 0-53.9 8.2-76.5 23.1 72.1 59.3 73.2 171.5 0 230.5 22.6 15 49.5 23.1 76.5 23.1 76.4.1 138.5-61.9 138.5-138.4z"/>
  </svg>
);

const ApplePayIcon = () => (
  <svg viewBox="0 0 576 512" className="payment-badge-svg" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M302.2 218.4c0 17.2-10.5 27.1-29 27.1h-24.3v-54.2h24.4c18.4 0 28.9 9.8 28.9 27.1zm47.5 62.6c0 8.3 7.2 13.7 18.5 13.7 14.4 0 25.2-9.1 25.2-21.9v-7.7l-23.5 1.5c-13.3.9-20.2 5.8-20.2 14.4zM576 79v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h480c26.5 0 48 21.5 48 48zM127.8 197.2c8.4.7 16.8-4.2 22.1-10.4 5.2-6.4 8.6-15 7.7-23.7-7.4.3-16.6 4.9-21.9 11.3-4.8 5.5-8.9 14.4-7.9 22.8zm60.6 74.5c-.2-.2-19.6-7.6-19.8-30-.2-18.7 15.3-27.7 16-28.2-8.8-13-22.4-14.4-27.1-14.7-12.2-.7-22.6 6.9-28.4 6.9-5.9 0-14.7-6.6-24.3-6.4-12.5.2-24.2 7.3-30.5 18.6-13.1 22.6-3.4 56 9.3 74.4 6.2 9.1 13.7 19.1 23.5 18.7 9.3-.4 13-6 24.2-6 11.3 0 14.5 6 24.3 5.9 10.2-.2 16.5-9.1 22.8-18.2 6.9-10.4 9.8-20.4 10-21zm135.4-53.4c0-26.6-18.5-44.8-44.9-44.8h-51.2v136.4h21.2v-46.6h29.3c26.8 0 45.6-18.4 45.6-45zm90 23.7c0-19.7-15.8-32.4-40-32.4-22.5 0-39.1 12.9-39.7 30.5h19.1c1.6-8.4 9.4-13.9 20-13.9 13 0 20.2 6 20.2 17.2v7.5l-26.4 1.6c-24.6 1.5-37.9 11.6-37.9 29.1 0 17.7 13.7 29.4 33.4 29.4 13.3 0 25.6-6.7 31.2-17.4h.4V310h19.6v-68zM516 210.9h-21.5l-24.9 80.6h-.4l-24.9-80.6H422l35.9 99.3-1.9 6c-3.2 10.2-8.5 14.2-17.9 14.2-1.7 0-4.9-.2-6.2-.3v16.4c1.2.4 6.5.5 8.1.5 20.7 0 30.4-7.9 38.9-31.8L516 210.9z"/>
  </svg>
); 
const paymentMethods = [
  { name: 'Tabby', src: tabbyImg, type: 'image' },
  { name: 'Mada', src: madaImg, type: 'image' },
  { name: 'Tamara', src: tamaraImg, type: 'image' },
  { name: 'Stripe', icon: StripeIcon, type: 'svg' },
  { name: 'PayPal', icon: PayPalIcon, type: 'svg' },
  { name: 'Visa', icon: VisaIcon, type: 'svg' },
  { name: 'Mastercard', icon: MastercardIcon, type: 'svg' },
  { name: 'Apple Pay', icon: ApplePayIcon, type: 'svg' },
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
  {paymentMethods.map(({ name, src, icon: Icon, type }) => (
    <span key={name} className="payment-badge" title={name}>
      {type === 'svg' && Icon ? (
        <Icon />
      ) : (
        <img src={src} alt={name} className="payment-badge-img" />
      )}
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