import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calendar, Github, Linkedin, Mail, MessageCircle, Send, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { PageShell, Section } from "@/components/site/PageShell";
import { BookingCalendar } from "@/components/site/BookingCalendar";
import { profile } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Muhammad Aleem — Book a Call or Send a Message" },
      {
        name: "description",
        content:
          "Get in touch with Muhammad Aleem for full-stack software development, freelance projects, AI automation, or career opportunities.",
      },
      {
        name: "keywords",
        content:
          "Contact Muhammad Aleem, Hire Full-Stack Developer, Hire React Developer Islamabad, Freelance Web Developer Pakistan",
      },
      { property: "og:title", content: "Contact Muhammad Aleem — Full-Stack Developer" },
      {
        property: "og:description",
        content: "Reach out about a project, a role, or schedule a 30-minute discovery call.",
      },
      { property: "og:url", content: "https://aleem-portfolio.vercel.app/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://aleem-portfolio.vercel.app/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [tab, setTab] = useState<"book" | "message">("book");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [messageSent, setMessageSent] = useState<{
    name: string;
    email: string;
    message: string;
    gmailUrl: string;
    outlookUrl: string;
    whatsappUrl: string;
  } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please add your name and a message.");
      return;
    }

    setIsSubmitting(true);
    const subject = `Hello from ${name} (${email || "Portfolio visitor"})`;
    const messageContent = `${message}\n\n— Sent by ${name} (${email || "No email provided"})`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aleem123579@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(messageContent)}`;

    const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=aleem123579@gmail.com&subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(messageContent)}`;

    const whatsappUrl = `https://wa.me/923155196967?text=${encodeURIComponent(
      `Hi Aleem, I am ${name}${email ? ` (${email})` : ""}.\n\n${message}`
    )}`;

    try {
      const fd = new FormData();
      fd.append("access_key", "e29e96f1-a189-4a92-9658-03820297802e");
      fd.append("name", name);
      fd.append("email", email || "no-email@portfolio.user");
      fd.append("subject", subject);
      fd.append("message", messageContent);

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
    } catch {
      // Ignore background api error, fallback options guarantee delivery
    }

    setMessageSent({
      name,
      email,
      message,
      gmailUrl,
      outlookUrl,
      whatsappUrl,
    });

    toast.success("Message created! Choose your preferred option to send.");
    setIsSubmitting(false);
  }

  const field =
    "w-full rounded-xl border border-border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand/60";

  return (
    <PageShell>
      <Section eyebrow="Contact" title="Project, Role or" italic="Just a Hey?">
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          <div className="flex rounded-full border border-border bg-surface-2 p-1">
            {(["book", "message"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm transition-colors ${
                  tab === t ? "bg-accent text-foreground" : "text-muted-foreground"
                }`}
              >
                {t === "book" ? <Calendar className="size-4" /> : <Send className="size-4" />}
                {t === "book" ? "Book a Call" : "Send Message"}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {[
              { href: profile.whatsapp, Icon: MessageCircle, label: "WhatsApp" },
              { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
              { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: profile.github, Icon: Github, label: "GitHub" },
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

        {tab === "book" && (
          <div className="mb-10">
            <BookingCalendar />
          </div>
        )}

        <div className={`grid gap-3 md:grid-cols-[1.2fr_0.8fr] ${tab === "book" ? "hidden" : ""}`}>
          <form onSubmit={submit} className="panel p-7">
            <h2 className="text-2xl">Send me a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">Sent directly to aleem123579@gmail.com</p>

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
              disabled={isSubmitting}
              className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "var(--gradient-brand)" }}
            >
              {isSubmitting ? "Sending..." : "Send message"} <Send className="size-4" />
            </button>
          </form>

          <div className="space-y-3">
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="panel flex items-center gap-4 p-6 transition-colors hover:border-emerald-500/50 bg-emerald-500/5"
            >
              <MessageCircle className="size-5 text-emerald-400" />
              <span>
                <span className="block text-sm font-medium text-foreground">Contact on WhatsApp</span>
                <span className="block font-mono text-xs text-emerald-400">
                  +92 315 5196967 — Aleem
                </span>
              </span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="panel flex items-center gap-4 p-6 transition-colors hover:border-brand/50"
            >
              <Mail className="size-5 text-muted-foreground" />
              <span>
                <span className="block text-sm">Email me</span>
                <span className="block font-mono text-xs text-muted-foreground">
                  {profile.email}
                </span>
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
                <span className="block font-mono text-xs text-muted-foreground">
                  30 min · no strings
                </span>
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
              Based in {profile.location} — available for full-time roles and freelance work, and
              happy to work across EU and US timezones.
            </div>
          </div>
        </div>

        {messageSent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="w-full max-w-lg rounded-2xl border border-emerald-500/40 bg-[#091522] p-6 shadow-2xl animate-scale-in text-left">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Mail className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-display text-white">Message Ready to Send</h3>
                  <p className="text-xs text-emerald-400">To: aleem123579@gmail.com</p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/10 bg-surface-2/60 p-3.5 space-y-1 text-xs">
                <div className="text-muted-foreground"><span className="text-foreground font-medium">From:</span> {messageSent.name} {messageSent.email ? `(${messageSent.email})` : ""}</div>
                <div className="text-muted-foreground mt-2 line-clamp-4"><span className="text-foreground font-medium">Message:</span> {messageSent.message}</div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                Select your preferred application below to dispatch your message immediately:
              </p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <a
                  href={messageSent.gmailUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#22d3ee] px-4 py-3 text-xs font-semibold text-black transition-transform hover:scale-[1.01]"
                >
                  <Mail className="size-4" /> 1-Click Send via Gmail Web
                </a>

                <a
                  href={messageSent.outlookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                >
                  <Mail className="size-3.5 text-blue-400" /> Send via Outlook Web
                </a>

                <a
                  href={messageSent.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-medium text-emerald-400 transition-colors hover:bg-emerald-500/20"
                >
                  <MessageCircle className="size-3.5" /> Direct WhatsApp Message
                </a>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(`${messageSent.message}\n\n— Sent by ${messageSent.name} (${messageSent.email || "No email"})`);
                    setCopied(true);
                    toast.success("Message copied to clipboard!");
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                >
                  {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied!" : "Copy Message"}
                </button>
              </div>

              <div className="mt-5 flex justify-end">
                <button
                  onClick={() => {
                    setMessageSent(null);
                    setName("");
                    setEmail("");
                    setMessage("");
                  }}
                  className="rounded-full px-5 py-2 text-xs font-medium bg-surface-2 text-muted-foreground hover:text-white transition-colors"
                >
                  Close & Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </Section>
    </PageShell>
  );
}
