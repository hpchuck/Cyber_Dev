# Cyber Dev Portfolio

A production-ready personal portfolio built with React, TypeScript, and Vite, focused on immersive UI, smooth animation, and strong performance. The site includes project showcases, skills, experience timeline, testimonials, pricing matrix, and contact workflows.

## Highlights

- Modern visual system with dark theme and glass-style components
- Interactive 3D/animated sections powered by GSAP and Framer Motion
- Data-driven content management via Zustand state store
- Mobile-first responsive layout across all sections
- Admin-oriented content controls (projects, skills, experience, testimonials, pricing)
- Optimized production build with lazy-loaded sections

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- GSAP
- Zustand
- Three.js / React Three Fiber / Spline

## Project Structure

```text
src/
	components/
		admin/
		ui/
	data/
		initial-data.json
	hooks/
	pages/
	store/
	styles/
	utils/
public/
supabase/
```

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+

### Install and Run

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Available Scripts

- `npm run dev`: Start local dev server
- `npm run build`: Create production build in `dist/`
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint checks

## Deployment

This repository is configured for Netlify deployment.

- Build command: `npm run build`
- Publish directory: `dist`
- SPA routing is handled in `netlify.toml`
- Deploy previews can be enabled for pull requests in Netlify settings

## Data and Content Notes

- Default content is sourced from `src/data/initial-data.json`.
- If content appears different between local and deployed environments, verify persisted browser storage and store migration version in `src/store/useStore.ts`.

## Branching

- `main`: stable/default branch
- `Cyber_Dev_Glitch_Themed_V1`: glitch themed variant
- `Cyber_Dev_Vortex_Themed_V2`: vortex themed variant

## Security Note

Do not place sensitive credentials in frontend-exposed variables. Keep secrets in a trusted backend or platform-level secure environment variables.

## License

Apache License 2.0
