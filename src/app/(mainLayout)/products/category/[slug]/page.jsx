"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  PackageSearch,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductCard from "@/components/mainLayout/products/ProductCard/ProductCard";
import { getCategories, getProducts } from "@/lib/api";

// ---------- helpers ----------

function normalizeCategories(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function normalizeProductsResponse(payload) {
  return {
    products: Array.isArray(payload?.products) ? payload.products : [],
    page: payload?.page || 1,
    pages: payload?.pages || 1,
    total: payload?.total || 0,
  };
}

// ---------- component ----------

export default function CategoryProductsPage() {
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // "idle" | "loading" | "success" | "error" | "not-found"
  const [status, setStatus] = useState("idle");

  const fetchData = useCallback(
    async (page) => {
      setStatus("loading");

      try {
        // Run both requests in parallel — find the matching category while
        // loading products so the heading is ready as soon as data arrives.
        const [categoriesPayload, productsPayload] = await Promise.all([
          getCategories(),
          getProducts({ category: slug, page, limit: 12 }),
        ]);

        const allCategories = normalizeCategories(categoriesPayload);
        const matched = allCategories.find((c) => c.slug === slug);

        if (!matched) {
          setStatus("not-found");
          return;
        }

        const {
          products: productList,
          page: pg,
          pages,
          total,
        } = normalizeProductsResponse(productsPayload);

        setCategory(matched);
        setProducts(productList);
        setCurrentPage(pg);
        setTotalPages(pages);
        setTotalCount(total);
        setStatus("success");
      } catch (error) {
        console.error("Failed to load category products:", error);
        setStatus("error");
      }
    },
    [slug],
  );

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchData(page);
  };

  // ---------- render states ----------

  if (status === "idle" || status === "loading") {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
        <Breadcrumbs />
        <main className="flex-grow flex flex-col items-center justify-center gap-4 py-24">
          <Loader2 className="h-8 w-8 animate-spin text-[#005CA9]" />
          <p className="text-sm font-semibold text-gray-500">
            Loading products...
          </p>
        </main>
      </div>
    );
  }

  if (status === "not-found") {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
        <Breadcrumbs />
        <main className="flex-grow flex flex-col items-center justify-center gap-4 py-24 text-center px-4">
          <PackageSearch className="h-12 w-12 text-gray-300" />
          <h1 className="text-2xl font-black text-gray-800">
            Category Not Found
          </h1>
          <p className="text-gray-500 text-sm max-w-sm">
            The category{" "}
            <span className="font-semibold text-gray-700">
              &ldquo;{slug}&rdquo;
            </span>{" "}
            doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href="/products"
            className="mt-2 inline-flex items-center gap-2 bg-[#005CA9] hover:bg-[#004480] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
          >
            Browse All Products
          </Link>
        </main>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
        <Breadcrumbs />
        <main className="flex-grow flex flex-col items-center justify-center gap-4 py-24 text-center px-4">
          <AlertCircle className="h-12 w-12 text-red-400" />
          <h1 className="text-2xl font-black text-gray-800">
            Something Went Wrong
          </h1>
          <p className="text-gray-500 text-sm max-w-sm">
            We couldn&apos;t load this category right now. Please try again.
          </p>
          <button
            onClick={() => fetchData(currentPage)}
            className="mt-2 inline-flex items-center gap-2 bg-primary hover:bg-[#d1171e] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </main>
      </div>
    );
  }

  // ---------- success ----------

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] font-sans">
      <Breadcrumbs />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <span className="text-xs font-bold text-[#005CA9] uppercase tracking-wider block mb-1">
            Browse Category
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-gray-500 text-sm mt-2 max-w-2xl leading-relaxed">
              {category.description}
            </p>
          )}
          <p className="text-gray-400 text-xs font-semibold mt-3">
            {totalCount} {totalCount === 1 ? "product" : "products"} found
          </p>
        </div>

        {/* Empty State */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <PackageSearch className="h-12 w-12 text-gray-300" />
            <h2 className="text-lg font-black text-gray-700">
              No Products Found
            </h2>
            <p className="text-gray-500 text-sm max-w-xs">
              There are no products in the{" "}
              <span className="font-semibold text-gray-700">
                {category.name}
              </span>{" "}
              category yet. Check back soon.
            </p>
            <Link
              href="/products"
              className="mt-2 inline-flex items-center gap-2 bg-[#005CA9] hover:bg-[#004480] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id || product.id}
                  product={product}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`h-9 w-9 rounded-lg text-sm font-bold transition-colors ${
                        page === currentPage
                          ? "bg-[#005CA9] text-white shadow-sm"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                      aria-label={`Go to page ${page}`}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
