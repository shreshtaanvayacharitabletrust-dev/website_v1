import { startTransition, useDeferredValue, useEffect, useMemo, useState } from "react";
import { useAdminOutletContext } from "../../admin/AdminLayout";
import { formatAdminDate, formatInquiryKind } from "../../admin/utils";
import {
  buildInquiryCsv,
  buildDashboardSummary,
  downloadCsv,
  fetchAdminInquiries,
  updateInquiryStatus,
  type AdminInquiry,
  type InquiryStatus,
} from "../../lib/adminApi";

function matchesSearch(item: AdminInquiry, query: string) {
  if (!query) {
    return true;
  }

  const haystack = [
    item.subject,
    item.name,
    item.email,
    item.message,
    item.kind,
    item.sourcePage,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export default function AdminInquiriesPage() {
  const { getToken } = useAdminOutletContext();
  const [items, setItems] = useState<AdminInquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | InquiryStatus>("all");
  const [kindFilter, setKindFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const deferredSearch = useDeferredValue(searchQuery);

  const loadItems = async () => {
    setLoading(true);
    setError("");

    try {
      const nextItems = await fetchAdminInquiries(getToken);

      startTransition(() => {
        setItems(nextItems);
      });
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "The inquiries could not be loaded.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, [getToken]);

  const visibleItems = useMemo(() => {
    return items.filter((item) => {
      const matchesStatus =
        statusFilter === "all" ? true : item.status === statusFilter;
      const matchesKind = kindFilter === "all" ? true : item.kind === kindFilter;

      return matchesStatus && matchesKind && matchesSearch(item, deferredSearch);
    });
  }, [deferredSearch, items, kindFilter, statusFilter]);

  const summary = buildDashboardSummary(visibleItems);
  const kinds = Array.from(new Set(items.map((item) => item.kind))).sort();

  const handleStatusUpdate = async (id: string, status: InquiryStatus) => {
    try {
      await updateInquiryStatus({
        getToken,
        id,
        status,
      });

      setItems((current) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                status,
                updatedAt: new Date().toISOString(),
              }
            : item,
        ),
      );
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "The inquiry status could not be updated.",
      );
    }
  };

  return (
    <div className="admin-page-grid">
      <section className="surface-card admin-section-card">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Inquiries</p>
            <h2>Search, filter, and export submissions</h2>
          </div>
          <div className="admin-toolbar-actions">
            <button className="button button-soft" type="button" onClick={() => void loadItems()}>
              Refresh
            </button>
            <button
              className="button button-accent"
              type="button"
              onClick={() =>
                downloadCsv(
                  "shrestha-anvaya-inquiries.csv",
                  buildInquiryCsv(visibleItems),
                )
              }
            >
              Export CSV
            </button>
          </div>
        </div>

        <div className="admin-filter-grid">
          <label>
            Search
            <input
              placeholder="Search subject, email, message, or source"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>

          <label>
            Status
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as "all" | InquiryStatus)
              }
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="closed">Closed</option>
            </select>
          </label>

          <label>
            Type
            <select
              value={kindFilter}
              onChange={(event) => setKindFilter(event.target.value)}
            >
              <option value="all">All</option>
              {kinds.map((kind) => (
                <option key={kind} value={kind}>
                  {formatInquiryKind(kind)}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {error ? <p className="form-feedback form-feedback-error">{error}</p> : null}
      {loading ? <p className="form-feedback form-feedback-success">Loading inquiries...</p> : null}

      <section className="admin-summary-row">
        <article className="surface-card admin-summary-card">
          <h3>Visible records</h3>
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

      <div className="admin-inquiry-list">
        {visibleItems.map((item) => (
          <article className="surface-card admin-inquiry-card" key={item.id}>
            <div className="admin-inquiry-head">
              <div>
                <p className="contact-label">{formatInquiryKind(item.kind)}</p>
                <h3>{item.subject || "No subject provided"}</h3>
              </div>
              <span className={`admin-status-pill admin-status-${item.status}`}>
                {item.status}
              </span>
            </div>

            <div className="admin-meta-grid">
              <div>
                <strong>Name</strong>
                <p>{item.name || "Not provided"}</p>
              </div>
              <div>
                <strong>Email</strong>
                <p>{item.email}</p>
              </div>
              <div>
                <strong>Phone</strong>
                <p>{item.phone || "Not provided"}</p>
              </div>
              <div>
                <strong>Source</strong>
                <p>{item.sourcePage}</p>
              </div>
              <div>
                <strong>Created</strong>
                <p>{formatAdminDate(item.createdAt)}</p>
              </div>
              <div>
                <strong>Updated</strong>
                <p>{formatAdminDate(item.updatedAt)}</p>
              </div>
            </div>

            <div className="admin-message-block">
              <strong>Message</strong>
              <p>{item.message || "No message provided."}</p>
            </div>

            <div className="admin-status-actions">
              <button
                className="button button-ghost"
                type="button"
                onClick={() => void handleStatusUpdate(item.id, "new")}
              >
                Mark New
              </button>
              <button
                className="button button-soft"
                type="button"
                onClick={() => void handleStatusUpdate(item.id, "reviewing")}
              >
                Mark Reviewing
              </button>
              <button
                className="button button-primary"
                type="button"
                onClick={() => void handleStatusUpdate(item.id, "closed")}
              >
                Mark Closed
              </button>
            </div>
          </article>
        ))}

        {!loading && visibleItems.length === 0 ? (
          <p className="admin-empty-state">No inquiries match the current filters.</p>
        ) : null}
      </div>
    </div>
  );
}
