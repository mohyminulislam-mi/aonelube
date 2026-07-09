import AllProductsPage from "../../../components/mainLayout/products/AllProducts";
import { getProducts, getCategories } from "@/lib/api";

function normalizeProducts(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.products)) return payload.products;
  return [];
}

function normalizeCategories(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
}

async function fetchAllProducts() {
  try {
    const data = await getProducts({ limit: 100 });
    return normalizeProducts(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function fetchAllCategories() {
  try {
    const data = await getCategories();
    return normalizeCategories(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function Page() {
  const [initialProducts, initialCategories] = await Promise.all([
    fetchAllProducts(),
    fetchAllCategories(),
  ]);

  return (
    <main>
      <AllProductsPage
        initialProducts={initialProducts}
        initialCategories={initialCategories}
      />
    </main>
  );
}
