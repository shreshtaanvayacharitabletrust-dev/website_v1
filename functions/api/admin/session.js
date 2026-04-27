import { requireAdminSession } from "../../_lib/adminAuth.js";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export async function onRequestGet({ env, request }) {
  const { adminSession, response } = await requireAdminSession(request, env);

  if (response) {
    return response;
  }

  return jsonResponse({
    allowlistEnabled: adminSession.allowlistEnabled,
    allowedEmails: adminSession.allowedEmails,
    cacheConfigured: adminSession.cacheConfigured,
    cmsProvider: adminSession.cmsProvider,
    databaseConfigured: adminSession.databaseConfigured,
    mediaBaseUrl: adminSession.mediaBaseUrl,
    mediaConfigured: adminSession.mediaConfigured,
    user: {
      id: adminSession.user.id,
      email: adminSession.user.email,
      fullName: adminSession.user.fullName,
      imageUrl: adminSession.user.imageUrl,
      joinedAt: adminSession.user.createdAt,
      lastSignInAt: adminSession.user.lastSignInAt,
    },
  });
}
