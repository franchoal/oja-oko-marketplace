import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/products/ProductForm";

import { useFarmerProduct } from "../../hooks/useFarmerProduct";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";

import type { ProductFormData } from "../../validators/productSchemas";

const EditProductPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const productId = Number(id);

  const {
    data: product,
    isLoading,
    isError,
  } = useFarmerProduct(productId);

  const {
    mutate,
    isPending,
  } = useUpdateProduct(() => {
    navigate("/farmer");
  });

  useEffect(() => {
    if (id && Number.isNaN(productId)) {
      navigate("/farmer");
    }
  }, [id, productId, navigate]);

  const handleSubmit = (
    data: ProductFormData
  ) => {
    mutate({
      id: productId,

      data: {
        category: Number(data.category),
        name: data.name,
        description: data.description,
        price: Number(data.price),
        quantity: Number(data.quantity),
        unit: data.unit,
        image: data.image ?? undefined,
      },
    });
  };

  if (isLoading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <p>Loading product...</p>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-xl border border-red-200 bg-red-50 p-8">
          <h2 className="text-xl font-bold text-red-700">
            Product not found
          </h2>

          <p className="mt-2 text-red-600">
            Unable to load this product.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Edit Product
        </h1>

        <p className="mt-2 text-gray-600">
          Update your product information.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow">
        <ProductForm
          initialValues={{
            category: product.category,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            quantity: product.quantity,

            unit:
              product.unit as ProductFormData["unit"],
          }}
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          submitLabel="Update Product"
        />
      </div>
    </main>
  );
};

export default EditProductPage;