"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Database,
  Eye,
  ImagePlus,
  Loader2,
  Lock,
  LogOut,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
} from "lucide-react";
import {
  HomeContent,
  IconKey,
  defaultHomeContent,
  mergeHomeContent,
} from "@/app/lib/cms/homeContent";
import {
  AdminSession,
  fetchHomeContent,
  fetchWorksContent,
  isSupabaseConfigured,
  saveHomeContent,
  saveWorksContent,
  signInAdmin,
  signOutAdmin,
} from "@/app/lib/supabase/rest";
import {
  GalleryWork,
  WorkCard,
  WorksContent,
  defaultWorksContent,
} from "@/app/lib/cms/worksContent";
import { SocialIcon, SocialIconKey, socialIconOptions, guessSocialIcon } from "@/app/components/shared/SocialIcon";

const SESSION_KEY = "hook_admin_session";
type DashboardSection = keyof HomeContent | "worksHero" | "worksGrid" | "worksGallery";

const sectionLabels: { key: DashboardSection; label: string; hint: string }[] = [
  { key: "hero", label: "الهيرو", hint: "العنوان الرئيسي، الأزرار، الإحصائيات والـ SVG" },
  { key: "marquee", label: "الشريط المتحرك", hint: "كلمات الماركي المتحركة" },
  { key: "about", label: "من نحن", hint: "النصوص، المميزات، والإحصائيات الجانبية" },
  { key: "services", label: "خدماتنا", hint: "عنوان الخدمات وكروت الخدمات" },
  { key: "process", label: "إزاي ننجح؟", hint: "خطوات طريقة العمل ونقاط كل خطوة" },
  { key: "stats", label: "الأرقام", hint: "إحصائيات الموقع" },
  { key: "partners", label: "الشركاء", hint: "عنوان الشركاء وقائمة الأسماء" },
  { key: "faq", label: "الأسئلة", hint: "الأسئلة الشائعة والإجابات" },
  { key: "cta", label: "CTA", hint: "دعوة التواصل والأزرار" },
  { key: "contact", label: "التواصل", hint: "بيانات التواصل والسوشيال وخيارات الخدمة" },
  { key: "worksHero", label: "أعمالنا - الهيرو", hint: "هيرو صفحة الأعمال" },
  { key: "worksGrid", label: "أعمالنا - الكروت", hint: "كروت الأعمال المختارة" },
  { key: "worksGallery", label: "أعمالنا - الجاليري", hint: "كروت The Gallery" },
];

const iconOptions: IconKey[] = [
  "shopping",
  "monitor",
  "megaphone",
  "share",
  "search",
  "palette",
  "trending",
  "target",
  "zap",
  "users",
  "award",
  "globe",
  "chart",
  "lightbulb",
  "pentool",
  "rocket",
  "linechart",
  "phone",
  "mail",
  "map",
];

function getStoredSession() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AdminSession) : null;
  } catch {
    return null;
  }
}

type FieldProps = {
  label: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  textarea?: boolean;
  type?: string;
  dir?: "rtl" | "ltr";
};

function Field({ label, value, onChange, textarea = false, type = "text", dir = "rtl" }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-white/50">{label}</span>
      {textarea ? (
        <textarea
          dir={dir}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-7 text-white outline-none transition focus:border-hook-red/50"
        />
      ) : (
        <input
          dir={dir}
          type={type}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-hook-red/50"
        />
      )}
    </label>
  );
}


