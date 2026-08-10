import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { openReachOut } from "./reach-out";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
];

const more = [
  { to: "/certificates", label: "Certificates", desc: "Courses & achievements" },
  { to: "/links", label: "Links", desc: "All my links are here" },
  { to: "/contact", label: "Contact", desc: "Say hello or hire me" },
];

export function Nav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [openMore, setOpenMore] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpenMore(false);
    setOpenMobile(false);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpenMore(false);
        setOpenMobile(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenMore(false);
        setOpenMobile(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const baseBtn =
    "rounded-full px-4 py-2 text-sm outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand/60";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        ref={ref}
        className="pointer-events-auto relative w-full max-w-2xl rounded-full border border-foreground/10 bg-background/40 px-2 py-2 backdrop-blur-2xl backdrop-saturate-150 transition-colors hover:border-foreground/20 md:w-auto"
        style={{
          boxShadow:
            "var(--shadow-soft), inset 0 1px 0 oklch(1 0 0 / 0.14), inset 0 -1px 0 oklch(0 0 0 / 0.3)",
        }}
      >
        <nav className="flex items-center justify-between gap-1">
          <Link
            to="/"
            className="ml-2 font-mono text-xs tracking-[0.28em] text-foreground md:hidden"
          >
            M.ALEEM
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`${baseBtn} ${
                  pathname === l.to
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground hover:text-brand"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => setOpenMore((v) => !v)}
              aria-expanded={openMore}
              className={`${baseBtn} inline-flex items-center gap-1 ${
                more.some((m) => m.to === pathname) || openMore
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:text-brand"
              }`}
            >
              More
              <ChevronDown
                className={`size-3.5 transition-transform duration-200 ${openMore ? "rotate-180" : ""}`}
              />
            </button>
            <button
              onClick={() => openReachOut("menu")}
              className="rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground outline-none transition-all duration-200 hover:text-brand hover:shadow-[0_6px_20px_-8px_oklch(0_0_0/0.4)] focus-visible:ring-2 focus-visible:ring-brand/60 active:scale-95"
            >
              Book a Call
            </button>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              onClick={() => setOpenMobile((v) => !v)}
              className="rounded-full p-2 text-muted-foreground hover:text-brand"
            >
              {openMobile ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {openMore && (
          <div
            className="absolute left-1/2 top-[calc(100%+0.5rem)] w-[22rem] -translate-x-1/2 animate-scale-in rounded-2xl border border-border bg-popover p-2 backdrop-blur-2xl backdrop-saturate-150"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            {more.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-surface-2 group"
              >
                <div className={`text-sm ${pathname === m.to ? "text-brand font-medium" : "text-foreground group-hover:text-brand"}`}>
                  {m.label}
                </div>
                <div className="text-xs text-muted-foreground">{m.desc}</div>
              </Link>
            ))}
          </div>
        )}

        {openMobile && (
          <div
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] animate-scale-in rounded-2xl border border-border bg-popover p-2 md:hidden"
            style={{ boxShadow: "0 24px 60px -20px oklch(0 0 0 / 0.55)" }}
          >
            {[...links, ...more].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`block rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  pathname === l.to
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-foreground/80 hover:text-brand"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setOpenMobile(false);
                openReachOut("menu");
              }}
              className="mt-1 w-full rounded-xl px-4 py-2.5 text-left text-sm text-primary-foreground"
              style={{ background: "var(--gradient-brand)" }}
            >
              Book a Call
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
