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
          {Number(
            total
          ).toLocaleString()}

        </span>


      </div>


      <Button
        className="mt-6 w-full"
      >
        Proceed to Checkout
      </Button>


    </Card>

  );

};


export default CartSummary;