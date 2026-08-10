import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects } from "@/data/portfolio";
import { ProjectImages } from "./ProjectImages";

const gradients = [
  "linear-gradient(150deg, oklch(0.32 0.13 300), oklch(0.55 0.22 335) 55%, oklch(0.74 0.15 20))",
  "linear-gradient(150deg, oklch(0.28 0.11 265), oklch(0.46 0.19 275) 55%, oklch(0.7 0.14 250))",
  "linear-gradient(150deg, oklch(0.27 0.08 210), oklch(0.48 0.13 205) 55%, oklch(0.72 0.13 180))",
  "linear-gradient(150deg, oklch(0.3 0.1 40), oklch(0.53 0.17 45) 55%, oklch(0.78 0.14 75))",
  "linear-gradient(150deg, oklch(0.26 0.08 165), oklch(0.45 0.14 160) 55%, oklch(0.72 0.14 140))",
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
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/80">
              {proj.description}
            </p>
            <ProjectImages images={proj.images} alt={proj.title} />

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
