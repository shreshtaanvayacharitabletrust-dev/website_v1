const CONTENT_ROW_ID = "published";
const CONTENT_CACHE_KEY = "site-content:published";

function parseList(value) {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function jsonResponse(body, status = 200, cacheControl = "no-store") {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": cacheControl,
    },
  });
}

export function getSiteDb(env) {
  return env.SITE_DB || env.SUBMISSIONS_DB || null;
}

export function getContentCache(env) {
  return env.SITE_CONTENT_CACHE || null;
}

export function getPublicMediaBaseUrl(request, env) {
  const configured = typeof env.PUBLIC_MEDIA_BASE_URL === "string"
    ? env.PUBLIC_MEDIA_BASE_URL.trim()
    : "";

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  try {
    return new URL("/api/media", request.url).toString().replace(/\/$/, "");
  } catch {
    return "/api/media";
  }
}

export function buildMediaUrl(request, env, key) {
  const baseUrl = getPublicMediaBaseUrl(request, env);

  return `${baseUrl}/${encodeURIComponent(key)}`;
}

export function normalizeText(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function parseContentJson(value) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);

    return isRecord(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function readStoredSiteContent(env, options = {}) {
  const db = getSiteDb(env);

  if (!db) {
    return {
      configured: false,
      persisted: false,
      content: null,
      updatedAt: null,
      updatedBy: null,
    };
  }

  const cache = getContentCache(env);
  const bypassCache = options.bypassCache === true;

  if (!bypassCache && cache) {
    const cached = await cache.get(CONTENT_CACHE_KEY, "json");

    if (isRecord(cached) && isRecord(cached.content)) {
      return {
        configured: true,
        persisted: true,
        content: cached.content,
        updatedAt:
          typeof cached.updatedAt === "string" ? cached.updatedAt : null,
        updatedBy:
          typeof cached.updatedBy === "string" ? cached.updatedBy : null,
      };
    }
  }

  const row = await db.prepare(
    `
      SELECT
        content_json AS contentJson,
        updated_at AS updatedAt,
        updated_by AS updatedBy
      FROM cms_site_content
      WHERE id = ?
      LIMIT 1
    `,
  )
    .bind(CONTENT_ROW_ID)
    .first();

  const content = parseContentJson(row?.contentJson);

  if (!content) {
    return {
      configured: true,
      persisted: false,
      content: null,
      updatedAt: null,
      updatedBy: null,
    };
  }

  const record = {
    content,
    updatedAt: typeof row?.updatedAt === "string" ? row.updatedAt : null,
    updatedBy: typeof row?.updatedBy === "string" ? row.updatedBy : null,
  };

  if (cache) {
    await cache.put(CONTENT_CACHE_KEY, JSON.stringify(record), {
      expirationTtl: 300,
    });
  }

  return {
    configured: true,
    persisted: true,
    ...record,
  };
}

export async function writeStoredSiteContent(env, args) {
  const db = getSiteDb(env);

  if (!db) {
    throw new Error("Site database is not configured.");
  }

  const updatedAt = new Date().toISOString();
  const updatedBy = normalizeText(args.updatedBy, 160).toLowerCase() || null;
  const contentJson = JSON.stringify(args.content);

  await db.prepare(
    `
      INSERT INTO cms_site_content (
        id,
        content_json,
        updated_at,
        updated_by
      ) VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        content_json = excluded.content_json,
        updated_at = excluded.updated_at,
        updated_by = excluded.updated_by
    `,
  )
    .bind(CONTENT_ROW_ID, contentJson, updatedAt, updatedBy)
    .run();

  const cache = getContentCache(env);

  if (cache) {
    await cache.put(
      CONTENT_CACHE_KEY,
      JSON.stringify({
        content: args.content,
        updatedAt,
        updatedBy,
      }),
      {
        expirationTtl: 300,
      },
    );
  }

  return {
    content: args.content,
    updatedAt,
    updatedBy,
  };
}

export async function clearStoredSiteContentCache(env) {
  const cache = getContentCache(env);

  if (cache) {
    await cache.delete(CONTENT_CACHE_KEY);
  }
}

export function getAdminAllowlist(env) {
  return parseList(env.ADMIN_ALLOWED_EMAILS).map((item) => item.toLowerCase());
}

export function sanitizeMediaKey(input) {
  const normalized = normalizeText(input, 180)
    .toLowerCase()
    .replace(/[^a-z0-9.\-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return normalized || "asset";
}
