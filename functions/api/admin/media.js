import { requireAdminSession } from "../../_lib/adminAuth.js";
import {
  buildMediaUrl,
  getSiteDb,
  jsonResponse,
  normalizeText,
  sanitizeMediaKey,
} from "../../_lib/cms.js";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

function isUploadFile(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.name === "string" &&
    typeof value.arrayBuffer === "function"
  );
}

function toAssetRecord(request, env, row) {
  return {
    key: row.key,
    title: row.title,
    mimeType: row.mimeType,
    sizeBytes: Number(row.sizeBytes || 0),
    createdAt: row.createdAt,
    uploadedBy: row.uploadedBy,
    url: row.publicUrl || buildMediaUrl(request, env, row.key),
  };
}

async function listMedia(request, env) {
  const db = getSiteDb(env);

  if (!db) {
    return {
      configured: false,
      items: [],
    };
  }

  const result = await db.prepare(
    `
      SELECT
        key,
        title,
        mime_type AS mimeType,
        size_bytes AS sizeBytes,
        public_url AS publicUrl,
        created_at AS createdAt,
        uploaded_by AS uploadedBy
      FROM cms_media_assets
      ORDER BY datetime(created_at) DESC
      LIMIT 200
    `,
  ).all();

  return {
    configured: true,
    items: (result.results || []).map((row) => toAssetRecord(request, env, row)),
  };
}

export async function onRequestGet({ env, request }) {
  const { response } = await requireAdminSession(request, env);

  if (response) {
    return response;
  }

  const result = await listMedia(request, env);

  if (!result.configured) {
    return jsonResponse(
      {
        error: "Site database is not configured.",
      },
      503,
    );
  }

  return jsonResponse({
    items: result.items,
    mediaConfigured: Boolean(env.CMS_MEDIA_BUCKET),
  });
}

export async function onRequestPost({ env, request }) {
  const { adminSession, response } = await requireAdminSession(request, env);

  if (response) {
    return response;
  }

  if (!env.CMS_MEDIA_BUCKET) {
    return jsonResponse(
      {
        error: "The R2 media bucket is not configured.",
      },
      503,
    );
  }

  const db = getSiteDb(env);

  if (!db) {
    return jsonResponse(
      {
        error: "Site database is not configured.",
      },
      503,
    );
  }

  let formData;

  try {
    formData = await request.formData();
  } catch {
    return jsonResponse(
      {
        error: "Invalid multipart form submission.",
      },
      400,
    );
  }

  const file = formData.get("file");
  const title = normalizeText(formData.get("title"), 140);

  if (!isUploadFile(file)) {
    return jsonResponse(
      {
        error: "Select a file before uploading.",
      },
      400,
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return jsonResponse(
      {
        error: "Upload files must be 10 MB or smaller.",
      },
      400,
    );
  }

  const key = `${crypto.randomUUID()}-${sanitizeMediaKey(file.name)}`;
  const createdAt = new Date().toISOString();
  const mimeType = normalizeText(file.type, 120) || "application/octet-stream";
  const publicUrl = buildMediaUrl(request, env, key);

  try {
    await env.CMS_MEDIA_BUCKET.put(key, await file.arrayBuffer(), {
      httpMetadata: {
        contentType: mimeType,
      },
    });

    await db.prepare(
      `
        INSERT INTO cms_media_assets (
          key,
          title,
          mime_type,
          size_bytes,
          public_url,
          created_at,
          uploaded_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
    )
      .bind(
        key,
        title || file.name,
        mimeType,
        file.size,
        publicUrl,
        createdAt,
        adminSession.user.email,
      )
      .run();
  } catch (error) {
    console.error("Failed to upload CMS media", error);

    return jsonResponse(
      {
        error: "The media asset could not be uploaded right now.",
      },
      500,
    );
  }

  return jsonResponse({
    item: {
      key,
      title: title || file.name,
      mimeType,
      sizeBytes: file.size,
      createdAt,
      uploadedBy: adminSession.user.email,
      url: publicUrl,
    },
  });
}

export async function onRequestDelete({ env, request }) {
  const { response } = await requireAdminSession(request, env);

  if (response) {
    return response;
  }

  if (!env.CMS_MEDIA_BUCKET) {
    return jsonResponse(
      {
        error: "The R2 media bucket is not configured.",
      },
      503,
    );
  }

  const db = getSiteDb(env);

  if (!db) {
    return jsonResponse(
      {
        error: "Site database is not configured.",
      },
      503,
    );
  }

  let payload;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(
      {
        error: "Invalid JSON request body.",
      },
      400,
    );
  }

  const key = normalizeText(payload?.key, 220);

  if (!key) {
    return jsonResponse(
      {
        error: "A media key is required.",
      },
      400,
    );
  }

  try {
    await env.CMS_MEDIA_BUCKET.delete(key);
    await db.prepare("DELETE FROM cms_media_assets WHERE key = ?").bind(key).run();
  } catch (error) {
    console.error("Failed to delete CMS media", error);

    return jsonResponse(
      {
        error: "The media asset could not be deleted right now.",
      },
      500,
    );
  }

  return jsonResponse({
    ok: true,
  });
}
