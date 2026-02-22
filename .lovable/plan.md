

# 🚀 Kunal Baghele — Hackathon-Winning Developer Portfolio

A dark, kinetic, editorial single-page portfolio with "Digital Brutalism meets Kinetic Typography" aesthetics. No backend — pure frontend SPA.

---

## 🎨 Phase 1: Design Foundation & Global Setup
- Update CSS variables: near-black bg (#050505), Electric Lime (#C8FF00), Ice Blue (#00D9FF), surface (#0F0F0F), muted text (#888)
- Import Space Grotesk (400/700/800) + JetBrains Mono from Google Fonts in index.html
- Set permanent dark mode — no toggle needed
- Add SVG noise texture overlay at 3% opacity across entire page
- Define custom animation keyframes (clip-path reveals, float, marquee, bounce)

## 🖱️ Phase 2: Global Interactive Elements
- **Custom cursor**: Lime dot (8px) + hollow circle follower (32px) with lerp smoothing, expands on hover over interactive elements
- **Background canvas**: Full-page canvas with ~60 drifting dots, faint grid lines, mouse-reactive connections to nearest 5 dots via requestAnimationFrame
- **Scroll progress bar**: 2px fixed lime line at top filling on scroll
- **Section labels**: Monospace "// 001 HERO", "// 002 WORK" etc. on each section

## 🧭 Phase 3: Navigation
- Sticky glassmorphic nav bar (56px, backdrop blur, semi-transparent bg)
- "KB" logo initials in lime-bordered square (left)
- Center nav links: HOME / WORK / ABOUT / SKILLS / CONTACT — uppercase JetBrains Mono, slide-in lime underline on hover, active state tracking via scroll position
- Right side: pulsing "OPEN TO WORK" pill badge + "RESUME ↗" outlined button with fill-on-hover
- Mobile hamburger menu with morph animation → full-screen overlay with stacked links

## 📐 Phase 4: Hero Section (100vh)
- **Left column (60%)**: 
  - "AVAILABLE FOR OPPORTUNITIES" label with pulsing lime dot
  - Giant 3-line headline: "BUILDING" (solid white) / "DIGITAL" (stroke-only, no fill) / "EXPERIENCES" (solid white) — each with staggered clip-path reveal animation on load
  - Body text + two metric pills ("↑ 57% Load Speed" / "3K+ Weekly Users")
  - Two CTA buttons (lime filled + white outlined)
- **Right column (40%)**: 
  - Floating terminal mockup with cycling typed commands
  - Faint lime glow behind terminal
  - Orbiting tech badges (React, Node.js, TypeScript, Figma)
- Scroll indicator with bouncing chevron at bottom

## 💼 Phase 5: Featured Work Section
- Section header with "SELECTED WORK" + "( 3 PROJECTS )" counter
- 3 project cards (NEXUS, PRISM, ORBIT) in CSS grid — sharp corners, gradient mesh placeholders
- Card anatomy: project number, name, tagline, tech pills, key metric, arrow on hover
- **3D tilt effect** on hover via mouse position tracking (±8deg rotateX/Y)
- **Full-screen case study modal** on click — slides up from bottom with Problem/Solution/Role/Metrics/Tech Stack/Code snippet sections

## ⚡ Phase 6: Skills / Tech Stack Section
- Filter tabs: ALL / FRONTEND / BACKEND / TOOLS / DESIGN with crossfade animation on switch
- Grid of technology pills with inline SVG icons, names, proficiency percentages
- Hover reveals animated proficiency bar filling from 0 → X%
- "Currently Learning" subsection with dashed-border styling

## 👤 Phase 7: About & Timeline Section
- Split layout: left 40% with grayscale photo placeholder (lime color overlay on hover) + personal statement with fun facts in monospace
- Right 60%: vertical timeline (2022–2025) with lime dots, connecting line, staggered IntersectionObserver reveal animations

## 🏆 Phase 8: Awards & Recognition Section
- Auto-scrolling horizontal marquee strip with award pills (pauses on hover)
- 3 award cards below: SIH 2024 Winner, HackWithIndia 1st Place, GDSC Lead — lime border on hover with subtle lift

## 📬 Phase 9: Contact Section
- Giant "LET'S BUILD SOMETHING." headline (72px)
- Large email link with lime hover underline
- Social icon grid (GitHub, LinkedIn, Twitter, Dribbble) — square buttons with SVG icons, lime fill on hover
- Full-width "DOWNLOAD RESUME" button

## 🦶 Phase 10: Footer
- Minimal single line: "© 2025 Kunal Baghele. Crafted with obsession." left + "BUILT WITH React + TailwindCSS" right

## ✨ Phase 11: Scroll Animations & Polish
- IntersectionObserver on all sections/cards: fade up from opacity 0 + translateY(30px) with staggered delays
- `prefers-reduced-motion` media query to disable animations when requested
- Semantic HTML5 tags + aria-labels on all interactive elements
- Skip-to-content link as first DOM element
- Performance optimization: lightweight canvas, no external images, inline SVGs only

