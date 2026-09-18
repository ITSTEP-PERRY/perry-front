import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usersApi } from "../../api";

type UserRow = {
  id: string;
  name: string;
  email: string;
  roleId: string;
  login: string;
  registeredAtUtc: string;
  deletedAtUtc?: string | null;
  isDeleted?: boolean;
};

const ROLES = ["Admin", "Editor", "Guest"];

export function AdminUsersPage() {
  const [params, setParams] = useSearchParams();
  const selectedId = params.get("selectedId") || undefined;
  const status = params.get("status") || "active";
  const role = params.get("role") || "";
  const q = params.get("q") || "";
  const [users, setUsers] = useState<UserRow[]>([]);
  const [search, setSearch] = useState(q);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const reload = () =>
    usersApi
      .list({ status, role: role || undefined })
      .then(setUsers)
      .catch((e: Error) => setError(e.message));

  useEffect(() => {
    void reload();
  }, [status, role]);

  useEffect(() => setSearch(q), [q]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(qq) ||
        u.email.toLowerCase().includes(qq) ||
        u.login.toLowerCase().includes(qq),
    );
  }, [users, q]);

  const selected = filtered.find((u) => u.id === selectedId) ?? null;

  const setFilter = (key: string, value?: string) => {
    const next = new URLSearchParams(params);
    if (!value) next.delete(key);
    else next.set(key, value);
    if (key !== "selectedId") next.delete("selectedId");
    setParams(next);
  };

  return (
    <div>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="ap-toolbar">
        <span className="ap-toolbar__label">Users</span>
        <div className="ap-chips">
          {(
            [
              ["active", "Active"],
              ["deleted", "Deleted"],
              ["all", "All"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={`ap-chip ${status === value ? "is-active" : ""}`}
              onClick={() => setFilter("status", value)}
            >
              {label}
            </button>
          ))}
        </div>
        <select
          className="ap-select"
          value={role}
          aria-label="Filter by role"
          onChange={(e) => setFilter("role", e.target.value || undefined)}
        >
          <option value="">All roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <form
          className="ap-search"
          role="search"
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            setFilter("q", search.trim() || undefined);
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
              <p className="ap-empty__text">{q ? `Nothing found for “${q}”` : "No users"}</p>
            </div>
          ) : (
            <div className="ap-table ap-table--users">
              <div className="ap-table__head">
                <span>Name</span>
                <span>Email</span>
                <span>Role</span>
                <span>Status</span>
                <span />
              </div>
              {filtered.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  className={`ap-table__row ${selectedId === u.id ? "is-selected" : ""}`}
                  onClick={() => setFilter("selectedId", u.id)}
                >
                  <span className="ap-table__name">
                    <strong title={u.name}>{u.name}</strong>
                    <span className="ap-slug" title={u.login || undefined}>
                      @{u.login || "—"}
                    </span>
                  </span>
                  <span className="ap-table__cell" title={u.email}>
                    {u.email}
                  </span>
                  <span className="ap-table__cell">{u.roleId}</span>
                  <span>
                    <span
                      className={`ap-status ${u.isDeleted ? "ap-status--cancelled" : "ap-status--completed"}`}
                    >
                      {u.isDeleted ? "Deleted" : "Active"}
                    </span>
                  </span>
                  <span />
                </button>
              ))}
            </div>
          )}
        </section>

        <aside className="ap-panel">
          {!selected ? (
            <div className="ap-panel__empty">
              <p>Select a user to manage</p>
            </div>
          ) : (
            <div className="ap-panel__preview">
              <h2 className="ap-panel__title">{selected.name}</h2>
              <p className="ap-panel__meta">{selected.email}</p>
              <p className="ap-panel__meta">Login: {selected.login || "—"}</p>
              <p className="ap-panel__meta">
                Registered: {new Date(selected.registeredAtUtc).toLocaleString()}
              </p>
              {selected.isDeleted && selected.deletedAtUtc && (
                <p className="ap-panel__meta">
                  Deleted: {new Date(selected.deletedAtUtc).toLocaleString()}
                </p>
              )}
              <label className="ap-field">
                Role
                <select
                  value={selected.roleId}
                  disabled={busy || !!selected.isDeleted}
                  onChange={async (e) => {
                    setBusy(true);
                    setError(null);
                    try {
                      await usersApi.setRole(selected.id, e.target.value);
                      await reload();
                    } catch (err) {
                      setError(err instanceof Error ? err.message : "Role update failed");
                    } finally {
                      setBusy(false);
                    }
                  }}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>
              <div className="ap-panel__actions">
                {selected.isDeleted ? (
                  <button
                    type="button"
                    className="ap-panel__btn"
                    disabled={busy}
                    onClick={async () => {
                      setBusy(true);
                      try {
                        await usersApi.restore(selected.id);
                        await reload();
                      } catch (err) {
                        setError(err instanceof Error ? err.message : "Restore failed");
                      } finally {
                        setBusy(false);
                      }
                    }}
                  >
                    Restore
                  </button>
                ) : (
                  <button
                    type="button"
                    className="ap-panel__btn ap-panel__btn--danger"
                    disabled={busy}
                    onClick={async () => {
                      if (!confirm("Soft-delete this user?")) return;
                      setBusy(true);
                      try {
                        await usersApi.softDelete(selected.id);
                        await reload();
                      } catch (err) {
                        setError(err instanceof Error ? err.message : "Delete failed");
                      } finally {
                        setBusy(false);
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
