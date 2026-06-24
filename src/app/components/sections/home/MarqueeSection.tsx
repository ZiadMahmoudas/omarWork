"use client";

import React from "react";
import { defaultHomeContent, HomeContent } from "@/app/lib/cms/homeContent";

type Props = { content?: HomeContent["marquee"] };

export default function MarqueeSection({ content = defaultHomeContent.marquee }: Props) {
  const items = content.items?.length ? content.items : defaultHomeContent.marquee.items;
  return (
    <div className="overflow-hidden border-y border-white/[0.04] bg-[#000] py-4" id="marquee">
      <div className="flex animate-scroll-marquee whitespace-nowrap" dir="ltr">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span key={`${item}-${i}`} className="mx-8 text-xs font-bold tracking-[0.25em] text-white/[0.07]">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
