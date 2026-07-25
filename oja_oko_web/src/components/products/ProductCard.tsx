import { Link } from "react-router-dom";
import {
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

    <Card className="group overflow-hidden rounded-3xl border border-gray-100 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* ================= IMAGE ================= */}

      <div className="relative overflow-hidden">

        <img
          src={
            product.image ??
            "/placeholder-product.png"
          }
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Category */}

        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-green-700 backdrop-blur">

          <Leaf size={14} />

          {product.category_name}

        </span>

        {/* Availability */}

        <span
          className={`absolute right-4 top-4 rounded-full px-4 py-2 text-xs font-bold shadow ${
            product.is_available
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {product.is_available
            ? "Available"
            : "Out of Stock"}
        </span>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="space-y-5 p-6">

        {/* Product */}

        <div>

          <h3 className="line-clamp-1 text-2xl font-bold text-gray-900">

            {product.name}

          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

            <MapPin size={15} />

            <span>

              {product.farmer}

            </span>

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

              </div>

              <span className="font-semibold text-gray-900">

                {product.average_rating.toFixed(1)}

              </span>

              <span className="text-sm text-gray-500">

                ({product.review_count} review
                {product.review_count !== 1 ? "s" : ""})

              </span>

            </div>

          ) : (

            <span className="text-sm italic text-gray-400">

              No reviews yet

            </span>

          )}

        </div>

        {/* ================= PRICE ================= */}

        <div className="flex items-end justify-between border-t border-gray-100 pt-5">

          <div>

            <p className="text-xs uppercase tracking-wide text-gray-400">

              Price

            </p>

            <h3 className="text-3xl font-extrabold text-green-700">

              ₦{Number(product.price).toLocaleString()}

            </h3>

          </div>

          <div className="rounded-xl bg-gray-100 px-4 py-2 text-center">

            <p className="text-xs text-gray-500">

              Quantity

            </p>

            <p className="font-semibold text-gray-800">

              {product.quantity} {product.unit}

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
              ? "In Stock"
              : "Out of Stock"}
          </span>

          <Link
            to={`/products/${product.id}`}
          >
            <Button className="rounded-xl px-6">
              View Details
            </Button>
          </Link>

        </div>

      </div>

    </Card>

  );

};

export default ProductCard;