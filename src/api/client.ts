const TOKEN_KEY = "perry_token";
const SESSION_KEY = "perry_cart_session";

/** Product API (каталог/корзина/заказы) — через Vite proxy `/api` → :5272 */
export function productApiUrl(path: string): string {
  const configured = import.meta.env.VITE_AUTH_API_URL as string | undefined;
  const base = resolveServiceBase(
      configured,
      "/core-api",
      "https://api.perrydev.space",
  );
  const p = path.startsWith("/") ? path : `/${path}`;
  // Auth API paths are /api/auth/...
  if (p.startsWith("/api/")) return `${base}${p}`;
  return `${base}/api${p}`;
}

/**
 * In DEV always prefer same-origin Vite proxy — absolute Azure URLs in `.env`
 * cause browser CORS ("Network error") even when the service is healthy.
 */
function resolveServiceBase(
  configured: string | undefined,
  devProxy: string,
  prodFallback: string,
): string {
  const trimmed = configured?.replace(/\/$/, "") || "";
  if (import.meta.env.DEV) {
    if (trimmed.startsWith("/")) return trimmed;
    return devProxy;
  }
  return trimmed || prodFallback;
}

/**
 * Auth Service Влада (#94/#95).
 * Dev: Vite proxy `/auth-api` → Azure (обход CORS).
 * Override: VITE_AUTH_API_URL (полный origin или `/auth-api`).
 */
export function authApiUrl(path: string): string {
  const configured = import.meta.env.VITE_AUTH_API_URL as string | undefined;
  const base = resolveServiceBase(
    configured,
    "/auth-api",
    "https://perry-auth-service.orangeplant-910928aa.swedencentral.azurecontainerapps.io",
  );
  const p = path.startsWith("/") ? path : `/${path}`;
  // Auth API paths are /api/auth/...
  if (p.startsWith("/api/")) return `${base}${p}`;
  return `${base}/api${p}`;
}

/**
 * Admin Users — perry-admin-service (не Auth).
 * Dev: Vite proxy `/users-api` → Azure.
 */
export function usersApiUrl(path: string): string {
  const configured = import.meta.env.VITE_USERS_API_URL as string | undefined;
  const base = resolveServiceBase(
    configured,
    "/users-api",
    "https://perry-admin-service.orangeplant-910928aa.swedencentral.azurecontainerapps.io",
  );
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p.startsWith("/api/")) return `${base}${p}`;
  return `${base}/api${p}`;
}

/** #221 — JWT in cookies (Readable by SPA; Auth httpOnly would need Set-Cookie from Auth Service). */
function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const prefix = `${encodeURIComponent(name)}=`;
  for (const part of document.cookie.split(";")) {
    const s = part.trim();
    if (!s.startsWith(prefix)) continue;
    try {
      return decodeURIComponent(s.slice(prefix.length));
    } catch {
      return s.slice(prefix.length);
    }
  }
  return null;
}

