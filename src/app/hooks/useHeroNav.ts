import { useEffect } from "react";

const OVER_CLASS = "ck-hero-over";
const SCROLLED_CLASS = "ck-hero-scrolled";
const SCROLL_THRESHOLD = 64;

export const useHeroNav = (enabled: boolean): void => {
  useEffect(() => {
    const root = document.documentElement;

    if (!enabled) {
      root.classList.remove(OVER_CLASS, SCROLLED_CLASS);
      return;
    }

    root.classList.add(OVER_CLASS);

    const sync = () => {
      root.classList.toggle(SCROLLED_CLASS, window.scrollY > SCROLL_THRESHOLD);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });

    return () => {
      window.removeEventListener("scroll", sync);
      root.classList.remove(OVER_CLASS, SCROLLED_CLASS);
    };
  }, [enabled]);
};

export default useHeroNav;
