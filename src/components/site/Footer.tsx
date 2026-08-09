import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/70 px-4 pb-14 pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="font-mono text-sm tracking-[0.3em]">M.ALEEM</div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            I'm Aleem — a full-stack developer, teaching assistant and problem solver. Thanks for
            checking out my site.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="size-4" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="size-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>

        <FooterCol
          title="Pages"
          items={[
            { label: "Home", to: "/" },
            { label: "About", to: "/about" },
            { label: "Work", to: "/work" },
          ]}
        />
        <FooterCol
          title="More"
          items={[
            { label: "Certificates", to: "/certificates" },
            { label: "Links", to: "/links" },
            { label: "Contact", to: "/contact" },
          ]}
        />
        <div>
          <div className="eyebrow">Reach out</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a className="hover:text-foreground" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </li>
            <li>{profile.phone}</li>
            <li>{profile.location}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl dotted-rule pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} Muhammad Aleem. Built with React, TanStack Start & Tailwind.
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  return (
    <div>
      <div className="eyebrow">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="hover:text-foreground">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
