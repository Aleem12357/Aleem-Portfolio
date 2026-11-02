import portrait from "@/assets/Aleem.png";
import { openReachOut } from "./reach-out";

const avatars = [
  { src: "https://i.pravatar.cc/80?img=12", top: "14%", left: "18%", delay: "0ms", size: "size-9" },
  {
    src: "https://i.pravatar.cc/80?img=32",
    top: "6%",
    left: "44%",
    delay: "80ms",
    size: "size-11",
  },
  {
    src: "https://i.pravatar.cc/80?img=45",
    top: "18%",
    left: "76%",
    delay: "160ms",
    size: "size-8",
  },
  {
    src: "https://i.pravatar.cc/80?img=58",
    top: "68%",
    left: "28%",
    delay: "120ms",
    size: "size-10",
  },
  {
    src: "https://i.pravatar.cc/80?img=64",
    top: "72%",
    left: "66%",
    delay: "200ms",
    size: "size-9",
  },
  { src: "https://i.pravatar.cc/80?img=8", top: "44%", left: "6%", delay: "240ms", size: "size-8" },
  {
    src: "https://i.pravatar.cc/80?img=25",
    top: "40%",
    left: "90%",
    delay: "280ms",
    size: "size-8",
  },
];

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
            className="absolute size-44 rounded-full border border-border transition-all duration-700 group-hover:scale-105 group-hover:border-brand/40"
            style={{ transform: `translateX(${(i - 1.5) * 8.5}rem)` }}
          />
        ))}

        {avatars.map((a) => (
          <img
            key={a.src}
            src={a.src}
            alt=""
            aria-hidden
            loading="lazy"
            className={`absolute ${a.size} translate-y-2 scale-75 rounded-full object-cover opacity-0 ring-2 ring-border transition-all duration-500 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100`}
            style={{ top: a.top, left: a.left, transitionDelay: a.delay }}
          />
        ))}

        <img
          src={portrait}
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
