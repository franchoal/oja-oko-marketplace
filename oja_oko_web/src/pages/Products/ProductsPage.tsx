import ProductEmpty from "../../components/products/ProductEmpty";
import ProductGrid from "../../components/products/ProductGrid";
import ProductSkeleton from "../../components/products/ProductSkeleton";

import { useProducts } from "../../hooks/useProducts";

const ProductsPage = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useProducts();

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <h2 className="text-xl font-semibold text-red-700">
          Failed to load products
        </h2>

        <p className="mt-2 text-red-600">
          Please try again later.
        </p>
      </div>
    );
  }

  if (!products?.length) {
    return <ProductEmpty />;
  }

  return <ProductGrid products={products} />;
};

export default ProductsPage;