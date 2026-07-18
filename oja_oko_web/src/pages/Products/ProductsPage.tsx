import { useState } from "react";

import { useDebounce } from "../../hooks/useDebounce";
import { useCategories } from "../../hooks/useCategories";
import { useProducts } from "../../hooks/useProducts";

import Pagination from "../../components/common/Pagination";
import ProductEmpty from "../../components/products/ProductEmpty";
import ProductGrid from "../../components/products/ProductGrid";
import ProductSkeleton from "../../components/products/ProductSkeleton";

const ProductsPage = () => {
  const [search, setSearch] =
    useState("");

  const debouncedSearch =
    useDebounce(search);

  const [category, setCategory] =
    useState("");

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");

  const [ordering, setOrdering] =
    useState("-created_at");

  const [page, setPage] =
    useState(1);

  const {
    data: categories = [],
  } = useCategories();

  const {
    data: products,
    isLoading,
    isError,
  } = useProducts({
    page,
    search: debouncedSearch,
    ordering,
    category: category
      ? Number(category)
      : undefined,
    price__gte: minPrice
      ? Number(minPrice)
      : undefined,
    price__lte: maxPrice
      ? Number(maxPrice)
      : undefined,
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setOrdering("-created_at");
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({
          length: 8,
        }).map((_, index) => (
          <ProductSkeleton
            key={index}
          />
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

  if (!products) {
    return null;
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold">
          Marketplace
        </h1>

        <p className="mt-2 text-gray-500">
          Buy fresh farm produce directly from verified farmers.
        </p>

      </div>
      {/* Category Quick Filters */}

<div className="space-y-3">

  <h2 className="text-lg font-semibold">
    Browse Categories
  </h2>


  <div className="flex flex-wrap gap-3">

    <button
      onClick={() => {
        setCategory("");
        setPage(1);
      }}
      className={`rounded-full px-5 py-2 text-sm font-medium transition ${
        category === ""
          ? "bg-green-600 text-white"
          : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      All
    </button>


    {categories.map(
      (item) => (

        <button
          key={item.id}
          onClick={() => {
            setCategory(
              String(item.id)
            );
            setPage(1);
          }}
          className={`rounded-full px-5 py-2 text-sm font-medium transition ${
            category === String(item.id)
              ? "bg-green-600 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >

          {item.name}

        </button>

      )
    )}

  </div>

</div>

      {/* Filters */}

      <div className="grid gap-4 rounded-xl bg-white p-6 shadow md:grid-cols-2 lg:grid-cols-5">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(
              e.target.value
            );
            setPage(1);
          }}
          className="rounded-lg border px-4 py-3"
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(
              e.target.value
            );
            setPage(1);
          }}
          className="rounded-lg border px-4 py-3"
        >
          <option value="">
            All Categories
          </option>

          {categories.map(
            (category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            )
          )}

        </select>

        <input
          type="number"
          placeholder="Min ₦"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(
              e.target.value
            );
            setPage(1);
          }}
          className="rounded-lg border px-4 py-3"
        />

        <input
          type="number"
          placeholder="Max ₦"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(
              e.target.value
            );
            setPage(1);
          }}
          className="rounded-lg border px-4 py-3"
        />

        <select
          value={ordering}
          onChange={(e) => {
            setOrdering(
              e.target.value
            );
            setPage(1);
          }}
          className="rounded-lg border px-4 py-3"
        >
          <option value="-created_at">
            Newest
          </option>

          <option value="price">
            Price: Low → High
          </option>

          <option value="-price">
            Price: High → Low
          </option>

          <option value="name">
            Name A-Z
          </option>

        </select>

      </div>
            {/* Toolbar */}

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">

        <p className="text-gray-500">
          {products.count} Product
          {products.count !== 1
            ? "s"
            : ""}
          {" "}
          Found
        </p>

        <button
          onClick={clearFilters}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-300"
        >
          Clear Filters
        </button>

      </div>


      {/* Products */}

      {products.results.length === 0 ? (

        <ProductEmpty />

      ) : (

        <>

          <ProductGrid
            products={
              products.results
            }
          />


          <Pagination
            page={page}
            total={products.count}
            pageSize={12}
            onPageChange={
              setPage
            }
          />

        </>

      )}


    </div>
  );
};


export default ProductsPage;