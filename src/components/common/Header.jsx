"use client";

import React, { useState } from "react";
import LinkNext from "next/link";
import {
  Search,
  ShoppingCart,
  Phone,
  Menu,
  X,
  User,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/(mainLayout)/provider/CartProvider";

export default function Header() {
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Car Engine Oils", href: "#" },
    { label: "Motorcycle Engine Oils", href: "#" },
    { label: "Bus & Truck Engine Oils", href: "#" },
    { label: "Vehicle Care & Other Lubricants", href: "#" },
    { label: "Industrial & Specialty Lubricants", href: "#" },
    { label: "Campaign", href: "#" },
  ];

  return (
    <section className="w-full bg-white shadow-sm sticky top-0 z-50 font-sans">
      {/* Top Bar: Logos, Search, Profile, Cart */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logos */}
          <div className="flex items-center space-x-4 shrink-0">
            <LinkNext href="/" className="flex items-center">
              {/* Mobil Logo */}
              <span className="text-3xl md:text-4xl font-black tracking-tighter text-[#005CA9]">
                M<span className="text-[#ED1C24]">o</span>bil
              </span>
              <span className="text-[10px] font-bold text-[#005CA9] align-super ml-0.5">
                TM
              </span>
            </LinkNext>

            {/* Divider & Partner Logo */}
            <div className="hidden sm:block h-10 w-[1px] bg-gray-300"></div>
            <div className="hidden sm:block text-left">
              <span className="block text-[10px] text-gray-500 leading-tight">
                brought to you by
              </span>
              <span className="block text-xs md:text-sm font-bold text-gray-800 tracking-tight">
                MJL Bangladesh PLC.
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-[#F2F4F7] text-gray-700 pl-4 pr-10 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#005CA9] transition-all"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-[#ED1C24] cursor-pointer" />
            </div>
          </div>

          {/* Right Side Actions (User, Cart, Hotline, Mobile Toggle) */}
          <div className="flex items-center space-x-3 lg:space-x-6">
            {/* User Profile */}
            <div className="hidden lg:flex items-center space-x-2 cursor-pointer group">
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#005CA9] transition-colors">
                Mohyminul Islam
              </span>
              <div className="p-2 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-colors">
                <User className="h-5 w-5 text-gray-800" />
              </div>
            </div>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 bg-[#ED1C24] cursor-pointer hover:bg-[#d1171e] rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Hotline Button */}
            <a
              href="tel:16669"
              className="bg-[#ED1C24] hover:bg-[#d1171e] text-white px-4 py-2.5 rounded-full flex items-center space-x-2 shadow-sm font-bold text-sm transition-all shrink-0"
            >
              <Phone className="h-4 w-4 fill-white" />
              <span>16669</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
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
          <nav className="flex space-x-1 py-1">
            {navigationItems.map((item, index) => (
              <LinkNext
                key={index}
                href={item.href}
                className="text-gray-800 hover:text-[#005CA9] px-3 py-3 text-[13px] font-semibold tracking-wide whitespace-nowrap transition-colors"
              >
                {item.label}
              </LinkNext>
            ))}
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

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-gray-200 bg-white px-4 pt-4 pb-6 space-y-4 shadow-inner">
          {/* Mobile Search */}
          <div className="relative w-full md:hidden">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-[#F2F4F7] text-gray-700 pl-4 pr-10 py-2 rounded-lg text-sm focus:outline-none"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-[#ED1C24]" />
          </div>

          {/* Mobile User Profile */}
          <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg lg:hidden">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-800">
              Mohyminul Islam
            </span>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-1">
            {navigationItems.map((item, index) => (
              <LinkNext
                key={index}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:text-[#005CA9] hover:bg-gray-50 px-3 py-2.5 rounded-md text-sm font-medium transition-all"
              >
                {item.label}
              </LinkNext>
            ))}
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
