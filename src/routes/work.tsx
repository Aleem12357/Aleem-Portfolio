import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ArrowUpRight, ExternalLink, Globe, Cpu, type LucideIcon } from "lucide-react";
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

interface OptionCardProps {
  title: string;
  description: string;
  count: number;
  icon: LucideIcon;
  selected: boolean;
  onClick: () => void;
  gradient: string;
  glowColor: string;
}

function ThreeDSelectCard({
  title,
  description,
  count,
  icon: Icon,
  selected,
  onClick,
  gradient,
  glowColor,
}: OptionCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ rx: 0, ry: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setCoords({
      rx: -py * 16,
      ry: px * 16,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setCoords({ rx: 0, ry: 0, active: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative cursor-pointer select-none transition-all duration-300 w-full ${
        selected ? "scale-[1.02] z-10" : "scale-[0.98] opacity-60 hover:opacity-90"
      }`}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative rounded-3xl p-6 h-48 border transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden"
        style={{
          transform: `rotateX(${coords.rx}deg) rotateY(${coords.ry}deg)`,
          transformStyle: "preserve-3d",
          background: selected ? gradient : "var(--surface)",
          borderColor: selected ? "var(--brand)" : "var(--border)",
          boxShadow: selected ? `0 20px 40px -15px ${glowColor}` : "var(--shadow-soft)",
        }}
      >
        {/* Glow effect on mouse move */}
        {coords.active && (
          <div
            className="absolute -inset-10 opacity-30 blur-2xl pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${glowColor}, transparent 60%)`,
              transform: `translateZ(20px)`,
            }}
          />
        )}

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Top bar */}
        <div className="flex justify-between items-start" style={{ transform: "translateZ(30px)" }}>
          <div className="p-2.5 rounded-2xl bg-black/40 border border-white/10 text-white">
            <Icon className="size-6 text-[#22d3ee]" />
          </div>
          <span className="font-mono text-xs uppercase tracking-wider bg-black/35 px-3 py-1 rounded-full border border-white/5 text-white/80">
            {count} {count === 1 ? "Project" : "Projects"}
          </span>
        </div>

        {/* Text */}
        <div className="mt-4" style={{ transform: "translateZ(40px)" }}>
          <h3 className="text-xl font-display text-white">{title}</h3>
          <p className="text-xs text-white/70 mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

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
}export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work & Case Studies — Muhammad Aleem" },
      {
        name: "description",
        content:
          "Explore full-stack web applications, AI video automations, and client projects by Muhammad Aleem, including The Dental & Skin Clinic, TikTok and YouTube content automation, and Digital Diary.",
      },
      {
        name: "keywords",
        content:
          "Muhammad Aleem Projects, AI Automation Workflows, Full-Stack Case Studies, React Projects, Next.js Apps, TikTok Automation, YouTube API, Zweidevs",
      },
      { property: "og:title", content: "Work & Case Studies — Muhammad Aleem" },
      {
        property: "og:description",
        content: "Full-stack websites and AI automation workflows across React, Next.js, Python, n8n, Node, MongoDB, and Supabase.",
      },
      { property: "og:url", content: "https://aleem-portfolio.vercel.app/work" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://aleem-portfolio.vercel.app/work" }],
  }),
  component: Work,
});

function Work() {
  const [category, setCategory] = useState<"websites" | "automations">("websites");

  const isAutomation = (p: (typeof projects)[number]) =>
    p.category === "AI Automation" ||
    p.category === "Automation" ||
    p.category === "CLI Tool";

  const filteredProjects = projects.filter((p) => {
    const isAuto = isAutomation(p);
    return category === "automations" ? isAuto : !isAuto;
  });

  const left = filteredProjects.filter((_, i) => i % 2 === 0);
  const right = filteredProjects.filter((_, i) => i % 2 === 1);

  const websiteCount = projects.filter((p) => !isAutomation(p)).length;
  const automationCount = projects.filter((p) => isAutomation(p)).length;

  return (
    <PageShell>
      <Section eyebrow="Case studies" title="Curated" italic="work">
        {/* 3D Option Selector */}
        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto mb-16 px-4">
          <ThreeDSelectCard
            title="Websites & Apps"
            description="Full-stack web applications, SaaS platforms, and responsive client websites."
            count={websiteCount}
            icon={Globe}
            selected={category === "websites"}
            onClick={() => setCategory("websites")}
            gradient="linear-gradient(135deg, oklch(0.22 0.06 280), oklch(0.35 0.15 300) 40%, oklch(0.48 0.18 320) 80%)"
            glowColor="oklch(0.48 0.18 320 / 30%)"
          />
          <ThreeDSelectCard
            title="AI & Automations"
            description="Intelligent workflows, automated content systems, and backend scripts."
            count={automationCount}
            icon={Cpu}
            selected={category === "automations"}
            onClick={() => setCategory("automations")}
            gradient="linear-gradient(135deg, oklch(0.20 0.04 220), oklch(0.32 0.12 240) 40%, oklch(0.50 0.16 260) 80%)"
            glowColor="oklch(0.50 0.16 260 / 30%)"
          />
        </div>

        <div key={category} className="grid gap-10 md:grid-cols-2 animate-fade-in">
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
