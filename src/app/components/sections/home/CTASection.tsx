"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Phone } from "lucide-react";

const HOOK_SVG = "/hook-arabic.svg";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#000] py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-hook-red/6 via-hook-red/2 to-transparent" />
      <div className="absolute -right-20 -top-20 h-[400px] w-[400px] rounded-full bg-hook-red/6 blur-[100px]" />
      <div className="absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-white/[0.03] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-8">
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
            scale: 0.82,
            rotate: -8,
            filter: "blur(10px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: "blur(0px)",
          }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8 inline-block"
        >
          <motion.img
            src={HOOK_SVG}
            alt="Hook"
            className="mx-auto h-[105px] w-auto origin-top drop-shadow-[0_0_28px_rgba(200,0,0,0.45)]"
            animate={{
              y: [-8, 8, -8],
              rotate: [-3, 3, -3],
              scale: [1, 1.035, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.75, delay: 0.08, ease: "easeOut" }}
          className="mb-6 text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl"
        >
          هوّك على <span className="text-gradient-red">نجاحك</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.75, delay: 0.16, ease: "easeOut" }}
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-gray-200"
        >
          احصل على جلسة مجانية تقدر قيمتها بـ 800 جنيه خاصة بالاستراتيجية لمدة
          30 دقيقة مع مسوق رقمي خبير.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.75, delay: 0.24, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2.5 rounded-lg bg-hook-red px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:bg-hook-red-light hover:shadow-[0_0_35px_rgba(200,0,0,0.35)]"
          >
            أحصل على 30 دقيقة مجانية
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </a>

          <a
            href="https://wa.me/201000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-lg border border-white/10 px-10 py-4 text-lg font-bold text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]"
          >
            <Phone className="h-5 w-5" />
            تواصل عبر واتساب
          </a>
        </motion.div>
      </div>
    </section>
  );
}