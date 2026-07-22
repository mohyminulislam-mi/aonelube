"use client";

import React, { useEffect } from "react";
import { RotateCcw, AlertTriangle, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Analytics logging tracking runtime failures
    console.error("Runtime error caught:", error);
  }, [error]);

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-outfit flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 text-center relative overflow-hidden">
        {/* Top Border Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-red-500"></div>

        {/* Warning Icon Container */}
        <div className="inline-flex p-3.5 rounded-2xl bg-red-50 text-red-500 mb-5 border border-red-100">
          <AlertTriangle size={36} />
        </div>

        {/* User Friendly Title */}
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Oops! Something Went Wrong
        </h1>

        {/* Clear & Simple Message */}
        <p className="mt-3 text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
          We encountered an unexpected issue while loading this page. Please try refreshing or return to the homepage.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
          {/* Try Again / Reset */}
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto cursor-pointer text-white px-5 py-2.5 rounded-xl font-medium bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
          >
            <RotateCcw size={16} />
            Try Again
          </button>

          {/* Go Back */}
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto cursor-pointer bg-slate-100 text-slate-700 hover:bg-slate-200 px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          {/* Return Home */}
          <Link
            href="/"
            className="w-full sm:w-auto border border-slate-200 text-slate-700 hover:bg-slate-50 px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Home size={16} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}