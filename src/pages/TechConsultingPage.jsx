import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

const data = {
  ar: {
    bgText: 'CONSULT',
    icon: '💡',
    badge: 'استشارات تقنية ودعم',
    title: 'استشارات تقنية',
    titleSpan: 'وخطط تحول رقمي',
    subtitle: 'نقدم استشارات تقنية متخصصة وخطط تحول رقمي شاملة مع دعم مستمر وصيانة دورية لضمان استمرارية ونمو أعمالك.',
    offerTitle: 'ما الذي نقدمه لك؟',
    serviceValue: 'other',
    features: [
      { title: 'تحليل البنية التحتية', desc: 'تقييم شامل للبنية التقنية الحالية وتحديد نقاط القوة والضعف والفرص.' },
      { title: 'خطة التحول الرقمي', desc: 'وضع خطة استراتيجية متكاملة لتحويل أعمالك رقمياً بمراحل واضحة.' },
      { title: 'اختيار التقنيات المناسبة', desc: 'مساعدتك في اختيار الأدوات والمنصات الأنسب لتحقيق أهدافك التقنية.' },
      { title: 'الصيانة والدعم المستمر', desc: 'دعم فني متواصل وصيانة دورية لضمان عمل أنظمتك بكفاءة عالية.' },
      { title: 'تدريب الفريق', desc: 'تدريب فريقك على استخدام الأنظمة والتقنيات الجديدة بأقصى كفاءة.' },
      { title: 'أمن المعلومات', desc: 'تقييم وتحسين أمان أنظمتك وحماية بياناتك من التهديدات السيبرانية.' },
    ],
    stats: [
      { value: '25+', label: 'عميل استشاري' },
      { value: '99.9%', label: 'وقت التشغيل' },
      { value: '24/7', label: 'دعم متواصل' },
    ],
    formTitle: 'اطلب استشارتك الآن',
    formSubtitle: 'أخبرنا عن تحدياتك التقنية وسنساعدك في إيجاد الحلول المثالية.',
  },
  en: {
    bgText: 'CONSULT',
    icon: '💡',
    badge: 'Tech Consulting & Support',
    title: 'Technical Consulting',
    titleSpan: '& Digital Transformation',
    subtitle: 'We provide expert technical consulting and comprehensive digital transformation plans with ongoing support and maintenance to ensure your business continuity and growth.',
    offerTitle: 'What We Offer You',
    serviceValue: 'other',
    features: [
      { title: 'Infrastructure Analysis', desc: 'Comprehensive assessment of current technical infrastructure identifying strengths, weaknesses, and opportunities.' },
      { title: 'Digital Transformation Plan', desc: 'Developing an integrated strategic plan to digitally transform your business with clear phases.' },
      { title: 'Technology Selection', desc: 'Helping you choose the most suitable tools and platforms to achieve your technical goals.' },
      { title: 'Ongoing Maintenance & Support', desc: 'Continuous technical support and periodic maintenance to ensure your systems run efficiently.' },
      { title: 'Team Training', desc: 'Training your team to use new systems and technologies with maximum efficiency.' },
      { title: 'Information Security', desc: 'Evaluating and improving your system security and protecting your data from cyber threats.' },
    ],
    stats: [
      { value: '25+', label: 'Consulting Clients' },
      { value: '99.9%', label: 'Uptime' },
      { value: '24/7', label: 'Continuous Support' },
    ],
    formTitle: 'Request Your Consultation Now',
    formSubtitle: 'Tell us about your technical challenges and we will help you find the ideal solutions.',
  },
};

export default function TechConsultingPage({ lang, setLang }) {
  return <ServiceDetailPage lang={lang} setLang={setLang} data={data} />;
}