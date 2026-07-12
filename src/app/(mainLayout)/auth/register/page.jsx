"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Eye, EyeOff, UserCheck, MapPin } from "lucide-react";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";
import { DIVISIONS, DISTRICTS } from "@/lib/bangladeshData";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      role: "customer",
      division: "",
      district: "",
    }
  });

  const password = watch("password", "");
  const selectedDivision = watch("division");

  useEffect(() => {
    setValue("district", "");
  }, [selectedDivision, setValue]);

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        division: data.division,
        district: data.district,
      });

      if (data.role === "manager") {
        Swal.fire({
          icon: "info",
          title: "Registration successful",
          text: "Your manager account is pending admin approval. You can login but will have limited access until approved.",
          confirmButtonColor: "#e30613",
          background: "#ffffff",
          color: "#171717",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Registration successful",
          text: "Your account has been created. Please log in to continue.",
          confirmButtonColor: "#e30613",
          background: "#ffffff",
          color: "#171717",
        });
      }

      router.push("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration failed",
        text: error.message || "Please try again.",
        confirmButtonColor: "#e30613",
        background: "#ffffff",
        color: "#171717",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
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
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-semibold text-red-600 hover:text-red-700 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition duration-200 focus:scale-[1.01] focus:border-red-400 focus:ring-2 focus:ring-red-100"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

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
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Password
                </label>
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
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition duration-200 focus:scale-[1.01] focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    placeholder="Create password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Confirm
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) => value === password || "Passwords do not match",
                    })}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition duration-200 focus:scale-[1.01] focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    placeholder="Re-enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((value) => !value)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            {/* Role dropdown */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Role
              </label>
              <div className="relative">
                <UserCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <select
                  {...register("role", { required: "Role is required" })}
                  className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm text-slate-900 outline-none transition duration-200 focus:scale-[1.01] focus:border-red-400 focus:ring-2 focus:ring-red-100 appearance-none cursor-pointer"
                >
                  <option value="customer">Customer</option>
                  <option value="manager">Manager</option>
                </select>
                <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
              {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
            </div>

            {/* Division & District */}
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Division
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    {...register("division", { required: "Division is required" })}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm text-slate-900 outline-none transition duration-200 focus:scale-[1.01] focus:border-red-400 focus:ring-2 focus:ring-red-100 appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Division</option>
                    {DIVISIONS.map((div) => (
                      <option key={div} value={div}>
                        {div}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
                {errors.division && <p className="mt-1 text-sm text-red-600">{errors.division.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  District
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select
                    {...register("district", { required: "District is required" })}
                    disabled={!selectedDivision}
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm text-slate-900 outline-none transition duration-200 focus:scale-[1.01] focus:border-red-400 focus:ring-2 focus:ring-red-100 appearance-none cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="" disabled>Select District</option>
                    {selectedDivision &&
                      DISTRICTS[selectedDivision]?.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
                {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district.message}</p>}
              </div>
            </div>

            <label className="flex items-start gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-slate-600">
              <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500" />
              <span>I agree to the Terms of Service and Privacy Policy.</span>
            </label>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? "Creating account..." : "Create Account"}
              <ArrowRight size={16} />
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">© 2026 A One Lub</p>
        </motion.div>
      </div>
    </div>
  );
}
