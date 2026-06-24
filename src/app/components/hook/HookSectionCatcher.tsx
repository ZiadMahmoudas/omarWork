"use client";

import { useEffect } from "react";

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

function getGripPower(progress: number, phase?: PullPhase) {
  if (phase === "release") return 0;
  if (progress <= 0.08 || progress >= 0.94) return 0;
  return Math.max(0, Math.sin(progress * Math.PI));
}

function clearScenes(scenes: HTMLElement[]) {
  scenes.forEach((scene) => {
    scene.classList.remove("is-hook-active");
    scene.removeAttribute("data-hook-phase");
    scene.style.removeProperty("--hook-catch-opacity");
    scene.style.removeProperty("--hook-catch-scale");
    scene.style.removeProperty("--hook-catch-dot-scale");
  });
}

export default function HookSectionCatcher() {
  useEffect(() => {
    const getScenes = () =>
      Array.from(document.querySelectorAll<HTMLElement>("main > .hook-scene"));

    const onPull = (event: Event) => {
      const detail = (event as CustomEvent<PullDetail>).detail || {};
      const scenes = getScenes();
      const active = Number(detail.active ?? -1);
      const progress = clamp01(detail.progress ?? 0);
      const power = getGripPower(progress, detail.phase);

      scenes.forEach((scene, index) => {
        const isActive = index === active && power > 0.05;

        scene.classList.toggle("is-hook-active", isActive);

        if (!isActive) {
          scene.removeAttribute("data-hook-phase");
          scene.style.removeProperty("--hook-catch-opacity");
          scene.style.removeProperty("--hook-catch-scale");
          scene.style.removeProperty("--hook-catch-dot-scale");
          return;
        }

        scene.dataset.hookPhase = detail.phase || "pull";
        scene.style.setProperty("--hook-catch-opacity", String(0.25 + power * 0.75));
        scene.style.setProperty("--hook-catch-scale", String(0.18 + power * 0.82));
        scene.style.setProperty("--hook-catch-dot-scale", String(0.75 + power * 0.85));
      });
    };

    const onIdle = () => {
      clearScenes(getScenes());
    };

    window.addEventListener("hook:pull", onPull);
    window.addEventListener("hook:idle", onIdle);

    return () => {
      window.removeEventListener("hook:pull", onPull);
      window.removeEventListener("hook:idle", onIdle);
      onIdle();
    };
  }, []);

  return null;
}
