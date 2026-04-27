import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSiteContent } from "../content/SiteContentProvider";
import {
  fetchAdminInquiries,
  updateInquiryStatus,
  type AdminInquiry,
  type InquiryStatus,
} from "../lib/adminInquiries";

const STORAGE_KEY = "sat-admin-token";

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function getStatusLabel(status: InquiryStatus) {
  switch (status) {
    case "new":
      return "New";
    case "reviewing":
      return "Reviewing";
    case "closed":
      return "Closed";
    default:
      return status;
  }
}

export default function InternalAdminPage() {
  const { content } = useSiteContent();
  const [enteredToken, setEnteredToken] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [inquiries, setInquiries] = useState<AdminInquiry[]>([]);
  const [loadState, setLoadState] = useState<{
    state: "idle" | "loading" | "error";
    message: string;
  }>({
    state: "idle",
    message: "",
  });

  const hasAdminToken = useMemo(() => adminToken.length > 0, [adminToken]);

  const loadInquiries = async (token: string) => {
    setLoadState({
      state: "loading",
      message: "",
    });

    try {
      const nextItems = await fetchAdminInquiries(token);
      setInquiries(nextItems);
      setLoadState({
        state: "idle",
        message: "",
      });
    } catch (error) {
      setLoadState({
        state: "error",
        message:
          error instanceof Error ? error.message : "The admin data could not be loaded.",
      });
    }
  };

  useEffect(() => {
    const storedToken = window.sessionStorage.getItem(STORAGE_KEY) || "";

    if (!storedToken) {
      return;
    }

    setEnteredToken(storedToken);
    setAdminToken(storedToken);
  }, []);

  useEffect(() => {
    if (!adminToken) {
      return;
    }

    void loadInquiries(adminToken);
  }, [adminToken]);

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!enteredToken) {
      return;
    }

    window.sessionStorage.setItem(STORAGE_KEY, enteredToken);
    setAdminToken(enteredToken);
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(STORAGE_KEY);
    setAdminToken("");
    setEnteredToken("");
    setInquiries([]);
    setLoadState({
      state: "idle",
      message: "",
    });
  };

  const handleStatusUpdate = async (id: string, status: InquiryStatus) => {
    if (!adminToken) {
      return;
    }

    try {
      await updateInquiryStatus({
        adminToken,
        id,
        status,
      });

      setInquiries((current) =>
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
    } catch (error) {
      setLoadState({
        state: "error",
        message:
          error instanceof Error ? error.message : "The inquiry status could not be updated.",
      });
    }
  };

  if (!hasAdminToken) {
    return (
      <section className="section admin-section">
        <div className="container">
          <div className="admin-login-card">
            <p className="eyebrow">Internal Admin</p>
            <h1>Operations access</h1>
            <p className="page-hero-intro">
              Enter the admin token configured for this deployment to review public
              inquiries. Website content continues to be managed in Directus.
            </p>

            <form className="contact-form" onSubmit={handleUnlock}>
              <label>
                Admin token
                <input
                  autoComplete="current-password"
                  type="password"
                  value={enteredToken}
                  onChange={(event) => setEnteredToken(event.target.value)}
                />
              </label>

              <button className="button button-primary" type="submit">
                Open Admin Panel
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section admin-section">
      <div className="container">
        <div className="admin-toolbar">
          <div>
            <p className="eyebrow">Internal Admin</p>
            <h1>Submission management</h1>
            <p className="page-hero-intro">
              This panel is intentionally hidden from the public navigation and is
              meant to be protected with Cloudflare Access plus the admin token.
            </p>
          </div>

          <div className="admin-toolbar-actions">
            <button className="button button-soft" type="button" onClick={() => void loadInquiries(adminToken)}>
              Refresh
            </button>
            <a
              className="button button-accent"
              href={content.submissionSettings.adminUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open Directus
            </a>
            <button className="button button-ghost" type="button" onClick={handleLogout}>
              Lock
            </button>
          </div>
        </div>

        {loadState.message ? (
          <p className={`form-feedback ${loadState.state === "error" ? "form-feedback-error" : "form-feedback-success"}`}>
            {loadState.message}
          </p>
        ) : null}

        <div className="admin-summary-row">
          <div className="surface-card admin-summary-card">
            <h3>Total records</h3>
            <p>{inquiries.length}</p>
          </div>
          <div className="surface-card admin-summary-card">
            <h3>New</h3>
            <p>{inquiries.filter((item) => item.status === "new").length}</p>
          </div>
          <div className="surface-card admin-summary-card">
            <h3>Reviewing</h3>
            <p>{inquiries.filter((item) => item.status === "reviewing").length}</p>
          </div>
          <div className="surface-card admin-summary-card">
            <h3>Closed</h3>
            <p>{inquiries.filter((item) => item.status === "closed").length}</p>
          </div>
        </div>

        <div className="admin-inquiry-list">
          {inquiries.map((item) => (
            <article className="surface-card admin-inquiry-card" key={item.id}>
              <div className="admin-inquiry-head">
                <div>
                  <p className="contact-label">{item.kind}</p>
                  <h3>{item.subject || "No subject provided"}</h3>
                </div>
                <span className={`admin-status-pill admin-status-${item.status}`}>
                  {getStatusLabel(item.status)}
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
                  <p>{formatDate(item.createdAt)}</p>
                </div>
                <div>
                  <strong>Updated</strong>
                  <p>{formatDate(item.updatedAt)}</p>
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
        </div>
      </div>
    </section>
  );
}
