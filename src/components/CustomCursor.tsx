import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circlePos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      isHovering.current = !!(t.closest("a, button, [role='button'], [data-hover]"));
    };

    let raf: number;
    const animate = () => {
      circlePos.current.x += (mouse.current.x - circlePos.current.x) * 0.15;
      circlePos.current.y += (mouse.current.y - circlePos.current.y) * 0.15;
      if (circleRef.current) {
        const size = isHovering.current ? 48 : 32;
        const half = size / 2;
        circleRef.current.style.width = `${size}px`;
        circleRef.current.style.height = `${size}px`;
        circleRef.current.style.transform = `translate(${circlePos.current.x - half}px, ${circlePos.current.y - half}px)`;
        circleRef.current.style.backgroundColor = isHovering.current ? "hsla(72,100%,50%,0.1)" : "transparent";
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-lime z-[11010] pointer-events-none" style={{ willChange: "transform" }} />
      <div ref={circleRef} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-lime z-[11010] pointer-events-none transition-[width,height,background-color] duration-200" style={{ willChange: "transform" }} />
    </>
  );
};

export default CustomCursor;
