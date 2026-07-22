"use client";

import React, { useState } from "react";
const divisionsData = [
  {
    division: "DHAKA",
    districts: [
      {
        name: "Dhaka",
        company: "Aonelube Dhaka Head Office",
        address: "House 12, Road 5, Dhanmondi, Dhaka-1205",
        country: "Bangladesh",
        phone: "+880 1700-000001",
        email: "dhaka@aonelube.com",
        website: "https://aonelube.com",
      },
      {
        name: "Gazipur",
        company: "Aonelube Gazipur Sales Point",
        address: "Chowrasta Main Road, Gazipur-1700",
        country: "Bangladesh",
        phone: "+880 1700-000002",
        email: "gazipur@aonelube.com",
        website: "https://aonelube.com",
      },
      {
        name: "Narayanganj",
        company: "Aonelube Narayanganj Depot",
        address: "BB Road, Narayanganj-1400",
        country: "Bangladesh",
        phone: "+880 1700-000003",
        email: "narayanganj@aonelube.com",
        website: "https://aonelube.com",
      },
    ],
  },
  {
    division: "CHATTAGRAM",
    districts: [
      {
        name: "Chattogram",
        company: "Aonelube Chattogram Regional Office",
        address: "Agrabad Commercial Area, Chattogram-4100",
        country: "Bangladesh",
        phone: "+880 1700-000004",
        email: "chattogram@aonelube.com",
        website: "https://aonelube.com",
      },
      {
        name: "Cox's Bazar",
        company: "Aonelube Cox's Bazar Agency",
        address: "Main Road, Cox's Bazar-4700",
        country: "Bangladesh",
        phone: "+880 1700-000005",
        email: "coxsbazar@aonelube.com",
        website: "https://aonelube.com",
      },
    ],
  },
  {
    division: "KHULNA",
    districts: [
      {
        name: "Khulna",
        company: "Aonelube Khulna Branch",
        address: "KDA Avenue, Khulna-9100",
        country: "Bangladesh",
        phone: "+880 1700-000006",
        email: "khulna@aonelube.com",
        website: "https://aonelube.com",
      },
      {
        name: "Jeshore",
        company: "Aonelube Jeshore Outlet",
        address: "Jail Road, Jeshore-7400",
        country: "Bangladesh",
        phone: "+880 1700-000007",
        email: "jeshore@aonelube.com",
        website: "https://aonelube.com",
      },
    ],
  },
  {
    division: "RAJSHAHI",
    districts: [
      {
        name: "Rajshahi",
        company: "Aonelube Rajshahi Office",
        address: "Saheb Bazar, Rajshahi-6000",
        country: "Bangladesh",
        phone: "+880 1700-000008",
        email: "rajshahi@aonelube.com",
        website: "https://aonelube.com",
      },
    ],
  },
  {
    division: "BARISAL",
    districts: [
      {
        name: "Barisal",
        company: "Aonelube Barisal Office",
        address: "Sadat Alley, Barisal-8200",
        country: "Bangladesh",
        phone: "+880 1700-000009",
        email: "barisal@aonelube.com",
        website: "https://aonelube.com",
      },
    ],
  },
  {
    division: "SYLHET",
    districts: [
      {
        name: "Sylhet",
        company: "Aonelube Sylhet Regional Office",
        address: "Zindabazar, Sylhet-3100",
        country: "Bangladesh",
        phone: "+880 1700-000010",
        email: "sylhet@aonelube.com",
        website: "https://aonelube.com",
      },
    ],
  },
  {
    division: "RANGPUR",
    districts: [
      {
        name: "Rangpur",
        company: "Aonelube Rangpur Outlet",
        address: "Station Road, Rangpur-5400",
        country: "Bangladesh",
        phone: "+880 1700-000011",
        email: "rangpur@aonelube.com",
        website: "https://aonelube.com",
      },
    ],
  },
  {
    division: "MYMENSINGH",
    districts: [
      {
        name: "Mymensingh",
        company: "Aonelube Mymensingh Branch",
        address: "Town Hall Road, Mymensingh-2200",
        country: "Bangladesh",
        phone: "+880 1700-000012",
        email: "mymensingh@aonelube.com",
        website: "https://aonelube.com",
      },
    ],
  },
];

