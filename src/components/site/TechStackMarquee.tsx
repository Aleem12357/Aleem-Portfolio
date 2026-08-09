import { useRef, useState } from "react";
import { Search } from "lucide-react";
import { stack } from "@/data/portfolio";

const iconSlug: Record<string, string> = {
  C: "c",
  "C++": "cplusplus",
  Python: "python",
  SQL: "postgresql",
  JavaScript: "javascript",
  TypeScript: "typescript",
  PHP: "php",
  "HTML/CSS": "html5",
  React: "react",
  "Next.js": "nextdotjs",
  "Vue.js": "vuedotjs",
  "Node.js": "nodedotjs",
  Express: "express",
  Vite: "vite",
  "Tailwind CSS": "tailwindcss",
  Bootstrap: "bootstrap",
  Playwright: "playwright",
  Selenium: "selenium",
  MongoDB: "mongodb",
  Supabase: "supabase",
  Firebase: "firebase",
  "Drizzle ORM": "drizzle",
  Git: "git",
  GitHub: "github",
  "VS Code": "vscodium",
  Cursor: "cursorai",
  Postman: "postman",
  Jira: "jira",
  Trello: "trello",
  Figma: "figma",
  IntelliJ: "intellijidea",
  "Google Colab": "googlecolab",
};

function icon(name: string) {
  const slug = iconSlug[name];
  return slug ? `https://cdn.simpleicons.org/${slug}/white` : null;
}

const rows = [
  [...stack.Languages, ...stack.Frameworks.slice(0, 4)],
  [...stack.Frameworks.slice(4), ...stack.Data],
  [...stack.Tools],
];

function Row({ items, reverse, speed }: { items: string[]; reverse?: boolean; speed: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex w-max gap-2"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((item, i) => {
          const src = icon(item);
          return (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-mono text-xs text-muted-foreground"
            >
              {src && <img src={src} alt="" aria-hidden loading="lazy" className="size-3.5 opacity-90" />}
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function TechStackMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const [lens, setLens] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setLens({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
      onMouseLeave={() => setLens(null)}
      className="panel relative overflow-hidden p-6"
    >
      <div className="text-center">
        <div className="eyebrow">Tech stack</div>
        <h3 className="mt-2 text-2xl">The stack behind everything I ship</h3>
      </div>

      <div className="relative mt-6 space-y-3 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <Row items={rows[0]!} speed={38} />
        <Row items={rows[1]!} reverse speed={44} />
        <Row items={rows[2]!} speed={50} />
      </div>

      {lens && (
        <div
          className="pointer-events-none absolute z-20 flex size-16 items-center justify-center rounded-full border-2 border-foreground/70 bg-background/10 backdrop-blur-[1px]"
          style={{
            left: lens.x - 32,
            top: lens.y - 32,
            boxShadow: "0 0 0 1px oklch(1 0 0 / 0.1), 0 10px 30px -10px oklch(0 0 0 / 0.6)",
          }}
        >
          <Search className="size-5 text-foreground/70" />
          <span
            className="absolute -bottom-3 -right-3 h-6 w-1.5 rotate-[-45deg] rounded-full bg-foreground/70"
            aria-hidden
          />
        </div>
      )}
    </div>
  );
}
