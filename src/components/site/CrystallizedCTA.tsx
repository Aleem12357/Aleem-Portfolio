import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function CrystallizedCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 50, py: 50, active: false });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = (x / r.width) * 100;
    const py = (y / r.height) * 100;
    const rx = -(py / 100 - 0.5) * 12; // tilt angle X
    const ry = (px / 100 - 0.5) * 12; // tilt angle Y
    setTilt({ rx, ry, px, py, active: true });
  }

  function onLeave() {
    setTilt({ rx: 0, ry: 0, px: 50, py: 50, active: false });
  }

  return (
    <div className="relative w-full py-12" style={{ perspective: "1000px" }}>
      {/* 3D background glowing blobs */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 -z-10 h-64 w-64 rounded-full bg-brand-2/20 blur-[100px] transition-transform duration-500"
        style={{
          transform: `translate3d(${tilt.ry * 2}px, ${-tilt.rx * 2}px, -40px)`,
        }}
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-64 w-64 rounded-full bg-brand/20 blur-[100px] transition-transform duration-500"
        style={{
          transform: `translate3d(${-tilt.ry * 2}px, ${tilt.rx * 2}px, -40px)`,
        }}
      />

      {/* Floating Crystal Shard 1 (Top Left) */}
      <div
        className="float-slow pointer-events-none absolute -left-4 top-4 z-10 hidden h-14 w-12 border border-white/20 bg-white/5 backdrop-blur-[6px] md:block"
        style={{
          clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          transform: `translate3d(${tilt.ry * 0.8}px, ${-tilt.rx * 0.8}px, 60px) rotate(15deg)`,
          boxShadow: "0 8px 32px 0 rgba(139, 92, 246, 0.15)",
        }}
      />

      {/* Floating Crystal Shard 2 (Bottom Right) */}
      <div
        className="float-slow pointer-events-none absolute -right-6 bottom-4 z-10 hidden h-16 w-12 border border-white/20 bg-white/5 backdrop-blur-[6px] md:block"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          transform: `translate3d(${-tilt.ry * 1}px, ${tilt.rx * 1}px, 80px) rotate(-25deg)`,
          boxShadow: "0 8px 32px 0 rgba(139, 92, 246, 0.15)",
          animationDelay: "2.5s",
        }}
      />

      {/* Main card */}
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.02] px-6 py-16 text-center shadow-[0_30px_70px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-300 ease-out"
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.active ? 1.01 : 1})`,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Crystallized light refraction glare overlay */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.px}% ${tilt.py}%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`,
            opacity: tilt.active ? 1 : 0.4,
          }}
        />

        {/* Shimmer line */}
        <div
          className="pointer-events-none absolute inset-y-0 -left-[100%] w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
          style={{
            animation: tilt.active ? "none" : "shimmer 8s infinite",
          }}
        />

        {/* Crystalline sparkles background decoration */}
        <div className="absolute top-6 left-12 opacity-20">
          <Sparkles className="size-5 text-brand" />
        </div>
        <div className="absolute bottom-6 right-12 opacity-20">
          <Sparkles className="size-5 text-brand-2" />
        </div>

        {/* Content with 3D Parallax */}
        <div style={{ transform: "translateZ(35px)" }} className="flex flex-col items-center">
          <h2 className="text-4xl text-foreground font-display tracking-tight leading-[1.1] md:text-5xl drop-shadow-[0_2px_15px_rgba(255,255,255,0.05)]">
            Elevating digital experiences —{" "}
            <span className="ital-grad block mt-1 tracking-wide font-normal">
              with crystallized 3D design
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground/90">
            I'm available for full-time roles and freelance projects. Let's sculpt your ideas into
            pixel-perfect, scalable digital realities.
          </p>

          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/10 px-7 py-3.5 text-sm font-medium text-foreground backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-background hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)]"
          >
            Book a chat
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { left: -100%; }
          30% { left: 150%; }
          100% { left: 150%; }
        }
      `}</style>
    </div>
  );
}
