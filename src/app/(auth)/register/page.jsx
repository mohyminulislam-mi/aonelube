"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BadgeCheck,
  Package,
  CircleCheckBig,
} from "lucide-react";
import { useAuth } from "@/app/(mainLayout)/provider/AuthProvider";

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onBlur",
  });

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      Swal.fire({
        icon: "success",
        title: "Registration successful",
        text: "Your account has been created. Please log in to continue.",
        confirmButtonColor: "#e30613",
        background: "#ffffff",
        color: "#171717",
      });

      router.push("/login");
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
    <div className="min-h-screen bg-[#07111f] px-3 py-3 sm:px-4 lg:px-6 lg:py-4">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0c1728] shadow-2xl lg:flex-row">
        <div className="flex w-full flex-col justify-between bg-[#050b14] p-5 text-white sm:p-6 lg:w-[40%] lg:p-7">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ED1C24] text-sm font-black text-white">
                A
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-white">
                  A One Lub
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                  PERFORMANCE ACCESS
                </p>
              </div>
            </div>

            <div className="mt-6 lg:mt-8">
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-slate-400">
                Create account
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-[2rem]">
                Join A One Lub
              </h1>
              <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                Build your account to track premium lubricants, manage your orders, and unlock member-only offers for every service.
              </p>
            </div>

            <div className="mt-6 space-y-3 lg:mt-8">
              {[
                {
                  icon: <ShieldCheck className="h-4 w-4" />,
                  title: "Performance Tracking",
                  text: "Monitor service history and product usage with confidence.",
                },
                {
                  icon: <Package className="h-4 w-4" />,
                  title: "Authentic Products",
                  text: "Access genuine lubricants and trusted automotive essentials.",
                },
                {
                  icon: <BadgeCheck className="h-4 w-4" />,
                  title: "Member Benefits",
                  text: "Enjoy priority support, offers, and faster checkout.",
                },
              ].map((item, index) => (
                <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#ED1C24]/15 text-[#ff6b6b]">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.35em] text-slate-500">
            TRUSTED BY INDUSTRY LEADERS WORLDWIDE
          </p>
        </div>

        <div className="flex w-full items-center bg-[#f7f8fb] p-4 sm:p-5 lg:w-[60%] lg:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto flex w-full max-w-xl flex-col justify-center"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                Create your account
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-[#005CA9] hover:underline">
                  Sign in
                </Link>
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05, duration: 0.3 }}>
                <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
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
                    className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#005CA9] focus:ring-2 focus:ring-[#005CA9]/20"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08, duration: 0.3 }}>
                <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Email Address
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
                    className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#005CA9] focus:ring-2 focus:ring-[#005CA9]/20"
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </motion.div>

              <div className="grid gap-3 md:grid-cols-2">
                <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.11, duration: 0.3 }}>
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#005CA9] focus:ring-2 focus:ring-[#005CA9]/20"
                      placeholder="Create password"
                    />
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14, duration: 0.3 }}>
                  <label className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Confirm
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) => value === password || "Passwords do not match",
                      })}
                      className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm font-medium text-slate-900 outline-none transition focus:border-[#005CA9] focus:ring-2 focus:ring-[#005CA9]/20"
                      placeholder="Re-enter password"
                    />
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>}
                </motion.div>
              </div>

              <motion.label initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.17, duration: 0.3 }} className="flex items-start gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-300 text-[#ED1C24] focus:ring-[#ED1C24]" />
                <span>I agree to the Terms of Service and Privacy Policy, and I consent to receive product updates.</span>
              </motion.label>

              <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.3 }} type="submit" disabled={isSubmitting} className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#ED1C24] px-4 py-2.5 text-sm font-black uppercase tracking-[0.25em] text-white transition duration-200 hover:bg-[#d1171e] disabled:cursor-not-allowed disabled:bg-slate-400">
                {isSubmitting ? "Creating account..." : "Create account"}
                <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
              </motion.button>
            </form>

            <div className="my-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                Or register with
              </span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#005CA9] hover:text-[#005CA9]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 bg-white text-[10px] font-black text-slate-700">
                  G
                </span>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#005CA9] hover:text-[#005CA9]">
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M13.5 22v-8.5h2.9l.4-3.3h-3.3V3.9c0-.95.3-1.6 1.6-1.6h1.7V.1c-.3-.1-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2v2.3H7.1v3.3h2.8V22h3.6Z"
                    fill="#1877F2"
                  />
                </svg>
                Facebook
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 text-center text-[11px] text-slate-500">
              <span>© 2026 A One Lub</span>
              <Link href="#" className="hover:text-[#005CA9] hover:underline">Privacy</Link>
              <Link href="#" className="hover:text-[#005CA9] hover:underline">Terms</Link>
              <Link href="#" className="hover:text-[#005CA9] hover:underline">Help</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
