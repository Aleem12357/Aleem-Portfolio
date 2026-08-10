import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Plus } from "lucide-react";
import { projects } from "@/data/portfolio";
import { ProjectImages } from "./ProjectImages";
import { TechIcon } from "./TechIcon";

const crystalGradients = [
  "linear-gradient(135deg, oklch(0.22 0.06 280), oklch(0.35 0.15 300) 40%, oklch(0.48 0.18 320) 80%)",
  "linear-gradient(135deg, oklch(0.20 0.04 220), oklch(0.32 0.12 240) 40%, oklch(0.50 0.16 260) 80%)",
  "linear-gradient(135deg, oklch(0.18 0.03 180), oklch(0.30 0.10 195) 40%, oklch(0.46 0.14 210) 80%)",
  "linear-gradient(135deg, oklch(0.22 0.05 340), oklch(0.36 0.14 355) 40%, oklch(0.50 0.18 10) 80%)",
  "linear-gradient(135deg, oklch(0.19 0.04 140), oklch(0.33 0.11 155) 40%, oklch(0.48 0.15 170) 80%)",
  "linear-gradient(135deg, oklch(0.21 0.06 260), oklch(0.38 0.16 280) 40%, oklch(0.52 0.20 295) 80%)",
];

export function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.3) {
            const index = Number((e.target as HTMLElement).dataset["i"]);
            setActive((prev) => (prev === index ? prev : index));
          }
        });
      },
      { rootMargin: "-20% 0px -20% 0px", threshold: 0.3 },
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const p = projects[active] ?? projects[0]!;

  return (
    <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-10">
        {projects.slice(0, 6).map((proj, i) => (
          <div
            key={proj.slug}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`group overflow-hidden rounded-3xl border border-white/[0.06] p-7 transition-opacity duration-300 ease-out ${
              active === i ? "opacity-100 ring-1 ring-brand/30" : "opacity-50"
            }`}
            style={{
              background: crystalGradients[i % crystalGradients.length],
            }}
          >
            <Link to="/work/$slug" params={{ slug: proj.slug }} className="block">
              <div className="flex items-start justify-between gap-4">
                <p className="max-w-md text-sm leading-relaxed text-white/90">
                  {proj.tagline}
                </p>
                <ArrowUpRight className="mt-1 size-5 shrink-0 text-white/70 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <ProjectImages images={proj.images} alt={proj.title} />
            </Link>
          </div>
        ))}
      </div>

      <div className="md:sticky md:top-32 md:h-fit">
        <div key={p.slug} className="transition-all duration-300 ease-out">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-brand" />
            <Link to="/work/$slug" params={{ slug: p.slug }} className="hover:underline">
              <h3 className="text-3xl font-display">{p.title}</h3>
            </Link>
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
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-foreground shadow-sm"
              >
                <TechIcon name={s} />
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
