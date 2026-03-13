# Atomic Tasks — Portfolio Site Redesign (React 19 + Vite + Tailwind + shadcn/ui)

## Task Execution Overview
- **Total Tasks:** 16
- **Parallel Groups:** A, B, C, D
- **Estimated Total Effort:** ~8 hours across isolated agents
- **Constraints:** Max 1-2 files per task, <15 lines meaningful change, no content modifications

---

## GROUP A: Global CSS & Animation Foundation (No Dependencies)

### TASK-1: Adjust Scroll Animation Baseline Y-Translate
- **Files:** `/src/styles/globals.css`
- **Dependencies:** none
- **Parallel Group:** A
- **Description:** Reduce scroll animation translateY from 40px to 24px for smoother, less dramatic entrance. Update section base state in the `@layer utilities` section where `transform: translateY(30px)` is defined. Also update fade-in-left/right variants to use 24px instead of 40px where needed.
- **Acceptance Criteria:** Sections animate in with subtler 24px Y-translate (confirm by visual inspection during scroll), animation timing unchanged.

---

### TASK-2: Add Subtle Grid Overlay to Alternate Sections
- **Files:** `/src/styles/globals.css`
- **Dependencies:** none
- **Parallel Group:** A
- **Description:** Create a new CSS utility class `grid-overlay-alternating` that applies a faint grid pattern (20px cells, 0.02 opacity) to even-numbered sections. Add this as a new @layer utilities rule. This will be applied via className on section components in later tasks.
- **Acceptance Criteria:** New utility class exists and can be applied to sections; grid is visible only on subtle inspection (e.g., 0.02 opacity).

---

### TASK-3: Create Corner Bracket Hover Animation CSS
- **Files:** `/src/styles/globals.css`
- **Dependencies:** none
- **Parallel Group:** A
- **Description:** Add `@keyframes lock-on` animation to contract corner brackets 4px inward (from 4px offset to 0px) over 200ms with ease-out timing. Add two new utility classes: `.hud-card-hover` (base state with brackets positioned 4px outside) and `.hud-card-hover:hover` (brackets contract inward with brightness increase). Define both the keyframe and the utilities in @layer utilities.
- **Acceptance Criteria:** Keyframe defined; hover animation contracts brackets smoothly from offset to flush; brightness increases from rgba(100,255,218,0.4) to rgba(100,255,218,1.0).

---

### TASK-4: Create HUD Section Gate Divider Utility
- **Files:** `/src/styles/globals.css`
- **Dependencies:** none
- **Parallel Group:** A
- **Description:** Add new `.hud-section-gate` utility class that creates a 60px tall divider with: top and bottom teal borders (1px, 20% opacity), a rotated bracket pattern in corners (4 L-shaped brackets), and optional scrolling status text at 20% opacity. Define as @layer utilities using pseudo-elements for brackets and box-shadow for borders.
- **Acceptance Criteria:** Divider class renders 60px tall with visible corner brackets and subtle text overlay; can be applied between sections.

---

## GROUP B: Layout & Section Wrapper Updates (Depends on Group A)

### TASK-5: Apply Alternating Background to Sections
- **Files:** `/src/components/sections/HeroSection.tsx`, `/src/components/sections/AboutSection.tsx`, `/src/components/sections/SkillsSection.tsx`, `/src/components/sections/ExperienceSection.tsx`, `/src/components/sections/ProjectsSection.tsx`, `/src/components/sections/ContactSection.tsx`
- **Dependencies:** TASK-2
- **Parallel Group:** B
- **Description:** Add className logic to alternate `bg-background` and `bg-card/30` backgrounds between sections. Hero = `bg-background`, About = `bg-card/30`, Skills = `bg-background`, Experience = `bg-card/30`, Projects = `bg-background`, Contact = `bg-card/30`. Apply grid-overlay-alternating to card/30 sections only. Each section needs 1 line of className change.
- **Acceptance Criteria:** Alternating backgrounds visible; card/30 sections show faint grid overlay; no content changes.

---

