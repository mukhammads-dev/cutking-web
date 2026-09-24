import { useCallback, useEffect, useState } from "react";

const SUPPORTED =
  typeof window !== "undefined" && typeof IntersectionObserver !== "undefined";

if (SUPPORTED) {
  document.documentElement.classList.add("js-reveal");
}

export interface Reveal<T extends HTMLElement> {
  ref: (node: T | null) => void;
  revealClass: string;
}

export const useReveal = <T extends HTMLElement>(): Reveal<T> => {
  const [node, setNode] = useState<T | null>(null);
  const [shown, setShown] = useState(!SUPPORTED);

  const ref = useCallback((element: T | null) => setNode(element), []);

  useEffect(() => {
    if (!SUPPORTED || shown || !node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);

    const safety = window.setTimeout(() => setShown(true), 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [node, shown]);

  return { ref, revealClass: shown ? "reveal is-revealed" : "reveal" };
};

export default useReveal;
