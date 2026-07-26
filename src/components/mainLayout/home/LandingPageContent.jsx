"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, X, Loader2, PackageSearch } from "lucide-react";
import ProductCard from "@/components/mainLayout/products/ProductCard/ProductCard";
import FeaturedProducts from "@/components/mainLayout/home/FeaturedProducts";
import HeroSlider from "@/components/mainLayout/home/Hero";
import { getCategories, getProducts } from "@/lib/api";

// ── Themed banner images per category slug ──────────────────────────────────
const CATEGORY_BANNERS = {
  "car-engine-oils":
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1400",
  "motorcycle-engine-oils":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1400",
  "bus-truck-engine-oils":
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1400",
  "cng-engine-oils":
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1400",
  "vehicle-care":
    "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=1400",
  "industrial-lubricants":
    "https://images.unsplash.com/photo-1565984429576-c83f5e6b0b7a?q=80&w=1400",
};

const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1400";

// ── Helpers ──────────────────────────────────────────────────────────────────
function normalizeCategories(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

function normalizeProducts(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  return [];
}

function getBannerImage(category) {
  const img = category?.image || category?.image_url;
  if (!img || img.includes("placeholder") || img.startsWith("/")) {
    return CATEGORY_BANNERS[category?.slug] || DEFAULT_BANNER;
  }
  return img;
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function LandingPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read URL params
  const activeCategorySlug = searchParams.get("category") || "";
  const activeSubSlug = searchParams.get("sub") || "";

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load categories + all products once
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [catsRes, prodsRes] = await Promise.all([
          getCategories(),
          getProducts({ limit: 200 }),
        ]);
        setCategories(normalizeCategories(catsRes));
        setProducts(normalizeProducts(prodsRes));
      } catch (err) {
        console.error("Failed to load catalog data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // ── Derived state ──────────────────────────────────────────────────────────

  // Active category object (from ?category=slug OR parent of ?sub=slug)
  const activeCategoryObj = useMemo(() => {
    if (activeCategorySlug) {
      return categories.find((c) => c.slug === activeCategorySlug) || null;
    }
    if (activeSubSlug) {
      return (
        categories.find((c) =>
          c.subCategories?.some((s) => s.slug === activeSubSlug),
        ) || null
      );
    }
    return null;
  }, [activeCategorySlug, activeSubSlug, categories]);

  // Active subcategory object
  const activeSubObj = useMemo(() => {
    if (!activeSubSlug) return null;
    for (const c of categories) {
      const found = c.subCategories?.find((s) => s.slug === activeSubSlug);
      if (found) return found;
    }
    return null;
  }, [activeSubSlug, categories]);

  // Products for the active category
  const filteredProducts = useMemo(() => {
    if (!activeCategoryObj) return [];
    return products.filter((p) => {
      const catId = p.category?._id || p.category || "";
      const catSlug = p.category?.slug || "";
      return (
        catSlug === activeCategoryObj.slug ||
        catId === (activeCategoryObj._id || activeCategoryObj.id || "")
      );
    });
  }, [activeCategoryObj, products]);

  const isFiltered = Boolean(activeCategorySlug || activeSubSlug);

  // ── Navigation helpers ─────────────────────────────────────────────────────
  const gotoCategory = (slug) =>
    slug ? router.push(`/?category=${slug}`) : router.push("/");

  const gotoSub = (subSlug) =>
    subSlug ? router.push(`/?sub=${subSlug}`) : router.push("/");

  const clearFilter = () => router.push("/");

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
        <p className="text-sm font-semibold text-gray-500">Loading catalog…</p>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // FILTERED VIEW — a single category (or subcategory) is selected
  // ══════════════════════════════════════════════════════════════════════════
  if (isFiltered && activeCategoryObj) {
    const displayName = activeSubObj ? activeSubObj.name : activeCategoryObj.name;
    const catBanner = getBannerImage(activeCategoryObj);
    const hasSubCats =
      Array.isArray(activeCategoryObj.subCategories) &&
      activeCategoryObj.subCategories.length > 0;

    return (
      <div className="w-full font-outfit">
        {/* Category Hero Banner */}
        <div
          className="relative w-full h-[200px] md:h-[260px] bg-cover bg-center overflow-hidden flex items-center shadow-xs"
          style={{ backgroundImage: `url('${catBanner}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/60 to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center h-full">
            <div className="max-w-xl">
              <span className="inline-block px-3 py-1 bg-primary text-white text-[11px] font-bold uppercase tracking-wider rounded-md mb-2">
                {activeSubObj
                  ? `Subcategory of ${activeCategoryObj.name}`
                  : "Category"}
              </span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm uppercase">
                {displayName}
              </h1>
              {(activeSubObj?.description || activeCategoryObj?.description) && (
                <p className="text-gray-200 text-xs md:text-sm mt-2 line-clamp-2 font-medium max-w-lg leading-relaxed">
                  {activeSubObj?.description || activeCategoryObj?.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Active Filter Clear Control Bar */}
        <div className="bg-white border-b border-gray-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">
              Filtering by:{" "}
              <strong className="text-gray-900">{displayName}</strong>
            </span>
            <button
              onClick={clearFilter}
              className="inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              <X className="h-3.5 w-3.5" />
              Clear Filter
            </button>
          </div>
        </div>

        {/* ── Subcategory Pills (only when a parent category is active, not a sub) ── */}
        {hasSubCats && !activeSubSlug && (
          <div className="bg-gray-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">
                Subcategories:
              </span>
              {activeCategoryObj.subCategories.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => gotoSub(sub.slug)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer whitespace-nowrap shadow-xs"
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Subcategory back-navigation when ?sub= is active ── */}
        {activeSubSlug && (
          <div className="bg-gray-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0">
                Subcategories:
              </span>
              {/* "All [Category]" pill */}
              <button
                onClick={() => gotoCategory(activeCategoryObj.slug)}
                className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                All {activeCategoryObj.name}
              </button>
              {activeCategoryObj.subCategories?.map((sub, idx) => (
                <button
                  key={idx}
                  onClick={() => gotoSub(sub.slug)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap shadow-xs ${
                    activeSubSlug === sub.slug
                      ? "bg-primary text-white border border-primary"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Section header + Product Grid ─────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Mobil-style horizontal rule section header */}
          <div className="border-b-2 border-gray-900 pb-3 mb-6 flex items-center justify-between">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900 tracking-tight capitalize">
              {displayName}
            </h2>
            <span className="text-xs font-semibold text-gray-500">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200 text-center px-4">
              <PackageSearch className="h-10 w-10 text-gray-300 mb-3" />
              <h3 className="text-base font-bold text-gray-700">No Products Found</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm">
                We couldn&apos;t find any products in this category.
              </p>
              <button
                onClick={clearFilter}
                className="mt-4 px-5 py-2 bg-primary text-white text-xs font-bold rounded-full hover:bg-[#d1171e] transition-colors cursor-pointer"
              >
                Show All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // DEFAULT VIEW — no filter active: Hero Slider + Featured Products + all category sections
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="w-full font-outfit">
      {/* Hero Slider shown on default view */}
      <HeroSlider />

      <div className="space-y-16 py-6">
        {/* 1. Featured Products */}
        <FeaturedProducts initialProducts={products.slice(0, 8)} />

        {/* 2. Per-category: Banner → Section Header → Product Grid */}
        {categories.map((category) => {
          const catId = category._id || category.id || category.slug;
          const catSlug = category.slug || "";
          const catBanner = getBannerImage(category);

          const catProducts = products.filter((p) => {
            const pSlug = p.category?.slug || "";
            const pId = p.category?._id || p.category || "";
            return pSlug === catSlug || pId === catId;
          });

          if (catProducts.length === 0) return null;

          return (
            <section key={catId} className="w-full">
              {/* Category Banner */}
              <div
                className="relative w-full h-[200px] md:h-[260px] bg-cover bg-center overflow-hidden flex items-center"
                style={{ backgroundImage: `url('${catBanner}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/60 to-transparent" />
                <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
                  <div className="max-w-xl">
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight uppercase drop-shadow">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-gray-200 text-xs md:text-sm mt-2 line-clamp-2 font-medium max-w-lg leading-relaxed">
                        {category.description}
                      </p>
                    )}
                    <button
                      onClick={() => gotoCategory(category.slug)}
                      className="mt-4 inline-flex items-center text-xs md:text-sm font-bold text-white bg-primary hover:bg-[#d1171e] px-4 py-2 rounded-full transition-all shadow-md active:scale-95 group cursor-pointer"
                    >
                      <span>View All</span>
                      <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Section header + products */}
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="border-b-2 border-gray-900 pb-2 mb-6 flex items-center justify-between">
                  <h3 className="text-base md:text-xl font-bold text-gray-900 capitalize">
                    {category.name}
                  </h3>
                  <button
                    onClick={() => gotoCategory(category.slug)}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    See More
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
                  {catProducts.slice(0, 4).map((product) => (
                    <ProductCard key={product._id || product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
