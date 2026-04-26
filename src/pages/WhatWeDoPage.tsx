import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { initiatives, values } from "../content/siteContent";

const operatingNotes = [
  {
    title: "Community-Driven",
    text: "The mission explicitly centers community-driven efforts, so every initiative should stay close to real people and local participation.",
  },
  {
    title: "Responsible",
    text: "The trust's commitment emphasizes responsibility, which makes clarity and follow-through central to how the work is presented.",
  },
  {
    title: "Sustainable",
    text: "Environmental awareness and sustainability are part of the trust's values, so progress should aim to be thoughtful and lasting.",
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">What We Do</p>
            <h1>Initiatives designed to turn compassion into practical action</h1>
            <p className="page-hero-intro">
              The current website content defines four initiative streams that
              translate the trust's mission into clear areas of work.
            </p>
          </div>

          <div className="highlight-panel animate-in">
            <h2>Working principle</h2>
            <p>
              Each initiative reflects the same direction: meaningful impact shaped
              by care, responsibility, and community participation.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Initiatives"
            title="The trust's current program framing"
            intro="These initiative descriptions stay faithful to the source draft while giving the website enough depth to feel complete and navigable."
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
            eyebrow="How We Approach Impact"
            title="A consistent way of working matters as much as the work itself"
            intro="Because this is an early NGO website, the strongest signal is not scale. It is clarity, responsibility, and alignment with the trust's values."
          />

          <div className="card-grid card-grid-three">
            {operatingNotes.map((note, index) => (
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
            <Link className="button button-primary" to="/get-involved">
              Explore Ways to Help
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

