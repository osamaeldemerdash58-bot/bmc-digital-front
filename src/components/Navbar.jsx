import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useData } from '../DataContext';
import logoImg from '../assets/IMG-20260531-WA0122.jpg-removebg-preview.png';

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

  const serviceLinks = servicesData
    .filter((s) => s.slug !== 'tech-consulting')
    .map(s => ({
    href: `/service/${s.slug}`,
    label: lang === 'ar' ? s.titleAr : s.titleEn,
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
    color: active ? '#00C2FF' : 'rgba(245, 240, 232, 0.7)',
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
          ? 'rgba(11, 15, 21, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(108, 99, 255, 0.1)'
          : '1px solid transparent',
        padding: scrolled ? '14px 0' : '22px 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <img
            src={logoImg}
            alt="BMC Digital Logo"
            style={{
              height: scrolled ? 42 : 52,
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              transition: 'height 0.4s ease',
              filter: 'brightness(1.05)',
            }}
          />
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
                onMouseEnter={(e) => (e.target.style.color = '#00C2FF')}
                onMouseLeave={(e) => (e.target.style.color = isActive(l.href) ? '#00C2FF' : 'rgba(245, 240, 232, 0.7)')}
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
                e.currentTarget.style.color = '#00C2FF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isServicesActive ? '#00C2FF' : 'rgba(245, 240, 232, 0.7)';
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
                  background: 'rgba(11, 15, 21, 0.98)',
                  border: '1px solid rgba(108, 99, 255, 0.15)',
                  backdropFilter: 'blur(20px)',
                  padding: '8px 0',
                  marginTop: 8,
                  borderRadius: 50,
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
                    padding: '12px 20px',
                    color: '#00C2FF',
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                    padding: '13px 22px',
                    borderBottom: '1px solid rgba(108,99,255,0.12)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(108,99,255,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {lang === 'ar' ? 'جميع الخدمات' : 'All Services'}
                </Link>
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    onClick={() => setServicesOpen(false)}
                    className="nav-service-link"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '13px 22px',
                      color: isActive(s.href) ? '#00C2FF' : 'rgba(245, 240, 232, 0.75)',
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: 500,
                      transition: 'all 0.2s',
                      borderRadius: 10,
                      margin: '2px 6px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(108,99,255,0.1)';
                      e.currentTarget.style.color = '#00C2FF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = isActive(s.href) ? '#00C2FF' : 'rgba(245, 240, 232, 0.75)';
                    }}
                  >
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
              onMouseEnter={(e) => (e.target.style.color = '#00C2FF')}
              onMouseLeave={(e) => (e.target.style.color = isActive('/works') ? '#00C2FF' : 'rgba(245, 240, 232, 0.7)')}
            >
              {navTranslations.works || 'Works'}
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              style={linkStyle(isActive('/contact'))}
              onMouseEnter={(e) => (e.target.style.color = '#00C2FF')}
              onMouseLeave={(e) => (e.target.style.color = isActive('/contact') ? '#00C2FF' : 'rgba(245, 240, 232, 0.7)')}
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
              background: 'linear-gradient(135deg, #1A1A4E 0%, #0A3080 100%)',
              border: 'none',
              color: '#fff',
              padding: '7px 16px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              cursor: 'pointer',
              borderRadius: 50,
              transition: 'all 0.3s',
              fontFamily: 'Cairo, sans-serif',
              boxShadow: '0 0 16px rgba(0,194,255,0.4), 0 0 32px rgba(108,99,255,0.2), inset 0 1px 0 rgba(0,194,255,0.2)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--btn-gradient-hover)';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 20px rgba(108,99,255,0.45)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--btn-gradient)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 14px rgba(108,99,255,0.3)';
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
                  background: '#00C2FF',
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
            background: 'rgba(11, 15, 21, 0.98)',
            padding: '20px 24px',
            borderTop: '1px solid rgba(108, 99, 255, 0.1)',
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
              color: isActive('/') ? '#00C2FF' : 'rgba(245, 240, 232, 0.8)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(108, 99, 255, 0.08)',
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
                color: isServicesActive ? '#00C2FF' : 'rgba(245, 240, 232, 0.8)',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(108, 99, 255, 0.08)',
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
                    color: '#00C2FF',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(108, 99, 255, 0.06)',
                  }}
                >
                  {lang === 'ar' ? 'جميع الخدمات' : 'All Services'}
                </Link>
                {serviceLinks.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    onClick={() => setMenuOpen(false)}
                    className="nav-service-link"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '13px 20px',
                      fontSize: 13,
                      fontWeight: 500,
                      color: isActive(s.href) ? '#00C2FF' : 'rgba(245, 240, 232, 0.7)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(108,99,255,0.1)',
                    }}
                  >
                    {s.label}
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
              color: isActive('/works') ? '#00C2FF' : 'rgba(245, 240, 232, 0.8)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(108, 99, 255, 0.08)',
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
              color: isActive('/contact') ? '#00C2FF' : 'rgba(245, 240, 232, 0.8)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(108, 99, 255, 0.08)',
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