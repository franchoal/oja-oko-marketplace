import { Navigate, useParams } from "react-router-dom";

import { Card, Button } from "../../components/ui";

import { useFarmerOrder } from "../../hooks/useFarmerOrder";
import { useUpdateFarmerOrder } from "../../hooks/useUpdateFarmerOrder";

const FarmerOrderDetailsPage = () => {
  const { id } = useParams();

  const orderId = Number(id);

  if (!id || Number.isNaN(orderId)) {
    return (
      <Navigate
        to="/farmer/orders"
        replace
      />
    );
  }

  const {
    data: order,
    isLoading,
    isError,
  } = useFarmerOrder(orderId);

  const {
    mutate: updateOrder,
    isPending,
  } = useUpdateFarmerOrder();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p>Loading order...</p>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Card className="border-red-200 bg-red-50 p-8">
          <h2 className="text-2xl font-bold text-red-700">
            Order not found
          </h2>
        </Card>
      </main>
    );
  }

  const nextStatus: Record<string, string> = {
    pending: "accepted",
    accepted: "processing",
    processing: "ready",
    ready: "out_for_delivery",
    out_for_delivery: "delivered",
    delivered: "completed",
  };

  const nextLabel: Record<string, string> = {
    pending: "Accept Order",
    accepted: "Start Processing",
    processing: "Mark Ready",
    ready: "Dispatch Order",
    out_for_delivery: "Mark Delivered",
    delivered: "Complete Order",
  };

  const canUpdate = Boolean(nextStatus[order.status]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Order #{order.id}
        </h1>

        <p className="mt-2 text-gray-600">
          Buyer: {order.buyer}
        </p>

        <p className="mt-1 text-gray-600">
          Status:
          <span className="ml-2 font-semibold">
            {order.status
              .replaceAll("_", " ")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </span>
        </p>
      </div>

      <Card>
        <div className="space-y-5">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <h3 className="font-semibold">
                  {item.product_name}
                </h3>

                <p className="text-gray-500">
                  ₦{Number(item.price).toLocaleString()} ×{" "}
                  {item.quantity}
                </p>
              </div>

              <span className="font-bold text-green-700">
                ₦{Number(item.subtotal).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between border-t pt-6">
          <span className="text-xl font-semibold">
            Total
          </span>

          <span className="text-3xl font-bold text-green-700">
            ₦{Number(order.total).toLocaleString()}
          </span>
        </div>
      </Card>

      {canUpdate && (
        <Card className="mt-6">
          <Button
            className="w-full"
            disabled={isPending}
            onClick={() =>
              updateOrder({
                id: order.id,
                data: {
                  status: nextStatus[
                    order.status
                  ] as
                    | "accepted"
                    | "processing"
                    | "ready"
                    | "out_for_delivery"
                    | "delivered"
                    | "completed",
                },
              })
            }
          >
            {isPending
              ? "Updating..."
              : nextLabel[order.status]}
          </Button>
        </Card>
      )}
    </main>
  );
};

export default FarmerOrderDetailsPage;