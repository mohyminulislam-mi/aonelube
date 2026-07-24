"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  ShieldCheck,
  Star,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

export default function StandardCampaignPage() {
  // Simple Countdown Timer Logic (e.g. 24 Hours)
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-white text-slate-800 font-sans min-h-screen">
      {/* 1. Top Announcement Bar */}
      <div className="bg-slate-900 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
        <Zap size={16} className="text-primary animate-pulse shrink-0" />
        <span>
          Special Offer: Get Exclusive Partnership Benefits & Discounts!
        </span>
      </div>

      {/* 2. Hero Campaign Section */}
      <div className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={14} /> Official Campaign
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Grow Your Business With{" "}
              <span className="text-primary">Aonelube</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Experience authentic German technology engineered for peak
              efficiency and long-lasting performance. Join our trusted
              dealership network across Bangladesh today.
            </p>

            {/* Feature List */}
            <ul className="space-y-3 pt-2">
              {[
                "Premium German Standard Formulations",
                "100% Guaranteed Quality & Engine Protection",
                "Fast & Reliable Nationwide Delivery",
                "24/7 Dedicated Dealer & Business Support",
              ].map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-3 text-slate-700 font-medium text-sm sm:text-base"
                >
                  <CheckCircle2 size={18} className="text-primary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a
                href="#claim-offer"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Claim Offer Now <ArrowRight size={18} />
              </a>
              <a
                href="#details"
                className="border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium px-7 py-3.5 rounded-xl transition-all flex items-center justify-center text-sm sm:text-base"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          {/* Right Product/Banner Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="relative w-full h-[320px] sm:h-[380px]">
                <Image
                  src="/bangladesh.png" // Replace with campaign product/hero image
                  alt="Campaign Showcase"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-white border border-slate-100 shadow-md rounded-2xl p-3 flex items-center gap-3">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">
                    Customer Rating
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    4.9 / 5.0 Rating
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. Limited Time Countdown Banner */}
      <div className="bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <span className="text-primary text-xs font-bold uppercase tracking-widest flex items-center justify-center md:justify-start gap-1.5">
              <Clock size={14} /> Limited Time Promotion
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
              Hurry Up! Offer Ends Soon
            </h2>
          </div>

          {/* Timer Boxes */}
          <div className="flex gap-3">
            <div className="bg-slate-800 border border-slate-700/80 px-4 py-3 rounded-2xl text-center min-w-[70px]">
              <span className="text-2xl font-bold text-primary">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                Hours
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700/80 px-4 py-3 rounded-2xl text-center min-w-[70px]">
              <span className="text-2xl font-bold text-primary">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                Mins
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700/80 px-4 py-3 rounded-2xl text-center min-w-[70px]">
              <span className="text-2xl font-bold text-primary">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                Secs
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
