import { useState, useRef, MouseEvent, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIsMobile } from "@/hooks/use-mobile";

const projects = [
  {
    num: "01", name: "NiyoganAI", tagline: "AI Metro Scheduler",
    metric: "25 Trainsets Optimized", stack: ["React.js", "CSS3", "PostgreSQL", "FastAPI"],
    visualTag: "AI / OPERATIONS",
    demoUrl: "#contact",
    codeUrl: "https://github.com/KunalBagheleIT27",
    gradient: "linear-gradient(135deg, #0F2D33 0%, #18C26E 100%)",
    description:
      "AI-driven Operations Dashboard for Kochi Metro Rail Limited (KMRL) to automate and optimize daily train scheduling for a fleet of 25 trainsets, improving operational visibility and decision-making efficiency.",
    highlights: [
      "Engineered dynamic frontend using React.js with real-time fleet data via REST API + PostgreSQL",
      "Built color-coded status monitoring, dynamic issue tracking, performance-focused UI",
      "Automated scheduling for 25+ trainsets, improving supervisor workflow efficiency",
    ],
    metrics: [
      { label: "Trainsets", value: "25+" },
      { label: "Status Visibility", value: "Real-Time" },
      { label: "Decision Support", value: "AI-Driven" },
      { label: "Ops Workflow", value: "Optimized" },
    ],
  },
  {
    num: "02", name: "DocuFlow", tagline: "Document Workflow Platform",
    metric: "3-Tier Role System", stack: ["React.js", "Vite", "TypeScript", "Spring Boot", "MongoDB"],
    visualTag: "ENTERPRISE / SAAS",
    demoUrl: "#contact",
    codeUrl: "https://github.com/KunalBagheleIT27",
    gradient: "linear-gradient(135deg, #6D28D9 0%, #DB2777 55%, #1E1B4B 100%)",
    description:
      "Product-grade Document Workflow Platform enabling teams to upload, review, and approve documents with Role-Based Workflows (Submitter/Reviewer/Approver) with audit-friendly metadata tracking.",
    highlights: [
      "Role-Based Access: Submitter / Reviewer / Approver with full document lifecycle management",
      "React + Vite (TypeScript) frontend with Mock API, task inbox, template management",
      "Spring Boot backend + MongoDB for full-stack scalability, Approve/Reject actions, dashboard analytics",
    ],
    metrics: [
      { label: "Role Layers", value: "3" },
      { label: "Workflow", value: "End-to-End" },
      { label: "Backend", value: "Spring Boot" },
      { label: "Database", value: "MongoDB" },
    ],
  },
  {
    num: "03", name: "CollegeSpace", tagline: "Campus Automation Android App",
    metric: "Team of 6 Led", stack: ["XML", "Java"],
    visualTag: "ANDROID / MOBILE",
    year: "2024",
    demoUrl: "#contact",
    codeUrl: "https://github.com/KunalBagheleIT27",
    gradient: "linear-gradient(135deg, #EA580C 0%, #F59E0B 55%, #1A1A1A 100%)",
    description:
      "All-in-one Android app for campus automation, managing store, hostel, and communication between students and faculty.",
    highlights: [
      "Led a team of 6 members as project leader across development and testing phases",
      "Built complete campus ecosystem: store, hostel, student-faculty communication",
      "Conducted full manual testing ensuring bug-free, seamless UX",
    ],
    metrics: [
      { label: "Year", value: "2024" },
      { label: "Team Led", value: "6" },
      { label: "Platform", value: "Android" },
      { label: "Coverage", value: "Campus Ops" },
    ],
  },
];

const WorkSection = () => {
  const isMobile = useIsMobile();
  const sectionRef = useScrollReveal<HTMLElement>();
  const [modal, setModal] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = modal !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);

  useEffect(() => {
    const openFromHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#project-(\d+)$/);
      if (!match) return;
      const idx = Number(match[1]) - 1;
      if (idx >= 0 && idx < projects.length) {
        setModal(idx);
      }
    };

    const onPopState = () => {
      const hash = window.location.hash;
      if (!hash.startsWith("#project-")) {
        setModal(null);
      } else {
        openFromHash();
      }
    };

    openFromHash();
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const openModal = (index: number) => {
    setModal(index);
    window.history.pushState({ project: index }, "", `#project-${index + 1}`);
  };

  const closeModal = () => {
    if (window.location.hash.startsWith("#project-")) {
      window.history.back();
      return;
    }
    setModal(null);
  };

  return (
    <section id="work" ref={sectionRef} className="relative py-20 md:py-32 px-4 sm:px-6 md:px-10">
      <span className="absolute top-8 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/30">{"// 002 WORK"}</span>

      <div className="max-w-7xl mx-auto" data-reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-6 mb-12">
          <h2 className="font-display font-[800] text-3xl sm:text-4xl md:text-5xl">SELECTED WORK</h2>
          <span className="font-mono text-xs sm:text-sm text-muted-foreground">( 3 PROJECTS )</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} onOpen={() => openModal(i)} isMobile={isMobile} />
        ))}
      </div>

      {modal !== null && <CaseStudyModal project={projects[modal]} onClose={closeModal} />}
    </section>
  );
};

