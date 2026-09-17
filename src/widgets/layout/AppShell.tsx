import { useEffect, useState, type FormEvent } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/AuthContext";
import { useCart } from "../../app/CartContext";
import { useIsMobile } from "../../hooks/useMediaQuery";

const LEGAL_PATHS = new Set(["/privacy", "/terms", "/license"]);

export function AppShell() {
  const { user, logout, isAdmin } = useAuth();
  const { count } = useCart();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showTop, setShowTop] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLegal = LEGAL_PATHS.has(location.pathname);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = search.trim();
    navigate(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
    setMenuOpen(false);
  };

  return (
    <div className={`shell${isLegal ? " legal-shell" : ""}`}>
      <header className="site-header">
        <div className="header-inner">
          <div className="header-brand">
            {isMobile ? (
              <button
                type="button"
                className="header-menu"
                aria-label="Menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <img src="/icons/menu.svg" alt="" width={24} height={24} />
              </button>
            ) : (
              <Link className="header-menu" to="/products" aria-label="Catalog">
                <img src="/icons/menu.svg" alt="" width={24} height={24} />
              </Link>
            )}
            <Link className="logo" to="/">
              PERRY
            </Link>
          </div>

          <form className="search-form" onSubmit={onSearch}>
            <input
              type="search"
              name="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" aria-label="Search">
              <img src="/icons/search.svg" alt="" width={18} height={18} />
            </button>
          </form>

          <nav className="header-actions">
            {user ? (
              <Link to="/profile" className="header-icon" aria-label={user.name}>
                <img src="/icons/account.svg" alt="" width={24} height={24} />
              </Link>
            ) : (
              <Link to="/login" className="header-icon" aria-label="Sign in">
                <img src="/icons/account.svg" alt="" width={24} height={24} />
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin/products" className="header-link">
                Admin
              </Link>
            )}
            <Link to="/cart" className="header-icon" aria-label="Cart">
              <img src="/icons/cart.svg" alt="" width={24} height={24} />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </Link>
          </nav>
        </div>

        <nav className={`mobile-nav ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(false)}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Catalog</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          {user && <NavLink to="/orders">Orders</NavLink>}
          {user ? <NavLink to="/profile">Profile</NavLink> : <NavLink to="/login">Login</NavLink>}
          {isAdmin && <NavLink to="/admin/products">Admin</NavLink>}
          {user && (
            <button
              type="button"
              className="header-link"
              style={{ background: "transparent", border: 0, textAlign: "left", padding: 0, cursor: "pointer" }}
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </header>

      <main className="site-main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#">Contact us</a>
            <a href="#">FAQ</a>
          </div>
          <div className="footer-col">
            <h4>Legal notice</h4>
            <Link to="/terms">Terms and conditions</Link>
            <Link to="/license">License agreement</Link>
            <Link to="/privacy">Privacy policy</Link>
          </div>
          <div className="footer-col">
            <h4>Social media</h4>
            <div className="social-row" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="logo logo-sm">PERRY</span>
          <span>© 2024 Perry. All rights reserved.</span>
        </div>
      </footer>

      {!isLegal && showTop && (
        <button type="button" className="to-top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src="/icons/to-top.svg" alt="" width={24} height={24} />
        </button>
      )}
    </div>
  );
}

export function AdminShell() {
  const { logout, isAdmin, loading, user } = useAuth();
  const navigate = useNavigate();
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    if (!loading && !isAdmin) navigate("/admin/login", { replace: true });
  }, [loading, isAdmin, navigate]);

  if (loading || !isAdmin) return <div className="shell-loading">Loading…</div>;

  const close = () => setDrawer(false);

  return (
    <div className="admin-shell admin-body">
      <header className="admin-header">
        <div className="admin-header__inner">
          <button
            type="button"
            className="admin-header__icon-btn"
            aria-label="Menu"
            aria-expanded={drawer}
            onClick={() => setDrawer(true)}
          >
            <img src="/icons/menu.svg" alt="" width={24} height={24} />
          </button>
          <Link className="admin-header__logo" to="/admin">
            PERRY
          </Link>
          <nav className="admin-header__nav">
            <NavLink to="/admin/products" className="admin-header__link">
              Products
            </NavLink>
            <NavLink to="/admin/categories" className="admin-header__link">
              Categories
            </NavLink>
            <NavLink to="/admin/orders" className="admin-header__link">
              Orders
            </NavLink>
            <NavLink to="/admin/users" className="admin-header__link">
              Users
            </NavLink>
          </nav>
          <div className="admin-header__right">
            <Link className="admin-header__icon-btn" to="/" title="Store">
              <img src="/icons/home.svg" alt="" width={22} height={22} />
            </Link>
            <button
              type="button"
              className="admin-header__icon-btn"
              title="Logout"
              onClick={() => {
                logout();
                navigate("/admin/login");
              }}
            >
              <img src="/icons/account.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </div>
      </header>

      {drawer && (
        <>
          <div className="admin-drawer-backdrop" onClick={close} />
          <aside className="admin-drawer" role="dialog" aria-label="Admin menu">
            <div className="admin-drawer__user">
              <strong>{user?.name || "Administrator"}</strong>
              <span>Administrator</span>
            </div>
            <NavLink to="/admin/products" onClick={close}>
              Products
            </NavLink>
            <NavLink to="/admin/categories" onClick={close}>
              Category
            </NavLink>
            <NavLink to="/admin/orders" onClick={close}>
              Orders
            </NavLink>
            <NavLink to="/admin/users" onClick={close}>
              Users
            </NavLink>
            <NavLink to="/admin" end onClick={close}>
              Dashboard
            </NavLink>
            <NavLink to="/" onClick={close}>
              Store
            </NavLink>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/admin/login");
              }}
            >
              Logout
            </button>
          </aside>
        </>
      )}

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
