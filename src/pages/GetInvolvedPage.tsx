import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import IconSymbol from "../components/IconSymbol";
import { actionPaths, involvementSteps } from "../content/siteContent";

export default function GetInvolvedPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">Get Involved</p>
            <h1>Support, volunteer, or partner with purpose</h1>
            <p className="page-hero-intro">
              The source content invites people to help through support,
              volunteering, and partnership. This page turns that invitation into a
              clearer pathway.
            </p>
          </div>

          <div className="highlight-panel animate-in">
            <h2>Why involvement matters</h2>
            <p>
              Community-driven work becomes stronger when people contribute not only
              funds, but also time, skills, and trusted collaboration.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Ways to Help"
            title="Three clear paths for contribution"
            intro="Each path is designed to stay flexible while giving visitors a practical next step."
          />

          <div className="card-grid card-grid-three">
            {actionPaths.map((path, index) => (
              <article
                className="surface-card cta-card animate-in"
                key={path.title}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <IconSymbol name={path.icon} />
                <h3>{path.title}</h3>
                <p className="card-lead">{path.description}</p>
                <p>{path.detail}</p>
                <Link className="button button-ghost" to={path.ctaPath}>
                  {path.ctaLabel}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container two-column-layout">
          <div>
            <SectionHeading
              eyebrow="Simple Process"
              title="How engagement can begin"
              intro="The first version of the site keeps the process intentionally lightweight so the trust can adapt it as real operating details become available."
            />

            <ol className="step-list">
              {involvementSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="surface-card note-card">
            <h3>Version one note</h3>
            <p>
              Once the trust has confirmed volunteer programs, partnership models,
              or donation workflows, this page can expand with formal processes and
              real calls to action.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

