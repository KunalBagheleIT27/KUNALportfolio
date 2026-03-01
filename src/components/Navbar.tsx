import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const sections = ["home", "work", "about", "skills", "contact"];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const mobileMenu = menuOpen ? (
    <div className="fixed inset-x-0 top-14 bottom-0 bg-background z-[10002] md:hidden overflow-y-auto border-t border-border">
      <div className="min-h-full flex flex-col px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="font-mono text-xs uppercase tracking-wider text-lime border border-lime/40 px-3 py-1.5"
            aria-label="Close menu"
            data-hover
          >
            Close ✕
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {sections.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className="text-left font-display text-3xl sm:text-4xl font-bold text-foreground hover:text-lime transition-colors"
              data-hover
            >
              {s.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border/70 flex flex-col gap-4">
          <span className="flex items-center gap-2 w-fit border border-lime/50 rounded-full px-3 py-1 font-mono text-[10px] text-lime uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-lime" style={{ animation: "pulse-dot 2s infinite" }} />
            Open to Work
          </span>
          <button
            onClick={() => scrollTo("contact")}
            className="w-full border border-foreground/50 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background transition-all duration-200 text-left"
            data-hover
          >
            Contact / Resume ↗
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
    <nav className="fixed top-0 left-0 w-full h-14 z-[10001] border-b border-border bg-background/85 backdrop-blur-xl flex items-center px-6 md:px-10" role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <button onClick={() => scrollTo("home")} className="w-8 h-8 border border-lime flex items-center justify-center font-display font-bold text-lime text-xs" aria-label="Go to top" data-hover>
        KB
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-8 mx-auto">
        {sections.map((s) => (
          <button key={s} onClick={() => scrollTo(s)} data-hover
            className={`relative font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 ${active === s ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            aria-label={`Navigate to ${s}`}
          >
            {s}
            <span className={`absolute -bottom-1 left-0 h-[2px] bg-lime transition-transform duration-200 origin-left ${active === s ? "w-full scale-x-100" : "w-full scale-x-0 hover:scale-x-100"}`} />
          </button>
        ))}
      </div>

      {/* Right Side */}
      <div className="hidden md:flex items-center gap-4 ml-auto">
        <span className="flex items-center gap-2 border border-lime/50 rounded-full px-3 py-1 font-mono text-[10px] text-lime uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-lime" style={{ animation: "pulse-dot 2s infinite" }} />
          Open to Work
        </span>
        <a href="#contact" data-hover className="border border-foreground/50 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background transition-all duration-200">
          Resume ↗
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-auto flex flex-col gap-1.5 w-6" aria-label="Toggle menu" data-hover>
        <span className={`h-[1.5px] w-full bg-foreground transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[4.5px]" : ""}`} />
        <span className={`h-[1.5px] w-full bg-foreground transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`h-[1.5px] w-full bg-foreground transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
      </button>

    </nav>
    {typeof document !== "undefined" ? createPortal(mobileMenu, document.body) : null}
    </>
  );
};

export default Navbar;
