import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { productsApi } from "../api";
import type { ProductDetail, ProductListItem, ProductReview } from "../api/types";
import { useAuth } from "../app/AuthContext";
import { useCart } from "../app/CartContext";
import { useWishlist } from "../app/WishlistContext";
import { ProductCard } from "../widgets/ProductCard";

function scrollTrack(el: HTMLElement | null, dir: 1 | -1) {
  if (!el) return;
  el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 480), behavior: "smooth" });
}

function ProductCarousel({ items, title, seeAllTo }: { items: ProductListItem[]; title: string; seeAllTo: string }) {
  const track = useRef<HTMLDivElement>(null);
  if (!items.length) return null;
  return (
    <section className="pdp-section">
      <div className="section-head">
        <h2>{title}</h2>
        <Link to={seeAllTo}>See all ›</Link>
      </div>
      <div className="carousel">
        <button type="button" className="carousel-btn carousel-btn--prev" aria-label="Previous" onClick={() => scrollTrack(track.current, -1)}>
          <img src="/icons/carousel-prev.svg" alt="" width={24} height={24} />
        </button>
        <div className="carousel__viewport">
          <div className="carousel__track product-track" ref={track}>
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
        <button type="button" className="carousel-btn carousel-btn--next" aria-label="Next" onClick={() => scrollTrack(track.current, 1)}>
          <img src="/icons/carousel-next.svg" alt="" width={24} height={24} />
        </button>
      </div>
    </section>
  );
}

