import { isClerkConfigured } from "../../admin/clerkConfig";
import { useAdminOutletContext } from "../../admin/AdminLayout";
import { useSiteContent } from "../../content/SiteContentProvider";

export default function AdminSettingsPage() {
  const { adminSession } = useAdminOutletContext();
  const { cmsLoaded, content } = useSiteContent();

  return (
    <div className="admin-page-grid">
      <section className="surface-card admin-section-card">
        <p className="eyebrow">Settings</p>
        <h2>Integration status</h2>
        <p>
          Use this page to confirm the current admin stack configuration across
          Clerk, Directus, and the Cloudflare-backed operational data layer.
        </p>
      </section>

      <div className="admin-card-grid">
        <article className="surface-card admin-section-card">
          <p className="eyebrow">Authentication</p>
          <h3>{isClerkConfigured ? "Clerk ready" : "Clerk missing"}</h3>
          <p>
            `/internal-admin` is now a Clerk-based sign-in and sign-up entry route.
          </p>
        </article>

        <article className="surface-card admin-section-card">
          <p className="eyebrow">CMS</p>
          <h3>{cmsLoaded ? "Directus content loaded" : "Using local fallback content"}</h3>
          <p>Directus URL: {adminSession.directusUrl}</p>
        </article>

        <article className="surface-card admin-section-card">
          <p className="eyebrow">Operations data</p>
          <h3>{content.submissionSettings.databaseEnabled ? "D1 active" : "Mail fallback active"}</h3>
          <p>
            Public inquiry forms submit into the Cloudflare-backed operations layer
            when database storage is enabled.
          </p>
        </article>
      </div>

      <section className="surface-card admin-section-card">
        <p className="eyebrow">Admin URLs</p>
        <div className="admin-link-grid">
          <a
            className="admin-utility-link"
            href={adminSession.directusUrl}
            rel="noreferrer"
            target="_blank"
          >
            <strong>Directus</strong>
            <small>{adminSession.directusUrl}</small>
          </a>
          <div className="admin-utility-link">
            <strong>Auth entry</strong>
            <small>/internal-admin</small>
          </div>
          <div className="admin-utility-link">
            <strong>Dashboard</strong>
            <small>/internal-admin/dashboard</small>
          </div>
          <div className="admin-utility-link">
            <strong>Inquiries API</strong>
            <small>/api/inquiries</small>
          </div>
        </div>
      </section>
    </div>
  );
}
