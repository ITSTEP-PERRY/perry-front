import { apiFetch } from "./client";
import type {
  AuthResponse,
  AuthUser,
  CartResponse,
  CategoryDto,
  OrderDto,
  AdminOrdersResponse,
  ProductDetail,
  ProductListResponse,
  WishlistItemDto,
} from "./types";

export const categoriesApi = {
  tree: (opts?: { includeInactive?: boolean }) => {
    const qs = opts?.includeInactive ? "?includeInactive=true" : "";
    return apiFetch<CategoryDto[]>(`/categories${qs}`);
  },
  bySlug: (slug: string) => apiFetch<CategoryDto>(`/categories/${encodeURIComponent(slug)}`),
  create: (body: Record<string, unknown>) =>
    apiFetch<CategoryDto>("/categories", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: Record<string, unknown>) =>
    apiFetch<CategoryDto>(`/categories/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (id: string) => apiFetch<void>(`/categories/${id}`, { method: "DELETE" }),
};

export type ProductQuery = {
  categoryId?: string;
  brand?: string;
  brands?: string[];
  fabrics?: string[];
  sizes?: string[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  search?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
};

export const reviewsApi = {
  create: (
    productId: string,
    body: { rating: number; title: string; body: string; tags?: string[]; imageUrls?: string[] },
  ) =>
    apiFetch<{
      id: string;
      authorName: string;
      rating: number;
      title: string;
      body: string;
      createdAtUtc: string;
      tags: string[];
      images: string[];
    }>(`/products/${productId}/reviews`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
  adminList: (opts?: { status?: string; q?: string }) => {
    const p = new URLSearchParams();
    if (opts?.status) p.set("status", opts.status);
    if (opts?.q) p.set("q", opts.q);
    const qs = p.toString();
    return apiFetch<
      {
        id: string;
        productId: string;
        productName: string;
        authorName: string;
        rating: number;
        title: string;
        body: string;
        isApproved: boolean;
        createdAtUtc: string;
        tags: string[];
      }[]
    >(`/admin/reviews${qs ? `?${qs}` : ""}`);
  },
  approve: (id: string) =>
    apiFetch<{ status: string }>(`/admin/reviews/${id}/approve`, { method: "PUT" }),
  reject: (id: string) =>
    apiFetch<{ status: string }>(`/admin/reviews/${id}/reject`, { method: "PUT" }),
  remove: (id: string) => apiFetch<void>(`/admin/reviews/${id}`, { method: "DELETE" }),
};

export const productsApi = {
  list: (q: ProductQuery = {}) => {
    const params = new URLSearchParams();
    Object.entries(q).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      if (Array.isArray(v)) {
        v.forEach((item) => params.append(k, item));
        return;
      }
      params.set(k, String(v));
    });
    const qs = params.toString();
    return apiFetch<ProductListResponse>(`/products${qs ? `?${qs}` : ""}`);
  },
  byId: (id: string) => apiFetch<ProductDetail>(`/products/${id}`),
  create: (body: Record<string, unknown>) =>
    apiFetch<{ id: string; slug: string }>("/products", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: Record<string, unknown>) =>
    apiFetch<{ id: string }>(`/products/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  remove: (id: string) => apiFetch<void>(`/products/${id}`, { method: "DELETE" }),
  notifyWhenAvailable: (id: string, email?: string) =>
    apiFetch<{ status: string; email: string; alreadySubscribed?: boolean }>(
      `/products/${id}/notify`,
      {
        method: "POST",
        body: JSON.stringify(email ? { email } : {}),
      },
    ),
};

function cartQs(sessionId?: string) {
  const p = new URLSearchParams();
  if (sessionId) p.set("sessionId", sessionId);
  const qs = p.toString();
  return qs ? `?${qs}` : "";
}

export const cartApi = {
  get: (_userId: string | null, sessionId: string) =>
    apiFetch<CartResponse>(`/cart${cartQs(sessionId)}`),
  count: (_userId: string | null, sessionId: string) =>
    apiFetch<{ count: number }>(`/cart/count${cartQs(sessionId)}`),
  add: (_userId: string | null, sessionId: string, productId: string, quantity = 1) =>
    apiFetch(`/cart/add${cartQs(sessionId)}`, {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    }),
  setQty: (_userId: string | null, sessionId: string, productId: string, quantity: number) =>
    apiFetch(`/cart/quantity${cartQs(sessionId)}`, {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    }),
  remove: (_userId: string | null, sessionId: string, productId: string) =>
    apiFetch(`/cart/item/${productId}${cartQs(sessionId)}`, {
      method: "DELETE",
    }),
  merge: (sessionId: string) =>
    apiFetch<{ status: string }>("/cart/merge", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    }),
};

