# Shrestha Anvaya Charitable Trust

Responsive NGO website built with `React`, `TypeScript`, and `Vite`.

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

## Edit content

Most editable website content is centralized in:

`src/content/siteContent.ts`

That file contains:

- navigation labels and routes
- homepage copy
- focus areas
- initiatives
- values
- placeholder contact details

## Project structure

- `src/App.tsx`: app routes
- `src/components/`: shared UI building blocks
- `src/pages/`: homepage and interior pages
- `src/styles.css`: visual system and responsive styles
- `public/404.html`: SPA fallback for static hosting

## Current assumptions

- Real NGO logo and photos are not available yet.
- Contact details are placeholders and should be replaced later.
- The website is static and does not include a backend or CMS.
