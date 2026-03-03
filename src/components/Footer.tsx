const Footer = () => (
  <footer className="relative border-t border-border px-4 sm:px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
    <div className="absolute inset-0 bg-gradient-to-t from-lime/[0.02] to-transparent pointer-events-none" />
    <span className="font-mono text-[11px] text-muted-foreground/50 relative">© 2025 Kunal Baghele. Crafted with obsession.</span>
    <div className="flex items-center gap-3 relative">
      <span className="w-1.5 h-1.5 rounded-full bg-lime/50" />
      <span className="font-mono text-[11px] text-muted-foreground/50">BUILT WITH React + TailwindCSS</span>
    </div>
  </footer>
);

export default Footer;
