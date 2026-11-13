# Portfolio (cpaskewitz.com) – Project Guide

Corey Paskewitz's personal portfolio: a single-page React site that shows his story, skills, projects,
his studio Corvian Labs, a contact form and a downloadable resume.

**Visual story: CORE** (Corey's Operating Runtime Environment). The site is a holographic interface that
projects Corey, his work and his studio as light in a dark room. It has its own identity, separate from
Corvian Labs: the Corvian section is an "uplink" that switches into Corvian's own moonlit navy/teal style.

## Tech
- Vite 8 + React 18 + TypeScript (strict) + SCSS. Live site is served by Vercel (static `dist/`); security headers
  are in `vercel.json` (CSP enforced) and `vite preview` serves the same set. Old Heroku files are in `archive/heroku/`.
- Contact form: EmailJS (`VITE_EMAILJS_*` in `.env`; the public key is public by design).
- 3D: `three` (raw), only in the hero hologram, loaded after load + idle on hardware WebGL only.
- Fonts: self-hosted variable woff2 in `public/fonts/` (Unbounded display, Geist body, Geist Mono HUD).
- Build: `npm run build` (`tsc && vite build`). Type-check: `npm run typecheck`. Lint: `npm run lint`.

## Directory map
```
src/
  data/            all content; components map over it
    profile.ts       identity, links, story milestones, dossier facts
    skills.ts        skill groups (capability matrix) + SkillId type
    projects.ts      projects (reference SkillIds)
    corvian.ts       Corvian Labs uplink copy + services (mirror of corvianlabs.com app/data/services.ts)
    navigation.ts    section index (HUD rail, dock, command palette, footer)
    seoData.ts, structuredData.ts   meta + JSON-LD
  styles/          tokens, fonts, base, shared system classes
  components/      one folder per component (tsx + scss)
public/            images, icons, resume PDF, fonts/, holo/depth.webp, og-image.png, corvian/ (assets copied
                   from the Corvian repo)
resume/resume.html the resume source; `node scripts/resume/render.mjs` writes public/Corey_Paskewitz_Resume.pdf
scripts/art/       imagegen.mjs (OpenAI), tripo.mjs (image → 3D), render-svg.mjs (SVG/HTML → PNG),
                   depth_from_alpha.py (hologram depth map)
scripts/qa/        shots.mjs, axe.mjs, lighthouse.mjs (Playwright + axe-core + Lighthouse 12)
art/source/        tracked art sources; art/drafts/ is git-ignored scratch
archive/           retired components (not compiled); move things here instead of deleting
```

## Conventions
- Content lives in `src/data/*`; components map over it.
- The resume is HTML in `resume/` rendered to PDF; edit the HTML, re-render, never hand-edit the PDF.
  The public copy never includes the phone number; `render.mjs --with-phone <path>` makes a private copy
  (it refuses to write that copy into `public/`). Keep the
  site's skill matrix (`src/data/skills.ts`) and the resume's Technical Skills in step.
- Social card: `art/source/og-card.html` → `node scripts/art/render-svg.mjs art/source/og-card.html public/og-image.png 1200 630`.
- Remove things by commenting out or moving to `archive/`, never deleting.
- Colour, type and spacing come from the CSS custom properties in `src/styles/_tokens.scss`. No raw hex in components.
- Accessibility: WCAG 2.1 AA, 0 axe violations at desktop and phone. Every animation has a reduced-motion and a
  coarse-pointer fallback. Never fade text to lower contrast. Decorative layers are `aria-hidden` and `pointer-events: none`.
- Performance: CSS over JS (scroll-driven `animation-timeline`, native `<details>`), WebP stills, lazy-load below the
  fold, CLS 0. 3D only after load + idle on hardware WebGL, otherwise the static fallback; never software WebGL.

## Art pipeline (dev-time only)
- Image generation: `node scripts/art/imagegen.mjs --out art/drafts/x.png --prompt "..." [--quality low|medium|high] [--background transparent] [--size 1024x1536] [--ref in.png]`.
  Spend is logged to `art/drafts/imagegen-log.jsonl`. API keys live in `~/.zshenv`; never print them.
- Image → 3D: `node scripts/art/tripo.mjs --balance` (free), then `--image ... --out art/source/x.glb` (~30 credits; ask first).
- Blender 5.1 headless: `/Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup -P script.py -- args`.
- Compress GLBs: `npx @gltf-transform/cli@4.1.1 quantize in.glb out.glb`.

## QA (before each merge)
1. `npm run build && npm run typecheck && npm run lint`
2. `npx vite preview --port 4173` then `npm run qa:shots`, `npm run qa:axe`, `npm run qa:lighthouse`.
   Headless Chromium has no GPU, so it exercises the hologram's static fallback; check the live 3D in a real browser.

Lighthouse baseline before the CORE redesign (Nov 2026): mobile perf 72 (LCP 7.9 s), desktop perf 97 (LCP 1.3 s);
a11y / best practices / SEO 100; CLS 0; 1.96 MB.

## Status
Branch `design/core-os`: CORE visual redesign (phases 1–3 + sound done, QA in progress). Resume updated Nov 2026
(help assistants, Salt & Spirit, ThawMail, Pensate; skills from all projects in ~/Projects).

Open items:
- Pawlunteer stays off the resume and site until it launches (owner decision, Nov 2026). Only list projects
  the owner has confirmed are complete.
- Check the OG card with LinkedIn Post Inspector.
- CSP is enforced (Nov 2026). Any new external host (script, font, API, image) must be added to `vercel.json` or it
  will be blocked; check the console in `vite preview`.
- EmailJS is on the free plan (no server-side rate limit); the Gmail service needs reconnecting in the EmailJS
  dashboard when Google revokes its grant (412 "Invalid grant").
