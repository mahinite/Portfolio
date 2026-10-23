# Arifeen Siddiquei Mahin — Interactive Portfolio & Creative Showcase

A production-grade, pixel-accurate personal portfolio for Arifeen Siddiquei Mahin based directly on the provided high-fidelity design specifications. Features an immersive dark aesthetic, animated ASCII portrait, interactive Dhaka live watch, typing dynamic headline, bento showcase cards, full-screen About modal with an interactive 3D holographic tilt card, nested Lore storytelling chapters, and a dedicated contact experience.

## User Review & Critical Decisions

> [!IMPORTANT]
> The clarifying questions answered in Phase 1 establish the core interactive behavior:
> - **Interactive Holographic Profile Card**: Implemented with dynamic mouse-tracking 3D perspective tilt, holographic iridescent sheen reflection, and interactive flip mechanism displaying verified developer credentials on the reverse.
> - **Projects & Lore Detail View**: Implemented with dedicated high-fidelity slide-over/modal sheets providing rich backstory, interactive links, media showcases, and tech breakdowns.
> - **Contact & "Say hi." Action**: Dedicated interactive modal with a streamlined message form, direct mailto triggers, and 1-click clipboard copy with animated toast feedback.

---

## 1. Overview & Core Concept

- **What It Does**: Presents Mahin's personal brand as an AI engineer and student builder in Dhaka, Bangladesh. Showcases featured products (**Fikro**, **TAWT**, **Shelf**), live local context (real-time Dhaka watch and "Now" status), tech stack marquee, multi-layered About modal with holographic ID card, and personal Lore memories.
- **Target Audience / Persona**: Tech collaborators, founders, recruiters, peers, and visitors interested in AI-native engineering, Flutter, and web development.
- **Key Value**: Delivers a distinctive, memorable portfolio experience combining brutalist dark elegance with playful, tactile micro-interactions (ASCII portrait, 3D card tilt, nested narrative lore).

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Hero & First Screen**:
   - Clean top navigation (`Home`, `About`, `Contact`).
   - Split hero: Left typography with italic *"Salam,"*, bold display name **"I'm Mahin"**, dynamic typing cursor text *"I build software with AI|"*, and tags (`Student`, `AI Enthusiast`).
   - Central glowing pixel diamond matrix glyph in coral red (`#ef4444` / `#f87171`).
   - Right ASCII terminal card with glowing red matrix avatar, toggleable pixel/terminal mode, and quick `"About me →"` action.
   - Smooth scroll anchor cue at bottom center.

2. **Bento Grid & Information Architecture**:
   - **Projects Card**: Clean list of featured projects (**Fikro**, **TAWT**, **Shelf**) with interactive hover rows and a `"3 projects →"` button that launches dedicated project detail sheets.
   - **About Me Card**: Minimalist avatar circle with `"About me"` and `"Open →"` trigger.
   - **Time On My Watch**: Live updating digital clock displaying real-time Dhaka time (`Asia/Dhaka`, UTC+6) with exact minute/second precision and daylight status.
   - **Now Card**: Monospace status card with blinking cursor: `"Building this portfolio site.|"`, expandable to view current sprint logs.
   - **Infinite Stack Marquee**: Smooth horizontal ticker featuring `AI agents · Python · React · Dart · Flutter · DaVinci Resolve · Product Design`.

3. **"Say hi." Footer CTA**:
   - Monumental 3D-styled headline `"Say hi."` with coral-red dimensional offset drop-shadow.
   - One-click copy email pill and GitHub link (`arifeenmahin2008@gmail.com` · `github.com/Mahinite`).
   - Interactive quick contact modal opening on click.

4. **About Me Modal & Nested Lore**:
   - Fullscreen dark backdrop overlay with smooth spring transition and keyboard `Esc` listener.
   - Header with photo token, name **"Arifeen Siddiquei Mahin"**, and highlighted bio: *"I build software products with AI agents to fill gaps I actually run into."*
   - Pill chips: `AI agents`, `Python`, `React`, `Dart / Flutter`, `DaVinci Resolve`.
   - **Interactive 3D Holographic Card**: Real-time cursor-following 3D rotation (`rotateX`, `rotateY`), shimmering rainbow glare gradient, and click-to-flip feature showing technical stats and verified credentials.
   - **LORE Action Banner**: Prominent navigation card opening the second nested modal.
   - **Lore Modal View**: Clean back link (`← Back to About`), header **"Lore"**, and categorized chapters:
     - `play` · **Minecraft with the cousins**
     - `play` · **Competitive Call of Duty Mobile**
     - `life` · **Yuki, my cat**
     - `build` · **Building with AI agents**
     - Clicking any lore item opens a dedicated story card with memories, stats, and personal photos.

