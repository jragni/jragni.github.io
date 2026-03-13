# Agent Prompts — Portfolio Site Redesign

**Generated:** 2026-03-06
**Source tasks:** atomic-tasks.md
**Total prompts:** 8 (6 required, 2 optional)
**Execution model:** PROMPT-1 first, then PROMPT-2 and PROMPT-3 through PROMPT-6 can run in parallel after PROMPT-1 merges, PROMPT-7 and PROMPT-8 are optional and run last.

---

## Dependency Order

```
PROMPT-1 (CSS Foundation)
    ├── PROMPT-2 (Alternating Backgrounds)   ← depends on PROMPT-1
    ├── PROMPT-3 (Hero Section)              ← no dep, can run parallel with PROMPT-1
    ├── PROMPT-4 (About Section)             ← depends on PROMPT-1
    ├── PROMPT-5 (Skills Redesign + Stagger) ← no dep, can run parallel with PROMPT-1
    ├── PROMPT-6 (Experience Section)        ← depends on PROMPT-1
    ├── PROMPT-7 (Projects + Contact)        ← depends on PROMPT-1
    └── PROMPT-8-OPTIONAL (Layout Dividers)  ← depends on PROMPT-1
```

---

## PROMPT-1: CSS Foundation — Animations, Grid Overlay, HUD Brackets & Gate Divider
**Target Branch:** feature/css-foundation
**Files to READ:** `src/styles/globals.css`
**Files to MODIFY:** `src/styles/globals.css`
**Depends On:** none

---

You are a frontend expert making targeted CSS additions and edits to a portfolio site. The site uses Tailwind CSS v4 with a cyberpunk/HUD theme. The primary accent color is teal: `rgba(100, 255, 218, ...)`.

DO NOT change any HTML, TSX, or component files. DO NOT change any text content or existing class names that are already in use. Only modify `src/styles/globals.css`.

### Task A — Reduce scroll animation Y-translate from 30px/40px to 24px

In `src/styles/globals.css`, inside `@layer utilities`, locate the `section` base state rule (around line 219):

```css
section {
  opacity: 0;
  transform: translateY(30px);
  ...
}
```

Change `translateY(30px)` to `translateY(24px)`.

Then locate the two directional variants (around lines 237–256):

```css
section[data-animate="fade-in-left"] {
  opacity: 0;
  transform: translateX(-40px);
}

section[data-animate="fade-in-right"] {
  opacity: 0;
  transform: translateX(40px);
}
```

Change `-40px` to `-24px` and `40px` to `24px` on both translateX values.

Do not change any transition timing, duration, easing, or the `section-visible` rules.

### Task B — Add `grid-overlay-alternating` utility class

After the existing `.grid-overlay-subtle` rule (around line 157), add this new utility inside `@layer utilities`:

```css
/* Grid overlay — alternating sections variant */
.grid-overlay-alternating {
  background-image:
    linear-gradient(rgba(100, 255, 218, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(100, 255, 218, 0.02) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

### Task C — Add `hud-card-hover` utility class and `lock-on` keyframe

After the `.hud-corners::after` rule block (around line 207), add the following inside `@layer utilities`. This defines the corner-bracket hover animation used by About, Experience, Projects, and Contact section cards:

```css
/* Corner bracket lock-on hover animation */
@keyframes lock-on {
  from {
    top: -4px;
    left: -4px;
  }
  to {
    top: 0px;
    left: 0px;
  }
}

/* HUD card with animating corner brackets */
.hud-card-hover {
  position: relative;
}

.hud-card-hover::before,
.hud-card-hover::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(100, 255, 218, 0.4);
  transition: border-color 200ms ease-out, top 200ms ease-out, left 200ms ease-out, right 200ms ease-out, bottom 200ms ease-out;
  pointer-events: none;
  z-index: 2;
}

.hud-card-hover::before {
  top: -4px;
  left: -4px;
  border-right: none;
  border-bottom: none;
}

.hud-card-hover::after {
  top: -4px;
  right: -4px;
  border-left: none;
  border-bottom: none;
}

.hud-card-hover:hover::before {
  top: 0px;
  left: 0px;
  border-color: rgba(100, 255, 218, 1.0);
}

