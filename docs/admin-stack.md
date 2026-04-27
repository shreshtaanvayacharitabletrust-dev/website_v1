# Admin Stack Setup

This project now uses only Cloudflare services plus Clerk:

- `Clerk` for admin authentication
- `Cloudflare D1` for published site content and public inquiries
- `Cloudflare R2` for uploaded media
- optional `Workers KV` for published content caching
- protected admin routes under `/internal-admin/*`

## Admin URLs

- Auth entry: `/internal-admin`
- Dashboard: `/internal-admin/dashboard`
- Content editor: `/internal-admin/content`
- Media library: `/internal-admin/media`
- Inquiries: `/internal-admin/inquiries`
- Volunteers & Partners: `/internal-admin/volunteers-partners`
- Users: `/internal-admin/users`
- Settings: `/internal-admin/settings`

The public website does not link to these routes.

## 1. Clerk setup

Create a Clerk application and enable the sign-in methods you want for admins.

Required frontend variable:

- `VITE_CLERK_PUBLISHABLE_KEY`

Required server variables:

- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_AUTHORIZED_PARTIES`

Optional server variables:

- `ADMIN_ALLOWED_EMAILS`
  Comma-separated admin email allowlist. If empty, any authenticated Clerk user can access the admin workspace.
- `PUBLIC_MEDIA_BASE_URL`
  Optional public base URL for R2 media. If omitted, the app serves media through `/api/media/:key`.

Recommended:

- set `CLERK_AUTHORIZED_PARTIES` to your local and production origins
- configure `ADMIN_ALLOWED_EMAILS` in production
- disable phone signup in Clerk if you only want email/password admin auth

Example local files:

- [.env.example](/Users/anvesh/Downloads/Shrestha Anvaya Charitable Trust/.env.example:1)
- [.dev.vars.example](/Users/anvesh/Downloads/Shrestha Anvaya Charitable Trust/.dev.vars.example:1)

## 2. D1 setup

Create a D1 database and run:

```bash
wrangler d1 execute <DATABASE_NAME> --file=cloudflare/d1/schema.sql
```

Bind the database in Cloudflare Pages as either:

- `SITE_DB`

or, for backward compatibility:

- `SUBMISSIONS_DB`

The code prefers `SITE_DB` and falls back to `SUBMISSIONS_DB`.

Tables created by the schema:

- `cms_site_content`
  Stores the published site content JSON document.
- `cms_media_assets`
  Stores metadata for uploaded R2 assets.
- `inquiries`
  Stores contact, support, volunteer, partner, and newsletter submissions.

## 3. R2 setup

Create an R2 bucket for media uploads and bind it in Cloudflare Pages as:

- `CMS_MEDIA_BUCKET`

The admin media page uploads files into this bucket and stores asset metadata in D1.

Optional:

- create a public custom domain for the bucket and set it as `PUBLIC_MEDIA_BASE_URL`
- otherwise the site will serve uploads through `/api/media/:key`

## 4. KV setup

Create a KV namespace only if you want cached published content.

Optional binding:

- `SITE_CONTENT_CACHE`

When present, `/api/site-content` caches the published D1 content in KV for faster repeated reads.

## 5. Cloudflare Pages variables and bindings

Set these variables in Cloudflare Pages:

- `VITE_CLERK_PUBLISHABLE_KEY`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `CLERK_AUTHORIZED_PARTIES`
- `ADMIN_ALLOWED_EMAILS`
- `PUBLIC_MEDIA_BASE_URL` optional

Set these bindings in Cloudflare Pages:

- `SITE_DB` or `SUBMISSIONS_DB`
- `CMS_MEDIA_BUCKET`
- `SITE_CONTENT_CACHE` optional

## 6. Runtime behavior

- `/internal-admin` is the Clerk sign-in and sign-up entry page
- authenticated admins are redirected to `/internal-admin/dashboard`
- unauthenticated visitors to protected admin pages are redirected to `/internal-admin`
- `/api/admin/session` verifies the Clerk session and admin allowlist
- `/api/admin/content` reads and writes the published site content document in D1
- `/api/admin/media` uploads, lists, and deletes R2 media assets
- `/api/inquiries` accepts public `POST` requests and Clerk-protected `GET`/`PATCH` requests
- `/api/site-content` serves the published site content record to the public site
- if no published D1 content exists yet, the public site falls back to [src/content/siteContent.ts](/Users/anvesh/Downloads/Shrestha Anvaya Charitable Trust/src/content/siteContent.ts:1)

## 7. First publish flow

1. Deploy the latest code to Cloudflare Pages.
2. Configure Clerk variables and admin allowlist.
3. Bind D1 and R2 in Cloudflare Pages.
4. Open `/internal-admin`.
5. Sign in as an allowed admin.
6. Open `/internal-admin/content`.
7. Review or replace the JSON content document.
8. Click `Publish content`.
9. Open `/internal-admin/media` to upload images and copy their URLs into the content JSON.
