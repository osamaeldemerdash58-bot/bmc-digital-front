import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

const data = {
  ar: {
    bgText: 'DM',
    icon: '📣',
    badge: 'التسويق الرقمي',
    title: 'حلول',
    titleSpan: 'التسويق الرقمي',
    subtitle: 'نقدّم حلول تسويق إلكتروني متكاملة تساعدك على جذب العملاء، زيادة المبيعات، ورفع حضور علامتك التجارية على جميع المنصات الرقمية.',
    offerTitle: 'ما الذي نقدمه لك؟',
    serviceValue: 'ai',
    features: [
      { title: 'إدارة الحملات الإعلانية', desc: 'إدارة الحملات على فيسبوك، إنستجرام، تيك توك، سناب شات وجوجل للوصول للجمهور المناسب.' },
      { title: 'الاستراتيجيات وخطط المحتوى', desc: 'إعداد استراتيجيات تسويقية واضحة وخطط محتوى تدعم نمو علامتك التجارية.' },
      { title: 'تحليل الأداء والتحسين', desc: 'متابعة النتائج وتحليل الأداء وتحسين الحملات بشكل مستمر لرفع العائد.' },
      { title: 'إدارة السوشيال ميديا', desc: 'إدارة الصفحات وصناعة محتوى احترافي يعزز التفاعل والحضور الرقمي.' },
      { title: 'الإعلانات والمنشورات', desc: 'كتابة إعلانات جذابة وتصميم منشورات عالية الجودة تعكس هويتك.' },
      { title: 'رفع التحويلات', desc: 'بناء جمهور مستهدف وتحسين معدل التحويل للوصول إلى نتائج ملموسة.' },
    ],
    stats: [
      { value: '5+', label: 'منصات إعلانية' },
      { value: '90%', label: 'تحسين الاستهداف' },
      { value: '24/7', label: 'متابعة رقمية' },
    ],
    formTitle: 'اطلب خدمة التسويق الرقمي',
    formSubtitle: 'أخبرنا عن احتياجاتك وسنقدّم لك خطة تسويقية تناسب أهداف عملك.',
  },
  en: {
    bgText: 'DM',
    icon: '📣',
    badge: 'Digital Marketing',
    title: 'Digital',
    titleSpan: 'Marketing',
    subtitle: 'We deliver integrated digital marketing solutions that help you attract customers, increase sales, and strengthen your brand presence across digital platforms.',
    offerTitle: 'What We Offer You',
    serviceValue: 'ai',
    features: [
      { title: 'Ad Campaign Management', desc: 'Manage campaigns across Facebook, Instagram, TikTok, Snapchat, and Google.' },
      { title: 'Strategy and Content Plans', desc: 'Build clear marketing strategies and content plans aligned with your goals.' },
      { title: 'Performance Optimization', desc: 'Track results, analyze data, and improve campaigns continuously.' },
      { title: 'Social Media Management', desc: 'Manage social platforms and produce professional content for stronger presence.' },
      { title: 'Ad Copy and Creatives', desc: 'Write compelling ads and design high-quality posts that match your brand.' },
      { title: 'Conversion Growth', desc: 'Build target audiences and improve conversion rates for measurable results.' },
    ],
    stats: [
      { value: '5+', label: 'Ad Platforms' },
      { value: '90%', label: 'Better Targeting' },
      { value: '24/7', label: 'Digital Follow-Up' },
    ],
    formTitle: 'Request Digital Marketing',
    formSubtitle: 'Tell us about your needs and we will build a marketing plan tailored to your business goals.',
  },
};

export default function AiSolutionsPage({ lang, setLang }) {
  return <ServiceDetailPage lang={lang} setLang={setLang} data={data} />;
}
