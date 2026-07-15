import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import { Button, Card } from "../../components/ui";

import { useProduct } from "../../hooks/useProduct";
import { useAddToCart } from "../../hooks/useAddToCart";


const ProductDetailsPage = () => {

  const { id } = useParams();

  const productId = Number(id);


  const {
    mutate: addToCart,
    isPending,
  } = useAddToCart();



  if (!id || Number.isNaN(productId)) {
    return (
      <Navigate
        to="/products"
        replace
      />
    );
  }


  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(productId);



  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-lg">
          Loading product...
        </p>
      </main>
    );
  }



  if (isError || !product) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-10">

        <Card className="border-red-200 bg-red-50 p-8">

          <h2 className="text-2xl font-bold text-red-700">
            Product not found
          </h2>


          <p className="mt-3 text-red-600">
            The requested product could not be found.
          </p>


          <Link
            to="/products"
            className="mt-6 inline-block text-green-700 hover:underline"
          >
            ← Back to Marketplace
          </Link>


        </Card>

      </main>
    );
  }



  const handleAddToCart = () => {

    addToCart({

      product: product.id,

      quantity: 1,

    });

  };



  return (
    <main className="mx-auto max-w-7xl px-6 py-10">


      <Link
        to="/products"
        className="mb-8 inline-flex font-medium text-green-700 hover:underline"
      >
        ← Back to Marketplace
      </Link>



      <div className="grid gap-10 lg:grid-cols-2">


        <Card className="overflow-hidden p-0">

          <img
            src={
              product.image ??
              "/placeholder-product.png"
            }
            alt={product.name}
            className="h-[500px] w-full object-cover"
          />

        </Card>



        <div className="space-y-6">


          <div>

            <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

              {product.category_name}

            </span>


            <h1 className="mt-4 text-4xl font-bold">

              {product.name}

            </h1>


            <p className="mt-2 text-gray-600">

              Sold by{" "}

              <span className="font-semibold">

                {product.farmer}

              </span>

            </p>


          </div>



          <p className="text-4xl font-bold text-green-700">

            ₦{Number(product.price).toLocaleString()}

          </p>



          <div>

            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                product.is_available
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >

              {product.is_available
                ? "Available"
                : "Unavailable"}

            </span>

          </div>



          <Card>

            <h2 className="mb-4 text-xl font-semibold">
              Product Information
            </h2>


            <div className="space-y-3">

              <p>

                <span className="font-semibold">
                  Category:
                </span>{" "}

                {product.category_name}

              </p>


              <p>

                <span className="font-semibold">
                  Quantity:
                </span>{" "}

                {product.quantity} {product.unit}

              </p>


            </div>

          </Card>



          <Card>

            <h2 className="mb-4 text-xl font-semibold">
              Description
            </h2>


            <p className="leading-7 text-gray-600">

              {product.description}

            </p>


          </Card>



          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={isPending}
          >

            {isPending
              ? "Adding..."
              : "Add To Cart"}

          </Button>


        </div>


      </div>


    </main>
  );
};


export default ProductDetailsPage;