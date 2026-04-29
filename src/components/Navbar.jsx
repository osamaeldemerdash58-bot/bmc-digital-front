import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../DataContext';

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef(null);
  const location = useLocation();
  const { data } = useData();
  const navTranslations = data?.translations?.nav?.[lang] || data?.translations?.nav?.ar || {};
  const navConfig = data?.siteConfig?.navLinks || [];
  const servicesData = data?.services || [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClick = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const serviceLinks = servicesData.map(s => ({
    href: `/service/${s.slug}`,
    label: lang === 'ar' ? s.titleAr : s.titleEn,
    icon: s.icon,
  }));

  const mainLinks = [
    { href: '/', label: lang === 'ar' ? 'الرئيسية' : 'Home' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isServicesActive = location.pathname.startsWith('/service') || location.pathname === '/services';

  const linkStyle = (active) => ({
    fontSize: 13,
    fontWeight: 600,
    color: active ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.7)',
    textDecoration: 'none',
    letterSpacing: 0.5,
    transition: 'color 0.3s',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
  });

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        background: scrolled
          ? 'rgba(10, 14, 13, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(184, 164, 114, 0.1)'
          : '1px solid transparent',
        padding: scrolled ? '14px 0' : '22px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <div
            dir="ltr"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontFamily: 'Playfair Display, serif',
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            <span style={{ color: 'var(--bmc-gold)' }}>B</span>
            <span style={{ color: 'var(--bmc-white)' }}>M</span>
            <span style={{ color: 'var(--bmc-gold)' }}>C</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--bmc-white)', letterSpacing: 0.5 }}>
              {lang === 'ar' ? 'البنية الماسية' : 'Al Binyah Al Masiyah'}
            </span>
            <span style={{ fontSize: 9, color: 'var(--bmc-gold)', letterSpacing: 2, textTransform: 'uppercase' }}>
              Digital
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul
          style={{
            display: 'flex',
            listStyle: 'none',
            gap: 28,
            alignItems: 'center',
          }}
          className="nav-links-desktop"
        >
          {mainLinks.map((l) => (
            <li key={l.href}>
              <Link
                to={l.href}
                style={linkStyle(isActive(l.href))}
                onMouseEnter={(e) => (e.target.style.color = 'var(--bmc-gold)')}
                onMouseLeave={(e) => (e.target.style.color = isActive(l.href) ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.7)')}
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* Services Dropdown */}
          <li ref={servicesRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              style={{
                ...linkStyle(isServicesActive),
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Cairo, sans-serif',
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--bmc-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isServicesActive ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.7)';
              }}
            >
              {navTranslations.services || 'Services'}
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  transition: 'transform 0.3s',
                  transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0)',
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Dropdown */}
            {servicesOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  [lang === 'ar' ? 'right' : 'left']: 0,
                  minWidth: 280,
                  background: 'rgba(10, 14, 13, 0.98)',
                  border: '1px solid rgba(184, 164, 114, 0.15)',
                  backdropFilter: 'blur(20px)',
                  padding: '8px 0',
                  marginTop: 8,
                  borderRadius: 2,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                }}
              >
                {/* All Services link */}
                <Link
                  to="/services"
                  onClick={() => setServicesOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '12px 20px',
                    color: 'var(--bmc-gold)',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                    borderBottom: '1px solid rgba(184,164,114,0.1)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(184,164,114,0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 14 }}>📦</span>
                  {lang === 'ar' ? 'جميع الخدمات' : 'All Services'}
                </Link>
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    onClick={() => setServicesOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 20px',
                      color: isActive(s.href) ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.7)',
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: 500,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(184,164,114,0.08)';
                      e.currentTarget.style.color = 'var(--bmc-gold)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = isActive(s.href) ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.7)';
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{s.icon}</span>
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </li>

          <li>
            <Link
              to="/works"
              style={linkStyle(isActive('/works'))}
              onMouseEnter={(e) => (e.target.style.color = 'var(--bmc-gold)')}
              onMouseLeave={(e) => (e.target.style.color = isActive('/works') ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.7)')}
            >
              {navTranslations.works || 'Works'}
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              style={linkStyle(isActive('/contact'))}
              onMouseEnter={(e) => (e.target.style.color = 'var(--bmc-gold)')}
              onMouseLeave={(e) => (e.target.style.color = isActive('/contact') ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.7)')}
            >
              {navTranslations.contact || 'Contact'}
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(184, 164, 114, 0.4)',
              color: 'var(--bmc-gold)',
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              cursor: 'pointer',
              borderRadius: 2,
              transition: 'all 0.3s',
              fontFamily: 'Cairo, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--bmc-gold)';
              e.target.style.color = 'var(--bmc-dark)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = 'var(--bmc-gold)';
            }}
          >
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="burger-btn"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              padding: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 22,
                  height: 2,
                  background: 'var(--bmc-gold)',
                  transition: 'all 0.3s',
                  transformOrigin: 'center',
                  transform:
                    menuOpen
                      ? i === 0
                        ? 'rotate(45deg) translate(5px, 5px)'
                        : i === 1
                        ? 'scaleX(0)'
                        : 'rotate(-45deg) translate(5px, -5px)'
                      : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(10, 14, 13, 0.98)',
            padding: '20px 24px',
            borderTop: '1px solid rgba(184, 164, 114, 0.1)',
          }}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              padding: '12px 0',
              fontSize: 15,
              fontWeight: 600,
              color: isActive('/') ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.8)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(184, 164, 114, 0.08)',
            }}
          >
            {lang === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>

          {/* Mobile Services Toggle */}
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '12px 0',
                fontSize: 15,
                fontWeight: 600,
                color: isServicesActive ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.8)',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(184, 164, 114, 0.08)',
                cursor: 'pointer',
                fontFamily: 'Cairo, sans-serif',
              }}
            >
              {navTranslations.services || 'Services'}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                style={{
                  transition: 'transform 0.3s',
                  transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0)',
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {mobileServicesOpen && (
              <div style={{ padding: '4px 0 8px' }}>
                <Link
                  to="/services"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '10px 16px',
                    fontSize: 13,
                    fontWeight: 700,
                    color: 'var(--bmc-gold)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(184, 164, 114, 0.06)',
                  }}
                >
                  📦 {lang === 'ar' ? 'جميع الخدمات' : 'All Services'}
                </Link>
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '10px 16px',
                      fontSize: 13,
                      fontWeight: 500,
                      color: isActive(s.href) ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.6)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(184, 164, 114, 0.06)',
                    }}
                  >
                    {s.icon} {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/works"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              padding: '12px 0',
              fontSize: 15,
              fontWeight: 600,
              color: isActive('/works') ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.8)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(184, 164, 114, 0.08)',
            }}
          >
            {navTranslations.works || 'Works'}
          </Link>

          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'block',
              padding: '12px 0',
              fontSize: 15,
              fontWeight: 600,
              color: isActive('/contact') ? 'var(--bmc-gold)' : 'rgba(245, 240, 232, 0.8)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(184, 164, 114, 0.08)',
            }}
          >
            {navTranslations.contact || 'Contact'}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .burger-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}