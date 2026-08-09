import { stack } from "@/data/portfolio";

const favourites: { name: string; slug: string }[] = [
  { name: "VS Code", slug: "vscodium" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Figma", slug: "figma" },
  { name: "Postman", slug: "postman" },
  { name: "GitHub", slug: "github" },
  { name: "Notion", slug: "notion" },
  { name: "Vercel", slug: "vercel" },
  { name: "Linux", slug: "linux" },
  { name: "Jira", slug: "jira" },
  { name: "Trello", slug: "trello" },
];

export function UsesMarquee() {
  const doubled = [...favourites, ...favourites];
  return (
    <div className="panel flex flex-col overflow-hidden p-6">
      <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div
          className="flex w-max items-center gap-3"
          style={{ animation: "marquee 30s linear infinite" }}
        >
          {doubled.map((f, i) => (
            <span
              key={`${f.slug}-${i}`}
              title={f.name}
              className="grid size-16 shrink-0 place-items-center rounded-2xl border border-border bg-surface-2"
            >
              <img
                src={`https://cdn.simpleicons.org/${f.slug}/white`}
                alt={f.name}
                loading="lazy"
                className="size-7 opacity-90"
              />
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 text-center">
        <div className="eyebrow">Uses · {stack.Tools.length} tools</div>
        <h3 className="mt-2 text-2xl">Check out my favorite tools</h3>
      </div>
    </div>
  );
}
