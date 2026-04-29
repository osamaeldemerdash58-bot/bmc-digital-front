import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

const data = {
  ar: {
    bgText: 'WEB',
    icon: '🌐',
    badge: 'تطوير المواقع',
    title: 'مواقع إلكترونية',
    titleSpan: 'احترافية عالية الأداء',
    subtitle: 'نصمم ونطور مواقع إلكترونية تعكس هويتك التجارية وتحقق أهدافك الرقمية بأعلى معايير الجودة والأداء.',
    offerTitle: 'ما الذي نقدمه لك؟',
    serviceValue: 'web',
    features: [
      { title: 'تصميم UI/UX احترافي', desc: 'واجهات جذابة وسهلة الاستخدام مصممة خصيصاً لجمهورك المستهدف.' },
      { title: 'أداء وسرعة فائقة', desc: 'مواقع مُحسَّنة لتحميل سريع يحسّن تجربة المستخدم وترتيب البحث.' },
      { title: 'تحسين محركات البحث SEO', desc: 'بنية تقنية صحيحة تضمن ظهور موقعك في الصفحات الأولى من Google.' },
      { title: 'لوحة إدارة سهلة', desc: 'تحكم كامل في محتوى موقعك بدون الحاجة لمعرفة تقنية.' },
      { title: 'تجاوب مع كل الأجهزة', desc: 'تجربة مثالية على الجوال والتابلت والكمبيوتر بدون استثناء.' },
      { title: 'أمان وحماية متقدمة', desc: 'حماية من الاختراقات وشهادة SSL وتحديثات أمنية مستمرة.' },
    ],
    stats: [
      { value: '50+', label: 'موقع أُطلق' },
      { value: '98%', label: 'رضا العملاء' },
      { value: '2-4', label: 'أسبوع للتسليم' },
    ],
    formTitle: 'اطلب موقعك الآن',
    formSubtitle: 'أخبرنا بتفاصيل موقعك وسنتواصل معك خلال 24 ساعة.',
  },
  en: {
    bgText: 'WEB',
    icon: '🌐',
    badge: 'Web Development',
    title: 'Professional Websites',
    titleSpan: 'Built to Perform',
    subtitle: 'We design and develop websites that reflect your brand identity and achieve your digital goals with the highest quality and performance standards.',
    offerTitle: 'What We Offer You',
    serviceValue: 'web',
    features: [
      { title: 'Professional UI/UX Design', desc: 'Attractive and easy-to-use interfaces designed specifically for your target audience.' },
      { title: 'Speed & Performance', desc: 'Optimized websites for fast loading that improves user experience and search ranking.' },
      { title: 'SEO Optimization', desc: 'Correct technical structure ensuring your site appears on the first pages of Google.' },
      { title: 'Easy Admin Panel', desc: 'Full control over your site content without needing technical knowledge.' },
      { title: 'Fully Responsive', desc: 'Perfect experience on mobile, tablet and desktop without exception.' },
      { title: 'Security & Protection', desc: 'Protection from intrusions, SSL certificate and continuous security updates.' },
    ],
    stats: [
      { value: '50+', label: 'Sites Launched' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '2-4', label: 'Weeks Delivery' },
    ],
    formTitle: 'Request Your Website Now',
    formSubtitle: 'Tell us your website details and we will contact you within 24 hours.',
  },
};

export default function WebDevelopmentPage({ lang, setLang }) {
  return <ServiceDetailPage lang={lang} setLang={setLang} data={data} />;
}