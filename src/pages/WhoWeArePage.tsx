import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { coreStatements, values } from "../content/siteContent";

const identityNotes = [
  "The trust is presented as community-rooted, people-centered, and guided by dignity.",
  "Its mission emphasizes compassionate action across education, social care, and environmental awareness.",
  "Its commitment is to create meaningful and responsible impact in the communities it serves.",
];

export default function WhoWeArePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">Who We Are</p>
            <h1>A compassionate trust centered on meaningful community impact</h1>
            <p className="page-hero-intro">
              Shrestha Anvaya Charitable Trust is framed through a simple but clear
              direction: support growth, dignity, and participation through
              compassionate community work.
            </p>
            <Link className="button button-primary" to="/contact">
              Start a Conversation
            </Link>
          </div>

          <div className="highlight-panel animate-in">
            <h2>At a glance</h2>
            <ul className="stack-list">
              {identityNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Vision, Mission, Commitment"
            title="The trust's core direction"
            intro="These statements define the trust's purpose and should remain the anchor for future content updates."
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
              eyebrow="Why This Matters"
              title="A people-first identity"
              intro="The trust's positioning avoids broad institutional language and stays focused on human dignity, practical support, and shared responsibility."
            />
            <p className="section-copy">
              That direction is important for an NGO website because it keeps the
              organization understandable and welcoming. The message is not about
              scale or self-promotion. It is about community, care, and action that
              feels grounded.
            </p>
          </div>

          <div className="surface-card note-card">
            <h3>Content principle</h3>
            <p>
              Future updates should expand the story carefully, adding real facts,
              timelines, and leadership details only after they are confirmed by the
              trust.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="Values"
            title="The principles behind the work"
            intro="These values explain how the trust wants to show up in the community, not just what it wants to do."
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