export default function BangladeshContactDirectory() {
  const [activeDivisionIndex, setActiveDivisionIndex] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(
    divisionsData[0].districts[0],
  );

  const handleDivisionChange = (index) => {
    setActiveDivisionIndex(index);
    // Tab change korle dynamic-vabe prothom district active hobe
    if (divisionsData[index].districts.length > 0) {
      setSelectedDistrict(divisionsData[index].districts[0]);
    }
  };

  return (
    <div className="bg-[#1f242d] p-6 sm:p-10 rounded-xl max-w-6xl mx-auto text-slate-200 font-sans shadow-2xl border border-slate-800">
      {/* 1. Top Division Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-700/60 pb-4">
        {divisionsData.map((item, index) => (
          <button
            key={item.division}
            onClick={() => handleDivisionChange(index)}
            className={`px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-200 uppercase rounded-sm ${
              activeDivisionIndex === index
                ? "bg-[#191d24] text-[#f2cc68] border border-[#f2cc68]"
                : "bg-[#191d24]/60 text-slate-300 hover:text-white border border-slate-700/50"
            }`}
          >
            {item.division}
          </button>
        ))}
      </div>

      {/* 2. Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Side: Districts Scroll List */}
        <div className="md:col-span-5 bg-[#191d24] border border-slate-800 rounded-md p-2 h-80 overflow-y-auto custom-scrollbar">
          {divisionsData[activeDivisionIndex].districts.map((district) => {
            const isSelected = selectedDistrict?.name === district.name;
            return (
              <button
                key={district.name}
                onClick={() => setSelectedDistrict(district)}
                className={`w-full text-left px-4 py-2.5 my-1 text-sm rounded transition-colors ${
                  isSelected
                    ? "bg-[#f2cc68] text-slate-900 font-medium"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
                }`}
              >
                {district.name}
              </button>
            );
          })}
        </div>

        {/* Right Side: Contact Details Box */}
        <div className="md:col-span-7 flex flex-col justify-between">
          {/* Header Title */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-medium text-white tracking-wide">
              {selectedDistrict?.name}
            </h2>
            <div className="w-16 h-[2px] bg-[#f2cc68] mx-auto mt-1"></div>
          </div>

          {/* Contact Card Box */}
          {selectedDistrict ? (
            <div className="bg-[#191d24] border border-slate-800 rounded-md p-6 shadow-inner">
              <h3 className="font-bold text-white text-base mb-2">
                {selectedDistrict.company}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {selectedDistrict.address}
              </p>
              <p className="text-slate-400 text-sm mb-4">
                {selectedDistrict.country}
              </p>

              <div className="text-sm space-y-1 text-slate-300 mb-6">
                <p>
                  <span className="text-slate-400">Phone: </span>
                  {selectedDistrict.phone}
                </p>
                <p>
                  <span className="font-semibold text-white">Email: </span>
                  <a
                    href={`mailto:${selectedDistrict.email}`}
                    className="text-[#f2cc68] hover:underline"
                  >
                    {selectedDistrict.email}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white">Website: </span>
                  <a
                    href={selectedDistrict.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#f2cc68] hover:underline"
                  >
                    {selectedDistrict.website}
                  </a>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={`mailto:${selectedDistrict.email}`}
                  className="bg-[#f2cc68] hover:bg-[#e0b852] text-slate-900 font-medium text-xs px-5 py-2 rounded transition-colors"
                >
                  Email
                </a>
                <a
                  href={selectedDistrict.website}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-[#f2cc68] text-[#f2cc68] hover:bg-[#f2cc68]/10 text-xs px-5 py-2 rounded transition-colors"
                >
                  Website
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 py-12">
              Select a district to view contact details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