.hud-card-hover:hover::after {
  top: 0px;
  right: 0px;
  border-color: rgba(100, 255, 218, 1.0);
}
```

### Task D — Add `hud-section-gate` utility class

After the `.hud-card-hover` block you just added, add this new class inside `@layer utilities`:

```css
/* Section gate divider — decorative HUD separator between sections */
.hud-section-gate {
  position: relative;
  height: 60px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 -1px 0 rgba(100, 255, 218, 0.2),
    0 1px 0 rgba(100, 255, 218, 0.2);
}

.hud-section-gate::before {
  content: "// SECTOR BOUNDARY //";
  font-family: 'JetBrains Mono', 'IBM Plex Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: rgba(100, 255, 218, 0.2);
  text-transform: uppercase;
}

.hud-section-gate::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(100, 255, 218, 0.15) 20%,
    rgba(100, 255, 218, 0.15) 80%,
    transparent 100%
  );
  z-index: -1;
}
```

### Verification

After making all four changes, verify:

1. The `section` base state now reads `transform: translateY(24px)` (not 30px).
2. Both `fade-in-left` and `fade-in-right` variants use `24px` (not 40px).
3. A `.grid-overlay-alternating` class exists with `rgba(100, 255, 218, 0.02)` and `background-size: 20px 20px`.
4. A `.hud-card-hover` class exists with `::before` and `::after` pseudo-elements starting at `-4px` offset.
5. A `.hud-card-hover:hover::before` rule exists setting `top: 0px; left: 0px` and `border-color: rgba(100, 255, 218, 1.0)`.
6. A `.hud-section-gate` class exists at 60px height with the status text pseudo-element.
7. Run `npm run build` (or `npx vite build`) and confirm zero CSS errors.

---

## PROMPT-2: Alternating Section Backgrounds
**Target Branch:** feature/alternating-backgrounds
**Files to READ:** `src/components/sections/HeroSection.tsx`, `src/components/sections/AboutSection.tsx`, `src/components/sections/SkillsSection.tsx`, `src/components/sections/ExperienceSection.tsx`, `src/components/sections/ProjectsSection.tsx`, `src/components/sections/ContactSection.tsx`
**Files to MODIFY:** All six section files listed above
**Depends On:** PROMPT-1 (requires `grid-overlay-alternating` class to exist in globals.css)

---

You are a frontend expert making small, targeted className changes across six React section components. The site uses Tailwind CSS with a cyberpunk/HUD dark theme.

DO NOT change any text content, copy, props, logic, or component structure. Only change the `className` on the outermost `<section>` element in each file. Make exactly one className change per file.

The `grid-overlay-alternating` CSS class already exists in `src/styles/globals.css` — it renders a barely visible (2% opacity) teal grid pattern. You do not need to create it.

### Background assignment rules

Apply backgrounds to outermost `<section>` elements as follows:

| Section file | Current `<section>` className contains | Add/change to |
|---|---|---|
| `HeroSection.tsx` | `min-h-screen flex items-center...` | Add `bg-background` |
| `AboutSection.tsx` | `min-h-screen flex items-center...` | Add `bg-card/30 grid-overlay-alternating` |
| `SkillsSection.tsx` | `min-h-screen flex items-center...` | Add `bg-background` |
| `ExperienceSection.tsx` | `min-h-screen flex items-center...` | Add `bg-card/30 grid-overlay-alternating` |
| `ProjectsSection.tsx` | `min-h-screen flex items-center...` | Add `bg-background` |
| `ContactSection.tsx` | `min-h-screen flex items-center...` | Add `bg-card/30 grid-overlay-alternating` |

For each file, append the classes to the existing `className` string on the `<section>` tag. Do not remove any existing classes.

Example — in `HeroSection.tsx`, the opening `<section>` tag currently reads:
```tsx
<section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
```
After your change it should read:
```tsx
<section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background">
```

### Verification

After changes:

1. Each of the six section files has exactly one modified line — the opening `<section>` tag.
2. Odd-numbered sections (Hero, Skills, Projects) have `bg-background`.
3. Even-numbered sections (About, Experience, Contact) have both `bg-card/30` and `grid-overlay-alternating`.
4. No text, logic, imports, or other classNames were changed.
5. The TypeScript compiler reports no errors (`npx tsc --noEmit`).

---

## PROMPT-3: Hero Section — Info Hierarchy Opacity Styling
**Target Branch:** feature/hero-hierarchy
**Files to READ:** `src/components/sections/HeroSection.tsx`
**Files to MODIFY:** `src/components/sections/HeroSection.tsx`
**Depends On:** none

---

You are a frontend expert making targeted className changes to a single React component. The site uses Tailwind CSS with a cyberpunk/HUD dark theme. The primary color token is `text-primary` (neon teal).

DO NOT change any text content, copy, props, logic, imports, component structure, or button classNames. Only change className values on the elements described below.

### Objective

Apply a 3-tier visual opacity hierarchy to the HeroSection so the reader's eye moves from name → tagline → subtitle paragraph. The CTA buttons must not be touched.

### Changes to make in `src/components/sections/HeroSection.tsx`

**Tier 1 — h1 (full opacity, already correct, verify only):**
The `<h1>` element has `className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight"`. Do not change this.

