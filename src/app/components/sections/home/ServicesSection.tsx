"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import SectionBadge from "@/app/components/shared/SectionBadge";
import { ServicesContent, defaultHomeContent } from "@/app/lib/cms/homeContent";
import { getIcon } from "@/app/lib/cms/icons";

type Props = { content?: ServicesContent };

export default function ServicesSection({ content = defaultHomeContent.services }: Props) {
  return (
    <section id="services" className="relative overflow-hidden bg-[#000] py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(200,0,0,0.08),transparent_32%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <SectionBadge text={content.badge} />
          <h2 className="mb-4 text-4xl font-black leading-tight text-white sm:text-5xl">
            {content.title} <span className="text-gradient-red">{content.titleHighlight}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-300">{content.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {content.items.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <div
                key={`${service.num}-${i}`}
                className="group relative min-h-[300px] overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0F0F0F] p-7 transition-all duration-300 hover:-translate-y-2 hover:border-hook-red/25 hover:bg-[#111] hover:shadow-[0_28px_90px_rgba(200,0,0,0.12)]"
              >
                <span className="pointer-events-none absolute -left-3 -top-4 select-none text-[112px] font-black leading-none text-white/[0.035] transition-colors duration-300 group-hover:text-hook-red/[0.12]">
                  {service.num}
                </span>

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hook-red/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-hook-red/15">
                      <Icon className="h-7 w-7 text-hook-red" />
                    </div>
                    <span className="font-mono text-sm font-black text-hook-red/70">[{service.num}]</span>
                  </div>

                  <h3 className="mb-4 text-2xl font-black leading-tight text-white transition-colors duration-300 group-hover:text-hook-red-light">
                    {service.title}
                  </h3>

                  <p className="mb-7 flex-1 text-[15px] leading-8 text-gray-300">{service.desc}</p>

                  <a href="#contact" className="inline-flex items-center gap-2 text-sm font-black text-hook-red transition-all duration-300 group-hover:gap-4">
                    اعرف أكثر
                    <ArrowLeft className="h-4 w-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
