import { Link } from "react-router-dom";

import { Card } from "../../components/ui";

import { useOrders } from "../../hooks/useOrders";

const OrdersPage = () => {
const {
  data,
  isLoading,
} = useOrders();

  const orders =
    data?.results ?? [];

  if (isLoading) {
    return (

  <main className="min-h-screen bg-gradient-to-b from-green-50/40 via-white to-white">

    <div className="mx-auto max-w-7xl px-6 py-10"></div>

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative overflow-hidden rounded-[36px]">

        <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-green-700 to-emerald-600" />

        <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-20 left-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

        <div className="relative px-10 py-16 lg:px-16">

          <div className="max-w-3xl">

            <span className="inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur">

              📦 Order Management

            </span>

            <h1 className="mt-8 text-5xl font-extrabold leading-tight text-white lg:text-6xl">

              My Orders

            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-green-100">

              Monitor every purchase you've made on Oja-Oko Marketplace,
              follow delivery progress, and review your order history
              from verified Nigerian farmers.

            </p>

          </div>

        </div>

      </section>

      {/* ====================================================== */}
      {/* SUMMARY CARDS */}
      {/* ====================================================== */}

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card className="rounded-[28px] border-0 p-8 shadow-lg">

          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">

            Total Orders

          </p>

          <h2 className="mt-4 text-5xl font-extrabold text-green-700">

            {orders.length}

          </h2>

        </Card>

        <Card className="rounded-[28px] border-0 p-8 shadow-lg">

          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">

            Pending

          </p>

          <h2 className="mt-4 text-5xl font-extrabold text-amber-500">

            {
              orders.filter(
                order =>
                  order.status.toLowerCase() ===
                  "pending"
              ).length
            }

          </h2>

        </Card>

        <Card className="rounded-[28px] border-0 p-8 shadow-lg">

          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">

            Delivered

          </p>

          <h2 className="mt-4 text-5xl font-extrabold text-green-600">

            {
              orders.filter(
                order =>
                  order.status.toLowerCase() ===
                  "delivered"
              ).length
            }

          </h2>

        </Card>

        <Card className="rounded-[28px] border-0 p-8 shadow-lg">

          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">

            Total Spending

          </p>

          <h2 className="mt-4 text-4xl font-extrabold text-green-700">

            ₦
            {orders
              .reduce(
                (sum, order) =>
                  sum + Number(order.total),
                0
              )
              .toLocaleString()}

          </h2>

        </Card>

      </section>
      {orders.length === 0 ? (

  <section className="mt-12 overflow-hidden rounded-[34px] bg-white shadow-xl">

    <div className="px-10 py-24 text-center">

      <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-green-100 text-7xl">

        📦

      </div>

      <h2 className="mt-10 text-5xl font-extrabold text-gray-900">

        No Orders Yet

      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-500">

        You haven't placed any orders yet. Explore our marketplace and
        purchase fresh vegetables, fruits, grains, poultry, livestock
        and other agricultural products directly from verified Nigerian
        farmers.

      </p>

      <div className="mt-12 flex flex-wrap justify-center gap-5">

        <Link
          to="/products"
          className="rounded-2xl bg-green-600 px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"
        >

          Explore Marketplace

        </Link>

        <Link
          to="/"
          className="rounded-2xl border border-green-600 px-8 py-4 font-bold text-green-700 transition hover:bg-green-50"
        >

          Return Home

        </Link>

      </div>

    </div>

  </section>

) : (

  <section className="mt-12 space-y-8">

    {orders.map((order) => (

      <Link
        key={order.id}
        to={`/orders/${order.id}`}
        className="block group"
      >

        <Card className="overflow-hidden rounded-[32px] border-0 p-0 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

          <div className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center">

            <div>

              <div className="flex flex-wrap items-center gap-4">

                <span className="rounded-full bg-green-100 px-5 py-2 text-sm font-bold text-green-700">

                  Order #{order.id}

                </span>

                <span
                  className={`rounded-full px-5 py-2 text-sm font-bold ${
                    order.status.toLowerCase() === "delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status.toLowerCase() === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status.toLowerCase() === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >

                  {order.status}

                </span>

              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-900">

                {order.farmer}

              </h2>

              <p className="mt-3 text-gray-500">

                Ordered on{" "}
                {new Date(order.created_at).toLocaleDateString(
                  "en-NG",
                  {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}

              </p>

            </div>

            <div className="text-left lg:text-right">

              <p className="text-sm uppercase tracking-wide text-gray-400">

                Total Amount

              </p>

              <h3 className="mt-3 text-5xl font-extrabold text-green-700">

                ₦{Number(order.total).toLocaleString()}

              </h3>

              <div className="mt-8 inline-flex items-center rounded-xl bg-gray-100 px-5 py-3 font-semibold text-gray-700 transition group-hover:bg-green-600 group-hover:text-white">

                View Order →

              </div>

            </div>

          </div>

        </Card>

      </Link>

    ))}

  </section>

)}
    </main>

  );

};
}
export default OrdersPage;