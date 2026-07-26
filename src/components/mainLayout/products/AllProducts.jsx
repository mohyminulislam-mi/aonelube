"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "./ProductCard/ProductCard";
import { useSearchParams } from "next/navigation";

// Resolve category ID from a product regardless of whether category is
// a populated object, a plain ID string, or null.
function getCategoryId(product) {
  const cat = product?.category;
  if (!cat) return null;
  if (typeof cat === "object") return cat._id || cat.id || null;
  return cat; // already a plain string ID
}

export default function AllProductsPage({
  initialProducts = [],
  initialCategories = [],
}) {
  const products = Array.isArray(initialProducts) ? initialProducts : [];
  const categories = Array.isArray(initialCategories) ? initialCategories : [];

  // Compute dynamic max price ceiling from actual product prices
  const productMaxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    const max = Math.max(...products.map((p) => Number(p.price) || 0));
    return Math.ceil(max / 100) * 100 || 1000;
  }, [products]);

  const searchParams = useSearchParams();
  const searchParamQuery = searchParams ? searchParams.get("search") || "" : "";

  // States
  const [searchQuery, setSearchQuery] = useState(searchParamQuery);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchQuery(searchParamQuery);
    }, 0);
    return () => clearTimeout(t);
  }, [searchParamQuery]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [maxPrice, setMaxPrice] = useState(productMaxPrice);
  const [sortBy, setSortBy] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const priceStep =
    productMaxPrice > 1000 ? 100 : productMaxPrice > 100 ? 50 : 10;

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch =
          !searchQuery ||
          product.name?.toLowerCase().includes(searchQuery.toLowerCase());

        // Compare by _id — category comes from API as a populated object
        const matchesCategory =
          selectedCategoryId === "all" ||
          getCategoryId(product) === selectedCategoryId;

        const matchesPrice = Number(product.price) <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return Number(a.price) - Number(b.price);
        if (sortBy === "price-high") return Number(b.price) - Number(a.price);
        if (sortBy === "rating")
          return (
            (b.ratingsAverage || b.rating || 0) -
            (a.ratingsAverage || a.rating || 0)
          );
        return 0;
      });
  }, [products, searchQuery, selectedCategoryId, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategoryId("all");
    setMaxPrice(productMaxPrice);
    setSortBy("default");
  };

  // Shared category button list — used in both sidebar and mobile drawer
  const CategoryList = ({ onSelect }) => (
    <>
      <button
        onClick={() => onSelect("all")}
        className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-all cursor-pointer ${
          selectedCategoryId === "all"
            ? "bg-primary text-white font-semibold"
            : "text-gray-600 hover:bg-gray-50"
        }`}
      >
        All
      </button>
      {categories.map((cat) => {
        const catId = cat._id || cat.id;
        return (
          <button
            key={catId}
            onClick={() => onSelect(catId)}
            className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-all cursor-pointer ${
              selectedCategoryId === catId
                ? "bg-primary text-white font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </>
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-outfit">
      <div className="max-w-7xl mx-auto">
        {/* Top Control Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 cursor-pointer bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium"
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>

            <div className="flex items-center space-x-2 w-full md:w-auto">
              <label className="text-xs text-gray-500 font-medium whitespace-nowrap">
                Sort By:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Popularity / Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex gap-8">
          {/* Sidebar Filter - Desktop */}
          <aside className="hidden lg:block w-64 bg-white p-6 rounded-xl border border-gray-100 h-fit sticky top-24">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">
                Filter Options
              </h3>
              <button
                onClick={resetFilters}
                className="text-xs text-primary hover:underline font-medium cursor-pointer"
              >
                Reset All
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-800 mb-3">
                Categories
              </h4>
              <div className="space-y-2">
                <CategoryList onSelect={setSelectedCategoryId} />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-2">
                Max Price: <span className="text-primary">৳{maxPrice}</span>
              </h4>
              <input
                type="range"
                min={0}
                max={productMaxPrice}
                step={priceStep}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>৳0</span>
                <span>৳{productMaxPrice}</span>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Showing {filteredProducts.length} Product
              {filteredProducts.length !== 1 ? "s" : ""}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white text-center py-16 rounded-xl border border-gray-100">
                <p className="text-gray-500 text-lg font-medium">
                  No products match your filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id || product.id}
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/50 backdrop-blur-xs">
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 flex flex-col">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="font-bold text-gray-900">Filters</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5">
                  <CategoryList
                    onSelect={(id) => {
                      setSelectedCategoryId(id);
                      setIsMobileFilterOpen(false);
                    }}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">
                  Max Price: <span className="text-primary">৳{maxPrice}</span>
                </h4>
                <input
                  type="range"
                  min={0}
                  max={productMaxPrice}
                  step={priceStep}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>৳0</span>
                  <span>৳{productMaxPrice}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t flex gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-1 py-2 rounded-lg text-xs font-bold bg-gray-100 text-gray-800 cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2 rounded-lg text-xs font-bold bg-primary text-white cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
