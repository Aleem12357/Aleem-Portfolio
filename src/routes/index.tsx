import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";
import { Portrait3D } from "@/components/site/Portrait3D";
import { BuildTogether } from "@/components/site/BuildTogether";
import { ProjectShowcase } from "@/components/site/ProjectShowcase";
import { TechStackMarquee } from "@/components/site/TechStackMarquee";
import { Globe } from "@/components/site/Globe";
import { experience, profile, services, stats } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Aleem — Full-Stack Developer in Lahore" },
      {
        name: "description",
        content:
          "Portfolio of Muhammad Aleem, full-stack developer building React, Next.js and Node products. Projects, experience, certificates and contact.",
      },
      { property: "og:title", content: "Muhammad Aleem — Full-Stack Developer" },
      {
        property: "og:description",
        content: "Full-stack developer from Lahore building fast, typed web products with React and Node.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-8 pt-8 md:grid-cols-2 md:pt-16">
        <div>
          <div className="eyebrow">Software Engineer · Lahore, PK</div>
          <h1 className="mt-4 text-5xl leading-[1.05] md:text-6xl">
            Full-Stack Developer and
            <br />a little bit of <span className="ital-grad">everything</span>
          </h1>
          <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-muted-foreground">
            {profile.blurb}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-primary-foreground"
              style={{ background: "var(--gradient-brand)" }}
            >
              See my work <ArrowUpRight className="size-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-foreground transition-colors hover:bg-accent"
            >
              Get in touch
            </Link>
          </div>
          <div className="mt-8 flex gap-3">
            {[
              { href: profile.github, Icon: Github, label: "GitHub" },
              { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-full border border-border p-2.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <Portrait3D />
      </section>

      {/* Stats */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-3 px-4 pt-8 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="panel px-5 py-6">
            <div className="font-display text-4xl">{s.value}</div>
            <div className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* Let's build together */}
      <Section>
        <BuildTogether />
      </Section>

      {/* Services */}
      <Section eyebrow="Let's build together" title="Clear communication," italic="no surprises">
        <div className="grid gap-3 md:grid-cols-3">
          {services.map((s) => (
            <article key={s.title} className="panel p-6">
              <div className="eyebrow">{s.eyebrow}</div>
              <h3 className="mt-3 text-2xl leading-snug">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Tech stack + globe */}
      <Section className="grid gap-3 md:grid-cols-2">
        <TechStackMarquee />
        <div className="panel overflow-hidden p-6">
          <div className="eyebrow">Flexible with timezones</div>
          <h3 className="mt-2 text-2xl">Based in Lahore, available globally</h3>
          <Globe />
        </div>
      </Section>


      {/* Featured work */}
      <Section eyebrow="Selected work" title="Curated" italic="work">
        <ProjectShowcase />
        <div className="mt-8 text-center">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm transition-colors hover:bg-accent"
          >
            See all work <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      {/* Experience preview */}
      <Section eyebrow="Work experience" title="Where I've" italic="been">
        <div className="panel divide-y divide-border">
          {experience.slice(0, 4).map((e) => (
            <div key={e.role + e.company} className="flex flex-col gap-1 p-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-lg">{e.role}</div>
                <div className="text-sm text-muted-foreground">{e.company} · {e.location}</div>
              </div>
              <div className="font-mono text-xs text-muted-foreground">{e.period}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div
          className="relative overflow-hidden rounded-3xl border border-border px-6 py-16 text-center"
          style={{ background: "var(--gradient-brand)" }}
        >
          <h2 className="text-4xl text-primary-foreground md:text-5xl">
            From concept to creation — <span className="italic">let's make it happen</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-primary-foreground/85">
            I'm available for full-time roles and freelance projects.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm text-foreground"
          >
            Book a chat <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Section>
    </PageShell>
  );
}
