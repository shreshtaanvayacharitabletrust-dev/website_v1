import { requireAdminSession } from "../_lib/adminAuth.js";

const ALLOWED_KINDS = new Set([
  "contact",
  "support",
  "volunteer",
  "partner",
  "newsletter",
]);

const ALLOWED_STATUSES = new Set(["new", "reviewing", "closed"]);

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function normalizeText(value, maxLength) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function onRequestGet({ env, request }) {
  if (!env.SUBMISSIONS_DB) {
    return jsonResponse(
      {
        error: "Submission database is not configured.",
      },
      503,
    );
  }

  const { response } = await requireAdminSession(request, env);

  if (response) {
    return response;
  }

  const result = await env.SUBMISSIONS_DB.prepare(
    `
      SELECT
        id,
        kind,
        name,
        email,
        phone,
        subject,
        message,
        source_page AS sourcePage,
        status,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM inquiries
      ORDER BY datetime(created_at) DESC
      LIMIT 100
    `,
  ).all();

  return jsonResponse({
    items: result.results || [],
  });
}

export async function onRequestPost({ env, request }) {
  if (!env.SUBMISSIONS_DB) {
    return jsonResponse(
      {
        error: "Submission database is not configured.",
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

  const kind = normalizeText(payload.kind, 24);
  const name = normalizeText(payload.name, 120);
  const email = normalizeText(payload.email, 160).toLowerCase();
  const phone = normalizeText(payload.phone, 40);
  const subject = normalizeText(payload.subject, 160);
  const message = normalizeText(payload.message, 4000);
  const sourcePage = normalizeText(payload.sourcePage, 120);

  if (!ALLOWED_KINDS.has(kind)) {
    return jsonResponse(
      {
        error: "Unsupported inquiry type.",
      },
      400,
    );
  }

  if (!email || !isValidEmail(email)) {
    return jsonResponse(
      {
        error: "A valid email address is required.",
      },
      400,
    );
  }

  if (!sourcePage) {
    return jsonResponse(
      {
        error: "A submission source is required.",
      },
      400,
    );
  }

  if (kind !== "newsletter" && !message) {
    return jsonResponse(
      {
        error: "Please include a short message before submitting.",
      },
      400,
    );
  }

  const inquiryId = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const statement = env.SUBMISSIONS_DB.prepare(
    `
      INSERT INTO inquiries (
        id,
        kind,
        name,
        email,
        phone,
        subject,
        message,
        source_page,
        status,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
  ).bind(
    inquiryId,
    kind,
    name || null,
    email,
    phone || null,
    subject || null,
    message || null,
    sourcePage,
    "new",
    createdAt,
    createdAt,
  );

  try {
    await statement.run();
  } catch (error) {
    console.error("Failed to store inquiry", error);

    return jsonResponse(
      {
        error: "The submission could not be saved right now.",
      },
      500,
    );
  }

  return jsonResponse({
    ok: true,
    id: inquiryId,
  });
}

export async function onRequestPatch({ env, request }) {
  if (!env.SUBMISSIONS_DB) {
    return jsonResponse(
      {
        error: "Submission database is not configured.",
      },
      503,
    );
  }

  const { response } = await requireAdminSession(request, env);

  if (response) {
    return response;
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

  const inquiryId = normalizeText(payload.id, 64);
  const status = normalizeText(payload.status, 24);

  if (!inquiryId) {
    return jsonResponse(
      {
        error: "An inquiry id is required.",
      },
      400,
    );
  }

  if (!ALLOWED_STATUSES.has(status)) {
    return jsonResponse(
      {
        error: "Unsupported status.",
      },
      400,
    );
  }

  const updatedAt = new Date().toISOString();

  const result = await env.SUBMISSIONS_DB.prepare(
    `
      UPDATE inquiries
      SET status = ?, updated_at = ?
      WHERE id = ?
    `,
  )
    .bind(status, updatedAt, inquiryId)
    .run();

  if (!result.success) {
    return jsonResponse(
      {
        error: "The status could not be updated.",
      },
      500,
    );
  }

  return jsonResponse({
    ok: true,
  });
}
