"use client";

import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Building2,
  ChevronDown,
  ChevronUp,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Palette,
  Phone,
  Plus,
  Save,
  Shield,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { getSiteContent, updateSiteContent } from "@/lib/api";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-red-400 focus:outline-none focus:ring-1 focus:ring-red-300 transition-all";
const labelCls = "block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5";
const sectionHeadCls = "text-base font-bold text-slate-800 border-b border-slate-100 pb-2 mb-4";
const cardCls = "bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4";

const SectionCard = ({ title, icon: Icon, children }) => (
  <div className={cardCls}>
    <h3 className={sectionHeadCls}>
      <span className="flex items-center gap-2">
        {Icon && <Icon size={15} className="text-red-500" />}
        {title}
      </span>
    </h3>
    {children}
  </div>
);

const Field = ({ label, name, value, onChange, type = "text", placeholder, textarea, rows = 3 }) => (
  <div>
    <label className={labelCls}>{label}</label>
    {textarea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={`${inputCls} resize-none`}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputCls}
      />
    )}
  </div>
);

// ─── Tab: COMPANY ─────────────────────────────────────────────────────────────
function CompanyTab({ data, onChange }) {
  const hero = data.hero || {};
  const network = data.network || {};
  const products = data.products || [];

  const setHero = (k, v) => onChange({ ...data, hero: { ...hero, [k]: v } });
  const setNetwork = (k, v) => onChange({ ...data, network: { ...network, [k]: v } });

  const setProduct = (idx, key, val) => {
    const updated = products.map((p, i) => (i === idx ? { ...p, [key]: val } : p));
    onChange({ ...data, products: updated });
  };

  const addProduct = () =>
    onChange({ ...data, products: [...products, { name: "", description: "" }] });

  const removeProduct = (idx) =>
    onChange({ ...data, products: products.filter((_, i) => i !== idx) });

  return (
    <div className="space-y-5">
      <SectionCard title="Hero Section" icon={Building2}>
        <Field label="Main Heading" name="heading" value={hero.heading || ""} onChange={(e) => setHero("heading", e.target.value)} placeholder="The German Engineering Standard" />
        <Field label="Paragraph 1" name="paragraph1" value={hero.paragraph1 || ""} onChange={(e) => setHero("paragraph1", e.target.value)} textarea rows={4} />
        <Field label="Paragraph 2" name="paragraph2" value={hero.paragraph2 || ""} onChange={(e) => setHero("paragraph2", e.target.value)} textarea rows={3} />
        <Field label="Quote / Tagline" name="quote" value={hero.quote || ""} onChange={(e) => setHero("quote", e.target.value)} placeholder="German Technology. Premium Performance." />
      </SectionCard>

      <SectionCard title="Core Products" icon={Globe}>
        {products.map((prod, idx) => (
          <div key={idx} className="border border-slate-100 rounded-xl p-4 space-y-2 relative">
            <button
              type="button"
              onClick={() => removeProduct(idx)}
              className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition"
            >
              <Trash2 size={14} />
            </button>
            <Field label={`Product ${idx + 1} Name`} name="name" value={prod.name} onChange={(e) => setProduct(idx, "name", e.target.value)} placeholder="Engine Oils" />
            <Field label="Short Description" name="description" value={prod.description} onChange={(e) => setProduct(idx, "description", e.target.value)} textarea rows={2} />
          </div>
        ))}
        <button
          type="button"
          onClick={addProduct}
          className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
        >
          <Plus size={14} /> Add Product
        </button>
      </SectionCard>

      <SectionCard title="Distribution Network" icon={MapPin}>
        <Field label="Parent Organization Name" name="parentOrg" value={network.parentOrg || ""} onChange={(e) => setNetwork("parentOrg", e.target.value)} placeholder="AB Petroleum" />
        <Field label="Head Office Address" name="headOffice" value={network.headOffice || ""} onChange={(e) => setNetwork("headOffice", e.target.value)} textarea rows={2} />
        <Field label="Corporate Office Address" name="corporateOffice" value={network.corporateOffice || ""} onChange={(e) => setNetwork("corporateOffice", e.target.value)} textarea rows={2} />
        <Field label="Corporate Office Phone" name="corporatePhone" value={network.corporatePhone || ""} onChange={(e) => setNetwork("corporatePhone", e.target.value)} placeholder="+880 1720220031" />
      </SectionCard>
    </div>
  );
}

