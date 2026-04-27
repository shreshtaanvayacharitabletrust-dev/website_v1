import { ClerkProvider } from "@clerk/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { clerkPublishableKey, isClerkConfigured } from "./admin/clerkConfig";
import App from "./App";
import { SiteContentProvider } from "./content/SiteContentProvider";
import "./styles.css";

function AppProviders({ children }: { children: React.ReactNode }) {
  if (!isClerkConfigured) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      afterSignOutUrl="/internal-admin"
      publishableKey={clerkPublishableKey}
    >
      {children}
    </ClerkProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <SiteContentProvider>
        <App />
      </SiteContentProvider>
    </AppProviders>
  </React.StrictMode>,
);
