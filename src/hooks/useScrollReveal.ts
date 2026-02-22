import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement>(staggerDelay = 80) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll("[data-reveal]");
    const targets = children.length > 0 ? Array.from(children) : [el];

    targets.forEach((t, i) => {
      const htmlEl = t as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(30px)";
      htmlEl.style.transition = `opacity 0.5s cubic-bezier(0.2,0.8,0.2,1) ${i * staggerDelay}ms, transform 0.5s cubic-bezier(0.2,0.8,0.2,1) ${i * staggerDelay}ms`;
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            targets.forEach((t) => {
              const htmlEl = t as HTMLElement;
              htmlEl.style.opacity = "1";
              htmlEl.style.transform = "translateY(0)";
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [staggerDelay]);

  return ref;
}
