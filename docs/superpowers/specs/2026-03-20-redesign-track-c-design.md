# Track C: Ground-Up Reimagine — UI Revamp Spec

**Date:** 2026-03-20
**Branch:** `EPIC/REDESIGN-MARCH-20-C`
**Approach:** Rebuild the entire site from the ground up with a new design system, Framer Motion for animations, and rethought component architecture. Same content, same HUD vibe, dramatically elevated execution.

## Constraints

- **Same copy, same data** — all text, descriptions, links, and images remain identical. Source from existing `src/data/constants.ts` and inline content.
- **Same color palette** — dark navy `#0a192f`, neon teal `#64FFDA`, card navy `#112240`. No new colors.
- **Same HUD vibe** — cyberpunk/tactical aesthetic, but more cinematic and immersive.
- **Stack additions:** Add `framer-motion` for scroll-linked and gesture animations. Everything else stays.
- **GitHub Pages deployment** — static site, no server-side rendering.
- **Performance budget:** Must maintain 90+ Lighthouse performance despite richer animations. Use `useReducedMotion` for accessibility.

## Design System Foundation

Before building sections, establish a proper design token system:

### Design Tokens (`src/styles/tokens.css`)
- Spacing scale: 4px base (xs=4, sm=8, md=16, lg=24, xl=32, 2xl=48, 3xl=64)
- Typography scale: define all text styles as utility classes (display, heading, subheading, body, caption, mono)
- Animation tokens: duration (fast=150ms, normal=300ms, slow=500ms, dramatic=800ms), easing curves
- Shadow tokens: subtle, medium, glow, tactical-glow
- Border tokens: thin (1px), medium (2px), thick (3px) with opacity variants

### Component Variants
All rebuilt components use CVA (class-variance-authority) for consistent variant management.

## Section-by-Section Reimagination

### 1. Navigation — Command Palette Nav

**Architecture:** New component from scratch.

**Design:**
- Floating nav bar (not edge-to-edge) — rounded corners, frosted glass effect, centered on desktop
- Section indicators as small HUD dots with labels on hover
- Keyboard shortcut hints: pressing `1-6` navigates to sections (subtle overlay hint)
- Scroll progress: thin line under nav that fills left-to-right
- Mobile: bottom sheet nav with gesture support (swipe up to open), haptic-style feedback on selection
- Animated transitions: nav items have spring-based hover animations (Framer Motion)
- Current section label animates between section names with a text swap animation

### 2. Hero — Cinematic Intro

**Architecture:** Full rewrite with Framer Motion orchestration.

**Design:**
- **Boot sequence:** 2-second cinematic intro:
  1. Screen starts black, grid overlay fades in
  2. Corner brackets animate from center outward
  3. "INITIALIZING..." text appears in center (monospace, typing effect)
  4. Content elements stagger in: name → title → subtitle → buttons
  5. Floating HUD elements animate to their positions
- Name heading: each letter animates in individually with spring physics
- Typing animation stays but wrapped in Framer Motion container for coordinated timing
- Floating HUD panels (Framer Motion `layoutId` for smooth positioning):
  - Coordinates readout
  - System status
  - Date/time (updating)
- Parallax depth: mouse position subtly shifts background grid (Framer Motion `useMotionValue`)
- CTA buttons: spring-based hover scale + glow intensification
- Scroll indicator: animated chevron with Framer Motion repeat

### 3. About — Magazine Layout

**Architecture:** New layout approach with scroll-linked animations.

**Design:**
- **Scroll-linked reveal:** As user scrolls into the section, content reveals in a choreographed sequence
- Bio card: text paragraphs fade in one at a time as scroll progresses (Framer Motion `useScroll` + `useTransform`)
- Image gallery: replaces carousel with a more dynamic approach:
  - Main large image with thumbnails below
  - Click thumbnail to swap with spring transition (`AnimatePresence` + `layoutId`)
  - Images have a subtle parallax on scroll
- Stats dashboard: animated counter panel that looks like a HUD readout
  - "5+" years experience — counts up with spring
  - "6" projects — counts up
  - "72+" clients served (from Dovenmuehle) — counts up
  - Each stat has a small animated bar/ring indicator
- Quick Facts panel: redesigned as a proper data readout with animated label/value pairs

### 4. Skills — Interactive Visualization

**Architecture:** New component with animated skill rendering.

**Design:**
- **Domain tabs:** horizontal tab bar (not grid) — click domain to see its skills. Active tab has animated underline (Framer Motion `layoutId`).
- Skills within each domain render as animated badges that stagger in on tab switch (`AnimatePresence`)
- Proficiency indicator: each skill has a small animated bar (CSS width animation) showing relative proficiency (primary = 90%, secondary = 70%)
- Domain switch animation: skills exit left, new skills enter right (spring transition)
- On mobile: swipeable domain tabs (Framer Motion drag gesture)
- Background: subtle animated node/connection lines between related skills (CSS only, decorative)

### 5. Experience — Scroll-Driven Timeline

**Architecture:** Framer Motion scroll-linked timeline.

