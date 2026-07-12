import AllProductsPage from "../../../components/mainLayout/products/AllProducts";
import { getProducts, getCategories } from "@/lib/api";
import { Suspense } from "react";

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
      <Suspense
        fallback={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <AllProductsPage
          initialProducts={initialProducts}
          initialCategories={initialCategories}
        />
      </Suspense>
    </main>
  );
}
