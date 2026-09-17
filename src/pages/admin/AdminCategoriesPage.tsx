import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { categoriesApi } from "../../api";
import type { CategoryDto } from "../../api/types";
import { AdminCategoryDropdown } from "../../widgets/admin/AdminCategoryDropdown";

export function AdminCategoriesPage() {
  const [params, setParams] = useSearchParams();
  const categoryId = params.get("categoryId") || undefined;
  const selectedId = params.get("selectedId") || undefined;
  const q = params.get("q") || "";
  const [tree, setTree] = useState<CategoryDto[]>([]);
  const [search, setSearch] = useState(q);
  const [creating, setCreating] = useState(false);
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

  useEffect(() => setSearch(q), [q]);

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

  const parent = flat.find((c) => c.id === categoryId) ?? null;
  const subcategories = useMemo(() => {
    const kids = parent?.subCategories ?? (!categoryId ? tree : []);
    const qq = q.trim().toLowerCase();
    if (!qq) return kids;
    return kids.filter(
      (c) => c.name.toLowerCase().includes(qq) || c.slug.toLowerCase().includes(qq),
    );
  }, [parent, tree, categoryId, q]);

  const selected =
    flat.find((c) => c.id === selectedId) ??
    (creating ? null : parent && !selectedId ? parent : null);

  useEffect(() => {
    if (creating) {
      setForm({
        name: "",
        slug: "",
        description: "",
        imageUrl: "",
        iconUrl: "",
        parentCategoryId: categoryId || "",
        sortOrder: 0,
        isActive: true,
      });
      return;
    }
    if (!selected) return;
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
  }, [selected, creating, categoryId]);

  const setFilter = (id?: string) => {
    const next = new URLSearchParams(params);
    if (id) next.set("categoryId", id);
    else next.delete("categoryId");
    next.delete("selectedId");
    setCreating(false);
    setParams(next);
  };

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params);
    if (search.trim()) next.set("q", search.trim());
    else next.delete("q");
    setParams(next);
  };

  const startCreate = () => {
    setCreating(true);
    const next = new URLSearchParams(params);
    next.delete("selectedId");
    setParams(next);
  };

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
      if (!creating && selectedId) {
        await categoriesApi.update(selectedId, body);
      } else if (!creating && selected && !selectedId) {
        await categoriesApi.update(selected.id, body);
      } else {
        const created = await categoriesApi.create(body);
        setCreating(false);
        const next = new URLSearchParams(params);
        next.set("selectedId", created.id);
        if (created.parentCategoryId) next.set("categoryId", created.parentCategoryId);
        setParams(next);
      }
      await reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  const showPanel = creating || !!selected;
  const hasFilter = !!categoryId;

  return (
    <div>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="ap-toolbar">
        <span className="ap-toolbar__label">Category</span>
        <AdminCategoryDropdown
          tree={tree}
          value={categoryId}
          placeholder="Choose category..."
          allLabel="All roots"
          onChange={setFilter}
        />
        <form className="ap-search" onSubmit={onSearch} role="search">
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
          {!hasFilter ? (
            <div className="ap-empty">
              <div className="ap-empty__ph" aria-hidden="true" />
              <p className="ap-empty__text">Choose a category to see its subcategories</p>
              <button type="button" className="ap-create-card" onClick={startCreate}>
                <span className="ap-create-card__plus">+</span>
                <span>Create category</span>
              </button>
            </div>
          ) : subcategories.length === 0 ? (
            <div className="ap-empty">
              <div className="ap-empty__ph" aria-hidden="true" />
              <p className="ap-empty__text">No subcategories in the selected category</p>
              <button type="button" className="ap-create-card" onClick={startCreate}>
                <span className="ap-create-card__plus">+</span>
                <span>Create subcategory</span>
              </button>
            </div>
          ) : (
            <div className="ap-table ap-table--cats">
              <div className="ap-table__head">
                <span />
                <span className="ap-table__name">Subcategory</span>
                <span className="ap-table__price">Active</span>
                <button type="button" className="ap-table__add" title="Create subcategory" onClick={startCreate}>
                  +
                </button>
              </div>
              {subcategories.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`ap-table__row ${selectedId === s.id ? "is-selected" : ""}`}
                  onClick={() => {
                    setCreating(false);
                    const next = new URLSearchParams(params);
                    next.set("selectedId", s.id);
                    setParams(next);
                  }}
                >
                  <span className="ap-table__thumb">
                    {(s.imageUrl || s.iconUrl) && <img src={s.imageUrl || s.iconUrl || ""} alt="" />}
                  </span>
                  <span className="ap-table__name">
                    <strong>{s.name}</strong>
                    <code className="ap-slug">{s.slug}</code>
                  </span>
                  <span className="ap-table__price">{s.isActive === false ? "no" : "yes"}</span>
                  <span />
                </button>
              ))}
            </div>
          )}
        </section>

        <aside className="ap-panel">
          {!showPanel ? (
            <div className="ap-panel__empty">
              <p>Select a category to see its information</p>
            </div>
          ) : (
            <form className="ap-panel__form" onSubmit={(e) => void onSave(e)}>
              <h2 className="ap-panel__form-title">
                {creating ? "New category" : "Category information"}
              </h2>
              {!creating && selected && (
                <>
                  <div className={`ap-panel__hero ap-panel__hero--sm ${selected.imageUrl ? "" : "is-ph"}`}>
                    {selected.imageUrl && <img src={selected.imageUrl} alt="" />}
                  </div>
                  <p className="ap-panel__meta">
                    Subcategories: {selected.subCategories?.length ?? 0}
                    {selected.parentCategoryId
                      ? ` · Parent: ${flat.find((c) => c.id === selected.parentCategoryId)?.name || "—"}`
                      : " · Root"}
                  </p>
                </>
              )}
              <label>
                Name *
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Slug
                <input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="auto from name"
                />
              </label>
              <label>
                Description
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </label>
              <label>
                Image URL
                <input
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                />
              </label>
              <label>
                Icon URL
                <input
                  value={form.iconUrl}
                  onChange={(e) => setForm({ ...form, iconUrl: e.target.value })}
                />
              </label>
              <label>
                Parent category
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
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                IsActive
              </label>
              <div className="ap-panel__actions">
                <button className="ap-panel__btn" type="submit">
                  Save
                </button>
                {!creating && (selectedId || selected) && (
                  <button
                    type="button"
                    className="ap-panel__btn ap-panel__btn--danger"
                    onClick={async () => {
                      const id = selectedId || selected?.id;
                      if (!id || !confirm("Deactivate category?")) return;
                      await categoriesApi.remove(id);
                      setCreating(false);
                      const next = new URLSearchParams(params);
                      next.delete("selectedId");
                      setParams(next);
                      await reload();
                    }}
                  >
                    Deactivate
                  </button>
                )}
              </div>
            </form>
          )}
        </aside>
      </div>
    </div>
  );
}
