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
      background: '#0a0e0d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 32,
        fontWeight: 900,
        letterSpacing: 2,
      }}>
        <span style={{ color: '#b8a472' }}>B</span>
        <span style={{ color: '#f5f0e8' }}>M</span>
        <span style={{ color: '#b8a472' }}>C</span>
      </div>
      <div style={{
        width: 40,
        height: 40,
        border: '3px solid rgba(184,164,114,0.2)',
        borderTopColor: '#b8a472',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
      <WhatsAppFloat lang={lang} />
      <SectionNav lang={lang} />
    </>
  );
}

function AppContent() {
  const [lang, setLang] = useState('ar');
  const { loading } = useData();

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
