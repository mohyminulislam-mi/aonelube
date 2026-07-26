"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import ProductCard from "../products/ProductCard/ProductCard";
import Link from "next/link";
import { getProducts } from "@/lib/api";

function normalizeProducts(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  return [];
}

export default function FeaturedProducts({ initialProducts = [] }) {
  const [products, setProducts] = useState(() =>
    Array.isArray(initialProducts) ? initialProducts.slice(0, 8) : [],
  );
  const [loading, setLoading] = useState(!initialProducts?.length);

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProducts(initialProducts.slice(0, 8));
      setLoading(false);
      return;
    }

    async function fetchFeatured() {
      try {
        setLoading(true);
        const data = await getProducts({ limit: 8 });
        setProducts(normalizeProducts(data).slice(0, 8));
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFeatured();
  }, [initialProducts]);

  if (!loading && products.length === 0) return null;

  return (
    <section className="bg-[#F8F9FA] py-12 px-4 sm:px-6 lg:px-8 font-outfit">
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
            className="flex items-center text-sm font-semibold text-primary hover:text-[#004480] transition-colors group"
          >
            View All
            <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Product Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
