import EmptyState from "./EmptyState";

import { useFarmerProducts } from "../../hooks/useFarmerProducts";

const ProductTable = () => {
  const {
    data,
    isLoading,
  } = useFarmerProducts();

  const products = data?.results ?? [];

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        Loading products...
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">
              Product
            </th>

            <th className="px-6 py-4 text-left">
              Category
            </th>

            <th className="px-6 py-4 text-left">
              Quantity
            </th>

            <th className="px-6 py-4 text-left">
              Price
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-t"
            >
              <td className="px-6 py-4 font-medium">
                {product.name}
              </td>

              <td className="px-6 py-4">
                {product.category_name}
              </td>

              <td className="px-6 py-4">
                {product.quantity} {product.unit}
              </td>

              <td className="px-6 py-4">
                ₦{product.price}
              </td>

              <td className="px-6 py-4">
                {product.is_available ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Available
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                    Unavailable
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;