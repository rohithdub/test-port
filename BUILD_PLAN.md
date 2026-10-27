# VYRON build sequence

The original standalone HTML is retained as reference material and is not used as the source of truth for the rebuild.

## Phase 0 — Source foundation (this package)
- Create a proper React + TypeScript + Vite project.
- Split navigation, content data, project details and the 3D core into separate modules.
- Establish one design-token system and responsive shell.
- Provide useful functionality before polishing effects.

**Gate:** install dependencies, pass type-check and production build, then run locally and verify all five navigation destinations.

## Phase 1 — Visual direction and composition
- Review desktop at 1440×900 and laptop at 1366×768.
- Review mobile widths at 390×844 and 360×800.
- Tune hierarchy, whitespace, core scale, contrast and context panel density.
- Fix defects before motion enhancement.

**Gate:** no clipped primary content, no horizontal page overflow, and each primary action is reachable on touch and keyboard.

## Phase 2 — Signature Prism Weave
- Validate the asymmetric silhouette and the deliberate upper-left gap.
- Refine geometry, material, light, depth and selected-destination response.
- Compare the SVG fallback against the same signature topology.
- Add sustained low-FPS fallback only after collecting real-device performance data.

**Gate:** silhouette is recognizable without bloom; 2D fallback preserves the same shape; the scene responds to navigation.

## Phase 3 — Content integrity
- Confirm all project stages, implemented stacks, demo and repository links.
- Add architecture, trade-offs, screenshots and verified results per project.
- Keep concepts clearly distinct from deployed or production systems.

**Gate:** no placeholder contact links, unverified metrics or implied live functionality.

## Phase 4 — Interaction and motion
- Tune micro-interactions and screen transitions to one motion grammar.
- Verify Escape, browser Back/Forward, direct hash routes and focus behavior.
- Respect reduced motion and prevent scroll jumps.

**Gate:** every interaction has a clear result and can be operated by keyboard and touch.

## Phase 5 — Performance, accessibility and release
- Profile desktop and mobile; optimize geometry, render scale and non-critical content.
- Check headings, contrast, labels, focus order, modal focus restoration and 2D access.
- Run production build and smoke tests on the actual deployment.

**Gate:** report measured results, do not self-certify performance without tests.
