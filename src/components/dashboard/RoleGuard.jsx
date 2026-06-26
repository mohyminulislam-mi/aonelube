"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";

export default function RoleGuard({ children, allowedRoles = [], fallback = null }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-6 text-sm text-slate-600 shadow-sm">
        Checking access...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    if (fallback) {
      return fallback;
    }

    return (
      <div className="rounded-2xl border border-red-200 bg-[#FFF5F5] p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-xl font-semibold text-slate-800">Access Denied</h2>
        <p className="mt-2 text-sm text-slate-600">
          You do not have permission to view this section.
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-flex rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return children;
}
