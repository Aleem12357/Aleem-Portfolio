import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Github, Linkedin, Mail, Send } from "lucide-react";
import { toast } from "sonner";
import { PageShell, Section } from "@/components/site/PageShell";
import { profile } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Muhammad Aleem — Project, Role or Just a Hey?" },
      {
        name: "description",
        content:
          "Get in touch with Muhammad Aleem for full-time roles, freelance projects or a quick hello. Email, LinkedIn and GitHub.",
      },
      { property: "og:title", content: "Contact Muhammad Aleem" },
      { property: "og:description", content: "Reach out about a project, a role, or just to say hey." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please add your name and a message.");
      return;
    }
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      `Hello from ${name}`,
    )}&body=${body}`;
    toast.success("Opening your mail app…");
  }

  const field =
    "w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand/60";

  return (
    <PageShell>
      <Section eyebrow="Contact" title="Project, Role or" italic="Just a Hey?">
        <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
          <form onSubmit={submit} className="panel p-7">
            <h2 className="text-2xl">Send me a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">I read every one.</p>

            <div className="mt-6 space-y-3">
              <input
                className={field}
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={field}
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                className={`${field} min-h-40 resize-y`}
                placeholder="Hey Aleem, I have a project idea…"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-primary-foreground"
              style={{ background: "var(--gradient-brand)" }}
            >
              Send message <Send className="size-4" />
            </button>
          </form>

          <div className="space-y-3">
            <a
              href={`mailto:${profile.email}`}
              className="panel flex items-center gap-4 p-6 transition-colors hover:border-brand/50"
            >
              <Mail className="size-5 text-muted-foreground" />
              <span>
                <span className="block text-sm">Email me</span>
                <span className="block font-mono text-xs text-muted-foreground">{profile.email}</span>
              </span>
            </a>
            <a
              href={`https://wa.me/${profile.phone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="panel flex items-center gap-4 p-6 transition-colors hover:border-brand/50"
            >
              <Calendar className="size-5 text-muted-foreground" />
              <span>
                <span className="block text-sm">Book a call</span>
                <span className="block font-mono text-xs text-muted-foreground">30 min · no strings</span>
              </span>
            </a>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="panel flex items-center justify-center gap-2 p-5 text-sm transition-colors hover:border-brand/50"
              >
                <Linkedin className="size-4" /> LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="panel flex items-center justify-center gap-2 p-5 text-sm transition-colors hover:border-brand/50"
              >
                <Github className="size-4" /> GitHub
              </a>
            </div>
            <div className="panel p-6 text-sm text-muted-foreground">
              Based in {profile.location} — available for full-time roles and freelance work, and happy
              to work across EU and US timezones.
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
