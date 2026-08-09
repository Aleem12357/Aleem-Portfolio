import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects } from "@/data/portfolio";

const gradients = [
  "linear-gradient(135deg, oklch(0.62 0.24 350), oklch(0.82 0.12 340))",
  "linear-gradient(135deg, oklch(0.45 0.2 275), oklch(0.7 0.16 290))",
  "linear-gradient(135deg, oklch(0.55 0.16 200), oklch(0.78 0.11 190))",
  "linear-gradient(135deg, oklch(0.5 0.18 30), oklch(0.8 0.13 60))",
  "linear-gradient(135deg, oklch(0.48 0.16 150), oklch(0.76 0.13 160))",
];

export function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset['i']));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const p = projects[active] ?? projects[0]!;

  return (
    <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-10">
        {projects.map((proj, i) => (
          <div
            key={proj.slug}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`overflow-hidden rounded-3xl p-7 transition-all duration-500 ${
              active === i ? "opacity-100" : "opacity-60"
            }`}
            style={{ background: gradients[i % gradients.length] }}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="max-w-md text-2xl leading-snug text-primary-foreground">{proj.tagline}</h3>
              <ArrowUpRight className="mt-1 size-5 shrink-0 text-primary-foreground/80" />
            </div>
            <ProjectImages images={proj.images} alt={proj.title} />
            <div className="mt-6 rounded-2xl border border-primary-foreground/15 bg-background/85 p-5">
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                {proj.year} · {proj.stack[0]}
              </div>
              <div className="mt-3 font-display text-3xl">{proj.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{proj.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="md:sticky md:top-32 md:h-fit">
        <div key={p.slug} className="animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brand" />
            <h3 className="text-3xl">{p.title}</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
          <ul className="mt-5 space-y-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-muted-foreground">
                <Plus className="mt-0.5 size-3.5 shrink-0 text-brand" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
