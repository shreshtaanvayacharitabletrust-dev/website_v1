import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { coreStatements, transparencyNotes } from "../content/siteContent";

export default function TransparencyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">Transparency</p>
            <h1>Our commitment to accountability, clarity, and community trust</h1>
            <p className="page-hero-intro">
              This page is a placeholder foundation for the trust&apos;s future public
              reporting. It reflects the same commitment already present in the
              website content: meaningful and responsible impact.
            </p>
            <Link className="button button-accent" to="/contact">
              Ask a Question
            </Link>
          </div>

          <div className="highlight-panel animate-in">
            <h2>Version one note</h2>
            <p>
              Formal public reports, governance details, and financial disclosures can
              be added here once the trust finalizes the materials it wants to publish.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="What This Page Will Hold"
            title="A clear home for future public trust materials"
            intro="The goal is to make transparency visible early, even before the full reporting structure is ready."
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
            eyebrow="Anchor Statements"
            title="Transparency should stay connected to the trust's purpose"
            intro="These existing statements remain the foundation for how future accountability information should be framed."
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
