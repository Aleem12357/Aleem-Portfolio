import { createFileRoute } from "@tanstack/react-router";
import { Award } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";
import { certificates } from "@/data/portfolio";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Certificates & Achievements — Muhammad Aleem" },
      {
        name: "description",
        content:
          "Courses and certificates earned by Muhammad Aleem, including CS50 Python, Coursera data structures and DigiSkills programmes.",
      },
      { property: "og:title", content: "Certificates — Muhammad Aleem" },
      {
        property: "og:description",
        content: "A gallery of courses, certificates and achievements.",
      },
    ],
  }),
  component: Certificates,
});

function Certificates() {
  return (
    <PageShell>
      <Section eyebrow="Credentials" title="Certificates &" italic="achievements">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c) => (
            <article key={c.title} className="panel overflow-hidden">
              <div className="relative aspect-[4/3] bg-surface-2">
                {c.image ? (
                  <img
                    src={c.image}
                    alt={`${c.title} certificate issued by ${c.issuer}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                    <Award className="size-8" />
                    <span className="font-mono text-[0.65rem] tracking-[0.2em]">CERTIFICATE</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h2 className="text-xl leading-snug">{c.title}</h2>
                <div className="mt-1 text-sm text-muted-foreground">
                  {c.issuer} · {c.year}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-muted-foreground">
          Certificate scans get added here as they're uploaded — drop the images into{" "}
          <code className="font-mono text-foreground">public/certificates/</code> and they'll appear
          in this gallery.
        </p>
      </Section>
    </PageShell>
  );
}
