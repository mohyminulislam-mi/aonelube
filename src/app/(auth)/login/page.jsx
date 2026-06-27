"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });

      Swal.fire({
        icon: "success",
        title: "Login successful",
        text: "Welcome back!",
        confirmButtonColor: "#e30613",
        background: "#ffffff",
        color: "#171717",
      });

      const redirect = searchParams.get("redirect");
      if (redirect && redirect.startsWith("/") && !redirect.startsWith("//") && !redirect.startsWith("/\\")) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: error.message || "Please check your credentials and try again.",
        confirmButtonColor: "#e30613",
        background: "#ffffff",
        color: "#171717",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-md items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full rounded-[28px] border border-gray-200 bg-white p-6 shadow-[0_20px_60px_-22px_rgba(15,23,42,0.25)] sm:p-8"
        >
          <div className="mb-8 text-center">
            <Link href="/" className="mx-auto inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-sm font-semibold uppercase tracking-[0.2em] text-white">
                A
              </div>
              <span className="text-base font-semibold tracking-[0.2em] text-slate-900">
                A ONE LUB
              </span>
            </Link>
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Sign In</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Welcome back. Enter your details to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition duration-200 focus:scale-[1.01] focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Link href="#" className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition duration-200 focus:scale-[1.01] focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
              <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-red-600 hover:text-red-700 hover:underline">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
