import { useIsScrolling } from "@/hooks/useIsScrolling";

export function ProjectImages({ images, alt }: { images: string[]; alt: string }) {
  const front = images[0];
  const back = images[1] ?? images[0];
  const isScrolling = useIsScrolling(180);

  return (
    <div
      className={`group/img relative mt-6 flex h-60 w-full items-center justify-center overflow-hidden rounded-2xl p-2 sm:h-80 ${
        isScrolling ? "pointer-events-none" : ""
      }`}
    >
      {/* Main image (Default in front, z-20) */}
      <img
        src={front}
        alt={`${alt} main screenshot`}
        loading="lazy"
        decoding="async"
        className={`pointer-events-none absolute left-2 top-2 h-[92%] w-[72%] rounded-xl border border-white/20 object-contain bg-[#0a121e]/90 shadow-xl transition-all duration-500 ease-out transform-gpu z-20 ${
          !isScrolling ? "group-hover:z-10 group-hover:scale-95 group-hover:opacity-75" : ""
        }`}
      />
      {/* Secondary image (Default behind z-10; Moves up to front z-30 on hover when scroll is idle) */}
      <img
        src={back}
        alt={`${alt} secondary screenshot`}
        loading="lazy"
        decoding="async"
        className={`pointer-events-none absolute right-2 bottom-2 h-[92%] w-[72%] rounded-xl border border-white/15 object-contain bg-[#0a121e]/90 shadow-lg transition-all duration-500 ease-out transform-gpu z-10 ${
          !isScrolling
            ? "group-hover:z-30 group-hover:scale-105 group-hover:-translate-x-2 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            : ""
        }`}
      />
    </div>
  );
}


