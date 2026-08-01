"use client";

import React, { useEffect, useState } from "react";

const DEFAULT_DIVISIONS = [
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

export default function BangladeshContactDirectory({ divisionsData }) {
  const data = (divisionsData && divisionsData.length > 0) ? divisionsData : DEFAULT_DIVISIONS;
  const [activeDivisionIndex, setActiveDivisionIndex] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState(data[0]?.districts?.[0] || null);

  useEffect(() => {
    if (data && data.length > 0) {
      setActiveDivisionIndex(0);
      setSelectedDistrict(data[0]?.districts?.[0] || null);
    }
  }, [divisionsData]);

  const handleDivisionChange = (index) => {
    setActiveDivisionIndex(index);
    if (data[index]?.districts?.length > 0) {
      setSelectedDistrict(data[index].districts[0]);
    } else {
      setSelectedDistrict(null);
    }
  };

  const currentDivision = data[activeDivisionIndex] || { districts: [] };

  return (
    <div id="directory" className="bg-white p-6 sm:p-10 rounded-2xl max-w-6xl mx-auto text-slate-800 font-sans shadow-sm border border-slate-200/80 my-8">
      {/* 1. Top Division Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-4">
        {data.map((item, index) => (
          <button
            key={item.division || index}
            onClick={() => handleDivisionChange(index)}
            className={`px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-200 uppercase rounded-lg ${
              activeDivisionIndex === index
                ? "bg-primary text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
            }`}
          >
            {item.division}
          </button>
        ))}
      </div>

      {/* 2. Main Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Side: Districts Scroll List */}
        <div className="md:col-span-5 bg-slate-50 border border-slate-200/80 rounded-xl p-2 h-80 overflow-y-auto custom-scrollbar">
          {(currentDivision.districts || []).map((district) => {
            const isSelected = selectedDistrict?.name === district.name;
            return (
              <button
                key={district.name}
                onClick={() => setSelectedDistrict(district)}
                className={`w-full text-left px-4 py-2.5 my-1 text-sm rounded-lg transition-all ${
                  isSelected
                    ? "bg-primary text-white font-medium shadow-sm"
                    : "text-slate-700 hover:bg-slate-200/60 hover:text-slate-900"
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
            <h2 className="text-xl font-bold text-slate-900 tracking-wide">
              {selectedDistrict?.name || "Select District"}
            </h2>
            <div className="w-16 h-[2px] bg-primary mx-auto mt-1 rounded-full"></div>
          </div>

          {/* Contact Card Box */}
          {selectedDistrict ? (
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-base mb-2">
                {selectedDistrict.company}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {selectedDistrict.address}
              </p>
              <p className="text-slate-500 text-sm mb-4">
                {selectedDistrict.country || "Bangladesh"}
              </p>

              <div className="text-sm space-y-1.5 text-slate-700 mb-6">
                {selectedDistrict.phone && (
                  <p>
                    <span className="text-slate-500">Phone: </span>
                    <span className="font-medium text-slate-900">{selectedDistrict.phone}</span>
                  </p>
                )}
                {selectedDistrict.email && (
                  <p>
                    <span className="font-semibold text-slate-900">Email: </span>
                    <a
                      href={`mailto:${selectedDistrict.email}`}
                      className="text-primary font-medium hover:underline"
                    >
                      {selectedDistrict.email}
                    </a>
                  </p>
                )}
                {selectedDistrict.website && (
                  <p>
                    <span className="font-semibold text-slate-900">Website: </span>
                    <a
                      href={selectedDistrict.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary font-medium hover:underline"
                    >
                      {selectedDistrict.website}
                    </a>
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {selectedDistrict.email && (
                  <a
                    href={`mailto:${selectedDistrict.email}`}
                    className="bg-primary hover:bg-primary/90 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-all shadow-sm"
                  >
                    Email
                  </a>
                )}
                {selectedDistrict.website && (
                  <a
                    href={selectedDistrict.website}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 font-medium text-xs px-5 py-2.5 rounded-lg transition-all"
                  >
                    Website
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 py-12">
              Select a district to view contact details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}