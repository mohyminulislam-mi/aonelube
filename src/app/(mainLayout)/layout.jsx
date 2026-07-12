import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import { CartProvider } from "./provider/CartProvider";
import { Suspense } from "react";

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <header>
        <Suspense fallback={<div className="h-20 bg-white" />}>
          <Header />
        </Suspense>
      </header>
      {/* pb-16 reserves space for the fixed bottom nav on mobile; removed at xl */}
      <main className="pb-16 xl:pb-0">{children}</main>
      <footer>
        <Footer />
      </footer>
      <MobileBottomNav />
    </CartProvider>
  );
}
