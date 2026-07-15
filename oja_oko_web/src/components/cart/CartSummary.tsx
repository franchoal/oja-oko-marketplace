import { Link } from "react-router-dom";

import { Button, Card } from "../ui";

interface CartSummaryProps {
  total: string;
}

const CartSummary = ({
  total,
}: CartSummaryProps) => {
  return (
    <Card className="p-6">

      <h2 className="text-xl font-semibold">
        Cart Summary
      </h2>

      <div className="mt-6 flex items-center justify-between">

        <span className="text-gray-600">
          Total
        </span>

        <span className="text-2xl font-bold text-green-700">
          ₦
          {Number(total).toLocaleString()}
        </span>

      </div>

      <Link
        to="/checkout"
        className="mt-6 block"
      >
        <Button className="w-full">
          Proceed to Checkout
        </Button>
      </Link>

    </Card>
  );
};

export default CartSummary;