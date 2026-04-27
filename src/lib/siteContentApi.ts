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

  const data = payload.data;

  if (!isRecord(data)) {
    return defaultSiteContent;
  }

  return mergeWithDefaults(defaultSiteContent, data);
}

function migrateLegacyCopy(content: SiteContent): SiteContent {
  const nextContent: SiteContent = {
    ...content,
    contactPage: {
      ...content.contactPage,
      formSection: {
        ...content.contactPage.formSection,
      },
    },
  };

  if (
    nextContent.contactPage.formSection.intro
      .toLowerCase()
      .includes("draft an email")
  ) {
    nextContent.contactPage.formSection.intro =
      "Use this form for volunteering, partnerships, support, or general questions.";
  }

  if (
    nextContent.contactPage.submitButtonLabel.trim().toLowerCase() ===
    "open email draft"
  ) {
    nextContent.contactPage.submitButtonLabel = "Send Inquiry";
  }

  return nextContent;
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

  return migrateLegacyCopy(normalizePayload((await response.json()) as unknown));
}

export function mergeSiteContentWithDefaults(incoming: unknown): SiteContent {
  return migrateLegacyCopy(mergeWithDefaults(defaultSiteContent, incoming));
}
