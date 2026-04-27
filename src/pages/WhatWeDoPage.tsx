import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { useSiteContent } from "../content/SiteContentProvider";

export default function WhatWeDoPage() {
  const { content } = useSiteContent();
  const { initiatives, values, whatWeDoPage } = content;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">{whatWeDoPage.hero.eyebrow}</p>
            <h1>{whatWeDoPage.hero.heading}</h1>
            <p className="page-hero-intro">{whatWeDoPage.hero.intro}</p>
          </div>

          <div className="highlight-panel animate-in">
            <h2>{whatWeDoPage.highlightTitle}</h2>
            <p>{whatWeDoPage.highlightText}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={whatWeDoPage.initiativesSection.eyebrow}
            intro={whatWeDoPage.initiativesSection.intro}
            title={whatWeDoPage.initiativesSection.title}
          />

          <div className="card-grid card-grid-two">
            {initiatives.map((initiative, index) => (
              <article
                className="initiative-card animate-in"
                key={initiative.title}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <img alt={initiative.alt} src={initiative.image} />
                <div className="initiative-card-body">
                  <h3>{initiative.title}</h3>
                  <p className="card-lead">{initiative.summary}</p>
                  <p>{initiative.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            centered
            eyebrow={whatWeDoPage.operatingSection.eyebrow}
            intro={whatWeDoPage.operatingSection.intro}
            title={whatWeDoPage.operatingSection.title}
          />

          <div className="card-grid card-grid-three">
            {whatWeDoPage.operatingNotes.map((note, index) => (
              <article
                className="surface-card statement-card animate-in"
                key={note.title}
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </article>
            ))}
          </div>

          <div className="inline-value-row">
            {values.map((value) => (
              <span className="inline-value-pill" key={value.name}>
                {value.name}
              </span>
            ))}
          </div>

          <div className="center-cta">
            <Link className="button button-primary" to={whatWeDoPage.ctaPath}>
              {whatWeDoPage.ctaLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
