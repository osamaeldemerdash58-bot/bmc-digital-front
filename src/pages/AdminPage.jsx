import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAPI, putAPI, postAPI, deleteAPI } from '../api';

const API_BASE = 'https://bmc-digital-server.vercel.app/api';

const styles = {
  page: { minHeight: '100vh', background: '#0A0E0D', color: '#F5F0E8', fontFamily: 'Cairo, sans-serif' },
  sidebar: { position: 'fixed', left: 0, top: 0, bottom: 0, width: 240, background: '#0F1512', borderRight: '1px solid rgba(184,164,114,0.15)', padding: '24px 0', overflowY: 'auto' },
  sidebarLogo: { padding: '0 24px 24px', borderBottom: '1px solid rgba(184,164,114,0.1)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' },
  navItem: (active) => ({ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', color: active ? '#B8A472' : 'rgba(245,240,232,0.6)', fontWeight: active ? 700 : 500, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', borderRight: active ? '3px solid #B8A472' : '3px solid transparent', background: active ? 'rgba(184,164,114,0.05)' : 'transparent' }),
  main: { marginLeft: 240, padding: '32px 40px', minHeight: '100vh' },
  card: { background: '#0F1512', border: '1px solid rgba(184,164,114,0.12)', borderRadius: 4, padding: 24, marginBottom: 24 },
  title: { fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 900, marginBottom: 8, color: '#F5F0E8' },
  subtitle: { fontSize: 14, color: 'rgba(245,240,232,0.5)', marginBottom: 24 },
  label: { fontSize: 12, fontWeight: 700, color: '#B8A472', letterSpacing: 1, marginBottom: 8, display: 'block' },
  input: { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(184,164,114,0.2)', padding: '10px 14px', color: '#F5F0E8', fontSize: 14, fontFamily: 'Cairo, sans-serif', borderRadius: 2, outline: 'none', marginBottom: 16, boxSizing: 'border-box' },
  textarea: { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(184,164,114,0.2)', padding: '10px 14px', color: '#F5F0E8', fontSize: 14, fontFamily: 'Cairo, sans-serif', borderRadius: 2, outline: 'none', marginBottom: 16, resize: 'vertical', minHeight: 80, boxSizing: 'border-box' },
  btn: { background: '#B8A472', color: '#0A0E0D', border: 'none', padding: '10px 24px', fontSize: 14, fontWeight: 700, fontFamily: 'Cairo, sans-serif', cursor: 'pointer', borderRadius: 2, transition: 'all 0.3s' },
  btnDanger: { background: 'transparent', color: '#e74c3c', border: '1px solid #e74c3c', padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', borderRadius: 2 },
  btnSmall: { background: 'rgba(184,164,114,0.1)', color: '#B8A472', border: '1px solid rgba(184,164,114,0.3)', padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', borderRadius: 2 },
  toggle: (on) => ({ width: 44, height: 24, borderRadius: 12, background: on ? '#B8A472' : 'rgba(184,164,114,0.2)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'all 0.3s' }),
  toggleDot: (on) => ({ width: 18, height: 18, borderRadius: '50%', background: '#F5F0E8', position: 'absolute', top: 3, transition: 'all 0.3s', left: on ? 23 : 3 }),
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  tag: { display: 'inline-block', padding: '4px 10px', background: 'rgba(184,164,114,0.1)', border: '1px solid rgba(184,164,114,0.2)', fontSize: 12, color: '#B8A472', borderRadius: 2, marginRight: 8, marginBottom: 8 },
  badge: (count) => ({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 20, height: 20, borderRadius: 10, background: count > 0 ? '#e74c3c' : 'rgba(184,164,114,0.2)', color: count > 0 ? '#fff' : 'rgba(245,240,232,0.4)', fontSize: 11, fontWeight: 700, marginLeft: 6, padding: '0 6px' }),
  statusBadge: (status) => {
    const colors = {
      new: { bg: 'rgba(52,152,219,0.15)', color: '#3498db', border: 'rgba(52,152,219,0.3)' },
      in_progress: { bg: 'rgba(241,196,15,0.15)', color: '#f1c40f', border: 'rgba(241,196,15,0.3)' },
      completed: { bg: 'rgba(46,204,113,0.15)', color: '#2ecc71', border: 'rgba(46,204,113,0.3)' },
      cancelled: { bg: 'rgba(231,76,60,0.15)', color: '#e74c3c', border: 'rgba(231,76,60,0.3)' },
    };
    const c = colors[status] || colors.new;
    return { display: 'inline-block', padding: '4px 12px', background: c.bg, border: `1px solid ${c.border}`, fontSize: 12, color: c.color, borderRadius: 12, fontWeight: 600 };
  },
  statusSelect: {
    marginBottom: 0,
    padding: '7px 12px',
    fontSize: 12,
    width: 'auto',
    minWidth: 150,
    cursor: 'pointer',
    background: '#131816',
    color: '#F5F0E8',
    border: '1px solid rgba(184,164,114,0.32)',
  },
  iconDanger: {
    width: 34,
    height: 34,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(231,76,60,0.12)',
    color: '#ff6b5d',
    border: '1px solid rgba(231,76,60,0.45)',
    cursor: 'pointer',
    borderRadius: 4,
    fontSize: 16,
    fontWeight: 700,
  },
  langSwitch: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 10px',
    border: '1px solid rgba(184,164,114,0.3)',
    background: 'rgba(184,164,114,0.08)',
    color: '#F5F0E8',
    borderRadius: 4,
    fontSize: 12,
    cursor: 'pointer',
    fontWeight: 700,
  },
};

const statusLabels = {
  ar: {
    new: '🆕 جديد',
    in_progress: '🔄 قيد التنفيذ',
    completed: '✅ مكتمل',
    cancelled: '❌ ملغي',
  },
  en: {
    new: '🆕 New',
    in_progress: '🔄 In Progress',
    completed: '✅ Completed',
    cancelled: '❌ Cancelled',
  },
};

const serviceLabels = {
  ar: {
    web: 'تطوير مواقع',
    ecommerce: 'متاجر إلكترونية',
    mobile: 'تطبيقات موبايل',
    erp: 'نظام ERP',
    uiux: 'تصميم UI/UX',
    ai: 'حلول ذكاء اصطناعي',
    other: 'أخرى',
  },
  en: {
    web: 'Website Development',
    ecommerce: 'E-Commerce',
    mobile: 'Mobile App',
    erp: 'ERP System',
    uiux: 'UI/UX Design',
    ai: 'AI Solutions',
    other: 'Other',
  },
};

const TABS = [
  { key: 'orders', icon: '📦' },
  { key: 'messages', icon: '💬' },
  { key: 'sections', icon: '📋' },
  { key: 'navbar', icon: '🔗' },
  { key: 'translations', icon: '🌍' },
  { key: 'services', icon: '⚙️' },
  { key: 'techs', icon: '💻' },
];

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        onLogin(data);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Connection error');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0A0E0D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Cairo, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: 24 }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 900 }}>
              <span style={{ color: '#B8A472' }}>B</span><span style={{ color: '#F5F0E8' }}>M</span><span style={{ color: '#B8A472' }}>C</span>
            </span>
          </Link>
          <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: 13, letterSpacing: 2, marginTop: 8 }}>ADMIN DASHBOARD</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Email</label>
          <input style={styles.input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@bmc-digital.sa" required />
          <label style={styles.label}>Password</label>
          <input style={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          {error && <p style={{ color: '#e74c3c', fontSize: 13, marginBottom: 16 }}>{error}</p>}
          <button style={{ ...styles.btn, width: '100%', padding: '14px 24px' }} type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [auth, setAuth] = useState(null);
  const [uiLang, setUiLang] = useState('ar');
  const [tab, setTab] = useState('orders');
  const [siteConfig, setSiteConfig] = useState(null);
  const [translations, setTranslations] = useState({});
  const [services, setServices] = useState([]);
  const [techs, setTechs] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [editingSection, setEditingSection] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newTech, setNewTech] = useState({ name: '', color: '#B8A472', icon: '' });

  const tr = (ar, en) => (uiLang === 'ar' ? ar : en);
  const tabsLabels = {
    orders: tr('الطلبات', 'Orders'),
    messages: tr('رسائل التواصل', 'Contact Us'),
    sections: tr('إظهار الأقسام', 'Section Visibility'),
    navbar: tr('روابط النافبار', 'Navbar'),
    translations: tr('الترجمات', 'Translations'),
    services: tr('الخدمات', 'Services'),
    techs: tr('التقنيات', 'Tech Stack'),
  };
  const isArUI = uiLang === 'ar';
  const sidebarStyle = {
    ...styles.sidebar,
    left: isArUI ? 'auto' : 0,
    right: isArUI ? 0 : 'auto',
    borderRight: isArUI ? 'none' : '1px solid rgba(184,164,114,0.15)',
    borderLeft: isArUI ? '1px solid rgba(184,164,114,0.15)' : 'none',
  };
  const mainStyle = {
    ...styles.main,
    marginLeft: isArUI ? 0 : 240,
    marginRight: isArUI ? 240 : 0,
  };
  const navItemStyle = (active) => ({
    ...styles.navItem(active),
    borderRight: isArUI ? '3px solid transparent' : (active ? '3px solid #B8A472' : '3px solid transparent'),
    borderLeft: isArUI ? (active ? '3px solid #B8A472' : '3px solid transparent') : '3px solid transparent',
  });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      fetch(`${API_BASE}/auth/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.valid) {
            setAuth({ token, email: data.email });
          } else {
            localStorage.removeItem('admin_token');
          }
        })
        .catch(() => localStorage.removeItem('admin_token'));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auth) loadData();
  }, [auth]);

  const handleLogin = (data) => {
    setAuth(data);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setAuth(null);
  };

  const loadData = async () => {
    try {
      const [config, trans, svc, tech, ords, msgs] = await Promise.all([
        fetchAPI('/site-config'),
        fetchAPI('/translations'),
        fetchAPI('/services'),
        fetchAPI('/techs'),
        fetchAPI('/orders'),
        fetchAPI('/contact'),
      ]);
      setSiteConfig(config);
      setTranslations(trans);
      setServices(svc);
      setTechs(tech);
      setOrders(ords);
      setMessages(msgs);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const flash = () => {
    setSaved(true);
    showToast(tr('تم الحفظ بنجاح', 'Saved successfully'), 'success');
    setTimeout(() => setSaved(false), 2000);
  };

  const askConfirm = (message, onConfirm) => {
    setConfirmDialog({ message, onConfirm });
  };

  const toggleSection = async (key) => {
    const sections = siteConfig.sections.map(s => s.key === key ? { ...s, visible: !s.visible } : s);
    const updated = await putAPI('/site-config', { ...siteConfig, sections });
    setSiteConfig(updated);
    flash();
  };

  const toggleNav = async (key) => {
    const navLinks = siteConfig.navLinks.map(n => n.key === key ? { ...n, visible: !n.visible } : n);
    const updated = await putAPI('/site-config', { ...siteConfig, navLinks });
    setSiteConfig(updated);
    flash();
  };

  const saveTranslation = async (section) => {
    await putAPI(`/translations/${section}`, { data: translations[section] });
    flash();
    setEditingSection(null);
  };

  const updateTxField = (section, lang, field, value) => {
    setTranslations(prev => ({
      ...prev,
      [section]: { ...prev[section], [lang]: { ...prev[section][lang], [field]: value } }
    }));
  };

  const updateTxArrayItem = (section, lang, arrKey, index, field, value) => {
    setTranslations(prev => {
      const arr = [...(prev[section]?.[lang]?.[arrKey] || [])];
      if (field) {
        arr[index] = { ...arr[index], [field]: value };
      } else {
        arr[index] = value;
      }
      return {
        ...prev,
        [section]: { ...prev[section], [lang]: { ...prev[section][lang], [arrKey]: arr } }
      };
    });
  };

  const saveService = async (svc) => {
    if (svc._id) {
      await putAPI(`/services/${svc._id}`, svc);
    } else {
      await postAPI('/services', svc);
    }
    loadData();
    setEditingService(null);
    flash();
  };

  const deleteService = async (id) => {
    askConfirm(
      tr('هل تريد حذف هذه الخدمة؟', 'Delete this service?'),
      async () => {
        await deleteAPI(`/services/${id}`);
        loadData();
        showToast(tr('تم حذف الخدمة', 'Service deleted'));
      }
    );
  };

  const addTech = async () => {
    if (!newTech.name) return;
    await postAPI('/techs', newTech);
    setNewTech({ name: '', color: '#B8A472', icon: '' });
    loadData();
    flash();
  };
  const removeTech = async (id) => {
    askConfirm(
      tr('هل تريد حذف هذه التقنية؟', 'Delete this technology?'),
      async () => {
        await deleteAPI(`/techs/${id}`);
        loadData();
        showToast(tr('تم حذف التقنية', 'Technology deleted'));
      }
    );
  };
  const updateTech = async (tech) => {
    await putAPI(`/techs/${tech._id}`, tech);
    loadData();
    flash();
  };

  // Order actions
  const updateOrderStatus = async (id, status) => {
    await putAPI(`/orders/${id}`, { status });
    loadData();
    showToast(tr('تم تحديث حالة الطلب', 'Order status updated'));
  };

  const deleteOrder = async (id) => {
    askConfirm(
      tr('هل تريد حذف هذا الطلب؟', 'Delete this order?'),
      async () => {
        await deleteAPI(`/orders/${id}`);
        loadData();
        showToast(tr('تم حذف الطلب', 'Order deleted'));
      }
    );
  };

  // Message actions
  const toggleMessageRead = async (msg) => {
    await putAPI(`/contact/${msg._id}`, { read: !msg.read });
    loadData();
    flash();
  };

  const deleteMessage = async (id) => {
    askConfirm(
      tr('هل تريد حذف هذه الرسالة؟', 'Delete this message?'),
      async () => {
        await deleteAPI(`/contact/${id}`);
        loadData();
        showToast(tr('تم حذف الرسالة', 'Message deleted'));
      }
    );
  };

  const newOrdersCount = orders.filter(o => o.status === 'new').length;
  const unreadMessagesCount = messages.filter(m => !m.read).length;

  if (!auth) return <LoginPage onLogin={handleLogin} />;
  if (loading) return <div style={{ ...styles.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ color: '#B8A472' }}>Loading...</p></div>;

  return (
    <div style={{ ...styles.page, direction: uiLang === 'ar' ? 'rtl' : 'ltr' }}>
      <div style={sidebarStyle}>
        <Link to="/" style={styles.sidebarLogo}>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 900 }}>
            <span style={{ color: '#B8A472' }}>B</span><span style={{ color: '#F5F0E8' }}>M</span><span style={{ color: '#B8A472' }}>C</span>
          </span>
          <span style={{ fontSize: 11, color: 'rgba(245,240,232,0.5)', letterSpacing: 1 }}>ADMIN</span>
        </Link>
        {TABS.map(t => (
          <div key={t.key} style={navItemStyle(tab === t.key)} onClick={() => setTab(t.key)}>
            <span>{t.icon}</span>
            <span>{tabsLabels[t.key]}</span>
            {t.key === 'orders' && newOrdersCount > 0 && <span style={styles.badge(newOrdersCount)}>{newOrdersCount}</span>}
            {t.key === 'messages' && unreadMessagesCount > 0 && <span style={styles.badge(unreadMessagesCount)}>{unreadMessagesCount}</span>}
          </div>
        ))}
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(184,164,114,0.1)', marginTop: 16 }}>
          <button onClick={() => setUiLang(prev => (prev === 'ar' ? 'en' : 'ar'))} style={{ ...styles.langSwitch, width: '100%', justifyContent: 'center', marginBottom: 10 }}>
            {uiLang === 'ar' ? 'English' : 'العربية'}
          </button>
          <p style={{ fontSize: 11, color: 'rgba(245,240,232,0.3)', marginBottom: 8 }}>{auth.email}</p>
          <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(231,76,60,0.3)', color: '#e74c3c', padding: '8px 16px', fontSize: 12, cursor: 'pointer', borderRadius: 2, width: '100%' }}>
            {tr('تسجيل الخروج', 'Logout')}
          </button>
        </div>
      </div>

      <div style={mainStyle}>
        {saved && (
          <div style={{ position: 'fixed', top: 20, right: 20, background: '#27ae60', color: '#fff', padding: '12px 24px', borderRadius: 4, zIndex: 9999, fontWeight: 700, fontSize: 14 }}>
            {tr('✓ تم الحفظ', '✓ Saved successfully')}
          </div>
        )}
        {toast && (
          <div
            style={{
              position: 'fixed',
              top: 72,
              right: 20,
              background: toast.type === 'error' ? '#c0392b' : '#1f8f58',
              color: '#fff',
              padding: '10px 18px',
              borderRadius: 4,
              zIndex: 10000,
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            {toast.message}
          </div>
        )}
        {confirmDialog && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 11000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 'min(460px, 92vw)', background: '#111614', border: '1px solid rgba(184,164,114,0.28)', padding: 22 }}>
              <p style={{ fontSize: 15, color: '#F5F0E8', marginBottom: 18 }}>{confirmDialog.message}</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button style={styles.btnSmall} onClick={() => setConfirmDialog(null)}>{tr('إلغاء', 'Cancel')}</button>
                <button
                  style={{ ...styles.btnDanger, padding: '8px 18px' }}
                  onClick={async () => {
                    await confirmDialog.onConfirm();
                    setConfirmDialog(null);
                  }}
                >
                  {tr('حذف', 'Delete')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ==================== ORDERS TAB ==================== */}
        {tab === 'orders' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h1 style={styles.title}>📦 {tr('الطلبات', 'Orders')}</h1>
                <p style={styles.subtitle}>
                  {orders.length} {tr('إجمالي الطلبات', 'total orders')} · {newOrdersCount} {tr('جديد', 'new')}
                </p>
              </div>
              <button style={{ ...styles.btnSmall, alignSelf: 'flex-start' }} onClick={loadData}>🔄 {tr('تحديث', 'Refresh')}</button>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: tr('جديد', 'New'), count: orders.filter(o => o.status === 'new').length, color: '#3498db' },
                { label: tr('قيد التنفيذ', 'In Progress'), count: orders.filter(o => o.status === 'in_progress').length, color: '#f1c40f' },
                { label: tr('مكتمل', 'Completed'), count: orders.filter(o => o.status === 'completed').length, color: '#2ecc71' },
                { label: tr('ملغي', 'Cancelled'), count: orders.filter(o => o.status === 'cancelled').length, color: '#e74c3c' },
              ].map(s => (
                <div key={s.label} style={{ ...styles.card, padding: 20, textAlign: 'center', borderTop: `3px solid ${s.color}` }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: s.color, fontFamily: 'Playfair Display, serif' }}>{s.count}</div>
                  <div style={{ fontSize: 12, color: 'rgba(245,240,232,0.5)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {orders.length === 0 ? (
              <div style={{ ...styles.card, textAlign: 'center', padding: '60px 24px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
                <p style={{ color: 'rgba(245,240,232,0.4)' }}>{tr('لا توجد طلبات حالياً', 'No orders yet')}</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order._id} style={{
                  ...styles.card,
                  borderLeft: order.status === 'new' ? '3px solid #3498db' : order.status === 'in_progress' ? '3px solid #f1c40f' : order.status === 'completed' ? '3px solid #2ecc71' : '3px solid #e74c3c',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                        <span style={{ fontSize: 17, fontWeight: 700, color: '#F5F0E8' }}>{order.name}</span>
                        <span style={styles.statusBadge(order.status)}>{statusLabels[uiLang][order.status]}</span>
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(245,240,232,0.4)' }}>
                        {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        style={styles.statusSelect}
                      >
                        <option value="new" style={{ background: '#131816', color: '#F5F0E8' }}>{statusLabels[uiLang].new}</option>
                        <option value="in_progress" style={{ background: '#131816', color: '#F5F0E8' }}>{statusLabels[uiLang].in_progress}</option>
                        <option value="completed" style={{ background: '#131816', color: '#F5F0E8' }}>{statusLabels[uiLang].completed}</option>
                        <option value="cancelled" style={{ background: '#131816', color: '#F5F0E8' }}>{statusLabels[uiLang].cancelled}</option>
                      </select>
                      <button title={tr('حذف الطلب', 'Delete order')} style={styles.iconDanger} onClick={() => deleteOrder(order._id)}>🗑</button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
                    <div style={{ background: 'rgba(184,164,114,0.05)', padding: '10px 14px', borderRadius: 2 }}>
                      <span style={{ fontSize: 11, color: '#B8A472', fontWeight: 600 }}>📞 {tr('الهاتف', 'Phone')}</span>
                      <div style={{ fontSize: 14, color: '#F5F0E8', marginTop: 4 }} dir="ltr">{order.phone}</div>
                    </div>
                    <div style={{ background: 'rgba(184,164,114,0.05)', padding: '10px 14px', borderRadius: 2 }}>
                      <span style={{ fontSize: 11, color: '#B8A472', fontWeight: 600 }}>💬 {tr('طريقة التواصل', 'Contact')}</span>
                      <div style={{ fontSize: 14, color: '#F5F0E8', marginTop: 4 }}>{order.contact}</div>
                    </div>
                    <div style={{ background: 'rgba(184,164,114,0.05)', padding: '10px 14px', borderRadius: 2 }}>
                      <span style={{ fontSize: 11, color: '#B8A472', fontWeight: 600 }}>⚙️ {tr('الخدمة', 'Service')}</span>
                      <div style={{ marginTop: 4 }}><span style={styles.tag}>{serviceLabels[uiLang][order.service] || order.service}</span></div>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(184,164,114,0.05)', padding: '14px', borderRadius: 2, marginBottom: order.extra ? 12 : 0 }}>
                    <span style={{ fontSize: 11, color: '#B8A472', fontWeight: 600 }}>📝 {tr('تفاصيل الطلب', 'Details')}</span>
                    <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.7)', marginTop: 6, lineHeight: 1.8 }}>{order.details}</p>
                  </div>

                  {order.extra && (
                    <div style={{ background: 'rgba(184,164,114,0.03)', padding: '14px', borderRadius: 2, borderLeft: '2px solid rgba(184,164,114,0.2)' }}>
                      <span style={{ fontSize: 11, color: 'rgba(245,240,232,0.4)', fontWeight: 600 }}>📎 {tr('معلومات إضافية', 'Extra Info')}</span>
                      <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.5)', marginTop: 4, lineHeight: 1.8 }}>{order.extra}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </>
        )}

        {/* ==================== MESSAGES TAB ==================== */}
        {tab === 'messages' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
                <h1 style={styles.title}>💬 {tr('رسائل التواصل', 'Contact Messages')}</h1>
                <p style={styles.subtitle}>
                  {messages.length} {tr('إجمالي الرسائل', 'total messages')} · {unreadMessagesCount} {tr('غير مقروءة', 'unread')}
                </p>
              </div>
              <button style={{ ...styles.btnSmall, alignSelf: 'flex-start' }} onClick={loadData}>🔄 {tr('تحديث', 'Refresh')}</button>
            </div>

            {messages.length === 0 ? (
              <div style={{ ...styles.card, textAlign: 'center', padding: '60px 24px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
                <p style={{ color: 'rgba(245,240,232,0.4)' }}>{tr('لا توجد رسائل حالياً', 'No messages yet')}</p>
              </div>
            ) : (
              messages.map(msg => (
                <div key={msg._id} style={{
                  ...styles.card,
                  borderLeft: msg.read ? '3px solid rgba(184,164,114,0.2)' : '3px solid #B8A472',
                  opacity: msg.read ? 0.7 : 1,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                        <span style={{ fontSize: 17, fontWeight: 700, color: '#F5F0E8' }}>{msg.name}</span>
                        {!msg.read && <span style={{ ...styles.tag, background: 'rgba(184,164,114,0.2)', color: '#B8A472' }}>● {tr('جديد', 'New')}</span>}
                      </div>
                      <div style={{ fontSize: 13, color: 'rgba(245,240,232,0.4)' }}>
                        ✉️ {msg.email} · {new Date(msg.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button
                        style={msg.read ? styles.btnSmall : { ...styles.btn, padding: '6px 14px', fontSize: 12 }}
                        onClick={() => toggleMessageRead(msg)}
                      >
                        {msg.read ? tr('تحديد كغير مقروء', 'Mark Unread') : tr('✓ تمّت القراءة', '✓ Read')}
                      </button>
                      <button title={tr('حذف الرسالة', 'Delete message')} style={styles.iconDanger} onClick={() => deleteMessage(msg._id)}>🗑</button>
                    </div>
                  </div>

                  <div style={{ background: 'rgba(184,164,114,0.05)', padding: '14px', borderRadius: 2 }}>
                    <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.7)', lineHeight: 1.8 }}>{msg.message}</p>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        {/* ==================== SECTIONS TAB ==================== */}
        {tab === 'sections' && siteConfig && (
          <>
            <h1 style={styles.title}>{tr('إظهار الأقسام', 'Section Visibility')}</h1>
            <p style={styles.subtitle}>{tr('التحكم في الأقسام الظاهرة في الصفحة الرئيسية', 'Control which sections appear on the homepage')}</p>
            <div style={styles.card}>
              {siteConfig.sections.sort((a, b) => a.order - b.order).map(s => (
                <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(184,164,114,0.08)' }}>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: s.visible ? '#F5F0E8' : 'rgba(245,240,232,0.4)' }}>{s.key.toUpperCase()}</span>
                    <span style={{ fontSize: 12, color: 'rgba(245,240,232,0.3)', marginLeft: 12 }}>{tr('الترتيب', 'Order')}: {s.order}</span>
                  </div>
                  <button style={styles.toggle(s.visible)} onClick={() => toggleSection(s.key)}>
                    <div style={styles.toggleDot(s.visible)} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ==================== NAVBAR TAB ==================== */}
        {tab === 'navbar' && siteConfig && (
          <>
            <h1 style={styles.title}>{tr('روابط النافبار', 'Navbar Links')}</h1>
            <p style={styles.subtitle}>{tr('التحكم في إظهار روابط التنقل', 'Control navigation links visibility')}</p>
            <div style={styles.card}>
              {siteConfig.navLinks.sort((a, b) => a.order - b.order).map(n => (
                <div key={n.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid rgba(184,164,114,0.08)' }}>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 600, color: n.visible ? '#F5F0E8' : 'rgba(245,240,232,0.4)' }}>{n.labelEn}</span>
                    <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.4)', marginRight: 12 }}>{n.labelAr}</span>
                  </div>
                  <button style={styles.toggle(n.visible)} onClick={() => toggleNav(n.key)}>
                    <div style={styles.toggleDot(n.visible)} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ==================== TRANSLATIONS TAB ==================== */}
        {tab === 'translations' && (
          <>
            <h1 style={styles.title}>{tr('الترجمات', 'Translations')}</h1>
            <p style={styles.subtitle}>{tr('تعديل النصوص العربية والإنجليزية لكل قسم', 'Edit Arabic and English text for each section')}</p>
            {Object.keys(translations).map(section => (
              <div key={section} style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#B8A472', textTransform: 'capitalize' }}>{section}</h3>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={styles.btnSmall} onClick={() => setEditingSection(editingSection === section ? null : section)}>
                      {editingSection === section ? 'Cancel' : '✏️ Edit'}
                    </button>
                    {editingSection === section && (
                      <button style={styles.btn} onClick={() => saveTranslation(section)}>💾 Save</button>
                    )}
                  </div>
                </div>
                {editingSection === section ? (
                  ['ar', 'en'].map(lang => (
                    <div key={lang} style={{ marginBottom: 24 }}>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: 'rgba(245,240,232,0.6)', marginBottom: 12, borderBottom: '1px solid rgba(184,164,114,0.08)', paddingBottom: 8 }}>
                        {lang === 'ar' ? '🇸🇦 Arabic' : '🇬🇧 English'}
                      </h4>
                      {translations[section]?.[lang] && Object.entries(translations[section][lang]).map(([field, value]) => {
                        if (Array.isArray(value)) {
                          return value.map((item, idx) => (
                            <div key={`${field}-${idx}`} style={{ background: 'rgba(184,164,114,0.03)', padding: 12, borderRadius: 2, marginBottom: 12 }}>
                              <span style={{ fontSize: 11, color: '#B8A472', fontWeight: 600 }}>{field}[{idx}]</span>
                              {typeof item === 'string' ? (
                                <input style={styles.input} value={item} onChange={e => updateTxArrayItem(section, lang, field, idx, '', e.target.value)} />
                              ) : (
                                Object.entries(item).map(([k, v]) => (
                                  <div key={k}>
                                    <label style={styles.label}>{k}</label>
                                    <input style={styles.input} value={typeof v === 'string' ? v : JSON.stringify(v)} onChange={e => updateTxArrayItem(section, lang, field, idx, k, e.target.value)} />
                                  </div>
                                ))
                              )}
                            </div>
                          ));
                        }
                        if (typeof value === 'string') {
                          return (
                            <div key={field}>
                              <label style={styles.label}>{field}</label>
                              {value.length > 80 ? (
                                <textarea style={styles.textarea} value={value} onChange={e => updateTxField(section, lang, field, e.target.value)} />
                              ) : (
                                <input style={styles.input} value={value} onChange={e => updateTxField(section, lang, field, e.target.value)} />
                              )}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ))
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                    <div>
                      <h4 style={{ fontSize: 13, fontWeight: 700, color: 'rgba(245,240,232,0.4)', marginBottom: 8 }}>🇸🇦 Arabic</h4>
                      {translations[section]?.ar && Object.entries(translations[section].ar).map(([k, v]) => (
                        <div key={k} style={{ marginBottom: 4 }}>
                          <span style={{ fontSize: 11, color: '#B8A472' }}>{k}:</span>
                          <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.6)', marginRight: 8 }}> {Array.isArray(v) ? `[${v.length} items]` : typeof v === 'string' ? v.substring(0, 60) : JSON.stringify(v).substring(0, 60)}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 13, fontWeight: 700, color: 'rgba(245,240,232,0.4)', marginBottom: 8 }}>🇬🇧 English</h4>
                      {translations[section]?.en && Object.entries(translations[section].en).map(([k, v]) => (
                        <div key={k} style={{ marginBottom: 4 }}>
                          <span style={{ fontSize: 11, color: '#B8A472' }}>{k}:</span>
                          <span style={{ fontSize: 13, color: 'rgba(245,240,232,0.6)', marginRight: 8 }}> {Array.isArray(v) ? `[${v.length} items]` : typeof v === 'string' ? v.substring(0, 60) : JSON.stringify(v).substring(0, 60)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* ==================== SERVICES TAB ==================== */}
        {tab === 'services' && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <div>
            <h1 style={styles.title}>{tr('الخدمات', 'Services')}</h1>
            <p style={styles.subtitle}>{tr('إدارة خدماتك', 'Manage your services')}</p>
              </div>
              <button style={styles.btn} onClick={() => setEditingService({ slug: '', icon: '🌐', titleAr: '', titleEn: '', descAr: '', descEn: '', featuresAr: [''], featuresEn: [''], detailTitleAr: '', detailTitleEn: '', detailTitleSpanAr: '', detailTitleSpanEn: '', detailDescAr: '', detailDescEn: '', benefitsAr: [{ title: '', desc: '' }], benefitsEn: [{ title: '', desc: '' }], order: services.length, visible: true })}>
                + {tr('إضافة خدمة', 'Add Service')}
              </button>
            </div>
            {services.map(svc => (
              <div key={svc._id} style={styles.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{svc.icon}</div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#F5F0E8' }}>{svc.titleEn}</h3>
                    <p style={{ fontSize: 13, color: 'rgba(245,240,232,0.4)', direction: 'rtl' }}>{svc.titleAr}</p>
                    <div style={{ marginTop: 8 }}>
                      <span style={styles.tag}>{svc.slug}</span>
                      <span style={styles.tag}>{svc.visible ? tr('✅ ظاهر', '✅ Visible') : tr('❌ مخفي', '❌ Hidden')}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button style={styles.btnSmall} onClick={() => setEditingService({ ...svc })}>✏️ {tr('تعديل', 'Edit')}</button>
                    <button style={styles.btnDanger} onClick={() => deleteService(svc._id)}>🗑️ {tr('حذف', 'Delete')}</button>
                  </div>
                </div>
              </div>
            ))}
            {editingService && (
              <ServiceEditor svc={editingService} onSave={saveService} onCancel={() => setEditingService(null)} uiLang={uiLang} />
            )}
          </>
        )}

        {/* ==================== TECHS TAB ==================== */}
        {tab === 'techs' && (
          <>
            <h1 style={styles.title}>{tr('التقنيات', 'Tech Stack')}</h1>
            <p style={styles.subtitle}>{tr('إدارة التقنيات', 'Manage technologies')}</p>
            <div style={styles.card}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Name</label>
                  <input style={styles.input} value={newTech.name} onChange={e => setNewTech({ ...newTech, name: e.target.value })} placeholder="e.g. React" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Icon URL</label>
                  <input
                    style={styles.input}
                    value={newTech.icon}
                    onChange={e => setNewTech({ ...newTech, icon: e.target.value })}
                    placeholder="https://cdn.simpleicons.org/react"
                  />
                </div>
                <div style={{ width: 80 }}>
                  <label style={styles.label}>Color</label>
                  <input type="color" value={newTech.color} onChange={e => setNewTech({ ...newTech, color: e.target.value })} style={{ width: '100%', height: 40, border: '1px solid rgba(184,164,114,0.2)', background: 'transparent', cursor: 'pointer' }} />
                </div>
                <button style={styles.btn} onClick={addTech}>+ Add</button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {techs.map(t => (
                  <div key={t._id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'rgba(184,164,114,0.05)', border: '1px solid rgba(184,164,114,0.15)', borderRadius: 2 }}>
                    {t.icon ? (
                      <img
                        src={t.icon}
                        alt={t.name}
                        width={14}
                        height={14}
                        style={{ width: 14, height: 14, objectFit: 'contain', display: 'block' }}
                      />
                    ) : (
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: t.color }} />
                    )}
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{t.name}</span>
                    <input
                      style={{ ...styles.input, width: 200, marginBottom: 0, padding: '6px 8px', fontSize: 12 }}
                      value={t.icon || ''}
                      onChange={(e) => setTechs(prev => prev.map(item => (item._id === t._id ? { ...item, icon: e.target.value } : item)))}
                      placeholder="Icon URL"
                    />
                    <button onClick={() => updateTech(t)} style={{ ...styles.btnSmall, padding: '6px 10px' }}>💾</button>
                    <button onClick={() => removeTech(t._id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: 14, padding: '0 4px' }}>×</button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ServiceEditor({ svc, onSave, onCancel, uiLang }) {
  const [form, setForm] = useState({ ...svc });
  const f = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const isArUI = uiLang === 'ar';

  return (
    <div
      style={{
        ...styles.card,
        position: 'fixed',
        top: 0,
        left: isArUI ? 0 : 240,
        right: isArUI ? 240 : 0,
        bottom: 0,
        zIndex: 100,
        overflow: 'auto',
        borderRadius: 0,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#B8A472' }}>{form._id ? 'Edit Service' : 'New Service'}</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button style={styles.btnSmall} onClick={onCancel}>Cancel</button>
          <button style={styles.btn} onClick={() => onSave(form)}>💾 Save Service</button>
        </div>
      </div>
      <div style={styles.grid2}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'rgba(245,240,232,0.6)', marginBottom: 16 }}>🇬🇧 English</h3>
          <label style={styles.label}>Title</label><input style={styles.input} value={form.titleEn} onChange={e => f('titleEn', e.target.value)} />
          <label style={styles.label}>Description</label><textarea style={styles.textarea} value={form.descEn} onChange={e => f('descEn', e.target.value)} />
          <label style={styles.label}>Detail Title</label><input style={styles.input} value={form.detailTitleEn} onChange={e => f('detailTitleEn', e.target.value)} />
          <label style={styles.label}>Detail Title Span</label><input style={styles.input} value={form.detailTitleSpanEn} onChange={e => f('detailTitleSpanEn', e.target.value)} />
          <label style={styles.label}>Detail Description</label><textarea style={styles.textarea} value={form.detailDescEn} onChange={e => f('detailDescEn', e.target.value)} />
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'rgba(245,240,232,0.6)', marginBottom: 16 }}>🇸🇦 Arabic</h3>
          <label style={styles.label}>العنوان</label><input style={styles.input} value={form.titleAr} onChange={e => f('titleAr', e.target.value)} />
          <label style={styles.label}>الوصف</label><textarea style={styles.textarea} value={form.descAr} onChange={e => f('descAr', e.target.value)} />
          <label style={styles.label}>عنوان التفاصيل</label><input style={styles.input} value={form.detailTitleAr} onChange={e => f('detailTitleAr', e.target.value)} />
          <label style={styles.label}>عنوان التفاصيل الفرعي</label><input style={styles.input} value={form.detailTitleSpanAr} onChange={e => f('detailTitleSpanAr', e.target.value)} />
          <label style={styles.label}>وصف التفاصيل</label><textarea style={styles.textarea} value={form.detailDescAr} onChange={e => f('detailDescAr', e.target.value)} />
        </div>
      </div>
      <div style={{ marginTop: 16 }}>
        <label style={styles.label}>Slug</label><input style={{ ...styles.input, maxWidth: 400 }} value={form.slug} onChange={e => f('slug', e.target.value)} />
        <label style={styles.label}>Icon</label><input style={{ ...styles.input, maxWidth: 100 }} value={form.icon} onChange={e => f('icon', e.target.value)} />
        <label style={styles.label}>Order</label><input type="number" style={{ ...styles.input, maxWidth: 100 }} value={form.order} onChange={e => f('order', Number(e.target.value))} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <label style={styles.label}>Visible</label>
          <button style={styles.toggle(form.visible)} onClick={() => f('visible', !form.visible)}>
            <div style={styles.toggleDot(form.visible)} />
          </button>
        </div>
      </div>
    </div>
  );
}
