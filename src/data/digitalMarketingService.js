import uiUxImage from '../assets/services/ui ux.png';

export const DIGITAL_MARKETING_SLUG = 'ai-solutions';

const serviceImages = import.meta.glob('../assets/services/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
});

const fixedServiceImageBySlug = {
  'ui-ux-design': uiUxImage,
};

const serviceImageAliases = {
  'web-development': [
    'web-development',
    'website-development',
    'website',
    'web',
    'تطويرالمواقع',
    'تطويرالمواقعالالكترونية',
    'المواقع',
  ],
  'e-commerce-website-development': [
    'e-commerce-website-development',
    'ecommerce',
    'e-commerce',
    'store',
    'online-store',
    'المتاجرالالكترونية',
    'تطويرالمتاجرالالكترونية',
    'متجرالكتروني',
  ],
  'mobile-app-development': [
    'mobile-app-development',
    'mobile-app',
    'mobile',
    'app',
    'تطويرالتطبيقات',
    'تطبيقاتالجوال',
    'تطبيقاتموبايل',
  ],
  'erp-systems': [
    'erp-systems',
    'erp',
    'أنظمةerp',
    'نظامerp',
  ],
  'ui-ux-design': [
    'ui-ux-design',
    'uiux',
    'ui-ux',
    'design',
    'تصميمuiux',
    'تصميمالواجهات',
  ],
  'ai-solutions': [
    'ai-solutions',
    'digital-marketing',
    'digitalmarketing',
    'marketing',
    'التسويقالرقمي',
    'التسويق',
  ],
  'tech-consulting': [
    'tech-consulting',
    'consulting',
    'tech',
    'استشاراتتقنية',
  ],
};

function normalizeKey(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\.[^.]+$/, '')
    .replace(/[^\p{L}\p{N}]+/gu, '');
}

function getBasename(path) {
  return String(path || '').split('/').pop() || '';
}

function findLocalServiceImage(service) {
  if (!service) return '';
  if (fixedServiceImageBySlug[service.slug]) return fixedServiceImageBySlug[service.slug];

  const candidates = new Set([
    ...(serviceImageAliases[service.slug] || []),
    service.slug,
    service.title,
    service.titleAr,
    service.titleEn,
  ].map(normalizeKey).filter(Boolean));

  const entries = Object.entries(serviceImages).map(([path, src]) => ({
    src,
    key: normalizeKey(getBasename(path)),
  }));

  const exact = entries.find((entry) => candidates.has(entry.key));
  if (exact) return exact.src;

  const partial = entries.find((entry) => {
    for (const candidate of candidates) {
      if (entry.key.includes(candidate) || candidate.includes(entry.key)) {
        return true;
      }
    }
    return false;
  });

  return partial?.src || '';
}

