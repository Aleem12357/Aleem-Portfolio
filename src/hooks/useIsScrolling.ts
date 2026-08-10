import { useEffect, useState } from "react";

export function useIsScrolling(debounceMs = 200) {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsScrolling(false);
      }, debounceMs);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [debounceMs]);

  return isScrolling;
}