**Tier 2 — TypeAnimation tagline wrapper (medium opacity):**
The `<div>` wrapping the `<span>` prompt and `<TypeAnimation>` currently reads:
```tsx
<div className="text-2xl sm:text-3xl md:text-5xl font-bold text-muted-foreground min-h-[3rem] sm:min-h-[4rem]">
```
Change `text-muted-foreground` to `text-primary/90` so the tagline uses the teal accent at 90% opacity:
```tsx
<div className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary/90 min-h-[3rem] sm:min-h-[4rem]">
```

**Tier 3 — subtitle paragraph (subdued opacity):**
The `<p>` element for the intro paragraph currently reads:
```tsx
<p className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed pt-4">
```
Change `text-muted-foreground` to `text-muted-foreground/70`:
```tsx
<p className="text-base sm:text-xl md:text-2xl text-muted-foreground/70 max-w-3xl leading-relaxed pt-4">
```

Note: The `<span className="text-foreground font-semibold">` emphasis spans inside the paragraph must remain unchanged — only the parent `<p>` className changes.

### Verification

After changes:

1. The `<h1>` className is unchanged (still `text-foreground`).
2. The TypeAnimation wrapper `<div>` uses `text-primary/90` (not `text-muted-foreground`).
3. The subtitle `<p>` uses `text-muted-foreground/70` (not plain `text-muted-foreground`).
4. The three `<Button>` elements and their classNames are completely unchanged.
5. All inline `<span>` classNames inside the paragraph are unchanged.
6. `npx tsc --noEmit` reports no errors.

---

## PROMPT-4: About Section — HUD Card Hover Brackets
**Target Branch:** feature/about-hud-cards
**Files to READ:** `src/components/sections/AboutSection.tsx`
**Files to MODIFY:** `src/components/sections/AboutSection.tsx`
**Depends On:** PROMPT-1 (requires `hud-card-hover` class to exist in globals.css)

---

You are a frontend expert making targeted className additions to a single React component. The site uses Tailwind CSS with a cyberpunk/HUD dark theme.

DO NOT change any text content, copy, props, logic, imports, component structure, or existing classNames. Only append new CSS utility classes where specified.

The `hud-card-hover` CSS class already exists in `src/styles/globals.css`. It adds animated corner bracket pseudo-elements to any element it is applied to — the brackets sit 4px outside the element at rest and contract flush on hover while brightening from 40% to 100% teal opacity.

### Changes to make in `src/components/sections/AboutSection.tsx`

There are three `<Card>` components in this file. Apply `hud-card-hover` to two of them:

**Card 1 — Bio card (left column):**
Currently:
```tsx
<Card className="bg-card/50 backdrop-blur-sm border-primary/30">
```
Change to:
```tsx
<Card className="bg-card/50 backdrop-blur-sm border-primary/30 hud-card-hover">
```

**Card 2 — Carousel image card (inside `CarouselItem`):**
Currently:
```tsx
<Card className="bg-card/50 backdrop-blur-sm border-primary/30 overflow-hidden">
```
Change to:
```tsx
<Card className="bg-card/50 backdrop-blur-sm border-primary/30 overflow-hidden hud-card-hover">
```

**Card 3 — Quick Facts card (right column, below carousel):**
Currently:
```tsx
<Card className="bg-card/50 backdrop-blur-sm border-primary/30">
```
This is a second Card with the same className as Card 1. Apply `hud-card-hover` here as well:
```tsx
<Card className="bg-card/50 backdrop-blur-sm border-primary/30 hud-card-hover">
```

