import { useEffect, useState, useRef, MouseEvent } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const commands = [
  '> npm run build... ✓ compiled in 1.2s',
  '> lighthouse score: 98 / 100 🚀',
  '> git commit -m "shipped feat/portfolio"',
];

const badges = [
  { name: "React", color: "#61DAFB", anim: "orbit-1 20s linear infinite" },
  { name: "Node.js", color: "#68A063", anim: "orbit-2 25s linear infinite" },
  { name: "TypeScript", color: "#3178C6", anim: "orbit-3 22s linear infinite" },
  { name: "Figma", color: "#F24E1E", anim: "orbit-4 28s linear infinite" },
];

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [cmdIndex, setCmdIndex] = useState(0);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminalTilt, setTerminalTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const cmd = commands[cmdIndex];
    if (typing) {
      if (text.length < cmd.length) {
        const t = setTimeout(() => setText(cmd.slice(0, text.length + 1)), 40);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1500);
        return () => clearTimeout(t);
      }
    } else {
      setText("");
      setCmdIndex((i) => (i + 1) % commands.length);
      setTyping(true);
    }
  }, [text, typing, cmdIndex]);

  const onTerminalMove = (e: MouseEvent) => {
    if (!terminalRef.current) return;
    const rect = terminalRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    setTerminalTilt({ x, y });
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex items-center pt-16 pb-10 px-4 sm:px-6 md:px-10 overflow-hidden">
      <span className="absolute top-20 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/30">{"// 001 HERO"}</span>

      {/* Ambient glows */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-lime/[0.04] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-ice/[0.03] blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12 items-center">
        {/* Left */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <span className="flex items-center gap-2 font-mono text-[11px] text-lime uppercase tracking-[0.15em]">
            <span className="w-2 h-2 rounded-full bg-lime" style={{ animation: "pulse-dot 2s infinite" }} />
            Available for Opportunities
          </span>

          <h1 className="font-display font-[800] text-4xl sm:text-5xl md:text-7xl lg:text-[80px] leading-[0.95] tracking-tight">
            <span className="block" style={{ animation: "clip-reveal 0.6s cubic-bezier(0.2,0.8,0.2,1) 0.1s both" }}>BUILDING</span>
            <span className="block text-stroke" style={{ animation: "clip-reveal 0.6s cubic-bezier(0.2,0.8,0.2,1) 0.25s both" }}>DIGITAL</span>
            <span className="block" style={{ animation: "clip-reveal 0.6s cubic-bezier(0.2,0.8,0.2,1) 0.4s both" }}>EXPERIENCES</span>
          </h1>

          <p className="text-muted-foreground text-base max-w-[420px]">
            Full-Stack Developer & UI Engineer crafting interfaces that users remember.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="border border-border bg-card/80 backdrop-blur-sm px-4 py-2 font-mono text-[11px] text-muted-foreground hover:-translate-y-0.5 transition-transform duration-200">↑ 57% Load Speed Optimized</span>
            <span className="border border-border bg-card/80 backdrop-blur-sm px-4 py-2 font-mono text-[11px] text-muted-foreground hover:-translate-y-0.5 transition-transform duration-200">3K+ Weekly Active Users</span>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-2">
            <a href="#work" data-hover className="group relative bg-lime text-background font-display font-bold text-sm px-6 sm:px-7 py-3.5 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,255,0,0.3)] text-center">
              <span className="relative z-10">VIEW CASE STUDY →</span>
              <div className="absolute inset-0 bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
            <a href="#contact" data-hover className="group relative border border-foreground/50 text-foreground font-display font-bold text-sm px-6 sm:px-7 py-3.5 overflow-hidden transition-all duration-300 text-center">
              <span className="relative z-10 group-hover:text-background transition-colors duration-300">DOWNLOAD CV</span>
              <div className="absolute inset-0 bg-foreground scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          </div>
        </div>

        {/* Right - Terminal with 3D tilt */}
        <div className="lg:col-span-2 relative flex items-center justify-center min-h-[300px] sm:min-h-[350px]" style={{ perspective: "800px" }}>
          {/* Lime glow */}
          <div className="absolute w-72 h-72 rounded-full bg-lime/10 blur-[100px]" />
          <div className="absolute w-40 h-40 rounded-full bg-ice/10 blur-[60px] translate-x-20 translate-y-10" />

          {/* Terminal with 3D tilt */}
          <div
            ref={terminalRef}
            onMouseMove={(e) => !isMobile && onTerminalMove(e)}
            onMouseLeave={() => setTerminalTilt({ x: 0, y: 0 })}
            onTouchMove={(e) => {
              if (!terminalRef.current || !isMobile) return;
              const touch = e.touches[0];
              const rect = terminalRef.current.getBoundingClientRect();
              const x = ((touch.clientY - rect.top) / rect.height - 0.5) * -6;
              const y = ((touch.clientX - rect.left) / rect.width - 0.5) * 6;
              setTerminalTilt({ x, y });
            }}
            onTouchEnd={() => setTerminalTilt({ x: 0, y: 0 })}
            className="relative border border-border bg-card/80 backdrop-blur-md w-full max-w-sm p-5 shadow-[0_20px_60px_-20px_rgba(200,255,0,0.1)]"
            style={{
              animation: isMobile ? "float-slow 5s ease-in-out infinite" : "float 4s ease-in-out infinite",
              transform: isMobile
                ? `translateY(0) rotateX(${terminalTilt.x}deg) rotateY(${terminalTilt.y}deg)`
                : `rotateX(${terminalTilt.x}deg) rotateY(${terminalTilt.y}deg)`,
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28C840" }} />
              </div>
              <span className="font-mono text-[9px] text-muted-foreground ml-2">kunal@dev ~ </span>
            </div>
            <div className="font-mono text-xs text-muted-foreground min-h-[24px]">
              {text}<span className="inline-block w-[7px] h-[15px] bg-lime ml-0.5 align-middle" style={{ animation: "type-cursor 1s infinite" }} />
            </div>
            {/* Reflection/shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/[0.02] to-transparent pointer-events-none" />
          </div>

          {/* Orbiting badges with glow */}
          {badges.map((b, index) => (
            <div key={b.name} className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isMobile && index > 1 ? "hidden" : ""}`}>
              <span className="font-mono text-[9px] border px-2.5 py-1 bg-card/80 backdrop-blur-sm shadow-lg"
                style={{ borderColor: b.color, color: b.color, animation: b.anim, boxShadow: `0 0 20px ${b.color}15` }}>
                {b.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest">SCROLL</span>
        <svg width="12" height="12" viewBox="0 0 12 12" className="text-lime" style={{ animation: "bounce-down 1.5s infinite" }}>
          <path d="M1 4L6 9L11 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
