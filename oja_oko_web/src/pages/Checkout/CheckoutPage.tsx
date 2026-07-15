import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { Card, Button } from "../../components/ui";

import { useCart } from "../../hooks/useCart";
import { useCheckout } from "../../hooks/useCheckout";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const {
    data: cart,
    isLoading,
    isError,
  } = useCart();

  const {
    mutate: checkout,
    isPending,
  } = useCheckout();

  const [deliveryAddress, setDeliveryAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "bank_transfer"
  >("card");

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-lg">
          Loading checkout...
        </p>
      </main>
    );
  }

  if (isError || !cart) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Card className="border-red-200 bg-red-50 p-8">
          <h2 className="text-2xl font-bold text-red-700">
            Unable to load checkout
          </h2>

          <p className="mt-2 text-red-600">
            Please try again.
          </p>
        </Card>
      </main>
    );
  }

  const handleCheckout = () => {
    checkout(
      {
        delivery_address: deliveryAddress,
        payment_method: paymentMethod,
      },
      {
        onSuccess: () => {
          toast.success("Order placed successfully!");

          setTimeout(() => {
            navigate("/");
          }, 2000);
        },

        onError: (error: any) => {
          toast.error(
            error?.response?.data?.detail ??
              "Checkout failed."
          );
        },
      }
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Checkout
        </h1>

        <p className="mt-2 text-gray-600">
          Review your order before placing it.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <section className="space-y-5 lg:col-span-2">
          <Card>
            <h2 className="mb-6 text-2xl font-semibold">
              Order Summary
            </h2>

            <div className="space-y-5">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <h3 className="font-semibold">
                      {item.product_name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      ₦{Number(item.product_price).toLocaleString()} ×{" "}
                      {item.quantity}
                    </p>
                  </div>

                  <span className="font-bold text-green-700">
                    ₦{Number(item.subtotal).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="mb-4 text-xl font-semibold">
              Delivery Address
            </h2>

            <textarea
              rows={4}
              value={deliveryAddress}
              onChange={(e) =>
                setDeliveryAddress(e.target.value)
              }
              className="w-full rounded-lg border p-3"
              placeholder="Enter your delivery address"
            />
          </Card>

          <Card>
            <h2 className="mb-4 text-xl font-semibold">
              Payment Method
            </h2>

            <select
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value as
                    | "card"
                    | "bank_transfer"
                )
              }
              className="w-full rounded-lg border p-3"
            >
              <option value="card">Card</option>

              <option value="bank_transfer">
                Bank Transfer
              </option>
            </select>
          </Card>
        </section>

        <aside>
          <Card>
            <h2 className="mb-5 text-xl font-semibold">
              Payment Summary
            </h2>

            <div className="mb-6 flex items-center justify-between">
              <span>Total</span>

              <span className="text-2xl font-bold text-green-700">
                ₦{Number(cart.total).toLocaleString()}
              </span>
            </div>

            <Button
              className="w-full"
              onClick={handleCheckout}
              disabled={
                isPending ||
                !deliveryAddress.trim()
              }
            >
              {isPending
                ? "Placing Order..."
                : "Place Order"}
            </Button>
          </Card>
        </aside>
      </div>
    </main>
  );
};

export default CheckoutPage;