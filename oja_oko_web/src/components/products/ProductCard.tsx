import { Link } from "react-router-dom";

import type { Product } from "../../types/product";
import { Button, Card } from "../ui";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({
  product,
}: ProductCardProps) => {
  return (
    <Card className="overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}
      <img
        src={
          product.image ??
          "/placeholder-product.png"
        }
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="space-y-4 p-5">

        {/* Category */}
        <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          {product.category_name}
        </span>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900">
          {product.name}
        </h3>

        {/* Farmer */}
        <p className="text-sm text-gray-600">
          <span className="font-medium">
            Farmer:
          </span>{" "}
          {product.farmer}
        </p>

        {/* Ratings */}
        <div className="flex items-center justify-between">

          {product.review_count > 0 ? (
            <>
              <div className="flex items-center gap-1">

                <span className="text-lg text-yellow-500">
                  ⭐
                </span>

                <span className="font-semibold">
                  {product.average_rating.toFixed(
                    1
                  )}
                </span>

              </div>

              <span className="text-sm text-gray-500">
                {product.review_count} review
                {product.review_count !== 1
                  ? "s"
                  : ""}
              </span>
            </>
          ) : (
            <span className="text-sm italic text-gray-400">
              No reviews yet
            </span>
          )}

        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between">

          <span className="text-2xl font-bold text-green-700">
            ₦
            {Number(
              product.price
            ).toLocaleString()}
          </span>

          <span className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-600">
            {product.quantity}{" "}
            {product.unit}
          </span>

        </div>

        {/* Availability & Button */}
        <div className="flex items-center justify-between">

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              product.is_available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.is_available
              ? "Available"
              : "Unavailable"}
          </span>

          <Link
            to={`/products/${product.id}`}
          >
            <Button>
              View Details
            </Button>
          </Link>

        </div>

      </div>

    </Card>
  );
};

export default ProductCard;