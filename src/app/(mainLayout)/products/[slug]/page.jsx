import ProductDetails from "@/components/mainLayout/products/ProductDetails";
import React from "react";


// নির্দিষ্ট স্ল্যাগ অনুযায়ী ডাটা ফেচ করার ফাংশন
async function getProductBySlug(slug) {
  try {
    const res = await fetch(`http://localhost:5000/api/products/${slug}`, {
      next: { revalidate: 1800 }, // ৩০ মিনিট পর পর ক্যাশ আপডেট হবে
    });

    if (!res.ok) {
      return null; // প্রোডাক্ট না পাওয়া গেলে বা এরর হলে null রিটার্ন করবে
    }

    const data = await res.json();
    
    // আপনার API রেসপন্সে মূল ডাটা "product" কী-এর ভেতরে আছে (data.product)
    if (data && data.success && data.product) {
      return data.product; 
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// SEO অপ্টিমাইজেশনের জন্য ডাইনামিক মেটাডাটা জেনারেট করা
export async function generateMetadata({ params }) {
  const resolvedParams = await params; // Next.js সেফটি স্ট্যান্ডার্ড
  const { slug } = resolvedParams;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: `${product.name} | MJL Bangladesh`,
    description: product.description || `Buy ${product.name} at the best price.`,
  };
}

// মূল পেজ কম্পোনেন্ট
export default async function Page({ params }) {
  const resolvedParams = await params; // Next.js সেফটি স্ট্যান্ডার্ড
  const { slug } = resolvedParams;
  const product = await getProductBySlug(slug);
 
  // প্রোডাক্ট ডাটা না থাকলে নট ফাউন্ড মেসেজ দেখাবে
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
        <p className="text-gray-500 mt-1">The product you are looking for does not exist or has been moved.</p>
      </div>
    );
  }

  return (
    <main>
      {/* ফেচ করা স্পেসিফিক প্রোডাক্ট ডাটা ক্লায়েন্ট কম্পোনেন্টে পাস করা হচ্ছে */}
      <ProductDetails product={product} />
    </main>
  );
}