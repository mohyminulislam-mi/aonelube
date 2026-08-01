"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getSiteContent } from "@/lib/api";

const DEFAULT_PRODUCTS = [
  { name: "Engine Oils", description: "Engineered to meet exact mechanical specifications required for extreme high-temperature applications." },
  { name: "Transmission Fluids", description: "Engineered to meet exact mechanical specifications required for extreme high-temperature applications." },
  { name: "Hydraulic Oils", description: "Engineered to meet exact mechanical specifications required for extreme high-temperature applications." },
  { name: "Gear Oils", description: "Engineered to meet exact mechanical specifications required for extreme high-temperature applications." },
  { name: "Industrial Lubricants", description: "Engineered to meet exact mechanical specifications required for extreme high-temperature applications." },
  { name: "Automotive Fluids", description: "Engineered to meet exact mechanical specifications required for extreme high-temperature applications." },
];

const DEFAULT_DATA = {
  hero: {
    heading: "The German Engineering Standard",
    paragraph1: "Aonelube is a leading Bangladeshi lubricant company committed to delivering premium-quality German lubricants for automotive and industrial applications. Our products are manufactured using advanced German technology and meet internationally recognized quality standards.",
    paragraph2: "We offer a comprehensive range of engine oils, transmission fluids, hydraulic oils, and industrial lubricants designed to maximize efficiency and extend equipment life with trusted lubrication solutions.",
    quote: "German Technology. Premium Performance. Trusted in Bangladesh.",
  },
  products: DEFAULT_PRODUCTS,
  network: {
    parentOrg: "AB Petroleum",
    headOffice: "695/2/D, Manikdi Road, ECB Chattar, Dhaka Cantorment, Dhaka-1206",
    corporateOffice: "C-2 KDA Avenue, Khulna, Bangladesh",
    corporatePhone: "+880 1720220031",
  },
};

// Framer Motion Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Company() {
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    getSiteContent("company")
      .then((res) => {
        if (res && res.hero) setData(res);
      })
      .catch(() => {});
  }, []);

  const { hero, products, network } = data;

  return (
    <section className="bg-slate-50/50 text-slate-800 min-h-screen font-outfit overflow-x-hidden">
      {/* Hero / Mission Section */}
      <div className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Image Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-6 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-red-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <Image
                width={1000}
                height={800}
                src="/aonelube.webp"
                alt="Aonelube German Standard"
                className="w-full h-auto object-cover rounded-xl"
                priority
              />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-6 space-y-3">
            <h2 className="text-3xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {hero.heading}
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">{hero.paragraph1}</p>
            <p className="text-slate-600 leading-relaxed">{hero.paragraph2}</p>
            <div className="pt-2 border-l-4 border-primary pl-4 bg-slate-50 py-2 rounded-r-lg">
              <p className="text-slate-900 font-semibold italic">{hero.quote}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Product Spectrum Section */}
      <div className="bg-slate-50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest">
              Our Spectrum
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">What We Deliver</h2>
            <p className="text-slate-500 mt-3 text-base">
              Comprehensive lubrication solutions engineered specifically to fulfill the exact
              operational configurations of modern systems.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(products || []).map((product, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="mt-1 shrink-0 bg-emerald-50 text-emerald-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Network & Corporate Offices Section */}
      <div className="py-8 md:py-12 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="text-primary font-bold text-xs uppercase tracking-widest">
                Distribution Network
              </span>
              <h2 className="text-3xl font-bold text-slate-900">We Service All Bangladesh</h2>
              <p className="text-slate-500 max-w-md">
                Ensuring continuous product availability and seamless corporate fleet service
                delivery nationwide from tracking distribution hubs.
              </p>
              <div className="pt-4 rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50 flex justify-center">
                <Image
                  width={450}
                  height={500}
                  src="/bangladesh.png"
                  alt="Bangladesh Coverage Map"
                  className="h-auto max-h-[400px] object-contain p-4 mix-blend-multiply"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8 lg:pl-6"
            >
              <div>
                <span className="text-slate-400 font-medium text-xs uppercase tracking-wider">
                  Parent Organization
                </span>
                <h2 className="text-4xl font-extrabold text-slate-900 mt-1">
                  {network?.parentOrg || "AB Petroleum"}
                </h2>
                <div className="w-12 h-1 bg-slate-900 mt-2"></div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="p-3 bg-white text-slate-700 rounded-xl shadow-sm shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Head Office</h3>
                    <p className="text-sm text-slate-600 mt-1">{network?.headOffice}</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="p-3 bg-white text-slate-700 rounded-xl shadow-sm shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Corporate Office</h3>
                    <p className="text-sm text-slate-600 mt-1">{network?.corporateOffice}</p>
                    {network?.corporatePhone && (
                      <div className="flex items-center gap-2 text-primary font-medium text-sm mt-3 pt-3 border-t border-slate-200/60">
                        <Phone size={14} />
                        <span>{network.corporatePhone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
