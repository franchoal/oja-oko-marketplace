import { Link } from "react-router-dom";

import type {
  FarmerProduct,
} from "../../services/farmerService";

import { Button, Card } from "../ui";

interface FarmerProductCardProps {
  product: FarmerProduct;
  onDelete: (id: number) => void;
}

const FarmerProductCard = ({
  product,
  onDelete,
}: FarmerProductCardProps) => {

  return (

    <Card className="overflow-hidden p-0">

      {/* Product Image */}

      <div className="h-56 bg-gray-100">

        {product.image ? (

          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />

        ) : (

          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No Image
          </div>

        )}

      </div>

      {/* Product Details */}

      <div className="space-y-4 p-5">

        <div>

          <h3 className="text-lg font-semibold">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500">
            {product.category_name}
          </p>

        </div>

        <p className="line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="flex items-center justify-between">

          <span className="text-2xl font-bold text-green-700">
            ₦{product.price}
          </span>

          <span className="text-sm text-gray-500">
            {product.quantity} {product.unit}
          </span>

        </div>

        {/* Availability */}

        <div>

          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
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

        {/* Actions */}

        <div className="flex gap-3">

          <Link
            to={`/farmer/products/${product.id}/edit`}
            className="flex-1"
          >
            <Button className="w-full">
              Edit
            </Button>
          </Link>

          <Button
            type="button"
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => onDelete(product.id)}
          >
            Delete
          </Button>

        </div>

      </div>

    </Card>

  );

};

export default FarmerProductCard;