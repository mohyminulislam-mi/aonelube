import React from "react";
import AllProductsPage from "../../../components/mainLayout/products/AllProducts";

// ডেটা ফেচ করার জন্য পিওর জাভাস্ক্রিপ্ট ফাংশন
async function getProducts() {
  // আপনার রিয়েল API এন্ডপয়েন্ট এখানে বসাবেন
  // Next.js ডিফল্টভাবেই এই fetch-টিকে ক্যাশ (force-cache) করে রাখবে
  const res = await fetch("http://localhost:5000/api/products", {
    next: { revalidate: 3600 }, // রিয়েল-ওয়ার্ল্ড এক্সপেরিয়েন্স: প্রতি ১ ঘণ্টায় ডেটা ব্যাকগ্রাউন্ডে রি-ভ্যালিডেট হবে
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function Page() {
  // সার্ভার সাইড থেকে ডেটা ফেচ হচ্ছে
  const initialProducts = await getProducts();

  return (
    <main>
      {/* ফেচ করা ডেটা ক্লায়েন্ট কম্পোনেন্টে প্রপ্স হিসেবে পাঠানো হচ্ছে */}
      <AllProductsPage initialProducts={initialProducts.products} />
    </main>
  );
}