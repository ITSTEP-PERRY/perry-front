import {
  useEffect,
  useState,
} from 'react';

import {
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from 'react-router-dom';

import { useAuth } from '../../app/AuthContext';

import { ScrollToTop } from '../../Components/ScrollToTop/ScrollToTop';

import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import { SideMenu } from '../SideMenu/SideMenu';

/* =========================================================
   CLIENT APP SHELL
========================================================= */

export function AppShell() {
  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const { user } = useAuth();

  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(
      user
        ? '/account/settings'
        : '/login',
    );
  };

  return (
    <div className="shell">
      <Header
        onMenuClick={() =>
          setMenuOpen(true)
        }
        onProfileClick={
          handleProfileClick
        }
      />

      <SideMenu
        open={menuOpen}
        onClose={() =>
          setMenuOpen(false)
        }
      />

      <main className="site-main">
        <Outlet />
      </main>

      <Footer />

      <ScrollToTop />
    </div>
  );
}

/* =========================================================
   ADMIN SHELL
========================================================= */

export function AdminShell() {
  const {
    logout,
    isAdmin,
    loading,
    user,
  } = useAuth();

  const navigate = useNavigate();

  const [
    drawer,
    setDrawer,
  ] = useState(false);

  useEffect(() => {
    if (
      !loading &&
      !isAdmin
    ) {
      navigate(
        '/admin/login',
        {
          replace: true,
        },
      );
    }
  }, [
    loading,
    isAdmin,
    navigate,
  ]);

  if (
    loading ||
    !isAdmin
  ) {
    return (
      <div className="shell-loading">
        Loading…
      </div>
    );
  }

  const close = () => {
    setDrawer(false);
  };

  return (
    <div className="admin-shell admin-body">
      {/* =========================
          ADMIN HEADER
      ========================= */}

      <header className="admin-header">
        <div className="admin-header__inner">
          <button
            type="button"
            className="admin-header__icon-btn"
            aria-label="Menu"
            aria-expanded={drawer}
            onClick={() =>
              setDrawer(true)
            }
          >
            <img
              src="/icons/menu.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>

          <Link
            className="admin-header__logo"
            to="/admin"
          >
            PERRY
          </Link>

          <nav className="admin-header__nav">
            <NavLink
              to="/admin/products"
              className="admin-header__link"
            >
              Products
            </NavLink>

            <NavLink
              to="/admin/categories"
              className="admin-header__link"
            >
              Categories
            </NavLink>

            <NavLink
              to="/admin/reviews"
              className="admin-header__link"
            >
              Reviews
            </NavLink>

            <NavLink
              to="/admin/orders"
              className="admin-header__link"
            >
              Orders
            </NavLink>

            <NavLink
              to="/admin/users"
              className="admin-header__link"
            >
              Users
            </NavLink>
          </nav>

          <div className="admin-header__right">
            <Link
              className="admin-header__icon-btn"
              to="/"
              title="Store"
            >
              <img
                src="/icons/home.svg"
                alt=""
                width={22}
                height={22}
              />
            </Link>

            <button
              type="button"
              className="admin-header__icon-btn"
              title="Logout"
              onClick={() => {
                logout();

                navigate(
                  '/admin/login',
                );
              }}
            >
              <img
                src="/icons/account.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>
      </header>

      {/* =========================
          ADMIN DRAWER
      ========================= */}

      {drawer && (
        <>
          <div
            className="admin-drawer-backdrop"
            onClick={close}
          />

          <aside
            className="admin-drawer"
            role="dialog"
            aria-label="Admin menu"
          >
            <div className="admin-drawer__user">
              <strong>
                {user?.name ||
                  'Administrator'}
              </strong>

              <span>
                Administrator
              </span>
            </div>

            <NavLink
              to="/admin/products"
              onClick={close}
            >
              Products
            </NavLink>

            <NavLink
              to="/admin/categories"
              onClick={close}
            >
              Category
            </NavLink>

            <NavLink
              to="/admin/reviews"
              onClick={close}
            >
              Reviews
            </NavLink>

            <NavLink
              to="/admin/orders"
              onClick={close}
            >
              Orders
            </NavLink>

            <NavLink
              to="/admin/users"
              onClick={close}
            >
              Users
            </NavLink>

            <NavLink
              to="/admin"
              end
              onClick={close}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/"
              onClick={close}
            >
              Store
            </NavLink>

            <button
              type="button"
              onClick={() => {
                logout();

                navigate(
                  '/admin/login',
                );
              }}
            >
              Logout
            </button>
          </aside>
        </>
      )}

      {/* =========================
          ADMIN CONTENT
      ========================= */}

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}