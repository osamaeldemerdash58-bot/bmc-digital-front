import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

const data = {
  ar: {
    bgText: 'STORE',
    icon: '🛒',
    badge: 'تطوير المتاجر الإلكترونية',
    title: 'متاجر إلكترونية',
    titleSpan: 'تضاعف مبيعاتك',
    subtitle: 'نبني متاجر إلكترونية متكاملة مع بوابات دفع آمنة وتجربة تسوق استثنائية تحوّل الزوار إلى عملاء دائمين.',
    offerTitle: 'ما الذي نقدمه لك؟',
    serviceValue: 'ecommerce',
    features: [
      { title: 'بوابات دفع متعددة', desc: 'دعم مدى، فيزا، ماستر، Apple Pay وغيرها من طرق الدفع المحلية والدولية.' },
      { title: 'إدارة المخزون والمنتجات', desc: 'لوحة تحكم سهلة لإضافة المنتجات، تحديث الأسعار وإدارة المخزون في الوقت الفعلي.' },
      { title: 'تقارير وإحصاءات المبيعات', desc: 'تقارير تفصيلية عن المبيعات والزوار وسلوك العملاء لاتخاذ قرارات ذكية.' },
      { title: 'تجربة تسوق محسّنة', desc: 'تصميم سلس يوجّه العميل من الاستعراض حتى إتمام الشراء بخطوات قليلة.' },
      { title: 'تكامل مع الشحن', desc: 'ربط مع شركات الشحن الرائدة لتتبع الطلبات وإدارة التوصيل تلقائياً.' },
      { title: 'كوبونات وعروض ترويجية', desc: 'نظام متكامل للخصومات والكوبونات وبرامج الولاء لزيادة التحويل.' },
    ],
    stats: [
      { value: '30+', label: 'متجر أُطلق' },
      { value: '3x', label: 'متوسط زيادة المبيعات' },
      { value: '99.9%', label: 'وقت التشغيل' },
    ],
    formTitle: 'ابدأ متجرك الآن',
    formSubtitle: 'أخبرنا بتفاصيل متجرك وسنتواصل معك في أقرب وقت.',
  },
  en: {
    bgText: 'STORE',
    icon: '🛒',
    badge: 'E-Commerce Development',
    title: 'Online Stores That',
    titleSpan: 'Multiply Your Sales',
    subtitle: 'We build comprehensive online stores with secure payment gateways and an exceptional shopping experience that converts visitors into loyal customers.',
    offerTitle: 'What We Offer You',
    serviceValue: 'ecommerce',
    features: [
      { title: 'Multiple Payment Gateways', desc: 'Support for Mada, Visa, MasterCard, Apple Pay and other local and international payment methods.' },
      { title: 'Inventory & Product Management', desc: 'Easy control panel to add products, update prices and manage inventory in real time.' },
      { title: 'Sales Reports & Analytics', desc: 'Detailed reports on sales, visitors and customer behavior to make smart decisions.' },
      { title: 'Optimized Shopping Experience', desc: 'Smooth design that guides customers from browsing to checkout in a few steps.' },
      { title: 'Shipping Integration', desc: 'Integration with leading shipping companies to automatically track orders and manage delivery.' },
      { title: 'Coupons & Promotions', desc: 'Comprehensive system for discounts, coupons and loyalty programs to increase conversion.' },
    ],
    stats: [
      { value: '30+', label: 'Stores Launched' },
      { value: '3x', label: 'Avg Sales Increase' },
      { value: '99.9%', label: 'Uptime' },
    ],
    formTitle: 'Start Your Store Now',
    formSubtitle: 'Tell us your store details and we will contact you as soon as possible.',
  },
};

export default function EcommercePage({ lang, setLang }) {
  return <ServiceDetailPage lang={lang} setLang={setLang} data={data} />;
}