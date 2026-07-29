import { Navigate, useNavigate, useParams } from "react-router-dom";

import ProductForm from "../../components/products/ProductForm";

import { useFarmerProduct } from "../../hooks/useFarmerProduct";
import { useUpdateProduct } from "../../hooks/useUpdateProduct";

import type {
  ProductFormData,
} from "../../validators/productSchemas";

const EditProductPage = () => {

  const { id } = useParams();

  const navigate = useNavigate();

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

    navigate(
      "/farmer/dashboard",
      {
        replace: true,
      }
    );

  });

  if (!id || Number.isNaN(productId)) {

    return (
      <Navigate
        to="/farmer/dashboard"
        replace
      />
    );

  }

  if (isLoading) {

    return (

      <main className="mx-auto max-w-3xl px-6 py-8">

        <p>Loading product...</p>

      </main>

    );

  }

  if (isError || !product) {

    return (

      <main className="mx-auto max-w-3xl px-6 py-8">

        <p className="text-red-600">
          Unable to load product.
        </p>

      </main>

    );

  }

  const handleSubmit = (
    data: ProductFormData
  ) => {

    mutate({

      id: product.id,

      data,

    });

  };

  return (

    <main className="mx-auto max-w-3xl px-6 py-8">

      <h1 className="mb-6 text-3xl font-bold">

        Edit Product

      </h1>

      <div className="rounded-2xl bg-white p-8 shadow">

        <ProductForm
          onSubmit={handleSubmit}
          isSubmitting={isPending}
          initialValues={{
            category: product.category,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            quantity: product.quantity,
            unit: product.unit as ProductFormData["unit"],
            image: null,
          }}
          submitLabel="Update Product"
        />

      </div>

    </main>

  );

};

export default EditProductPage;