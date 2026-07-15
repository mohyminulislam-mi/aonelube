"use client";

import React from "react";
import { Shield, Settings, Activity, Award, CheckCircle, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  const coreProducts = [
    "Engine Oils",
    "Transmission Fluids",
    "Hydraulic Oils",
    "Gear Oils",
    "Industrial Lubricants",
    "Automotive Fluids",
  ];

  // Framer Motion Variants for clean scroll staggers
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="bg-slate-50/50 text-slate-800 min-h-screen font-sans overflow-x-hidden">
      
      {/* Hero / Mission Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          <motion.div variants={fadeInUp} className="lg:col-span-5 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-red-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            <div className="relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <Image
                width={500}
                height={350}
                src="/aonelube.webp"
                alt="Aonelube German Standard"
                className="w-full h-auto object-cover rounded-xl"
                priority
              />
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="lg:col-span-7 space-y-6">
            <span className="text-primary font-bold text-sm tracking-wider uppercase bg-red-50 px-3 py-1 rounded-full">
              Premium Quality
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              The German Engineering Standard
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
            <p className="text-slate-600 leading-relaxed text-base sm:text-lg">
              Aonelube is a leading Bangladeshi lubricant company committed to
              delivering premium-quality German lubricants for automotive and
              industrial applications. Our products are manufactured using
              advanced German technology and meet internationally recognized
              quality standards.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We offer a comprehensive range of engine oils, transmission fluids, 
              hydraulic oils, and industrial lubricants designed to maximize efficiency 
              and extend equipment life with trusted lubrication solutions.
            </p>
            <div className="pt-2 border-l-4 border-primary pl-4 bg-slate-50 py-2 rounded-r-lg">
              <p className="text-slate-900 font-semibold italic">
                German Technology. Premium Performance. Trusted in Bangladesh.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CEO & Core Features Grid */}
      <section className="py-12 bg-white border-y border-slate-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Executive Profile Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex flex-col items-center sm:flex-row lg:flex-col gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center sm:text-left lg:text-center"
          >
            <Image 
              width={160} 
              height={160} 
              src="/aonelube.webp" 
              alt="Reaz Mahmud CEO" 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md bg-white"
            />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Reaz Mahmud</h3>
              <p className="text-primary font-medium text-sm">CEO, Aonelube</p>
              <p className="text-xs text-slate-400 mt-2 max-w-[200px]">Driving premium fluid innovations across nationwide industries.</p>
            </div>
          </motion.div>

          {/* Value Propositions */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {[
              { icon: Shield, title: "Maximum Protection", desc: "Shields critical mechanical components from severe friction, wear, and tear." },
              { icon: Settings, title: "Peak Efficiency", desc: "Optimizes fuel economy metrics and continuous horse-power output parameters." },
              { icon: Activity, title: "Long-Lasting Performance", desc: "Engineered for extended drain intervals and robust structural fluid life." },
              { icon: Award, title: "Premium Global Quality", desc: "Strictly blended and certified under demanding international standards." }
            ].map((feature, idx) => {
              const IconComponent = feature.icon;
              return (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  className="flex gap-4 p-5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="p-3 bg-red-50 text-primary rounded-xl shrink-0 h-12 w-12 flex items-center justify-center">
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{feature.title}</h4>
                    <p className="text-sm text-slate-500 mt-1 leading-snug">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* Product Spectrum Section */}
      <section className="bg-slate-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-primary font-bold text-xs uppercase tracking-widest">Our Spectrum</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">What We Deliver</h2>
            <p className="text-slate-500 mt-3 text-base">
              Comprehensive lubrication solutions engineered specifically to fulfill the exact operational configurations of modern systems.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coreProducts.map((product, idx) => (
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
                    {product}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Engineered to meet exact mechanical specifications required for extreme high-temperature applications.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Network & Corporate Offices Section */}
      <section className="py-16 md:py-24 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="text-primary font-bold text-xs uppercase tracking-widest">Distribution Network</span>
              <h2 className="text-3xl font-bold text-slate-900">We Service All Bangladesh</h2>
              <p className="text-slate-500 max-w-md">
                Ensuring continuous product availability and seamless corporate fleet service delivery nationwide from tracking distribution hubs.
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
                <span className="text-slate-400 font-medium text-xs uppercase tracking-wider">Parent Organization</span>
                <h2 className="text-4xl font-extrabold text-slate-900 mt-1">AB Petroleum</h2>
                <div className="w-12 h-1 bg-slate-900 mt-2"></div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="p-3 bg-white text-slate-700 rounded-xl shadow-sm shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Head Office</h3>
                    <p className="text-sm text-slate-600 mt-1">695/2/D, Manikdi Road, Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="p-3 bg-white text-slate-700 rounded-xl shadow-sm shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Corporate Office</h3>
                    <p className="text-sm text-slate-600 mt-1">C-2 KDA Avenue, Khulna, Bangladesh</p>
                    <div className="flex items-center gap-2 text-primary font-medium text-sm mt-3 pt-3 border-t border-slate-200/60">
                      <Phone size={14} />
                      <span>+880 1720220031</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      
      {/* Action Banner Section */}
      <section className="bg-slate-900 py-16 md:py-20 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.15),transparent_45%)]"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto relative z-10 space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Experience Superior Performance
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base sm:text-lg">
            Choose the right protection for your machinery. Switch to A One Lube’s
            premium fluid technology today.
          </p>
          <div className="pt-4">
            <motion.button 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-primary/20 cursor-pointer text-sm tracking-wide"
            >
              Explore Our Products
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
