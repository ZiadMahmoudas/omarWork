import type { SocialIconKey } from "@/app/components/shared/SocialIcon";

export type IconKey =
  | "shopping"
  | "monitor"
  | "megaphone"
  | "share"
  | "search"
  | "palette"
  | "trending"
  | "target"
  | "zap"
  | "users"
  | "award"
  | "globe"
  | "chart"
  | "lightbulb"
  | "pentool"
  | "rocket"
  | "linechart"
  | "phone"
  | "mail"
  | "map";

export type HeroMetric = {
  value: number;
  suffix: string;
  label: string;
};

export type HeroContent = {
  badge: string;
  titleTop: string;
  titleHighlight: string;
  subtitle: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  hookSvg: string;
  metrics: HeroMetric[];
};

export type FeatureItem = {
  icon: IconKey;
  label: string;
  desc: string;
};

export type AboutContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  paragraph1: string;
  paragraph2: string;
  hookSvg: string;
  features: FeatureItem[];
  floatingStats: { value: string; label: string; top?: string; right?: string; bottom?: string; left?: string }[];
};

export type ServiceItem = {
  num: string;
  icon: IconKey;
  title: string;
  desc: string;
};

export type ServicesContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  items: ServiceItem[];
};

export type ProcessStep = {
  num: string;
  icon: IconKey;
  title: string;
  points: string[];
};

export type ProcessContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  steps: ProcessStep[];
};

export type StatItem = {
  value: number;
  suffix: string;
  label: string;
  icon: IconKey;
};

export type PartnersContent = {
  eyebrow: string;
  title: string;
  items: string[];
};

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  items: FaqItem[];
};