### Visual Identity & Theme Tokens

- **Dominant Neutral Canvas (60%)**: Deep midnight navy `#080c14` / `#0a0e17`.
- **Structural Surfaces (30%)**: Subdued slate-zinc cards `#111827` / `#0d131f` with hairline borders `rgba(255, 255, 255, 0.08)` and subtle glassmorphic backdrop filters.
- **High-Contrast Focal Accent (10%)**: Vibrant coral crimson `#ef4444` / `#f87171` for the blinking cursor, active navigation line, 3D text shadow, and diamond matrix. Warm golden amber `#fbbf24` for bio keyword emphasis.
- **Typography**:
  - Headings: Bold geometric sans (`Plus Jakarta Sans` / `Outfit` display weight 700–800).
  - Terminal & Time: Monospace (`font-mono tabular-nums`).
  - Hero greeting: Elegant italic serif/sans hybrid.

---

## 3. Key Product Decisions & Trade-Offs

- **Client-Side Live Watch**:
  - *Chosen Approach*: `Intl.DateTimeFormat` with `timeZone: 'Asia/Dhaka'`, ticking every second.
  - *Why*: Guarantees accurate Dhaka local time for any visitor globally without relying on external network API latency.
- **Holographic 3D Tilt Card**:
  - *Chosen Approach*: CSS 3D perspective transforms with Framer Motion spring physics and mouse tracking. Includes a specular gradient glare layer and 3D back-face flip.
  - *Why*: Delivers an ultra-premium, tactile interaction directly fulfilling the mockup's *"Profile card (holographic, as shipped)"* specification.
- **Nested Modal Navigation**:
  - *Chosen Approach*: Multi-stage URL/state-driven modal router (`modal: 'none' | 'about' | 'lore' | 'project' | 'contact'`).
  - *Why*: Allows seamless transitions (`About → Lore → Back to About`), keyboard navigation (`Escape`), and deep-linkable URLs without layout breaks.

---

## 4. Technical Architecture & Data Strategy

### System Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────────────────────┐
│                               App.tsx                                  │
│  - Active Modal State ('about' | 'lore' | 'contact' | 'project')       │
│  - Global Toast Notification Store                                     │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
      ┌────────────────────────────┼────────────────────────────┐
      ▼                            ▼                            ▼
┌──────────────┐          ┌───────────────────┐       ┌─────────────────┐
│  Navigation  │          │    Main Content   │       │   Modal Layer   │
│  - TopBar    │          │  - HeroSection    │       │  - AboutModal   │
│    (3-zone)  │          │  - BentoGrid      │       │  - LoreModal    │
│              │          │  - TechMarquee    │       │  - ProjectModal │
│              │          │  - SayHiFooter    │       │  - ContactModal │
└──────────────┘          └───────────────────┘       └─────────────────┘
                                   │                           │
                                   ▼                           ▼
                          ┌─────────────────┐         ┌─────────────────┐
                          │ Sub-Components  │         │ HolographicCard │
                          │ - AsciiCanvas   │         │ - 3D Tilt Mesh  │
                          │ - LiveWatch     │         │ - Glare Overlay │
                          │ - Typewriter    │         │ - Flip Mechanic │
                          │ - PixelDiamond  │         └─────────────────┘
                          └─────────────────┘
```

### Data Model & State Mapping

```typescript
interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics?: string;
  links: { github?: string; live?: string };
}

interface LoreChapter {
  id: string;
  category: 'play' | 'life' | 'build';
  title: string;
  preview: string;
  fullStory: string;
  tags: string[];
  timestamp?: string;
}
```

### Execution Steps
1. Configure typography and styling tokens in `index.html` and `src/index.css`.
2. Implement utility hooks (Dhaka clock, typewriter effect, 3D mouse parallax).
3. Build the core layout: Navigation, Hero with ASCII terminal card and pixel diamond, Bento grid with live watch and project list, Tech Stack marquee, and the "Say hi." footer.
4. Build the full-screen About modal featuring the 3D Holographic Profile card with interactive flip.
5. Build the nested Lore modal with chapter stories and deep-dive drawers.
6. Build the Contact modal with 1-click clipboard copy and message interaction.
7. Verify build and compilation with `compile_applet`.
