import { createClerkClient } from "@clerk/backend";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function parseList(value) {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getAuthorizedParties(request, env) {
  const configured = parseList(env.CLERK_AUTHORIZED_PARTIES);

  if (configured.length > 0) {
    return configured;
  }

  try {
    return [new URL(request.url).origin];
  } catch {
    return [];
  }
}

function getPrimaryEmail(user) {
  if (!user?.emailAddresses?.length) {
    return "";
  }

  const primary =
    user.emailAddresses.find(
      (emailAddress) => emailAddress.id === user.primaryEmailAddressId,
    ) || user.emailAddresses[0];

  return String(primary.emailAddress || "").toLowerCase();
}

function buildDisplayName(user, fallbackEmail) {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();

  if (fullName) {
    return fullName;
  }

  if (user?.username) {
    return user.username;
  }

  return fallbackEmail || "Admin user";
}

export async function requireAdminSession(request, env) {
  if (!env.CLERK_SECRET_KEY || !env.CLERK_PUBLISHABLE_KEY) {
    return {
      response: jsonResponse(
        {
          error: "Clerk server keys are not configured.",
        },
        503,
      ),
    };
  }

  const clerkClient = createClerkClient({
    publishableKey: env.CLERK_PUBLISHABLE_KEY,
    secretKey: env.CLERK_SECRET_KEY,
  });

  const requestState = await clerkClient.authenticateRequest(request, {
    authorizedParties: getAuthorizedParties(request, env),
    secretKey: env.CLERK_SECRET_KEY,
  });

  if (!requestState.isAuthenticated) {
    return {
      response: jsonResponse(
        {
          error: "You must sign in before opening the admin workspace.",
        },
        401,
      ),
    };
  }

  const auth = requestState.toAuth();

  if (!auth.userId) {
    return {
      response: jsonResponse(
        {
          error: "The current Clerk session could not be resolved to a user.",
        },
        401,
      ),
    };
  }

  const user = await clerkClient.users.getUser(auth.userId);
  const primaryEmail = getPrimaryEmail(user);
  const allowedEmails = parseList(env.ADMIN_ALLOWED_EMAILS).map((item) =>
    item.toLowerCase(),
  );
  const allowlistEnabled = allowedEmails.length > 0;

  if (allowlistEnabled && !allowedEmails.includes(primaryEmail)) {
    return {
      response: jsonResponse(
        {
          error: "This account is signed in but has not been granted admin access.",
        },
        403,
      ),
    };
  }

  return {
    adminSession: {
      allowlistEnabled,
      allowedEmails,
      auth,
      directusUrl: env.DIRECTUS_URL || "https://admin.shreshtaanvayatrust.org",
      primaryEmail,
      user: {
        createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : null,
        email: primaryEmail,
        fullName: buildDisplayName(user, primaryEmail),
        id: user.id,
        imageUrl: user.imageUrl || "",
        lastSignInAt: user.lastSignInAt
          ? new Date(user.lastSignInAt).toISOString()
          : null,
      },
    },
  };
}
