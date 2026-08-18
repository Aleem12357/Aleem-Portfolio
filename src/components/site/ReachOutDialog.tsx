import { useState } from "react";
import { ArrowRight, ChevronLeft, Github, Linkedin, Mail, MessageCircle, Moon, Search, X } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import { useReachOut } from "./reach-out";
import { BookingCalendar } from "./BookingCalendar";

export function ReachOutDialog() {
  const { open, setOpen, view, setView } = useReachOut();
  const [message, setMessage] = useState("");

  if (!open) return null;

  function send() {
    if (!message.trim()) {
      toast.error("Write a short message first.");
      return;
    }
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aleem123579@gmail.com&su=${encodeURIComponent(
      "Hello from your portfolio",
    )}&body=${encodeURIComponent(message)}`;
    
    window.open(gmailUrl, "_blank");
    toast.success("Opening Gmail composer to send to aleem123579@gmail.com!");
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-background/70 p-4 pt-24 backdrop-blur-sm">
      <button
        className="absolute inset-0 cursor-default"
        aria-label="Close"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-xl animate-scale-in">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-popover/90 px-4 py-2.5 backdrop-blur-xl">
            {view === "calendar" ? (
              <button onClick={() => setView("menu")} className="text-muted-foreground">
                <ChevronLeft className="size-4" />
              </button>
            ) : (
              <ChevronLeft className="size-4 text-muted-foreground/40" />
            )}
            <span className="text-sm">{view === "calendar" ? "Book a call" : "Reach out"}</span>
          </div>
          {[Search, Moon].map((Icon, i) => (
            <span
              key={i}
              className="rounded-full border border-border bg-popover/90 p-2.5 text-muted-foreground backdrop-blur-xl"
            >
              <Icon className="size-4" />
            </span>
          ))}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="rounded-full border border-border bg-popover/90 p-2.5 text-muted-foreground backdrop-blur-xl transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {view === "calendar" ? (
          <BookingCalendar compact />
        ) : (
          <div className="panel p-3">
            <div className="rounded-2xl border border-border bg-surface-2 p-4">
              <div className="flex items-center gap-3">
                <div
                  className="flex size-8 items-center justify-center rounded-full text-[0.65rem] text-primary-foreground"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  MA
                </div>
                <div>
                  <div className="text-sm">Send Aleem a message</div>
                  <div className="text-xs text-muted-foreground">Sent to aleem123579@gmail.com</div>
                </div>
              </div>
              <textarea
                autoFocus
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hey Aleem, I have a project idea…"
                className="mt-4 min-h-24 w-full resize-y bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="font-mono text-[0.65rem] text-muted-foreground">
                  ⏎ to continue · ⇧⏎ new line
                </span>
                <button
                  onClick={send}
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm transition-colors hover:bg-accent"
                >
                  Continue <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center transition-colors hover:border-emerald-500"
              >
                <div className="flex items-center justify-center gap-2 text-sm text-emerald-400 font-medium">
                  <MessageCircle className="size-4" /> WhatsApp Chat
                </div>
                <div className="mt-1 font-mono text-[0.65rem] text-emerald-300">
                  +92 315 5196967 — Aleem
                </div>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-2xl border border-border bg-surface-2 p-5 text-center transition-colors hover:border-brand/60"
              >
                <div className="text-sm">Email me</div>
                <div className="mt-1 font-mono text-[0.65rem] text-muted-foreground">
                  {profile.email}
                </div>
              </a>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-3">
              {[
                { href: profile.whatsapp, Icon: MessageCircle, label: "WhatsApp" },
                { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: profile.github, Icon: Github, label: "GitHub" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-3.5" /> {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
