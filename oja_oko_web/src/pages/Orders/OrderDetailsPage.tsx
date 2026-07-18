import { Navigate, useParams } from "react-router-dom";

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
    label: "Out for Delivery",
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
) => {
  return orderSteps.findIndex(
    (step) => step.key === status
  );
};


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
      <main className="mx-auto max-w-6xl px-6 py-10">

        <p>
          Loading order...
        </p>

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



  return (

    <main className="mx-auto max-w-6xl px-6 py-10">


      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Order #{order.id}
        </h1>


        <p className="mt-2 text-gray-600">
          Farmer: {order.farmer}
        </p>


      </div>



      <Card>


        {/* Current Status */}

        <div className="mb-8 flex items-center justify-between">


          <span className="text-lg font-semibold">
            Status
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




        {/* Order Timeline */}

        <div className="mb-10">

          <h2 className="mb-6 text-xl font-semibold">
            Order Progress
          </h2>


          <div className="space-y-5">


            {orderSteps.map(
              (step, index) => {

                const completed =
                  index <=
                  getStatusIndex(
                    order.status
                  );


                return (

                  <div
                    key={step.key}
                    className="flex items-center gap-4"
                  >

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                        completed
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >

                      {completed
                        ? "✓"
                        : index + 1}

                    </div>


                    <span
                      className={
                        completed
                          ? "font-semibold text-green-700"
                          : "text-gray-500"
                      }
                    >

                      {step.label}

                    </span>


                  </div>

                );

              }

            )}


          </div>


        </div>




        {/* Items */}


        <div className="space-y-5">


          {order.items.map(
            (item) => (

              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >

                <div>

                  <h3 className="font-semibold">
                    {item.product_name}
                  </h3>


                  <p className="text-sm text-gray-500">

                    ₦
                    {Number(
                      item.price
                    ).toLocaleString()}

                    {" × "}

                    {item.quantity}

                  </p>


                </div>


                <span className="font-bold text-green-700">

                  ₦
                  {Number(
                    item.subtotal
                  ).toLocaleString()}

                </span>


              </div>

            )

          )}


        </div>




        {/* Total */}


        <div className="mt-8 flex items-center justify-between border-t pt-6">


          <span className="text-xl font-semibold">
            Total
          </span>


          <span className="text-3xl font-bold text-green-700">

            ₦
            {Number(
              order.total
            ).toLocaleString()}

          </span>


        </div>



      </Card>



    </main>

  );

};


export default OrderDetailsPage;