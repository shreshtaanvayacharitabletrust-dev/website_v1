import { defaultSiteContent, type SiteContent } from "../content/siteContent";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeWithDefaults<T>(fallback: T, incoming: unknown): T {
  if (Array.isArray(fallback)) {
    return Array.isArray(incoming) ? (incoming as T) : fallback;
  }

  if (isRecord(fallback)) {
    if (!isRecord(incoming)) {
      return fallback;
    }

    const merged: Record<string, unknown> = { ...fallback };

    for (const [key, value] of Object.entries(fallback)) {
      merged[key] = mergeWithDefaults(value, incoming[key]);
    }

    return merged as T;
  }

  if (incoming === undefined || incoming === null) {
    return fallback;
  }

  return incoming as T;
}

function normalizePayload(payload: unknown): SiteContent {
  if (!isRecord(payload)) {
    return defaultSiteContent;
  }

  const data = Array.isArray(payload.data) ? payload.data[0] : payload.data;

  if (!isRecord(data)) {
    return defaultSiteContent;
  }

  return mergeWithDefaults(defaultSiteContent, data);
}

export async function fetchSiteContent(signal?: AbortSignal): Promise<SiteContent> {
  const response = await fetch("/api/site-content", {
    headers: {
      Accept: "application/json",
    },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to load site content (${response.status})`);
  }

  const payload = (await response.json()) as unknown;

  return normalizePayload(payload);
}
