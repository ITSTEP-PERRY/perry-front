import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../app/AuthContext";

export function AccountShell() {
  const { user } = useAuth();
  if (!user) return null;

  const roleLabel = user.roleId === "Admin" ? "Admin" : "Customer";
  const initial = (user.name?.trim()?.[0] || user.login?.[0] || "?").toUpperCase();

  return (
    <div className="account-page">
      <nav className="breadcrumbs breadcrumbs--account" aria-label="Breadcrumb">
        <Link className="breadcrumbs__home" to="/" aria-label="Home">
          <img src="/icons/home.svg" alt="" width={16} height={16} />
        </Link>
        <span className="breadcrumbs__sep">/</span>
        <span>Account</span>
      </nav>

      <div className="account-layout">
        <aside className="account-nav">
          <div className="account-nav__profile">
            {user.avatar ? (
              <img className="account-nav__avatar" src={user.avatar} alt="" />
            ) : (
              <div className="account-nav__avatar account-nav__avatar--initial" aria-hidden>
                {initial}
              </div>
            )}
            <div>
              <div className="account-nav__name">{user.name}</div>
              <div className="account-nav__role">{roleLabel}</div>
            </div>
          </div>

          <nav className="account-nav__list" aria-label="Account">
            <NavLink
              to="/account/orders"
              className={({ isActive }) => `account-nav__link${isActive ? " is-active" : ""}`}
            >
              My orders
            </NavLink>
            <NavLink
              to="/account/wishlist"
              className={({ isActive }) => `account-nav__link${isActive ? " is-active" : ""}`}
            >
              Wishlist
            </NavLink>
            <NavLink
              to="/account/settings"
              className={({ isActive }) => `account-nav__link${isActive ? " is-active" : ""}`}
            >
              Account settings
            </NavLink>
          </nav>
        </aside>

        <div className="account-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
