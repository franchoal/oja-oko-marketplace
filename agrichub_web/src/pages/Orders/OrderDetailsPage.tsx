import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import { Card } from "../../components/ui";

import { useOrder } from "../../hooks/useOrder";

const orderSteps = [
  {
    key: "pending",
    label: "Order Placed",
  },
  {
    key: "accepted",
    label: "Accepted by Farmer",
  },
  {
    key: "processing",
    label: "Processing",
  },
  {
    key: "ready",
    label: "Ready",
  },
  {
    key: "out_for_delivery",
    label: "Out For Delivery",
  },
  {
    key: "delivered",
    label: "Delivered",
  },
  {
    key: "completed",
    label: "Completed",
  },
];

const getStatusIndex = (
  status: string
) =>
  orderSteps.findIndex(
    (step) => step.key === status
  );

const getStatusBadge = (
  status: string
) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";

    case "accepted":
      return "bg-blue-100 text-blue-700";

    case "processing":
      return "bg-indigo-100 text-indigo-700";

    case "ready":
      return "bg-purple-100 text-purple-700";

    case "out_for_delivery":
      return "bg-orange-100 text-orange-700";

    case "delivered":
      return "bg-green-100 text-green-700";

    case "completed":
      return "bg-emerald-100 text-emerald-700";

    case "cancelled":
      return "bg-red-100 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

