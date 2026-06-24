import type { IconKey } from "@/app/lib/cms/homeContent";

export type WorkCard = {
  title: string;
  category: string;
  description: string;
  stats: string;
  icon: IconKey;
};

export type GalleryWork = {
  title: string;
  category: string;
  number: string;
  href: string;
  image: string;
};

export type WorksContent = {
  hero: {
    badge: string;
    title: string;
    titleHighlight: string;
    description: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  grid: {
    badge: string;
    title: string;
    description: string;
    items: WorkCard[];
  };
  gallery: {
    badge: string;
    title: string;
    items: GalleryWork[];
  };
};

export const defaultWorksContent: WorksContent = {
  hero: {
    badge: "أعمالنا",
    title: "شغل بيشد العميل",
    titleHighlight: "مش مجرد شكل حلو",
    description:
      "هنا هتلاقي نماذج منظمة من نوعية الشغل اللي بنقدمه: متاجر، مواقع، حملات، هوية بصرية، وتحسين نمو. الصفحة جاهزة إنك تضيف عليها المشاريع الحقيقية واحدة واحدة.",
    primaryLabel: "اطلب مشروع مشابه",
    primaryHref: "/#contact",
    secondaryLabel: "شوف خدماتنا",
    secondaryHref: "/#services",
  },
  grid: {
    badge: "SELECTED WORKS",
    title: "أعمال مختارة",
    description: "اختار النوع وشوف الأعمال المناسبة بسرعة من غير زحمة.",
    items: [
      { title: "متجر إلكتروني متكامل", category: "E-commerce", description: "تجربة شراء واضحة وسريعة مع صفحات منتجات محسّنة للتحويل.", icon: "shopping", stats: "زيادة التحويلات" },
      { title: "حملة إعلانية للأداء", category: "Paid Ads", description: "إدارة حملات ممولة مركزة على العملاء الجادين وتقليل تكلفة الاكتساب.", icon: "megaphone", stats: "Leads بجودة أعلى" },
      { title: "هوية بصرية رقمية", category: "Branding", description: "نظام بصري متماسك للسوشيال والموقع والإعلانات يعكس قوة البراند.", icon: "palette", stats: "حضور أقوى للعلامة" },
      { title: "موقع شركة احترافي", category: "Website", description: "واجهة حديثة، سرعة أفضل، وتنظيم محتوى يخلي الزائر يوصل للخدمة بسرعة.", icon: "monitor", stats: "UX واضح" },
      { title: "تحسين محركات البحث", category: "SEO", description: "هيكلة صفحات ومحتوى مستهدف يساعد المشروع يظهر في نتائج البحث المناسبة.", icon: "search", stats: "ظهور عضوي أفضل" },
      { title: "تحليل ونمو المبيعات", category: "Analytics", description: "قراءة الأرقام، تحديد نقاط التسريب، وبناء خطة تحسين مستمرة.", icon: "chart", stats: "قرارات مبنية على بيانات" },
    ],
  },
  gallery: {
    badge: "Case Gallery",
    title: "THE GALLERY",
    items: [
      { title: "Industrial Vibe", category: "Brand Identity", number: "01", href: "/works/industrial-vibe", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=90&auto=format&fit=crop" },
      { title: "Void & Light", category: "Web Experience", number: "02", href: "/works/void-light", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1800&q=90&auto=format&fit=crop" },
      { title: "Neutral Tones", category: "Creative Direction", number: "03", href: "/works/neutral-tones", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1800&q=90&auto=format&fit=crop" },
      { title: "Future Forms", category: "Digital Campaign", number: "04", href: "/works/future-forms", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1800&q=90&auto=format&fit=crop" },
      { title: "Kinetic Design", category: "Motion System", number: "05", href: "/works/kinetic-design", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=90&auto=format&fit=crop" },
      { title: "Digital Strategy", category: "Marketing", number: "06", href: "/works/digital-strategy", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1800&q=90&auto=format&fit=crop" },
      { title: "E-Commerce Flow", category: "E-commerce", number: "07", href: "/works/ecommerce-flow", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1800&q=90&auto=format&fit=crop" },
      { title: "Social Impact", category: "Social Media", number: "08", href: "/works/social-impact", image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1800&q=90&auto=format&fit=crop" },
    ],
  },
};

export function mergeWorksContent(content?: Partial<WorksContent> | null): WorksContent {
  if (!content) return defaultWorksContent;
  return {
    ...defaultWorksContent,
    ...content,
    hero: { ...defaultWorksContent.hero, ...(content.hero || {}) },
    grid: { ...defaultWorksContent.grid, ...(content.grid || {}) },
    gallery: { ...defaultWorksContent.gallery, ...(content.gallery || {}) },
  };
}
