import React from "react";
import { ArrowRight } from "lucide-react";
import ProductCard from "../products/ProductCard/ProductCard";
import Link from "next/link";

// API থেকে ফিচার্ড প্রোডাক্ট ফেচ করার ফাংশন
async function getFeaturedProducts() {
  try {
    const res = await fetch("https://aonelube-server.vercel.app/api/products", {
      next: { revalidate: 1800 }, // ৩০ মিনিট পর পর ক্যাশ আপডেট হবে
    });

    if (!res.ok) return [];

    const data = await res.json();

    // আপনার API রেসপন্স স্ট্রাকচার অনুযায়ী যদি ডাটা সরাসরি অ্যারে হয় বা "products" কী-তে থাকে
    if (Array.isArray(data)) return data.slice(0, 8); // প্রথম ৮টি প্রোডাক্ট দেখানোর জন্য
    if (data && data.success && Array.isArray(data.products)) {
      return data.products.slice(0, 8);
    }

    return [];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  // যদি কোনো প্রোডাক্ট না পাওয়া যায়, তবে সেকশনটি দেখানোর প্রয়োজন নেই
  if (products.length === 0) return null;

  return (
    <section className="bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              Featured Products
            </h2>
            <p className="text-gray-500 text-sm mt-1">Our top picks for you</p>
          </div>

          {/* View All Link */}
          <Link
            href="/products"
            className="flex items-center text-sm font-semibold text-[#005CA9] hover:text-[#004480] transition-colors group"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Product Grid - API থেকে আসা ডাটা দিয়ে */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
