"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HookSvg from "./HookSvg";

type PullPhase = "drop" | "catch" | "pull" | "release";

type PullDetail = {
  progress?: number;
  active?: number;
  phase?: PullPhase;
  velocity?: number;
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function getPhase(progress: number): PullPhase {
  if (progress < 0.38) return "drop";
  if (progress < 0.58) return "catch";
  if (progress < 0.88) return "pull";
  return "release";
}

export default function HookRig() {
  const reelRef = useRef<HTMLDivElement>(null);
  const ropeRef = useRef<HTMLDivElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);

  const lastPhaseRef = useRef<PullPhase>("release");
  const lastActiveRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const reel = reelRef.current;
    const rope = ropeRef.current;
    const hook = hookRef.current;

    if (!reel || !rope || !hook) return;

    const glow = glowRef.current;
    const sparks = sparksRef.current
      ? (Array.from(sparksRef.current.children) as HTMLElement[])
      : [];

    const redParts = hook.querySelectorAll<SVGPathElement>("[data-hook-red]");
    const hookBody = hook.querySelector<SVGGElement>("[data-hook-body]");

    const IDLE_LENGTH = 54;
    const MAX_DROP = Math.max(390, Math.min(560, window.innerHeight * 0.62));
    const HOOK_ATTACH_LEFT = -58;
    const HOOK_ATTACH_TOP_OVERLAP = -1;

    let lastExternalEventAt = 0;
    let fallbackRaf = 0;

    const state = {
      length: IDLE_LENGTH,
      scale: 1,
      ropeScale: 1,
      glowOpacity: 0.22,
      glowScale: 1,
      hookStretch: 1,
    };

    gsap.set(hook, {
      left: HOOK_ATTACH_LEFT,
      y: IDLE_LENGTH + HOOK_ATTACH_TOP_OVERLAP,
      x: 0,
      rotate: 0,
      scale: 1,
      transformOrigin: "83% 0%",
      force3D: true,
      zIndex: 10000,
    });

    gsap.set(rope, {
      height: IDLE_LENGTH,
      scaleX: 1,
      transformOrigin: "top center",
      force3D: true,
    });

    if (hookBody) {
      gsap.set(hookBody, {
        transformOrigin: "83% 0%",
        transformBox: "fill-box",
        y: 0,
        scaleY: 1,
      });
    }

    gsap.set(glow, { opacity: 0.22, scale: 1 });
    gsap.set(sparks, { opacity: 0, x: 0, y: 0, scale: 0 });

    const render = () => {
      gsap.set(rope, {
        height: state.length,
        scaleX: state.ropeScale,
      });

      gsap.set(hook, {
        y: state.length + HOOK_ATTACH_TOP_OVERLAP,
        x: 0,
        rotate: 0,
        scale: state.scale,
      });

      if (hookBody) {
        gsap.set(hookBody, {
          y: 0,
          scaleY: state.hookStretch,
        });
      }

      if (glow) {
        gsap.set(glow, {
          opacity: state.glowOpacity,
          scale: state.glowScale,
        });
      }
    };

    const moveRig = (
      vars: Partial<typeof state>,
      duration = 0.22,
      ease = "power3.out"
    ) => {
      gsap.to(state, {
        ...vars,
        duration,
        ease,
        overwrite: "auto",
        onUpdate: render,
      });
    };

    const spin = gsap.to(reel, {
      rotate: 360,
      duration: 4,
      ease: "linear",
      repeat: -1,
    });

    const idle = () => {
      spin.timeScale(1);

      moveRig(
        {
          length: IDLE_LENGTH,
          scale: 1,
          ropeScale: 1,
          glowOpacity: 0.22,
          glowScale: 1,
          hookStretch: 1,
        },
        0.36,
        "power3.out"
      );

      lastPhaseRef.current = "release";
      lastActiveRef.current = null;
    };

    const pauseHook = () => {
      pausedRef.current = true;
      idle();
      gsap.to([reel, rope, hook], {
        opacity: 0.42,
        duration: 0.22,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const resumeHook = () => {
      pausedRef.current = false;
      idle();
      gsap.to([reel, rope, hook], {
        opacity: 1,
        duration: 0.22,
        ease: "power2.out",
        overwrite: true,
      });
    };

    const catchFlash = (active?: number) => {
      if (active === lastActiveRef.current) return;

      lastActiveRef.current = active ?? null;

      gsap.fromTo(
        redParts,
        { fill: "#ff3344" },
        {
          fill: "#A61C24",
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.02,
          overwrite: true,
        }
      );

      gsap.fromTo(
        state,
        {
          scale: 1.13,
          ropeScale: 1.65,
          hookStretch: 1.055,
        },
        {
          scale: 1,
          ropeScale: 1,
          hookStretch: 1,
          duration: 0.62,
          ease: "elastic.out(1, 0.35)",
          overwrite: true,
          onUpdate: render,
        }
      );

      gsap.fromTo(
        sparks,
        { opacity: 1, x: 0, y: 0, scale: 1 },
        {
          opacity: 0,
          x: (i) => -28 - i * 9,
          y: (i) => (i - 3) * 15,
          scale: 0,
          duration: 0.75,
          stagger: 0.035,
          ease: "power3.out",
          overwrite: true,
        }
      );
    };

    const runPull = (
      rawProgress: number,
      active?: number,
      velocity = 0,
      explicitPhase?: PullPhase
    ) => {
      const p = clamp01(rawProgress);
      const phase = explicitPhase || getPhase(p);

      const rigDuration =
        velocity > 4200 ? 0.055 : velocity > 2600 ? 0.085 : velocity > 1400 ? 0.13 : 0.22;
      const rigEase = velocity > 2600 ? "power4.out" : "power3.out";

      // نزول واضح + مسكة في النص + طلعة بعد ما السكشن يستقر
      const dropAmount =
        p < 0.42
          ? p / 0.42
          : p < 0.72
            ? 1
            : Math.max(0, 1 - (p - 0.72) / 0.28);

      const pullPower = Math.sin(p * Math.PI);
      const snap = phase === "catch" ? 1 : 0;
      const length = IDLE_LENGTH + dropAmount * MAX_DROP;

      spin.timeScale(1 + pullPower * 3.4 + snap * 2.2);

      moveRig(
        {
          length,
          scale: 1 + pullPower * 0.055 + snap * 0.04,
          ropeScale: 1 + pullPower * 0.45 + snap * 0.28,
          glowOpacity: 0.22 + pullPower * 0.72 + snap * 0.18,
          glowScale: 1 + pullPower * 0.82,
          hookStretch: 1 + pullPower * 0.04,
        },
        rigDuration,
        rigEase
      );

      if (phase === "catch" && lastPhaseRef.current !== "catch") {
        catchFlash(active);
      }

      lastPhaseRef.current = phase;
    };

    const onPull = (event: Event) => {
      lastExternalEventAt = Date.now();
      if (pausedRef.current) return;

      const detail = (event as CustomEvent<PullDetail>).detail || {};
      const p = clamp01(detail.progress ?? 0);
      const velocity = Math.abs(detail.velocity ?? 0);

      runPull(p, detail.active, velocity, detail.phase);
    };

    // fallback بسيط: لو PinSectionsFlow لأي سبب مبعتش event، الخطاف يقرأ السكاشن بنفسه
    const fallbackFromVisibleSection = () => {
      fallbackRaf = 0;

      if (pausedRef.current) return;
      if (Date.now() - lastExternalEventAt < 160) return;

      const scenes = Array.from(
        document.querySelectorAll<HTMLElement>("main > .hook-scene")
      );

      const vh = window.innerHeight;
      const start = vh * 0.92;
      const end = vh * 0.2;

      let best: { progress: number; index: number; score: number } | null = null;

      scenes.forEach((scene, index) => {
        const rect = scene.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > vh) return;

        const progress = clamp01((start - rect.top) / (start - end));
        const score = Math.abs(rect.top - vh * 0.45);

        if (!best || score < best.score) {
          best = { progress, index, score };
        }
      });

      const chosen = best as { progress: number; index: number; score: number } | null;

      if (chosen) {
        runPull(chosen.progress, chosen.index, 0, getPhase(chosen.progress));
      }
    };

    const onScroll = () => {
      if (fallbackRaf) return;
      fallbackRaf = requestAnimationFrame(fallbackFromVisibleSection);
    };

    window.addEventListener("hook:pull", onPull);
    window.addEventListener("hook:idle", idle);
    window.addEventListener("hook:pause", pauseHook);
    window.addEventListener("hook:resume", resumeHook);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    render();
    idle();
    requestAnimationFrame(fallbackFromVisibleSection);

    return () => {
      spin.kill();
      gsap.killTweensOf(state);

      if (fallbackRaf) {
        cancelAnimationFrame(fallbackRaf);
      }

      window.removeEventListener("hook:pull", onPull);
      window.removeEventListener("hook:idle", idle);
      window.removeEventListener("hook:pause", pauseHook);
      window.removeEventListener("hook:resume", resumeHook);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed right-0 top-[58px] z-[9999] hidden h-[calc(100vh-58px)] w-[124px] lg:block">
      <div className="absolute right-3 top-2 z-[10002]">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-hook-red/50 bg-[#070707]/95 shadow-[0_0_42px_rgba(200,0,0,0.3)]">
          <div
            ref={reelRef}
            className="relative h-8 w-8 rounded-full border-2 border-hook-red/70 will-change-transform"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-hook-red/90" />
            </div>

            <div className="absolute left-1/2 top-1/2 h-[1px] w-full -translate-x-1/2 -translate-y-1/2 bg-hook-red/40" />
            <div className="absolute left-1/2 top-1/2 h-full w-[1px] -translate-x-1/2 -translate-y-1/2 bg-hook-red/40" />
          </div>

          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[7px] font-black tracking-[0.3em] text-hook-red/50">
            HOOK
          </div>
        </div>
      </div>

      <div className="absolute right-[42px] top-[45px] z-[10001] w-[4px]">
        <div
          ref={ropeRef}
          className="h-[54px] w-full origin-top rounded-full bg-gradient-to-b from-hook-red/20 via-hook-red/95 to-hook-red/55 shadow-[0_0_18px_rgba(200,0,0,0.55)] will-change-transform"
        />

        <div ref={hookRef} className="absolute top-0 z-[10003] will-change-transform">
          <div
            ref={glowRef}
            className="absolute -inset-16 rounded-full bg-hook-red/20 blur-3xl"
          />

          <div className="relative z-10 drop-shadow-[0_0_38px_rgba(200,0,0,0.95)]">
            <HookSvg width={72} height={210} />
          </div>

          <div ref={sparksRef} className="absolute left-10 top-[120px]">
            {[...Array(7)].map((_, i) => (
              <span
                key={i}
                className="absolute block h-2 w-2 rounded-full bg-hook-red opacity-0 shadow-[0_0_12px_rgba(200,0,0,0.9)]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
