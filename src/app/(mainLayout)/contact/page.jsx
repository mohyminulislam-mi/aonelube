"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Apnar form submission logic ekhane add korben (e.g., API route handle)
    console.log("Form Submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans">
      {/* Header / Hero Section */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ED1C24_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get In <span className="text-primary">Touch</span>
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
            Have questions about our premium German-engineered lubricants or
            need bulk pricing? Reach out to our team.
          </p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left Column: Contact Details (2/5 span) */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Contact Information
              </h2>
              <p className="text-slate-500 text-sm">
                Fill out the form or reach us through the official channels
                below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
                    Call Us
                  </h4>
                  <p className="text-slate-600 mt-1 font-medium">
                    +880 1234-567890
                  </p>
                  <p className="text-xs text-slate-400">
                    Mon-Fri from 9am to 6pm
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
                    Email Support
                  </h4>
                  <p className="text-slate-600 mt-1 font-medium">
                    info@aonelube.com
                  </p>
                  <p className="text-xs text-slate-400">
                    We respond within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
                    Headquarters
                  </h4>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    123 Corporate Avenue, Industrial Area,
                    <br />
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm uppercase tracking-wider">
                    Business Hours
                  </h4>
                  <p className="text-slate-600 mt-1">
                    Saturday – Thursday: 9:00 AM – 7:00 PM
                  </p>
                  <p className="text-xs text-red-500 font-medium">
                    Friday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (3/5 span) */}
          <div className="lg:col-span-3 bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-primary" size={24} />
              <h3 className="text-xl font-bold text-slate-900">
                Send us a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Bulk order inquiry / Partnership / Support"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto bg-primary text-white px-6 py-3 cursor-pointer rounded-xl font-medium hover:bg-[#d0141b] transition-colors shadow-md shadow-primary/10 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