const copy = {
  ar: {
    title: 'التسويق الرقمي',
    shortDesc:
      'في البنية الماسية الرقمية نقدّم حلول تسويق إلكتروني متكاملة تساعدك على جذب العملاء، زيادة المبيعات، ورفع حضور علامتك التجارية على جميع المنصات الرقمية.',
    detailTitle: 'حلول',
    detailTitleSpan: 'التسويق الرقمي',
    detailDesc:
      'في البنية الماسية الرقمية نقدّم حلول تسويق إلكتروني متكاملة تساعدك على جذب العملاء، زيادة المبيعات، ورفع حضور علامتك التجارية على جميع المنصات الرقمية. نعتمد على استراتيجيات مدروسة وإعلانات ممولة فعّالة للوصول للجمهور المناسب بأقل تكلفة وأعلى عائد. تشمل الخدمة إدارة الحملات الإعلانية على فيسبوك، إنستجرام، تيك توك، سناب شات وجوجل، وإعداد الاستراتيجيات التسويقية وخطط المحتوى، وتحليل الأداء وتحسين النتائج باستمرار، وإدارة صفحات السوشيال ميديا وصناعة محتوى احترافي، وكتابة إعلانات جذابة وتصميم منشورات عالية الجودة، وبناء جمهور مستهدف وتحسين معدل التحويل. البنية الماسية الرقمية توصل رسالتك للجمهور الصح وتحول تواجدك الرقمي إلى نتائج ملموسة.',
    features: [
      'إدارة الحملات الإعلانية على فيسبوك، إنستجرام، تيك توك، سناب شات وجوجل',
      'إعداد الاستراتيجيات التسويقية وخطط المحتوى',
      'تحليل الأداء وتحسين النتائج باستمرار',
      'إدارة صفحات السوشيال ميديا وصناعة محتوى احترافي',
      'كتابة إعلانات جذابة وتصميم منشورات عالية الجودة',
      'بناء جمهور مستهدف وتحسين معدل التحويل',
    ],
    benefits: [
      {
        title: 'استهداف أدق',
        desc: 'نصل إلى الجمهور المناسب حسب الاهتمامات والسلوك والموقع لتحقيق أفضل استفادة من الميزانية.',
      },
      {
        title: 'تحسين مستمر',
        desc: 'نراقب أداء الحملات والمحتوى بشكل دائم ونجري تحسينات مستمرة لرفع النتائج وخفض التكلفة.',
      },
      {
        title: 'محتوى احترافي',
        desc: 'نكتب إعلانات مؤثرة ونصمم منشورات احترافية تعكس هوية علامتك التجارية وتزيد التفاعل.',
      },
      {
        title: 'نتائج ملموسة',
        desc: 'نحوّل حضورك الرقمي إلى زيارات ورسائل ومبيعات عبر خطط تسويقية واضحة وقابلة للقياس.',
      },
    ],
  },
  en: {
    title: 'Digital Marketing',
    shortDesc:
      'At Al Binyah Al Masiyah Digital, we deliver integrated digital marketing solutions that help you attract customers, increase sales, and strengthen your brand presence across digital platforms.',
    detailTitle: 'Digital',
    detailTitleSpan: 'Marketing',
    detailDesc:
      'At Al Binyah Al Masiyah Digital, we deliver integrated digital marketing solutions that help you attract customers, increase sales, and strengthen your brand presence across digital platforms. We rely on well-planned strategies and effective paid ads to reach the right audience at lower cost and higher return. The service includes managing ad campaigns on Facebook, Instagram, TikTok, Snapchat, and Google, building marketing strategies and content plans, analyzing performance and improving results continuously, managing social media pages, producing professional content, writing compelling ads, designing high-quality posts, building target audiences, and improving conversion rates.',
    features: [
      'Manage ad campaigns on Facebook, Instagram, TikTok, Snapchat, and Google',
      'Build marketing strategies and content plans',
      'Analyze performance and improve results continuously',
      'Manage social media pages and produce professional content',
      'Write compelling ads and design high-quality posts',
      'Build target audiences and improve conversion rates',
    ],
    benefits: [
      {
        title: 'Precise Targeting',
        desc: 'We reach the right audience based on interests, behavior, and location to maximize your marketing budget.',
      },
      {
        title: 'Continuous Optimization',
        desc: 'We monitor campaigns and content performance closely and keep refining them for stronger outcomes.',
      },
      {
        title: 'Professional Content',
        desc: 'We create ad copy and visual content that reflect your brand and increase engagement.',
      },
      {
        title: 'Measurable Results',
        desc: 'We turn your digital presence into visits, leads, and sales through clear, data-driven plans.',
      },
    ],
  },
};

export function getDigitalMarketingCopy(lang = 'ar') {
  return copy[lang] || copy.ar;
}

export function overrideServiceCard(service, lang = 'ar') {
  if (!service) return service;

  const withImage = {
    ...service,
    cardImage: findLocalServiceImage(service) || service.cardImage || '',
  };

  if (service.slug !== DIGITAL_MARKETING_SLUG) return withImage;

  const localized = getDigitalMarketingCopy(lang);
  return {
    ...withImage,
    title: localized.title,
    desc: localized.shortDesc,
    features: localized.features.slice(0, 4),
  };
}

export function overrideServiceDetail(service) {
  if (!service) return service;

  const withImage = {
    ...service,
    cardImage: findLocalServiceImage(service) || service.cardImage || '',
  };

  if (service.slug !== DIGITAL_MARKETING_SLUG) return withImage;

  return {
    ...withImage,
    titleAr: copy.ar.title,
    titleEn: copy.en.title,
    descAr: copy.ar.shortDesc,
    descEn: copy.en.shortDesc,
    detailTitleAr: copy.ar.detailTitle,
    detailTitleEn: copy.en.detailTitle,
    detailTitleSpanAr: copy.ar.detailTitleSpan,
    detailTitleSpanEn: copy.en.detailTitleSpan,
    detailDescAr: copy.ar.detailDesc,
    detailDescEn: copy.en.detailDesc,
    featuresAr: copy.ar.features,
    featuresEn: copy.en.features,
    benefitsAr: copy.ar.benefits,
    benefitsEn: copy.en.benefits,
  };
}
