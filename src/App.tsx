import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminAuthPage from "./admin/AdminAuthPage";
import AdminLayout from "./admin/AdminLayout";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import StaticRedirectHandler from "./components/StaticRedirectHandler";
import ContactPage from "./pages/ContactPage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import HomePage from "./pages/HomePage";
import AdminContentPage from "./pages/admin/AdminContentPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminEngagementPage from "./pages/admin/AdminEngagementPage";
import AdminInquiriesPage from "./pages/admin/AdminInquiriesPage";
import AdminMediaPage from "./pages/admin/AdminMediaPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import TransparencyPage from "./pages/TransparencyPage";
import WhatWeCareAboutPage from "./pages/WhatWeCareAboutPage";
import WhatWeDoPage from "./pages/WhatWeDoPage";
import WhoWeArePage from "./pages/WhoWeArePage";

export default function App() {
  return (
    <BrowserRouter>
      <StaticRedirectHandler />
      <ScrollToTop />
      <Routes>
        <Route path="/internal-admin/*" element={<AdminAuthPage />} />
        <Route element={<AdminLayout />}>
          <Route
            path="/internal-admin/dashboard"
            element={<AdminDashboardPage />}
          />
          <Route
            path="/internal-admin/content"
            element={<AdminContentPage />}
          />
          <Route path="/internal-admin/media" element={<AdminMediaPage />} />
          <Route
            path="/internal-admin/inquiries"
            element={<AdminInquiriesPage />}
          />
          <Route
            path="/internal-admin/volunteers-partners"
            element={<AdminEngagementPage />}
          />
          <Route path="/internal-admin/users" element={<AdminUsersPage />} />
          <Route
            path="/internal-admin/settings"
            element={<AdminSettingsPage />}
          />
        </Route>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/who-we-are" element={<WhoWeArePage />} />
          <Route path="/what-we-care-about" element={<WhatWeCareAboutPage />} />
          <Route path="/initiatives" element={<WhatWeDoPage />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/get-involved" element={<GetInvolvedPage />} />
          <Route path="/transparency" element={<TransparencyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
