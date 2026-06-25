"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8F9FA]">
        <p className="text-sm font-semibold text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  return <div>{children}</div>;
}
