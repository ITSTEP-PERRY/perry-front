import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ordersApi } from "../../api";
import type { OrderDto } from "../../api/types";

const STATUSES = ["Pending", "Paid", "Shipped", "Completed", "Cancelled"];

function statusClass(status: string) {
  const s = status.toLowerCase();
  if (s.includes("pending")) return "ap-status ap-status--pending";
  if (s.includes("paid")) return "ap-status ap-status--paid";
  if (s.includes("ship")) return "ap-status ap-status--shipped";
  if (s.includes("complete")) return "ap-status ap-status--completed";
  if (s.includes("cancel")) return "ap-status ap-status--cancelled";
  return "ap-status";
}

export function AdminOrdersPage() {
  const [params, setParams] = useSearchParams();
  const selectedId = params.get("selectedId") || undefined;
  const q = params.get("q") || "";
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [search, setSearch] = useState(q);
  const [error, setError] = useState<string | null>(null);

  const reload = () =>
    ordersApi
      .all()
      .then(setOrders)
      .catch((e: Error) => setError(e.message));

  useEffect(() => {
    void reload();
  }, []);

  useEffect(() => setSearch(q), [q]);

  const filtered = orders.filter((o) => {
    const qq = q.trim().toLowerCase();
    if (!qq) return true;
    return (
      o.userName?.toLowerCase().includes(qq) ||
      o.status.toLowerCase().includes(qq) ||
      o.id.toLowerCase().includes(qq)
    );
  });

  const selected = filtered.find((o) => o.id === selectedId) ?? null;

  return (
    <div>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="ap-toolbar">
        <span className="ap-toolbar__label">Orders</span>
        <form
          className="ap-search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            const next = new URLSearchParams(params);
            if (search.trim()) next.set("q", search.trim());
            else next.delete("q");
            setParams(next);
          }}
        >
          <img className="ap-search__icon" src="/icons/search.svg" alt="" width={20} height={16} />
          <input
            className="ap-search__input"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </form>
      </div>

      <div className="ap-layout">
        <section className="ap-list">
          {filtered.length === 0 ? (
            <div className="ap-empty">
              <div className="ap-empty__ph" aria-hidden="true" />
              <p className="ap-empty__text">{q ? `Nothing found for “${q}”` : "No orders yet"}</p>
            </div>
          ) : (
            <div className="ap-table ap-table--orders">
              <div className="ap-table__head">
                <span>Date</span>
                <span>Customer</span>
                <span>Status</span>
                <span>Total</span>
                <span />
              </div>
              {filtered.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`ap-table__row ${selectedId === o.id ? "is-selected" : ""}`}
                  onClick={() => {
                    const next = new URLSearchParams(params);
                    next.set("selectedId", o.id);
                    setParams(next);
                  }}
                >
                  <span className="ap-table__name">
                    {new Date(o.orderDateUtc).toLocaleString()}
                  </span>
                  <span>{o.userName || "—"}</span>
                  <span>
                    <span className={statusClass(o.status)}>{o.status}</span>
                  </span>
                  <span className="ap-table__price">${o.totalAmount.toFixed(2)}</span>
                  <span />
                </button>
              ))}
            </div>
          )}
        </section>

        <aside className="ap-panel">
          {!selected ? (
            <div className="ap-panel__empty">
              <p>Select an order to see its information</p>
            </div>
          ) : (
            <div className="ap-panel__preview">
              <h2 className="ap-panel__title">Order information</h2>
              <p className="ap-panel__meta">
                <code>{selected.id}</code>
              </p>
              <p className="ap-panel__meta">
                {new Date(selected.orderDateUtc).toLocaleString()} · {selected.userName || "Guest"}
              </p>
              <p className="ap-panel__meta">
                Items: {selected.itemsCount} · Total:{" "}
                <strong>${selected.totalAmount.toFixed(2)}</strong>
              </p>
              <label className="ap-panel__form" style={{ marginTop: 16 }}>
                Status
                <select
                  value={selected.status}
                  onChange={async (e) => {
                    await ordersApi.setStatus(selected.id, e.target.value);
                    await reload();
                  }}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              {selected.items && selected.items.length > 0 && (
                <div style={{ marginTop: 20 }}>
                  <h3 className="ap-panel__form-title" style={{ fontSize: "1rem" }}>
                    Items
                  </h3>
                  <ul style={{ paddingLeft: 18, margin: 0 }}>
                    {selected.items.map((it, i) => (
                      <li key={i} style={{ marginBottom: 8 }}>
                        {it.productName} × {it.quantity} — ${it.unitPrice.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
