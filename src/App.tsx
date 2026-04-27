import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
import StaticRedirectHandler from "./components/StaticRedirectHandler";
import ContactPage from "./pages/ContactPage";
import GetInvolvedPage from "./pages/GetInvolvedPage";
import HomePage from "./pages/HomePage";
import InternalAdminPage from "./pages/InternalAdminPage";
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
        <Route path="/internal-admin" element={<InternalAdminPage />} />
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