export function ProductPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const ratingFilter = searchParams.get("rating");
  const { add } = useCart();
  const { user } = useAuth();
  const { has, toggle } = useWishlist();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    if (!id) return;
    productsApi
      .byId(id)
      .then((p) => {
        setProduct(p);
        setActive(0);
        setQty(1);
      })
      .catch((e: Error) => setError(e.message));
  }, [id]);

  if (error) return <div className="empty-state">{error}</div>;
  if (!product) return <div className="empty-state">Loading…</div>;

  const images = product.images?.length ? product.images : [];
  const main = images[active]?.url;
  const discount =
    product.discountPercent ??
    (product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null);
  const ratingRounded = Math.round(product.averageRating);
  const priceWhole = Math.floor(product.price);
  const priceCents = Math.round((product.price - priceWhole) * 100)
    .toString()
    .padStart(2, "0");
  const oos = product.status === "OutOfStock";

  const reviews: ProductReview[] = product.reviews ?? [];
  const filtered = ratingFilter
    ? reviews.filter((r) => r.rating === Number(ratingFilter))
    : reviews;
  const totalReviews = Math.max(1, reviews.length);
  const distribution: Record<number, number> =
    reviews.length === 0 && product.reviewCount > 0
      ? { 5: 65, 4: 16, 3: 10, 2: 4, 1: 5 }
      : Object.fromEntries(
          [5, 4, 3, 2, 1].map((star) => [
            star,
            Math.round((100 * reviews.filter((r) => r.rating === star).length) / totalReviews),
          ]),
        );
  const frequentTags = Object.entries(
    reviews.flatMap((r) => r.tags).reduce<Record<string, number>>((acc, t) => {
      acc[t] = (acc[t] ?? 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([t]) => t);

  const shift = (dir: -1 | 1) => {
    if (!images.length) return;
    setActive((i) => (i + dir + images.length) % images.length);
  };

  const addToCart = async (buyNow?: boolean) => {
    await add(product.id, qty);
    setMsg("Added to cart");
    if (buyNow) window.location.href = "/cart";
  };

  const setRating = (star?: number) => {
    const next = new URLSearchParams(searchParams);
    if (!star) next.delete("rating");
    else next.set("rating", String(star));
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="page-wrap pdp-page">
      <nav className="breadcrumbs breadcrumbs--pdp" aria-label="Breadcrumb">
        <Link to="/" className="breadcrumbs__home" aria-label="Home">
          <img src="/icons/home.svg" alt="" width={16} height={16} />
        </Link>
        <span className="breadcrumbs__sep">/</span>
        <Link to={`/products?categoryId=${product.category.id}`}>{product.category.name}</Link>
        <span className="breadcrumbs__sep">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="pdp">
        <div className="pdp-gallery">
          <div className="pdp-gallery__main">
            {discount != null && discount > 0 && (
              <span className="badge badge-discount pdp-gallery__badge">-{discount}%</span>
            )}
            <button type="button" className="pdp-gallery__nav pdp-gallery__nav--prev" aria-label="Previous image" onClick={() => shift(-1)}>
              <img src="/icons/carousel-prev.svg" alt="" width={24} height={24} />
            </button>
            {main ? <img src={main} alt={product.name} /> : <div className="img-placeholder large" />}
            <button type="button" className="pdp-gallery__nav pdp-gallery__nav--next" aria-label="Next image" onClick={() => shift(1)}>
              <img src="/icons/carousel-next.svg" alt="" width={24} height={24} />
            </button>
          </div>
          <div className="pdp-gallery__thumbs">
            {images.map((img, i) => (
              <button
                key={img.id}
                type="button"
                className={`thumb ${i === active ? "active" : ""}`}
                onClick={() => setActive(i)}
              >
                <img src={img.url} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="pdp-info">
          <h1>{product.name}</h1>
          <div className="pdp-meta">
            <div className="pdp-meta__rating">
              <span className="stars-row">
                {Array.from({ length: 5 }, (_, s) => (
                  <span key={s} className={s < ratingRounded ? "on" : "off"}>
                    ★
                  </span>
                ))}
              </span>
              <strong>{ratingRounded}</strong>
              <span>{product.reviewCount.toLocaleString()} reviews</span>
            </div>
            <span className="pdp-meta__code">Code: {product.sku}</span>
          </div>

          <div className="about-list">
            <h2 className="about-list__title">About product</h2>
            {product.aboutItems.length === 0 ? (
              <details className="about-item" open>
                <summary>Description</summary>
                <p>{product.description}</p>
              </details>
            ) : (
              product.aboutItems.map((a, i) => (
                <details key={i} className="about-item" open={i < 2}>
                  <summary>{a.title}</summary>
                  <p>{a.description}</p>
                </details>
              ))
            )}
          </div>
        </div>

        <aside className="pdp-buy">
          {msg && <div className="alert alert-ok">{msg}</div>}
          <div className="pdp-buy__price">
            <span className="pdp-price">
              $ {priceWhole}
              <sup>{priceCents}</sup>
            </span>
            {product.oldPrice != null && product.oldPrice > product.price && (
              <s>${product.oldPrice.toFixed(2)}</s>
            )}
          </div>
          <div className="buy-row">
            <span>Status</span>
            <span className={oos ? "status-oos" : "status-ok"}>{oos ? "Out of stock" : "In stock"}</span>
          </div>
          <a className="buy-link" href="#delivery">
            Delivery <span aria-hidden="true">›</span>
          </a>
          <a className="buy-link" href="#payment">
            Payment methods <span aria-hidden="true">›</span>
          </a>
          <a className="buy-link" href="#security">
            Security <span aria-hidden="true">›</span>
          </a>
          <a className="buy-link" href="#returns">
            Returns <span aria-hidden="true">›</span>
          </a>
          {oos ? (
            <button className="btn btn-primary pdp-buy__btn" type="button" disabled>
              Notify when available
            </button>
          ) : (
            <div className="pdp-buy__form">
              <div className="qty-row">
                <span>Quantity</span>
                <div className="qty-control">
                  <button type="button" aria-label="Decrease" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={Math.max(1, product.stockQuantity)}
                    value={qty}
                    onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  />
                  <button
                    type="button"
                    aria-label="Increase"
                    onClick={() => setQty((q) => Math.min(Math.max(1, product.stockQuantity), q + 1))}
                  >
                    +
                  </button>
                </div>
              </div>
              <button className="btn btn-buy-now pdp-buy__btn" type="button" onClick={() => void addToCart(true)}>
                Buy now
              </button>
              <button className="btn btn-add-cart pdp-buy__btn" type="button" onClick={() => void addToCart(false)}>
                Add to cart
              </button>
              <button
                className="pdp-wishlist"
                type="button"
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                    return;
                  }
                  const wasIn = has(product.id);
                  void toggle(product.id).then(() =>
                    setMsg(wasIn ? "Removed from wishlist" : "Added to wishlist"),
                  );
                }}
              >
                {user && has(product.id) ? "Remove from wish list" : "Add to wish list"}
              </button>
            </div>
          )}
        </aside>
      </div>

      {product.attributes.length > 0 && (
        <section className="pdp-section pdp-details">
          <h2>Product details</h2>
          <div className="pdp-details__grid">
            {product.attributes.map((a, i) => (
              <div key={i} className="pdp-details__item">
                <strong>{a.name}</strong>
                <span>{a.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="pdp-section pdp-reviews" id="reviews">
        <h2>Customer reviews</h2>
        <div className="pdp-reviews__layout">
          <aside className="pdp-reviews__aside">
            <div className="reviews-score-card">
              <div className="reviews-score-card__top">
                <strong>{ratingRounded}/5</strong>
                <span className="stars-row">
                  {Array.from({ length: 5 }, (_, s) => (
                    <span key={s} className={s < ratingRounded ? "on" : "off"}>
                      ★
                    </span>
                  ))}
                </span>
                <span className="reviews-score-card__count">
                  {product.reviewCount.toLocaleString()} reviews
                </span>
              </div>
              <ul className="rating-bars" aria-label="Rating distribution">
                {[5, 4, 3, 2, 1].map((star) => (
                  <li key={star}>
                    <span>{star}</span>
                    <span className="rating-bars__track">
                      <span className="rating-bars__fill" style={{ width: `${distribution[star] ?? 0}%` }} />
                    </span>
                    <span>{distribution[star] ?? 0}%</span>
                  </li>
                ))}
              </ul>
              <p className="reviews-confirmed">
                <span aria-hidden="true">✓</span> All opinions confirmed by purchase{" "}
                <a href="#">Learn more ›</a>
              </p>
            </div>
            {frequentTags.length > 0 && (
              <div className="frequent-tags">
                <h3>Frequent tags</h3>
                <div className="frequent-tags__list">
                  {frequentTags.map((t) => (
                    <span key={t} className="tag tag--soft">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <div className="pdp-reviews__main">
            <div className="reviews-toolbar">
              <div className="reviews-filters">
                <button type="button" className={`chip ${!ratingFilter ? "is-active" : ""}`} onClick={() => setRating()}>
                  All
                </button>
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`chip ${ratingFilter === String(star) ? "is-active" : ""}`}
                    onClick={() => setRating(star)}
                  >
                    {star} ★
                  </button>
                ))}
              </div>
              <label className="reviews-sort">
                <select disabled aria-label="Sort reviews">
                  <option>Most recent</option>
                </select>
              </label>
            </div>

            <button type="button" className="btn btn-create-review" onClick={() => setShowReviewForm((v) => !v)}>
              + Create review
            </button>

            {showReviewForm && (
              <div className="review-form">
                <h3>Create review</h3>
                <p className="muted">Review submission will be wired to the API next.</p>
              </div>
            )}

            {filtered.length === 0 ? (
              <p className="empty-state">No reviews yet.</p>
            ) : (
              <>
                <div className="review-list">
                  {filtered.map((r, i) => (
                    <article key={i} className="review-card">
                      <div className="review-card__head">
                        <div className="review-card__author">
                          <span className="review-avatar" aria-hidden="true">
                            {r.authorName.charAt(0)}
                          </span>
                          <strong>{r.authorName}</strong>
                        </div>
                        <time>{new Date(r.createdAtUtc).toLocaleDateString()}</time>
                      </div>
                      <div className="stars-row">
                        {Array.from({ length: 5 }, (_, s) => (
                          <span key={s} className={s < r.rating ? "on" : "off"}>
                            ★
                          </span>
                        ))}
                      </div>
                      <h3>{r.title}</h3>
                      <p>{r.body}</p>
                      {r.tags.length > 0 && (
                        <div className="review-card__tags">
                          {r.tags.map((t) => (
                            <span key={t} className="tag tag--soft">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="review-card__actions">
                        <div className="review-card__btns">
                          <button type="button" className="btn btn-helpful">
                            Helpful
                          </button>
                          <button type="button" className="btn btn-translate">
                            Translate
                          </button>
                        </div>
                        {i === 1 && (
                          <span className="review-card__helpful-note">25 people found this helpful</span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
                <div className="reviews-more">
                  <button type="button" className="btn btn-see-more">
                    See more
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <ProductCarousel
        items={product.related ?? []}
        title="You may also like"
        seeAllTo={`/products?categoryId=${product.category.id}`}
      />
      <ProductCarousel
        items={product.saleRelated ?? []}
        title={`Best sellers in ${product.category.name.toLowerCase()}`}
        seeAllTo={`/products?categoryId=${product.category.id}&sort=rating_desc`}
      />
    </div>
  );
}
