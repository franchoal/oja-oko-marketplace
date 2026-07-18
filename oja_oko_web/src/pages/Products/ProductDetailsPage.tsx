import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";

import { Button, Card } from "../../components/ui";

import { useProduct } from "../../hooks/useProduct";
import { useAddToCart } from "../../hooks/useAddToCart";
import { useReviews } from "../../hooks/useReviews";

import ReviewCard from "../../components/reviews/ReviewCard";
import ReviewForm from "../../components/reviews/ReviewForm";

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

  const {
    data: reviews = [],
  } = useReviews(productId);

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

const averageRating =
  product.average_rating ?? 0;

const reviewCount =
  product.review_count ?? reviews.length;
      return (
  <main className="mx-auto max-w-7xl px-6 py-10">

    <Link
      to="/products"
      className="mb-8 inline-flex font-medium text-green-700 hover:underline"
    >
      ← Back to Marketplace
    </Link>

    <div className="grid gap-10 lg:grid-cols-2">

      {/* Product Image */}

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

      {/* Product Details */}

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

          <div className="mt-4 flex items-center gap-3">

  <span className="text-yellow-500 text-xl">
    ⭐⭐⭐⭐⭐
  </span>

  <span className="font-bold">
    {Number(averageRating).toFixed(1)}
  </span>

  <span className="text-gray-500">
    (
    {reviewCount}
    {" "}
    review
    {reviewCount !== 1 ? "s" : ""}
    )
  </span>

</div>
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
  disabled={
    isPending ||
    !product.is_available
  }
>
  {isPending
    ? "Adding..."
    : product.is_available
      ? "Add To Cart"
      : "Unavailable"}
</Button>

</div>

</div>

{/* ===========================
    REVIEWS
=========================== */}

<section className="mt-20">

  <div className="mb-8 flex items-center justify-between">

    <div>

      <h2 className="text-3xl font-bold">
        Customer Reviews
      </h2>

      <p className="mt-2 text-gray-500">
        See what buyers are saying.
      </p>

    </div>

    <div className="text-right">

  <p className="text-3xl font-bold text-yellow-500">
  ⭐ {Number(averageRating).toFixed(1)}
</p>

<p className="text-sm text-gray-500">
  {reviewCount} Review
  {reviewCount !== 1 ? "s" : ""}
</p>

    </div>

  </div>

  <ReviewForm
    productId={product.id}
  />

  <div className="mt-10 space-y-5">

    {reviews.length === 0 ? (

      <Card className="p-10 text-center">

        <h3 className="text-xl font-semibold">
          No reviews yet
        </h3>

        <p className="mt-2 text-gray-500">
          Be the first buyer to review this product.
        </p>

      </Card>

    ) : (

      reviews.map((review) => (

        <ReviewCard
          key={review.id}
          review={review}
        />

      ))

    )}

  </div>

</section>
    </main>
  );
};

export default ProductDetailsPage;