const ProjectCard = ({ project: p, index, onOpen, isMobile }: { project: typeof projects[0]; index: number; onOpen: () => void; isMobile: boolean }) => {
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
        onMouseMove={(e) => !isMobile && onMouseMove(e)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setGlare({ x: 50, y: 50 }); }}
        onTouchMove={(e) => {
          if (!cardRef.current || !isMobile) return;
          const touch = e.touches[0];
          const rect = cardRef.current.getBoundingClientRect();
          const px = (touch.clientX - rect.left) / rect.width;
          const py = (touch.clientY - rect.top) / rect.height;
          const x = (py - 0.5) * -6;
          const y = (px - 0.5) * 6;
          setTilt({ x, y });
          setGlare({ x: px * 100, y: py * 100 });
        }}
        onTouchEnd={() => { setTilt({ x: 0, y: 0 }); setGlare({ x: 50, y: 50 }); }}
        data-hover
        className="group relative border border-border bg-card overflow-hidden transition-all duration-300 hover:border-lime hover:shadow-[0_20px_60px_-20px_rgba(200,255,0,0.15)]"
        style={{
          aspectRatio: "4/5",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.2s cubic-bezier(0.2,0.8,0.2,1), border-color 0.3s, box-shadow 0.3s",
          animation: undefined,
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
          <span className="absolute top-3 left-3 font-mono text-[9px] text-background bg-foreground/70 backdrop-blur-sm px-2 py-1 z-10">{p.visualTag}</span>

          <div className="absolute left-4 right-4 top-12 z-10 border border-foreground/20 bg-background/40 backdrop-blur-sm p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="w-2 h-2 rounded-full bg-lime" />
              <span className="w-2 h-2 rounded-full bg-foreground/40" />
              <span className="w-2 h-2 rounded-full bg-foreground/25" />
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full bg-foreground/20" />
              <div className="h-1.5 w-4/5 bg-foreground/30" />
              <div className="h-1.5 w-2/3 bg-lime/70" />
            </div>
          </div>
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

const CaseStudyModal = ({ project: p, onClose }: { project: typeof projects[0]; onClose: () => void }) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
  <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md overflow-auto" style={{ animation: "clip-reveal 0.4s cubic-bezier(0.2,0.8,0.2,1)" }} onClick={onClose}>
    <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6" onClick={(e) => e.stopPropagation()}>
      <div className="fixed top-4 left-4 right-4 flex items-center justify-between z-50 gap-3">
        <button onClick={onClose} data-hover className="font-mono text-xs sm:text-sm text-lime hover:text-foreground transition-colors border border-lime/40 px-3 py-1.5">← BACK</button>
        <button onClick={onClose} data-hover className="font-mono text-xs sm:text-sm text-lime hover:text-foreground transition-colors border border-lime/40 px-3 py-1.5">✕ CLOSE</button>
      </div>

      <span className="font-mono text-lime text-sm">{p.num}</span>
      <h2 className="font-display font-[800] text-3xl sm:text-5xl md:text-6xl mt-2 mb-2">{p.name}</h2>
      <p className="text-muted-foreground mb-10 text-base sm:text-lg">{p.tagline}</p>
      {p.year ? <p className="font-mono text-xs text-muted-foreground -mt-8 mb-8">Year: {p.year}</p> : null}

      <div className="space-y-10">
        <div className="border-l-2 border-lime/30 pl-6">
          <h3 className="font-mono text-xs text-lime uppercase tracking-widest mb-2">Overview</h3>
          <p className="text-foreground/80 text-base sm:text-lg">{p.description}</p>
        </div>

        <div>
          <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4">Highlights</h3>
          <ul className="space-y-3">
            {p.highlights.map((item) => (
              <li key={item} className="flex gap-3 text-foreground/85 text-sm sm:text-base">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

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

        <div className="flex flex-wrap gap-3 pt-2">
          <a href={p.demoUrl} data-hover className="border border-lime px-4 py-2 font-mono text-xs text-lime hover:bg-lime hover:text-background transition-colors">LIVE PREVIEW ↗</a>
          <a href={p.codeUrl} target="_blank" rel="noreferrer" data-hover className="border border-foreground/40 px-4 py-2 font-mono text-xs text-foreground hover:bg-foreground hover:text-background transition-colors">VIEW CODE ↗</a>
          <button onClick={onClose} data-hover className="border border-border px-4 py-2 font-mono text-xs text-muted-foreground hover:text-foreground transition-colors">BACK TO PROJECTS</button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default WorkSection;
