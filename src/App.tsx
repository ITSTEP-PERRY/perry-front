import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./app/AuthContext";
import { CartProvider } from "./app/CartContext";
import { router } from "./app/router";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}
