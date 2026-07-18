import { useNavigate } from "react-router-dom";

import ProductForm from "../../components/products/ProductForm";

import { useCreateProduct } from "../../hooks/useCreateProduct";

import type { ProductFormData } from "../../validators/productSchemas";

const CreateProductPage = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useCreateProduct(() => {
    navigate("/farmer");
  });

  const handleSubmit = (data: ProductFormData) => {
    mutate({
      category: Number(data.category),
      name: data.name,
      description: data.description,
      price: Number(data.price),
      quantity: Number(data.quantity),
      unit: data.unit,
      image: data.image ?? null,
    });
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Add Product
        </h1>

        <p className="mt-2 text-gray-600">
          List a new product for buyers on Oja-Oko Marketplace.
        </p>
      </div>

      <div className="rounded-2xl bg-white p-8 shadow">
        <ProductForm
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          submitLabel="Create Product"
        />
      </div>
    </main>
  );
};

export default CreateProductPage;