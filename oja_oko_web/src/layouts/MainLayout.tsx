import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  Sprout,
  Menu,
  ShoppingCart,
  Bell,
  Package,
  LayoutDashboard,
  Tractor,
  User,
} from "lucide-react";

import { heroFarm } from "../assets/images";

import { useAuthStore } from "../store/authStore";
import { useCart } from "../hooks/useCart";
import { useNotifications } from "../hooks/useNotifications";

const MainLayout = () => {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    isAuthenticated,
    user,
    logout,
  } = useAuthStore();

  const { data: cart } = useCart();

  const { data: notifications } = useNotifications({
    enabled: isAuthenticated,
  });

  const unreadNotifications =
    notifications?.results?.filter(
      (notification) => !notification.is_read
    ).length ?? 0;

  const cartCount =
    user?.role === "buyer"
      ? cart?.items.length ?? 0
      : 0;

  const handleLogout = () => {
    logout();

    navigate("/", {
      replace: true,
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg shadow-sm">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-white shadow-lg">
              <Sprout size={22} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-green-700">
                Oja-Oko
              </h1>

              <p className="-mt-1 text-xs text-gray-500">
                Marketplace
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}

          <nav className="hidden items-center gap-8 lg:flex">

            <Link
              to="/"
              className="font-medium text-gray-700 transition hover:text-green-700"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="font-medium text-gray-700 transition hover:text-green-700"
            >
              Marketplace
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login/buyer"
                  className="font-medium text-gray-700 transition hover:text-green-700"
                >
                  Buyer Login
                </Link>

                <Link
                  to="/farmer"
                  className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                  Farmer Portal
                </Link>
              </>
            ) : (
              <>
                              {/* ================= BUYER ================= */}

                {user?.role === "buyer" && (
                  <>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      Buyer
                    </span>

                    <Link
                      to="/cart"
                      className="relative flex items-center gap-2 font-medium text-gray-700 transition hover:text-green-700"
                    >
                      <ShoppingCart size={20} />

                      Cart

                      {cartCount > 0 && (
                        <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-green-600 px-1 text-[10px] font-bold text-white">
                          {cartCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/orders"
                      className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-green-700"
                    >
                      <Package size={20} />
                      Orders
                    </Link>
                  </>
                )}

                {/* ================= FARMER ================= */}

                {user?.role === "farmer" && (
                  <>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      Farmer
                    </span>

                    <Link
                      to="/farmer/dashboard"
                      className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-green-700"
                    >
                      <LayoutDashboard size={20} />
                      Dashboard
                    </Link>

                    <Link
                      to="/farmer/products"
                      className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-green-700"
                    >
                      <Tractor size={20} />
                      Products
                    </Link>

                    <Link
                      to="/farmer/orders"
                      className="flex items-center gap-2 font-medium text-gray-700 transition hover:text-green-700"
                    >
                      <Package size={20} />
                      Orders
                    </Link>
                  </>
                )}

                {/* ================= NOTIFICATIONS ================= */}

                <Link
                  to="/notifications"
                  className="relative flex items-center gap-2 font-medium text-gray-700 transition hover:text-green-700"
                >
                  <Bell size={20} />

                  Notifications

                  {unreadNotifications > 0 && (
                    <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                      {unreadNotifications}
                    </span>
                  )}
                </Link>

                {/* ================= USER ================= */}

                <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <User
                      size={18}
                      className="text-green-700"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.first_name} {user?.last_name}
                    </p>

                    <p className="text-xs capitalize text-gray-500">
                      {user?.role}
                    </p>
                  </div>

                </div>

                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-red-500 px-5 py-2 font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>

              </>
            )}

          </nav>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="rounded-xl p-2 transition hover:bg-gray-100 lg:hidden"
          >
            <Menu size={28} />
          </button>

        </div>

      </header>

      {/* ================= MAIN ================= */}

      <main className="flex-1">
        <Outlet />
      </main>
            {/* ================= MOBILE DRAWER ================= */}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          {/* Overlay */}

          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}

          <aside className="absolute right-0 top-0 flex h-full w-80 flex-col bg-white shadow-2xl">

            {/* Drawer Header */}

            <div className="relative h-44 overflow-hidden">

              <img
                src={heroFarm}
                alt="Oja-Oko"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-700/70" />

              <div className="relative flex h-full items-center px-6">

                <div>

                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">

                    <Sprout
                      size={24}
                      className="text-white"
                    />

                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    Oja-Oko
                  </h2>

                  <p className="text-sm text-green-100">
                    Agricultural Marketplace
                  </p>

                </div>

              </div>

            </div>

            {/* Navigation */}

            <div className="flex-1 space-y-2 overflow-y-auto p-6">

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 transition hover:bg-green-50"
              >
                🏠 Home
              </Link>

              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-4 py-3 transition hover:bg-green-50"
              >
                🌾 Marketplace
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login/buyer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 transition hover:bg-green-50"
                  >
                    👤 Buyer Login
                  </Link>

                  <Link
                    to="/farmer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl bg-green-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-green-700"
                  >
                    🚜 Farmer Portal
                  </Link>
                </>
              ) : (
                <>
                  {user?.role === "buyer" && (
                    <>
                      <hr className="my-4" />

                      <Link
                        to="/cart"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 transition hover:bg-green-50"
                      >
                        🛒 Cart ({cartCount})
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 transition hover:bg-green-50"
                      >
                        📦 Orders
                      </Link>
                    </>
                  )}

                  {user?.role === "farmer" && (
                    <>
                      <hr className="my-4" />

                      <Link
                        to="/farmer/dashboard"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 transition hover:bg-green-50"
                      >
                        📊 Dashboard
                      </Link>

                      <Link
                        to="/farmer/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 transition hover:bg-green-50"
                      >
                        🌾 Products
                      </Link>

                      <Link
                        to="/farmer/orders"
                        onClick={() => setMobileMenuOpen(false)}
                        className="block rounded-xl px-4 py-3 transition hover:bg-green-50"
                      >
                        📦 Orders
                      </Link>
                    </>
                  )}

                  <Link
                    to="/notifications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 transition hover:bg-green-50"
                  >
                    🔔 Notifications

                    {unreadNotifications > 0 && (
                      <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
                        {unreadNotifications}
                      </span>
                    )}
                  </Link>
                </>
              )}

            </div>

            {/* Footer */}

            {isAuthenticated && (
              <div className="border-t bg-gray-50 p-6">

                <div className="mb-5">

                  <p className="font-semibold text-gray-900">
                    {user?.first_name} {user?.last_name}
                  </p>

                  <p className="text-sm capitalize text-gray-500">
                    {user?.role}
                  </p>

                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full rounded-xl border border-red-500 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>

              </div>
            )}

          </aside>

        </div>
      )}

      {/* ================= FOOTER ================= */}

      <footer className="border-t bg-white">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-gray-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} Oja-Oko Marketplace. All rights reserved.
          </p>

          <div className="flex items-center gap-6">

            <Link
              to="/"
              className="transition hover:text-green-700"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="transition hover:text-green-700"
            >
              Marketplace
            </Link>

            <Link
              to="/farmer"
              className="transition hover:text-green-700"
            >
              Farmer Portal
            </Link>

          </div>

        </div>

      </footer>

    </div>
  );
};

export default MainLayout;