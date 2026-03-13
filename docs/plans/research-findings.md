# Research Findings — Priority Recommendations

## Tier 1 — Highest Impact, Low Effort (CSS/className only)
1. Alternate section backgrounds: `bg-background` and `bg-card/30` with grid overlay on even sections
2. Reduce scroll animation Y-translate from 40px to 24px
3. Apply 3-tier info hierarchy (opacity levels) to Experience card content
4. Complete HUD frame with all 4 corner brackets on cards

## Tier 2 — High Impact, Moderate Effort (component-level)
5. Staggered child reveal on Skills/Projects using IntersectionObserver (delay: 0.1*index)
6. Convert skills section to HUD Module status indicator rows
7. Expanding corner bracket hover animation ("lock-on") on all cards
8. Section "gate" dividers between sections as HUD status bars

## Tier 3 — Premium Polish, Higher Effort (new animation/interaction)
9. Rotating conic-gradient border sweep on card hover
10. Text scramble/decrypt animation on section heading reveal
11. Mouse-tracked 3D card tilt with internal glow on project cards
12. Timeline alternating left-right layout with pulsing diamond markers

## Key Design Patterns

### Section Differentiation
- Alternate bg-background / bg-card/30 between sections
- Add 60px "section gate" dividers with HUD brackets + scrolling status text at 20% opacity
- Ghost-opacity monospace code fragments behind section headers (4% opacity)

### Card Hover — HUD Lock-On (Priority)
- 4 corner L-brackets positioned 4px outside card at rest
- On hover: contract inward to flush (200ms ease-out)
- Brightness from rgba(100,255,218,0.4) to rgba(100,255,218,1.0)

### Skills Section — HUD Module Status Indicators
- Single unified panel with domain zones (Frontend, Backend, Robotics)
- Each skill: 2px left teal border + active dot + JetBrains Mono name
- Panel title tab: `SYS.SKILLS_MAP v2.1`

### Experience Timeline
- Alternating left-right layout at md+ breakpoints
- Diamond markers (rotated squares) with pulse-reticle animation
- Teal glow on connector spine

### Scroll Animations
- Stagger: 80-120ms between children
- Duration: 500-600ms per element
- Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
- Y-translate: 24px (not 40px)
- Text scramble on section headings (400ms decode)

### Info Hierarchy (3-tier)
- Tier 1: full opacity, large, white (titles)
- Tier 2: medium, teal primary (company names)
- Tier 3: tiny monospace, 30% opacity (metadata/dates)
