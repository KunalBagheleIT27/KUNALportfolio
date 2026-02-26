import { useState, useRef, MouseEvent } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const projects = [
  {
    num: "01", name: "NEXUS", tagline: "AI-powered task management platform",
    metric: "3,200+ weekly users", stack: ["React", "Node.js", "OpenAI API"],
    gradient: "linear-gradient(135deg, #00D9FF 0%, #C8FF00 50%, #8B5CF6 100%)",
    problem: "Teams struggled with task prioritization across complex projects.",
    solution: "Built an AI-powered platform that auto-prioritizes and assigns tasks based on team velocity and skill matching.",
    role: "Lead Full-Stack Developer — architected the entire platform from database schema to production deployment.",
    metrics: [{ label: "Weekly Users", value: "3,200+" }, { label: "Task Completion", value: "↑ 42%" }, { label: "Response Time", value: "<200ms" }, { label: "Uptime", value: "99.9%" }],
  },
  {
    num: "02", name: "PRISM", tagline: "Real-time design collaboration tool",
    metric: "57% faster load time", stack: ["Next.js", "WebSockets", "Redis"],
    gradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #00D9FF 100%)",
    problem: "Design teams needed real-time collaboration without the overhead of traditional tools.",
    solution: "Created a WebSocket-powered canvas with conflict-free replicated data types (CRDTs) for seamless multi-user editing.",
    role: "Frontend Lead — implemented the real-time rendering engine and optimized load performance by 57%.",
    metrics: [{ label: "Load Time", value: "↓ 57%" }, { label: "Concurrent Users", value: "50+" }, { label: "Latency", value: "<16ms" }, { label: "Bundle Size", value: "↓ 40%" }],
  },
  {
    num: "03", name: "ORBIT", tagline: "Student hackathon platform for campuses",
    metric: "12 colleges onboarded", stack: ["React", "Firebase", "TailwindCSS"],
    gradient: "linear-gradient(135deg, #C8FF00 0%, #00D9FF 50%, #F97316 100%)",
    problem: "College hackathons lacked a unified platform for registration, team formation, and project submission.",
    solution: "Built a full-stack platform that streamlines the entire hackathon lifecycle from registration to judging.",
    role: "Solo Developer — designed and built the complete platform, onboarding 12 colleges in the first semester.",
    metrics: [{ label: "Colleges", value: "12" }, { label: "Students", value: "2,400+" }, { label: "Hackathons", value: "8" }, { label: "Submissions", value: "340+" }],
  },
];

const WorkSection = () => {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [modal, setModal] = useState<number | null>(null);

  return (
    <section id="work" ref={sectionRef} className="relative py-32 px-6 md:px-10">
      <span className="absolute top-8 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/30">{"// 002 WORK"}</span>

      <div className="max-w-7xl mx-auto" data-reveal>
        <div className="flex items-baseline justify-between border-b border-border pb-6 mb-12">
          <h2 className="font-display font-[800] text-4xl md:text-5xl">SELECTED WORK</h2>
          <span className="font-mono text-sm text-muted-foreground">( 3 PROJECTS )</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} onOpen={() => setModal(i)} />
        ))}
      </div>

      {modal !== null && <CaseStudyModal project={projects[modal]} onClose={() => setModal(null)} />}
    </section>
  );
};

const ProjectCard = ({ project: p, index, onOpen }: { project: typeof projects[0]; index: number; onOpen: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

  const onMouseMove = (e: MouseEvent) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const x = (py - 0.5) * -10;
    const y = (px - 0.5) * 10;
    setTilt({ x, y });
    setGlare({ x: px * 100, y: py * 100 });
  };

  return (
    <div data-reveal style={{ perspective: "800px" }}>
      <div
        ref={cardRef}
        onClick={onOpen}
        onMouseMove={onMouseMove}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setGlare({ x: 50, y: 50 }); }}
        data-hover
        className="group relative border border-border bg-card overflow-hidden transition-all duration-300 hover:border-lime hover:shadow-[0_20px_60px_-20px_rgba(200,255,0,0.15)]"
        style={{
          aspectRatio: "4/5",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.2s cubic-bezier(0.2,0.8,0.2,1), border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Glare overlay */}
        <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)` }} />

        {/* Image area */}
        <div className="relative h-[60%] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.06]" style={{ background: p.gradient }} />
          <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-all duration-500" />
          <span className="absolute top-3 right-3 font-mono text-[9px] text-lime bg-background/80 backdrop-blur-sm px-2 py-1 z-10">CASE STUDY</span>
          {/* Project number watermark */}
          <span className="absolute bottom-2 left-4 font-display font-[800] text-[80px] leading-none text-foreground/5 z-0">{p.num}</span>
        </div>

        {/* Bottom */}
        <div className="h-[40%] p-5 flex flex-col justify-between relative">
          <div>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-2xl text-lime">{p.num}</span>
              <span className="font-display font-bold text-lg">{p.name}</span>
            </div>
            <p className="text-muted-foreground text-[13px] mt-1">{p.tagline}</p>
          </div>
          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {p.stack.map((t) => <span key={t} className="border border-border px-2 py-0.5 font-mono text-[9px] text-muted-foreground">{t}</span>)}
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-lime">{p.metric}</span>
              <span className="text-muted-foreground group-hover:text-lime group-hover:translate-x-1 transition-all duration-300">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudyModal = ({ project: p, onClose }: { project: typeof projects[0]; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-auto" style={{ animation: "clip-reveal 0.4s cubic-bezier(0.2,0.8,0.2,1)" }} onClick={onClose}>
    <div className="max-w-4xl mx-auto py-20 px-6" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} data-hover className="fixed top-6 right-6 font-mono text-sm text-lime hover:text-foreground transition-colors z-50">✕ CLOSE</button>

      <span className="font-mono text-lime text-sm">{p.num}</span>
      <h2 className="font-display font-[800] text-5xl md:text-6xl mt-2 mb-2">{p.name}</h2>
      <p className="text-muted-foreground mb-10 text-lg">{p.tagline}</p>

      <div className="space-y-10">
        {[
          { label: "Problem", content: p.problem },
          { label: "Solution", content: p.solution },
          { label: "My Role", content: p.role },
        ].map((s) => (
          <div key={s.label} className="border-l-2 border-lime/30 pl-6">
            <h3 className="font-mono text-xs text-lime uppercase tracking-widest mb-2">{s.label}</h3>
            <p className="text-foreground/80 text-lg">{s.content}</p>
          </div>
        ))}

        <div>
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {p.metrics.map((m) => (
              <div key={m.label} className="border border-border bg-card/50 p-5 hover:border-lime/30 transition-colors">
                <div className="font-display font-bold text-3xl text-lime">{m.value}</div>
                <div className="font-mono text-[10px] text-muted-foreground mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {p.stack.map((t) => <span key={t} className="border border-lime/30 px-4 py-1.5 font-mono text-xs text-lime">{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WorkSection;
