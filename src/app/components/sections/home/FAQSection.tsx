"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionBadge from "@/app/components/shared/SectionBadge";
import { defaultHomeContent, FaqContent } from "@/app/lib/cms/homeContent";

type Props = { content?: FaqContent };

export default function FAQSection({ content = defaultHomeContent.faq }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-[#000] py-28">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SectionBadge text={content.badge} />
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
            {content.title} <span className="text-gradient-red">{content.titleHighlight}</span>
          </h2>
          <p className="text-lg text-gray-400">{content.description}</p>
        </div>

        <div className="gsap-stacked-deck faq-stack flex flex-col gap-6">
          {content.items.map((faq, i) => (
            <div key={`${faq.q}-${i}`}>
              <div className="faq-stack-card min-h-[100px] overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0F0F0F] transition-colors hover:border-white/[0.1]">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="flex w-full items-center justify-between p-7 text-right md:p-9">
                  <span className="text-xl font-black leading-relaxed text-white md:text-2xl">{faq.q}</span>
                  <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }} transition={{ duration: 0.2 }} className="mr-4 shrink-0">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-hook-red/10">
                      <ChevronDown className="h-3.5 w-3.5 text-hook-red" />
                    </div>
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div className="border-t border-white/[0.04] px-7 pb-8 pt-6 text-base leading-8 text-gray-300 md:px-9">{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
