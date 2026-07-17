import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import OrdersPage from "../pages/Orders/OrdersPage";
import HomePage from "../pages/Home/HomePage";
import FarmerOrdersPage from "../pages/Farmer/FarmerOrdersPage";
import FarmerOrderDetailsPage from "../pages/Farmer/FarmerOrderDetailsPage";

import ProductsPage from "../pages/Products/ProductsPage";
import ProductDetailsPage from "../pages/Products/ProductDetailsPage";
import OrderDetailsPage from "../pages/Orders/OrderDetailsPage";
import CreateProductPage from "../pages/Products/CreateProductPage";
import EditProductPage from "../pages/Products/EditProductPage";

import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";

import FarmerPortalPage from "../pages/Farmer/FarmerPortalPage";
import FarmerDashboardPage from "../pages/Farmer/FarmerDashboardPage";
import FarmerProfilePage from "../pages/Farmer/FarmerProfilePage";
import CartPage from "../pages/Cart/CartPage";
import ProtectedRoute from "./ProtectedRoute";
import FarmerRoute from "./FarmerRoute";
import NotificationsPage from "../pages/Notifications/NotificationsPage";

export const router = createBrowserRouter([
  /*
  ==========================================
  PUBLIC MARKETPLACE
  ==========================================
  */

  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },

      /*
      ======================================
      PUBLIC MARKETPLACE
      ======================================
      */

      {
        path: "products",
        element: <ProductsPage />,
      },

      {
        path: "products/:id",
        element: <ProductDetailsPage />,
      },

      /*
      ======================================
      FARMER LANDING PORTAL
      ======================================

      Public entry point for farmers.

      Existing farmers can log in.

      New farmers can register.

      ======================================
      */

      {
        path: "farmer",
        element: <FarmerPortalPage />,
      },
    ],
  },

  /*
  ==========================================
  BUYER AUTHENTICATION
  ==========================================
  */

  {
    path: "/login",
    element: <LoginPage accountType="buyer" />,
  },

  {
    path: "/login/buyer",
    element: <LoginPage accountType="buyer" />,
  },

  {
    path: "/register",
    element: <RegisterPage accountType="buyer" />,
  },

  {
    path: "/register/buyer",
    element: <RegisterPage accountType="buyer" />,
  },

  /*
  ==========================================
  FARMER AUTHENTICATION
  ==========================================
  */

  {
    path: "/login/farmer",
    element: <LoginPage accountType="farmer" />,
  },

  {
    path: "/register/farmer",
    element: <RegisterPage accountType="farmer" />,
  },

  /*
  ==========================================
  AUTHENTICATED USERS
  ==========================================
  */

  {
    element: <ProtectedRoute />,

    children: [
      /*
      ======================================
      FARMER MODULE
      ======================================
      */

      {
        element: <FarmerRoute />,

        children: [
          {
            path: "/farmer/dashboard",
            element: <FarmerDashboardPage />,
          },

          {
           path: "/farmer/orders",
          element: <FarmerOrdersPage />,
          },

          {
           path: "/farmer/orders/:id",
           element: <FarmerOrderDetailsPage />,
          },

          {
            path: "/farmer/profile",
            element: <FarmerProfilePage />,
          },

          {
            path: "/farmer/products/create",
            element: <CreateProductPage />,
          },

          {
            path: "/farmer/products/:id/edit",
            element: <EditProductPage />,
          },

          /*
          Future Farmer Routes

          /farmer/products

          /farmer/products/:id

          /farmer/orders

          /farmer/orders/:id

          /farmer/analytics

          /farmer/settings
          */
        ],
      },

      /*
      ======================================
      BUYER MODULE

      Buyers intentionally do not have
      a dashboard.

      Future:
    
      /cart

      /checkout

      /orders

      /orders/:id

      /account

      /wishlist

      ======================================
      */
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
       path: "/checkout",
       element: <CheckoutPage />,
      },

      {
       path: "/orders",
       element: <OrdersPage />,
      },

      {
       path: "/orders/:id",
       element: <OrderDetailsPage />,
      },

      {
       path: "/notifications",
       element: <NotificationsPage />,
      },
    ],
  },

  /*
  ==========================================
  FALLBACK
  ==========================================
  */

  {
    path: "*",
    element: <HomePage />,
  },
]);