export const authApi = {
  login: (login: string, password: string) =>
    apiFetch<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    }),
  register: (body: { name: string; email: string; login: string; password: string }) =>
    apiFetch<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  me: () => apiFetch<AuthUser>("/auth/me"),
  updateMe: (body: { name?: string; email?: string; avatar?: string }) =>
    apiFetch<AuthUser>("/auth/me", { method: "PUT", body: JSON.stringify(body) }),
  changePassword: (currentPassword: string, newPassword: string) =>
    apiFetch<{ status: string }>("/auth/me/password", {
      method: "PUT",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
  sendEmailChangeCode: (newEmail: string, password: string) =>
    apiFetch<{ status: string; code?: string }>("/auth/me/email/send-code", {
      method: "POST",
      body: JSON.stringify({ newEmail, password }),
    }),
  changeEmail: (newEmail: string, password: string, code: string) =>
    apiFetch<AuthUser>("/auth/me/email", {
      method: "PUT",
      body: JSON.stringify({ newEmail, password, code }),
    }),
  deleteMe: () => apiFetch<void>("/auth/me", { method: "DELETE" }),
  forgot: (email: string) =>
    apiFetch<{ status: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};

export const wishlistApi = {
  mine: (search?: string) => {
    const qs = search ? `?search=${encodeURIComponent(search)}` : "";
    return apiFetch<WishlistItemDto[]>(`/wishlist${qs}`);
  },
  ids: () => apiFetch<string[]>("/wishlist/ids"),
  add: (productId: string) =>
    apiFetch<{ status: string }>("/wishlist", {
      method: "POST",
      body: JSON.stringify({ productId }),
    }),
  remove: (productId: string) => apiFetch<void>(`/wishlist/${productId}`, { method: "DELETE" }),
};

export const ordersApi = {
  mine: () => apiFetch<OrderDto[]>("/orders"),
  byId: (id: string) => apiFetch<OrderDto>(`/orders/${id}`),
  checkout: (sessionId: string) =>
    apiFetch<OrderDto>("/orders/checkout", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    }),
  admin: (opts?: { status?: string; fromUtc?: string; toUtc?: string; orderId?: string }) => {
    const p = new URLSearchParams();
    if (opts?.status) p.set("status", opts.status);
    if (opts?.fromUtc) p.set("fromUtc", opts.fromUtc);
    if (opts?.toUtc) p.set("toUtc", opts.toUtc);
    if (opts?.orderId) p.set("orderId", opts.orderId);
    const qs = p.toString();
    return apiFetch<AdminOrdersResponse>(`/orders/admin${qs ? `?${qs}` : ""}`);
  },
  /** Back-compat: flat list without filters. */
  all: () =>
    apiFetch<AdminOrdersResponse>("/orders/admin").then((r) => r.items),
  setStatus: (id: string, status: string) =>
    apiFetch(`/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
};

export const usersApi = {
  list: (opts?: { status?: string; role?: string }) => {
    const p = new URLSearchParams();
    if (opts?.status) p.set("status", opts.status);
    if (opts?.role) p.set("role", opts.role);
    const qs = p.toString();
    return apiFetch<
      {
        id: string;
        name: string;
        email: string;
        roleId: string;
        login: string;
        registeredAtUtc: string;
        deletedAtUtc?: string | null;
        isDeleted?: boolean;
      }[]
    >(`/users${qs ? `?${qs}` : ""}`);
  },
  softDelete: (id: string) => apiFetch(`/users/${id}`, { method: "DELETE" }),
  restore: (id: string) => apiFetch(`/users/${id}/restore`, { method: "POST" }),
  setRole: (id: string, roleId: string) =>
    apiFetch(`/users/${id}/role`, { method: "PUT", body: JSON.stringify({ roleId }) }),
};
