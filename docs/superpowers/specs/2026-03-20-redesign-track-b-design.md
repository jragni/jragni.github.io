# Track B: Component Rebuild — UI Revamp Spec

**Date:** 2026-03-20
**Branch:** `EPIC/REDESIGN-MARCH-20-B`
**Approach:** Rebuild every section with new component designs while keeping the existing React + Tailwind + shadcn/ui stack. No new animation frameworks — CSS-based animations refined and expanded.

## Constraints

- **Same copy, same data** — all text, descriptions, links, and images remain identical. Source from existing `src/data/constants.ts` and inline content.
- **Same color palette** — dark navy `#0a192f`, neon teal `#64FFDA`, card navy `#112240`. No new colors.
- **Same HUD vibe** — cyberpunk/tactical aesthetic with scanlines, grid overlay, corner brackets, monospace accents.
- **Same stack** — React 19, TypeScript, Vite, Tailwind CSS 3.4, shadcn/ui, Embla Carousel, lucide-react, react-icons.
- **No new dependencies** unless absolutely necessary (prefer CSS solutions).
- **Mobile-first** — every section must be designed mobile-first, then enhanced for desktop.
- **GitHub Pages deployment** — static site, no server-side rendering.

## Section-by-Section Redesign

### 1. Navigation (`NavigationBar.tsx`)

**Current:** Basic fixed nav with buttons, Sheet mobile menu.

**Redesign:**
- HUD command bar style — monospace, compact, teal accent line with scroll progress indicator
- Active section tracks via Intersection Observer (not just click state)
- Scroll progress bar along the bottom of the nav (thin teal line, width = scroll %)
- Mobile: full-screen overlay menu with staggered animation, not just a Sheet slide-in
- Nav items show section numbers: `[01] ABOUT`, `[02] SKILLS`, etc.
- Logo area: animated bracket typing effect on initial load, then static

### 2. Hero Section (`HeroSection.tsx`)

**Current:** Large heading, typing animation, 3 CTA buttons, scroll indicator.

**Redesign:**
- Terminal boot sequence on initial load: brief 1-2 second animation showing "SYSTEM INITIALIZING..." then content reveals with stagger
- Name heading gets a subtle glitch effect on first render (CSS only, no library)
- Typing animation stays (react-type-animation)
- Add floating HUD data panels around the edges (decorative, CSS positioned):
  - Top-right: "STATUS: AVAILABLE" with pulse dot
  - Bottom-left: "LAT/LONG: 34.0522 / -118.2437" (LA coordinates)
- CTA buttons redesigned: primary button gets a scan-line hover effect, outline button gets bracket animation
- Scroll indicator: replace bounce with a more tactical animated chevron

### 3. About Section (`AboutSection.tsx`)

**Current:** 2-column with bio card + carousel + quick facts.

**Redesign:**
- Better visual hierarchy in bio card — first paragraph larger/bolder, subsequent paragraphs progressively more muted (already partially done, refine)
- Carousel upgrade: add thumbnail strip below (5 small thumbs showing what's coming), active thumb highlighted
- Animated stat counters in Quick Facts: "5+" animates counting up on scroll-in, "6" projects counts up
- Quick Facts becomes a proper HUD readout panel with labels and values in a cleaner grid
- Add a "// DOSSIER //" HUD label at the top of the bio card

### 4. Skills Section (`SkillsSection.tsx`)

**Current:** 6 domain panels in a 2-col grid, each with skill badges.

**Redesign:**
- Domain panels get expand/collapse behavior — show top 4 skills by default, "Show All" expands
- Add a domain icon/indicator in each panel header
- Skill badges get a subtle proficiency indicator: primary skills have a brighter glow/border, secondary skills are more muted
- Panel headers get a small animated indicator (like a blinking cursor or status dot)
- Stagger reveal animation stays, but refine timing
- On hover, skill badges show a micro-tooltip with context (e.g., "3+ years" or "Production")

### 5. Experience Section (`ExperienceSection.tsx`)

**Current:** Timeline with cards, vertical line on desktop.

**Redesign:**
- Timeline line gets animated drawing effect on scroll (CSS clip-path or height transition)
- Timeline dots become HUD-style markers (diamond shape with pulse, already partially done)
- Cards get a left-border accent in teal that animates in
- Company name area: add a placeholder for company logos (use first letter as fallback with HUD styling)
- Expandable descriptions: show first 2 bullets by default, "View Full Details" expands to all
- Tech stack chips get the same hover glow as skills section
- "Download Resume" CTA at bottom gets redesigned with HUD bracket framing

### 6. Projects Section (`ProjectsSection.tsx`)

**Current:** 2-col grid with image cards.

**Redesign:**
- Card hover: image gets a teal-tinted overlay with "VIEW PROJECT" text centered
- Add project numbering: `[01]`, `[02]`, etc. in card header
- Featured project (first card) gets a larger treatment — spans full width on desktop with side-by-side image/text
- Image placeholder: better fallback with project title in HUD style
- Tech stack section in each card gets a cleaner layout
- Add click-to-expand project detail modal:
  - Full project description
  - Larger image/screenshot
  - Tech stack with brief rationale
  - Links (GitHub, Live Demo)
  - Close with ESC or click outside

### 7. Contact Section (`ContactSection.tsx`)

**Current:** CTA card, 3 social cards, footer.

**Redesign:**
- Main CTA: larger, more commanding presence with HUD framing
- Add "availability status" indicator: green dot + "OPEN TO OPPORTUNITIES" (or configurable)
- Social cards: on hover, show the actual URL/handle, not just description
- Footer: cleaner treatment, less card-like, more integrated into the page
- Add a subtle animated background element (CSS gradient animation or moving grid lines)

### 8. Layout (`Layout.tsx`)

**Current:** Grid overlay, scanlines, vignette, corner brackets, bottom status bar.

**Redesign:**
- Refine scanline opacity and frequency for better readability
- Corner brackets: animate in on page load (CSS transition from 0 size to full)
- Bottom status bar: add more dynamic info — current section name, scroll position
- Add section transition dividers: redesigned `hud-section-gate` with animated draw-in effect
- Overall spacing audit: ensure consistent section padding, card margins, text spacing

### 9. Global Improvements

- **Typography:** Audit all text sizes for better hierarchy. Ensure headings, body, labels have clear visual separation.
- **Spacing:** Consistent use of spacing scale. Audit all padding/margins.
- **Focus states:** Ensure all interactive elements have visible focus rings.
- **Transitions:** Audit all hover/transition timings for consistency (200ms default).
- **Loading states:** Add skeleton screens for images.

## Testing Strategy

- Visual regression testing with Playwright screenshots at mobile (375px), tablet (768px), desktop (1280px)
- Intersection Observer animation verification
- Responsive layout testing at all breakpoints
- Accessibility: keyboard navigation, screen reader, focus management
- Performance: Lighthouse score targets (90+ Performance, 95+ Accessibility)

## File Changes

### Modified Files:
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

### New Files:
- `src/components/ui/project-modal.tsx` — Project detail modal
- `src/components/ui/stat-counter.tsx` — Animated number counter
- `src/hooks/useActiveSection.ts` — Intersection Observer for nav tracking
- `src/hooks/useScrollProgress.ts` — Scroll % for nav progress bar
