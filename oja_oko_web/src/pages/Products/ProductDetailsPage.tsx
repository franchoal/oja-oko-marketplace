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

    {/* Breadcrumb */}

    <Link
      to="/products"
      className="mb-8 inline-flex items-center text-sm font-semibold text-green-700 transition hover:text-green-800"
    >
      ← Back to Marketplace
    </Link>

    <div className="grid gap-12 lg:grid-cols-2"></div>

      {/* ================= IMAGE ================= */}

      <Card className="overflow-hidden rounded-3xl p-0 shadow-xl">

        <div className="relative">

          <img
            src={
              product.image ??
              "/placeholder-product.png"
            }
            alt={product.name}
            className="h-[560px] w-full object-cover"
          />

          <div className="absolute left-6 top-6">

            <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-green-700 shadow">

              {product.category_name}

            </span>

          </div>

          <div className="absolute bottom-6 left-6">

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold shadow ${
                product.is_available
                  ? "bg-green-600 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {product.is_available
                ? "In Stock"
                : "Out of Stock"}
            </span>

          </div>

        </div>

      </Card>

      {/* ================= DETAILS ================= */}

      <div className="space-y-7"></div>

     {/* ================= DETAILS ================= */}

<div className="space-y-8">

  <div>

    <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
      {product.name}
    </h1>

    <p className="mt-3 text-lg text-gray-500">
      Fresh produce supplied by
      <span className="ml-1 font-semibold text-green-700">
        {product.farmer}
      </span>
    </p>

  </div>

  {/* Rating */}

  <div className="flex flex-wrap items-center gap-4">

    <div className="flex items-center gap-2">

      <span className="text-2xl text-yellow-500">
        ⭐
      </span>

      <span className="text-xl font-bold">
        {Number(averageRating).toFixed(1)}
      </span>

    </div>

    <span className="text-gray-500">

      {reviewCount} Review
      {reviewCount !== 1 ? "s" : ""}

    </span>

  </div>

  {/* Price */}

  <div className="rounded-3xl bg-green-50 p-6">

    <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
      Price
    </p>

    <h2 className="mt-2 text-5xl font-extrabold text-green-700">

      ₦{Number(product.price).toLocaleString()}

    </h2>

  </div>

  {/* Product Information */}

  <Card className="rounded-3xl">

    <h2 className="mb-6 text-2xl font-bold">
      Product Information
    </h2>

    <div className="grid gap-5 sm:grid-cols-2">

      <div>

        <p className="text-sm text-gray-500">
          Category
        </p>

        <p className="mt-1 font-semibold">
          {product.category_name}
        </p>

      </div>

      <div>

        <p className="text-sm text-gray-500">
          Quantity Available
        </p>

        <p className="mt-1 font-semibold">
          {product.quantity} {product.unit}
        </p>

      </div>

      <div>

        <p className="text-sm text-gray-500">
          Seller
        </p>

        <p className="mt-1 font-semibold">
          {product.farmer}
        </p>

      </div>

      <div>

        <p className="text-sm text-gray-500">
          Availability
        </p>

        <p
          className={`mt-1 font-semibold ${
            product.is_available
              ? "text-green-700"
              : "text-red-600"
          }`}
        >
          {product.is_available
            ? "Available"
            : "Unavailable"}
        </p>

      </div>

    </div>

  </Card>

  {/* Description */}

  <Card className="rounded-3xl">

    <h2 className="mb-5 text-2xl font-bold">
      Description
    </h2>

    <p className="leading-8 text-gray-600">

      {product.description}

    </p>

  </Card>

  {/* CTA */}

  <Button
    className="w-full py-4 text-lg"
    onClick={handleAddToCart}
    disabled={
      isPending ||
      !product.is_available
    }
  >

    {isPending
      ? "Adding to Cart..."
      : product.is_available
      ? "Add To Cart"
      : "Currently Unavailable"}

  </Button>

</div>
{/* ================= REVIEWS ================= */}

<section className="mt-24">

  <div className="mb-12 flex flex-col justify-between gap-6 rounded-3xl bg-gradient-to-r from-green-700 to-green-600 p-8 text-white lg:flex-row lg:items-center">

    <div>

      <h2 className="text-4xl font-extrabold">
        Customer Reviews
      </h2>

      <p className="mt-3 text-green-100">
        Genuine feedback from verified buyers helps other customers make informed decisions.
      </p>

    </div>

    <div className="rounded-3xl bg-white/15 px-8 py-6 backdrop-blur">

      <p className="text-5xl font-extrabold">

        ⭐ {Number(averageRating).toFixed(1)}

      </p>

      <p className="mt-2 text-center text-green-100">

        {reviewCount} Review
        {reviewCount !== 1 ? "s" : ""}

      </p>

    </div>

  </div>

  {/* Review Form */}

  <Card className="mb-10 rounded-3xl">

    <h3 className="mb-6 text-2xl font-bold">
      Leave a Review
    </h3>

    <ReviewForm
      productId={product.id}
    />

  </Card>

  {/* Reviews */}

  {reviews.length === 0 ? (

    <Card className="rounded-3xl py-16 text-center">

      <div className="mx-auto max-w-xl">

        <h3 className="text-2xl font-bold text-gray-800">

          No Reviews Yet

        </h3>

        <p className="mt-4 leading-7 text-gray-500">

          This product has not received any reviews yet.
          Be the first customer to share your experience.

        </p>

      </div>

    </Card>

  ) : (

    <div className="space-y-6">

      {reviews.map((review) => (

        <ReviewCard
          key={review.id}
          review={review}
        />

      ))}

    </div>

  )}

</section>

</main>

  );
};

export default ProductDetailsPage;