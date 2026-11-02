import { useEffect, useState } from "react";
import aleemLogo from "@/assets/aleem-logo.png";
import aleemPic from "@/assets/Aleempic.png";

export function SiteLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Preload key images in background
    const imagesToPreload = [aleemLogo, aleemPic];
    let loadedCount = 0;

    const timer = setTimeout(() => {
      // Minimum display time of 650ms for smooth experience
      setFadeOut(true);
      setTimeout(() => setLoading(false), 600);
    }, 750);

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imagesToPreload.length) {
          // Preloading complete
        }
      };
    });

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070e17] transition-opacity duration-500 ease-out ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute size-72 rounded-full bg-[#22d3ee]/20 blur-3xl animate-pulse" />

      <div className="relative flex flex-col items-center gap-6 z-10">
        {/* Logo Container with Orbit Ring */}
        <div className="relative flex size-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#22d3ee]/40 animate-spin [animation-duration:8s]" />
          <div className="absolute inset-2 rounded-full border border-[#22d3ee]/20" />
          <img
            src={aleemLogo}
            alt="Muhammad Aleem Logo"
            className="size-16 object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] animate-pulse"
          />
        </div>

        {/* Text and progress indicator */}
        <div className="text-center">
          <div className="font-display text-xl tracking-wide text-white">Muhammad Aleem</div>
          <div className="mt-1 font-mono text-[0.65rem] tracking-[0.25em] text-[#22d3ee] uppercase">
            Loading Experience...
          </div>
        </div>

        {/* Minimal progress bar */}
        <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full bg-gradient-to-r from-[#0891b2] via-[#22d3ee] to-[#fbbf24] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
