import { useEffect, useState } from "react";

type View = "menu" | "calendar";
const EVENT = "reach-out:open";

export function openReachOut(view: View = "menu") {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: view }));
}

export function useReachOut() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("menu");

  useEffect(() => {
    function handler(e: Event) {
      setView(((e as CustomEvent).detail as View) ?? "menu");
      setOpen(true);
    }
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
  }, []);

  return { open, setOpen, view, setView };
}
