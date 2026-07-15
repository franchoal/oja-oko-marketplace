import { Link } from "react-router-dom";

import type { Product } from "../../types/product";
import { Card, Button } from "../ui";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden p-0">
      <img
        src={product.image ?? "/placeholder-product.png"}
        alt={product.name}
        className="h-56 w-full object-cover"
      />

      <div className="space-y-3 p-5">
        <div>
          <h3 className="text-lg font-semibold">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500">
            {product.category_name}
          </p>
        </div>

        <p className="text-sm text-gray-600">
          Farmer: {product.farmer}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-700">
            ₦{Number(product.price).toLocaleString()}
          </span>

          <span className="text-sm">
            {product.quantity} {product.unit}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              product.is_available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.is_available
              ? "Available"
              : "Unavailable"}
          </span>

          <Link to={`/products/${product.id}`}>
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