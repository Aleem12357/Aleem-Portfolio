export function ProjectImages({ images, alt }: { images: string[]; alt: string }) {
  const front = images[0];
  const back = images[1] ?? images[0];

  const base =
    "absolute rounded-xl border border-primary-foreground/15 object-cover transition-all duration-500 ease-out";

  return (
    <div className="group/img relative mt-6 h-52 w-full overflow-hidden sm:h-64">
      <img
        src={back}
        alt={`${alt} secondary screenshot`}
        loading="lazy"
        className={`${base} inset-x-8 top-0 bottom-10 z-0 opacity-70 shadow-lg group-hover/img:inset-x-0 group-hover/img:top-10 group-hover/img:bottom-0 group-hover/img:z-10 group-hover/img:opacity-100`}
      />
      <img
        src={front}
        alt={`${alt} screenshot`}
        loading="lazy"
        className={`${base} inset-x-0 top-10 bottom-0 z-10 shadow-2xl group-hover/img:inset-x-8 group-hover/img:top-0 group-hover/img:bottom-10 group-hover/img:z-0 group-hover/img:opacity-70`}
      />
    </div>
  );
}
