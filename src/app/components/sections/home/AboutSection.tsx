"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionBadge from "@/app/components/shared/SectionBadge";
import { AboutContent, defaultHomeContent } from "@/app/lib/cms/homeContent";
import { getIcon } from "@/app/lib/cms/icons";

type Props = { content?: AboutContent };

export default function AboutSection({ content = defaultHomeContent.about }: Props) {
  return (
    <section id="about" className="relative overflow-hidden bg-[#000] py-28">
      <div className="absolute -right-40 -top-40 h-[400px] w-[400px] rounded-full bg-hook-red/5 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 h-[360px] w-[360px] rounded-full bg-white/[0.025] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <div>
            <SectionBadge text={content.badge} />

            <motion.h2
              initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="mb-6 text-4xl font-black leading-tight text-white sm:text-5xl"
            >
              {content.title} <span className="text-gradient-red">{content.titleHighlight}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, delay: 0.08, ease: "easeOut" }}
              className="mb-6 text-lg leading-relaxed text-gray-200"
            >
              {content.paragraph1}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, delay: 0.16, ease: "easeOut" }}
              className="mb-10 text-lg leading-relaxed text-gray-200"
            >
              {content.paragraph2}
            </motion.p>

            <div className="grid gap-4 sm:grid-cols-2">
              {content.features.map((item, i) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.div
                    key={`${item.label}-${i}`}
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
                      <h4 className="text-sm font-bold text-white">{item.label}</h4>
                      <p className="mt-0.5 text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-80 w-80 sm:h-96 sm:w-96">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-hook-red/10" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-6 rounded-full border border-hook-red/[0.06]" />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute inset-14 rounded-full border border-white/[0.035]" />

              <motion.div
                animate={{ scale: [1, 1.06, 1], y: [-8, 8, -8], rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img src={content.hookSvg} alt="Hook" className="h-[155px] w-auto origin-top drop-shadow-[0_0_40px_rgba(200,0,0,0.45)]" />
              </motion.div>

              {content.floatingStats.map((stat, i) => (
                <motion.div
                  key={`${stat.label}-${i}`}
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute rounded-xl border border-white/[0.04] bg-[#111] p-3.5 text-center shadow-lg"
                  style={{ top: stat.top, right: stat.right, bottom: stat.bottom, left: stat.left }}
                >
                  <div className="text-base font-black text-hook-red">{stat.value}</div>
                  <div className="mt-0.5 text-[10px] text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
