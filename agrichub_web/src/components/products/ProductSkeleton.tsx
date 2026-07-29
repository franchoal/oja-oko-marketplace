const ProductSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl border p-4">
      <div className="mb-4 h-52 rounded bg-gray-200" />

      <div className="mb-3 h-5 rounded bg-gray-200" />

      <div className="mb-3 h-4 w-2/3 rounded bg-gray-200" />

      <div className="h-4 w-1/3 rounded bg-gray-200" />
    </div>
  );
};

export default ProductSkeleton;