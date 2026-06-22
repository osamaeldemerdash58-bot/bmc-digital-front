import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider, useData } from './DataContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Works from './components/Works';
import Process from './components/Process';
import Tech from './components/Tech';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import SectionNav from './components/Sectionnav';
import Testimonials from './components/Testimonials';
import FAQ from './components/Faq';

// Pages
import ServicesPage from './pages/Servicespage';
import WorksPage from './pages/WorksPage';
import ProcessPage from './pages/ProcessPage';
import TechPage from './pages/TechPage';
import ServiceDetailPage from './pages/Servicedetailpage';
import ContactPage from './pages/Contactpage';
import AdminPage from './pages/AdminPage';

import './index.css';
import './mobile-responsive.css';
import logoImg from './assets/IMG-20260531-WA0122.jpg-removebg-preview.png';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Loading component
function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bmc-dark)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{ display: 'grid', placeItems: 'center', animation: 'logoBounce 1.05s ease-in-out infinite' }}>
        <img
          src={logoImg}
          alt="BMD Logo"
          style={{
            width: 160,
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
            filter: 'brightness(1.05)',
            transformOrigin: '50% 50%',
          }}
        />
      </div>
      <style>{`
        @keyframes logoBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-16px) scale(1.02); }
        }
      `}</style>
    </div>
  );
}

function HomePage({ lang, setLang }) {
  const { data } = useData();
  const sections = data?.siteConfig?.sections || [];
  const sectionMap = {};
  sections.forEach(s => { sectionMap[s.key] = s.visible; });

  return (
    <>
      <Navbar lang={lang} setLang={setLang} />
      <main>
        {sectionMap.hero !== false && <Hero lang={lang} />}
        {sectionMap.about !== false && <About lang={lang} />}
        {sectionMap.services !== false && <Services lang={lang} />}
        {sectionMap.works !== false && <Works lang={lang} />}
        {sectionMap.process !== false && <Process lang={lang} />}
        {sectionMap.tech !== false && <Tech lang={lang} />}
        {sectionMap.testimonials !== false && <Testimonials lang={lang} />}
        {sectionMap.faq !== false && <FAQ lang={lang} />}
        {sectionMap.contact !== false && <Contact lang={lang} />}
      </main>
      <Footer lang={lang} />
      <SectionNav lang={lang} />
    </>
  );
}

function AppContent() {
  const [lang, setLang] = useState('ar');
  const { loading } = useData();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('ltr', lang === 'en');
    document.documentElement.lang = lang;
  }, [lang]);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage lang={lang} setLang={setLang} />} />
        <Route path="/services" element={<ServicesPage lang={lang} setLang={setLang} />} />
        <Route path="/works" element={<WorksPage lang={lang} setLang={setLang} />} />
        <Route path="/process" element={<ProcessPage lang={lang} setLang={setLang} />} />
        <Route path="/tech" element={<TechPage lang={lang} setLang={setLang} />} />
        <Route path="/service/:slug" element={<ServiceDetailPage lang={lang} setLang={setLang} />} />
        <Route path="/contact" element={<ContactPage lang={lang} setLang={setLang} />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {!isAdminPage && <WhatsAppFloat lang={lang} hideOnHero={location.pathname === '/'} />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </BrowserRouter>
  );
}
