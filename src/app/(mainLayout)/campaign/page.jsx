"use client";

import React from "react";
import Image from "next/image";
import { Star, ShieldCheck, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function QualityCampaignPage() {
  return (
    <div className="bg-white text-slate-800 font-sans min-h-screen">
      {/* 1. Hero Campaign Banner */}
      <section className="relative bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 opacity-90"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest">
              <ShieldCheck size={16} /> Certified German Standard
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            Uncompromised Quality. <br />
            <span className="text-primary">ISO 9001:2015</span> Certified Lubricants.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Aonelube delivers world-class German technology engineered for ultimate engine protection and peak industrial performance across Bangladesh.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href="#verify"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-primary/25 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Verify Certification <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto border border-slate-700 hover:bg-slate-800 text-slate-300 font-medium px-8 py-3.5 rounded-xl transition-all text-sm sm:text-base"
            >
              Partner With Us
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. Trust Metrics / Key Stats */}
      <section className="bg-slate-50 border-y border-slate-100 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">100%</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">German Tech Standard</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">ISO 9001</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Quality Management</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">64</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Districts Coverage</p>
          </div>
          <div className="p-4">
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900">DEKRA</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">Certified Safety</p>
          </div>
        </div>
      </section>

      {/* 3. Main Quality Assurance Section */}
      <section id="verify" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          {/* Rating */}
          <div className="flex justify-center items-center gap-1.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" stroke="none" />
            ))}
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Quality Assurance & Global Compliance
          </h2>

          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            <strong className="text-slate-900">Aonelube</strong> is certified according to the international quality management standard <span className="font-semibold text-slate-800">ISO 9001</span>. This certification ensures that all internal processes are continuously improved and consistently aligned with the latest global standards.
          </p>
        </motion.div>

        {/* Certificate Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center max-w-4xl mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full bg-slate-50 border border-slate-200/80 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group duration-300 flex flex-col items-center text-center"
          >
            <div className="relative w-full h-[300px] mb-4">
              <Image
                src="/dekra-seal.png"
                alt="DEKRA ISO 9001 Seal"
                fill
                className="object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900">DEKRA Certified Process</h3>
            <p className="text-xs text-slate-500 mt-1">International Standard Seal Approval</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full bg-slate-50 border border-slate-200/80 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group duration-300 flex flex-col items-center text-center"
          >
            <div className="relative w-full h-[300px] mb-4">
              <Image
                src="/iso-certificate.png"
                alt="ISO 9001:2015 Certificate"
                fill
                className="object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-bold text-slate-900">ISO 9001:2015 Certificate</h3>
            <p className="text-xs text-slate-500 mt-1">Official Quality Management Accreditation</p>
          </motion.div>
        </div>
      </section>

      {/* 4. Why Choose Certified Products Section */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              Why It Matters
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What ISO 9001 Certification Means for Your Vehicle
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every drop of lubricant engineered under ISO 9001 guidelines ensures precision formulation, minimum friction wear, and prolonged engine life under extreme stress.
            </p>

            <ul className="space-y-3 pt-2">
              {[
                "Engineered with authentic German additives",
                "Tested for extreme Bangladeshi thermal conditions",
                "Guaranteed viscosity consistency & engine protection",
                "Reduces fuel consumption & maintenance cost"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-200 text-sm font-medium">
                  <CheckCircle2 className="text-primary shrink-0" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tagline Box */}
          <div className="bg-slate-800/60 border border-slate-700/80 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
            <Award className="text-primary mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Our Quality Commitment</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              We safeguard the high quality of our products to ensure ultimate customer satisfaction and reliability nationwide.
            </p>
            <div className="pt-3 border-l-4 border-primary pl-4 bg-slate-900/50 py-2 rounded-r-lg">
              <p className="text-slate-200 font-semibold italic text-xs sm:text-sm">
                German Technology. Premium Performance. Trusted in Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Campaign Call to Action (CTA) Form */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-xl text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Become an Authorized Sales Partner
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto mt-2">
            Join our certified distribution network across Bangladesh. Fill out the form below to receive dealership requirements.
          </p>

          <form className="mt-8 space-y-4 max-w-xl mx-auto text-left" onSubmit={(e) => e.preventDefault()}>
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
              <label className="block text-xs font-semibold text-slate-700 mb-1">District / Location</label>
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
      </section>
    </div>
  );
}