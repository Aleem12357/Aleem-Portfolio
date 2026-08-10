import { useEffect, useState } from "react";
import { Gauge, Rocket, ShieldCheck, Sparkles, Wallet } from "lucide-react";

const perks = [
  { Icon: Gauge, title: "Loads Instantly", body: "Fast loads, happy users, better rankings." },
  { Icon: Rocket, title: "Scales With You", body: "Built to handle your next 10x of traffic." },
  {
    Icon: ShieldCheck,
    title: "Code You Keep",
    body: "Typed, tested and documented — yours forever.",
  },
  { Icon: Wallet, title: "Worth Every Dollar", body: "Senior quality, no agency markup." },
  { Icon: Sparkles, title: "Pixel Perfect", body: "Design handed over exactly as intended." },
];

export function WhatYouGet() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2200);
    return () => clearInterval(id);
  }, []);

  const visible = [0, 1, 2].map((i) => perks[(tick + i) % perks.length]!);

  return (
    <div className="panel relative overflow-hidden p-6">
      <div className="eyebrow">What you get</div>
      <h3 className="mt-2 text-2xl">Clean code, pixel-perfect UI, deployed &amp; scaling</h3>

      <div className="relative mt-8 h-56">
        {/* floating cards */}
        <div className="absolute inset-x-6 top-0 space-y-2">
          {visible.map((p, i) => (
            <div
              key={`${p.title}-${tick}-${i}`}
              className="animate-fade-in rounded-xl border border-border bg-popover/80 px-3 py-2 backdrop-blur-md"
              style={{
                animationDelay: `${i * 90}ms`,
                opacity: 1 - i * 0.22,
                transform: `scale(${1 - i * 0.05})`,
              }}
            >
              <div className="flex items-center gap-2">
                <p.Icon className="size-4 text-brand" />
                <div>
                  <div className="text-xs text-foreground">{p.title}</div>
                  <div className="text-[0.65rem] text-muted-foreground">{p.body}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* open box */}
        <div className="absolute inset-x-8 bottom-0 h-24">
          <div className="absolute inset-x-0 bottom-0 h-16 rounded-b-xl bg-surface-2 [clip-path:polygon(8%_0,92%_0,100%_100%,0_100%)]" />
          <div className="absolute -left-2 bottom-14 h-3 w-1/2 origin-bottom-right -rotate-12 rounded bg-secondary" />
          <div className="absolute -right-2 bottom-14 h-3 w-1/2 origin-bottom-left rotate-12 rounded bg-secondary" />
        </div>
      </div>
    </div>
  );
}
