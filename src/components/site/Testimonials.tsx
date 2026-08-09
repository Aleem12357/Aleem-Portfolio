import { testimonials } from "@/data/portfolio";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <article className="panel w-[19rem] shrink-0 whitespace-normal p-5 text-left">
      <h3 className="text-lg leading-snug">{t.headline}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.quote}</p>
      <div className="mt-5 flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-surface-2 font-mono text-xs text-muted-foreground">
          {t.name.charAt(0)}
        </span>
        <div>
          <div className="text-sm">{t.name}</div>
          <div className="text-xs text-muted-foreground">{t.title}</div>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const doubled = [...testimonials, ...testimonials];
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex w-max items-stretch gap-3 group-hover:[animation-play-state:paused]"
        style={{ animation: "marquee 46s linear infinite" }}
      >
        {doubled.map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}