### TASK-6: Add HUD Section Gate Dividers Between Sections (Optional Layout)
- **Files:** `/src/components/layout/Layout.tsx`
- **Dependencies:** TASK-4
- **Parallel Group:** B
- **Description:** (Optional: Include if time permits) Insert `.hud-section-gate` dividers between major sections in Layout. Position between </section> and next <section>. Use z-index layering to place behind main content. Dividers are decorative only (pointer-events-none).
- **Acceptance Criteria:** Gate dividers appear between sections; they don't interfere with scrolling or content interaction; corners are visible and styled.

---

## GROUP C: Individual Section Component Redesigns (Can Run in Parallel)

### TASK-7: Hero Section — Add Info Hierarchy Styling
- **Files:** `/src/components/sections/HeroSection.tsx`
- **Dependencies:** none (visual only)
- **Parallel Group:** C
- **Description:** Apply 3-tier opacity hierarchy to HeroSection: Title (h1) at full opacity (tier 1), Tagline (TypeAnimation) at medium opacity `text-primary/90` (tier 2), Subtitle paragraph at `text-muted-foreground/70` (tier 3). Adjust existing className opacity values for the intro paragraph only.
- **Acceptance Criteria:** Tagline and subtitle show clear opacity differentiation; hierarchy is visually apparent without affecting CTA buttons.

---

### TASK-8: About Section — Apply HUD Card Styling to Bio & Profile Cards
- **Files:** `/src/components/sections/AboutSection.tsx`
- **Dependencies:** TASK-3
- **Parallel Group:** C
- **Description:** Add `.hud-card-hover` class to the bio Card and profile image Card. Also add `.hud-corners` to create L-bracket corners. Update hover state to include brightness increase and slight scale. Ensure 4px bracket offset in base state, contract on hover.
- **Acceptance Criteria:** Bio and profile cards show corner brackets at rest; on hover, brackets contract inward and brighten; no layout shift.

---

### TASK-9: Skills Section — Convert to HUD Module Status Indicator Layout
- **Files:** `/src/components/sections/SkillsSection.tsx`
- **Dependencies:** none
- **Parallel Group:** C
- **Description:** Redesign Skills grid: Instead of 3-column card grid, create a single unified `.bg-card/50` panel. Inside, organize skills by domain (Frontend, Backend, Robotics) as horizontal rows. Each skill becomes: 2px left teal border + active dot indicator + JetBrains Mono name. Add panel header tab: `<span className="font-mono text-primary text-xs">SYS.SKILLS_MAP v2.1</span>`. Convert Card to div-based layout; keep Badge styling for skill items.
- **Acceptance Criteria:** Skills display in unified panel with domain grouping; each skill has left border and dot; header shows version label; no grid layout, horizontal rows instead.

---

### TASK-10: Skills Section — Add Staggered Child Reveal Animation
- **Files:** `/src/components/sections/SkillsSection.tsx`, `/src/hooks/useScrollAnimation.ts`
- **Dependencies:** TASK-9
- **Parallel Group:** C
- **Description:** Implement staggered reveal for child skills inside the unified panel using IntersectionObserver delay pattern. Add `--stagger-index` inline style to each skill row (calculated as 0.1 * index seconds). Update useScrollAnimation hook to support child element animation or add a simpler local animation hook in SkillsSection. Delay: 80-120ms between children, duration: 500-600ms total per element.
- **Acceptance Criteria:** Skills reveal one by one with cascading effect when section scrolls into view; stagger delay visible and smooth; uses cubic-bezier(0.25, 0.46, 0.45, 0.94) timing.

---

### TASK-11: Experience Section — Apply Info Hierarchy & Expanding Bracket Hover
- **Files:** `/src/components/sections/ExperienceSection.tsx`
- **Dependencies:** TASK-3
- **Parallel Group:** C
- **Description:** Apply 3-tier hierarchy to experience cards: Job title (full opacity, white), Company name (medium opacity, teal, `text-primary`), Metadata/date (tiny monospace, 30% opacity `text-muted-foreground/30`). Add `.hud-corners` to card for bracket framing. Update hover state to trigger bracket lock-on animation. Ensure date badge uses monospace styling.
- **Acceptance Criteria:** Experience titles prominent, company teal, dates subdued; cards show corner brackets; brackets expand on hover with brightness increase.

