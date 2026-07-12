"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { useCart } from "../provider/CartProvider";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";
import { ShieldCheck, Loader2, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";
import { createOrder } from "@/lib/api";

export default function PaymentPage() {
  const { cartItems, total, clearCart, isCartReady } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState(null);

  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const [manualData, setManualData] = useState({
    paymentMethod: "bkash",
    senderMobile: "",
    transactionId: "",
  });

  useEffect(() => {
    const details = localStorage.getItem("aonelub_checkout_details");
    if (!isCartReady) return;
    if (!details || cartItems.length === 0) {
      router.push("/cart");
      return;
    }
    try {
      queueMicrotask(() => setCheckoutDetails(JSON.parse(details)));
    } catch (error) {
      console.error("Checkout details parse error:", error);
      router.push("/checkout");
    }
  }, [cartItems, isCartReady, router]);

  const handleCardInput = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const handleManualInput = (e) => {
    setManualData({
      ...manualData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!checkoutDetails) return;

    setLoading(true);

    try {
      const division = checkoutDetails.division || checkoutDetails.shippingAddress?.division || user?.division || "";
      const district = checkoutDetails.district || checkoutDetails.shippingAddress?.district || user?.district || "";

      const orderPayload = {
        items: cartItems.map((item) => ({
          product: item.product,
          quantity: item.quantity,
        })),
        // Top-level division/district — backend reads these first
        division,
        district,
        shippingAddress: {
          street: checkoutDetails.shippingAddress.street,
          city: checkoutDetails.shippingAddress.city,
          postalCode: checkoutDetails.shippingAddress.postalCode,
          country: checkoutDetails.shippingAddress.country,
          division,
          district,
        },
        billingAddress: {
          street: checkoutDetails.shippingAddress.street,
          city: checkoutDetails.shippingAddress.city,
          postalCode: checkoutDetails.shippingAddress.postalCode,
          country: checkoutDetails.shippingAddress.country,
          division,
          district,
        },
        paymentMethod: checkoutDetails.paymentMethod,
        couponCode: checkoutDetails.couponCode || undefined,
      };

      if (checkoutDetails.paymentMethod === "manual") {
        orderPayload.manualPaymentDetails = {
          paymentMethod: manualData.paymentMethod,
          senderMobile: manualData.senderMobile,
          transactionId: manualData.transactionId,
        };
      }

      const resData = await createOrder(orderPayload);
      const createdOrder = resData.order;

      if (!createdOrder) {
        throw new Error(resData.message || "Failed to retrieve placed order metadata.");
      }

      const orderToStore = {
        ...createdOrder,
        user: {
          name: checkoutDetails.customer.name,
          email: checkoutDetails.customer.email,
          phone: checkoutDetails.customer.phone
        }
      };

      localStorage.setItem(`aonelub_order_${createdOrder._id}`, JSON.stringify(orderToStore));

      await Swal.fire({
        icon: "success",
        title:
          checkoutDetails.paymentMethod === "manual"
            ? "Order Submitted"
            : "Payment Successful!",
        text:
          checkoutDetails.paymentMethod === "manual"
            ? "Your manual verification transaction is submitted."
            : "Your premium lubricant order has been recorded.",
        background: "#ffffff",
        color: "#171717",
        confirmButtonColor: "#e30613",
      });

      clearCart();
      localStorage.removeItem("aonelub_checkout_details");
      router.push(`/order-success?orderId=${createdOrder._id}`);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Order Placement Failed",
        text:
          err.response?.data?.message ||
          err.message ||
          "Unable to store order record inside database.",
        background: "#ffffff",
        color: "#171717",
        confirmButtonColor: "#e30613",
      });
    } finally {
      setLoading(false);
    }
  };

  const isCard = checkoutDetails?.paymentMethod === "card";
  const isCod = checkoutDetails?.paymentMethod === "cod";
  const isManual = checkoutDetails?.paymentMethod === "manual";

  return (
    <div className="flex flex-col min-h-screen bg-light-gray">
      <Breadcrumbs />

      <main className="max-w-lg mx-auto px-4 py-16 w-full">
        <div className="bg-white rounded-2xl p-8 border border-gray-200/60 shadow-lg space-y-8">
          <div className="text-center space-y-3">
            <span className="h-12 w-12 bg-primary/10 border border-primary/20 text-primary flex items-center justify-center rounded-full mx-auto">
              <ShieldCheck className="h-6 w-6 animate-pulse" />
            </span>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">
              SECURE PAYMENT GATEWAY
            </h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
              Amount Due:{" "}
              <span className="text-primary text-sm">${total.toFixed(2)}</span>
            </p>
          </div>

          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            {/* Card Payment Form */}
            {isCard && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={cardData.name}
                    onChange={handleCardInput}
                    placeholder="Robert Sterling"
                    className="w-full bg-light-gray text-gray-950 border border-gray-250 font-bold text-xs rounded-lg p-3.5 focus:outline-none focus:border-primary uppercase placeholder-gray-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="number"
                    required
                    maxLength="19"
                    value={cardData.number}
                    onChange={handleCardInput}
                    placeholder="4111 2222 3333 4444"
                    className="w-full bg-light-gray text-gray-950 border border-gray-250 font-bold text-xs rounded-lg p-3.5 focus:outline-none focus:border-primary uppercase placeholder-gray-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      required
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={handleCardInput}
                      className="w-full bg-light-gray text-gray-950 border border-gray-250 font-bold text-xs rounded-lg p-3.5 focus:outline-none focus:border-primary uppercase placeholder-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      CVV Security Code
                    </label>
                    <input
                      type="password"
                      name="cvv"
                      required
                      maxLength="4"
                      value={cardData.cvv}
                      onChange={handleCardInput}
                      placeholder="***"
                      className="w-full bg-light-gray text-gray-950 border border-gray-250 font-bold text-xs rounded-lg p-3.5 focus:outline-none focus:border-primary uppercase placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Cash on Delivery Layout */}
            {isCod && (
              <div className="p-5 bg-gray-50 border border-gray-150 rounded-xl space-y-4 text-center">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-wider">
                  Cash on Delivery (COD)
                </h3>
                <p className="text-xs font-medium text-gray-500 leading-relaxed">
                  Thank you for shopping with A One Lub. You have selected Cash
                  on Delivery. Your package will be processed immediately. You
                  will pay the amount due in cash directly to the courier agent
                  when unloading the lubricants at your shipping destination.
                </p>
                <div className="text-[10px] font-black uppercase text-primary bg-primary/10 py-1.5 px-3 rounded-md inline-block">
                  No online details required
                </div>
              </div>
            )}

            {/* Mobile / Manual Payment Layout */}
            {isManual && (
              <div className="space-y-6">
                {/* Instruction board */}
                <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl space-y-3">
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-wide">
                    Manual Payment Instructions
                  </h3>
                  <p className="text-[11px] font-semibold text-gray-500 leading-relaxed">
                    Please send the exact amount of{" "}
                    <strong className="text-primary">
                      ${total.toFixed(2)}
                    </strong>{" "}
                    manually to one of our merchant wallets or bank accounts:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[10px] font-bold text-gray-700">
                    <div className="bg-white border border-gray-200 p-2 rounded">
                      <p className="text-primary font-black uppercase">
                        bKash (Merchant)
                      </p>
                      <p className="mt-0.5">+880 1711-223344</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-2 rounded">
                      <p className="text-primary font-black uppercase">
                        Nagad (Merchant)
                      </p>
                      <p className="mt-0.5">+880 1711-556677</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-2 rounded">
                      <p className="text-primary font-black uppercase">
                        Rocket (Wallet)
                      </p>
                      <p className="mt-0.5">+880 1711-889900-3</p>
                    </div>
                    <div className="bg-white border border-gray-200 p-2 rounded">
                      <p className="text-primary font-black uppercase">
                        Bank Transfer
                      </p>
                      <p className="mt-0.5">A One Lub, A/C: 987654321</p>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Payment Method Used
                    </label>
                    <select
                      name="paymentMethod"
                      value={manualData.paymentMethod}
                      onChange={handleManualInput}
                      className="w-full bg-light-gray text-gray-950 border border-gray-250 font-bold text-xs rounded-lg p-3.5 focus:outline-none focus:border-primary text-gray-700 cursor-pointer"
                    >
                      <option value="bkash">bKash Wallet</option>
                      <option value="nagad">Nagad Wallet</option>
                      <option value="rocket">Rocket Wallet</option>
                      <option value="bank">Direct Bank Wire</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Sender Mobile / Account No
                    </label>
                    <input
                      type="text"
                      name="senderMobile"
                      required
                      value={manualData.senderMobile}
                      onChange={handleManualInput}
                      placeholder="e.g. 017XXXXXXXX / A/C number"
                      className="w-full bg-light-gray text-gray-950 border border-gray-250 font-bold text-xs rounded-lg p-3.5 focus:outline-none focus:border-primary placeholder-gray-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Transaction ID (TxnID)
                    </label>
                    <input
                      type="text"
                      name="transactionId"
                      required
                      value={manualData.transactionId}
                      onChange={handleManualInput}
                      placeholder="e.g. AX92K810L0"
                      className="w-full bg-light-gray text-gray-950 border border-gray-250 font-bold text-xs rounded-lg p-3.5 focus:outline-none focus:border-primary placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 text-white font-extrabold text-sm py-4 px-8 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 shadow-md hover-glow-red disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4.5 w-4.5 animate-spin" />
                  <span>Processing Order...</span>
                </>
              ) : (
                <>
                  <span>
                    {isCard && "Submit Card Payment"}
                    {isCod && "Place Cash on Delivery Order"}
                    {isManual && "Submit Payment Verification"}
                  </span>
                  <ArrowRight className="h-4.5 w-4.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
