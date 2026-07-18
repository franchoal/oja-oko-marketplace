// import { Link, Outlet, useNavigate } from "react-router-dom";
import { useNotifications } from "../hooks/useNotifications";
import { useAuthStore } from "../store/authStore";
import { useCart } from "../hooks/useCart";
import { useState } from "react";

import {
  Link,
  Outlet,
  useNavigate,
} from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] =
  useState(false);

  const {
    isAuthenticated,
    user,
    logout,
  } = useAuthStore();


  /**
   * Buyer cart
   *
   * Only fetch cart for buyers.
   * Farmers and guests do not need it.
   */
  const {
    data: cart,
  } = useCart();
const {
  data: notifications,
} = useNotifications({
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
    <div className="flex min-h-screen flex-col bg-gray-50">

      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">


          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-green-700"
          >
            <span className="text-3xl">
              🌾
            </span>

            <span>
              Oja-Oko
            </span>

          </Link>
            <button
  onClick={() => setMobileMenuOpen(true)}
  className="rounded-lg p-2 transition hover:bg-gray-100 lg:hidden"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-7 w-7"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
</button>


          {/* Navigation */}

         <nav className="hidden lg:flex items-center gap-6">


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
                  className="rounded-lg bg-green-600 px-5 py-2 font-semibold text-white transition hover:bg-green-700"
                >
                  Farmer Portal
                </Link>

              </>


            ) : (


              <>

                {/* Buyer */}
{user?.role === "buyer" && (
  <>
    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
      Buyer
    </span>

    <Link
      to="/products"
      className="font-medium text-gray-700 transition hover:text-green-700"
    >
      Marketplace
    </Link>

    <Link
      to="/cart"
      className="relative font-medium text-gray-700 transition hover:text-green-700"
    >
      🛒 Cart

      {cartCount > 0 && (
        <span className="absolute -right-4 -top-3 rounded-full bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
          {cartCount}
        </span>
      )}
    </Link>

    <Link
      to="farmer/orders"
      className="font-medium text-gray-700 transition hover:text-green-700"
    
    >
      📦 Orders
    </Link>

<Link
  to="/notifications"
  className="relative flex items-center gap-2 font-medium text-gray-700 transition hover:text-green-700"
>
  <span className="relative">
    🔔

    {unreadNotifications > 0 && (
      <span
        className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white"
      >
        {unreadNotifications}
      </span>
    )}
  </span>

  <span>Notifications</span>
</Link>

  </>
)}

                {/* Farmer */}
              {user?.role === "farmer" && (
  <>
    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
      Farmer
    </span>

    <Link
      to="/farmer/dashboard"
      className="font-medium text-gray-700 transition hover:text-green-700"
    >
      Dashboard
    </Link>

  </>
)}


                <span className="hidden text-sm text-gray-500 md:block">

                  {user?.first_name} {user?.last_name}

                </span>



                <button
                  onClick={handleLogout}
                  className="rounded-lg border border-red-500 px-4 py-2 font-medium text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>


              </>

            )}


          </nav>


        </div>

      </header>



      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">

        <Outlet />

      </main>



      <footer className="border-t bg-white">
        {mobileMenuOpen && (
  <div className="fixed inset-0 z-50 lg:hidden">

    {/* Background Overlay */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setMobileMenuOpen(false)}
    />

    {/* Drawer */}
    <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-xl">

      <div className="flex items-center justify-between border-b p-5">

        <h2 className="text-xl font-bold">
          Menu
        </h2>

        <button
          onClick={() => setMobileMenuOpen(false)}
          className="text-2xl"
        >
          ✕
        </button>

      </div>
       <div className="flex flex-col gap-1 p-5">

  <Link
    to="/"
    onClick={() => setMobileMenuOpen(false)}
    className="rounded-lg px-3 py-3 hover:bg-gray-100"
  >
    🏠 Home
  </Link>

  <Link
    to="/products"
    onClick={() => setMobileMenuOpen(false)}
    className="rounded-lg px-3 py-3 hover:bg-gray-100"
  >
    🌾 Marketplace
  </Link>

  {!isAuthenticated && (
    <>
      <Link
        to="/login/buyer"
        onClick={() => setMobileMenuOpen(false)}
        className="rounded-lg px-3 py-3 hover:bg-gray-100"
      >
        👤 Buyer Login
      </Link>

      <Link
        to="/farmer"
        onClick={() => setMobileMenuOpen(false)}
        className="rounded-lg px-3 py-3 hover:bg-gray-100"
      >
        🚜 Farmer Portal
      </Link>
    </>
  )}

  {isAuthenticated && user?.role === "buyer" && (
    <>
      <hr className="my-3" />

      <div className="px-3 text-sm font-semibold text-green-700">
        Buyer Menu
      </div>

      <Link
        to="/cart"
        onClick={() => setMobileMenuOpen(false)}
        className="rounded-lg px-3 py-3 hover:bg-gray-100"
      >
        🛒 Cart ({cartCount})
      </Link>

      <Link
        to="/orders"
        onClick={() => setMobileMenuOpen(false)}
        className="rounded-lg px-3 py-3 hover:bg-gray-100"
      >
        📦 My Orders
      </Link>

      <Link
        to="/notifications"
        onClick={() => setMobileMenuOpen(false)}
        className="rounded-lg px-3 py-3 hover:bg-gray-100"
      >
        🔔 Notifications
        {unreadNotifications > 0 && (
          <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">
            {unreadNotifications}
          </span>
        )}
      </Link>
    </>
  )}

  {isAuthenticated && user?.role === "farmer" && (
    <>
      <hr className="my-3" />

      <div className="px-3 text-sm font-semibold text-green-700">
        Farmer Menu
      </div>

      <Link
        to="/farmer/dashboard"
        onClick={() => setMobileMenuOpen(false)}
        className="rounded-lg px-3 py-3 hover:bg-gray-100"
      >
        📊 Dashboard
      </Link>

      <Link
        to="/farmer/products"
        onClick={() => setMobileMenuOpen(false)}
        className="rounded-lg px-3 py-3 hover:bg-gray-100"
      >
        🌾 Products
      </Link>

      <Link
        to="/farmer/orders"
        onClick={() => setMobileMenuOpen(false)}
        className="rounded-lg px-3 py-3 hover:bg-gray-100"
      >
        📦 Orders
      </Link>

      <Link
        to="/notifications"
        onClick={() => setMobileMenuOpen(false)}
        className="rounded-lg px-3 py-3 hover:bg-gray-100"
      >
        🔔 Notifications
        {unreadNotifications > 0 && (
          <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">
            {unreadNotifications}
          </span>
        )}
      </Link>
    </>
  )}

  {isAuthenticated && (
    <>
      <hr className="my-3" />

      <div className="px-3 text-sm text-gray-500">
        {user?.first_name} {user?.last_name}
      </div>

      <button
        onClick={() => {
          setMobileMenuOpen(false);
          handleLogout();
        }}
        className="mt-2 rounded-lg px-3 py-3 text-left text-red-600 hover:bg-red-50"
      >
        🚪 Logout
      </button>
    </>
  )}

</div>

    </div>

  </div>
)}

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-gray-500 md:flex-row">

          <p>
            © {new Date().getFullYear()} Oja-Oko Marketplace. All rights reserved.
          </p>


          <div className="flex items-center gap-6">

            <Link
              to="/"
              className="hover:text-green-700"
            >
              Home
            </Link>


            <Link
              to="/products"
              className="hover:text-green-700"
            >
              Marketplace
            </Link>


            <Link
              to="/farmer"
              className="hover:text-green-700"
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