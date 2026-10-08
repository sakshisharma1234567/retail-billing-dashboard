import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Package,
  Plus,
  Search,
  X,
} from "lucide-react";

import { initialProducts } from "../data/products";
import type { Product, ProductStatus } from "../types/product";

interface ProductsProps {
  onBack: () => void;
}

interface ProductForm {
  name: string;
  category: string;
  price: string;
  stock: string;
}

const PRODUCTS_PER_PAGE = 5;

function Products({ onBack }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<ProductForm>({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(initialProducts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(products.map((product) => product.category))
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  );

  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const getStatus = (stock: number): ProductStatus => {
    if (stock === 0) return "Out of Stock";
    if (stock <= 10) return "Low Stock";
    return "In Stock";
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleAddProduct = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setFormError("");

    const name = form.name.trim();
    const productCategory = form.category.trim();
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !name ||
      !productCategory ||
      !form.price ||
      !form.stock
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (price <= 0) {
      setFormError("Price must be greater than 0.");
      return;
    }

    if (stock < 0 || !Number.isInteger(stock)) {
      setFormError(
        "Stock must be a whole number of 0 or more."
      );
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name,
      category: productCategory,
      price,
      stock,
      status: getStatus(stock),
    };

    setProducts((previousProducts) => [
      ...previousProducts,
      newProduct,
    ]);

    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
    });

    setShowModal(false);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F6F3ED]">

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#E2DDD5] bg-[#F6F3ED]/95 backdrop-blur">
        <div className="mx-auto flex min-h-[76px] max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={onBack}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#D9D3CA] bg-white text-[#4F565D] transition hover:bg-[#EFEBE4]"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#20252B] sm:text-2xl">
                Products
              </h1>

              <p className="mt-0.5 text-sm text-[#737B84]">
                Manage your retail products
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setFormError("");
              setShowModal(true);
            }}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#D97706] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B85F05] hover:shadow-md"
          >
            <Plus size={18} />

            <span className="hidden sm:inline">
              Add Product
            </span>

            <span className="sm:hidden">
              Add
            </span>
          </button>

        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">

        {/* Intro */}
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-[#20252B]">
            Product Management
          </h2>

          <p className="mt-1 text-sm text-[#737B84]">
            View, search and manage products in your inventory.
          </p>
        </div>

        {/* Filters */}
        <section className="rounded-2xl border border-[#E2DDD5] bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">

            <div className="relative flex-1">

              <Search
                size={18}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9299A0]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  handleSearch(event.target.value)
                }
                placeholder="Search products by name..."
                className="h-11 w-full rounded-xl border border-[#DDD7CE] bg-[#FAF9F7] pl-10 pr-4 text-sm text-[#20252B] outline-none transition placeholder:text-[#9A9FA5] focus:border-[#D97706] focus:bg-white focus:ring-4 focus:ring-[#FDECCF]"
              />

            </div>

            <div className="w-full lg:w-56">
              <select
                value={category}
                onChange={(event) =>
                  handleCategoryChange(event.target.value)
                }
                className="h-11 w-full rounded-xl border border-[#DDD7CE] bg-[#FAF9F7] px-4 text-sm font-medium text-[#4F565D] outline-none transition focus:border-[#D97706] focus:bg-white focus:ring-4 focus:ring-[#FDECCF]"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item === "All"
                      ? "All Categories"
                      : item}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </section>

        {/* Table */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-[#E2DDD5] bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-[#E8E3DB] px-5 py-4">
            <div>
              <h3 className="font-semibold text-[#20252B]">
                Products
              </h3>

              <p className="mt-0.5 text-xs text-[#737B84]">
                {filteredProducts.length} products available
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#E6E1D9] border-t-[#D97706]" />

              <p className="mt-4 text-sm font-medium text-[#4F565D]">
                Loading products...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex min-h-[360px] flex-col items-center justify-center px-5 text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1EEE8] text-[#8B9299]">
                <Package size={25} />
              </div>

              <h3 className="mt-4 font-semibold text-[#20252B]">
                No products found
              </h3>

              <p className="mt-1 text-sm text-[#737B84]">
                No products match your current filters.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                  setCurrentPage(1);
                }}
                className="mt-4 text-sm font-semibold text-[#C26200] hover:text-[#A94F00]"
              >
                Clear filters
              </button>

            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden overflow-x-auto md:block">

                <table className="w-full">

                  <thead>
                    <tr className="border-b border-[#E8E3DB] bg-[#FAF9F7]">

                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#737B84]">
                        Product
                      </th>

                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#737B84]">
                        Category
                      </th>

                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#737B84]">
                        Price
                      </th>

                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#737B84]">
                        Stock
                      </th>

                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#737B84]">
                        Status
                      </th>

                    </tr>
                  </thead>

                  <tbody>
                    {visibleProducts.map((product) => (
                      <tr
                        key={product.id}
                        className="border-b border-[#EEEAE4] last:border-0 transition hover:bg-[#FCFBF9]"
                      >

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF3E0] text-[#D97706]">
                              <Package size={17} />
                            </div>

                            <span className="text-sm font-semibold text-[#20252B]">
                              {product.name}
                            </span>

                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-[#59616A]">
                          {product.category}
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-[#20252B]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-[#4F565D]">
                          {product.stock}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={product.status} />
                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              {/* Mobile */}
              <div className="divide-y divide-[#EEEAE4] md:hidden">

                {visibleProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-5"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF3E0] text-[#D97706]">
                          <Package size={18} />
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-[#20252B]">
                            {product.name}
                          </h3>

                          <p className="mt-1 text-xs text-[#737B84]">
                            {product.category}
                          </p>
                        </div>

                      </div>

                      <StatusBadge status={product.status} />

                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">

                      <div className="rounded-xl bg-[#FAF9F7] p-3">
                        <p className="text-xs text-[#737B84]">
                          Price
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#20252B]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#FAF9F7] p-3">
                        <p className="text-xs text-[#737B84]">
                          Stock
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#20252B]">
                          {product.stock}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}

              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-3 border-t border-[#E8E3DB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-sm text-[#737B84]">
                  Showing{" "}
                  <span className="font-semibold text-[#4F565D]">
                    {(currentPage - 1) * PRODUCTS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-[#4F565D]">
                    {Math.min(
                      currentPage * PRODUCTS_PER_PAGE,
                      filteredProducts.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#4F565D]">
                    {filteredProducts.length}
                  </span>
                </p>

                <div className="flex items-center gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(1, page - 1)
                      )
                    }
                    disabled={currentPage === 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD7CE] bg-white text-[#59616A] transition hover:bg-[#F5F1EB] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  <div className="rounded-lg bg-[#F1EEE8] px-3 py-2 text-xs font-semibold text-[#4F565D]">
                    Page {currentPage} of {totalPages}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(totalPages, page + 1)
                      )
                    }
                    disabled={currentPage === totalPages}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD7CE] bg-white text-[#59616A] transition hover:bg-[#F5F1EB] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <ChevronRight size={17} />
                  </button>

                </div>
              </div>
            </>
          )}
        </section>
      </main>

      {/* Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20252B]/50 px-4 py-6">

          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

            <div className="flex items-start justify-between border-b border-[#E5E0D8] px-6 py-5">

              <div>
                <h2 className="text-lg font-bold text-[#20252B]">
                  Add Product
                </h2>

                <p className="mt-1 text-sm text-[#737B84]">
                  Add a new product to your inventory
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-[#8B9299] transition hover:bg-[#F1EEE8] hover:text-[#4F565D]"
              >
                <X size={19} />
              </button>

            </div>

            <form
              onSubmit={handleAddProduct}
              className="p-6"
            >

              <div className="space-y-4">

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#4F565D]">
                    Product Name
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="e.g. Wireless Mouse"
                    className="h-11 w-full rounded-xl border border-[#DDD7CE] bg-[#FAF9F7] px-4 text-sm outline-none transition focus:border-[#D97706] focus:bg-white focus:ring-4 focus:ring-[#FDECCF]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#4F565D]">
                    Category
                  </label>

                  <input
                    type="text"
                    value={form.category}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        category: event.target.value,
                      })
                    }
                    placeholder="e.g. Electronics"
                    className="h-11 w-full rounded-xl border border-[#DDD7CE] bg-[#FAF9F7] px-4 text-sm outline-none transition focus:border-[#D97706] focus:bg-white focus:ring-4 focus:ring-[#FDECCF]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4F565D]">
                      Price
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          price: event.target.value,
                        })
                      }
                      placeholder="e.g. 799"
                      className="h-11 w-full rounded-xl border border-[#DDD7CE] bg-[#FAF9F7] px-4 text-sm outline-none transition focus:border-[#D97706] focus:bg-white focus:ring-4 focus:ring-[#FDECCF]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#4F565D]">
                      Stock
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={form.stock}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          stock: event.target.value,
                        })
                      }
                      placeholder="e.g. 25"
                      className="h-11 w-full rounded-xl border border-[#DDD7CE] bg-[#FAF9F7] px-4 text-sm outline-none transition focus:border-[#D97706] focus:bg-white focus:ring-4 focus:ring-[#FDECCF]"
                    />
                  </div>

                </div>

                {formError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {formError}
                  </div>
                )}

              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-[#DDD7CE] px-5 py-2.5 text-sm font-semibold text-[#4F565D] transition hover:bg-[#F5F1EB]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#D97706] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B85F05]"
                >
                  Add Product
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: ProductStatus;
}) {
  const styles: Record<ProductStatus, string> = {
    "In Stock": "bg-emerald-50 text-emerald-600",
    "Low Stock": "bg-amber-50 text-amber-600",
    "Out of Stock": "bg-red-50 text-red-600",
  };

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default Products;