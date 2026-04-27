# Shrestha Anvaya Charitable Trust

Responsive NGO website built with `React`, `TypeScript`, and `Vite`.

It now supports:

- `Clerk` for admin authentication
- `Directus` as the website content backend
- protected `/internal-admin/*` admin workspace
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

Protected admin pages live under:

- `/internal-admin/dashboard`
- `/internal-admin/content`
- `/internal-admin/media`
- `/internal-admin/inquiries`
- `/internal-admin/volunteers-partners`
- `/internal-admin/users`
- `/internal-admin/settings`

Setup details are in:

- `docs/admin-stack.md`

## Project structure

- `src/App.tsx`: app routes
- `src/admin/`: Clerk auth flow and admin shell
- `src/components/`: shared UI building blocks
- `src/content/`: CMS content types, fallback data, provider
- `src/lib/`: Directus and inquiry API clients
- `src/pages/`: homepage and interior pages
- `functions/api/`: Cloudflare Pages Functions
- `functions/_lib/`: shared server auth helpers
- `cloudflare/d1/schema.sql`: inquiry storage schema
- `src/styles.css`: visual system and responsive styles
- `public/404.html`: SPA fallback for static hosting

## Current assumptions

- Real NGO logo and photos are not available yet.
- Contact details are placeholders and should be replaced later.
- Directus is hosted separately from the public site.
- Admin authentication is handled by Clerk.
- `ADMIN_ALLOWED_EMAILS` should be configured in production if sign-up should not automatically allow admin access.
