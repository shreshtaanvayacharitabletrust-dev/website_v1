import { SignIn, useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";
import AdminSetupPage from "./AdminSetupPage";
import { isClerkConfigured } from "./clerkConfig";

function ConfiguredAdminAuthPage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <section className="section admin-section">
        <div className="container">
          <div className="admin-login-card">
            <p className="eyebrow">Internal Admin</p>
            <h1>Loading authentication</h1>
            <p className="page-hero-intro">
              Preparing the admin sign-in and sign-up flow.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (isSignedIn) {
    return <Navigate replace to="/internal-admin/dashboard" />;
  }

  return (
    <section className="section admin-section">
      <div className="container">
        <div className="admin-auth-grid">
          <div className="admin-auth-copy">
            <p className="eyebrow">Internal Admin</p>
            <h1>Manage content, media, and inquiries</h1>
            <p className="page-hero-intro">
              Sign in with an existing admin account or create a new account to
              access the protected admin workspace.
            </p>
            <div className="admin-auth-points">
              <span className="inline-value-pill">Clerk authentication</span>
              <span className="inline-value-pill">Protected admin routes</span>
              <span className="inline-value-pill">Cloudflare-backed data</span>
            </div>
          </div>

          <div className="admin-auth-card">
            <SignIn
              forceRedirectUrl="/internal-admin/dashboard"
              path="/internal-admin"
              routing="path"
              signUpForceRedirectUrl="/internal-admin/dashboard"
              withSignUp
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AdminAuthPage() {
  if (!isClerkConfigured) {
    return <AdminSetupPage />;
  }

  return <ConfiguredAdminAuthPage />;
}
