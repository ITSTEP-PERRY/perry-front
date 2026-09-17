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
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(path.startsWith("http") ? path : `/api${path.startsWith("/") ? path : `/${path}`}`, {
    ...init,
    headers,
  });

  const data = await parseJson(res);
  if (!res.ok) {
    const msg =
      (data && typeof data === "object" && "error" in data && String((data as { error: string }).error)) ||
      res.statusText ||
      "Request failed";
    throw new ApiError(res.status, msg, data);
  }
  return data as T;
}
