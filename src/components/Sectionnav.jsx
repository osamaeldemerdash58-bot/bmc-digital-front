import React, { useEffect, useMemo, useState } from 'react';
import { useData } from '../DataContext';
import './Sectionnav.css';

const sectionLabels = [
  { id: 'about',        labelAr: 'من نحن',          labelEn: 'About' },
  { id: 'services',     labelAr: 'خدماتنا',          labelEn: 'Services' },
  { id: 'works',        labelAr: 'أعمالنا',           labelEn: 'Works' },
  { id: 'process',      labelAr: 'المراحل',           labelEn: 'Process' },
  { id: 'tech',         labelAr: 'التقنيات',          labelEn: 'Tech' },
  { id: 'testimonials', labelAr: 'آراء العملاء',      labelEn: 'Testimonials' },
  { id: 'faq',          labelAr: 'الأسئلة الشائعة',   labelEn: 'FAQ' },
  { id: 'contact',      labelAr: 'تواصل معنا',        labelEn: 'Contact' },
];

export default function SectionNav({ lang }) {
  const { data } = useData();
  const [active, setActive] = useState('');
  const [visible, setVisible] = useState(false);
  const sections = useMemo(() => {
    const labelsById = new Map(sectionLabels.map((s) => [s.id, s]));
    const configured = data?.siteConfig?.sections;

    // Use admin order/visibility when available.
    if (Array.isArray(configured) && configured.length > 0) {
      return configured
        .filter((s) => s.visible !== false && labelsById.has(s.key))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((s) => labelsById.get(s.key));
    }

    return sectionLabels;
  }, [data]);

  useEffect(() => {
    const onScroll = () => {
      const firstSectionId = sections.find((s) => document.getElementById(s.id))?.id;
      const heroEl = firstSectionId ? document.getElementById(firstSectionId) : null;
      const footerEl = document.querySelector('footer');

      if (!heroEl) {
        setVisible(false);
        return;
      }

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

    // Track active section via IntersectionObserver
    const observers = [];
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      observers.forEach((o) => o.disconnect());
    };
  }, [sections]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`section-nav ${visible ? 'snav-visible' : ''} ${lang === 'ar' ? 'snav-rtl' : 'snav-ltr'}`}
      aria-label="Section navigation"
    >
      <div className="snav-track">
        {sections.map(({ id, labelAr, labelEn }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              className={`snav-item ${isActive ? 'snav-active' : ''}`}
              onClick={() => scrollTo(id)}
              title={lang === 'ar' ? labelAr : labelEn}
            >
              <span className="snav-dot" />
              <span className="snav-label">
                {lang === 'ar' ? labelAr : labelEn}
              </span>
            </button>
          );
        })}

        {/* Vertical track line */}
        <div className="snav-line" />
      </div>
    </nav>
  );
}
