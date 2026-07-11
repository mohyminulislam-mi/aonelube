"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ED1C24_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-md w-full text-center relative z-10">
        {/* Animated Accent Frame */}
        <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-6 animate-pulse">
          <AlertCircle size={48} />
        </div>

        <h1 className="text-7xl font-extrabold text-slate-900 tracking-tighter">
          4<span className="text-primary">0</span>4
        </h1>

        <h2 className="text-2xl font-bold text-slate-900 mt-4 tracking-tight">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-500 text-sm leading-relaxed">
          The engine lubricant specification or page you are looking for
          doesn&apos;t exist. It might have been moved or deleted permanently.
        </p>

        {/* Action Controls */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#d0141b] transition-colors shadow-md shadow-primary/10 flex items-center justify-center gap-2 text-sm"
          >
            <Home size={16} />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 px-5 py-2.5 rounded-xl font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
