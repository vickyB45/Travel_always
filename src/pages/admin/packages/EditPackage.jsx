import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  X,
  Image
} from "lucide-react";

import AdminLayout from "../../../components/admin/AdminLayout";
import FormSkeleton from "../../../components/common/FormSkeleton";
import ButtonLoader from "../../../components/common/ButtonLoader";

import { packageSchema } from "../../../schemas/admin.schema";
import { useAdminPackages, useAdminCategories } from "../../../hooks/admin/queries/adminQuery";
import { useUpdatePackage } from "../../../hooks/admin/mutations/adminMutate";

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ======================
     DATA QUERIES
  ====================== */
  const { data: packageRes, isLoading } = useAdminPackages();
  const { data: categoryRes, isLoading: catLoading } = useAdminCategories();

  const packages = packageRes || [];
  const categories = categoryRes?.data || [];

  const currentPackage = packages.find((p) => p._id === id);

  const { mutate: updatePackage, isPending } = useUpdatePackage();

  /* ======================
     FORM SETUP
  ====================== */
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      title: "",
      img: "",
      desc: "",
      price: "",
      category: "",
      points: [""],
      metaData: [""],
      isPopular: false,
      isActive: "draft"
    }
  });

  const { fields: pointsFields, append: appendPoint, remove: removePoint } =
    useFieldArray({
      control,
      name: "points"
    });

  const { fields: metaFields, append: appendMeta, remove: removeMeta } =
    useFieldArray({
      control,
      name: "metaData"
    });

  const imageUrl = watch("img");

  /* ======================
     PREFILL DATA (FIXED)
     ✅ Reset only when BOTH package AND categories are loaded
  ====================== */
  useEffect(() => {
    // Wait until both package exists AND categories are loaded
    if (currentPackage && categories.length > 0) {
      // Extract category ID as string (whether it's populated object or just ID)
      
      console.log(currentPackage)
      const categoryId = currentPackage.category?._id 
        ? String(currentPackage.category._id)
        : currentPackage.category 
        ? String(currentPackage.category)
        : "";

      reset({
        title: currentPackage.title || "",
        img: currentPackage.img || "",
        desc: currentPackage.desc || "",
        price: currentPackage.price || "",
        category: categoryId, // ✅ Always string, set after options are available
        points: currentPackage.points?.filter(Boolean) || [""],
        metaData: currentPackage.metaData?.filter(Boolean) || [""],
        isPopular: Boolean(currentPackage.isPopular),
        isActive: currentPackage.isActive || "draft"
      });
    }
  }, [currentPackage, categories, reset]); // ✅ Dependencies include categories

  /* ======================
     SUBMIT
  ====================== */
  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      category: formData.category || null,
      points: formData.points.filter(Boolean),
      metaData: formData.metaData.filter(Boolean)
    };

    updatePackage(
      { id, data: payload },
      {
        onSuccess: () => {
          navigate("/admin/packages");
        }
      }
    );
  };

  /* ======================
     LOADING STATE
     ✅ Show skeleton until BOTH package AND categories load
  ====================== */
  if (isLoading || catLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <FormSkeleton />
        </div>
      </AdminLayout>
    );
  }

  if (!currentPackage) {
    return (
      <AdminLayout>
        <div className="p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">Package not found</p>
          <button
            onClick={() => navigate("/admin/packages")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Packages
          </button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/packages")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Package</h1>
          <p className="text-sm text-gray-600">
            Update package details
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-w-4xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6">
            {/* IMAGE PREVIEW */}
            {imageUrl ? (
              <div className="w-full h-64 rounded-lg overflow-hidden border">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
            ) : (
              <div className="w-full h-64 rounded-lg bg-gray-50 border-2 border-dashed flex items-center justify-center">
                <Image size={48} className="text-gray-400" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TITLE */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Title *
                </label>
                <input
                  {...register("title")}
                  className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* IMAGE */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Image URL *
                </label>
                <input
                  {...register("img")}
                  className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.img && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.img.message}
                  </p>
                )}
              </div>

              {/* PRICE */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Price *
                </label>
                <input
                  {...register("price")}
                  className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* CATEGORY - ✅ String values in options */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category *
                </label>
                <select
                  {...register("category")}
                  className="w-full border rounded-lg px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={String(cat._id)}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Description *
                </label>
                <textarea
                  {...register("desc")}
                  rows={4}
                  className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.desc && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.desc.message}
                  </p>
                )}
              </div>

              {/* STATUS */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Status
                </label>
                <select
                  {...register("isActive")}
                  className="w-full border rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="public">Public</option>
                </select>
              </div>

              {/* POPULAR */}
              <div className="flex items-center gap-3 pt-8">
                <input 
                  type="checkbox" 
                  {...register("isPopular")} 
                  className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500 rounded"
                />
                <label className="text-sm font-semibold">
                  Mark as Popular
                </label>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? <ButtonLoader /> : <Save size={18} />}
              Update Package
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/packages")}
              className="border px-6 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors"
            >
              <X size={18} /> Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditPackage;