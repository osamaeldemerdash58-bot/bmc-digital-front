import React, { useEffect, useState } from 'react';
import './WhatsAppFloat.css';

export default function WhatsAppFloat({ lang }) {
  const whatsappNumber = '966500000000'; // Replace with actual number
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById('about');
      const footerEl = document.querySelector('footer');

      if (!heroEl) return;

      const heroTop = heroEl.getBoundingClientRect().top;
      const pastHero = heroTop <= window.innerHeight * 0.9;

      // Hide when footer is in view
      let aboveFooter = true;
      if (footerEl) {
        const footerTop = footerEl.getBoundingClientRect().top;
        aboveFooter = footerTop > window.innerHeight * 0.85;
      }

      setVisible(pastHero && aboveFooter);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <button
      className={`whatsapp-float ${visible ? 'wa-visible' : ''} ${lang === 'ar' ? 'wa-rtl' : 'wa-ltr'}`}
      onClick={handleClick}
      aria-label="Contact via WhatsApp"
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 2C8.268 2 2 8.268 2 16c0 2.444.638 4.74 1.752 6.733L2 30l7.463-1.724A13.942 13.942 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2z"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M22.003 19.274c-.296-.148-1.75-.863-2.022-.962-.271-.099-.469-.148-.666.148-.198.296-.765.962-.938 1.16-.172.197-.345.222-.641.074-.296-.148-1.25-.461-2.38-1.469-.88-.785-1.474-1.754-1.647-2.05-.172-.297-.018-.457.13-.604.132-.132.296-.345.444-.518.148-.172.197-.296.296-.494.099-.197.05-.371-.025-.519-.074-.148-.666-1.605-.913-2.198-.24-.578-.485-.5-.666-.51l-.568-.01c-.197 0-.518.074-.79.371-.27.297-1.036 1.012-1.036 2.469 0 1.456 1.061 2.863 1.21 3.061.147.197 2.086 3.185 5.055 4.468.706.305 1.257.487 1.686.623.709.225 1.354.194 1.863.118.568-.085 1.75-.716 1.997-1.407.247-.691.247-1.284.173-1.407-.074-.123-.271-.197-.568-.345z"
          fill="none"
          stroke="white"
          strokeWidth="0.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <span className="whatsapp-tooltip">
        {lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
      </span>
    </button>
  );
}