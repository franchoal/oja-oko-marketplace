import { Link } from "react-router-dom";

import {
  BadgeCheck,
  CreditCard,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { Button, Card } from "../ui";

interface CartSummaryProps {
  total: string;
}

const CartSummary = ({
  total,
}: CartSummaryProps) => {
  return (
    <Card className="sticky top-28 rounded-3xl border border-gray-100 bg-white p-7 shadow-lg">

      {/* Header */}

      <div>

        <h2 className="text-2xl font-bold text-gray-900">
          Order Summary
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Review your purchase before proceeding to checkout.
        </p>

      </div>

      {/* Divider */}

      <div className="my-7 border-t" />

      {/* Subtotal */}

      <div className="flex items-center justify-between">

        <span className="text-gray-600">
          Subtotal
        </span>

        <span className="font-semibold text-gray-900">
          ₦{Number(total).toLocaleString()}
        </span>

      </div>

      {/* Delivery */}

      <div className="mt-5 flex items-center justify-between">

        <span className="flex items-center gap-2 text-gray-600">

          <Truck size={18} />

          Delivery

        </span>

        <span className="font-medium text-green-700">
          Calculated at checkout
        </span>

      </div>

      {/* Divider */}

      <div className="my-7 border-t" />

      {/* Total */}

      <div className="flex items-center justify-between">

        <span className="text-lg font-semibold text-gray-900">
          Total
        </span>

        <span className="text-4xl font-extrabold text-green-700">
          ₦{Number(total).toLocaleString()}
        </span>

      </div>

      {/* Checkout */}

      <Link
        to="/checkout"
        className="mt-8 block"
      >

        <Button className="flex w-full items-center justify-center gap-2 py-4 text-base">

          <CreditCard size={20} />

          Proceed to Checkout

        </Button>

      </Link>

      {/* Trust Section */}

      <div className="mt-8 space-y-4 rounded-2xl bg-green-50 p-5">

        <div className="flex items-center gap-3">

          <ShieldCheck
            size={20}
            className="text-green-700"
          />

          <span className="text-sm text-gray-700">
            Secure checkout process
          </span>

        </div>

        <div className="flex items-center gap-3">

          <BadgeCheck
            size={20}
            className="text-green-700"
          />

          <span className="text-sm text-gray-700">
            Quality products from verified farmers
          </span>

        </div>

        <div className="flex items-center gap-3">

          <Truck
            size={20}
            className="text-green-700"
          />

          <span className="text-sm text-gray-700">
            Fast and reliable nationwide delivery
          </span>

        </div>

      </div>

    </Card>
  );
};

export default CartSummary;