import { jsonResponse, readStoredSiteContent } from "../_lib/cms.js";

export async function onRequestGet({ env }) {
  const result = await readStoredSiteContent(env);

  if (!result.configured) {
    return jsonResponse(
      {
        error: "Site database is not configured.",
      },
      503,
      "public, max-age=60",
    );
  }

  if (!result.persisted || !result.content) {
    return jsonResponse(
      {
        error: "Published site content is not available yet.",
      },
      404,
      "public, max-age=60",
    );
  }

  return jsonResponse(
    {
      data: result.content,
      meta: {
        updatedAt: result.updatedAt,
        updatedBy: result.updatedBy,
      },
    },
    200,
    "public, max-age=60",
  );
}
