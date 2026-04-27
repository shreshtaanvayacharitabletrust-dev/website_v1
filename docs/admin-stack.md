# Admin Stack Setup

This project now uses two separate admin surfaces:

- `Directus` for website content editing
- Hidden `/internal-admin` panel for inquiry management

Nothing links to the admin panel from the public navigation.

## 1. Directus content setup

Create a collection named `site_content` in Directus.

Recommended approach:

- create one item only
- mark read access as public or expose it through a read-only token
- keep Directus itself on a separate URL such as `https://admin.shreshtaanvayatrust.org`

Create these fields on `site_content` as `JSON` fields:

- `brand`
- `navigation`
- `socialLinks`
- `hero`
- `focusAreas`
- `coreStatements`
- `initiatives`
- `values`
- `actionPaths`
- `contactMethods`
- `involvementSteps`
- `transparencyNotes`
- `contactFormDefaults`
- `layout`
- `homePage`
- `whoWeArePage`
- `whatWeCareAboutPage`
- `whatWeDoPage`
- `getInvolvedPage`
- `transparencyPage`
- `contactPage`
- `submissionSettings`

Use the structure in [src/content/siteContent.ts](/Users/anvesh/Downloads/Shrestha%20Anvaya%20Charitable%20Trust/src/content/siteContent.ts:1) as the seed object for the first Directus record.

## 2. Cloudflare D1 setup

Create a D1 database and run:

```sql
.read cloudflare/d1/schema.sql
```

Bind the database in Cloudflare Pages as:

- `SUBMISSIONS_DB`

## 3. Cloudflare Pages environment variables

Set these variables in Cloudflare Pages:

- `DIRECTUS_URL`
  Example: `https://admin.shreshtaanvayatrust.org`
- `DIRECTUS_COLLECTION`
  Recommended value: `site_content`
- `DIRECTUS_TOKEN`
  Optional. Use this only if the content collection is not public.
- `ADMIN_PANEL_TOKEN`
  Shared secret required by `/internal-admin`

## 4. Protect the hidden admin panel

Use Cloudflare Access or an equivalent gate on:

- `/internal-admin*`
- `/api/inquiries*`

The page already asks for `ADMIN_PANEL_TOKEN`, but Access should still be enabled in production.

## 5. Admin URLs

- Public site: main domain
- Content admin: Directus URL
- Operations admin: `/internal-admin`

## 6. Runtime behavior

- Public pages load content from `/api/site-content`
- If Directus is unavailable, the site falls back to local defaults
- Contact, volunteer, partner, and newsletter submissions go to D1 through `/api/inquiries`
- `/internal-admin` lists submissions and can update statuses to `new`, `reviewing`, or `closed`
