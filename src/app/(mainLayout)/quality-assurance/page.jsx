"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function QualityAssurance() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-100 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Top Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          {/* 5-Star Rating Icon */}
          <div className="flex justify-center items-center gap-1.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" stroke="none" />
            ))}
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quality Assurance
          </h2>

          {/* Accent Line */}
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>

          {/* Description Copy */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            <strong className="text-slate-900">Aonelube</strong> is certified according to the international quality management standard <span className="font-semibold text-slate-800">ISO 9001</span>. This certification ensures that all internal processes are continuously improved and consistently aligned with the latest global standards. In doing so, we safeguard the high quality of our products — to the satisfaction of our customers and with pride in our company.
          </p>
        </motion.div>

        {/* Certificate Cards Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-items-center max-w-3xl mx-auto">
          
          {/* DEKRA Badge Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex justify-center"
          >
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all group duration-300 w-full max-w-[320px] flex justify-center items-center">
              <div className="relative w-full h-[280px]">
                <Image
                  src="/dekra-seal.png" // Replace with your DEKRA logo image path
                  alt="DEKRA ISO 9001 Seal"
                  fill
                  className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </motion.div>

          {/* ISO Certificate Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full flex justify-center"
          >
            <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all group duration-300 w-full max-w-[320px] flex justify-center items-center">
              <div className="relative w-full h-[280px]">
                <Image
                  src="/iso-certificate.png" // Replace with your ISO Certificate image path
                  alt="Aonelube ISO 9001:2015 Certificate"
                  fill
                  className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}