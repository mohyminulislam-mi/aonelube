import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import { CartProvider } from "./provider/CartProvider";

export default function RootLayout({ children }) {
  return (
    <CartProvider>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </CartProvider>
  );
}
