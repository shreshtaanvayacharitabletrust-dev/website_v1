import { useEffect, useState } from "react";
import { useAdminOutletContext } from "../../admin/AdminLayout";
import { formatAdminDate } from "../../admin/utils";
import { useSiteContent } from "../../content/SiteContentProvider";
import {
  deleteAdminMedia,
  fetchAdminMedia,
  formatBytes,
  type AdminMediaAsset,
  uploadAdminMedia,
} from "../../lib/adminApi";

function currentVisualReferences(args: {
  heroImage: string;
  heroAlt: string;
  initiativeImages: Array<{
    title: string;
    image: string;
    alt: string;
  }>;
}) {
  return [
    {
      title: "Homepage hero",
      image: args.heroImage,
      alt: args.heroAlt,
    },
    ...args.initiativeImages,
  ];
}

export default function AdminMediaPage() {
  const { adminSession, getToken } = useAdminOutletContext();
  const { content } = useSiteContent();
  const [items, setItems] = useState<AdminMediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingKey, setDeletingKey] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [assetTitle, setAssetTitle] = useState("");
  const [feedback, setFeedback] = useState<{
    state: "idle" | "error" | "success";
    message: string;
  }>({
    state: "idle",
    message: "",
  });

  const loadMedia = async () => {
    setLoading(true);

    try {
      setItems(await fetchAdminMedia(getToken));
      setFeedback({
        state: "idle",
        message: "",
      });
    } catch (error) {
      setFeedback({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "The media library could not be loaded.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadMedia();
  }, [getToken]);

  const handleUpload = async () => {
    if (!selectedFile) {
      setFeedback({
        state: "error",
        message: "Choose a file before uploading it to the media library.",
      });
      return;
    }

    setUploading(true);

    try {
      const item = await uploadAdminMedia({
        getToken,
        file: selectedFile,
        title: assetTitle,
      });

      setItems((current) => [item, ...current]);
      setSelectedFile(null);
      setAssetTitle("");
      setFeedback({
        state: "success",
        message: "Media asset uploaded to Cloudflare R2.",
      });
    } catch (error) {
      setFeedback({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "The media asset could not be uploaded right now.",
      });
    } finally {
      setUploading(false);
    }
  };

  const references = currentVisualReferences({
    heroImage: content.hero.image,
    heroAlt: content.hero.alt,
    initiativeImages: content.initiatives.map((initiative) => ({
      title: initiative.title,
      image: initiative.image,
      alt: initiative.alt,
    })),
  });

  return (
    <div className="admin-page-grid">
      <section className="surface-card admin-section-card">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Media</p>
            <h2>Cloudflare R2 asset library</h2>
          </div>
          <span className="inline-value-pill">
            {adminSession.mediaConfigured ? "R2 connected" : "R2 not configured yet"}
          </span>
        </div>
        <p>
          Upload images into Cloudflare R2, then paste the generated asset URL into
          the content JSON editor when you want to publish that image on the site.
        </p>
        <div className="admin-inline-meta">
          <span>Media base URL: {adminSession.mediaBaseUrl}</span>
          <span>{items.length} stored assets</span>
        </div>
        {feedback.message ? (
          <p
            className={
              feedback.state === "error"
                ? "form-feedback form-feedback-error"
                : "form-feedback form-feedback-success"
            }
          >
            {feedback.message}
          </p>
        ) : null}
      </section>

      <section className="surface-card admin-section-card">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Upload asset</p>
            <h3>Add an image or document</h3>
          </div>
          <button
            className="button button-accent"
            type="button"
            onClick={() => void handleUpload()}
            disabled={uploading || !adminSession.mediaConfigured}
          >
            {uploading ? "Uploading..." : "Upload to R2"}
          </button>
        </div>
        <div className="admin-form-grid">
          <label>
            Asset title
            <input
              type="text"
              value={assetTitle}
              onChange={(event) => setAssetTitle(event.target.value)}
              placeholder="Homepage hero image"
            />
          </label>
          <label>
            Choose file
            <input
              type="file"
              onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
            />
          </label>
        </div>
        <p className="admin-help-copy">
          Uploads are stored in R2 and catalogued in D1. Use the generated URL in
          the content JSON editor after upload.
        </p>
      </section>

      <section className="surface-card admin-section-card">
        <p className="eyebrow">Current content references</p>
        <div className="admin-card-grid">
          {references.map((item) => (
            <article className="surface-card admin-section-card" key={item.title}>
              <img alt={item.alt} className="admin-media-thumb" src={item.image} />
              <h3>{item.title}</h3>
              <p className="admin-copy-break">{item.image}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="surface-card admin-section-card">
        <div className="admin-section-header">
          <div>
            <p className="eyebrow">Media library</p>
            <h3>Stored assets</h3>
          </div>
          <button className="button button-soft" type="button" onClick={() => void loadMedia()}>
            Refresh
          </button>
        </div>

        {loading ? <p>Loading media assets...</p> : null}

        {!loading && items.length === 0 ? (
          <p className="admin-empty-state">No R2 media assets have been uploaded yet.</p>
        ) : null}

        <div className="admin-card-grid">
          {items.map((item) => (
            <article className="surface-card admin-section-card" key={item.key}>
              {item.mimeType.startsWith("image/") ? (
                <img alt={item.title} className="admin-media-thumb" src={item.url} />
              ) : null}
              <p className="eyebrow">{item.mimeType}</p>
              <h3>{item.title}</h3>
              <div className="admin-inline-meta">
                <span>{formatBytes(item.sizeBytes)}</span>
                <span>{formatAdminDate(item.createdAt)}</span>
              </div>
              <p className="admin-copy-break">{item.url}</p>
              <div className="admin-toolbar-actions">
                <button
                  className="button button-soft"
                  type="button"
                  onClick={() => {
                    void navigator.clipboard.writeText(item.url);
                    setFeedback({
                      state: "success",
                      message: `Copied URL for ${item.title}.`,
                    });
                  }}
                >
                  Copy URL
                </button>
                <button
                  className="button button-ghost"
                  type="button"
                  disabled={deletingKey === item.key}
                  onClick={() => {
                    setDeletingKey(item.key);
                    deleteAdminMedia({
                      getToken,
                      key: item.key,
                    })
                      .then(() => {
                        setItems((current) =>
                          current.filter((currentItem) => currentItem.key !== item.key),
                        );
                        setFeedback({
                          state: "success",
                          message: `${item.title} removed from the media library.`,
                        });
                      })
                      .catch((error) => {
                        setFeedback({
                          state: "error",
                          message:
                            error instanceof Error
                              ? error.message
                              : "The media asset could not be deleted.",
                        });
                      })
                      .finally(() => setDeletingKey(""));
                  }}
                >
                  {deletingKey === item.key ? "Deleting..." : "Delete"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