**Design:**
- Timeline line draws progressively as user scrolls (Framer Motion `useScroll` controlling SVG path `pathLength`)
- Each experience card animates in from the side as it enters viewport:
  - Odd cards from left, even cards from right (Framer Motion `variants`)
  - Cards have spring-based entrance with slight overshoot
- Company logo area: letter-based fallback with animated border (first letter of company in a HUD-styled circle)
- Card hover: entire card lifts with shadow increase (Framer Motion `whileHover`)
- Expandable details with `AnimatePresence` — smooth height animation (not CSS `max-height` hack)
- Tech stack chips have staggered entrance within each card
- Timeline markers pulse when their card is in the center of the viewport

### 6. Projects — Bento Grid

**Architecture:** New grid layout with hover previews and detail view.

**Design:**
- **Bento grid layout:**
  - Featured projects (first 2) get larger cards (2x height or 2-col span)
  - Remaining projects in standard grid cells
  - Grid rearranges responsively (1 col mobile, 2 col tablet, bento desktop)
- Card hover effects (Framer Motion):
  - Image scales slightly with spring physics
  - Teal overlay fades in with project title centered
  - Card border glows
- Click opens project detail view:
  - Full-screen modal with `AnimatePresence` + `layoutId` for seamless card-to-modal transition
  - Modal contains: large image, full description, tech stack with icons, all links
  - Close with ESC, click outside, or X button
  - Smooth exit animation back to card position
- Project numbering with HUD style `[01]`, `[02]`

### 7. Contact — Terminal Interface

**Architecture:** Interactive terminal-style section.

**Design:**
- Main CTA area styled as a terminal window:
  - Title bar: "COMMS TERMINAL — OPEN CHANNEL"
  - Terminal body with typing animation: "Establishing connection..."
  - Then reveals the email CTA button with spring animation
- Availability indicator: prominent, animated status with text
- Social links: horizontal row with icon + label, Framer Motion stagger on scroll-in
- Each social card has a spring-based hover lift effect
- Footer: minimal, integrated into the section rather than a separate card
- Subtle animated gradient in the background (CSS `@keyframes` gradient shift)

### 8. Layout — Atmospheric Framework

**Architecture:** Enhanced Layout with Framer Motion page transitions.

**Design:**
- Grid overlay: subtle animated drift (CSS `background-position` animation, very slow)
- Scanlines: reduce further, make them barely perceptible
- Corner brackets: animate in on page load with Framer Motion spring
- Vignette: keep but make more dynamic (slightly shifts with scroll)
- Section transitions: each section has enter/exit animations coordinated by scroll position
- Bottom status bar: shows current section name with text swap animation, scroll percentage
- Add ambient particle effect: very subtle, few teal dots floating (CSS animation, not canvas — keep it light)

### 9. Accessibility & Performance

- `useReducedMotion` hook: disable all Framer Motion animations, fall back to simple CSS fades
- Image lazy loading with blur placeholder (base64 tiny image)
- Framer Motion `lazy` variants — don't animate off-screen elements
- Code-split the Framer Motion import (it's ~30KB gzipped, but only load what's needed)
- All interactive elements fully keyboard accessible
- ARIA labels on all animated transitions
- Focus trap in modals

## New Dependencies

```json
{
  "framer-motion": "^11.x"
}
```

No other new dependencies. Framer Motion is the only addition.

## Testing Strategy

- Visual regression testing with Playwright at mobile (375px), tablet (768px), desktop (1280px)
- Framer Motion animation verification (ensure animations complete, no jank)
- `prefers-reduced-motion` testing — all animations disabled gracefully
- Responsive layout testing at all breakpoints
- Performance: Lighthouse audit (target 90+ Performance, 95+ Accessibility)
- Bundle size audit: ensure Framer Motion doesn't blow up the bundle

## File Changes

### New Foundation Files:
- `src/styles/tokens.css` — Design tokens
- `src/components/motion/AnimatedSection.tsx` — Reusable scroll-animated section wrapper
- `src/components/motion/StaggerChildren.tsx` — Stagger animation wrapper
- `src/components/motion/ScrollProgress.tsx` — Scroll progress indicator
- `src/hooks/useActiveSection.ts` — Intersection Observer for nav
- `src/hooks/useScrollProgress.ts` — Scroll percentage

### Rebuilt Files (full rewrites):
- `src/components/layout/Layout.tsx`
- `src/components/layout/NavigationBar.tsx`
- `src/components/sections/HeroSection.tsx`
- `src/components/sections/AboutSection.tsx`
- `src/components/sections/SkillsSection.tsx`
- `src/components/sections/ExperienceSection.tsx`
- `src/components/sections/ProjectsSection.tsx`
- `src/components/sections/ContactSection.tsx`
- `src/styles/globals.css`
- `src/hooks/useScrollAnimation.ts`
- `src/App.tsx`

### New UI Components:
- `src/components/ui/project-modal.tsx` — Animated project detail modal
- `src/components/ui/stat-counter.tsx` — Spring-animated number counter
- `src/components/ui/skill-tabs.tsx` — Tabbed skill domain selector
- `src/components/ui/terminal-window.tsx` — Terminal-style container component
- `src/components/ui/image-gallery.tsx` — Thumbnail-based image gallery
