import { Link, Outlet, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";
import { useCart } from "../hooks/useCart";

const MainLayout = () => {
  const navigate = useNavigate();

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



          {/* Navigation */}

          <nav className="flex items-center gap-6">


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
                      Continue Shopping
                    </Link>



                    {/* Cart */}

                    <Link
                      to="/cart"
                      className="relative font-medium text-gray-700 transition hover:text-green-700"
                    >

                      🛒 Cart


                      {cartCount > 0 && (

                        <span
                          className="absolute -right-4 -top-3 rounded-full bg-green-600 px-2 py-0.5 text-xs font-bold text-white"
                        >
                          {cartCount}
                        </span>

                      )}

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
                      to="/farmer"
                      className="font-medium text-gray-700 transition hover:text-green-700"
                    >
                      My Portal
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