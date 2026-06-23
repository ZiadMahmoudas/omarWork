"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Award,
  Zap,
  Target,
} from "lucide-react";
import SectionBadge from "@/app/components/shared/SectionBadge";

const HOOK_SVG = "/hook-arabic.svg";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#000] py-28">
      <div className="absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-hook-red/5 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 h-[360px] w-[360px] rounded-full bg-white/[0.025] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div>
            <SectionBadge text="من نحن" />

            <motion.h2
              initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="mb-6 text-4xl font-black leading-tight text-white sm:text-5xl"
            >
              من التواجد إلى{" "}
              <span className="text-gradient-red">السيادة</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, delay: 0.08, ease: "easeOut" }}
              className="mb-6 text-lg leading-relaxed text-gray-200"
            >
              في بيئة أعمال تتجه بخطى متسارعة نحو التحول الرقمي، تُدرك
              المؤسسات الطموحة إن التسويق بيتجاوز مجرد الإعلان — هو المحرك
              الأساسي للنمو.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, delay: 0.16, ease: "easeOut" }}
              className="mb-10 text-lg leading-relaxed text-gray-200"
            >
              إحنا لسنا مجرد وكالة تسويق، بل مركز عملياتك الرقمية. بنحوّل
              علامتك التجارية لرائدة في قطاعها. مع بعض نحلم، نبني، نقود،
              ونحقق النجاح اللي تستحقه.
            </motion.p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Target,
                  label: "استراتيجيات مخصصة",
                  desc: "خطط تسويقية مصممة خصيصاً ليك",
                },
                {
                  icon: Zap,
                  label: "نتائج سريعة",
                  desc: "أداء فوري ونتائج ملموسة",
                },
                {
                  icon: Users,
                  label: "فريق محترف",
                  desc: "خبرة سنين في المجال الرقمي",
                },
                {
                  icon: Award,
                  label: "جودة عالية",
                  desc: "معايير احترافية في كل تفصيلة",
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ delay: i * 0.08, duration: 0.55 }}
                    className="group flex items-start gap-3.5 rounded-xl border border-white/[0.04] bg-white/[0.015] p-4 transition-all duration-300 hover:border-hook-red/20 hover:bg-hook-red/[0.025]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-hook-red/10 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5 text-hook-red" />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">
                        {item.label}
                      </h4>
                      <p className="mt-0.5 text-xs text-gray-500">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-80 w-80 sm:h-96 sm:w-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-hook-red/10"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-hook-red/[0.06]"
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-14 rounded-full border border-white/[0.035]"
              />

              <motion.div
                animate={{
                  scale: [1, 1.06, 1],
                  y: [-8, 8, -8],
                  rotate: [-3, 3, -3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src={HOOK_SVG}
                  alt="Hook"
                  className="h-[155px] w-auto rotate-[-90deg] drop-shadow-[0_0_40px_rgba(200,0,0,0.45)]"
                />
              </motion.div>

              {[
                { top: "2%", right: "5%", value: "+150", label: "عميل" },
                { bottom: "8%", left: "0%", value: "+200", label: "مشروع" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [-6, 6, -6] }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute rounded-xl border border-white/[0.04] bg-[#111] p-3.5 text-center shadow-lg"
                  style={{
                    top: stat.top,
                    right: stat.right,
                    bottom: stat.bottom,
                    left: stat.left,
                  }}
                >
                  <div className="text-base font-black text-hook-red">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[10px] text-gray-500">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}