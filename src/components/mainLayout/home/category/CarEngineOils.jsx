"use client";

import React, { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import ProductCard from "../../products/ProductCard/ProductCard";

export default function CarEngineOils({ initialProducts = [] }) {
  const [visibleCount, setVisibleCount] = useState(4);

  const carOilsData = useMemo(() => {
    const products = Array.isArray(initialProducts) ? initialProducts : [];
    const filteredProducts = products.filter((product) => {
      const category = product?.category || product?.category_name || "";
      return category.toLowerCase().includes("car");
    });

    return filteredProducts.length > 0 ? filteredProducts : products;
  }, [initialProducts]);

  const displayedProducts = carOilsData.slice(0, visibleCount);

  if (carOilsData.length === 0) return null;

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-gray-200">
          <div>
            <span className="text-xs font-bold text-[#005CA9] uppercase tracking-wider block mb-1">
              Premium Lubricants
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-950 tracking-tight">
              Car Engine Oils
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Showing {displayedProducts.length} of {carOilsData.length} products
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product._id || product.id || product.slug}
              product={product}
            />
          ))}
        </div>

        {visibleCount < carOilsData.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount((prevCount) => prevCount + 4)}
              className="flex items-center space-x-2 bg-white hover:bg-gray-950 text-gray-900 hover:text-white border border-gray-300 hover:border-gray-950 font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-300 shadow-xs group"
            >
              <span>Load More Products</span>
              <ChevronDown
                size={16}
                className="transform group-hover:translate-y-0.5 transition-transform"
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
