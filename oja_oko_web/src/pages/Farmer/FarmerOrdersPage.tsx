import { Link } from "react-router-dom";

import { Card } from "../../components/ui";

import { useFarmerOrders } from "../../hooks/useFarmerOrders";

const getStatusBadge = (status: string) => {
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

const FarmerOrdersPage = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useFarmerOrders();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p>Loading orders...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Card className="border-red-200 bg-red-50 p-8">
          <h2 className="text-xl font-bold text-red-700">
            Unable to load orders
          </h2>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Customer Orders
        </h1>

        <p className="mt-2 text-gray-600">
          Orders placed for your farm products.
        </p>
      </div>

      {!orders || orders.length === 0 ? (
        <Card className="p-8 text-center">

          <h2 className="text-2xl font-semibold">
            No orders yet
          </h2>

          <p className="mt-2 text-gray-500">
            Orders from buyers will appear here.
          </p>

        </Card>
      ) : (
        <div className="space-y-5">

          {orders.map((order) => (
            <Card
              key={order.id}
              className="flex items-center justify-between"
            >

              <div>

                <h2 className="font-semibold">
                  Order #{order.id}
                </h2>

                <p className="text-gray-500">
                  Buyer: {order.buyer}
                </p>

                <p className="text-gray-500">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </p>

              </div>

              <div className="text-right">

                <p className="text-xl font-bold text-green-700">
                  ₦{Number(order.total).toLocaleString()}
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${getStatusBadge(
                    order.status
                  )}`}
                >
                  {order.status
                    .replaceAll("_", " ")
                    .replace(/\b\w/g, c => c.toUpperCase())}
                </span>

                <div className="mt-3">

                  <Link
                    to={`/farmer/orders/${order.id}`}
                    className="text-green-700 hover:underline"
                  >
                    View →
                  </Link>

                </div>

              </div>

            </Card>
          ))}

        </div>
      )}
    </main>
  );
};

export default FarmerOrdersPage;