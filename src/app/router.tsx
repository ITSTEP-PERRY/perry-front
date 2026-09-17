import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppShell, AdminShell } from "../widgets/layout/AppShell";
import { AuthShell } from "../widgets/layout/AuthShell";
import { RequireAuth } from "./RequireAuth";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { OrdersPage } from "../pages/OrdersPage";
import { OrderDetailsPage } from "../pages/OrderDetailsPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import {
  AuthSuccessPage,
  FinishingTouchesPage,
  ResetPasswordPage,
  VerifyCodePage,
} from "../pages/auth/AuthFlowPages";
import { ProfilePage } from "../pages/auth/ProfilePage";
import { LegalPage } from "../pages/LegalPage";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { AdminDashboardPage } from "../pages/admin/AdminDashboardPage";
import { AdminProductsPage } from "../pages/admin/AdminProductsPage";
import { AdminCategoriesPage } from "../pages/admin/AdminCategoriesPage";
import { AdminOrdersPage } from "../pages/admin/AdminOrdersPage";
import { AdminUsersPage } from "../pages/admin/AdminUsersPage";
import { AdminProductEditPage } from "../pages/admin/AdminProductEditPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "products/:id", element: <ProductPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "terms", element: <LegalPage kind="terms" /> },
      { path: "privacy", element: <LegalPage kind="privacy" /> },
      { path: "license", element: <LegalPage kind="license" /> },
      {
        element: <RequireAuth />,
        children: [
          { path: "orders", element: <OrdersPage /> },
          { path: "orders/:id", element: <OrderDetailsPage /> },
          { path: "profile", element: <ProfilePage /> },
        ],
      },
    ],
  },
  {
    element: <AuthShell />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "auth/success", element: <AuthSuccessPage /> },
    ],
  },
  {
    element: <AuthShell backTo="/login" backLabel="← Back" />,
    children: [
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "verify-code", element: <VerifyCodePage /> },
    ],
  },
  {
    element: <AuthShell backTo="/forgot-password" backLabel="← Back" />,
    children: [{ path: "reset-password", element: <ResetPasswordPage /> }],
  },
  {
    element: <AuthShell backTo="/register" backLabel="← Back" />,
    children: [{ path: "finishing-touches", element: <FinishingTouchesPage /> }],
  },
  { path: "/admin/login", element: <AdminLoginPage /> },
  {
    path: "/admin",
    element: <AdminShell />,
    children: [
      { index: true, element: <AdminDashboardPage /> },
      { path: "products", element: <AdminProductsPage /> },
      { path: "products/:id", element: <AdminProductEditPage /> },
      { path: "categories", element: <AdminCategoriesPage /> },
      { path: "orders", element: <AdminOrdersPage /> },
      { path: "users", element: <AdminUsersPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
