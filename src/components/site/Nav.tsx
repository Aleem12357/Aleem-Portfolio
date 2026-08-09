import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { openReachOut } from "./reach-out";

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
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenMore(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const pill =
    "rounded-full px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        ref={ref}
        className="pointer-events-auto relative w-full max-w-2xl rounded-full border border-border bg-popover/80 px-2 py-2 backdrop-blur-xl md:w-auto"
        style={{ boxShadow: "var(--shadow-soft)" }}
      >
        <nav className="flex items-center justify-between gap-1">
          <Link to="/" className="ml-2 font-mono text-xs tracking-[0.28em] text-foreground md:hidden">
            M.ALEEM
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`${pill} ${pathname === l.to ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              >
                {l.label}
              </Link>
            ))}
            <button
              onClick={() => setOpenMore((v) => !v)}
              className={`${pill} inline-flex items-center gap-1 ${
                more.some((m) => m.to === pathname) ? "bg-accent text-accent-foreground" : "text-muted-foreground"
              }`}
            >
              More
              <ChevronDown className={`size-3.5 transition-transform ${openMore ? "rotate-180" : ""}`} />
            </button>
            <button
              onClick={() => openReachOut("menu")}
              className="rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-colors hover:bg-accent"
            >
              Book a Call
            </button>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpenMobile((v) => !v)}
            className="rounded-full p-2 text-muted-foreground md:hidden"
          >
            {openMobile ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {openMore && (
          <div className="absolute left-1/2 top-[calc(100%+0.5rem)] w-[22rem] -translate-x-1/2 animate-scale-in rounded-2xl border border-border bg-popover/95 p-2 backdrop-blur-xl">
            {more.map((m) => (
              <Link
                key={m.to}
                to={m.to}
                className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-accent"
              >
                <div className="text-sm text-foreground">{m.label}</div>
                <div className="text-xs text-muted-foreground">{m.desc}</div>
              </Link>
            ))}
          </div>
        )}

        {openMobile && (
          <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] animate-scale-in rounded-2xl border border-border bg-popover/95 p-2 backdrop-blur-xl md:hidden">
            {[...links, ...more].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`block rounded-xl px-3 py-2.5 text-sm ${
                  pathname === l.to ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
