"use client";
import { MapPin, Phone } from "lucide-react";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const PartnerMap = () => {
  return (
    <div className="py-12 bg-white px-4 sm:px-6 lg:px-8 border-t border-slate-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side: Map Image (50%) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center justify-center"
          >
            <div className="w-full p-6 rounded-2xl border border-slate-200/80 shadow-sm bg-slate-50 flex justify-center items-center">
              <Image
                width={450}
                height={500}
                src="/bangladesh.png"
                alt="Bangladesh Coverage Map"
                className="w-full h-auto max-h-[420px] object-contain mix-blend-multiply"
              />
            </div>
          </motion.div>

          {/* Right Side: Light Content Box (50%) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <section className="bg-slate-50/80 text-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm w-full">
              <div className="space-y-4">
                {/* Subtitle / Badge */}
                <div>
                  <span className="text-primary font-bold text-[11px] tracking-wider uppercase bg-primary/10 border border-primary/20 px-3 py-1 rounded-full inline-block">
                    Nationwide Distribution & Support
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-snug">
                  POWERING VEHICLES & INDUSTRIES ACROSS BANGLADESH
                </h2>

                <div className="w-12 h-1 bg-primary rounded-full"></div>

                {/* Description Body */}
                <p className="text-slate-600 text-sm leading-relaxed">
                  At <strong className="text-slate-900">Aonelube</strong>, we
                  are dedicated to delivering world-class lubrication solutions
                  across all 8 divisions and 64 districts of Bangladesh. Built
                  with advanced German technology, our premium engine oils
                  perform under the toughest conditions.
                </p>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Whether you are looking to become an authorized dealer, retail
                  partner, or corporate distributor, join our growing national
                  network.
                </p>

                {/* Tagline Accent Box */}
                <div className="border-l-2 border-primary pl-3 bg-white py-2 rounded-r-lg border border-slate-100 shadow-sm">
                  <p className="text-slate-700 font-semibold italic text-xs sm:text-sm">
                    German Technology. Premium Performance. Trusted in
                    Bangladesh.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href="#contact"
                    className="w-full sm:w-auto text-center bg-primary hover:bg-primary/90 text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-md shadow-primary/20 text-xs sm:text-sm"
                  >
                    Become a Partner
                  </a>
                  <a
                    href="#directory"
                    className="w-full sm:w-auto text-center border border-slate-300 hover:bg-slate-100 bg-white text-slate-700 font-medium px-5 py-2.5 rounded-xl transition-all text-xs sm:text-sm"
                  >
                    Find Local Dealer
                  </a>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PartnerMap;
