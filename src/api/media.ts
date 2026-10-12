/**
 * Public origin of Product API (hosts /uploads/…).
 * Dev: empty → same-origin Vite proxy `/uploads`.
 * Prod: VITE_API_PROXY / fallback api.perrydev.space.
 */
function productMediaOrigin(): string {
  if (import.meta.env.DEV) return "";
  const raw =
    (import.meta.env.VITE_API_PROXY as string | undefined) ||
    (import.meta.env.VITE_PRODUCT_API_URL as string | undefined) ||
    "";
  const trimmed = raw.replace(/\/$/, "").replace(/\/api$/i, "");
  return trimmed || "https://api.perrydev.space";
}

/** Turn `/uploads/...` into an absolute Product API URL on production SWA. */
export function absoluteUploadsUrl(path: string): string {
  if (!path.startsWith("/uploads")) return path;
  const origin = productMediaOrigin();
  return origin ? `${origin}${path}` : path;
}

/** API sometimes returns imageUrl as string, sometimes as { url }. */
export function resolveMediaUrl(value: unknown): string | null {
  if (value == null || value === "") return null;
  let url: string | null = null;
  if (typeof value === "string") url = value;
  else if (typeof value === "object" && "url" in (value as object)) {
    const u = (value as { url?: unknown }).url;
    url = typeof u === "string" && u ? u : null;
  }
  if (!url) return null;
  if (url.startsWith("/uploads")) return absoluteUploadsUrl(url);
  return url;
}
