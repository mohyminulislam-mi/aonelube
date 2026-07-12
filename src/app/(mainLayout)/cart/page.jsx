"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useCart } from "../provider/CartProvider";
import {
  Trash2,
  Plus,
  Minus,
  Ticket,
  ShoppingCart,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function CartPage() {
  const {
    cartItems,
    subtotal,
    shipping,
    discount,
    total,
    coupon,
    couponError,
    isCartReady,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [promoCode, setPromoCode] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    applyCoupon(promoCode);
    setPromoCode("");
  };

  if (!isCartReady) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Breadcrumbs />
        <main className="flex-grow flex flex-col items-center justify-center gap-4 px-4 py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-semibold text-gray-500">
            Loading your cart...
          </p>
        </main>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Breadcrumbs />
        <main className="flex-grow flex flex-col items-center justify-center py-20 px-4 text-center max-w-md mx-auto space-y-6">
          <span className="h-16 w-16 bg-red-500 border border-red-500 text-white flex items-center justify-center rounded-2xl shadow-sm">
            <ShoppingCart className="h-8 w-8" />
          </span>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              Your cart is empty
            </h2>
            <p className="text-gray-500 text-sm font-semibold leading-relaxed">
              Add your preferred engine oil or lubricant first, then come back
              here to review quantities and checkout.
            </p>
          </div>
          <Link
            href="/products"
            className="bg-red-700 text-white font-extrabold text-sm py-4 px-8 rounded-lg inline-flex items-center gap-2 transition-all duration-300 shadow-md hover-glow-red"
          >
            <span>Browse Products</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Breadcrumbs />

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-black">
              Step 1 of 3
            </p>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Shopping Cart
            </h1>
            <p className="text-sm font-semibold text-gray-500 mt-1">
              Review items before sharing delivery details.
            </p>
          </div>
          <Link
            href="/products"
            className="text-sm font-bold  text-red-500 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-150">
                {cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-lg object-cover border border-gray-200 bg-white shrink-0"
                      />
                      <div className="space-y-1 min-w-0">
                        <h3 className="font-extrabold text-sm sm:text-base text-gray-950 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                          Unit price: ${Number(item.price).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400 font-semibold">
                          Stock: {item.stock}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6">
                      <div className="flex items-center border border-gray-250 bg-white rounded-lg overflow-hidden">
                        <button
                          type="button"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item.product, item.quantity - 1)
                          }
                          className="p-2.5 cursor-pointer hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-11 text-center font-extrabold text-sm text-gray-950 select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.product, item.quantity + 1)
                          }
                          className="p-2.5 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="font-black text-base text-gray-950 min-w-20 text-right">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product)}
                        className="p-2.5 text-red-400 hover:text-white transition-colors cursor-pointer rounded-lg border border-gray-200 bg-gray-50 hover:bg-red-500"
                        title="Remove item"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-7 shadow-sm space-y-6 lg:sticky lg:top-32">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                  Order Summary
                </h2>
                <p className="text-xs font-semibold text-gray-500 mt-1">
                  Coupon and shipping are calculated before payment.
                </p>
              </div>

              <div className="space-y-4 text-sm font-semibold text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-950">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-gray-950">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Coupon ({coupon.code})</span>
                    <span className="font-extrabold">
                      -${discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <hr className="border-gray-100" />
                <div className="flex justify-between text-base font-black text-gray-950">
                  <span>Total</span>
                  <span className="text-lg text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <form onSubmit={handleApplyCoupon} className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                  Promo Code
                </label>
                {coupon ? (
                  <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center justify-between text-primary font-bold text-xs">
                    <span>Active: {coupon.code}</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="underline text-[10px] font-black tracking-wider uppercase hover:text-red-700 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="LUBRICANT10"
                      className="min-w-0 flex-1 bg-white text-gray-950 border border-gray-250 font-bold text-xs rounded-lg px-3.5 py-3 focus:outline-none focus:border-primary uppercase placeholder-gray-400"
                    />
                    <button
                      type="submit"
                      className="bg-red-700 cursor-pointer text-white font-extrabold text-xs py-3 px-4 rounded-lg inline-flex items-center gap-1.5 transition-all duration-300 shadow-sm"
                    >
                      <Ticket className="h-4 w-4" />
                      <span>Apply</span>
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-xs text-primary font-bold">
                    {couponError}
                  </p>
                )}
              </form>

              <Link
                href="/checkout"
                className="w-full bg-red-700 text-white font-extrabold text-sm py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover-glow-red"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