Note: There are two Cards that currently share the className `"bg-card/50 backdrop-blur-sm border-primary/30"`. The first one is the bio text card (inside the left column `<div>`). The second is the Quick Facts card (inside the right column `<div className="flex flex-col space-y-6 sm:space-y-8">`). Both need `hud-card-hover` appended.

### Verification

After changes:

1. All three `<Card>` elements in the file have `hud-card-hover` appended to their className.
2. No text content, paragraph copy, badge labels, or heading text was changed.
3. No imports were added or removed.
4. `npx tsc --noEmit` reports no errors.
5. Visually: hovering over either card should show teal corner brackets contracting inward.

---

## PROMPT-5: Skills Section — HUD Module Panel Layout + Staggered Reveal
**Target Branch:** feature/skills-hud-panel
**Files to READ:** `src/components/sections/SkillsSection.tsx`, `src/hooks/useScrollAnimation.ts`
**Files to MODIFY:** `src/components/sections/SkillsSection.tsx`
**Depends On:** none

---

You are a frontend expert redesigning a single React component. The site uses Tailwind CSS with a cyberpunk/HUD dark theme. The primary color token is `text-primary` (neon teal `#64FFDA`). Monospace font is `font-mono` (JetBrains Mono).

DO NOT change any skill names, category titles, section heading text, or the "LEARNING & GROWTH" paragraph copy. Do not modify `useScrollAnimation.ts`. Do not change the `<section>` tag or its id/className.

### Context — current structure

`SkillsSection.tsx` currently renders a `sm:grid-cols-2 lg:grid-cols-3` CSS grid of six `<Card>` components, each containing a category title with an icon and a flex-wrap of `<Badge>` skill chips.

The `skillCategories` data array at the top of the file defines six categories: Languages, Frontend & Web, Backend & APIs, Databases, DevOps & Testing, Robotics & Engineering.

### Task A — Remap categories to 3 HUD domains

Replace the `skillCategories` array with a new `hudDomains` array that consolidates the six categories into three domains. Keep all skill name strings exactly as they are — only reorganize them into the new structure:

```ts
interface HudDomain {
  domain: string
  skills: string[]
}

const hudDomains: HudDomain[] = [
  {
    domain: 'Frontend',
    skills: [
      'TypeScript', 'JavaScript', 'React', 'Next.js', 'Redux',
      'HTML/CSS', 'D3.js', 'Three.js', 'Tailwind CSS', 'Figma',
    ],
  },
  {
    domain: 'Backend',
    skills: [
      'Python', 'SQL', 'C/C++', 'Node.js', 'Express', 'Django',
      'Flask', 'gRPC', 'REST APIs', 'PostgreSQL', 'MySQL', 'Redis',
      'SQLAlchemy', 'Docker', 'AWS S3', 'Git/GitHub', 'PyTest',
      'Jest', 'Jenkins', 'Travis CI', 'GitHub Actions', 'Jira', 'Postman',
    ],
  },
  {
    domain: 'Robotics',
    skills: [
      'ROS/ROS2', 'OpenCV', 'YOLOv8', 'Computer Vision', 'MATLAB', 'SolidWorks',
    ],
  },
]
```

Remove the old `SkillCategory` interface and `skillCategories` array. Remove unused imports (`Code2`, `Database`, `Layers`, `Cpu`, `Wrench`, `GitBranch` from lucide-react) since icons are no longer used in this layout.

### Task B — Replace the skills grid JSX with a unified HUD panel

Replace the `{/* Skills Grid */}` div block (the `<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">` and all its children) with this new panel structure:

