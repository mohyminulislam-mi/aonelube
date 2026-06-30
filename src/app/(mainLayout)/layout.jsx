import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import MobileBottomNav from "@/components/common/MobileBottomNav";
import { CartProvider } from "./provider/CartProvider";

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <header>
        <Header />
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
