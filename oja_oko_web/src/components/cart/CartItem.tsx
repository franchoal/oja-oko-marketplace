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

    <Card className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between">


      {/* Product Information */}

      <div>

        <h3 className="text-lg font-semibold">
          {item.product_name}
        </h3>


        <p className="mt-1 text-sm text-gray-500">

          ₦
          {Number(
            item.product_price
          ).toLocaleString()}

          {" "}each

        </p>


      </div>



      {/* Quantity Controls */}

      <div className="flex items-center gap-3">


        <Button
          type="button"
          onClick={() =>
            onUpdateQuantity(
              item.id,
              item.quantity - 1
            )
          }
          disabled={
            item.quantity <= 1
          }
        >
          -
        </Button>



        <span className="min-w-10 text-center font-semibold">

          {item.quantity}

        </span>



        <Button
          type="button"
          onClick={() =>
            onUpdateQuantity(
              item.id,
              item.quantity + 1
            )
          }
        >
          +
        </Button>


      </div>



      {/* Subtotal + Remove */}

      <div className="flex items-center gap-5">


        <span className="text-lg font-bold text-green-700">

          ₦
          {Number(
            item.subtotal
          ).toLocaleString()}

        </span>



        <Button
          type="button"
          variant="danger"
          onClick={() =>
            onRemove(item.id)
          }
        >
          Remove
        </Button>


      </div>


    </Card>

  );

};


export default CartItem;