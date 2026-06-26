"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  ShoppingBag,
  Store,
  Tags,
  UserCircle2,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";

const getNavItems = (role) => {
  const baseItems = [
    { href: "/dashboard", label: "Dashboard Home", icon: LayoutDashboard },
    { href: "/dashboard/orders", label: "My Orders", icon: ShoppingBag },
    { href: "/dashboard/profile", label: "My Profile", icon: UserCircle2 },
  ];

  if (role === "manager" || role === "admin") {
    baseItems.push(
      { href: "/dashboard/products", label: "Manage Products", icon: Package },
      { href: "/dashboard/categories", label: "Manage Categories", icon: Tags }
    );
  }

  if (role === "admin") {
    baseItems.push(
      { href: "/dashboard/users", label: "Manage Users", icon: Users },
      { href: "/dashboard/analytics", label: "Dashboard Analytics", icon: BarChart3 }
    );
  }

  return baseItems;
};

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo(() => getNavItems(user?.role || "user"), [user?.role]);

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

  const displayName = user?.name || user?.fullName || user?.email || "User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const roleLabel = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "User";

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800">
      <div className="flex min-h-screen flex-col md:flex-row">
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 border-r border-red-100 bg-white/95 shadow-sm backdrop-blur transition-transform duration-200 md:static md:translate-x-0 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="border-b border-red-100 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">Dashboard</p>
                  <h2 className="text-lg font-semibold text-slate-800">Aonelube</h2>
                </div>
                <button
                  type="button"
                  className="rounded-full p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 md:hidden"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-[#FFF5F5] p-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 font-semibold text-white">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-800">{displayName}</p>
                  <span className="inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-red-600 shadow-sm">
                    {roleLabel}
                  </span>
                </div>
              </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-red-600 text-white shadow-sm"
                        : "text-slate-600 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="space-y-2 border-t border-red-100 p-4">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              >
                <Store className="h-4 w-4" />
                <span>Back to Store</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl border border-red-200 px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <header className="border-b border-red-100 bg-white/90 px-4 py-4 shadow-sm backdrop-blur md:hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">Dashboard</p>
                <h2 className="text-base font-semibold text-slate-800">Welcome back</h2>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="rounded-full p-2 text-slate-600 hover:bg-red-50 hover:text-red-600"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </header>

          <main className="p-4 md:p-6 lg:p-8">{children}</main>
        </div>
      </div>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-30 bg-slate-900/30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
    </div>
  );
}