```tsx
{/* HUD Skills Panel */}
<div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-sm">
  {/* Panel Header Tab */}
  <div className="px-4 py-2 border-b border-primary/20 flex items-center gap-3">
    <span className="font-mono text-primary text-xs">SYS.SKILLS_MAP v2.1</span>
    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
  </div>

  {/* Domain Rows */}
  <div className="p-4 sm:p-6 space-y-6">
    {hudDomains.map((domain, domainIndex) => (
      <div
        key={domainIndex}
        className="opacity-0 translate-y-4 transition-all duration-500"
        style={{
          transitionDelay: `${domainIndex * 120}ms`,
          transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        data-skill-row={domainIndex}
      >
        {/* Domain label with left teal border */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-0.5 h-5 bg-primary flex-shrink-0" />
          <span className="font-mono text-primary text-xs uppercase tracking-widest">
            {domain.domain}
          </span>
        </div>

        {/* Skill chips row */}
        <div className="flex flex-wrap gap-2 pl-3.5">
          {domain.skills.map((skill, skillIndex) => (
            <Badge
              key={skillIndex}
              variant="secondary"
              className="text-xs bg-secondary/50 hover:bg-primary/20 hover:text-primary hover:border-primary/50 transition-colors cursor-default font-mono"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-1.5 inline-block flex-shrink-0" />
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
```

### Task C — Add stagger reveal with IntersectionObserver

After the `hudDomains` constant (before the `SkillsSection` function), add this hook:

```ts
import { useEffect, useRef } from 'react'
```

Update the `SkillsSection` function to add a `useRef` and `useEffect` that reveals the domain rows when the section scrolls into view:

```tsx
export function SkillsSection() {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rows = panelRef.current?.querySelectorAll('[data-skill-row]')
    if (!rows) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const row = entry.target as HTMLElement
            const index = Number(row.dataset.skillRow ?? 0)
            setTimeout(() => {
              row.classList.remove('opacity-0', 'translate-y-4')
              row.classList.add('opacity-100', 'translate-y-0')
            }, index * 120)
          }
        })
      },
      { threshold: 0.2 }
    )

    rows.forEach((row) => observer.observe(row))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      ...
      {/* attach panelRef to the HUD panel div */}
      <div ref={panelRef} className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-sm">
        ...
      </div>
      ...
    </section>
  )
}
```

Add `ref={panelRef}` to the outermost panel `<div>` (the one with `className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-sm"`).

Keep the Section Header block and the "Additional Info" / "LEARNING & GROWTH" card at the bottom exactly as they are — do not change their content or className.

### Verification

After changes:

1. The old `skillCategories` array and `SkillCategory` interface are removed.
2. The new `hudDomains` array has exactly 3 entries: Frontend, Backend, Robotics.
3. No skill name strings were altered.
4. The skills grid `<div className="grid sm:grid-cols-2 lg:grid-cols-3 ...">` no longer exists.
5. A unified panel `<div>` exists with the header tab showing `SYS.SKILLS_MAP v2.1`.
6. Each domain row has `data-skill-row={domainIndex}` and starts hidden (`opacity-0`).
7. The IntersectionObserver hook removes `opacity-0` and `translate-y-4` when rows scroll into view.
8. Unused lucide-react icon imports are removed.
9. `npx tsc --noEmit` reports no errors.

---

## PROMPT-6: Experience Section — Info Hierarchy & HUD Card Brackets
**Target Branch:** feature/experience-hud
**Files to READ:** `src/components/sections/ExperienceSection.tsx`
**Files to MODIFY:** `src/components/sections/ExperienceSection.tsx`
**Depends On:** PROMPT-1 (requires `hud-card-hover` class to exist in globals.css)

---

You are a frontend expert making targeted className changes to a single React component. The site uses Tailwind CSS with a cyberpunk/HUD dark theme.

DO NOT change any text content, copy, props, data imports, or component logic. Only change className values on the specific elements described below.

The `hud-card-hover` CSS class already exists in `src/styles/globals.css`. It adds animated teal corner bracket pseudo-elements — brackets sit 4px outside at rest and contract to flush on hover, brightening from 40% to 100% opacity.

### Changes to make in `src/components/sections/ExperienceSection.tsx`

**Change 1 — Add `hud-card-hover` to each experience Card:**

The `<Card>` inside the `workExperienceList.map(...)` currently reads:
```tsx
<Card className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 group">
```
Change to:
```tsx
<Card className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 group hud-card-hover">
```

**Change 2 — Job title: apply full white opacity (Tier 1):**

The `<CardTitle>` for job title currently reads:
```tsx
<CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
```
This is already full opacity — verify it is `text-foreground` and do not change it.

**Change 3 — Company name link: apply teal at full primary (Tier 2, already correct):**

The `<a>` tag for company name contains `text-primary` — verify and do not change.

