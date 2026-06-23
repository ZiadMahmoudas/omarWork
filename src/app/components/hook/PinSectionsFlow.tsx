"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PullPhase = "drop" | "catch" | "pull" | "release";

type HookPayload = {
  progress: number;
  active: number;
  phase: PullPhase;
  velocity: number;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function getPhase(progress: number): PullPhase {
  if (progress < 0.34) return "drop";
  if (progress < 0.5) return "catch";
  if (progress < 0.86) return "pull";
  return "release";
}

export default function PinSectionsFlow() {
  const rafRef = useRef<number | null>(null);
  const payloadRef = useRef<HookPayload | null>(null);

  useLayoutEffect(() => {
    const emitHook = (payload: HookPayload) => {
      payloadRef.current = payload;

      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        if (payloadRef.current) {
          window.dispatchEvent(
            new CustomEvent("hook:pull", {
              detail: payloadRef.current,
            })
          );
        }

        rafRef.current = null;
      });
    };

    const emitIdle = () => {
      window.dispatchEvent(new CustomEvent("hook:idle"));
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const sections = gsap.utils.toArray<HTMLElement>("main > .hook-scene");

        emitIdle();

        sections.forEach((section, index) => {
          const content = section.firstElementChild as HTMLElement | null;

          if (content) {
            gsap.set(section, {
              position: "relative",
              isolation: "isolate",
            });

            gsap.fromTo(
              content,
              {
                y: index === 0 ? 0 : 82,
                autoAlpha: index === 0 ? 1 : 0,
                scale: index === 0 ? 1 : 0.975,
                filter: index === 0 ? "blur(0px)" : "blur(10px)",
                transformPerspective: 1200,
                transformOrigin: "center center",
              },
              {
                y: 0,
                autoAlpha: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.95,
                ease: "power3.out",
                clearProps: "transform,opacity,visibility,filter",
                scrollTrigger: {
                  trigger: section,
                  start: "top 84%",
                  once: true,
                },
              }
            );
          }

          ScrollTrigger.create({
            trigger: section,
            start: "top 90%",
            end: "top 18%",
            scrub: 0.45,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            refreshPriority: 5,
            onEnter: (self) => {
              emitHook({
                progress: 0,
                active: index,
                phase: "drop",
                velocity: Math.abs(self.getVelocity()),
              });
            },
            onUpdate: (self) => {
              const progress = clamp01(self.progress);

              emitHook({
                progress,
                active: index,
                phase: getPhase(progress),
                velocity: Math.abs(self.getVelocity()),
              });
            },
            onLeave: (self) => {
              emitHook({
                progress: 1,
                active: index,
                phase: "release",
                velocity: Math.abs(self.getVelocity()),
              });
            },
            onLeaveBack: (self) => {
              emitHook({
                progress: 0,
                active: index,
                phase: "drop",
                velocity: Math.abs(self.getVelocity()),
              });
            },
          });
        });

        const refreshCall = gsap.delayedCall(0.35, () => {
          ScrollTrigger.refresh();
        });

        return () => {
          refreshCall.kill();
          emitIdle();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        emitIdle();

        const sections = gsap.utils.toArray<HTMLElement>("main > .hook-scene");

        sections.forEach((section, index) => {
          const content = section.firstElementChild as HTMLElement | null;
          if (!content) return;

          gsap.fromTo(
            content,
            {
              y: index === 0 ? 0 : 48,
              autoAlpha: index === 0 ? 1 : 0,
              filter: index === 0 ? "blur(0px)" : "blur(8px)",
            },
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.75,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility,filter",
              scrollTrigger: {
                trigger: section,
                start: "top 88%",
                once: true,
              },
            }
          );
        });

        return () => emitIdle();
      });

      return () => mm.revert();
    });

    return () => {
      ctx.revert();

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      emitIdle();
    };
  }, []);

  return null;
}
