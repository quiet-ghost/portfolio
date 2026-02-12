import type { APIRoute } from "astro";

export const prerender = false;

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TURNSTILE_VERIFY_ENDPOINT =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_ACTION = "contact_form";
const DEFAULT_RATE_LIMIT_MAX = 6;
const DEFAULT_RATE_LIMIT_WINDOW_SECONDS = 600;

type RateLimitState = {
  count: number;
  resetAt: number;
};

const requestRateLimitStore = new Map<string, RateLimitState>();

type RuntimeEnv = {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_AUTO_REPLY_FROM_EMAIL?: string;
  TURNSTILE_SECRET_KEY?: string;
  TURNSTILE_ALLOWED_HOSTNAMES?: string;
  CONTACT_RATE_LIMIT_MAX?: string;
  CONTACT_RATE_LIMIT_WINDOW_SECONDS?: string;
};

type TurnstileVerifyResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

const asString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const normalizeMessage = (value: string): string =>
  value.replace(/\r\n/g, "\n").replace(/\r/g, "\n").trim();

const parsePositiveInt = (
  value: string,
  fallback: number,
  maxValue: number,
): number => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.min(parsed, maxValue);
};

const parseHostnames = (raw: string): string[] =>
  raw
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

const getRuntimeEnv = (context: Parameters<APIRoute>[0]): RuntimeEnv => {
  const runtime = (context.locals as { runtime?: { env?: RuntimeEnv } })
    .runtime;
  return runtime?.env ?? {};
};

const buildRateLimitKey = (request: Request): string => {
  const forwardedIp = asString(request.headers.get("x-forwarded-for"))
    .split(",")[0]
    ?.trim();

  const ip =
    asString(request.headers.get("cf-connecting-ip")) ||
    asString(forwardedIp) ||
    "unknown";

  return `contact:${ip.toLowerCase()}`;
};

