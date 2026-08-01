"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { getSiteContent } from "@/lib/api";

const DEFAULT_DATA = {
  heading: "Quality Assurance",
  description:
    "Aonelube is certified according to the international quality management standard ISO 9001. This certification ensures that all internal processes are continuously improved and consistently aligned with the latest global standards. In doing so, we safeguard the high quality of our products — to the satisfaction of our customers and with pride in our company.",
  dekraImage: "/dekra-seal.png",
  isoImage: "/iso-certificate.png",
  stats: [
    { value: "100%", label: "German Tech Standard" },
    { value: "ISO 9001", label: "Quality Management" },
    { value: "64", label: "Districts Coverage" },
    { value: "DEKRA", label: "Certified Safety" },
  ],
  cta: {
    heading: "Become an Authorized Sales Partner",
    description:
      "Join our certified distribution network across Bangladesh. Fill out the form below to receive dealership requirements.",
  },
};

export default function QualityAssurance() {
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    getSiteContent("quality")
      .then((res) => {
        if (res && res.heading) setData(res);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-100 overflow-hidden">
      <div className="max-w-5xl mx-auto mb-10">
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
            {data.heading}
          </h2>

          {/* Accent Line */}
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>

          {/* Description Copy */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            {data.description}
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
                  src={data.dekraImage || "/dekra-seal.png"}
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
                  src={data.isoImage || "/iso-certificate.png"}
                  alt="Aonelube ISO 9001:2015 Certificate"
                  fill
                  className="object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Metrics / Key Stats */}
      <div className="bg-slate-50 border-y border-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {(data.stats || []).map((stat, idx) => (
            <div key={idx} className="p-4">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">{stat.value}</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Form */}
      <div id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {data.cta?.heading}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto mt-2">
            {data.cta?.description}
          </p>

          <form
            className="mt-8 space-y-4 max-w-xl mx-auto text-left"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahat Chowdhury"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+880 1700-000000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                District / Location
              </label>
              <input
                type="text"
                placeholder="e.g. Gazipur, Dhaka"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-primary/20 text-sm mt-2"
            >
              Submit Partnership Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
