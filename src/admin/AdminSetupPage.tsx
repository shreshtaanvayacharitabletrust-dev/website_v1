export default function AdminSetupPage() {
  return (
    <section className="section admin-section">
      <div className="container">
        <div className="admin-login-card">
          <p className="eyebrow">Admin Setup</p>
          <h1>Clerk configuration required</h1>
          <p className="page-hero-intro">
            Add `VITE_CLERK_PUBLISHABLE_KEY` to the frontend environment and the
            matching Clerk server variables to Cloudflare before using the admin
            application.
          </p>
          <div className="surface-card admin-inline-card">
            <p>
              Required frontend variable: <strong>`VITE_CLERK_PUBLISHABLE_KEY`</strong>
            </p>
            <p>
              Required server variables: <strong>`CLERK_PUBLISHABLE_KEY`</strong> and{" "}
              <strong>`CLERK_SECRET_KEY`</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
