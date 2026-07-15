import { Link, Navigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

import { useFarmerProducts } from "../../hooks/useFarmerProducts";
import { useDeleteProduct } from "../../hooks/useDeleteProduct";

import FarmerProductCard from "../../components/products/FarmerProductCard";

import { useFarmerProfile } from "../../hooks/useFarmerProfile";

const FarmerDashboardPage = () => {
  const user = useAuthStore(
    (state) => state.user
  );

  const {
    data: products = [],
    isLoading,
  } = useFarmerProducts();

  const {
    data: profile,
  } = useFarmerProfile();

  const {
    mutate: deleteProduct,
  } = useDeleteProduct();

  /**
   * Only authenticated farmers
   * can access this page.
   */
  if (
    !user ||
    user.role !== "farmer"
  ) {
    return (
      <Navigate
        to="/products"
        replace
      />
    );
  }

  /**
   * Confirm before deleting.
   */
  const handleDelete = (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) return;

    deleteProduct(id);
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-8">

      {/* Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">
          Welcome, {user.first_name || "Farmer"}
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your farm, products and marketplace activities.
        </p>
      {/* Verification Status */}

{profile && (
  <div
    className={`mb-10 rounded-xl border p-5 ${
      profile.is_verified
        ? "border-green-200 bg-green-50"
        : "border-yellow-200 bg-yellow-50"
    }`}
  >
    <h2
      className={`text-lg font-semibold ${
        profile.is_verified
          ? "text-green-700"
          : "text-yellow-700"
      }`}
    >
      {profile.is_verified
        ? "✅ Farmer Verified"
        : "⏳ Verification Pending"}
    </h2>

    <p
      className={`mt-2 text-sm ${
        profile.is_verified
          ? "text-green-700"
          : "text-yellow-700"
      }`}
    >
      {profile.is_verified
        ? "Your account has been verified. Any product marked as available will be visible in the marketplace."
        : "Your profile is awaiting administrator approval. You can continue adding and managing products, but they won't appear in the marketplace until your account has been verified."
      }
    </p>
  </div>
)}

      </div>

      {/* Quick Actions */}

      <div className="mb-10 grid gap-5 md:grid-cols-3">

        <Link
          to="/farmer/products/create"
          className="rounded-xl bg-green-600 p-6 text-white shadow transition hover:bg-green-700"
        >
          <h2 className="text-xl font-semibold">
            Add Product
          </h2>

          <p className="mt-2 text-sm text-green-100">
            List a new farm product for sale.
          </p>
        </Link>

        <Link
          to="/farmer/profile"
          className="rounded-xl border border-green-600 bg-white p-6 shadow transition hover:bg-green-50"
        >
          <h2 className="text-xl font-semibold text-green-700">
            Farm Profile
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Update your farm information.
          </p>
        </Link>

        <div className="rounded-xl border bg-white p-6 shadow">

          <h2 className="text-xl font-semibold">
            Analytics
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Coming soon...
          </p>

        </div>

      </div>

      {/* Products */}

      <section className="rounded-xl bg-white p-8 shadow">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-semibold">
            My Products
          </h2>

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            {products.length} Product
            {products.length !== 1 ? "s" : ""}
          </span>

        </div>

        {isLoading ? (

          <p>Loading products...</p>

        ) : products.length === 0 ? (

          <div className="py-16 text-center">

            <p className="mb-6 text-gray-500">
              You haven't added any products yet.
            </p>

            <Link
              to="/farmer/products/create"
              className="inline-block rounded-lg bg-green-600 px-6 py-3 text-white hover:bg-green-700"
            >
              Add Your First Product
            </Link>

          </div>

        ) : (

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {products.map((product) => (

              <FarmerProductCard
                key={product.id}
                product={product}
                onDelete={handleDelete}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
};

export default FarmerDashboardPage;