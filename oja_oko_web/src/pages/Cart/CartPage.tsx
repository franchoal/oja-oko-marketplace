import { Link } from "react-router-dom";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

import { useCart } from "../../hooks/useCart";
import { useUpdateCartItem } from "../../hooks/useUpdateCartItem";
import { useRemoveCartItem } from "../../hooks/useRemoveCartItem";


const CartPage = () => {

  const {
    data: cart,
    isLoading,
    isError,
  } = useCart();


  const {
    mutate: updateCartItem,
  } = useUpdateCartItem();


  const {
    mutate: removeCartItem,
  } = useRemoveCartItem();



  if (isLoading) {

    return (

      <main className="mx-auto max-w-6xl px-6 py-10">

        <p className="text-lg">
          Loading cart...
        </p>

      </main>

    );

  }



  if (isError || !cart) {

    return (

      <main className="mx-auto max-w-6xl px-6 py-10">

        <div className="rounded-xl border border-red-200 bg-red-50 p-8">

          <h2 className="text-xl font-bold text-red-700">
            Unable to load cart
          </h2>


          <p className="mt-2 text-red-600">
            Please login and try again.
          </p>

        </div>

      </main>

    );

  }



  return (

    <main className="mx-auto max-w-7xl px-6 py-10">


      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          My Cart
        </h1>


        <p className="mt-2 text-gray-600">
          Review your selected farm products before checkout.
        </p>

      </div>



      {
        cart.items.length === 0 ? (

          <div className="rounded-xl border bg-white p-10 text-center shadow">

            <h2 className="text-2xl font-semibold">
              Your cart is empty
            </h2>


            <p className="mt-3 text-gray-500">
              Browse available farm products and add them to your cart.
            </p>


            <Link
              to="/products"
              className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
            >
              Go To Marketplace
            </Link>

          </div>


        ) : (


          <div className="grid gap-8 lg:grid-cols-3">


            {/* Items */}

            <section className="space-y-5 lg:col-span-2">


              {
                cart.items.map((item) => (

                  <CartItem

                    key={item.id}

                    item={item}


                    onUpdateQuantity={
                      (
                        id,
                        quantity
                      ) => {

                        updateCartItem({

                          id,

                          data: {
                            quantity,
                          },

                        });

                      }

                    }


                    onRemove={
                      removeCartItem
                    }

                  />

                ))

              }


            </section>



            {/* Summary */}

          <section className="space-y-5">

  <CartSummary
    total={cart.total}
  />

  <Link
    to="/checkout"
    className="block rounded-lg bg-green-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-green-700"
  >
    Proceed To Checkout
  </Link>

</section>


          </div>


        )

      }


    </main>

  );

};


export default CartPage;