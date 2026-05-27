import { createHashRouter } from "react-router-dom";
import { lazy } from "react";

import GlobalErrorPage from "../components/errors/GlobalErrorPage";
import RootLayout from "../components/layout/RootLayout";

const Home = lazy(() => import("../features/products/pages/Home"));
const Products = lazy(() => import("../features/products/pages/Products"));
const ProductDetail = lazy(
  () => import("../features/products/pages/ProductDetail")
);
const Cart = lazy(() => import("../features/cart/pages/Cart"));
const Login = lazy(() => import("../features/auth/pages/Login"));
const Signup = lazy(() => import("../features/auth/pages/Signup"));
const Settings = lazy(() => import("../features/settings/pages/Settings"));
import ProtectedRoute from "./ProtectedRoute";
export const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <GlobalErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
