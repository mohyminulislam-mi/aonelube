"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useCart } from "../provider/CartProvider";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";
import {
  MapPin,
  User,
  Mail,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Loader2,
} from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, subtotal, shipping, discount, total, coupon, isCartReady } =
    useCart();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
    paymentMethod: "card",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (isCartReady && cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, isCartReady, router]);

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "aonelub_checkout_details",
      JSON.stringify({
        shippingAddress: {
          name: formData.name,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          // Include user's registered division & district so the backend
          // can scope the order to the correct delivery region.
          division: user?.division || "",
          district: user?.district || "",
        },
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
        paymentMethod: formData.paymentMethod,
        phone: formData.phone,
        couponCode: coupon ? coupon.code : null,
        // Top-level fields mirror shippingAddress for the backend's
        // fallback lookup: division || shippingAddress.division
        division: user?.division || "",
        district: user?.district || "",
      }),
    );

    router.push("/payment");
  };

  if (authLoading || !user) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Breadcrumbs />
        <main className="flex-grow flex flex-col items-center justify-center gap-4 px-4 py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-semibold text-gray-500">
            Checking authentication...
          </p>
        </main>
      </div>
    );
  }

  if (!isCartReady) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Breadcrumbs />
        <main className="flex-grow flex flex-col items-center justify-center gap-4 px-4 py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-semibold text-gray-500">
            Preparing checkout...
          </p>
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
            <p className="text-xs font-black uppercase tracking-widest text-primary">
              Step 2 of 3
            </p>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Checkout
            </h1>
            <p className="text-sm font-semibold text-gray-500 mt-1">
              Enter delivery details and choose how you want to pay.
            </p>
          </div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-8">
            <form
              onSubmit={handleCheckoutSubmit}
              className="bg-white rounded-xl p-5 sm:p-8 border border-gray-200 shadow-sm space-y-8"
            >
              <section className="space-y-4">
                <h2 className="text-lg font-black text-gray-950 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  <span>Contact Information</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Mohyminul Islam"
                      className="w-full bg-white text-gray-900 border border-gray-250 font-semibold text-sm rounded-lg p-3.5 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full bg-white text-gray-900 border border-gray-250 font-semibold text-sm rounded-lg p-3.5 pr-10 focus:outline-none focus:border-primary transition-colors"
                      />
                      <Mail className="absolute right-3 top-3.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1712-345678"
                      className="w-full bg-white text-gray-900 border border-gray-250 font-semibold text-sm rounded-lg p-3.5 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-black text-gray-950 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Shipping Address</span>
                </h2>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="House 12, Road 7, Dhanmondi"
                    className="w-full bg-white text-gray-900 border border-gray-250 font-semibold text-sm rounded-lg p-3.5 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Dhaka"
                      className="w-full bg-white text-gray-900 border border-gray-250 font-semibold text-sm rounded-lg p-3.5 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="1209"
                      className="w-full bg-white text-gray-900 border border-gray-250 font-semibold text-sm rounded-lg p-3.5 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Bangladesh"
                      className="w-full bg-white text-gray-900 border border-gray-250 font-semibold text-sm rounded-lg p-3.5 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-black text-gray-950 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span>Payment Method</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      value: "card",
                      title: "Card",
                      text: "Visa/Mastercard simulation",
                    },
                    {
                      value: "cod",
                      title: "Cash on Delivery",
                      text: "Pay when the order arrives",
                    },
                    {
                      value: "manual",
                      title: "Mobile Payment",
                      text: "bKash, Nagad, Rocket, or bank",
                    },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`border rounded-xl p-5 cursor-pointer hover:border-primary transition-colors ${
                        formData.paymentMethod === method.value
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={formData.paymentMethod === method.value}
                          onChange={handleChange}
                          className="mt-0.5 h-4 w-4 accent-primary"
                        />
                        <div>
                          <h3 className="font-extrabold text-sm text-gray-900">
                            {method.title}
                          </h3>
                          <p className="text-xs text-gray-500 font-semibold mt-1 leading-relaxed">
                            {method.text}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </section>

              <button
                type="submit"
                className="w-full bg-red-700 text-white cursor-pointer font-extrabold text-sm py-4 px-8 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover-glow-red"
              >
                <span>
                  {formData.paymentMethod === "card"
                    ? "Continue to Card Payment"
                    : formData.paymentMethod === "manual"
                      ? "Continue to Payment Verification"
                      : "Continue to Order Confirmation"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          <aside className="lg:col-span-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-7 shadow-sm space-y-6 lg:sticky lg:top-32">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
                  Your Order
                </h2>
                <p className="text-xs font-semibold text-gray-500 mt-1">
                  {cartItems.length} item{cartItems.length === 1 ? "" : "s"} in
                  cart
                </p>
              </div>

              <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="py-3.5 flex justify-between gap-4 text-xs sm:text-sm font-semibold"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <span className="font-bold text-gray-900 block leading-tight">
                        {item.name}
                      </span>
                      <span className="text-gray-400">
                        Qty: {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-gray-950 shrink-0">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm font-semibold text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-950">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-gray-950">
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary font-bold">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <hr className="border-gray-100" />
                <div className="flex justify-between text-sm sm:text-base font-black text-gray-950">
                  <span>Grand Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
