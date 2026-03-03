import { useEffect, useRef } from "react";

interface Dot {
  x: number; y: number; vx: number; vy: number; baseOpacity: number;
}

const BackgroundCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const dotCount = isMobile ? 30 : 60;

    const dots: Dot[] = Array.from({ length: dotCount }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      baseOpacity: 0.06,
    }));

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const onMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // Grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 0.5;
      const gridSize = isMobile ? 110 : 80;
      for (let x = 0; x < w; x += gridSize) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += gridSize) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

      // Dots
      const mx = mouse.current.x, my = mouse.current.y;
      const dists = dots.map((d, i) => ({ i, dist: Math.hypot(d.x - mx, d.y - my) }))
        .sort((a, b) => a.dist - b.dist);
      const nearest = new Set(dists.slice(0, 5).map(d => d.i));

      dots.forEach((d, i) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;

        const isNear = nearest.has(i);
        const opacity = isNear ? 0.15 : d.baseOpacity;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${opacity})`;
        ctx.fill();

        if (isNear) {
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(200,255,0,${0.06})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); window.removeEventListener("mousemove", onMove); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default BackgroundCanvas;
