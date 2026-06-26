import ProductDetails from "@/components/mainLayout/products/ProductDetails";
import React from "react";

function slugify(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getProductList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.products)) return data.products;
  return [];
}

function matchesProduct(product, slug) {
  const target = decodeURIComponent(slug);
  const productValues = [
    product?.slug,
    product?._id,
    product?.id,
    slugify(product?.name),
  ]
    .filter(Boolean)
    .map(String);

  return productValues.some(
    (value) => value === target || slugify(value) === target,
  );
}

async function getProducts() {
  try {
    const res = await fetch("https://aonelube-server.vercel.app/api/products", {
      next: { revalidate: 1800 },
    });

    if (!res.ok) return [];

    return getProductList(await res.json());
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getProductBySlug(slug) {
  try {
    const res = await fetch(
      `https://aonelube-server.vercel.app/api/products/${encodeURIComponent(slug)}`,
      { next: { revalidate: 1800 } },
    );

    if (res.ok) {
      const data = await res.json();
      if (data?.product) return data.product;
      if (data && !Array.isArray(data) && (data._id || data.id || data.slug))
        return data;
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  const products = await getProducts();
  return products.find((product) => matchesProduct(product, slug)) || null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | MJL Bangladesh`,
    description:
      product.description || `Buy ${product.name} at the best price.`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="text-gray-500 mt-1">
          The product you are looking for does not exist or has been moved.
        </p>
      </div>
    );
  }

  return (
    <main>
      <ProductDetails product={product} />
    </main>
  );
}
