import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// ── Smooth Inertia Scroll ──────────────────────────────────────────
// يمسك الـ scroll الحقيقي ويحركه بـ lerp (linear interpolation)
// الـ ease = 0.08 → مقاومة قوية (كلما صغّرت الرقم كلما زاد البطء)
// ──────────────────────────────────────────────────────────────────
(function initSmoothScroll() {
  // موبايل وتابلت أو touch device → نسيب الـ native scroll زي ما هو
  if (window.matchMedia('(max-width: 900px)').matches) return;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  // لو المستخدم فاضل تقليل الحركة نسيب كمان
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const EASE = 0.09;          // سرعة اللحاق (0.06 = أبطأ ، 0.14 = أسرع)
  const WHEEL_MULT = 1.1;     // مضاعف عجلة الماوس

  let current = window.scrollY;
  let target  = window.scrollY;
  let rafId   = null;
  let ticking = false;

  // منع الـ default scroll وحساب الـ target يدوياً
  const onWheel = (e) => {
    e.preventDefault();
    target += e.deltaY * WHEEL_MULT;
    target  = Math.max(0, Math.min(target, document.body.scrollHeight - window.innerHeight));
    if (!ticking) {
      ticking = true;
      rafId = requestAnimationFrame(tick);
    }
  };

  const tick = () => {
    const diff = target - current;
    if (Math.abs(diff) < 0.5) {
      current = target;
      ticking = false;
      return;
    }
    current += diff * EASE;
    window.scrollTo(0, current);
    rafId = requestAnimationFrame(tick);
  };

  window.addEventListener('wheel', onWheel, { passive: false });

  // لو الصفحة اتغيرت (React Router) نرجع الـ position
  const onScroll = () => {
    if (!ticking) {
      current = window.scrollY;
      target  = window.scrollY;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();
// ──────────────────────────────────────────────────────────────────

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)