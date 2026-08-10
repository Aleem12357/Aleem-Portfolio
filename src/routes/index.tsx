import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";
import { Portrait3D } from "@/components/site/Portrait3D";
import { BuildTogether } from "@/components/site/BuildTogether";
import { ProjectShowcase } from "@/components/site/ProjectShowcase";
import { TechStackMarquee } from "@/components/site/TechStackMarquee";
import { Globe } from "@/components/site/Globe";
import { WhatYouGet } from "@/components/site/WhatYouGet";
import { UsesMarquee } from "@/components/site/UsesMarquee";
import { Testimonials } from "@/components/site/Testimonials";
import { CrystallizedCTA } from "@/components/site/CrystallizedCTA";
import { experience, profile, stats } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Muhammad Aleem — Full-Stack Developer & AI Automation Specialist" },
      {
        name: "description",
        content:
          "Official portfolio of Muhammad Aleem. Full-Stack Developer & AI Specialist building React, Next.js, Node.js, and Supabase web applications.",
      },
      {
        name: "keywords",
        content:
          "Muhammad Aleem, Software Engineer Islamabad, Full-Stack Developer, React Developer, Next.js Portfolio, Node.js, AI Automation",
      },
      { property: "og:title", content: "Muhammad Aleem — Full-Stack Developer & AI Specialist" },
      {
        property: "og:description",
        content:
          "Full-stack developer from Islamabad building fast, typed web products with React, Next.js, Node, and AI integration.",
      },
      { property: "og:url", content: "https://aleem-portfolio.vercel.app/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://aleem-portfolio.vercel.app/" },
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
          <div className="eyebrow">Software Engineer · Islamabad, PK</div>
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

      {/* Bento: build together, tech stack, what you get, globe, uses */}
      <Section className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <BuildTogether />
          <TechStackMarquee />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <WhatYouGet />
          <div className="panel overflow-hidden p-6">
            <div className="eyebrow">Flexible with timezones</div>
            <h3 className="mt-2 text-2xl">Based in Islamabad, available globally</h3>
            <Globe />
          </div>
          <UsesMarquee />
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

      {/* Know about me */}
      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <div className="eyebrow">Know about me</div>
            <h2 className="mt-4 text-4xl leading-[1.1] md:text-5xl">
              Full-Stack Developer and
              <br />a little bit of <span className="ital-grad">everything</span>
            </h2>
            <div className="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-muted-foreground">
              <p>{profile.blurb}</p>
              <p>{profile.blurb2}</p>
              <p>I believe in waking up each day eager to make a difference!</p>
            </div>
            <div className="mt-6 flex gap-3">
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
            <Link
              to="/about"
              className="eyebrow mt-8 inline-flex items-center gap-2 text-foreground"
            >
              Work experience <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <Portrait3D logo />
        </div>
      </Section>

      {/* Testimonials */}
      <Section eyebrow="Testimonials" title="Word on the street" italic="about me">
        <Testimonials />
      </Section>

      {/* Experience preview */}
      <Section eyebrow="Work experience" title="Where I've" italic="been">
        <div className="panel divide-y divide-border">
          {experience.slice(0, 4).map((e) => (
            <div
              key={e.role + e.company}
              className="flex flex-col gap-1 p-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="text-lg">{e.role}</div>
                <div className="text-sm text-muted-foreground">
                  {e.company} · {e.location}
                </div>
              </div>
              <div className="font-mono text-xs text-muted-foreground">{e.period}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <CrystallizedCTA />
      </Section>
    </PageShell>
  );
}
