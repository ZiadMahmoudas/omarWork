"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import SectionBadge from "@/app/components/shared/SectionBadge";
import { defaultWorksContent, WorksContent } from "@/app/lib/cms/worksContent";

type Props = { content?: WorksContent["hero"] };

export default function WorksHero({ content = defaultWorksContent.hero }: Props) {
  return (
    <section className="relative flex min-h-[72vh] items-center overflow-hidden pb-16 pt-32">
      <div className="absolute inset-0">
        <div className="absolute right-[12%] top-[18%] h-[480px] w-[480px] rounded-full bg-hook-red/7 blur-[130px]" />
        <div className="absolute bottom-[10%] left-[14%] h-[360px] w-[360px] rounded-full bg-hook-red/4 blur-[110px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "linear-gradient(rgba(200,0,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(200,0,0,0.4) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl">
          <SectionBadge text={content.badge} />
          <h1 className="mb-6 text-5xl font-black leading-[1.08] text-white sm:text-6xl md:text-7xl">
            {content.title}
            <span className="text-gradient-red mt-3 block">{content.titleHighlight}</span>
          </h1>
          <p className="mb-10 max-w-3xl text-lg leading-9 text-gray-300 md:text-xl">{content.description}</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href={content.primaryHref} className="inline-flex items-center justify-center gap-2 rounded-lg bg-hook-red px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:bg-hook-red-light hover:shadow-[0_0_35px_rgba(200,0,0,0.35)]">
              {content.primaryLabel} <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link href={content.secondaryHref} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-8 py-4 text-base font-bold text-white transition-all duration-200 hover:border-white/25 hover:bg-white/[0.04]">
              <Sparkles className="h-4 w-4 text-hook-red" /> {content.secondaryLabel}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
