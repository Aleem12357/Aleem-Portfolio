import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, Phone, FileText, Link2, MessageCircle } from "lucide-react";
import { PageShell, Section } from "@/components/site/PageShell";
import { profile } from "@/data/portfolio";
import aleemPic from "@/assets/Aleem.png";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Links — Muhammad Aleem's Social Profiles" },
      {
        name: "description",
        content:
          "Every way to reach Muhammad Aleem: GitHub, LinkedIn, WhatsApp, email and phone in one place.",
      },
      { property: "og:title", content: "Links — Muhammad Aleem" },
      {
        property: "og:description",
        content: "All of Muhammad Aleem's profiles and contact links.",
      },
    ],
  }),
  component: Links,
});

const groups = [
  {
    label: "Code & craft",
    items: [
      { title: "GitHub", sub: "@Aleem12357", href: profile.github, Icon: Github },
      { title: "Portfolio", sub: "You're already here", href: "/", Icon: Link2 },
    ],
  },
  {
    label: "Connect",
    items: [
      { title: "WhatsApp", sub: "+92 315 5196967 — Aleem", href: profile.whatsapp, Icon: MessageCircle },
      { title: "LinkedIn", sub: "in/muhammadAleem123579", href: profile.linkedin, Icon: Linkedin },
      { title: "Email", sub: profile.email, href: `mailto:${profile.email}`, Icon: Mail },
      {
        title: "Phone",
        sub: profile.phone,
        href: `tel:${profile.phone.replace(/\s/g, "")}`,
        Icon: Phone,
      },
      {
        title: "Résumé",
        sub: "Ask and I'll send it over",
        href: `mailto:${profile.email}?subject=Resume%20request`,
        Icon: FileText,
      },
    ],
  },
];

function Links() {
  return (
    <PageShell>
      <Section eyebrow="Links" title="All my links are" italic="here">
        <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
          <aside className="panel h-fit p-6 text-center">
            <img
              src={aleemPic}
              alt="Muhammad Aleem"
              className="mx-auto size-32 rounded-full border border-border object-cover"
            />
            <h2 className="mt-4 text-2xl">{profile.name}</h2>
            <div className="mt-2 flex justify-center gap-2">
              {["Developer", "Student", "TA"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-border px-3 py-1 font-mono text-[0.65rem] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-5 dotted-rule pt-5 text-left text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="size-4" /> {profile.location}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Mail className="size-4" /> {profile.email}
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            {groups.map((g) => (
              <div key={g.label}>
                <div className="eyebrow">{g.label}</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {g.items.map(({ title, sub, href, Icon }) => (
                    <a
                      key={title}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="panel flex items-center gap-4 p-5 transition-colors hover:border-brand/50"
                    >
                      <span className="rounded-xl border border-border bg-surface-2 p-3">
                        <Icon className="size-4 text-muted-foreground" />
                      </span>
                      <span>
                        <span className="block text-sm">{title}</span>
                        <span className="block font-mono text-xs text-muted-foreground">{sub}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
