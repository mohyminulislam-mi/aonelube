"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/app/(mainLayout)/provider/CartProvider";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";

const BRAND_RED = "#ED1C24";

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { user } = useAuth();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const accountHref = user ? "/dashboard" : "/login";

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Categories", href: "/products", icon: LayoutGrid },
    { label: "Cart", href: "/cart", icon: ShoppingCart, badge: cartCount },
    { label: "Account", href: accountHref, icon: User },
  ];

  return (
    <nav
      className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-stretch justify-around h-16">
        {navItems.map(({ label, href, icon: Icon, badge }) => {
          const active = isActive(pathname, href);

          return (
            <li key={label} className="flex-1">
              <Link
                href={href}
                className={`
                  flex flex-col items-center justify-center h-full gap-0.5 px-1
                  transition-all duration-150 active:scale-95
                  ${active ? "text-primary" : "text-gray-500 hover:text-gray-700"}
                `}
              >
                {/* Icon with optional cart badge */}
                <span className="relative">
                  <Icon
                    size={22}
                    strokeWidth={active ? 2.5 : 1.8}
                    style={{ color: active ? BRAND_RED : undefined }}
                  />
                  {badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] flex items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold leading-none px-0.5">
                      {badge > 99 ? "99+" : badge}
                    </span>
                  )}
                </span>

                {/* Label */}
                <span
                  className="text-[10px] font-semibold tracking-wide leading-none"
                  style={{ color: active ? BRAND_RED : undefined }}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
