import ProductDetails from "@/components/mainLayout/products/ProductDetails";
import React from "react";
import { getProducts, getProductDetail } from "@/lib/api";

function getProductList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.products)) return data.products;
  return [];
}

function slugify(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

async function getProductBySlug(slug) {
  try {
    // Try direct slug/id lookup first
    const data = await getProductDetail(slug);
    if (data?.product) return data.product;
    if (data && !Array.isArray(data) && (data._id || data.id || data.slug)) return data;
  } catch {
    // fall through to list search
  }

  try {
    const raw = await getProducts({ limit: 100 });
    const products = getProductList(raw);
    return products.find((product) => matchesProduct(product, slug)) || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
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
