/**
 * URL админки команды (perry-admin-front).
 * #A18 — кнопка Admin в Header должна вести сюда, не на встроенный /admin.
 */
export function getAdminUrl(): string {
  const fromEnv = (import.meta.env.VITE_ADMIN_URL as string | undefined)?.replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (import.meta.env.DEV) return "http://localhost:3001";
  return "https://admin.perrydev.space";
}
