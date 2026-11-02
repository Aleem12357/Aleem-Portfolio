import { lazy, Suspense, useRef, useState } from "react";
import aleemPic from "@/assets/Aleem.png";
import aleemLogo from "@/assets/aleem-logo.png";

const HeroOrb = lazy(() => import("@/components/three/HeroOrb"));

/**
 * 3D portrait card:
 * - Default (Hero): Interactive 3D Canvas medallion with orbiting rings and lighting (matching three-d-showcase-94).
 * - logo = true: Interactive slider card with 3D magic wand that reveals the portrait underneath the logo.
 */
export function Portrait3D({ logo = false }: { logo?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, active: false });
  const [sliderX, setSliderX] = useState(0); // 0 to 1

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 18, ry: px * 22, active: true });

    if (logo) {
      const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
      setSliderX(x);
    }
  }

  function onLeave() {
    setT({ rx: 0, ry: 0, active: false });
  }

  const currentSliderX = t.active ? sliderX : 0.5;

  // Render the slider card (for bottom section)
  if (logo) {
    return (
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative mx-auto aspect-square w-full max-w-[26rem] cursor-ew-resize select-none"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative h-full w-full transition-transform duration-300 ease-out will-change-transform"
          style={{
            transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.active ? 1.02 : 1})`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* glow plate */}
          <div
            className="absolute inset-[8%] rounded-[2.5rem] opacity-70 blur-2xl transition-all duration-300"
            style={{
              background: "var(--gradient-brand)",
              transform: "translateZ(-60px)",
              opacity: t.active ? 0.85 : 0.6,
            }}
          />

          {/* card frame */}
          <div
            className="absolute inset-[8%] overflow-hidden rounded-[2.5rem] border border-border bg-surface"
            style={{ transform: "translateZ(0px)", boxShadow: "var(--shadow-glow)" }}
          >
            {/* GRID BACKGROUND */}
            <div
              className="absolute inset-0 opacity-[0.25]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px)",
                backgroundSize: "38px 38px",
              }}
            />

            {/* LAYER 1: LOGO & PORTRAIT (Right side of slider) */}
            <div
              className="absolute inset-0 h-full w-full bg-surface"
              style={{
                clipPath: `inset(0 0 0 ${currentSliderX * 100}%)`,
                transition: t.active ? "none" : "clip-path 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              {/* Grid Background */}
              <div
                className="absolute inset-0 opacity-[0.25]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px)",
                  backgroundSize: "38px 38px",
                }}
              />
              {/* Unblurred Portrait */}
              <img
                src={aleemPic}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  maskImage: "radial-gradient(78% 78% at 50% 42%, #000 60%, transparent 100%)",
                  opacity: 0.35,
                  transition: t.active ? "none" : "opacity 0.5s ease",
                }}
              />
              {/* Large Centered Logo */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img
                  src={aleemLogo}
                  alt="Muhammad Aleem logo"
                  className="h-48 w-48 object-contain drop-shadow-[0_12px_36px_rgba(34,211,238,0.35)] transition-transform duration-300"
                  style={{
                    transform: `translateZ(30px) scale(${t.active ? 1.04 : 1})`,
                  }}
                />
              </div>
            </div>

            {/* LAYER 2: CLEAR PORTRAIT (Left side of slider) */}
            <div
              className="absolute inset-0 h-full w-full bg-surface"
              style={{
                clipPath: `inset(0 ${100 - currentSliderX * 100}% 0 0)`,
                transition: t.active ? "none" : "clip-path 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              {/* Grid Background */}
              <div
                className="absolute inset-0 opacity-[0.25]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px)",
                  backgroundSize: "38px 38px",
                }}
              />
              {/* Portrait */}
              <img
                src={aleemPic}
                alt="Portrait of Muhammad Aleem"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                  maskImage: "radial-gradient(78% 78% at 50% 42%, #000 60%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{ background: "linear-gradient(to top, var(--surface), transparent)" }}
              />
            </div>
          </div>

          {/* 3D MAGIC WAND SLIDER MARKER */}
          <div
            className="pointer-events-none absolute z-40 w-3.5 origin-center select-none"
            style={{
              height: "112%",
              top: "-6%",
              left: `${currentSliderX * 100}%`,
              transform: `translateX(-50%) translateZ(45px) rotateY(${t.ry * 0.15}deg)`,
              opacity: 1,
              transition: t.active
                ? "none"
                : "left 0.5s cubic-bezier(0.25, 1, 0.5, 1), transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {/* Metallic handle rod */}
            <div
              className="absolute inset-0 rounded-full border border-white/10 shadow-lg"
              style={{
                background: "linear-gradient(to right, #09090b, #27272a 35%, #09090b 70%, #020202)",
              }}
            />
            {/* White glowing capsule tip */}
            <div
              className="absolute top-0 left-0 right-0 h-[24%] rounded-t-full bg-white shadow-[0_0_15px_3px_#ffffff,0_0_30px_6px_rgba(34,211,238,0.6)]"
              style={{
                background: "linear-gradient(to right, #ffffff, #e4e4e7)",
              }}
            />
            {/* Subtle highlight ring */}
            <div className="absolute top-[24%] left-0 right-0 h-0.5 bg-brand/50 shadow-[0_0_8px_var(--brand)]" />
          </div>

          {/* top right logo */}
          <div
            className="absolute top-5 right-5 z-30"
            style={{ transform: "translate3d(0, 0, 90px)" }}
          >
            <img
              src={aleemLogo}
              alt="Muhammad Aleem logo"
              className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-[0_4px_16px_rgba(34,211,238,0.4)]"
            />
          </div>

          {/* bottom left name capsule badge */}
          <div
            className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-black/75 px-4 py-2.5 backdrop-blur-md shadow-2xl z-30"
            style={{ transform: "translate3d(0, 0, 90px)" }}
          >
            <div className="font-display text-xl leading-none text-white">Muhammad Aleem</div>
            <div className="mt-1 font-mono text-[0.55rem] tracking-[0.25em] text-gray-400 uppercase">
              SOFTWARE ENGINEER
            </div>
          </div>

          {/* floating chips */}
          <div
            className="float-slow absolute right-4 top-[22%] rounded-xl border border-border bg-popover/80 px-3 py-1.5 font-mono text-[0.65rem] text-muted-foreground backdrop-blur-xl z-30"
            style={{ transform: "translate3d(0,0,120px)" }}
          >
            React · TS · Node
          </div>
          <div
            className="float-slow absolute left-0 top-[62%] rounded-xl border border-border bg-popover/80 px-3 py-2 font-mono text-[0.65rem] text-muted-foreground backdrop-blur-xl z-30"
            style={{ transform: "translate3d(0,0,100px)", animationDelay: "1.4s" }}
          >
            AI Automation
          </div>
        </div>
      </div>
    );
  }

  // Render 3D Hero Orb canvas (for Hero section)
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[28rem]">
      {/* Background ambient glow */}
      <div
        aria-hidden
        className="absolute inset-8 rounded-full bg-primary/25 blur-3xl pointer-events-none"
      />

      <Suspense
        fallback={
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="relative size-44 md:size-52 rounded-full border-4 border-[#22d3ee] shadow-[0_0_40px_rgba(34,211,238,0.5)] overflow-hidden bg-[#0b1a29]">
              <img
                src={aleemPic}
                alt="Portrait of Muhammad Aleem"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        }
      >
        <div className="absolute inset-0">
          <HeroOrb />
        </div>
      </Suspense>

      {/* Top left name capsule badge (for hero section) */}
      <div className="pointer-events-auto float-slow absolute top-4 left-4 rounded-2xl border border-border/80 bg-popover/85 px-4.5 py-2.5 backdrop-blur-xl shadow-lg transition-all duration-300 hover:border-brand/60 hover:shadow-[0_4px_20px_rgba(34,211,238,0.2)] z-30 group cursor-default">
        <div className="font-display text-xl leading-none text-foreground transition-colors group-hover:text-[#22d3ee]">
          Muhammad Aleem
        </div>
        <div className="mt-1 font-mono text-[0.55rem] tracking-[0.25em] text-muted-foreground uppercase transition-colors group-hover:text-foreground">
          SOFTWARE ENGINEER
        </div>
      </div>

      {/* Top right logo */}
      <div className="pointer-events-none absolute top-4 right-4 z-30">
        <img
          src={aleemLogo}
          alt="Muhammad Aleem logo"
          className="h-10 w-10 md:h-12 md:w-12 object-contain drop-shadow-[0_4px_16px_rgba(34,211,238,0.4)]"
        />
      </div>

      {/* Floating chips */}
      <div className="pointer-events-none float-slow absolute right-3 top-[22%] rounded-xl border border-border bg-popover/80 px-3 py-1.5 font-mono text-[0.65rem] text-muted-foreground backdrop-blur-xl z-30">
        React · TS · Node
      </div>
      <div
        className="pointer-events-none float-slow absolute left-0 top-[62%] rounded-xl border border-border bg-popover/80 px-3 py-2 font-mono text-[0.65rem] text-muted-foreground backdrop-blur-xl z-30"
        style={{ animationDelay: "1.4s" }}
      >
        AI Automation
      </div>
    </div>
  );
}