**Change 4 — Date Badge: apply monospace and subdued styling (Tier 3):**

The date `<Badge>` currently reads:
```tsx
<Badge
  variant="outline"
  className="font-mono text-xs border-primary/50 text-primary self-start"
>
```
Change to use 30% opacity muted text and a more subdued border:
```tsx
<Badge
  variant="outline"
  className="font-mono text-xs border-primary/20 text-muted-foreground/30 self-start"
>
```

**Change 5 — Timeline dot: replace circle with rotated square diamond marker:**

The timeline dot currently reads:
```tsx
<div className="hidden md:block absolute left-8 top-8 w-4 h-4 -ml-[0.4375rem] rounded-full bg-primary ring-4 ring-background" />
```
Change to a rotated square for a diamond/HUD marker effect:
```tsx
<div className="hidden md:block absolute left-8 top-8 w-3 h-3 -ml-[0.375rem] rotate-45 bg-primary ring-2 ring-background" />
```

**Change 6 — Timeline vertical spine: add teal glow:**

The vertical line currently reads:
```tsx
<div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-primary/30 hidden md:block" />
```
Change to include a teal box-shadow glow using an inline style, or update className to use a shadow. Since Tailwind doesn't have a direct `shadow-[0_0_8px_rgba(100,255,218,0.4)]` shorthand without arbitrary values, add it as an inline style:
```tsx
<div
  className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-primary/30 hidden md:block"
  style={{ boxShadow: '0 0 6px rgba(100, 255, 218, 0.3)' }}
/>
```

### Verification

After changes:

1. Every `<Card>` in `workExperienceList.map(...)` has `hud-card-hover` in its className.
2. Date `<Badge>` uses `text-muted-foreground/30` and `border-primary/20`.
3. Timeline dots use `rotate-45` (no `rounded-full`), making them diamond-shaped.
4. Vertical spine has the `style={{ boxShadow: ... }}` glow.
5. No text content was changed.
6. No imports were added or removed.
7. `npx tsc --noEmit` reports no errors.

---

## PROMPT-7: Projects + Contact Sections — HUD Card Brackets & Staggered Cards
**Target Branch:** feature/projects-contact-hud
**Files to READ:** `src/components/sections/ProjectsSection.tsx`, `src/components/sections/ContactSection.tsx`
**Files to MODIFY:** `src/components/sections/ProjectsSection.tsx`, `src/components/sections/ContactSection.tsx`
**Depends On:** PROMPT-1 (requires `hud-card-hover` class to exist in globals.css)

---

You are a frontend expert making targeted className and inline style additions to two React components. The site uses Tailwind CSS with a cyberpunk/HUD dark theme.

DO NOT change any text content, copy, props, data imports, or component logic. Only change className values and add inline `style` props where specified.

The `hud-card-hover` CSS class already exists in `src/styles/globals.css`. It adds animated teal corner bracket pseudo-elements — brackets sit 4px outside at rest and contract to flush on hover.

---

### ProjectsSection.tsx changes

**Change 1 — Add `hud-card-hover` and `--stagger-index` to each project Card:**

The `<Card>` inside `projectsList.map((project, index) => ...)` currently reads:
```tsx
<Card
  key={index}
  className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 group overflow-hidden flex flex-col"
>
```
Change to add `hud-card-hover` and a stagger `style` prop:
```tsx
<Card
  key={index}
  className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 group overflow-hidden flex flex-col hud-card-hover"
  style={{ '--stagger-index': index } as React.CSSProperties}
>
```

The image `group-hover:scale-105` class on the project image `<img>` tag is already present — do not change it.

**Change 2 — Add `hud-card-hover` to the "More Projects" CTA card:**

The bottom card currently reads:
```tsx
<Card className="bg-card/30 backdrop-blur-sm border-primary/20 inline-block">
```
Change to:
```tsx
<Card className="bg-card/30 backdrop-blur-sm border-primary/20 inline-block hud-card-hover">
```

---

### ContactSection.tsx changes

**Change 3 — Add `hud-card-hover` to the main Contact card:**

The main contact card currently reads:
```tsx
<Card className="bg-card/50 backdrop-blur-sm border-primary/30 mb-8">
```
Change to:
```tsx
<Card className="bg-card/50 backdrop-blur-sm border-primary/30 mb-8 hud-card-hover">
```

