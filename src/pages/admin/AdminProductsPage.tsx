import { type FormEvent, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categoriesApi, productsApi } from "../../api";
import type { CategoryDto, ProductListItem } from "../../api/types";

export function AdminProductsPage() {
  const [params, setParams] = useSearchParams();
  const categoryId = params.get("categoryId") || undefined;
  const selectedId = params.get("selectedId") || undefined;
  const q = params.get("q") || "";
  const [cats, setCats] = useState<CategoryDto[]>([]);
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [search, setSearch] = useState(q);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    categoriesApi.tree().then(setCats).catch(() => setCats([]));
  }, []);

  useEffect(() => {
    productsApi
      .list({ categoryId, search: q || undefined, pageSize: 50, sort: "newest" })
      .then((r) => setItems(r.items))
      .catch((e: Error) => setError(e.message));
  }, [categoryId, q]);

  const flat = useMemo(() => {
    const out: { id: string; name: string; depth: number }[] = [];
    const walk = (nodes: CategoryDto[], d: number) => {
      nodes.forEach((n) => {
        out.push({ id: n.id, name: n.name, depth: d });
        if (n.subCategories) walk(n.subCategories, d + 1);
      });
    };
    walk(cats, 0);
    return out;
  }, [cats]);

  const selected = items.find((i) => i.id === selectedId);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (search.trim()) next.set("q", search.trim());
    else next.delete("q");
    setParams(next);
  };

  return (
    <div>
      <div className="ap-toolbar">
        <label>
          Category{" "}
          <select
            value={categoryId || ""}
            onChange={(e) => {
              const next = new URLSearchParams(params);
              if (e.target.value) next.set("categoryId", e.target.value);
              else next.delete("categoryId");
              next.delete("selectedId");
              setParams(next);
            }}
          >
            <option value="">All</option>
            {flat.map((c) => (
              <option key={c.id} value={c.id}>
                {"—".repeat(c.depth)} {c.name}
              </option>
            ))}
          </select>
        </label>
        <form className="ap-search" onSubmit={onSearch}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
        </form>
        <Link className="btn-perry" to="/admin/products/new">
          + Create
        </Link>
      </div>
      {error && <p className="error-banner">{error}</p>}
      <div className="admin-split">
        <div className="table-wrap">
          {items.length === 0 ? (
            <div className="empty-state">
              <p>No products in the selected category</p>
              <Link className="btn-perry" to="/admin/products/new">
                Create product
              </Link>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th />
                  <th>Product name</th>
                  <th>Rating</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p) => (
                  <tr
                    key={p.id}
                    className={selectedId === p.id ? "is-selected" : undefined}
                    onClick={() => {
                      const next = new URLSearchParams(params);
                      next.set("selectedId", p.id);
                      setParams(next);
                    }}
                  >
                    <td>
                      {p.imageUrl ? (
                        <img className="product-row-thumb" src={p.imageUrl} alt="" />
                      ) : (
                        <div className="product-row-thumb" />
                      )}
                    </td>
                    <td>{p.name}</td>
                    <td>★ {p.averageRating.toFixed(1)}</td>
                    <td>${p.price.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <aside>
          {!selected ? (
            <div className="admin-panel-empty">Select a product to see its information</div>
          ) : (
            <div className="ap-panel" style={{ background: "#fff" }}>
              {selected.imageUrl && (
                <img src={selected.imageUrl} alt="" style={{ width: "100%", borderRadius: 8, marginBottom: 12 }} />
              )}
              <h2>{selected.name}</h2>
              <p className="muted">
                ★ {selected.averageRating.toFixed(1)} · ${selected.price.toFixed(2)}
              </p>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <Link className="btn-perry" to={`/admin/products/${selected.id}`}>
                  Edit
                </Link>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={async () => {
                    if (!confirm("Archive product?")) return;
                    await productsApi.remove(selected.id);
                    const next = new URLSearchParams(params);
                    next.delete("selectedId");
                    setParams(next);
                    setItems((prev) => prev.filter((x) => x.id !== selected.id));
                  }}
                >
                  Delete
                </button>
              </div>
              <p style={{ marginTop: 12 }}>
                <Link to={`/products/${selected.id}`}>See on storefront</Link>
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
