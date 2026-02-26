import { useState, useRef, MouseEvent } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Category = "ALL" | "FRONTEND" | "BACKEND" | "TOOLS" | "DESIGN";

const skills: { name: string; cat: Category[]; pct: number; color: string }[] = [
  { name: "React", cat: ["FRONTEND"], pct: 95, color: "#61DAFB" },
  { name: "TypeScript", cat: ["FRONTEND", "BACKEND"], pct: 90, color: "#3178C6" },
  { name: "Next.js", cat: ["FRONTEND"], pct: 85, color: "#ffffff" },
  { name: "TailwindCSS", cat: ["FRONTEND"], pct: 92, color: "#38BDF8" },
  { name: "JavaScript", cat: ["FRONTEND"], pct: 95, color: "#F7DF1E" },
  { name: "HTML/CSS", cat: ["FRONTEND"], pct: 95, color: "#E34F26" },
  { name: "Node.js", cat: ["BACKEND"], pct: 88, color: "#68A063" },
  { name: "Python", cat: ["BACKEND"], pct: 75, color: "#3776AB" },
  { name: "Firebase", cat: ["BACKEND"], pct: 82, color: "#FFCA28" },
  { name: "PostgreSQL", cat: ["BACKEND"], pct: 78, color: "#336791" },
  { name: "MongoDB", cat: ["BACKEND"], pct: 80, color: "#47A248" },
  { name: "Git", cat: ["TOOLS"], pct: 90, color: "#F05032" },
  { name: "Docker", cat: ["TOOLS"], pct: 70, color: "#2496ED" },
  { name: "VS Code", cat: ["TOOLS"], pct: 95, color: "#007ACC" },
  { name: "Figma", cat: ["DESIGN"], pct: 80, color: "#F24E1E" },
  { name: "Framer", cat: ["DESIGN"], pct: 65, color: "#0055FF" },
];

const learning = [
  { name: "Rust", color: "#DEA584" },
  { name: "Go", color: "#00ADD8" },
  { name: "Three.js", color: "#ffffff" },
];

const tabs: Category[] = ["ALL", "FRONTEND", "BACKEND", "TOOLS", "DESIGN"];

const SkillCard = ({ s }: { s: typeof skills[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    setTilt({ x, y });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      data-hover
      className="group border border-border bg-card/50 backdrop-blur-sm p-4 hover:border-lime/30 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(200,255,0,0.1)]"
      style={{
        perspective: "400px",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2.5 h-2.5 rounded-full shadow-lg" style={{ backgroundColor: s.color, boxShadow: `0 0 8px ${s.color}40` }} />
        <span className="font-mono text-xs text-foreground">{s.name}</span>
        <span className="font-mono text-[9px] text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity">{s.pct}%</span>
      </div>
      <div className="h-1.5 bg-muted overflow-hidden">
        <div className="h-full origin-left transition-transform duration-700 scale-x-0 group-hover:scale-x-100"
          style={{ width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}80, ${s.color})` }} />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [tab, setTab] = useState<Category>("ALL");

  const filtered = tab === "ALL" ? skills : skills.filter((s) => s.cat.includes(tab));

  return (
    <section id="skills" ref={ref} className="relative py-32 px-6 md:px-10">
      <span className="absolute top-8 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/30">{"// 004 SKILLS"}</span>

      <div className="max-w-7xl mx-auto" data-reveal>
        <h2 className="font-display font-[800] text-4xl md:text-5xl border-b border-border pb-6 mb-8">TECH STACK</h2>

        <div className="flex flex-wrap gap-2 mb-10" data-reveal>
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} data-hover
              className={`font-mono text-[11px] px-4 py-2 border transition-all duration-300 ${
                tab === t
                  ? "bg-lime text-background border-lime shadow-[0_0_20px_rgba(200,255,0,0.15)]"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}>
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-16" data-reveal>
          {filtered.map((s) => (
            <SkillCard key={s.name} s={s} />
          ))}
        </div>

        <div data-reveal>
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Currently Learning</h3>
          <div className="flex flex-wrap gap-3">
            {learning.map((l) => (
              <span key={l.name} className="border border-dashed border-muted-foreground/30 px-5 py-2.5 font-mono text-xs hover:border-lime/50 transition-colors duration-300" style={{ color: l.color }}>
                {l.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