// ─── Tab: PARTNER ─────────────────────────────────────────────────────────────
function PartnerTab({ data, onChange }) {
  const map = data.map || {};
  const divisions = data.divisions || [];
  const [openDivisions, setOpenDivisions] = useState({});

  const setMap = (k, v) => onChange({ ...data, map: { ...map, [k]: v } });

  const setDivision = (dIdx, key, val) => {
    const updated = divisions.map((d, i) => (i === dIdx ? { ...d, [key]: val } : d));
    onChange({ ...data, divisions: updated });
  };

  const addDivision = () =>
    onChange({ ...data, divisions: [...divisions, { division: "NEW DIVISION", districts: [] }] });

  const removeDivision = (dIdx) =>
    onChange({ ...data, divisions: divisions.filter((_, i) => i !== dIdx) });

  const addDistrict = (dIdx) => {
    const updated = divisions.map((d, i) =>
      i === dIdx
        ? { ...d, districts: [...d.districts, { name: "", company: "", address: "", country: "Bangladesh", phone: "", email: "", website: "https://aonelube.com" }] }
        : d
    );
    onChange({ ...data, divisions: updated });
  };

  const removeDistrict = (dIdx, distIdx) => {
    const updated = divisions.map((d, i) =>
      i === dIdx ? { ...d, districts: d.districts.filter((_, j) => j !== distIdx) } : d
    );
    onChange({ ...data, divisions: updated });
  };

  const setDistrict = (dIdx, distIdx, key, val) => {
    const updated = divisions.map((d, i) =>
      i === dIdx
        ? { ...d, districts: d.districts.map((dist, j) => (j === distIdx ? { ...dist, [key]: val } : dist)) }
        : d
    );
    onChange({ ...data, divisions: updated });
  };

  const toggleDiv = (idx) => setOpenDivisions((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <div className="space-y-5">
      <SectionCard title="Map Section Content" icon={MapPin}>
        <Field label="Badge Text" name="badgeText" value={map.badgeText || ""} onChange={(e) => setMap("badgeText", e.target.value)} placeholder="Nationwide Distribution & Support" />
        <Field label="Main Headline" name="headline" value={map.headline || ""} onChange={(e) => setMap("headline", e.target.value)} placeholder="POWERING VEHICLES & INDUSTRIES..." />
        <Field label="Description" name="description" value={map.description || ""} onChange={(e) => setMap("description", e.target.value)} textarea rows={3} />
        <Field label="Sub Description" name="subDescription" value={map.subDescription || ""} onChange={(e) => setMap("subDescription", e.target.value)} textarea rows={2} />
        <Field label="Tagline" name="tagline" value={map.tagline || ""} onChange={(e) => setMap("tagline", e.target.value)} placeholder="German Technology. Premium Performance." />
      </SectionCard>

      <SectionCard title="Divisions & Districts" icon={Globe}>
        <div className="space-y-3">
          {divisions.map((div, dIdx) => (
            <div key={dIdx} className="border border-slate-200 rounded-xl overflow-hidden">
              {/* Division Header */}
              <div
                className="flex items-center justify-between px-4 py-3 bg-slate-50 cursor-pointer"
                onClick={() => toggleDiv(dIdx)}
              >
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    value={div.division}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setDivision(dIdx, "division", e.target.value)}
                    className="bg-transparent font-bold text-slate-800 text-sm outline-none w-40"
                  />
                  <span className="text-xs text-slate-400">({div.districts.length} districts)</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeDivision(dIdx); }}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <Trash2 size={13} />
                  </button>
                  {openDivisions[dIdx] ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </div>

              {/* Districts */}
              {openDivisions[dIdx] && (
                <div className="p-4 space-y-4">
                  {div.districts.map((dist, distIdx) => (
                    <div key={distIdx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2 relative">
                      <button
                        type="button"
                        onClick={() => removeDistrict(dIdx, distIdx)}
                        className="absolute top-3 right-3 text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={12} />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Field label="District Name" name="name" value={dist.name} onChange={(e) => setDistrict(dIdx, distIdx, "name", e.target.value)} placeholder="Dhaka" />
                        <Field label="Company Name" name="company" value={dist.company} onChange={(e) => setDistrict(dIdx, distIdx, "company", e.target.value)} placeholder="Aonelube Office" />
                        <Field label="Phone" name="phone" value={dist.phone} onChange={(e) => setDistrict(dIdx, distIdx, "phone", e.target.value)} placeholder="+880 1700-000000" />
                        <Field label="Email" name="email" value={dist.email} onChange={(e) => setDistrict(dIdx, distIdx, "email", e.target.value)} placeholder="office@aonelube.com" />
                      </div>
                      <Field label="Address" name="address" value={dist.address} onChange={(e) => setDistrict(dIdx, distIdx, "address", e.target.value)} placeholder="Full address..." />
                      <Field label="Website" name="website" value={dist.website} onChange={(e) => setDistrict(dIdx, distIdx, "website", e.target.value)} placeholder="https://aonelube.com" />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addDistrict(dIdx)}
                    className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-700 transition"
                  >
                    <Plus size={13} /> Add District
                  </button>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addDivision}
            className="flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition"
          >
            <Plus size={14} /> Add Division
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Tab: QUALITY ─────────────────────────────────────────────────────────────
function QualityTab({ data, onChange }) {
  const stats = data.stats || [];
  const cta = data.cta || {};

  const setStat = (idx, key, val) => {
    const updated = stats.map((s, i) => (i === idx ? { ...s, [key]: val } : s));
    onChange({ ...data, stats: updated });
  };

  const setCta = (k, v) => onChange({ ...data, cta: { ...cta, [k]: v } });

  return (
    <div className="space-y-5">
      <SectionCard title="Page Header" icon={Shield}>
        <Field label="Page Heading" name="heading" value={data.heading || ""} onChange={(e) => onChange({ ...data, heading: e.target.value })} placeholder="Quality Assurance" />
        <Field label="Description Paragraph" name="description" value={data.description || ""} onChange={(e) => onChange({ ...data, description: e.target.value })} textarea rows={5} />
      </SectionCard>

      <SectionCard title="Certificate Images" icon={Globe}>
        <Field label="DEKRA Seal Image Path / URL" name="dekraImage" value={data.dekraImage || ""} onChange={(e) => onChange({ ...data, dekraImage: e.target.value })} placeholder="/dekra-seal.png" />
        <Field label="ISO Certificate Image Path / URL" name="isoImage" value={data.isoImage || ""} onChange={(e) => onChange({ ...data, isoImage: e.target.value })} placeholder="/iso-certificate.png" />
      </SectionCard>

      <SectionCard title="Trust Stats (4 Metrics)" icon={Building2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Stat {idx + 1}</p>
              <Field label="Value" name={`val-${idx}`} value={stat.value || ""} onChange={(e) => setStat(idx, "value", e.target.value)} placeholder="100% / ISO 9001 / 64 / DEKRA" />
              <Field label="Label" name={`lbl-${idx}`} value={stat.label || ""} onChange={(e) => setStat(idx, "label", e.target.value)} placeholder="German Tech Standard" />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="CTA Section" icon={Users}>
        <Field label="CTA Heading" name="ctaHeading" value={cta.heading || ""} onChange={(e) => setCta("heading", e.target.value)} placeholder="Become an Authorized Sales Partner" />
        <Field label="CTA Description" name="ctaDescription" value={cta.description || ""} onChange={(e) => setCta("description", e.target.value)} textarea rows={2} />
      </SectionCard>
    </div>
  );
}

// ─── Tab: CONTACT ─────────────────────────────────────────────────────────────
function ContactTab({ data, onChange }) {
  const info = data.info || {};
  const hero = data.hero || {};
  const team = data.team || {};
  const members = data.members || [];

  const setInfo = (k, v) => onChange({ ...data, info: { ...info, [k]: v } });
  const setHero = (k, v) => onChange({ ...data, hero: { ...hero, [k]: v } });
  const setTeam = (k, v) => onChange({ ...data, team: { ...team, [k]: v } });

  const setMember = (idx, key, val) => {
    const updated = members.map((m, i) => (i === idx ? { ...m, [key]: val } : m));
    onChange({ ...data, members: updated });
  };

  const addMember = () =>
    onChange({ ...data, members: [...members, { name: "", role: "", email: "", phone: "", image: "" }] });

  const removeMember = (idx) =>
    onChange({ ...data, members: members.filter((_, i) => i !== idx) });

  return (
    <div className="space-y-5">
      <SectionCard title="Hero Section" icon={Globe}>
        <Field label="Page Heading" name="heading" value={hero.heading || ""} onChange={(e) => setHero("heading", e.target.value)} placeholder="Get In Touch" />
        <Field label="Subheading" name="subheading" value={hero.subheading || ""} onChange={(e) => setHero("subheading", e.target.value)} textarea rows={2} />
      </SectionCard>

      <SectionCard title="Contact Information" icon={Phone}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Phone Number" name="phone" value={info.phone || ""} onChange={(e) => setInfo("phone", e.target.value)} placeholder="+880 1850120709" />
          <Field label="Phone Hours Note" name="phoneHours" value={info.phoneHours || ""} onChange={(e) => setInfo("phoneHours", e.target.value)} placeholder="Mon-Fri from 9am to 6pm" />
          <Field label="Email Address" name="email" value={info.email || ""} onChange={(e) => setInfo("email", e.target.value)} placeholder="info@aonelube.com" type="email" />
          <Field label="Email Note" name="emailNote" value={info.emailNote || ""} onChange={(e) => setInfo("emailNote", e.target.value)} placeholder="We respond within 24 hours" />
        </div>
        <Field label="Headquarters Address" name="address" value={info.address || ""} onChange={(e) => setInfo("address", e.target.value)} textarea rows={2} />
        <Field label="Business Hours" name="businessHours" value={info.businessHours || ""} onChange={(e) => setInfo("businessHours", e.target.value)} placeholder="Saturday – Thursday: 9:00 AM – 7:00 PM" />
      </SectionCard>

      <SectionCard title="Meet Our Team Section" icon={Users}>
        <Field label="Section Heading" name="teamHeading" value={team.heading || ""} onChange={(e) => setTeam("heading", e.target.value)} placeholder="Meet Our Team" />
        <Field label="Section Subheading" name="teamSubheading" value={team.subheading || ""} onChange={(e) => setTeam("subheading", e.target.value)} textarea rows={2} />
      </SectionCard>

      <SectionCard title="Team Members" icon={User}>
        <div className="space-y-4">
          {members.map((member, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-3 relative">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Member {idx + 1}</span>
                <button
                  type="button"
                  onClick={() => removeMember(idx)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Full Name" name="name" value={member.name} onChange={(e) => setMember(idx, "name", e.target.value)} placeholder="Tanvir Ahmed" />
                <Field label="Role / Title" name="role" value={member.role} onChange={(e) => setMember(idx, "role", e.target.value)} placeholder="Chief Executive Officer" />
                <Field label="Email" name="email" value={member.email} onChange={(e) => setMember(idx, "email", e.target.value)} placeholder="tanvir@example.com" type="email" />
                <Field label="Phone" name="phone" value={member.phone} onChange={(e) => setMember(idx, "phone", e.target.value)} placeholder="+880 1711-000001" />
              </div>
              <Field label="Photo URL" name="image" value={member.image} onChange={(e) => setMember(idx, "image", e.target.value)} placeholder="https://images.unsplash.com/..." />
              {member.image && (
                <img src={member.image} alt={member.name} className="h-16 w-16 rounded-full object-cover border border-slate-200" />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMember}
            className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition"
          >
            <Plus size={14} /> Add Team Member
          </button>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const TABS = [
  { key: "company", label: "Company", icon: Building2 },
  { key: "partner", label: "Partner", icon: MapPin },
  { key: "quality", label: "Quality", icon: Shield },
  { key: "contact", label: "Contact", icon: Mail },
];

export default function CustomizePage() {
  const [activeTab, setActiveTab] = useState("company");
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchContent = useCallback(async (page) => {
    setLoading(true);
    try {
      const data = await getSiteContent(page);
      setPageData(data || {});
    } catch {
      setPageData({});
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent(activeTab);
  }, [activeTab, fetchContent]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteContent(activeTab, pageData);
      Swal.fire({
        icon: "success",
        title: "Saved!",
        text: `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} page content updated successfully.`,
        confirmButtonColor: "#e30613",
        timer: 2500,
        timerProgressBar: true,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Save Failed",
        text: err.message || "Something went wrong.",
        confirmButtonColor: "#e30613",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-red-50 p-3 text-red-600">
            <Palette className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-500">CMS</p>
            <h1 className="text-2xl font-bold text-slate-800">Customize Pages</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Edit content for Company, Partner, Quality Assurance and Contact pages.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white border border-slate-100 rounded-2xl p-2 shadow-sm">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleTabChange(key)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              activeTab === key
                ? "bg-red-600 text-white shadow-sm"
                : "text-slate-600 hover:bg-red-50 hover:text-red-600"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-red-500" />
          <p className="text-sm text-slate-500">Loading content...</p>
        </div>
      ) : (
        <>
          {activeTab === "company" && <CompanyTab data={pageData} onChange={setPageData} />}
          {activeTab === "partner" && <PartnerTab data={pageData} onChange={setPageData} />}
          {activeTab === "quality" && <QualityTab data={pageData} onChange={setPageData} />}
          {activeTab === "contact" && <ContactTab data={pageData} onChange={setPageData} />}

          {/* Save Button */}
          <div className="sticky bottom-4 flex justify-end">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 rounded-2xl bg-red-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-200 hover:bg-red-700 disabled:opacity-60 transition-all"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save size={15} />
              )}
              {saving ? "Saving..." : `Save ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content`}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