---

### TASK-12: Experience Section — Timeline Layout (Optional Tier 3)
- **Files:** `/src/components/sections/ExperienceSection.tsx`
- **Dependencies:** TASK-11
- **Parallel Group:** C
- **Description:** (Optional: Include if prioritized) Convert experience timeline to alternating left-right layout at md+ breakpoints. On desktop: odd items left-aligned, even items right-aligned. Use CSS grid or flex with custom positioning. Replace circular dot with rotated square "diamond" marker. Add subtle pulse-reticle animation to connector spine (existing @keyframes pulse-reticle already in CSS). Teal glow on connector line.
- **Acceptance Criteria:** Timeline alternates left-right on desktop, stacks vertically on mobile; diamond markers pulse; connector spine glows with teal.

---

### TASK-13: Projects Section — Add HUD Card Styling & Staggered Reveal
- **Files:** `/src/components/sections/ProjectsSection.tsx`
- **Dependencies:** TASK-3
- **Parallel Group:** C
- **Description:** Add `.hud-card-hover` and `.hud-corners` classes to project cards. Add staggered animation support: each card gets `--stagger-index` inline style (0, 1, 2, etc.). Update card className to include bracket styling and hover animation. Project image scale-up on hover remains but now pairs with bracket animation.
- **Acceptance Criteria:** Project cards show corner brackets; brackets animate on hover; cards stagger into view with 80-120ms delays between them; image zoom still works.

---

### TASK-14: Contact Section — Apply HUD Card Styling to Social Links
- **Files:** `/src/components/sections/ContactSection.tsx`
- **Dependencies:** TASK-3
- **Parallel Group:** C
- **Description:** Add `.hud-card-hover` and `.hud-corners` to the social link cards (GitHub, LinkedIn, Email). Update hover state to trigger bracket lock-on and glow effect. Keep icon scale-up on hover but enhance with brightness transition. Main CTA button already has primary styling; ensure it uses shadow-primary/20 for consistency.
- **Acceptance Criteria:** Social cards show corner brackets; brackets animate on hover; icons brighten and scale; footer card inherits card styling.

---

### TASK-15: All Sections — Add Ghost Code Fragment Backgrounds (Optional Tier 3)
- **Files:** `/src/components/sections/HeroSection.tsx`, `/src/components/sections/AboutSection.tsx`, etc. (all 6 sections)
- **Dependencies:** none
- **Parallel Group:** C
- **Description:** (Optional: Include if time permits) Add ghost-opacity (4% opacity) monospace code fragments behind section headers as decorative pseudo-elements. Fragments should be semantic (e.g., `<Hero />` above HeroSection, `<Skills />` above SkillsSection, etc.). Use ::before on h2 or inject via CSS. Keep text overflow hidden so only edges peek through.
- **Acceptance Criteria:** Code fragments visible only on close inspection; don't interfere with readability; appear behind headers.

---

## GROUP D: Cross-Cutting Concerns & Polish (Depends on A, B, C)

### TASK-16: Text Scramble/Decrypt Animation on Section Heading Reveal (Optional Tier 3)
- **Files:** `/src/components/sections/HeroSection.tsx`, `/src/components/sections/AboutSection.tsx`, `/src/components/sections/SkillsSection.tsx`, `/src/components/sections/ExperienceSection.tsx`, `/src/components/sections/ProjectsSection.tsx`, `/src/components/sections/ContactSection.tsx`
- **Dependencies:** TASK-1, TASK-5
- **Parallel Group:** D
- **Description:** (Optional: High-effort Tier 3) Implement text scramble animation on all h2 section headings. When heading becomes visible, characters "decrypt" from random symbols to correct text over 400ms. Use a custom animation hook or CSS @keyframes with data attributes. Timing: start with full scramble, 400ms decode, end with clear text. Easing: ease-out.
- **Acceptance Criteria:** Section headings show scramble-decrypt effect when scrolled into view; animation is 400ms duration; text is readable before and after; no performance impact.

