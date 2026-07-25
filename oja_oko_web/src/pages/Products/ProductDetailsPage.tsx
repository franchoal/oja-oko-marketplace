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
 {/* ================= Product Information ================= */}

<Card className="overflow-hidden rounded-[30px] border-0 shadow-lg">

  <div className="border-b bg-green-50 px-8 py-6">

    <h2 className="text-2xl font-bold text-gray-900">
      📦 Product Information
    </h2>

    <p className="mt-2 text-gray-500">
      Important details about this product.
    </p>

  </div>

  <div className="divide-y">

    <div className="flex items-center justify-between px-8 py-5">

      <span className="font-medium text-gray-500">
        Category
      </span>

      <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">

        {product.category_name}

      </span>

    </div>

    <div className="flex items-center justify-between px-8 py-5">

      <span className="font-medium text-gray-500">
        Quantity Available
      </span>

      <span className="font-bold text-gray-900">

        {product.quantity} {product.unit}

      </span>

    </div>

    <div className="flex items-center justify-between px-8 py-5">

      <span className="font-medium text-gray-500">
        Availability
      </span>

      <span
        className={`rounded-full px-4 py-2 text-sm font-bold ${
          product.is_available
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >

        {product.is_available
          ? "Available"
          : "Out of Stock"}

      </span>

    </div>

    <div className="flex items-center justify-between px-8 py-5">

      <span className="font-medium text-gray-500">
        Farmer
      </span>

      <span className="font-semibold text-gray-900">

        {product.farmer}

      </span>

    </div>

  </div>

</Card>

{/* ================= Description ================= */}

<Card className="overflow-hidden rounded-[30px] border-0 shadow-lg">

  <div className="border-b bg-green-50 px-8 py-6">

    <h2 className="text-2xl font-bold text-gray-900">
      📝 Product Description
    </h2>

    <p className="mt-2 text-gray-500">
      Learn more about this farm product.
    </p>

  </div>

  <div className="space-y-6 px-8 py-8">

    <p className="leading-8 text-gray-600">

      {product.description}

    </p>

    <div className="grid gap-4 sm:grid-cols-2">

      <div className="rounded-2xl bg-green-50 p-5">

        <h3 className="font-semibold text-green-700">

          🌱 Farm Fresh

        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">

          Carefully harvested and supplied directly by verified farmers.

        </p>

      </div>

      <div className="rounded-2xl bg-yellow-50 p-5">

        <h3 className="font-semibold text-yellow-700">

          🚚 Fast Delivery

        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">

          Delivered fresh with quality preserved from farm to doorstep.

        </p>

      </div>

    </div>

  </div>

</Card>

<Button
  className="mt-2 w-full py-4 text-lg font-bold"
  onClick={handleAddToCart}
  disabled={
    isPending ||
    !product.is_available
  }
>

  {isPending
    ? "Adding to Cart..."
    : product.is_available
      ? "🛒 Add To Cart"
      : "Currently Unavailable"}

</Button>

</div>
 {/* ================= Reviews Header ================= */}

<div className="mb-10 overflow-hidden rounded-[32px] bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white shadow-xl">

  <div className="grid gap-8 p-8 lg:grid-cols-[1fr_auto] lg:items-center">

    {/* Left */}

    <div>

      <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold backdrop-blur">

        Customer Feedback

      </span>

      <h2 className="mt-5 text-4xl font-extrabold">

        Customer Reviews

      </h2>

      <p className="mt-4 max-w-2xl leading-8 text-green-100">

        Read genuine experiences from buyers who have purchased this
        product. Honest reviews help everyone make better purchasing
        decisions.

      </p>

    </div>

    {/* Right */}

    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">

      <div className="rounded-3xl bg-white/15 p-6 text-center backdrop-blur">

        <p className="text-5xl font-extrabold">

          ⭐ {Number(averageRating).toFixed(1)}

        </p>

        <p className="mt-2 text-green-100">

          Average Rating

        </p>

      </div>

      <div className="rounded-3xl bg-white/15 p-6 text-center backdrop-blur">

        <p className="text-5xl font-extrabold">

          {reviewCount}

        </p>

        <p className="mt-2 text-green-100">

          Review{reviewCount !== 1 ? "s" : ""}

        </p>

      </div>

    </div>

  </div>

</div>
  {/* Review Form */}
<section className="mt-20">
<div className="mb-12">

  <ReviewForm
    productId={product.id}
  />

</div>

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