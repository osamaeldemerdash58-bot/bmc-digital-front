import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

const data = {
  ar: {
    bgText: 'AI',
    icon: '🤖',
    badge: 'حلول الذكاء الاصطناعي',
    title: 'حلول ذكية',
    titleSpan: 'تعزز أعمالك',
    subtitle: 'ندمج تقنيات الذكاء الاصطناعي في منتجاتك لتحليل البيانات وأتمتة العمليات وتقديم تجارب مخصصة لعملائك.',
    offerTitle: 'ما الذي نقدمه لك؟',
    serviceValue: 'ai',
    features: [
      { title: 'روبوتات المحادثة Chatbots', desc: 'بوتات ذكية للدعم الفوري والإجابة على استفسارات العملاء على مدار الساعة.' },
      { title: 'تحليل البيانات الذكي', desc: 'تحليل متقدم لبيانات عملك باستخدام تقنيات ML لاستخراج رؤى قابلة للتنفيذ.' },
      { title: 'أنظمة التوصية', desc: 'خوارزميات توصية ذكية لتحسين تجربة المستخدم وزيادة المبيعات.' },
      { title: 'معالجة اللغة الطبيعية NLP', desc: 'فهم وتحليل النصوص العربية والإنجليزية لتطبيقات متقدمة.' },
      { title: 'الرؤية الحاسوبية', desc: 'التعرف على الصور والفيديو والتحليل البصري للتطبيقات المتنوعة.' },
      { title: 'أتمتة العمليات الذكية', desc: 'أتمتة المهام المتكررة باستخدام الذكاء الاصطناعي لتوفير الوقت والتكاليف.' },
    ],
    stats: [
      { value: '10+', label: 'مشروع AI مُنجز' },
      { value: '85%', label: 'تحسين الكفاءة' },
      { value: '24/7', label: 'دعم تلقائي' },
    ],
    formTitle: 'اطلب حلول الذكاء الاصطناعي',
    formSubtitle: 'أخبرنا عن احتياجاتك وسنقدم لك حلولاً ذكية مخصصة لعملك.',
  },
  en: {
    bgText: 'AI',
    icon: '🤖',
    badge: 'AI Solutions',
    title: 'Smart Solutions',
    titleSpan: 'That Boost Your Business',
    subtitle: 'We integrate AI technologies into your products for data analysis, process automation, and personalized customer experiences.',
    offerTitle: 'What We Offer You',
    serviceValue: 'ai',
    features: [
      { title: 'Chatbots', desc: 'Smart bots for instant support and answering customer inquiries around the clock.' },
      { title: 'Smart Data Analytics', desc: 'Advanced analysis of your business data using ML techniques to extract actionable insights.' },
      { title: 'Recommendation Systems', desc: 'Smart recommendation algorithms to improve user experience and increase sales.' },
      { title: 'Natural Language Processing NLP', desc: 'Understanding and analyzing Arabic and English texts for advanced applications.' },
      { title: 'Computer Vision', desc: 'Image and video recognition and visual analysis for various applications.' },
      { title: 'Intelligent Process Automation', desc: 'Automating repetitive tasks using AI to save time and costs.' },
    ],
    stats: [
      { value: '10+', label: 'AI Projects Completed' },
      { value: '85%', label: 'Efficiency Improvement' },
      { value: '24/7', label: 'Automated Support' },
    ],
    formTitle: 'Request AI Solutions',
    formSubtitle: 'Tell us about your needs and we will provide smart solutions customized for your business.',
  },
};

export default function AiSolutionsPage({ lang, setLang }) {
  return <ServiceDetailPage lang={lang} setLang={setLang} data={data} />;
}