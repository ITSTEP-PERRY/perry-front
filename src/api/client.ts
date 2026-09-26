const TOKEN_KEY = "perry_token";
const SESSION_KEY = "perry_cart_session";

/** Product API (каталог/корзина/заказы) — через Vite proxy `/api` → :5272 */
export function productApiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `/api${p}`;
}

/**
 * Auth Service Влада (#94/#95).
 * Dev default: prod Auth Azure. Override: VITE_AUTH_API_URL.
 */
export function authApiUrl(path: string): string {
  const base = (
    import.meta.env.VITE_AUTH_API_URL as string | undefined
  )?.replace(/\/$/, "")
    || "https://perry-auth-service.orangeplant-910928aa.swedencentral.azurecontainerapps.io";
  const p = path.startsWith("/") ? path : `/${path}`;
  // Auth API paths are /api/auth/...
  if (p.startsWith("/api/")) return `${base}${p}`;
  return `${base}/api${p}`;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
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

type FetchOpts = RequestInit & { base?: "product" | "auth" };

export async function apiFetch<T = unknown>(
  path: string,
  init: FetchOpts = {},
): Promise<T> {
  const { base = "product", ...rest } = init;
  const headers = new Headers(rest.headers);
  const method = (rest.method || "GET").toUpperCase();
  let body = rest.body;
  if (!body && (method === "PUT" || method === "POST" || method === "PATCH")) {
    body = "{}";
  }
  if (!headers.has("Content-Type") && body) {
    headers.set("Content-Type", "application/json");
  }
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const url =
    path.startsWith("http")
      ? path
      : base === "auth"
        ? authApiUrl(path)
        : productApiUrl(path);

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
        : "Network error — is Perry.Api running on :5272?",
    );
  }

  const data = await parseJson(res);
  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && "error" in data && String((data as { error: string }).error)) ||
      (data && typeof data === "object" && "title" in data && String((data as { title: string }).title)) ||
      (data && typeof data === "object" && "message" in data && String((data as { message: string }).message)) ||
      (res.status === 502 || res.status === 504
        ? "API unavailable (Bad Gateway)"
        : res.statusText || "Request failed");
    throw new ApiError(res.status, msg, data);
  }
  return data as T;
}
