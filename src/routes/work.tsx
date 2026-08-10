import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";
import { ProjectImages } from "@/components/site/ProjectImages";
import { TechIcon } from "@/components/site/TechIcon";
import { projects } from "@/data/portfolio";

const crystalGradients = [
  "linear-gradient(135deg, oklch(0.22 0.06 280), oklch(0.35 0.15 300) 40%, oklch(0.48 0.18 320) 80%)",
  "linear-gradient(135deg, oklch(0.20 0.04 220), oklch(0.32 0.12 240) 40%, oklch(0.50 0.16 260) 80%)",
  "linear-gradient(135deg, oklch(0.18 0.03 180), oklch(0.30 0.10 195) 40%, oklch(0.46 0.14 210) 80%)",
  "linear-gradient(135deg, oklch(0.22 0.05 340), oklch(0.36 0.14 355) 40%, oklch(0.50 0.18 10) 80%)",
  "linear-gradient(135deg, oklch(0.19 0.04 140), oklch(0.33 0.11 155) 40%, oklch(0.48 0.15 170) 80%)",
  "linear-gradient(135deg, oklch(0.21 0.06 260), oklch(0.38 0.16 280) 40%, oklch(0.52 0.20 295) 80%)",
];

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work & Case Studies — Muhammad Aleem" },
      {
        name: "description",
        content:
          "Explore full-stack web applications and client projects by Muhammad Aleem, including Digital Diary AI portal, Veamkodrive, Unitrix, and PassOP.",
      },
      {
        name: "keywords",
        content:
          "Muhammad Aleem Projects, Full-Stack Case Studies, React Projects, Next.js Apps, Vue Authentication, Supabase Client Projects",
      },
      { property: "og:title", content: "Work & Case Studies — Muhammad Aleem" },
      {
        property: "og:description",
        content: "Full-stack projects across React, Next.js, Vue, Node, MongoDB and Supabase.",
      },
      { property: "og:url", content: "https://aleem-portfolio.vercel.app/work" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://aleem-portfolio.vercel.app/work" }],
  }),
  component: Work,
});

function Card({ project, index }: { project: (typeof projects)[number]; index: number }) {
  return (
    <article className="border-t border-border pt-5">
      <div className="flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
        <span className="flex items-center gap-3">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span className="rounded bg-surface-2 px-2 py-0.5">{project.category}</span>
        </span>
        <span className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded bg-brand/10 px-2 py-0.5 text-brand transition-colors hover:bg-brand/20"
            >
              Live <ExternalLink className="size-2.5" />
            </a>
          )}
          <span>{project.year}</span>
        </span>
      </div>

      <Link to="/work/$slug" params={{ slug: project.slug }} className="group block">
        <h2 className="mt-2 text-2xl transition-colors group-hover:text-brand">{project.title}</h2>

        <div
          className="mt-4 overflow-hidden rounded-3xl border border-white/[0.08] p-6 transition-all duration-300 transform-gpu group-hover:border-white/20 group-hover:shadow-[0_0_40px_rgba(45,212,191,0.15)]"
          style={{
            background: crystalGradients[index % crystalGradients.length],
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="max-w-sm text-sm leading-relaxed text-white/90">
              {project.tagline}
            </p>
            <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-white/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
          <ProjectImages images={project.images} alt={project.title} />
        </div>
      </Link>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-foreground shadow-sm"
            >
              <TechIcon name={s} />
              {s}
            </span>
          ))}
        </div>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 font-mono text-xs text-brand transition-colors hover:bg-brand/20"
          >
            Live Site <ExternalLink className="size-3" />
          </a>
        )}
      </div>
    </article>
  );
}

function Work() {
  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  return (
    <PageShell>
      <Section eyebrow="Case studies" title="Curated" italic="work">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-12">
            {left.map((p, i) => (
              <Card key={p.slug} project={p} index={i * 2} />
            ))}
          </div>
          <div className="space-y-12 md:pt-24">
            {right.map((p, i) => (
              <Card key={p.slug} project={p} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
