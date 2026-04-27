import SectionHeading from "../components/SectionHeading";
import IconSymbol from "../components/IconSymbol";
import { useSiteContent } from "../content/SiteContentProvider";

export default function WhatWeCareAboutPage() {
  const { content } = useSiteContent();
  const { focusAreas, values, whatWeCareAboutPage } = content;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">{whatWeCareAboutPage.hero.eyebrow}</p>
            <h1>{whatWeCareAboutPage.hero.heading}</h1>
            <p className="page-hero-intro">{whatWeCareAboutPage.hero.intro}</p>
          </div>

          <div className="highlight-panel animate-in">
            <h2>{whatWeCareAboutPage.highlightTitle}</h2>
            <p>{whatWeCareAboutPage.highlightText}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={whatWeCareAboutPage.areasSection.eyebrow}
            intro={whatWeCareAboutPage.areasSection.intro}
            title={whatWeCareAboutPage.areasSection.title}
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
            eyebrow={whatWeCareAboutPage.valuesSection.eyebrow}
            intro={whatWeCareAboutPage.valuesSection.intro}
            title={whatWeCareAboutPage.valuesSection.title}
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
