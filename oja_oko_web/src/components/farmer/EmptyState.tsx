import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-16 text-center">
      <h3 className="text-2xl font-semibold text-gray-800">
        No Products Yet
      </h3>

      <p className="mt-3 text-gray-600">
        You haven't listed any farm products yet.
        Start selling by adding your first product.
      </p>

      <Link
        to="/products/create"
        className="mt-8 inline-block rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
      >
        Add Your First Product
      </Link>
    </div>
  );
};

export default EmptyState;