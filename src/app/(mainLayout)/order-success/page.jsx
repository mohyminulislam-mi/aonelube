"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
  CheckCircle2,
  Printer,
  Package,
  Truck,
  Award,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { getOrderDetail } from "@/lib/api";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push("/");
      return;
    }

    const fetchOrder = async () => {
      try {
        const savedOrder = localStorage.getItem(`aonelub_order_${orderId}`);
        if (savedOrder) {
          setOrder(JSON.parse(savedOrder));
        } else {
          // Fall back to fetch from backend API
          const response = await getOrderDetail(orderId);
          if (response?.order) {
            setOrder(response.order);
          } else if (response) {
            setOrder(response);
          }
        }
      } catch (err) {
        console.error("Fetch order error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId, router]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-gray-500">
          Retrieving secure invoice details...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">
          Order Invoice Not Found
        </h2>
        <Link
          href="/"
          className="text-primary hover:underline text-sm font-semibold"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 print:py-4">
      {/* Visual Header card */}
      <div className="bg-white rounded-2xl border border-gray-200/60 p-8 text-center space-y-4 shadow-sm print:hidden">
        <span className="h-16 w-16 bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center rounded-full mx-auto">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </span>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none">
          ORDER PLACED SUCCESSFULLY
        </h1>
        <p className="text-gray-500 text-sm font-semibold max-w-sm mx-auto">
          Thank you for purchasing! Your shipping address is recorded and a
          dispatch notification is on the way.
        </p>

        <div className="pt-2 flex flex-wrap gap-4 justify-center">
          <button
            onClick={handlePrint}
            className="bg-dark hover:bg-primary text-white font-extrabold text-xs py-3.5 px-6 cursor-pointer rounded-lg flex items-center space-x-2 transition-all duration-300 shadow-md hover-glow-red"
          >
            <Printer className="h-4 w-4" />
            <span>Print Invoice Reciept</span>
          </button>
          <Link
            href="/dashboard/my-orders"
            className="bg-light-gray hover:bg-gray-200 text-gray-800 border border-gray-200 font-bold text-xs py-3.5 px-6 rounded-lg transition-all shadow-sm"
          >
            Track Order In Dashboard
          </Link>
        </div>
      </div>

      {/* Invoice Breakdown sheet */}
      <div className="bg-white rounded-2xl border border-gray-200/60 shadow-md p-8 sm:p-12 space-y-10 print:border-none print:shadow-none print:p-0">
        {/* Top Header metadata */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-gray-150 pb-8">
          <div className="space-y-1.5">
            <span className="font-extrabold text-2xl tracking-tight text-gray-950 block">
              A ONE <span className="text-primary">LUB</span>
            </span>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider block">
              Receipt / Invoice Invoice
            </span>
          </div>

          <div className="space-y-1 text-left sm:text-right text-xs font-bold text-gray-500">
            <p>
              Invoice No:{" "}
              <span className="text-gray-950 font-black">
                {order.invoiceNumber}
              </span>
            </p>
            <p>
              Tracking ID:{" "}
              <span className="text-gray-950 font-black">
                {order.trackingId}
              </span>
            </p>
            <p>
              Date:{" "}
              <span className="text-gray-950 font-black">
                {new Date(order.createdAt).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>

        {/* Shipping address & payment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs sm:text-sm font-semibold text-gray-600">
          <div className="space-y-2">
            <h4 className="font-black text-gray-900 uppercase tracking-widest text-[10px]">
              Deliver Shipping Destination
            </h4>
            <div className="space-y-1">
              <p className="text-gray-950 font-bold">
                {order.user?.name || "Customer Profile"}
              </p>
              <p>{order.shippingAddress?.street}</p>
              <p>
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.postalCode}
              </p>
              <p>{order.shippingAddress?.country}</p>
            </div>
          </div>

          <div className="space-y-2 sm:text-right">
            <h4 className="font-black text-gray-900 uppercase tracking-widest text-[10px]">
              Payment Details
            </h4>
            <div className="space-y-1">
              <p>
                Method:{" "}
                <span className="text-gray-950 font-bold uppercase">
                  {order.paymentMethod}
                </span>
              </p>
              <p>
                Status:{" "}
                <span
                  className={`${order.orderStatus === "pending_verification" ? "text-amber-600" : "text-emerald-600"} font-extrabold uppercase`}
                >
                  {order.orderStatus === "pending_verification"
                    ? "PENDING VERIFICATION"
                    : order.paymentStatus}
                </span>
              </p>
              {order.paymentMethod === "manual" &&
                order.manualPaymentDetails && (
                  <>
                    <p>
                      Channel:{" "}
                      <span className="text-gray-950 font-bold uppercase">
                        {order.manualPaymentDetails.paymentMethod}
                      </span>
                    </p>
                    <p>
                      Sender:{" "}
                      <span className="text-gray-950 font-bold">
                        {order.manualPaymentDetails.senderMobile}
                      </span>
                    </p>
                    <p>
                      Txn ID:{" "}
                      <span className="text-[#e30613] font-bold uppercase">
                        {order.manualPaymentDetails.transactionId}
                      </span>
                    </p>
                  </>
                )}
            </div>
          </div>
        </div>

        {/* List of items */}
        <div className="space-y-4">
          <h4 className="font-black text-gray-900 uppercase tracking-widest text-[10px]">
            Purchased Grades
          </h4>
          <div className="border border-gray-200/60 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs sm:text-sm font-semibold">
              <thead className="bg-light-gray border-b border-gray-200 text-gray-500 font-black text-[10px] uppercase tracking-wider">
                <tr>
                  <th className="p-4">Lubricant Name</th>
                  <th className="p-4 text-center">Quantity</th>
                  <th className="p-4 text-right">Unit Price</th>
                  <th className="p-4 text-right">Total Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-150 text-gray-950">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-4 font-bold">
                      {item.product?.name || item.name}
                    </td>
                    <td className="p-4 text-center">{item.quantity}</td>
                    <td className="p-4 text-right">৳{item.price.toFixed(2)}</td>
                    <td className="p-4 text-right">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calculations breakdown block */}
        <div className="flex justify-end pt-4">
          <div className="w-full sm:w-80 space-y-3.5 text-xs sm:text-sm font-semibold text-gray-500">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-gray-950 font-bold">
                ৳{order.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="text-gray-950 font-bold">
                ৳{order.shippingCost.toFixed(2)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-primary font-bold">
                <span>Coupon Applied</span>
                <span>-৳{order.discount.toFixed(2)}</span>
              </div>
            )}
            <hr className="border-gray-100" />
            <div className="flex justify-between text-base font-black text-gray-950">
              <span>Grand Total</span>
              <span className="text-lg text-primary">
                ৳{order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen bg-light-gray">
      <Breadcrumbs />
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-sm font-semibold text-gray-500">
              Loading Suspense Frame...
            </p>
          </div>
        }
      >
        <OrderSuccessContent />
      </Suspense>
    </div>
  );
}