---

## Summary Matrix

| Task | Phase | Files | LOC | Est. Time |
|------|-------|-------|-----|-----------|
| TASK-1 | A | 1 | 5 | 5 min |
| TASK-2 | A | 1 | 8 | 10 min |
| TASK-3 | A | 1 | 12 | 15 min |
| TASK-4 | A | 1 | 10 | 12 min |
| TASK-5 | B | 6 | 1 each | 8 min |
| TASK-6 | B | 1 | 5 | 8 min |
| TASK-7 | C | 1 | 3 | 5 min |
| TASK-8 | C | 1 | 4 | 8 min |
| TASK-9 | C | 1 | 10 | 15 min |
| TASK-10 | C | 2 | 8 | 15 min |
| TASK-11 | C | 1 | 6 | 10 min |
| TASK-12 | C | 1 | 8 | 15 min |
| TASK-13 | C | 1 | 5 | 10 min |
| TASK-14 | C | 1 | 5 | 8 min |
| TASK-15 | C | 6 | 3 each | 15 min |
| TASK-16 | D | 6 | 2 each | 20 min |

## Execution Strategy

### Phase 1: Setup (Group A)
1. Execute TASK-1 through TASK-4 in parallel (agents A1-A4)
2. Commit CSS changes to main once all A tasks complete
3. Expected duration: 50 minutes

### Phase 2: Layout (Group B)
1. Execute TASK-5 across 6 section files in parallel (agents B1-B6)
2. Execute TASK-6 independently (agent B-optional)
3. Expected duration: 8-15 minutes

### Phase 3: Sections (Group C)
1. Execute TASK-7 through TASK-14 in parallel (agents C1-C8)
2. Execute TASK-15 (optional, decorative) in parallel
3. Expected duration: 90 minutes

### Phase 4: Polish (Group D)
1. Execute TASK-16 (optional, text scramble) only if Group C complete and time allows
2. Expected duration: 20 minutes (if included)

### Review Checkpoints
- After Group A: Verify CSS compiles, no visual regressions
- After Group B: Verify layout changes don't break responsiveness
- After Group C: Conduct visual regression testing on all sections
- After Group D: Final QA, performance check, responsive design test

## Dependencies Graph

```
TASK-1 ──┐
         ├─→ TASK-5 ──┐
TASK-2 ──┤           │
         └─→ TASK-6  │
TASK-3 ──┐           │
         ├─→ TASK-8  ├─→ GROUP C Completion ──→ TASK-16 (D)
         ├─→ TASK-11 │
         ├─→ TASK-13 │
         ├─→ TASK-14 │
TASK-4 ──┐           │
         └─→ TASK-6  │
                     │
TASK-9 ──────→ TASK-10

```

## Priority & Tier Mapping

**Tier 1 (Highest Impact) — Required:**
- TASK-1, TASK-2, TASK-3, TASK-5 (Foundations)
- TASK-7, TASK-8, TASK-11, TASK-13, TASK-14 (Core redesigns)

**Tier 2 (High Impact, Moderate Effort) — Strongly Recommended:**
- TASK-4, TASK-6, TASK-9, TASK-10 (HUD enhancements, stagger reveals)
- TASK-12 (Timeline redesign)

**Tier 3 (Premium Polish) — Optional:**
- TASK-15 (Ghost code backgrounds)
- TASK-16 (Text scramble animations)

## File Change Summary

- **1 CSS file modified:** `globals.css` (TASK-1, 2, 3, 4)
- **1 Layout file modified:** `Layout.tsx` (TASK-6)
- **6 Section components modified:** All sections (TASK-5, 7-14)
- **1 Hook enhanced:** `useScrollAnimation.ts` (TASK-10)

---

**Document Generated:** 2026-03-06
**Status:** Ready for execution
