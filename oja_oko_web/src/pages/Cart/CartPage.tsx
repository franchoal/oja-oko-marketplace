import { Link } from "react-router-dom";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

import { useCart } from "../../hooks/useCart";
import { useUpdateCartItem } from "../../hooks/useUpdateCartItem";
import { useRemoveCartItem } from "../../hooks/useRemoveCartItem";

const CartPage = () => {
  const {
    data: cart,
    isLoading,
    isError,
  } = useCart();

  const {
    mutate: updateCartItem,
  } = useUpdateCartItem();

  const {
    mutate: removeCartItem,
  } = useRemoveCartItem();

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading cart...
        </p>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-lg font-semibold text-red-600">
          Failed to load cart.
        </p>
      </main>
    );
  }

  if (!cart) {
    return null;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      {/* ================= HERO ================= */}

      <section className="mb-12 overflow-hidden rounded-[32px] bg-gradient-to-r from-green-700 via-green-600 to-green-500 px-10 py-14 text-white">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-100">
            Shopping Cart
          </p>

          <h1 className="text-5xl font-extrabold leading-tight">
            Review Your Selected Products
          </h1>

          <p className="mt-5 text-lg leading-8 text-green-100">
            Confirm quantities, remove unwanted products, and proceed securely
            to checkout when you're ready.
          </p>
        </div>
      </section>

      {/* ================= HEADER ================= */}

      <div className="mb-10 flex flex-col justify-between gap-5 rounded-3xl bg-white p-8 shadow-sm md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            My Cart
          </h2>

          <p className="mt-2 text-gray-500">
            {cart.items.length} Item
            {cart.items.length !== 1 ? "s" : ""} in your cart
          </p>
        </div>

        <Link
          to="/products"
          className="rounded-xl border border-green-600 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
        >
          Continue Shopping
        </Link>
      </div>

      {cart.items.length === 0 ? (
        <section className="rounded-[32px] bg-white px-10 py-20 text-center shadow">
          <div className="mx-auto max-w-xl">
            <div className="mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-green-100 text-5xl">
              🛒
            </div>

            <h2 className="text-4xl font-bold text-gray-900">
              Your Cart is Empty
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-500">
              You haven't added any farm products yet. Browse our marketplace
              and discover fresh produce directly from verified Nigerian
              farmers.
            </p>

            <Link
              to="/products"
              className="mt-10 inline-flex rounded-2xl bg-green-600 px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-green-700 hover:shadow-xl"
            >
              Browse Marketplace
            </Link>
          </div>
        </section>
      ) : (
        <div className="grid gap-10 lg:grid-cols-3">
          {/* ================= CART ITEMS ================= */}

          <section className="space-y-6 lg:col-span-2">
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(id, quantity) => {
                  updateCartItem({
                    id,
                    data: {
                      quantity,
                    },
                  });
                }}
                onRemove={removeCartItem}
              />
            ))}
          </section>

          {/* ================= ORDER SUMMARY ================= */}

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[28px] bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                Order Summary
              </h2>

              <CartSummary total={cart.total ?? 0} />
            </div>
          </aside>
        </div>
      )}
    </main>
  );
};

export default CartPage;