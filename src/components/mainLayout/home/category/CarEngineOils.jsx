"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import ProductCard from "../../products/ProductCard/ProductCard";

// ডামি বা API থেকে আসা "Car Engine Oils" ক্যাটাগরির ডাটা
const carOilsData = [
  {
    _id: "1",
    name: "Mobil 1 Advanced Full Synthetic 5W-30",
    slug: "mobil-1-advanced-full-synthetic-5w-30",
    price: 32.99,
    compare_at_price: 39.99,
    category: "Car Engine Oils",
    image_url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600",
  },
  {
    _id: "2",
    name: "Mobil Super All-In-One Protection 10W-40",
    slug: "mobil-super-all-in-one-10w-40",
    price: 24.50,
    compare_at_price: null,
    category: "Car Engine Oils",
    image_url: "https://images.unsplash.com/photo-1586880244406-556ebe35f28e?q=80&w=600",
  },
  {
    _id: "3",
    name: "Mobil 1 Extended Performance 0W-20",
    slug: "mobil-1-extended-performance-0w-20",
    price: 35.99,
    compare_at_price: 42.00,
    category: "Car Engine Oils",
    image_url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600",
  },
  {
    _id: "4",
    name: "Mobil Super 3000 X1 5W-40",
    slug: "mobil-super-3000-x1-5w-40",
    price: 28.00,
    compare_at_price: 31.50,
    category: "Car Engine Oils",
    image_url: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=600",
  },
  {
    _id: "5",
    name: "Mobil Special 20W-50 Engine Oil",
    slug: "mobil-special-20w-50-engine-oil",
    price: 19.99,
    compare_at_price: null,
    category: "Car Engine Oils",
    image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600",
  },
  {
    _id: "6",
    name: "Mobil 1 High Mileage 5W-20",
    slug: "mobil-1-high-mileage-5w-20",
    price: 34.99,
    compare_at_price: 39.99,
    category: "Car Engine Oils",
    image_url: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600",
  },
];

export default function CarEngineOils() {
  // শুরুতে ৪টি প্রোডাক্ট দেখাবে
  const [visibleCount, setVisibleCount] = useState(4);

  // More বাটনে ক্লিক করলে প্রতিবার আরও ৪টি করে প্রোডাক্ট লোড হবে
  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  // বর্তমানে দেখানোর মতো প্রোডাক্টগুলো স্লাইস করা হচ্ছে
  const displayedProducts = carOilsData.slice(0, visibleCount);

  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* Load More Button Logic */}
        {visibleCount < carOilsData.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="flex items-center space-x-2 bg-white hover:bg-gray-950 text-gray-900 hover:text-white border border-gray-300 hover:border-gray-950 font-bold text-sm uppercase tracking-wider px-6 py-3 rounded-xl transition-all duration-300 shadow-xs group"
            >
              <span>Load More Products</span>
              <ChevronDown size={16} className="transform group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}