**Change 4 — Add `hud-card-hover` and `--stagger-index` to each social link Card:**

The `<Card>` inside `socialLinks.map((link, index) => ...)` currently reads:
```tsx
<Card
  key={index}
  className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 group"
>
```
Change to:
```tsx
<Card
  key={index}
  className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-primary/50 transition-all duration-300 group hud-card-hover"
  style={{ '--stagger-index': index } as React.CSSProperties}
>
```

**Change 5 — Ensure main CTA Button uses `shadow-primary/20` (verify only):**

The `<Button>` for "Send Me an Email" already has:
```tsx
className="font-mono bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
```
Verify this is present and do not change it.

**Change 6 — Add `hud-card-hover` to the footer note card:**

The footer card currently reads:
```tsx
<Card className="bg-card/30 backdrop-blur-sm border-primary/20">
```
Change to:
```tsx
<Card className="bg-card/30 backdrop-blur-sm border-primary/20 hud-card-hover">
```

---

### Verification

After changes:

1. In `ProjectsSection.tsx`: every `<Card>` in the projects map has `hud-card-hover` and a `style` prop with `--stagger-index`.
2. In `ProjectsSection.tsx`: the CTA card at the bottom has `hud-card-hover`.
3. In `ContactSection.tsx`: the main contact card has `hud-card-hover`.
4. In `ContactSection.tsx`: each social link card has `hud-card-hover` and a `style` prop with `--stagger-index`.
5. In `ContactSection.tsx`: the footer card has `hud-card-hover`.
6. No text content was changed in either file.
7. `npx tsc --noEmit` reports no errors.

---

## PROMPT-8-OPTIONAL: Layout — HUD Section Gate Dividers (Tier 2)
**Target Branch:** feature/layout-gate-dividers
**Files to READ:** `src/components/layout/Layout.tsx`
**Files to MODIFY:** `src/components/layout/Layout.tsx`
**Depends On:** PROMPT-1 (requires `hud-section-gate` class to exist in globals.css)

---

You are a frontend expert making a targeted structural addition to the site's Layout component. The site uses Tailwind CSS with a cyberpunk/HUD dark theme.

DO NOT change any existing elements in Layout.tsx (the scanlines overlay, vignette, HUD corner brackets, NavigationBar, or bottom status bar). Only add new elements inside `<main>`.

The `hud-section-gate` CSS class already exists in `src/styles/globals.css`. It renders a 60px tall decorative divider with faint teal top/bottom borders, centered status text at 20% opacity, and a gradient line. It is purely decorative (`pointer-events: none`).

### Change to make in `src/components/layout/Layout.tsx`

Currently `<main>` renders `{children}` directly:
```tsx
<main className="relative z-10 pt-16">
  {children}
</main>
```

The sections are rendered via `{children}` as a flat list from `App.tsx` in this order: HeroSection, AboutSection, SkillsSection, ExperienceSection, ProjectsSection, ContactSection.

Since `children` is a single prop, you cannot insert dividers between individual sections directly inside `Layout.tsx`. Instead, add four gate dividers inside the `<main>` as decorative absolute-positioned overlay elements. Position them at the approximate vertical boundaries between sections using percentage offsets. They should sit behind the content (z-index below sections).

Replace the `<main>` block with:

```tsx
<main className="relative z-10 pt-16">
  {/* HUD Section Gate Dividers — decorative separators */}
  <div className="hud-section-gate pointer-events-none" aria-hidden="true" />
  {children}
</main>
```

Note: A single gate divider at the top of `<main>` is sufficient to demonstrate the feature without complex positioning. If you want to add more dividers between sections, the cleanest approach is to modify `App.tsx` instead — but that is out of scope for this prompt. Add one divider immediately before `{children}` as shown above.

### Verification

After changes:

1. The `<main>` block has a `<div className="hud-section-gate pointer-events-none" aria-hidden="true" />` element before `{children}`.
2. No existing elements (scanlines, vignette, corner brackets, NavigationBar, status bar) were modified.
3. The `{children}` prop is still rendered and the layout still wraps all sections.
4. `npx tsc --noEmit` reports no errors.
5. Visually: a subtle 60px separator with faint teal borders and `// SECTOR BOUNDARY //` text appears between the navbar and the Hero section.

---
