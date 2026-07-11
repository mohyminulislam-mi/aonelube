"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  RefreshCw,
  Star,
  Minus,
  Plus,
  ChevronRight,
  Package,
  ClipboardList,
  MessageSquare,
  CheckCircle2,
  Tag,
  Layers,
} from "lucide-react";
import { useCart } from "@/app/(mainLayout)/provider/CartProvider";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";

// Derive specification rows from any available product fields
function buildSpecRows(product) {
  const rows = [];

  // First add any explicit specifications array entries
  if (
    Array.isArray(product?.specifications) &&
    product.specifications.length > 0
  ) {
    product.specifications.forEach((s) => {
      if (s?.key && s?.value) {
        rows.push({
          label: String(s.key).replace(/_/g, " "),
          value: String(s.value),
        });
      }
    });
  }

  // Then append root-level known fields that are not already shown
  const fieldMap = [
    { key: "viscosity", label: "Viscosity Grade" },
    { key: "api_grade", label: "API Grade" },
    { key: "acea_grade", label: "ACEA Grade" },
    { key: "base_oil", label: "Base Oil Type" },
    { key: "volume", label: "Volume" },
    { key: "net_weight", label: "Net Weight" },
    { key: "capacity", label: "Capacity" },
    { key: "application", label: "Application" },
    { key: "flash_point", label: "Flash Point" },
    { key: "pour_point", label: "Pour Point" },
    { key: "density", label: "Density" },
    { key: "color", label: "Color" },
    { key: "origin", label: "Country of Origin" },
    { key: "certifications", label: "Certifications" },
    { key: "sae_class", label: "SAE Class" },
    { key: "model", label: "Model" },
    { key: "sku", label: "SKU / Model No." },
    { key: "barcode", label: "Barcode" },
  ];

  const existingLabels = new Set(rows.map((r) => r.label.toLowerCase()));

  fieldMap.forEach(({ key, label }) => {
    const val = product?.[key];
    if (
      val !== undefined &&
      val !== null &&
      val !== "" &&
      !existingLabels.has(label.toLowerCase())
    ) {
      rows.push({ label, value: String(val) });
    }
  });

  // Add brand name from populated brand object
  const brandName =
    product?.brand?.name || product?.brand_name || product?.brand;
  if (
    brandName &&
    typeof brandName === "string" &&
    !existingLabels.has("brand")
  ) {
    rows.unshift({ label: "Brand", value: brandName });
  }

  // Add category name from populated category object
  const catName = product?.category?.name || product?.category_name;
  if (
    catName &&
    typeof catName === "string" &&
    !existingLabels.has("category")
  ) {
    rows.unshift({ label: "Category", value: catName });
  }

  return rows;
}

