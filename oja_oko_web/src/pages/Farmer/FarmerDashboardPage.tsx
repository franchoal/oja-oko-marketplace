import { Link, Navigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import { useFarmerOrders } from "../../hooks/useFarmerOrders";

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
  data: orders = [],
} = useFarmerOrders();

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
      {/* Dashboard Statistics */}

<div className="mb-10 grid gap-5 md:grid-cols-4">

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      Products
    </p>

    <h2 className="mt-2 text-3xl font-bold text-green-700">
      {products.length}
    </h2>
  </div>

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      Orders
    </p>

    <h2 className="mt-2 text-3xl font-bold text-blue-700">
      {orders.length}
    </h2>
  </div>

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      Pending
    </p>

    <h2 className="mt-2 text-3xl font-bold text-yellow-600">
      {
        orders.filter(
          (o) => o.status === "pending"
        ).length
      }
    </h2>
  </div>

  <div className="rounded-xl bg-white p-6 shadow">
    <p className="text-sm text-gray-500">
      Completed
    </p>

    <h2 className="mt-2 text-3xl font-bold text-emerald-700">
      {
        orders.filter(
          (o) => o.status === "completed"
        ).length
      }
    </h2>
  </div>

</div>

{/* Quick Actions */}

<div className="mb-10 grid gap-5 md:grid-cols-3">

  <Link
    to="/farmer/products/create"
    className="rounded-xl bg-green-600 p-6 text-white shadow transition hover:bg-green-700"
  >
    <h2 className="text-xl font-semibold">
      ➕ Add Product
    </h2>

    <p className="mt-2 text-sm text-green-100">
      List a new product.
    </p>
  </Link>

  <Link
    to="/farmer/orders"
    className="rounded-xl bg-white p-6 shadow transition hover:bg-green-50"
  >
    <h2 className="text-xl font-semibold text-green-700">
      🛒 Customer Orders
    </h2>

    <p className="mt-2 text-sm text-gray-600">
      Manage incoming orders.
    </p>
  </Link>

  <Link
    to="/notifications"
    className="rounded-xl bg-white p-6 shadow transition hover:bg-green-50"
  >
    <h2 className="text-xl font-semibold text-green-700">
      🔔 Notifications
    </h2>

    <p className="mt-2 text-sm text-gray-600">
      View recent notifications.
    </p>
  </Link>

</div>
      {/* Recent Orders */}

<section className="mb-10 rounded-xl bg-white p-8 shadow">

  <div className="mb-6 flex items-center justify-between">

    <h2 className="text-2xl font-semibold">
      Recent Orders
    </h2>

    <Link
      to="/farmer/orders"
      className="text-green-700 hover:underline"
    >
      View All →
    </Link>

  </div>

  {orders.length === 0 ? (

    <p className="text-gray-500">
      No customer orders yet.
    </p>

  ) : (

    <div className="space-y-4">

      {orders.slice(0, 5).map((order) => (

        <div
          key={order.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >

          <div>

            <h3 className="font-semibold">
              Order #{order.id}
            </h3>

            <p className="text-sm text-gray-500">
              Buyer: {order.buyer}
            </p>

          </div>

          <div className="text-right">

            <p className="font-semibold text-green-700">
              ₦{Number(order.total).toLocaleString()}
            </p>

            <p className="text-sm text-gray-500">
              {order.status.replaceAll("_", " ")}
            </p>

          </div>

        </div>

      ))}

    </div>

  )}

</section>
   <Link
  to="/farmer/products"
  className="rounded-xl bg-white p-6 shadow hover:bg-green-50"
>
  <h2 className="text-xl font-semibold text-green-700">
    📦 My Products
  </h2>

  <p className="mt-2 text-sm text-gray-600">
    View and manage products.
  </p>
</Link>

<Link
  to="/farmer/profile"
  className="rounded-xl bg-white p-6 shadow hover:bg-green-50"
>
  <h2 className="text-xl font-semibold text-green-700">
    👨‍🌾 Farm Profile
  </h2>

  <p className="mt-2 text-sm text-gray-600">
    Update your farm details.
  </p>
</Link>

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