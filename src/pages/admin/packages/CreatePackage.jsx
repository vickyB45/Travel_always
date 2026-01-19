import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Trash2,
  ArrowLeft,
  Save,
  X,
  Image as ImageIcon
} from "lucide-react";

import AdminLayout from "../../../components/admin/AdminLayout";
import FormSkeleton from "../../../components/common/FormSkeleton";
import ButtonLoader from "../../../components/common/ButtonLoader";

import { packageSchema } from "../../../schemas/admin.schema";
import { useCreatePackage } from "../../../hooks/admin/mutations/adminMutate";
import { useAdminCategories } from "../../../hooks/admin/queries/adminQuery";

const CreatePackage = () => {
  const navigate = useNavigate();

  const { mutate: createPackage, isPending } = useCreatePackage();

  // 🔹 CATEGORY QUERY
  const { data: categoryRes, isLoading: catLoading } = useAdminCategories();
  const categories = categoryRes?.data || [];

  const {
    register,
    handleSubmit,
    control,
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
      isActive: "draft",
      isPopular: false,
      points: [""],
      metaData: [""]
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

  const onSubmit = (data) => {
    const payload = {
      ...data,
      category: data.category || null,
      points: data.points.filter(Boolean),
      metaData: data.metaData.filter(Boolean)
    };

    createPackage(payload, {
      onSuccess: () => {
        navigate("/admin/packages");
      }
    });
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/admin/packages")}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Package</h1>
          <p className="text-sm text-gray-600">
            Add a new travel package
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 max-w-4xl">
        {isPending ? (
          <FormSkeleton />
        ) : (
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
                  <div className="text-center">
                    <ImageIcon size={48} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Image preview will appear here
                    </p>
                  </div>
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
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
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
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                </div>

                {/* PRICE */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Price *
                  </label>
                  <input
                    {...register("price")}
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category *
                  </label>
                  <select
                    {...register("category")}
                    disabled={catLoading}
                    className="w-full border rounded-lg px-4 py-2.5 bg-white"
                  >
                    <option value="">
                      {catLoading
                        ? "Loading categories..."
                        : "Select category"}
                    </option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-sm">
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
                    className="w-full border rounded-lg px-4 py-2.5"
                  />
                </div>

                {/* POINTS */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">
                    Highlights
                  </label>
                  {pointsFields.map((_, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        {...register(`points.${idx}`)}
                        className="flex-1 border rounded-lg px-4 py-2.5"
                      />
                      <button
                        type="button"
                        onClick={() => removePoint(idx)}
                        disabled={pointsFields.length === 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendPoint("")}
                    className="text-blue-600 text-sm"
                  >
                    + Add Point
                  </button>
                </div>

                {/* META */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">
                    Meta Tags
                  </label>
                  {metaFields.map((_, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        {...register(`metaData.${idx}`)}
                        className="flex-1 border rounded-lg px-4 py-2.5"
                      />
                      <button
                        type="button"
                        onClick={() => removeMeta(idx)}
                        disabled={metaFields.length === 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => appendMeta("")}
                    className="text-blue-600 text-sm"
                  >
                    + Add Meta Tag
                  </button>
                </div>

                {/* STATUS */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Status
                  </label>
                  <select
                    {...register("isActive")}
                    className="w-full border rounded-lg px-4 py-2.5"
                  >
                    <option value="draft">Draft</option>
                    <option value="public">Public</option>
                  </select>
                </div>

                {/* POPULAR */}
                <div className="flex items-center gap-3">
                  <input type="checkbox" {...register("isPopular")} />
                  <label className="text-sm font-semibold">
                    Mark as Popular
                  </label>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 px-6 py-4 border-t bg-gray-50">
              <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg flex items-center gap-2"
              >
                {isPending ? <ButtonLoader /> : <Save size={18} />}
                Create Package
              </button>

              <button
                type="button"
                onClick={() => navigate("/admin/packages")}
                className="border px-6 py-2.5 rounded-lg"
              >
                <X size={18} /> Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
};

export default CreatePackage;
