"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";

const CartContext = createContext();
const CART_STORAGE_KEY = "aonelub_cart";
const alertTheme = {
  background: "#ffffff",
  color: "#171717",
  confirmButtonColor: "#e30613",
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartReady, setIsCartReady] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
      } catch (error) {
        console.error("Cart load error:", error);
        setCartItems([]);
      } finally {
        setIsCartReady(true);
      }
    });
  }, []);

  // Sync to localStorage on mutations
  const saveCartToStorage = (items) => {
    setCartItems(items);
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  };

  const addToCart = (product, quantity = 1, silent = false) => {
    const productId = product.id || product._id || product.slug;
    const availableStock = Number(product.stock ?? 9999);
    const itemsCopy = [...cartItems];
    const existingIndex = itemsCopy.findIndex(
      (item) => item.product === productId,
    );

    if (existingIndex > -1) {
      const targetQty = itemsCopy[existingIndex].quantity + quantity;
      if (targetQty > availableStock) {
        if (!silent) {
          Swal.fire({
            icon: "warning",
            title: "Stock Warning",
            text: `Only ${availableStock} units are currently in stock!`,
            ...alertTheme,
          });
        }
        return;
      }
      itemsCopy[existingIndex].quantity = targetQty;
    } else {
      if (quantity > availableStock) {
        if (!silent) {
          Swal.fire({
            icon: "warning",
            title: "Stock Warning",
            text: `Only ${availableStock} units are currently in stock!`,
            ...alertTheme,
          });
        }
        return;
      }
      itemsCopy.push({
        product: productId,
        name: product.name,
        price:
          product.discountPrice != null ? product.discountPrice : product.price,
        image:
          product.image_url ||
          product.image ||
          product.images?.[0] ||
          "https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80&w=300",
        quantity: quantity,
        stock: availableStock,
      });
    }

    saveCartToStorage(itemsCopy);

    if (!silent) {
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: `${product.name} has been added to your shopping cart.`,
        timer: 1500,
        showConfirmButton: false,
        ...alertTheme,
      });
    }
  };

  const updateQuantity = (productId, newQty) => {
    if (newQty < 1) return;

    const itemsCopy = [...cartItems];
    const index = itemsCopy.findIndex((item) => item.product === productId);

    if (index > -1) {
      if (newQty > itemsCopy[index].stock) {
        Swal.fire({
          icon: "warning",
          title: "Max Stock Exceeded",
          text: `Only ${itemsCopy[index].stock} units are available.`,
          ...alertTheme,
        });
        return;
      }
      itemsCopy[index].quantity = newQty;
      saveCartToStorage(itemsCopy);
    }
  };

  const removeFromCart = (productId) => {
    const filtered = cartItems.filter((item) => item.product !== productId);
    saveCartToStorage(filtered);

    Swal.fire({
      icon: "success",
      title: "Item Removed",
      text: "Item has been removed from your cart.",
      timer: 1200,
      showConfirmButton: false,
      ...alertTheme,
    });
  };

  const clearCart = () => {
    saveCartToStorage([]);
    setCoupon(null);
    setCouponError("");
  };

  // Coupon promo logic
  const applyCoupon = (code) => {
    const upperCode = code.trim().toUpperCase();
    setCouponError("");

    // Pre-seeded standard discount coupons validation
    if (upperCode === "LUBRICANT10") {
      setCoupon({
        code: "LUBRICANT10",
        discountType: "percentage",
        discountValue: 10,
        minPurchase: 50,
      });
      Swal.fire({
        icon: "success",
        title: "Coupon Applied!",
        text: "10% discount has been applied to your order subtotal.",
        ...alertTheme,
      });
    } else if (upperCode === "AONEFREE") {
      setCoupon({
        code: "AONEFREE",
        discountType: "flat",
        discountValue: 15,
        minPurchase: 100,
      });
      Swal.fire({
        icon: "success",
        title: "Coupon Applied!",
        text: "$15 flat discount has been applied to your order subtotal.",
        ...alertTheme,
      });
    } else {
      setCouponError("Invalid coupon code entered.");
      setCoupon(null);
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponError("");
  };

  // Computations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 5.0;

  let discount = 0;
  if (coupon && subtotal >= coupon.minPurchase) {
    if (coupon.discountType === "percentage") {
      discount = subtotal * (coupon.discountValue / 100);
    } else {
      discount = coupon.discountValue;
    }
  }

  const total = Math.max(0, subtotal + shipping - discount);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        subtotal,
        shipping,
        discount,
        total,
        coupon,
        couponError,
        isCartReady,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
