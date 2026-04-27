import { useAdminOutletContext } from "../../admin/AdminLayout";

export default function AdminUsersPage() {
  const { adminSession } = useAdminOutletContext();

  return (
    <div className="admin-page-grid">
      <section className="surface-card admin-section-card">
        <p className="eyebrow">Users</p>
        <h2>Current admin account</h2>
        <p>
          Clerk manages authentication for the admin area. This page reflects the
          currently signed-in account and the current access mode applied on the
          server.
        </p>
      </section>

      <div className="admin-two-column">
        <article className="surface-card admin-section-card">
          <p className="eyebrow">Signed-in user</p>
          <h3>{adminSession.user.fullName}</h3>
          <p>{adminSession.user.email}</p>
          <div className="admin-inline-meta">
            <span>User ID: {adminSession.user.id}</span>
            <span>
              Joined: {adminSession.user.joinedAt || "Not available"}
            </span>
          </div>
        </article>

        <article className="surface-card admin-section-card">
          <p className="eyebrow">Access control</p>
          <h3>{adminSession.allowlistEnabled ? "Allowlist enabled" : "Open admin mode"}</h3>
          <p>
            {adminSession.allowlistEnabled
              ? "Only specific admin emails are allowed into the protected admin routes."
              : "Any authenticated Clerk account can access the admin routes until an allowlist is configured."}
          </p>
          {adminSession.allowedEmails.length > 0 ? (
            <div className="inline-value-row">
              {adminSession.allowedEmails.map((email) => (
                <span className="inline-value-pill" key={email}>
                  {email}
                </span>
              ))}
            </div>
          ) : null}
        </article>
      </div>
    </div>
  );
}
