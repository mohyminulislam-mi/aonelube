"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { getCategories } from "@/lib/api";

const staticCategories = [
  { name: "Car Engine Oils", slug: "car-engine-oils" },
  { name: "Motorcycle Engine Oils", slug: "motorcycle-engine-oils" },
  { name: "Bus & Truck Engine Oils", slug: "bus-truck-engine-oils" },
  { name: "Vehicle Care", slug: "vehicle-care" },
];

function normalizeCategories(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

export default function Footer() {
  const [categories, setCategories] = useState(staticCategories);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        const normalized = normalizeCategories(data);
        if (normalized.length > 0) {
          normalized.sort(
            (a, b) => (a.display_order || 0) - (b.display_order || 0),
          );
          setCategories(normalized);
        }
      } catch (error) {
        console.error("Failed to load footer categories:", error);
      }
    }
    loadCategories();
  }, []);
  return (
    <section className="bg-gray-100 text-gray-900 border-t border-gray-200">
      <div className="container mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span>
                <Link href="/">
                  <Image
                    src="/logo.png"
                    width={90}
                    height={28}
                    style={{ width: "auto", height: "auto" }}
                    priority
                    alt="Aonelube"
                  />
                </Link>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              A One Lube delivers premium German-engineered engine oils,
              transmission fluids, hydraulic oils, gear oils, industrial
              lubricants, and automotive fluids for superior engine protection,
              efficiency, and long-lasting performance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Important
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/products/category/${cat.slug}`}
                    className="text-sm text-gray-500 hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Phone className="w-4 h-4 shrink-0" /> +880 1850120709
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-500">
                <Mail className="w-4 h-4 shrink-0" /> rjgroup@gmail.com
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> 695/2/D, Manikdi
                Road, ECB Chattar, Dhaka Cantorment, Dhaka-1206
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 mb-14 md:mb-0 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-small text-gray-400">
            &copy; {new Date().getFullYear()} aonelube. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.inovixasoft.com/"
              target="_blank"
              className="text-small text-gray-400 hover:text-primary transition-colors"
            >
              Developed by <span className="text-primary">Inovixasoft</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
