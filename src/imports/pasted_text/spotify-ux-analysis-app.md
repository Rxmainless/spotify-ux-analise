You are updating an EXISTING interactive UX/UI analysis app about Spotify for a university group presentation.

MISSION
Deliver a presentation-ready academic demo that:
1) can be presented from a public hosted URL (preferred), and
2) still has a local offline fallback if classroom internet fails.

CRITICAL CONTEXT
- Delivery window: about 2 days
- Live presentation in a classroom with a projector
- Total speaking time for the whole group: about 10 minutes
- Viewers must NOT need terminal commands to see the project
- Primary delivery mode: hosted static site (Cloudflare Pages or GitHub Pages)
- Backup delivery mode: local offline build/open
- The professor values natural analytical flow, concrete evidence, and clarity
- Final result must look like an authentic student academic project

ABSOLUTE DO-NOT LIST
- Do not rebuild from scratch
- Do not invent a new brand system
- Do not turn this into a marketing site
- Do not add student grading, rankings, or participant evaluation screens
- Do not mention AI, prompts, generators, or automated assistance anywhere in UI/copy
- Do not use generic AI tone
- Do not add heavy dependencies
- Do not require SSR, servers, auth, or complex cloud functions
- Do not depend on internet for core UI once built
- Do not embed copyrighted commercial music by default

SOURCE OF TRUTH
- Preserve the existing academic structure and evidence-based content
- Preserve the analysis logic already present, especially:
  observation → evidence → impact → recommendation → priority
- Preserve working interactive demos already in the project
- Keep the sober Spotify-like visual system:
  - dark background (#0d0d0d / #121212)
  - accent green (#1ED760 or #1DB954)
  - clear hierarchy, rounded cards, restrained motion
- Language: 100% Portuguese (pt-BR)

PRESENTATION DESIGN (PROJECTOR + 10 MINUTES)
- Optimize for projection readability:
  - larger effective text
  - strong contrast
  - avoid tiny labels and dense walls of text
- Support fast live navigation:
  - keyboard arrows
  - next/previous
  - progress indicator
  - chapter menu
- Structure the narrative so it can be presented naturally in ~10 minutes:
  1. introduction / method
  2. visual system (typography, color, consistency)
  3. interaction and use (flow, responsiveness, flexibility)
  4. risk and inclusion (error prevention, accessibility)
  5. real-world friction / visibility issues
  6. synthesis and recommendations
- Prefer scannable blocks over long paragraphs
- Every screen should be orally explainable in a short time

HOSTED DELIVERY (PRIMARY)
- The app must be publishable as a static site
- Production build must output a static folder (Vite `dist`)
- Must work on:
  - Cloudflare Pages (publish directory: `dist`)
  - GitHub Pages (support project-page base path `/REPO_NAME/` when needed)
- Opening the public URL must be enough to present the full experience
- No install steps for the audience
- No localhost asset paths in production
- All routes/assets must resolve correctly on static hosting
- Keep the hosted demo free of login walls or setup screens

OFFLINE FALLBACK (MANDATORY BACKUP)
- After build, the project must remain usable without network for core presentation
- Self-contain critical assets
- Do not rely on remote font CDNs for the core interface
- Prefer local/system-safe font strategy after build
- Classroom plan:
  - preferred: open hosted URL
  - backup: open local production build if internet fails

WHAT TO ADD OR FIX

1) SUBTLE AUDIO ON CHAPTER CHANGE
- Short discreet feedback when changing chapter
- Respect prefers-reduced-motion
- Simple mute control
- No continuous soundtrack under chapters

2) INTERACTIVITY FOR LIVE DEMO
- Improve only screens that are too passive
- Keep error-prevention confirmation/undo clear
- Keep flow demo easy to demonstrate quickly
- Do not over-gamify

3) NATURAL FLOW AND FIT
- Fix cramped layout, overflow, weak spacing, and content colliding with header/footer
- Prioritize laptop/projector composition
- Mobile should remain acceptable
- Make the chapter sequence feel coherent for oral presentation

4) CLOSING SCREEN
- After the last chapter, provide a short sober thank-you/closing screen
- Academic tone only
- Optional brief Recife cultural note as a human closing signature
- Optional local audio only; never default to copyrighted commercial tracks
- Keep any educational independence note discreet and short

WRITING STYLE
- Sound like careful students defending design decisions
- Concrete > abstract
- Evidence > buzzwords
- Forbidden tone patterns include:
  “in today’s digital world”, “seamless”, “robust solution”, “leverage”, “delve”, “it is important to note”, and similar generic filler
- No UI text that exposes tooling or generation process

TECHNICAL SUCCESS CRITERIA
- `npm run build` produces deployable static files
- Hosted URL works for full presentation
- Offline/local fallback remains viable
- Readable on projector
- Navigable in a 10-minute group presentation
- No missing critical assets
- No broken imports
- No dependency on commands for the audience

OUTPUT EXPECTATION
Return an updated version of the existing app that a group can:
1) deploy to Cloudflare Pages or GitHub Pages, and
2) present confidently in class from the public link,
with local offline backup available if the network fails.

The result must feel like a polished student academic delivery, not a generated product redesign.