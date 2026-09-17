import { useEffect, useState } from "react";
import { ordersApi } from "../../api";
import type { OrderDto } from "../../api/types";

export function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reload = () =>
    ordersApi
      .all()
      .then(setOrders)
      .catch((e: Error) => setError(e.message));

  useEffect(() => {
    void reload();
  }, []);

  return (
    <div>
      <h1 className="page-title">Orders</h1>
      {error && <p className="error-banner">{error}</p>}
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{new Date(o.orderDateUtc).toLocaleString()}</td>
                <td>{o.userName || "—"}</td>
                <td>{o.status}</td>
                <td>${o.totalAmount.toFixed(2)}</td>
                <td>
                  <select
                    value={o.status}
                    onChange={async (e) => {
                      await ordersApi.setStatus(o.id, e.target.value);
                      await reload();
                    }}
                  >
                    {["Pending", "Paid", "Shipped", "Completed", "Cancelled"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
