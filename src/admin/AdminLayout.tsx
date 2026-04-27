import { UserButton, useAuth } from "@clerk/react";
import { useEffect, useMemo, useState } from "react";
import {
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { useSiteContent } from "../content/SiteContentProvider";
import {
  fetchAdminSession,
  type AdminSession,
  type TokenGetter,
} from "../lib/adminApi";
import { adminNavigation } from "./navigation";
import AdminSetupPage from "./AdminSetupPage";
import { isClerkConfigured } from "./clerkConfig";

export interface AdminOutletContextValue {
  adminSession: AdminSession;
  getToken: TokenGetter;
  refreshAdminSession: () => Promise<void>;
}

function AdminAccessDeniedPage({
  directusUrl,
  message,
  onSignOut,
}: {
  directusUrl: string;
  message: string;
  onSignOut: () => void;
}) {
  return (
    <section className="section admin-section">
      <div className="container">
        <div className="admin-login-card">
          <p className="eyebrow">Admin Access</p>
          <h1>Account signed in, access not granted</h1>
          <p className="page-hero-intro">
            {message ||
              "This Clerk account is authenticated, but it is not currently approved for the protected admin workspace."}
          </p>
          <div className="admin-toolbar-actions">
            <a
              className="button button-accent"
              href={directusUrl}
              rel="noreferrer"
              target="_blank"
            >
              Open Directus
            </a>
            <button className="button button-ghost" type="button" onClick={onSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConfiguredAdminLayout() {
  const { content } = useSiteContent();
  const { getToken, isLoaded, isSignedIn, signOut } = useAuth();
  const [sessionState, setSessionState] = useState<{
    state: "idle" | "loading" | "error";
    message: string;
    data: AdminSession | null;
  }>({
    state: "idle",
    message: "",
    data: null,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const refreshAdminSession = async () => {
    setSessionState((current) => ({
      ...current,
      state: "loading",
      message: "",
    }));

    try {
      const data = await fetchAdminSession(getToken);
      setSessionState({
        state: "idle",
        message: "",
        data,
      });
    } catch (error) {
      setSessionState({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "The admin session could not be verified.",
        data: null,
      });
    }
  };

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    void refreshAdminSession();
  }, [getToken, isLoaded, isSignedIn]);

  const outletContext = useMemo<AdminOutletContextValue | null>(() => {
    if (!sessionState.data) {
      return null;
    }

    return {
      adminSession: sessionState.data,
      getToken,
      refreshAdminSession,
    };
  }, [getToken, sessionState.data]);

  if (!isLoaded) {
    return (
      <section className="section admin-section">
        <div className="container">
          <div className="admin-login-card">
            <p className="eyebrow">Internal Admin</p>
            <h1>Loading authentication</h1>
            <p className="page-hero-intro">
              Verifying the current admin session before loading the workspace.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!isSignedIn) {
    return <Navigate replace to="/internal-admin" />;
  }

  if (sessionState.state === "loading" && !sessionState.data) {
    return (
      <section className="section admin-section">
        <div className="container">
          <div className="admin-login-card">
            <p className="eyebrow">Internal Admin</p>
            <h1>Authorizing workspace access</h1>
            <p className="page-hero-intro">
              Confirming your account permissions and loading the admin routes.
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!outletContext) {
    return (
      <AdminAccessDeniedPage
        directusUrl={content.submissionSettings.adminUrl}
        message={sessionState.message}
        onSignOut={() => {
          void signOut({ redirectUrl: "/internal-admin" });
        }}
      />
    );
  }

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="admin-sidebar-brand">
          <p className="eyebrow">Admin</p>
          <h2>{content.brand.shortName}</h2>
          <p>{content.brand.fullName}</p>
        </div>

        <nav className="admin-sidebar-nav" aria-label="Admin navigation">
          {adminNavigation.map((item) => (
            <NavLink
              className={({ isActive }) =>
                `admin-sidebar-link${isActive ? " active" : ""}`
              }
              key={item.path}
              to={item.path}
            >
              <span className="admin-sidebar-icon">{item.shortLabel}</span>
              <span className="admin-sidebar-copy">
                <strong>{item.label}</strong>
                <small>{item.description}</small>
              </span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <a
            className="button button-accent"
            href={outletContext.adminSession.directusUrl}
            rel="noreferrer"
            target="_blank"
          >
            Open Directus
          </a>
          <button
            className="button button-ghost"
            type="button"
            onClick={() => {
              void signOut({ redirectUrl: "/internal-admin" });
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="admin-main-shell">
        <header className="admin-topbar">
          <button
            aria-label="Toggle admin navigation"
            className="admin-menu-button"
            type="button"
            onClick={() => setSidebarOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="admin-topbar-copy">
            <p className="eyebrow">Internal Admin</p>
            <h1>Protected workspace</h1>
          </div>

          <div className="admin-topbar-user">
            <div className="admin-user-copy">
              <strong>{outletContext.adminSession.user.fullName}</strong>
              <small>{outletContext.adminSession.user.email}</small>
            </div>
            <UserButton showName />
          </div>
        </header>

        <main className="admin-page-shell">
          <Outlet context={outletContext} />
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  if (!isClerkConfigured) {
    return <AdminSetupPage />;
  }

  return <ConfiguredAdminLayout />;
}

export function useAdminOutletContext() {
  return useOutletContext<AdminOutletContextValue>();
}