export type CtaContent = {
  hookSvg: string;
  title: string;
  titleHighlight: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export type ContactInfo = {
  icon: IconKey;
  label: string;
  value: string;
  href: string;
};

export type ContactContent = {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  info: ContactInfo[];
  socials: { label: string; href: string; icon?: SocialIconKey }[];
  serviceOptions: { value: string; label: string }[];
};

export type HomeContent = {
  hero: HeroContent;
  marquee: { items: string[] };
  about: AboutContent;
  services: ServicesContent;
  process: ProcessContent;
  stats: { items: StatItem[] };
  partners: PartnersContent;
  faq: FaqContent;
  cta: CtaContent;
  contact: ContactContent;
};

export const defaultHomeContent: HomeContent = {
  hero: {
    badge: "وكالة تسويق إلكتروني متكاملة",
    titleTop: "اصطد عملائك",
    titleHighlight: "مع هوّك",
    subtitle: "من التواجد إلى السيادة",
    description:
      "مؤسسة هوّك | Hook Agency واحدة من أفضل وكالات التسويق الإلكتروني في مصر والوطن العربي. نقدملك حلول متكاملة عشان نمّي متجرك الإلكتروني ونعزز وجودك الرقمي.",
    primaryLabel: "ابدأ رحلتك دلوقتي",
    primaryHref: "#contact",
    secondaryLabel: "اكتشف خدماتنا",
    secondaryHref: "#services",
    hookSvg: "/hook-arabic.svg",
    metrics: [
      { value: 150, suffix: "+", label: "عميل يثق فينا" },
      { value: 200, suffix: "+", label: "مشروع ناجح" },
      { value: 95, suffix: "%", label: "رضا العملاء" },
    ],
  },
  marquee: {
    items: ["SEO", "BRANDING", "DESIGN", "CRO", "UI/UX", "MOTION GRAPHIC", "MARKETING", "SOCIAL MEDIA"],
  },
  about: {
    badge: "من نحن",
    title: "من التواجد إلى",
    titleHighlight: "السيادة",
    paragraph1:
      "في بيئة أعمال تتجه بخطى متسارعة نحو التحول الرقمي، تُدرك المؤسسات الطموحة إن التسويق بيتجاوز مجرد الإعلان — هو المحرك الأساسي للنمو.",
    paragraph2:
      "إحنا لسنا مجرد وكالة تسويق، بل مركز عملياتك الرقمية. بنحوّل علامتك التجارية لرائدة في قطاعها. مع بعض نحلم، نبني، نقود، ونحقق النجاح اللي تستحقه.",
    hookSvg: "/hook-arabic.svg",
    features: [
      { icon: "target", label: "استراتيجيات مخصصة", desc: "خطط تسويقية مصممة خصيصاً ليك" },
      { icon: "zap", label: "نتائج سريعة", desc: "أداء فوري ونتائج ملموسة" },
      { icon: "users", label: "فريق محترف", desc: "خبرة سنين في المجال الرقمي" },
      { icon: "award", label: "جودة عالية", desc: "معايير احترافية في كل تفصيلة" },
    ],
    floatingStats: [
      { top: "2%", right: "5%", value: "+150", label: "عميل" },
      { bottom: "8%", left: "0%", value: "+200", label: "مشروع" },
    ],
  },
  services: {
    badge: "خدماتنا",
    title: "الحلول اللي",
    titleHighlight: "نقدمها",
    description:
      "مع كل عميل لدينا، نُظهر شغفًا عميقًا بالابتكارات الإبداعية في حل مشكلاته والتفكير في تطوير علامته التجارية.",
    items: [
      { num: "01", icon: "shopping", title: "حلول التجارة الإلكترونية", desc: "نوفرلك أفضل استراتيجيات وحلول التجارة الإلكترونية، نساعدك في إدارة نشاطك التجاري بدقة وتحقيق الأهداف والخطط الموضوعة لضمان زيادة المبيعات واكتساب عملاء جدد." },
      { num: "02", icon: "monitor", title: "تصميم المواقع الإلكترونية", desc: "نساعدك على التوسع في نشاط عملك وعرض وتوصيل منتجاتك وخدماتك بشكل فريد يعكس هويتك ويساعد العملاء على اكتشاف منتجاتك بالشكل الأمثل." },
      { num: "03", icon: "megaphone", title: "إدارة الحملات المدفوعة", desc: "نقدملك خطط مدروسة تساعد نشاطك في التوسع والظهور لأكبر عدد ممكن من العملاء المحتملين، تشمل إعلانات السوشيال ميديا وإعلانات جوجل." },
      { num: "04", icon: "share", title: "إدارة السوشيال ميديا", desc: "نُدير جميع حساباتك من خلال خدمة إدارة مواقع التواصل الاجتماعي وزيادة التفاعل والمتابعين بشكل احترافي ووصول علامتك التجارية للجمهور المستهدف." },
      { num: "05", icon: "search", title: "تحسين محركات البحث SEO", desc: "نعيد ترتيب موقعك الإلكتروني ونضمن ظهوره في الصفحات الأولى بمحركات البحث مما يساعدك على جذب عملاء جدد ويضمن التواجد بقوة بين منافسيك." },
      { num: "06", icon: "palette", title: "تصميم جرافيك وموشن جرافيك", desc: "نساعدك في تصميم هوية بصرية احترافية تعزز ثقة عملائك وتعطي انطباع يتسم بالاحترافية والمصداقية — من اللوجو للألوان للتصميمات المتحركة." },
    ],
  },
  process: {
    badge: "طريقة عملنا",
    title: "إزاي",
    titleHighlight: "ننجح؟",
    description: "منهجية عمل متكاملة بتحول رؤيتك لواقع ملموس ونتائج فعلية",
    steps: [
      { num: "01", icon: "lightbulb", title: "دراسة وتحليل الأعمال", points: ["دراسة الوضع الحالي للعلامة التجارية", "دراسة وضع المحتوى والسوشيال ميديا", "تحليل الموقع الإلكتروني", "تحليل SWOT للوضع الحالي", "تحليل المنافسين بالسوق"] },
      { num: "02", icon: "pentool", title: "بناء استراتيجية تسويقية", points: ["أهداف محددة قابلة للتحقيق والقياس", "استراتيجية عمل بتوقيتات محددة", "خطة تسويقية دقيقة واضحة", "حلول للتفوق على المنافسين", "توزيع مناسب للتكلفة على المنصات"] },
      { num: "03", icon: "rocket", title: "التنفيذ والمراقبة", points: ["توزيع المهام للفرق المختصة", "تنفيذ خطة التسويق والإعلانات", "مراقبة الحملات المدفوعة ونتائجها", "مراقبة وسائل التواصل الإجتماعي", "تحسين الحملات الإعلانية"] },
      { num: "04", icon: "linechart", title: "قياس النتائج", points: ["قياس نتائج الحملات الإعلانية", "تقارير مواقع التواصل الإجتماعي", "نتائج زيارات الموقع الإلكتروني", "قياس النتائج بالخطة التسويقية", "الاستفادة من النتائج للحملات المستقبلية"] },
    ],
  },
  stats: {
    items: [
      { value: 150, suffix: "+", label: "شريك نجاح", icon: "users" },
      { value: 200, suffix: "+", label: "موقع إلكتروني", icon: "globe" },
      { value: 50, suffix: "K+", label: "تصميم وفيديو", icon: "palette" },
      { value: 91, suffix: "%", label: "نسبة المبيعات", icon: "chart" },
    ],
  },
  partners: {
    eyebrow: "فخورين بالعمل مع أكبر المنصات والعلامات التجارية",
    title: "شركاء النجاح",
    items: ["Google", "Meta", "TikTok", "Shopify", "WordPress", "Zid"],
  },
  faq: {
    badge: "الأسئلة الشائعة",
    title: "عندك",
    titleHighlight: "سؤال؟",
    description: "خلينا نجاوب على أكتر الأسئلة اللي بتتكرر",
    items: [
      { q: "إزاي أقدر أبني متجر إلكتروني ناجح؟", a: "تبدأ بتحديد المنتجات، تختار منصة التجارة الإلكترونية المناسبة، نصمملك المتجر بشكل احترافي، نضيف المنتجات، نجهز طرق الدفع والشحن، وبعدين نبدأ التسويق للمتجر. إحنا معاك من أول خطوة لحد ما متجرك يبدأ يبيع." },
      { q: "إزاي أزود مبيعات مشروعي؟", a: "تقدر تزود مبيعاتك من خلال تقديم عروض حصرية، وتشغل حملات إعلانية مستهدفة توصل لعميلك المباشر، وتحسن خدمة العملاء. كمان بنشتغل على تحسين معدل التحويل CRO عشان كل زائر يبقي فرصة حقيقية." },
      { q: "إيه أهمية تحليلات البيانات لمتجري؟", a: "تحليلات البيانات بتساعدك تفهم سلوك عملائك وتتتبع أداء المتجر عشان تاخد قرارات مدروسة لتحسين استراتيجيات التسويق وزيادة المبيعات. بنقدملك تقارير تفصيلية عن كل حاجة." },
      { q: "إزاي أحسن استراتيجية التسويق لمشروعي؟", a: "تقدر تحسن استراتيجية التسويق بتحسين صفحات ترويج منتجاتك وتقديم عروض خاصة، بالإضافة لاستخدام الإعلانات المدفوعة بشكل استراتيجي وفعال. بنساعدك تعمل خطة تسويقية متكاملة." },
      { q: "قد إيه بتاخد عملية تصميم وبناء المتجر؟", a: "المدة بتختلف حسب حجم المشروع، لكن بشكل العام المتجر البسيط بيكون جاهز في أسبوعين لثلاث أسابيع، والمتاجر الكبيرة بتاخد من شهر لشهرين. بنحرص إننا نسلمك المشروع في الوقت المتفق عليه." },
      { q: "هل بتقدموا خدمات ما بعد التسليم؟", a: "أكيد! بنقدم دعم فني مستمر بعد تسليم المشروع، وخدمات صيانة دورية، وتحديثات مستمرة عشان متجرك يفضل شغال بأعلى كفاءة. كمان بنقدم استشارات تسويقية دورية." },
    ],
  },
  cta: {
    hookSvg: "/hook-arabic.svg",
    title: "هوّك على",
    titleHighlight: "نجاحك",
    description: "احصل على جلسة مجانية تقدر قيمتها بـ 800 جنيه خاصة بالاستراتيجية لمدة 30 دقيقة مع مسوق رقمي خبير.",
    primaryLabel: "أحصل على 30 دقيقة مجانية",
    primaryHref: "#contact",
    secondaryLabel: "تواصل عبر واتساب",
    secondaryHref: "https://wa.me/201000000000",
  },
  contact: {
    badge: "تواصل معنا",
    title: "كن مع",
    titleHighlight: "المحترفين",
    description: "تواصل معانا واحصل على استشارتك المجانية دلوقتي",
    info: [
      { icon: "phone", label: "اتصل بينا", value: "+20 100 000 0000", href: "tel:+201000000000" },
      { icon: "mail", label: "البريد الإلكتروني", value: "info@hookagency.com", href: "mailto:info@hookagency.com" },
      { icon: "map", label: "العنوان", value: "القاهرة، مصر", href: "#" },
    ],
    socials: [
      { label: "Facebook", icon: "facebook", href: "#" },
      { label: "Instagram", icon: "instagram", href: "#" },
      { label: "X", icon: "x", href: "#" },
      { label: "LinkedIn", icon: "linkedin", href: "#" },
      { label: "TikTok", icon: "tiktok", href: "#" },
      { label: "Behance", icon: "behance", href: "#" },
    ],
    serviceOptions: [
      { value: "store", label: "حلول التجارة الإلكترونية" },
      { value: "web", label: "تصميم مواقع الويب" },
      { value: "ads", label: "إدارة الحملات الإعلانية" },
      { value: "seo", label: "تحسين محركات البحث" },
      { value: "social", label: "إدارة السوشيال ميديا" },
      { value: "design", label: "تصميم جرافيك" },
      { value: "cro", label: "تحسين معدل التحويل" },
    ],
  },
};

export function mergeHomeContent(content?: Partial<HomeContent> | null): HomeContent {
  if (!content) return defaultHomeContent;

  return {
    ...defaultHomeContent,
    ...content,
    hero: { ...defaultHomeContent.hero, ...(content.hero || {}) },
    marquee: { ...defaultHomeContent.marquee, ...(content.marquee || {}) },
    about: { ...defaultHomeContent.about, ...(content.about || {}) },
    services: { ...defaultHomeContent.services, ...(content.services || {}) },
    process: { ...defaultHomeContent.process, ...(content.process || {}) },
    stats: { ...defaultHomeContent.stats, ...(content.stats || {}) },
    partners: { ...defaultHomeContent.partners, ...(content.partners || {}) },
    faq: { ...defaultHomeContent.faq, ...(content.faq || {}) },
    cta: { ...defaultHomeContent.cta, ...(content.cta || {}) },
    contact: { ...defaultHomeContent.contact, ...(content.contact || {}) },
  };
}
