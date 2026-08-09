import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";
import { ProjectImages } from "@/components/site/ProjectImages";
import { projects } from "@/data/portfolio";

const gradients = [
  "linear-gradient(135deg, oklch(0.62 0.24 350), oklch(0.82 0.12 340))",
  "linear-gradient(135deg, oklch(0.45 0.2 275), oklch(0.7 0.16 290))",
  "linear-gradient(135deg, oklch(0.55 0.16 200), oklch(0.78 0.11 190))",
  "linear-gradient(135deg, oklch(0.5 0.18 30), oklch(0.8 0.13 60))",
  "linear-gradient(135deg, oklch(0.48 0.16 150), oklch(0.76 0.13 160))",
];

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Projects by Muhammad Aleem" },
      {
        name: "description",
        content:
          "Projects by Muhammad Aleem: Digital Diary school portal, Veamkodrive, Bytely auth module, PassOP password manager and more.",
      },
      { property: "og:title", content: "Work — Projects by Muhammad Aleem" },
      {
        property: "og:description",
        content: "Full-stack projects across React, Next.js, Vue, Node, MongoDB and Supabase.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
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
        <span>{project.year}</span>
      </div>

      <h2 className="mt-2 text-2xl">{project.title}</h2>

      <div
        className="mt-4 overflow-hidden rounded-3xl p-6"
        style={{ background: gradients[index % gradients.length] }}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="max-w-sm text-sm leading-relaxed text-primary-foreground">{project.tagline}</p>
          <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-primary-foreground/80" />
        </div>
        <ProjectImages images={project.images} alt={project.title} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground"
          >
            {s}
          </span>
        ))}
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
