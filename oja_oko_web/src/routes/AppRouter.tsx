import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import HomePage from "../pages/Home/HomePage";
import ProductsPage from "../pages/Products/ProductsPage";
import CreateProductPage from "../pages/Products/CreateProductPage";

import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";

import FarmerPortalPage from "../pages/Farmer/FarmerPortalPage";
import FarmerDashboardPage from "../pages/Farmer/FarmerDashboardPage";
import FarmerProfilePage from "../pages/Farmer/FarmerProfilePage";

import ProtectedRoute from "./ProtectedRoute";
import FarmerRoute from "./FarmerRoute";

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
      Public Marketplace
      */

      {
        path: "products",
        element: <ProductsPage />,
      },

      /*
      Farmer Landing Portal

      This is the public entry point
      for all farmers.

      Existing farmers can log in.

      New farmers can register.
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
    element: (
      <LoginPage
        accountType="buyer"
      />
    ),
  },

  {
    path: "/login/buyer",
    element: (
      <LoginPage
        accountType="buyer"
      />
    ),
  },

  {
    path: "/register",
    element: (
      <RegisterPage
        accountType="buyer"
      />
    ),
  },

  {
    path: "/register/buyer",
    element: (
      <RegisterPage
        accountType="buyer"
      />
    ),
  },

  /*
  ==========================================
  FARMER AUTHENTICATION
  ==========================================
  */

  {
    path: "/login/farmer",
    element: (
      <LoginPage
        accountType="farmer"
      />
    ),
  },

  {
    path: "/register/farmer",
    element: (
      <RegisterPage
        accountType="farmer"
      />
    ),
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

      Requires:

      • Authenticated User
      • Farmer Role

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
            path: "/farmer/profile",
            element: <FarmerProfilePage />,
          },

          {
            path: "/farmer/products/create",
            element: <CreateProductPage />,
          },

          /*
          Future Farmer Routes

          /farmer/products

          /farmer/products/:id

          /farmer/products/:id/edit

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