import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";

import { Button, Card } from "../ui";

import type { CartItem as CartItemType } from "../../types/cart";

interface CartItemProps {
  item: CartItemType;

  onUpdateQuantity: (
    id: number,
    quantity: number
  ) => void;

  onRemove: (
    id: number
  ) => void;
}

const CartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) => {
  return (
    <Card className="rounded-3xl border border-gray-100 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

        {/* Product Icon */}

        <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-green-50 to-green-100">

          <ShoppingBasket
            size={42}
            className="text-green-700"
          />

        </div>

        {/* Product Details */}

        <div className="flex-1">

          <p className="text-sm font-medium uppercase tracking-wider text-green-600">

            Farm Produce

          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">

            {item.product_name}

          </h2>

          <p className="mt-3 text-sm text-gray-500">

            Unit Price

          </p>

          <p className="mt-1 text-3xl font-extrabold text-green-700">

            ₦{Number(item.product_price).toLocaleString()}

          </p>

        </div>

        {/* Quantity */}

        <div className="flex flex-col items-center gap-3">

          <span className="text-sm font-semibold uppercase tracking-wide text-gray-500">

            Quantity

          </span>

          <div className="flex items-center overflow-hidden rounded-2xl border border-gray-200">

            <button
              type="button"
              onClick={() =>
                onUpdateQuantity(
                  item.id,
                  item.quantity - 1
                )
              }
              disabled={item.quantity <= 1}
              className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus size={18} />
            </button>

            <div className="flex h-12 w-16 items-center justify-center border-x font-bold text-lg">

              {item.quantity}

            </div>

            <button
              type="button"
              onClick={() =>
                onUpdateQuantity(
                  item.id,
                  item.quantity + 1
                )
              }
              className="flex h-12 w-12 items-center justify-center transition hover:bg-gray-100"
            >
              <Plus size={18} />
            </button>

          </div>

        </div>

        {/* Total */}

        <div className="flex flex-col items-end gap-5">

          <div>

            <p className="text-sm text-gray-500">

              Subtotal

            </p>

            <h3 className="text-3xl font-extrabold text-green-700">

              ₦{Number(item.subtotal).toLocaleString()}

            </h3>

          </div>

          <Button
            type="button"
            variant="danger"
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-2"
          >
            <Trash2 size={18} />

            Remove
          </Button>

        </div>

      </div>

    </Card>
  );
};

export default CartItem;