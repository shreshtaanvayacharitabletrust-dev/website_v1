import { FormEvent, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useSiteContent } from "../content/SiteContentProvider";
import { submitInquiry } from "../lib/submissions";
import BrandLogo from "./BrandLogo";
import SocialGlyph from "./SocialGlyph";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<{
    state: "idle" | "submitting" | "success" | "error";
    message: string;
  }>({
    state: "idle",
    message: "",
  });
  const location = useLocation();
  const { content } = useSiteContent();
  const {
    brand,
    contactFormDefaults,
    contactMethods,
    layout,
    navigation,
    socialLinks,
  } = content;

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newsletterEmail) {
      return;
    }

    setNewsletterStatus({
      state: "submitting",
      message: "",
    });

    try {
      await submitInquiry({
        kind: "newsletter",
        email: newsletterEmail,
        subject: layout.newsletterSubject,
        sourcePage: "footer",
      });

      setNewsletterEmail("");
      setNewsletterStatus({
        state: "success",
        message: layout.newsletterSuccessMessage,
      });
    } catch (error) {
      setNewsletterStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "The signup could not be sent right now.",
      });
    }
  };

  const footerContactMethods = contactMethods.slice(0, 2);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#content">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container">
          <div className="header-shell">
            <Link className="brand-link" to="/">
              <BrandLogo className="brand-logo" />
            </Link>

            <nav className="desktop-nav" aria-label="Primary navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active" : ""}`
                  }
                  end={item.path === "/"}
                  to={item.path}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="header-actions">
              <Link className="button button-header" to={layout.donateButtonPath}>
                {layout.donateButtonLabel}
              </Link>
              <button
                aria-expanded={menuOpen}
                aria-label="Toggle navigation menu"
                className="menu-button"
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>

        {menuOpen ? (
          <div className="mobile-nav-panel">
            <nav className="mobile-nav" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  className={({ isActive }) =>
                    `mobile-nav-link${isActive ? " active" : ""}`
                  }
                  end={item.path === "/"}
                  to={item.path}
                >
                  <span>{item.label}</span>
                  <small>{item.description}</small>
                </NavLink>
              ))}
              <Link className="button button-header mobile-cta" to={layout.donateButtonPath}>
                {layout.donateButtonLabel}
              </Link>
            </nav>
          </div>
        ) : null}
      </header>

      <main id="content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-surface">
            <div className="footer-grid">
              <div className="footer-brand">
                <BrandLogo className="footer-brand-logo" variant="light" />
                <p className="footer-tagline">{brand.tagline}</p>
                <p className="footer-note">{brand.footerNote}</p>
              </div>

              <div>
                <h3>{layout.quickLinksTitle}</h3>
                <ul className="footer-links">
                  {navigation
                    .filter((item) => item.label !== "Home")
                    .map((item) => (
                      <li key={item.path}>
                        <Link to={item.path}>{item.label}</Link>
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <h3>{layout.stayConnectedTitle}</h3>
                <p className="footer-section-copy">{layout.stayConnectedCopy}</p>
                <div className="footer-social-row" aria-label="Social media links">
                  {socialLinks.map((socialLink) =>
                    socialLink.href ? (
                      <a
                        className="social-icon-badge"
                        href={socialLink.href}
                        key={socialLink.label}
                        rel="noreferrer"
                        target="_blank"
                        title={socialLink.label}
                      >
                        <SocialGlyph name={socialLink.label} />
                      </a>
                    ) : (
                      <span
                        className="social-icon-badge"
                        key={socialLink.label}
                        title={`${socialLink.label} coming soon`}
                      >
                        <SocialGlyph name={socialLink.label} />
                      </span>
                    ),
                  )}
                </div>
                <ul className="footer-links footer-links-contact">
                  {footerContactMethods.map((method) => (
                    <li key={method.label}>
                      <span>{method.label}</span>
                      {method.href ? (
                        <a href={method.href}>{method.value}</a>
                      ) : (
                        <strong>{method.value}</strong>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3>{layout.newsletterTitle}</h3>
                <p className="footer-section-copy">{layout.newsletterIntro}</p>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <input
                    aria-label="Email address for newsletter signup"
                    placeholder={layout.newsletterInputPlaceholder}
                    type="email"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                  />
                  <button
                    className="button button-newsletter"
                    disabled={newsletterStatus.state === "submitting"}
                    type="submit"
                  >
                    {newsletterStatus.state === "submitting"
                      ? "Submitting..."
                      : layout.newsletterButtonLabel}
                  </button>
                </form>
                {newsletterStatus.message ? (
                  <p
                    className={`form-feedback ${
                      newsletterStatus.state === "error"
                        ? "form-feedback-error"
                        : "form-feedback-success"
                    }`}
                  >
                    {newsletterStatus.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2025 {brand.fullName}. All rights reserved.</p>
              <div className="footer-meta-links">
                {layout.footerMetaLinks.map((item) => (
                  <Link key={item.label} to={item.path}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
