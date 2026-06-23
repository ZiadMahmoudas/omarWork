"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Counter from "@/app/components/shared/Counter";

const HOOK_SVG = "/hook-arabic.svg";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#000]"
    >
      <div className="absolute inset-0">
        <div className="absolute right-[15%] top-[20%] h-[500px] w-[500px] rounded-full bg-hook-red/6 blur-[140px]" />
        <div className="absolute bottom-[20%] left-[20%] h-[350px] w-[350px] rounded-full bg-hook-red/3 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,0,0,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-32 lg:px-8"
      >
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2.5 rounded-lg border border-hook-red/15 bg-hook-red/5 px-4 py-2"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-hook-red" />
              <span className="text-[13px] font-medium text-gray-300">
                وكالة تسويق إلكتروني متكاملة
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="mb-5 text-5xl font-black leading-[1.08] sm:text-6xl md:text-7xl"
            >
              <span className="text-white">اصطد عملائك</span>
              <br />
              <span className="text-gradient-red">مع هوّك</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.6 }}
              className="mb-5 text-lg font-bold tracking-wide text-hook-red sm:text-xl"
            >
              من التواجد إلى السيادة
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-10 max-w-xl text-lg leading-relaxed text-gray-200"
            >
              مؤسسة هوّك | Hook Agency واحدة من أفضل وكالات التسويق الإلكتروني
              في مصر والوطن العربي. نقدملك حلول متكاملة عشان نمّي متجرك
              الإلكتروني ونعزز وجودك الرقمي.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mb-12 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="animate-pulse-red inline-flex items-center gap-2 rounded-lg bg-hook-red px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-hook-red-light hover:shadow-[0_0_35px_rgba(200,0,0,0.35)]"
              >
                ابدأ رحلتك دلوقتي
                <ArrowLeft className="h-4 w-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:border-white/25 hover:bg-white/[0.04]"
              >
                اكتشف خدماتنا
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center gap-10 border-t border-white/[0.06] pt-8"
            >
              {[
                { value: 150, suffix: "+", label: "عميل يثق فينا" },
                { value: 200, suffix: "+", label: "مشروع ناجح" },
                { value: 95, suffix: "%", label: "رضا العملاء" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="mb-0.5 text-3xl font-black text-white">
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-gray-400">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.5, duration: 0.75 }}
            className="relative hidden items-center justify-center lg:flex"
          >
            <div className="relative h-[420px] w-[420px]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-hook-red/10"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-hook-red/[0.06]"
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                className="absolute inset-16 rounded-full border border-white/[0.03]"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                className="absolute inset-24 rounded-full border border-hook-red/[0.04]"
              />
<div className="absolute inset-0 flex flex-col items-center">
  <motion.div
    animate={{ scaleY: [0.96, 1.04, 0.96] }}
    transition={{
      duration: 3.2,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    className="h-[140px] w-[2px] origin-top bg-gradient-to-b from-hook-red/10 via-hook-red/45 to-hook-red/20"
  />

  <motion.div
    className="relative flex origin-top items-start justify-center"
    style={{
      transformOrigin: "50% 0%",
    }}
    animate={{
      rotate: [-10, 10, -10],
    }}
    transition={{
      duration: 3.4,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <motion.img
      src={HOOK_SVG}
      alt="Hook"
      className="h-[190px] w-auto rotate-[-90deg] drop-shadow-[0_0_55px_rgba(200,0,0,0.45)]"
      animate={{
        y: [0, 5, 0],
        scale: [1, 1.025, 1],
      }}
      transition={{
        duration: 3.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </motion.div>
</div>

              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-4 top-4 rounded-xl border border-white/[0.05] bg-[#111] p-3.5 shadow-lg"
              >
                <div className="text-sm font-black text-hook-red">+150</div>
                <div className="text-[10px] text-gray-400">عميل</div>
              </motion.div>

              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 right-4 rounded-xl border border-white/[0.05] bg-[#111] p-3.5 shadow-lg"
              >
                <div className="text-sm font-black text-hook-red">95%</div>
                <div className="text-[10px] text-gray-400">رضا العملاء</div>
              </motion.div>

              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-2 top-1/2 rounded-xl border border-white/[0.05] bg-[#111] p-3.5 shadow-lg"
              >
                <div className="text-sm font-black text-hook-red">+200</div>
                <div className="text-[10px] text-gray-400">مشروع</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}