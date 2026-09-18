const TOKEN_KEY = "perry_token";
const SESSION_KEY = "perry_cart_session";

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

export async function apiFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const headers = new Headers(init.headers);
  const method = (init.method || "GET").toUpperCase();
  let body = init.body;
  // Some proxies return 502 on PUT/POST without a body/Content-Type.
  if (!body && (method === "PUT" || method === "POST" || method === "PATCH")) {
    body = "{}";
  }
  if (!headers.has("Content-Type") && body) {
    headers.set("Content-Type", "application/json");
  }
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetch(path.startsWith("http") ? path : `/api${path.startsWith("/") ? path : `/${path}`}`, {
      ...init,
      method,
      headers,
      body,
    });
  } catch {
    throw new ApiError(0, "Network error — is Perry.Api running on :5272?");
  }

  const data = await parseJson(res);
  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && "error" in data && String((data as { error: string }).error)) ||
      (res.status === 502 || res.status === 504
        ? "API unavailable (Bad Gateway) — restart Perry.Api on :5272"
        : res.statusText || "Request failed");
    throw new ApiError(res.status, msg, data);
  }
  return data as T;
}
