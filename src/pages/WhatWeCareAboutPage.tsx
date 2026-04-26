import SectionHeading from "../components/SectionHeading";
import IconSymbol from "../components/IconSymbol";
import { focusAreas, values } from "../content/siteContent";

export default function WhatWeCareAboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">What We Care About</p>
            <h1>Five focus areas, one shared purpose</h1>
            <p className="page-hero-intro">
              The trust's priorities connect education, care, environmental
              awareness, and community well-being into one compassionate direction.
            </p>
          </div>

          <div className="highlight-panel animate-in">
            <h2>Shared thread</h2>
            <p>
              Every focus area is connected by the same belief: people deserve the
              opportunity to grow, live with dignity, and contribute meaningfully.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Focus Areas"
            title="What the trust chooses to hold close"
            intro="Each focus area expands the one-line description from the source document into a fuller website explanation without inventing new programs."
          />

          <div className="card-grid card-grid-two">
            {focusAreas.map((area, index) => (
              <article
                className="surface-card area-detail-card animate-in"
                key={area.title}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="card-icon-row">
                  <IconSymbol name={area.icon} />
                  <div>
                    <h3>{area.title}</h3>
                    <p className="card-lead">{area.description}</p>
                  </div>
                </div>
                <p>{area.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="Connected Values"
            title="Care is strongest when values stay visible"
            intro="The trust's values reinforce the focus areas and prevent the website from feeling like a list of disconnected causes."
          />

          <div className="values-row">
            {values.map((value) => (
              <article className="value-pill" key={value.name}>
                <h3>{value.name}</h3>
                <p>{value.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

