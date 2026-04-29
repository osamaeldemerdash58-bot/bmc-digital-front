import React from 'react';
import ServiceDetailPage from './ServiceDetailPage';

const data = {
  ar: {
    bgText: 'ERP',
    icon: '⚙️',
    badge: 'أنظمة ERP',
    title: 'أنظمة تخطيط موارد',
    titleSpan: 'المؤسسة المتكاملة',
    subtitle: 'أنظمة ERP مخصصة لإدارة عملياتك وحساباتك ومواردك البشرية بكفاءة عالية وتقارير ذكية لدعم اتخاذ القرار.',
    offerTitle: 'ما الذي نقدمه لك؟',
    serviceValue: 'erp',
    features: [
      { title: 'إدارة الموارد البشرية', desc: 'نظام شامل لإدارة الموظفين والرواتب والإجازات والتقييمات والأداء الوظيفي.' },
      { title: 'المحاسبة والمالية', desc: 'دفتر أستاذ عام وتقارير مالية وفواتير تلقائية وإدارة التدفق النقدي.' },
      { title: 'إدارة المخزون والمشتريات', desc: 'تتبع المخزون في الوقت الفعلي وإدارة سلاسل التوريد وأوامر الشراء.' },
      { title: 'إدارة المشاريع', desc: 'تخطيط وتتبع المشاريع والمهام والجداول الزمنية وتوزيع الموارد.' },
      { title: 'تقارير ولوحات تحكم', desc: 'تقارير تفصيلية ولوحات تحكم تفاعلية لمراقبة الأداء واتخاذ قرارات مبنية على البيانات.' },
      { title: 'تكامل وأتمتة', desc: 'ربط مع الأنظمة الأخرى وأتمتة العمليات المتكررة لزيادة الإنتاجية.' },
    ],
    stats: [
      { value: '15+', label: 'نظام ERP مُنفذ' },
      { value: '60%', label: 'تقليل الوقت الإداري' },
      { value: '100%', label: 'تخصيص كامل' },
    ],
    formTitle: 'اطلب نظام ERP الخاص بك',
    formSubtitle: 'أخبرنا بمتطلبات نظامك وسنصمم لك حلاً متكاملاً يناسب عملك.',
  },
  en: {
    bgText: 'ERP',
    icon: '⚙️',
    badge: 'ERP Systems',
    title: 'Enterprise Resource',
    titleSpan: 'Planning Systems',
    subtitle: 'Custom ERP systems for managing your operations, accounting, and human resources with high efficiency and smart reports to support decision-making.',
    offerTitle: 'What We Offer You',
    serviceValue: 'erp',
    features: [
      { title: 'Human Resources Management', desc: 'Comprehensive system for managing employees, payroll, leaves, evaluations, and job performance.' },
      { title: 'Accounting & Finance', desc: 'General ledger, financial reports, automatic invoicing, and cash flow management.' },
      { title: 'Inventory & Procurement', desc: 'Real-time inventory tracking, supply chain management, and purchase orders.' },
      { title: 'Project Management', desc: 'Planning and tracking projects, tasks, timelines, and resource allocation.' },
      { title: 'Reports & Dashboards', desc: 'Detailed reports and interactive dashboards to monitor performance and make data-driven decisions.' },
      { title: 'Integration & Automation', desc: 'Connect with other systems and automate repetitive processes to increase productivity.' },
    ],
    stats: [
      { value: '15+', label: 'ERP Systems Deployed' },
      { value: '60%', label: 'Admin Time Reduced' },
      { value: '100%', label: 'Full Customization' },
    ],
    formTitle: 'Request Your ERP System',
    formSubtitle: 'Tell us your system requirements and we will design a comprehensive solution tailored to your business.',
  },
};

export default function ErpPage({ lang, setLang }) {
  return <ServiceDetailPage lang={lang} setLang={setLang} data={data} />;
}