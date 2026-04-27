import { useEffect, useMemo, useState } from "react";
import { useAdminOutletContext } from "../../admin/AdminLayout";
import { formatAdminDate, formatInquiryKind } from "../../admin/utils";
import { fetchAdminInquiries, type AdminInquiry } from "../../lib/adminApi";

const ENGAGEMENT_KINDS = new Set(["support", "volunteer", "partner"]);

export default function AdminEngagementPage() {
  const { getToken } = useAdminOutletContext();
  const [items, setItems] = useState<AdminInquiry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminInquiries(getToken)
      .then((nextItems) =>
        setItems(nextItems.filter((item) => ENGAGEMENT_KINDS.has(item.kind))),
      )
      .catch((nextError) => {
        setError(
          nextError instanceof Error
            ? nextError.message
            : "The engagement inquiries could not be loaded.",
        );
      });
  }, [getToken]);

  const grouped = useMemo(() => {
    return {
      support: items.filter((item) => item.kind === "support"),
      volunteer: items.filter((item) => item.kind === "volunteer"),
      partner: items.filter((item) => item.kind === "partner"),
    };
  }, [items]);

  return (
    <div className="admin-page-grid">
      <section className="surface-card admin-section-card">
        <p className="eyebrow">Volunteers &amp; Partners</p>
        <h2>Engagement-focused submissions</h2>
        <p>
          This view keeps support, volunteer, and partnership requests together so
          outreach-related follow-up can be handled quickly.
        </p>
      </section>

      {error ? <p className="form-feedback form-feedback-error">{error}</p> : null}

      <section className="admin-summary-row">
        <article className="surface-card admin-summary-card">
          <h3>Support</h3>
          <p>{grouped.support.length}</p>
        </article>
        <article className="surface-card admin-summary-card">
          <h3>Volunteer</h3>
          <p>{grouped.volunteer.length}</p>
        </article>
        <article className="surface-card admin-summary-card">
          <h3>Partner</h3>
          <p>{grouped.partner.length}</p>
        </article>
      </section>

      <div className="admin-card-grid">
        {items.map((item) => (
          <article className="surface-card admin-section-card" key={item.id}>
            <p className="contact-label">{formatInquiryKind(item.kind)}</p>
            <h3>{item.subject || `${formatInquiryKind(item.kind)} request`}</h3>
            <p>{item.message || "No message provided."}</p>
            <div className="admin-inline-meta">
              <span>{item.email}</span>
              <span>{formatAdminDate(item.createdAt)}</span>
            </div>
          </article>
        ))}
        {items.length === 0 ? (
          <p className="admin-empty-state">
            No support, volunteer, or partnership submissions have been received
            yet.
          </p>
        ) : null}
      </div>
    </div>
  );
}
