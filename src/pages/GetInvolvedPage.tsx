import { FormEvent, useRef, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import IconSymbol from "../components/IconSymbol";
import { useSiteContent } from "../content/SiteContentProvider";
import {
  buildMailtoUrl,
  submitInquiry,
  type InquiryKind,
} from "../lib/submissions";

function iconToInquiryKind(icon: string): InquiryKind {
  switch (icon) {
    case "support":
      return "support";
    case "volunteer":
      return "volunteer";
    case "partner":
      return "partner";
    default:
      return "contact";
  }
}

function inquiryKindLabel(kind: InquiryKind) {
  switch (kind) {
    case "support":
      return "Support";
    case "volunteer":
      return "Volunteer";
    case "partner":
      return "Partnership";
    default:
      return "Inquiry";
  }
}

export default function GetInvolvedPage() {
  const [formValues, setFormValues] = useState({
    kind: "support" as InquiryKind,
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submissionState, setSubmissionState] = useState<{
    state: "idle" | "submitting" | "success" | "error";
    message: string;
  }>({
    state: "idle",
    message: "",
  });
  const formRef = useRef<HTMLElement | null>(null);
  const { content } = useSiteContent();
  const {
    actionPaths,
    contactFormDefaults,
    getInvolvedPage,
    involvementSteps,
  } = content;

  const jumpToForm = (kind: InquiryKind) => {
    setFormValues((current) => ({
      ...current,
      kind,
    }));
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = `${inquiryKindLabel(formValues.kind)} request from the website`;
    const bodyLines = [
      `Interest type: ${inquiryKindLabel(formValues.kind)}`,
      `Name: ${formValues.name || "Not provided"}`,
      `Email: ${formValues.email || "Not provided"}`,
      `Phone: ${formValues.phone || "Not provided"}`,
      "",
      formValues.message || contactFormDefaults.fallbackMessage,
    ];

    setSubmissionState({
      state: "submitting",
      message: "",
    });

    try {
      await submitInquiry({
        kind: formValues.kind,
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
        subject,
        message: formValues.message,
        sourcePage: "/get-involved",
      });

      setFormValues({
        kind: formValues.kind,
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setSubmissionState({
        state: "success",
        message: getInvolvedPage.inquirySuccessMessage,
      });
    } catch (error) {
      window.location.href = buildMailtoUrl({
        recipientEmail: contactFormDefaults.recipientEmail,
        subject,
        bodyLines,
      });

      setSubmissionState({
        state: "error",
        message:
          error instanceof Error
            ? `${error.message} Opening your email app instead.`
            : "The request service is unavailable. Opening your email app instead.",
      });
    }
  };

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div className="animate-in">
            <p className="eyebrow">{getInvolvedPage.hero.eyebrow}</p>
            <h1>{getInvolvedPage.hero.heading}</h1>
            <p className="page-hero-intro">{getInvolvedPage.hero.intro}</p>
          </div>

          <div className="highlight-panel animate-in">
            <h2>{getInvolvedPage.highlightTitle}</h2>
            <p>{getInvolvedPage.highlightText}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow={getInvolvedPage.pathsSection.eyebrow}
            intro={getInvolvedPage.pathsSection.intro}
            title={getInvolvedPage.pathsSection.title}
          />

          <div className="card-grid card-grid-three">
            {actionPaths.map((path, index) => {
              const nextKind = iconToInquiryKind(path.icon);

              return (
                <article
                  className="surface-card cta-card animate-in"
                  key={path.title}
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  <IconSymbol name={path.icon} />
                  <h3>{path.title}</h3>
                  <p className="card-lead">{path.description}</p>
                  <p>{path.detail}</p>
                  <button
                    className="button button-ghost"
                    type="button"
                    onClick={() => jumpToForm(nextKind)}
                  >
                    {path.ctaLabel}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container two-column-layout">
          <div>
            <SectionHeading
              eyebrow={getInvolvedPage.processSection.eyebrow}
              intro={getInvolvedPage.processSection.intro}
              title={getInvolvedPage.processSection.title}
            />

            <ol className="step-list">
              {involvementSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="surface-card note-card">
            <h3>{getInvolvedPage.processNoteTitle}</h3>
            <p>{getInvolvedPage.processNoteText}</p>
          </div>
        </div>
      </section>

      <section className="section" ref={formRef}>
        <div className="container two-column-layout contact-layout">
          <div>
            <SectionHeading
              eyebrow={getInvolvedPage.inquirySection.eyebrow}
              intro={getInvolvedPage.inquirySection.intro}
              title={getInvolvedPage.inquirySection.title}
            />

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Interest Type
                <select
                  value={formValues.kind}
                  onChange={(event) =>
                    setFormValues((current) => ({
                      ...current,
                      kind: event.target.value as InquiryKind,
                    }))
                  }
                >
                  <option value="support">Support</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="partner">Partnership</option>
                </select>
              </label>

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
                  : getInvolvedPage.inquiryButtonLabel}
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
            <h3>What happens next</h3>
            <p>
              Once you submit the form, the trust can review your interest and
              follow up with the next steps for support, volunteering, or
              partnership.
            </p>
            <div className="inline-value-row">
              <span className="inline-value-pill">{inquiryKindLabel(formValues.kind)}</span>
              <span className="inline-value-pill">Structured request</span>
              <span className="inline-value-pill">Follow-up ready</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
