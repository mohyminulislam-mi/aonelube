"use client";

import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { getSiteContent } from "@/lib/api";

const DEFAULT_DATA = {
  hero: {
    heading: "Get In Touch",
    subheading:
      "Have questions about our premium German-engineered lubricants or need bulk pricing? Reach out to our team.",
  },
  info: {
    phone: "+880 1850120709",
    phoneHours: "Mon-Fri from 9am to 6pm",
    email: "rjgroup@gmail.com",
    emailNote: "We respond within 24 hours",
    address: "123 Corporate Avenue, Industrial Area,\nDhaka, Bangladesh",
    businessHours: "Saturday – Thursday: 9:00 AM – 7:00 PM",
    fridayClosed: true,
  },
  team: {
    heading: "Meet Our Team",
    subheading:
      "A group of designers and engineers working together to build reliable and thoughtful digital experiences.",
  },
  members: [
    { name: "Tanvir Ahmed", role: "Chief Executive Officer (CEO)", email: "tanvir@example.com", phone: "+880 1711-000001", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=500&auto=format&fit=crop" },
    { name: "Arif Hossain", role: "Chief Technology Officer (CTO)", email: "arif@example.com", phone: "+880 1711-000002", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop" },
    { name: "Rahat Chowdhury", role: "Lead Digital Marketer", email: "rahat@example.com", phone: "+880 1711-000005", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop" },
    { name: "Kamrul Hasan", role: "Head of Sales", email: "kamrul@example.com", phone: "+880 1711-000006", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop" },
  ],
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [data, setData] = useState(DEFAULT_DATA);

  useEffect(() => {
    getSiteContent("contact")
      .then((res) => {
        if (res && res.info) setData(res);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { hero, info, team, members } = data;

  return (
    <div className="bg-white text-slate-800 min-h-screen font-outfit">
      {/* Header / Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ED1C24_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {hero.heading?.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-primary">
              {hero.heading?.split(" ").slice(-1)[0]}
            </span>
          </h1>
          <p className="text-base/6 text-slate-500 max-w-md mx-auto mt-1">{hero.subheading}</p>
        </div>
      </section>

      {/* Main Content: Info & Form */}
      <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Left Column: Contact Details (2/5 span) */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Contact Information</h2>
              <p className="text-slate-500 text-sm">
                Fill out the form or reach us through the official channels below.
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
                  <p className="text-slate-600 mt-1 font-medium">{info.phone}</p>
                  <p className="text-xs text-slate-400">{info.phoneHours}</p>
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
                  <p className="text-slate-600 mt-1 font-medium">{info.email}</p>
                  <p className="text-xs text-slate-400">{info.emailNote}</p>
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
                  <p className="text-slate-600 mt-1 leading-relaxed whitespace-pre-line">
                    {info.address}
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
                  <p className="text-slate-600 mt-1">{info.businessHours}</p>
                  {info.fridayClosed && (
                    <p className="text-xs text-red-500 font-medium">Friday: Closed</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (3/5 span) */}
          <div className="lg:col-span-3 bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-primary" size={24} />
              <h3 className="text-xl font-bold text-slate-900">Send us a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
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
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
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
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
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
                <label htmlFor="message" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
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

      {/* Meet Our Team */}
      <section className="bg-slate-50 py-16 px-6">
        <div className="text-center mb-11">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{team.heading}</h1>
          <p className="text-base/6 text-slate-500 max-w-md mx-auto mt-1">{team.subheading}</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(members || []).map((member, index) => (
            <div
              key={index}
              className="bg-white border border-slate-100 hover:border-slate-300 transition-all duration-300 rounded-xl p-5 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-[240px] w-full object-cover object-top rounded-lg"
                />
                <h3 className="text-lg font-semibold text-slate-800 mt-4">{member.name}</h3>
                <p className="text-sm font-medium text-slate-500 mt-0.5">{member.role}</p>
                <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 hover:text-slate-900 transition-colors"
                  >
                    <Mail className="size-4 text-slate-400 shrink-0" />
                    <span>{member.email}</span>
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 hover:text-slate-900 transition-colors"
                  >
                    <Phone className="size-4 text-slate-400 shrink-0" />
                    <span>{member.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
