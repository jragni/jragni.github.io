# Refined HUD Redesign - Design Document

**Date:** 2026-03-06
**Branch:** EPIC/2026-march-updates
**Approach:** Moderate polish — rethink weak components, improve hierarchy/flow/animations

## Constraints

- Content/copy must NOT be modified
- Cyberpunk Drone HUD theme is maintained
- Remove Three.js dependency (unused)
- Keep bundle lean — CSS/SVG only for visual effects

## Section-by-Section Plan

### Global
- Dial back scanline/grid/vignette overlay intensity
- Improve scroll-triggered animations (staggered, varied)
- Better section transition spacing and visual flow
- Clean up unused `index.css` Vite defaults
- Remove Three.js and related packages

### Hero
- Better vertical rhythm and spacing
- Staggered entrance animations for heading/subheading/CTAs
- Refined CTA button grouping and hierarchy

### About
- Tighter integration of image carousel and bio content
- Better quick-facts presentation (visual differentiation)
- Improved card layout balance between columns

### Skills
- Rethink from wall-of-badges to grouped visual display
- Add hover states, visual categorization
- Consider compact layout with better information hierarchy

### Experience
- Stronger timeline visual (line, dots, connectors)
- Better card differentiation between roles
- Accent the career progression narrative

### Projects
- Featured/hero project gets larger treatment
- Staggered or asymmetric grid layout
- Better image overlays and hover interactions

### Contact
- Tighter, more visually interesting layout
- Better social card hover states
- More visual cohesion with rest of site

## Agent Architecture

| Agent | Branch | Responsibility |
|-------|--------|---------------|
| Orchestrator | EPIC/2026-march-updates | Spawns agents, reviews, merges |
| Researcher | (read-only, no branch) | Finds aesthetic inspiration, reports to orchestrator |
| Frontend Expert | feature/frontend-* (from EPIC) | Implements component redesigns |
| Reviewer | (read-only) | Reviews code, QA reports to orchestrator |
