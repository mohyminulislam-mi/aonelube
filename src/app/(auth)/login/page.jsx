"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Key,
  Fingerprint,
  ArrowRight,
  Globe2,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
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

      router.push("/");
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
    <div className="min-h-screen bg-[#07111f] px-3 py-3 sm:px-4 lg:px-6 lg:py-4">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0c1728] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#050b14] px-3 py-3 sm:px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ED1C24] text-sm font-black text-white">
              M
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-white">
                MJL Secure
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                PERFORMANCE ACCESS
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/register"
              className="text-sm font-semibold text-slate-200 transition hover:text-white"
            >
              Register
            </Link>
            <button className="rounded-full border border-white/10 bg-white/10 p-2 text-slate-200 transition hover:bg-white/20">
              <Globe2 size={16} />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[260px] overflow-hidden bg-[#050b14] p-6 sm:p-8 lg:min-h-[720px] lg:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(237,28,36,0.24),_transparent_40%),linear-gradient(135deg,_rgba(255,255,255,0.06),_rgba(255,255,255,0))]" />
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=1200')] bg-cover bg-center opacity-25" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.35em] text-red-200">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                SYSTEM ONLINE: MJL-SECURE-256
              </div>

              <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-5 shadow-xl backdrop-blur-xl sm:p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
                  Performance Excellence
                </p>
                <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  Welcome Back
                </h2>
                <p className="mt-3 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
                  Secure access to your account, orders, and lubricant solutions with enterprise-grade protection.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f7f8fb] p-4 sm:p-5 lg:p-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="mx-auto flex h-full max-w-sm flex-col justify-center"
            >
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#005CA9]">
                  Secure sign in
                </p>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  Sign In
                </h1>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Access your account and continue with confidence.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05, duration: 0.35 }}
                >
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition focus:border-[#005CA9] focus:ring-2 focus:ring-[#005CA9]/20"
                      placeholder="name@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.35 }}
                >
                  <div className="mb-1.5 flex items-center justify-between">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                      Password
                    </label>
                    <a href="#" className="text-sm font-semibold text-[#005CA9] hover:underline">
                      Forgot?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-11 pr-12 text-sm font-medium text-slate-900 outline-none transition focus:border-[#005CA9] focus:ring-2 focus:ring-[#005CA9]/20"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </motion.div>

                <motion.label
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.35 }}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600"
                >
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#ED1C24] focus:ring-[#ED1C24]" />
                  <span>Remember this device</span>
                </motion.label>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.35 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ED1C24] px-4 py-2.5 text-sm font-black uppercase tracking-[0.25em] text-white transition duration-200 hover:scale-[1.01] hover:bg-[#d1171e] disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                  <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                </motion.button>
              </form>

              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Or secure login with
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#005CA9] hover:text-[#005CA9]">
                  <Key size={16} />
                  SSO
                </button>
                <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#005CA9] hover:text-[#005CA9]">
                  <Fingerprint size={16} />
                  Biometric
                </button>
              </div>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                By continuing, you agree to our privacy policy and secure access terms. Your session is protected with encrypted authentication.
              </p>

              <p className="mt-3 text-center text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-semibold text-[#005CA9] hover:underline">
                  Create one
                </Link>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
