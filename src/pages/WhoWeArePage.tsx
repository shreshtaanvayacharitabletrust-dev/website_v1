import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { useSiteContent } from "../content/SiteContentProvider";

export default function WhoWeArePage() {
  const { content } = useSiteContent();
  const { coreStatements, values, whoWeArePage } = content;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">{whoWeArePage.hero.eyebrow}</p>
            <h1>{whoWeArePage.hero.heading}</h1>
            <p className="page-hero-intro">{whoWeArePage.hero.intro}</p>
            {whoWeArePage.hero.ctaLabel && whoWeArePage.hero.ctaPath ? (
              <Link className="button button-primary" to={whoWeArePage.hero.ctaPath}>
                {whoWeArePage.hero.ctaLabel}
              </Link>
            ) : null}
          </div>

          <div className="highlight-panel animate-in">
            <h2>{whoWeArePage.highlightTitle}</h2>
            <ul className="stack-list">
              {whoWeArePage.identityNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={whoWeArePage.coreSection.eyebrow}
            intro={whoWeArePage.coreSection.intro}
            title={whoWeArePage.coreSection.title}
          />

          <div className="card-grid card-grid-three">
            {coreStatements.map((statement, index) => (
              <article
                className="surface-card statement-card animate-in"
                key={statement.title}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3>{statement.title}</h3>
                <p>{statement.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container two-column-layout">
          <div>
            <SectionHeading
              eyebrow={whoWeArePage.principleSection.eyebrow}
              intro={whoWeArePage.principleSection.intro}
              title={whoWeArePage.principleSection.title}
            />
            <p className="section-copy">{whoWeArePage.principleBody}</p>
          </div>

          <div className="surface-card note-card">
            <h3>{whoWeArePage.principleNoteTitle}</h3>
            <p>{whoWeArePage.principleNoteText}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            centered
            eyebrow={whoWeArePage.valuesSection.eyebrow}
            intro={whoWeArePage.valuesSection.intro}
            title={whoWeArePage.valuesSection.title}
          />

          <div className="card-grid card-grid-five">
            {values.map((value, index) => (
              <article
                className="surface-card value-card animate-in"
                key={value.name}
                style={{ animationDelay: `${index * 80}ms` }}
              >
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
