const ProductEmpty = () => {
  return (
    <div className="rounded-xl border border-dashed py-16 text-center">
      <h2 className="text-2xl font-semibold">
        No Products Available
      </h2>

      <p className="mt-3 text-gray-500">
        Farmers haven't listed any products yet.
      </p>
    </div>
  );
};

export default ProductEmpty;