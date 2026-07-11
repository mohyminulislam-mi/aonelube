import React from "react";
import { Shield, Settings, Activity, Award, CheckCircle } from "lucide-react";

export default function AboutPage() {
  const coreProducts = [
    "Engine Oils",
    "Transmission Fluids",
    "Hydraulic Oils",
    "Gear Oils",
    "Industrial Lubricants",
    "Automotive Fluids",
  ];

  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ED1C24_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="text-sm font-semibold tracking-widest uppercase px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            German Engineered Excellence
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold mt-6 mb-4 tracking-tight">
            About <span className="text-primary">A One Lube</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Delivering premium lubricants and automotive fluids for superior
            engine protection, unmatched efficiency, and long-lasting
            performance.
          </p>
        </div>
      </section>

      {/* Our Mission & Engineering Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 relative after:content-[''] after:block after:w-16 after:h-1 after:bg-primary after:mt-2">
              The German Engineering Standard
            </h2>
            <p className="text-slate-600 mb-4 leading-relaxed">
              At A One Lube, we pride ourselves on bringing
              precision-formulated, German-engineered solutions directly to your
              vehicles and machinery. Our products are designed to withstand
              extreme conditions, reduce friction, and maximize lifespan.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether it’s daily commuting or heavy-duty industrial operations,
              our advanced fluid technology ensures your engines and components
              run smoothly and efficiently every single day.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Shield className="text-primary shrink-0" size={28} />
              <div>
                <h4 className="font-semibold text-slate-900">
                  Maximum Protection
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Shields critical components from wear and tear.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Settings className="text-primary shrink-0" size={28} />
              <div>
                <h4 className="font-semibold text-slate-900">
                  Peak Efficiency
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Optimizes fuel economy and power output.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Activity className="text-primary shrink-0" size={28} />
              <div>
                <h4 className="font-semibold text-slate-900">Long-Lasting</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Extended drain intervals and fluid life.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Award className="text-primary shrink-0" size={28} />
              <div>
                <h4 className="font-semibold text-slate-900">
                  Premium Quality
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Strictly certified under global standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Spectrum Section */}
      <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">
              What We Deliver
            </h2>
            <p className="text-slate-500 mt-2">
              Comprehensive lubrication solutions tailored for ultimate
              performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreProducts.map((product, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4 hover:border-primary/30 transition-colors group"
              >
                <CheckCircle
                  className="text-primary shrink-0 mt-1 group-hover:scale-110 transition-transform"
                  size={20}
                />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {product}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Engineered to meet the exact specifications required for
                    modern automotive and industrial applications.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Experience Superior Performance
        </h2>
        <p className="text-slate-600 mb-8 max-w-xl mx-auto">
          Choose the right protection for your machinery. Switch to A One Lube’s
          premium fluid technology today.
        </p>
        <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-[#d0141b] transition-colors shadow-md shadow-primary/20">
          Explore Our Products
        </button>
      </section>
    </div>
  );
}
