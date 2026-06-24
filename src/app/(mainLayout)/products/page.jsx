import AllProductsPage from "../../../components/mainLayout/products/AllProducts";

function getProductList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.products)) return data.products;
  return [];
}

async function getProducts() {
  try {
    const res = await fetch("http://localhost:5000/api/products", {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    return getProductList(await res.json());
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function Page() {
  const initialProducts = await getProducts();

  return (
    <main>
      <AllProductsPage initialProducts={initialProducts} />
    </main>
  );
}
