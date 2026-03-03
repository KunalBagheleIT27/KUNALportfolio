import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement>(staggerDelay = 80) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const children = el.querySelectorAll("[data-reveal]");
    const targets = children.length > 0 ? Array.from(children) : [el];

    const getRevealDirection = (target: Element, index: number) => {
      const customDirection = (target as HTMLElement).dataset.reveal;
      if (customDirection === "left" || customDirection === "right" || customDirection === "up" || customDirection === "down") {
        return customDirection;
      }

      if (targets.length > 1) {
        return index % 2 === 0 ? "left" : "right";
      }

      return "up";
    };

    const getHiddenTransform = (direction: string) => {
      switch (direction) {
        case "left":
          return "translateX(-36px)";
        case "right":
          return "translateX(36px)";
        case "down":
          return "translateY(-28px)";
        default:
          return "translateY(28px)";
      }
    };

    const showTarget = (target: Element) => {
      const htmlEl = target as HTMLElement;
      htmlEl.style.opacity = "1";
      htmlEl.style.transform = "translate3d(0, 0, 0)";
    };

    const showAll = () => {
      targets.forEach((target) => showTarget(target));
    };

    targets.forEach((t, i) => {
      const htmlEl = t as HTMLElement;
      const direction = getRevealDirection(t, i);

      if (reduceMotion) {
        showTarget(t);
        return;
      }

      htmlEl.style.opacity = "0";
      htmlEl.style.transform = getHiddenTransform(direction);
      htmlEl.style.willChange = "opacity, transform";
      htmlEl.style.transition = `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${i * staggerDelay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${i * staggerDelay}ms`;
    });

    if (reduceMotion) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      showAll();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showAll();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [staggerDelay]);

  return ref;
}
