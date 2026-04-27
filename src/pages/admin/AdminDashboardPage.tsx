import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminOutletContext } from "../../admin/AdminLayout";
import { formatAdminDate, formatInquiryKind } from "../../admin/utils";
import {
  buildDashboardSummary,
  fetchAdminInquiries,
  type AdminInquiry,
} from "../../lib/adminApi";

export default function AdminDashboardPage() {
  const { getToken } = useAdminOutletContext();
  const [items, setItems] = useState<AdminInquiry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminInquiries(getToken)
      .then(setItems)
      .catch((nextError) => {
        setError(
          nextError instanceof Error
            ? nextError.message
            : "The dashboard summary could not be loaded.",
        );
      });
  }, [getToken]);

  const summary = buildDashboardSummary(items);
  const recentItems = items.slice(0, 5);

  return (
    <div className="admin-page-grid">
      <section className="surface-card admin-section-card">
        <p className="eyebrow">Dashboard</p>
        <h2>Admin overview</h2>
        <p>
          Review current public submissions, jump into content management, and
          keep the operational admin routes organized from one protected sidebar.
        </p>
      </section>

      {error ? <p className="form-feedback form-feedback-error">{error}</p> : null}

      <section className="admin-summary-row">
        <article className="surface-card admin-summary-card">
          <h3>Total inquiries</h3>
          <p>{summary.total}</p>
        </article>
        <article className="surface-card admin-summary-card">
          <h3>New</h3>
          <p>{summary.newCount}</p>
        </article>
        <article className="surface-card admin-summary-card">
          <h3>Reviewing</h3>
          <p>{summary.reviewingCount}</p>
        </article>
        <article className="surface-card admin-summary-card">
          <h3>Closed</h3>
          <p>{summary.closedCount}</p>
        </article>
      </section>

      <div className="admin-two-column">
        <section className="surface-card admin-section-card">
          <div className="admin-section-header">
            <div>
              <p className="eyebrow">Recent activity</p>
              <h3>Latest submissions</h3>
            </div>
            <Link className="button button-soft" to="/internal-admin/inquiries">
              Open inquiries
            </Link>
          </div>
          <div className="admin-compact-list">
            {recentItems.map((item) => (
              <article className="admin-compact-item" key={item.id}>
                <div>
                  <strong>{item.subject || `${formatInquiryKind(item.kind)} inquiry`}</strong>
                  <p>
                    {item.email} · {formatInquiryKind(item.kind)}
                  </p>
                </div>
                <small>{formatAdminDate(item.createdAt)}</small>
              </article>
            ))}
            {recentItems.length === 0 ? (
              <p className="admin-empty-state">No inquiries have been submitted yet.</p>
            ) : null}
          </div>
        </section>

        <section className="surface-card admin-section-card">
          <p className="eyebrow">Quick links</p>
          <h3>Common admin destinations</h3>
          <div className="admin-link-grid">
            <Link className="admin-utility-link" to="/internal-admin/content">
              <strong>Content</strong>
              <small>Review editable website sections.</small>
            </Link>
            <Link className="admin-utility-link" to="/internal-admin/media">
              <strong>Media</strong>
              <small>Check images, links, and published assets.</small>
            </Link>
            <Link className="admin-utility-link" to="/internal-admin/volunteers-partners">
              <strong>Volunteers &amp; Partners</strong>
              <small>Focus on engagement-related submissions.</small>
            </Link>
            <Link className="admin-utility-link" to="/internal-admin/settings">
              <strong>Settings</strong>
              <small>Review the current admin integration status.</small>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
