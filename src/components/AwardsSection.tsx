import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRef, useState, MouseEvent } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const awards = [
  { emoji: "🏆", name: "Smart India Hackathon 2024", issuer: "Government of India", year: "2024", desc: "National-level winner among 50,000+ participants" },
  { emoji: "🥇", name: "HackWithIndia — 1st Place", issuer: "UI Innovation Track", year: "2024", desc: "Best UI/UX implementation across all submissions" },
  { emoji: "🎖️", name: "Google DSC Lead", issuer: "Google Developer Student Clubs", year: "2024", desc: "Selected to lead campus developer community" },
];

const marqueeItems = [
  "🏆 SIH 2024 Winner", "🥇 HackWithIndia 1st Place", "🎖️ GDSC Lead",
  "💻 10+ Projects Shipped", "🌍 Open Source Contributor", "⚡ 98 Lighthouse Score",
  "🏆 SIH 2024 Winner", "🥇 HackWithIndia 1st Place", "🎖️ GDSC Lead",
  "💻 10+ Projects Shipped", "🌍 Open Source Contributor", "⚡ 98 Lighthouse Score",
];

const AwardCard = ({ a }: { a: typeof awards[0] }) => {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - rect.top) / rect.height - 0.5) * -8,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 8,
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={(e) => !isMobile && onMove(e)}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onTouchMove={(e) => {
        if (!ref.current || !isMobile) return;
        const touch = e.touches[0];
        const rect = ref.current.getBoundingClientRect();
        setTilt({
          x: ((touch.clientY - rect.top) / rect.height - 0.5) * -5,
          y: ((touch.clientX - rect.left) / rect.width - 0.5) * 5,
        });
      }}
      onTouchEnd={() => setTilt({ x: 0, y: 0 })}
      data-hover
      data-reveal
      className="group border border-border bg-card/50 backdrop-blur-sm p-6 sm:p-8 hover:border-lime/50 transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(200,255,0,0.1)]"
      style={{
        perspective: "600px",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s",
        animation: undefined,
      }}
    >
      <div className="relative">
        <span className="text-5xl mb-5 block">{a.emoji}</span>
        <h3 className="font-display font-bold text-lg mb-1">{a.name}</h3>
        <p className="font-mono text-[10px] text-muted-foreground mb-3">{a.issuer} · {a.year}</p>
        <p className="text-sm text-muted-foreground">{a.desc}</p>
        {/* Subtle glow */}
        <div className="absolute -top-4 -right-4 w-16 h-16 bg-lime/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
};

const AwardsSection = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="awards" ref={ref} className="relative py-20 md:py-32">
      <span className="absolute top-8 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/30">{"// 005 AWARDS"}</span>

      {/* Marquee with depth */}
      <div className="overflow-hidden border-y border-border py-5 mb-16 group relative" data-reveal>
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]" style={{ animation: "marquee 20s linear infinite" }}>
          {marqueeItems.map((item, i) => (
            <span key={i} className="font-mono text-sm text-muted-foreground px-5 py-2 border border-border shrink-0 hover:border-lime/30 hover:text-foreground transition-colors">{item}</span>
          ))}
        </div>
      </div>

      {/* Award cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" data-reveal>
        {awards.map((a) => (
          <AwardCard key={a.name} a={a} />
        ))}
      </div>
    </section>
  );
};

export default AwardsSection;
