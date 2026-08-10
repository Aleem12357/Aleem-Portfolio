import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  ExternalLink,
  Lightbulb,
  Zap,
  BookOpen,
} from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";
import { ProjectImages } from "@/components/site/ProjectImages";
import { TechIcon } from "@/components/site/TechIcon";
import projectsData from "@/assets/projects.json";
import { projects as catalogueProjects } from "@/data/portfolio";

const crystalGradients = [
  "linear-gradient(135deg, oklch(0.22 0.06 280), oklch(0.35 0.15 300) 40%, oklch(0.48 0.18 320) 80%)",
  "linear-gradient(135deg, oklch(0.20 0.04 220), oklch(0.32 0.12 240) 40%, oklch(0.50 0.16 260) 80%)",
  "linear-gradient(135deg, oklch(0.18 0.03 180), oklch(0.30 0.10 195) 40%, oklch(0.46 0.14 210) 80%)",
  "linear-gradient(135deg, oklch(0.22 0.05 340), oklch(0.36 0.14 355) 40%, oklch(0.50 0.18 10) 80%)",
  "linear-gradient(135deg, oklch(0.19 0.04 140), oklch(0.33 0.11 155) 40%, oklch(0.48 0.15 170) 80%)",
  "linear-gradient(135deg, oklch(0.21 0.06 260), oklch(0.38 0.16 280) 40%, oklch(0.52 0.20 295) 80%)",
];

export type ProjectData = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  techStack: string[];
  links: { github: string | null; live: string | null };
  stats: { label: string; value: string }[];
  whyIBuiltThis: string;
  howItWorks: string;
  keyDecisions: { title: string; detail: string }[];
  challenges: { title: string; detail: string }[];
  whatILearned: string;
};

const allProjects = projectsData as ProjectData[];

// Map projects.json slugs to portfolio.ts slugs for images
const slugImageMap: Record<string, string[]> = {};
for (const cp of catalogueProjects) {
  slugImageMap[cp.slug] = cp.images;
}
slugImageMap["vista-artisan-dreams"] = [
  "/projects/unitedestimates1.webp",
  "/projects/unitedestimates2.webp",
];
slugImageMap["ezi-website"] = ["/projects/ezi-1.webp", "/projects/ezi-2.webp"];
slugImageMap["password-manager"] = ["/projects/passop-1.webp", "/projects/passop-2.webp"];
slugImageMap["bmw-website"] = ["/projects/bmw1.webp", "/projects/bmw2.webp"];

function getImages(slug: string): string[] {
  return slugImageMap[slug] ?? ["/projects/digital-diary-1.webp", "/projects/digital-diary-2.webp"];
}

export const Route = createFileRoute("/work_/$slug")({
  head: ({ params }) => {
    const project = allProjects.find((p) => p.slug === params.slug);
    const title = project ? `${project.title} — Full-Stack Case Study by Muhammad Aleem` : "Project — Muhammad Aleem";
    const desc = project?.tagline ?? "A full-stack software project built by Muhammad Aleem.";
    const url = `https://aleem-portfolio.vercel.app/work/${params.slug}`;
    const keywords = project
      ? `${project.title}, ${project.techStack.join(", ")}, Muhammad Aleem Project, Full Stack Case Study`
      : "Muhammad Aleem, Full-Stack Project";

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ProjectDetail,
});

export function ProjectDetail() {
  const { slug } = Route.useParams();
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <PageShell>
        <Section>
          <div className="py-32 text-center">
            <h1 className="text-5xl font-display">Project not found</h1>
            <p className="mt-4 text-muted-foreground">
              That project doesn't exist in our showcase.
            </p>
            <Link
              to="/work"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:bg-accent"
            >
              <ArrowLeft className="size-4" /> Back to work
            </Link>
          </div>
        </Section>
      </PageShell>
    );
  }

  const images = getImages(project.slug);
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <PageShell>
      {/* Back nav */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-8">
        <Link
          to="/work"
          className="eyebrow inline-flex items-center gap-2 text-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-3.5" /> All projects
        </Link>
      </div>

      {/* Hero & Screenshots Combined Layout */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-6 pb-12">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          {/* Left: Images in gradient card */}
          <div
            className="overflow-hidden rounded-3xl border border-white/[0.06] p-7 shadow-2xl"
            style={{
              background: crystalGradients[currentIndex % crystalGradients.length],
              backdropFilter: "blur(12px)",
            }}
          >
            <ProjectImages images={images} alt={project.title} />
          </div>

          {/* Right: Text and Details */}
          <div className="flex flex-col animate-fade-in">
            <h1 className="text-4xl leading-[1.05] md:text-5xl font-display">{project.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{project.tagline}</p>

            {/* Tech stack with Logos */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-wider text-foreground shadow-sm"
                >
                  <TechIcon name={t} />
                  {t}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <Github className="size-4" /> Source Code
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-primary-foreground font-medium"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <ExternalLink className="size-4" /> Live Site <ArrowUpRight className="size-3" />
                </a>
              )}
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-3">
              {project.stats.map((s) => (
                <div key={s.label} className="panel px-4 py-4">
                  <div className="font-display text-2xl">{s.value}</div>
                  <div className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why I Built This */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[0.4fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Lightbulb className="size-5 text-brand" />
              <div className="eyebrow text-foreground">Why I built this</div>
            </div>
          </div>
          <div className="text-[0.95rem] leading-[1.75] text-muted-foreground">
            {project.whyIBuiltThis}
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[0.4fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Zap className="size-5 text-brand" />
              <div className="eyebrow text-foreground">How it works</div>
            </div>
          </div>
          <div className="text-[0.95rem] leading-[1.75] text-muted-foreground">
            {project.howItWorks}
          </div>
        </div>
      </Section>

      {/* Key Decisions */}
      <Section eyebrow="Key decisions" title="Design" italic="choices">
        <div className="space-y-4">
          {project.keyDecisions.map((kd) => (
            <article key={kd.title} className="panel p-6">
              <h3 className="text-xl font-display">{kd.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{kd.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Challenges */}
      <Section eyebrow="Challenges" title="Problems" italic="solved">
        <div className="space-y-4">
          {project.challenges.map((ch) => (
            <article key={ch.title} className="panel p-6">
              <h3 className="text-xl font-display">{ch.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{ch.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* What I Learned */}
      <Section>
        <div className="grid gap-10 md:grid-cols-[0.4fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <BookOpen className="size-5 text-brand" />
              <div className="eyebrow text-foreground">What I learned</div>
            </div>
          </div>
          <div className="text-[0.95rem] leading-[1.75] text-muted-foreground">
            {project.whatILearned}
          </div>
        </div>
      </Section>

      {/* Prev/Next navigation */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="flex items-center justify-between border-t border-border pt-8">
          {prevProject ? (
            <Link
              to="/work/$slug"
              params={{ slug: prevProject.slug }}
              className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <div>
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">Previous</div>
                <div className="mt-0.5 text-foreground font-display">{prevProject.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              to="/work/$slug"
              params={{ slug: nextProject.slug }}
              className="group flex items-center gap-3 text-right text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <div>
                <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em]">Next</div>
                <div className="mt-0.5 text-foreground font-display">{nextProject.title}</div>
              </div>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </PageShell>
  );
}
