"use client";

import React, { useEffect } from "react";
import { RotateCcw, AlertTriangle, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Analytics logging tracking runtime failures hooks ekhane trigger hobe
    console.error("Runtime system crash caught:", error);
  }, [error]);

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 text-center relative overflow-hidden">
        {/* Top Border Accent Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary"></div>

        <div className="inline-flex p-3.5 rounded-xl bg-amber-50 text-amber-500 mb-5 border border-amber-100">
          <AlertTriangle size={36} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          System Interruption
        </h1>

        <p className="mt-3 text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
          Something went wrong while processing fluid data parameters. Please
          try resetting the engine loop application instance.
        </p>

        {/* Error Detail Log Debugging container - User Interface configuration layer check */}
        <div className="mt-4 bg-slate-50 border border-slate-100 rounded-lg p-3 text-left">
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
            Error Diagnostics Block
          </p>
          <p className="text-xs font-mono text-slate-600 break-all bg-white p-2 rounded border border-slate-200 max-h-20 overflow-y-auto">
            {error.message ||
              "An unexpected dynamic client-side runtime exception occurred."}
          </p>
        </div>

        {/* Call to Actions Controls templates */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto bg-primary text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#d0141b] transition-colors shadow-md shadow-primary/10 flex items-center justify-center gap-2 text-sm"
          >
            <RotateCcw size={16} />
            Try Resetting
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto bg-slate-100 text-slate-700 hover:text-slate-900 px-5 py-2.5 rounded-xl font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Home size={16} />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
