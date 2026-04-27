import { jsonResponse } from "../../_lib/cms.js";

export async function onRequestGet({ env, params }) {
  if (!env.CMS_MEDIA_BUCKET) {
    return jsonResponse(
      {
        error: "The R2 media bucket is not configured.",
      },
      503,
      "public, max-age=60",
    );
  }

  const key = typeof params.key === "string" ? params.key : "";

  if (!key) {
    return jsonResponse(
      {
        error: "A media key is required.",
      },
      400,
      "public, max-age=60",
    );
  }

  const object = await env.CMS_MEDIA_BUCKET.get(key);

  if (!object) {
    return jsonResponse(
      {
        error: "Media asset not found.",
      },
      404,
      "public, max-age=300",
    );
  }

  const headers = new Headers();

  if (typeof object.writeHttpMetadata === "function") {
    object.writeHttpMetadata(headers);
  }

  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=3600");

  return new Response(object.body, {
    headers,
  });
}
