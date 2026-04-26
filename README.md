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
