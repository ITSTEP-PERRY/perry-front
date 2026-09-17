import { type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { categoriesApi, productsApi } from "../../api";
import type { CategoryDto, ProductDetail } from "../../api/types";

type AboutRow = { title: string; description: string };
type AttrRow = { name: string; value: string };

export function AdminProductEditPage() {
  const { id } = useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [cats, setCats] = useState<CategoryDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    brand: "Perry",
    sku: "",
    categoryId: "",
    price: 0,
    oldPrice: "" as string | number,
    stockQuantity: 1,
    imageUrls: "" as string,
  });
  const [about, setAbout] = useState<AboutRow[]>([{ title: "", description: "" }]);
  const [attrs, setAttrs] = useState<AttrRow[]>([{ name: "", value: "" }]);

  useEffect(() => {
    categoriesApi.tree().then((tree) => {
      const flat: CategoryDto[] = [];
      const walk = (nodes: CategoryDto[]) => {
        nodes.forEach((n) => {
          flat.push(n);
          if (n.subCategories) walk(n.subCategories);
        });
      };
      walk(tree);
      setCats(flat);
    });
  }, []);

  useEffect(() => {
    if (isNew || !id) return;
    productsApi.byId(id).then((p: ProductDetail) => {
      setForm({
        name: p.name,
        description: p.description,
        brand: p.brand,
        sku: p.sku,
        categoryId: p.category.id,
        price: p.price,
        oldPrice: p.oldPrice ?? "",
        stockQuantity: p.stockQuantity,
        imageUrls: p.images.map((i) => i.url).join("\n"),
      });
      setAbout(p.aboutItems.length ? p.aboutItems : [{ title: "", description: "" }]);
      setAttrs(p.attributes.length ? p.attributes : [{ name: "", value: "" }]);
    });
  }, [id, isNew]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const urls = form.imageUrls
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
    const body = {
      name: form.name,
      description: form.description,
      brand: form.brand,
      sku: form.sku || null,
      categoryId: form.categoryId,
      price: Number(form.price),
      oldPrice: form.oldPrice === "" ? null : Number(form.oldPrice),
      stockQuantity: Number(form.stockQuantity),
      imageUrls: urls,
      aboutItems: about.filter((a) => a.title || a.description),
      attributes: attrs.filter((a) => a.name || a.value),
    };
    try {
      if (isNew) {
        const created = await productsApi.create(body);
        navigate(`/admin/products/${created.id}`);
      } else if (id) {
        await productsApi.update(id, body);
        navigate(`/admin/products?selectedId=${id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <div>
      <p>
        <Link to="/admin/products">← Products</Link>
      </p>
      <h1 className="page-title">{isNew ? "Create product" : "Edit product"}</h1>
      {error && <p className="error-banner">{error}</p>}
      <form className="auth-page" style={{ maxWidth: 720 }} onSubmit={(e) => void onSubmit(e)}>
        <label>
          Name *
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </label>
        <label>
          Description
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </label>
        <label>
          Category *
          <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} required>
            <option value="">—</option>
            {cats.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Brand
          <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        </label>
        <label>
          Price
          <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
        </label>
        <label>
          Old price
          <input value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} />
        </label>
        <label>
          Stock
          <input type="number" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: Number(e.target.value) })} />
        </label>
        <label>
          Image URLs (one per line, JSON-style for front)
          <textarea rows={3} value={form.imageUrls} onChange={(e) => setForm({ ...form, imageUrls: e.target.value })} />
        </label>

        <h3>About product</h3>
        {about.map((row, i) => (
          <div key={i} style={{ display: "grid", gap: 8, marginBottom: 8 }}>
            <input
              placeholder="Title"
              value={row.title}
              onChange={(e) => {
                const next = [...about];
                next[i] = { ...row, title: e.target.value };
                setAbout(next);
              }}
            />
            <textarea
              placeholder="Description"
              rows={2}
              value={row.description}
              onChange={(e) => {
                const next = [...about];
                next[i] = { ...row, description: e.target.value };
                setAbout(next);
              }}
            />
          </div>
        ))}
        <button type="button" className="btn-ghost" onClick={() => setAbout([...about, { title: "", description: "" }])}>
          + About
        </button>

        <h3>Specs</h3>
        {attrs.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
            <input
              placeholder="Name"
              value={row.name}
              onChange={(e) => {
                const next = [...attrs];
                next[i] = { ...row, name: e.target.value };
                setAttrs(next);
              }}
            />
            <input
              placeholder="Value"
              value={row.value}
              onChange={(e) => {
                const next = [...attrs];
                next[i] = { ...row, value: e.target.value };
                setAttrs(next);
              }}
            />
          </div>
        ))}
        <button type="button" className="btn-ghost" onClick={() => setAttrs([...attrs, { name: "", value: "" }])}>
          + Spec
        </button>

        <button className="btn-perry" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
