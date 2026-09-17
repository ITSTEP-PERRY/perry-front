import { type FormEvent, useEffect, useMemo, useState } from "react";
import { categoriesApi } from "../../api";
import type { CategoryDto } from "../../api/types";

export function AdminCategoriesPage() {
  const [tree, setTree] = useState<CategoryDto[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    iconUrl: "",
    parentCategoryId: "",
    sortOrder: 0,
    isActive: true,
  });

  const reload = () =>
    categoriesApi
      .tree()
      .then(setTree)
      .catch((e: Error) => setError(e.message));

  useEffect(() => {
    void reload();
  }, []);

  const flat = useMemo(() => {
    const out: CategoryDto[] = [];
    const walk = (nodes: CategoryDto[]) => {
      nodes.forEach((n) => {
        out.push(n);
        if (n.subCategories) walk(n.subCategories);
      });
    };
    walk(tree);
    return out;
  }, [tree]);

  const selected = flat.find((c) => c.id === selectedId) ?? null;

  useEffect(() => {
    if (!selected) {
      setForm({
        name: "",
        slug: "",
        description: "",
        imageUrl: "",
        iconUrl: "",
        parentCategoryId: "",
        sortOrder: 0,
        isActive: true,
      });
      return;
    }
    setForm({
      name: selected.name,
      slug: selected.slug,
      description: selected.description || "",
      imageUrl: selected.imageUrl || "",
      iconUrl: selected.iconUrl || "",
      parentCategoryId: selected.parentCategoryId || "",
      sortOrder: selected.sortOrder || 0,
      isActive: selected.isActive !== false,
    });
  }, [selected]);

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const body = {
      name: form.name,
      slug: form.slug || null,
      description: form.description || null,
      imageUrl: form.imageUrl || null,
      iconUrl: form.iconUrl || null,
      parentCategoryId: form.parentCategoryId || null,
      sortOrder: Number(form.sortOrder),
      isActive: form.isActive,
    };
    try {
      if (selectedId) await categoriesApi.update(selectedId, body);
      else {
        const created = await categoriesApi.create(body);
        setSelectedId(created.id);
      }
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <div>
      <h1 className="page-title">Categories</h1>
      {error && <p className="error-banner">{error}</p>}
      <div className="admin-split">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Slug</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>
              {flat.map((c) => (
                <tr
                  key={c.id}
                  className={selectedId === c.id ? "is-selected" : undefined}
                  onClick={() => setSelectedId(c.id)}
                >
                  <td>{c.name}</td>
                  <td>
                    <code>{c.slug}</code>
                  </td>
                  <td>{c.isActive === false ? "no" : "yes"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="btn-ghost" style={{ margin: 12 }} onClick={() => setSelectedId(null)}>
            + New category
          </button>
        </div>
        <aside>
          {!selectedId && !form.name ? (
            <div className="admin-panel-empty">Select a category to see its information</div>
          ) : null}
          <form className="auth-page" style={{ maxWidth: "100%" }} onSubmit={(e) => void onSave(e)}>
            <h2>{selectedId ? "Category information" : "New category"}</h2>
            <label>
              Name *
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </label>
            <label>
              Slug
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </label>
            <label>
              Description
              <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </label>
            <label>
              ImageUrl
              <input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
            </label>
            <label>
              IconUrl
              <input value={form.iconUrl} onChange={(e) => setForm({ ...form, iconUrl: e.target.value })} />
            </label>
            <label>
              Parent
              <select
                value={form.parentCategoryId}
                onChange={(e) => setForm({ ...form, parentCategoryId: e.target.value })}
              >
                <option value="">— root —</option>
                {flat
                  .filter((c) => c.id !== selectedId)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </label>
            <label>
              Sort order
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
              />
            </label>
            <label className="checkbox-row" style={{ flexDirection: "row", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              />{" "}
              IsActive
            </label>
            <button className="btn-perry" type="submit">
              Save
            </button>
            {selectedId && (
              <button
                type="button"
                className="btn-ghost"
                onClick={async () => {
                  await categoriesApi.remove(selectedId);
                  setSelectedId(null);
                  await reload();
                }}
              >
                Deactivate
              </button>
            )}
          </form>
        </aside>
      </div>
    </div>
  );
}