type ImageFieldProps = {
  label: string;
  value: string | undefined;
  onChange: (value: string) => void;
  session: AdminSession | null;
  folder?: string;
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function ImageField({
  label,
  value,
  onChange,
  session,
  folder = "uploads",
}: ImageFieldProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);

  async function handleUpload(file: File) {
    setUploadError(null);

    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      setUploadError("بيانات Supabase مش موجودة في .env.local");
      return;
    }

    if (!session?.access_token) {
      setUploadError("لازم تسجل دخول الأول");
      return;
    }

    const fileNameLower = file.name.toLowerCase();
    const isImage =
      file.type.startsWith("image/") ||
      fileNameLower.endsWith(".svg") ||
      fileNameLower.endsWith(".webp") ||
      fileNameLower.endsWith(".png") ||
      fileNameLower.endsWith(".jpg") ||
      fileNameLower.endsWith(".jpeg");

    if (!isImage) {
      setUploadError("اختار صورة فقط: PNG / JPG / WEBP / SVG");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError("حجم الصورة لازم يكون أقل من 8MB");
      return;
    }

    setUploading(true);

    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "png";
      const cleanName = file.name
        .replace(/\.[^/.]+$/, "")
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9._-]/g, "")
        .slice(0, 60);

      const safeName = cleanName || "image";
      const filePath = `${folder}/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}-${safeName}.${ext}`;

      const res = await fetch(`${SUPABASE_URL}/storage/v1/object/site-assets/${filePath}`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": file.type || "application/octet-stream",
          "x-upsert": "true",
        },
        body: file,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Upload failed");
      }

      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/site-assets/${filePath}`;
      onChange(publicUrl);
    } catch (err) {
      console.error(err);
      setUploadError("حصل خطأ أثناء رفع الصورة");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-white/50">{label}</span>
        {value ? (
          <button
            type="button"
            onClick={() => onChange("")}
            className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 px-3 py-2 text-xs font-black text-red-300 hover:bg-red-500/10"
          >
            <Trash2 className="h-4 w-4" />
            حذف الصورة
          </button>
        ) : null}
      </div>

      {value ? (
        <div className="mb-3 overflow-hidden rounded-2xl border border-white/10 bg-black">
          <img src={value} alt={label} className="h-44 w-full object-contain p-3" />
        </div>
      ) : (
        <div className="mb-3 flex h-44 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/30 text-sm text-white/35">
          لا توجد صورة
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,.svg,.webp,.png,.jpg,.jpeg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      <button
        type="button"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
        className="mb-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-hook-red px-4 py-3 text-sm font-black text-white transition hover:bg-hook-red-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            جاري الرفع...
          </>
        ) : (
          <>
            <ImagePlus className="h-4 w-4" />
            رفع صورة من الجهاز
          </>
        )}
      </button>

      <input
        dir="ltr"
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder="أو ضع رابط الصورة يدويًا"
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-hook-red/50"
      />

      {uploadError ? <p className="mt-2 text-xs font-bold text-red-400">{uploadError}</p> : null}
    </div>
  );
}

function SocialIconSelect({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (value: SocialIconKey) => void;
}) {
  const current = (value || "website") as SocialIconKey;

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-white/50">{label}</span>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-hook-red">
          <SocialIcon icon={current} className="h-5 w-5" />
        </div>
        <select
          value={current}
          onChange={(e) => onChange(e.target.value as SocialIconKey)}
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-hook-red/50"
        >
          {socialIconOptions.map((item) => (
            <option key={item.value} value={item.value} className="bg-[#111]">
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </label>
  );
}

function IconSelect({ label, value, onChange }: { label: string; value: IconKey; onChange: (value: IconKey) => void }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-white/50">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as IconKey)}
        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-hook-red/50"
      >
        {iconOptions.map((icon) => (
          <option key={icon} value={icon} className="bg-[#111]">
            {icon}
          </option>
        ))}
      </select>
    </label>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <h3 className="mb-5 text-lg font-black text-white">{title}</h3>
      {children}
    </div>
  );
}

function Repeater<T>({
  title,
  items,
  createItem,
  onChange,
  renderItem,
}: {
  title: string;
  items: T[];
  createItem: () => T;
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number, updateItem: (item: T) => void) => React.ReactNode;
}) {
  return (
    <Panel title={title}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="rounded-full bg-hook-red/10 px-3 py-1 text-xs font-black text-hook-red">
                عنصر {index + 1}
              </span>
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
                className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 px-3 py-2 text-xs font-black text-red-300 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" /> حذف
              </button>
            </div>
            {renderItem(item, index, (next) => onChange(items.map((old, i) => (i === index ? next : old))))}
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, createItem()])}
          className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-black text-white hover:bg-hook-red"
        >
          <Plus className="h-4 w-4" /> إضافة عنصر
        </button>
      </div>
    </Panel>
  );
}

export default function AdminDashboard() {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);
  const [worksContent, setWorksContent] = useState<WorksContent>(defaultWorksContent);
  const [active, setActive] = useState<DashboardSection>("hero");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const activeMeta = useMemo(() => sectionLabels.find((item) => item.key === active), [active]);

  useEffect(() => {
    setSession(getStoredSession());
    handleRefresh();
  }, []);

  function updateHome<K extends keyof HomeContent>(key: K, value: HomeContent[K]) {
    setContent((current) => mergeHomeContent({ ...current, [key]: value } as Partial<HomeContent>));
  }

  async function handleRefresh() {
    setLoading(true);
    setError(null);
    try {
      const [homeData, worksData] = await Promise.all([fetchHomeContent(), fetchWorksContent()]);
      setContent(homeData);
      setWorksContent(worksData);
      setMessage("تم تحميل المحتوى");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load content");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await signInAdmin(email, password);
      localStorage.setItem(SESSION_KEY, JSON.stringify(result));
      setSession(result);
      setMessage("تم تسجيل الدخول بنجاح");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!session?.access_token) {
      setError("لازم تسجل دخول الأول");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await Promise.all([saveHomeContent(content, session.access_token), saveWorksContent(worksContent, session.access_token)]);
      setMessage("تم الحفظ بنجاح على Supabase");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save content");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    if (session?.access_token) {
      try {
        await signOutAdmin(session.access_token);
      } catch {}
    }
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  }

  if (!isSupabaseConfigured) {
    return (
      <main dir="rtl" className="min-h-screen bg-[#050505] px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-yellow-500/20 bg-yellow-500/5 p-8">
          <AlertTriangle className="mb-4 h-10 w-10 text-yellow-400" />
          <h1 className="mb-3 text-3xl font-black">ناقص إعدادات Supabase</h1>
          <p className="leading-8 text-white/70">
            ضيف القيم دي في ملف <span dir="ltr" className="font-mono text-hook-red">.env.local</span> وبعدها شغل المشروع تاني:
          </p>
          <pre dir="ltr" className="mt-5 overflow-auto rounded-2xl bg-black p-5 text-sm text-white/80">{`NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co\nNEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key`}</pre>
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#050505] px-6 text-white">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0d0d0d] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-hook-red/10">
            <Lock className="h-7 w-7 text-hook-red" />
          </div>
          <h1 className="mb-2 text-3xl font-black">تسجيل دخول الأدمن</h1>
          <p className="mb-7 text-sm leading-7 text-white/50">ادخل بإيميل الأدمن المتسجل في Supabase Auth.</p>
          <div className="space-y-4">
            <Field label="الإيميل" value={email} onChange={setEmail} type="email" dir="ltr" />
            <Field label="الباسورد" value={password} onChange={setPassword} type="password" dir="ltr" />
          </div>
          {error && <p className="mt-4 text-sm font-bold text-red-400">{error}</p>}
          <button disabled={loading} className="mt-7 w-full rounded-xl bg-hook-red px-5 py-4 font-black text-white transition hover:bg-hook-red-light disabled:opacity-60">
            {loading ? "جاري الدخول..." : "دخول الداش بورد"}
          </button>
        </form>
      </main>
    );
  }

  const renderHero = () => (
    <div className="space-y-5">
      <Panel title="محتوى الهيرو">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Badge" value={content.hero.badge} onChange={(v) => updateHome("hero", { ...content.hero, badge: v })} />
          <Field label="العنوان الأبيض" value={content.hero.titleTop} onChange={(v) => updateHome("hero", { ...content.hero, titleTop: v })} />
          <Field label="العنوان الأحمر" value={content.hero.titleHighlight} onChange={(v) => updateHome("hero", { ...content.hero, titleHighlight: v })} />
          <Field label="Subtitle" value={content.hero.subtitle} onChange={(v) => updateHome("hero", { ...content.hero, subtitle: v })} />
          <div className="md:col-span-2"><Field label="الوصف" value={content.hero.description} onChange={(v) => updateHome("hero", { ...content.hero, description: v })} textarea /></div>
          <Field label="زر أساسي" value={content.hero.primaryLabel} onChange={(v) => updateHome("hero", { ...content.hero, primaryLabel: v })} />
          <Field label="رابط الزر الأساسي" value={content.hero.primaryHref} onChange={(v) => updateHome("hero", { ...content.hero, primaryHref: v })} dir="ltr" />
          <Field label="زر ثاني" value={content.hero.secondaryLabel} onChange={(v) => updateHome("hero", { ...content.hero, secondaryLabel: v })} />
          <Field label="رابط الزر الثاني" value={content.hero.secondaryHref} onChange={(v) => updateHome("hero", { ...content.hero, secondaryHref: v })} dir="ltr" />
          <ImageField label="SVG / صورة الهوك" value={content.hero.hookSvg} session={session} folder="home/hero" onChange={(v) => updateHome("hero", { ...content.hero, hookSvg: v })} />
        </div>
      </Panel>
      <Repeater
        title="إحصائيات الهيرو"
        items={content.hero.metrics}
        createItem={() => ({ value: 0, suffix: "+", label: "إحصائية جديدة" })}
        onChange={(metrics) => updateHome("hero", { ...content.hero, metrics })}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="الرقم" type="number" value={item.value} onChange={(v) => updateItem({ ...item, value: Number(v) || 0 })} dir="ltr" />
            <Field label="Suffix" value={item.suffix} onChange={(v) => updateItem({ ...item, suffix: v })} />
            <Field label="النص" value={item.label} onChange={(v) => updateItem({ ...item, label: v })} />
          </div>
        )}
      />
    </div>
  );

  const renderMarquee = () => (
    <Repeater
      title="كلمات الشريط المتحرك"
      items={content.marquee.items}
      createItem={() => "NEW ITEM"}
      onChange={(items) => updateHome("marquee", { items })}
      renderItem={(item, _index, updateItem) => (
        <Field label="الكلمة" value={item} onChange={updateItem} dir="ltr" />
      )}
    />
  );

  const renderAbout = () => (
    <div className="space-y-5">
      <Panel title="نصوص من نحن">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Badge" value={content.about.badge} onChange={(v) => updateHome("about", { ...content.about, badge: v })} />
          <Field label="العنوان" value={content.about.title} onChange={(v) => updateHome("about", { ...content.about, title: v })} />
          <Field label="العنوان الأحمر" value={content.about.titleHighlight} onChange={(v) => updateHome("about", { ...content.about, titleHighlight: v })} />
          <ImageField label="SVG / صورة من نحن" value={content.about.hookSvg} session={session} folder="home/about" onChange={(v) => updateHome("about", { ...content.about, hookSvg: v })} />
          <div className="md:col-span-2"><Field label="الفقرة الأولى" value={content.about.paragraph1} onChange={(v) => updateHome("about", { ...content.about, paragraph1: v })} textarea /></div>
          <div className="md:col-span-2"><Field label="الفقرة الثانية" value={content.about.paragraph2} onChange={(v) => updateHome("about", { ...content.about, paragraph2: v })} textarea /></div>
        </div>
      </Panel>
      <Repeater
        title="مميزات من نحن"
        items={content.about.features}
        createItem={() => ({ icon: "target", label: "ميزة جديدة", desc: "وصف الميزة" })}
        onChange={(features) => updateHome("about", { ...content.about, features })}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4 md:grid-cols-3">
            <IconSelect label="Icon" value={item.icon} onChange={(icon) => updateItem({ ...item, icon })} />
            <Field label="العنوان" value={item.label} onChange={(v) => updateItem({ ...item, label: v })} />
            <Field label="الوصف" value={item.desc} onChange={(v) => updateItem({ ...item, desc: v })} />
          </div>
        )}
      />
      <Repeater
        title="الإحصائيات العائمة"
        items={content.about.floatingStats}
        createItem={() => ({ value: "+100", label: "عنصر", top: "", right: "", bottom: "", left: "" })}
        onChange={(floatingStats) => updateHome("about", { ...content.about, floatingStats })}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="القيمة" value={item.value} onChange={(v) => updateItem({ ...item, value: v })} />
            <Field label="النص" value={item.label} onChange={(v) => updateItem({ ...item, label: v })} />
            <Field label="top" value={item.top || ""} onChange={(v) => updateItem({ ...item, top: v })} dir="ltr" />
            <Field label="right" value={item.right || ""} onChange={(v) => updateItem({ ...item, right: v })} dir="ltr" />
            <Field label="bottom" value={item.bottom || ""} onChange={(v) => updateItem({ ...item, bottom: v })} dir="ltr" />
            <Field label="left" value={item.left || ""} onChange={(v) => updateItem({ ...item, left: v })} dir="ltr" />
          </div>
        )}
      />
    </div>
  );

  const renderServices = () => (
    <div className="space-y-5">
      <Panel title="عنوان خدماتنا">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Badge" value={content.services.badge} onChange={(v) => updateHome("services", { ...content.services, badge: v })} />
          <Field label="العنوان" value={content.services.title} onChange={(v) => updateHome("services", { ...content.services, title: v })} />
          <Field label="العنوان الأحمر" value={content.services.titleHighlight} onChange={(v) => updateHome("services", { ...content.services, titleHighlight: v })} />
          <div className="md:col-span-2"><Field label="الوصف" value={content.services.description} onChange={(v) => updateHome("services", { ...content.services, description: v })} textarea /></div>
        </div>
      </Panel>
      <Repeater
        title="كروت الخدمات"
        items={content.services.items}
        createItem={() => ({ num: "00", icon: "shopping", title: "خدمة جديدة", desc: "وصف الخدمة" })}
        onChange={(items) => updateHome("services", { ...content.services, items })}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="رقم" value={item.num} onChange={(v) => updateItem({ ...item, num: v })} dir="ltr" />
            <IconSelect label="Icon" value={item.icon} onChange={(icon) => updateItem({ ...item, icon })} />
            <Field label="العنوان" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
            <div className="md:col-span-2"><Field label="الوصف" value={item.desc} onChange={(v) => updateItem({ ...item, desc: v })} textarea /></div>
          </div>
        )}
      />
    </div>
  );

  const renderProcess = () => (
    <div className="space-y-5">
      <Panel title="عنوان طريقة العمل">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Badge" value={content.process.badge} onChange={(v) => updateHome("process", { ...content.process, badge: v })} />
          <Field label="العنوان" value={content.process.title} onChange={(v) => updateHome("process", { ...content.process, title: v })} />
          <Field label="العنوان الأحمر" value={content.process.titleHighlight} onChange={(v) => updateHome("process", { ...content.process, titleHighlight: v })} />
          <div className="md:col-span-2"><Field label="الوصف" value={content.process.description} onChange={(v) => updateHome("process", { ...content.process, description: v })} textarea /></div>
        </div>
      </Panel>
      <Repeater
        title="خطوات طريقة العمل"
        items={content.process.steps}
        createItem={() => ({ num: "00", icon: "lightbulb", title: "خطوة جديدة", points: ["نقطة جديدة"] })}
        onChange={(steps) => updateHome("process", { ...content.process, steps })}
        renderItem={(item, _index, updateItem) => (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <Field label="رقم" value={item.num} onChange={(v) => updateItem({ ...item, num: v })} dir="ltr" />
              <IconSelect label="Icon" value={item.icon} onChange={(icon) => updateItem({ ...item, icon })} />
              <Field label="العنوان" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
            </div>
            <Repeater
              title="نقاط الخطوة"
              items={item.points}
              createItem={() => "نقطة جديدة"}
              onChange={(points) => updateItem({ ...item, points })}
              renderItem={(point, _pointIndex, updatePoint) => <Field label="النقطة" value={point} onChange={updatePoint} />}
            />
          </div>
        )}
      />
    </div>
  );

  const renderStats = () => (
    <Repeater
      title="إحصائيات الموقع"
      items={content.stats.items}
      createItem={() => ({ value: 0, suffix: "+", label: "إحصائية", icon: "chart" })}
      onChange={(items) => updateHome("stats", { items })}
      renderItem={(item, _index, updateItem) => (
        <div className="grid gap-4 md:grid-cols-4">
          <Field label="الرقم" type="number" value={item.value} onChange={(v) => updateItem({ ...item, value: Number(v) || 0 })} dir="ltr" />
          <Field label="Suffix" value={item.suffix} onChange={(v) => updateItem({ ...item, suffix: v })} />
          <Field label="النص" value={item.label} onChange={(v) => updateItem({ ...item, label: v })} />
          <IconSelect label="Icon" value={item.icon} onChange={(icon) => updateItem({ ...item, icon })} />
        </div>
      )}
    />
  );

  const renderPartners = () => (
    <div className="space-y-5">
      <Panel title="عنوان الشركاء">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Eyebrow" value={content.partners.eyebrow} onChange={(v) => updateHome("partners", { ...content.partners, eyebrow: v })} />
          <Field label="العنوان" value={content.partners.title} onChange={(v) => updateHome("partners", { ...content.partners, title: v })} />
        </div>
      </Panel>
      <Repeater
        title="أسماء الشركاء"
        items={content.partners.items}
        createItem={() => "Partner"}
        onChange={(items) => updateHome("partners", { ...content.partners, items })}
        renderItem={(item, _index, updateItem) => <Field label="الاسم" value={item} onChange={updateItem} dir="ltr" />}
      />
    </div>
  );

  const renderFaq = () => (
    <div className="space-y-5">
      <Panel title="عنوان الأسئلة">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Badge" value={content.faq.badge} onChange={(v) => updateHome("faq", { ...content.faq, badge: v })} />
          <Field label="العنوان" value={content.faq.title} onChange={(v) => updateHome("faq", { ...content.faq, title: v })} />
          <Field label="العنوان الأحمر" value={content.faq.titleHighlight} onChange={(v) => updateHome("faq", { ...content.faq, titleHighlight: v })} />
          <div className="md:col-span-2"><Field label="الوصف" value={content.faq.description} onChange={(v) => updateHome("faq", { ...content.faq, description: v })} textarea /></div>
        </div>
      </Panel>
      <Repeater
        title="الأسئلة والإجابات"
        items={content.faq.items}
        createItem={() => ({ q: "سؤال جديد؟", a: "إجابة السؤال" })}
        onChange={(items) => updateHome("faq", { ...content.faq, items })}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4">
            <Field label="السؤال" value={item.q} onChange={(v) => updateItem({ ...item, q: v })} />
            <Field label="الإجابة" value={item.a} onChange={(v) => updateItem({ ...item, a: v })} textarea />
          </div>
        )}
      />
    </div>
  );

  const renderCta = () => (
    <Panel title="محتوى CTA">
      <div className="grid gap-4 md:grid-cols-2">
        <ImageField label="SVG / صورة CTA" value={content.cta.hookSvg} session={session} folder="home/cta" onChange={(v) => updateHome("cta", { ...content.cta, hookSvg: v })} />
        <Field label="العنوان" value={content.cta.title} onChange={(v) => updateHome("cta", { ...content.cta, title: v })} />
        <Field label="العنوان الأحمر" value={content.cta.titleHighlight} onChange={(v) => updateHome("cta", { ...content.cta, titleHighlight: v })} />
        <div className="md:col-span-2"><Field label="الوصف" value={content.cta.description} onChange={(v) => updateHome("cta", { ...content.cta, description: v })} textarea /></div>
        <Field label="زر أساسي" value={content.cta.primaryLabel} onChange={(v) => updateHome("cta", { ...content.cta, primaryLabel: v })} />
        <Field label="رابط الزر الأساسي" value={content.cta.primaryHref} onChange={(v) => updateHome("cta", { ...content.cta, primaryHref: v })} dir="ltr" />
        <Field label="زر ثاني" value={content.cta.secondaryLabel} onChange={(v) => updateHome("cta", { ...content.cta, secondaryLabel: v })} />
        <Field label="رابط الزر الثاني" value={content.cta.secondaryHref} onChange={(v) => updateHome("cta", { ...content.cta, secondaryHref: v })} dir="ltr" />
      </div>
    </Panel>
  );

  const renderContact = () => (
    <div className="space-y-5">
      <Panel title="عنوان التواصل">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Badge" value={content.contact.badge} onChange={(v) => updateHome("contact", { ...content.contact, badge: v })} />
          <Field label="العنوان" value={content.contact.title} onChange={(v) => updateHome("contact", { ...content.contact, title: v })} />
          <Field label="العنوان الأحمر" value={content.contact.titleHighlight} onChange={(v) => updateHome("contact", { ...content.contact, titleHighlight: v })} />
          <div className="md:col-span-2"><Field label="الوصف" value={content.contact.description} onChange={(v) => updateHome("contact", { ...content.contact, description: v })} textarea /></div>
        </div>
      </Panel>
      <Repeater
        title="بيانات التواصل"
        items={content.contact.info}
        createItem={() => ({ icon: "phone", label: "وسيلة تواصل", value: "", href: "" })}
        onChange={(info) => updateHome("contact", { ...content.contact, info })}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4 md:grid-cols-4">
            <IconSelect label="Icon" value={item.icon} onChange={(icon) => updateItem({ ...item, icon })} />
            <Field label="العنوان" value={item.label} onChange={(v) => updateItem({ ...item, label: v })} />
            <Field label="القيمة" value={item.value} onChange={(v) => updateItem({ ...item, value: v })} />
            <Field label="الرابط" value={item.href} onChange={(v) => updateItem({ ...item, href: v })} dir="ltr" />
          </div>
        )}
      />
      <Repeater
        title="السوشيال"
        items={content.contact.socials}
        createItem={() => ({ label: "Facebook", icon: "facebook", href: "#" })}
        onChange={(socials) => updateHome("contact", { ...content.contact, socials })}
        renderItem={(item, _index, updateItem) => {
          const currentIcon = item.icon || guessSocialIcon(`${item.label} ${item.href}`);

          return (
            <div className="grid gap-4 md:grid-cols-3">
              <SocialIconSelect label="الأيقونة" value={currentIcon} onChange={(icon) => updateItem({ ...item, icon })} />
              <Field label="الاسم" value={item.label} onChange={(v) => updateItem({ ...item, label: v })} dir="ltr" />
              <Field label="الرابط" value={item.href} onChange={(v) => updateItem({ ...item, href: v })} dir="ltr" />
            </div>
          );
        }}
      />
      <Repeater
        title="اختيارات الخدمة في الفورم"
        items={content.contact.serviceOptions}
        createItem={() => ({ value: "new-service", label: "خدمة جديدة" })}
        onChange={(serviceOptions) => updateHome("contact", { ...content.contact, serviceOptions })}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Value" value={item.value} onChange={(v) => updateItem({ ...item, value: v })} dir="ltr" />
            <Field label="Label" value={item.label} onChange={(v) => updateItem({ ...item, label: v })} />
          </div>
        )}
      />
    </div>
  );

  const renderWorksHero = () => (
    <Panel title="هيرو صفحة أعمالنا">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Badge" value={worksContent.hero.badge} onChange={(v) => setWorksContent((c) => ({ ...c, hero: { ...c.hero, badge: v } }))} />
        <Field label="العنوان" value={worksContent.hero.title} onChange={(v) => setWorksContent((c) => ({ ...c, hero: { ...c.hero, title: v } }))} />
        <Field label="العنوان الأحمر" value={worksContent.hero.titleHighlight} onChange={(v) => setWorksContent((c) => ({ ...c, hero: { ...c.hero, titleHighlight: v } }))} />
        <div className="md:col-span-2"><Field label="الوصف" value={worksContent.hero.description} onChange={(v) => setWorksContent((c) => ({ ...c, hero: { ...c.hero, description: v } }))} textarea /></div>
        <Field label="زر أساسي" value={worksContent.hero.primaryLabel} onChange={(v) => setWorksContent((c) => ({ ...c, hero: { ...c.hero, primaryLabel: v } }))} />
        <Field label="رابط الزر الأساسي" value={worksContent.hero.primaryHref} onChange={(v) => setWorksContent((c) => ({ ...c, hero: { ...c.hero, primaryHref: v } }))} dir="ltr" />
        <Field label="زر ثاني" value={worksContent.hero.secondaryLabel} onChange={(v) => setWorksContent((c) => ({ ...c, hero: { ...c.hero, secondaryLabel: v } }))} />
        <Field label="رابط الزر الثاني" value={worksContent.hero.secondaryHref} onChange={(v) => setWorksContent((c) => ({ ...c, hero: { ...c.hero, secondaryHref: v } }))} dir="ltr" />
      </div>
    </Panel>
  );

  const renderWorksGrid = () => (
    <div className="space-y-5">
      <Panel title="عنوان كروت الأعمال">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Badge" value={worksContent.grid.badge} onChange={(v) => setWorksContent((c) => ({ ...c, grid: { ...c.grid, badge: v } }))} />
          <Field label="العنوان" value={worksContent.grid.title} onChange={(v) => setWorksContent((c) => ({ ...c, grid: { ...c.grid, title: v } }))} />
          <div className="md:col-span-2"><Field label="الوصف" value={worksContent.grid.description} onChange={(v) => setWorksContent((c) => ({ ...c, grid: { ...c.grid, description: v } }))} textarea /></div>
        </div>
      </Panel>
      <Repeater<WorkCard>
        title="كروت الأعمال"
        items={worksContent.grid.items}
        createItem={() => ({ title: "عمل جديد", category: "Category", description: "وصف العمل", stats: "نتيجة", icon: "monitor" })}
        onChange={(items) => setWorksContent((c) => ({ ...c, grid: { ...c.grid, items } }))}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="العنوان" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} />
            <Field label="التصنيف" value={item.category} onChange={(v) => updateItem({ ...item, category: v })} dir="ltr" />
            <Field label="النتيجة" value={item.stats} onChange={(v) => updateItem({ ...item, stats: v })} />
            <IconSelect label="Icon" value={item.icon} onChange={(icon) => updateItem({ ...item, icon })} />
            <div className="md:col-span-2"><Field label="الوصف" value={item.description} onChange={(v) => updateItem({ ...item, description: v })} textarea /></div>
          </div>
        )}
      />
    </div>
  );

  const renderWorksGallery = () => (
    <div className="space-y-5">
      <Panel title="عنوان الجاليري">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Badge" value={worksContent.gallery.badge} onChange={(v) => setWorksContent((c) => ({ ...c, gallery: { ...c.gallery, badge: v } }))} />
          <Field label="Title" value={worksContent.gallery.title} onChange={(v) => setWorksContent((c) => ({ ...c, gallery: { ...c.gallery, title: v } }))} dir="ltr" />
        </div>
      </Panel>
      <Repeater<GalleryWork>
        title="كروت The Gallery"
        items={worksContent.gallery.items}
        createItem={() => ({ title: "Gallery Item", category: "Category", number: "00", href: "/works/new", image: "" })}
        onChange={(items) => setWorksContent((c) => ({ ...c, gallery: { ...c.gallery, items } }))}
        renderItem={(item, _index, updateItem) => (
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="العنوان" value={item.title} onChange={(v) => updateItem({ ...item, title: v })} dir="ltr" />
            <Field label="التصنيف" value={item.category} onChange={(v) => updateItem({ ...item, category: v })} dir="ltr" />
            <Field label="الرقم" value={item.number} onChange={(v) => updateItem({ ...item, number: v })} dir="ltr" />
            <Field label="الرابط" value={item.href} onChange={(v) => updateItem({ ...item, href: v })} dir="ltr" />
            <div className="md:col-span-2"><ImageField label="صورة الجاليري" value={item.image} session={session} folder="works/gallery" onChange={(v) => updateItem({ ...item, image: v })} /></div>
          </div>
        )}
      />
    </div>
  );

  const renderActive = () => {
    switch (active) {
      case "hero": return renderHero();
      case "marquee": return renderMarquee();
      case "about": return renderAbout();
      case "services": return renderServices();
      case "process": return renderProcess();
      case "stats": return renderStats();
      case "partners": return renderPartners();
      case "faq": return renderFaq();
      case "cta": return renderCta();
      case "contact": return renderContact();
      case "worksHero": return renderWorksHero();
      case "worksGrid": return renderWorksGrid();
      case "worksGallery": return renderWorksGallery();
      default: return null;
    }
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#050505] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="text-2xl font-black">Hook CMS Dashboard</h1>
            <p className="text-xs text-white/45">حقول مباشرة بدل JSON — تعديل Home وأعمالنا من Supabase</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-black text-white hover:bg-white/5">
              <Eye className="h-4 w-4" /> معاينة الموقع
            </a>
            <button onClick={handleRefresh} disabled={loading} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-black text-white hover:bg-white/5 disabled:opacity-60">
              <RefreshCcw className="h-4 w-4" /> تحديث
            </button>
            <button onClick={handleSave} disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-hook-red px-5 py-3 text-sm font-black text-white hover:bg-hook-red-light disabled:opacity-60">
              <Save className="h-4 w-4" /> حفظ الكل
            </button>
            <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-black text-white hover:bg-white/5">
              <LogOut className="h-4 w-4" /> خروج
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 lg:grid-cols-[290px_1fr]">
        <aside className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-4 lg:sticky lg:top-24 lg:h-fit">
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/25 p-4">
            <Database className="h-5 w-5 text-hook-red" />
            <div>
              <p className="text-sm font-black">Sections</p>
              <p className="text-xs text-white/40">اختار وعدل من غير JSON</p>
            </div>
          </div>
          <div className="max-h-[calc(100vh-190px)] space-y-2 overflow-auto pr-1">
            {sectionLabels.map((item) => (
              <button
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`w-full rounded-2xl px-4 py-3 text-right text-sm font-black transition ${active === item.key ? "bg-hook-red text-white" : "bg-white/[0.035] text-white/65 hover:bg-white/[0.07]"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-5 md:p-7">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <h2 className="text-3xl font-black">{activeMeta?.label}</h2>
              <p className="mt-2 text-sm text-white/45">{activeMeta?.hint}</p>
            </div>
          </div>
          {message && <p className="mb-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-bold text-emerald-300">{message}</p>}
          {error && <p className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-300">{error}</p>}
          {renderActive()}
        </section>
      </div>
    </main>
  );
}
