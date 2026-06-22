"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "./ProductCard/ProductCard";

const CATEGORIES = [
  "All",
  "Car Engine Oils",
  "Motorcycle Oils",
  "Bus & Truck Oils",
  "Vehicle Care",
  "Industrial Lubricants",
];

export default function AllProductsPage({ initialProducts = [] }) {
  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(100);
  const [sortBy, setSortBy] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
    const productsArray = Array.isArray(initialProducts) ? initialProducts : [];

    return productsArray
      .filter((product) => {
        const matchesSearch = product.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [initialProducts, searchQuery, selectedCategory, maxPrice, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setMaxPrice(100);
    setSortBy("default");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Top Control Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <div className="relative w-full md:max-w-md">
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#005CA9]"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium"
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
                className="bg-white border border-gray-200 text-gray-700 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#005CA9]"
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
              <h3 className="font-bold text-gray-900 text-base">Filter Options</h3>
              <button
                onClick={resetFilters}
                className="text-xs text-[#ED1C24] hover:underline font-medium"
              >
                Reset All
              </button>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-bold text-gray-800 mb-3">Categories</h4>
              <div className="space-y-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-all ${
                      selectedCategory === cat
                        ? "bg-[#005CA9] text-white font-semibold"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-800 mb-2">
                Max Price: <span className="text-[#005CA9]">${maxPrice}</span>
              </h4>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#005CA9]"
              />
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            <div className="mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span>Showing {filteredProducts.length} Products</span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white text-center py-16 rounded-xl border border-gray-100">
                <p className="text-gray-500 text-lg font-medium">
                  No products match your filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 bg-[#005CA9] text-white px-5 py-2 rounded-lg text-sm font-bold"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  // এখানে রিইউজেবল কম্পোনেন্টটি কল করা হয়েছে
                  <ProductCard key={product._id || product.id} product={product} />
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
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">Categories</h4>
                <div className="space-y-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`block w-full text-left text-sm px-3 py-2 rounded-lg ${
                        selectedCategory === cat ? "bg-[#005CA9] text-white" : "bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-2">
                  Max Price: <span className="text-[#005CA9]">${maxPrice}</span>
                </h4>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#005CA9]"
                />
              </div>
            </div>
            <div className="pt-4 border-t flex gap-3">
              <button
                onClick={() => {
                  resetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-1 py-2 rounded-lg text-xs font-bold bg-gray-100 text-gray-800"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2 rounded-lg text-xs font-bold bg-[#ED1C24] text-white"
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