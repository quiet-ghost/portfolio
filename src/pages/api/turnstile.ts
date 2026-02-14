import type { APIRoute } from "astro";

export const prerender = false;

type RuntimeEnv = {
  TURNSTILE_SITE_KEY?: string;
};

const asString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const getRuntimeEnv = (context: Parameters<APIRoute>[0]): RuntimeEnv => {
  const runtime = (context.locals as { runtime?: { env?: RuntimeEnv } }).runtime;
  return runtime?.env ?? {};
};

export const GET: APIRoute = async (context) => {
  const runtimeEnv = getRuntimeEnv(context);
  const siteKey =
    asString(runtimeEnv.TURNSTILE_SITE_KEY) ||
    asString(import.meta.env.TURNSTILE_SITE_KEY);

  if (!siteKey) {
    return Response.json(
      {
        success: false,
        error: "Turnstile site key is not configured.",
      },
      {
        status: 503,
        headers: {
          "cache-control": "no-store",
        },
      },
    );
  }

  return Response.json(
    {
      success: true,
      siteKey,
    },
    {
      status: 200,
      headers: {
        "cache-control": "no-store",
      },
    },
  );
};
