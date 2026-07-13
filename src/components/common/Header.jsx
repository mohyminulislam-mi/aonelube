"use client";

import React, { useEffect, useRef, useState } from "react";
import LinkNext from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  ShoppingCart,
  Phone,
  Menu,
  X,
  User,
  ChevronDown,
  LogIn,
  LogOut,
  LayoutDashboard,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCart } from "@/app/(mainLayout)/provider/CartProvider";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";
import Image from "next/image";
import { getCategories } from "@/lib/api";

function normalizeCategories(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export default function Header() {
  const router = useRouter();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);

  const pathname = usePathname();
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const searchParams = useSearchParams();
  const searchParamQuery = searchParams ? searchParams.get("search") || "" : "";
  const [searchVal, setSearchVal] = useState(searchParamQuery);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearchVal(searchParamQuery);
    }, 0);
    return () => clearTimeout(t);
  }, [searchParamQuery]);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (searchVal.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchVal.trim())}`);
    } else {
      router.push("/products");
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        const normalized = normalizeCategories(data);
        normalized.sort(
          (a, b) => (a.display_order || 0) - (b.display_order || 0),
        );
        setCategories(normalized);
      } catch (error) {
        console.error("Failed to load header categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  const navigationItems = [
    ...categories.map((c) => ({
      label: c.name,
      href: `/products/category/${c.slug}`,
    })),
    { label: "Campaign", href: "#" },
  ];

  useEffect(() => {
    if (!isAccountMenuOpen) return;

    const handleClickOutside = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAccountMenuOpen]);

  const closeMenus = () => {
    setIsAccountMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const userInitial = (user?.name || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <section className="w-full bg-white shadow-sm sticky top-0 z-50 font-sans">
      {/* Top Bar: Logos, Search, Profile, Cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logos */}
          <div className="flex items-center space-x-4 shrink-0">
            <Link href="/">
              <Image
                src="/logo.png"
                width={130}
                height={40}
                style={{ width: "auto", height: "auto" }}
                priority
                alt="Aonelube"
              />
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full bg-[#F2F4F7] text-gray-700 pl-4 pr-10 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-transparent border-none cursor-pointer flex items-center justify-center text-primary"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Right Side Actions (User, Cart, Hotline, Mobile Toggle) */}
          <div className="flex items-center space-x-3 lg:space-x-6">
            {/* User Profile */}
            <div className="hidden lg:flex items-center" ref={accountMenuRef}>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsAccountMenuOpen((prev) => !prev)}
                    className="flex items-center gap-2 cursor-pointer rounded-full border border-gray-200 bg-white px-2.5 py-2 shadow-sm transition hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
                      {userInitial}
                    </div>
                    <span className="hidden xl:block text-sm font-semibold text-gray-700">
                      {user.name || user.email}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition ${isAccountMenuOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isAccountMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl"
                      >
                        <div className="px-2 py-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {user.name || "User"}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-500">
                            {user.email}
                          </p>
                        </div>
                        <div className="my-2 h-px bg-gray-200" />
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            router.push("/dashboard");
                          }}
                          className="flex w-full items-center cursor-pointer gap-2 rounded-xl px-2 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          <LayoutDashboard className="h-4 w-4 text-primary" />
                          My Dashboard
                        </button>
                        <button
                          onClick={() => {
                            setIsAccountMenuOpen(false);
                            router.push("/dashboard/my-orders");
                          }}
                          className="flex w-full items-center cursor-pointer gap-2 rounded-xl px-2 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                          <Package className="h-4 w-4 text-primary" />
                          My Orders
                        </button>
                        <div className="my-2 h-px bg-gray-200" />
                        <button
                          onClick={async () => {
                            setIsAccountMenuOpen(false);
                            await logout();
                            router.push("/");
                          }}
                          className="flex w-full items-center cursor-pointer gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center gap-2 rounded-full border border-primary bg-white px-3 py-2 text-sm font-semibold text-primary transition duration-200 hover:border-primary hover:bg-primary hover:text-white"
                  >
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center rounded-full bg-primary px-3 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-[#d1171e]"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 bg-primary cursor-pointer hover:bg-[#d1171e] rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#62090c] text-accent-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hotline Button */}
            <Link
              href="tel:+8801850120709"
              className="bg-primary hover:bg-[#d1171e] text-white px-4 py-2.5 rounded-full flex items-center space-x-2 shadow-sm font-bold text-sm transition-all shrink-0"
            >
              <Phone className="h-4 w-4 fill-white" />
              <span>Call Us</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop (xl and up) */}
      <div className="hidden xl:block border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <nav className="flex items-center space-x-1 py-1">
            {isLoadingCategories ? (
              <div className="flex items-center space-x-6 py-3.5">
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-36 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : (
              navigationItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <LinkNext
                    key={index}
                    href={item.href}
                    className={`px-3 py-3 text-[13px] font-bold tracking-wide whitespace-nowrap transition-colors border-b-2 ${
                      isActive
                        ? "text-primary border-primary"
                        : "text-gray-700 hover:text-primary border-transparent"
                    }`}
                  >
                    {item.label}
                  </LinkNext>
                );
              })
            )}
          </nav>

          {/* CTA Button */}
          <LinkNext
            href="#"
            className="bg-[#1A1A1A] hover:bg-black text-white px-6 py-3.5 text-[13px] font-bold tracking-wider uppercase transition-colors shrink-0"
          >
            Get Lube Solution
          </LinkNext>
        </div>
      </div>

      {/* Mobile Menu Drawer. */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-200 bg-white px-4 pt-4 pb-6 space-y-4 shadow-inner">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative w-full md:hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full bg-[#F2F4F7] text-gray-700 pl-4 pr-10 py-2 rounded-lg text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-transparent border-none cursor-pointer flex items-center justify-center text-primary"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Mobile User Profile */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 lg:hidden">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-black text-white">
                    {userInitial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {user.name || user.email}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <button
                    onClick={() => {
                      closeMenus();
                      router.push("/dashboard");
                    }}
                    className="flex w-full items-center gap-2  cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700"
                  >
                    <LayoutDashboard className="h-4 w-4 text-primary" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      closeMenus();
                      router.push("/dashboard/my-orders");
                    }}
                    className="flex w-full items-center gap-2 rounded-lg cursor-pointer border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700"
                  >
                    <Package className="h-4 w-4 text-primary" />
                    My Orders
                  </button>
                  <button
                    onClick={async () => {
                      closeMenus();
                      await logout();
                      router.push("/");
                    }}
                    className="flex w-full items-center gap-2 cursor-pointer rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-primary/20 bg-white px-3 py-2.5 text-sm font-semibold text-primary"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-1">
            {isLoadingCategories ? (
              <div className="space-y-3 py-2">
                <div className="h-8 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-8 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-8 w-full bg-gray-100 rounded animate-pulse" />
                <div className="h-8 w-full bg-gray-100 rounded animate-pulse" />
              </div>
            ) : (
              navigationItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <LinkNext
                    key={index}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-3 py-2.5 rounded-md text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-primary/15 text-primary"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </LinkNext>
                );
              })
            )}
          </nav>

          {/* Mobile CTA */}
          <LinkNext
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full bg-[#1A1A1A] text-white text-center py-3 rounded-md text-sm font-bold uppercase tracking-wider"
          >
            Get Lube Solution
          </LinkNext>
        </div>
      )}
    </section>
  );
}
