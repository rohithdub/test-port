# Agent rules for VYRON

This file is the project contract for Antigravity, IDE agents and future contributors.

## Product identity
- Product name: **VYRON — by RK**. Do not rename it to NEXUS or use a generic sci-fi template.
- Design idea: a distinct digital environment with an identifiable visual grammar, not a standard dashboard wearing a dark theme.
- Signature form: **Prism Weave** — asymmetrical vertical central prism, three offset faceted pathways, deliberate upper-left gap and one bright teal seam. It must not become a sphere or a random particle globe.
- Palette: midnight navy / charcoal, muted silver, electric teal and selected cyan accents. Glow is an accent, not the whole visual language.
- Motion signature: `cubic-bezier(0.19, 1, 0.22, 1)` for standard interface transitions; continuous 3D movement stays subtle and respects reduced motion.

## Engineering rules
1. Make changes in `src/`, not in a generated `dist/` bundle.
2. Keep site data centralized in `src/data/site.ts` and project data in `src/data/projects.ts`.
3. Work in narrow, named tasks. Do not refactor the whole application to satisfy a small task.
4. Before editing, inspect the existing component and reuse current patterns.
5. After editing, run `npm run typecheck` and `npm run build`; report the actual command output. If dependencies are unavailable, say so—do not claim the build passed.
6. Keep a checkpoint before broad changes. Do not overwrite the original single-file reference archive.
7. Do not introduce placeholder buttons that look functional but do nothing. Disabled or unavailable actions must say why.
8. Test direct hash routes, browser Back/Forward, Escape, keyboard shortcuts, search, filters, project detail open/close and mobile navigation after relevant changes.
9. Check reduced-motion behavior and keep a usable SVG/non-WebGL fallback for the main signature shape.
10. Do not claim frame rates, Lighthouse scores, accessibility compliance or cross-browser support without measuring them.

## Content integrity
- Portfolio owner is a second-year ECE student at Mailam Engineering College.
- Describe abilities as a working toolkit; do not claim expertise in every listed technology.
- Never invent a GPA, job title, internship, certification, award, business outcome, user count or performance metric.
- Projects may be concepts or prototypes. Use the stage in `projects.ts`; do not imply a concept is deployed software.
- The Skill Bridge demo URL is currently set. Confirm the contents and stack before treating every stack entry as implemented.
- Keep email and LinkedIn unset until the owner supplies and confirms the intended public values.

## Current scope
The current project is the source foundation (v0.1). Do not call it production-ready. Next gates are visual review, content confirmation, core refinement, interaction testing and deployment verification.
