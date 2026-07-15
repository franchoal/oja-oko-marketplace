import { Link } from "react-router-dom";

import { Card } from "../../components/ui";

import { useOrders } from "../../hooks/useOrders";

const OrdersPage = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useOrders();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-lg">
          Loading orders...
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Card className="border-red-200 bg-red-50 p-8">
          <h2 className="text-2xl font-bold text-red-700">
            Unable to load orders
          </h2>

          <p className="mt-2 text-red-600">
            Please try again later.
          </p>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          My Orders
        </h1>

        <p className="mt-2 text-gray-600">
          View and track your previous orders.
        </p>
      </div>

      {!orders || orders.length === 0 ? (
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-semibold">
            No orders yet
          </h2>

          <p className="mt-2 text-gray-500">
            Once you place an order, it will appear here.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
          >
            Continue Shopping
          </Link>
        </Card>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="flex items-center justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">
                  Order #{order.id}
                </h2>

                <p className="text-gray-500">
                  Farmer: {order.farmer}
                </p>

                <p className="text-gray-500">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-green-700">
                  ₦
                  {Number(
                    order.total
                  ).toLocaleString()}
                </p>

                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                  {order.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default OrdersPage;