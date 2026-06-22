import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";

export default function RootLayout({ children }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
