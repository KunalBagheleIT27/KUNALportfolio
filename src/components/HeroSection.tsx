import { useEffect, useState } from "react";

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
  const [cmdIndex, setCmdIndex] = useState(0);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(true);

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

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-14 px-6 md:px-10 overflow-hidden">
      <span className="absolute top-20 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/30">{"// 001 HERO"}</span>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        {/* Left */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <span className="flex items-center gap-2 font-mono text-[11px] text-lime uppercase tracking-[0.15em]">
            <span className="w-2 h-2 rounded-full bg-lime" style={{ animation: "pulse-dot 2s infinite" }} />
            Available for Opportunities
          </span>

          <h1 className="font-display font-[800] text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.95] tracking-tight">
            <span className="block" style={{ animation: "clip-reveal 0.6s cubic-bezier(0.2,0.8,0.2,1) 0.1s both" }}>BUILDING</span>
            <span className="block text-stroke" style={{ animation: "clip-reveal 0.6s cubic-bezier(0.2,0.8,0.2,1) 0.25s both" }}>DIGITAL</span>
            <span className="block" style={{ animation: "clip-reveal 0.6s cubic-bezier(0.2,0.8,0.2,1) 0.4s both" }}>EXPERIENCES</span>
          </h1>

          <p className="text-muted-foreground text-base max-w-[420px]">
            Full-Stack Developer & UI Engineer crafting interfaces that users remember.
          </p>

          <div className="flex flex-wrap gap-3">
            <span className="border border-border bg-card px-3 py-1.5 font-mono text-[11px] text-muted-foreground">↑ 57% Load Speed Optimized</span>
            <span className="border border-border bg-card px-3 py-1.5 font-mono text-[11px] text-muted-foreground">3K+ Weekly Active Users</span>
          </div>

          <div className="flex flex-wrap gap-4 mt-2">
            <a href="#work" data-hover className="bg-lime text-background font-display font-bold text-sm px-6 py-3 hover:scale-[1.03] hover:shadow-[0_0_24px_rgba(200,255,0,0.25)] transition-all duration-200">
              VIEW CASE STUDY →
            </a>
            <a href="#contact" data-hover className="border border-foreground/50 text-foreground font-display font-bold text-sm px-6 py-3 hover:bg-foreground hover:text-background transition-all duration-200">
              DOWNLOAD CV
            </a>
          </div>
        </div>

        {/* Right - Terminal */}
        <div className="lg:col-span-2 relative flex items-center justify-center min-h-[350px]">
          {/* Lime glow */}
          <div className="absolute w-64 h-64 rounded-full bg-lime/10 blur-[80px]" />

          {/* Terminal */}
          <div className="relative border border-border bg-card w-full max-w-sm p-4" style={{ animation: "float 4s ease-in-out infinite" }}>
            <div className="flex gap-1.5 mb-4">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FF5F57" }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#28C840" }} />
            </div>
            <div className="font-mono text-xs text-muted-foreground min-h-[20px]">
              {text}<span className="inline-block w-[6px] h-[14px] bg-lime ml-0.5 align-middle" style={{ animation: "type-cursor 1s infinite" }} />
            </div>
          </div>

          {/* Orbiting badges */}
          {badges.map((b) => (
            <div key={b.name} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-mono text-[9px] border px-2 py-0.5 bg-card" style={{ borderColor: b.color, color: b.color, animation: b.anim }}>
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
