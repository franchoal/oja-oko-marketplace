import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-20 text-center">
        {/* Hero */}

        <span className="rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
          Welcome to Oja-Oko Marketplace
        </span>

        <h1 className="mt-6 text-5xl font-bold text-gray-900">
          Connecting
          <span className="text-green-700"> Farmers </span>
          and
          <span className="text-green-700"> Buyers </span>
          Across Nigeria
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
          Buy fresh agricultural produce directly from trusted farmers or grow
          your farming business by reaching thousands of buyers through the
          Oja-Oko Marketplace.
        </p>

        {/* User Portals */}

        <div className="mt-16 grid w-full gap-8 lg:grid-cols-2">
          {/* Buyer Portal */}

          <div className="rounded-3xl bg-white p-10 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-6 text-6xl">
              🛒
            </div>

            <h2 className="text-3xl font-bold text-green-700">
              Buyer Marketplace
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Browse fresh farm products, compare prices, place orders and enjoy
              a seamless shopping experience directly from verified farmers.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <Link
                to="/products"
                className="rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
              >
                Browse Products
              </Link>

              <Link
                to="/login/buyer"
                className="rounded-xl border border-green-600 px-6 py-4 font-semibold text-green-700 transition hover:bg-green-50"
              >
                Buyer Login
              </Link>

              <Link
                to="/register/buyer"
                className="font-medium text-green-700 hover:underline"
              >
                Create Buyer Account
              </Link>
            </div>
          </div>

          {/* Farmer Portal */}

          <div className="rounded-3xl bg-white p-10 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-6 text-6xl">
              🌱
            </div>

            <h2 className="text-3xl font-bold text-green-700">
              Farmer Portal
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Join thousands of farmers using Oja-Oko to sell produce, manage
              products, receive customer orders and grow their agricultural
              businesses.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <Link
                to="/farmer"
                className="rounded-xl bg-green-600 px-6 py-4 font-semibold text-white transition hover:bg-green-700"
              >
                Go to Farmer Portal
              </Link>

              <p className="text-sm text-gray-500">
                Existing farmers can sign in, while new farmers can create an
                account from the portal.
              </p>
            </div>
          </div>
        </div>

        {/* Features */}

        <section className="mt-24 grid w-full gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow">
            <div className="mb-4 text-4xl">🌾</div>

            <h3 className="text-xl font-semibold text-green-700">
              Fresh Produce
            </h3>

            <p className="mt-3 text-gray-600">
              Purchase quality agricultural products directly from verified
              farmers across Nigeria.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">
            <div className="mb-4 text-4xl">🚜</div>

            <h3 className="text-xl font-semibold text-green-700">
              Farmer Management
            </h3>

            <p className="mt-3 text-gray-600">
              Manage your farm profile, products, customer orders and future
              business analytics from one platform.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow">
            <div className="mb-4 text-4xl">🔒</div>

            <h3 className="text-xl font-semibold text-green-700">
              Trusted Marketplace
            </h3>

            <p className="mt-3 text-gray-600">
              Secure transactions, verified farmers and a marketplace built for
              Nigeria's agricultural ecosystem.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default HomePage;