const OrderDetailsPage = () => {

  const { id } = useParams();

  const orderId = Number(id);

  if (!id || Number.isNaN(orderId)) {

    return (
      <Navigate
        to="/orders"
        replace
      />
    );

  }

  const {
    data: order,
    isLoading,
    isError,
  } = useOrder(orderId);

  if (isLoading) {

    return (

      <main className="mx-auto max-w-7xl px-6 py-20 text-center">

        <p className="text-lg font-semibold text-gray-600">

          Loading order...

        </p>

      </main>

    );

  }

  if (isError || !order) {

    return (

      <main className="mx-auto max-w-6xl px-6 py-16">

        <Card className="rounded-[30px] border-red-200 bg-red-50 p-10">

          <h2 className="text-3xl font-bold text-red-700">

            Order Not Found

          </h2>

          <p className="mt-4 text-red-600">

            The order you're looking for could not be found.

          </p>

          <Link
            to="/orders"
            className="mt-8 inline-flex rounded-xl bg-green-600 px-6 py-3 font-semibold text-white"
          >

            Back to Orders

          </Link>

        </Card>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-gradient-to-b from-green-50/50 via-white to-white">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* ====================================================== */}
        {/* HERO */}
        {/* ====================================================== */}

        <section className="relative overflow-hidden rounded-[36px]">

          <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-green-700 to-emerald-600" />

          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-16 left-10 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

          <div className="relative px-10 py-16 lg:px-16">

            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <span className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur">

                  Order Tracking

                </span>

                <h1 className="mt-8 text-5xl font-extrabold text-white lg:text-6xl">

                  Order #{order.id}

                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-green-100">

                  Track every stage of your marketplace order from
                  confirmation through delivery.

                </p>

              </div>

              <div className="rounded-[30px] bg-white/15 p-8 text-center backdrop-blur">

                <p className="text-sm uppercase tracking-widest text-green-100">

                  Current Status

                </p>

                <span
                  className={`mt-5 inline-flex rounded-full px-5 py-3 text-lg font-bold ${getStatusBadge(
                    order.status
                  )}`}
                >

                  {order.status
                    .replaceAll("_", " ")
                    .replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}

                </span>

              </div>

            </div>

          </div>

        </section>

        {/* ====================================================== */}
        {/* ORDER OVERVIEW */}
        {/* ====================================================== */}

        <section className="mt-10 grid gap-6 md:grid-cols-3">

          <Card className="rounded-[30px] p-8 shadow-lg">

            <p className="text-sm uppercase tracking-wide text-gray-500">

              Farmer

            </p>

            <h3 className="mt-3 text-2xl font-bold">

              {order.farmer}

            </h3>

          </Card>

          <Card className="rounded-[30px] p-8 shadow-lg">

            <p className="text-sm uppercase tracking-wide text-gray-500">

              Products

            </p>

            <h3 className="mt-3 text-3xl font-extrabold">

              {order.items.length}

            </h3>

          </Card>

          <Card className="rounded-[30px] p-8 shadow-lg">

            <p className="text-sm uppercase tracking-wide text-gray-500">

              Total

            </p>

            <h3 className="mt-3 text-3xl font-extrabold text-green-700">

              ₦{Number(order.total).toLocaleString()}

            </h3>

          </Card>

        </section>
                {/* ====================================================== */}
        {/* ORDER PROGRESS */}
        {/* ====================================================== */}

        <section className="mt-12">

          <Card className="rounded-[32px] border-0 p-10 shadow-xl">

            <h2 className="text-3xl font-bold">

              Order Progress

            </h2>

            <p className="mt-2 text-gray-500">

              Follow your order through every stage until delivery.

            </p>

            <div className="mt-10 space-y-8">

              {orderSteps.map((step, index) => {

                const completed =
                  index <= getStatusIndex(
                    order.status
                  );

                return (

                  <div
                    key={step.key}
                    className="flex items-center gap-6"
                  >

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${
                        completed
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >

                      {completed
                        ? "✓"
                        : index + 1}

                    </div>

                    <div>

                      <h3
                        className={`text-lg font-semibold ${
                          completed
                            ? "text-green-700"
                            : "text-gray-500"
                        }`}
                      >

                        {step.label}

                      </h3>

                    </div>

                  </div>

                );

              })}

            </div>

          </Card>

        </section>

        {/* ====================================================== */}
        {/* ORDER ITEMS */}
        {/* ====================================================== */}

        <section className="mt-12">

          <Card className="rounded-[32px] border-0 p-10 shadow-xl">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-3xl font-bold">

                  Order Items

                </h2>

                <p className="mt-2 text-gray-500">

                  Products included in this order.

                </p>

              </div>

              <span className="rounded-full bg-green-100 px-5 py-2 font-semibold text-green-700">

                {order.items.length} Item
                {order.items.length !== 1 ? "s" : ""}

              </span>

            </div>

            <div className="mt-10 space-y-6">

              {order.items.map((item) => (

                <div
                  key={item.id}
                  className="flex flex-col gap-6 rounded-[26px] border border-gray-100 p-6 transition hover:border-green-200 hover:shadow-lg md:flex-row md:items-center md:justify-between"
                >

                  <div>

                    <h3 className="text-xl font-bold text-gray-900">

                      {item.product_name}

                    </h3>

                    <p className="mt-3 text-gray-500">

                      ₦{Number(item.price).toLocaleString()} × {item.quantity}

                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm uppercase tracking-wide text-gray-400">

                      Subtotal

                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold text-green-700">

                      ₦{Number(item.subtotal).toLocaleString()}

                    </h3>

                  </div>

                </div>

              ))}

            </div>

          </Card>

        </section>

        {/* ====================================================== */}
        {/* PAYMENT SUMMARY */}
        {/* ====================================================== */}
                <section className="mt-10">

          <Card className="overflow-hidden rounded-[32px] border-0 shadow-xl">

            <div className="bg-green-50 px-10 py-8">

              <h2 className="text-3xl font-bold">

                Payment Summary

              </h2>

              <p className="mt-2 text-gray-500">

                Overview of your order payment.

              </p>

            </div>

            <div className="space-y-6 p-10">

              <div className="flex items-center justify-between">

                <span className="text-lg text-gray-600">

                  Products

                </span>

                <span className="font-semibold">

                  {order.items.length}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-lg text-gray-600">

                  Order Status

                </span>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusBadge(
                    order.status
                  )}`}
                >

                  {order.status
                    .replaceAll("_", " ")
                    .replace(/\b\w/g, (c) =>
                      c.toUpperCase()
                    )}

                </span>

              </div>

              <div className="border-t pt-8">

                <div className="flex items-center justify-between">

                  <span className="text-2xl font-bold">

                    Grand Total

                  </span>

                  <span className="text-4xl font-extrabold text-green-700">

                    ₦{Number(order.total).toLocaleString()}

                  </span>

                </div>

              </div>

            </div>

          </Card>

        </section>

        {/* ====================================================== */}
        {/* SUPPORT */}
        {/* ====================================================== */}

        <section className="mt-14 overflow-hidden rounded-[34px] bg-gradient-to-r from-green-700 via-green-600 to-emerald-600 text-white shadow-2xl">

          <div className="grid gap-10 p-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">

            <div>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">

                Need Assistance?

              </span>

              <h2 className="mt-6 text-4xl font-extrabold lg:text-5xl">

                We're Here To Help

              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-green-100">

                Have questions about your order, payment or delivery?
                Our support team and verified farmers are committed to
                ensuring you enjoy a smooth shopping experience from
                checkout to delivery.

              </p>

            </div>

            <div className="rounded-[30px] bg-white/15 p-8 backdrop-blur">

              <h3 className="text-2xl font-bold">

                Marketplace Promise

              </h3>

              <div className="mt-6 space-y-4 text-green-100">

                <div className="flex items-center gap-3">

                  <span className="text-xl">
                    🌾
                  </span>

                  Fresh Farm Produce

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-xl">
                    🚜
                  </span>

                  Verified Farmers

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-xl">
                    📦
                  </span>

                  Transparent Tracking

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-xl">
                    🔒
                  </span>

                  Secure Marketplace

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ====================================================== */}
        {/* ACTION BUTTONS */}
        {/* ====================================================== */}

        <section className="mt-12 flex flex-wrap justify-center gap-5">

          <Link
            to="/orders"
            className="rounded-2xl bg-green-600 px-8 py-4 font-bold text-white transition hover:bg-green-700"
          >

            Back To Orders

          </Link>

          <Link
            to="/products"
            className="rounded-2xl border border-green-600 px-8 py-4 font-bold text-green-700 transition hover:bg-green-50"
          >

            Continue Shopping

          </Link>

        </section>

      </div>

    </main>

  );

};

export default OrderDetailsPage;