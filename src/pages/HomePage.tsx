import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { categoriesApi, productsApi } from "../api";
import type { CategoryDto, ProductListItem } from "../api/types";
import { ProductCard } from "../widgets/ProductCard";

function scrollTrack(el: HTMLElement | null, dir: 1 | -1) {
  if (!el) return;
  el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 480), behavior: "smooth" });
}

function CategoryCarousel({ items }: { items: CategoryDto[] }) {
  const track = useRef<HTMLDivElement>(null);
  if (items.length === 0) return null;
  return (
    <div className="carousel">
      <button type="button" className="carousel-btn" aria-label="Previous" onClick={() => scrollTrack(track.current, -1)}>
        <img src="/icons/carousel-prev.svg" alt="" width={24} height={24} />
      </button>
      <div className="carousel__viewport">
        <div className="carousel__track category-track" ref={track}>
          {items.map((cat) => (
            <Link key={cat.id} className="category-card" to={`/products?categoryId=${cat.id}`}>
              <div className="category-card__img">
                {(cat.imageUrl || cat.iconUrl) && (
                  <img src={cat.imageUrl || cat.iconUrl || ""} alt={cat.name} loading="lazy" />
                )}
              </div>
              <div className="category-card__title">{cat.name}</div>
              <span className="category-card__link">See all &gt;</span>
            </Link>
          ))}
        </div>
      </div>
      <button type="button" className="carousel-btn" aria-label="Next" onClick={() => scrollTrack(track.current, 1)}>
        <img src="/icons/carousel-next.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
}

function ProductCarousel({ items }: { items: ProductListItem[] }) {
  const track = useRef<HTMLDivElement>(null);
  if (items.length === 0) return null;
  return (
    <div className="carousel">
      <button type="button" className="carousel-btn" aria-label="Previous" onClick={() => scrollTrack(track.current, -1)}>
        <img src="/icons/carousel-prev.svg" alt="" width={24} height={24} />
      </button>
      <div className="carousel__viewport">
        <div className="carousel__track product-track" ref={track}>
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
      <button type="button" className="carousel-btn" aria-label="Next" onClick={() => scrollTrack(track.current, 1)}>
        <img src="/icons/carousel-next.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
}

export function HomePage() {
  const [cats, setCats] = useState<CategoryDto[]>([]);
  const [trending, setTrending] = useState<ProductListItem[]>([]);
  const [sale, setSale] = useState<ProductListItem[]>([]);
  const [hero, setHero] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      categoriesApi.tree(),
      productsApi.list({ pageSize: 12, sort: "newest" }),
      productsApi.list({ pageSize: 12, sort: "price_asc" }),
    ])
      .then(([c, t, s]) => {
        setCats(c);
        setTrending(t.items);
        setSale(s.items.filter((p) => p.oldPrice && p.oldPrice > p.price).concat(s.items).slice(0, 12));
      })
      .catch((e: Error) => setError(e.message));
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setHero((h) => (h + 1) % 2), 6000);
    return () => window.clearInterval(id);
  }, []);

  const row1 = cats.slice(0, Math.ceil(cats.length / 2) || cats.length);
  const row2 = cats.slice(Math.ceil(cats.length / 2));

  return (
    <div className="home">
      {error && <p className="error-banner">{error} — start Perry.Api on :5272</p>}

      <section className="home-hero" aria-label="Promotions">
        <button
          type="button"
          className="carousel-btn carousel-btn--prev"
          aria-label="Previous slide"
          onClick={() => setHero((h) => (h + 1) % 2)}
        >
          <img src="/icons/carousel-prev.svg" alt="" width={24} height={24} />
        </button>
        <div className="home-hero__track">
          <article className={`home-hero__slide ${hero === 0 ? "is-active" : ""}`}>
            <img src="/images/home/hero-slide-1.png" alt="Upgrade kitchenware today. Sale -50%" />
          </article>
          <article className={`home-hero__slide ${hero === 1 ? "is-active" : ""}`}>
            <img src="/images/home/hero-slide-2.png" alt="Beach ready. Sale on swimsuits" />
          </article>
        </div>
        <button
          type="button"
          className="carousel-btn carousel-btn--next"
          aria-label="Next slide"
          onClick={() => setHero((h) => (h + 1) % 2)}
        >
          <img src="/icons/carousel-next.svg" alt="" width={24} height={24} />
        </button>
      </section>

      <section className="home-section">
        <CategoryCarousel items={row1.length ? row1 : cats} />
      </section>

      <hr className="home-divider" />

      <section className="home-section">
        <div className="section-head">
          <h2>Trending deals</h2>
          <Link to="/products">See all &gt;</Link>
        </div>
        <ProductCarousel items={trending} />
      </section>

      <hr className="home-divider" />

      {row2.length > 0 && (
        <>
          <section className="home-section">
            <CategoryCarousel items={row2} />
          </section>
          <hr className="home-divider" />
        </>
      )}

      <section className="home-section">
        <div className="section-head">
          <h2>Sale</h2>
          <Link to="/products?sort=price_asc">See all &gt;</Link>
        </div>
        <ProductCarousel items={sale} />
      </section>

      <section className="home-cta">
        <div className="home-cta__inner">
          <img className="home-cta__bg" src="/images/home/cta-banner.png" alt="" />
          <div className="home-cta__copy">
            <h2>Abundance of goods</h2>
            <p>Join, choose and buy with confidence!</p>
            <div className="home-cta__actions">
              <Link className="btn btn-primary" to="/register">
                Sign up
              </Link>
              <Link className="btn btn-cta-ghost" to="/login">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
