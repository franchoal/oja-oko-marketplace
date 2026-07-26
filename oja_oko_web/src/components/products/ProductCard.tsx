import { Link } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  MapPin,
  Star,
} from "lucide-react";

import type { Product } from "../../types/product";
import { Button, Card } from "../ui";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({
  product,
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden rounded-3xl border border-gray-100 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-2xl">

      {/* ================= IMAGE ================= */}

      <div className="relative overflow-hidden">

        <img
          src={
            product.image ||
            "/placeholder-product.png"
          }
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "/placeholder-product.png";
          }}
          className="h-64 w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Category */}

        <div className="absolute left-4 top-4">

          <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-green-700 shadow backdrop-blur">

            <Leaf size={14} />

            {product.category_name}

          </span>

        </div>

        {/* Availability */}

        <div className="absolute right-4 top-4">

          <span
            className={`rounded-full px-4 py-2 text-xs font-bold shadow ${
              product.is_available
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {product.is_available
              ? "Available Now"
              : "Out of Stock"}
          </span>

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="space-y-6 p-6">

        {/* Product */}

        <div>

          <h3 className="min-h-[64px] line-clamp-2 text-2xl font-bold leading-tight text-gray-900">

            {product.name}

          </h3>

          <div className="mt-4">

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">

              Sold by

            </p>

            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">

              <MapPin
                size={15}
                className="text-green-600"
              />

              <span className="font-medium">

                {product.farmer}

              </span>

            </div>

          </div>

        </div>

        {/* ================= RATINGS ================= */}

        <div className="flex items-center justify-between">

          {product.review_count > 0 ? (

            <div className="flex items-center gap-2">

              <div className="flex items-center gap-1 text-amber-500">

                <Star
                  size={18}
                  fill="currentColor"
                />

                <span className="font-bold text-gray-900">

                  {product.average_rating.toFixed(
                    1
                  )}

                </span>

              </div>

              <span className="text-sm text-gray-500">

                ({product.review_count} review
                {product.review_count !== 1
                  ? "s"
                  : ""})

              </span>

            </div>

          ) : (

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">

              New Arrival

            </span>

          )}

        </div>

        {/* ================= PRICE ================= */}

        <div className="flex items-end justify-between rounded-2xl border border-gray-100 bg-gray-50 p-5">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">

              Starting From

            </p>

            <h2 className="mt-1 text-3xl font-extrabold text-green-700">

              ₦
              {Number(
                product.price
              ).toLocaleString()}

            </h2>

          </div>

          <div className="rounded-xl bg-white px-4 py-3 text-center shadow-sm">

            <p className="text-xs text-gray-500">

              Available

            </p>

            <p className="font-bold text-gray-800">

              {product.quantity}{" "}
              {product.unit}

            </p>

          </div>

        </div>

        {/* ================= FOOTER ================= */}

        <div className="flex items-center justify-between border-t border-gray-100 pt-5">

          <span
            className={`rounded-full px-4 py-2 text-xs font-bold ${
              product.is_available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.is_available
              ? "Ready to Order"
              : "Unavailable"}
          </span>

          <Link
            to={`/products/${product.id}`}
          >
            <Button className="flex items-center gap-2 rounded-xl px-6 transition-all group-hover:bg-green-700">

              View Product

              <ArrowRight size={16} />

            </Button>

          </Link>

        </div>

      </div>

    </Card>
  );
};

export default ProductCard;