"use client";

import React from "react";
import { motion } from "framer-motion";
import Counter from "@/app/components/shared/Counter";
import { defaultHomeContent, HomeContent } from "@/app/lib/cms/homeContent";
import { getIcon } from "@/app/lib/cms/icons";

type Props = { content?: HomeContent["stats"] };

export default function StatsSection({ content = defaultHomeContent.stats }: Props) {
  return (
    <section className="border-y border-white/[0.04] bg-[#000] py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {content.items.map((stat, i) => {
            const Icon = getIcon(stat.icon);
            return (
              <motion.div
                key={`${stat.label}-${i}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-hook-red/10">
                  <Icon className="h-5 w-5 text-hook-red" />
                </div>
                <div className="mb-1 text-4xl font-black text-white sm:text-5xl">
                  <Counter end={Number(stat.value)} suffix={stat.suffix} />
                </div>
                <div className="text-sm font-bold text-hook-red">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
