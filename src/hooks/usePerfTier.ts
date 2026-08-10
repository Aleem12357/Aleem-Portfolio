import { useEffect, useState } from "react";

export type PerfTier = "low" | "mid" | "high";

export type PerfSettings = {
  tier: PerfTier;
  /** device pixel ratio clamp for the WebGL canvas */
  dpr: [number, number];
  antialias: boolean;
  /** geometry / particle detail multiplier */
  detail: number;
  /** how strongly the camera reacts to pointer movement */
  parallax: number;
  /** enable secondary flourishes (reflections, extra lights, dust) */
  extras: boolean;
  reducedMotion: boolean;
};

const PRESETS: Record<PerfTier, Omit<PerfSettings, "tier" | "reducedMotion">> = {
  low: { dpr: [1, 1.25], antialias: false, detail: 0.35, parallax: 0.25, extras: false },
  mid: { dpr: [1, 1.6], antialias: true, detail: 0.7, parallax: 0.6, extras: true },
  high: { dpr: [1, 2], antialias: true, detail: 1, parallax: 1, extras: true },
};

function detect(): { tier: PerfTier; reducedMotion: boolean } {
  if (typeof window === "undefined") return { tier: "mid", reducedMotion: false };
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;

  if (reducedMotion || ((coarse || narrow) && (cores <= 4 || mem <= 4))) return { tier: "low", reducedMotion };
  if (coarse || narrow || cores <= 6) return { tier: "mid", reducedMotion };
  return { tier: "high", reducedMotion };
}

/** Detects device capability once on the client and returns level-of-detail settings. */
export function usePerfTier(): PerfSettings {
  const [state, setState] = useState<{ tier: PerfTier; reducedMotion: boolean }>({
    tier: "mid",
    reducedMotion: false,
  });

  useEffect(() => {
    setState(detect());
    const onResize = () => setState(detect());
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return { ...PRESETS[state.tier], tier: state.tier, reducedMotion: state.reducedMotion };
}
