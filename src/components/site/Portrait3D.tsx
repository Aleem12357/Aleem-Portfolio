import { useRef, useState } from "react";
import aleem from "@/assets/aleem.png.asset.json";
import logoAsset from "@/assets/aleem-logo.png.asset.json";

/**
 * 3D portrait card: tilts toward the cursor with layered parallax depth,
 * orbiting rings and the name engraved on the plate.
 */
export function Portrait3D({ logo = false }: { logo?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, active: false });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ rx: -py * 18, ry: px * 22, active: true });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setT({ rx: 0, ry: 0, active: false })}
      className={`relative mx-auto aspect-square w-full max-w-[26rem] ${logo ? "mt-16" : ""}`}
      style={{ perspective: "1200px" }}
    >
      {logo && (
        <div className="pointer-events-none absolute inset-x-0 -top-12 z-20 flex justify-center">
          <div className="relative h-24 w-24">
            <img
              src={logoAsset.url}
              alt=""
              aria-hidden
              className={`absolute inset-0 h-24 w-24 object-contain drop-shadow-[0_10px_30px_rgba(60,110,255,0.45)] transition-all duration-500 ease-out ${
                t.active ? "-translate-x-16 -rotate-[22deg] opacity-90" : "translate-x-0 rotate-0 opacity-0"
              }`}
            />
            <img
              src={logoAsset.url}
              alt=""
              aria-hidden
              className={`absolute inset-0 h-24 w-24 object-contain drop-shadow-[0_10px_30px_rgba(60,110,255,0.45)] transition-all duration-500 ease-out ${
                t.active ? "translate-x-16 rotate-[22deg] opacity-90" : "translate-x-0 rotate-0 opacity-0"
              }`}
            />
            <img
              src={logoAsset.url}
              alt="Muhammad Aleem logo"
              className={`absolute inset-0 h-24 w-24 object-contain drop-shadow-[0_14px_36px_rgba(60,110,255,0.55)] transition-transform duration-500 ease-out ${
                t.active ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        </div>
      )}

      {/* orbiting rings */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ transform: "rotateX(70deg) rotateZ(20deg)", transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-[6%] rounded-full border border-brand/40" />
        <div className="absolute inset-[16%] rounded-full border border-brand-2/40" />
      </div>


      <div
        className="relative h-full w-full transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) scale(${t.active ? 1.02 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* glow plate */}
        <div
          className="absolute inset-[8%] rounded-[2.5rem] opacity-70 blur-2xl"
          style={{ background: "var(--gradient-brand)", transform: "translateZ(-60px)" }}
        />

        {/* card */}
        <div
          className="absolute inset-[8%] overflow-hidden rounded-[2.5rem] border border-border bg-surface-2"
          style={{ transform: "translateZ(0px)", boxShadow: "var(--shadow-glow)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(to right, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 8%, transparent) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
            }}
          />
          <img
            src={aleem.url}
            alt="Portrait of Muhammad Aleem"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ maskImage: "radial-gradient(78% 78% at 50% 42%, #000 60%, transparent 100%)" }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{ background: "linear-gradient(to top, var(--surface), transparent)" }}
          />
        </div>

        {/* floating name plate */}
        <div
          className="absolute bottom-[6%] left-1/2 -translate-x-1/2 rounded-2xl border border-border bg-popover/80 px-5 py-3 text-center backdrop-blur-xl"
          style={{ transform: "translate3d(-50%, 0, 90px)", boxShadow: "var(--shadow-soft)" }}
        >
          <div className="font-display text-2xl leading-none">Muhammad Aleem</div>
          <div className="mt-1 font-mono text-[0.6rem] tracking-[0.24em] text-muted-foreground">
            SOFTWARE ENGINEER
          </div>
        </div>

        {/* floating chips */}
        <div
          className="float-slow absolute right-0 top-[12%] rounded-xl border border-border bg-popover/80 px-3 py-2 font-mono text-[0.65rem] text-muted-foreground backdrop-blur-xl"
          style={{ transform: "translate3d(0,0,120px)" }}
        >
          React · TS · Node
        </div>
        <div
          className="float-slow absolute left-0 top-[62%] rounded-xl border border-border bg-popover/80 px-3 py-2 font-mono text-[0.65rem] text-muted-foreground backdrop-blur-xl"
          style={{ transform: "translate3d(0,0,100px)", animationDelay: "1.4s" }}
        >
          CGPA 3.95
        </div>
      </div>
    </div>
  );
}
