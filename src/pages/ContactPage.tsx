import { FormEvent, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import {
  contactFormDefaults,
  contactMethods,
  socialPlaceholders,
} from "../content/siteContent";

export default function ContactPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: contactFormDefaults.subject,
    message: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const body = [
      `Name: ${formValues.name || "Not provided"}`,
      `Email: ${formValues.email || "Not provided"}`,
      "",
      formValues.message || "Hello, I would like to learn more about the trust.",
    ].join("\n");

    const mailtoUrl = `mailto:hello@shresthaanvaya.org?subject=${encodeURIComponent(
      formValues.subject || contactFormDefaults.subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  };

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">Contact</p>
            <h1>Let's connect and create meaningful change together</h1>
            <p className="page-hero-intro">
              This first website version uses placeholder contact details so the
              trust can launch now and swap in confirmed public information later.
            </p>
          </div>

          <div className="highlight-panel animate-in">
            <h2>What happens here</h2>
            <p>
              The form below opens a prefilled email draft. It avoids a backend
              dependency while still giving visitors a useful way to reach out.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Contact Details"
            title="Placeholder public information for version one"
            intro="These details are intentionally easy to replace once the trust confirms its official channels."
          />

          <div className="card-grid card-grid-three">
            {contactMethods.map((method, index) => (
              <article
                className="surface-card contact-card animate-in"
                key={method.label}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <p className="contact-label">{method.label}</p>
                {method.href ? (
                  <a className="contact-link" href={method.href}>
                    {method.value}
                  </a>
                ) : (
                  <h3>{method.value}</h3>
                )}
                <p>{method.hint}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container two-column-layout contact-layout">
          <div>
            <SectionHeading
              eyebrow="Reach Out"
              title="Send an inquiry"
              intro="Use this form to draft an email about volunteering, partnerships, support, or general questions."
            />

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  value={formValues.name}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                Subject
                <input
                  name="subject"
                  type="text"
                  value={formValues.subject}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      subject: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  rows={6}
                  value={formValues.message}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      message: event.target.value,
                    }))
                  }
                />
              </label>

              <button className="button button-primary" type="submit">
                Open Email Draft
              </button>
            </form>
          </div>

          <div className="surface-card note-card">
            <h3>Social channels</h3>
            <p>
              Social profiles are not published yet, so version one keeps them as
              clear placeholders instead of broken links.
            </p>
            <div className="social-placeholder-row">
              {socialPlaceholders.map((label) => (
                <span className="social-badge" key={label}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