function writeCookie(name: string, value: string, maxAgeSec: number) {
  if (typeof document === "undefined") return;
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}` +
    `; Path=/; Max-Age=${Math.max(60, maxAgeSec)}; SameSite=Lax${secure}`;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") return;
  const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${encodeURIComponent(name)}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

/** Max-Age from JWT `exp`, fallback 7 days. */
function tokenMaxAgeSec(token: string): number {
  try {
    const payload = token.split(".")[1];
    if (!payload) return 7 * 24 * 3600;
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as { exp?: number };
    if (typeof json.exp === "number") {
      const left = json.exp - Math.floor(Date.now() / 1000);
      if (left > 60) return left;
    }
  } catch {
    /* ignore malformed JWT */
  }
  return 7 * 24 * 3600;
}

export function getToken(): string | null {
  const fromCookie = readCookie(TOKEN_KEY);
  if (fromCookie) return fromCookie;

  // One-time migrate from legacy localStorage → cookie.
  try {
    const legacy = localStorage.getItem(TOKEN_KEY);
    if (legacy) {
      writeCookie(TOKEN_KEY, legacy, tokenMaxAgeSec(legacy));
      localStorage.removeItem(TOKEN_KEY);
      return legacy;
    }
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

export function setToken(token: string | null) {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* ignore */
  }
  if (token) writeCookie(TOKEN_KEY, token, tokenMaxAgeSec(token));
  else clearCookie(TOKEN_KEY);
}

export function getCartSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, message: string, body?: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

async function parseJson(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

type FetchOpts = RequestInit & { base?: "product" | "auth" | "users" };

function resolveUrl(path: string, base: "product" | "auth" | "users"): string {
  if (path.startsWith("http")) return path;
  if (base === "auth") return authApiUrl(path);
  if (base === "users") return usersApiUrl(path);
  return productApiUrl(path);
}

function friendlyStatusMessage(status: number, base: "product" | "auth" | "users"): string {
  if (status === 401) {
    if (base === "users") return "Unauthorized — Admin Users API needs an Admin JWT.";
    if (base === "auth") return "Unauthorized — sign in again.";
    // Product: reviews/cart/orders — any signed-in user, not Admin-only.
    return "Unauthorized — sign in again (regular account is enough).";
  }
  if (status === 403) {
    return base === "product" || base === "auth"
      ? "Forbidden — you do not have access."
      : "Forbidden — Admin role required.";
  }
  if (status === 404) {
    return base === "users"
      ? "Users API not found (perry-admin-service)."
      : "Not found.";
  }
  if (status === 502 || status === 504) return "API unavailable (Bad Gateway)";
  return `Request failed (HTTP ${status})`;
}

export async function apiFetch<T = unknown>(
  path: string,
  init: FetchOpts = {},
): Promise<T> {
  const { base = "product", ...rest } = init;
  const headers = new Headers(rest.headers);
  const method = (rest.method || "GET").toUpperCase();
  let body = rest.body;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (!body && (method === "PUT" || method === "POST" || method === "PATCH")) {
    body = "{}";
  }
  // FormData must keep the browser-generated multipart boundary — do not force JSON.
  if (!isFormData && !headers.has("Content-Type") && body) {
    headers.set("Content-Type", "application/json");
  }
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const url = resolveUrl(path, base);

  let res: Response;
  try {
    res = await fetch(url, {
      ...rest,
      method,
      headers,
      body,
    });
  } catch {
    throw new ApiError(
      0,
      base === "auth"
        ? "Network error — Auth Service unreachable (check VITE_AUTH_API_URL / CORS)."
        : base === "users"
          ? "Network error — Users API unreachable (perry-admin-service)."
          : "Network error — is Perry.Api running on :5272?",
    );
  }

  const data = await parseJson(res);
  if (!res.ok) {
    // Не сбрасываем сессию автоматически — выход только по кнопке Logout.
    const msg =
      formatApiErrorMessage(data) ||
      friendlyStatusMessage(res.status, base) ||
      res.statusText ||
      `Request failed (HTTP ${res.status})`;
    throw new ApiError(res.status, msg, data);
  }
  return data as T;
}

/** Auth ProblemDetails: { message, errors: { field: string[] } } */
function formatApiErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") {
    return typeof data === "string" ? data.trim() : "";
  }
  const o = data as {
    error?: string;
    message?: string;
    title?: string;
    errors?: Record<string, string[] | string>;
  };
  const fieldErrors: string[] = [];
  if (o.errors && typeof o.errors === "object") {
    for (const msgs of Object.values(o.errors)) {
      if (Array.isArray(msgs)) fieldErrors.push(...msgs.map(String));
      else if (msgs) fieldErrors.push(String(msgs));
    }
  }
  if (fieldErrors.length) return fieldErrors.join(" ");
  return String(o.error || o.message || o.title || "").trim();
}
