import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";

import AdminLayout from "../../../components/admin/AdminLayout";
import ButtonLoader from "../../../components/common/ButtonLoader";
import Loader from "../../../components/common/Loader";

import { categorySchema } from "../../../schemas/admin.schema";
import { useAdminCategories } from "../../../hooks/admin/queries/adminQuery";
import { useUpdateCategory } from "../../../hooks/admin/mutations/adminMutate";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ======================
     DATA
  ====================== */
  const { data, isLoading } = useAdminCategories();
  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const categories = data?.data || [];
  const currentCategory = categories.find((c) => c._id === id);

  /* ======================
     FORM
  ====================== */
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  const nameValue = watch("name");

  const slugPreview = nameValue
    ? nameValue
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : "";

  /* ======================
     PREFILL
  ====================== */
  useEffect(() => {
    if (currentCategory) {
      reset({
        name: currentCategory.name || "",
        description: currentCategory.description || "",
        isActive: Boolean(currentCategory.isActive),
      });
    }
  }, [currentCategory, reset]);

  /* ======================
     SUBMIT
  ====================== */
  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      slug: slugPreview, // backend-safe
    };

    updateCategory(
      { id, data: payload },
      {
        onSuccess: () => {
          navigate("/admin/categories");
        },
      }
    );
  };

  /* ======================
     STATES
  ====================== */
  if (isLoading) {
    return (
      <AdminLayout>
        <Loader />
      </AdminLayout>
    );
  }

  if (!currentCategory) {
    return (
      <AdminLayout>
        <div className="p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">
            Category not found
          </p>
          <button
            onClick={() => navigate("/admin/categories")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Categories
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
          onClick={() => navigate("/admin/categories")}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit Category
          </h1>
          <p className="text-sm text-gray-500">
            Update category details
          </p>
        </div>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 space-y-6">
            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category Name *
              </label>
              <input
                {...register("name")}
                className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* SLUG PREVIEW */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Slug
              </label>
              <div className="px-4 py-2.5 rounded-lg bg-gray-50 border text-sm text-gray-600">
                {slugPreview}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Slug is auto-generated from name
              </p>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full border rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* STATUS */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                {...register("isActive")}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                Active
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3 px-6 py-4 border-t bg-gray-50 rounded-b-xl">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-50"
            >
              {isPending ? <ButtonLoader /> : <Save size={18} />}
              Update Category
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/categories")}
              className="border px-6 py-2.5 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditCategory;
