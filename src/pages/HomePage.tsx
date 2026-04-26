import { Link } from "react-router-dom";
import IconSymbol from "../components/IconSymbol";
import { coreStatements, focusAreas, hero, initiatives, values } from "../content/siteContent";

const homeCtas = [
  {
    title: "Get Involved",
    text: "Support. Volunteer. Partner.",
    ctaLabel: "Join Us",
    path: "/get-involved",
    themeClass: "action-card-teal",
  },
  {
    title: "Our Commitment",
    text:
      "We are dedicated to creating meaningful and responsible impact in the communities we serve.",
    ctaLabel: "Learn More",
    path: "/who-we-are",
    themeClass: "action-card-gold",
  },
  {
    title: "Contact Us",
    text: "Let's connect and create change together.",
    ctaLabel: "Reach Out",
    path: "/contact",
    themeClass: "action-card-light",
  },
];

const valueIcons = ["compassion", "integrity", "community", "sustainability", "responsibility"] as const;

export default function HomePage() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="home-hero-card animate-in">
            <div className="hero-grid">
              <div className="hero-copy">
                <h1>{hero.heading}</h1>
                <p className="hero-intro">{hero.subtext}</p>

                <div className="hero-actions">
                  <Link className="button button-accent" to={hero.primaryCtaPath}>
                    {hero.primaryCtaLabel}
                  </Link>
                </div>
              </div>

              <div className="hero-media">
                <img
                  alt=""
                  aria-hidden="true"
                  className="hero-leaf-art"
                  src="/leaf-accent.svg"
                />
                <div className="hero-image-wrap">
                  <img alt={hero.alt} className="hero-image" src={hero.image} />
                </div>
              </div>
            </div>
          </div>

          <div className="focus-band animate-in">
            {focusAreas.map((area, index) => (
              <article
                className="focus-item"
                key={area.title}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <IconSymbol name={area.icon} />
                <h2>{area.title}</h2>
                <p>{area.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-tight-section">
        <div className="container">
          <div className="overview-card">
            <article className="overview-column animate-in">
              <h2>{coreStatements[0].title}</h2>
              <p>{coreStatements[0].text}</p>
              <span className="mini-divider" />
            </article>

            <article className="overview-column animate-in" style={{ animationDelay: "80ms" }}>
              <h2>{coreStatements[1].title}</h2>
              <p>{coreStatements[1].text}</p>
              <span className="mini-divider" />
            </article>

            <article
              className="overview-column overview-initiative-column animate-in"
              style={{ animationDelay: "160ms" }}
            >
              <div className="overview-heading-row">
                <h2>Our Initiatives</h2>
                <Link
                  aria-label="View initiative details"
                  className="round-arrow-link"
                  to="/initiatives"
                >
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="initiative-preview-row">
                {initiatives.slice(0, 3).map((initiative) => (
                  <img
                    alt={initiative.alt}
                    className="initiative-thumb"
                    key={initiative.title}
                    src={initiative.image}
                  />
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section home-tight-section">
        <div className="container">
          <div className="action-grid">
            {homeCtas.map((item, index) => (
              <article
                className={`home-action-card ${item.themeClass} animate-in`}
                key={item.title}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <Link
                  className={`button ${item.themeClass === "action-card-light" ? "button-accent" : "button-soft"}`}
                  to={item.path}
                >
                  {item.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section values-home-section">
        <div className="container">
          <div className="values-strip animate-in">
            {values.map((value, index) => (
              <article className="value-inline" key={value.name}>
                <IconSymbol name={valueIcons[index]} />
                <span>{value.name}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container interior-preview-note">
          <p>
            Explore the interior pages for detailed focus areas, initiatives,
            involvement opportunities, transparency notes, and contact information.
          </p>
          <div className="pill-row">
            <Link className="text-link-pill" to="/who-we-are">
              Who We Are
            </Link>
            <Link className="text-link-pill" to="/what-we-care-about">
              What We Care About
            </Link>
            <Link className="text-link-pill" to="/transparency">
              Transparency
            </Link>
            <Link className="text-link-pill" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
