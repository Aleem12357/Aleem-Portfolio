import portrait from "@/assets/aleem.png.asset.json";
import { openReachOut } from "./reach-out";

export function BuildTogether() {
  return (
    <button
      onClick={() => openReachOut("calendar")}
      className="panel group relative w-full overflow-hidden p-10 text-center transition-colors hover:border-brand/50"
    >
      <div className="relative mx-auto flex h-56 items-center justify-center">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute size-44 rounded-full border border-border transition-transform duration-700 group-hover:scale-105"
            style={{ transform: `translateX(${(i - 1.5) * 8.5}rem)` }}
          />
        ))}
        <img
          src={portrait.url}
          alt="Muhammad Aleem portrait"
          loading="lazy"
          className="relative size-32 rounded-full object-cover ring-2 ring-brand/50 transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="eyebrow mt-2">Let's build together</div>
      <h3 className="mt-3 text-3xl md:text-4xl">
        Clear communication, fast iterations, <span className="ital-grad">no surprises</span>
      </h3>
    </button>
  );
}
