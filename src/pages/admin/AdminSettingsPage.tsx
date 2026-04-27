import { isClerkConfigured } from "../../admin/clerkConfig";
import { useAdminOutletContext } from "../../admin/AdminLayout";
import { useSiteContent } from "../../content/SiteContentProvider";

export default function AdminSettingsPage() {
  const { adminSession } = useAdminOutletContext();
  const { cmsLoaded } = useSiteContent();

  return (
    <div className="admin-page-grid">
      <section className="surface-card admin-section-card">
        <p className="eyebrow">Settings</p>
        <h2>Cloudflare admin stack status</h2>
        <p>
          Use this page to confirm the current admin stack across Clerk, D1, R2,
          KV cache, and the protected admin routes.
        </p>
      </section>

      <div className="admin-card-grid">
        <article className="surface-card admin-section-card">
          <p className="eyebrow">Authentication</p>
          <h3>{isClerkConfigured ? "Clerk ready" : "Clerk missing"}</h3>
          <p>
            `/internal-admin` is the Clerk-based sign-in and sign-up entry route.
          </p>
        </article>

        <article className="surface-card admin-section-card">
          <p className="eyebrow">CMS storage</p>
          <h3>{adminSession.databaseConfigured ? "D1 configured" : "D1 missing"}</h3>
          <p>{cmsLoaded ? "Published content loaded from D1." : "Using bundled fallback content."}</p>
        </article>

        <article className="surface-card admin-section-card">
          <p className="eyebrow">Media storage</p>
          <h3>{adminSession.mediaConfigured ? "R2 configured" : "R2 missing"}</h3>
          <p>Media base URL: {adminSession.mediaBaseUrl}</p>
        </article>

        <article className="surface-card admin-section-card">
          <p className="eyebrow">Cache</p>
          <h3>{adminSession.cacheConfigured ? "KV configured" : "KV optional / missing"}</h3>
          <p>Published content can be cached in Workers KV when the binding is present.</p>
        </article>
      </div>

      <section className="surface-card admin-section-card">
        <p className="eyebrow">Admin URLs</p>
        <div className="admin-link-grid">
          <div className="admin-utility-link">
            <strong>Auth entry</strong>
            <small>/internal-admin</small>
          </div>
          <div className="admin-utility-link">
            <strong>Dashboard</strong>
            <small>/internal-admin/dashboard</small>
          </div>
          <div className="admin-utility-link">
            <strong>Content API</strong>
            <small>/api/admin/content</small>
          </div>
          <div className="admin-utility-link">
            <strong>Media API</strong>
            <small>/api/admin/media</small>
          </div>
          <div className="admin-utility-link">
            <strong>Public content</strong>
            <small>/api/site-content</small>
          </div>
          <div className="admin-utility-link">
            <strong>Public media</strong>
            <small>/api/media/:key</small>
          </div>
        </div>
      </section>
    </div>
  );
}
