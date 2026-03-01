import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRef, useState, MouseEvent, type PointerEvent } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type FloatingBit = {
  id: string;
  x: number;
  y: number;
  size: number;
  bg: string;
  border?: string;
  radius: string;
  animation: string;
  delay: string;
};

const timeline = [
  { year: "2022", title: "Started Coding Journey", desc: "Discovered web development and fell in love with building for the browser." },
  { year: "2023", title: "First Open Source Contribution", desc: "First freelance project & contributed to open-source repositories." },
  { year: "2024", title: "Won Smart India Hackathon", desc: "GDSC Lead · SIH 2024 Winner · Built production-grade applications." },
  { year: "2025", title: "Building the Future", desc: "National hackathon portfolio · Exploring AI/ML integration in web apps." },
];

const AboutSection = () => {
  const isMobile = useIsMobile();
  const ref = useScrollReveal<HTMLElement>();
  const photoRef = useRef<HTMLDivElement>(null);
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });
  const [draggingBit, setDraggingBit] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [floatingBits, setFloatingBits] = useState<FloatingBit[]>([
    {
      id: "lime-1",
      x: 18,
      y: 14,
      size: 26,
      bg: "#C8FF00",
      radius: "9999px",
      animation: "float 3.8s ease-in-out infinite",
      delay: "0s",
    },
    {
      id: "lime-2",
      x: 52,
      y: 20,
      size: 44,
      bg: "transparent",
      border: "1px solid #C8FF00",
      radius: "9999px",
      animation: "float-slow 5.2s ease-in-out infinite",
      delay: "0.2s",
    },
    {
      id: "purple",
      x: 16,
      y: 196,
      size: 32,
      bg: "#8B5CF6",
      radius: "6px",
      animation: "float-slow 4.8s ease-in-out infinite",
      delay: "0.35s",
    },
    {
      id: "cyan",
      x: 238,
      y: 258,
      size: 34,
      bg: "#00D9FF",
      radius: "9999px",
      animation: "float 4.2s ease-in-out infinite",
      delay: "0.1s",
    },
  ]);

  const onPhotoMove = (e: MouseEvent) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    setPhotoTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -8,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
    });
  };

  const onBitPointerDown = (e: PointerEvent<HTMLButtonElement>, bitId: string) => {
    if (!photoRef.current) return;
    const bit = floatingBits.find((item) => item.id === bitId);
    if (!bit) return;

    const rect = photoRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - (rect.left + bit.x),
      y: e.clientY - (rect.top + bit.y),
    };

    setDraggingBit(bitId);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onBitPointerMove = (e: PointerEvent<HTMLButtonElement>) => {
    if (!draggingBit || !photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();

    setFloatingBits((prev) =>
      prev.map((bit) => {
        if (bit.id !== draggingBit) return bit;

        const nextXRaw = e.clientX - rect.left - dragOffset.current.x;
        const nextYRaw = e.clientY - rect.top - dragOffset.current.y;
        const nextX = Math.max(0, Math.min(rect.width - bit.size, nextXRaw));
        const nextY = Math.max(0, Math.min(rect.height - bit.size, nextYRaw));

        return { ...bit, x: nextX, y: nextY };
      }),
    );
  };

  const onBitPointerUp = (e: PointerEvent<HTMLButtonElement>) => {
    if (draggingBit) {
      setDraggingBit(null);
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <section id="about" ref={ref} className="relative py-20 md:py-32 px-4 sm:px-6 md:px-10">
      <span className="absolute top-8 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/30">{"// 003 ABOUT"}</span>

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Top: Photo left + About info right */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start" data-reveal>
          {/* Left - Photo with 3D tilt */}
          <div
            ref={photoRef}
            onMouseMove={(e) => !isMobile && onPhotoMove(e)}
            onMouseLeave={() => setPhotoTilt({ x: 0, y: 0 })}
            onTouchMove={(e) => {
              if (!photoRef.current || !isMobile) return;
              const touch = e.touches[0];
              const rect = photoRef.current.getBoundingClientRect();
              setPhotoTilt({
                x: ((touch.clientY - rect.top) / rect.height - 0.5) * -6,
                y: ((touch.clientX - rect.left) / rect.width - 0.5) * 6,
              });
            }}
            onTouchEnd={() => setPhotoTilt({ x: 0, y: 0 })}
            className="relative group w-full max-w-[300px]"
            style={{ perspective: "600px" }}
          >
            <div className="absolute inset-0 border border-lime translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
            <div
              className="relative aspect-[3/4] bg-muted border border-muted-foreground/20 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
              style={{
                transform: `rotateX(${photoTilt.x}deg) rotateY(${photoTilt.y}deg)`,
                transition: "transform 0.15s ease-out, filter 0.5s",
                animation: isMobile ? "float-slow 5s ease-in-out infinite" : undefined,
              }}
            >
              <div className="absolute inset-0 bg-lime/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-color" />
              {floatingBits.map((bit) => (
                <button
                  key={bit.id}
                  type="button"
                  onPointerDown={(e) => onBitPointerDown(e, bit.id)}
                  onPointerMove={onBitPointerMove}
                  onPointerUp={onBitPointerUp}
                  className="absolute z-20 border-0 p-0 cursor-grab active:cursor-grabbing"
                  aria-label={`${bit.id} floating element`}
                  style={{
                    left: bit.x,
                    top: bit.y,
                    width: bit.size,
                    height: bit.size,
                    borderRadius: bit.radius,
                    background: bit.bg,
                    border: bit.border,
                    boxShadow: bit.bg === "transparent" ? "none" : "0 0 20px rgba(0,0,0,0.25)",
                    animation: draggingBit === bit.id ? "none" : bit.animation,
                    animationDelay: bit.delay,
                    touchAction: "none",
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <svg viewBox="0 0 220 280" className="w-full h-full" role="img" aria-label="Cartoon avatar">
                  <rect x="0" y="0" width="220" height="280" fill="transparent" />
                  <circle cx="110" cy="92" r="46" fill="#f4c9a6" />
                  <path d="M64 92c0-30 20-52 46-52s46 22 46 52c-12-10-24-14-46-14s-34 4-46 14z" fill="#141414" />
                  <circle cx="93" cy="96" r="4" fill="#111" />
                  <circle cx="127" cy="96" r="4" fill="#111" />
                  <path d="M96 116c6 8 22 8 28 0" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <rect x="72" y="146" width="76" height="96" rx="14" fill="#1d1d1d" />
                  <rect x="82" y="160" width="56" height="10" rx="5" fill="#C8FF00" opacity="0.9" />
                  <rect x="90" y="178" width="40" height="8" rx="4" fill="#2a2a2a" />
                  <rect x="90" y="192" width="40" height="8" rx="4" fill="#2a2a2a" />
                  <circle cx="58" cy="54" r="8" fill="#C8FF00" opacity="0.8" />
                  <circle cx="165" cy="210" r="10" fill="#00D9FF" opacity="0.65" />
                  <rect x="36" y="170" width="20" height="20" rx="4" fill="#8B5CF6" opacity="0.65" />
                </svg>
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.04] to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right - About data */}
          <div className="flex flex-col gap-6">
            <h2 className="font-display font-[800] text-4xl md:text-5xl border-b border-border pb-4">ABOUT ME</h2>
            <p className="text-foreground/80 leading-relaxed max-w-xl text-lg">
              I'm Kunal — a developer obsessed with the intersection of engineering precision and design intuition.
              Every line of code I write is in service of experiences that feel inevitable.
            </p>
            <p className="text-muted-foreground leading-relaxed max-w-xl">
              Full-Stack Developer & UI Engineer based in India, passionate about crafting interfaces that users remember.
              I thrive in hackathons, open-source communities, and building products that push boundaries.
            </p>
            <div className="font-mono text-xs text-muted-foreground space-y-2 mt-2 bg-card/50 border border-border p-5 backdrop-blur-sm">
              <p><span className="text-lime">{">"}</span> Currently obsessed with: <span className="text-foreground">Web animations</span></p>
              <p><span className="text-lime">{">"}</span> Side quest: <span className="text-foreground">Contributing to OSS</span></p>
              <p><span className="text-lime">{">"}</span> When not coding: <span className="text-foreground">Photography 📷</span></p>
              <p><span className="text-lime">{">"}</span> Location: <span className="text-foreground">India 🇮🇳</span></p>
            </div>
          </div>
        </div>

        {/* Bottom: Timeline */}
        <div data-reveal>
          <h2 className="font-display font-[800] text-4xl md:text-5xl border-b border-border pb-6 mb-10">JOURNEY</h2>

          <div className="relative pl-8">
            <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-gradient-to-b from-lime/50 via-lime/20 to-transparent" />
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }: { item: typeof timeline[0]; index: number }) => {
  const ref = useScrollReveal<HTMLDivElement>(0);

  return (
    <div ref={ref} className="relative mb-14 last:mb-0 group">
      <div className="absolute -left-8 top-1.5 w-[14px] h-[14px] rounded-full border-2 border-lime bg-background shadow-[0_0_10px_rgba(200,255,0,0.2)] group-hover:shadow-[0_0_20px_rgba(200,255,0,0.4)] transition-shadow" />
      <span className="font-mono text-sm text-lime mb-1 block">{item.year}</span>
      <h3 className="font-display font-bold text-xl text-foreground">{item.title}</h3>
      <p className="text-muted-foreground text-sm mt-1 max-w-lg">{item.desc}</p>
    </div>
  );
};

export default AboutSection;
