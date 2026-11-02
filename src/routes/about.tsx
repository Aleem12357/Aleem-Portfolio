import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section } from "@/components/site/PageShell";
import { activities, education, experience, profile } from "@/data/portfolio";
import aleem from "@/assets/Aleem.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Muhammad Aleem — Software Engineer & Lab Instructor" },
      {
        name: "description",
        content:
          "Background of Muhammad Aleem: BS Software Engineering at UCP (3.95 CGPA), Associate Business Developer at Zweidevs, Lab Instructor at UCP, and software engineering.",
      },
      {
        name: "keywords",
        content:
          "Muhammad Aleem About, Software Engineer Profile, UCP Graduate, Lab Instructor UCP, Software Engineer & Lab Instructor, Full-Stack Developer Islamabad",
      },
      { property: "og:title", content: "Muhammad Aleem — Software Engineer & Lab Instructor" },
      {
        property: "og:description",
        content:
          "Education, work experience and academic achievements of Muhammad Aleem, full-stack developer in Islamabad.",
      },
      { property: "og:url", content: "https://aleemstack.dev/about" },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://aleemstack.dev/about" }],
  }),
  component: About,
});

function About() {
  return (
    <PageShell>
      <Section eyebrow="Know about me" title="A developer who likes" italic="the whole stack">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="panel overflow-hidden">
            <div className="relative aspect-[4/3] max-h-80 w-full overflow-hidden bg-surface-2">
              <img
                src={aleem}
                alt="Muhammad Aleem"
                className="h-full w-full object-cover object-top transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-5">
              <div className="text-lg font-display">{profile.name}</div>
              <div className="text-sm text-muted-foreground">
                {profile.role} · {profile.location}
              </div>
            </div>
          </div>
          <div className="space-y-5 text-[0.95rem] leading-relaxed text-muted-foreground">
            <p>{profile.blurb}</p>
            <p>{profile.blurb2}</p>
            <p>
              I believe in waking up each day eager to make a difference — whether that's shipping a
              feature, guiding students as a Lab Instructor at UCP, or organising a hackathon on campus.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Education" title="Where I" italic="studied">
        <div className="panel divide-y divide-border">
          {education.map((e) => (
            <div
              key={e.school}
              className="flex flex-col gap-1 p-6 md:flex-row md:items-center md:justify-between"
            >
              <div>
                <div className="text-lg">{e.school}</div>
                <div className="text-sm text-muted-foreground">
                  {e.detail} · {e.location}
                </div>
              </div>
              <div className="font-mono text-xs text-muted-foreground">{e.period}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Experience" title="Roles and" italic="responsibilities">
        <div className="space-y-3">
          {experience.map((e) => (
            <article key={e.role + e.period} className="panel p-6">
              <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                <div>
                  <h3 className="text-2xl">{e.role}</h3>
                  <div className="text-sm text-muted-foreground">
                    {e.company} · {e.location}
                  </div>
                </div>
                <div className="font-mono text-xs text-muted-foreground">{e.period}</div>
              </div>
              <ul className="mt-4 space-y-2">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Beyond the code" title="Events, teams and" italic="side quests">
        <div className="grid gap-3 md:grid-cols-2">
          {activities.map((a) => (
            <article key={a.title} className="panel p-6">
              <h3 className="text-xl">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.detail}</p>
            </article>
          ))}
        </div>
      </Section>
    </PageShell>
  );
}
