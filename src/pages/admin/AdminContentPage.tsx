import { useAdminOutletContext } from "../../admin/AdminLayout";
import { useSiteContent } from "../../content/SiteContentProvider";
import { describeContentSections } from "../../lib/adminApi";

export default function AdminContentPage() {
  const { adminSession } = useAdminOutletContext();
  const { content } = useSiteContent();
  const sections = describeContentSections(content);

  return (
    <div className="admin-page-grid">
      <section className="surface-card admin-section-card">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Content</p>
            <h2>Website content structure</h2>
          </div>
          <a
            className="button button-accent"
            href={adminSession.directusUrl}
            rel="noreferrer"
            target="_blank"
          >
            Open Directus
          </a>
        </div>
        <p>
          Public pages now read from the CMS-backed content object. Use Directus to
          edit these sections without exposing admin tools on the public website.
        </p>
      </section>

      <div className="admin-card-grid">
        {sections.map((section) => (
          <article className="surface-card admin-section-card" key={section.label}>
            <p className="eyebrow">{section.label}</p>
            <h3>{section.value}</h3>
            <p>{section.note}</p>
          </article>
        ))}
      </div>

      <section className="surface-card admin-section-card">
        <p className="eyebrow">Current content source</p>
        <h3>{content.brand.fullName}</h3>
        <p>
          Brand copy, homepage hero, page text, focus areas, initiatives, contact
          details, and transparency notes are all structured for admin-managed
          updates.
        </p>
      </section>
    </div>
  );
}
