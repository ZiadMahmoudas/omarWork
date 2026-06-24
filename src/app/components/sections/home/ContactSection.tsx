"use client";

import React, { useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import SectionBadge from "@/app/components/shared/SectionBadge";
import { ContactContent, defaultHomeContent } from "@/app/lib/cms/homeContent";
import { getIcon } from "@/app/lib/cms/icons";
import { createContactLead } from "@/app/lib/supabase/rest";
import { SocialIcon, guessSocialIcon } from "@/app/components/shared/SocialIcon";

type Props = { content?: ContactContent };

export default function ContactSection({ content = defaultHomeContent.contact }: Props) {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await createContactLead(formState);
      setSubmitted(true);
      setFormState({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="bg-[#000] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SectionBadge text={content.badge} />
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
            {content.title} <span className="text-gradient-red">{content.titleHighlight}</span>
          </h2>
          <p className="text-lg text-gray-300">{content.description}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            {content.info.map((info, i) => {
              const Icon = getIcon(info.icon);
              return (
                <a key={`${info.label}-${i}`} href={info.href} className="group flex items-center gap-4 rounded-xl border border-white/[0.04] bg-[#0F0F0F] p-5 transition-all duration-200 hover:border-hook-red/15 hover:bg-hook-red/[0.02]">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-hook-red/10 transition-colors group-hover:bg-hook-red/15">
                    <Icon className="h-5 w-5 text-hook-red" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">{info.label}</div>
                    <div className="text-sm font-bold text-white">{info.value}</div>
                  </div>
                </a>
              );
            })}

            <div className="rounded-xl border border-white/[0.04] bg-[#0F0F0F] p-5">
              <div className="mb-3 text-xs text-gray-500">تابعنا على</div>
              <div className="flex flex-wrap gap-3">
                {content.socials.map((social, i) => {
                  const icon = social.icon || guessSocialIcon(`${social.label} ${social.href}`);

                  return (
                    <a
                      key={`${social.label}-${i}`}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      aria-label={social.label}
                      className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-hook-red/45 hover:bg-hook-red hover:text-white hover:shadow-[0_18px_45px_rgba(200,0,0,0.24)]"
                    >
                      <SocialIcon icon={icon} className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-white/[0.04] bg-[#0F0F0F] p-8">
            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-gray-500">الاسم</label>
                <input type="text" value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} placeholder="اسمك الكامل" className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors focus:border-hook-red/40 focus:outline-none" required />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-gray-500">البريد الإلكتروني</label>
                <input type="email" value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} placeholder="email@example.com" className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors focus:border-hook-red/40 focus:outline-none" required />
              </div>
            </div>

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs text-gray-500">رقم الموبايل</label>
                <input type="tel" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} placeholder="+20 1XX XXX XXXX" className="w-full rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors focus:border-hook-red/40 focus:outline-none" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs text-gray-500">الخدمة المطلوبة</label>
                <select value={formState.service} onChange={(e) => setFormState({ ...formState, service: e.target.value })} className="w-full appearance-none rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors focus:border-hook-red/40 focus:outline-none">
                  <option value="" className="bg-[#111]">اختر الخدمة</option>
                  {content.serviceOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#111]">{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-1.5 block text-xs text-gray-500">رسالتك</label>
              <textarea value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} placeholder="اكتب رسالتك هنا..." rows={4} className="w-full resize-none rounded-lg border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-gray-600 transition-colors focus:border-hook-red/40 focus:outline-none" />
            </div>

            <button type="submit" disabled={sending} className="flex w-full items-center justify-center gap-2 rounded-lg bg-hook-red py-3.5 text-base font-bold text-white transition-all duration-200 hover:bg-hook-red-light hover:shadow-[0_0_25px_rgba(200,0,0,0.3)] disabled:opacity-60">
              {submitted ? <><CheckCircle className="h-4 w-4" /> تم الإرسال بنجاح!</> : <><Send className="h-4 w-4" /> {sending ? "جاري الإرسال..." : "أرسل رسالتك"}</>}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
