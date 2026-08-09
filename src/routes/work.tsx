import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";
import { projects } from "@/data/portfolio";

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
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <PageShell>
      <Section eyebrow="Portfolio" title="Curated" italic="work">
        <div className="space-y-3">
          {projects.map((p, i) => (
            <article key={p.slug} className="panel p-7 transition-colors hover:border-brand/50">
              <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-3xl">{p.title}</h2>
                    <p className="mt-1 text-sm text-foreground/80">{p.tagline}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
              </div>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>

              <ul className="mt-4 grid gap-2 md:grid-cols-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-2" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[0.65rem] text-muted-foreground"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
