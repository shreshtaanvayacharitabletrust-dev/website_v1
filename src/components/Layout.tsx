import { FormEvent, useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { brand, contactMethods, navigation, socialPlaceholders } from "../content/siteContent";
import BrandLogo from "./BrandLogo";
import SocialGlyph from "./SocialGlyph";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      "Hello,",
      "",
      "Please add the following email to newsletter updates:",
      newsletterEmail || "[email to be shared]",
    ].join("\n");

    window.location.href = `mailto:hello@shresthaanvaya.org?subject=Newsletter%20signup&body=${encodeURIComponent(
      body,
    )}`;
  };

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
              <Link className="button button-header" to="/get-involved">
                Donate Now
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
              <Link className="button button-header mobile-cta" to="/get-involved">
                Donate Now
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
                <h3>Quick Links</h3>
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
                <h3>Stay Connected</h3>
                <p className="footer-section-copy">Follow us for updates on our latest work.</p>
                <div className="footer-social-row" aria-label="Social media placeholders">
                  {socialPlaceholders.map((label) => (
                    <span className="social-icon-badge" key={label} title={`${label} coming soon`}>
                      <SocialGlyph name={label} />
                    </span>
                  ))}
                </div>
                <ul className="footer-links footer-links-contact">
                  {contactMethods.slice(0, 2).map((method) => (
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
                <h3>Newsletter</h3>
                <p className="footer-section-copy">
                  Stay updated with our initiatives and stories.
                </p>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                  <input
                    aria-label="Email address for newsletter signup"
                    placeholder="Enter your email"
                    type="email"
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                  />
                  <button className="button button-newsletter" type="submit">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="footer-bottom">
              <p>© 2025 {brand.fullName}. All rights reserved.</p>
              <div className="footer-meta-links">
                <Link to="/transparency">Transparency</Link>
                <Link to="/contact">Privacy Policy</Link>
                <Link to="/contact">Terms &amp; Conditions</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
