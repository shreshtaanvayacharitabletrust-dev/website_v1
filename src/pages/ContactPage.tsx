import { FormEvent, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import { useSiteContent } from "../content/SiteContentProvider";
import { buildMailtoUrl, submitInquiry } from "../lib/submissions";

export default function ContactPage() {
  const { content } = useSiteContent();
  const {
    contactFormDefaults,
    contactMethods,
    contactPage,
    socialLinks,
    submissionSettings,
  } = content;
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    subject: contactFormDefaults.subject,
    message: "",
  });
  const [submissionState, setSubmissionState] = useState<{
    state: "idle" | "submitting" | "success" | "error";
    message: string;
  }>({
    state: "idle",
    message: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bodyLines = [
      `Name: ${formValues.name || "Not provided"}`,
      `Email: ${formValues.email || "Not provided"}`,
      `Phone: ${formValues.phone || "Not provided"}`,
      "",
      formValues.message || contactFormDefaults.fallbackMessage,
    ];

    if (!submissionSettings.databaseEnabled) {
      window.location.href = buildMailtoUrl({
        recipientEmail: contactFormDefaults.recipientEmail,
        subject: formValues.subject || contactFormDefaults.subject,
        bodyLines,
      });

      return;
    }

    setSubmissionState({
      state: "submitting",
      message: "",
    });

    try {
      await submitInquiry({
        kind: "contact",
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        subject: formValues.subject,
        message: formValues.message,
        sourcePage: "/contact",
      });

      setFormValues({
        name: "",
        email: "",
        phone: "",
        subject: contactFormDefaults.subject,
        message: "",
      });
      setSubmissionState({
        state: "success",
        message: contactPage.successMessage,
      });
    } catch (error) {
      setSubmissionState({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "The inquiry could not be submitted right now.",
      });
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">{contactPage.hero.eyebrow}</p>
            <h1>{contactPage.hero.heading}</h1>
            <p className="page-hero-intro">{contactPage.hero.intro}</p>
          </div>

          <div className="highlight-panel animate-in">
            <h2>{contactPage.highlightTitle}</h2>
            <p>{contactPage.highlightText}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={contactPage.detailsSection.eyebrow}
            intro={contactPage.detailsSection.intro}
            title={contactPage.detailsSection.title}
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
              eyebrow={contactPage.formSection.eyebrow}
              intro={contactPage.formSection.intro}
              title={contactPage.formSection.title}
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
                  required
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
                Phone
                <input
                  name="phone"
                  type="tel"
                  value={formValues.phone}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      phone: event.target.value,
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

              <button
                className="button button-primary"
                disabled={submissionState.state === "submitting"}
                type="submit"
              >
                {submissionState.state === "submitting"
                  ? "Submitting..."
                  : contactPage.submitButtonLabel}
              </button>

              {submissionState.message ? (
                <p
                  className={`form-feedback ${
                    submissionState.state === "error"
                      ? "form-feedback-error"
                      : "form-feedback-success"
                  }`}
                >
                  {submissionState.message}
                </p>
              ) : null}
            </form>
          </div>

          <div className="surface-card note-card">
            <h3>{contactPage.socialTitle}</h3>
            <p>{contactPage.socialIntro}</p>
            <div className="social-placeholder-row">
              {socialLinks.map((item) =>
                item.href ? (
                  <a className="social-badge" href={item.href} key={item.label}>
                    {item.label}
                  </a>
                ) : (
                  <span className="social-badge" key={item.label}>
                    {item.label}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
