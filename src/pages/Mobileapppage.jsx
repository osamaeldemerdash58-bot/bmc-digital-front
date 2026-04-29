import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

const data = {
  ar: {
    bgText: 'APP',
    icon: '📱',
    badge: 'تطوير التطبيقات',
    title: 'تطبيقات جوال',
    titleSpan: 'لتجربة لا تُنسى',
    subtitle: 'نطور تطبيقات احترافية لنظامي iOS و Android تعكس هوية علامتك التجارية وتمنح مستخدميك تجربة استثنائية.',
    offerTitle: 'ما الذي نقدمه لك؟',
    serviceValue: 'mobile',
    features: [
      { title: 'iOS و Android', desc: 'تطوير للمنصتين بتقنية React Native لأداء أصيل وتجربة سلسة.' },
      { title: 'تصميم UI/UX جذاب', desc: 'واجهات مستخدم مصممة بعناية تتبع أحدث معايير تجربة الجوال.' },
      { title: 'أداء عالي وسرعة', desc: 'تطبيقات مُحسَّنة للأداء تعمل بسلاسة على جميع الأجهزة.' },
      { title: 'إشعارات Push', desc: 'نظام إشعارات ذكي للتواصل مع مستخدميك في الوقت المناسب.' },
      { title: 'تكامل مع APIs', desc: 'ربط سلس مع الخدمات الخارجية وقواعد البيانات وخدمات الدفع.' },
      { title: 'نشر على المتاجر', desc: 'إدارة كاملة لنشر التطبيق على App Store و Google Play.' },
    ],
    stats: [
      { value: '20+', label: 'تطبيق أُطلق' },
      { value: '4.8★', label: 'متوسط التقييم' },
      { value: '100K+', label: 'مستخدم نشط' },
    ],
    formTitle: 'اطلب تطبيقك الآن',
    formSubtitle: 'أخبرنا بفكرة تطبيقك وسنحولها إلى واقع رقمي مميز.',
  },
  en: {
    bgText: 'APP',
    icon: '📱',
    badge: 'Mobile App Development',
    title: 'Mobile Apps for',
    titleSpan: 'Unforgettable Experiences',
    subtitle: 'We develop professional apps for iOS and Android that reflect your brand identity and give your users an exceptional experience.',
    offerTitle: 'What We Offer You',
    serviceValue: 'mobile',
    features: [
      { title: 'iOS & Android', desc: 'Development for both platforms using React Native for native performance and smooth experience.' },
      { title: 'Attractive UI/UX Design', desc: 'Carefully designed user interfaces following the latest mobile experience standards.' },
      { title: 'High Performance & Speed', desc: 'Performance-optimized apps that run smoothly on all devices.' },
      { title: 'Push Notifications', desc: 'Smart notification system to communicate with your users at the right time.' },
      { title: 'API Integration', desc: 'Seamless integration with external services, databases and payment services.' },
      { title: 'Store Publishing', desc: 'Full management of publishing your app to the App Store and Google Play.' },
    ],
    stats: [
      { value: '20+', label: 'Apps Launched' },
      { value: '4.8★', label: 'Avg Rating' },
      { value: '100K+', label: 'Active Users' },
    ],
    formTitle: 'Request Your App Now',
    formSubtitle: 'Tell us your app idea and we will turn it into a distinctive digital reality.',
  },
};

export default function MobileAppPage({ lang, setLang }) {
  return <ServiceDetailPage lang={lang} setLang={setLang} data={data} />;
}