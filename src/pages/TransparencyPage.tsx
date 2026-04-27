import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { useSiteContent } from "../content/SiteContentProvider";

export default function TransparencyPage() {
  const { content } = useSiteContent();
  const { coreStatements, transparencyNotes, transparencyPage } = content;

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">{transparencyPage.hero.eyebrow}</p>
            <h1>{transparencyPage.hero.heading}</h1>
            <p className="page-hero-intro">{transparencyPage.hero.intro}</p>
            {transparencyPage.hero.ctaLabel && transparencyPage.hero.ctaPath ? (
              <Link className="button button-accent" to={transparencyPage.hero.ctaPath}>
                {transparencyPage.hero.ctaLabel}
              </Link>
            ) : null}
          </div>

          <div className="highlight-panel animate-in">
            <h2>{transparencyPage.highlightTitle}</h2>
            <p>{transparencyPage.highlightText}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={transparencyPage.notesSection.eyebrow}
            intro={transparencyPage.notesSection.intro}
            title={transparencyPage.notesSection.title}
          />

          <div className="card-grid card-grid-three">
            {transparencyNotes.map((note, index) => (
              <article
                className="surface-card statement-card animate-in"
                key={note.title}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading
            centered
            eyebrow={transparencyPage.anchorSection.eyebrow}
            intro={transparencyPage.anchorSection.intro}
            title={transparencyPage.anchorSection.title}
          />

          <div className="card-grid card-grid-three">
            {coreStatements.map((statement, index) => (
              <article
                className="surface-card statement-card animate-in"
                key={statement.title}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <h3>{statement.title}</h3>
                <p>{statement.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
