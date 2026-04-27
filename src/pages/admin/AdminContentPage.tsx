import { useEffect, useMemo, useState } from "react";
import { useAdminOutletContext } from "../../admin/AdminLayout";
import { formatAdminDate } from "../../admin/utils";
import { useSiteContent } from "../../content/SiteContentProvider";
import { defaultSiteContent } from "../../content/siteContent";
import {
  describeContentSections,
  fetchAdminContent,
  updateAdminContent,
} from "../../lib/adminApi";
import { mergeSiteContentWithDefaults } from "../../lib/siteContentApi";

function stringifyContent(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export default function AdminContentPage() {
  const { getToken } = useAdminOutletContext();
  const { content, refreshContent } = useSiteContent();
  const [editorValue, setEditorValue] = useState(stringifyContent(content));
  const [savedValue, setSavedValue] = useState(stringifyContent(content));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [persisted, setPersisted] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [updatedBy, setUpdatedBy] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    state: "idle" | "error" | "success";
    message: string;
  }>({
    state: "idle",
    message: "",
  });

  useEffect(() => {
    setLoading(true);

    fetchAdminContent(getToken)
      .then((record) => {
        const nextValue = stringifyContent(record.content);

        setEditorValue(nextValue);
        setSavedValue(nextValue);
        setPersisted(record.persisted);
        setUpdatedAt(record.updatedAt);
        setUpdatedBy(record.updatedBy);
        setFeedback({
          state: "idle",
          message: "",
        });
      })
      .catch((error) => {
        const fallbackValue = stringifyContent(content);

        setEditorValue(fallbackValue);
        setSavedValue(fallbackValue);
        setFeedback({
          state: "error",
          message:
            error instanceof Error
              ? error.message
              : "The current site content could not be loaded.",
        });
      })
      .finally(() => setLoading(false));
  }, [content, getToken]);

  const parsedEditorContent = useMemo(() => {
    try {
      return mergeSiteContentWithDefaults(JSON.parse(editorValue));
    } catch {
      return null;
    }
  }, [editorValue]);

  const sections = describeContentSections(parsedEditorContent || content);
  const isDirty = editorValue !== savedValue;

  const handleSave = async () => {
    let parsed;

    try {
      parsed = JSON.parse(editorValue);
    } catch {
      setFeedback({
        state: "error",
        message: "The content editor must contain valid JSON before publishing.",
      });
      return;
    }

    setSaving(true);
    setFeedback({
      state: "idle",
      message: "",
    });

    try {
      const record = await updateAdminContent({
        getToken,
        content: parsed,
      });

      const nextValue = stringifyContent(record.content);

      setEditorValue(nextValue);
      setSavedValue(nextValue);
      setPersisted(record.persisted);
      setUpdatedAt(record.updatedAt);
      setUpdatedBy(record.updatedBy);
      setFeedback({
        state: "success",
        message: "Published site content saved to Cloudflare D1.",
      });
      await refreshContent().catch(() => undefined);
    } catch (error) {
      setFeedback({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "The site content could not be saved right now.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-page-grid">
      <section className="surface-card admin-section-card">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Content</p>
            <h2>Cloudflare CMS content editor</h2>
          </div>
          <div className="admin-toolbar-actions">
            <button
              className="button button-ghost"
              type="button"
              onClick={() => {
                setEditorValue(savedValue);
                setFeedback({
                  state: "idle",
                  message: "",
                });
              }}
              disabled={!isDirty || saving}
            >
              Reset to published
            </button>
            <button
              className="button button-soft"
              type="button"
              onClick={() => {
                const nextValue = stringifyContent(defaultSiteContent);

                setEditorValue(nextValue);
                setFeedback({
                  state: "idle",
                  message: "",
                });
              }}
              disabled={saving}
            >
              Load defaults
            </button>
            <button
              className="button button-accent"
              type="button"
              onClick={() => void handleSave()}
              disabled={saving || loading}
            >
              {saving ? "Saving..." : "Publish content"}
            </button>
          </div>
        </div>
        <p>
          The public site now reads one published JSON document from Cloudflare D1.
          Edit the structured content below, then publish it without exposing admin
          tools on the public pages.
        </p>
        <div className="admin-inline-meta">
          <span>{persisted ? "Published record exists" : "Using fallback defaults"}</span>
          <span>Last update: {updatedAt ? formatAdminDate(updatedAt) : "Not published yet"}</span>
          <span>Updated by: {updatedBy || "Not available"}</span>
        </div>
        {feedback.message ? (
          <p
            className={
              feedback.state === "error"
                ? "form-feedback form-feedback-error"
                : feedback.state === "success"
                  ? "form-feedback form-feedback-success"
                  : "form-feedback"
            }
          >
            {feedback.message}
          </p>
        ) : null}
      </section>

      <div className="admin-card-grid">
        {sections.map((section) => (
          <article className="surface-card admin-section-card" key={section.label}>
            <p className="eyebrow">{section.label}</p>
            <h3>{section.value}</h3>
            <p>{section.note}</p>
          </article>
        ))}
      </div>

      <section className="surface-card admin-section-card">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Published JSON</p>
            <h3>Editable site content document</h3>
          </div>
          <span className="inline-value-pill">
            {parsedEditorContent ? "Valid JSON" : "Fix JSON errors before saving"}
          </span>
        </div>

        <label className="admin-code-label" htmlFor="site-content-json">
          Published content
        </label>
        <textarea
          id="site-content-json"
          className="admin-code-editor"
          spellCheck={false}
          value={editorValue}
          onChange={(event) => setEditorValue(event.target.value)}
          rows={32}
        />
      </section>
    </div>
  );
}
