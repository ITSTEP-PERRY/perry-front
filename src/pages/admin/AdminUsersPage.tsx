import { useEffect, useState } from "react";
import { usersApi } from "../../api";

type UserRow = {
  id: string;
  name: string;
  email: string;
  roleId: string;
  login: string;
  registeredAtUtc: string;
};

export function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const reload = () =>
    usersApi
      .list()
      .then(setUsers)
      .catch((e: Error) => setError(e.message));

  useEffect(() => {
    void reload();
  }, []);

  return (
    <div>
      <h1 className="page-title">Users</h1>
      {error && <p className="error-banner">{error}</p>}
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Login</th>
              <th>Role</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.login}</td>
                <td>
                  <select
                    value={u.roleId}
                    onChange={async (e) => {
                      await usersApi.setRole(u.id, e.target.value);
                      await reload();
                    }}
                  >
                    {["Admin", "Editor", "Guest"].map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={async () => {
                      if (!confirm("Soft-delete user?")) return;
                      await usersApi.softDelete(u.id);
                      await reload();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
