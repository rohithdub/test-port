# VYRON — by RK

A source-first rebuild of the VYRON personal command center. This project intentionally uses a modular Vite + React + TypeScript setup instead of editing a minified one-file bundle.

## Stack

- React + TypeScript + Vite
- Three.js via React Three Fiber for the original Prism Weave core
- Motion for React for restrained view and project transitions
- CSS design tokens and responsive layouts

## Run locally on Windows 11

1. Install Node.js LTS from the official Node.js website if it is not already installed.
2. Extract this project folder.
3. Open the folder in VS Code.
4. Open Terminal → New Terminal.
5. Run:

   ```bash
   npm install
   npm run dev
   ```

6. Open the local URL printed in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## Project layout

```text
src/
  App.tsx                   Main shell, navigation and screen state
  styles.css                Design system and responsive presentation
  components/
    PrismCore.tsx           Three.js Prism Weave + SVG fallback
    ProjectCard.tsx         Reusable project card
    ProjectDetail.tsx       Project detail modal
    ProjectLibrary.tsx      Search and category filters
  data/
    projects.ts             Single source of truth for project content
    site.ts                 Profile, skills and verified-link settings
```

## Important content rules

- Profile content is based on details already shared: second-year ECE student at Mailam Engineering College.
- No fabricated degree, grades, senior job titles, certifications or performance metrics are included.
- Project stages are conservative and each detail view includes a verification note where implementation status or claims need checking.
- Only the known Skill Bridge demo and portfolio source repository are linked. Add verified email and LinkedIn values in `src/data/site.ts` before launch.
- Confirm which Skill Bridge technologies are in the current prototype before presenting the full stack as implemented.

## Current foundation scope (v0.1)

Included: command-center shell, responsive navigation, URL hash navigation, keyboard shortcuts, custom Prism Weave 3D geometry, SVG fallback, project search/filter, project detail views, skills, trajectory and contact screens, reduced-motion handling.

Not yet signed off: browser-by-browser visual QA, accessibility audit, mobile device QA, performance profiling, final verified project copy and deployment configuration. The next iteration should test this baseline before major enhancements are added.
