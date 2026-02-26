import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";

const socials = [
  { name: "GitHub", href: "#", icon: <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" /> },
  { name: "LinkedIn", href: "#", icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /> },
  { name: "Twitter", href: "#", icon: <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /> },
  { name: "Dribbble", href: "#", icon: <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702A9.63 9.63 0 0012 2.006c-.825 0-1.63.105-2.4.048zm10.335 3.483c-.218.29-1.91 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" /> },
];

const ContactSection = () => {
  const ref = useScrollReveal<HTMLElement>();
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  return (
    <section id="contact" ref={ref} className="relative py-32 px-6 md:px-10 overflow-hidden">
      <span className="absolute top-8 left-6 md:left-10 font-mono text-[10px] text-muted-foreground/30">{"// 006 CONTACT"}</span>

      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-lime/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-ice/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Giant headline with 3D perspective */}
        <div data-reveal className="mb-16" style={{ perspective: "1000px" }}>
          <h2 className="font-display font-[800] text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            <span className="block" style={{ animation: "clip-reveal 0.6s cubic-bezier(0.2,0.8,0.2,1) 0.1s both" }}>
              LET'S BUILD
            </span>
            <span className="block text-stroke" style={{ animation: "clip-reveal 0.6s cubic-bezier(0.2,0.8,0.2,1) 0.25s both" }}>
              SOMETHING
            </span>
            <span className="block text-lime" style={{ animation: "clip-reveal 0.6s cubic-bezier(0.2,0.8,0.2,1) 0.4s both" }}>
              AMAZING.
            </span>
          </h2>
          <p className="text-muted-foreground mt-6 max-w-lg text-base md:text-lg">
            Open to full-time roles, freelance projects, and hackathon collaborations. Let's create something extraordinary together.
          </p>
        </div>

        {/* Contact grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" data-reveal>
          {/* Email card */}
          <div className="group relative border border-border bg-card/50 backdrop-blur-sm p-8 hover:border-lime/50 transition-all duration-500 md:col-span-2"
            style={{ perspective: "600px" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-lime/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4 block">Drop a line</span>
              <a href="mailto:hello@kunalbaghele.dev" data-hover
                className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground hover:text-lime transition-all duration-300 inline-block group-hover:translate-x-2">
                hello@kunalbaghele.dev
              </a>
              <div className="h-[2px] w-0 group-hover:w-full bg-lime/50 transition-all duration-500 mt-2" />
              <p className="font-mono text-xs text-muted-foreground mt-4">Response time: ~24 hours</p>
            </div>
          </div>

          {/* Location card */}
          <div className="group relative border border-border bg-card/50 backdrop-blur-sm p-8 hover:border-ice/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-ice/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-4 block">Based in</span>
              <p className="font-display font-bold text-2xl text-foreground mb-1">India 🇮🇳</p>
              <p className="font-mono text-xs text-muted-foreground">Available for remote work</p>
              <div className="mt-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-lime" style={{ animation: "pulse-dot 2s infinite" }} />
                <span className="font-mono text-[11px] text-lime">Currently available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Socials row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8" data-reveal>
          {socials.map((s) => (
            <a key={s.name} href={s.href} data-hover aria-label={s.name}
              onMouseEnter={() => setHoveredSocial(s.name)}
              onMouseLeave={() => setHoveredSocial(null)}
              className="group relative h-20 border border-border bg-card/30 flex items-center justify-center gap-3 hover:bg-lime hover:border-lime transition-all duration-300 overflow-hidden"
              style={{ perspective: "400px" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-lime/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-foreground group-hover:fill-background transition-colors relative z-10">{s.icon}</svg>
              <span className="font-mono text-xs text-foreground group-hover:text-background transition-colors relative z-10">{s.name}</span>
              {/* 3D shine on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
          ))}
        </div>

        {/* Resume button - full width, 3D feel */}
        <div data-reveal style={{ perspective: "600px" }}>
          <a href="#" data-hover
            className="group relative block w-full border border-lime text-lime font-display font-bold text-center py-5 text-lg overflow-hidden transition-all duration-300 hover:text-background hover:shadow-[0_0_40px_rgba(200,255,0,0.15)]">
            <div className="absolute inset-0 bg-lime scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            <span className="relative z-10 flex items-center justify-center gap-3">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              DOWNLOAD RESUME [PDF]
            </span>
          </a>
        </div>

        {/* Decorative floating elements */}
        <div className="absolute -top-10 -right-10 w-20 h-20 border border-lime/10 rotate-45" style={{ animation: "float-slow 6s ease-in-out infinite" }} />
        <div className="absolute -bottom-10 -left-10 w-16 h-16 border border-ice/10 rotate-12" style={{ animation: "float 5s ease-in-out infinite" }} />
      </div>
    </section>
  );
};

export default ContactSection;
