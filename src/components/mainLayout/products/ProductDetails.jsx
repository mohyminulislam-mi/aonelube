"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, ShieldCheck, Truck, RefreshCw, Star, Minus, Plus } from "lucide-react";
import { useCart } from "@/app/(mainLayout)/provider/CartProvider";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";

export default function ProductDetails({ product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [actionError, setActionError] = useState("");
  const price = Number(product?.price || 0);
  const compareAtPrice = Number(product?.compare_at_price || 0);

  // কোয়ান্টিটি কন্ট্রোল ফাংশন
  const handleQuantityChange = (type) => {
    if (type === "inc") setQuantity((prev) => prev + 1);
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  // ডিসকাউন্ট পার্সেন্টেজ হিসাব করার জন্য (যদি compare_at_price থাকে)
  const hasDiscount = compareAtPrice > price;
  const discountPercentage = hasDiscount 
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) 
    : null;

  const handleAddToCart = () => {
    if (!product) {
      setActionError("Product details are not available right now.");
      return;
    }

    if (product?.stock === 0) {
      setActionError("This product is currently out of stock.");
      return;
    }

    setActionError("");
    setAdding(true);

    try {
      addToCart(product, quantity);
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      setActionError("We could not add the item to your cart. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = () => {
    if (!product) {
      setActionError("Product details are not available right now.");
      return;
    }

    if (product?.stock === 0) {
      setActionError("This product is currently out of stock.");
      return;
    }

    setActionError("");
    setAdding(true);

    try {
      addToCart(product, quantity, true);
      if (user) {
        router.push("/checkout");
      } else {
        router.push("/login?redirect=/checkout");
      }
    } catch (error) {
      console.error("Failed to start checkout:", error);
      setActionError("We could not start checkout. Please try again.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl border border-gray-150 p-6 md:p-10 shadow-xs">
        
        {/* Main Grid: Image vs Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column: Product Image Preview */}
          <div className="flex flex-col items-center">
            <div className="w-full aspect-square max-w-[500px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center relative">
              {discountPercentage && (
                <span className="absolute top-4 left-4 bg-[#FF6B00] text-white text-xs font-black px-2.5 py-1 rounded-sm">
                  {discountPercentage}% OFF
                </span>
              )}
              <img
                src={product?.image_url || product?.images?.[0] || "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600"}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Product Content & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category Breadcrumb/Tag */}
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
                {product?.category_id ? "Engine Oils" : "Lubricants"}
              </span>
              
              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-gray-950 leading-tight mb-3">
                {product?.name}
              </h1>

              {/* Rating Review Row */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center text-[#FFB300]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">(4.8)</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-[#005CA9] font-medium cursor-pointer hover:underline">Verified Reviews</span>
              </div>

              {/* Price Area */}
              <div className="bg-gray-50 p-4 rounded-xl flex items-baseline space-x-3 mb-6">
                <span className="text-3xl font-black text-[#005CA9]">
                  ${(price * quantity).toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    ${(compareAtPrice * quantity).toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-gray-500 font-medium">(Total Price)</span>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {product?.description}
              </p>

              {/* Quantity Selector Layout */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                  <button 
                    onClick={() => handleQuantityChange("dec")}
                    className="p-2.5 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-5 text-sm font-bold text-gray-900 w-12 text-center select-none">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => handleQuantityChange("inc")}
                    className="p-2.5 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                
                {/* Stock Info */}
                <span className="text-xs font-semibold text-gray-500">
                  {product?.stock > 0 ? `(${product.stock} items available)` : "Out of stock"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">

                <button 
                  disabled={product?.stock === 0 || adding}
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-950 hover:bg-black cursor-pointer text-white py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors shadow-xs disabled:bg-gray-400"
                >
                   <span className="mr-2 mb-1"><ShoppingCart size={18} /></span>
                  {adding ? "Adding..." : "Add to Cart"}
                </button>

                <button 
                  disabled={product?.stock === 0 || adding}
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#ED1C24] cursor-pointer hover:bg-[#d1171e] text-white py-3.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors shadow-xs disabled:bg-gray-400"
                >
                  {adding ? "Processing..." : "Buy Now"}
                </button>
              </div>

              {actionError ? (
                <p className="mb-6 text-sm font-medium text-red-600">{actionError}</p>
              ) : null}
            </div>

            {/* Badges/Value Proposition */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-gray-700">
                <ShieldCheck size={20} className="text-[#005CA9] shrink-0" />
                <span>100% Genuine Lubricants</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-gray-700">
                <Truck size={20} className="text-[#005CA9] shrink-0" />
                <span>Fast Home Delivery</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-semibold text-gray-700">
                <RefreshCw size={18} className="text-[#005CA9] shrink-0" />
                <span>Easy Return Policy</span>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Specifications Section */}
        {product?.specifications && product.specifications.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-100">
            <h3 className="text-lg font-bold text-gray-950 mb-4">Technical Specifications</h3>
            <div className="max-w-2xl border border-gray-150 rounded-lg overflow-hidden text-sm bg-white">
              <div className="grid grid-cols-2 border-b border-gray-150 p-3 bg-gray-50 font-bold text-gray-700">
                <div>Property</div>
                <div>Value</div>
              </div>
              {product.specifications.map((spec, index) => (
                <div 
                  key={index} 
                  className={`grid grid-cols-2 p-3 text-gray-600 ${
                    index !== product.specifications.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="font-semibold text-gray-800 uppercase text-xs tracking-wider">
                    {spec.key.replace("_", " ")}
                  </div>
                  <div className="capitalize">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
