"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { ImagePlus, Loader2, Plus, Trash2, UploadCloud } from "lucide-react";
import RoleGuard from "@/components/dashboard/RoleGuard";
import { createProduct, getCategories } from "@/lib/api";

function normalizeCategories(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export default function CreateProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      slug: "",
      category: "",
      description: "",
      price: "",
      compareAtPrice: "",
      stock: "",
      featured: false,
      specifications: [{ key: "", value: "" }],
      images: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });

  const nameValue = watch("name", "");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        const data = await getCategories();
        setCategories(normalizeCategories(data));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Unable to load categories",
          text: error.message || "Please try again.",
          confirmButtonColor: "#e30613",
          background: "#ffffff",
          color: "#171717",
        });
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (!nameValue) {
      setValue("slug", "", { shouldDirty: true });
      return;
    }

    const slug = nameValue
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setValue("slug", slug, { shouldDirty: true });
  }, [nameValue, setValue]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) {
      setImagePreviews([]);
      return;
    }

    const previews = files.map((file) => ({ name: file.name, preview: URL.createObjectURL(file) }));
    setImagePreviews(previews);
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview.preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview.preview);
        }
      });
    };
  }, [imagePreviews]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("compareAtPrice", data.compareAtPrice || "");
      formData.append("stock", data.stock);
      formData.append("featured", data.featured ? "true" : "false");

      const specificationEntries = (data.specifications || []).filter(
        (item) => item?.key?.trim() && item?.value?.trim()
      );
      formData.append("specifications", JSON.stringify(specificationEntries));

      Array.from(data.images || []).forEach((file) => {
        formData.append("images", file);
      });

      await createProduct(formData);

      Swal.fire({
        icon: "success",
        title: "Product created",
        text: "The product is now available for review.",
        confirmButtonColor: "#e30613",
        background: "#ffffff",
        color: "#171717",
      });

      reset({
        name: "",
        slug: "",
        category: "",
        description: "",
        price: "",
        compareAtPrice: "",
        stock: "",
        featured: false,
        specifications: [{ key: "", value: "" }],
        images: undefined,
      });
      setImagePreviews([]);
      router.push("/dashboard/products");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Product creation failed",
        text: error.message || "Please try again.",
        confirmButtonColor: "#e30613",
        background: "#ffffff",
        color: "#171717",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryOptions = useMemo(() => categories || [], [categories]);

  return (
    <RoleGuard allowedRoles={["manager", "admin"]}>
      <div className="space-y-6">
        <div className="rounded-3xl border border-red-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-500">Catalog Management</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-800">Create Product</h1>
          <p className="mt-2 text-sm text-slate-600">
            Add a new product with rich details, category assignment, and image uploads.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-3xl border border-red-100 bg-white p-5 shadow-sm md:p-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Product Name</label>
              <input
                type="text"
                {...register("name", { required: "Product name is required" })}
                className="w-full rounded-2xl border border-gray-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                placeholder="e.g. Mobil 1 5W-30"
              />
              {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name.message}</p> : null}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Slug</label>
              <input
                type="text"
                {...register("slug", { required: "Slug is required" })}
                className="w-full rounded-2xl border border-gray-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                placeholder="mobil-1-5w-30"
              />
              <p className="mt-1 text-xs text-slate-500">Auto-generated from the product name.</p>
              {errors.slug ? <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p> : null}
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Category</label>
              <select
                {...register("category", { required: "Please select a category" })}
                className="w-full rounded-2xl border border-gray-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                disabled={loadingCategories}
              >
                <option value="">{loadingCategories ? "Loading categories..." : "Select a category"}</option>
                {categoryOptions.map((category) => (
                  <option key={category._id || category.id} value={category._id || category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category ? <p className="mt-1 text-sm text-red-600">{errors.category.message}</p> : null}
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-red-100 bg-[#FFF5F5] px-4 py-3 text-sm text-slate-600">
              <input
                type="checkbox"
                id="featured"
                {...register("featured")}
                className="h-4 w-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="featured" className="cursor-pointer font-medium text-slate-700">
                Mark as featured product
              </label>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Description</label>
            <textarea
              rows={4}
              {...register("description", { required: "Description is required" })}
              className="w-full rounded-2xl border border-gray-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
              placeholder="Describe the product and its key benefits"
            />
            {errors.description ? <p className="mt-1 text-sm text-red-600">{errors.description.message}</p> : null}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Price</label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register("price", { required: "Price is required", min: { value: 0, message: "Price cannot be negative" } })}
                className="w-full rounded-2xl border border-gray-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                placeholder="0.00"
              />
              {errors.price ? <p className="mt-1 text-sm text-red-600">{errors.price.message}</p> : null}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Compare At Price</label>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register("compareAtPrice", { min: { value: 0, message: "Value cannot be negative" } })}
                className="w-full rounded-2xl border border-gray-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                placeholder="0.00"
              />
              {errors.compareAtPrice ? <p className="mt-1 text-sm text-red-600">{errors.compareAtPrice.message}</p> : null}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Stock</label>
              <input
                type="number"
                min="0"
                {...register("stock", { required: "Stock is required", min: { value: 0, message: "Stock cannot be negative" } })}
                className="w-full rounded-2xl border border-gray-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                placeholder="0"
              />
              {errors.stock ? <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p> : null}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700">Specifications</label>
              <button
                type="button"
                onClick={() => append({ key: "", value: "" })}
                className="inline-flex items-center gap-2 rounded-full border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <Plus className="h-4 w-4" />
                Add Specification
              </button>
            </div>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                  <input
                    type="text"
                    {...register(`specifications.${index}.key`)}
                    className="rounded-2xl border border-gray-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    placeholder="e.g. Viscosity"
                  />
                  <input
                    type="text"
                    {...register(`specifications.${index}.value`)}
                    className="rounded-2xl border border-gray-200 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100"
                    placeholder="e.g. 5W-30"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="rounded-2xl border border-gray-200 p-2.5 text-slate-600 transition hover:bg-gray-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Images</label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-[#FFF5F5] px-4 py-6 text-center text-sm text-slate-600 transition hover:border-red-400 hover:bg-red-50">
              <UploadCloud className="mb-2 h-5 w-5 text-red-500" />
              <span className="font-medium text-slate-700">Choose product images</span>
              <span className="mt-1 text-xs text-slate-500">You can select multiple images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                {...register("images", { required: "At least one image is required" })}
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {errors.images ? <p className="mt-2 text-sm text-red-600">{errors.images.message}</p> : null}

            {imagePreviews.length ? (
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {imagePreviews.map((preview) => (
                  <div key={preview.name} className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                    <img src={preview.preview} alt={preview.name} className="h-28 w-full object-cover" />
                    <p className="truncate px-3 py-2 text-xs text-slate-600">{preview.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 flex h-24 items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <ImagePlus className="h-4 w-4" />
                  <span>No images selected</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {isSubmitting ? "Creating product..." : "Create Product"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/dashboard/products")}
              className="rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </RoleGuard>
  );
}
