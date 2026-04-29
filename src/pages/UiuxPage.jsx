import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

const data = {
  ar: {
    bgText: 'UI/UX',
    icon: '🎨',
    badge: 'تصميم UI/UX',
    title: 'تصاميم جذابة',
    titleSpan: 'وواجهات بديهية',
    subtitle: 'نصمم واجهات مستخدم مبتكرة وتجارب استخدام سلسة تعكس هوية علامتك التجارية وتحقق أهدافك.',
    offerTitle: 'ما الذي نقدمه لك؟',
    serviceValue: 'uiux',
    features: [
      { title: 'بحث المستخدمين', desc: 'دراسة شاملة للجمهور المستهدف وسلوكياته واحتياجاته لبناء تجربة مثالية.' },
      { title: 'تصميم Wireframes', desc: 'نماذج أولية للهيكل العام وتدفق المستخدم لضمان تجربة منطقية وسلسة.' },
      { title: 'تصميم واجهات UI', desc: 'تصاميم بصرية احترافية تعكس هوية علامتك التجارية بألوان وأيقونات متناسقة.' },
      { title: 'تجربة المستخدم UX', desc: 'تحسين رحلة المستخدم من البداية للنهاية لزيادة التحويل والرضا.' },
      { title: 'نماذج تفاعلية', desc: 'Prototype تفاعلي لتجربة المنتج قبل التطوير وضمان توافق الرؤية.' },
      { title: 'دليل التصميم', desc: 'دليل شامل للهوية البصرية والأيقونات والأنماط لضمان الاتساق.' },
    ],
    stats: [
      { value: '40+', label: 'تصميم مُنجز' },
      { value: '150%', label: 'زيادة التحويل' },
      { value: '4.9★', label: 'تقييم العملاء' },
    ],
    formTitle: 'اطلب تصميمك الآن',
    formSubtitle: 'أخبرنا عن مشروعك وسنصمم لك واجهة استثنائية تخطف الأنظار.',
  },
  en: {
    bgText: 'UI/UX',
    icon: '🎨',
    badge: 'UI/UX Design',
    title: 'Attractive Designs',
    titleSpan: '& Intuitive Interfaces',
    subtitle: 'We design innovative user interfaces and seamless user experiences that reflect your brand identity and achieve your goals.',
    offerTitle: 'What We Offer You',
    serviceValue: 'uiux',
    features: [
      { title: 'User Research', desc: 'Comprehensive study of target audience behaviors and needs to build an ideal experience.' },
      { title: 'Wireframe Design', desc: 'Initial prototypes for overall structure and user flow to ensure a logical and smooth experience.' },
      { title: 'UI Interface Design', desc: 'Professional visual designs reflecting your brand identity with consistent colors and icons.' },
      { title: 'UX User Experience', desc: 'Optimizing the user journey from start to finish to increase conversion and satisfaction.' },
      { title: 'Interactive Prototypes', desc: 'Interactive prototype to experience the product before development and ensure vision alignment.' },
      { title: 'Design System', desc: 'Comprehensive guide for visual identity, icons, and patterns to ensure consistency.' },
    ],
    stats: [
      { value: '40+', label: 'Designs Completed' },
      { value: '150%', label: 'Conversion Increase' },
      { value: '4.9★', label: 'Client Rating' },
    ],
    formTitle: 'Request Your Design Now',
    formSubtitle: 'Tell us about your project and we will design an exceptional interface that captures attention.',
  },
};

export default function UiuxPage({ lang, setLang }) {
  return <ServiceDetailPage lang={lang} setLang={setLang} data={data} />;
}