export default function ProductDetails({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [actionError, setActionError] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [activeImage, setActiveImage] = useState(0);

  const price = Number(product?.price || 0);
  const compareAtPrice = Number(product?.compare_at_price || 0);
  const hasDiscount = compareAtPrice > price;
  const discountPct = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null;

  // Build image list — prefer `images[]` (Cloudinary), fall back to `image_url` / `image`
  const images = (() => {
    if (Array.isArray(product?.images) && product.images.length > 0)
      return product.images;
    const single = product?.image_url || product?.image;
    return single
      ? [single]
      : [
          "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600",
        ];
  })();

  const categoryName =
    product?.category?.name || product?.category_name || "Lubricants";

  const brandName =
    typeof product?.brand === "object"
      ? product.brand?.name
      : product?.brand_name || product?.brand || null;

  const specRows = buildSpecRows(product);
  const inStock = product?.stock === undefined || product?.stock > 0;

  const handleQuantityChange = (type) => {
    if (type === "inc") setQuantity((q) => q + 1);
    if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  };

  const handleAddToCart = () => {
    if (!product)
      return setActionError("Product details are not available right now.");
    if (!inStock)
      return setActionError("This product is currently out of stock.");
    setActionError("");
    setAdding(true);
    try {
      addToCart(product, quantity);
    } catch {
      setActionError(
        "We could not add the item to your cart. Please try again.",
      );
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = () => {
    if (!product)
      return setActionError("Product details are not available right now.");
    if (!inStock)
      return setActionError("This product is currently out of stock.");
    setActionError("");
    setAdding(true);
    try {
      addToCart(product, quantity, true);
      router.push(user ? "/checkout" : "/login?redirect=/checkout");
    } catch {
      setActionError("We could not start checkout. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const TABS = [
    { id: "description", label: "Description", icon: ClipboardList },
    { id: "specifications", label: "Specifications", icon: Layers },
    { id: "reviews", label: "Reviews", icon: MessageSquare },
  ];

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs text-gray-400 mb-6 gap-1 font-medium">
          <a href="/" className="hover:text-[#005CA9] transition-colors">
            Home
          </a>
          <ChevronRight size={13} />
          <a
            href="/products"
            className="hover:text-[#005CA9] transition-colors"
          >
            Products
          </a>
          <ChevronRight size={13} />
          <span className="text-gray-600 truncate max-w-[200px]">
            {product?.name}
          </span>
        </nav>

        {/* Main Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* ── Left: Image Gallery ── */}
            <div className="p-6 md:p-10 bg-gray-50 border-r border-gray-100 flex flex-col items-center gap-4">
              {/* Main Image */}
              <div className="relative w-full max-w-[480px] aspect-square rounded-xl overflow-hidden bg-white border border-gray-100 flex items-center justify-center group">
                {discountPct && (
                  <span className="absolute top-4 left-4 z-10 bg-primary text-white text-xs font-black px-2.5 py-1 rounded-full shadow">
                    {discountPct}% OFF
                  </span>
                )}
                {!inStock && (
                  <span className="absolute top-4 right-4 z-10 bg-gray-800 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Out of Stock
                  </span>
                )}
                <img
                  src={images[activeImage]}
                  alt={product?.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 flex-wrap justify-center">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === i
                          ? "border-[#005CA9] shadow-md"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right: Product Info ── */}
            <div className="p-6 md:p-10 flex flex-col gap-6">
              {/* Top Meta Row */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold text-[#005CA9] bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-widest">
                  {categoryName}
                </span>
                {brandName && (
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full uppercase tracking-widest">
                    {brandName}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-gray-950 leading-tight">
                {product?.name}
              </h1>

              {/* Rating Row */}
              <div className="flex items-center gap-2">
                <div className="flex text-[#FFB300]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className="fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  (4.8)
                </span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-[#005CA9] font-medium hover:underline cursor-pointer">
                  Verified Reviews
                </span>
                {product?.stock > 0 && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                      <CheckCircle2 size={13} />
                      In Stock ({product.stock})
                    </span>
                  </>
                )}
              </div>

              {/* Price Block */}
              <div className="bg-gradient-to-r from-[#005CA9]/5 to-transparent border border-blue-100 rounded-xl px-5 py-4">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-[#005CA9]">
                    ৳{(price * quantity).toLocaleString()}
                  </span>
                  {hasDiscount && (
                    <span className="text-base text-gray-400 line-through mb-1">
                      ৳{(compareAtPrice * quantity).toLocaleString()}
                    </span>
                  )}
                  <span className="text-xs text-gray-400 font-medium mb-1">
                    (Total Price)
                  </span>
                </div>
                {hasDiscount && (
                  <p className="text-xs text-emerald-600 font-semibold mt-1">
                    You save ৳
                    {((compareAtPrice - price) * quantity).toLocaleString()} (
                    {discountPct}% off)
                  </p>
                )}
              </div>

              {/* Available Divisions */}
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-slate-50 border border-gray-100 rounded-xl px-4 py-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 text-[#005CA9] shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span className="font-bold text-gray-800">Available In:</span>
                <span className="text-gray-600 font-medium">
                  {!product?.availableDivisions || product.availableDivisions.length === 0
                    ? "All Divisions (Nationwide)"
                    : product.availableDivisions.join(", ")}
                </span>
              </div>

              {/* Short Description */}
              <p className="text-gray-500 text-sm leading-relaxed border-l-4 border-[#005CA9]/20 pl-4">
                {product?.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-700">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => handleQuantityChange("dec")}
                    className="px-3 py-2.5 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-5 text-sm font-black text-gray-900 min-w-[3rem] text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("inc")}
                    className="px-3 py-2.5 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  disabled={!inStock || adding}
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-950 hover:bg-black disabled:bg-gray-300 text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
                >
                  <ShoppingCart size={17} />
                  {adding ? "Adding…" : "Add to Cart"}
                </button>
                <button
                  disabled={!inStock || adding}
                  onClick={handleBuyNow}
                  className="flex-1 bg-primary hover:bg-[#c8161d] disabled:bg-gray-300 text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-sm active:scale-95"
                >
                  {adding ? "Processing…" : "Buy Now"}
                </button>
              </div>

              {actionError && (
                <p className="text-sm font-medium text-red-600">
                  {actionError}
                </p>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-5">
                {[
                  { icon: ShieldCheck, label: "100% Genuine" },
                  { icon: Truck, label: "Fast Delivery" },
                  { icon: RefreshCw, label: "Easy Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 text-center"
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                      <Icon size={16} className="text-[#005CA9]" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Tabs Section ── */}
          <div className="border-t border-gray-100">
            {/* Tab Headers */}
            <div className="flex border-b border-gray-100 bg-gray-50 px-6 md:px-10 overflow-x-auto">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-bold border-b-2 whitespace-nowrap transition-all ${
                    activeTab === id
                      ? "border-[#005CA9] text-[#005CA9]"
                      : "border-transparent text-gray-400 hover:text-gray-700"
                  }`}
                >
                  <Icon size={15} />
                  {label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="px-6 md:px-10 py-8">
              {/* Description Tab */}
              {activeTab === "description" && (
                <div className="max-w-3xl">
                  <h3 className="text-lg font-black text-gray-900 mb-4">
                    Product Description
                  </h3>
                  <div className="prose prose-sm text-gray-600 leading-relaxed max-w-none">
                    <p>
                      {product?.description ||
                        "No description available for this product."}
                    </p>
                  </div>
                  {product?.features &&
                    Array.isArray(product.features) &&
                    product.features.length > 0 && (
                      <div className="mt-6">
                        <h4 className="text-sm font-black text-gray-800 mb-3 uppercase tracking-wider">
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {product.features.map((f, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-gray-600"
                            >
                              <CheckCircle2
                                size={15}
                                className="text-[#005CA9] mt-0.5 shrink-0"
                              />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === "specifications" && (
                <div className="max-w-3xl">
                  <h3 className="text-lg font-black text-gray-900 mb-5">
                    Technical Specifications
                  </h3>
                  {specRows.length > 0 ? (
                    <div className="border border-gray-100 rounded-xl overflow-hidden text-sm">
                      {/* Header */}
                      <div className="grid grid-cols-2 bg-[#005CA9] text-white font-bold text-xs uppercase tracking-widest px-5 py-3">
                        <span>Property</span>
                        <span>Value</span>
                      </div>
                      {/* Rows */}
                      {specRows.map((row, i) => (
                        <div
                          key={i}
                          className={`grid grid-cols-2 px-5 py-3.5 text-sm border-b border-gray-100 last:border-b-0 ${
                            i % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          <span className="font-semibold text-gray-700 capitalize">
                            {row.label}
                          </span>
                          <span className="text-gray-600 capitalize">
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
                      <Package size={40} className="text-gray-200" />
                      <p className="text-sm font-semibold text-gray-400">
                        No specifications available for this product yet.
                      </p>
                      <p className="text-xs text-gray-300">
                        Please contact us for detailed technical information.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="max-w-2xl">
                  <h3 className="text-lg font-black text-gray-900 mb-5">
                    Customer Reviews
                  </h3>
                  {/* Rating Summary */}
                  <div className="flex items-center gap-6 p-5 bg-gray-50 rounded-xl border border-gray-100 mb-6">
                    <div className="text-center">
                      <div className="text-5xl font-black text-gray-900">
                        4.8
                      </div>
                      <div className="flex text-[#FFB300] justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-current" />
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 font-medium">
                        Verified Rating
                      </div>
                    </div>
                    <div className="flex-1 space-y-1.5">
                      {[5, 4, 3, 2, 1].map((n) => (
                        <div
                          key={n}
                          className="flex items-center gap-2 text-xs text-gray-500"
                        >
                          <span className="w-3 text-right">{n}</span>
                          <Star
                            size={10}
                            className="fill-[#FFB300] text-[#FFB300]"
                          />
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#FFB300] rounded-full"
                              style={{
                                width:
                                  n === 5
                                    ? "72%"
                                    : n === 4
                                      ? "18%"
                                      : n === 3
                                        ? "7%"
                                        : "2%",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 text-center py-6">
                    Customer reviews will appear here soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
