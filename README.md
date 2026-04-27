# Shrestha Anvaya Charitable Trust

Responsive NGO website built with `React`, `TypeScript`, and `Vite`.

It now supports:

- `Directus` as the website content admin
- hidden `/internal-admin` operations panel for inquiries
- `Cloudflare Pages Functions` for API routes
- `Cloudflare D1` for public form submissions

## Run locally

```bash
npm install
npm run dev
```

Default Vite URL:

```text
http://localhost:5173
```

The current session is also serving it on:

```text
http://127.0.0.1:4173
```

## Build for production

```bash
npm run build
```

Production output is generated in `dist/`.

## Deploy to Cloudflare Pages

This project is a static React/Vite site and is ready for Cloudflare Pages.

Recommended Pages settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

SPA routing support is handled by:

- `public/_redirects`

This makes deep links like `/who-we-are` or `/contact` resolve correctly on Cloudflare Pages.

## Content and admin

The public website reads content from:

- `/api/site-content` on Cloudflare Pages Functions

That endpoint proxies a Directus collection named `site_content`.

Local fallback content still lives in:

- `src/content/siteContent.ts`

The hidden operations panel lives at:

- `/internal-admin`

Setup details are in:

- `docs/admin-stack.md`

## Project structure

- `src/App.tsx`: app routes
- `src/components/`: shared UI building blocks
- `src/content/`: CMS content types, fallback data, provider
- `src/lib/`: Directus and inquiry API clients
- `src/pages/`: homepage and interior pages
- `functions/api/`: Cloudflare Pages Functions
- `cloudflare/d1/schema.sql`: inquiry storage schema
- `src/styles.css`: visual system and responsive styles
- `public/404.html`: SPA fallback for static hosting

## Current assumptions

- Real NGO logo and photos are not available yet.
- Contact details are placeholders and should be replaced later.
- Directus is hosted separately from the public site.
- The hidden admin route should be protected with Cloudflare Access in production.
