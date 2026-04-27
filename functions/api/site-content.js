function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=60",
    },
  });
}

export async function onRequestGet({ env }) {
  if (!env.DIRECTUS_URL) {
    return jsonResponse(
      {
        error: "Directus is not configured.",
      },
      503,
    );
  }

  const baseUrl = String(env.DIRECTUS_URL).replace(/\/$/, "");
  const collection = env.DIRECTUS_COLLECTION || "site_content";
  const url = new URL(`${baseUrl}/items/${collection}`);

  url.searchParams.set("limit", "1");

  const headers = {
    Accept: "application/json",
  };

  if (env.DIRECTUS_TOKEN) {
    headers.Authorization = `Bearer ${env.DIRECTUS_TOKEN}`;
  }

  const response = await fetch(url.toString(), {
    headers,
  });

  const text = await response.text();

  return new Response(text, {
    status: response.status,
    headers: {
      "content-type":
        response.headers.get("content-type") || "application/json; charset=utf-8",
      "cache-control": "public, max-age=60",
    },
  });
}