const consumeRateLimit = ({
  key,
  maxRequests,
  windowSeconds,
}: {
  key: string;
  maxRequests: number;
  windowSeconds: number;
}): { allowed: boolean; retryAfterSeconds: number } => {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const current = requestRateLimitStore.get(key);

  if (!current || now >= current.resetAt) {
    requestRateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (current.count >= maxRequests) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  requestRateLimitStore.set(key, current);

  if (requestRateLimitStore.size > 1000) {
    for (const [entryKey, entry] of requestRateLimitStore.entries()) {
      if (now >= entry.resetAt) requestRateLimitStore.delete(entryKey);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
};

const turnstileErrorMessage = (codes: string[]): string => {
  if (codes.includes("timeout-or-duplicate")) {
    return "Verification expired. Please retry the challenge.";
  }
  if (codes.includes("invalid-input-response")) {
    return "Verification token is invalid. Please retry.";
  }
  if (codes.includes("missing-input-response")) {
    return "Please complete the verification challenge.";
  }
  if (codes.includes("invalid-input-secret")) {
    return "Verification is misconfigured (invalid secret key).";
  }
  if (codes.includes("missing-input-secret")) {
    return "Verification is misconfigured (missing secret key).";
  }
  if (codes.includes("bad-request")) {
    return "Verification request was invalid. Please retry.";
  }
  if (codes.includes("internal-error")) {
    return "Verification service error. Please retry shortly.";
  }
  return "Verification failed. Please retry.";
};

const verifyTurnstileToken = async ({
  secret,
  token,
  remoteIp,
  allowedHostnames,
}: {
  secret: string;
  token: string;
  remoteIp: string;
  allowedHostnames: string[];
}): Promise<{ ok: boolean; error?: string }> => {
  const payload = new URLSearchParams();
  payload.set("secret", secret);
  payload.set("response", token);
  if (remoteIp) payload.set("remoteip", remoteIp);

  try {
    const response = await fetch(TURNSTILE_VERIFY_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    if (!response.ok) {
      return {
        ok: false,
        error: "Verification service unavailable. Try again in a moment.",
      };
    }

    const result = (await response.json()) as TurnstileVerifyResponse;
    if (!result.success) {
      const codes = Array.isArray(result["error-codes"])
        ? result["error-codes"]
        : [];
      return {
        ok: false,
        error: turnstileErrorMessage(codes),
      };
    }

    if (result.action && result.action !== TURNSTILE_ACTION) {
      return {
        ok: false,
        error: "Verification action mismatch. Please retry.",
      };
    }

    if (allowedHostnames.length > 0) {
      const hostname = asString(result.hostname).toLowerCase();
      if (!hostname || !allowedHostnames.includes(hostname)) {
        return {
          ok: false,
          error: "Verification hostname mismatch.",
        };
      }
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      error: "Verification check failed. Please retry.",
    };
  }
};

const sendResendEmail = async (
  apiKey: string,
  payload: Record<string, unknown>,
): Promise<void> => {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) return;

  const details = await response.text().catch(() => "");
  throw new Error(
    `Resend request failed (${response.status}) ${details.slice(0, 300)}`,
  );
};

const ownerEmailHtml = (
  safeName: string,
  safeEmail: string,
  safeMessage: string,
): string => `
  <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #111827;">
    <h2 style="margin: 0 0 12px;">New Contact Form Submission</h2>
    <p style="margin: 0 0 8px;"><strong>Name:</strong> ${safeName}</p>
    <p style="margin: 0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
    <p style="margin: 0;"><strong>Message:</strong><br />${safeMessage}</p>
  </div>
`;

const autoReplyHtml = (safeName: string, safeMessage: string): string => `
  <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 18px; color: #111827;">
    <h2 style="margin: 0 0 14px; color: #0f766e;">Thanks for reaching out, ${safeName}.</h2>
    <p style="margin: 0 0 10px;">I received your message and will reply as soon as I can.</p>
    <div style="background: #f3f4f6; border-radius: 8px; padding: 12px; margin: 14px 0;">
      <p style="margin: 0;"><strong>Your message:</strong><br />${safeMessage}</p>
    </div>
    <p style="margin: 0;">- Kevin (quietghost.dev)</p>
  </div>
`;

export const POST: APIRoute = async (context) => {
  const runtimeEnv = getRuntimeEnv(context);

  const resendApiKey =
    asString(runtimeEnv.RESEND_API_KEY) ||
    asString(import.meta.env.RESEND_API_KEY);
  const fromEmail =
    asString(runtimeEnv.CONTACT_FROM_EMAIL) ||
    asString(import.meta.env.CONTACT_FROM_EMAIL);
  const toEmail =
    asString(runtimeEnv.CONTACT_TO_EMAIL) ||
    asString(import.meta.env.CONTACT_TO_EMAIL) ||
    FALLBACK_TO_EMAIL;
  const autoReplyFromEmail =
    asString(runtimeEnv.CONTACT_AUTO_REPLY_FROM_EMAIL) ||
    asString(import.meta.env.CONTACT_AUTO_REPLY_FROM_EMAIL) ||
    fromEmail;
  const turnstileSecret =
    asString(runtimeEnv.TURNSTILE_SECRET_KEY) ||
    asString(import.meta.env.TURNSTILE_SECRET_KEY);
  const allowedHostnames = parseHostnames(
    asString(runtimeEnv.TURNSTILE_ALLOWED_HOSTNAMES) ||
      asString(import.meta.env.TURNSTILE_ALLOWED_HOSTNAMES),
  );
  const rateLimitMax = parsePositiveInt(
    asString(runtimeEnv.CONTACT_RATE_LIMIT_MAX) ||
      asString(import.meta.env.CONTACT_RATE_LIMIT_MAX),
    DEFAULT_RATE_LIMIT_MAX,
    50,
  );
  const rateLimitWindowSeconds = parsePositiveInt(
    asString(runtimeEnv.CONTACT_RATE_LIMIT_WINDOW_SECONDS) ||
      asString(import.meta.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS),
    DEFAULT_RATE_LIMIT_WINDOW_SECONDS,
    3600,
  );

  if (!resendApiKey || !fromEmail) {
    return Response.json(
      {
        success: false,
        error:
          "Contact form is not configured yet. Use the direct email link for now.",
      },
      { status: 503 },
    );
  }

  if (!turnstileSecret) {
    return Response.json(
      {
        success: false,
        error: "Verification is not configured yet. Try again shortly.",
      },
      { status: 503 },
    );
  }

  const rateLimitCheck = consumeRateLimit({
    key: buildRateLimitKey(context.request),
    maxRequests: rateLimitMax,
    windowSeconds: rateLimitWindowSeconds,
  });

  if (!rateLimitCheck.allowed) {
    return Response.json(
      {
        success: false,
        error: "Too many contact attempts. Please wait and retry.",
      },
      {
        status: 429,
        headers: {
          "retry-after": String(rateLimitCheck.retryAfterSeconds),
        },
      },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await context.request.json();
  } catch {
    return Response.json(
      {
        success: false,
        error: "Invalid request body.",
      },
      { status: 400 },
    );
  }

  if (!rawBody || typeof rawBody !== "object") {
    return Response.json(
      {
        success: false,
        error: "Invalid request payload.",
      },
      { status: 400 },
    );
  }

  const body = rawBody as Record<string, unknown>;
  const honeypot = asString(body.company);
  if (honeypot) {
    return Response.json({ success: true }, { status: 200 });
  }

  const name = asString(body.name);
  const email = asString(body.email).toLowerCase();
  const message = normalizeMessage(asString(body.message));
  const turnstileToken =
    asString(body.turnstileToken) || asString(body["cf-turnstile-response"]);

  if (name.length < 2 || name.length > 80) {
    return Response.json(
      {
        success: false,
        error: "Name must be between 2 and 80 characters.",
      },
      { status: 400 },
    );
  }

  if (!isValidEmail(email) || email.length > 254) {
    return Response.json(
      {
        success: false,
        error: "Please provide a valid email address.",
      },
      { status: 400 },
    );
  }

  if (message.length < 8 || message.length > 4000) {
    return Response.json(
      {
        success: false,
        error: "Message must be between 8 and 4000 characters.",
      },
      { status: 400 },
    );
  }

  if (!turnstileToken) {
    return Response.json(
      {
        success: false,
        error: "Please complete the verification challenge.",
      },
      { status: 400 },
    );
  }

  const remoteIp = asString(context.request.headers.get("cf-connecting-ip"));
  const turnstileResult = await verifyTurnstileToken({
    secret: turnstileSecret,
    token: turnstileToken,
    remoteIp,
    allowedHostnames,
  });

  if (!turnstileResult.ok) {
    return Response.json(
      {
        success: false,
        error: turnstileResult.error || "Verification failed.",
      },
      { status: 400 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  try {
    await sendResendEmail(resendApiKey, {
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      subject: `New Contact Form Message from ${name}`,
      reply_to: email,
      html: ownerEmailHtml(safeName, safeEmail, safeMessage),
    });

    let warning = "";

    try {
      await sendResendEmail(resendApiKey, {
        from: `quietghost.dev <${autoReplyFromEmail}>`,
        to: [email],
        subject: "Thanks for your message - quietghost.dev",
        html: autoReplyHtml(safeName, safeMessage),
      });
    } catch {
      warning = "auto-reply failed to send";
    }

    return Response.json(
      warning ? { success: true, warning } : { success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("contact submission failed", error);
    return Response.json(
      {
        success: false,
        error: "Unable to send message right now. Please try again shortly.",
      },
      { status: 502 },
    );
  }
};
