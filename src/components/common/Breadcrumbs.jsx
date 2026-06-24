"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const pathname = usePathname();

  // If we are at the home page or a dashboard folder, hide breadcrumbs
  if (pathname === "/" || pathname.startsWith("/dashboard")) return null;

  const pathParts = pathname.split("/").filter(Boolean);

  const formatPart = (str) => {
    // Decode URL formatting e.g. %20 or dashes to spaces
    try {
      const decoded = decodeURIComponent(str);
      return decoded
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    } catch (e) {
      return str;
    }
  };

  return (
    <div className="bg-gray-50 border-b border-red-100 py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500">
          <Link
            href="/"
            className="flex items-center hover:text-primary transition-colors"
          >
            <Home className="h-3.5 w-3.5 mr-1 mt-0.5" />
            <span>Home</span>
          </Link>

          {pathParts.map((part, idx) => {
            const isLast = idx === pathParts.length - 1;
            const href = "/" + pathParts.slice(0, idx + 1).join("/");

            // Slice out standard MongoDB hex IDs in visual links
            const isHexId = part.match(/^[0-9a-fA-F]{24}$/);
            const label = isHexId ? "Product Details" : formatPart(part);

            return (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                {isLast ? (
                  <span className="text-gray-900 font-bold max-w-[200px] sm:max-w-none truncate">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumbs;
