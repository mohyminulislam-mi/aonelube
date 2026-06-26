import React from "react";
import RoleGuard from "@/components/dashboard/RoleGuard";

const page = () => {
  return (
    <RoleGuard allowedRoles={["user", "manager", "admin"]}>
      <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Dashboard</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-800">Welcome to your dashboard</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Access your orders, profile, and management tools from the navigation on the left.
        </p>
      </div>
    </RoleGuard>
  );
};

export default page;
