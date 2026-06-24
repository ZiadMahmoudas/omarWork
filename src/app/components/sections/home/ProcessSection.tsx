"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "lucide-react";
import SectionBadge from "@/app/components/shared/SectionBadge";
import { ProcessContent, defaultHomeContent } from "@/app/lib/cms/homeContent";
import { getIcon } from "@/app/lib/cms/icons";

type Props = { content?: ProcessContent };

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection({ content = defaultHomeContent.process }: Props) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const pauseHook = () => window.dispatchEvent(new CustomEvent("hook:pause"));
    const resumeHook = () => {
      window.dispatchEvent(new CustomEvent("hook:resume"));
      window.dispatchEvent(new CustomEvent("hook:idle"));
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 92%",
        end: "bottom 8%",
        onEnter: pauseHook,
        onEnterBack: pauseHook,
        onLeave: resumeHook,
        onLeaveBack: resumeHook,
        refreshPriority: 90,
      });
    }, section);

    return () => {
      ctx.revert();
      resumeHook();
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" className="relative overflow-hidden bg-[#000] py-28">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hook-red/[0.02] blur-[130px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-20 text-center">
          <SectionBadge text={content.badge} />
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl">
            {content.title} <span className="text-gradient-red">{content.titleHighlight}</span>
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-300">{content.description}</p>
        </div>

        <div className="gsap-stacked-deck process-stack">
          {content.steps.map((step, i) => {
            const Icon = getIcon(step.icon);
            return (
              <div key={`${step.num}-${i}`} className="gsap-card-item">
                <div className="group relative min-h-[100px] overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0F0F0F] p-9 transition-all duration-300 hover:border-hook-red/20">
                  <span className="pointer-events-none absolute -left-1 -top-3 select-none p-4 text-[100px] font-black leading-none text-white/[0.05] transition-colors duration-300 group-hover:text-hook-red/[0.16]">
                    {step.num}
                  </span>
                  <div className="relative z-10">
                    <div className="mb-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-hook-red/10 transition-colors group-hover:bg-hook-red/15">
                        <Icon className="h-6 w-6 text-hook-red" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-hook-red">{step.num}</span>
                        <h3 className="text-lg font-bold leading-tight text-white">{step.title}</h3>
                      </div>
                    </div>

                    <ul className="space-y-2.5">
                      {step.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-gray-300">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-hook-red/70" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
