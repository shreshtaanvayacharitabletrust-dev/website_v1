import { requireAdminSession } from "../../_lib/adminAuth.js";
import {
  jsonResponse,
  readStoredSiteContent,
  writeStoredSiteContent,
} from "../../_lib/cms.js";

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function onRequestGet({ env, request }) {
  const { response } = await requireAdminSession(request, env);

  if (response) {
    return response;
  }

  const result = await readStoredSiteContent(env, { bypassCache: true });

  if (!result.configured) {
    return jsonResponse(
      {
        error: "Site database is not configured.",
      },
      503,
    );
  }

  return jsonResponse({
    persisted: result.persisted,
    content: result.content,
    updatedAt: result.updatedAt,
    updatedBy: result.updatedBy,
  });
}

export async function onRequestPatch({ env, request }) {
  const { adminSession, response } = await requireAdminSession(request, env);

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

  if (!isRecord(payload?.content)) {
    return jsonResponse(
      {
        error: "The content payload must be a JSON object.",
      },
      400,
    );
  }

  try {
    const result = await writeStoredSiteContent(env, {
      content: payload.content,
      updatedBy: adminSession.user.email,
    });

    return jsonResponse({
      persisted: true,
      content: result.content,
      updatedAt: result.updatedAt,
      updatedBy: result.updatedBy,
    });
  } catch (error) {
    console.error("Failed to save published site content", error);

    return jsonResponse(
      {
        error: "The site content could not be saved right now.",
      },
      500,
    );
  }
}
