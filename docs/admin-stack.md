# Admin Stack Setup

This project now uses:

- `Clerk` for admin authentication
- `Directus` for website content management
- `Cloudflare D1` for public inquiry storage
- hidden admin routes under `/internal-admin/*`

## Admin URLs

- Auth entry: `/internal-admin`
- Dashboard: `/internal-admin/dashboard`
- Content: `/internal-admin/content`
- Media: `/internal-admin/media`
- Inquiries: `/internal-admin/inquiries`
- Volunteers & Partners: `/internal-admin/volunteers-partners`
- Users: `/internal-admin/users`
- Settings: `/internal-admin/settings`

The public website does not link to these routes.

## 1. Clerk setup

Create a Clerk application and enable the sign-in/sign-up methods you want for the admin team.

Minimum frontend environment:

- `VITE_CLERK_PUBLISHABLE_KEY`

Cloudflare server environment:

- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_AUTHORIZED_PARTIES`

Optional:

- `ADMIN_ALLOWED_EMAILS`
  Comma-separated admin email allowlist. If empty, any authenticated Clerk user can access the admin routes.

Recommended:

- Set `CLERK_AUTHORIZED_PARTIES` to your local and production origins
- Use `ADMIN_ALLOWED_EMAILS` in production so sign-up does not automatically grant admin access

## 2. Directus content setup

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

Use the structure in [src/content/siteContent.ts](/Users/anvesh/Downloads/Shrestha Anvaya Charitable Trust/src/content/siteContent.ts:1) as the seed object for the first Directus record.

## 3. Cloudflare D1 setup

Create a D1 database and run:

```bash
wrangler d1 execute <DATABASE_NAME> --file=cloudflare/d1/schema.sql
```

Bind the database in Cloudflare Pages as:

- `SUBMISSIONS_DB`

## 4. Cloudflare Pages environment variables

Set these variables in Cloudflare Pages:

- `DIRECTUS_URL`
- `DIRECTUS_COLLECTION`
- `DIRECTUS_TOKEN`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_AUTHORIZED_PARTIES`
- `ADMIN_ALLOWED_EMAILS`

Set this frontend variable for the Vite app:

- `VITE_CLERK_PUBLISHABLE_KEY`

Example local files:

- [.env.example](/Users/anvesh/Downloads/Shrestha Anvaya Charitable Trust/.env.example:1)
- [.dev.vars.example](/Users/anvesh/Downloads/Shrestha Anvaya Charitable Trust/.dev.vars.example:1)

## 5. Runtime behavior

- `/internal-admin` is the Clerk sign-in/sign-up entry page
- signed-in admins are redirected to `/internal-admin/dashboard`
- unauthenticated visitors to protected admin pages are redirected to `/internal-admin`
- `/api/admin/session` verifies the Clerk session and admin access
- `/api/inquiries` accepts public `POST` requests and Clerk-protected `GET`/`PATCH` requests
- public website content loads from `/api/site-content`
- if Directus is unavailable, the site falls back to local defaults
