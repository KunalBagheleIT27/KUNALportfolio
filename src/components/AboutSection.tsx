import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRef, useState, MouseEvent } from "react";

const timeline = [
  { year: "2022", title: "Started Coding Journey", desc: "Discovered web development and fell in love with building for the browser." },
  { year: "2023", title: "First Open Source Contribution", desc: "First freelance project & contributed to open-source repositories." },
  { year: "2024", title: "Won Smart India Hackathon", desc: "GDSC Lead · SIH 2024 Winner · Built production-grade applications." },
  { year: "2025", title: "Building the Future", desc: "National hackathon portfolio · Exploring AI/ML integration in web apps." },
];

const AboutSection = () => {
  const ref = useScrollReveal<HTMLElement>();
  const photoRef = useRef<HTMLDivElement>(null);
  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });

  const onPhotoMove = (e: MouseEvent) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    setPhotoTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -8,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
    });
  };

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 md:px-10">
      <span className="absolute top-8 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/30">{"// 003 ABOUT"}</span>

      <div className="max-w-7xl mx-auto space-y-20">
        {/* Top: Photo left + About info right */}
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 lg:gap-16 items-start" data-reveal>
          {/* Left - Photo with 3D tilt */}
          <div
            ref={photoRef}
            onMouseMove={onPhotoMove}
            onMouseLeave={() => setPhotoTilt({ x: 0, y: 0 })}
            className="relative group w-full max-w-[300px]"
            style={{ perspective: "600px" }}
          >
            <div className="absolute inset-0 border border-lime translate-x-2 translate-y-2 transition-transform duration-300 group-hover:translate-x-3 group-hover:translate-y-3" />
            <div
              className="relative aspect-[3/4] bg-muted border border-muted-foreground/20 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]"
              style={{
                transform: `rotateX(${photoTilt.x}deg) rotateY(${photoTilt.y}deg)`,
                transition: "transform 0.15s ease-out, filter 0.5s",
              }}
            >
              <div className="absolute inset-0 bg-lime/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-color" />
              <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-5xl text-muted-foreground/20">KB</div>
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
