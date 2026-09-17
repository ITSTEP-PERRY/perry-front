import { apiFetch } from "./client";
import type {
  AuthResponse,
  AuthUser,
  CartResponse,
  CategoryDto,
  OrderDto,
  ProductDetail,
  ProductListResponse,
} from "./types";

export const categoriesApi = {
  tree: () => apiFetch<CategoryDto[]>("/categories"),
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
};

function cartQs(userId?: string | null, sessionId?: string) {
  const p = new URLSearchParams();
  if (userId) p.set("userId", userId);
  if (sessionId) p.set("sessionId", sessionId);
  const qs = p.toString();
  return qs ? `?${qs}` : "";
}

export const cartApi = {
  get: (userId: string | null, sessionId: string) =>
    apiFetch<CartResponse>(`/cart${cartQs(userId, sessionId)}`),
  count: (userId: string | null, sessionId: string) =>
    apiFetch<{ count: number }>(`/cart/count${cartQs(userId, sessionId)}`),
  add: (userId: string | null, sessionId: string, productId: string, quantity = 1) =>
    apiFetch(`/cart/add${cartQs(userId, sessionId)}`, {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    }),
  setQty: (userId: string | null, sessionId: string, productId: string, quantity: number) =>
    apiFetch(`/cart/quantity${cartQs(userId, sessionId)}`, {
      method: "PUT",
      body: JSON.stringify({ productId, quantity }),
    }),
  remove: (userId: string | null, sessionId: string, productId: string) =>
    apiFetch(`/cart/item/${productId}${cartQs(userId, sessionId)}`, {
      method: "DELETE",
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
  forgot: (email: string) =>
    apiFetch<{ status: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};

export const ordersApi = {
  mine: () => apiFetch<OrderDto[]>("/orders"),
  byId: (id: string) => apiFetch<OrderDto>(`/orders/${id}`),
  checkout: (sessionId: string) =>
    apiFetch<OrderDto>("/orders/checkout", {
      method: "POST",
      body: JSON.stringify({ sessionId }),
    }),
  all: () => apiFetch<OrderDto[]>("/orders/admin"),
  setStatus: (id: string, status: string) =>
    apiFetch(`/orders/${id}/status`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    }),
};

export const usersApi = {
  list: () =>
    apiFetch<
      {
        id: string;
        name: string;
        email: string;
        roleId: string;
        login: string;
        registeredAtUtc: string;
      }[]
    >("/users"),
  softDelete: (id: string) => apiFetch(`/users/${id}`, { method: "DELETE" }),
  setRole: (id: string, roleId: string) =>
    apiFetch(`/users/${id}/role`, { method: "PUT", body: JSON.stringify({ roleId }) }),
};
