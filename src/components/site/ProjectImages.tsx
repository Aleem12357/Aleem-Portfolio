export function ProjectImages({ images, alt }: { images: string[]; alt: string }) {
  const [front, back] = [images[0], images[1] ?? images[0]];

  return (
    <div className="group/img relative mt-6 h-56 w-full sm:h-72">
      {/* back image */}
      <img
        src={back}
        alt={`${alt} secondary screenshot`}
        loading="lazy"
        className="absolute left-1/2 top-0 h-[88%] w-[88%] -translate-x-1/2 rounded-xl border border-primary-foreground/15 object-cover shadow-lg transition-all duration-500 group-hover/img:z-20 group-hover/img:h-full group-hover/img:w-full group-hover/img:translate-y-3"
      />
      {/* front image */}
      <img
        src={front}
        alt={`${alt} screenshot`}
        loading="lazy"
        className="absolute left-1/2 top-6 z-10 h-full w-full -translate-x-1/2 rounded-xl border border-primary-foreground/15 object-cover shadow-2xl transition-all duration-500 group-hover/img:z-0 group-hover/img:h-[88%] group-hover/img:w-[88%] group-hover/img:-translate-y-6"
      />
    </div>
  );
}
