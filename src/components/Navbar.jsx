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
  const accent = 'var(--neon-blue)';
  const navBg = 'linear-gradient(135deg, rgba(8, 19, 31, 0.96) 0%, rgba(12, 30, 47, 0.94) 52%, rgba(8, 17, 27, 0.96) 100%)';

  const linkStyle = (active) => ({
    fontSize: 13,
    fontWeight: 600,
    color: active ? accent : 'rgba(245, 240, 232, 0.7)',
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
        background: scrolled ? navBg : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(0, 194, 255, 0.16)'
          : '1px solid transparent',
        boxShadow: scrolled ? '0 18px 44px rgba(0, 0, 0, 0.22)' : 'none',
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
              height: scrolled ? 34 : 44,
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
                className={`nav-link ${isActive(l.href) ? 'nav-link-active' : ''}`}
                style={linkStyle(isActive(l.href))}
              >
                {l.label}
              </Link>
            </li>
          ))}

          {/* Services Dropdown */}
          <li ref={servicesRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={`nav-link nav-link-btn ${isServicesActive ? 'nav-link-active' : ''}`}
              style={{
                ...linkStyle(isServicesActive),
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Cairo, sans-serif',
                height: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                lineHeight: 1,
                whiteSpace: 'nowrap',
                minWidth: 85,
                textAlign: 'center',
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
                  display: 'block',
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
                  borderRadius: 14,
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
                    color: accent,
                    textDecoration: 'none',
                    fontSize: 13,
                    fontWeight: 700,
                    padding: '13px 22px',
                    borderBottom: '1px solid rgba(0,194,255,0.14)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,194,255,0.08)'}
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
                      color: isActive(s.href) ? accent : 'rgba(245, 240, 232, 0.75)',
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: 500,
                      transition: 'all 0.2s',
                      borderRadius: 10,
                      margin: '2px 6px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,194,255,0.08)';
                      e.currentTarget.style.color = accent;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = isActive(s.href) ? accent : 'rgba(245, 240, 232, 0.75)';
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
              className={`nav-link ${isActive('/works') ? 'nav-link-active' : ''}`}
              style={linkStyle(isActive('/works'))}
            >
              {navTranslations.works || 'Works'}
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className={`nav-link ${isActive('/contact') ? 'nav-link-active' : ''}`}
              style={linkStyle(isActive('/contact'))}
            >
              {navTranslations.contact || 'Contact'}
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            className="lang-btn"
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
              boxShadow: '0 0 16px rgba(0,194,255,0.35), 0 0 32px rgba(0,194,255,0.22), inset 0 1px 0 rgba(0,194,255,0.18)',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'var(--btn-gradient-hover)';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 10px 26px rgba(0,194,255,0.35), 0 10px 40px rgba(0,194,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'var(--btn-gradient)';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 0 16px rgba(0,194,255,0.28), 0 0 32px rgba(0,194,255,0.18)';
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
              gap: 4,
              padding: 0,
              width: 36,
              height: 36,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: 18,
                  height: 2,
                  background: 'rgba(0,194,255,0.9)',
                  transition: 'all 0.3s',
                  transformOrigin: 'center',
                  transform:
                    menuOpen
                      ? i === 0
                        ? 'rotate(45deg) translate(4px, 4px)'
                        : i === 1
                        ? 'scaleX(0)'
                        : 'rotate(-45deg) translate(4px, -4px)'
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
              color: isActive('/') ? accent : 'rgba(245, 240, 232, 0.8)',
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
                color: isServicesActive ? accent : 'rgba(245, 240, 232, 0.8)',
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
                    color: accent,
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
                      color: isActive(s.href) ? accent : 'rgba(245, 240, 232, 0.7)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(0,194,255,0.1)',
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
              color: isActive('/works') ? accent : 'rgba(245, 240, 232, 0.8)',
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
              color: isActive('/contact') ? accent : 'rgba(245, 240, 232, 0.8)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(108, 99, 255, 0.08)',
            }}
          >
            {navTranslations.contact || 'Contact'}
          </Link>
        </div>
      )}

      <style>{`
        .nav-link {
          text-decoration: none;
          position: relative;
          padding: 10px 6px;
          text-shadow: 0 0 14px rgba(0, 194, 255, 0.0);
          transition: color 0.25s ease, text-shadow 0.25s ease;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 2px;
          height: 2px;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, rgba(0,194,255,0.95), transparent);
          transform: scaleX(0.35);
          opacity: 0;
          transition: transform 0.25s ease, opacity 0.25s ease;
        }
        .nav-link:hover {
          color: var(--neon-blue) !important;
          text-shadow: 0 0 22px rgba(0, 194, 255, 0.25);
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          opacity: 1;
        }
        .nav-link-active {
          color: var(--neon-blue) !important;
        }
        .nav-link-active::after {
          transform: scaleX(1);
          opacity: 1;
        }
        .nav-link-btn {
          line-height: 1;
          height: 44px;
          padding: 0 6px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 85px;
          text-align: center;
        }
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .burger-btn { display: flex !important; }
        }
        @media (max-width: 520px) {
          .nav-link-btn {
            min-width: unset;
            padding: 0 10px;
          }
          .lang-btn {
            padding: 5px 9px !important;
            font-size: 10px !important;
            letter-spacing: 0.4px !important;
            min-height: 30px !important;
          }
          .burger-btn {
            width: 34px !important;
            height: 34px !important;
          }
        }
      `}</style>
    </nav>
  );
}
