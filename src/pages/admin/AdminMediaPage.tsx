import { useSiteContent } from "../../content/SiteContentProvider";

export default function AdminMediaPage() {
  const { content } = useSiteContent();

  return (
    <div className="admin-page-grid">
      <section className="surface-card admin-section-card">
        <p className="eyebrow">Media</p>
        <h2>Published visual assets</h2>
        <p>
          Review the hero and initiative imagery currently published through the
          shared content model, along with social links shown across the site.
        </p>
      </section>

      <section className="surface-card admin-section-card">
        <p className="eyebrow">Homepage hero</p>
        <div className="admin-media-hero">
          <img alt={content.hero.alt} src={content.hero.image} />
          <div>
            <h3>{content.hero.heading}</h3>
            <p>{content.hero.subtext}</p>
          </div>
        </div>
      </section>

      <section className="admin-card-grid">
        {content.initiatives.map((initiative) => (
          <article className="surface-card admin-section-card" key={initiative.title}>
            <img
              alt={initiative.alt}
              className="admin-media-thumb"
              src={initiative.image}
            />
            <h3>{initiative.title}</h3>
            <p>{initiative.summary}</p>
          </article>
        ))}
      </section>

      <section className="surface-card admin-section-card">
        <p className="eyebrow">Social links</p>
        <div className="inline-value-row">
          {content.socialLinks.map((item) => (
            <span className="inline-value-pill" key={item.label}>
              {item.label}
              {item.href ? " linked" : " hidden"}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
