import { useScrollReveal } from "@/hooks/useScrollReveal";

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

const AwardsSection = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="relative py-32">
      <span className="absolute top-8 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/30">{"// 005 AWARDS"}</span>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border py-4 mb-16 group" data-reveal>
        <div className="flex gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]" style={{ animation: "marquee 20s linear infinite" }}>
          {marqueeItems.map((item, i) => (
            <span key={i} className="font-mono text-sm text-muted-foreground px-4 py-1 border border-border shrink-0">{item}</span>
          ))}
        </div>
      </div>

      {/* Award cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-6" data-reveal>
        {awards.map((a) => (
          <div key={a.name} className="border border-border bg-card p-6 hover:border-lime hover:-translate-y-1 transition-all duration-300" data-hover data-reveal>
            <span className="text-4xl mb-4 block">{a.emoji}</span>
            <h3 className="font-display font-bold text-lg mb-1">{a.name}</h3>
            <p className="font-mono text-[10px] text-muted-foreground mb-3">{a.issuer} · {a.year}</p>
            <p className="text-sm text-muted-foreground">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AwardsSection;
