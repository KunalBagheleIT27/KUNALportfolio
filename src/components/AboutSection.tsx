import { useScrollReveal } from "@/hooks/useScrollReveal";

const timeline = [
  { year: "2022", title: "Started Coding Journey", desc: "Discovered web development and fell in love with building for the browser." },
  { year: "2023", title: "First Open Source Contribution", desc: "First freelance project & contributed to open-source repositories." },
  { year: "2024", title: "Won Smart India Hackathon", desc: "GDSC Lead · SIH 2024 Winner · Built production-grade applications." },
  { year: "2025", title: "Building the Future", desc: "National hackathon portfolio · Exploring AI/ML integration in web apps." },
];

const AboutSection = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 md:px-10">
      <span className="absolute top-8 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/30">{"// 003 ABOUT"}</span>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
        {/* Left - Photo + Statement */}
        <div className="lg:col-span-2 flex flex-col gap-8" data-reveal>
          {/* Photo placeholder */}
          <div className="relative group w-full max-w-xs">
            <div className="absolute inset-0 border border-lime translate-x-1 translate-y-1" />
            <div className="relative aspect-[3/4] bg-muted border border-muted-foreground/20 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
              <div className="absolute inset-0 bg-lime/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-color" />
              <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-4xl text-muted-foreground/20">KB</div>
            </div>
          </div>

          <div>
            <p className="text-foreground/80 mb-6 leading-relaxed">
              I'm Kunal — a developer obsessed with the intersection of engineering precision and design intuition. 
              Every line of code I write is in service of experiences that feel inevitable.
            </p>
            <div className="font-mono text-xs text-muted-foreground space-y-1.5">
              <p>{">"} Currently obsessed with: Web animations</p>
              <p>{">"} Side quest: Contributing to OSS</p>
              <p>{">"} When not coding: Photography 📷</p>
              <p>{">"} Location: India 🇮🇳</p>
            </div>
          </div>
        </div>

        {/* Right - Timeline */}
        <div className="lg:col-span-3" data-reveal>
          <h2 className="font-display font-[800] text-4xl md:text-5xl border-b border-border pb-6 mb-10">JOURNEY</h2>

          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-border" />

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
    <div ref={ref} className="relative mb-12 last:mb-0">
      {/* Dot */}
      <div className="absolute -left-8 top-1.5 w-[14px] h-[14px] rounded-full border-2 border-lime bg-background" />
      <span className="font-mono text-sm text-lime mb-1 block">{item.year}</span>
      <h3 className="font-display font-bold text-lg text-foreground">{item.title}</h3>
      <p className="text-muted-foreground text-sm mt-1">{item.desc}</p>
    </div>
  );
};

export default AboutSection;
